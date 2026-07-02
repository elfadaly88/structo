# 📌 وثيقة مرجع تطوير المشروع | Project Development Status

هذا الملف يمثل المرجع الحالي لحالة الكود والـ Business Logic المعتمد في النظام. يتم تقديمه لأدوات الذكاء الاصطناعي (AI Tools) كـ سياق (Context) أساسي قبل البدء في أي تعديل أو إضافة لضمان عدم كسر الميزات الشغالة.

---

## 🛠️ البيئة والتقنيات المستخدمة (Tech Stack)
- **Backend Core:** ASP.NET Core (.NET 9.0) with PostgreSQL
- **Frontend Framework:** Angular (Reactive Forms & Reactive Controls)
- **Styling:** Tailwind CSS (Dark Mode Design System: `bg-slate-950`, `text-slate-200`)
- **State Management / Forms:** FormBuilder / FormGroup (`formControlName`)
- **Offline Storage:** IndexedDB (Dexie.js) & Angular Service Workers (PWA)

---

## 🚀 ما تم إنجازه واستقراره بنجاح (Stable Features)
1. **تعديل حقل التاريخ (Payment Date Picker):** المستقر والمربوط بـ `paymentDate`.
2. **منطق طلب العهدة (Custody Request Validation):** الـ `insufficientBalanceValidator` شغال ويقارن المبلغ بالصناديق.
3. **لوحة تحكم أدمن الشركة (Company Admin Controls):** تعديل البيانات، الخصوصية `IsPublicPortfolio`، ومعرض الصور (بحد أقصى 5 صور وحجم 2MB).

---

## ⚠️ قواعد صارمة للمطور والـ AI (Strict Coding Rules)
- **ممنوع بتاتاً** تغيير أسماء الـ Form Controls الحالية والمستقرة وعلى رأسها `paymentDate`.
- الاعتماد التام على كلاسات Tailwind CSS المتوافقة مع الـ Theme الغامق لضمان اتساق الواجهة (Dark UI consistency).
- عند رفع الصور، يتم التحقق من الحجم برموز الـ TypeScript (`file.size`) قبل إرسال أي بيانات للسيرفر.

---

## 📝 خطة العمل القادمة (Next Steps - Offline Capabilities)
- [ ] تحويل تطبيق Angular إلى **PWA** بإضافة الـ `@angular/pwa` والـ Service Worker لعمل كاش لملفات الـ UI.
- [ ] إعداد مكتبة `Dexie.js` لإنشاء قاعدة بيانات **IndexedDB** محلية لتخزين (المشاريع - أرصدة الصناديق - مصادر الفلوس).
- [ ] تعديل ميثود الـ Submit الخاصة بالعهدة لتفحص حالة النت؛ لو أوفلاين يتم حفظ الطلب في الـ `PendingCustodyRequests Queue` داخل الـ IndexedDB.
- [ ] بناء نظام المزامنة (Sync Service) لرفع الطلبات المخزنة تلقائياً للسيرفر بمجرد عودة الإنترنت.
