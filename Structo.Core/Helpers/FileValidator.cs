using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Structo.Core.Helpers;

public static class FileValidator
{
    // 🛡️ القائمة البيضاء المعتمدة للامتدادات الآمنة في السيستم (Images & PDFs)
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];

    // 🛡️ القائمة البيضاء المقابلة للـ MIME Types لضمان عدم تزييف الامتداد
    private static readonly string[] AllowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];

    // الحد الأقصى للملف (مثلاً 5 ميجا بايت لحماية مساحة التخزين)
    private const long MaxFileSizeInBytes = 5 * 1024 * 1024;

    public static (bool IsValid, string ErrorMessage) ValidateUploadedFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return (false, "FILE_EMPTY: الملف المرفوع فارغ أو غير موجود.");
        }

        // 1. فحص حجم الملف (Dos/DDos Prevention)
        if (file.Length > MaxFileSizeInBytes)
        {
            return (false, $"FILE_TOO_LARGE: حجم الملف يتعدى الحد المسموح به (5 ميجا بايت).");
        }

        // 2. فحص الامتداد (Extension validation)
        var extension = Path.GetExtension(file.FileName)?.ToLower();
        if (string.IsNullOrEmpty(extension) || !AllowedExtensions.Contains(extension))
        {
            return (false, $"INVALID_EXTENSION: الامتداد {extension} غير مسموح به. الامتدادات المدعومة هي فقط: JPG, PNG, PDF.");
        }

        // 3. فحص الـ Content-Type/Mime-Type القادم من الـ Request
        var mimeType = file.ContentType?.ToLower();
        if (string.IsNullOrEmpty(mimeType) || !AllowedMimeTypes.Contains(mimeType))
        {
            return (false, "INVALID_MIME_TYPE: نوع ملف غير صالح أو تم تزييف امتداده.");
        }

        return (true, string.Empty);
    }
}