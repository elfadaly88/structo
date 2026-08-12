using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.RateLimiting;
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
              .AllowCredentials());
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
    builder.Services.AddScoped<Structo.Core.Interfaces.ICloudStorageService, Structo.Infrastructure.Storage.CloudflareR2StorageService>();
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
builder.Services.AddScoped<Structo.Core.Interfaces.IUserService, Structo.Core.Services.UserService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IProjectService, Structo.Core.Services.ProjectService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IFinancialTransactionService, Structo.Core.Services.FinancialTransactionService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IPettyCashService, Structo.Core.Services.PettyCashService>();
builder.Services.AddScoped<Structo.Core.Interfaces.ISettlementService, Structo.Core.Services.SettlementService>();

// Notification Services
builder.Services.AddHttpClient("OneSignal");
builder.Services.AddScoped<Structo.Core.Interfaces.INotificationService, Structo.API.Services.NotificationService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IOneSignalEmailService, Structo.API.Services.OneSignalEmailService>();
builder.Services.AddScoped<Structo.Core.Interfaces.INotificationEngine, Structo.Core.Services.NotificationEngine>();

// Rate Limiting Policy
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = async (context, token) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.ContentType = "application/json";
        var response = new Structo.Core.DTOs.Common.ApiResponse<object>
        {
            Success = false,
            Message = "لقد تجاوزت عدد المحاولات المسموحة. يرجى الانتظار دقيقة قبل المحاولة مجدداً."
        };
        var json = System.Text.Json.JsonSerializer.Serialize(response, new System.Text.Json.JsonSerializerOptions
        {
            PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
        });
        await context.HttpContext.Response.WriteAsync(json, token);
    };

    options.AddFixedWindowLimiter("loginPolicy", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 5;
        opt.QueueLimit = 0;
    });

    options.AddFixedWindowLimiter("registrationPolicy", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 5;
        opt.QueueLimit = 0;
    });
});

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = Environment.GetEnvironmentVariable("JWT_SECRET") 
    ?? (jwtSettings["Secret"] == "YOUR_JWT_SECRET_KEY_PLACEHOLDER_AT_LEAST_32_BYTES_LONG" ? null : jwtSettings["Secret"]);

if (string.IsNullOrWhiteSpace(secretKey))
{
    if (builder.Environment.IsDevelopment())
    {
        secretKey = "SuperSecretKeyThatShouldBeAtLeast32BytesLongForHS256ToWorkProperly!";
    }
    else
    {
        throw new InvalidOperationException("CRITICAL SECURITY ERROR: JWT_SECRET environment variable or configuration must be explicitly configured.");
    }
}
var key = Encoding.ASCII.GetBytes(secretKey);
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
        }
    };
});

builder.Services.AddAuthorization();

// ------------------------------
// 3. BUILD APP
// ------------------------------
var app = builder.Build();

