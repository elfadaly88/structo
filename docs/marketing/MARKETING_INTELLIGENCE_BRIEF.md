# Osos / أسس: Marketing Intelligence Brief

> **Purpose:** Evidence-based product facts to hand to a marketing strategist. This is **not** a marketing plan.
> **Source:** Extracted directly from the codebase at commit `605fa9c` (2026-09-30). Every feature, price, route, role and message below was verified in code; file references are given so claims can be re-checked.
> **Rule for the strategist:** If something is not in this document, do not assume it exists. Section 2.2 and the "Accuracy flags" boxes list what must **not** be promised.

---

## 0. Product in One Paragraph

**EN:** Osos is an Arabic-first web platform for Egyptian finishing/interior companies, contractors, and freelance engineers. Its core is controlling cash that is handed to site engineers (custody / عُهدة): request → approve → spend → settle with receipts → return the remainder or get reimbursed. Around that core it adds a per-project financial ledger, company-wide reports, project closeout with reconciliation, site execution tracking (tasks, daily logs, punch list), a no-financials client progress link, and a public directory of companies with client ratings. It is sold per project slot, as a one-time payment, with no monthly subscription.

**AR:** أسس منصة ويب عربية أولاً لشركات التشطيبات والديكور والمقاولات والمهندسين المستقلين في مصر. قلبها هو ضبط الفلوس اللي بتتسلم لمهندس الموقع (العُهدة): طلب ← موافقة ← صرف ← تسوية بالفواتير ← توريد المتبقي أو تعويض الزيادة. وحوالين ده: دفتر مالي لكل مشروع، تقارير مالية موحدة للشركة، إغلاق المشروع بعد مطابقة الحسابات، متابعة التنفيذ (بنود، يوميات موقع، ملاحظات استلام)، رابط متابعة للعميل بدون أي أرقام مالية، ودليل عام للشركات بتقييمات العملاء. التسعير بالمشروع ودفع مرة واحدة، بدون اشتراك شهري.

**Official hero line (from `landing-page.component.ts`):**
- AR: «أسس | اضبط عُهد مشاريعك، وراقب مصاريف موقعك في ثانية وبدون محاسب»
- EN: "Osos | Track your project cash & monitor site expenses instantly without an accountant"

---

## 1. Real User Pain Points (Grounded in Actual Features)

> The "Today without Osos" rows describe the manual workflow each feature replaces. They are qualitative descriptions of the process, **not** survey data or statistics.

### 1.1 Site Custody & Settlements (العُهد والتسويات)
*Code: `PettyCash`, `Settlement`, `SettlementLine`, `ProjectCashPool` entities; `PettyCashService`, `SettlementService`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | The owner hands the site engineer cash. The engineer buys materials and labor, collects paper receipts (or loses them), and later reports "I spent X" by phone or on WhatsApp. Nobody knows in real time how much cash is outstanding with which engineer. At the end, someone reconciles by hand in Excel, and disputes over the remaining cash are common. | صاحب الشركة بيسلّم المهندس فلوس كاش، المهندس بيشتري خامات ويدفع عمالة ويجمع فواتير ورق (أو تضيع)، وبعدين يقول «صرفت كذا» في مكالمة أو على واتساب. محدش عارف لحظياً فيه كام عُهدة مفتوحة ومع مين. وفي الآخر حد بيقعد يطابق يدوي على إكسيل، والخلاف على «الباقي فين؟» بيحصل كتير. |
| **What Osos does** | The engineer requests custody in the app. Owner/Accountant approves it and picks **which fund it's paid from** (Client Deposit, Owner Capital, or External Loan). The engineer settles with **line items, each with its own invoice photo**. The system calculates the difference automatically. | المهندس يطلب العُهدة من التطبيق، والمالك أو المحاسب يوافق ويحدد **الصرف من أنهي مصدر تمويل** (دفعة العميل، رأس مال المالك، أو قرض خارجي). المهندس يسوّي العُهدة **ببنود، كل بند بصورة فاتورته**، والسيستم يحسب الفرق لوحده. |
| **Underspent** | Settlement becomes *Approved – pending refund*. The engineer is notified to hand the remainder to the accountant. The accountant confirms receipt, and the money goes back into the fund. | لو صرف أقل: التسوية تتعتمد «بانتظار توريد المتبقي»، المهندس يوصله إشعار يسلّم الباقي للمحاسب، والمحاسب يأكد الاستلام والفلوس ترجع للصندوق. |
| **Overspent** | Settlement is approved and the system **automatically creates a reimbursement request** for the difference, so the engineer doesn't have to chase it. | لو صرف أكتر: التسوية تتعتمد والسيستم **يعمل طلب تعويض تلقائي** بالفرق للمهندس، من غير ما يفضل يطالب. |
| **Guard rails** | A custody request can't exceed the selected fund's available balance, and the form blocks it before submit. An expense that exceeds the project budget is rejected unless the **Owner** explicitly forces it, and it is then flagged as an overrun. | مينفعش تطلب عُهدة أكبر من رصيد الصندوق (الفورم بيمنعها قبل الإرسال). وأي مصروف يعدّي ميزانية المشروع بيترفض إلا لو **المالك** أصر، وساعتها بيتعلّم عليه «تجاوز ميزانية». |
| **Owner shortcut** | If the Owner creates a custody request and selects a fund, it is **auto-approved** ("Direct Disbursement"). | لو المالك نفسه عمل العُهدة واختار الصندوق، بتتصرف **تلقائياً** (صرف مباشر). |

