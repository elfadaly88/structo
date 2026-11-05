using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using System.Threading.RateLimiting;
using Structo.API.Services;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System.Text;
using Structo.API.Filters;
using Structo.API.Middleware;
using FluentValidation;
using FluentValidation.AspNetCore;
using Structo.Core.Validators;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.StaticFiles;
using Structo.API.Hubs;

// 1. FIRST: Preserve JWT Claim Type Map & Configure Npgsql Timestamp Behavior - ABSOLUTELY AT THE TOP
System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var builder = WebApplication.CreateBuilder(args);

// ------------------------------
// 2. SERVICE REGISTRATION
// ------------------------------

// Add MVC Controllers with Filters
builder.Services.AddControllers(options =>
    {
        options.Filters.Add<ValidationFilterAttribute>();
    })
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
        options.JsonSerializerOptions.Converters.Add(new CustomDateTimeJsonConverter());
        options.JsonSerializerOptions.Converters.Add(new CustomNullableDateTimeJsonConverter());
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = true;
    });

// CORS Configuration
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:4500", "https://structo-production.up.railway.app" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()
              .WithExposedHeaders("Retry-After", "X-Correlation-Id"));
});

// SignalR with Keep-Alives
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
    options.KeepAliveInterval = TimeSpan.FromSeconds(15);
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
});

// Data Protection
builder.Services.AddDataProtection()
    .PersistKeysToDbContext<StructoDbContext>();

// FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<ProjectCreateDtoValidator>();

// Swagger with JWT Support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Just paste your token below without the 'Bearer ' prefix.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Entity Framework and PostgreSQL
builder.Services.AddDbContext<StructoDbContext>(options =>
{
    var databaseUrl = builder.Configuration["DATABASE_URL"] ?? Environment.GetEnvironmentVariable("DATABASE_URL");
    string connectionString = string.Empty;
    bool isProd = builder.Environment.IsProduction();
    bool trustCert = !isProd; // Enforce Trust Server Certificate=false in production

    if (!string.IsNullOrEmpty(databaseUrl) && databaseUrl.StartsWith("postgresql://"))
    {
        try
        {
            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');
            connectionString = $"Host={databaseUri.Host};Port={databaseUri.Port};Database={databaseUri.LocalPath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};Maximum Pool Size=20;SSL Mode=Require;Trust Server Certificate={(trustCert ? "true" : "false")};";
        }
        catch (Exception ex) { Console.WriteLine($"Error parsing DATABASE_URL: {ex.Message}"); }
    }
    
    if (string.IsNullOrEmpty(connectionString))
    {
        var defaultConn = builder.Configuration.GetConnectionString("DefaultConnection");
        if (defaultConn == "Host=localhost;Database=StructoDb;Username=postgres;Password=PlaceholderPassword")
        {
            defaultConn = null;
        }
        connectionString = Environment.GetEnvironmentVariable("DefaultConnection")
            ?? defaultConn
            ?? builder.Configuration.GetConnectionString("LocalConnection")
            ?? (isProd ? throw new InvalidOperationException("Production database connection string is not configured.") : "Host=localhost;Port=5444;Database=StructoDb;Username=postgres;Password=NewStrongPassword123");
    }

    options.UseNpgsql(connectionString, npgsqlOptions =>
        npgsqlOptions.EnableRetryOnFailure(maxRetryCount: 5, maxRetryDelay: TimeSpan.FromSeconds(5), errorCodesToAdd: null))
        .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
});

// HTTP Context and Tenant Services
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ITenantContextAccessor, TenantContextAccessor>();
builder.Services.AddScoped<DbContext>(provider => provider.GetRequiredService<StructoDbContext>());

