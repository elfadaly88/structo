using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Structo.Core.Interfaces;
using Structo.Core.Settings;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Structo.Infrastructure.Storage;

public class CloudflareR2StorageService(
    IAmazonS3 s3Client,
    IOptions<CloudflareR2Settings> r2Settings,
    ILogger<CloudflareR2StorageService> logger) : ICloudStorageService
{
    private readonly CloudflareR2Settings _settings = r2Settings.Value;

    public Task<string> UploadFileAsync(string fileName, string contentType, string? customKey = null)
    {
        var extension = Path.GetExtension(fileName).ToLower();
        var key = customKey?.TrimStart('/') ?? $"images/{Guid.NewGuid()}{extension}";

        string dbUrl = $"{_settings.PublicBaseUrl.TrimEnd('/')}/{key}";

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

    public async Task<string> UploadFileDirectAsync(Stream fileStream, string fileName, string contentType, string? customKey = null)
    {
        var extension = Path.GetExtension(fileName).ToLower();
        var key = customKey?.TrimStart('/') ?? $"images/{Guid.NewGuid()}{extension}";

        string dbUrl = $"{_settings.PublicBaseUrl.TrimEnd('/')}/{key}";

        // Generate Presigned URL locally (no network requests, so no SSL validation issues)
        var presignRequest = new GetPreSignedUrlRequest
        {
            BucketName = _settings.BucketName,
            Key = key,
            Expires = DateTime.UtcNow.AddHours(1),
            Verb = HttpVerb.PUT,
            ContentType = contentType
        };
        string presignedUrl = s3Client.GetPreSignedURL(presignRequest);

        try
        {
            logger.LogInformation("Attempting Tuned R2 Upload via native HttpClient. Bucket: {Bucket}, Key: {Key}", _settings.BucketName, key);

            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true,
                SslProtocols = System.Security.Authentication.SslProtocols.Tls12 | System.Security.Authentication.SslProtocols.Tls13
            };
            using var client = new HttpClient(handler) { Timeout = TimeSpan.FromSeconds(60) };

            using var request = new HttpRequestMessage(HttpMethod.Put, presignedUrl);
            
            // CRITICAL FOR CLOUDFLARE SNI HANDSHAKE: Force Host header and HTTP/1.1
            var targetHost = new Uri(presignedUrl).Host;
            request.Headers.Host = targetHost;
            request.Version = System.Net.HttpVersion.Version11; // Ensure stable HTTP/1.1 transfer
            
            if (fileStream.CanSeek)
            {
                fileStream.Position = 0;
            }
            request.Content = new StreamContent(fileStream);
            request.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

            var response = await client.SendAsync(request);
            logger.LogInformation("Tuned HttpClient R2 Upload Status: {StatusCode}", response.StatusCode);

            if (!response.IsSuccessStatusCode)
            {
                var err = await response.Content.ReadAsStringAsync();
                logger.LogError("R2 Put Rejected: {Error}", err);
                throw new Exception($"R2 Put Rejected with status {response.StatusCode}: {err}");
            }

            return dbUrl;
        }
        catch (AmazonS3Exception s3Ex)
        {
            logger.LogError("FATAL S3 ERROR: ErrorCode={Code}, Message={Msg}, HTTPStatus={Status}", 
                s3Ex.ErrorCode, s3Ex.Message, s3Ex.StatusCode);
            logger.LogError("S3 Full Exception: {Detail}", s3Ex.ToString());
            throw;
        }
        catch (Exception ex)
        {
            logger.LogError("GENERIC UPLOAD ERROR: {Message}, Inner={Inner}", ex.Message, ex.InnerException?.Message);
            logger.LogError("Full Stack Trace: {Trace}", ex.ToString());
            throw;
        }
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
