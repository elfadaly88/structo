# 03 — Structo: تدقيق قاعدة الكود، تحليل الفجوات وشبكة المشكلات

> **إصدار المستند:** 1.0 — تدقيق تقني شامل  
> **التاريخ:** 2026-07-25  
> **مقياس الخطورة:** 🔴 حرج · 🟠 عالي · 🟡 متوسط · 🟢 منخفض · ⚪ معلوماتي

---

## جدول المحتويات

1. [الثغرات الأمنية الحرجة](#1-الثغرات-الأمنية-الحرجة)
2. [مشاكل الهيكلية والتصميم](#2-مشاكل-الهيكلية-والتصميم)
3. [عيوب منطق الأعمال](#3-عيوب-منطق-الأعمال)
4. [جودة الكود القابلية للصيانة](#4-جودة-الكود-القابلية-للصيانة)
5. [مشاكل الواجهة الأمامية](#5-مشاكل-الواجهة-الأمامية)
6. [مخاوف الأداء](#6-مخاوف-الأداء)
7. [مشاكل DevOps والإعدادات](#7-مشاكل-devops-والإعدادات)
8. [الميزات المفقودة والفجوات](#8-الميزات-المفقودة-والفجوات)
9. [خريطة الحرارة الملخصة](#9-خريطة-الحرارة-الملخصة)

---

## 1. الثغرات الأمنية الحرجة

### SEC-001 🔴 كلمة المرور الافتراضية الثابتة للموظفين

**الملف:** [EmployeeManagementController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/EmployeeManagementController.cs#L76)

```csharp
var secureTempPassword = "Password@123"; // السطر 76
```

**الأثر:** يتم تسجيل كل موظف مسبقاً بنفس كلمة المرور المعرفة. إذا فشل إرسال بريد الدعوة عبر OneSignal (لا يوجد تسليم مضمون)، يمكن لأي مهاجم يعرف البريد الإلكتروني للموظف تسجيل الدخول باستخدام `Password@123`.

**التصحيح:**
```csharp
var randomBytes = RandomNumberGenerator.GetBytes(16);
var secureTempPassword = Convert.ToBase64String(randomBytes) + "!1a";
```
يجب أيضاً تضمين كلمة المرور في نص بريد الدعوة وفرض تغيير كلمة المرور عند أول تسجيل دخول.

---

### SEC-002 🔴 المفتاح السري الافتراضي الثابت لـ JWT

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L233)

```csharp
?? "SuperSecretKeyThatShouldBeAtLeast32BytesLongForHS256ToWorkProperly!"; // السطر 233
```

**الأثر:** إذا كان متغيّر البيئة `JWT_SECRET` والإعدادات مفقودين (شائع في التطوير المحلي أو النشر الخاطئ)، يتم توقيع كل JWT بهذا المفتاح المكشوف علناً. يمكن لأي مهاجم تزوير توكنز مسؤول (Admin) صالحة.

**التصحيح:** استبدالها بـ `throw new InvalidOperationException("JWT_SECRET must be configured.")` لغير بيئات التطوير.

---

### SEC-003 🔴 بيانات تزويد SuperAdmin الثابتة في بيانات البذرة (Seed Data)

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L302-L313)

```csharp
Email = "superadmin",                              // السطر 307
PasswordHash = BCrypt.Net.BCrypt.HashPassword("SuperAdmin@123"),  // السطر 308
```

**الأثر:** حساب SuperAdmin الافتراضي `superadmin / SuperAdmin@123` موجود في كل نشر جديد. هذا موجه هجوم معروف ومخاطرة عالية.

**التصحيح:** إنشاء كلمة مرور عشوائية لـ SuperAdmin عند التشغيل الأول وتأكيدها في السجلات مرة واحدة، ثم طلب تغييرها فوراً، أو استخدام متغيرات البيئة.

---

### SEC-004 🔴 معرف عميل Google (Google Client ID) الاحتياطي الثابت

**الملف:** [GoogleAuthController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/GoogleAuthController.cs#L56)

```csharp
var googleClientId = _configuration["Authentication:Google:ClientId"]
  ?? "752236038625-sfuglkls4icf5loo8to6gaes9b3kt1h6.apps.googleusercontent.com";
```

**الأثر:** كشف معرف العميل الثابت في الكود المصدري؛ إذا تم اختراق مشروع Google Cloud، تكون كافة تدفقات OAuth عرضة للاختراق.

**التصحيح:** إزالة الخيار الاحتياطي وفرض الإعدادات الصريحة.

---

### SEC-005 🟠 تعطيل التحقق من شهادة SSL (عميل AWS S3)

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L494)

```csharp
ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true, // السطر 494
```

**الأثر:** تتخطى جميع استدعاءات Cloudflare R2 API التحقق من شهادات SSL، مما يتسبب في إمكانية حدوث هجمات الرجل في المنتصف (MITM) على رفع الملفات في الإنتاج.

**التصحيح:** إزالة الـ Callback تماماً، أو ربط شهادات Cloudflare المحددة.

---

### SEC-006 🟠 عدم التحقق من نوع محتوى الملف (فحص MIME)

**الملف:** [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L47-L58)

تحقق `FileValidator.ValidateUploadedFile()` يقتصر على الامتداد والحجم، لكن نقطة الرفع تثق في `file.ContentType` القادم من العميل. يمكن لمستخدم خبيث رفع ملف `.exe` وتغيير اسمه إلى `.jpg` ونوع MIME مزيف.

**التصحيح:** إضافة التحقق من البايتات السحرية (Magic Bytes) أو ترويسة الملف (مثلاً التحقق من أن JPEG يبدأ بـ `0xFF 0xD8` و PNG بـ `0x89 0x50`).

---

### SEC-007 🟠 تضارب مسار `ToggleReviewVisibility`

**الملف:** [ProjectsController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ProjectsController.cs#L174)

```csharp
[HttpPost("/api/superadmin/reviews/{reviewId}/toggle-visibility")]
```

هذا المسار المطلق (`/api/superadmin/...`) معرف داخل `ProjectsController` (المسار الأساسي: `api/projects`)، متجاوزاً نمط السمة `[Authorize]` الخاصة بالحاوية. على الرغم من تطبيق `[Authorize(Roles = "SuperAdmin")]` على مستوى الدالة، إلا أن وجود المسار في مكان غير متوقع يجعل التدقيق الأمني أصعب.

**التصحيح:** نقله إلى `SuperAdminController` أو إنشاء `ReviewsController` مخصص.

---

### SEC-008 🟠 `SitePhotosController` — فقدان عزل المستأجر عند الحذف

**الملف:** [SitePhotosController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/SitePhotosController.cs#L100-L111)

```csharp
var photo = await context.SitePhotos.FirstOrDefaultAsync(p => p.Id == id && p.ProjectId == projectId);
```

الاستعلام يتحقق من مطابقة `projectId` ولكن **لا** يتحقق من ملكية المستأجر. إذا تم تجاوز فلتر EF (مثلاً إذا كان `CurrentTenantId` null بسبب خلل ما)، يمكن لأي مستخدم حذف أي صورة.

**التصحيح:** إضافة تحقق صريح `&& p.TenantId == tenantId` أو التحقق عبر `UserHasAccessToProjectAsync`.

---

### SEC-009 🟡 عدم وجود حماية CSRF على نقاط النهاية التي تغير الحالة

تعتمد الـ API كلياً على مصادقة Bearer token (بدون كوكيز). ومع ذلك، نقاط النهاية التي تقبل `[AllowAnonymous]` مثل التجديد والتقييم العام تقبل POST بدون CSRF tokens. إذا تم إدخال الكوكيز مستقبلاً، فستصبح قابلة للاستغلال.

**التصحيح:** توثيق هذا كـ "تصميم مقصود" لوضع الـ API الصافي، لكن يُفضل إضافة سياسة `SameSite` للكوكيز إذا تم استخدامها لاحقاً.

---

### SEC-010 🟡 تسريب تفاصيل الاستثناءات للعميل

**الملف:** [AuthController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/AuthController.cs#L45-L52)

```csharp
catch (UnauthorizedAccessException ex)
{
    return Unauthorized(new ApiResponse<LoginResponseDto>
    {
        Success = false,
        Message = ex.Message  // ← احتمال تسريب تفاصيل الـ Stack trace
    });
}
```

**الأثر:** قد تكشف رسائل الاستثناءات الداخلية تفاصيل التنفيذ.

**التصحيح:** إرجاع رسائل عامة للمستخدم وتسجيل الاستثناء الحقيقي في الـ Logs.

---

## 2. مشاكل الهيكلية والتصميم

### ARCH-001 🟠 المتحكمات الضخمة (Fat Controllers) — استخدام DbContext المباشر في المتحكمات

**الملفات:**
- [TenantProfileController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/TenantProfileController.cs) — 159 سطر من استعلامات EF المباشرة
- [SitePhotosController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/SitePhotosController.cs) — 114 سطر من استعلامات EF المباشرة
- [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs) — 274 سطر تخلط التخزين والداتا والمنطق
- [EmployeeManagementController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/EmployeeManagementController.cs) — عمليات داتا مباشرة + إرسال بريد في الخلفية
- [UsersController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/UsersController.cs#L117-L172) — دالة `ApproveTenant` تحتوي منطق عمل كامل
- [ProjectsController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ProjectsController.cs#L174-L193) — دالة `ToggleReviewVisibility` تعدل الكيانات مباشرة

**الأثر:** ينتهك مبدأ فصل المسؤوليات (Separation of Concerns). منطق الأعمال داخل المتحكمات يصعب اختباره وإعادة استخدامه، ويضيف عبء صيانة.

**التصحيح:** استخراج المنطق إلى خدمات: `TenantProfileService`, `SitePhotoService`, `ImageUploadService`, `EmployeeService`.

---

### ARCH-002 🟠 الاعتماد على ChangeTracker لتسلسل الـ TenantId في `SetTenantIdOnSave()`

**الملف:** [StructoDbContext.cs](file:///e:/private/structo/structo/Structo.Infrastructure/Data/StructoDbContext.cs#L281-L310)

```csharp
// التسلسل الصريح لـ Settlement → SettlementLine لتعيين TenantId
foreach (var line in entry.Entity.Lines)
{
    line.TenantId = entry.Entity.TenantId;
}
```

**الأثر:** يعمل هذا فقط عند تتبع Settlement + Lines في نفس استدعاء `SaveChanges()`. إذا أضيفت الأسطر في context أو transaction منفصل، فستحصل على `TenantId = Guid.Empty` مما يكسر فلاتر الاستعلام بصمت.

**التصحيح:** إضافة DB Trigger لـ `BEFORE INSERT` كشبكة أمان، أو التحقق في `SaveChangesAsync` من أن كافة كائنات `ITenantEntity` تمتلك `TenantId` غير فارغ.

---

### ARCH-003 🟡 غياب نمط Repository / Unit of Work

يحقن المشروع `StructoDbContext` مباشرة في الخدمات والمتحكمات دون طبقة تجريد. هذا يجعل:
- **الاختبار صعباً** — عدم وجود حدود صريحة لعمل السخرية (Mocking) للوصول للبيانات.
- **إدارة الترانزاكشنز ضمنية** — استدعاءات `SaveChangesAsync()` المتعددة في طلب واحد قد تترك حالة جزئية عند الفشل.

**التصحيح:** النظر في تطبيق تجريد `IUnitOfWork` على الأقل للعمليات المالية الحرجة متعددة الخطوات.

---

### ARCH-004 🟡 نمط موفر الخدمات العالمي (Global Service Provider Anti-Pattern)

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L462-L485)

```csharp
Structo.API.Program.AppServices = app.Services;  // السطر 462

namespace Structo.API
{
    public partial class Program
    {
        public static IServiceProvider AppServices { get; set; } = default!;
    }
}
```

**الأثر:** نمط مضاد لـ Service Locator. يسمح بجلب الخدمات دون تتبع من أي مكان، متجاوزاً دورتها الحياتية (Lifetimes)، مما يتسبب في استثناءات `ObjectDisposedException` إذا تم جلب خدمات Scoped من الـ Provider الرئيسي.

**التصحيح:** إزالة المتغير وجلب الخدمات عبر الحقن (DI) الطبيعي.

---

### ARCH-005 🟡 إرسال البريد في الخلفية بنمط "أطلق وانسَ" (Fire-and-Forget)

**الملفات:**
- [EmployeeManagementController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/EmployeeManagementController.cs#L105-L126)
- [NotificationEngine.cs](file:///e:/private/structo/structo/Structo.Core/Services/NotificationEngine.cs) — استخدام `Task.Run` لإرسال البريد

```csharp
_ = Task.Run(async () => {
    using var scope = _scopeFactory.CreateScope();
    var emailService = scope.ServiceProvider.GetRequiredService<IOneSignalEmailService>();
    await emailService.SendInvitationEmailAsync(...);
});
```

**الأثر:** على الرغم من أن `IServiceScopeFactory` يعالج Scoped Services بشكل صحيح، إلا أن استخدام `Task.Run` بهذه الطريقة يعني:
- لا توجد إعادة محاولة عند الفشل
- لا توجد طابور للرسائل الفاشلة (Dead-letter queue)
- الرسائل الفاشلة يتم تسجيلها في الـ Logs فقط وتفقد
- `_ = Task.Run` يكتم الاستثناءات غير المراقبة

**التصحيح:** استخدام `IHostedService` / `BackgroundService` مع طابور (Channel/Queue) أو مكتبة مثل Hangfire.

---

### ARCH-006 🟡 استدعاء `EnsureCreated()` و `Migrate()` بالتتابع

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L290-L292)

```csharp
context.Database.EnsureCreated();
context.Database.Migrate();
```

**الأثر:** ينشئ `EnsureCreated()` الهيكل بدون سجل الهجرات (Migration history). إذا حاولت أي هجرة تالية إنشاء جدول/عمود أنشأه `EnsureCreated` بالفعل، فسيتوقف النظام بخطأ. تحذر وثائق EF Core صراحة من جمع الاثنين.

**التصحيح:** استخدام `Migrate()` فقط لبيئة الإنتاج. ترك `EnsureCreated()` للاختبارات فقط.

---

## 3. عيوب منطق الأعمال

### BUG-001 🟠 مراجعة الميزانية لا تتحقق من المبلغ المصروف بالفعل

**الملف:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `ReviseBudgetAsync`

يمكن تعديل الميزانية **لخفّضها** لتصبح أقل من إجمالي المبلغ المصروف بالفعل. هذا يخلق حالة غير متناسقة تكون فيها `الميزانية < إجمالي المصروفات` مما يجعل حسابات تجاوز الميزانية تعمل بشكل دائم.

**التصحيح:** إضافة شرط حماية: `if (newBudget < totalSpentToDate) return (false, "Cannot set budget below total expenses")`.

---

### BUG-002 🟠 تجاوز التجميد المالي عبر حقن رأس المال

**الملف:** [FinancialTransactionService.cs](file:///e:/private/structo/structo/Structo.Core/Services/FinancialTransactionService.cs) — `InjectCapitalAsync`

شرط التجميد (`Status != FinancialFreeze && != Closed`) موجود في `CreateTransactionAsync` ولكنه قد لا يطبق بانتظام في `InjectCapitalAsync`. إذا أنشأ الحقن مسار معاملات خاص به يتجاوز شرط التجميد، فسيمكن حقن أموال في مشروع مجمّد.

**التصحيح:** إضافة شرط صريح لـ `project.Status` في بداية `InjectCapitalAsync`.

---

### BUG-003 🟠 حالة سباق (Race Condition) عند الموافقة المتزامنة على التسوية

**الملف:** [SettlementService.cs](file:///e:/private/structo/structo/Structo.Core/Services/SettlementService.cs) — `ApproveSettlementAsync`

تدفق الموافقة:
1. قراءة التسوية ← التحقق من أن الحالة هي `PendingAccountantApproval`
2. إنشاء معاملة المصروفات
3. تحديث رصيد الصندوق
4. التغيير إلى معتمدة (Approved)

بدون قفل بالتزامن التفاؤلي (`RowVersion`) أو قفل `SELECT FOR UPDATE`. لو تم تنفيذ موافقتين في نفس اللحظة، فسيقرأ الاثنان "Pending" وسيتم تنفيذ الاثنتين، مما يضاعف تسجيل المصروفات والخصم من الصندوق.

**التصحيح:** إضافة `[ConcurrencyCheck]` / `[Timestamp]` على `Settlement.Status` أو استخدام `FOR UPDATE` على مستوى الداتا بيز.

---

### BUG-004 🟡 إمكانية تحول رصيد الصندوق إلى بالسالب

**الملف:** [FinancialTransactionService.cs](file:///e:/private/structo/structo/Structo.Core/Services/FinancialTransactionService.cs)

عند حذف معاملة حقن رأس مال، يقل `AvailableBalance` الخاص بالصندوق. إذا تم صرف عُهد بالفعل من هذا الصندوق، فسيصبح الرصيد بالسالب:
```
الصندوق: محقون 500k، متاح 200k (300k صُرِفت عُهد)
حذف الحقن ← المتاح = 200k - 500k = -300k
```

**التصحيح:** إضافة شرط: `if (pool.TotalInjected - deleteAmount < pool.TotalInjected - pool.AvailableBalance) return error`.

---

### BUG-005 🟡 تقرير المطابقة يحسب العُهد المرفوضة كعُهد غير مسوّاة

**الملف:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `GetReconciliationReportAsync`

طلبات العُهد النثرية المرفوضة قد تُحسب ضمن الرصيد غير المسوّى، مما يمنع إغلاق المشروع رغم أن العناصر المرفوضة لا تتطلب أي إجراء آخير.

**التصحيح:** الفلترة بـ `Status not in (Rejected, Settled)` لحساب العُهد غير المسوّاة.

---

### BUG-006 🟡 فحص الحصة المتاحة لا يستثني المشاريع المغلقة

**الملف:** [TenantProfileController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/TenantProfileController.cs#L147-L148)

```csharp
var usedProjects = await context.Projects.CountAsync(p => p.TenantId == tenantId);
```

يحسب كافّة المشاريع بما فيها المغلقة (Closed). المستأجر الذي يغلق مشاريعه القديمة لا يستعيد حصته المتاحة مطلقاً.

**التصحيح:** إضافة `.Where(p => p.Status != "Closed")` أو حساب المشاريع التي تمتلك `IsActive == true` فقط.

---

### BUG-007 🟡 تحليل وصف `ProjectCreateDto` كـ JSON القديم

**الملف:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `CreateProjectAsync`

يحاول الكود تحليل `dto.Description` كـ JSON واستخراج خصائص فرعية. إذا كان الوصف نصاً عادياً، يفشل التحليل ويتراجع إلى النص الخام. تعقيد إضافي بدون فائدة واضحة.

**التصحيح:** توثيق ما إذا كانت أوصاف JSON لا تزال مستخدمة، أو إزالتها إن كانت قديمة.

---

## 4. جودة الكود القابلية للصيانة

### QUAL-001 🟡 عدم اتساق أنماط حقن البناء (Constructor Injection)

يخلط المشروع بين:
- **المشيدات الأولية** (C# 12): `ProjectsController(IProjectService projectService, ...)` 
- **المشيدات التقليدية**: `FinancialTransactionsController` بنمط `_field = param`

على الرغم من عمل الاثنين، إلا أن عدم الاتساق يقلل المقروئية.

**التصحيح:** توحيد نمط واحد على مستوى كافة الملفات.

---

### QUAL-002 🟡 التعليقات باللغة العربية داخل الكود المصدري

**الملفات:** تحتوي عدة متحكمات وخدمات على تعليقات عربية:

```csharp
// 🚨 Security Warn: Refused file upload attempt  ← English
// 🔒 صمام الأمان لمنع اختراق الـ BOLA            ← Arabic
// DevSecOps IDOR Guard                             ← English
```

**الأثر:** المطورون غير الناطقين بالعربية لن يفهموا مقصد الكود. يجب أن تكون التعليقات بلغة المشروع الأساسية (الإنجليزية).

**التصحيح:** ترجمة جميع التعليقات للغة الإنجليزية.

---

### QUAL-003 🟡 تعريف DTOs داخل ملفات المتحكمات

**الملف:** [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L18-L21)

```csharp
public class UploadResultDto
{
    public string Url { get; set; } = string.Empty;
}
```

و [GoogleAuthController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/GoogleAuthController.cs#L251-L255):

```csharp
public class GoogleLoginRequestDto
{
    public string IdToken { get; set; } = string.Empty;
    public string? SubscriptionPlan { get; set; }
}
```

**الأثر:** كسر نمط اكتشاف الـ DTOs لربطها في مكان واحد. المطورون الآخرون لن يجدوها في مجلد `Core/DTOs`.

**التصحيح:** نقلها إلى `Structo.Core.DTOs.Auth` و `Structo.Core.DTOs.Common`.

---

### QUAL-004 🟡 تكرار منطق استخراج Tenant Claim

كل متحكم يستخرج `tenantId` من توكن الـ JWT بكود مختلف قليلاً:

```csharp
// النمط أ: عبر ITenantContextAccessor
var tenantId = tenantContextAccessor.GetCurrentTenantId();

// النمط ب: قراءة كليمز يدوياً
var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "tenantId");
Guid? tenantId = tenantIdClaim != null && Guid.TryParse(tenantIdClaim.Value, out var parsedId) ...

// النمط ج: استخدام FindFirstValue مباشرة
var raw = User.FindFirstValue("tenantId");
```

**الأثر:** أكثر من 4 تنفيحات مختلفة لنفس المنطق، مما يفتح الباب لأخطاء صامتة.

**التصحيح:** توحيد الاستخدام على `ITenantContextAccessor.GetCurrentTenantId()` في كل مكان.

---

### QUAL-005 🟡 غياب التحقق من المدخلات في عدة نقاط نهاية

| نقطة النهاية | التحقق المفقود |
|---|---|
| `POST /api/employees` | لا يوجد القائمة البيضاء للأدوار — يمكن تعيين `Role = SuperAdmin` |
| `POST /pettycash/{id}/approve` | قد يحتوي `PettyCashApproveDto` على `Amount = 0` لمصدر الصندوق |
| `PUT /tenant-profile/update` | لا يوجد حد أقصى لطول `CompanyDescription` بعد قيود الداتا بيز |
| `POST /projects/{id}/budget-revision` | الميزانية الجديدة قد تكون 0 أو بالسالب |

---

### QUAL-006 🟢 نصوص سحرية (Magic Strings) لقيم الحالات

عبر الكود، تستخدم مقارنات حالة المشروع نصوصاً مجردة:

```csharp
if (project.Status == "PendingActivation" && CurrentUserRole != "SuperAdmin")
```

برغم أن `Status` يمتلك `HasConversion<string>()` في EF، إلا أن كود المتحكمات يقارن مع نصوص عادية بدلاً من الـ Enum.

**التصحيح:** استخدام `ProjectStatus.PendingActivation` بانتظام.

---

### QUAL-007 🟢 عدم استخدام `IServiceScopeFactory` المحقون في `EmployeeManagementController`

يُحقن `_scopeFactory` ويُستخدم فقط لبريد الخلفية. يُفضل استخراجه لخدمة `IEmailBackgroundService` تقليلاً للتعقيد.

---

### QUAL-008 🟢 كود ميت معطل (Commented-out code)

**الملفات:**
- [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L81): `//await DeleteFileAsync(tenant.LogoUrl);`
- [ImageUploadController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/ImageUploadController.cs#L136): `//await DeleteFileAsync(tenant.BannerUrl);`

**التصحيح:** إزالة الكود الميت.

---

## 5. مشاكل الواجهة الأمامية

### FE-001 🟠 مسارات بديلة تحمّل المكون الخاطئ (Placeholder Routes Issue)

**الملف:** [app.routes.ts](file:///e:/private/structo/structo/Structo.Client/src/app/app.routes.ts#L72-L81)

```typescript
{
  path: 'users',
  loadComponent: () => import('./features/dashboard/projects/projects.component')
    .then(m => m.ProjectsComponent),  // ← خطأ: يجب أن يكون UsersComponent
},
{
  path: 'profile',
  loadComponent: () => import('./features/dashboard/projects/projects.component')
    .then(m => m.ProjectsComponent),  // ← خطأ: يجب أن يكون ProfileComponent
},
```

**الأثر:** مسارا `/dashboard/users` و `/dashboard/profile` يعرضان صفحة المشاريع بدلاً من المكونات المخصصة لها.

**التصحيح:** إنشاء `UsersComponent` و `ProfileComponent` وتحديث الاستيراد.

---

### FE-002 🟡 حفظ التوكنز في LocalStorage (مخاطر XSS)

**الملف:** [auth.service.ts](file:///e:/private/structo/structo/Structo.Client/src/app/core/services/auth.service.ts#L151)

```typescript
localStorage.setItem(this.tokenKey, token);
```

**الأثر:** أي ثغرة XSS في تطبيق Angular (أو مكتبة خارجية ملوثة) تستطيع سرقة الـ JWT و Refresh Token من LocalStorage.

**التصحيح:** استخدام كوكيز `HttpOnly` لحفظ التوكن (يتطلب تعديلات في CORS/CSRF)، أو استخدام SessionStorage مع الذاكرة المؤقتة.

---

### FE-003 🟡 غياب التحقق من الأدوار للمسارات الفرعية

**الملف:** [app.routes.ts](file:///e:/private/structo/structo/Structo.Client/src/app/app.routes.ts#L44-L91)

يتأكد `authGuard` من `route.data.roles` فقط للمسارات التي تفعل ذلك صراحة. عدة مسارات فرعية لا تمتلك `data: { roles: [...] }` مما يسمح لأي مستخدم مسجل بدخولها.

مثال: `/dashboard` (المسار الفرعي الفارغ) يقوم بالتحويل فقط. ولكن عند إضافة مسارات جديدة بدون تحديد `data.roles` فستكون غير محمية افتراضياً.

**التصحيح:** إضافة `data.roles` لجميع الأبناء، أو تطبيق نمط المنع الافتراضي في الحارس.

---

### FE-004 🟡 محول JWT (Interceptor) — لا يوجد توجيه بعد الخروج

**الملف:** [jwt.interceptor.ts](file:///e:/private/structo/structo/Structo.Client/src/app/core/interceptors/jwt.interceptor.ts#L54-L60)

عند فشل التجديد، يتم استدعاء `authService.logout()` ولكن دون عمل `router.navigate(['/login'])`. يظل المستخدم في الصفحة الحالية وهو خارج النظام مما يجعله يرى بيانات قديمة.

**التصحيح:** حقن `Router` والتوجيه لصفحة `/login` فور الخروج.

---

### FE-005 🟢 نسبة الإنجاز ثابته في الكود (Hardcoded Progress)

تعيد نقطة نهاية عرض العميل `Progress = 45` كقيمة ثابتة. يجب حسابها بناءً على المراحل الفعلية للمشروع أو إدخال يدوياً.

---

## 6. مخاوف الأداء

### PERF-001 🟡 احتمالية مشكلة N+1 Query في تقرير المطابقة

**الملف:** [ProjectService.cs](file:///e:/private/structo/structo/Structo.Core/Services/ProjectService.cs) — `GetReconciliationReportAsync`

يدور التقرير حول سجلات العُهد ويحمل بيانات المستخدمين بشكل كسول (Lazy Loading)، مما يتسبب في N+1 استعلامات لكل موظف.

**التصحيح:** التحميل المسبق الصريح عبر `.Include(pc => pc.IssuedToUser)`.

---

### PERF-002 🟡 غياب الترقيم (Pagination) لطلب الإشعارات

**الملف:** [NotificationsController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/NotificationsController.cs#L33-L37)

يعيد "أحدث 50 إشعار" بحد ثابت. المستأجرون ذوو النشاط العالي يستلزمون ترقيماً قابلاً للإعداد.

---

### PERF-003 🟡 إعادة حساب التقييم الحي مع كل طلب للدليل

**الملف:** [PublicDirectoryController.cs](file:///e:/private/structo/structo/Structo.API/Controllers/PublicDirectoryController.cs)

يتم حساب تقييمات المستأجرين عبر أخذ المتوسط لجميع تقييمات المشاريع في كل طلب GET للدليل. للمستأجرين ذوي المشاريع الكثيرة، هذا تجميع غير محدود.

**التصحيح:** الحساب المسبق وتخزين `Tenant.Rating` عند تقديم المراجعات. تم تطبيقه جزئياً — التأكد من أن `SaveChangesAsync` يحدّث `Tenant.Rating`.

---

### PERF-004 🟢 غياب الفهارس (Indexes) باستثناء المفاتيح الأساسية

يعرّف المشروع المفاتيح الأساسية وفهرساً فريداً واحداً لـ `PublicReviewToken`. الفهارس المفقودة:
- `Projects.TenantId` (مفلتر بكثرة)
- `PettyCashes.ProjectId + Status` (مستخدم في المطابقة)
- `FinancialTransactions.ProjectId + Type` (مستخدم في حساب الميزانيات)
- `Users.Email` (مستخدم في الدخول والتأكد من التكرار)
- `Tenants.Status` (مستخدم في استعلامات الدليل)

**التصحيح:** إضافة فهارس مركبّة لأنماط الاستعلام المكررة.

---

## 7. مشاكل DevOps والإعدادات

### DEV-001 🟠 أصول CORS المحددة ثابتاً في الكود (Hardcoded CORS)

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L48)

```csharp
policy.WithOrigins("http://localhost:4500", "https://structo-production.up.railway.app")
```

**الأثر:** إضافة بيئات جديدة (Staging, QA) تتطلب تعديل الكود وإعادة النشر.

**التصحيح:** القراءة من `appsettings.json` أو متغيرات البيئة: `"Cors:AllowedOrigins": ["...", "..."]`.

---

### DEV-002 🟠 إصلاح الداتا بيز المكتوب ثابتاً عند الإقلاع

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L358-L385)

```csharp
var targetProj = context.Projects.IgnoreQueryFilters()
    .FirstOrDefault(p => p.Id == Guid.Parse("436abb4b-529f-4a9a-b559-e2f5c66e071f"));
if (targetProj != null)
{
    targetProj.TenantId = Guid.Parse("65ea11dc-d7cd-48fe-917c-508d1be80632");
    // ...تعديل الصناديق والعُهد والتسويات
}
```

**الأثر:** كود ترقيعي مدمج عند بدء التطبيق يعمل مع كل تشغيل. إذا كانت البيانات سليمة بالفعل، فهذا عمل ضائع. إذا حذفت الكيانات، لن ينطبق الترقيع.

**التصحيح:** نقله لـ Migration منفصل أو حذفه إذا تم التطبيق مسبقاً.

---

### DEV-003 🟡 كشف Swagger في الإنتاج

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L398-L403)

```csharp
// Swagger (مفعل دائماً لهذا المشروع)
app.UseSwagger();
app.UseSwaggerUI(...)
```

**الأثر:** توثيق واجهة الـ API بالكامل مرئي لأي شخص على `/swagger`.

**التصحيح:** حمايته بـ `if (app.Environment.IsDevelopment())` أو فرض مصادقة للوصول إلى Swagger في الإنتاج.

---

### DEV-004 🟡 إدراج بيانات البذرة في كل تشغيل

**الملف:** [Program.cs](file:///e:/private/structo/structo/Structo.API/Program.cs#L299-L356)

يتأكد منطق البذرة من `!context.Users.Any(...)` و `!context.Tenants.Any(...)` لمنع التكرار. ومع ذلك، إذا تم حذف حساب SuperAdmin، سيعاد إنشاؤه بكلمة المرور الثابتة مع التشغيل التالي.

**التصحيح:** النقل لـ EF Core `HasData()` مع تتبع الهجرات.

---

### DEV-005 🟢 غياب نقطة نهاية فحص الصحة (Health Check)

لا توجد نقطة نهاية `/health` أو `/healthz`. منصات مثل Railway والكونتينرات تحتاج هذا لفحوصات الجاهزية والاستجابة.

**التصحيح:** إضافة `builder.Services.AddHealthChecks().AddNpgSql(...)` و `app.MapHealthChecks("/health")`.

---

### DEV-006 🟢 غياب إعداد السجلات المهيكلة (Structured Logging)

يتم استخدام `ILogger` بشكل صحيح لكن لا يوجد مصب سجلات مهيكل (Serilog, Seq) مُعدّ. تُكتب السجلات للكونسول فقط.

**التصحيح:** إضافة Serilog لمراقبة بيئة الإنتاج.

---

## 8. الميزات المفقودة والفجوات

### GAP-001 🟠 غياب سجل التتبع / الأنشطة (Audit Trail)

العمليات المالية (الموافقات، الحذف، تغيير الحالات) لا تملك سجل تدقيق غير قابل للتغيير. `ProjectBudgetLog` موجود لتغييرات الميزانية فقط. يمكن لماسب خبيث حذف معاملات دون أي أثر.

**التصحيح:** إنشاء كيان `AuditLog` يحتوي على: `Action`, `EntityType`, `EntityId`, `UserId`, `Timestamp`, `OldValue`, `NewValue`.

---

### GAP-002 🟠 غياب نقطة نهاية تغيير / استعادة كلمة المرور

لا يستطيع المستخدمون تغيير كلمة مرورهم بعد التسجيل الأولي. لا يوجد تدفق نسيان كلمة المرور.

**التصحيح:** إضافة `POST /api/auth/change-password` و `POST /api/auth/forgot-password` باستخدام رمز OTP عبر البريد.

---

### GAP-003 🟡 غياب الحذف اللطيف (Soft Delete)

كافة عمليات الحذف هي حذف نهائي من الداتا بيز. السجلات المالية (المعاملات، العُهد، التسويات) يجب ألا تُحذف أبداً في النظام المحاسبي.

**التصحيح:** إضافة حقول `IsDeleted` / `DeletedAt` وتجاوز فلاتر الاستعلام.

---

### GAP-004 🟡 غياب الترقيم في قائمة المستخدمين

يعيد `GET /api/users` كافة المستخدمين بدون ترقيم. للمستأجرين الذين يمتلكون مئات الموظفين، هذه مشكلة أداء وقابلية للتوسع.

---

### GAP-005 🟡 غياب قيد فرادة البريد على مستوى الداتا بيز

يتم التحقق من فرادة البريد عبر الكود فقط (`Users.AnyAsync(...)`) دون وجود فهرس فريد `UNIQUE` في مخطط الجدول. قد تتسبب ظروف السباق في تكرار البريد.

**التصحيح:** إضافة `entity.HasIndex(e => e.Email).IsUnique()` في `OnModelCreating`.

---

### GAP-006 🟡 غياب إسناد المشروع للمهندسين

حقل `ManagerId` في جدول `Project` يُستخدم للتحكم بالوصول (المهندس يصل للمشروع إذا كان `ManagerId == userId`)، ولكن لا يتوفر مفهوم لإسناد عدة مهندسين لمشروع واحد.

**التصحيح:** إنشاء جدول `ProjectMember` لإسناد مهندسين متعددين.

---

### GAP-007 🟡 غياب إصدارات الـ API (Versioning)

جميع نقاط النهاية في `/api/...` بدون بادئة إصدار (`/api/v1/...`). التغييرات الجوهرية ستؤثر على كافة العملاء بالتوازي.

---

### GAP-008 🟢 غياب مجموعة الاختبارات الآلية

لا تحتوي الحلول على أي مشاريع اختبارات. لا توجد اختبارات وحدات (Unit Tests) أو اختبارات تكامل (Integration Tests).

---

### GAP-009 🟢 غياب وسيط تسجيل الطلبات/الاستجابات (Logging Middleware)

باستثناء `ExceptionHandlingMiddleware`، لا يوجد تسجيل للطلبات والاستجابات لغايات تصحيح الأخطاء أو الامتثال.

---

### GAP-010 🟢 غياب تحديد المعدل باستثناء تسجيل الدخول

نقطة تسجيل الدخول فقط تمتلك تحديد المعدل (`loginPolicy`: 5 طلب/دقيقة). النقاط المالية ورفع الملفات والتسجيل لا تمتلك حدوداً، مما يسمح بسوء الاستخدام.

---

## 9. خريطة الحرارة الملخصة

### حسب الخطورة

| الخطورة | العدد | العناصر |
|---|:---:|---|
| 🔴 **حرج** | 4 | SEC-001, SEC-002, SEC-003, SEC-004 |
| 🟠 **عالي** | 13 | SEC-005, SEC-006, SEC-007, SEC-008, ARCH-001, ARCH-002, ARCH-005, BUG-001, BUG-002, BUG-003, DEV-001, DEV-002, GAP-001, GAP-002 |
| 🟡 **متوسط** | 22 | SEC-009, SEC-010, ARCH-003 إلى ARCH-006, BUG-004 إلى BUG-007, QUAL-001 إلى QUAL-005, FE-001 إلى FE-004, PERF-001 إلى PERF-003, DEV-003 إلى DEV-004, GAP-003 إلى GAP-007 |
| 🟢 **منخفض** | 10 | QUAL-006 إلى QUAL-008, FE-005, PERF-004, DEV-005, DEV-006, GAP-008 إلى GAP-010 |

### حسب الفئة

| الفئة | 🔴 | 🟠 | 🟡 | 🟢 | الإجمالي |
|---|:---:|:---:|:---:|:---:|:---:|
| **الأمان** | 4 | 4 | 2 | — | **10** |
| **الهيكلية** | — | 3 | 3 | — | **6** |
| **منطق الأعمال** | — | 3 | 4 | — | **7** |
| **جودة الكود** | — | — | 5 | 3 | **8** |
| **الواجهة الأمامية** | — | 1 | 3 | 1 | **5** |
| **الأداء** | — | — | 3 | 1 | **4** |
| **DevOps** | — | 2 | 2 | 2 | **6** |
| **الفجوات والميزات** | — | 2 | 5 | 3 | **10** |
| **الإجمالي** | **4** | **15** | **27** | **10** | **56** |

### ترتيب الأولويات للإصلاح

1. **فوري (قبل الإنتاج):** SEC-001 إلى SEC-004 — كافة كلمات المرور والمفاتيح الثابتة
2. **المرحلة 1:** SEC-005, SEC-006, BUG-003 (التزامن), GAP-002 (استعادة كلمة المرور), GAP-005 (فرادة البريد)
3. **المرحلة 2:** ARCH-001 (المتحكمات الضخمة), BUG-001 (التحقق من الميزانية), FE-001 (المسارات الخاطئة), DEV-001 (CORS)
4. **المرحلة 3:** GAP-001 (سجل الأنشطة), GAP-003 (الحذف اللطيف), ARCH-006 (EnsureCreated), DEV-002 (ترقيع الإقلاع)
5. **مستمر:** تحسين جودة الكود، فهارس الأداء، كتابة الاختبارات الآلية
