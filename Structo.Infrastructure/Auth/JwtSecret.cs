using Microsoft.Extensions.Configuration;
using System;
using System.Text;

namespace Structo.Infrastructure.Auth;

/// <summary>
/// Single source of the JWT signing key, shared by token issuing (JwtTokenProvider)
/// and token validation (Program.cs). There is deliberately no fallback value.
/// </summary>
public static class JwtSecret
{
    public const string ConfigKey = "JwtSettings:Secret";
    private const int MinimumKeyBytes = 32;

    public static byte[] GetSigningKey(IConfiguration configuration)
    {
        var secret = configuration[ConfigKey];

        if (string.IsNullOrWhiteSpace(secret))
        {
            throw new InvalidOperationException(
                $"JWT secret is not configured. Set '{ConfigKey}' (environment variable 'JwtSettings__Secret').");
        }

        if (secret.Contains("PLACEHOLDER", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException(
                $"JWT secret '{ConfigKey}' still contains a placeholder value. Set a real random secret.");
        }

        var key = Encoding.ASCII.GetBytes(secret);
        if (key.Length < MinimumKeyBytes)
        {
            throw new InvalidOperationException(
                $"JWT secret '{ConfigKey}' is {key.Length} bytes; at least {MinimumKeyBytes} bytes are required.");
        }

        return key;
    }
}