### 1.2 Multi-Project, Multi-Role Access (الأدوار والصلاحيات)
*Code: `UserRole` enum, `ProjectMembers` table, `ProjectAccessService`, `docs/architecture/project-member-roles.md`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | One WhatsApp group per project, with everyone seeing everything, including the owner's numbers. Or the owner is the only one with the Excel file and becomes the bottleneck for every question. | جروب واتساب لكل مشروع وكله شايف كله (حتى أرقام المالك)، أو المالك هو الوحيد اللي معاه ملف الإكسيل فبقى هو عنق الزجاجة لأي سؤال. |
| **What Osos does** | Each person has a **job role** and is **assigned to specific projects**. An engineer sees only their own projects, and only their own custody and settlements. The Owner sees everything automatically. | كل شخص له **دور وظيفي** و**بيتعيّن على مشاريع محددة**. المهندس يشوف مشاريعه بس، وعُهده وتسوياته هو بس. المالك يشوف كل حاجة تلقائياً. |
| **Concrete example** | Site engineers **do not see** the "Financial Ledger" tab (project income and expenses). Accountants **do not see** the photo gallery tab. The platform operator (SuperAdmin) is **blocked** from tenants' financial data and employee lists. | مهندس الموقع **مش بيشوف** تبويب «الدفتر المالي» (إيرادات ومصروفات المشروع). والمحاسب **مش بيشوف** معرض الصور. وحتى إدارة المنصة (SuperAdmin) **ممنوعة** من بيانات الشركات المالية وقوائم موظفيها. |

**Real roles in the product** (the enum name is `Manager`; the UI label is «مدير مشاريع»):
`TenantOwner` مالك المنشأة · `Manager` مدير مشاريع · `Accountant` محاسب · `SiteEngineer` مهندس موقع · `DesignEngineer` مهندس تصميم

### 1.3 Real-Time Notifications & Approvals (الإشعارات والموافقات)
*Code: `NotificationEngine.cs`, `NotificationService.cs` (DB + SignalR live + OneSignal web push).*

| | English | العربية |
|---|---|---|
| **Today without Osos** | "Did you see my message?" Requests get buried in WhatsApp chats, the engineer waits on site for cash, and there's no record of who approved what or when. | «شفت رسالتي؟» الطلبات بتضيع وسط الشات، والمهندس واقف في الموقع مستني الفلوس، ومفيش سجل مين وافق على إيه وإمتى. |
| **What Osos does** | Every step fires an Arabic notification to the right people only: in-app bell (live, no refresh) plus browser push. | كل خطوة بتطلع إشعار عربي للناس المعنية بس: جرس داخل التطبيق (لحظي من غير ريفرش) + إشعار على المتصفح. |

**Actual notification events (verbatim titles from code):**

| Trigger | Sent to | Title (AR) |
|---|---|---|
| Engineer requests custody | Assigned accountants and project managers (+ owner) | طلب صرف عهدة جديد 🔔 |
| Owner self-disburses | Relevant finance roles | صرف عهدة تلقائي 💰 |
| Custody approved / rejected | The requester | تمت الموافقة على صرف العهدة 💰 / تم رفض طلب صرف العهدة ❌ |
| Settlement submitted | Finance roles | طلب تسوية عهدة جديد للمراجعة 🔔 |
| Settlement approved | Engineer | تم اعتماد تسوية العهدة بنجاح ✅ |
| Approved, remainder due | Engineer | تمت مراجعة التسوية (بانتظار توريد المتبقي) ⚠️ |
| Remainder received | Engineer | تم تأكيد استلام المتبقي وإغلاق التسوية ✅ |
| Settlement rejected | Engineer | تم رفض تسوية العهدة ❌ |
| Project financially frozen | Project team | تجميد الحسابات المالية للمشروع ❄️ |
| Project closed | Project team | تم إغلاق المشروع نهائياً 🔒 |
| Payment succeeded | Owner | تمت ترقية باقة الاشتراك بنجاح 🚀 |

