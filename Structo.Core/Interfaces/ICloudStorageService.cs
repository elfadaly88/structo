using System.IO;
using System.Threading.Tasks;

namespace Structo.Core.Interfaces;

public interface ICloudStorageService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string? customKey = null);
    Task<bool> DeleteFileAsync(string fileUrl);
}
