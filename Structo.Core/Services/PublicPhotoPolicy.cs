using Microsoft.EntityFrameworkCore;
using Structo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Structo.Core.Services;

/// <summary>
/// The single rule for which site photos may be shown to the public (client tracker and contractor portfolio).
/// Allow-list of client-facing categories, minus any URL that is also a financial receipt/invoice or an
/// internal task attachment in the same projects.
/// </summary>
public static class PublicPhotoPolicy
{
    public static readonly string[] PublicCategories = { "SiteProgress", "PublicGallery" };

    /// <summary>Public photos of the given projects, newest first. Bypasses tenant filters (public endpoints).</summary>
    public static async Task<List<SitePhoto>> GetPublicPhotosAsync(DbContext context, ICollection<Guid> projectIds)
    {
        // Receipts may be uploaded through the gallery endpoint, so any URL used as a receipt is excluded too
        var receiptUrls = context.Set<PettyCash>().IgnoreQueryFilters()
                .Where(p => projectIds.Contains(p.ProjectId) && p.ReceiptPhotoUrl != "")
                .Select(p => p.ReceiptPhotoUrl)
            .Concat(context.Set<FinancialTransaction>().IgnoreQueryFilters()
                .Where(t => projectIds.Contains(t.ProjectId) && t.ReceiptPhotoUrl != null)
                .Select(t => t.ReceiptPhotoUrl!))
            .Concat(context.Set<SettlementLine>().IgnoreQueryFilters()
                .Where(l => projectIds.Contains(l.Settlement!.ProjectId) && l.InvoiceUrl != null)
                .Select(l => l.InvoiceUrl!));

        var photos = await context.Set<SitePhoto>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(sp => projectIds.Contains(sp.ProjectId)
                && sp.PhotoUrl != ""
                && PublicCategories.Contains(sp.Category)
                && !receiptUrls.Contains(sp.PhotoUrl))
            .OrderByDescending(sp => sp.UploadedAt)
            .ToListAsync();

        var taskAttachmentUrls = await context.Set<SiteTask>()
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(t => projectIds.Contains(t.ProjectId))
            .SelectMany(t => t.AttachmentUrls)
            .ToListAsync();
        var internalAttachments = new HashSet<string>(taskAttachmentUrls.Where(u => !string.IsNullOrWhiteSpace(u)), StringComparer.OrdinalIgnoreCase);

        return photos.Where(sp => !internalAttachments.Contains(sp.PhotoUrl)).ToList();
    }
}