// ------------------------------
// 4. DATABASE INITIALIZATION
// ------------------------------
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<StructoDbContext>();
    try
    {
        context.Database.EnsureCreated();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Migration failed: {ex.Message}");
        Console.WriteLine(ex.StackTrace);
    }

    try
    {
        if (!context.Users.Any(u => u.Role == UserRole.SuperAdmin))
        {
            var superAdminEmail = Environment.GetEnvironmentVariable("SUPERADMIN_EMAIL") 
                ?? builder.Configuration["SuperAdminSeed:Email"] 
                ?? "superadmin";
            var superAdminPassword = Environment.GetEnvironmentVariable("SUPERADMIN_PASSWORD") 
                ?? builder.Configuration["SuperAdminSeed:Password"] 
                ?? "SuperAdmin@123";

            var superAdmin = new User
            {
                FirstName = "Super",
                LastName = "Admin",
                Email = superAdminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(superAdminPassword),
                Role = UserRole.SuperAdmin,
                TenantId = null
            };
            context.Users.Add(superAdmin);
            context.SaveChanges();
        }

        if (!context.Tenants.Any(t => t.Name == "Tenant 1"))
        {
            var t1 = new Tenant { Name = "Tenant 1", SubscriptionPlan = SubscriptionPlan.Premium, MaxActiveProjects = 50 };
            context.Tenants.Add(t1);
            context.SaveChanges();

            var owner1 = new User
            {
                FirstName = "Owner",
                LastName = "One",
                Email = "owner1",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Owner@123"),
                Role = UserRole.TenantOwner,
                TenantId = t1.Id
            };
            context.Users.Add(owner1);

            context.Projects.Add(new Project { TenantId = t1.Id, Name = "Tenant 1 Alpha Project", Description = "T1 Block", StartDate = DateTime.UtcNow });
            context.SaveChanges();
        }

        if (!context.Tenants.Any(t => t.Name == "Tenant 2"))
        {
            var t2 = new Tenant { Name = "Tenant 2", SubscriptionPlan = SubscriptionPlan.Free, MaxActiveProjects = 2 };
            context.Tenants.Add(t2);
            context.SaveChanges();

            var owner2 = new User
            {
                FirstName = "Owner",
                LastName = "Two",
                Email = "owner2",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Owner@123"),
                Role = UserRole.TenantOwner,
                TenantId = t2.Id
            };
            context.Users.Add(owner2);

            // ── Fix Tenants with 0 MaxActiveProjects ───────────────────────
            var zeroQuotaTenants = context.Tenants.IgnoreQueryFilters().Where(t => t.MaxActiveProjects == 0).ToList();
            if (zeroQuotaTenants.Any())
            {
                foreach (var zt in zeroQuotaTenants)
                {
                    zt.MaxActiveProjects = zt.SubscriptionPlan switch
                    {
                        SubscriptionPlan.Premium => 50,
                        SubscriptionPlan.Standard => 10,
                        _ => 2
                    };
                }
                context.SaveChanges();
            }

            context.Projects.Add(new Project { TenantId = t2.Id, Name = "Tenant 2 Beta Project", Description = "T2 Block", StartDate = DateTime.UtcNow });
            context.SaveChanges();
        }

        try
        {
            var targetProj = context.Projects.IgnoreQueryFilters().FirstOrDefault(p => p.Id == Guid.Parse("436abb4b-529f-4a9a-b559-e2f5c66e071f"));
            if (targetProj != null)
            {
                var targetTenantId = Guid.Parse("65ea11dc-d7cd-48fe-917c-508d1be80632");
                if (targetProj.TenantId != targetTenantId)
                {
                    Console.WriteLine($"[PATCH] Aligning Project {targetProj.Id} tenant ID to {targetTenantId}");
                    targetProj.TenantId = targetTenantId;

                    var pools = context.ProjectCashPools.IgnoreQueryFilters().Where(p => p.ProjectId == targetProj.Id).ToList();
                    foreach (var pool in pools) pool.TenantId = targetTenantId;

                    var pettyCashes = context.PettyCashes.IgnoreQueryFilters().Where(p => p.ProjectId == targetProj.Id).ToList();
                    foreach (var pc in pettyCashes) pc.TenantId = targetTenantId;

                    var settlements = context.Settlements.IgnoreQueryFilters().Where(s => s.ProjectId == targetProj.Id).ToList();
                    foreach (var s in settlements) s.TenantId = targetTenantId;

                    context.SaveChanges();
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[PATCH ERROR] Failed to run database alignment patch: {ex.Message}");
        }

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
                Console.WriteLine($"[SECURITY CLEANUP] Sanitizing user record {user.Id}");
                user.FirstName = taintRegex.Replace(user.FirstName, "").Trim();
                user.LastName = taintRegex.Replace(user.LastName, "").Trim();
            }

            var dirtyTenants = context.Tenants.IgnoreQueryFilters()
                .Where(t => t.Name.Contains("DROP TABLE") || t.Name.Contains("--;"))
                .ToList();

            foreach (var tenant in dirtyTenants)
            {
                Console.WriteLine($"[SECURITY CLEANUP] Sanitizing tenant record {tenant.Id}");
                tenant.Name = taintRegex.Replace(tenant.Name, "").Trim();
            }

            var dirtyProjects = context.Projects.IgnoreQueryFilters()
                .Where(p => p.Name.Contains("DROP TABLE") || p.Name.Contains("--;"))
                .ToList();

            foreach (var proj in dirtyProjects)
            {
                Console.WriteLine($"[SECURITY CLEANUP] Sanitizing project record {proj.Id}");
                proj.Name = taintRegex.Replace(proj.Name, "").Trim();
            }

            if (dirtyUsers.Any() || dirtyTenants.Any() || dirtyProjects.Any())
            {
                context.SaveChanges();
                Console.WriteLine("[SECURITY CLEANUP] Tainted records sanitized successfully.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[SECURITY CLEANUP ERROR] Failed to run database cleanup: {ex.Message}");
        }
    }
    catch { /* Ignore if table doesn't exist yet */ }
}

// ------------------------------
// 5. HTTP PIPELINE CONFIGURATION
// ------------------------------

// Exception Handling First
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Request Sanitization & Taint Check Middleware
app.UseMiddleware<RequestSanitizationMiddleware>();

// Swagger (always enabled for this project)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Structo API v1");
    // NO RoutePrefix = string.Empty - keep default /swagger
});

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

// 🛡️ Automatic Database Migration on Startup (Railway / Cloud Deployment)
using (var scope = app.Services.CreateScope())
{
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<StructoDbContext>();
        Console.WriteLine("[Startup] Applying pending database migrations...");
        dbContext.Database.Migrate();
        Console.WriteLine("[Startup] Database migrations applied successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"[Startup Error] Failed to apply database migrations: {ex.Message}");
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
