import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { ProjectDetailsStore } from './project-details.store';

/** Reconciliation, freeze and final close-out tab. */
@Component({
  selector: 'app-pd-tab-closeout',
  standalone: true,
  imports: [ApiDatePipe, DecimalPipe, FormsModule],
  template: `
    <!-- ======================== CLOSEOUT DASHBOARD TAB ======================== -->
    @if (vm.activeTab() === 'closeout' && vm.isOwnerOrAccountant()) {

      <div class="space-y-6">
        <!-- Header -->
        <div class="bg-gradient-to-br from-slate-900/80 to-rose-950/20 border border-rose-900/40 rounded-2xl p-6 shadow-xl">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-extrabold text-white font-cairo flex items-center gap-2">
                <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                لوحة إغلاق المشروع
              </h3>
              <p class="text-xs text-slate-400 mt-1 font-cairo">مرحلة تجميد العمليات المالية، مراجعة الأرصدة، والإغلاق النهائي الموثَّق.</p>
            </div>
            @if (vm.project()) {
              <span class="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase font-cairo border"
                [class.bg-emerald-500\/10]="vm.project()!.status === 'Active'"
                [class.text-emerald-400]="vm.project()!.status === 'Active'"
                [class.border-emerald-500\/30]="vm.project()!.status === 'Active'"
                [class.bg-amber-500\/10]="vm.project()!.status === 'FinancialFreeze'"
                [class.text-amber-300]="vm.project()!.status === 'FinancialFreeze'"
                [class.border-amber-500\/30]="vm.project()!.status === 'FinancialFreeze'"
                [class.bg-slate-800]="vm.project()!.status === 'Closed'"
                [class.text-slate-400]="vm.project()!.status === 'Closed'"
                [class.border-slate-700]="vm.project()!.status === 'Closed'">
                {{ vm.project()!.status === 'Active' ? '🟢 نشط' : vm.project()!.status === 'FinancialFreeze' ? '🟡 مجمّد' : '⚫ مغلق نهائياً' }}
              </span>
            }
          </div>
        </div>

        <!-- 📄 Private BOQ / Estimation Attachment Card (إدارة المشروع Tab) -->
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/60 pb-3">
            <div>
              <h4 class="text-sm font-extrabold text-white font-cairo flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                المقايسة المرجعية للمشروع
              </h4>
              <p class="text-xs text-slate-400 mt-1 font-cairo">
                رفع وإدارة مستند جدول الكميات والمقايسة التقديرية المرجعية الخاصة بالمشروع.
              </p>
            </div>
            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-bold rounded-xl font-cairo shrink-0">
              مستند مرجعي خاص
            </span>
          </div>

          <!-- Lock Notice Banner -->
          <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300 font-cairo flex items-center gap-2">
            <span class="text-base shrink-0">🔒</span>
            <span>هذا المستند مرجعي داخلي فقط ولا يظهر إطلاقاً في بروفايل الشركة العام ولا يؤثر على العمليات المالية.</span>
          </div>

          <!-- Upload / Download Actions Box -->
          @if (vm.boqFileDetails().fileUrl) {
            <div class="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-white font-mono truncate" [title]="vm.boqFileDetails().fileName">
                    {{ vm.boqFileDetails().fileName }}
                  </p>
                  <p class="text-[10px] text-emerald-400 font-cairo mt-0.5">✅ ملف المقايسة مرفوع ومحفوظ</p>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <!-- Download BOQ Button -->
                <a 
                  [href]="vm.boqFileDetails().fileUrl" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download
                  class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 shadow-md">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  تحميل المقايسة
                </a>

                <!-- Replace BOQ Button -->
                @if (vm.isOwnerOrAccountant()) {
                  <button 
                    (click)="boqFileInput.click()" 
                    [disabled]="vm.isUploadingBOQ()"
                    class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer font-cairo flex items-center gap-1.5">
                    🔄 استبدال الملف
                  </button>
                }
              </div>
            </div>
          } @else {
            <!-- Empty Upload Box -->
            <div class="border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-6 text-center bg-slate-950/30 transition-all">
              <svg class="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-xs font-bold text-slate-300 font-cairo">لم يتم رفع ملف مقايسة مرجعية لهذا المشروع بعد</p>
              <p class="text-[11px] text-slate-500 font-cairo mt-1">يُسمح برفع ملفات (.pdf, .xlsx, .docx) حتى 10 ميجابايت</p>

              @if (vm.isOwnerOrAccountant()) {
                <button 
                  (click)="boqFileInput.click()" 
                  [disabled]="vm.isUploadingBOQ()"
                  class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer font-cairo inline-flex items-center gap-1.5">
                  @if (vm.isUploadingBOQ()) {
                    <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري رفع ملف المقايسة...
                  } @else {
                    📁 اختيار ملف المقايسة
                  }
                </button>
              }
            </div>
          }

          <input 
            #boqFileInput 
            type="file" 
            class="hidden" 
            (change)="vm.onBOQFileSelected($event)" 
            accept=".pdf,.xlsx,.xls,.docx,.doc">

          @if (vm.boqUploadError()) {
            <p class="text-xs text-rose-400 font-cairo font-bold mt-1">⚠️ {{ vm.boqUploadError() }}</p>
          }
        </div>

        <!-- Client Review Link Card (Displayed stably inside Closeout tab when publicReviewToken exists) -->
        @if (vm.project() && vm.project()!.publicReviewToken) {
          <div class="bg-slate-900/40 border border-indigo-900/40 rounded-2xl p-5 shadow-xl">
            <h4 class="text-sm font-bold text-indigo-300 font-cairo flex items-center gap-2 mb-2">
              <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              رابط تقييم المشروع للعميل
            </h4>
            <p class="text-xs text-slate-400 mb-3 font-cairo">أرسل هذا الرابط للعميل عبر واتساب لتقييم جودة تسليم المشروع — لا يتطلب تسجيل دخول.</p>
            <div class="flex items-center gap-2">
              <input type="text" readonly [value]="vm.getPublicReviewUrl()" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono focus:outline-none" />
              <button (click)="vm.copyReviewLink()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo shrink-0">نسخ الرابط</button>
              <button type="button" (click)="vm.openWhatsAppModal()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 shrink-0 justify-center">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                ارسال واتساب
              </button>
            </div>
          </div>
        }

        <!-- Action Buttons -->
        @if (vm.project() && vm.project()!.status !== 'Closed') {
          <div class="flex flex-wrap gap-3">
            @if (vm.project()!.status === 'Active') {
              <button id="btn-freeze-project" (click)="vm.onFreezeProject()" [disabled]="vm.isCloseoutLoading()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                تجميد المشروع مالياً
              </button>
            }
            <button id="btn-run-audit" (click)="vm.onRunReconciliation()" [disabled]="vm.isCloseoutLoading()"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo">
              @if (vm.isCloseoutLoading()) {
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z"></path></svg>
              } @else {
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M15 7h.01M9 17h6" /></svg>
              }
              تشغيل تدقيق الأرصدة
            </button>
            @if (vm.isTenantOwner()) {
              <button id="btn-final-closeout" (click)="vm.onFinalCloseout()"
                [disabled]="vm.isCloseoutLoading() || !vm.reconciliationReport()?.isFullyReconciled || vm.project()!.status !== 'FinancialFreeze'"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-cairo">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                الإغلاق النهائي للمشروع
                @if (!vm.reconciliationReport()?.isFullyReconciled) { <span class="text-[10px] opacity-60">(يتطلب تصفية كاملة)</span> }
              </button>
            }
            @if (vm.canViewFinancialReports()) {
              <button id="btn-closeout-project-report" type="button" (click)="vm.openProjectReportModal()" [disabled]="vm.isProjectReportLoading()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600/15 hover:bg-sky-600/25 text-sky-300 border border-sky-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo shadow-sm">
                <svg class="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>تقرير المشروع المالي الشامل</span>
              </button>
            }
          </div>
        }

        <!-- Reconciliation Report -->
        @if (vm.reconciliationReport()) {
          <div class="space-y-4">
            <!-- KPI Summary -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي الميزانية</span>
                <p class="text-xl font-extrabold text-slate-200 mt-1 font-mono">{{ (vm.reconciliationReport()?.totalBudget || 0) | number:'1.0-0' }} EGP</p>
              </div>
              <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي الدخل</span>
                <p class="text-xl font-extrabold text-emerald-400 mt-1 font-mono">{{ (vm.reconciliationReport()?.totalIncome || 0) | number:'1.0-0' }} EGP</p>
              </div>
              <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي المصروفات</span>
                <p class="text-xl font-extrabold text-rose-400 mt-1 font-mono">{{ (vm.reconciliationReport()?.totalExpenses || 0) | number:'1.0-0' }} EGP</p>
              </div>
              <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">صافي الرصيد</span>
                <p class="text-xl font-extrabold mt-1 font-mono" [class.text-emerald-400]="(vm.reconciliationReport()?.netBalance || 0) >= 0" [class.text-rose-400]="(vm.reconciliationReport()?.netBalance || 0) < 0">{{ (vm.reconciliationReport()?.netBalance || 0) | number:'1.0-0' }} EGP</p>
              </div>
            </div>
            <!-- Custody Row (Clickable KPI Drill-Down triggers) -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Card 1: Unsettled Custody -->
              <div (click)="vm.selectedDrilldown.set(vm.selectedDrilldown() === 'unsettled' ? null : 'unsettled')"
                class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                [class.border-amber-500]="vm.selectedDrilldown() === 'unsettled'"
                [class.border-slate-800\/60]="vm.selectedDrilldown() !== 'unsettled'"
                [class.bg-amber-500\/5]="vm.selectedDrilldown() === 'unsettled'">
                <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">عُهَد معلَّقة للغلق</span>
                <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                  {{ vm.unsettledCustodyList().length }} عهدة ({{ (vm.unsettledCustodySum() || 0) | number:'1.0-0' }} EGP)
                </p>
                <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">اضغط للتفاصيل وإرسال التذكيرات</span>
              </div>

              <!-- Card 2: Pending Treasury Refunds -->
              <div (click)="vm.selectedDrilldown.set(vm.selectedDrilldown() === 'refunds' ? null : 'refunds')"
                class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                [class.border-amber-500]="vm.selectedDrilldown() === 'refunds'"
                [class.border-slate-800\/60]="vm.selectedDrilldown() !== 'refunds'"
                [class.bg-amber-500\/5]="vm.selectedDrilldown() === 'refunds'">
                <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">مرتجعات الخزينة المعلقة</span>
                <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                  {{ vm.pendingRefundsList().length }} تسوية ({{ (vm.pendingRefundsSum() || 0) | number:'1.0-0' }} EGP)
                </p>
                <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">اضغط لتأكيد استلام المبلغ نقداً</span>
              </div>

              <!-- Card 3: Pending Reimbursements -->
              <div (click)="vm.selectedDrilldown.set(vm.selectedDrilldown() === 'reimbursements' ? null : 'reimbursements')"
                class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                [class.border-amber-500]="vm.selectedDrilldown() === 'reimbursements'"
                [class.border-slate-800\/60]="vm.selectedDrilldown() !== 'reimbursements'"
                [class.bg-amber-500\/5]="vm.selectedDrilldown() === 'reimbursements'">
                <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">تعويضات الموظفين المعلقة</span>
                <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                  {{ vm.pendingReimbursementsList().length }} طلب ({{ (vm.pendingReimbursementsSum() || 0) | number:'1.0-0' }} EGP)
                </p>
                <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">اضغط لصرف التعويض للموظف</span>
              </div>
            </div>

            <!-- Drill-down details container -->
            @if (vm.selectedDrilldown() !== null) {
              <div class="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 space-y-4 transition-all duration-200 shadow-lg">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800/50">
                  <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                    <svg class="w-4 h-4 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                    @if (vm.selectedDrilldown() === 'unsettled') {
                      تفاصيل العهد المعلقة / Unsettled Custody Details
                    } @else if (vm.selectedDrilldown() === 'refunds') {
                      تفاصيل مرتجعات الخزينة المطلوبة / Pending Treasury Refunds
                    } @else if (vm.selectedDrilldown() === 'reimbursements') {
                      تفاصيل التعويضات المستحقة للموظفين / Pending Reimbursements
                    }
                  </h4>
                  <button (click)="vm.selectedDrilldown.set(null)" class="text-slate-400 hover:text-white text-xs font-cairo cursor-pointer">
                    إغلاق / Close ×
                  </button>
                </div>

                <!-- Details View: Unsettled Custody -->
                @if (vm.selectedDrilldown() === 'unsettled') {
                  <div class="overflow-x-auto">
                    <table class="w-full text-left rtl:text-right text-xs">
                      <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                        <tr>
                          <th class="px-4 py-2.5 font-cairo">المستلم</th>
                          <th class="px-4 py-2.5 font-cairo">البيان</th>
                          <th class="px-4 py-2.5 text-right font-cairo">المبلغ</th>
                          <th class="px-4 py-2.5 font-cairo">الحالة</th>
                          <th class="px-4 py-2.5 text-center font-cairo">إجراء سريع</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/30">
                        @for (item of vm.unsettledCustodyList(); track item.id) {
                          <tr class="hover:bg-slate-900/20 text-slate-300">
                            <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ item.issuedTo || 'Staff' }}</td>
                            <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ item.reason }}</td>
                            <td class="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} EGP</td>
                            <td class="px-4 py-2.5 font-mono text-[10px] text-amber-500">{{ item.status }}</td>
                            <td class="px-4 py-2.5 text-center">
                              <button (click)="vm.onWhatsAppAlert(item, 'مرحباً ' + item.issuedTo + '، يرجى تسوية عهدتك المعلقة بقيمة ' + item.amount + ' EGP لـ ' + item.projectName + ' - ' + item.reason + '.')" 
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                                </svg>
                                إرسال تذكير تسوية
                              </button>
                            </td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="5" class="px-4 py-8 text-center text-slate-500 font-cairo">لا توجد عهد معلقة للغلق</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                }

                <!-- Details View: Pending Refunds -->
                @if (vm.selectedDrilldown() === 'refunds') {
                  <div class="overflow-x-auto">
                    <table class="w-full text-left rtl:text-right text-xs">
                      <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                        <tr>
                          <th class="px-4 py-2.5 font-cairo">المستلم</th>
                          <th class="px-4 py-2.5 font-cairo">البيان الأساسي</th>
                          <th class="px-4 py-2.5 text-right font-cairo">قيمة العهدة</th>
                          <th class="px-4 py-2.5 text-right font-cairo">إجمالي الصرف</th>
                          <th class="px-4 py-2.5 text-right font-cairo">المبلغ المرتجع</th>
                          <th class="px-4 py-2.5 text-center font-cairo">إجراء سريع</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/30">
                        @for (sett of vm.pendingRefundsList(); track sett.id) {
                          <tr class="hover:bg-slate-900/20 text-slate-300">
                            <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ sett.issuedTo }}</td>
                            <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ sett.custodyReason }}</td>
                            <td class="px-4 py-2.5 text-right font-mono text-slate-400">{{ sett.custodyAmount | number:'1.2-2' }} EGP</td>
                            <td class="px-4 py-2.5 text-right font-mono text-slate-400">{{ sett.totalAmount | number:'1.2-2' }} EGP</td>
                            <td class="px-4 py-2.5 text-right font-mono font-bold text-emerald-400">{{ sett.netDifference | number:'1.2-2' }} EGP</td>
                            <td class="px-4 py-2.5 text-center">
                              <button (click)="vm.onConfirmRefund(sett.id)" 
                                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                تأكيد استلام المرتجع
                              </button>
                            </td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="6" class="px-4 py-8 text-center text-slate-500 font-cairo">لا توجد مبالغ مرتجعة معلقة بالخزينة</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                }

                <!-- Details View: Pending Reimbursements -->
                @if (vm.selectedDrilldown() === 'reimbursements') {
                  <div class="overflow-x-auto">
                    <table class="w-full text-left rtl:text-right text-xs">
                      <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                        <tr>
                          <th class="px-4 py-2.5 font-cairo">المستحق</th>
                          <th class="px-4 py-2.5 font-cairo">تفاصيل المصاريف الزائدة</th>
                          <th class="px-4 py-2.5 text-right font-cairo">مبلغ التعويض المطلوب</th>
                          <th class="px-4 py-2.5 font-cairo">محفظة الصرف</th>
                          <th class="px-4 py-2.5 text-center font-cairo">إجراء سريع</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/30">
                        @for (item of vm.pendingReimbursementsList(); track item.id) {
                          <tr class="hover:bg-slate-900/20 text-slate-300">
                            <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ item.issuedTo || 'Staff' }}</td>
                            <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ item.reason }}</td>
                            <td class="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} EGP</td>
                            <td class="px-4 py-2.5">
                              <select [(ngModel)]="vm.selectedReimbursementPool[item.id]" 
                                class="w-full max-w-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-cairo">
                                <option [value]="undefined" disabled selected>-- اختر محفظة الصندوق --</option>
                                @for (pool of vm.cashPools(); track pool.id) {
                                  <option [value]="pool.id" [disabled]="pool.availableBalance < item.amount">
                                    {{ vm.getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)
                                  </option>
                                }
                              </select>
                            </td>
                            <td class="px-4 py-2.5 text-center">
                              <button (click)="vm.onApproveReimbursement(item, vm.selectedReimbursementPool[item.id])" 
                                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                اعتماد وصرف التعويض
                              </button>
                            </td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="5" class="px-4 py-8 text-center text-slate-500 font-cairo">لا توجد تعويضات معلقة مستحقة للموظفين</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                }
              </div>
            }

            <!-- Status Banner -->
            <div class="rounded-xl border px-5 py-3 flex flex-col gap-2"
              [class.bg-emerald-500\/5]="vm.reconciliationReport()!.isFullyReconciled" [class.border-emerald-500\/30]="vm.reconciliationReport()!.isFullyReconciled"
              [class.bg-rose-500\/5]="!vm.reconciliationReport()!.isFullyReconciled" [class.border-rose-500\/30]="!vm.reconciliationReport()!.isFullyReconciled">
              <div class="flex items-center gap-3">
                @if (vm.reconciliationReport()!.isFullyReconciled) {
                  <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p class="text-sm font-bold text-emerald-300 font-cairo">✅ جميع الأرصدة مصفَّاة — المشروع جاهز للإغلاق النهائي</p>
                } @else {
                  <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                  <p class="text-sm font-bold text-rose-300 font-cairo">⚠️ لا يمكن الإغلاق — يوجد عهد معلَّقة أو أرصدة موظفين غير صفرية</p>
                }
              </div>
              @if (!vm.reconciliationReport()!.isFullyReconciled) {
                <p class="text-xs text-rose-400 font-cairo ml-8 rtl:mr-8 rtl:ml-0">
                  * يجب تصفية جميع العهد المعلقة، واسترداد المبالغ المرتجعة، وصرف التعويضات المستحقة للموظفين حتى تتساوى كافة الأرصدة إلى 0.00 EGP تماماً لتمكين زر الإغلاق النهائي للمشروع.
                </p>
              }
            </div>
            <!-- Employee Ledger -->
            @if (vm.reconciliationReport()!.employeeBalances.length > 0) {
              <div class="bg-slate-950/50 border border-slate-800/60 rounded-2xl overflow-hidden">
                <div class="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40">
                  <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    دفتر أرصدة الموظفين
                  </h4>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left rtl:text-right text-xs">
                    <thead class="bg-slate-900/60 border-b border-slate-800/60">
                      <tr class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th class="px-4 py-3 font-cairo">الموظف</th>
                        <th class="px-4 py-3 text-right font-cairo">إجمالي العُهَد</th>
                        <th class="px-4 py-3 text-right font-cairo">المُسوَّى</th>
                        <th class="px-4 py-3 text-right font-cairo">المرتجع</th>
                        <th class="px-4 py-3 text-right font-cairo">الرصيد</th>
                        <th class="px-4 py-3 text-center font-cairo">الحالة</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/40">
                      @for (emp of vm.reconciliationReport()!.employeeBalances; track emp.userId) {
                        <tr class="hover:bg-slate-900/30 transition-colors" [class.bg-rose-950\/10]="!emp.isClean">
                          <td class="px-4 py-3 font-semibold text-slate-200 font-cairo">{{ emp.fullName }}</td>
                          <td class="px-4 py-3 text-right font-mono text-amber-300">{{ emp.totalIssued | number:'1.2-2' }}</td>
                          <td class="px-4 py-3 text-right font-mono text-emerald-400">{{ emp.totalSettled | number:'1.2-2' }}</td>
                          <td class="px-4 py-3 text-right font-mono text-cyan-400">
                            @if (emp.totalReturnAmount > 0) {
                              {{ emp.totalReturnAmount | number:'1.2-2' }}
                            } @else {
                              <span class="text-slate-600">—</span>
                            }
                          </td>
                          <td class="px-4 py-3 text-right font-mono font-bold" [class.text-rose-400]="emp.balance > 0" [class.text-slate-300]="emp.balance === 0" [class.text-blue-400]="emp.balance < 0">{{ emp.balance | number:'1.2-2' }}</td>
                          <td class="px-4 py-3 text-center">
                            @if (emp.isClean) {
                              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">✅ مُصفَّى</span>
                            } @else if (emp.balance > 0) {
                              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 font-cairo">⚠️ دَيْن</span>
                            } @else {
                              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 font-cairo">💙 تعويض</span>
                            }
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }
            <p class="text-[11px] text-slate-600 text-center font-cairo">آخر تدقيق: {{ vm.reconciliationReport()!.generatedAt | apiDate:'dd/MM/yyyy HH:mm:ss' }}</p>
          </div>
        } @else if (!vm.isCloseoutLoading()) {
          <div class="text-center py-12 text-slate-500">
            <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p class="text-sm font-cairo">اضغط "تشغيل تدقيق الأرصدة" لتوليد تقرير المراجعة المالية الشاملة.</p>
          </div>
        }
      </div>
    }
  `
})
export class ProjectCloseoutTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
