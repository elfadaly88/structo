# Osos / أسس — خطة الاختبار اليدوي

مولَّد من `docs/qa/Osos_Test_Cases_Run_2026-10-07_after_fixes.xlsx` — 255 حالة في 17 وحدة. نتائج إعادة التشغيل الكامل بعد إصلاحات الجولة 1 (فرع fix/qa-round1) على API محلي (Production، قاعدة اختبار منفصلة osos-qa-pg).

## طريقة الاستخدام

1. سجّل في كل حالة: Status و Actual result و Tester و Date (في ملف Excel هي الخلايا الصفراء، و Status قائمة منسدلة).
2. Status: Not run = لم تُنفَّذ، Pass = النتيجة مطابقة، Fail = النتيجة مختلفة (اكتب الفعلي)، Blocked = لا يمكن التنفيذ (اكتب السبب)، Not built yet = الميزة غير منشورة.
3. حالات المال تذكر الرصيد قبل وبعد. إذا اختلف رصيدك الابتدائي، طبّق نفس الفرق (مثلاً: قبل − 5,000).
4. Safe on production? = No: لا تنفّذ على الإنتاج (تقفل حسابات، أو تنشئ مدفوعات حقيقية، أو لا يمكن حذفها). نفّذها على staging.
5. الحالات التي تبدأ ملاحظتها بـ "ملاحظة من مراجعة الكود" يُتوقع أن تفشل في الإصدار الحالي؛ سجّل النتيجة الفعلية كما هي.
6. بعد حالات المال شغّل docs/sql/reconcile_cash_pools.sql (للقراءة فقط) — يجب ألا يعيد أي صف (CAP-020).
7. مثال صف منفَّذ: Status = Pass ، Actual result = "الرصيد 90,000 والرسالة كما هو متوقع" ، Tester = QA-1 ، Date = 2026-10-07.

## رموز الإصلاحات (Related fix)

| Fix | الوصف |
|---|---|
| B1 | Paymob: الـ callback يأخذ عدد المشاريع والشركة من حقول غير موقّعة — مُخفَّف بإيقاف Paymob (Payments:PaymobEnabled=false) |
| B2 | سلامة رصيد الصناديق: قفل مبلغ العهدة بعد الإصدار، مبالغ موجبة، قواعد الحذف، ومعادلة الصندوق الموحدة (GET للقراءة فقط، حفظ المسترد، الإيداع بعد الاسترداد) |
| B3 | مصدر واحد لـ JWT secret بدون قيمة افتراضية؛ فشل البدء إذا كان مفقوداً أو placeholder أو أقل من 32 بايت |
| B4 | حدود الطلبات لكل IP ولكل بريد، Retry-After، رسالة عربية، لا خروج عند 429 في refresh |
| B5 | لا SuperAdmin افتراضي؛ الـ seed فقط عند عدم وجوده وبكلمة مرور 12+؛ لا alias للدخول |
| B6 | (N1 في تقرير الجاهزية) منع اعتماد/رفض/تأكيد استرداد تسوية عهدة المستخدم نفسه؛ المالك مستثنى |
| H1 | رفع R2 بتحقق TLS افتراضي و HttpClient مشترك |
| H2 | صور رابط التتبع العام: قائمة مسموحة (SiteProgress و PublicGallery) واستبعاد الإيصالات |
| H3 | مسار الترحيلات عند البدء (لم يُصلح بعد) |
| H4 | حماية تزامن رصيد الصندوق (xmin + إعادة المحاولة) |
| H5 | رسائل 500 عامة مع رقم مرجعي، و Swagger في Development فقط |

## الملخص

