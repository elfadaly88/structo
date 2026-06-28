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
System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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
        options.SuppressModelStateInvalidFilter = true; // Supress default 400 ProblemDetails
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200", "https://structo-production.up.railway.app") // ضيف لين السيرفر بتاعك هنا
              .AllowAnyMethod()
              .AllowAnyHeader());
});
builder.Services.AddDataProtection()
    .PersistKeysToDbContext<StructoDbContext>();
// Register FluentValidation





builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<ProjectCreateDtoValidator>();

builder.Services.AddEndpointsApiExplorer();

// Swagger with JWT Support
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

// Configure Entity Framework and PostgreSQL
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

        // 👇 السطر السحري الجديد لمنع المشكلة جوه .NET 9 👇
        .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.RelationalEventId.PendingModelChangesWarning));
});
// Add HTTP Context Accessor and Tenant Accessor
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ITenantContextAccessor, TenantContextAccessor>();
builder.Services.AddScoped<DbContext>(provider => provider.GetRequiredService<StructoDbContext>());
builder.Services.Configure<Structo.Core.Settings.CloudflareR2Settings>(builder.Configuration.GetSection("CloudflareR2"));

// AWS S3/R2 Configuration
builder.Services.AddHttpClient("R2Client").ConfigurePrimaryHttpMessageHandler(() =>
{
    return new HttpClientHandler
    {
        ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true,
        SslProtocols = System.Security.Authentication.SslProtocols.Tls12 | System.Security.Authentication.SslProtocols.Tls13
    };
});

builder.Services.AddSingleton<Amazon.S3.IAmazonS3>(sp =>
{
    var settings = sp.GetRequiredService<Microsoft.Extensions.Options.IOptions<Structo.Core.Settings.CloudflareR2Settings>>().Value;
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();

    var config = new Amazon.S3.AmazonS3Config
    {
        ServiceURL = settings.ServiceUrl,
        ForcePathStyle = true,
        AuthenticationRegion = "auto",
        HttpClientFactory = new Structo.Infrastructure.Storage.R2HttpClientFactory(httpClientFactory.CreateClient("R2Client"))
    };
    var credentials = new Amazon.Runtime.BasicAWSCredentials(settings.AccessKeyId, settings.SecretAccessKey);
    return new Amazon.S3.AmazonS3Client(credentials, config);
});

builder.Services.AddScoped<Structo.Core.Interfaces.ICloudStorageService, Structo.Infrastructure.Storage.CloudflareR2StorageService>();

// Phase 2: Auth and User Management Services
builder.Services.AddScoped<Structo.Core.Interfaces.ITokenProvider, Structo.Infrastructure.Auth.JwtTokenProvider>();
builder.Services.AddScoped<Structo.Core.Interfaces.IAuthService, Structo.Core.Services.AuthService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IUserService, Structo.Core.Services.UserService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IProjectService, Structo.Core.Services.ProjectService>();
builder.Services.AddScoped<Structo.Core.Interfaces.IFinancialTransactionService, Structo.Core.Services.FinancialTransactionService>();
// Note: IPettyCashService is already registered on line 112, but we need to ensure it uses the Core implementation.
builder.Services.AddScoped<Structo.Core.Interfaces.IPettyCashService, Structo.Core.Services.PettyCashService>();

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

        // 🔥 ضيف السطرين السحريين دول هنا جوه الاوبجكت 👇
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Seed SuperAdmin
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<StructoDbContext>();
    try
    {
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
                TenantId = null // Global
            };
            context.Users.Add(superAdmin);
            context.SaveChanges();
        }

        // Seed Tenant 1 and Owner 1
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

            // Optional: Seed a project for testing
            context.Projects.Add(new Project { TenantId = t1.Id, Name = "Tenant 1 Alpha Project", Description = "T1 Block", StartDate = DateTime.UtcNow });
            context.SaveChanges();
        }

        // Seed Tenant 2 and Owner 2
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

            // Optional: Seed a project for testing
            context.Projects.Add(new Project { TenantId = t2.Id, Name = "Tenant 2 Beta Project", Description = "T2 Block", StartDate = DateTime.UtcNow });
            context.SaveChanges();
        }
    }
    catch { /* Ignore if table doesn't exist yet */ }
}

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionHandlingMiddleware>();

//if (app.Environment.IsDevelopment())
//{
app.UseSwagger();
app.UseSwaggerUI(c =>
{

    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Structo API v1");    
});//}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");
Structo.API.Program.AppServices = app.Services;
app.Run();

namespace Structo.API 
{ 
    public partial class Program 
    { 
        public static IServiceProvider AppServices { get; set; } = default!;
    } 
}
