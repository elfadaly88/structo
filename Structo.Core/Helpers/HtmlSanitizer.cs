using System;
using System.Text.RegularExpressions;

namespace Structo.Core.Helpers;

public static class HtmlSanitizer
{
    private static readonly Regex HtmlTagRegex = new(@"<[^>]*>", RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public static string Sanitize(string? input)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        // Strip HTML tags to prevent XSS payloads
        return HtmlTagRegex.Replace(input, string.Empty);
    }
}
