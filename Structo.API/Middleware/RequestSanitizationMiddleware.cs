using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Common;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Structo.API.Middleware;

public class RequestSanitizationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestSanitizationMiddleware> _logger;

    // Maximum allowed request body size to prevent Request Body Buffering Memory DoS (10MB Limit)
    private const long MaxRequestBodySizeBytes = 10 * 1024 * 1024;

    public RequestSanitizationMiddleware(RequestDelegate next, ILogger<RequestSanitizationMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Enforce Max Content-Length Check (Memory Buffering DoS Guard)
        if (context.Request.ContentLength.HasValue && context.Request.ContentLength.Value > MaxRequestBodySizeBytes)
        {
            _logger.LogWarning("[SECURITY] Request body size exceeds 10MB limit ({Size} bytes) from IP {IP} for path {Path}",
                context.Request.ContentLength.Value, context.Connection.RemoteIpAddress, context.Request.Path);

            context.Response.StatusCode = StatusCodes.Status413PayloadTooLarge;
            context.Response.ContentType = "application/json; charset=utf-8";

            var response = new ApiResponse<object>
            {
                Success = false,
                Message = "حجم الطلب يتعدى الحد الأقصى المسموح به (10 ميجابايت)."
            };

            var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            await context.Response.WriteAsync(JsonSerializer.Serialize(response, jsonOptions), Encoding.UTF8);
            return;
        }

        await _next(context);
    }
}
