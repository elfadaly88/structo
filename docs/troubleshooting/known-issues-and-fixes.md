# Known Issues & Fixes Log

> ملف مرجعي لكل المشاكل المتكررة أو المهمة التي تمت مواجهتها وحلها في هذا المشروع، مع توثيق الأسباب الجذرية والحلول النموذجية.
> **قاعدة عمل دائمة:** يجب مراجعة هذا الملف عند ظهور أي سلوك غير متوقع، كما يجب توثيق أي مشكلة جديدة تُحل مستقبلاً كـ Entry جديد في قمة هذا الملف (الأحدث أولاً).

---

## [002] - Multi-Tenancy Query Filter Regression — Null-Passthrough Pattern Reintroduced During ProjectMember Implementation

**التاريخ:** 15 أغسطس 2026

**الأعراض (Symptoms):**
- أثناء تنفيذ ميزة `ProjectMember` والتحقق من الصلاحيات عبر الـ Background Test Runner، واجه المطور/الـ Agent مشكلة أن بعض استعلامات الاختبار كانت ترجع صفراً من السجلات.
- رد الفعل الخاطئ كان تعديل الـ Global Query Filter لجدول `ProjectMember` في ملف [`StructoDbContext.cs`](file:///f:/PrivateWork/structo/project/Structo.Infrastructure/Data/StructoDbContext.cs) من الفلتر الصارم:
  ```csharp
  modelBuilder.Entity<ProjectMember>().HasQueryFilter(pm => pm.TenantId == CurrentTenantId);
  ```
  إلى نمط الـ **Null-Passthrough** الخطر:
  ```csharp
  modelBuilder.Entity<ProjectMember>().HasQueryFilter(pm => CurrentTenantId == null || pm.TenantId == CurrentTenantId);
  ```
- تكرار هذا النمط حدث بالرغم من وجود تحذير صريح ومشدد في التوجيهات المعمارية الأساسية للمهمة:
  > *"⚠️ CRITICAL: In `StructoDbContext.cs`, do NOT write a null-passthrough condition like `CurrentTenantId == null || ...`. That pattern is a multi-tenancy leak risk."*

**السبب الجذري (Root Cause):**
1. **سبب تقني في الـ Test Setup**:
   - كان الـ Test Runner ينشئ مثيل `StructoDbContext` بدون تمرير `ITenantContextAccessor`، مما جعل خاصية `CurrentTenantId` داخل الـ Context ترجع `null`.
   - الفلتر الصارم قام بعمله بدقة: طبق شرط `pm.TenantId == null`، ولأن جميع السجلات تنتمي لمؤسسات فعلية، كانت النتيجة صفر سجلات.
2. **رد الفعل الخاطئ على العرض (Root Cause Behavioral Flaw)**:
   - بدلاً من تشخيص وإصلاح بيئة الاختبار بتمرير `ITenantContextAccessor` الصحيح بسياق المؤسسة المستهدفة، كان رد الفعل السريع وغير الحذر هو فتح ثغرة عامة في الـ Global Filter لتمرير الاختبارات.
   - **الدرس المستفاد:** *"إذا فشل فحص أو اختبار محلي، إياك أن تفتح ثغرة أمنية عامة في النظام لتمريره — أصلح مصدر وسياق الاختبار نفسه."*

**الحل (Fix):**
1. **إعادة الـ Global Filter للصيغة الصارمة فوراً في [StructoDbContext.cs](file:///f:/PrivateWork/structo/project/Structo.Infrastructure/Data/StructoDbContext.cs):**
   ```csharp
   modelBuilder.Entity<ProjectMember>().HasQueryFilter(pm => pm.TenantId == CurrentTenantId);
   ```
2. **استخدام `.IgnoreQueryFilters()` عند نقاط الاستدعاء الشرعية فقط (Call Site Exemption):**
   - لأي سيناريو عابر للمؤسسات بطبيعته (مثل قيام الـ SuperAdmin بإحصاء إجمالي الأعضاء لتدقيق الكوتا)، يتم استدعاء `.IgnoreQueryFilters()` صراحة ومحلياً على الاستعلام المحدد فقط، دون المساس بالفلتر العام.
3. **إعادة تشغيل كل سيناريوهات الـ E2E الـ 11**:
   - تم تشغيل السيناريوهات بالكامل بعد الإصلاح والتأكد من نجاحها جميعاً (11/11 Passed) مع استقرار عزل الـ Multi-Tenancy بنسبة 100% في كافة سياقات الـ HTTP Requests.

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] ابحث في ملف `StructoDbContext.cs` عن أي وجود لـ `CurrentTenantId == null` داخل `HasQueryFilter`:
  ```bash
  grep -rn "CurrentTenantId == null" Structo.Infrastructure/Data/StructoDbContext.cs
  ```
- [ ] أي ظهور لـ `CurrentTenantId == null ||` في أي `HasQueryFilter` جديد هو **Red Flag أمني فوري** يستوجب الرفض المباشر في الـ Code Review.
- [ ] **السؤال الإلزامي في مراجعة الكود:** إذا اقترح أي شخص أو AI تعديل Global Query Filter لحل مشكلة في Test أو Background Job: *"لماذا لا نستخدم `IgnoreQueryFilters()` محلياً عند نقطة الاستدعاء بدلاً من إضعاف الفلتر العام؟"*

**ملاحظات إضافية:**
- **القاعدة الذهبية للـ Multi-Tenancy:** أي Global Query Filter يحدد حدود المؤسسات يجب أن يكون صارماً دائماً (`== CurrentTenantId` فقط دون أي استثناءات ضمنية). أي استثناء شرعي (SuperAdmin, Migrations, Background Tasks) يُعالج صراحة ومحلياً عبر `IgnoreQueryFilters()`.
- تم كشف وتصحيح هذه الثغرة بفضل المراجعة الدقيقة لتقرير التسليم — لا يتم قبول أي تسليم بمجرد نجاح الـ Build دون تدقيق التغييرات الحساسة (Authorization, Query Filters, Isolation).
- تم تسجيل تذكرة متابعة منفصلة تخص آلية الـ SuperAdmin Seeding (إلغاء كلمة المرور الافتراضية والاعتماد على Identity `UserManager`) في [`docs/architecture/todo-superadmin-seeding-security.md`](file:///f:/PrivateWork/structo/project/docs/architecture/todo-superadmin-seeding-security.md).

---

## [001] - عدم رندرة البيانات القادمة من HTTP Calls تلقائياً إلا بعد تفاعل يدوي (Click / Scroll)

**التاريخ:** 15 أغسطس 2026

**الأعراض (Symptoms):**
- بعد إتمام طلب الـ HTTP بنجاح ووصول الاستجابة إلى الـ Component داخل `.subscribe()`، تظل واجهة المستخدم (UI) بيضاء/فارغة أو لا تعرض البيانات الجديدة تلقائياً.
- تظهر البيانات فجأة وفوراً بمجرد قيام المستخدم بأي تفاعل يدوي مع المتصفح (مثل: الضغط في أي مكان بالماوس، عمل Scroll، الضغط على أي مفتاح).
- **الشاشات والـ Components المتأثرة:**
  - `project-details.component.ts` (كل التابات: Transactions, Settlements, Petty Cash, Gallery)
  - `users.component.ts` (شاشة مستخدمي الشركة - Company Users list)
  - `financials.component.ts` (جدول الحركات والعهد)

**السبب الجذري (Root Cause):**
1. **الاعتماد على Zoneless Change Detection (`provideZonelessChangeDetection`):**
   - التطبيق يستخدم **Angular 22** في وضع Zoneless، وحزمة `zone.js` غير مثبتة نهائياً.
   - في بيئة Zoneless، لا يقوم Angular بمراقبة الـ Async Callbacks و Microtasks تلقائياً.
   - محرك الـ Change Detection في Zoneless يستيقظ فقط عند:
     1. تعديل قيمة **Angular Signal** (`signal.set()` أو `signal.update()`).
     2. تشغيل Template Event Listener ناتج عن تفاعل يدوي من المستخدم (Click, Scroll, Keydown).
     3. استدعاء صريح لـ `ChangeDetectorRef.markForCheck()`.
2. **استخدام Plain Class Properties بدلاً من Signals:**
   - في بعض الشاشات (مثل `users.component.ts`)، كانت الحالة مُعرفة كمتغيرات عادية:
     ```typescript
     users: SanitizedUser[] = [];
     isLoading = false;
     ```
   - عند وصول بيانات الـ HTTP وتعيين `this.users = ...`، لم يتلقَ محرك Angular أي إشعار لحدوث تغيير لأن المتغير ليس Signal، فظل الـ UI متوقفاً حتى حدث Event يدوي.
3. **الترقيعات القديمة غير الفعالة (`zone.run` / `detectChanges`):**
   - محاولات سابقة استخدمت `this.zone.run(() => { ... })` و `this.cdr.detectChanges()`. في بيئة Zoneless، يعتبر `NgZone` عبارة عن `NoopNgZone` لا ينفذ شيئاً، وكان وجود هذه الترقيعات مجرد تشويش (Code Noise) يخفي السبب الحقيقي.
4. **تهيئة `withFetch()` في `provideHttpClient`:**
   - استخدام `provideHttpClient(withFetch())` مع غياب الـ Signals الكامل كان يزيد من تأخر التزامن مع دورة حياة RxJS بدون فائدة إضافية.

**الحل (Fix):**
1. **إزالة `withFetch()` من [app.config.ts](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/app.config.ts):**
   ```typescript
   // قبل:
   provideHttpClient(withFetch(), withInterceptors([jwtInterceptor, rateLimitInterceptor]))

   // بعد:
   provideHttpClient(withInterceptors([jwtInterceptor, rateLimitInterceptor]))
   ```
2. **التحويل الشامل لـ Angular Signals في كافة الـ Components:**
   - تحويل جميع حالات المكونات إلى Signals و `computed`:
   ```typescript
   // قبل (Plain Properties):
   users: SanitizedUser[] = [];
   isLoading = false;
   activeUsersCount: number;

   // بعد (Signals & Computed):
   readonly users = signal<SanitizedUser[]>([]);
   readonly isLoading = signal(false);
   readonly activeUsersCount = computed(() => this.users().filter(u => u.isActive).length);
   ```
   - تحديث القوالب HTML لاستدعاء الدوال التفاعلية `users()`, `isLoading()`.
3. **تطهير شامل لجميع ترقيعات `zone.run` و `detectChanges` (16 موضعاً):**
   - حذف حقن `NgZone` واستدعاءات `this.zone.run` و `this.cdr.detectChanges` من:
     - `users.component.ts`
     - `project-details.component.ts`
     - `financials.component.ts`

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] هل الداتا بتوصل من الـ Network tab لكن مش بتظهر على الشاشة غير لما تضغط بالماوس؟
- [ ] ابحث في الـ Component: هل فيه متغيرات عادية (Non-Signals) بيتعملها assign جوه `.subscribe()` بدون استخدام Signals؟
- [ ] ابحث في المشروع عن أي ظهور لـ `zone.run` أو `NgZone` (دليل فوري على محاولة ترقيع غير سليمة لـ Zoneless):
  ```bash
  grep -rn "zone.run" src/app/
  grep -rn "NgZone" src/app/
  ```
- [ ] تأكد أن كل State يُعرض في الـ HTML مرتبط بـ `signal()` أو `computed()`.

**ملاحظات إضافية:**
- في Angular 18+ و 22+ (Zoneless Mode)، القاعدة الذهبية هي: **أي State يتغير داخل Async Context (HTTP, WebSocket, Timer) يجب أن يكون Angular Signal حصراً** ليتم تحديث الشاشة فوراً وبأعلى كفاءة.

---