// Cloudflare R2 Settings
builder.Services.Configure<Structo.Core.Settings.CloudflareR2Settings>(options =>
{
    var section = builder.Configuration.GetSection("CloudflareR2");
    
    var accessKey = Environment.GetEnvironmentVariable("CLOUDFLARE_R2_ACCESS_KEY_ID") 
        ?? section["AccessKeyId"];
    options.AccessKeyId = (accessKey == "YOUR_CLOUDFLARE_R2_ACCESS_KEY_ID") ? string.Empty : (accessKey ?? string.Empty);
    
    var secretAccessKey = Environment.GetEnvironmentVariable("CLOUDFLARE_R2_SECRET_ACCESS_KEY") 
        ?? section["SecretAccessKey"];
    options.SecretAccessKey = (secretAccessKey == "YOUR_CLOUDFLARE_R2_SECRET_ACCESS_KEY") ? string.Empty : (secretAccessKey ?? string.Empty);
    
    var bucketName = Environment.GetEnvironmentVariable("CLOUDFLARE_R2_BUCKET_NAME") 
        ?? section["BucketName"];
    options.BucketName = bucketName ?? "structo-storage";
    
    var serviceUrl = Environment.GetEnvironmentVariable("CLOUDFLARE_R2_SERVICE_URL") 
        ?? section["ServiceUrl"];
    options.ServiceUrl = (serviceUrl == "YOUR_CLOUDFLARE_R2_SERVICE_URL") ? string.Empty : (serviceUrl ?? string.Empty);
    
    var publicBaseUrl = Environment.GetEnvironmentVariable("CLOUDFLARE_R2_PUBLIC_BASE_URL") 
        ?? section["PublicBaseUrl"];
    options.PublicBaseUrl = (publicBaseUrl == "YOUR_CLOUDFLARE_R2_PUBLIC_BASE_URL") ? string.Empty : (publicBaseUrl ?? string.Empty);
});

// Cloud Storage Service — Conditional Registration
// If Cloudflare R2 is properly configured, use the real S3/R2 client.
// Otherwise, fall back to a no-op mock for local development testing.
var r2ServiceUrl = Environment.GetEnvironmentVariable("CLOUDFLARE_R2_SERVICE_URL")
    ?? builder.Configuration["CloudflareR2:ServiceUrl"];
var isR2Configured = !string.IsNullOrWhiteSpace(r2ServiceUrl)
    && r2ServiceUrl != "YOUR_CLOUDFLARE_R2_SERVICE_URL";

if (isR2Configured)
{
    builder.Services.AddSingleton<Amazon.S3.IAmazonS3>(sp =>
    {
        var settings = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<Structo.Core.Settings.CloudflareR2Settings>>().Value;
        var svcUrl = r2ServiceUrl!.Replace("http://", "https://");

        var config = new Amazon.S3.AmazonS3Config
        {
            ServiceURL = svcUrl,
            UseHttp = false,
            ForcePathStyle = true,
            AuthenticationRegion = "auto",
            HttpClientFactory = new CustomAwsHttpClientFactory()
        };

        var credentials = new Amazon.Runtime.BasicAWSCredentials(settings.AccessKeyId, settings.SecretAccessKey);
        return new Amazon.S3.AmazonS3Client(credentials, config);
    });
    // Typed client: one pooled handler via IHttpClientFactory, default certificate validation
    builder.Services.AddHttpClient<Structo.Core.Interfaces.ICloudStorageService, Structo.Infrastructure.Storage.CloudflareR2StorageService>(
        client => client.Timeout = TimeSpan.FromSeconds(60));
    Console.WriteLine("[STARTUP] Cloud Storage: Cloudflare R2 (Production)");
}
else
{
    // No-Op fallback — allows financial endpoints to work locally without real R2 keys
    builder.Services.AddScoped<Structo.Core.Interfaces.ICloudStorageService, Structo.Infrastructure.Storage.LocalNoOpStorageService>();
    Console.WriteLine("[STARTUP] Cloud Storage: LocalNoOpStorageService (Development Fallback)");
}

// Core Business Services
builder.Services.AddScoped<Structo.Core.Interfaces.ITokenProvider, Structo.Infrastructure.Auth.JwtTokenProvider>();
builder.Services.AddScoped<Structo.Core.Interfaces.IAuthService, Structo.Core.Services.AuthService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IGoogleAuthService, Structo.API.Services.GoogleAuthService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IUserService, Structo.Core.Services.UserService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IProjectService, Structo.Core.Services.ProjectService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IProjectAccessService, Structo.Core.Services.ProjectAccessService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IFinancialTransactionService, Structo.Core.Services.FinancialTransactionService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IFinancialReportService, Structo.Core.Services.FinancialReportService>();
builder.Services.AddScoped<Structo.Core.Interfaces.ISiteExecutionService, Structo.Core.Services.SiteExecutionService>();

