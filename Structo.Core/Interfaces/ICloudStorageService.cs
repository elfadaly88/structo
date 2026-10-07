using System;
using System.IO;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface ICloudStorageService
{
    Task<string> UploadFileAsync(string fileName, string contentType, string? customKey = null);
    Task<string> UploadFileDirectAsync(System.IO.Stream fileStream, string fileName, string contentType, string? customKey = null);
    Task<bool> DeleteFileAsync(string fileUrl);
    Task<int> DeleteFilesAsync(IEnumerable<string> fileUrls);

    /// <summary>
    /// Short-lived signed GET URL for a privately stored object key (e.g. payment receipts).
    /// Use instead of the public base URL for anything that must not be publicly linkable.
    /// </summary>
    string GetPrivateReadUrl(string key, TimeSpan validFor);
}
