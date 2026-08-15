# Known Issues & Fixes Log

> ملف مرجعي لكل المشاكل المتكررة أو المهمة التي تمت مواجهتها وحلها في هذا المشروع، مع توثيق الأسباب الجذرية والحلول النموذجية.
> **قاعدة عمل دائمة:** يجب مراجعة هذا الملف عند ظهور أي سلوك غير متوقع، كما يجب توثيق أي مشكلة جديدة تُحل مستقبلاً كـ Entry جديد في قمة هذا الملف (الأحدث أولاً).

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