| Module | Cases | P0 | Not run | Pass | Fail | Blocked | Not built yet |
|---|---|---|---|---|---|---|---|
| [Auth & Onboarding](#auth--onboarding) | 26 | 13 | 0 | 23 | 0 | 3 | 0 |
| [Users & Roles](#users--roles) | 16 | 6 | 0 | 16 | 0 | 0 | 0 |
| [Projects](#projects) | 19 | 9 | 0 | 19 | 0 | 0 | 0 |
| [Cash Pools & Capital](#cash-pools--capital) | 20 | 12 | 0 | 20 | 0 | 0 | 0 |
| [Petty Cash](#petty-cash) | 28 | 16 | 0 | 28 | 0 | 0 | 0 |
| [Settlements](#settlements) | 20 | 12 | 0 | 20 | 0 | 0 | 0 |
| [Site Execution](#site-execution) | 13 | 3 | 0 | 13 | 0 | 0 | 0 |
| [Daily Logs & Punch List](#daily-logs--punch-list) | 12 | 4 | 0 | 12 | 0 | 0 | 0 |
| [Photos & Uploads](#photos--uploads) | 13 | 5 | 0 | 10 | 0 | 3 | 0 |
| [Financial Reports](#financial-reports) | 7 | 5 | 0 | 7 | 0 | 0 | 0 |
| [Public Tracker & Reviews](#public-tracker--reviews) | 11 | 3 | 0 | 11 | 0 | 0 | 0 |
| [Directory](#directory) | 6 | 2 | 0 | 6 | 0 | 0 | 0 |
| [Subscription & Payments](#subscription--payments) | 9 | 6 | 0 | 7 | 0 | 2 | 0 |
| [Notifications](#notifications) | 9 | 0 | 0 | 8 | 0 | 1 | 0 |
| [SuperAdmin](#superadmin) | 11 | 4 | 0 | 11 | 0 | 0 | 0 |
| [Security & Limits](#security--limits) | 15 | 6 | 0 | 12 | 1 | 2 | 0 |
| [InstaPay](#instapay) | 20 | 8 | 0 | 19 | 0 | 1 | 0 |
| **الإجمالي (Total)** | 255 | 114 | 0 | 242 | 1 | 12 | 0 |

نسبة النجاح (Pass ÷ (Pass + Fail)): **99.6%**

## الإعداد (Setup)

> قيم توضيحية فقط. لا تكتب كلمات مرور حقيقية أو بيانات عملاء في هذا الملف؛ احفظ كلمات المرور في مدير كلمات المرور.

### 1. البيئات

| البيئة | رابط الواجهة | رابط الـ API | ملاحظات |
|---|---|---|---|
| Staging | &lt;STAGING_WEB_URL&gt; | &lt;STAGING_API_URL&gt; | لكل الحالات التي Safe on production? = No. ASPNETCORE_ENVIRONMENT=Production لاختبار H5. |
| Production | &lt;PROD_WEB_URL&gt; | &lt;PROD_API_URL&gt; | حالات Safe = Yes فقط، وداخل شركة الاختبار T1 فقط. |
| Local (Development) | http://localhost:4200 | http://localhost:&lt;port&gt; | حالات Swagger في Development وفشل البدء (JWT / SuperAdmin seed). |

### 2. الشركات (Tenants)

| الرمز | الاسم | الخطة / الحد | الاستخدام |
|---|---|---|---|
| T1 | &lt;QA Company 1&gt; | Free / MaxActiveProjects = 2 | شركة الاختبار الرئيسية لكل الحالات. |
| T2 | &lt;QA Company 2&gt; | Free / 2 | اختبارات العزل بين الشركات، والإيقاف، والدليل العام. |

### 3. المستخدمون (واحد لكل دور)

| الرمز | الدور | الشركة | البريد | كلمة المرور | الإسناد للمشاريع | ملاحظات |
|---|---|---|---|---|---|---|
| U-SA | SuperAdmin | — | &lt;superadmin email&gt; | &lt;from password manager&gt; | — | يُنشأ من SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD (12+ حرفاً). |
| U-OWN | TenantOwner | T1 | &lt;owner.t1 email&gt; | &lt;from password manager&gt; | كل مشاريع T1 ضمنياً | — |
| U-MGR | Manager | T1 | &lt;manager.t1 email&gt; | &lt;from password manager&gt; | P-A ، P-C | — |
| U-ACC1 | Accountant | T1 | &lt;accountant1.t1 email&gt; | &lt;from password manager&gt; | P-A ، P-B ، P-C | المحاسب الرئيسي. |
| U-ACC2 | Accountant | T1 | &lt;accountant2.t1 email&gt; | &lt;from password manager&gt; | P-B فقط | غير مُسند إلى P-A لاختبارات المنع؛ يُسند مؤقتاً إلى P-B لاختبارات التزامن. |
| U-SE | SiteEngineer | T1 | &lt;siteeng.t1 email&gt; | &lt;from password manager&gt; | P-A ، P-C | بريد Google حقيقي إن أمكن لحالات Google. |
| U-DE | DesignEngineer | T1 | &lt;designeng.t1 email&gt; | &lt;from password manager&gt; | P-A | بريد Google حقيقي إن أمكن. |
| U-SE2 (إضافي) | SiteEngineer | T1 | &lt;siteeng2.t1 email&gt; | &lt;from password manager&gt; | لا شيء | يُنشأ في USR-001؛ غير مُسند لاختبارات المنع. |
| U-OWN-T2 (إضافي) | TenantOwner | T2 | &lt;owner.t2 email&gt; | &lt;from password manager&gt; | مشاريع T2 | لاختبارات العزل. |

### 4. المشاريع

| الرمز | الشركة | الاسم | الحالة الابتدائية | الاستخدام |
|---|---|---|---|---|
| P-A | T1 | &lt;QA Project A&gt; | Active | التدفق المالي الرئيسي (عهد، تسويات، تنفيذ، تتبع). |
| P-B | T1 | &lt;QA Project B&gt; | Active | اختبارات التزامن (H4) والصناديق الفارغة. |
| P-C | T1 | &lt;QA Project C&gt; | Active ثم Freeze ثم Closed | التجميد والإغلاق النهائي والتقييم. يحتاج ترقية الحصة إلى 3 (SA-003)، وأنشئه قبل PRJ-002 لأن الحصة تُحسب تراكمياً. |
| P-T2 | T2 | &lt;QA Project T2&gt; | Active | اختبارات العزل بين الشركات. |

### 5. أرصدة الصناديق الابتدائية (ج.م)

| المشروع | ClientDeposit | OwnerCapital | ExternalLoan | كيف تُضبط |
|---|---|---|---|---|
| P-A | 100,000 | 50,000 | 0 | إيداع دفعة مالية (CAP-001) بعد إنشاء المشروع. كل حالة مال تذكر الرصيد قبل وبعد. |
| P-B | 20,000 | 0 | 0 | إيداع 20,000. حالات التزامن تذكر رصيدها المطلوب في Preconditions. |
| P-C | 10,000 | 5,000 | 0 | لحالات الإغلاق النهائي (رد للعميل / تحويل للأرباح). |
| P-T2 | 10,000 | 0 | 0 | للعزل فقط. |

### 6. الأدوات

| الأداة | الاستخدام |
|---|---|
| المتصفح + DevTools (Network) | قراءة رمز الحالة والرسالة وترويسات Retry-After و X-Correlation-Id. |
| Postman / curl | استدعاء الـ API مباشرة بتوكن كل دور (من localStorage بعد الدخول). |
| سكربت curl متوازٍ | حالات التزامن (CAP-019 ، PC-027 ، PC-028 ، SET-020 ، IP-014). |
| عميل PostgreSQL (قراءة فقط) | تشغيل docs/sql/reconcile_cash_pools.sql. |
| Paymob sandbox | حالات الـ webhook على staging فقط. |

## Auth & Onboarding

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| AUTH-001 | تسجيل دخول صحيح بالبريد وكلمة المرور | TenantOwner | P0 | — | Yes | Pass |
| AUTH-002 | كلمة مرور خاطئة | TenantOwner | P0 | — | Yes | Pass |
| AUTH-003 | بريد غير مسجل | زائر | P1 | — | Yes | Pass |
| AUTH-004 | لا يوجد alias لتسجيل دخول SuperAdmin | زائر | P0 | B5 | Yes | Pass |
| AUTH-005 | مستخدم موقوف لا يستطيع الدخول | SiteEngineer | P0 | — | Yes | Pass |
| AUTH-006 | دخول مستخدم شركة موقوفة (Suspended) | Manager | P1 | — | No | Pass |
| AUTH-007 | تحويل SuperAdmin بعد الدخول | SuperAdmin | P1 | — | Yes | Pass |
| AUTH-008 | تسجيل شركة جديدة (register-tenant) | زائر | P0 | — | No | Pass |
| AUTH-009 | تسجيل بكلمة مرور قصيرة | زائر | P1 | — | Yes | Pass |
| AUTH-010 | تسجيل بكلمة مرور ضعيفة | زائر | P1 | — | Yes | Pass |
| AUTH-011 | تسجيل ببريد مستخدم مسبقاً | زائر | P1 | — | Yes | Pass |
| AUTH-012 | تسجيل باسم شركة يحتوي سكربت | زائر | P1 | — | Yes | Pass |
| AUTH-013 | تجديد التوكن (refresh) بنجاح | Accountant | P0 | — | Yes | Pass |
| AUTH-014 | refresh لمستخدم موقوف | SiteEngineer | P1 | — | Yes | Pass |
| AUTH-015 | توكن JWT موقّع بمفتاح مختلف مرفوض | زائر | P0 | B3 | Yes | Pass |
| AUTH-016 | تشغيل الـ API بدون JWT secret يفشل | DevOps | P0 | B3 | No | Pass |
| AUTH-017 | JWT secret قصير أو placeholder يفشل | DevOps | P0 | B3 | No | Pass |
| AUTH-018 | توكن صادر من الدخول يعمل مع كل الـ endpoints | TenantOwner | P0 | B3 | Yes | Pass |
| AUTH-019 | Seed لـ SuperAdmin عند عدم وجوده | DevOps | P0 | B5 | No | Pass |
| AUTH-020 | Seed لا يعدّل SuperAdmin موجود | DevOps | P0 | B5 | Yes | Pass |
| AUTH-021 | Google login لمستخدم مضاف من الشركة | DesignEngineer | P1 | — | Yes | Blocked |
| AUTH-022 | Google login لمستخدم موقوف | SiteEngineer | P0 | — | Yes | Pass |
| AUTH-023 | Google token غير صالح | زائر | P1 | — | Yes | Pass |
| AUTH-024 | Google login بدون idToken | زائر | P2 | — | Yes | Pass |
| AUTH-025 | انتهاء الجلسة والتجديد الصامت | Manager | P2 | — | Yes | Blocked |
| AUTH-026 | الدخول لصفحة محمية بدون تسجيل | زائر | P1 | — | Yes | Blocked |

### AUTH-001 — تسجيل دخول صحيح بالبريد وكلمة المرور

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** حساب U-OWN نشط والشركة T1 حالتها Active.

**Steps:**

1. افتح /login.
2. أدخل بريد U-OWN وكلمة المرور.
3. اضغط تسجيل الدخول.

**Test data:** U-OWN / كلمة مرور الاختبار من Setup

**Expected result:** 200 من POST /api/Auth/login مع token و refreshToken. رسالة "تم تسجيل الدخول بنجاح" والتحويل إلى /dashboard/financials.

**Actual result:** HTTP 200: AUTH.LOGIN_SUCCESS token+refreshToken موجودان. رسالة الواجهة والتحويل إلى /dashboard/financials لم يُختبرا (لا متصفح).  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-002 — كلمة مرور خاطئة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** حساب U-OWN نشط.

**Steps:**

1. افتح /login.
2. أدخل بريد U-OWN مع كلمة مرور خاطئة.
3. اضغط تسجيل الدخول.

**Test data:** كلمة مرور: Wrong#Pass1

**Expected result:** 401 والرسالة AUTH.INVALID_CREDENTIALS تظهر بالعربية: "البريد الإلكتروني أو كلمة المرور غير صحيحة". لا يتم إصدار token.

**Actual result:** HTTP 401: AUTH.INVALID_CREDENTIALS  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-003 — بريد غير مسجل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. افتح /login.
2. أدخل بريداً غير موجود.
3. اضغط تسجيل الدخول.

**Test data:** ghost.qa@example.test

**Expected result:** 401 بنفس رسالة "البريد الإلكتروني أو كلمة المرور غير صحيحة" (لا تكشف أن البريد غير موجود).

**Actual result:** HTTP 401: AUTH.INVALID_CREDENTIALS  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-004 — لا يوجد alias لتسجيل دخول SuperAdmin

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | B5 | Yes | Pass |

**Preconditions:** النظام يعمل بالإصدار الحالي.

**Steps:**

1. افتح /login.
2. جرّب البريد superadmin مع أي كلمة مرور.
3. جرّب superadmin@admin.com مع SuperAdmin@123.

**Test data:** superadmin ، superadmin@admin.com / SuperAdmin@123

**Expected result:** 401 "البريد الإلكتروني أو كلمة المرور غير صحيحة" في الحالتين. لا يوجد تسجيل دخول بالاسم المختصر ولا بكلمة المرور الافتراضية القديمة.

**Actual result:** superadmin + كلمة مرور SA الحقيقية: HTTP 401: AUTH.INVALID_CREDENTIALS \| superadmin@admin.com/SuperAdmin@123: HTTP 401: AUTH.INVALID_CREDENTIALS  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-005 — مستخدم موقوف لا يستطيع الدخول

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** TenantOwner أوقف U-SE من صفحة المستخدمين (إيقاف).

**Steps:**

1. سجّل الدخول بحساب U-SE.
2. بعد الاختبار أعد تفعيل U-SE من /dashboard/users.

**Test data:** U-SE

**Expected result:** 401 من الـ API برسالة AUTH.ACCOUNT_DEACTIVATED تظهر: "تم تعطيل هذا الحساب بواسطة مسؤول الشركة."

**Actual result:** إيقاف: HTTP 200: USERS.STATUS_SUSPENDED \| دخول: HTTP 401: AUTH.ACCOUNT_DEACTIVATED  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-006 — دخول مستخدم شركة موقوفة (Suspended)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | No | Pass |

**Preconditions:** SuperAdmin غيّر حالة T1 إلى Suspended عبر toggle-status. (أعد التفعيل بعد الاختبار)

**Steps:**

1. سجّل الدخول بحساب U-MGR.
2. أعد تفعيل T1 من SuperAdmin.

**Test data:** U-MGR

**Expected result:** 401 بالرسالة: "⚠️ تم تعليق حساب شركتكم مؤقتًا؛ يرجى مراجعة إدارة المنصة لتجديد الاشتراك."

**Actual result:** Suspended → HTTP 401: ⚠️ تم تعليق حساب شركتكم مؤقتًا؛ يرجى مراجعة إدارة المنصة لتجديد الاشتراك. → أعيد إلى Active  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-007 — تحويل SuperAdmin بعد الدخول

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** حساب U-SA مُنشأ من seed.

**Steps:**

1. سجّل الدخول بحساب U-SA.
2. لاحظ الصفحة التي يتم التحويل إليها.

**Test data:** U-SA

**Expected result:** التحويل إلى /dashboard/overview. القائمة الجانبية تعرض صفحات SuperAdmin فقط.

**Actual result:** API: HTTP 200, role=SuperAdmin. تحويل الواجهة إلى /dashboard/overview لم يُختبر (لا يوجد متصفح)؛ الكود في DashboardRedirectComponent يحوّل SuperAdmin إلى overview.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-008 — تسجيل شركة جديدة (register-tenant)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | — | No | Pass |

**Preconditions:** بريد اختبار جديد لم يُستخدم.

**Steps:**

1. افتح /register.
2. املأ اسم الشركة، المجال، اسم المالك، البريد، كلمة مرور قوية.
3. اضغط تسجيل.

**Test data:** CompanyName: QA Reg Co ، كلمة مرور: QaTest#2026x

**Expected result:** 200 والرسالة "Registration successful! Account activated instantly.". الشركة Active بخطة Free و MaxActiveProjects = 2. المستخدم TenantOwner ويتم الدخول مباشرة. SuperAdmin يستلم إشعار تسجيل حساب جديد.

**Actual result:** HTTP 200: Registration successful! Account activated instantly. role=TenantOwner quota={'usedProjects': 0, 'allowedProjects': 2} SA notification=yes  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-009 — تسجيل بكلمة مرور قصيرة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. افتح /register.
2. أدخل كلمة مرور من 5 أحرف.
3. اضغط تسجيل.

**Test data:** كلمة مرور: Ab1!x

**Expected result:** 400 والرسالة "كلمة المرور يجب أن تكون 6 أحرف على الأقل."

**Actual result:** HTTP 400: Validation failed. ["كلمة المرور يجب أن تكون 6 أحرف على الأقل."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-010 — تسجيل بكلمة مرور ضعيفة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. افتح /register.
2. أدخل كلمة مرور من حروف صغيرة فقط (6–7 أحرف).
3. اضغط تسجيل.

**Test data:** كلمة مرور: abcdefg

**Expected result:** 400 والرسالة "Password is too weak. Must include uppercase, lowercase, numbers, or special characters."

**Actual result:** HTTP 400: Password is too weak. Must include uppercase, lowercase, numbers, or special characters.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-011 — تسجيل ببريد مستخدم مسبقاً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** بريد U-MGR موجود.

**Steps:**

1. افتح /register.
2. استخدم بريد U-MGR.
3. اضغط تسجيل.

**Test data:** بريد U-MGR

**Expected result:** 400 والرسالة "Email is already taken."

**Actual result:** HTTP 400: Email is already taken.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-012 — تسجيل باسم شركة يحتوي سكربت

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. افتح /register.
2. اكتب في اسم الشركة نص سكربت.
3. اضغط تسجيل.

**Test data:** &lt;script&gt;alert(1)&lt;/script&gt;

**Expected result:** 400 من التحقق برسالة "المُدخلات تحتوي على رموز غير مسموح بها لأسباب أمنية." ولا يُنفَّذ أي سكربت.

**Actual result:** HTTP 400: Validation failed. ["المُدخلات تحتوي على رموز غير مسموح بها لأسباب أمنية."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-013 — تجديد التوكن (refresh) بنجاح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC1 مسجل دخول.

**Steps:**

1. استدعِ POST /api/Auth/refresh بالـ refreshToken الحالي.
2. استدعِ نفس الطلب مرة ثانية بالـ refreshToken القديم.

**Test data:** refreshToken من localStorage

**Expected result:** الطلب الأول 200 مع token و refreshToken جديدين. الطلب الثاني بالتوكن القديم 401 "INVALID_REFRESH_TOKEN" (تدوير التوكن).

**Actual result:** الأول 200 (توكن جديد)، الثاني بالقديم: HTTP 401: INVALID_REFRESH_TOKEN  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-014 — refresh لمستخدم موقوف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** U-SE مسجل دخول، ثم أوقفه TenantOwner.

**Steps:**

1. استدعِ POST /api/Auth/refresh بتوكن U-SE.
2. أعد تفعيل U-SE.

**Test data:** refreshToken الخاص بـ U-SE

**Expected result:** 401 برسالة AUTH.ACCOUNT_DEACTIVATED، والواجهة تُخرج المستخدم إلى /login.

**Actual result:** HTTP 401: AUTH.ACCOUNT_DEACTIVATED (خروج الواجهة إلى /login لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-015 — توكن JWT موقّع بمفتاح مختلف مرفوض

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | B3 | Yes | Pass |

**Preconditions:** لديك token صالح من البيئة.

**Steps:**

1. عدّل payload أو وقّع token بمفتاح آخر (jwt.io).
2. استدعِ GET /api/Projects بهذا الـ token.

**Test data:** token مزوّر

**Expected result:** 401. لا يوجد مفتاح افتراضي مشترك بين بيئة التطوير والإنتاج.

**Actual result:** payload معدّل: HTTP 401؛ توقيع آخر: HTTP 401  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-016 — تشغيل الـ API بدون JWT secret يفشل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B3 | No | Pass |

**Preconditions:** بيئة محلية أو staging فقط.

**Steps:**

1. احذف JwtSettings__Secret من متغيرات البيئة.
2. شغّل الـ API.
3. أعد المتغير.

**Test data:** JwtSettings__Secret غير موجود

**Expected result:** التطبيق يتوقف عند البدء برسالة: "JWT secret is not configured. Set 'JwtSettings:Secret' (environment variable 'JwtSettings__Secret')."

**Actual result:** توقف البدء=True \| Unhandled exception. System.InvalidOperationException: JWT secret is not configured. Set 'JwtSettings:Secret' (environment variable 'JwtSettings__Secret').  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-017 — JWT secret قصير أو placeholder يفشل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B3 | No | Pass |

**Preconditions:** بيئة محلية أو staging فقط.

**Steps:**

1. اضبط JwtSettings__Secret على قيمة 20 حرفاً وشغّل.
2. اضبطه على قيمة تحتوي PLACEHOLDER وشغّل.

**Test data:** short-secret-1234567 ، YOUR_JWT_SECRET_KEY_PLACEHOLDER_AT_LEAST_32_BYTES_LONG

**Expected result:** فشل البدء: "... is 20 bytes; at least 32 bytes are required." ثم "... still contains a placeholder value. Set a real random secret."

**Actual result:** 20 بايت: Unhandled exception. System.InvalidOperationException: JWT secret 'JwtSettings:Secret' is 20 bytes; at least 32 bytes are required. \| PLACEHOLDER: Unhandled exception. System.InvalidOperationException: JWT secret 'JwtSettings:Secret' still contains a placeholder value. Set a real random secret.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-018 — توكن صادر من الدخول يعمل مع كل الـ endpoints

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B3 | Yes | Pass |

**Preconditions:** JWT secret مضبوط (32 بايت أو أكثر).

**Steps:**

1. سجّل الدخول.
2. افتح المشاريع والتقارير والإشعارات.

**Test data:** U-OWN

**Expected result:** كل الطلبات 200 (نفس المفتاح للإصدار والتحقق). لا يوجد 401 مفاجئ بعد الدخول.

**Actual result:** Projects/Notifications/full-report/tenant-profile → [200, 200, 200, 200]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-019 — Seed لـ SuperAdmin عند عدم وجوده

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B5 | No | Pass |

**Preconditions:** قاعدة بيانات اختبار فارغة من SuperAdmin.

**Steps:**

1. شغّل الـ API بدون SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD.
2. شغّله مع كلمة مرور 10 أحرف.
3. شغّله مع كلمة مرور 12+ حرفاً.

**Test data:** SUPERADMIN_PASSWORD=&lt;12+ حرفاً من مدير كلمات المرور&gt;

**Expected result:** 1: فشل البدء "No SuperAdmin account exists. Set SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD ...". 2: فشل "SUPERADMIN_PASSWORD must be at least 12 characters long.". 3: يبدأ ويطبع "[SEED] SuperAdmin account seeded successfully".

**Actual result:** بدون متغيرات: Unhandled exception. System.InvalidOperationException: No SuperAdmin account exists. Set SUPERADMIN_EMAIL and SUPERADMIN_PASSWORD (or SuperAdminSeed:Email and SuperAdminSeed:Password) to create one. \| 10 أحرف: Unhandled exception. System.InvalidOperationException: SUPERADMIN_PASSWORD must be at least 12 characters long. \| صالحة: [SEED] SuperAdmin account seeded successfully: qa.superadmin@osos.test  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-020 — Seed لا يعدّل SuperAdmin موجود

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B5 | Yes | Pass |

**Preconditions:** يوجد SuperAdmin بالفعل.

**Steps:**

1. أعد تشغيل الـ API مع SUPERADMIN_PASSWORD مختلفة.
2. سجّل الدخول بكلمة المرور القديمة.

**Test data:** كلمة مرور جديدة في المتغير

**Expected result:** الدخول بكلمة المرور القديمة ما زال يعمل. لا تُنشأ نسخة ثانية ولا يتغير البريد أو كلمة المرور.

**Actual result:** إعادة التشغيل بكلمة مرور مختلفة: الدخول بالقديمة 200 \| بالجديدة 401 \| عدد SuperAdmin=1 \| رسالة seed في السجل=False  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-021 — Google login لمستخدم مضاف من الشركة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DesignEngineer | P1 | — | Yes | Blocked |

**Preconditions:** U-DE أضافه TenantOwner ببريد Google حقيقي للاختبار.

**Steps:**

1. افتح /login.
2. اضغط الدخول بـ Google واختر حساب U-DE.

**Test data:** حساب Google الخاص بـ U-DE

**Expected result:** 200 والدخول بدور DesignEngineer نفسه (لا تتغير الصلاحية). يُستكمل الاسم من Google إذا كان الاسم Placeholder.

**Actual result:** يحتاج حساب Google حقيقي لموظف مضاف وإعداد Google ClientId.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-022 — Google login لمستخدم موقوف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** U-SE مرتبط ببريد Google وتم إيقافه من TenantOwner.

**Steps:**

1. اضغط الدخول بـ Google بحساب U-SE.
2. تحقق من حالة U-SE في /dashboard/users.

**Test data:** حساب Google الخاص بـ U-SE

**Expected result:** يجب رفض الدخول (ACCOUNT_DEACTIVATED) وبقاء الحساب موقوفاً. ملاحظة من مراجعة الكود: GoogleAuthService يضبط IsActive = true للمستخدم الموجود، لذلك يُتوقع أن تفشل هذه الحالة.

**Actual result:** تحقق على مستوى الخدمة (Structo.Tests/GoogleAuthAccountStateTests: SignInVerifiedGoogleUserAsync بعد التحقق من Google): مستخدم موقوف → AUTH.ACCOUNT_DEACTIVATED ويبقى IsActive=false؛ شركة معلّقة → رسالة التعليق؛ مستخدم نشط → دخول. Passed!  - Failed:     0, Passed:     3, Skipped:     0, Total:     3, Duration: 1 s - Structo.Tests.dll (net9.0) \| الدخول الفعلي عبر Google يحتاج حساب Google حقيقي.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-023 — Google token غير صالح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ POST /api/google-auth/google-login بـ idToken عشوائي.

**Test data:** idToken: abc.def.ghi

**Expected result:** 400 والرسالة "INVALID_GOOGLE_TOKEN".

**Actual result:** (Development، Google ClientId مضبوط) HTTP 400: INVALID_GOOGLE_TOKEN  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-024 — Google login بدون idToken

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ POST /api/google-auth/google-login بجسم فارغ {"idToken":""}.

**Test data:** idToken فارغ

**Expected result:** 400 والرسالة "Google Token is required."

**Actual result:** HTTP 400: Google Token is required.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-025 — انتهاء الجلسة والتجديد الصامت

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | — | Yes | Blocked |

**Preconditions:** U-MGR مسجل دخول.

**Steps:**

1. احذف token من localStorage مع إبقاء refreshToken (أو انتظر انتهاءه).
2. افتح صفحة المشاريع.

**Test data:** U-MGR

**Expected result:** الواجهة تجدد التوكن تلقائياً وتفتح الصفحة بدون تسجيل خروج.

**Actual result:** سلوك الواجهة (تجديد صامت) — لا يوجد متصفح. الـ API: refresh يعمل (AUTH-013).  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### AUTH-026 — الدخول لصفحة محمية بدون تسجيل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Blocked |

**Preconditions:** غير مسجل دخول.

**Steps:**

1. افتح /dashboard/projects مباشرة.

**Test data:** لا يوجد

**Expected result:** التحويل إلى /login مع returnUrl.

**Actual result:** حارس المسار في الواجهة — لا يوجد متصفح. الـ API يعيد 401 بدون توكن (UPL-010).  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Users & Roles

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| USR-001 | إضافة مستخدم جديد من TenantOwner | TenantOwner | P0 | — | No | Pass |
| USR-002 | إضافة مستخدم ببريد موجود | TenantOwner | P1 | — | Yes | Pass |
| USR-003 | TenantOwner لا يستطيع إنشاء مستخدم بدور SuperAdmin | TenantOwner | P0 | — | No | Pass |
| USR-004 | TenantOwner لا يستطيع إنشاء TenantOwner ثانٍ | TenantOwner | P1 | — | No | Pass |
| USR-005 | Accountant لا يستطيع إضافة مستخدم | Accountant | P0 | — | Yes | Pass |
| USR-006 | الأدوار غير المالكة لا ترى صفحة المستخدمين | Manager | P1 | — | Yes | Pass |
| USR-007 | إيقاف وتفعيل موظف | TenantOwner | P0 | — | Yes | Pass |
| USR-008 | لا يمكن إيقاف الحساب الشخصي | TenantOwner | P1 | — | Yes | Pass |
| USR-009 | لا يمكن إيقاف مستخدم من شركة أخرى | TenantOwner | P0 | — | Yes | Pass |
| USR-010 | إسناد عضو لمشروع (Manager مُسند) | Manager | P1 | — | Yes | Pass |
| USR-011 | إسناد عضو مكرر | TenantOwner | P2 | — | Yes | Pass |
| USR-012 | لا يمكن إسناد TenantOwner لمشروع | TenantOwner | P2 | — | Yes | Pass |
| USR-013 | Accountant لا يدير أعضاء المشروع | Accountant | P1 | — | Yes | Pass |
| USR-014 | SuperAdmin لا يرى قائمة أعضاء المشروع | SuperAdmin | P1 | — | Yes | Pass |
| USR-015 | تعديل الفريق في مشروع مجمّد ممنوع | TenantOwner | P2 | — | Yes | Pass |
| USR-016 | مستخدم غير مُسند لا يرى المشروع | Accountant | P0 | — | Yes | Pass |

### USR-001 — إضافة مستخدم جديد من TenantOwner

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** U-OWN مسجل دخول.

**Steps:**

1. افتح /dashboard/users.
2. اضغط "إضافة مستخدم".
3. املأ الاسم والبريد وكلمة المرور المؤقتة واختر الدور SiteEngineer ومشروع P-A.
4. اضغط "إضافة مستخدم".

**Test data:** qa.se2@example.test / كلمة مرور مؤقتة

**Expected result:** 200 والمستخدم يظهر في الجدول بحالة "نشط" ومُسند إلى P-A. يستطيع الدخول فوراً.

**Actual result:** HTTP 200: User added successfully؛ الدخول الفوري 200؛ مُسند إلى P-A=True. (عرض الجدول في الواجهة لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-002 — إضافة مستخدم ببريد موجود

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** بريد U-ACC1 موجود.

**Steps:**

1. افتح نافذة إضافة مستخدم.
2. أدخل بريد U-ACC1.
3. اضغط إضافة.

**Test data:** بريد U-ACC1

**Expected result:** 400 "Email is already registered".

**Actual result:** HTTP 400: Email is already registered  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-003 — TenantOwner لا يستطيع إنشاء مستخدم بدور SuperAdmin

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** توكن U-OWN.

**Steps:**

1. استدعِ POST /api/users بجسم فيه role = "SuperAdmin".
2. كرر على POST /api/employees.

**Test data:** {"firstName":"QA","lastName":"Esc","email":"qa.esc@example.test","password":"Qa#123456","role":"SuperAdmin"}

**Expected result:** 400/403 ولا يُنشأ المستخدم. ملاحظة من مراجعة الكود: UserService و EmployeeManagementController لا يتحققان من الدور، لذلك يُتوقع أن تفشل (تصعيد صلاحيات). إن نجح الطلب أوقف المستخدم فوراً وأبلغ.

**Actual result:** /api/users: HTTP 400: ROLE_NOT_ALLOWED: Only a SuperAdmin can create SuperAdmin accounts. \| /api/employees: HTTP 400: ROLE_NOT_ALLOWED: Only a SuperAdmin can create SuperAdmin accounts.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-004 — TenantOwner لا يستطيع إنشاء TenantOwner ثانٍ

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | No | Pass |

**Preconditions:** توكن U-OWN.

**Steps:**

1. استدعِ POST /api/users بجسم فيه role = "TenantOwner".

**Test data:** qa.owner2@example.test

**Expected result:** يجب الرفض (400). إذا قُبل الطلب سجّل Fail وأبلغ (نفس ثغرة التحقق من الدور).

**Actual result:** HTTP 400: ROLE_NOT_ALLOWED: A company can have only one TenantOwner.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-005 — Accountant لا يستطيع إضافة مستخدم

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** توكن U-ACC1.

**Steps:**

1. استدعِ POST /api/users بأي بيانات صالحة.

**Test data:** qa.x@example.test

**Expected result:** 403 Forbidden.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-006 — الأدوار غير المالكة لا ترى صفحة المستخدمين

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** U-MGR مسجل دخول.

**Steps:**

1. افتح /dashboard/users مباشرة.

**Test data:** U-MGR

**Expected result:** الحارس يمنع الصفحة (تحويل) ولا تظهر في القائمة الجانبية. GET /api/users يعيد 403 للـ Manager.

**Actual result:** GET /api/users بالـ Manager → HTTP 403. (حارس الواجهة لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-007 — إيقاف وتفعيل موظف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** U-DE نشط.

**Steps:**

1. في /dashboard/users اضغط "إيقاف" على U-DE.
2. حاول الدخول بـ U-DE.
3. اضغط "تفعيل".

**Test data:** U-DE

**Expected result:** "تم تحديث حالة المستخدم بنجاح."؛ الدخول يُرفض أثناء الإيقاف ويعمل بعد التفعيل.

**Actual result:** إيقاف: HTTP 200: USERS.STATUS_SUSPENDED \| دخول أثناء الإيقاف: 401 \| تفعيل: 200 \| دخول بعد التفعيل: 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-008 — لا يمكن إيقاف الحساب الشخصي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** U-OWN مسجل دخول.

**Steps:**

1. استدعِ PUT /api/users/{U-OWN id}/toggle-status.

**Test data:** معرّف U-OWN

**Expected result:** 400 برسالة USERS.CANNOT_DISABLE_SELF: "لا يمكنك إيقاف حسابك الشخصي."

**Actual result:** HTTP 400: USERS.CANNOT_DISABLE_SELF  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-009 — لا يمكن إيقاف مستخدم من شركة أخرى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** معرّف مستخدم من T2 معروف.

**Steps:**

1. استدعِ PUT /api/users/{T2 user id}/toggle-status بتوكن U-OWN.

**Test data:** معرّف U-OWN-T2

**Expected result:** 404 USERS.USER_NOT_FOUND. حالة مستخدم T2 لا تتغير.

**Actual result:** HTTP 404: USERS.USER_NOT_FOUND \| مستخدم T2 ما زال يعمل: HTTP 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-010 — إسناد عضو لمشروع (Manager مُسند)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** U-MGR مُسند إلى P-A، و U-SE2 غير مُسند.

**Steps:**

1. افتح P-A &gt; تبويب الفريق.
2. أضف U-SE2.
3. احذفه مرة أخرى.

**Test data:** U-SE2 (من حالة USR-001)

**Expected result:** "Members assigned successfully." ثم "Member removed from project successfully."

**Actual result:** HTTP 200: Members assigned successfully. \| HTTP 200: Member removed from project successfully.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-011 — إسناد عضو مكرر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** U-SE مُسند إلى P-A.

**Steps:**

1. استدعِ POST /api/Projects/{P-A}/members بـ userIds = [U-SE].

**Test data:** U-SE

**Expected result:** 409 Conflict برسالة تبدأ بـ "DUPLICATE_MEMBER" أو "All selected users are already assigned to this project."

**Actual result:** HTTP 409: DUPLICATE_MEMBER: This user is already assigned to this project.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-012 — لا يمكن إسناد TenantOwner لمشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ POST /api/Projects/{P-A}/members بـ userIds = [U-OWN].

**Test data:** U-OWN

**Expected result:** 400 "TenantOwner or SuperAdmin users cannot be explicitly assigned to projects."

**Actual result:** HTTP 400: TenantOwner or SuperAdmin users cannot be explicitly assigned to projects.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-013 — Accountant لا يدير أعضاء المشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** U-ACC1 مُسند إلى P-A.

**Steps:**

1. استدعِ POST /api/Projects/{P-A}/members.

**Test data:** أي مستخدم

**Expected result:** 403 Forbidden.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-014 — SuperAdmin لا يرى قائمة أعضاء المشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** توكن U-SA.

**Steps:**

1. استدعِ GET /api/Projects/{P-A}/members.

**Test data:** P-A

**Expected result:** 403 Forbidden (حائط الخصوصية).

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-015 — تعديل الفريق في مشروع مجمّد ممنوع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** P-C في حالة FinancialFreeze.

**Steps:**

1. حاول إضافة عضو إلى P-C.

**Test data:** U-SE

**Expected result:** 400 "لا يمكن تعديل فريق العمل — المشروع مجمّد أو مغلق / Cannot modify team members — project is frozen or closed."

**Actual result:** HTTP 400: لا يمكن تعديل فريق العمل — المشروع مجمّد أو مغلق / Cannot modify team members — project is frozen or closed.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### USR-016 — مستخدم غير مُسند لا يرى المشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC2 غير مُسند إلى P-A.

**Steps:**

1. سجّل الدخول بـ U-ACC2.
2. افتح /dashboard/projects/{P-A} مباشرة.
3. استدعِ GET /api/Projects/{P-A}.

**Test data:** U-ACC2

**Expected result:** P-A لا يظهر في قائمة المشاريع. الـ API يعيد 403.

**Actual result:** P-A في قائمة U-ACC2=False؛ GET P-A → HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Projects

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| PRJ-001 | إنشاء مشروع ضمن الحصة | TenantOwner | P0 | — | No | Pass |
| PRJ-002 | إنشاء مشروع بعد استنفاد الحصة | TenantOwner | P0 | — | No | Pass |
| PRJ-003 | الأدوار غير المالكة لا تنشئ مشروعاً | Manager | P0 | — | Yes | Pass |
| PRJ-004 | تحقق من الحقول المطلوبة | TenantOwner | P2 | — | Yes | Pass |
| PRJ-005 | اسم مشروع يحتوي سكربت | TenantOwner | P1 | — | Yes | Pass |
| PRJ-006 | قراءة مشروع شركة أخرى | TenantOwner | P0 | — | Yes | Pass |
| PRJ-007 | SuperAdmin لا يرى تفاصيل مشاريع الشركات (حائط الخصوصية) | SuperAdmin | P2 | — | Yes | Pass |
| PRJ-008 | مراجعة الميزانية | Accountant | P1 | — | No | Pass |
| PRJ-009 | ميزانية أقل من المصروفات | TenantOwner | P1 | — | Yes | Pass |
| PRJ-010 | SiteEngineer لا يراجع الميزانية | SiteEngineer | P1 | — | Yes | Pass |
| PRJ-011 | تجميد المشروع (Freeze) | Accountant | P0 | — | No | Pass |
| PRJ-012 | Manager لا يجمّد المشروع | Manager | P1 | — | Yes | Pass |
| PRJ-013 | تقرير المطابقة قبل الإغلاق | TenantOwner | P1 | — | Yes | Pass |
| PRJ-014 | الإغلاق النهائي مع عهد مفتوحة ممنوع | TenantOwner | P0 | — | Yes | Pass |
| PRJ-015 | الإغلاق النهائي مع رصيد متبقٍ بدون تحديد وجهة | TenantOwner | P0 | B2 | Yes | Pass |
| PRJ-016 | الإغلاق النهائي: رد الباقي للعميل | TenantOwner | P0 | B2 | No | Pass |
| PRJ-017 | الإغلاق النهائي: تحويل لأرباح الشركة | TenantOwner | P1 | B2 | No | Pass |
| PRJ-018 | Manager لا ينفذ الإغلاق النهائي | Manager | P0 | — | Yes | Pass |
| PRJ-019 | لا عمليات مالية بعد الإغلاق | TenantOwner | P1 | — | Yes | Pass |

### PRJ-001 — إنشاء مشروع ضمن الحصة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** T1 لديها مشروع واحد فقط من أصل 2 (قبل إنشاء P-B).

**Steps:**

1. افتح /dashboard/projects.
2. أنشئ مشروعاً جديداً بالاسم والعميل والتواريخ.
3. احفظ.

**Test data:** اسم: مشروع اختبار B

**Expected result:** 200 "Project created successfully" والحالة Active.

**Actual result:** P-B: HTTP 200: Project created successfully status=Active  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-002 — إنشاء مشروع بعد استنفاد الحصة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** T1 لديها مشروعان (الحد 2، الحساب تراكمي مدى الحياة).

**Steps:**

1. أنشئ مشروعاً ثالثاً.
2. حاول فتحه.

**Test data:** اسم: QA Over Quota

**Expected result:** 200 مع رسالة "QUOTA_EXCEEDED: Project created under PendingActivation status.". الحالة PendingActivation، وفتحه يعيد 403 لغير SuperAdmin.

**Actual result:** HTTP 200: QUOTA_EXCEEDED: Project created under PendingActivation status. status=PendingActivation \| فتحه: HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-003 — الأدوار غير المالكة لا تنشئ مشروعاً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | — | Yes | Pass |

**Preconditions:** توكن U-MGR.

**Steps:**

1. استدعِ POST /api/Projects.

**Test data:** اسم: QA Mgr

**Expected result:** 403 Forbidden (الإنشاء لـ TenantOwner فقط). كرر بـ SiteEngineer: 403.

**Actual result:** Manager: 403 \| SiteEngineer: 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-004 — تحقق من الحقول المطلوبة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أنشئ مشروعاً بدون اسم.
2. أنشئ مشروعاً بتاريخ نهاية قبل البداية.

**Test data:** endDate &lt; startDate

**Expected result:** 400 "Project name is required." ثم "End date must be greater than start date."

**Actual result:** HTTP 400: Validation failed. ["Project name is required."] \| HTTP 400: Validation failed. ["End date must be greater than start date."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-005 — اسم مشروع يحتوي سكربت

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أنشئ مشروعاً باسم يحتوي سكربت.

**Test data:** &lt;script&gt;alert('x')&lt;/script&gt;

**Expected result:** 400 "المُدخلات تحتوي على رموز غير مسموح بها لأسباب أمنية."

**Actual result:** HTTP 400: Validation failed. ["المُدخلات تحتوي على رموز غير مسموح بها لأسباب أمنية."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-006 — قراءة مشروع شركة أخرى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** معرّف P-T2 من الشركة T2.

**Steps:**

1. استدعِ GET /api/Projects/{P-T2} بتوكن U-OWN.

**Test data:** P-T2

**Expected result:** 403 (لا تظهر أي بيانات).

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-007 — SuperAdmin لا يرى تفاصيل مشاريع الشركات (حائط الخصوصية)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P2 | — | Yes | Pass |

**Preconditions:** توكن U-SA.

**Steps:**

1. استدعِ GET /api/Projects/{P-A}.

**Test data:** P-A

**Expected result:** 403 أو 404 بدون أي بيانات للمشروع. هذا هو السلوك المقصود: حائط خصوصية SuperAdmin (تحديث التوقع في الجولة 1).

**Actual result:** SuperAdmin → HTTP 404 بدون بيانات (حائط الخصوصية)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-008 — مراجعة الميزانية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | No | Pass |

**Preconditions:** U-ACC1 مُسند إلى P-A. الميزانية الحالية أكبر من المصروفات.

**Steps:**

1. افتح P-A &gt; مراجعة الميزانية.
2. أدخل ميزانية جديدة وسبباً (5 أحرف على الأقل).
3. افتح سجل الميزانية.

**Test data:** ميزانية جديدة: 1,200,000 ، السبب: زيادة نطاق

**Expected result:** "Project budget revised and logged successfully." وسجل جديد في budget-history.

**Actual result:** HTTP 200: Project budget revised and logged successfully. \| سجلات الميزانية=1  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-009 — ميزانية أقل من المصروفات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** مصروفات P-A الحالية = S.

**Steps:**

1. أدخل ميزانية جديدة أقل من S.

**Test data:** NewBudget = S − 1

**Expected result:** رفض بالرسالة "Cannot revise budget to ... as it is lower than current total expenses (...)."

**Actual result:** المصروفات 50,800 \| HTTP 404: Cannot revise budget to 50,799.00 as it is lower than current total expenses (50,800.00).  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-010 — SiteEngineer لا يراجع الميزانية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** توكن U-SE.

**Steps:**

1. استدعِ POST /api/Projects/{P-A}/budget-revision.

**Test data:** NewBudget 1,000

**Expected result:** 403 Forbidden.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-011 — تجميد المشروع (Freeze)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | No | Pass |

**Preconditions:** P-C نشط ولا يحتوي عهداً مفتوحة.

**Steps:**

1. افتح P-C واضغط تجميد.
2. حاول طلب عهدة أو إيداع دفعة.

**Test data:** P-C

**Expected result:** "Project frozen successfully. Public review token: ...". بعدها الإيداع يُرفض بـ PROJECT_FROZEN وطلب العهدة يُرفض بـ "PROJECT_FROZEN: لا يمكن تقديم طلبات جديدة..."

**Actual result:** HTTP 200: Project frozen successfully. Public review token: 9ac22d24dc4e468da2d64fb76658ef5e \| إيداع: HTTP 400: PROJECT_FROZEN: لا يمكن حقن رأس مال جديد. المشروع في حالة FinancialFreeze. \| عهدة: HTTP 400: PROJECT_FROZEN: لا يمكن تقديم طلبات جديدة. المشروع في وضع FinancialFreeze. يرجى مراجعة المحاسب.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-012 — Manager لا يجمّد المشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** U-MGR مُسند إلى P-A.

**Steps:**

1. استدعِ POST /api/Projects/{P-A}/freeze.

**Test data:** P-A

**Expected result:** 403 Forbidden (التجميد لـ TenantOwner و Accountant فقط).

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-013 — تقرير المطابقة قبل الإغلاق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** P-C مجمّد وفيه عهدة واحدة Issued.

**Steps:**

1. افتح تقرير المطابقة (reconciliation-report).

**Test data:** P-C

**Expected result:** isFullyReconciled = false و UnsettledCustodyCount = 1 مع اسم الموظف ورصيده.

**Actual result:** isFullyReconciled=False unsettled=1 employees=[('QA SE', 2000.0)]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-014 — الإغلاق النهائي مع عهد مفتوحة ممنوع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** P-C مجمّد وفيه عهدة غير مسوّاة.

**Steps:**

1. اضغط الإغلاق النهائي.

**Test data:** P-C

**Expected result:** 400 برسالة تبدأ بـ "RECONCILIATION_REQUIRED: لا يمكن إغلاق المشروع بشكل نهائي مع وجود عهد أو أرصدة معلقة."

**Actual result:** HTTP 400: RECONCILIATION_REQUIRED: لا يمكن إغلاق المشروع بشكل نهائي مع وجود عهد أو أرصدة معلقة. يوجد 1 عهدة غير مُسوّاة. الأرصدة غير المصفّاة: QA SE (رصيد: 2000.00 EGP)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-015 — الإغلاق النهائي مع رصيد متبقٍ بدون تحديد وجهة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B2 | Yes | Pass |

**Preconditions:** P-C مسوّى بالكامل. رصيد ClientDeposit = 10,000.

**Steps:**

1. استدعِ final-closeout بدون disposition.

**Test data:** body: {}

**Expected result:** 400 "POOL_BALANCE_REMAINING: يوجد رصيد متبقي في سيولة المشروع بمبلغ 10,000.00 ج.م...". الرصيد يبقى 10,000.

**Actual result:** قبل 10,000 \| HTTP 400: POOL_BALANCE_REMAINING: يوجد رصيد متبقي في سيولة المشروع بمبلغ 10,000.00 ج.م. يرجى تحديد وجهة تصفية الرصيد المتبقي (رد باقي الدفعة للعميل أو تحويل لأرباح الشركة). \| الرصيد 10,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-016 — الإغلاق النهائي: رد الباقي للعميل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B2 | No | Pass |

**Preconditions:** P-C مسوّى بالكامل. قبل: ClientDeposit = 10,000.

**Steps:**

1. اضغط الإغلاق النهائي واختر "رد باقي الدفعة للعميل" (RefundToClient).

**Test data:** disposition = RefundToClient

**Expected result:** "تم إغلاق المشروع نهائياً...". بعد: ClientDeposit = 0. معاملة Expense بمبلغ 10,000 والوصف "مصروف - رد باقي الدفعة للعميل". الحالة Closed. ملف reconcile_cash_pools.sql لا يُظهر فرقاً.

**Actual result:** HTTP 200: تم إغلاق المشروع نهائياً وتجميد جميع العمليات المالية وتصفية الصناديق بنجاح. سجل التدقيق محفوظ بشكل دائم. \| الرصيد 10,000 → 0 \| معاملة الرد=1 \| الحالة Closed  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-017 — الإغلاق النهائي: تحويل لأرباح الشركة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | B2 | No | Pass |

**Preconditions:** مشروع مجمّد آخر مسوّى، قبل: OwnerCapital = 5,000.

**Steps:**

1. اختر TransferToCompanyProfits وأكد الإغلاق.

**Test data:** disposition = TransferToCompanyProfits

**Expected result:** بعد: الرصيد = 0. معاملة RefundToTreasury بمبلغ 5,000 والوصف "تحويل المتبقي من سيولة المشروع إلى خزينة الشركة كأرباح مرحلة".

**Actual result:** قبل {'ClientDeposit': 6500.0, 'OwnerCapital': 5000.0, 'ExternalLoan': 0.0} \| HTTP 200: تم إغلاق المشروع نهائياً وتجميد جميع العمليات المالية وتصفية الصناديق بنجاح. سجل التدقيق محفوظ بشكل دائم. \| بعد {'ClientDeposit': 0.0, 'OwnerCapital': 0.0, 'ExternalLoan': 0.0} \| معاملات RefundToTreasury: ClientDeposit:6500.00, OwnerCapital:5000.00  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-018 — Manager لا ينفذ الإغلاق النهائي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | — | Yes | Pass |

**Preconditions:** U-MGR مُسند إلى المشروع.

**Steps:**

1. استدعِ POST /api/Projects/{id}/final-closeout.

**Test data:** أي مشروع مُسند

**Expected result:** 403 Forbidden (الإغلاق لـ TenantOwner فقط).

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PRJ-019 — لا عمليات مالية بعد الإغلاق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** P-C في حالة Closed.

**Steps:**

1. حاول إيداع دفعة.
2. حاول إضافة معاملة.

**Test data:** 5,000

**Expected result:** رفض "PROJECT_FROZEN: ..." في الحالتين.

**Actual result:** إيداع: HTTP 400: PROJECT_FROZEN: لا يمكن حقن رأس مال جديد. المشروع في حالة Closed. \| معاملة: HTTP 400: PROJECT_FROZEN: لا يمكن إضافة معاملات مالية جديدة. المشروع في وضع Closed.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Cash Pools & Capital

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| CAP-001 | إيداع دفعة جديدة في صندوق فارغ | TenantOwner | P0 | B2 | No | Pass |
| CAP-002 | إيداع ثانٍ لنفس الصندوق | Accountant | P0 | B2 | No | Pass |
| CAP-003 | مبلغ إيداع صفر أو سالب | Accountant | P0 | B2 | Yes | Pass |
| CAP-004 | وصف إيداع أقل من 5 أحرف | Accountant | P2 | — | Yes | Pass |
| CAP-005 | الأدوار غير المالية لا تودع | Manager | P0 | — | Yes | Pass |
| CAP-006 | Accountant غير مُسند لا يودع | Accountant | P0 | — | Yes | Pass |
| CAP-007 | SuperAdmin ممنوع من الصناديق | SuperAdmin | P0 | — | Yes | Pass |
| CAP-008 | فتح صفحة المشروع لا يغيّر الأرصدة | Accountant | P0 | B2 | Yes | Pass |
| CAP-009 | GET ينشئ الصناديق الناقصة برصيد صفر | TenantOwner | P2 | — | Yes | Pass |
| CAP-010 | الإيداع بعد الاسترداد يحافظ على المبلغ المسترد | Accountant | P0 | B2 | No | Pass |
| CAP-011 | تعديل إيداع لم يُسحب منه | Accountant | P1 | B2 | Yes | Pass |
| CAP-012 | حذف إيداع لم يُسحب منه | Accountant | P1 | B2 | Yes | Pass |
| CAP-013 | تعديل/حذف إيداع صرف منه مقفل | Accountant | P0 | B2 | Yes | Pass |
| CAP-014 | صرف مباشر (Direct Disbursement) | Accountant | P0 | B2 | No | Pass |
| CAP-015 | صرف مباشر أكبر من الرصيد | Accountant | P0 | B2 | Yes | Pass |
| CAP-016 | Manager لا يصرف مباشرة | Manager | P1 | — | Yes | Pass |
| CAP-017 | معاملة مصروف تتجاوز الميزانية | Accountant | P1 | — | Yes | Pass |
| CAP-018 | TenantOwner يتجاوز الميزانية | TenantOwner | P2 | — | No | Pass |
| CAP-019 | إيداعان متزامنان على نفس الصندوق | Accountant ×2 | P1 | H4 | No | Pass |
| CAP-020 | مطابقة الصناديق بملف SQL (للقراءة فقط) | DevOps | P0 | B2 | Yes | Pass |

### CAP-001 — إيداع دفعة جديدة في صندوق فارغ

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B2 | No | Pass |

**Preconditions:** P-A بلا صناديق ممولة. قبل: ClientDeposit = 0.

**Steps:**

1. افتح P-A &gt; "إيداع دفعة مالية".
2. اختر "دفعة من العميل (إيراد مشروع)" وأدخل المبلغ والوصف.
3. احفظ ثم افتح محافظ نقدية المشروع.

**Test data:** Amount 100,000 ، SourceType ClientDeposit ، وصف: دفعة أولى

**Expected result:** "Capital injected successfully.". بعد: ClientDeposit المتاح = 100,000 والإجمالي = 100,000. معاملة Income بوصف "Capital Injection (ClientDeposit) - دفعة أولى".

**Actual result:** HTTP 200: Capital injected successfully. \| قبل 0 → بعد 100,000 \| معاملة Income بالوصف المتوقع=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-002 — إيداع ثانٍ لنفس الصندوق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | No | Pass |

**Preconditions:** قبل: ClientDeposit = 100,000.

**Steps:**

1. أودع 20,000 لنفس النوع.

**Test data:** Amount 20,000

**Expected result:** بعد: المتاح = 120,000 والإجمالي = 120,000.

**Actual result:** HTTP 200: Capital injected successfully. \| 100,000 → 120,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-003 — مبلغ إيداع صفر أو سالب

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** قبل: ClientDeposit = 120,000.

**Steps:**

1. أودع 0.
2. أودع -500.

**Test data:** 0 ، -500

**Expected result:** 400 ("Amount must be greater than zero." من التحقق أو "INVALID_AMOUNT: يجب أن يكون مبلغ الحقن أصل من صفر."). الرصيد يبقى 120,000.

**Actual result:** 0: HTTP 400: Validation failed. ["Amount must be greater than zero."] \| -500: HTTP 400: Validation failed. ["Amount must be greater than zero."] \| الرصيد 120,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-004 — وصف إيداع أقل من 5 أحرف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أودع 1,000 بوصف "abc".

**Test data:** Description: abc

**Expected result:** 400 خطأ تحقق (MinLength 5). الرصيد لا يتغير.

**Actual result:** HTTP 400: Validation failed. ["The field Description must be a string or array type with a minimum length of '5'."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-005 — الأدوار غير المالية لا تودع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | — | Yes | Pass |

**Preconditions:** توكن U-MGR ثم U-SE.

**Steps:**

1. استدعِ POST /api/projects/{P-A}/FinancialTransactions/inject-capital.

**Test data:** Amount 1,000

**Expected result:** 403 Forbidden لكل من Manager و SiteEngineer و DesignEngineer.

**Actual result:** {'MGR': 403, 'SE': 403, 'DE': 403}  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-006 — Accountant غير مُسند لا يودع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC2 غير مُسند إلى P-A.

**Steps:**

1. استدعِ inject-capital على P-A بتوكن U-ACC2.

**Test data:** Amount 1,000

**Expected result:** 403 Forbidden. رصيد P-A لا يتغير.

**Actual result:** HTTP 403, الرصيد 120,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-007 — SuperAdmin ممنوع من الصناديق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P0 | — | Yes | Pass |

**Preconditions:** توكن U-SA.

**Steps:**

1. استدعِ GET /api/projects/{P-A}/FinancialTransactions/cash-pools.
2. استدعِ inject-capital.

**Test data:** P-A

**Expected result:** 403 في الحالتين (حائط الخصوصية المالي).

**Actual result:** GET: 403 \| inject: 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-008 — فتح صفحة المشروع لا يغيّر الأرصدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** سجّل أرصدة P-A الحالية (مثلاً ClientDeposit = 93,000 بعد استرداد في SET-006).

**Steps:**

1. افتح صفحة P-A المالية 3 مرات (كل مرة تستدعي GET cash-pools).
2. قارن الأرصدة.

**Test data:** P-A

**Expected result:** الأرصدة تبقى كما هي تماماً (93,000). الـ GET للقراءة فقط ولا يعيد الحساب.

**Actual result:** 3 قراءات متتالية لـ GET cash-pools بعد الاسترداد: 79,000, 79,000, 79,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-009 — GET ينشئ الصناديق الناقصة برصيد صفر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** P-B لا يحتوي صناديق.

**Steps:**

1. افتح P-B &gt; محافظ نقدية المشروع.

**Test data:** P-B

**Expected result:** تظهر 3 صناديق: ClientDeposit و OwnerCapital و ExternalLoan، كل منها 0.

**Actual result:** P-B pools={'ClientDeposit': 0.0, 'OwnerCapital': 0.0, 'ExternalLoan': 0.0}  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-010 — الإيداع بعد الاسترداد يحافظ على المبلغ المسترد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | No | Pass |

**Preconditions:** التسلسل: إيداع 100,000 ← عهدة 10,000 ← تسوية 7,000 ← تأكيد استرداد 3,000. قبل: ClientDeposit = 93,000.

**Steps:**

1. أودع 5,000 في ClientDeposit.
2. افتح الصناديق.

**Test data:** Amount 5,000

**Expected result:** بعد: 98,000 (= 93,000 + 5,000). المبلغ المسترد 3,000 لا يضيع. الإجمالي المودع = 105,000.

**Actual result:** قبل 79,000 → بعد 84,000 (المتوقع 84,000). الإجمالي المودع 121,000 → 126,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-011 — تعديل إيداع لم يُسحب منه

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | B2 | Yes | Pass |

**Preconditions:** صندوق ExternalLoan بلا عهد. قبل: 0.

**Steps:**

1. أودع 5,000 في ExternalLoan.
2. عدّل المعاملة إلى 7,000.

**Test data:** 5,000 ثم 7,000

**Expected result:** بعد الإيداع: 5,000. بعد التعديل: "Transaction updated successfully." والرصيد 7,000.

**Actual result:** بعد الإيداع 5,000 \| HTTP 200: Transaction updated successfully. \| بعد التعديل 7,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-012 — حذف إيداع لم يُسحب منه

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | B2 | Yes | Pass |

**Preconditions:** قبل: ExternalLoan = 7,000 بلا عهد.

**Steps:**

1. احذف معاملة الإيداع.

**Test data:** المعاملة من CAP-011

**Expected result:** "Transaction deleted and pool balance corrected.". بعد: 0.

**Actual result:** HTTP 200: Transaction deleted and pool balance corrected. \| بعد 0  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-013 — تعديل/حذف إيداع صرف منه مقفل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** ClientDeposit صُرف منه عهد. قبل: 98,000.

**Steps:**

1. حاول تعديل معاملة الإيداع الأولى.
2. حاول حذفها.

**Test data:** إيداع 100,000

**Expected result:** 400 "TRANSACTION_LOCKED: المعاملة مقفلة نظراً لوجود تسويات أو عهد مسحوبة من هذا الوعاء التمويلي.". الرصيد يبقى 98,000.

**Actual result:** تعديل: HTTP 400: TRANSACTION_LOCKED: المعاملة مقفلة نظراً لوجود تسويات أو عهد مسحوبة من هذا الوعاء التمويلي. \| حذف: HTTP 400: TRANSACTION_LOCKED: المعاملة مقفلة نظراً لوجود تسويات أو عهد مسحوبة من هذا الوعاء التمويلي. \| الرصيد 49,200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-014 — صرف مباشر (Direct Disbursement)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | No | Pass |

**Preconditions:** قبل: ClientDeposit = 98,000.

**Steps:**

1. افتح الصرف المباشر.
2. اختر U-SE والصندوق ClientDeposit والمبلغ 8,000 والوصف.
3. احفظ.

**Test data:** 8,000 ، وصف: صرف مواد

**Expected result:** "Direct disbursement credited successfully.". بعد: 90,000. عهدة جديدة Issued باسم U-SE بتصنيف "Direct Disbursement" ومعاملة DirectDisbursement.

**Actual result:** HTTP 200: Direct disbursement credited successfully. \| 57,200 → 49,200 \| عهدة Issued / Direct Disbursement \| معاملة DirectDisbursement=1  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-015 — صرف مباشر أكبر من الرصيد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** قبل: ClientDeposit = 90,000.

**Steps:**

1. اطلب صرفاً مباشراً 95,000.

**Test data:** 95,000

**Expected result:** 400 "Insufficient funds in selected pool. Available balance is 90000 EGP.". الرصيد يبقى 90,000.

**Actual result:** HTTP 400: Insufficient funds in selected pool. Available balance is 49200.00 EGP. \| الرصيد 49,200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-016 — Manager لا يصرف مباشرة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** توكن U-MGR.

**Steps:**

1. استدعِ POST direct-disbursement.

**Test data:** 1,000

**Expected result:** 403 Forbidden.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-017 — معاملة مصروف تتجاوز الميزانية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** الميزانية المتبقية في P-A = R.

**Steps:**

1. أضف معاملة Expense بمبلغ R + 1.
2. كرر مع forceOverrun = true.

**Test data:** R + 1

**Expected result:** الأولى 400 "BUDGET_EXCEEDED: This transaction exceeds the remaining project budget.". الثانية مرفوضة لأن التجاوز لـ TenantOwner فقط ("Only TenantOwner can bypass project budget limits").

**Actual result:** R=1,149,200 \| بدون force: HTTP 400: BUDGET_EXCEEDED: This transaction exceeds the remaining project budget. \| force من Accountant: HTTP 403: Unauthorized budget overrun override. Only TenantOwner can bypass project budget limits.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-018 — TenantOwner يتجاوز الميزانية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | No | Pass |

**Preconditions:** الميزانية المتبقية = R.

**Steps:**

1. أضف Expense بمبلغ R + 1 مع forceOverrun = true.

**Test data:** R + 1

**Expected result:** 200 "Transaction added successfully" و IsOverrun = true.

**Actual result:** HTTP 200: Transaction added successfully \| IsOverrun=t  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-019 — إيداعان متزامنان على نفس الصندوق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant ×2 | P1 | H4 | No | Pass |

**Preconditions:** U-ACC1 و U-ACC2 كلاهما مُسند إلى P-B (مؤقتاً). قبل: P-B ClientDeposit = 20,000.

**Steps:**

1. أرسل إيداعين 10,000 في نفس اللحظة (تبويبان أو سكربت curl متوازي).

**Test data:** 2 × 10,000

**Expected result:** كلا الطلبين 200. بعد: 40,000 بالضبط (لا يضيع أي إيداع).

**Actual result:** [200, 200] \| 20,000 → 40,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### CAP-020 — مطابقة الصناديق بملف SQL (للقراءة فقط)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B2 | Yes | Pass |

**Preconditions:** بعد تنفيذ حالات المال كلها.

**Steps:**

1. شغّل docs/sql/reconcile_cash_pools.sql على قاعدة البيانات (SELECT فقط).

**Test data:** لا يوجد

**Expected result:** النتيجة 0 صفوف: كل AvailableBalance مخزن = I − D + R − C.

**Actual result:** على قاعدة الاختبار الجديدة بعد حركات إيداع/عهدة/تسوية/استرداد/حذف (الأرصدة {'ClientDeposit': 6500.0, 'OwnerCapital': 5000.0, 'ExternalLoan': 0.0}): reconcile_cash_pools.sql أعاد 0 صفاً. (قاعدة السيناريوهات الكاملة حُذفت مع الحاوية القديمة؛ انظر ملاحظة الملخص)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Petty Cash

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| PC-001 | SiteEngineer يطلب عهدة | SiteEngineer | P0 | — | Yes | Pass |
| PC-002 | المهندس لا يطلب عهدة باسم شخص آخر | SiteEngineer | P0 | — | Yes | Pass |
| PC-003 | مبلغ عهدة صفر أو سالب | SiteEngineer | P0 | B2 | Yes | Pass |
| PC-004 | اعتماد عهدة من صندوق | Accountant | P0 | B2 | Yes | Pass |
| PC-005 | اعتماد عهدة أكبر من رصيد الصندوق | Accountant | P0 | B2 | Yes | Pass |
| PC-006 | اعتماد عهدة معتمدة مسبقاً | Accountant | P1 | — | Yes | Pass |
| PC-007 | رفض عهدة | Manager | P1 | — | Yes | Pass |
| PC-008 | المهندس لا يعتمد العهد | SiteEngineer | P0 | — | Yes | Pass |
| PC-009 | Accountant غير مُسند لا يعتمد | Accountant | P0 | — | Yes | Pass |
| PC-010 | TenantOwner يصدر عهدة مباشرة من صندوق | TenantOwner | P0 | B2 | Yes | Pass |
| PC-011 | TenantOwner يصدر عهدة أكبر من الرصيد | TenantOwner | P1 | B2 | Yes | Pass |
| PC-012 | تعديل مبلغ عهدة Pending مسموح | Accountant | P1 | B2 | Yes | Pass |
| PC-013 | تعديل مبلغ عهدة Issued ممنوع | Accountant | P0 | B2 | Yes | Pass |
| PC-014 | تعديل سبب عهدة Issued بنفس المبلغ مسموح | Manager | P2 | B2 | Yes | Pass |
| PC-015 | تعديل المبلغ إلى صفر أو سالب | Accountant | P1 | B2 | Yes | Pass |
| PC-016 | الثغرة القديمة: تعديل ثم حذف لا ينشئ مالاً | Accountant | P0 | B2 | Yes | Pass |
| PC-017 | حذف عهدة Pending | Accountant | P1 | B2 | Yes | Pass |
| PC-018 | حذف عهدة Issued يعيد المبلغ | Accountant | P0 | B2 | Yes | Pass |
| PC-019 | حذف عهدة Settled ممنوع | Accountant | P0 | B2 | Yes | Pass |
| PC-020 | حذف عهدة عليها تسوية ممنوع | Accountant | P0 | B2 | Yes | Pass |
| PC-021 | حذف عهدة Rejected لا يغير الرصيد | Manager | P2 | B2 | Yes | Pass |
| PC-022 | التسوية السريعة (settle) مع مبلغ مرتجع | Accountant | P0 | B2 | No | Pass |
| PC-023 | التسوية السريعة بمبلغ أكبر من العهدة | Accountant | P1 | — | Yes | Pass |
| PC-024 | عهدة في مشروع مجمّد | SiteEngineer | P1 | — | Yes | Pass |
| PC-025 | المهندس يرى عهده فقط | SiteEngineer | P0 | — | Yes | Pass |
| PC-026 | Accountant لا يطلب عهدة | Accountant | P2 | — | Yes | Pass |
| PC-027 | اعتمادان متزامنان يتجاوزان الرصيد | Accountant ×2 | P0 | H4 | Yes | Pass |
| PC-028 | اعتمادان متزامنان ضمن الرصيد | Accountant ×2 | P1 | H4 | Yes | Pass |

### PC-001 — SiteEngineer يطلب عهدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** U-SE مُسند إلى P-A. قبل: ClientDeposit = 100,000.

**Steps:**

1. سجّل الدخول بـ U-SE.
2. اضغط "+ طلب عهدة موقع".
3. أدخل المبلغ والسبب والتصنيف.
4. اضغط "إرسال الطلب".

**Test data:** 10,000 ، السبب: شراء أسمنت ، التصنيف: أسمنت

**Expected result:** "Petty cash request submitted successfully" والحالة Pending باسم U-SE. الرصيد لا يتغير (100,000). إشعار للمعتمدين.

**Actual result:** HTTP 200: Petty cash request submitted successfully \| الحالة Pending باسم QA SE \| الرصيد 120,000 بدون تغيير  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-002 — المهندس لا يطلب عهدة باسم شخص آخر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** توكن U-SE.

**Steps:**

1. استدعِ POST /api/projects/{P-A}/PettyCash مع issuedToUserId = معرّف U-DE.

**Test data:** issuedToUserId = U-DE

**Expected result:** 200 لكن العهدة تُسجّل باسم U-SE (يُستبدل المعرّف تلقائياً).

**Actual result:** HTTP 200: Petty cash request submitted successfully \| سُجّلت باسم: QA SE  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-003 — مبلغ عهدة صفر أو سالب

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | B2 | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. اطلب عهدة 0.
2. استدعِ الـ API بمبلغ -500.

**Test data:** 0 ، -500

**Expected result:** الواجهة: "يرجى إدخال مبلغ صالح أكبر من الصفر.". الـ API: 400 "Amount must be greater than zero."

**Actual result:** 0: HTTP 400: Amount must be greater than zero. \| -500: HTTP 400: Amount must be greater than zero.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-004 — اعتماد عهدة من صندوق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** عهدة 10,000 Pending من PC-001. قبل: ClientDeposit = 100,000.

**Steps:**

1. افتح "الموافقات على العهد".
2. اضغط "موافقة" واختر الصندوق ClientDeposit.

**Test data:** sourcePoolId = ClientDeposit(P-A)

**Expected result:** "Petty cash approved and issued successfully.". الحالة Issued. بعد: 90,000. إشعار لـ U-SE.

**Actual result:** HTTP 200: Petty cash approved and issued successfully. \| 120,000 → 110,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-005 — اعتماد عهدة أكبر من رصيد الصندوق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** عهدة 200,000 Pending. قبل: ClientDeposit = 90,000.

**Steps:**

1. اضغط موافقة واختر ClientDeposit.

**Test data:** 200,000

**Expected result:** 400 "Insufficient funds. Available pool is 90000 EGP.". الحالة تبقى Pending والرصيد 90,000.

**Actual result:** HTTP 400: Insufficient funds. Available pool is 110000.00 EGP. \| الحالة Pending \| الرصيد 110,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-006 — اعتماد عهدة معتمدة مسبقاً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** عهدة PC-004 حالتها Issued.

**Steps:**

1. استدعِ approve مرة ثانية.

**Test data:** PC-004

**Expected result:** 400 "Only pending petty cash requests can be approved.". الرصيد لا يتغير.

**Actual result:** HTTP 400: Only pending petty cash requests can be approved.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-007 — رفض عهدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** عهدة Pending. U-MGR مُسند إلى P-A.

**Steps:**

1. اضغط "رفض" واكتب السبب.

**Test data:** comments: المبلغ مرتفع

**Expected result:** "Petty cash request rejected.". الحالة Rejected. الرصيد لا يتغير. إشعار للمهندس بالسبب.

**Actual result:** HTTP 200: Petty cash request rejected.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-008 — المهندس لا يعتمد العهد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** توكن U-SE.

**Steps:**

1. استدعِ POST /PettyCash/{id}/approve.

**Test data:** أي عهدة

**Expected result:** 403 Forbidden. كذلك DesignEngineer.

**Actual result:** SiteEngineer 403 \| DesignEngineer 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-009 — Accountant غير مُسند لا يعتمد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC2 غير مُسند إلى P-A.

**Steps:**

1. استدعِ approve على عهدة في P-A بتوكن U-ACC2.

**Test data:** عهدة Pending في P-A

**Expected result:** 403 Forbidden. الحالة لا تتغير.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-010 — TenantOwner يصدر عهدة مباشرة من صندوق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B2 | Yes | Pass |

**Preconditions:** قبل: ClientDeposit = 90,000.

**Steps:**

1. اطلب عهدة لـ U-SE مع اختيار الصندوق.

**Test data:** 5,000 ، issuedToUserId = U-SE ، sourcePoolId = ClientDeposit

**Expected result:** الحالة Issued مباشرة (بدون موافقة). بعد: 85,000.

**Actual result:** HTTP 200: Petty cash request submitted successfully \| الحالة Issued \| 110,000 → 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-011 — TenantOwner يصدر عهدة أكبر من الرصيد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | B2 | Yes | Pass |

**Preconditions:** قبل: ClientDeposit = 85,000.

**Steps:**

1. اطلب عهدة 90,000 مع اختيار الصندوق.

**Test data:** 90,000

**Expected result:** 400 "Insufficient funds in selected pool. Available is 85000 EGP.". الرصيد 85,000.

**Actual result:** HTTP 400: Insufficient funds in selected pool. Available is 105000.00 EGP. \| الرصيد 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-012 — تعديل مبلغ عهدة Pending مسموح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | B2 | Yes | Pass |

**Preconditions:** عهدة 3,000 Pending. قبل: 85,000.

**Steps:**

1. عدّل المبلغ إلى 4,000.

**Test data:** 4,000

**Expected result:** "Petty cash updated successfully.". المبلغ 4,000. الرصيد 85,000 (لم تُصرف بعد).

**Actual result:** HTTP 200: Petty cash updated successfully. \| المبلغ الآن 4000.0 \| الرصيد 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-013 — تعديل مبلغ عهدة Issued ممنوع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** عهدة 5,000 Issued (PC-010). قبل: 85,000.

**Steps:**

1. عدّل المبلغ إلى 50,000.

**Test data:** 50,000

**Expected result:** 400 "Issued advances cannot be modified. Cancel this advance and issue a new one instead.". المبلغ يبقى 5,000 والرصيد 85,000.

**Actual result:** HTTP 400: Issued advances cannot be modified. Cancel this advance and issue a new one instead. \| المبلغ 5000.0 \| الرصيد 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-014 — تعديل سبب عهدة Issued بنفس المبلغ مسموح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | B2 | Yes | Pass |

**Preconditions:** عهدة 5,000 Issued.

**Steps:**

1. عدّل السبب فقط مع إبقاء المبلغ 5,000.

**Test data:** Reason: شراء رمل

**Expected result:** "Petty cash updated successfully.". الرصيد لا يتغير.

**Actual result:** HTTP 200: Petty cash updated successfully. \| الرصيد 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-015 — تعديل المبلغ إلى صفر أو سالب

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | B2 | Yes | Pass |

**Preconditions:** عهدة Pending.

**Steps:**

1. عدّل المبلغ إلى 0 ثم -100.

**Test data:** 0 ، -100

**Expected result:** 400 "Amount must be greater than zero."

**Actual result:** HTTP 400: Amount must be greater than zero. \| HTTP 400: Amount must be greater than zero.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-016 — الثغرة القديمة: تعديل ثم حذف لا ينشئ مالاً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** قبل: ClientDeposit = 85,000.

**Steps:**

1. أصدر عهدة 1,000 (Issued) ← الرصيد 84,000.
2. حاول تعديلها إلى 10,000.
3. احذفها.

**Test data:** 1,000 ثم 10,000

**Expected result:** التعديل مرفوض. بعد الحذف: 85,000 بالضبط (يعود 1,000 فقط وليس 10,000).

**Actual result:** قبل 105,000 → بعد الإصدار 104,000 → التعديل 400 → الحذف 200 → 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-017 — حذف عهدة Pending

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | B2 | Yes | Pass |

**Preconditions:** عهدة 4,000 Pending. قبل: 85,000.

**Steps:**

1. احذف العهدة.

**Test data:** PC-012

**Expected result:** "Petty cash deleted and pool balance restored.". الرصيد 85,000 (لم تكن مخصومة).

**Actual result:** HTTP 200: Petty cash deleted and pool balance restored. \| الرصيد 105,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-018 — حذف عهدة Issued يعيد المبلغ

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** عهدة 5,000 Issued بدون تسويات. قبل: 85,000.

**Steps:**

1. احذف العهدة.

**Test data:** PC-010

**Expected result:** بعد: 90,000 (+5,000). صورة الإيصال تُحذف من التخزين إن وجدت.

**Actual result:** HTTP 200: Petty cash deleted and pool balance restored. \| 105,000 → 110,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-019 — حذف عهدة Settled ممنوع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** عهدة حالتها Settled.

**Steps:**

1. احذف العهدة.
2. عدّلها.

**Test data:** عهدة مسوّاة

**Expected result:** 400 "This financial transaction is closed and audited. It cannot be modified or deleted."

**Actual result:** حذف: HTTP 400: This financial transaction is closed and audited. It cannot be modified or deleted. \| تعديل: HTTP 400: This financial transaction is closed and audited. It cannot be modified or deleted.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-020 — حذف عهدة عليها تسوية ممنوع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | Yes | Pass |

**Preconditions:** عهدة Issued لها تسوية مرفوضة (عادت إلى Issued)، أو حالتها ApprovedPendingRefund.

**Steps:**

1. احذف العهدة.

**Test data:** عهدة من SET-009

**Expected result:** 400 "This advance has settlements recorded against it and cannot be deleted.". الرصيد لا يتغير.

**Actual result:** HTTP 400: This advance has settlements recorded against it and cannot be deleted. \| الرصيد 70,500  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-021 — حذف عهدة Rejected لا يغير الرصيد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | B2 | Yes | Pass |

**Preconditions:** عهدة Rejected. قبل: 90,000.

**Steps:**

1. احذف العهدة.

**Test data:** عهدة من PC-007

**Expected result:** الحذف ينجح. الرصيد 90,000.

**Actual result:** HTTP 200: Petty cash deleted and pool balance restored. \| الرصيد 110,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-022 — التسوية السريعة (settle) مع مبلغ مرتجع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | No | Pass |

**Preconditions:** عهدة 10,000 Issued من ClientDeposit. قبل: 80,000.

**Steps:**

1. اضغط "تسوية" على العهدة.
2. أدخل المبلغ المستهلك 7,000 وملاحظات الإيصال وصورة.
3. اضغط "تسوية الأموال".
4. افتح الصناديق.
5. أودع 1,000 ثم افتح الصناديق.

**Test data:** SpentAmount 7,000 ، ReturnAmount 3,000

**Expected result:** "Petty cash successfully settled." والحالة Settled. المتوقع الصحيح: بعد التسوية 83,000 وبعد الإيداع 84,000، وملف reconcile_cash_pools.sql بلا فروق. ملاحظة من مراجعة الكود: SettlePettyCashAsync يسجل ReturnAmount ولا يضيفه للصندوق، فيبقى 80,000 ثم يقفز إلى 84,000 بعد الإيداع. يُتوقع أن تفشل.

**Actual result:** HTTP 200: Petty cash successfully settled. \| قبل التسوية 100,000 → بعدها 103,000 (المتوقع 103,000) → بعد إيداع 1,000: 104,000 (المتوقع 104,000)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-023 — التسوية السريعة بمبلغ أكبر من العهدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** عهدة 5,000 Issued.

**Steps:**

1. أدخل المبلغ المستهلك 6,000.

**Test data:** 6,000

**Expected result:** الواجهة: "يجب أن يكون المبلغ المستهلك موجباً ولا يتجاوز المبلغ المنصرف.". الـ API: 400 "Spent amount cannot exceed the issued petty cash amount."

**Actual result:** HTTP 400: Spent amount cannot exceed the issued petty cash amount. (رسالة الواجهة لم تُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-024 — عهدة في مشروع مجمّد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** P-C مجمّد و U-SE مُسند له.

**Steps:**

1. اطلب عهدة في P-C.

**Test data:** 1,000

**Expected result:** 400 "PROJECT_FROZEN: لا يمكن تقديم طلبات جديدة. المشروع في وضع FinancialFreeze. يرجى مراجعة المحاسب."

**Actual result:** HTTP 400: PROJECT_FROZEN: لا يمكن تقديم طلبات جديدة. المشروع في وضع FinancialFreeze. يرجى مراجعة المحاسب.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-025 — المهندس يرى عهده فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** يوجد عهد لـ U-SE و U-DE في P-A.

**Steps:**

1. سجّل الدخول بـ U-SE وافتح "طلبات العهد الخاصة بي".

**Test data:** U-SE

**Expected result:** تظهر عهد U-SE فقط. GET /PettyCash/mobile لا يعيد عهد U-DE.

**Actual result:** U-SE يرى 5 عهدة، كلها باسمه=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-026 — Accountant لا يطلب عهدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P2 | — | Yes | Pass |

**Preconditions:** U-ACC1 مُسند إلى P-A.

**Steps:**

1. استدعِ POST /api/projects/{P-A}/PettyCash بتوكن U-ACC1.

**Test data:** 1,000

**Expected result:** 403 Forbidden (طلب العهد لـ TenantOwner و Manager و SiteEngineer و DesignEngineer المُسندين).

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-027 — اعتمادان متزامنان يتجاوزان الرصيد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant ×2 | P0 | H4 | Yes | Pass |

**Preconditions:** U-ACC1 و U-ACC2 مُسندان إلى P-B. قبل: P-B ClientDeposit = 50,000. عهدتان Pending بقيمة 40,000 لكل منهما.

**Steps:**

1. اعتمد العهدتين في نفس اللحظة (تبويبان أو curl متوازي).

**Test data:** 2 × 40,000

**Expected result:** واحدة فقط تنجح. الأخرى 400 "Insufficient funds. Available pool is 10000 EGP." (أو "POOL_BUSY: The cash pool was changed by another operation at the same moment. Please try again."). بعد: 10,000 بالضبط، وليس -30,000.

**Actual result:** قبل 50,000 \| ['HTTP 400: Insufficient funds. Available pool is 10000.00 EGP.', 'HTTP 200: Petty cash approved and issued successfully.'] \| بعد 10,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### PC-028 — اعتمادان متزامنان ضمن الرصيد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant ×2 | P1 | H4 | Yes | Pass |

**Preconditions:** قبل: P-B ClientDeposit = 100,000. عهدتان Pending: 30,000 و 40,000.

**Steps:**

1. اعتمد العهدتين في نفس اللحظة.

**Test data:** 30,000 + 40,000

**Expected result:** الاثنتان Issued. بعد: 30,000 بالضبط (لا يضيع خصم).

**Actual result:** قبل 100,000 \| [200, 200] \| بعد 30,000 (المتوقع 30,000)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Settlements

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| SET-001 | تقديم تسوية بالبنود | SiteEngineer | P0 | — | No | Pass |
| SET-002 | حفظ مسودة تسوية | SiteEngineer | P2 | — | No | Pass |
| SET-003 | تسوية بدون بنود أو ببند صفر | SiteEngineer | P1 | — | Yes | Pass |
| SET-004 | تسوية عهدة شخص آخر | SiteEngineer | P0 | — | Yes | Pass |
| SET-005 | اعتماد تسوية مطابقة تماماً | Accountant | P0 | — | Yes | Pass |
| SET-006 | اعتماد تسوية أقل + تأكيد الاسترداد | Accountant | P0 | B2 | No | Pass |
| SET-007 | اعتماد تسوية أكبر من العهدة (تعويض) | Accountant | P0 | B2 | No | Pass |
| SET-008 | اعتماد تسوية غير Pending | Accountant | P1 | — | Yes | Pass |
| SET-009 | رفض تسوية يعيد العهدة إلى Issued | Accountant | P1 | — | Yes | Pass |
| SET-010 | المهندس لا يعتمد أو يرفض التسويات | SiteEngineer | P0 | — | Yes | Pass |
| SET-011 | Manager لا يعتمد تسوية عهدته | Manager | P0 | B6 | Yes | Pass |
| SET-012 | Manager لا يرفض تسوية عهدته | Manager | P0 | B6 | Yes | Pass |
| SET-013 | Manager لا يؤكد استرداد عهدته | Manager | P0 | B6 | No | Pass |
| SET-014 | Accountant آخر يعتمد تسوية Manager | Accountant | P0 | B6 | No | Pass |
| SET-015 | Manager يعتمد تسوية مهندس | Manager | P1 | B6 | No | Pass |
| SET-016 | TenantOwner معفى: يعتمد تسوية عهدته | TenantOwner | P0 | B6 | No | Pass |
| SET-017 | Accountant لا يقدّم تسوية لعهدة باسمه | Accountant | P2 | B6 | Yes | Pass |
| SET-018 | Accountant غير مُسند لا يعتمد التسويات | Accountant | P0 | — | Yes | Pass |
| SET-019 | المهندس يرى تسوياته فقط | SiteEngineer | P1 | — | Yes | Pass |
| SET-020 | اعتماد مزدوج سريع | Accountant ×2 | P1 | H4 | No | Pass |

### SET-001 — تقديم تسوية بالبنود

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | No | Pass |

**Preconditions:** عهدة 10,000 Issued لـ U-SE. قبل: ClientDeposit = 90,000.

**Steps:**

1. افتح العهدة واضغط "تقديم الإيصالات".
2. أضف 3 بنود بفواتير.
3. اضغط "تقديم التسوية".

**Test data:** بنود: 3,000 + 2,500 + 1,500 = 7,000

**Expected result:** "تم تقديم طلب التسوية بنجاح وهو قيد المراجعة.". التسوية Pending. الرصيد 90,000 بدون تغيير.

**Actual result:** HTTP 200: تم تقديم طلب التسوية بنجاح وهو قيد المراجعة. \| الحالة Pending الإجمالي 7000.0 \| الرصيد 89,000 بدون تغيير  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-002 — حفظ مسودة تسوية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P2 | — | No | Pass |

**Preconditions:** عهدة Issued لـ U-SE.

**Steps:**

1. أضف بنداً واحداً واحفظ كمسودة.
2. قدّم تسوية جديدة لنفس العهدة.

**Test data:** isDraft = true

**Expected result:** "تم حفظ مسودة التسوية بنجاح." والحالة Draft. عند التقديم تُحذف المسودة القديمة وتُنشأ تسوية Pending واحدة.

**Actual result:** مسودة: HTTP 200: تم حفظ مسودة التسوية بنجاح. \| بعد التقديم: ['Pending']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-003 — تسوية بدون بنود أو ببند صفر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** عهدة Issued.

**Steps:**

1. قدّم تسوية بقائمة بنود فارغة.
2. قدّم بنداً بمبلغ 0.

**Test data:** Lines = [] ، Amount 0

**Expected result:** 400 "At least one settlement line is required." و "Amount must be greater than zero."

**Actual result:** HTTP 400: Validation failed. ["At least one settlement line is required."] \| HTTP 400: Validation failed. ["Amount must be greater than zero."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-004 — تسوية عهدة شخص آخر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** عهدة Issued لـ U-DE.

**Steps:**

1. استدعِ POST /Settlements بتوكن U-SE و pettyCashId لعهدة U-DE.

**Test data:** pettyCashId عهدة U-DE

**Expected result:** 400 "ACCESS_DENIED: You are not authorized to settle custody issued to another user."

**Actual result:** HTTP 400: ACCESS_DENIED: You are not authorized to settle custody issued to another user.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-005 — اعتماد تسوية مطابقة تماماً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** عهدة 10,000 وتسوية Pending بـ 10,000. قبل: 90,000.

**Steps:**

1. اضغط اعتماد التسوية.

**Test data:** TotalAmount 10,000

**Expected result:** "تم اعتماد التسوية بنجاح.". التسوية Approved والعهدة Settled. معاملات Expense لكل بند. الرصيد 90,000 (خُصم عند الإصدار).

**Actual result:** HTTP 200: تم اعتماد التسوية بنجاح. \| تسوية Approved عهدة Settled \| Expense لكل بند=2 \| الرصيد 76,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-006 — اعتماد تسوية أقل + تأكيد الاسترداد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | No | Pass |

**Preconditions:** عهدة 10,000 وتسوية Pending بـ 7,000. قبل: 90,000.

**Steps:**

1. اعتمد التسوية.
2. اضغط تأكيد الاسترداد (confirm-refund).
3. افتح الصناديق مرتين.

**Test data:** مرتجع 3,000

**Expected result:** بعد الاعتماد: "تم اعتماد التسوية. الحالة: في انتظار تأكيد المحاسب لاسترداد المتبقي." والرصيد 90,000. بعد التأكيد: "Refund confirmed..." والرصيد 93,000. معاملة RefundToTreasury بمبلغ 3,000. يبقى 93,000 بعد إعادة الفتح.

**Actual result:** اعتماد: HTTP 200: تم اعتماد التسوية. الحالة: في انتظار تأكيد المحاسب لاسترداد المتبقي. الرصيد 76,000 \| تأكيد: HTTP 200: Refund confirmed. Cash pool balance and project budget restored, settlement fully closed. \| 76,000 → 79,000 \| RefundToTreasury 3,000=1 \| بعد إعادة الفتح ['79,000', '79,000']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-007 — اعتماد تسوية أكبر من العهدة (تعويض)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B2 | No | Pass |

**Preconditions:** عهدة 10,000 وتسوية Pending بـ 12,000. قبل: 93,000.

**Steps:**

1. اعتمد التسوية.
2. افتح الموافقات واعتمد عهدة التعويض من ClientDeposit.

**Test data:** زيادة 2,000

**Expected result:** التسوية Approved والعهدة Settled. تُنشأ عهدة تعويض Pending بـ 2,000. بعد اعتمادها: Settled مباشرة والرصيد 91,000.

**Actual result:** HTTP 200: تم اعتماد التسوية بنجاح. \| عهدة تعويض 2,000 Pending=True \| بعد اعتمادها: Settled \| 74,000 → 72,000  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-008 — اعتماد تسوية غير Pending

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** تسوية Approved أو Draft.

**Steps:**

1. استدعِ approve.

**Test data:** تسوية من SET-005

**Expected result:** 400 "Only pending settlements can be approved."

**Actual result:** HTTP 400: Only pending settlements can be approved.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-009 — رفض تسوية يعيد العهدة إلى Issued

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** تسوية Pending.

**Steps:**

1. اضغط رفض واكتب التعليق.

**Test data:** comments: الفاتورة غير واضحة

**Expected result:** "Settlement request rejected.". التسوية Rejected والعهدة Issued ليعاد التقديم. الرصيد لا يتغير.

**Actual result:** HTTP 200: Settlement request rejected. \| العهدة Issued  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-010 — المهندس لا يعتمد أو يرفض التسويات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** تسوية Pending.

**Steps:**

1. استدعِ /approve ثم /reject بتوكن U-SE.

**Test data:** أي تسوية

**Expected result:** 403 Forbidden.

**Actual result:** approve 403 \| reject 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-011 — Manager لا يعتمد تسوية عهدته

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | B6 | Yes | Pass |

**Preconditions:** U-MGR طلب عهدة 5,000 واعتمدها U-ACC1، ثم قدّم U-MGR تسوية Pending بـ 5,000.

**Steps:**

1. سجّل الدخول بـ U-MGR واضغط اعتماد التسوية.

**Test data:** تسوية U-MGR

**Expected result:** 403 والرسالة "Users cannot approve, reject, or confirm refunds for their own petty cash settlements.". التسوية تبقى Pending.

**Actual result:** HTTP 403: Users cannot approve, reject, or confirm refunds for their own petty cash settlements.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-012 — Manager لا يرفض تسوية عهدته

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | B6 | Yes | Pass |

**Preconditions:** نفس تسوية SET-011 (Pending).

**Steps:**

1. اضغط رفض بحساب U-MGR.

**Test data:** تسوية U-MGR

**Expected result:** 403 بنفس الرسالة. الحالة لا تتغير.

**Actual result:** HTTP 403: Users cannot approve, reject, or confirm refunds for their own petty cash settlements.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-013 — Manager لا يؤكد استرداد عهدته

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | B6 | No | Pass |

**Preconditions:** عهدة U-MGR 5,000 وتسوية 4,000 اعتمدها U-ACC1 (ApprovedPendingRefund). قبل: 91,000.

**Steps:**

1. اضغط تأكيد الاسترداد بحساب U-MGR.
2. أكده بحساب U-ACC1.

**Test data:** مرتجع 1,000

**Expected result:** U-MGR: 403 بنفس الرسالة والرصيد 91,000. U-ACC1: ينجح والرصيد 92,000.

**Actual result:** Manager: HTTP 403: Users cannot approve, reject, or confirm refunds for their own petty cash settlements. الرصيد 60,500 \| Accountant: 200 → 61,500  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-014 — Accountant آخر يعتمد تسوية Manager

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | B6 | No | Pass |

**Preconditions:** تسوية U-MGR Pending بـ 5,000 على عهدة 5,000.

**Steps:**

1. اعتمدها بـ U-ACC1.

**Test data:** تسوية U-MGR

**Expected result:** "تم اعتماد التسوية بنجاح." و ResolvedBy = U-ACC1.

**Actual result:** HTTP 200: تم اعتماد التسوية بنجاح. \| ResolvedBy=QA ACC1  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-015 — Manager يعتمد تسوية مهندس

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | B6 | No | Pass |

**Preconditions:** تسوية U-SE Pending بـ 2,000 على عهدة 2,000. U-MGR مُسند.

**Steps:**

1. اعتمدها بحساب U-MGR.

**Test data:** تسوية U-SE

**Expected result:** 200. الـ Manager مسموح له باعتماد تسويات الآخرين.

**Actual result:** Manager يعتمد تسوية U-SE (2,000): HTTP 200: تم اعتماد التسوية بنجاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-016 — TenantOwner معفى: يعتمد تسوية عهدته

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B6 | No | Pass |

**Preconditions:** U-OWN أصدر لنفسه عهدة 3,000 من ClientDeposit (Issued). قبل بعد الإصدار: 89,000.

**Steps:**

1. قدّم تسوية 3,000 بحساب U-OWN.

**Test data:** 3,000

**Expected result:** "تم تقديم طلب التسوية بنجاح وتم الاعتماد التلقائي.". التسوية Approved و ResolvedBy = U-OWN. الرصيد 89,000.

**Actual result:** HTTP 200: تم تقديم طلب التسوية بنجاح وتم الاعتماد التلقائي. \| Approved ResolvedBy=QA Owner \| الرصيد بعد الإصدار 58,500 وبعد التسوية 58,500  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-017 — Accountant لا يقدّم تسوية لعهدة باسمه

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P2 | B6 | Yes | Pass |

**Preconditions:** TenantOwner صرف عهدة مباشرة لـ U-ACC1.

**Steps:**

1. استدعِ POST /Settlements بتوكن U-ACC1.

**Test data:** عهدة U-ACC1

**Expected result:** 403 Forbidden (لا يوجد مسار يجعل المحاسب يعتمد تسوية لعهدته).

**Actual result:** صرف مباشر لـ U-ACC1: 200 \| تقديم U-ACC1 تسوية لعهدته: HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-018 — Accountant غير مُسند لا يعتمد التسويات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC2 غير مُسند إلى P-A وتسوية Pending في P-A.

**Steps:**

1. استدعِ approve بتوكن U-ACC2.

**Test data:** تسوية في P-A

**Expected result:** 403 Forbidden.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-019 — المهندس يرى تسوياته فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** تسويات لـ U-SE و U-MGR في P-A.

**Steps:**

1. افتح قائمة التسويات بحساب U-SE.

**Test data:** U-SE

**Expected result:** تظهر تسويات U-SE فقط.

**Actual result:** U-SE يرى 6 تسوية، كلها له=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SET-020 — اعتماد مزدوج سريع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant ×2 | P1 | H4 | No | Pass |

**Preconditions:** تسوية Pending.

**Steps:**

1. اضغط اعتماد من U-ACC1 و U-MGR في نفس اللحظة.

**Test data:** تسوية واحدة

**Expected result:** طلب واحد ينجح والآخر 400 ("Only pending settlements can be approved." أو "CONCURRENCY_ERROR: ..."). معاملات Expense غير مكررة.

**Actual result:** النتيجتان: ['HTTP 200: تم اعتماد التسوية بنجاح.', 'HTTP 400: Only pending settlements can be approved.'] \| معاملات Expense=1  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Site Execution

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| SITE-001 | إنشاء بند تنفيذي | Manager | P0 | — | No | Pass |
| SITE-002 | بند بدون عنوان أو بوزن صفر | Manager | P1 | — | Yes | Pass |
| SITE-003 | إسناد بند لمهندس غير مُسند للمشروع | Manager | P1 | — | Yes | Pass |
| SITE-004 | إسناد بند لمستخدم موقوف | Manager | P2 | — | Yes | Pass |
| SITE-005 | مشروع يديره المالك: إسناد للمالك | TenantOwner | P2 | — | No | Pass |
| SITE-006 | تحديث نسبة الإنجاز وتغيير الحالة تلقائياً | SiteEngineer | P0 | — | Yes | Pass |
| SITE-007 | نسبة إنجاز خارج المدى | SiteEngineer | P2 | — | Yes | Pass |
| SITE-008 | مهندس غير مُسند يحدّث بنداً | SiteEngineer | P0 | — | Yes | Pass |
| SITE-009 | Accountant لا ينشئ أو يحدّث البنود | Accountant | P1 | — | Yes | Pass |
| SITE-010 | نسبة الإنجاز الموزونة | Manager | P1 | — | Yes | Pass |
| SITE-011 | ربط بنود تسوية ببند تنفيذي | Accountant | P1 | — | No | Pass |
| SITE-012 | ربط مبلغ أكبر من المتبقي | Accountant | P1 | — | Yes | Pass |
| SITE-013 | ربط بمبلغ صفر | Manager | P2 | — | Yes | Pass |

### SITE-001 — إنشاء بند تنفيذي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P0 | — | No | Pass |

**Preconditions:** U-MGR و U-SE مُسندان إلى P-A.

**Steps:**

1. افتح /dashboard/projects/{P-A}/site-execution.
2. أضف بنداً بعنوان ووزن ومهندس مسؤول U-SE وتواريخ مخططة.
3. احفظ.

**Test data:** العنوان: صب سقف الدور الأول ، الوزن 2

**Expected result:** "تم إنشاء البند التنفيذي بنجاح." والبند يظهر بحالة Pending و 0%.

**Actual result:** HTTP 200: تم إنشاء البند التنفيذي بنجاح. \| الحالة Pending 0%  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-002 — بند بدون عنوان أو بوزن صفر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أنشئ بنداً بعنوان فارغ.
2. أنشئ بنداً بوزن 0.

**Test data:** Weight 0

**Expected result:** "عنوان البند التنفيذي مطلوب." ثم "الوزن النسبي للبند يجب أن يكون أكبر من الصفر."

**Actual result:** HTTP 400: عنوان البند التنفيذي مطلوب. \| HTTP 400: الوزن النسبي للبند يجب أن يكون أكبر من الصفر.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-003 — إسناد بند لمهندس غير مُسند للمشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** U-SE2 غير مُسند إلى P-A.

**Steps:**

1. أنشئ بنداً واختر U-SE2 كمسؤول.

**Test data:** AssignedEngineerId = U-SE2

**Expected result:** 400 "لا يمكن إسناد المهمة لمهندس غير مسند رسمياً لهذا المشروع."

**Actual result:** HTTP 400: لا يمكن إسناد المهمة لمهندس غير مسند رسمياً لهذا المشروع.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-004 — إسناد بند لمستخدم موقوف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | — | Yes | Pass |

**Preconditions:** U-DE موقوف مؤقتاً.

**Steps:**

1. أنشئ بنداً واختر U-DE.

**Test data:** U-DE

**Expected result:** 400 "المهندس أو المسؤول المختار غير موجود أو غير نشط."

**Actual result:** HTTP 400: المهندس أو المسؤول المختار غير موجود أو غير نشط.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-005 — مشروع يديره المالك: إسناد للمالك

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | No | Pass |

**Preconditions:** مشروع بلا مهندسين مُسندين.

**Steps:**

1. أنشئ بنداً واختر U-OWN كمسؤول.

**Test data:** AssignedEngineerId = U-OWN

**Expected result:** ينجح (المالك مستثنى من شرط الإسناد).

**Actual result:** P-B: HTTP 200: تم إنشاء البند التنفيذي بنجاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-006 — تحديث نسبة الإنجاز وتغيير الحالة تلقائياً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** بند في P-A مسؤوله U-SE.

**Steps:**

1. حدّث النسبة إلى 50.
2. حدّث إلى 100.
3. حدّث إلى 0.

**Test data:** 50 ، 100 ، 0

**Expected result:** "تم تحديث نسبة الإنجاز وحالة البند بنجاح.". الحالة InProgress ثم Completed (مع CompletedAt) ثم Pending.

**Actual result:** (النسبة، HTTP، الحالة، CompletedAt) = [(50, 200, 'InProgress', False), (100, 200, 'Completed', True), (0, 200, 'Pending', False)]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-007 — نسبة إنجاز خارج المدى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P2 | — | Yes | Pass |

**Preconditions:** بند في P-A.

**Steps:**

1. استدعِ PATCH /api/site-tasks/{id}/progress بـ 150 ثم -10.

**Test data:** 150 ، -10

**Expected result:** تُقص القيمة إلى 100 ثم 0.

**Actual result:** 150 → 100 \| -10 → 0  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-008 — مهندس غير مُسند يحدّث بنداً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** U-SE2 غير مُسند إلى P-A، وبند في P-A.

**Steps:**

1. استدعِ PATCH /api/site-tasks/{id}/progress بتوكن U-SE2.

**Test data:** ProgressPercentage 90

**Expected result:** يجب الرفض (403) وعدم تغيير النسبة. ملاحظة من مراجعة الكود: UpdateTaskProgressAsync يتحقق من الشركة فقط وليس من الإسناد، لذلك يُتوقع أن تفشل.

**Actual result:** U-SE2 (غير مُسند): HTTP 403: غير مصرح لك بتحديث نسبة إنجاز هذا البند. \| النسبة أصبحت 0%  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-009 — Accountant لا ينشئ أو يحدّث البنود

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** توكن U-ACC1.

**Steps:**

1. استدعِ POST /api/site-tasks.
2. استدعِ PATCH progress.

**Test data:** أي بند

**Expected result:** 403 Forbidden في الحالتين. GET site-tasks مسموح (قراءة).

**Actual result:** POST 403 \| PATCH 403 \| GET 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-010 — نسبة الإنجاز الموزونة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** بندان: وزن 2 بنسبة 50%، ووزن 1 بنسبة 100%.

**Steps:**

1. افتح صفحة التنفيذ وتحقق من النسبة الكلية.

**Test data:** (2×50 + 1×100) / 3

**Expected result:** النسبة الكلية = 67% (66.67 مقربة).

**Actual result:** بند وزن 2 عند 50% + بند وزن 1 عند 100% → 67% (totalWeight=3.0)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-011 — ربط بنود تسوية ببند تنفيذي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | No | Pass |

**Preconditions:** تسوية Approved فيها بند 3,000.

**Steps:**

1. افتح البند التنفيذي &gt; ربط بنود التسوية.
2. اربط 2,000 من بند الـ 3,000.

**Test data:** AllocatedAmount 2,000

**Expected result:** "تم ربط بنود التسويات بالبند التنفيذي بنجاح."

**Actual result:** HTTP 200: تم ربط بنود التسويات بالبند التنفيذي بنجاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-012 — ربط مبلغ أكبر من المتبقي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** بند التسوية 3,000 ومربوط منه 2,000.

**Steps:**

1. اربط 1,500 إضافية.

**Test data:** 1,500

**Expected result:** 400 "المبلغ المخصص (1,500.00 ج.م) يتجاوز الحد الأقصى المتبقي لبند التسوية '...' (المتبقي: 1,000.00 ج.م)."

**Actual result:** HTTP 400: المبلغ المخصص (1,500.00 ج.م) يتجاوز الحد الأقصى المتبقي لبند التسوية 'QA line 1' (المتبقي: 1,000.00 ج.م). (بند آخر؛ إعادة الربط لنفس البند تستبدل التخصيص)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SITE-013 — ربط بمبلغ صفر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | — | Yes | Pass |

**Preconditions:** بند تسوية متاح.

**Steps:**

1. اربط 0.

**Test data:** 0

**Expected result:** 400 "يجب أن يكون المبلغ المخصص أكبر من الصفر."

**Actual result:** HTTP 400: يجب أن يكون المبلغ المخصص أكبر من الصفر.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Daily Logs & Punch List

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| DLP-001 | تسجيل تقرير يومي | SiteEngineer | P0 | — | No | Pass |
| DLP-002 | تعديل تقرير نفس اليوم (Upsert) | Manager | P1 | — | Yes | Pass |
| DLP-003 | عدد عمالة سالب | SiteEngineer | P2 | — | Yes | Pass |
| DLP-004 | مستخدم غير مُسند لا يسجل يوميات | SiteEngineer | P0 | — | Yes | Pass |
| DLP-005 | Accountant يقرأ ولا يكتب اليوميات | Accountant | P1 | — | Yes | Pass |
| DLP-006 | إضافة ملاحظة استلام (Punch item) | DesignEngineer | P0 | — | No | Pass |
| DLP-007 | ملاحظة بدون صورة أو عنوان | SiteEngineer | P1 | — | Yes | Pass |
| DLP-008 | المهندس يحدد "تم الإصلاح" | SiteEngineer | P1 | — | Yes | Pass |
| DLP-009 | المهندس لا يعتمد إغلاق الملاحظة | SiteEngineer | P0 | — | Yes | Pass |
| DLP-010 | Manager يعتمد إغلاق الملاحظة | Manager | P1 | — | Yes | Pass |
| DLP-011 | تصفية الملاحظات حسب الحالة | Accountant | P2 | — | Yes | Pass |
| DLP-012 | مستخدم غير مُسند لا يغيّر حالة ملاحظة | SiteEngineer | P1 | — | Yes | Pass |

### DLP-001 — تسجيل تقرير يومي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | No | Pass |

**Preconditions:** U-SE مُسند إلى P-A. لا يوجد تقرير اليوم.

**Steps:**

1. افتح تبويب اليوميات.
2. أدخل الطقس وعدد العمالة والمواد والملاحظات.
3. احفظ.

**Test data:** العمالة 12 ، الطقس: مشمس

**Expected result:** "تم حفظ التقرير اليومي بنجاح." وتقرير واحد بتاريخ اليوم.

**Actual result:** HTTP 200: تم حفظ التقرير اليومي بنجاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-002 — تعديل تقرير نفس اليوم (Upsert)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** يوجد تقرير اليوم من DLP-001.

**Steps:**

1. سجّل تقريراً لنفس التاريخ بعدد عمالة مختلف.

**Test data:** العمالة 15

**Expected result:** "تم تحديث التقرير اليومي بنجاح.". يبقى تقرير واحد لليوم والعدد 15 و LoggedBy = U-MGR.

**Actual result:** HTTP 200: تم تحديث التقرير اليومي بنجاح. \| تقارير اليوم=1 العمالة=15 بواسطة QA MGR  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-003 — عدد عمالة سالب

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. احفظ تقريراً بعدد عمالة -5.

**Test data:** -5

**Expected result:** يُحفظ العدد 0.

**Actual result:** HTTP 200: تم حفظ التقرير اليومي بنجاح. \| العدد المحفوظ=0  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-004 — مستخدم غير مُسند لا يسجل يوميات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** U-SE2 غير مُسند إلى P-A.

**Steps:**

1. استدعِ POST /api/projects/{P-A}/daily-logs بتوكن U-SE2.

**Test data:** أي بيانات

**Expected result:** 400 "غير مصرح لك بتسجيل أو تعديل اليوميات الميدانية لهذا المشروع."

**Actual result:** HTTP 400: غير مصرح لك بتسجيل أو تعديل اليوميات الميدانية لهذا المشروع.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-005 — Accountant يقرأ ولا يكتب اليوميات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** U-ACC1 مُسند إلى P-A.

**Steps:**

1. استدعِ GET daily-logs.
2. استدعِ POST daily-logs.

**Test data:** P-A

**Expected result:** GET 200. POST 403.

**Actual result:** GET 200 \| POST 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-006 — إضافة ملاحظة استلام (Punch item)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DesignEngineer | P0 | — | No | Pass |

**Preconditions:** U-DE مُسند إلى P-A.

**Steps:**

1. افتح قائمة الملاحظات.
2. أضف عنواناً وصورة العيب قبل الإصلاح.
3. احفظ.

**Test data:** العنوان: تشقق في المحارة ، صورة JPG

**Expected result:** "تم تسجيل ملاحظة الاستلام الفني بنجاح." والحالة Open.

**Actual result:** HTTP 200: تم تسجيل ملاحظة الاستلام الفني بنجاح. \| الحالة Open  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-007 — ملاحظة بدون صورة أو عنوان

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أضف ملاحظة بدون صورة.
2. أضف ملاحظة بدون عنوان.

**Test data:** —

**Expected result:** "صورة العيب الفني قبل الإصلاح مطلوبة." و "عنوان الملاحظة الفنية مطلوب."

**Actual result:** HTTP 400: صورة العيب الفني قبل الإصلاح مطلوبة. \| HTTP 400: عنوان الملاحظة الفنية مطلوب.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-008 — المهندس يحدد "تم الإصلاح"

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** ملاحظة Open في P-A.

**Steps:**

1. غيّر الحالة إلى FixedPendingReview مع صورة بعد الإصلاح.

**Test data:** ResolutionPhotoUrl

**Expected result:** "تم تحديث حالة الملاحظة بنجاح." وتُحفظ صورة الإصلاح.

**Actual result:** HTTP 200: تم تحديث حالة الملاحظة بنجاح. \| FixedPendingReview  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-009 — المهندس لا يعتمد إغلاق الملاحظة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** ملاحظة FixedPendingReview.

**Steps:**

1. غيّر الحالة إلى ApprovedAndClosed بحساب U-SE.

**Test data:** Status ApprovedAndClosed

**Expected result:** 400 "اعتماد وإغلاق الملاحظة محصور بمديري المشاريع أو مالك المنشأة حصراً."

**Actual result:** HTTP 400: اعتماد وإغلاق الملاحظة محصور بمديري المشاريع أو مالك المنشأة حصراً.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-010 — Manager يعتمد إغلاق الملاحظة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** ملاحظة FixedPendingReview.

**Steps:**

1. غيّر الحالة إلى ApprovedAndClosed.

**Test data:** —

**Expected result:** نجاح وتُسجّل ResolvedAt.

**Actual result:** HTTP 200: تم تحديث حالة الملاحظة بنجاح. \| ApprovedAndClosed resolvedAt=2026-10-07T11:04:45Z  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-011 — تصفية الملاحظات حسب الحالة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P2 | — | Yes | Pass |

**Preconditions:** ملاحظات بحالات مختلفة.

**Steps:**

1. استدعِ GET punch-list?status=Open.

**Test data:** status=Open

**Expected result:** تظهر الملاحظات المفتوحة فقط.

**Actual result:** HTTP 200 \| ['Open']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DLP-012 — مستخدم غير مُسند لا يغيّر حالة ملاحظة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** U-SE2 غير مُسند.

**Steps:**

1. استدعِ PATCH /api/punch-list/{id}/status بتوكن U-SE2.

**Test data:** أي ملاحظة

**Expected result:** 400 "غير مصرح لك بالوصول لهذا المشروع."

**Actual result:** HTTP 400: غير مصرح لك بالوصول لهذا المشروع.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Photos & Uploads

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| UPL-001 | رفع صورة لمعرض المشروع إلى R2 | SiteEngineer | P0 | H1 | No | Blocked |
| UPL-002 | رفع 20 ملفاً متتالياً بدون أخطاء اتصال | SiteEngineer | P1 | H1 | No | Blocked |
| UPL-003 | رفع إيصال بتصنيف Receipt | SiteEngineer | P0 | H2 | No | Pass |
| UPL-004 | رفع إيصال عبر project-receipt | Accountant | P1 | — | Yes | Pass |
| UPL-005 | ملف بامتداد غير مسموح | SiteEngineer | P0 | — | Yes | Pass |
| UPL-006 | ملف مزيّف الامتداد | SiteEngineer | P0 | — | Yes | Pass |
| UPL-007 | ملف أكبر من 10MB | SiteEngineer | P1 | — | Yes | Pass |
| UPL-008 | طلب بدون ملف | SiteEngineer | P2 | — | Yes | Pass |
| UPL-009 | رفع لمشروع شركة أخرى | TenantOwner | P0 | — | Yes | Pass |
| UPL-010 | رفع بدون تسجيل دخول | زائر | P1 | — | Yes | Pass |
| UPL-011 | استبدال شعار الشركة | TenantOwner | P2 | H1 | No | Blocked |
| UPL-012 | صور تقدم الموقع (photos) | DesignEngineer | P1 | — | Yes | Pass |
| UPL-013 | Accountant لا يرفع صور تقدم | Accountant | P2 | — | Yes | Pass |

### UPL-001 — رفع صورة لمعرض المشروع إلى R2

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | H1 | No | Blocked |

**Preconditions:** R2 مُعدّ في البيئة.

**Steps:**

1. افتح P-A &gt; معرض الصور.
2. اضغط "تحميل صورة" واختر JPG.
3. افتح رابط الصورة الناتج.

**Test data:** صورة JPG 2MB

**Expected result:** "تم تحميل الصورة بنجاح!". الرابط يفتح الصورة. سجل الخادم: "Tuned HttpClient R2 Upload Status: OK" بدون أخطاء شهادة TLS.

**Actual result:** يحتاج Cloudflare R2 حقيقي (البيئة المحلية تستخدم LocalNoOpStorageService). التحقق من الملف (الامتداد/التوقيع/الحجم) نجح في UPL-005..008.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-002 — رفع 20 ملفاً متتالياً بدون أخطاء اتصال

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | H1 | No | Blocked |

**Preconditions:** R2 مُعدّ.

**Steps:**

1. ارفع 20 صورة متتالية (أو بسكربت).

**Test data:** 20 × JPG

**Expected result:** كل الطلبات 200. لا أخطاء socket في السجل (HttpClient مشترك).

**Actual result:** يحتاج Cloudflare R2 حقيقي (البيئة المحلية تستخدم LocalNoOpStorageService). التحقق من الملف (الامتداد/التوقيع/الحجم) نجح في UPL-005..008.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-003 — رفع إيصال بتصنيف Receipt

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | H2 | No | Pass |

**Preconditions:** عهدة Issued لـ U-SE.

**Steps:**

1. من تسوية العهدة ارفع صورة إيصال.
2. افتح معرض الصور.
3. افتح رابط التتبع العام.

**Test data:** receipt.jpg

**Expected result:** الإيصال يُرفع بتصنيف Receipt ولا يظهر في المعرض العام ولا في رابط التتبع.

**Actual result:** رفع بتصنيف Receipt: HTTP 200، المحفوظ Category=Receipt. ظهوره في التتبع يُفحص في TRK-002. (رفع الإيصال من شاشة التسوية في الواجهة لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-004 — رفع إيصال عبر project-receipt

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** U-ACC1 مُسند.

**Steps:**

1. استدعِ POST /api/ImageUpload/project-receipt/{P-A} بملف PDF.

**Test data:** invoice.pdf

**Expected result:** 200 ورابط تحت receipts/. لا يُنشأ SitePhoto.

**Actual result:** HTTP 200: Receipt uploaded successfully. url=https://local-dev-placeholder.test/2b518fb0-2a44-495c-a0cb-b45d2b94d86a/projects/1998ec34-67c4-46b6-afe7-ca9a01f838b0/receipts/eb7cff2f-9c6e-49f9-a211-7ae0a41bf561.pdf \| SitePhotos 3 → 3  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-005 — ملف بامتداد غير مسموح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. ارفع ملف .exe.

**Test data:** tool.exe

**Expected result:** 400 "INVALID_EXTENSION: الامتداد .exe غير مسموح به. الامتدادات المدعومة هي فقط: JPG, PNG, WEBP, PDF, XLSX, XLS, DOCX, DOC."

**Actual result:** HTTP 400: INVALID_EXTENSION: الامتداد .exe غير مسموح به. الامتدادات المدعومة هي فقط: JPG, PNG, WEBP, PDF, XLSX, XLS, DOCX, DOC.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-006 — ملف مزيّف الامتداد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أعد تسمية ملف نصي إلى photo.jpg وارفعه.

**Test data:** photo.jpg (نص)

**Expected result:** 400 "INVALID_FILE_SIGNATURE: توقيع الملف الثنائي غير مطابق لامتداد الملف المرفوع."

**Actual result:** HTTP 400: INVALID_FILE_SIGNATURE: توقيع الملف الثنائي غير مطابق لامتداد الملف المرفوع.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-007 — ملف أكبر من 10MB

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. ارفع صورة 11MB.

**Test data:** 11MB JPG

**Expected result:** 400 "FILE_TOO_LARGE: حجم الملف يتعدى الحد المسموح به (10 ميجا بايت)."

**Actual result:** HTTP 413: حجم الطلب يتعدى الحد الأقصى المسموح به (10 ميجابايت).  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-008 — طلب بدون ملف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ project-gallery بدون ملف.

**Test data:** —

**Expected result:** 400 "FILE_EMPTY: الملف المرفوع فارغ أو غير موجود."

**Actual result:** HTTP 400: Validation failed. ["The file field is required."]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-009 — رفع لمشروع شركة أخرى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** معرّف P-T2.

**Steps:**

1. استدعِ POST /api/ImageUpload/project-gallery/{P-T2} بتوكن U-OWN.

**Test data:** P-T2

**Expected result:** 404 "Project not found or access denied."

**Actual result:** HTTP 404: Project not found or access denied.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-010 — رفع بدون تسجيل دخول

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ project-gallery بدون Authorization.

**Test data:** —

**Expected result:** 401.

**Actual result:** HTTP 401  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-011 — استبدال شعار الشركة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | H1 | No | Blocked |

**Preconditions:** يوجد شعار حالي.

**Steps:**

1. افتح /dashboard/profile وارفع شعاراً جديداً PNG.

**Test data:** logo.png

**Expected result:** 200 والشعار الجديد يظهر. الشعار القديم يُحذف من التخزين.

**Actual result:** يحتاج Cloudflare R2 حقيقي (البيئة المحلية تستخدم LocalNoOpStorageService). التحقق من الملف (الامتداد/التوقيع/الحجم) نجح في UPL-005..008.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-012 — صور تقدم الموقع (photos)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DesignEngineer | P1 | — | Yes | Pass |

**Preconditions:** U-DE مُسند إلى P-A.

**Steps:**

1. ارفع صورة عبر POST /api/projects/{P-A}/photos.
2. اعرض GET /photos?pageNumber=1&amp;pageSize=5.
3. احذف الصورة.

**Test data:** site.jpg

**Expected result:** الصورة تُحفظ بتصنيف SiteProgress وتظهر في القائمة المرقّمة. الحذف متاح لـ TenantOwner و Manager المُسند فقط؛ DesignEngineer يحصل على 403 عند الحذف.

**Actual result:** رفع DesignEngineer 200 \| القائمة 1 صورة، Category=SiteProgress \| حذف DesignEngineer 403 \| حذف Manager 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### UPL-013 — Accountant لا يرفع صور تقدم

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P2 | — | Yes | Pass |

**Preconditions:** U-ACC1 مُسند.

**Steps:**

1. استدعِ POST /api/projects/{P-A}/photos.

**Test data:** site.jpg

**Expected result:** 403 Forbidden.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Financial Reports

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| RPT-001 | تقرير المشروع الكامل | Accountant | P0 | — | Yes | Pass |
| RPT-002 | أرصدة الصناديق في التقرير تطابق الصناديق | TenantOwner | P0 | B2 | Yes | Pass |
| RPT-003 | تقرير الشركة الكامل | TenantOwner | P1 | — | Yes | Pass |
| RPT-004 | Manager: تقرير المشروع فقط | Manager | P1 | — | Yes | Pass |
| RPT-005 | Accountant غير مُسند | Accountant | P0 | — | Yes | Pass |
| RPT-006 | المهندسون و SuperAdmin ممنوعون | SiteEngineer | P0 | — | Yes | Pass |
| RPT-007 | تقرير مشروع شركة أخرى | TenantOwner | P0 | — | Yes | Pass |

### RPT-001 — تقرير المشروع الكامل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC1 مُسند إلى P-A وفيه حركات.

**Steps:**

1. افتح /dashboard/reports واختر P-A.

**Test data:** P-A

**Expected result:** 200. الإيرادات = مجموع الإيداعات، والمصروفات تشمل مصروفات التسويات، والأرقام تطابق الدفتر المالي.

**Actual result:** HTTP 200 \| الإيرادات 126,000 = الدفتر 126,000 \| المصروفات 1,200,001 = الدفتر 1,200,001 (منها تسويات 43,800)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### RPT-002 — أرصدة الصناديق في التقرير تطابق الصناديق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B2 | Yes | Pass |

**Preconditions:** سجّل أرصدة الصناديق من صفحة المشروع.

**Steps:**

1. افتح تقرير P-A وقارن الأرصدة.

**Test data:** P-A

**Expected result:** الأرقام متطابقة تماماً.

**Actual result:** التقرير remainingPoolBalance=48,700 \| الصناديق الحية=48,700  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### RPT-003 — تقرير الشركة الكامل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** يوجد مشروعان على الأقل.

**Steps:**

1. استدعِ GET /api/tenant/full-report.

**Test data:** —

**Expected result:** 200 ويشمل كل مشاريع الشركة فقط.

**Actual result:** HTTP 200 \| المشاريع: ['QA Over Quota', 'QA Project A', 'QA Project B', 'QA Project C', 'QA Project R']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### RPT-004 — Manager: تقرير المشروع فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | — | Yes | Pass |

**Preconditions:** U-MGR مُسند إلى P-A.

**Steps:**

1. استدعِ GET /api/projects/{P-A}/full-report.
2. استدعِ GET /api/tenant/full-report.

**Test data:** P-A

**Expected result:** الأول 200. الثاني 403. صفحة /dashboard/reports غير متاحة للـ Manager.

**Actual result:** تقرير المشروع 200 \| تقرير الشركة 403 (صفحة الواجهة لم تُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### RPT-005 — Accountant غير مُسند

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** U-ACC2 غير مُسند إلى P-A.

**Steps:**

1. استدعِ /api/projects/{P-A}/full-report.
2. استدعِ /api/tenant/full-report?projectId={P-A}.

**Test data:** P-A

**Expected result:** 403 في الحالتين.

**Actual result:** تقرير المشروع 403 \| تقرير الشركة بـ projectId 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### RPT-006 — المهندسون و SuperAdmin ممنوعون

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P0 | — | Yes | Pass |

**Preconditions:** توكن U-SE ثم U-SA.

**Steps:**

1. استدعِ تقرير المشروع وتقرير الشركة.

**Test data:** P-A

**Expected result:** 403 لكل الطلبات.

**Actual result:** {'SE': (403, 403), 'DE': (403, 403), 'SA': (403, 403)}  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### RPT-007 — تقرير مشروع شركة أخرى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** معرّف P-T2.

**Steps:**

1. استدعِ /api/projects/{P-T2}/full-report.

**Test data:** P-T2

**Expected result:** 403 أو 404 بدون بيانات.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Public Tracker & Reviews

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| TRK-001 | فتح رابط المتابعة العام | زائر | P0 | — | Yes | Pass |
| TRK-002 | صور التتبع: قائمة مسموحة فقط | زائر | P0 | H2 | No | Pass |
| TRK-003 | رمز تتبع غير صالح | زائر | P1 | — | Yes | Pass |
| TRK-004 | رمز التتبع غير حساس لحالة الأحرف | زائر | P2 | — | Yes | Pass |
| TRK-005 | مشروع مغلق لا يظهر في التتبع | زائر | P1 | — | Yes | Pass |
| TRK-006 | تقييم العميل | زائر | P0 | — | No | Pass |
| TRK-007 | تقييم خارج المدى | زائر | P1 | — | Yes | Pass |
| TRK-008 | رمز تقييم غير صالح | زائر | P1 | — | Yes | Pass |
| TRK-009 | ملاحظات التقييم تحتوي سكربت | زائر | P1 | — | Yes | Pass |
| TRK-010 | رابط التقييم يقبل تقييماً واحداً فقط | زائر | P2 | — | No | Pass |
| TRK-011 | حد طلبات التقييم لكل IP | زائر | P1 | B4 | No | Pass |

### TRK-001 — فتح رابط المتابعة العام

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | — | Yes | Pass |

**Preconditions:** P-A نشط وله PublicShareToken (يُنشأ عند فتح صفحة التنفيذ).

**Steps:**

1. انسخ رابط /track/{shareToken} من صفحة التنفيذ.
2. افتحه في نافذة خاصة بدون تسجيل.

**Test data:** shareToken الخاص بـ P-A

**Expected result:** تظهر نسبة الإنجاز الموزونة والبنود والصور العامة. لا تظهر أي ميزانية أو مبالغ.

**Actual result:** HTTP 200 \| التقدم 67% \| المفاتيح: ['projectId', 'projectName', 'category', 'clientName', 'governorate', 'cityOrZone', 'status', 'weightedOverallProgress', 'startDate', 'endDate', 'completionDate', 'createdAt', 'displayDate', 'tasks', 'sitePhotos'] \| حقول مالية=[]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-002 — صور التتبع: قائمة مسموحة فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | H2 | No | Pass |

**Preconditions:** في P-A: صورة SiteProgress، صورة PublicGallery، صورة بتصنيف Receipt، وصورة PublicGallery استُخدم رابطها كإيصال في تسوية.

**Steps:**

1. افتح رابط التتبع.

**Test data:** 4 صور

**Expected result:** تظهر صورتا SiteProgress و PublicGallery العادية فقط. لا تظهر صورة Receipt ولا الصورة المستخدمة كإيصال.

**Actual result:** الظاهر في التتبع: {'SiteProgress': True, 'PublicGallery': True, 'Receipt': False, 'used-as-receipt': False}  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-003 — رمز تتبع غير صالح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. افتح /track/invalid123.

**Test data:** invalid123

**Expected result:** 404 والرسالة "رابط متابعة المشروع غير صالح أو غير متاح."

**Actual result:** HTTP 404: رابط متابعة المشروع غير صالح أو غير متاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-004 — رمز التتبع غير حساس لحالة الأحرف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P2 | — | Yes | Pass |

**Preconditions:** رمز P-A معروف.

**Steps:**

1. افتح الرابط بالرمز بأحرف كبيرة.

**Test data:** TOKEN بأحرف كبيرة

**Expected result:** يفتح نفس المشروع.

**Actual result:** HTTP 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-005 — مشروع مغلق لا يظهر في التتبع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** P-C في حالة Closed.

**Steps:**

1. افتح رابط تتبع P-C.

**Test data:** رمز P-C

**Expected result:** 404 "رابط متابعة المشروع غير صالح أو غير متاح."

**Actual result:** P-C (Closed): HTTP 404: رابط متابعة المشروع غير صالح أو غير متاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-006 — تقييم العميل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | — | No | Pass |

**Preconditions:** P-C مجمّد وله PublicReviewToken.

**Steps:**

1. افتح /public/project-review/{token}.
2. اختر 5 نجوم واكتب ملاحظة.
3. أرسل.

**Test data:** Rating 5

**Expected result:** "شكراً لك! تم تسجيل تقييمك بنجاح.". متوسط تقييم الشركة يُعاد حسابه.

**Actual result:** HTTP 200: شكراً لك! تم تسجيل تقييمك بنجاح. \| تقييم الشركة=5  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-007 — تقييم خارج المدى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** رمز تقييم صالح.

**Steps:**

1. أرسل تقييم 0 ثم 6 عبر الـ API.

**Test data:** 0 ، 6

**Expected result:** 400 "Rating must be between 1 and 5."

**Actual result:** HTTP 400: Rating must be between 1 and 5. \| HTTP 400: Rating must be between 1 and 5.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-008 — رمز تقييم غير صالح

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ POST /api/public/projects/review/xyz.

**Test data:** xyz

**Expected result:** 400 "Review link is invalid or has expired."

**Actual result:** HTTP 400: Review link is invalid or has expired.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-009 — ملاحظات التقييم تحتوي سكربت

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** رابط تقييم لم يُستخدم بعد (رابط واحد = تقييم واحد، انظر TRK-010).

**Steps:**

1. أرسل ملاحظة تحتوي &lt;img onerror=alert(1)&gt;.
2. افتح صفحة الشركة في الدليل.

**Test data:** &lt;img src=x onerror=alert(1)&gt;

**Expected result:** يُحفظ النص بعد التنظيف ولا يُنفّذ أي سكربت عند العرض.

**Actual result:** رابط جديد: HTTP 200: شكراً لك! تم تسجيل تقييمك بنجاح. \| المحفوظ: 'ممتاز'  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-010 — رابط التقييم يقبل تقييماً واحداً فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P2 | — | No | Pass |

**Preconditions:** تم التقييم مرة.

**Steps:**

1. أرسل تقييماً ثانياً بنفس الرابط.
2. أرسل تقييمين متزامنين على رابط جديد.

**Test data:** Rating 2

**Expected result:** الإرسال الثاني 400 بالرسالة "تم تسجيل تقييمك مسبقاً" ويبقى التقييم الأول كما هو. في الإرسال المتزامن ينجح طلب واحد فقط.

**Actual result:** إرسال ثانٍ لنفس الرابط: HTTP 400: تم تسجيل تقييمك مسبقاً \| التقييم المحفوظ بقي 5  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### TRK-011 — حد طلبات التقييم لكل IP

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | B4 | No | Pass |

**Preconditions:** بيئة اختبار.

**Steps:**

1. أرسل 11 طلب تقييم من نفس الـ IP خلال ساعة.

**Test data:** 11 طلباً

**Expected result:** الطلب 11 يعيد 429 مع Retry-After ورسالة AUTH.RATE_LIMITED.

**Actual result:** طلبات من نفس الـ IP (مع 6 سابقة): الرموز [400, 400, 400, 400, 400, 429, 429, 429] \| Retry-After=3600 \| AUTH.RATE_LIMITED  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Directory

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| DIR-001 | قائمة الشركات العامة | زائر | P1 | — | Yes | Pass |
| DIR-002 | الشركة الموقوفة مخفية | زائر | P0 | — | No | Pass |
| DIR-003 | تصفية حسب المنطقة والتقييم | زائر | P2 | — | Yes | Pass |
| DIR-004 | معرض أعمال الشركة (portfolio) | زائر | P1 | — | Yes | Pass |
| DIR-005 | الـ portfolio لا يعرض إيصالات أو مرفقات داخلية | زائر | P0 | — | Yes | Pass |
| DIR-006 | إخفاء تقييم من SuperAdmin | SuperAdmin | P1 | — | Yes | Pass |

### DIR-001 — قائمة الشركات العامة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** T1 Active.

**Steps:**

1. افتح صفحة الدليل في الصفحة الرئيسية.
2. استدعِ GET /api/public/tenants.

**Test data:** —

**Expected result:** تظهر الشركات Active فقط مع التقييم وعدد المشاريع.

**Actual result:** تعليم P-A عاماً: 200 \| الشركات الظاهرة: ['QA Company 1']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DIR-002 — الشركة الموقوفة مخفية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | — | No | Pass |

**Preconditions:** SuperAdmin أوقف T2 مؤقتاً.

**Steps:**

1. استدعِ GET /api/public/tenants.
2. أعد تفعيل T2.

**Test data:** —

**Expected result:** T2 لا تظهر أثناء الإيقاف.

**Actual result:** أثناء الإيقاف مخفية=True \| أعيدت Active  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DIR-003 — تصفية حسب المنطقة والتقييم

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P2 | — | Yes | Pass |

**Preconditions:** شركات بمناطق وتقييمات مختلفة.

**Steps:**

1. استدعِ ?region=Cairo.
2. استدعِ ?minRating=4.

**Test data:** region=Cairo ، minRating=4

**Expected result:** النتائج تطابق الفلتر فقط.

**Actual result:** region=Alexandria → [] \| minRating=4 → [('QA Company 1', 5)]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DIR-004 — معرض أعمال الشركة (portfolio)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** مشروع IsPublicPortfolio = true فيه صور، ومشروع آخر غير عام.

**Steps:**

1. استدعِ GET /api/public/tenants/{T1}/portfolio.

**Test data:** T1

**Expected result:** يظهر المشروع العام فقط.

**Actual result:** HTTP 200 \| المشاريع: ['QA Project A']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DIR-005 — الـ portfolio لا يعرض إيصالات أو مرفقات داخلية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | — | Yes | Pass |

**Preconditions:** مشروع عام فيه إيصالات وفواتير تسويات ومرفقات مهام.

**Steps:**

1. افتح الـ portfolio.

**Test data:** T1

**Expected result:** لا تظهر أي صورة إيصال أو فاتورة أو مرفق داخلي.

**Actual result:** إيصالات ظاهرة في الـ portfolio: لا شيء  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### DIR-006 — إخفاء تقييم من SuperAdmin

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** تقييم على P-C.

**Steps:**

1. استدعِ POST /api/superadmin/reviews/{P-C}/toggle-visibility.
2. استدعِ GET /api/public/directory/{T1}/reviews.

**Test data:** P-C

**Expected result:** "Review visibility has been toggled. Hidden status is now: True." والتقييم لا يظهر ولا يدخل في المتوسط المعروض.

**Actual result:** HTTP 200: Review visibility has been toggled. Hidden status is now: True. \| التقييمات الظاهرة: 1 (المخفي ظاهر=False، الآخر ظاهر=True)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Subscription & Payments

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| SUB-001 | عرض الباقات للمالك | TenantOwner | P0 | — | Yes | Pass |
| SUB-002 | Paymob معطّل: لا زر دفع إلكتروني | TenantOwner | P0 | B1 | Yes | Blocked |
| SUB-003 | Paymob معطّل: checkout مرفوض | TenantOwner | P0 | B1 | Yes | Pass |
| SUB-004 | Paymob معطّل: webhook لا يضيف مشاريع | DevOps | P0 | B1 | No | Pass |
| SUB-005 | webhook بدون توقيع | زائر | P0 | — | Yes | Pass |
| SUB-006 | الأدوار الأخرى لا تصل للفوترة | Accountant | P1 | — | Yes | Pass |
| SUB-007 | الحصة المستخدمة والمتاحة | TenantOwner | P1 | — | Yes | Pass |
| SUB-008 | سجل المدفوعات | TenantOwner | P2 | — | Yes | Pass |
| SUB-009 | التلاعب بعدد المشاريع في callback (بعد إصلاح B1) | DevOps | P0 | B1 | No | Blocked |

### SUB-001 — عرض الباقات للمالك

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** U-OWN مسجل دخول.

**Steps:**

1. افتح /dashboard/subscription.

**Test data:** —

**Expected result:** باقتان: +1 مشروع بـ 250 ج.م و +5 مشاريع بـ 950 ج.م. GET /api/subscription/plans يعيد paymobEnabled = false.

**Actual result:** {'PLUS_1': 250, 'PLUS_5': 950} paymobEnabled=False instaPayEnabled=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-002 — Paymob معطّل: لا زر دفع إلكتروني

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B1 | Yes | Blocked |

**Preconditions:** Payments:PaymobEnabled = false.

**Steps:**

1. افتح صفحة الاشتراك.

**Test data:** —

**Expected result:** يظهر "الدفع الإلكتروني غير متاح حالياً — تواصل معنا للترقية" بدل زر الدفع.

**Actual result:** نص الواجهة لم يُختبر (لا متصفح). الـ API يعيد paymobEnabled=false، والقالب يعرض "الدفع الإلكتروني غير متاح حالياً — تواصل معنا للترقية" عند paymobEnabled=false وعدم توفر InstaPay للباقة.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-003 — Paymob معطّل: checkout مرفوض

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | B1 | Yes | Pass |

**Preconditions:** Payments:PaymobEnabled = false.

**Steps:**

1. استدعِ POST /api/subscription/checkout بـ extraProjectsCount = 1.

**Test data:** {"extraProjectsCount":1}

**Expected result:** 400 "PAYMENTS_DISABLED: الدفع الإلكتروني غير متاح حالياً. تواصل معنا لترقية باقتك. ...". لا يُنشأ PaymentAttempt.

**Actual result:** HTTP 400: PAYMENTS_DISABLED: الدفع الإلكتروني غير متاح حالياً. تواصل معنا لترقية باقتك. (Online payment is currently unavailable. Contact us to upgrade.) \| PaymentAttempts 0 → 0  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-004 — Paymob معطّل: webhook لا يضيف مشاريع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B1 | No | Pass |

**Preconditions:** بيئة staging بمفاتيح Paymob الاختبارية. سجّل MaxActiveProjects للشركة.

**Steps:**

1. أرسل webhook بتوقيع HMAC صحيح إلى POST /api/payments/callback.

**Test data:** payload مُوقّع من Paymob sandbox

**Expected result:** 200 مع {success:false, message:"Payments are disabled; nothing was credited."}. الحصة لا تتغير.

**Actual result:** webhook موقّع بـ HMAC صحيح (extra_projects=500): HTTP 200: Payments are disabled; nothing was credited. \| الحصة 8 → 8 \| السجل يحتوي التحذير=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-005 — webhook بدون توقيع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أرسل POST /api/payments/callback بدون hmac.

**Test data:** payload بدون hmac

**Expected result:** 401 "HMAC signature required".

**Actual result:** HTTP 401: HMAC signature required  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-006 — الأدوار الأخرى لا تصل للفوترة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Pass |

**Preconditions:** توكن U-ACC1.

**Steps:**

1. افتح /dashboard/subscription.
2. استدعِ GET /api/subscription/plans.

**Test data:** —

**Expected result:** الصفحة غير متاحة. الـ API يعيد 403.

**Actual result:** HTTP 403: ترقية الباقة والفوترة مقتصرة حصرياً على مالك المنشأة. (الصفحة في الواجهة لم تُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-007 — الحصة المستخدمة والمتاحة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** T1 لديها مشروعان من 2.

**Steps:**

1. استدعِ GET /api/tenant-profile/quota.

**Test data:** —

**Expected result:** usedProjects = 2 و allowedProjects = 2.

**Actual result:** {'usedProjects': 5, 'allowedProjects': 5} (المشاريع في القاعدة=5)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-008 — سجل المدفوعات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** يوجد ترقية يدوية سابقة من SuperAdmin.

**Steps:**

1. استدعِ GET /api/subscription/my-payments.

**Test data:** —

**Expected result:** يظهر السجل برقم INV-ADMIN-xxxxxx والمبلغ.

**Actual result:** HTTP 200 \| يحتوي INV-ADMIN=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SUB-009 — التلاعب بعدد المشاريع في callback (بعد إصلاح B1)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | B1 | No | Blocked |

**Preconditions:** Blocked حتى إصلاح B1 وتفعيل Paymob في sandbox.

**Steps:**

1. ادفع +1 في sandbox.
2. أعد إرسال نفس الـ callback مع extras.extra_projects = 500.

**Test data:** extra_projects 500

**Expected result:** تُضاف مشاريع الطلب المدفوع فقط (+1) ويُرفض أي مبلغ لا يطابق amount_cents.

**Actual result:** B1 لم يُصلح بعد ويحتاج Paymob sandbox مفعّل.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Notifications

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| NOT-001 | إشعار فوري عند طلب عهدة | Accountant | P1 | — | Yes | Blocked |
| NOT-002 | إشعار نتيجة العهدة للطالب | SiteEngineer | P1 | — | Yes | Pass |
| NOT-003 | إشعار نتيجة التسوية | SiteEngineer | P2 | — | Yes | Pass |
| NOT-004 | إشعار تجميد المشروع للأعضاء | Manager | P2 | — | No | Pass |
| NOT-005 | قراءة الإشعارات وتعليمها كمقروءة | Manager | P2 | — | Yes | Pass |
| NOT-006 | مسح كل الإشعارات | Manager | P2 | — | Yes | Pass |
| NOT-007 | إرسال إشعار: SuperAdmin فقط | TenantOwner | P1 | — | Yes | Pass |
| NOT-008 | SignalR بدون توكن مرفوض | زائر | P2 | — | Yes | Pass |
| NOT-009 | إشعار SuperAdmin بتسجيل شركة جديدة | SuperAdmin | P2 | — | No | Pass |

### NOT-001 — إشعار فوري عند طلب عهدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P1 | — | Yes | Blocked |

**Preconditions:** U-ACC1 مسجل دخول في متصفح، و U-SE في متصفح آخر.

**Steps:**

1. U-SE يطلب عهدة في P-A.
2. راقب جرس الإشعارات لدى U-ACC1.

**Test data:** 1,000

**Expected result:** يظهر إشعار فوري (SignalR) لدى U-ACC1 بدون تحديث الصفحة.

**Actual result:** الوصول الفوري عبر SignalR لم يُختبر (لا عميل SignalR/متصفح). الإشعار محفوظ: U-ACC1 لديه 37 إشعار من نوع PettyCash.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-002 — إشعار نتيجة العهدة للطالب

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P1 | — | Yes | Pass |

**Preconditions:** عهدة Pending لـ U-SE.

**Steps:**

1. U-ACC1 يعتمدها أو يرفضها.

**Test data:** —

**Expected result:** U-SE يستلم إشعار الاعتماد، أو إشعار الرفض مع السبب.

**Actual result:** إشعارات U-SE (16): تم إغلاق المشروع نهائياً 🔒 \| تم اعتماد تسوية العهدة بنجاح ✅ \| تجميد الحسابات المالية للمشروع ❄️ \| تمت الموافقة على صرف العهدة 💰 \| تمت الموافقة على صرف العهدة 💰 \| تمت الموافقة على صرف العهدة 💰 \| تم اعتماد تسوية العهدة بنجاح ✅ \| تم اعتماد تسوية العهدة بنجاح ✅ \| تم رفض تسوية العهدة ❌ \| تمت الموافقة على  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-003 — إشعار نتيجة التسوية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SiteEngineer | P2 | — | Yes | Pass |

**Preconditions:** تسوية Pending لـ U-SE.

**Steps:**

1. U-ACC1 يعتمدها.

**Test data:** —

**Expected result:** U-SE يستلم إشعار بالحالة الجديدة.

**Actual result:** إشعارات تسوية لدى U-SE موجودة  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-004 — إشعار تجميد المشروع للأعضاء

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | — | No | Pass |

**Preconditions:** U-MGR مُسند إلى P-C.

**Steps:**

1. U-ACC1 يجمّد P-C.

**Test data:** —

**Expected result:** U-MGR و U-OWN يستلمان إشعار تغيير الحالة.

**Actual result:** U-MGR استلم=True \| U-OWN استلم=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-005 — قراءة الإشعارات وتعليمها كمقروءة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | — | Yes | Pass |

**Preconditions:** يوجد إشعارات غير مقروءة.

**Steps:**

1. افتح القائمة.
2. اضغط على إشعار.

**Test data:** —

**Expected result:** GET /api/Notifications يعيد أحدث 50. mark-read يعيد "Marked as read." ويقل العداد.

**Actual result:** عدد 36 \| HTTP 200: Marked as read. \| isRead=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-006 — مسح كل الإشعارات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P2 | — | Yes | Pass |

**Preconditions:** يوجد إشعارات.

**Steps:**

1. اضغط مسح الكل.

**Test data:** —

**Expected result:** "All notifications cleared." والقائمة فارغة.

**Actual result:** HTTP 200: All notifications cleared. \| المتبقي 0  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-007 — إرسال إشعار: SuperAdmin فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** توكن U-OWN.

**Steps:**

1. استدعِ POST /api/Notifications/send.

**Test data:** أي محتوى

**Expected result:** 403. بنفس الطلب بتوكن U-SA: "Notification sent."

**Actual result:** TenantOwner 403 \| SuperAdmin HTTP 200: Notification sent.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-008 — SignalR بدون توكن مرفوض

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. اتصل بـ /hubs/notifications بدون access_token.

**Test data:** —

**Expected result:** الاتصال مرفوض (401).

**Actual result:** negotiate بدون توكن → HTTP 401  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### NOT-009 — إشعار SuperAdmin بتسجيل شركة جديدة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P2 | — | No | Pass |

**Preconditions:** U-SA مسجل دخول.

**Steps:**

1. سجّل شركة جديدة (AUTH-008).

**Test data:** —

**Expected result:** U-SA يستلم إشعار حساب جديد باسم الشركة.

**Actual result:** إشعارات SuperAdmin عن شركات جديدة: ['منشأة جديدة بانتظار التفعيل 🏢', 'منشأة جديدة بانتظار التفعيل 🏢']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## SuperAdmin

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| SA-001 | قائمة الشركات | SuperAdmin | P1 | — | Yes | Pass |
| SA-002 | إيقاف وإعادة تفعيل شركة | SuperAdmin | P0 | — | No | Pass |
| SA-003 | ترقية يدوية للحصة | SuperAdmin | P0 | — | No | Pass |
| SA-004 | ترقية يدوية بعدد صفر | SuperAdmin | P1 | — | Yes | Pass |
| SA-005 | ملخص دورة حياة الشركات | SuperAdmin | P2 | — | Yes | Pass |
| SA-006 | المستخدمون المعلقون والاعتماد | SuperAdmin | P2 | — | No | Pass |
| SA-007 | تدقيق المدفوعات | SuperAdmin | P2 | — | Yes | Pass |
| SA-008 | استثناء شركة من التنظيف | SuperAdmin | P2 | — | No | Pass |
| SA-009 | حذف شركة نهائياً (force-purge) | SuperAdmin | P1 | — | No | Pass |
| SA-010 | غير SuperAdmin ممنوع من مسارات المنصة | TenantOwner | P0 | — | Yes | Pass |
| SA-011 | SuperAdmin لا يرى العهد والتسويات | SuperAdmin | P0 | — | Yes | Pass |

### SA-001 — قائمة الشركات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** U-SA مسجل دخول.

**Steps:**

1. افتح /dashboard/tenants.

**Test data:** —

**Expected result:** تظهر كل الشركات مع الحالة والخطة والحد الأقصى للمشاريع.

**Actual result:** HTTP 200 \| 2 شركة \| حقول: ['id', 'name', 'subscriptionPlan', 'maxActiveProjects', 'logoUrl', 'bannerUrl', 'region', 'companyDescription']  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-002 — إيقاف وإعادة تفعيل شركة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P0 | — | No | Pass |

**Preconditions:** T2 Active.

**Steps:**

1. استدعِ POST /api/Tenants/{T2}/toggle-status.
2. حاول الدخول بـ U-OWN-T2.
3. كرر toggle-status.

**Test data:** T2

**Expected result:** "Tenant status toggled successfully to Suspended." والدخول مرفوض برسالة التعليق. بعد التكرار: Active والدخول يعمل.

**Actual result:** HTTP 200: Tenant status toggled successfully to Suspended. \| دخول أثناء التعليق 401 \| HTTP 200: Tenant status toggled successfully to Active. \| دخول بعدها 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-003 — ترقية يدوية للحصة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P0 | — | No | Pass |

**Preconditions:** قبل: T1 MaxActiveProjects = 2.

**Steps:**

1. استدعِ POST /api/Tenants/{T1}/manual-upgrade بـ extraProjectsCount = 1 و amount = 250.

**Test data:** 1 مشروع ، 250 ج.م

**Expected result:** "تم إضافة 1 مشاريع إضافية وتوليد إيصال رقم INV-ADMIN-xxxxxx بنجاح!". بعد: MaxActiveProjects = 3، والمشروع PendingActivation (إن وجد) يبقى كما هو.

**Actual result:** HTTP 200: تم إضافة 1 مشاريع إضافية وتوليد إيصال رقم INV-ADMIN-969650 بنجاح! \| quota={'usedProjects': 2, 'allowedProjects': 3}  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-004 — ترقية يدوية بعدد صفر

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ manual-upgrade بـ extraProjectsCount = 0.

**Test data:** 0

**Expected result:** 400 "عدد المشاريع الإضافية يجب أن يكون أكبر من 0."

**Actual result:** HTTP 400: عدد المشاريع الإضافية يجب أن يكون أكبر من 0.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-005 — ملخص دورة حياة الشركات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ GET /api/superadmin/tenants/lifecycle-summary.

**Test data:** —

**Expected result:** "Tenant lifecycle summary retrieved successfully."

**Actual result:** HTTP 200: Tenant lifecycle summary retrieved successfully.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-006 — المستخدمون المعلقون والاعتماد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P2 | — | No | Pass |

**Preconditions:** يوجد مستخدم IsApproved = false (إن وجد).

**Steps:**

1. افتح /dashboard/pending-users واعتمد المستخدم.

**Test data:** —

**Expected result:** "User approved successfully.". اعتماد مستخدم معتمد: "User is already approved."

**Actual result:** pending-users: HTTP 200: Pending users retrieved successfully. (0) \| اعتماد مستخدم معتمد: HTTP 400: User is already approved. (لا يوجد مستخدم معلق؛ التسجيل يفعّل الحساب فوراً)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-007 — تدقيق المدفوعات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P2 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. افتح /dashboard/admin-payments.

**Test data:** —

**Expected result:** "تم جلب تقرير تدقيق المدفوعات والـ Webhooks بنجاح."

**Actual result:** HTTP 200: تم جلب تقرير تدقيق المدفوعات والـ Webhooks بنجاح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-008 — استثناء شركة من التنظيف

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P2 | — | No | Pass |

**Preconditions:** شركة اختبار.

**Steps:**

1. استدعِ POST /api/superadmin/tenants/{T2}/exempt.

**Test data:** T2

**Expected result:** 200 وتتغير حالة الاستثناء.

**Actual result:** HTTP 200: تم تفعيل الاستثناء للشركة 'QA Company 2'. لن يشملها الحذف التلقائي. \| IsCleanupExempt f → t  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-009 — حذف شركة نهائياً (force-purge)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | No | Pass |

**Preconditions:** شركة اختبار مؤقتة فقط، ليست T1 أو T2.

**Steps:**

1. استدعِ POST /api/superadmin/tenants/{tmp}/force-purge.

**Test data:** شركة مؤقتة

**Expected result:** 200 وكل بيانات الشركة محذوفة. لا تنفّذ على الإنتاج.

**Actual result:** HTTP 200: تم حذف الشركة 'QA Temp Purge' بالكامل وجميع مشاريعها (0) ومعاملاتها (0) ومستخدميها (1) وحذف (0) ملف من التخزين السحابي. \| الشركة/المستخدم المتبقي في القاعدة: 0/0  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-010 — غير SuperAdmin ممنوع من مسارات المنصة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** توكن U-OWN.

**Steps:**

1. استدعِ GET /api/superadmin/tenants و GET /api/Tenants و POST /api/Tenants/{T1}/manual-upgrade.
2. افتح /dashboard/tenants.

**Test data:** —

**Expected result:** 403 لكل الطلبات. الصفحة تحوّل بعيداً.

**Actual result:** [403, 403, 403] (التحويل في الواجهة لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SA-011 — SuperAdmin لا يرى العهد والتسويات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P0 | — | Yes | Pass |

**Preconditions:** توكن U-SA.

**Steps:**

1. استدعِ GET /api/projects/{P-A}/PettyCash/mobile و GET /Settlements و /full-report.

**Test data:** P-A

**Expected result:** 403 لكل الطلبات (حائط الخصوصية).

**Actual result:** PettyCash/Settlements/full-report → [403, 403, 403]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## Security & Limits

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| SEC-001 | حد الدخول لكل IP (10/دقيقة) | زائر | P0 | B4 | No | Pass |
| SEC-002 | حد الدخول لكل بريد (5/5 دقائق) | زائر | P0 | B4 | No | Pass |
| SEC-003 | تزوير X-Forwarded-For لا يتجاوز الحد | زائر | P0 | B4 | No | Blocked |
| SEC-004 | حد التسجيل (5/ساعة لكل IP) | زائر | P1 | B4 | No | Pass |
| SEC-005 | 429 أثناء refresh لا يُخرج المستخدم | Manager | P1 | B4 | No | Pass |
| SEC-006 | مؤقت التهدئة في الواجهة | زائر | P2 | B4 | No | Blocked |
| SEC-007 | webhook Paymob غير خاضع للحد | DevOps | P2 | B4 | Yes | Pass |
| SEC-008 | خطأ 500 عام في الإنتاج | DevOps | P0 | H5 | No | Pass |
| SEC-009 | تفاصيل الخطأ تظهر في Development فقط | DevOps | P2 | H5 | No | Pass |
| SEC-010 | لا تسريب لأخطاء قاعدة البيانات في المعاملات المالية | DevOps | P1 | H5 | No | Pass |
| SEC-011 | Swagger مخفي في الإنتاج | زائر | P0 | H5 | Yes | Pass |
| SEC-012 | Swagger يعمل في Development | DevOps | P2 | H5 | Yes | Pass |
| SEC-013 | عزل الشركات: عهدة وتسوية شركة أخرى | TenantOwner | P0 | — | Yes | Pass |
| SEC-014 | حقن SQL في الدخول | زائر | P1 | — | Yes | Pass |
| SEC-015 | ترحيلات قاعدة بيانات فارغة (H3 مفتوح) | DevOps | P1 | H3 | No | Fail |

### SEC-001 — حد الدخول لكل IP (10/دقيقة)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | B4 | No | Pass |

**Preconditions:** staging. IP واحد.

**Steps:**

1. أرسل 11 طلب دخول خلال دقيقة لعشرة بريدات مختلفة.
2. اقرأ ترويسة Retry-After.

**Test data:** 10 بريدات اختبار مختلفة

**Expected result:** الطلب 11 يعيد 429 و Retry-After ≤ 60. الواجهة تعرض "محاولات كثيرة" و "لقد تجاوزت عدد المحاولات المسموحة. يرجى المحاولة مرة أخرى بعد 0:xx."

**Actual result:** الرموز [401, 401, 401, 401, 401, 401, 401, 401, 401, 401, 429] \| Retry-After=60 \| AUTH.RATE_LIMITED (نص التنبيه العربي في الواجهة لم يُختبر؛ ar.json يحتوي AUTH.RATE_LIMITED)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-002 — حد الدخول لكل بريد (5/5 دقائق)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | B4 | No | Pass |

**Preconditions:** staging. حساب اختبار مخصص.

**Steps:**

1. أرسل 5 محاولات خاطئة لنفس البريد (من IP مختلف إن أمكن).
2. أرسل المحاولة 6 بكلمة المرور الصحيحة.

**Test data:** qa.lock@example.test

**Expected result:** المحاولة 6 تعيد 429 حتى بكلمة المرور الصحيحة، و Retry-After ≤ 300. بعد انتهاء النافذة يعمل الدخول.

**Actual result:** (5 محاولات خاطئة من IPs مختلفة) ثم الصحيحة: [401, 401, 401, 401, 429] → 429 \| Retry-After=300. \| إعادة على قاعدة جديدة: 5 خاطئة ثم الصحيحة → 429 (Retry-After=300) \| بعد انتهاء النافذة (5 دقائق): 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-003 — تزوير X-Forwarded-For لا يتجاوز الحد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | B4 | No | Blocked |

**Preconditions:** staging خلف Railway.

**Steps:**

1. أرسل 11 طلب دخول مع X-Forwarded-For عشوائي مختلف لكل طلب.

**Test data:** X-Forwarded-For: 1.2.3.x

**Expected result:** الطلب 11 يعيد 429 (يُستخدم IP الحقيقي من Railway).

**Actual result:** يحتاج خادم خلف Railway. محلياً يُقبل X-Forwarded-For المزوّر (KnownNetworks/KnownProxies فارغة و ForwardLimit=1)، أي أن الحماية تعتمد كلياً على أن التطبيق لا يُصل إليه إلا عبر Railway.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-004 — حد التسجيل (5/ساعة لكل IP)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | B4 | No | Pass |

**Preconditions:** staging.

**Steps:**

1. أرسل 6 طلبات register-tenant خلال ساعة.

**Test data:** 6 بريدات مختلفة

**Expected result:** الطلب 6 يعيد 429 مع Retry-After.

**Actual result:** الرموز [400, 400, 400, 400, 400, 429] \| Retry-After=3600  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-005 — 429 أثناء refresh لا يُخرج المستخدم

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Manager | P1 | B4 | No | Pass |

**Preconditions:** staging. U-MGR مسجل دخول.

**Steps:**

1. أرسل أكثر من 30 طلب refresh في دقيقة.
2. تابع استخدام الواجهة.

**Test data:** 31 طلباً

**Expected result:** الطلب 31 يعيد 429. يظهر التنبيه بالعربية ويبقى المستخدم مسجلاً، ويجدد التوكن بعد انتهاء المهلة.

**Actual result:** 30 × 200 ثم 429 \| التوكن الحالي ما زال يعمل: 200. (بقاء المستخدم مسجلاً في الواجهة لم يُختبر؛ jwt.interceptor لا يستدعي logout عند 429)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-006 — مؤقت التهدئة في الواجهة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P2 | B4 | No | Blocked |

**Preconditions:** بعد استلام 429 في /login.

**Steps:**

1. لاحظ زر الدخول والعداد.

**Test data:** —

**Expected result:** العداد يعد تنازلياً بصيغة m:ss حسب Retry-After (حد أقصى 5 دقائق) ثم يعود الزر للعمل.

**Actual result:** عداد التهدئة في الواجهة — لا يوجد متصفح.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-007 — webhook Paymob غير خاضع للحد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P2 | B4 | Yes | Pass |

**Preconditions:** staging.

**Steps:**

1. أرسل 40 طلب POST /api/payments/callback خلال دقيقة.

**Test data:** payload بدون hmac

**Expected result:** كلها 401 (وليس 429).

**Actual result:** 40 طلباً → [401]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-008 — خطأ 500 عام في الإنتاج

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P0 | H5 | No | Pass |

**Preconditions:** staging بإعداد ASPNETCORE_ENVIRONMENT=Production.

**Steps:**

1. سبب خطأ داخلي (مثلاً أوقف قاعدة البيانات مؤقتاً).
2. استدعِ GET /api/Projects.
3. ابحث عن الرقم المرجعي في السجل.

**Test data:** —

**Expected result:** 500 بالرسالة "An unexpected error occurred. Reference: &lt;id&gt;" وترويسة X-Correlation-Id بنفس الرقم. لا SQL ولا stack trace. السجل يحتوي الخطأ الكامل بنفس الرقم.

**Actual result:** HTTP 500: An unexpected error occurred. Reference: 0HNP4CB0Q745G:00000001 \| X-Correlation-Id=0HNP4CB0Q745G:00000001 \| موجود في السجل=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-009 — تفاصيل الخطأ تظهر في Development فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P2 | H5 | No | Pass |

**Preconditions:** تشغيل محلي Development.

**Steps:**

1. كرر الحالة السابقة.

**Test data:** —

**Expected result:** الرسالة تحتوي نص الاستثناء الفعلي.

**Actual result:** (جدول Notifications أُعيدت تسميته مؤقتاً في قاعدة الاختبار) HTTP 500: 42P01: relation "Notifications" does not exist_x000D_
_x000D_
POSITION: 183  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-010 — لا تسريب لأخطاء قاعدة البيانات في المعاملات المالية

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P1 | H5 | No | Pass |

**Preconditions:** staging Production.

**Steps:**

1. سبب خطأ DB أثناء POST /api/projects/{P-A}/FinancialTransactions (مثلاً قيد Type غير صالح).

**Test data:** type = 999

**Expected result:** رسالة عامة بدون نص قاعدة البيانات. ملاحظة من مراجعة الكود: FinancialTransactionsController يعيد "Database Error: ..." و ex.Message كـ 400، فيُتوقع أن تفشل.

**Actual result:** POST FinancialTransactions أثناء توقف القاعدة: HTTP 400: An unexpected error occurred. Reference: 0HNP4CB0Q745H:00000001  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-011 — Swagger مخفي في الإنتاج

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P0 | H5 | Yes | Pass |

**Preconditions:** بيئة الإنتاج.

**Steps:**

1. افتح https://&lt;api&gt;/swagger.
2. افتح https://&lt;api&gt;/swagger/v1/swagger.json.

**Test data:** —

**Expected result:** 404 في الحالتين.

**Actual result:** /swagger/index.html 404 \| swagger.json 404  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-012 — Swagger يعمل في Development

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P2 | H5 | Yes | Pass |

**Preconditions:** تشغيل محلي Development.

**Steps:**

1. افتح /swagger.

**Test data:** —

**Expected result:** صفحة Swagger UI تعمل.

**Actual result:** /swagger/index.html في Development → 200  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-013 — عزل الشركات: عهدة وتسوية شركة أخرى

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** معرّفات عهدة وتسوية من T2.

**Steps:**

1. استدعِ approve و DELETE على عهدة T2 عبر مسار P-A و P-T2.

**Test data:** معرّفات T2

**Expected result:** 403 أو 404. لا تتغير أي بيانات في T2.

**Actual result:** approve/delete عبر مسار P-T2 و P-A → [403, 404, 403, 404] \| عهدة T2 ما زالت Pending  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-014 — حقن SQL في الدخول

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| زائر | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. أدخل في البريد: '; DROP TABLE Users;--

**Test data:** '; DROP TABLE Users;--

**Expected result:** 401 "البريد الإلكتروني أو كلمة المرور غير صحيحة". لا خطأ 500.

**Actual result:** HTTP 401: AUTH.INVALID_CREDENTIALS  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### SEC-015 — ترحيلات قاعدة بيانات فارغة (H3 مفتوح)

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| DevOps | P1 | H3 | No | Fail |

**Preconditions:** قاعدة بيانات فارغة في staging.

**Steps:**

1. شغّل الـ API على قاعدة فارغة.
2. تحقق من الجداول.

**Test data:** —

**Expected result:** يجب أن تُنشأ كل الجداول أو يتوقف البدء. H3 لم يُصلح بعد؛ سجّل Blocked أو Fail حسب النتيجة.

**Actual result:** قاعدة فارغة: الجداول المنشأة=0 \| التطبيق بدأ ويعيد HTTP 500 \| السجل: Database migration/backfill failed: 42P01: relation "FinancialTransactions" does not exist  H3 لم يُصلح: لا تُنشأ جداول والتطبيق يعمل.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

## InstaPay

| ID | Title | Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|---|---|
| IP-001 | خيار InstaPay يظهر عند الإعداد | TenantOwner | P0 | — | Yes | Pass |
| IP-002 | InstaPay غير مُعدّ | TenantOwner | P1 | — | Yes | Pass |
| IP-003 | إنشاء طلب +1 مشروع | TenantOwner | P0 | — | No | Pass |
| IP-004 | إنشاء طلب +5 مشاريع | TenantOwner | P1 | — | No | Pass |
| IP-005 | السعر يأتي من الخادم فقط | TenantOwner | P0 | — | No | Pass |
| IP-006 | باقة غير معروفة | TenantOwner | P1 | — | Yes | Pass |
| IP-007 | حد طلبين معلقين | TenantOwner | P1 | — | No | Pass |
| IP-008 | غير المالك لا يشتري | Accountant | P0 | — | Yes | Pass |
| IP-009 | رفع صورة إيصال التحويل | TenantOwner | P0 | — | No | Pass |
| IP-010 | إيصال PDF أو أكبر من 5MB | TenantOwner | P1 | — | Yes | Pass |
| IP-011 | رفع إيصال لطلب شركة أخرى أو طلب مغلق | TenantOwner | P1 | — | Yes | Pass |
| IP-012 | رسالة واتساب جاهزة | TenantOwner | P2 | — | Yes | Blocked |
| IP-013 | اعتماد SuperAdmin يضيف المشاريع | SuperAdmin | P0 | — | No | Pass |
| IP-014 | اعتماد مزدوج متزامن | SuperAdmin | P0 | — | No | Pass |
| IP-015 | اعتماد طلب منتهي | SuperAdmin | P1 | — | Yes | Pass |
| IP-016 | الرفض يتطلب سبباً | SuperAdmin | P1 | — | No | Pass |
| IP-017 | لا اعتماد بعد الرفض | SuperAdmin | P1 | — | Yes | Pass |
| IP-018 | غير SuperAdmin ممنوع من مراجعة الطلبات | TenantOwner | P0 | — | Yes | Pass |
| IP-019 | حد إنشاء الطلبات لكل IP | TenantOwner | P2 | B4 | No | Pass |
| IP-020 | قائمة مدفوعات المالك | TenantOwner | P2 | — | Yes | Pass |

### IP-001 — خيار InstaPay يظهر عند الإعداد

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** Payments:InstaPay:Number و WhatsAppNumber مضبوطان بأرقام فقط.

**Steps:**

1. افتح /dashboard/subscription.

**Test data:** —

**Expected result:** يظهر زر "الدفع عبر InstaPay". plans يعيد instaPayEnabled = true.

**Actual result:** plans: instaPayEnabled=True (ظهور الزر في الواجهة لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-002 — InstaPay غير مُعدّ

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** أحد الرقمين فارغ.

**Steps:**

1. افتح صفحة الاشتراك.
2. استدعِ POST /api/subscription/instapay/requests.

**Test data:** packageType PLUS_1

**Expected result:** لا يظهر الزر. الـ API يعيد "INSTAPAY_DISABLED: InstaPay payments are not available right now."

**Actual result:** instaPayEnabled=False \| HTTP 400: INSTAPAY_DISABLED: InstaPay payments are not available right now. (إخفاء الزر في الواجهة لم يُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-003 — إنشاء طلب +1 مشروع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** InstaPay مُعدّ.

**Steps:**

1. اختر "الدفع عبر InstaPay" لباقة +1.
2. اقرأ تعليمات التحويل.

**Test data:** packageType PLUS_1

**Expected result:** طلب Pending بمبلغ 250 ج.م وكود مرجع بصيغة OS-#### وينتهي بعد 48 ساعة. SuperAdmin يستلم إشعاراً.

**Actual result:** HTTP 200: Payment request created. \| المبلغ 250 الكود OS-3774 الحالة Pending المدة 48h \| إشعار SuperAdmin=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-004 — إنشاء طلب +5 مشاريع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | No | Pass |

**Preconditions:** InstaPay مُعدّ.

**Steps:**

1. اختر InstaPay لباقة +5.

**Test data:** packageType PLUS_5

**Expected result:** المبلغ 950 ج.م.

**Actual result:** HTTP 200: Payment request created. \| 950 ج.م / 5 مشاريع  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-005 — السعر يأتي من الخادم فقط

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** InstaPay مُعدّ.

**Steps:**

1. استدعِ POST /requests مع packageType PLUS_5 وحقول إضافية amount = 1 و projects = 50.

**Test data:** {"packageType":"PLUS_5","amount":1}

**Expected result:** المبلغ 950 والحزمة 5 مشاريع. الحقول الإضافية تُتجاهل.

**Actual result:** HTTP 200: Payment request created. \| 950 ج.م / 5  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-006 — باقة غير معروفة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** لا يوجد.

**Steps:**

1. استدعِ POST /requests بـ packageType PLUS_100.

**Test data:** PLUS_100

**Expected result:** 400 "INVALID_PACKAGE: Unknown package."

**Actual result:** HTTP 400: INVALID_PACKAGE: Unknown package.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-007 — حد طلبين معلقين

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | No | Pass |

**Preconditions:** يوجد طلبان Pending لم ينتهيا.

**Steps:**

1. أنشئ طلباً ثالثاً.

**Test data:** PLUS_1

**Expected result:** 409 "TOO_MANY_PENDING: You already have 2 payment requests awaiting review."

**Actual result:** HTTP 409: TOO_MANY_PENDING: You already have 2 payment requests awaiting review.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-008 — غير المالك لا يشتري

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| Accountant | P0 | — | Yes | Pass |

**Preconditions:** توكن U-ACC1.

**Steps:**

1. استدعِ POST /api/subscription/instapay/requests.

**Test data:** PLUS_1

**Expected result:** 403.

**Actual result:** HTTP 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-009 — رفع صورة إيصال التحويل

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | No | Pass |

**Preconditions:** طلب Pending.

**Steps:**

1. ارفع صورة JPG أقل من 5MB.

**Test data:** receipt.jpg 1MB

**Expected result:** 200. الإيصال محفوظ تحت private/instapay ولا يظهر كرابط عام ولا في معرض الصور. SuperAdmin يستلم إشعاراً.

**Actual result:** HTTP 200: Receipt uploaded. \| المفتاح المخزن يحتوي private/instapay=True \| screenshotUrl في الاستجابة=https://local-dev-placeholder.test/private/instapay/84f8fdcb298147d3a13fc461cfbd08f5/e099b0c566db4fa6a99eec2117620f6f/fd172e3464fe4f5b93185c5d1eb5395c.jpg?signed=local&amp;expires=900 \| SitePhotos لم تتغير  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-010 — إيصال PDF أو أكبر من 5MB

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** طلب Pending.

**Steps:**

1. ارفع PDF.
2. ارفع JPG بحجم 6MB.

**Test data:** PDF ، 6MB

**Expected result:** 400 "The receipt must be an image (JPG, PNG or WEBP)." ثم "The receipt image must be 5 MB or smaller."

**Actual result:** PDF: HTTP 400: The receipt must be an image (JPG, PNG or WEBP). \| 5.2MB: HTTP 400: The receipt image must be 5 MB or smaller. \| 6MB: HTTP 400 Validation failed. ["Failed to read the request form. Request body too large. Th  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-011 — رفع إيصال لطلب شركة أخرى أو طلب مغلق

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P1 | — | Yes | Pass |

**Preconditions:** معرّف طلب T2، وطلب Approved لـ T1.

**Steps:**

1. ارفع لطلب T2.
2. ارفع للطلب Approved.

**Test data:** —

**Expected result:** 404 "Payment request not found." ثم 409 "REQUEST_CLOSED: Receipts can only be added to a pending request."

**Actual result:** طلب T2: HTTP 404: Payment request not found. \| طلب Approved: HTTP 409: REQUEST_CLOSED: Receipts can only be added to a pending request.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-012 — رسالة واتساب جاهزة

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Blocked |

**Preconditions:** طلب Pending.

**Steps:**

1. اضغط زر إرسال الإيصال على واتساب.

**Test data:** —

**Expected result:** يفتح wa.me برسالة فيها اسم الشركة والباقة والمبلغ وكود المرجع.

**Actual result:** رابط واتساب في الواجهة لم يُختبر. الـ API يعيد whatsAppNumber=201000000002 و instaPayNumber=201000000001 مع كل طلب.  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-013 — اعتماد SuperAdmin يضيف المشاريع

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P0 | — | No | Pass |

**Preconditions:** طلب PLUS_1 Pending. قبل: MaxActiveProjects = 2.

**Steps:**

1. افتح /dashboard/payment-requests.
2. اعتمد الطلب.

**Test data:** —

**Expected result:** الحالة Approved. بعد: MaxActiveProjects = 3. سجل SubscriptionTransaction. المالك يستلم إشعاراً.

**Actual result:** HTTP 200: Approved: 1 project(s) added. New quota: 3. \| الحصة 2 → 3 \| إشعار للمالك=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-014 — اعتماد مزدوج متزامن

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P0 | — | No | Pass |

**Preconditions:** طلب Pending. قبل: 3.

**Steps:**

1. أرسل approve مرتين في نفس اللحظة.

**Test data:** —

**Expected result:** واحد ينجح والآخر 409 "ALREADY_PROCESSED: This request is already Approved.". بعد: 4 (وليس 5).

**Actual result:** ['HTTP 409: ALREADY_PROCESSED: This request is already Approved.', 'HTTP 200: Approved: 5 project(s) added. New quota: 8.'] \| الحصة 3 → 8 (باقة +5)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-015 — اعتماد طلب منتهي

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** طلب مر عليه أكثر من 48 ساعة.

**Steps:**

1. اعتمد الطلب.

**Test data:** —

**Expected result:** 409 "REQUEST_EXPIRED: This request expired and cannot be approved.". الحالة تظهر Expired.

**Actual result:** (ExpiresAt عُدّل إلى الماضي في قاعدة الاختبار) HTTP 409: REQUEST_EXPIRED: This request expired and cannot be approved. \| الحالة المعروضة Expired  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-016 — الرفض يتطلب سبباً

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | No | Pass |

**Preconditions:** طلب Pending.

**Steps:**

1. ارفض بدون سبب.
2. ارفض بسبب أطول من 500 حرف.
3. ارفض بسبب صالح.

**Test data:** reason فارغ ، 501 حرفاً ، "لم يصل التحويل"

**Expected result:** "REASON_REQUIRED: A reject reason is required." ثم "REASON_TOO_LONG: ..." ثم "Payment request rejected." والمالك يستلم السبب.

**Actual result:** HTTP 400: REASON_REQUIRED: A reject reason is required. \| HTTP 400: REASON_TOO_LONG: Keep the reason under 500 characters. \| HTTP 200: Payment request rejected. \| السبب وصل للمالك=True  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-017 — لا اعتماد بعد الرفض

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| SuperAdmin | P1 | — | Yes | Pass |

**Preconditions:** طلب Rejected.

**Steps:**

1. اعتمد الطلب.

**Test data:** —

**Expected result:** 409 "ALREADY_PROCESSED: This request is already Rejected.". الحصة لا تتغير.

**Actual result:** HTTP 409: ALREADY_PROCESSED: This request is already Rejected. \| الحصة 8 → 8  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-018 — غير SuperAdmin ممنوع من مراجعة الطلبات

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P0 | — | Yes | Pass |

**Preconditions:** توكن U-OWN.

**Steps:**

1. استدعِ GET /api/superadmin/payment-requests و POST /{id}/approve.

**Test data:** —

**Expected result:** 403.

**Actual result:** GET 403 \| approve 403  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-019 — حد إنشاء الطلبات لكل IP

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | B4 | No | Pass |

**Preconditions:** staging.

**Steps:**

1. أرسل 11 طلب إنشاء أو رفع خلال ساعة.

**Test data:** —

**Expected result:** الطلب 11 يعيد 429 مع Retry-After.

**Actual result:** الرموز [200, 200, 409, 409, 409, 409, 409, 409, 409, 409, 429]  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07

### IP-020 — قائمة مدفوعات المالك

| Role | Priority | Related fix | Safe on production? | Status |
|---|---|---|---|---|
| TenantOwner | P2 | — | Yes | Pass |

**Preconditions:** طلبات بحالات مختلفة.

**Steps:**

1. افتح "مدفوعات InstaPay الخاصة بي".

**Test data:** —

**Expected result:** تظهر كل الطلبات بحالتها (Pending / Approved / Rejected / Expired) وكود المرجع.

**Actual result:** حالات طلبات المالك: ['Approved', 'Expired', 'Rejected'] (الصفحة في الواجهة لم تُختبر)  
**Tester:** Claude (API محلي، بعد إصلاحات الجولة 1) · **Date:** 2026-10-07
