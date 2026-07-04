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
            logger.LogError(ex, "An unhandled exception occurred.");
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

        if (exception switch
        {
            BusinessRuleException e => (int)StatusCodes.Status400BadRequest,
            UnauthorizedAccessException e => (int)StatusCodes.Status403Forbidden,
            _ => (int)StatusCodes.Status500InternalServerError
        } is var statusCode)
        {
            context.Response.StatusCode = statusCode;
            response.Message = exception is BusinessRuleException || exception is UnauthorizedAccessException 
                ? exception.Message 
                : "An unexpected internal server error occurred.";
        }

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}
