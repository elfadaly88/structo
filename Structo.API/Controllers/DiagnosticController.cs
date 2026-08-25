using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Structo.Infrastructure.Data;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/diagnostic")]
[AllowAnonymous]
public class DiagnosticController : ControllerBase
{
    private readonly StructoDbContext _context;

    public DiagnosticController(StructoDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Temporary diagnostic endpoint to verify real User and Tenant identification directly on live database.
    /// Access via: /api/diagnostic/user-tenant?email=amr.montaser.emcg@gmail.com
    /// </summary>
    [HttpGet("user-tenant")]
    public async Task<IActionResult> GetUserTenant([FromQuery] string email = "amr.montaser.emcg@gmail.com")
    {
        var normalizedEmail = email.Trim().ToLowerInvariant();

        var user = await _context.Users
            .IgnoreQueryFilters()
            .Include(u => u.Tenant)
            .FirstOrDefaultAsync(u => u.Email.ToLower() == normalizedEmail);

        if (user == null)
        {
            // List all users to help locate the correct account if spelling differs
            var allUsers = await _context.Users
                .IgnoreQueryFilters()
                .Select(u => new
                {
                    u.Id,
                    u.Email,
                    u.TenantId,
                    u.FirstName,
                    u.LastName
                })
                .Take(50)
                .ToListAsync();

            return NotFound(new
            {
                success = false,
                message = $"No user found with email: {email}",
                availableUsersCount = allUsers.Count,
                availableUsers = allUsers
            });
        }

        return Ok(new
        {
            success = true,
            userId = user.Id,
            userEmail = user.Email,
            firstName = user.FirstName,
            lastName = user.LastName,
            tenantId = user.TenantId,
            tenantName = user.Tenant?.Name,
            tenantPlan = user.Tenant?.SubscriptionPlan.ToString(),
            tenantMaxProjects = user.Tenant?.MaxActiveProjects,
            tenantStatus = user.Tenant?.Status.ToString(),
            userCreatedAt = user.CreatedAt
        });
    }

    /// <summary>
    /// Temporary diagnostic endpoint to verify PaymentAttempts rows directly on live database.
    /// Access via: /api/diagnostic/payment-attempts?tenantId=1c12b0cf-8505-4d0a-8d55-617daf3f30a2
    /// </summary>
    [HttpGet("payment-attempts")]
    public async Task<IActionResult> GetPaymentAttempts([FromQuery] Guid? tenantId)
    {
        var targetTenantId = tenantId ?? Guid.Parse("1c12b0cf-8505-4d0a-8d55-617daf3f30a2");

        var attempts = await _context.PaymentAttempts
            .IgnoreQueryFilters()
            .Where(pa => pa.TenantId == targetTenantId || pa.PaymobOrderId == "594308791")
            .OrderByDescending(pa => pa.CreatedAt)
            .ToListAsync();

        return Ok(new
        {
            success = true,
            tenantId = targetTenantId,
            attemptsCount = attempts.Count,
            attempts
        });
    }
}
