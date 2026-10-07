using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;

namespace Structo.API.Middleware;

/// <summary>
/// Client-facing text for unexpected errors: never the exception message, only a reference
/// that matches the server log entry (the request's TraceIdentifier, also sent as X-Correlation-Id).
/// </summary>
public static class SafeErrors
{
    public static string Generic(HttpContext context) => $"An unexpected error occurred. Reference: {context.TraceIdentifier}";

    /// <summary>Logs the exception under the request's reference and returns the generic client message.</summary>
    public static string Generic(HttpContext context, Exception exception)
    {
        context.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("Structo.API.Errors")
            .LogError(exception, "Handled exception {CorrelationId} for {Method} {Path}", context.TraceIdentifier, context.Request.Method, context.Request.Path);
        context.Response.Headers["X-Correlation-Id"] = context.TraceIdentifier;
        return Generic(context);
    }
}
