using Microsoft.Extensions.Logging;
using Structo.Core.Interfaces;

namespace Structo.Infrastructure.Storage;

/// <summary>
/// A no-op (mock) implementation of ICloudStorageService for local development
/// when Cloudflare R2 credentials are not configured. Returns dummy URLs
/// so the financial ledger logic can be tested end-to-end without real cloud storage.
/// </summary>
public class LocalNoOpStorageService(ILogger<LocalNoOpStorageService> logger) : ICloudStorageService
{
    public Task<string> UploadFileAsync(string fileName, string contentType, string? customKey = null)
    {
        var fakeKey = customKey?.TrimStart('/') ?? $"images/{Guid.NewGuid()}{Path.GetExtension(fileName)}";
        var fakeUrl = $"https://local-dev-placeholder.test/{fakeKey}";
        logger.LogWarning("[NoOp Storage] UploadFileAsync called — returning placeholder URL: {Url}", fakeUrl);
        return Task.FromResult($"PRESIGNED_SPLIT|{fakeUrl}|{fakeUrl}");
    }

    public Task<string> UploadFileDirectAsync(Stream fileStream, string fileName, string contentType, string? customKey = null)
    {
        var fakeKey = customKey?.TrimStart('/') ?? $"images/{Guid.NewGuid()}{Path.GetExtension(fileName)}";
        var fakeUrl = $"https://local-dev-placeholder.test/{fakeKey}";
        logger.LogWarning("[NoOp Storage] UploadFileDirectAsync called — returning placeholder URL: {Url}", fakeUrl);
        return Task.FromResult(fakeUrl);
    }

    public Task<bool> DeleteFileAsync(string fileUrl)
    {
        logger.LogWarning("[NoOp Storage] DeleteFileAsync called for: {Url} — returning true (no-op)", fileUrl);
        return Task.FromResult(true);
    }
}