builder.Services.AddScoped<Structo.Core.Interfaces.IPettyCashService, Structo.Core.Services.PettyCashService>();
builder.Services.AddScoped<Structo.Core.Interfaces.ISettlementService, Structo.Core.Services.SettlementService>();
builder.Services.AddScoped<Structo.Core.Interfaces.ITenantCleanupService, Structo.Core.Services.TenantCleanupService>();

// Manual InstaPay payments: numbers from Payments:InstaPay (env Payments__InstaPay__Number / __WhatsAppNumber)
var instaPaySettings = builder.Configuration.GetSection("Payments:InstaPay").Get<Structo.Core.Settings.InstaPaySettings>()
    ?? new Structo.Core.Settings.InstaPaySettings();
builder.Services.AddSingleton(instaPaySettings);
builder.Services.AddScoped<Structo.Core.Interfaces.ITenantQuotaService, Structo.Core.Services.TenantQuotaService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IManualPaymentService, Structo.Core.Services.ManualPaymentService>();

// Paymob Payment Gateway Settings & Service
builder.Services.Configure<Structo.Core.Settings.PaymobSettings>(builder.Configuration.GetSection("Paymob"));
builder.Services.AddHttpClient<Structo.Core.Interfaces.IPaymobService, Structo.Infrastructure.Services.PaymobService>();

// Notification Services
builder.Services.AddHttpClient("OneSignal");
builder.Services.AddScoped<Structo.Core.Interfaces.INotificationRecipientResolver, Structo.Core.Services.NotificationRecipientResolver>();
builder.Services.AddScoped<Structo.Core.Interfaces.INotificationService, Structo.API.Services.NotificationService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IOneSignalEmailService, Structo.API.Services.OneSignalEmailService>();
builder.Services.AddScoped<Structo.Core.Interfaces.INotificationEngine, Structo.Core.Services.NotificationEngine>();

// Client IP behind Railway: its proxy appends the real client IP as the right-most X-Forwarded-For entry.
// ForwardLimit = 1 uses only that entry, so client-supplied values to its left are ignored.
// Safe only while the app is reachable exclusively through Railway's proxy.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
    options.ForwardLimit = 1;
});

// Rate Limiting Policies (partitioned per client IP)
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = async (context, token) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter = ((int)Math.Ceiling(retryAfter.TotalSeconds)).ToString();
        }
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/json";
        var response = new Structo.Core.DTOs.Common.ApiResponse<object>
        {
            Success = false,
            Message = "AUTH.RATE_LIMITED"
        };
        var json = System.Text.Json.JsonSerializer.Serialize(response, new System.Text.Json.JsonSerializerOptions
        {
            PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
        });
        await context.HttpContext.Response.WriteAsync(json, token);
    };

    options.AddPolicy("loginPolicy", context => PerClientIpFixedWindow(context, permitLimit: 10, TimeSpan.FromMinutes(1)));
    options.AddPolicy("registrationPolicy", context => PerClientIpFixedWindow(context, permitLimit: 5, TimeSpan.FromHours(1)));
    options.AddPolicy("refreshPolicy", context => PerClientIpFixedWindow(context, permitLimit: 30, TimeSpan.FromMinutes(1)));
    options.AddPolicy("publicWritePolicy", context => PerClientIpFixedWindow(context, permitLimit: 10, TimeSpan.FromHours(1)));
});

static RateLimitPartition<string> PerClientIpFixedWindow(HttpContext context, int permitLimit, TimeSpan window)
{
    var ip = context.Connection.RemoteIpAddress;
    string key;
    if (ip != null)
    {
        key = (ip.IsIPv4MappedToIPv6 ? ip.MapToIPv4() : ip).ToString();
    }
    else
    {
        key = "unknown";
        context.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("RateLimiting")
            .LogWarning("Client IP unavailable for {Path}; using the shared 'unknown' rate-limit partition.", context.Request.Path);
    }

    return RateLimitPartition.GetFixedWindowLimiter(key, _ => new FixedWindowRateLimiterOptions
    {
        PermitLimit = permitLimit,
        Window = window,
        QueueLimit = 0
    });
}

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
// Same key source as JwtTokenProvider; throws at startup if missing, a placeholder, or under 32 bytes
var key = Structo.Infrastructure.Auth.JwtSecret.GetSigningKey(builder.Configuration);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.MapInboundClaims = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        NameClaimType = "name",
        RoleClaimType = "role"
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.Request.Path;
            
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
            {
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        },
        OnForbidden = async context =>
        {
            if (context.HttpContext.Request.Path.StartsWithSegments("/api/subscription"))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";
                var response = new Structo.Core.DTOs.Common.ApiResponse<object>
                {
                    Success = false,
                    Message = "ترقية الباقة والفوترة مقتصرة حصرياً على مالك المنشأة."
                };
                var json = System.Text.Json.JsonSerializer.Serialize(response, new System.Text.Json.JsonSerializerOptions
                {
                    PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
                });
                await context.Response.WriteAsync(json);
            }
        }
    };
});

