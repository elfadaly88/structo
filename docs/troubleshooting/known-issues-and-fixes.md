# Known Issues & Fixes Log

> ملف مرجعي لكل المشاكل المتكررة أو المهمة التي تمت مواجهتها وحلها في هذا المشروع، مع توثيق الأسباب الجذرية والحلول النموذجية.
> **قاعدة عمل دائمة:** يجب مراجعة هذا الملف عند ظهور أي سلوك غير متوقع، كما يجب توثيق أي مشكلة جديدة تُحل مستقبلاً كـ Entry جديد في قمة هذا الملف (الأحدث أولاً).

---

## [006] - فجوة خط أنابيب النشر (Deployment Pipeline Gap) وحلها بـ Multi-Stage Docker Build ونقطة التحقق `/api/version`

**Date / التاريخ:** 20 August 2026 / 20 أغسطس 2026

**الأعراض (Symptoms):**
- استمرار ظهور مشاكل في بيئة الإنتاج على Railway رغم كتابة الإصلاحات بدقة في سورس كود الفرونت إند (`Structo.Client/`) وتوثيقها في السجل.
- تبين أن سيرفر النشر على Railway كان يبني فقط حاوية دوت نت عبر `dotnet publish Structo.API.csproj` معتمداً على الملفات الثابتة المخزنة مسبقاً في `Structo.API/wwwroot`، مما يعني أن أي تعديل في TypeScript لم يكن يُترجم إلى JavaScript في الإنتاج إلا إذا تم تذكر بناء `npm run build` يدوياً قبل كل Commit.

**السبب الجذري (Root Cause):**
- غياب خط أنابيب بناء متعدد المراحل (Multi-stage Docker Build) يربط دورة بناء الفرونت إند بالباك إند بصورة هيكلية حتمية غير قابلة للإغفال البشري.