**Plus WhatsApp shortcuts** (they open WhatsApp with a pre-filled Arabic message; there is no WhatsApp API or bot): notify an engineer that their custody was approved, message a team member, and send a payment receipt message.
**Emails** (OneSignal): welcome, employee invitation, account activated.

### 1.4 Financial Reports & Reconciliation (التقارير والمطابقة)
*Code: `FinancialReportsController` → `GET /api/projects/{id}/full-report`, `GET /api/tenant/full-report`; `reports.component.ts`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | At month-end or project-end, the owner asks the accountant "where are we?", and the accountant spends days collecting receipts and WhatsApp photos into Excel. There's no single view across all projects. | آخر الشهر أو آخر المشروع المالك يسأل «إحنا فين؟»، والمحاسب يقعد أيام يجمع فواتير وصور واتساب في إكسيل. ومفيش صورة واحدة لكل المشاريع مع بعض. |
| **What Osos does** | A **company-wide report** with date filters and an optional single-project filter. It shows total budgets, total income, total expenses, net cash (surplus/deficit), **outstanding custody on site**, approved settlements, and a per-project breakdown table. It is printable from the browser. | **تقرير مالي موحد للشركة** بفلتر تاريخ ومشروع: إجمالي الميزانيات، إجمالي المقبوضات، إجمالي المصروفات، صافي السيولة (فائض/عجز)، **عُهد معلقة بالموقع**، تسويات معتمدة، وجدول تفصيلي لكل مشروع. وقابل للطباعة من المتصفح. |
| **Project-level** | A full project report plus a **reconciliation report**: a per-employee balance of custody given vs. settled, and the count of unsettled custody. | تقرير كامل للمشروع + **تقرير مطابقة** لكل موظف: اتسلم كام واتسوّى كام، وعدد العُهد اللي لسه مفتوحة. |
| **Funding clarity** | Money entering a project is tagged by source: **Client Deposit / Owner Capital / External Loan**, each tracked as its own fund balance. | الفلوس اللي داخلة المشروع متسجلة بمصدرها: **دفعة عميل / رأس مال المالك / قرض خارجي**، وكل مصدر له رصيده. |

### 1.5 Project Closeout & Trail (إغلاق المشروع)
*Code: `ProjectService` freeze and final-closeout; `ProjectBudgetLog`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | Projects never really "close". An engineer still has old custody, a late invoice appears months later, and nobody can prove the final numbers. | المشروع عمره ما بيتقفل فعلاً: مهندس لسه معاه عُهدة قديمة، فاتورة بتظهر بعد شهور، ومحدش يقدر يثبت الأرقام النهائية. |
| **What Osos does** | **Two-step closeout.** (1) *Financial Freeze*: new custody requests and financial operations are blocked while accounts are reviewed. (2) *Final Closeout*: **Owner only**, and **only if fully reconciled** (no open custody). The project is then locked as Closed. | **إغلاق على مرحلتين:** (1) *تجميد مالي*: وقف أي طلبات عُهد أو عمليات مالية جديدة لحين المراجعة. (2) *إغلاق نهائي*: **للمالك فقط** و**بشرط إن كل العُهد متسوّية**، وبعدها المشروع يتقفل. |
| **Budget history** | Every budget revision is logged with the old and new values, and a BOQ file (مقايسة) can be attached. | كل تعديل في الميزانية بيتسجل (القديم والجديد) ومعاه ملف مقايسة. |

