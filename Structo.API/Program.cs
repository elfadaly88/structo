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
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => 
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader());
});
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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add HTTP Context Accessor and Tenant Accessor
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ITenantContextAccessor, TenantContextAccessor>();
builder.Services.AddScoped<IPettyCashService, PettyCashService>();

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
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
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
    catch { /* Ignore if it cannot migrate yet */ }

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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
