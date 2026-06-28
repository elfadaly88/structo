using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using Structo.Core.Interfaces;
using Structo.Core.Settings;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Structo.Infrastructure.Storage;

public class CloudflareR2StorageService(
    IAmazonS3 s3Client,
    IOptions<CloudflareR2Settings> r2Settings) : ICloudStorageService
{
    private readonly CloudflareR2Settings _settings = r2Settings.Value;

    public Task<string> UploadFileAsync(string fileName, string contentType, string? customKey = null)
    {
        var extension = Path.GetExtension(fileName).ToLower();
        var key = customKey?.TrimStart('/') ?? $"images/{Guid.NewGuid()}{extension}";

        string dbUrl = $"{_settings.PublicBaseUrl}/{key}";

        // Generate Presigned URL
        var presignRequest = new GetPreSignedUrlRequest
        {
            BucketName = _settings.BucketName,
            Key = key,
            Expires = DateTime.UtcNow.AddHours(1),
            Verb = HttpVerb.PUT,
            ContentType = contentType
        };
        string presignedUrl = s3Client.GetPreSignedURL(presignRequest);

        // Required strict UI contract: PRESIGNED_SPLIT|{presignedUrl}|{publicBaseUrl}/{key}
        return Task.FromResult($"PRESIGNED_SPLIT|{presignedUrl}|{dbUrl}");
    }

    public async Task<bool> DeleteFileAsync(string fileUrl)
    {
        if (string.IsNullOrEmpty(fileUrl)) return false;
        if (!fileUrl.StartsWith(_settings.PublicBaseUrl)) return false;

        try
        {
            var key = fileUrl.Replace(_settings.PublicBaseUrl, "").TrimStart('/');
            if (string.IsNullOrEmpty(key)) return false;

            await s3Client.DeleteObjectAsync(_settings.BucketName, key);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
