using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Structo.Core.Entities;

namespace Structo.Core.DTOs.SiteOperations;

public class AssignedEngineerDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}".Trim();
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public bool IsOwner { get; set; }
}

public class LinkedSettlementItemDto
{
    public Guid Id { get; set; }
    public Guid SettlementItemId { get; set; }
    public string? ExpenseDescription { get; set; }
    public decimal AllocatedAmount { get; set; }
    public decimal OriginalLineAmount { get; set; }
    public string? Category { get; set; }
    public string? InvoiceUrl { get; set; }
}

public class IsoNullableDateTimeConverter : JsonConverter<DateTime?>
{
    private static readonly string[] Formats = [
        "yyyy-MM-ddTHH:mm:ss.fffZ", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd",
        "dd/MM/yyyy", "dd/MM/yyyy HH:mm", "dd/MM/yyyy HH:mm:ss"
    ];

    public override DateTime? Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        if (reader.TokenType == System.Text.Json.JsonTokenType.Null) return null;
        if (reader.TokenType == System.Text.Json.JsonTokenType.String)
        {
            var str = reader.GetString();
            if (string.IsNullOrWhiteSpace(str)) return null;
            if (DateTime.TryParseExact(str, Formats, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtExact))
                return dtExact;
            if (DateTime.TryParse(str, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtParsed))
                return dtParsed;
        }
        else if (reader.TryGetDateTime(out var dt))
        {
            return dt.Kind == DateTimeKind.Utc ? dt : DateTime.SpecifyKind(dt, DateTimeKind.Utc);
        }
        return null;
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, DateTime? value, System.Text.Json.JsonSerializerOptions options)
    {
        if (value.HasValue)
        {
            var utc = value.Value.Kind == DateTimeKind.Utc ? value.Value : DateTime.SpecifyKind(value.Value, DateTimeKind.Utc);
            writer.WriteStringValue(utc.ToString("yyyy-MM-ddTHH:mm:ssZ"));
        }
        else
        {
            writer.WriteNullValue();
        }
    }
}

public class IsoDateTimeConverter : JsonConverter<DateTime>
{
    private static readonly string[] Formats = [
        "yyyy-MM-ddTHH:mm:ss.fffZ", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-dd",
        "dd/MM/yyyy", "dd/MM/yyyy HH:mm", "dd/MM/yyyy HH:mm:ss"
    ];

    public override DateTime Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
    {
        if (reader.TokenType == System.Text.Json.JsonTokenType.String)
        {
            var str = reader.GetString();
            if (!string.IsNullOrWhiteSpace(str))
            {
                if (DateTime.TryParseExact(str, Formats, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtExact))
                    return dtExact;
                if (DateTime.TryParse(str, System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AssumeUniversal | System.Globalization.DateTimeStyles.AdjustToUniversal, out var dtParsed))
                    return dtParsed;
            }
        }
        else if (reader.TryGetDateTime(out var dt))
        {
            return dt.Kind == DateTimeKind.Utc ? dt : DateTime.SpecifyKind(dt, DateTimeKind.Utc);
        }
        return DateTime.UtcNow;
    }

    public override void Write(System.Text.Json.Utf8JsonWriter writer, DateTime value, System.Text.Json.JsonSerializerOptions options)
    {
        var utc = value.Kind == DateTimeKind.Utc ? value : DateTime.SpecifyKind(value, DateTimeKind.Utc);
        writer.WriteStringValue(utc.ToString("yyyy-MM-ddTHH:mm:ssZ"));
    }
}

public class SiteTaskDto
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public Guid AssignedEngineerId { get; set; }
    public string AssignedEngineerName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Weight { get; set; } = 1.0m;
    public int ProgressPercentage { get; set; }
    public string Status { get; set; } = string.Empty;

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? PlannedStartDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? PlannedEndDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? CompletedAt { get; set; }

    public string? EngineerNotes { get; set; }
    public List<string> AttachmentUrls { get; set; } = [];

    public decimal TotalAllocatedExpenses { get; set; }
    public List<LinkedSettlementItemDto> LinkedSettlementItems { get; set; } = [];
}

public class SiteTaskCreateDto
{
    public Guid ProjectId { get; set; }
    public Guid AssignedEngineerId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Weight { get; set; } = 1.0m;

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? PlannedStartDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? PlannedEndDate { get; set; }
}

public class SiteTaskProgressUpdateDto
{
    public int ProgressPercentage { get; set; }
    public SiteTaskStatus? Status { get; set; }
    public string? EngineerNotes { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? CompletedAt { get; set; }

    public List<string>? AttachmentUrls { get; set; }
}

public class LinkSettlementItemEntryDto
{
    public Guid SettlementItemId { get; set; }
    public decimal AllocatedAmount { get; set; }
    public string? ExpenseDescription { get; set; }
}

public class LinkSettlementItemsDto
{
    public List<LinkSettlementItemEntryDto> Items { get; set; } = [];
}

public class ProjectSiteTasksResponseDto
{
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string? PublicShareToken { get; set; }
    public int WeightedOverallProgress { get; set; }
    public decimal TotalWeight { get; set; }
    public List<SiteTaskDto> Tasks { get; set; } = [];
}

public class PublicTaskProgressDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int ProgressPercentage { get; set; }
    public string Status { get; set; } = string.Empty;

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? PlannedStartDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? PlannedEndDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? CompletedAt { get; set; }

    public List<string> AttachmentUrls { get; set; } = [];
}

public class PublicSitePhotoDto
{
    public Guid Id { get; set; }
    public string PhotoUrl { get; set; } = string.Empty;
    public string? Caption { get; set; }

    [JsonConverter(typeof(IsoDateTimeConverter))]
    public DateTime UploadedAt { get; set; }
}

public class PublicProjectTrackerDto
{
    public Guid ProjectId { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string? Category { get; set; }
    public string? ClientName { get; set; }
    public string? Governorate { get; set; }
    public string? CityOrZone { get; set; }
    public string Status { get; set; } = string.Empty;
    public int WeightedOverallProgress { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? StartDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? EndDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? CompletionDate { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? CreatedAt { get; set; }

    [JsonConverter(typeof(IsoNullableDateTimeConverter))]
    public DateTime? DisplayDate { get; set; }

    public List<PublicTaskProgressDto> Tasks { get; set; } = [];
    public List<PublicSitePhotoDto> SitePhotos { get; set; } = [];
}

public class AvailableSettlementLineDto
{
    public Guid Id { get; set; }
    public Guid SettlementId { get; set; }
    public string Category { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public decimal TotalAllocatedAmount { get; set; }
    public decimal RemainingAmount => Math.Max(0, TotalAmount - TotalAllocatedAmount);
    public string Description { get; set; } = string.Empty;
    public string? InvoiceUrl { get; set; }
    public DateTime SubmittedAt { get; set; }
}
