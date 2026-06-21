namespace Structo.Core.DTOs.Common;

public class ApiResponse<T>
{
    public T? Data { get; set; }
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
    
    /// <summary>
    /// Metadata allowing the frontend to dynamically adapt layout based on permissions.
    /// </summary>
    public string CurrentUserRole { get; set; } = string.Empty; 

    public System.Collections.Generic.List<string> Errors { get; set; } = [];
}
