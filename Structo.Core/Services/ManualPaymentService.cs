using Microsoft.EntityFrameworkCore;
using Structo.Core.DTOs.Subscription;
using Structo.Core.Entities;
using Structo.Core.Enums;
using Structo.Core.Interfaces;
using Structo.Core.Settings;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Structo.Core.Services;

/// <summary>
/// Manual InstaPay payments for extra-project packages: the tenant owner transfers money and sends the
/// receipt, a SuperAdmin verifies the bank and approves, which credits the quota exactly once.
/// </summary>
public class ManualPaymentService(
    DbContext context,
    ICloudStorageService storage,
    INotificationEngine notificationEngine,
    ITenantQuotaService quotaService,
    InstaPaySettings instaPay) : IManualPaymentService
{
    public const int MaxPendingPerTenant = 2;
    private const string ReceiptKeyPrefix = "private/instapay";
    private static readonly TimeSpan ScreenshotLinkLifetime = TimeSpan.FromMinutes(15);

    public bool IsInstaPayEnabled => instaPay.IsConfigured;

    public async Task<ManualPaymentResult> CreateAsync(Guid tenantId, Guid userId, string packageType)
    {
        if (!instaPay.IsConfigured)
            return new(ManualPaymentOutcome.Disabled, "INSTAPAY_DISABLED: InstaPay payments are not available right now.");

        // Quantity and price come only from the server price list
        var package = ProjectPackages.Find(packageType);
        if (package == null)
            return new(ManualPaymentOutcome.Invalid, "INVALID_PACKAGE: Unknown package.");

        var now = DateTime.UtcNow;
        var openRequests = await context.Set<ManualPaymentRequest>()
            .CountAsync(r => r.TenantId == tenantId && r.Status == ManualPaymentStatus.Pending && r.ExpiresAt > now);
        if (openRequests >= MaxPendingPerTenant)
            return new(ManualPaymentOutcome.Conflict,
                $"TOO_MANY_PENDING: You already have {MaxPendingPerTenant} payment requests awaiting review.");

        var request = new ManualPaymentRequest
        {
            TenantId = tenantId,
            RequestedByUserId = userId,
            PackageType = package.Type,
            ProjectsQuantity = package.Projects,
            AmountEgp = package.PriceEgp,
            ReferenceCode = await GenerateReferenceCodeAsync(),
            Status = ManualPaymentStatus.Pending,
            CreatedAt = now,
            ExpiresAt = now.Add(ManualPaymentRequest.Lifetime)
        };
        context.Set<ManualPaymentRequest>().Add(request);
        await context.SaveChangesAsync();

        var companyName = await TenantNameAsync(tenantId);
        try
        {
            await notificationEngine.RaiseManualPaymentSubmittedNotificationAsync(companyName, request.ReferenceCode, request.AmountEgp, receiptUploaded: false);
        }
        catch (Exception) { /* Notification delivery is best effort */ }

        return new(ManualPaymentOutcome.Ok, "Payment request created.", ToDto(request, companyName, forAdmin: false, now));
    }

    public async Task<IReadOnlyList<ManualPaymentRequestDto>> GetForTenantAsync(Guid tenantId)
    {
        var now = DateTime.UtcNow;
        var companyName = await TenantNameAsync(tenantId);
        var requests = await context.Set<ManualPaymentRequest>()
            .AsNoTracking()
            .Where(r => r.TenantId == tenantId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
        return requests.Select(r => ToDto(r, companyName, forAdmin: false, now)).ToList();
    }

    public async Task<ManualPaymentResult> AttachScreenshotAsync(Guid tenantId, Guid requestId, Stream content, string fileName, string contentType)
    {
        var now = DateTime.UtcNow;
        var request = await context.Set<ManualPaymentRequest>()
            .FirstOrDefaultAsync(r => r.Id == requestId && r.TenantId == tenantId);
        if (request == null)
            return new(ManualPaymentOutcome.NotFound, "Payment request not found.");
        if (request.EffectiveStatus(now) != ManualPaymentStatus.Pending)
            return new(ManualPaymentOutcome.Conflict, "REQUEST_CLOSED: Receipts can only be added to a pending request.");

        // Private prefix + random name; stored as a key, never as a public URL, and never as a SitePhoto
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        var key = $"{ReceiptKeyPrefix}/{tenantId:N}/{request.Id:N}/{Guid.NewGuid():N}{extension}";
        await storage.UploadFileDirectAsync(content, fileName, contentType, key);

        request.ScreenshotUrl = key;
        await context.SaveChangesAsync();

        var companyName = await TenantNameAsync(tenantId);
        try
        {
            await notificationEngine.RaiseManualPaymentSubmittedNotificationAsync(companyName, request.ReferenceCode, request.AmountEgp, receiptUploaded: true);
        }
        catch (Exception) { /* Notification delivery is best effort */ }

        return new(ManualPaymentOutcome.Ok, "Receipt uploaded.", ToDto(request, companyName, forAdmin: false, now));
    }

    public async Task<IReadOnlyList<ManualPaymentRequestDto>> GetAllForAdminAsync()
    {
        var now = DateTime.UtcNow;
        var rows = await context.Set<ManualPaymentRequest>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Select(r => new { Request = r, TenantName = r.Tenant != null ? r.Tenant.Name : string.Empty })
            .ToListAsync();

        // Actionable (pending, not expired) first, oldest first so nothing waits too long; then the rest, newest first
        return rows
            .Select(x => ToDto(x.Request, x.TenantName, forAdmin: true, now))
            .OrderBy(d => d.Status == nameof(ManualPaymentStatus.Pending) ? 0 : 1)
            .ThenBy(d => d.Status == nameof(ManualPaymentStatus.Pending) ? d.CreatedAt.Ticks : -d.CreatedAt.Ticks)
            .ToList();
    }

    public async Task<ManualPaymentResult> ApproveAsync(Guid requestId, Guid adminUserId)
    {
        var outcome = await quotaService.InTransactionAsync(async () =>
        {
            var now = DateTime.UtcNow;

            // Compare-and-set: only one caller can move this row out of Pending. A concurrent approve
            // (double click, two admins) waits on the row lock, re-checks the WHERE and updates 0 rows.
            var claimed = await context.Set<ManualPaymentRequest>()
                .IgnoreQueryFilters()
                .Where(r => r.Id == requestId && r.Status == ManualPaymentStatus.Pending && r.ExpiresAt > now)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(r => r.Status, ManualPaymentStatus.Approved)
                    .SetProperty(r => r.ReviewedByUserId, adminUserId)
                    .SetProperty(r => r.ReviewedAt, now));

            if (claimed == 0)
                return (Result: await ExplainNotPendingAsync(requestId, now, "approved"), Request: (ManualPaymentRequest?)null);

            var request = await context.Set<ManualPaymentRequest>()
                .IgnoreQueryFilters()
                .AsNoTracking()
                .FirstAsync(r => r.Id == requestId);

            var topUp = await quotaService.AddProjectsAsync(new QuotaTopUp(
                request.TenantId,
                request.ProjectsQuantity,
                request.AmountEgp,
                TransactionType: "InstaPayTopUp",
                PaymentGateway: "InstaPayManual",
                PaymentMethod: nameof(PaymentMethod.InstaPay),
                ReferenceNumber: request.ReferenceCode));

            if (topUp == null)
                throw new InvalidOperationException($"Tenant {request.TenantId} of payment request {requestId} no longer exists.");

            return (Result: new ManualPaymentResult(ManualPaymentOutcome.Ok,
                $"Approved: {request.ProjectsQuantity} project(s) added. New quota: {topUp.NewMaxActiveProjects}."), Request: request);
        });

        if (outcome.Request != null)
        {
            try
            {
                await notificationEngine.RaiseManualPaymentResultNotificationAsync(
                    outcome.Request.TenantId, outcome.Request.ReferenceCode, outcome.Request.ProjectsQuantity, approved: true, rejectReason: null);
            }
            catch (Exception) { /* Notification delivery is best effort */ }
        }

        return outcome.Result;
    }

    public async Task<ManualPaymentResult> RejectAsync(Guid requestId, Guid adminUserId, string reason, string? adminNote)
    {
        var cleanReason = Helpers.HtmlSanitizer.Sanitize(reason?.Trim()) ?? string.Empty;
        if (string.IsNullOrWhiteSpace(cleanReason))
            return new(ManualPaymentOutcome.Invalid, "REASON_REQUIRED: A reject reason is required.");
        if (cleanReason.Length > 500)
            return new(ManualPaymentOutcome.Invalid, "REASON_TOO_LONG: Keep the reason under 500 characters.");
        var cleanNote = Helpers.HtmlSanitizer.Sanitize(adminNote?.Trim());
        if (cleanNote?.Length > 1000)
            cleanNote = cleanNote[..1000];

        var now = DateTime.UtcNow;
        // Pending (expired or not) can be rejected; Approved/Rejected cannot change again
        var updated = await context.Set<ManualPaymentRequest>()
            .IgnoreQueryFilters()
            .Where(r => r.Id == requestId && r.Status == ManualPaymentStatus.Pending)
            .ExecuteUpdateAsync(s => s
                .SetProperty(r => r.Status, ManualPaymentStatus.Rejected)
                .SetProperty(r => r.ReviewedByUserId, adminUserId)
                .SetProperty(r => r.ReviewedAt, now)
                .SetProperty(r => r.RejectReason, cleanReason)
                .SetProperty(r => r.AdminNote, cleanNote));

        if (updated == 0)
            return await ExplainNotPendingAsync(requestId, now, "rejected");

        var request = await context.Set<ManualPaymentRequest>().IgnoreQueryFilters().AsNoTracking().FirstAsync(r => r.Id == requestId);
        try
        {
            await notificationEngine.RaiseManualPaymentResultNotificationAsync(
                request.TenantId, request.ReferenceCode, 0, approved: false, rejectReason: cleanReason);
        }
        catch (Exception) { /* Notification delivery is best effort */ }

        return new(ManualPaymentOutcome.Ok, "Payment request rejected.");
    }

    private async Task<ManualPaymentResult> ExplainNotPendingAsync(Guid requestId, DateTime now, string action)
    {
        var request = await context.Set<ManualPaymentRequest>().IgnoreQueryFilters().AsNoTracking().FirstOrDefaultAsync(r => r.Id == requestId);
        if (request == null)
            return new(ManualPaymentOutcome.NotFound, "Payment request not found.");

        return request.EffectiveStatus(now) switch
        {
            ManualPaymentStatus.Expired => new(ManualPaymentOutcome.Conflict, $"REQUEST_EXPIRED: This request expired and cannot be {action}."),
            var status => new(ManualPaymentOutcome.Conflict, $"ALREADY_PROCESSED: This request is already {status}.")
        };
    }

    private async Task<string> GenerateReferenceCodeAsync()
    {
        // OS-#### is easy to read aloud and type into a transfer note; widen to 6 digits if 4 keep colliding
        for (var attempt = 0; attempt < 20; attempt++)
        {
            var code = attempt < 10
                ? $"OS-{RandomNumberGenerator.GetInt32(1000, 10000)}"
                : $"OS-{RandomNumberGenerator.GetInt32(100000, 1000000)}";
            var taken = await context.Set<ManualPaymentRequest>().IgnoreQueryFilters().AnyAsync(r => r.ReferenceCode == code);
            if (!taken)
                return code;
        }
        throw new InvalidOperationException("Could not allocate a unique payment reference code.");
    }

    private async Task<string> TenantNameAsync(Guid tenantId) =>
        await context.Set<Tenant>().IgnoreQueryFilters().AsNoTracking()
            .Where(t => t.Id == tenantId).Select(t => t.Name).FirstOrDefaultAsync() ?? string.Empty;

    // The screenshot link is returned to both the owning tenant and SuperAdmins; AdminNote only to SuperAdmins
    private ManualPaymentRequestDto ToDto(ManualPaymentRequest r, string tenantName, bool forAdmin, DateTime now) => new()
    {
        Id = r.Id,
        TenantId = r.TenantId,
        TenantName = tenantName,
        PackageType = r.PackageType,
        ProjectsQuantity = r.ProjectsQuantity,
        AmountEgp = r.AmountEgp,
        ReferenceCode = r.ReferenceCode,
        Status = r.EffectiveStatus(now).ToString(),
        HasScreenshot = !string.IsNullOrEmpty(r.ScreenshotUrl),
        ScreenshotUrl = !string.IsNullOrEmpty(r.ScreenshotUrl)
            ? storage.GetPrivateReadUrl(r.ScreenshotUrl, ScreenshotLinkLifetime)
            : null,
        CreatedAt = r.CreatedAt,
        ExpiresAt = r.ExpiresAt,
        ReviewedAt = r.ReviewedAt,
        RejectReason = r.RejectReason,
        AdminNote = forAdmin ? r.AdminNote : null,
        InstaPayNumber = instaPay.IsConfigured ? instaPay.Number : null,
        WhatsAppNumber = instaPay.IsConfigured ? instaPay.WhatsAppNumber : null
    };
}