builder.Services.AddAuthorization();

// ------------------------------
// 3. BUILD APP
// ------------------------------
var app = builder.Build();

if (!instaPaySettings.IsConfigured)
{
    app.Logger.LogWarning("InstaPay is hidden: Payments:InstaPay:Number and Payments:InstaPay:WhatsAppNumber must both be set (international format, digits only).");
}

// ------------------------------
// 4. DATABASE INITIALIZATION
// ------------------------------
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<StructoDbContext>();
    var startupLogger = app.Logger;

    // EF migrations are the only schema path. If they fail, stop: running on a half-built schema corrupts data.
    try
    {
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        startupLogger.LogCritical(ex, "Database migration failed; the application will not start.");
        throw;
    }

    // Data fix for old rows with empty/default transaction dates (idempotent)
    try
    {
        context.Database.ExecuteSqlRaw(@"
            UPDATE ""FinancialTransactions""
            SET ""TransactionDate"" = COALESCE(
                NULLIF(""PaymentDate"", '0001-01-01 00:00:00'::timestamp),
                (SELECT s.""SubmittedAt"" FROM ""Settlements"" s WHERE s.""Id"" = ""FinancialTransactions"".""SettlementId"" LIMIT 1),
                NOW()
            )
            WHERE ""TransactionDate"" IS NULL
               OR ""TransactionDate"" <= '0001-01-02 00:00:00+00'::timestamptz
               OR ""TransactionDate"" <= '1970-01-01 00:00:00';

            UPDATE ""FinancialTransactions""
            SET ""PaymentDate"" = ""TransactionDate""
            WHERE ""PaymentDate"" IS NULL
               OR ""PaymentDate"" <= '0001-01-02 00:00:00+00'::timestamptz
               OR ""PaymentDate"" <= '1970-01-01 00:00:00';
        ");
    }
    catch (Exception ex)
    {
        startupLogger.LogWarning(ex, "FinancialTransactions date backfill skipped.");
    }

    // SuperAdmin seed: only when no SuperAdmin exists, and only with explicitly supplied credentials.
    // An existing SuperAdmin is never modified. Kept outside the try below so a config error stops startup.
    bool? superAdminExists = null;
    try
    {
        superAdminExists = context.Users.IgnoreQueryFilters().Any(u => u.Role == UserRole.SuperAdmin);
    }
    catch (Exception ex)
    {
        startupLogger.LogWarning(ex, "Skipping SuperAdmin seed: Users table not readable.");
    }

    if (superAdminExists == false)
    {
        var superAdminEmail = Environment.GetEnvironmentVariable("SUPERADMIN_EMAIL")
            ?? builder.Configuration["SuperAdminSeed:Email"];
        var superAdminPassword = Environment.GetEnvironmentVariable("SUPERADMIN_PASSWORD")
            ?? builder.Configuration["SuperAdminSeed:Password"];

        if (string.IsNullOrWhiteSpace(superAdminEmail) || string.IsNullOrWhiteSpace(superAdminPassword))
        {
            throw new InvalidOperationException(
                "No SuperAdmin account exists. Set SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD " +
                "(or SuperAdminSeed:Email and SuperAdminSeed:Password) to create one.");
        }

        if (superAdminPassword.Length < 12)
        {
            throw new InvalidOperationException("SUPERADMIN_PASSWORD must be at least 12 characters long.");
        }

        context.Users.Add(new User
        {
            FirstName = "Super",
            LastName = "Admin",
            Email = superAdminEmail.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(superAdminPassword),
            Role = UserRole.SuperAdmin,
            IsActive = true,
            IsApproved = true,
            TenantId = null
        });
        context.SaveChanges();
        startupLogger.LogInformation("SuperAdmin account seeded: {Email}", superAdminEmail.Trim());
    }

    try
    {
        // Database Security Cleanup Routine: Remove/Sanitize existing records containing SQLi or XSS payloads
        try
        {
            var taintRegex = new System.Text.RegularExpressions.Regex(
                @"(;\s*--|--|/\*|\*/|DROP\s+TABLE|UNION\s+SELECT|OR\s+['""]?1['""]?\s*=\s*['""]?1|<script|javascript:|onerror\s*=|onload\s*=)",
                System.Text.RegularExpressions.RegexOptions.IgnoreCase);

            var dirtyUsers = context.Users.IgnoreQueryFilters()
                .Where(u => u.FirstName.Contains("DROP TABLE") || u.FirstName.Contains("--;") || u.LastName.Contains("DROP TABLE") || u.Email.Contains("DROP TABLE"))
                .ToList();

            foreach (var user in dirtyUsers)
            {
                startupLogger.LogWarning("Sanitizing user record {UserId}", user.Id);
                user.FirstName = taintRegex.Replace(user.FirstName, "").Trim();
                user.LastName = taintRegex.Replace(user.LastName, "").Trim();
            }

            var dirtyTenants = context.Tenants.IgnoreQueryFilters()
                .Where(t => t.Name.Contains("DROP TABLE") || t.Name.Contains("--;"))
                .ToList();

            foreach (var tenant in dirtyTenants)
            {
                startupLogger.LogWarning("Sanitizing tenant record {TenantId}", tenant.Id);
                tenant.Name = taintRegex.Replace(tenant.Name, "").Trim();
            }

            var dirtyProjects = context.Projects.IgnoreQueryFilters()
                .Where(p => p.Name.Contains("DROP TABLE") || p.Name.Contains("--;"))
                .ToList();

            foreach (var proj in dirtyProjects)
            {
                startupLogger.LogWarning("Sanitizing project record {ProjectId}", proj.Id);
                proj.Name = taintRegex.Replace(proj.Name, "").Trim();
            }

            if (dirtyUsers.Any() || dirtyTenants.Any() || dirtyProjects.Any())
            {
                context.SaveChanges();
                startupLogger.LogInformation("Tainted records sanitized.");
            }
        }
        catch (Exception ex)
        {
            startupLogger.LogError(ex, "Database security cleanup failed.");
        }
    }
    catch { /* Ignore if table doesn't exist yet */ }
}

