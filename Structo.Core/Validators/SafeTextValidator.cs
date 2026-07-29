using FluentValidation;
using System.Text.RegularExpressions;

namespace Structo.Core.Validators;

public static class SafeTextValidatorExtensions
{
    // Regex for detecting common SQL Injection and XSS patterns
    private static readonly Regex UnsafePatternsRegex = new(
        @"(;\s*--|--|/\*|\*/|DROP\s+TABLE|UNION\s+SELECT|OR\s+['""]?1['""]?\s*=\s*['""]?1|EXEC\s*\(|DELETE\s+FROM|TRUNCATE\s+TABLE|INSERT\s+INTO|<script|javascript:|onerror\s*=|onload\s*=|eval\s*\(|<iframe|<svg)",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public static IRuleBuilderOptions<T, string?> SafeText<T>(this IRuleBuilder<T, string?> ruleBuilder)
    {
        return ruleBuilder.Must(value =>
        {
            if (string.IsNullOrWhiteSpace(value))
                return true;

            return !UnsafePatternsRegex.IsMatch(value);
        })
        .WithMessage("المُدخلات تحتوي على رموز غير مسموح بها لأسباب أمنية.");
    }
}
