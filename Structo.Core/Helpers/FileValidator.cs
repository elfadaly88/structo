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

        // 4. فحص التوقيع الثنائي السحري للملف (Magic Bytes / Header inspection)
        try
        {
            using var stream = file.OpenReadStream();
            var header = new byte[4];
            if (stream.Read(header, 0, 4) < 4)
            {
                return (false, "INVALID_FILE_HEADER: تعذر قراءة ترويسة الملف المرفوع.");
            }

            bool isValidHeader = extension switch
            {
                ".jpg" or ".jpeg" => header[0] == 0xFF && header[1] == 0xD8 && header[2] == 0xFF,
                ".png" => header[0] == 0x89 && header[1] == 0x50 && header[2] == 0x4E && header[3] == 0x47,
                ".pdf" => header[0] == 0x25 && header[1] == 0x50 && header[2] == 0x44 && header[3] == 0x46,
                _ => false
            };

            if (!isValidHeader)
            {
                return (false, "INVALID_FILE_SIGNATURE: توقيع الملف الثنائي غير مطابق لامتداد الملف المرفوع.");
            }
        }
        catch
        {
            return (false, "FILE_READ_ERROR: حدث خطأ أثناء فحص محتوى الملف المرفوع.");
        }

        return (true, string.Empty);
    }
}