// ------------------------------
// 5. HTTP PIPELINE CONFIGURATION
// ------------------------------

// Resolve the real client IP/scheme first, so rate limiting and everything after it see it
app.UseForwardedHeaders();

// Exception Handling First
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Request Sanitization & Taint Check Middleware
app.UseMiddleware<RequestSanitizationMiddleware>();

// Swagger only in Development: it would map the whole API for anyone in Production
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Structo API v1");
        // NO RoutePrefix = string.Empty - keep default /swagger
    });
}

// NO HTTPS Redirection - TLS Termination at Railway Edge Proxy!

// Static Files Configuration
var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".js"] = "application/javascript";

// Check: Do we have files in wwwroot/browser/?
var angularOutputPath = Path.Combine(app.Environment.WebRootPath, "browser");
var browserIndexPath = Path.Combine(angularOutputPath, "index.html");
var rootIndexPath = Path.Combine(app.Environment.WebRootPath, "index.html");

Action<Microsoft.AspNetCore.StaticFiles.StaticFileResponseContext> staticFilePrepareResponse = ctx =>
{
    if (ctx.File.Name.Equals("index.html", StringComparison.OrdinalIgnoreCase))
    {
        ctx.Context.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
        ctx.Context.Response.Headers["Pragma"] = "no-cache";
        ctx.Context.Response.Headers["Expires"] = "0";
    }
    else
    {
        ctx.Context.Response.Headers["Cache-Control"] = "public, max-age=31536000, immutable";
    }
};

