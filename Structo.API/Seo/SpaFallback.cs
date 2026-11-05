using System.Net;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Structo.Infrastructure.Data;

namespace Structo.API.Seo;

/// <summary>
/// Serves the Angular index.html for client routes, with SEO-aware behaviour the static file can't provide:
/// - unknown paths get HTTP 404 (the SPA shows its 404 page), so crawlers don't index soft-404s;
/// - private pages (dashboard, client tracker, review links) get X-Robots-Tag: noindex;
/// - /track/{token} links get a share preview with the project and company name (WhatsApp/Facebook don't run JS);
/// - Seo:SiteUrl (or env Seo__SiteUrl) replaces the default domain in canonical/og tags.
/// </summary>
public static partial class SpaFallback
{
    private const string DefaultSiteUrl = "https://structo-production.up.railway.app";

    [GeneratedRegex(@"^/(login|register|subscription|upgrade|dashboard(/.*)?|superadmin/dashboard|admin(/.*)?|public/project-review/[^/]+|track/[^/]+)?/?$", RegexOptions.IgnoreCase)]
    private static partial Regex KnownRoute();

    [GeneratedRegex(@"^/(dashboard|superadmin|admin|track|public/project-review)(/|$)", RegexOptions.IgnoreCase)]
    private static partial Regex PrivateRoute();

    [GeneratedRegex(@"^/track/([A-Za-z0-9\-_]{1,64})/?$")]
    private static partial Regex TrackRoute();

    private static string? _cachedHtml;
    private static DateTime _cachedStamp;
    private static readonly object CacheLock = new();

    public static void MapSpaFallback(this WebApplication app, string indexPath)
    {
        app.MapFallback(async (HttpContext ctx, StructoDbContext db, IConfiguration config) =>
        {
            var path = ctx.Request.Path.Value ?? "/";

            // API and hub paths that reached the fallback simply don't exist
            if (path.StartsWith("/api/", StringComparison.OrdinalIgnoreCase) || path.StartsWith("/hubs/", StringComparison.OrdinalIgnoreCase))
            {
                ctx.Response.StatusCode = StatusCodes.Status404NotFound;
                return;
            }

            var html = ReadIndex(indexPath);
            if (html == null)
            {
                ctx.Response.StatusCode = StatusCodes.Status404NotFound;
                return;
            }

            var siteUrl = (Environment.GetEnvironmentVariable("Seo__SiteUrl") ?? config["Seo:SiteUrl"] ?? DefaultSiteUrl).TrimEnd('/');
            if (!string.Equals(siteUrl, DefaultSiteUrl, StringComparison.OrdinalIgnoreCase))
                html = html.Replace(DefaultSiteUrl, siteUrl);

            var known = KnownRoute().IsMatch(path);
            if (!known || PrivateRoute().IsMatch(path))
                ctx.Response.Headers["X-Robots-Tag"] = "noindex, nofollow";

            var track = TrackRoute().Match(path);
            if (track.Success)
                html = await WithTrackerPreviewAsync(html, track.Groups[1].Value, siteUrl, path, db);

            ctx.Response.StatusCode = known ? StatusCodes.Status200OK : StatusCodes.Status404NotFound;
            ctx.Response.ContentType = "text/html; charset=utf-8";
            ctx.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
            await ctx.Response.WriteAsync(html);
        });
    }

    private static string? ReadIndex(string indexPath)
    {
        if (!File.Exists(indexPath)) return null;
        var stamp = File.GetLastWriteTimeUtc(indexPath);
        lock (CacheLock)
        {
            if (_cachedHtml == null || stamp != _cachedStamp)
            {
                _cachedHtml = File.ReadAllText(indexPath);
                _cachedStamp = stamp;
            }
            return _cachedHtml;
        }
    }

    private static async Task<string> WithTrackerPreviewAsync(string html, string token, string siteUrl, string path, StructoDbContext db)
    {
        try
        {
            var info = await db.Projects.IgnoreQueryFilters().AsNoTracking()
                .Where(p => p.PublicShareToken == token)
                .Select(p => new { p.Name, TenantName = p.Tenant != null ? p.Tenant.Name : null })
                .FirstOrDefaultAsync();
            if (info == null) return html;

            var title = WebUtility.HtmlEncode($"متابعة تنفيذ: {info.Name}");
            var description = WebUtility.HtmlEncode(string.IsNullOrWhiteSpace(info.TenantName)
                ? "تابع نسبة الإنجاز وبنود التنفيذ وصور الموقع لحظة بلحظة عبر أسس."
                : $"تابع نسبة الإنجاز وبنود التنفيذ وصور الموقع لمشروعك مع {info.TenantName} عبر أسس.");
            var url = WebUtility.HtmlEncode(siteUrl + path);

            html = Regex.Replace(html, "<title>[^<]*</title>", $"<title>{title}</title>");
            html = ReplaceMeta(html, "property", "og:title", title);
            html = ReplaceMeta(html, "name", "twitter:title", title);
            html = ReplaceMeta(html, "property", "og:description", description);
            html = ReplaceMeta(html, "name", "twitter:description", description);
            html = ReplaceMeta(html, "name", "description", description);
            html = ReplaceMeta(html, "property", "og:url", url);
            html = ReplaceMeta(html, "name", "robots", "noindex, nofollow");
            return html;
        }
        catch
        {
            // A preview is a nicety: never fail the page because of it
            return html;
        }
    }

    private static string ReplaceMeta(string html, string attr, string key, string content) =>
        Regex.Replace(html, $"<meta {attr}=\"{Regex.Escape(key)}\" content=\"[^\"]*\">", $"<meta {attr}=\"{key}\" content=\"{content}\">");
}
