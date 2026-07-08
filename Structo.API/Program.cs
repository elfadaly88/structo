using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
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

// 1. FIRST: Preserve JWT Claim Type Map - ABSOLUTELY AT THE TOP
System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

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
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressModelStateInvalidFilter = true;
    });

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200", "https://structo-production.up.railway.app")
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
    var databaseUrl = builder.Configuration["DATABASE_URL"];
    string connectionString = string.Empty;

    if (!string.IsNullOrEmpty(databaseUrl) && databaseUrl.StartsWith("postgresql://"))
    {
        try
        {
            var databaseUri = new Uri(databaseUrl);
            var userInfo = databaseUri.UserInfo.Split(':');
            connectionString = $"Host={databaseUri.Host};Port={databaseUri.Port};Database={databaseUri.LocalPath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};Maximum Pool Size=20;SSL Mode=Require;Trust Server Certificate=true;";
        }
        catch (Exception ex) { Console.WriteLine($"Error parsing DATABASE_URL: {ex.Message}"); }
    }
    
    if (string.IsNullOrEmpty(connectionString))
    {
        connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
            ?? "Host=localhost;Port=5444;Database=StructoDb;Username=postgres;Password=NewStrongPassword123";
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
builder.Services.Configure<Structo.Core.Settings.CloudflareR2Settings>(builder.Configuration.GetSection("CloudflareR2"));

// Cloud Storage Service
builder.Services.AddSingleton<Amazon.S3.IAmazonS3>(sp =>
{
    var settings = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<Structo.Core.Settings.CloudflareR2Settings>>().Value;
    var serviceUrl = builder.Configuration["CloudflareR2:ServiceUrl"]?.Replace("http://", "https://");
    
    var config = new Amazon.S3.AmazonS3Config
    {
        ServiceURL = serviceUrl,
        UseHttp = false,
        ForcePathStyle = true,
        AuthenticationRegion = "auto",
        HttpClientFactory = new CustomAwsHttpClientFactory()
    };

    var credentials = new Amazon.Runtime.BasicAWSCredentials(settings.AccessKeyId, settings.SecretAccessKey);
    return new Amazon.S3.AmazonS3Client(credentials, config);
});
builder.Services.AddScoped<Structo.Core.Interfaces.ICloudStorageService, Structo.Infrastructure.Storage.CloudflareR2StorageService>();

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
builder.Services.AddScoped<Structo.Core.Interfaces.INotificationEngine, Structo.Core.Services.NotificationEngine>();

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"] ?? "SuperSecretKeyThatShouldBeAtLeast32BytesLongForHS256ToWorkProperly!";
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
            var superAdmin = new User
            {
                FirstName = "Super",
                LastName = "Admin",
                Email = "superadmin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("SuperAdmin@123"),
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
    }
    catch { /* Ignore if table doesn't exist yet */ }
}

// ------------------------------
// 5. HTTP PIPELINE CONFIGURATION
// ------------------------------

// Exception Handling First
app.UseMiddleware<ExceptionHandlingMiddleware>();

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

// Serve from correct location (prefer wwwroot/ if you manually copied files there, otherwise wwwroot/browser/)
if (File.Exists(rootIndexPath))
{
    // Serve directly from wwwroot/ (manual copy case)
    app.UseStaticFiles(new StaticFileOptions { ContentTypeProvider = provider });
}
else if (File.Exists(browserIndexPath))
{
    // Serve from wwwroot/browser/ (new Angular default output)
    app.UseStaticFiles(new StaticFileOptions
    {
        ContentTypeProvider = provider,
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(angularOutputPath),
        RequestPath = ""
    });
}
else
{
    // Fallback: Serve whatever is in wwwroot
    app.UseStaticFiles(new StaticFileOptions { ContentTypeProvider = provider });
}

// CORS, Auth, Authorization
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();

// MAP CONTROLLERS and HUB FIRST (BEFORE SPA FALLBACK!)
app.MapControllers();
app.MapHub<NotificationHub>("/hubs/notifications");

// MAP SPA FALLBACK: Serve index.html from correct location
if (File.Exists(rootIndexPath))
{
    app.MapFallbackToFile("index.html");
}
else if (File.Exists(browserIndexPath))
{
    app.MapFallbackToFile("index.html", new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(angularOutputPath)
    });
}

// Expose Service Provider for Global Access
Structo.API.Program.AppServices = app.Services;

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
            ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true,
            SslProtocols = System.Security.Authentication.SslProtocols.Tls12 | System.Security.Authentication.SslProtocols.Tls13
        };
        return new System.Net.Http.HttpClient(handler);
    }
}