**الحل الهيكلي الدائم (Definitive Structural Solution):**
1. **تحويل ملف [`Dockerfile`](file:///f:/PrivateWork/structo/project/Dockerfile) إلى Multi-Stage Docker Build:**
   - **المرحلة 1 (Client Build Stage):** استخدام صورة `node:22-alpine` لتنفيذ `npm ci` و `npm run build -- --configuration=production` طازجاً من السورس كود.
   - **المرحلة 2 (Backend Build Stage):** استخدام صورة `mcr.microsoft.com/dotnet/sdk:9.0` ونسخ نواتج بناء الفرونت إند مباشرة من المرحلة 1 إلى `Structo.API/wwwroot/` قبل تنفيذ `dotnet publish`.
   - **المرحلة 3 (Runtime Stage):** تشغيل الـ API الخفيف على `mcr.microsoft.com/dotnet/aspnet:9.0`.
2. **إضافة نقطة التحقق الفوري للنسخة [`/api/version`](file:///f:/PrivateWork/structo/project/Structo.API/Program.cs#L675) و `/version`:**
   - نقطة نهاية عامة ترجع بصمة الـ Build وحالة خط الأنابيب والـ Safety Interceptors مباشرة للتأكد بنقرة واحدة من مطابقة السيرفر المباشر لأحدث كود.

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] تحقق من وجود مراحل `FROM node:22-alpine AS client-build` داخل `Dockerfile`.
- [ ] افتح الرابط الحي `https://structo-production.up.railway.app/api/version` وتأكد من أن الاستجابة ترجع بيانات النسخة وخط الأنابيب.
- [ ] أي تعديل في الفرونت إند يتم نشره مباشرة إلى Railway ويُبنى تلقائياً دون الحاجة لأي بناء يدوي مسبق.

---

## [005] - عدم ظهور البيانات/الواجهة إلا بعد النقر (Exhaustive System-Wide Sweep & Structural Change Detection Safety Net)

**Date / التاريخ:** 20 August 2026 / 20 أغسطس 2026

**الأعراض (Symptoms):**
- تأخر تحديث الـ DOM أو عدم ظهور البيانات القادمة من الـ HTTP Calls في بعض المودالات (مثل Force Purge Modal في `tenants.component.ts`) إلا بعد تفاعل يدوي، بالرغم من تطبيق إصلاح `provideZoneChangeDetection` سابقاً.
- تبين أن الاعتماد على اختبار "عينة تمثيلية من الشاشات" (6 شاشات) في المرة السابقة كان غير كافٍ لتغطية كل المودالات والتفاعلات الفرعية، مما استلزم إجراء مسح شامل 100% لكل ملف ومكون في المشروع بدون أي استثناء.

**السبب الجذري (Root Cause):**
- في بعض دورات الأحداث غير المتزامنة ومسارات الـ RxJS المعقدة، قد تتأخر دورة الـ Change Detection أو لا يتم تشغيل `ApplicationRef.tick()` فور انتهاء معالجات الـ `.subscribe()` الفرعية قبل حدوث حدث DOM تفاعلي جديد.

**الحل الجذري النهائي وشبكة الأمان الهيكلية (Structural Safety Net):**
1. **تأكيد وضمان محرك Zone.js في [`app.config.ts`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/app.config.ts) و [`angular.json`](file:///f:/PrivateWork/structo/project/Structo.Client/angular.json):**
   - استمرار تفعيل `provideZoneChangeDetection({ eventCoalescing: true })`.
   - استمرار تضمين `"zone.js"` في `polyfills`.
2. **إضافة الـ Interceptor الهيكلي للأمان ([`change-detection-safety.interceptor.ts`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/core/interceptors/change-detection-safety.interceptor.ts)):**
   - تم إنشاء وتفعيل `changeDetectionSafetyInterceptor` على مستوى التطبيق بالكامل داخل `provideHttpClient(withInterceptors([...]))`.
   - يقوم الـ Interceptor بتنفيذ `queueMicrotask(() => appRef.tick())` داخل `ngZone.run()` فور اكتمال أي طلب HTTP (سواء نجاح أو خطأ)، مما يضمن بنسبة 100% قيام Angular بعمل Change Detection Cycle فوري لتحديث كافة الـ Signals والـ DOM فور انتهاء معالجات الـ `.subscribe()` في أي Component دون الحاجة لأي نقرات أو تفاعل يدوي.
3. **مسح وتدقيق حرفي وشامل لكافة ملفات المشروع الـ 15 التي تستخدم `.subscribe()` وجميع مكونات التطبيق الـ 21.**

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] تأكد من وجود `changeDetectionSafetyInterceptor` مسجلاً في `app.config.ts`.
- [ ] تأكد من وجود `provideZoneChangeDetection({ eventCoalescing: true })` في `app.config.ts`.
- [ ] تأكد من أن أي Hard Refresh (Ctrl+Shift+R) يعرض البيانات فورياً وكاملاً على أي شاشة أو مودال.

---

## [004] - Layout/Header Responsiveness & System-Wide Mobile UX Consistency Pass

**Date / التاريخ:** 15 August 2026 / 15 أغسطس 2026

**الأعراض (Symptoms):**
- **Mobile Header Overcrowding:** On narrow viewports (375px–390px), the top navbar in [`DashboardLayoutComponent`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/dashboard-layout.component.ts) rendered all action buttons inline (hamburger, logo, upgrade plan badge, language switcher, notification bell, user role badge, and logout button). This caused visual crowding and horizontal overflow.
- **Red Destructive Logout Button:** Logout buttons in both the header and sidebar drawer were styled with red danger colors (`text-red-400`, `hover:bg-red-950/20`), violating UX design guidelines that reserve red for irreversible destructive actions.
- **Currency Label Multi-Line Fragmentation:** KPI cards displayed `{{ 'COMMON.CURRENCY' | translate }}` which rendered as "الجنيه المصري", causing awkward line wraps on small mobile screens.
- **SuperAdmin Hub Missing Mobile Cards:** The SuperAdmin [`TenantsComponent`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/tenants/tenants.component.ts) had a desktop-only 7-column table requiring wide horizontal scrolling on mobile.
- **Persistent Repeating Info Banners:** Section explanation banners (such as site petty cash guides) occupied persistent vertical space without dismissibility.

**السبب الجذري (Root Cause):**
- Lack of a consolidated mobile user menu/dropdown in the shared layout component.
- The Arabic i18n translation key `"CURRENCY"` used the full name `"الجنيه المصري"` rather than the standard compact symbol `"ج.م"`.
- Table views on newer SuperAdmin management screens lacked mobile card alternative layouts (`hidden md:block` / `block md:hidden`).

**الحل (Fix):**
1. **Restructured Shared Header & User Menu ([`DashboardLayoutComponent`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/dashboard-layout.component.ts)):**
   - Consolidated user identity, tenant info, and sign-out into a sleek dropdown popover controlled via zoneless signals (`isUserMenuOpen`).
   - Compacted upgrade capacity button for narrow mobile viewports.
   - Replaced red destructive styling on logout buttons with neutral standard SaaS styling (`bg-slate-800/80 hover:bg-slate-700 text-slate-200`).
2. **Standardized Currency Symbol ([`ar.json`](file:///f:/PrivateWork/structo/project/Structo.Client/src/assets/i18n/ar.json)):**
   - Changed `"CURRENCY"` to `"ج.م"` (and added `"CURRENCY_FULL": "الجنيه المصري"`), standardizing compact KPI cards across all screens.
3. **Added Mobile Cards View to SuperAdmin Tenants Hub ([`TenantsComponent`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/tenants/tenants.component.ts)):**
   - Created mobile card layout (`block md:hidden`) with full touch target buttons ($\ge 44\text{px}$) for Exemption toggle, Audit inspection, Manual upgrade, and Force Purge.
4. **Made Repetitive Tab Info Banners Dismissible ([`ProjectDetailsComponent`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/dashboard/projects/project-details.component.ts)):**
   - Added dismiss button with `isTabInfoDismissed` signal to minimize visual clutter for returning users.
5. **Enhanced Leaflet Map Mobile Container ([`TenantRegisterComponent`](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/features/auth/tenant-register/tenant-register.component.ts)):**
   - Adjusted map container to `h-[220px] sm:h-[280px]` with strict compliance to high-precision decimal preservation for latitude/longitude.

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] Verify header at 375px viewport: ensure elements do not exceed navbar boundaries or wrap into multiple rows.
- [ ] Check KPI cards on mobile: verify currency labels display cleanly as "ج.م" / "EGP" without multi-line wrapping.
- [ ] Verify that logout buttons use neutral slate styling, reserving red strictly for delete/purge actions.
- [ ] Ensure all table-based management screens have an accompanying `block md:hidden` card view.

---

## [003] - Recurring Anti-Pattern: Null-Passthrough Multi-Tenancy Query Filters (2nd Occurrence — ProjectMember, then Notification & System-Wide Audit)

**Date / التاريخ:** 15 August 2026 / 15 أغسطس 2026

**الأعراض (Symptoms):**
- This exact anti-pattern was independently introduced / discovered TWICE in the same project, driven by the same "quick fix" reasoning each time:
  1. **First occurrence:** During the `ProjectMember` / Two-Way Assignment feature, the filter was changed to `CurrentTenantId == null || pm.TenantId == CurrentTenantId` to "fix" a failing test context where `CurrentTenantId` was null.
  2. **Second occurrence:** Discovered independently already pre-existing on the `Notification` entity (`CurrentTenantId == null || e.TenantId == null || e.TenantId == CurrentTenantId`). It surfaced **only** because the raw emitted SQL was inspected directly during a verification step — it was **NOT** caught by build success, E2E test passes, or even the developer's own "confirmed strict" claim the first time it was reported as fixed.
  3. **Full Audit Finding:** The subsequent system-wide audit revealed that the exact same anti-pattern was lurking across **all** tenant entities (`User`, `Project`, `FinancialTransaction`, `PettyCash`, `SitePhoto`, `ProjectCashPool`, `Settlement`, `SettlementLine`, `ProjectBudgetLog`).

**السبب الجذري (Root Cause):**
- Both cases stem from the same underlying temptation: when a background job, test runner, or unauthenticated edge-case context doesn't have a `CurrentTenantId` populated correctly, a strict query filter returns zero rows.
- The fastest-looking (and most dangerous) fix is to loosen the **GLOBAL** filter with an `OR CurrentTenantId == null` or `OR e.TenantId == null` clause, instead of fixing the actual context/call site that's missing proper tenant resolution or explicitly opting out via `.IgnoreQueryFilters()`.
- When `CurrentTenantId` is null (e.g. unauthenticated request, leaked token, or misconfigured middleware), a null-passthrough filter silently exposes **ALL tenants' data** across the entire database.

**الحل (Fix):**
1. **Revert ALL Global Query Filters to Strict Equality (`e.TenantId == CurrentTenantId`):**
   In [`StructoDbContext.cs`](file:///f:/PrivateWork/structo/project/Structo.Infrastructure/Data/StructoDbContext.cs), every tenant-scoped entity was converted to a strictly scoped filter with **zero** OR / null-passthrough clauses:
   ```csharp
   modelBuilder.Entity<User>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<Project>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<ProjectMember>().HasQueryFilter(pm => pm.TenantId == CurrentTenantId);
   modelBuilder.Entity<FinancialTransaction>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<PettyCash>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<SitePhoto>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<ProjectCashPool>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<Settlement>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<SettlementLine>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<Notification>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<SubscriptionTransaction>().HasQueryFilter(e => e.TenantId == CurrentTenantId);
   modelBuilder.Entity<ProjectBudgetLog>().HasQueryFilter(p => p.Project!.TenantId == CurrentTenantId);
   ```
2. **Eliminated Local Controller & Service Predicate Bypasses:**
   - Fixed [`SitePhotosController.cs:L153`](file:///f:/PrivateWork/structo/project/Structo.API/Controllers/SitePhotosController.cs#L153) where `(currentTenantId == null || p.TenantId == currentTenantId)` was removed and replaced with strict `p.TenantId == currentTenantId`.
   - Updated [`ProjectAccessService.cs`](file:///f:/PrivateWork/structo/project/Structo.Core/Services/ProjectAccessService.cs) and [`NotificationEngine.cs`](file:///f:/PrivateWork/structo/project/Structo.Core/Services/NotificationEngine.cs) to explicitly validate `p.TenantId == tenantId` parameters with `.IgnoreQueryFilters()`, removing reliance on ambient context.
3. **Audited Background Jobs, Startup Seed Scripts, and Identity Lookups:**
   - Startup seed queries in [`Program.cs:L429-475`](file:///f:/PrivateWork/structo/project/Structo.API/Program.cs#L429-L475) explicitly use `.IgnoreQueryFilters()`.
   - All background scans in [`TenantCleanupService.cs`](file:///f:/PrivateWork/structo/project/Structo.Core/Services/TenantCleanupService.cs) and `TenantCleanupWorker` explicitly use `.IgnoreQueryFilters()`.
4. **Inspect Raw Emitted SQL:**
   - Verified that the SQL emitted by EF Core for tenant queries contains strictly `WHERE n."TenantId" = @__CurrentTenantId_0` with zero trailing `OR TenantId IS NULL`.

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] Run a system-wide regex search across all folders:
  ```bash
  grep -rnE "(CurrentTenantId|TenantId|currentTenantId|tenantId)\s*==\s*null\s*\|\|" Structo.API/ Structo.Core/ Structo.Infrastructure/
  ```
  ANY hit that loosens a query predicate is an **IMMEDIATE red flag** and must be rejected in code review.
- [ ] **Critical Rule:** Do **NOT** trust "I confirmed it's strict" claims at face value. The **only** reliable verification is inspecting the **ACTUAL SQL emitted by EF Core** (via logging/profiling) for the specific query in question, not just reading the C# `.Where()` clause, since a broader `HasQueryFilter()` on the entity can silently add conditions invisible in the local query code.
- [ ] Any time an AI agent or developer proposes "loosening a filter to fix a test/background job," the mandatory question is always: *"Why not `IgnoreQueryFilters()` at the specific call site instead?"*

**نتائج التحقق الفعلي الشامل (19/19 Live E2E Scenarios Passed):**
- All 19 integration test scenarios (11 from ProjectMember Access Control + 8 from Role-Based Notification Routing) were executed against the live database with real generated IDs and passed with 100% success (19/19 Passed, `success: true`).

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

**السبب الجذري الحقيقي (Root Cause):**
1. **استخدام وضع `provideZonelessChangeDetection` بدون `zone.js`:**
   - تم تفعيل وضع الـ Zoneless التجريبي وإزالة حزمة `zone.js`.
   - في غياب `zone.js`، لا يقوم محرك Angular بمراقبة الـ Asynchronous Browser APIs (مثل `XMLHttpRequest`, `fetch`, `setTimeout`, `RxJS Observables`, `SignalR`) تلقائياً.
   - الاعتماد على Zoneless في تطبيق كامل يعتمد على مكتبات خارجية (مثل `ngx-translate`, `Leaflet`, `SignalR`) ومسارات RxJS معقدة أدى إلى عدم قيام Angular بعمل Change Detection Cycle فور استلام البيانات عبر الـ HTTP، وظلت الـ DOM متوقفة حتى ينطلق أي DOM Event Listener تفاعلي (Click / Keydown / Scroll) من المستخدم ليوقظ الـ Scheduler.
2. **محاولات الترقيع الجزئي السابقة (Signals only):**
   - محاولة معالجة بعض المتغيرات كـ Signals لم تكن كافية نظراً لوجود مئات العمليات اللاتزامنية والـ Pipes و Directives (`*ngFor`, `TranslatePipe`, `DatePipe`) التي تحتاج لمراقبة شاملة ومستقرة للأحداث غير المتزامنة.

**الحل الجذري النهائي (Definitive Fix):**
1. **تثبيت حزمة `zone.js` رسمياً:**
   ```bash
   npm install zone.js --save
   ```
2. **إضافة `zone.js` إلى `polyfills` في [angular.json](file:///f:/PrivateWork/structo/project/Structo.Client/angular.json):**
   ```json
   "options": {
     "browser": "src/main.ts",
     "tsConfig": "tsconfig.app.json",
     "polyfills": [
       "zone.js"
     ],
     ...
   }
   ```
3. **إزالة `provideZonelessChangeDetection()` من [app.config.ts](file:///f:/PrivateWork/structo/project/Structo.Client/src/app/app.config.ts):**
   - العودة للمحرك القياسي الموثوق لـ Change Detection في Angular الذي يراقب كافة الأحداث والطلبات اللاتزامنية تلقائياً وبشكل فوري بدون الحاجة لأي نقرات يدوية من المستخدم.
4. **إعادة بناء حزمة الإنتاج (`npm run build`):**
   - التأكد من تضمين `polyfills-*.js` داخل حزمة الإنتاج وتحديث ملفات `Structo.API/wwwroot`.

**إزاي نعرف إن نفس المشكلة رجعت تاني (Detection Checklist):**
- [ ] تأكد من وجود `zone.js` داخل `dependencies` في `package.json`.
- [ ] تأكد من وجود `"polyfills": ["zone.js"]` في `angular.json`.
- [ ] تأكد من عدم وجود `provideZonelessChangeDetection` في `app.config.ts`.
- [ ] أي استدعاء HTTP أو SignalR يجب أن يعكس التغييرات فوراً في الواجهة دون الحاجة للنقر.

---