> ⚠️ **Accuracy flag:** There is **no general "audit log"** of who changed what (that's Phase 2). The trail consists of: status transitions, the settlement and approval records, and the budget revision log. Do not market "full audit trail" or "سجل تدقيق كامل".

### 1.6 Client Reviews, Portfolio & Client Tracker (التقييمات والمعرض ومتابعة العميل)
*Code: `PublicDirectoryController`, `project-review.component.ts`, `project-tracker.component.ts`, `PublicProjectTrackerDto`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | Reputation lives in Facebook comments and word of mouth. Clients call the engineer daily asking "what's the progress?", and progress photos are scattered across WhatsApp. | السمعة عايشة في كومنتات فيسبوك والكلام، والعميل بيتصل كل يوم «وصلتوا لفين؟»، وصور الشغل متفرقة على واتساب. |
| **Client progress link** | One link («نسخ رابط متابعة العميل») that the client opens without logging in. It shows overall weighted progress %, each work item's progress, and approved site photos. **It shows no money, costs, or budgets.** | رابط واحد العميل يفتحه من غير تسجيل: نسبة الإنجاز الكلية، نسبة كل بند، وصور الموقع المعتمدة. **ومفيهوش أي أرقام أو تكاليف أو ميزانيات.** |
| **Rating link** | When a project is financially frozen, the system generates a private review link. The client rates it 1–5 stars and adds notes. The company's average rating updates automatically. | لما المشروع يدخل مرحلة التجميد المالي، السيستم بيطلع رابط تقييم خاص، العميل يقيّم من 1 لـ 5 نجوم ويكتب ملاحظاته، ومتوسط تقييم الشركة بيتحدث تلقائي. |
| **Public directory** | A company directory on the landing page, filterable by region, category, and minimum rating (3.0+ / 4.0+ / 4.5+). Each company shows its public projects gallery and client reviews. Internal receipts and site-task photos are **never** shown publicly. | دليل شركات في الصفحة الرئيسية بفلتر المنطقة والتخصص والتقييم (3+ / 4+ / 4.5+)، وكل شركة ليها معرض مشاريعها العامة وتقييمات عملائها. فواتير المشاريع وصور البنود الداخلية **عمرها ما بتظهر للعامة**. |

> ⚠️ **Accuracy flag on "verified reviews":** A review can only come from a link tied to a real project in the system that reached financial freeze. However, the **company itself sends that link**, the client's identity is not verified, and the link can be reused to edit the rating. The platform admin can hide reviews. Safe wording: «تقييمات مرتبطة بمشاريع حقيقية منفذة على المنصة» / "ratings tied to real projects run on the platform". Avoid «تقييمات موثقة 100%» / "100% verified".

### 1.7 Pricing Model: Pay per Project Slot (التسعير بالمشروع)
*Code: `SubscriptionController.cs`, `PaymobService.CalculatePricing`, `subscription.service.ts`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | Software sold in Egypt is usually a monthly or annual subscription in dollars, which small firms with irregular project flow don't want to commit to. | البرامج عادةً اشتراك شهري أو سنوي وأحياناً بالدولار، والشركات الصغيرة اللي شغلها مش منتظم مش عايزة تلتزم بيه. |
| **What Osos does** | **2 projects free forever**, no credit card. After that, you pay **once per extra project slot in EGP**, with no expiry and no monthly fee. Activation happens instantly after card payment. | **مشروعين مجاناً مدى الحياة** من غير فيزا. بعد كده **تدفع مرة واحدة بالجنيه لكل مشروع إضافي**، من غير تاريخ انتهاء ولا رسوم شهرية، والتفعيل فوري بعد الدفع بالكارت. |

(Full numbers are in Section 4.)

### 1.8 Site Execution Tracking (متابعة التنفيذ): bonus area, shipped Sept 2026
*Code: `SiteOperationsController`, `site-execution.component.ts`.*

| | English | العربية |
|---|---|---|
| **Today without Osos** | Daily site reports are voice notes or paper, defects found at handover are listed on WhatsApp, and progress % is a guess. | تقرير الموقع اليومي فويس نوت أو ورقة، وملاحظات الاستلام بتتكتب على واتساب، ونسبة الإنجاز تخمين. |
| **What Osos does** | **Work items** with an assigned engineer, weight, and progress %. These roll up into a **weighted overall progress**, and approved settlement lines can be linked to them (the cost of each work item). **Daily site log**: one per project per day, covering labor count, weather, trades on site, materials delivered, and notes. **Punch list**: defects and snags at handover. | **بنود تنفيذ** بمهندس مسؤول ووزن نسبي ونسبة إنجاز، بتطلع منها **نسبة إنجاز مرجّحة للمشروع**، وممكن تربط بنود التسويات المعتمدة بكل بند (تكلفة البند). **يومية الموقع**: تقرير واحد يومياً فيه عدد العمالة، الطقس، المهن الموجودة، الخامات الموردة، والملاحظات. **محضر ملاحظات الاستلام (Punch List)** للعيوب. |

---

## 2. Differentiators & What NOT to Promise

### 2.1 Real Differentiators (verified in code)

| # | Differentiator | Why it's not generic | Evidence |
|---|---|---|---|
| 1 | **Custody → Settlement → Refund/Reimburse lifecycle** | Models the Egyptian site-engineer عُهدة practice end to end, including the "return the remainder" confirmation step and automatic reimbursement for overspend. Generic ERPs treat this as a plain expense or advance. | `SettlementStatus`: Draft, Pending, Approved, ApprovedPendingRefund, Refunded, Rejected |
| 2 | **Funding-source funds per project** | Separates Client Deposit / Owner Capital / External Loan, which matches how local contractors finance jobs. | `CashPoolSourceType` enum |
| 3 | **Line-item settlements with a receipt photo per line** | Each line has its own invoice upload. | `SettlementLine.InvoiceUrl` |
| 4 | **Arabic-first, RTL by default** | `<html lang="ar" dir="rtl">`, Cairo font, and Arabic notification texts and messages. There is an English toggle (AR/EN translation files), but many screens are Arabic-only text. | `index.html`, `assets/i18n/*.json` |
| 5 | **Local payment in EGP via Paymob** | Card checkout in EGP with 0% VAT applied, and instant slot activation from a signed webhook. | `PaymobService`, `PaymentsController` |
| 6 | **Lightweight onboarding: no tax paperwork required** | Signup requires only company name, owner name, email, password, account type (Company / Freelancer), and location. Commercial register, tax card, national ID, and Syndicate ID fields are **optional**. Google sign-in is supported. Accounts are active immediately with no approval wait. | `TenantRegisterDto`, `tenant-register.component.ts:656-669`, `AuthService` (Status = Active) |
| 7 | **Freelancer path** | A dedicated "Freelancer" account type for individual engineers. Profile completion asks for national ID and address instead of a company address and map pin. | `AuthService.cs:62-70` |
| 8 | **Client progress link with zero financials** | Clients see progress and photos without ever seeing costs, which protects margins. | `PublicProjectTrackerDto` (no money fields) |
| 9 | **Role-based financial privacy** | Engineers can't see the project ledger, and even the platform operator is blocked from tenant finances. | `project-details.component.ts` tab gates; `project-member-roles.md` §2 |
| 10 | **Enforced closeout gate** | You can't close a project while custody is still open. | `final-closeout` requires `IsFullyReconciled` |
| 11 | **Offline-tolerant settlement submit** | If the connection drops when an engineer submits a settlement, it is queued on the device and sent automatically when back online. | `OfflineSyncService`, `'create-settlement'` handler |
| 12 | **Pay-per-project, no subscription** | A one-time EGP payment per slot with no expiry. | Section 4 |

### 2.2 Missing / Planned: DO NOT promise these yet

| Item | Real status in code | Safe wording today |
|---|---|---|
| **Audit Log** (سجل تدقيق) | ❌ Not built. Listed as Phase 2 in `docs/FINAL_PRE_LAUNCH_AUDIT_REPORT.md`. | "Approval history for custody and settlements" |
| **PDF / Excel export** | ❌ No native export. Reports use the **browser print** dialog (`window.print()`), which the user can "Save as PDF". | "Printable reports" / «تقارير قابلة للطباعة» |
| **Quota warning notification** | ❌ Not built. When the free slots are used up, a new project is created as *Pending Activation* until a slot is bought. | Don't mention |
| **Mobile app (iOS/Android)** | ❌ None. It's a responsive web app. There is **no installable PWA**: no web manifest and no service worker registered for caching. | "Works from the phone browser" / «بيشتغل من موبايلك من المتصفح» |
| **Full offline mode** | ⚠️ Partial. Only settlement submission, profile updates, and employee creation are queued offline. Receipt photos need a connection to upload, and the app needs a connection to load. | "Settlement is saved if the connection drops while submitting" |
| **Wallet / InstaPay / Fawry payments** | ❌ Card only (`payment_methods: ["card"]`). | "Pay by card" / «الدفع بالكارت» |
| **WhatsApp automation/bot** | ❌ Only click-to-chat links with pre-filled messages. | "One-click WhatsApp message" |
| **Monthly/annual plans, "Standard/Premium" tiers** | ❌ Not sold. See Section 4. | — |
| **Accounting software integration / e-invoice (ETA)** | ❌ None. | Don't mention |
| **"Unlimited photo storage" as a paid perk** | ⚠️ The in-app +5 pack card lists «دعم الأرشفة السحابية غير المحدودة للصور», but no storage limit differs by plan. All plans have the same limits (images ≤ 2 MB; documents ≤ 5–10 MB). | Remove it from the paid-perk list |
| **"Priority support"** | ⚠️ Listed on the +5 pack card. It's an operational promise with nothing in the code behind it. | Only if the team will actually deliver it |
| ~~Manager approving settlements~~ | ✅ **Resolved.** Assigned Managers can now approve/reject settlements and confirm refunds on their assigned projects, with the same scoping as custody approval. | "Owner, project manager or accountant approves" |

---

## 3. Screenshot & Demo Asset Inventory

> The app is a single-page Angular app; all dashboard routes require login. Use a demo company with realistic Arabic project names and amounts. **Never capture real customer data.**

### 3.1 Public (no login)

| # | Screen | Route | What makes it a strong shot |
|---|---|---|---|
| P1 | Landing hero + pricing cards | `/` | Hero line; the 3 pricing cards (0 / 250 / 950 EGP, with the struck-through 1,250) |
| P2 | Company directory + filters | `/#marketplace` | Company cards with star ratings; region/category/rating filters |
| P3 | Company profile modal (portfolio + reviews) | `/` → click a company | Public project gallery, "المشاريع الموثقة", reviews ledger |
| P4 | **Client progress tracker** | `/track/:shareToken` | Weighted progress %, per-item bars, site photos, **no money shown** (a key trust message) |
| P5 | Client rating page | `/public/project-review/:token` | 1–5 star rating form |
| P6 | Sign-up (Company / Freelancer) | `/register` | Short form, optional tax fields, map pin |
| P7 | Login incl. Google | `/login` | — |

### 3.2 Company dashboard (login required)

| # | Screen | Route | Best role to capture as | What to show |
|---|---|---|---|---|
| D1 | **Home: financial overview** | `/dashboard/financials` (default after login) | Owner / Accountant | KPI cards: طلبات تنتظر الموافقة · إجمالي الإيرادات · إجمالي المصروفات; pending approvals list; transactions log |
| D2 | Projects list + quota | `/dashboard/projects` | Owner | Project cards, used/allowed slots |
| D3 | **Project → Site Custody tab** (default tab) | `/dashboard/projects/:id` → «🧾 عهدة الموقع» | Owner (approve) and Engineer (request) | Request form with fund selector and insufficient-balance guard; approve/reject buttons |
| D4 | **Settlement voucher modal** | same → «⚖️ التسويات» | Engineer | Multi-line invoice form with receipt photo per line; the 3-card summary (custody / spent / difference) |
| D5 | Settlement approval result | same | Accountant | "Approved – pending refund" state and confirm-refund action |
| D6 | Financial ledger | same → «📖 الدفتر المالي» | Accountant (default tab) | Income/expense log with funding sources |
| D7 | Team tab | same → «👥 فريق العمل» | Owner | Assigned members with role badges |
| D8 | Photo gallery | same → «📸 معرض الصور» | Engineer | Site photos; public/private visibility |
| D9 | **Closeout dashboard** | same → «⚙️ إدارة المشروع» | Owner | Freeze → reconciliation → final close; BOQ upload |
| D10 | **Site Execution: work items** | `/dashboard/projects/:id/site-execution` | Manager / Engineer | Weighted progress bar, items table with linked settlements, "نسخ رابط متابعة العميل" button |
| D11 | Site Execution: daily log | same → «اليوميات الميدانية» | Engineer | Labor count, weather, trades, materials |
| D12 | Site Execution: punch list | same → «محاضر وملاحظات الاستلام» | Engineer | Defect list |
| D13 | **Company-wide financial report** | `/dashboard/reports` | Owner / Accountant | 6 KPI tiles (budgets, receipts, expenses, net cash, outstanding custody, approved settlements) + per-project table; the print view |
| D14 | Employees & roles | `/dashboard/users` | Owner | Add employee with role dropdown (مهندس موقع / محاسب / مدير مشاريع / مهندس تصميم) and project assignment |
| D15 | Buy project slots | `/dashboard/subscription` | Owner | The 3 plan cards → Paymob checkout |
| D16 | Company public profile settings | `/dashboard/profile` | Owner | Logo, banner, map location, public-portfolio toggle |
| D17 | Notification bell (open) | any dashboard page | Owner / Engineer | A live Arabic notification, e.g. «طلب صرف عهدة جديد 🔔» |

### 3.3 Recommended demo GIFs / short videos (real flows)
1. **"The 30-second custody"**: Engineer requests custody (D3), the owner gets a live notification (D17), approves it choosing a fund, and the engineer is notified.
2. **"Settle with receipts"**: Engineer adds 3 lines with receipt photos (D4), the accountant approves, and the view shows "remainder due" → confirm refund (D5).
3. **"What your client sees"**: Copy the tracker link (D10), open it on a phone (P4), and show progress and photos with no costs.
4. **"Close the project cleanly"**: Freeze → reconciliation shows 0 open custody → final close (D9) → rating link → star rating (P5).
5. **Mobile views:** capture D1, D3, D4, D11 and P4 at phone width (the layout is responsive). Present these as "from your phone browser", not as an app.

---

## 4. Real Pricing Structure (exact, from code)

### 4.1 What is actually sold

| Package | Price | Payment | What you get | Source |
|---|---|---|---|---|
| **Free / الباقة المجانية** | **0 EGP** | — | **2 project slots, lifetime.** No card needed. All features. | `AuthService.cs:129` (`MaxActiveProjects = 2`) |
| **+1 Project / مشروع إضافي** | **250 EGP** | One-time, card (Paymob) | +1 project slot, **no expiry**, stackable | `SubscriptionController.cs:38`, `PaymobService.cs:476` (25000 piasters) |
| **+5 Projects Pack / حزمة 5 مشاريع** | **950 EGP** | One-time, card (Paymob) | +5 project slots, no expiry, stackable. Marketed as "save 300 EGP" vs 5 × 250 = 1,250 | `SubscriptionController.cs:39`, `PaymobService.cs:473` (95000 piasters) |

- **VAT:** `VatRate = 0.0m`, so displayed prices are final.
- **Currency:** EGP only.
- **Who can buy:** only the company Owner (`[Authorize(Roles = "TenantOwner")]`).
- **Activation:** automatic on the Paymob success webhook; slots are added to the current balance.
- **Larger needs:** the landing page and dashboard offer a **WhatsApp "contact us"** for 10+ projects. The platform admin can also add slots manually (`POST /api/tenants/{id}/manual-upgrade`), for example after a bank transfer.

### 4.2 How a "slot" is counted (important for messaging)
- A slot is consumed **when a project is created**, and it is **not freed when the project is closed**. The count is of *all* projects ever created by the company (`ProjectService.cs:199`, comment "Total Lifetime Slot Logic").
- If the company is out of slots, a new project is still created, but as **Pending Activation** (locked) until a slot is purchased.
- ✅ The landing page wording «2 مشاريع مجاناً مدى الحياة (2 Lifetime Projects)» is **accurate**.
- ✅ The in-app Free card previously said «إدارة مشروعين نشطين متزامنين» ("2 concurrent active projects"). It now reads «مشروعين مجاناً مدى الحياة (لا يُسترد الرصيد عند إغلاق المشروع)», matching the landing page.

### 4.3 About "Free / Standard / Premium" tiers
These names exist only as **legacy values** in the `SubscriptionPlan` enum (`Free, Pro, Enterprise, Standard, Premium`). When the platform admin manually approves a tenant registered on them, Standard maps to 10 slots and Premium to 50 (`SuperAdminController.cs:207-219`, `TenantsController.cs:129-139`). **They are not offered, priced, or purchasable anywhere in the public or in-app UI.** After a paid top-up the plan label changes to "Pro", but that is only a label. **Do not market tiers.** The commercial model is **Free (2) + one-time top-ups**.

### 4.4 Price examples (derived only from the two real packages)
| Total projects needed | Cheapest real combination | Total |
|---|---|---|
| 2 | Free | 0 EGP |
| 3 | Free + 1 | 250 EGP |
| 4 | Free + 1 + 1 | 500 EGP |
| 7 | Free + 5-pack | 950 EGP |
| 12 | Free + 5-pack × 2 | 1,900 EGP |

> ⚠️ Don't quote per-unit prices for 2, 3 or 4 extra projects as a package. The UI only sells +1 and +5. (The backend has an unused rule pricing other quantities at 200 EGP each, and an unused landing-page calculator shows 250 each. Neither is reachable by customers; ignore both.)

---

## 5. Target User Snapshot (from the real permission matrix)

> The landing screen after login is `/dashboard/financials` for every company role. SuperAdmin goes to `/dashboard/overview` and is not a customer persona.

### 5.1 TenantOwner: مالك الشركة / المهندس صاحب المكتب
- **First thing they see:** the financial home. KPI cards for **requests waiting for approval**, total income, and total expenses, followed by the pending-approvals list.
- **What they do most:** approve or reject custody requests and pick the fund to pay from. Approve settlements (theirs are auto-approved when they submit themselves). Inject capital or record client deposits. Create projects. Add employees and assign them to projects. Share the client tracker link. Freeze and close projects. Buy slots.
- **Exclusive powers:** create projects, manage employees, company public profile, buy slots, **final closeout**, force a budget overrun.
- **Message angle:** *control and peace of mind*. «اعرف فلوسك فين، مع مين، وصرفت في إيه، من غير ما تتصل بحد.» / "Know where your cash is, who has it, and what it was spent on, without calling anyone."

### 5.2 Manager (مدير مشاريع): assigned projects only
- **Sees:** only the projects they're assigned to. Tabs: custody, ledger, settlements, gallery, team, project management.
- **Does most:** coordinates the team on their projects (can add or remove members), **approves custody requests**, **approves/rejects settlements and confirms refunds**, records financial transactions, manages site execution items and the client tracker, and views project reports.
- **Cannot:** create projects, buy slots, or do the final closeout (Owner only). All financial approvals are limited to their assigned projects.
- **Message angle:** *run several sites without chaos*. «كل مواقعك قدامك: مين طلب إيه، ووصلنا لفين.»

### 5.3 Accountant (محاسب): assigned projects only
- **First thing they see:** the financial home. Inside a project, the **default tab is the Financial Ledger** (الدفتر المالي), and the photo gallery is hidden.
- **Daily checks:** pending custody requests; **settlements waiting for review** (checking the invoice photo per line); remainders to collect ("Approved – pending refund") → confirm receipt; fund balances by source; the company-wide report, including the **outstanding custody on site** figure and the per-project net cash.
- **Powers:** approve/reject custody, approve/reject settlements, confirm refunds, direct disbursement, budget revisions, company-wide reports.
- **Message angle:** *no more chasing receipts*. «كل فاتورة متصورة ومربوطة بعُهدتها، والتقرير جاهز.» / "Every receipt photographed and tied to its custody; the report is already done."

### 5.4 SiteEngineer (مهندس موقع): assigned projects only
- **First thing they see:** the financial home with **"my custody requests"**. Inside a project, the **default tab is Site Custody**. They **cannot see the Financial Ledger**.
- **Does most:** request custody from the phone → get a live notification when it's approved → submit a **settlement with a receipt photo per line** (queued if the signal drops while submitting) → hand back any remainder. Also: daily site log, update work item progress, punch list, site photos.
- **Can only act on their own custody** (enforced: "not authorized to settle custody issued to another user").
- **Message angle:** *get paid back fast, no arguments*. «اطلب عُهدتك وسوّيها من موبايلك، وحقك في الزيادة بيرجعلك تلقائي.» / "Request and settle from your phone; any overspend is reimbursed automatically."

### 5.5 DesignEngineer (مهندس تصميم): assigned projects only
- **Sees:** the same restrictions as a site engineer (no Financial Ledger tab). Default tab is Site Custody.
- **Does:** site photos and gallery, BOQ reference access, and site execution items, daily logs and punch list. They can also request custody.
- **Message angle:** secondary persona; use it in "whole team on one platform" messaging rather than targeting it directly.

### 5.6 The homeowner / end client (not a user account)
- **Touchpoints:** the **progress tracker link** (progress % + photos, no costs), the **rating link** at project end, and the **public directory** when choosing a company.
- **Message angle (for B2B2C):** «ابعت لعميلك رابط يتابع منه شغله أول بأول، من غير ما تكشف تكاليفك.» / "Give your client a live progress link without revealing your costs."

---

## Appendix A: Accuracy Flags Summary (fix copy or avoid in marketing)
1. ~~In-app Free card says "2 concurrent active projects"~~: fixed; it now says lifetime.
2. The +5 pack card lists "unlimited cloud photo archiving" as a perk, but it isn't plan-specific.
3. "Priority support" on the +5 pack has nothing behind it operationally.
4. "Verified reviews" should be softened (see 1.6).
5. No PDF/Excel export, audit log, quota warning, mobile app, installable PWA, wallet payments, or WhatsApp bot.
6. Brand: use **Osos / أسس** only. The domain is still `structo-production.up.railway.app`, and support/billing emails are `@structo.app`. Resolve these before campaigns.

## Appendix B: Key Source Files
| Topic | File |
|---|---|
| Pricing | `Structo.API/Controllers/SubscriptionController.cs`, `Structo.Infrastructure/Services/PaymobService.cs` (`CalculatePricing`), `Structo.Client/src/app/core/services/subscription.service.ts` |
| Slot counting | `Structo.Core/Services/ProjectService.cs` (~line 195) |
| Roles | `Structo.Core/Enums/UserRole.cs`, `docs/architecture/project-member-roles.md` |
| Custody/settlement | `Structo.Core/Services/PettyCashService.cs`, `SettlementService.cs` |
| Notifications | `Structo.Core/Services/NotificationEngine.cs`, `Structo.API/Services/NotificationService.cs` |
| Reports | `Structo.API/Controllers/FinancialReportsController.cs`, `features/dashboard/reports/reports.component.ts` |
| Public pages | `features/public/project-tracker.component.ts`, `project-review.component.ts`, `Structo.API/Controllers/PublicDirectoryController.cs` |
| Routes | `Structo.Client/src/app/app.routes.ts` |
| Phase 2 roadmap | `docs/FINAL_PRE_LAUNCH_AUDIT_REPORT.md` (lines 383-386) |