// Serve from correct location (prefer wwwroot/ if you manually copied files there, otherwise wwwroot/browser/)
if (File.Exists(rootIndexPath))
{
    // Serve directly from wwwroot/ (manual copy case)
    app.UseStaticFiles(new StaticFileOptions 
    { 
        ContentTypeProvider = provider,
        OnPrepareResponse = staticFilePrepareResponse
    });
}
else if (File.Exists(browserIndexPath))
{
    // Serve from wwwroot/browser/ (new Angular default output)
    app.UseStaticFiles(new StaticFileOptions
    {
        ContentTypeProvider = provider,
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(angularOutputPath),
        RequestPath = "",
        OnPrepareResponse = staticFilePrepareResponse
    });
}
else
{
    // Fallback: Serve whatever is in wwwroot
    app.UseStaticFiles(new StaticFileOptions 
    { 
        ContentTypeProvider = provider,
        OnPrepareResponse = staticFilePrepareResponse
    });
}

// CORS, Auth, Authorization
app.UseCors("AllowAngular");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// MAP CONTROLLERS and HUB FIRST (BEFORE SPA FALLBACK!)
app.MapControllers();
app.MapHub<NotificationHub>("/hubs/notifications");

// 🔍 Deployment Verification & Version Health Endpoints
var versionInfo = new
{
    appName = "Structo (أُسُس)",
    version = "1.0.0",
    serverTimeUtc = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
    buildPipeline = "Multi-stage Docker (Angular Client Build -> .NET 9 Publish)",
    safetyGuards = new
    {
        changeDetectionSafetyInterceptor = "Enabled (queueMicrotask ApplicationRef.tick on all HTTP responses)",
        multiTenancyFilters = "Strict (e.TenantId == CurrentTenantId across all scoped entities)",
        zoneChangeDetection = "provideZoneChangeDetection(eventCoalescing: true)",
        staticAssetsPipeline = "Automated Docker Stage 1 npm ci & ng build"
    }
};

app.MapGet("/api/version", () => Results.Ok(versionInfo)).AllowAnonymous();
app.MapGet("/version", () => Results.Ok(versionInfo)).AllowAnonymous();

// MAP SPA FALLBACK: Serve index.html from correct location
Action<Microsoft.AspNetCore.StaticFiles.StaticFileResponseContext> fallbackPrepareResponse = ctx =>
{
    ctx.Context.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    ctx.Context.Response.Headers["Pragma"] = "no-cache";
    ctx.Context.Response.Headers["Expires"] = "0";
};

if (File.Exists(rootIndexPath))
{
    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        OnPrepareResponse = fallbackPrepareResponse
    });
}
else if (File.Exists(browserIndexPath))
{
    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(angularOutputPath),
        OnPrepareResponse = fallbackPrepareResponse
    });
}

// Expose Service Provider for Global Access
Structo.API.Program.AppServices = app.Services;

// ── Dynamic PORT Binding (Railway / Cloud Deployment) ──────────────────────
// Railway injects PORT dynamically at runtime. We must bind to it or the
// process will listen on the wrong port and the health check will fail.
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    app.Urls.Clear();
    app.Urls.Add($"http://0.0.0.0:{port}");
    Console.WriteLine($"[Startup] Dynamically binding to PORT={port}");
}

// Photo classification audit on startup (receipts are never public)
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<StructoDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

    try
    {
        // Receipts and invoices must never be shown as public/site photos: reclassify any that slipped through
        int receiptRows = dbContext.Database.ExecuteSqlRaw(@"
            UPDATE ""SitePhotos""
            SET ""Category"" = 'Receipt'
            WHERE (""PhotoUrl"" IN (
                SELECT ""ReceiptPhotoUrl"" FROM ""PettyCashes"" WHERE ""ReceiptPhotoUrl"" IS NOT NULL
                UNION
                SELECT ""ReceiptPhotoUrl"" FROM ""FinancialTransactions"" WHERE ""ReceiptPhotoUrl"" IS NOT NULL
                UNION
                SELECT ""InvoiceUrl"" FROM ""SettlementLines"" WHERE ""InvoiceUrl"" IS NOT NULL
            )
            OR ""PhotoUrl"" ILIKE '%/receipts/%'
            OR ""PhotoUrl"" ILIKE '%receipt%'
            OR ""PhotoUrl"" ILIKE '%invoice%')
            AND ""Category"" != 'Receipt';
        ");

        int progressRows = dbContext.Database.ExecuteSqlRaw(@"
            UPDATE ""SitePhotos""
            SET ""Category"" = 'SiteProgress'
            WHERE ""Category"" IS NULL OR ""Category"" = '';
        ");

        // 3. Log counts for verification
        var siteProgressCount = dbContext.SitePhotos.IgnoreQueryFilters().Count(p => p.Category == "SiteProgress");
        var receiptCount = dbContext.SitePhotos.IgnoreQueryFilters().Count(p => p.Category == "Receipt");

        logger.LogInformation("✅ [PHOTO SANITATION AUDIT] Reclassified {ReceiptRows} receipts. Current counts => SiteProgress: {ProgressCount}, Receipts: {ReceiptCount}", 
            receiptRows, siteProgressCount, receiptCount);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "❌ [PHOTO SANITATION ERROR] Failed to run photo migration");
    }
}

