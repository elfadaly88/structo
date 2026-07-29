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

    // Compiled Regex for detecting malicious SQL Injection and XSS attack payloads
    private static readonly Regex TaintCheckRegex = new(
        @"(;\s*--|--|/\*|\*/|DROP\s+TABLE|UNION\s+SELECT|OR\s+['""]?1['""]?\s*=\s*['""]?1|EXEC\s*\(|DELETE\s+FROM|TRUNCATE\s+TABLE|INSERT\s+INTO|<script|javascript:|onerror\s*=|onload\s*=|eval\s*\(|<iframe|<svg)",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public RequestSanitizationMiddleware(RequestDelegate next, ILogger<RequestSanitizationMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // 1. Inspect Query Parameters
        foreach (var (key, val) in context.Request.Query)
        {
            if (ContainsTaintPayload(val.ToString()))
            {
                _logger.LogWarning("[SECURITY TAINT DETECTED] Malicious query parameter detected: {Key} = {Val} from IP {IP}", key, val, context.Connection.RemoteIpAddress);
                await RejectRequestAsync(context);
                return;
            }
        }

        // 2. Inspect Route Values
        foreach (var (key, val) in context.Request.RouteValues)
        {
            if (val != null && ContainsTaintPayload(val.ToString()))
            {
                _logger.LogWarning("[SECURITY TAINT DETECTED] Malicious route parameter detected: {Key} = {Val} from IP {IP}", key, val, context.Connection.RemoteIpAddress);
                await RejectRequestAsync(context);
                return;
            }
        }

        // 3. Inspect JSON/Text Request Body (POST, PUT, PATCH)
        if (HttpMethods.IsPost(context.Request.Method) || 
            HttpMethods.IsPut(context.Request.Method) || 
            HttpMethods.IsPatch(context.Request.Method))
        {
            var contentType = context.Request.ContentType ?? string.Empty;
            if (contentType.Contains("application/json", StringComparison.OrdinalIgnoreCase) ||
                contentType.Contains("text/plain", StringComparison.OrdinalIgnoreCase) ||
                contentType.Contains("application/x-www-form-urlencoded", StringComparison.OrdinalIgnoreCase))
            {
                context.Request.EnableBuffering();
                using var reader = new StreamReader(context.Request.Body, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, leaveOpen: true);
                var body = await reader.ReadToEndAsync();
                context.Request.Body.Position = 0; // Reset body stream position for model binding

                if (!string.IsNullOrWhiteSpace(body) && ContainsTaintPayload(body))
                {
                    _logger.LogWarning("[SECURITY TAINT DETECTED] Malicious payload detected in request body from IP {IP} for path {Path}", context.Connection.RemoteIpAddress, context.Request.Path);
                    await RejectRequestAsync(context);
                    return;
                }
            }
        }

        await _next(context);
    }

    private static bool ContainsTaintPayload(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return false;

        return TaintCheckRegex.IsMatch(input);
    }

    private static async Task RejectRequestAsync(HttpContext context)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        context.Response.ContentType = "application/json; charset=utf-8";

        var response = new ApiResponse<object>
        {
            Success = false,
            Message = "المُدخلات تحتوي على رموز غير مسموح بها لأسباب أمنية."
        };

        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, jsonOptions);
        await context.Response.WriteAsync(json, Encoding.UTF8);
    }
}
