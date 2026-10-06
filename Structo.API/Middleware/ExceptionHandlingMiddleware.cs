using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Common;
using Structo.Core.Exceptions;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace Structo.API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger, IHostEnvironment environment)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            // Correlation id ties the client-visible reference to the full server-side log entry
            var correlationId = context.TraceIdentifier;
            logger.LogError(ex, "Unhandled exception {CorrelationId} for {Method} {Path}",
                correlationId, context.Request.Method, context.Request.Path);

            // If the response has already started (e.g., streaming), we cannot write headers.
            // Abort the connection to prevent a corrupt response from reaching the client.
            if (context.Response.HasStarted)
            {
                logger.LogWarning("Response already started — aborting connection to prevent corrupt response.");
                context.Abort();
                return;
            }

            await HandleExceptionAsync(context, ex, correlationId);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception, string correlationId)
    {
        context.Response.ContentType = "application/json";
        context.Response.Headers["X-Correlation-Id"] = correlationId;

        var response = new ApiResponse<object>
        {
            Success = false
        };

        context.Response.StatusCode = exception switch
        {
            BusinessRuleException => StatusCodes.Status400BadRequest,
            UnauthorizedAccessException => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };

        if (context.Response.StatusCode == StatusCodes.Status500InternalServerError && !environment.IsDevelopment())
        {
            // Never expose internal details (SQL, stack, provider messages) outside Development
            response.Message = $"An unexpected error occurred. Reference: {correlationId}";
        }
        else
        {
            response.Message = !string.IsNullOrWhiteSpace(exception.Message)
                ? exception.Message
                : "An unexpected internal server error occurred.";
        }

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}