app.Run();

// ------------------------------
// 6. GLOBAL SERVICE PROVIDER & HELPERS
// ------------------------------
namespace Structo.API 
{ 
    public partial class Program 
    { 
        public static IServiceProvider AppServices { get; set; } = default!;
    } 
}

public class CustomAwsHttpClientFactory : Amazon.Runtime.HttpClientFactory
{
    public override System.Net.Http.HttpClient CreateHttpClient(Amazon.Runtime.IClientConfig clientConfig)
    {
        var handler = new System.Net.Http.HttpClientHandler
        {
            SslProtocols = System.Security.Authentication.SslProtocols.Tls12 | System.Security.Authentication.SslProtocols.Tls13
        };
        return new System.Net.Http.HttpClient(handler);
    }
}

public class CustomDateTimeJsonConverter : System.Text.Json.Serialization.JsonConverter<DateTime>
{
    private static readonly string[] Formats = new[] { "dd/MM/yyyy", "dd/MM/yyyy HH:mm", "dd/MM/yyyy HH:mm:ss", "yyyy-MM-dd", "yyyy-MM-ddTHH:mm:ss.fffZ", "yyyy-MM-ddTHH:mm:ssZ" };

    public override DateTime Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        DateTime dt;
        if (reader.TokenType == System.Text.Json.JsonTokenType.String)
        {
            var str = reader.GetString();
            if (!string.IsNullOrWhiteSpace(str))
            {
                if (DateTime.TryParseExact(str, Formats, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtExact))
                    dt = dtExact;
                else if (DateTime.TryParse(str, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtParsed))
                    dt = dtParsed;
                else
                    dt = reader.GetDateTime();
            }
            else
            {
                dt = reader.GetDateTime();
            }
        }
        else
        {
            dt = reader.GetDateTime();
        }

        return dt.Kind == DateTimeKind.Utc ? dt : DateTime.SpecifyKind(dt, DateTimeKind.Utc);
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, DateTime value, System.Text.Json.JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString("dd/MM/yyyy HH:mm:ss"));
    }
}

public class CustomNullableDateTimeJsonConverter : System.Text.Json.Serialization.JsonConverter<DateTime?>
{
    private static readonly string[] Formats = new[] { "dd/MM/yyyy", "dd/MM/yyyy HH:mm", "dd/MM/yyyy HH:mm:ss", "yyyy-MM-dd", "yyyy-MM-ddTHH:mm:ss.fffZ", "yyyy-MM-ddTHH:mm:ssZ" };

    public override DateTime? Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        if (reader.TokenType == System.Text.Json.JsonTokenType.Null)
            return null;

        DateTime? dt = null;
        if (reader.TokenType == System.Text.Json.JsonTokenType.String)
        {
            var str = reader.GetString();
            if (string.IsNullOrWhiteSpace(str))
                return null;

            if (DateTime.TryParseExact(str, Formats, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtExact))
                dt = dtExact;
            else if (DateTime.TryParse(str, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtParsed))
                dt = dtParsed;
            else
                dt = reader.GetDateTime();
        }
        else
        {
            dt = reader.GetDateTime();
        }

        if (!dt.HasValue) return null;
        return dt.Value.Kind == DateTimeKind.Utc ? dt.Value : DateTime.SpecifyKind(dt.Value, DateTimeKind.Utc);
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, DateTime? value, System.Text.Json.JsonSerializerOptions options)
    {
        if (value.HasValue)
            writer.WriteStringValue(value.Value.ToString("dd/MM/yyyy HH:mm:ss"));
        else
            writer.WriteNullValue();
    }
}
