using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Structo.Core.DTOs.Common;
using Structo.Core.Exceptions;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace Structo.API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An unhandled exception occurred for {Method} {Path}",
                context.Request.Method, context.Request.Path);

            // If the response has already started (e.g., streaming), we cannot write headers.
            // Abort the connection to prevent a corrupt response from reaching the client.
            if (context.Response.HasStarted)
            {
                logger.LogWarning("Response already started — aborting connection to prevent corrupt response.");
                context.Abort();
                return;
            }

            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

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

        response.Message = exception is BusinessRuleException || exception is UnauthorizedAccessException
            ? exception.Message
            : "An unexpected internal server error occurred.";

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}
