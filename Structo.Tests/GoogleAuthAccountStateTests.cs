using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Structo.API.Services;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Infrastructure.Auth;
using Structo.Infrastructure.Data;

namespace Structo.Tests;

/// <summary>
/// AUTH-022 regression: Google sign-in applies the same account/tenant checks as password login.
/// Runs against a disposable PostgreSQL database given in OSOS_TEST_DB (e.g. the osos-qa-pg container);
/// the tests are no-ops when it is not set.
/// </summary>
public class GoogleAuthAccountStateTests
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("OSOS_TEST_DB");

    private static (StructoDbContext Db, GoogleAuthService Service) Create()
    {
        var db = new StructoDbContext(new DbContextOptionsBuilder<StructoDbContext>().UseNpgsql(ConnectionString).Options);
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["JwtSettings:Secret"] = new string('k', 48) })
            .Build();
        return (db, new GoogleAuthService(db, config, NullLogger<GoogleAuthService>.Instance, new JwtTokenProvider(config)));
    }

    private static async Task<User> SeedUserAsync(StructoDbContext db, bool isActive, TenantStatus tenantStatus)
    {
        var tenant = new Tenant { Name = "QA Google " + Guid.NewGuid().ToString("N")[..6], Status = tenantStatus, MaxActiveProjects = 2 };
        var user = new User
        {
            Email = $"qa.google.{Guid.NewGuid():N}@osos.test",
            FirstName = "QA",
            LastName = "Google",
            Role = UserRole.SiteEngineer,
            TenantId = tenant.Id,
            IsActive = isActive,
            IsApproved = true,
            PasswordHash = "x"
        };
        db.Tenants.Add(tenant);
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return user;
    }

    [Fact]
    public async Task DeactivatedUser_IsRejected_AndStaysDeactivated()
    {
        if (ConnectionString == null) return;
        var (db, service) = Create();
        var user = await SeedUserAsync(db, isActive: false, TenantStatus.Active);

        var result = await service.SignInVerifiedGoogleUserAsync(user.Email, "QA", "Google");

        Assert.False(result.Success);
        Assert.Equal("AUTH.ACCOUNT_DEACTIVATED", result.Message);
        var stored = await db.Users.IgnoreQueryFilters().AsNoTracking().SingleAsync(u => u.Id == user.Id);
        Assert.False(stored.IsActive);
        Assert.Null(stored.RefreshToken);
    }

    [Fact]
    public async Task UserOfSuspendedTenant_IsRejected()
    {
        if (ConnectionString == null) return;
        var (db, service) = Create();
        var user = await SeedUserAsync(db, isActive: true, TenantStatus.Suspended);

        var result = await service.SignInVerifiedGoogleUserAsync(user.Email, "QA", "Google");

        Assert.False(result.Success);
        Assert.Contains("تعليق حساب شركتكم", result.Message);
    }

    [Fact]
    public async Task ActiveUser_OfActiveTenant_SignsIn()
    {
        if (ConnectionString == null) return;
        var (db, service) = Create();
        var user = await SeedUserAsync(db, isActive: true, TenantStatus.Active);

        var result = await service.SignInVerifiedGoogleUserAsync(user.Email, "QA", "Google");

        Assert.True(result.Success);
        Assert.Equal(user.Id, result.Data!.UserId);
    }
}
