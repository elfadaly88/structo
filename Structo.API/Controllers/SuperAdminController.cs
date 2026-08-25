using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Common;
using Structo.Core.DTOs.Subscription;
using Structo.Core.DTOs.Tenants;
using Structo.Core.DTOs.Users;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Structo.API.Controllers;

[ApiController]
[Route("api/superadmin")]
[Authorize(Roles = "SuperAdmin,PlatformOwner")]
public class SuperAdminController : ControllerBase
{
    private readonly StructoDbContext _context;
    private readonly ITenantCleanupService _tenantCleanupService;
    private readonly ILogger<SuperAdminController> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public SuperAdminController(
        StructoDbContext context,
        ITenantCleanupService tenantCleanupService,
        ILogger<SuperAdminController> logger,
        IServiceScopeFactory scopeFactory)
    {
        _context = context;
        _tenantCleanupService = tenantCleanupService;
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    [HttpGet("pending-users")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetPendingUsers()
    {
        try
        {
            var pendingUsers = await _context.Users.IgnoreQueryFilters()
                .AsNoTracking()
                .Include(u => u.Tenant)
                .Where(u => !u.IsApproved)
                .OrderByDescending(u => u.CreatedAt)
                .Select(u => new PendingUserDto
                {
                    Id = u.Id,
                    TenantId = u.TenantId,
                    TenantName = u.Tenant != null ? u.Tenant.Name : null,
                    SubscriptionPlan = u.Tenant != null ? u.Tenant.SubscriptionPlan.ToString() : null,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    PersonalPhone = u.PersonalPhone,
                    WhatsAppPhone = u.WhatsAppPhone,
                    Role = u.Role.ToString(),
                    IsActive = u.IsActive,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();

            return Ok(new ApiResponse<List<PendingUserDto>>
            {
                Success = true,
                Message = "Pending users retrieved successfully.",
                Data = pendingUsers
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve pending users.");
            return StatusCode(500, new ApiResponse<List<PendingUserDto>>
            {
                Success = false,
                Message = "An error occurred while retrieving pending users."
            });
        }
    }

    // [HttpPost("approve/{userId}")]
    // public async Task<ActionResult<ApiResponse<bool>>> ApproveUser(Guid userId)
    // {
    //     try
    //     {
    //         var user = await _context.Users.IgnoreQueryFilters()
    //             .Include(u => u.Tenant)
    //             .FirstOrDefaultAsync(u => u.Id == userId);

    //         if (user == null)
    //         {
    //             return NotFound(new ApiResponse<bool>
    //             {
    //                 Success = false,
    //                 Message = "User not found."
    //             });
    //         }

    //         if (user.IsApproved)
    //         {
    //             return BadRequest(new ApiResponse<bool>
    //             {
    //                 Success = false,
    //                 Message = "User is already approved."
    //             });
    //         }

    //         user.IsApproved = true;
    //         user.IsActive = true;

    //         if (user.Role == UserRole.TenantOwner && user.Tenant != null && user.Tenant.Status == TenantStatus.PendingApproval)
    //         {
    //             user.Tenant.Status = TenantStatus.Active;
    //         }

    //         await _context.SaveChangesAsync();

    //         _ = Task.Run(async () =>
    //         {
    //             try
    //             {
    //                 using var scope = _scopeFactory.CreateScope();
    //                 var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
    //                 await emailService.SendWelcomeEmailAsync(user.Email, $"{user.FirstName} {user.LastName}");
    //             }
    //             catch (Exception ex)
    //             {
    //                 _logger.LogError(ex, "Background error sending welcome email to {Email}", user.Email);
    //             }
    //         });

    //         return Ok(new ApiResponse<bool>
    //         {
    //             Success = true,
    //             Message = "User approved successfully.",
    //             Data = true
    //         });
    //     }
    //     catch (Exception ex)
    //     {
    //         _logger.LogError(ex, "Failed to approve user {UserId}", userId);
    //         return StatusCode(500, new ApiResponse<bool>
    //         {
    //             Success = false,
    //             Message = "An error occurred during approval process."
    //         });
    //     }
    // }

    [HttpPost("approve/{userId}")]
    public async Task<ActionResult<ApiResponse<bool>>> ApproveUser(string userId)
    {
        try
        {

            if (!Guid.TryParse(userId, out Guid parsedUserId))
            {
                return BadRequest(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "Invalid User ID format."
                });
            }
            var user = await _context.Users.IgnoreQueryFilters()
                .Include(u => u.Tenant)
                .FirstOrDefaultAsync(u => u.Id == parsedUserId);

            if (user == null)
            {
                return NotFound(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "User not found."
                });
            }

            if (user.IsApproved)
            {
                return BadRequest(new ApiResponse<bool>
                {
                    Success = false,
                    Message = "User is already approved."
                });
            }

            user.IsApproved = true;
            user.IsActive = true;

            bool isTenantActivated = false;
            string tenantName = string.Empty;

            if (user.Role == UserRole.TenantOwner && user.Tenant != null && user.Tenant.Status == TenantStatus.PendingApproval)
            {
                user.Tenant.Status = TenantStatus.Active;
                isTenantActivated = true;
                tenantName = user.Tenant.Name;
                
                switch (user.Tenant.SubscriptionPlan)
                {
                    case SubscriptionPlan.Free:
                        user.Tenant.MaxActiveProjects = 2;
                        break;
                    case SubscriptionPlan.Standard:
                        user.Tenant.MaxActiveProjects = 10;
                        break;
                    case SubscriptionPlan.Premium:
                        user.Tenant.MaxActiveProjects = 50;
                        break;
                    default:
                        user.Tenant.MaxActiveProjects = 2;
                        break;
                }
            }

            // 1. حفظ التغييرات أولاً للتأكد من نزولها الداتابيز بنجاح
            await _context.SaveChangesAsync();

            // 2. 💡 الحل السحري: استخراج البيانات كـ Variables منفصلة قبل الـ Task.Run
            var targetEmail = user.Email;
            var targetFullName = $"{user.FirstName} {user.LastName}";

            // 3. تشغيل الـ Background Task بأمان كامل بدون تمرير الـ user Entity
            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _scopeFactory.CreateScope();
                    var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
                    await emailService.SendWelcomeEmailAsync(targetEmail, targetFullName); // 👈 استخدام المتغيرات الآمنة
                    
                    if (isTenantActivated && !string.IsNullOrEmpty(tenantName))
                    {
                        await emailService.SendTenantActivatedEmailAsync(targetEmail, targetFullName, tenantName);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Background error sending welcome/activation email to {Email}", targetEmail);
                }
            });

            return Ok(new ApiResponse<bool>
            {
                Success = true,
                Message = "User approved successfully.",
                Data = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to approve user {UserId}", userId);
            return StatusCode(500, new ApiResponse<bool>
            {
                Success = false,
                Message = "An error occurred during approval process."
            });
        }
    }

    /// <summary>
    /// GET /api/admin/tenants/lifecycle-summary & GET /api/superadmin/tenants/lifecycle-summary
    /// Returns counts of Active, Suspended, and Pending-Deletion tenants, along with estimated total project count.
    /// </summary>
    [HttpGet("tenants/lifecycle-summary")]
    [HttpGet("/api/admin/tenants/lifecycle-summary")]
    public async Task<ActionResult<ApiResponse<TenantLifecycleSummaryDto>>> GetLifecycleSummary(CancellationToken cancellationToken)
    {
        try
        {
            var summary = await _tenantCleanupService.GetLifecycleSummaryAsync(cancellationToken);
            return Ok(new ApiResponse<TenantLifecycleSummaryDto>
            {
                Success = true,
                Message = "Tenant lifecycle summary retrieved successfully.",
                Data = summary
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve tenant lifecycle summary.");
            return StatusCode(500, new ApiResponse<TenantLifecycleSummaryDto>
            {
                Success = false,
                Message = "An error occurred while retrieving tenant lifecycle summary."
            });
        }
    }

    /// <summary>
    /// GET /api/admin/tenants & GET /api/superadmin/tenants
    /// Returns paginated list of tenants with PlanType, LastActiveAt, DaysInactive, Status, and storage footprint.
    /// </summary>
    [HttpGet("tenants")]
    [HttpGet("/api/admin/tenants")]
    public async Task<ActionResult<ApiResponse<AdminTenantPagedResultDto>>> GetAdminTenants(
        [FromQuery] AdminTenantQueryDto query,
        CancellationToken cancellationToken)
    {
        try
        {
            var result = await _tenantCleanupService.GetAdminTenantsAsync(query, cancellationToken);
            return Ok(new ApiResponse<AdminTenantPagedResultDto>
            {
                Success = true,
                Message = "Tenants retrieved successfully.",
                Data = result
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve tenants list for admin.");
            return StatusCode(500, new ApiResponse<AdminTenantPagedResultDto>
            {
                Success = false,
                Message = "An error occurred while retrieving tenants."
            });
        }
    }

    /// <summary>
    /// POST /api/admin/tenants/{id}/force-purge & POST /api/superadmin/tenants/{id}/force-purge
    /// Manually triggers immediate hard purge (Database + Storage) for that tenant.
    /// </summary>
    [HttpPost("tenants/{id}/force-purge")]
    [HttpPost("/api/admin/tenants/{id}/force-purge")]
    public async Task<ActionResult<ApiResponse<ForcePurgeResultDto>>> ForcePurge(Guid id, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogWarning("[ADMIN FORCE PURGE] Manual hard purge requested by admin for Tenant: {TenantId}", id);
            var result = await _tenantCleanupService.PurgeTenantAsync(id, isAutomatic: false, cancellationToken);
            
            if (!result.Success)
            {
                return BadRequest(new ApiResponse<ForcePurgeResultDto>
                {
                    Success = false,
                    Message = result.Message,
                    Data = result
                });
            }

            return Ok(new ApiResponse<ForcePurgeResultDto>
            {
                Success = true,
                Message = result.Message,
                Data = result
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to execute force purge for Tenant: {TenantId}", id);
            return StatusCode(500, new ApiResponse<ForcePurgeResultDto>
            {
                Success = false,
                Message = $"An error occurred during tenant force purge: {ex.Message}"
            });
        }
    }

    /// <summary>
    /// POST /api/admin/tenants/{id}/exempt & POST /api/superadmin/tenants/{id}/exempt
    /// Sets an exemption flag to bypass automated cleanup routines.
    /// </summary>
    [HttpPost("tenants/{id}/exempt")]
    [HttpPost("/api/admin/tenants/{id}/exempt")]
    public async Task<ActionResult<ApiResponse<ExemptionToggleResponseDto>>> ToggleExemption(
        Guid id,
        [FromBody] ExemptionToggleRequestDto? dto,
        CancellationToken cancellationToken)
    {
        try
        {
            var result = await _tenantCleanupService.ToggleCleanupExemptionAsync(id, dto?.IsExempt, cancellationToken);
            return Ok(new ApiResponse<ExemptionToggleResponseDto>
            {
                Success = true,
                Message = result.Message,
                Data = result
            });
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new ApiResponse<ExemptionToggleResponseDto>
            {
                Success = false,
                Message = "Tenant not found."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to toggle cleanup exemption for Tenant: {TenantId}", id);
            return StatusCode(500, new ApiResponse<ExemptionToggleResponseDto>
            {
                Success = false,
                Message = "An error occurred while updating cleanup exemption."
            });
        }
    }

    /// <summary>
    /// Global Payments and Paymob Webhook Audit Endpoint for SuperAdmin.
    /// Provides platform-wide KPIs, stale/never-arrived alerts, tenant summaries, and attempt logs.
    /// </summary>
    [HttpGet("payments")]
    [HttpGet("payment-audit")]
    public async Task<ActionResult<ApiResponse<AdminPaymentsResponseDto>>> GetPaymentsAudit()
    {
        try
        {
            var staleThreshold = DateTime.UtcNow.AddMinutes(-15);

            var attempts = await _context.PaymentAttempts
                .IgnoreQueryFilters()
                .Include(pa => pa.Tenant)
                .Include(pa => pa.User)
                .Include(pa => pa.LinkedTransaction)
                .OrderByDescending(pa => pa.CreatedAt)
                .ToListAsync();

            bool hasStaleUpdates = false;
            var dtoList = new List<PaymentAttemptDto>();

            foreach (var pa in attempts)
            {
                var isStalePending = pa.WebhookStatus == "Pending" && pa.CreatedAt < staleThreshold;
                if (isStalePending)
                {
                    pa.WebhookStatus = "NeverArrived";
                    pa.ErrorMessage ??= "لم يصل إشعار الدفع من باي موب (تجاوزت المهلة 15 دقيقة)";
                    hasStaleUpdates = true;
                }

                dtoList.Add(new PaymentAttemptDto
                {
                    Id = pa.Id,
                    TenantId = pa.TenantId,
                    TenantName = pa.Tenant?.Name ?? "منشأة غير معروفة",
                    UserId = pa.UserId,
                    UserEmail = pa.User?.Email,
                    UserName = pa.User != null ? $"{pa.User.FirstName} {pa.User.LastName}".Trim() : null,
                    Amount = pa.Amount,
                    PlanRequested = pa.PlanRequested,
                    ExtraProjectsCount = pa.ExtraProjectsCount,
                    PaymobOrderId = pa.PaymobOrderId,
                    SpecialReference = pa.SpecialReference,
                    CreatedAt = pa.CreatedAt,
                    WebhookReceivedAt = pa.WebhookReceivedAt,
                    WebhookStatus = pa.WebhookStatus,
                    LinkedTransactionId = pa.LinkedTransactionId,
                    ReferenceNumber = pa.LinkedTransaction?.ReferenceNumber,
                    PaymentMethod = pa.LinkedTransaction?.PaymentMethod ?? "Paymob Card",
                    ErrorMessage = pa.ErrorMessage,
                    IsStaleUnconfirmed = pa.WebhookStatus == "NeverArrived" || pa.WebhookStatus == "HmacFailed"
                });
            }

            if (hasStaleUpdates)
            {
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch { /* Best-effort status persistence */ }
            }

            var summary = new AdminPaymentsSummaryDto
            {
                TotalAttemptsCount = dtoList.Count,
                ConfirmedCount = dtoList.Count(a => a.WebhookStatus == "Confirmed"),
                NeverArrivedCount = dtoList.Count(a => a.WebhookStatus == "NeverArrived"),
                HmacFailedCount = dtoList.Count(a => a.WebhookStatus == "HmacFailed"),
                PendingCount = dtoList.Count(a => a.WebhookStatus == "Pending"),
                TotalRevenueEgp = dtoList.Where(a => a.WebhookStatus == "Confirmed").Sum(a => a.Amount),
                NeverArrivedTotalAmountEgp = dtoList.Where(a => a.WebhookStatus == "NeverArrived").Sum(a => a.Amount)
            };

            // Aggregate by tenant
            var allTenants = await _context.Tenants
                .IgnoreQueryFilters()
                .ToListAsync();

            var tenantSummaries = new List<TenantPaymentSummaryDto>();

            foreach (var t in allTenants)
            {
                var tenantAttempts = dtoList.Where(a => a.TenantId == t.Id).ToList();
                var confirmedList = tenantAttempts.Where(a => a.WebhookStatus == "Confirmed").ToList();
                var neverArrivedList = tenantAttempts.Where(a => a.WebhookStatus == "NeverArrived").ToList();

                if (tenantAttempts.Count > 0)
                {
                    tenantSummaries.Add(new TenantPaymentSummaryDto
                    {
                        TenantId = t.Id,
                        TenantName = t.Name,
                        SubscriptionPlan = t.SubscriptionPlan.ToString(),
                        MaxActiveProjects = t.MaxActiveProjects,
                        ConfirmedPurchasesCount = confirmedList.Count,
                        TotalAmountSpentEgp = confirmedList.Sum(c => c.Amount),
                        NeverArrivedAttemptsCount = neverArrivedList.Count,
                        LastAttemptAt = tenantAttempts.Max(a => a.CreatedAt),
                        HasNeverArrivedAlert = neverArrivedList.Count > 0
                    });
                }
            }

            // Order tenant summaries by HasNeverArrivedAlert desc, then TotalAmountSpent desc
            tenantSummaries = tenantSummaries
                .OrderByDescending(ts => ts.HasNeverArrivedAlert)
                .ThenByDescending(ts => ts.TotalAmountSpentEgp)
                .ToList();

            var result = new AdminPaymentsResponseDto
            {
                Summary = summary,
                TenantsSummary = tenantSummaries,
                Attempts = dtoList
            };

            return Ok(new ApiResponse<AdminPaymentsResponseDto>
            {
                Success = true,
                Message = "تم جلب تقرير تدقيق المدفوعات والـ Webhooks بنجاح.",
                Data = result
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve global payments audit.");
            return StatusCode(500, new ApiResponse<AdminPaymentsResponseDto>
            {
                Success = false,
                Message = "حدث خطأ أثناء جلب تقرير تدقيق المدفوعات."
            });
        }
    }
}

public class PendingUserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PersonalPhone { get; set; }
    public string? WhatsAppPhone { get; set; }
    public string Role { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid? TenantId { get; set; }
    public string? TenantName { get; set; }
    public string? SubscriptionPlan { get; set; }
}

