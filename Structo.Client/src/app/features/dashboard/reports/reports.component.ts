import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancialReportService } from '../../../core/services/financial-report.service';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { ProjectService } from '../../../core/services/project.service';
import { AuthService } from '../../../core/services/auth.service';
import { CompanyWideReportDto } from '../../../core/models/financial-report.models';
import { TenantDto } from '../../../core/services/public-directory.service';
import { ProjectDto } from '../../../core/models/project.models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 font-cairo">
      <!-- Page Header & Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl">
        <div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl font-bold">
              📊
            </div>
            <div>
              <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">التقارير المالية الموحدة / Financial Reports</h1>
              <p class="text-xs text-slate-400 mt-0.5">تقرير مالي رقابي شامل لكافة المشاريع والعمليات المعتمدة للشركة</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <button
            type="button"
            (click)="triggerPrint()"
            [disabled]="isLoading() || !reportData()"
            class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer shrink-0">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>طباعة التقرير / Print Report</span>
          </button>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <span class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <span>🔍</span>
            <span>تصفية وتحديد النطاق الزمني / Report Filters</span>
          </span>

          <div class="flex items-center gap-2">
            @if (startDate() || endDate() || selectedProjectId()) {
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                تم تطبيق فلاتر البحث
              </span>
            }
            <button
              type="button"
              (click)="resetToFullPeriod()"
              class="px-3 py-1 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer">
              الفترة الكاملة / Full Period
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Start Date -->
          <div class="space-y-1">
            <label class="block text-[11px] font-bold text-slate-400">من تاريخ / From Date</label>
            <div class="relative">
              <input
                type="date"
                [ngModel]="startDate()"
                (ngModelChange)="onStartDateChange($event)"
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono">
            </div>
          </div>

          <!-- End Date -->
          <div class="space-y-1">
            <label class="block text-[11px] font-bold text-slate-400">إلى تاريخ / To Date</label>
            <div class="relative">
              <input
                type="date"
                [ngModel]="endDate()"
                (ngModelChange)="onEndDateChange($event)"
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono">
            </div>
          </div>

          <!-- Project Filter Dropdown -->
          <div class="space-y-1 sm:col-span-2 lg:col-span-2">
            <label class="block text-[11px] font-bold text-slate-400">تخصيص المشروع (اختياري) / Specific Project</label>
            <select
              [ngModel]="selectedProjectId()"
              (ngModelChange)="onProjectFilterChange($event)"
              class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 font-cairo cursor-pointer">
              <option value="">جميع المشاريع المتاحة في النطاق / All In-Scope Projects</option>
              @for (proj of projectsList(); track proj.id) {
                <option [value]="proj.id">{{ proj.name }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      @if (isLoading()) {
        <div class="flex flex-col items-center justify-center py-20 bg-slate-900/20 border border-slate-800/60 rounded-2xl">
          <svg class="animate-spin h-8 w-8 text-indigo-500 mb-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-xs text-slate-400 font-medium">جاري استخراج وتحليل بيانات التقرير المالي الموحد...</span>
        </div>
      } @else if (errorMessage()) {
        <div class="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center space-y-2">
          <p class="text-sm font-bold text-rose-400">⚠️ {{ errorMessage() }}</p>
          <button
            type="button"
            (click)="loadReport()"
            class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200">
            إعادة المحاولة / Retry
          </button>
        </div>
      } @else if (reportData()) {
        <!-- Summary KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <!-- Total Budget -->
          <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
            <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">إجمالي الميزانيات</span>
            <p class="text-sm sm:text-base font-bold font-mono text-slate-100">{{ reportData()!.aggregatedTotals.totalBudget | number:'1.0-2' }}</p>
            <span class="text-[10px] text-slate-500 block">{{ reportData()!.aggregatedTotals.projectCount }} مشاريع</span>
          </div>

          <!-- Total Income -->
          <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
            <span class="text-[10px] text-emerald-400/90 font-bold uppercase tracking-wider block">إجمالي المقبوضات</span>
            <p class="text-sm sm:text-base font-bold font-mono text-emerald-400">+{{ reportData()!.aggregatedTotals.totalIncome | number:'1.0-2' }}</p>
            <span class="text-[10px] text-emerald-500/70 block">إيرادات / تمويل</span>
          </div>

          <!-- Total Expenses -->
          <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
            <span class="text-[10px] text-rose-400/90 font-bold uppercase tracking-wider block">إجمالي المصروفات</span>
            <p class="text-sm sm:text-base font-bold font-mono text-rose-400">-{{ reportData()!.aggregatedTotals.totalExpenses | number:'1.0-2' }}</p>
            <span class="text-[10px] text-rose-500/70 block">مصاريف مسجلة</span>
          </div>

          <!-- Net Balance -->
          <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
            <span class="text-[10px] text-sky-400/90 font-bold uppercase tracking-wider block">صافي السيولة النقدية</span>
            <p class="text-sm sm:text-base font-bold font-mono" [class.text-emerald-400]="reportData()!.aggregatedTotals.netBalance >= 0" [class.text-rose-400]="reportData()!.aggregatedTotals.netBalance < 0">
              {{ reportData()!.aggregatedTotals.netBalance | number:'1.0-2' }}
            </p>
            <span class="text-[10px] text-slate-500 block">فائض / عجز نقدي</span>
          </div>

          <!-- Outstanding Petty Cash -->
          <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
            <span class="text-[10px] text-amber-400/90 font-bold uppercase tracking-wider block">عهد معلقة بالموقع</span>
            <p class="text-sm sm:text-base font-bold font-mono text-amber-400">{{ reportData()!.aggregatedTotals.totalOutstandingPettyCash | number:'1.0-2' }}</p>
            <span class="text-[10px] text-amber-500/70 block">قيد التسوية</span>
          </div>

          <!-- Total Settlements -->
          <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
            <span class="text-[10px] text-indigo-400/90 font-bold uppercase tracking-wider block">تسويات معتمدة</span>
            <p class="text-sm sm:text-base font-bold font-mono text-indigo-300">{{ reportData()!.aggregatedTotals.totalSettlements | number:'1.0-2' }}</p>
            <span class="text-[10px] text-indigo-500/70 block">فواتير مطابقة</span>
          </div>
        </div>

        <!-- Section 1: Per-Project Breakdown -->
        <div class="bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl space-y-0">
          <div class="p-4 sm:p-5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">🏗️</span>
              <h2 class="text-sm sm:text-base font-bold text-white">التحليل المالي حسب المشروع / Project Breakdown</h2>
            </div>
            <span class="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              {{ reportData()!.projectBreakdowns.length }} مشاريع
            </span>
          </div>

          <!-- Desktop Table (hidden md:block) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-right text-xs">
              <thead class="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3.5">اسم المشروع</th>
                  <th class="p-3.5 text-center">الحالة</th>
                  <th class="p-3.5 text-left font-mono">الميزانية</th>
                  <th class="p-3.5 text-left font-mono text-emerald-400">الإيرادات</th>
                  <th class="p-3.5 text-left font-mono text-rose-400">المصروفات</th>
                  <th class="p-3.5 text-left font-mono">الصافي</th>
                  <th class="p-3.5 text-left font-mono text-amber-400">عهد معلقة</th>
                  <th class="p-3.5 text-left font-mono text-indigo-300">التسويات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                @for (p of reportData()!.projectBreakdowns; track p.projectId) {
                  <tr class="hover:bg-slate-800/30 transition-colors">
                    <td class="p-3.5 font-bold text-white">{{ p.projectName }}</td>
                    <td class="p-3.5 text-center">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                            [class.bg-emerald-500\/15]="p.status === 'Active'"
                            [class.text-emerald-400]="p.status === 'Active'"
                            [class.bg-amber-500\/15]="p.status === 'FinancialFreeze'"
                            [class.text-amber-400]="p.status === 'FinancialFreeze'"
                            [class.bg-slate-700\/40]="p.status === 'Closed'"
                            [class.text-slate-300]="p.status === 'Closed'">
                        {{ p.status }}
                      </span>
                    </td>
                    <td class="p-3.5 text-left font-mono font-semibold text-slate-300">{{ p.budget | number:'1.0-2' }}</td>
                    <td class="p-3.5 text-left font-mono font-bold text-emerald-400">+{{ p.totalIncome | number:'1.0-2' }}</td>
                    <td class="p-3.5 text-left font-mono font-bold text-rose-400">-{{ p.totalExpenses | number:'1.0-2' }}</td>
                    <td class="p-3.5 text-left font-mono font-bold" [class.text-emerald-400]="p.netBalance >= 0" [class.text-rose-400]="p.netBalance < 0">
                      {{ p.netBalance | number:'1.0-2' }}
                    </td>
                    <td class="p-3.5 text-left font-mono font-bold text-amber-400">{{ p.outstandingPettyCash | number:'1.0-2' }}</td>
                    <td class="p-3.5 text-left font-mono font-bold text-indigo-300">{{ p.totalSettlements | number:'1.0-2' }}</td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="8" class="p-8 text-center text-slate-500 text-xs">
                      لا توجد مشاريع في النطاق المحدد
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards (block md:hidden) -->
          <div class="block md:hidden p-3 space-y-3">
            @for (p of reportData()!.projectBreakdowns; track p.projectId) {
              <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-sm">
                <div class="flex items-center justify-between">
                  <h3 class="text-xs font-bold text-white">{{ p.projectName }}</h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        [class.bg-emerald-500\/15]="p.status === 'Active'"
                        [class.text-emerald-400]="p.status === 'Active'"
                        [class.bg-amber-500\/15]="p.status === 'FinancialFreeze'"
                        [class.text-amber-400]="p.status === 'FinancialFreeze'"
                        [class.bg-slate-700\/40]="p.status === 'Closed'"
                        [class.text-slate-300]="p.status === 'Closed'">
                    {{ p.status }}
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/80">
                  <div>
                    <span class="text-slate-500 block">الميزانية:</span>
                    <span class="font-mono font-bold text-slate-300">{{ p.budget | number:'1.0-2' }} ج.م</span>
                  </div>
                  <div>
                    <span class="text-slate-500 block">صافي السيولة:</span>
                    <span class="font-mono font-bold" [class.text-emerald-400]="p.netBalance >= 0" [class.text-rose-400]="p.netBalance < 0">
                      {{ p.netBalance | number:'1.0-2' }} ج.م
                    </span>
                  </div>
                  <div>
                    <span class="text-slate-500 block">إجمالي الدخل:</span>
                    <span class="font-mono font-bold text-emerald-400">+{{ p.totalIncome | number:'1.0-2' }} ج.م</span>
                  </div>
                  <div>
                    <span class="text-slate-500 block">إجمالي المصروف:</span>
                    <span class="font-mono font-bold text-rose-400">-{{ p.totalExpenses | number:'1.0-2' }} ج.م</span>
                  </div>
                  <div>
                    <span class="text-slate-500 block">عهد معلقة:</span>
                    <span class="font-mono font-bold text-amber-400">{{ p.outstandingPettyCash | number:'1.0-2' }} ج.م</span>
                  </div>
                  <div>
                    <span class="text-slate-500 block">التسويات المعتمدة:</span>
                    <span class="font-mono font-bold text-indigo-300">{{ p.totalSettlements | number:'1.0-2' }} ج.م</span>
                  </div>
                </div>
              </div>
            } @empty {
              <div class="p-6 text-center text-slate-500 text-xs">
                لا توجد مشاريع في النطاق المحدد
              </div>
            }
          </div>
        </div>

        <!-- Section 2: Combined Transactions Ledger -->
        <div class="bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl space-y-0">
          <div class="p-4 sm:p-5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">📖</span>
              <h2 class="text-sm sm:text-base font-bold text-white">دفتر العمليات المالية الموحد / Combined Ledger</h2>
            </div>
            <span class="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
              {{ reportData()!.combinedTransactions.length }} عملية
            </span>
          </div>

          <!-- Desktop Table (hidden md:block) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-right text-xs">
              <thead class="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="p-3.5">المشروع</th>
                  <th class="p-3.5">التاريخ</th>
                  <th class="p-3.5">النوع</th>
                  <th class="p-3.5">البيان / الوصف</th>
                  <th class="p-3.5 text-left font-mono">المبلغ</th>
                  <th class="p-3.5 text-center">طريقة الدفع</th>
                  <th class="p-3.5 text-center">الإيصال</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                @for (tx of reportData()!.combinedTransactions; track tx.id) {
                  <tr class="hover:bg-slate-800/30 transition-colors">
                    <td class="p-3.5 font-bold text-slate-200">
                      <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                        {{ tx.projectName }}
                      </span>
                    </td>
                    <td class="p-3.5 text-slate-400 font-mono">{{ tx.transactionDate | date:'dd/MM/yyyy' }}</td>
                    <td class="p-3.5">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold"
                            [class.bg-emerald-950\/60]="tx.type === 'Income'"
                            [class.text-emerald-400]="tx.type === 'Income'"
                            [class.bg-rose-950\/60]="tx.type !== 'Income'"
                            [class.text-rose-400]="tx.type !== 'Income'">
                        {{ tx.type === 'Income' ? 'إيراد' : 'مصروف' }}
                      </span>
                    </td>
                    <td class="p-3.5 text-slate-300 max-w-xs truncate" [title]="tx.description">{{ tx.description || '—' }}</td>
                    <td class="p-3.5 text-left font-mono font-bold"
                        [class.text-emerald-400]="tx.type === 'Income'"
                        [class.text-rose-400]="tx.type !== 'Income'">
                      {{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount | number:'1.2-2' }} ج.م
                    </td>
                    <td class="p-3.5 text-center font-mono text-[11px] text-slate-400">{{ tx.paymentMethod || '—' }}</td>
                    <td class="p-3.5 text-center">
                      @if (tx.receiptPhotoUrl) {
                        <a [href]="tx.receiptPhotoUrl" target="_blank" class="text-indigo-400 hover:text-indigo-300 underline text-[11px]">معاينة</a>
                      } @else {
                        <span class="text-slate-600">—</span>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="p-8 text-center text-slate-500 text-xs">
                      لا توجد عمليات مالية مسجلة في هذا النطاق
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards (block md:hidden) -->
          <div class="block md:hidden p-3 space-y-3">
            @for (tx of reportData()!.combinedTransactions; track tx.id) {
              <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold text-[11px]">
                    {{ tx.projectName }}
                  </span>
                  <span class="font-mono text-xs font-bold"
                        [class.text-emerald-400]="tx.type === 'Income'"
                        [class.text-rose-400]="tx.type !== 'Income'">
                    {{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount | number:'1.2-2' }} ج.م
                  </span>
                </div>

                <p class="text-xs text-slate-200 break-words">{{ tx.description || '—' }}</p>

                <div class="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>{{ tx.transactionDate | date:'dd/MM/yyyy' }}</span>
                  <div class="flex items-center gap-2">
                    <span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{{ tx.paymentMethod || 'CASH' }}</span>
                    @if (tx.receiptPhotoUrl) {
                      <a [href]="tx.receiptPhotoUrl" target="_blank" class="text-indigo-400 underline font-bold">إيصال</a>
                    }
                  </div>
                </div>
              </div>
            } @empty {
              <div class="p-6 text-center text-slate-500 text-xs">
                لا توجد عمليات مسجلة
              </div>
            }
          </div>
        </div>
      }
    </div>

    <!-- Hidden Enterprise Print View Container -->
    @if (activePrintReport()) {
      <div class="print-only hidden print:block p-8 bg-white text-slate-900 font-sans leading-relaxed" dir="rtl">
        <!-- Letterhead -->
        <div class="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
          <div class="flex items-center gap-4">
            @if (tenantProfile()?.logoUrl) {
              <img [src]="tenantProfile()!.logoUrl" alt="Logo" class="h-16 w-16 object-contain rounded-lg border border-slate-300 p-1">
            }
            <div>
              <h1 class="text-2xl font-black font-cairo text-slate-950">{{ tenantProfile()?.name || 'شركة المقاولات والتطوير العقاري' }}</h1>
              <p class="text-xs text-slate-600 font-cairo">تقرير الإدارة المالية الموحد • منصة أُسُس / Structo Enterprise</p>
            </div>
          </div>
          <div class="text-left font-cairo text-xs space-y-1">
            <p><strong>تاريخ الاستخراج:</strong> {{ activePrintReport()!.generatedAt | date:'dd/MM/yyyy HH:mm' }}</p>
            <p><strong>نطاق التاريخ:</strong> 
              {{ activePrintReport()!.dateRange.isFullPeriod ? 'الفترة الكاملة (كل السجلات)' : ((activePrintReport()!.dateRange.startDate | date:'dd/MM/yyyy') + ' إلى ' + (activePrintReport()!.dateRange.endDate | date:'dd/MM/yyyy')) }}
            </p>
            @if (activePrintReport()!.dateRange.filterProjectName) {
              <p><strong>المشروع المخصص:</strong> {{ activePrintReport()!.dateRange.filterProjectName }}</p>
            }
          </div>
        </div>

        <!-- KPI Totals Summary Table -->
        <div class="bg-slate-50 border border-slate-300 rounded-xl p-4 mb-6">
          <h2 class="text-sm font-bold font-cairo text-slate-800 mb-3">الملخص المالي العام / Financial Summary</h2>
          <div class="grid grid-cols-3 gap-4 text-center text-xs">
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">إجمالي الإيرادات</span>
              <span class="text-base font-bold font-mono text-emerald-700">+{{ activePrintReport()!.aggregatedTotals.totalIncome | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">إجمالي المصروفات</span>
              <span class="text-base font-bold font-mono text-rose-700">-{{ activePrintReport()!.aggregatedTotals.totalExpenses | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">صافي السيولة النقدية</span>
              <span class="text-base font-bold font-mono text-slate-900">{{ activePrintReport()!.aggregatedTotals.netBalance | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">إجمالي الميزانيات</span>
              <span class="text-base font-bold font-mono text-slate-800">{{ activePrintReport()!.aggregatedTotals.totalBudget | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">عهد معلقة بالمواقع</span>
              <span class="text-base font-bold font-mono text-amber-700">{{ activePrintReport()!.aggregatedTotals.totalOutstandingPettyCash | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">تسويات معتمدة</span>
              <span class="text-base font-bold font-mono text-indigo-700">{{ activePrintReport()!.aggregatedTotals.totalSettlements | number:'1.2-2' }} EGP</span>
            </div>
          </div>
        </div>

        <!-- Project Breakdown Section -->
        <div class="mb-6">
          <h2 class="text-sm font-bold font-cairo text-slate-800 mb-2">تفصيل المشاريع / Project Breakdown</h2>
          <table class="w-full text-right border-collapse text-xs">
            <thead>
              <tr class="bg-slate-100 border-b-2 border-slate-300 font-bold text-slate-700">
                <th class="py-2 px-2">المشروع</th>
                <th class="py-2 px-2 text-center">الحالة</th>
                <th class="py-2 px-2 text-left font-mono">الميزانية</th>
                <th class="py-2 px-2 text-left font-mono">الإيراد</th>
                <th class="py-2 px-2 text-left font-mono">المصروف</th>
                <th class="py-2 px-2 text-left font-mono">الصافي</th>
                <th class="py-2 px-2 text-left font-mono">عهد معلقة</th>
                <th class="py-2 px-2 text-left font-mono">تسويات</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (pb of activePrintReport()!.projectBreakdowns; track pb.projectId) {
                <tr>
                  <td class="py-2 px-2 font-semibold">{{ pb.projectName }}</td>
                  <td class="py-2 px-2 text-center text-[10px]">{{ pb.status }}</td>
                  <td class="py-2 px-2 text-left font-mono">{{ pb.budget | number:'1.0-2' }}</td>
                  <td class="py-2 px-2 text-left font-mono text-emerald-700">{{ pb.totalIncome | number:'1.0-2' }}</td>
                  <td class="py-2 px-2 text-left font-mono text-rose-700">{{ pb.totalExpenses | number:'1.0-2' }}</td>
                  <td class="py-2 px-2 text-left font-mono font-bold">{{ pb.netBalance | number:'1.0-2' }}</td>
                  <td class="py-2 px-2 text-left font-mono text-amber-700">{{ pb.outstandingPettyCash | number:'1.0-2' }}</td>
                  <td class="py-2 px-2 text-left font-mono text-indigo-700">{{ pb.totalSettlements | number:'1.0-2' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Combined Ledger Section -->
        <div class="mb-8">
          <h2 class="text-sm font-bold font-cairo text-slate-800 mb-2">دفتر العمليات المالية الموحد / Combined Ledger</h2>
          <table class="w-full text-right border-collapse text-xs">
            <thead>
              <tr class="bg-slate-100 border-b-2 border-slate-300 font-bold text-slate-700">
                <th class="py-2 px-2">المشروع</th>
                <th class="py-2 px-2">التاريخ</th>
                <th class="py-2 px-2">النوع</th>
                <th class="py-2 px-2">البيان</th>
                <th class="py-2 px-2 text-left font-mono">المبلغ</th>
                <th class="py-2 px-2 text-center">طريقة الدفع</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (tx of activePrintReport()!.combinedTransactions; track tx.id) {
                <tr>
                  <td class="py-2 px-2 font-medium">{{ tx.projectName }}</td>
                  <td class="py-2 px-2 font-mono text-slate-600">{{ tx.transactionDate | date:'dd/MM/yyyy' }}</td>
                  <td class="py-2 px-2 font-semibold" [class.text-emerald-700]="tx.type === 'Income'" [class.text-rose-700]="tx.type !== 'Income'">
                    {{ tx.type === 'Income' ? 'إيراد' : 'مصروف' }}
                  </td>
                  <td class="py-2 px-2 text-slate-700">{{ tx.description || '-' }}</td>
                  <td class="py-2 px-2 text-left font-mono font-bold" [class.text-emerald-700]="tx.type === 'Income'" [class.text-rose-700]="tx.type !== 'Income'">
                    {{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount | number:'1.2-2' }} EGP
                  </td>
                  <td class="py-2 px-2 text-center font-mono">{{ tx.paymentMethod || 'CASH' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Verification & Signature Stamp -->
        <div class="mt-10 pt-6 border-t border-slate-300 flex justify-between items-center text-xs text-slate-500 font-cairo">
          <div>
            <p><strong>المسؤول المالي المعتمد:</strong> {{ authService.currentUser()?.name || 'المحاسب المعتمد' }}</p>
            <p><strong>الصفة:</strong> {{ authService.currentUser()?.role || 'الإدارة المالية' }}</p>
          </div>
          <div class="text-center p-3 border-2 border-slate-400 rounded-xl bg-slate-50 min-w-[150px] font-mono font-bold text-slate-800">
            OFFICIAL FINANCIAL SEAL
          </div>
        </div>
      </div>
    }
  `
})
export class ReportsComponent implements OnInit {
  private readonly reportService = inject(FinancialReportService);
  private readonly profileService = inject(TenantProfileService);
  private readonly projectService = inject(ProjectService);
  protected readonly authService = inject(AuthService);

  readonly reportData = signal<CompanyWideReportDto | null>(null);
  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly startDate = signal<string>('');
  readonly endDate = signal<string>('');
  readonly selectedProjectId = signal<string>('');

  readonly projectsList = signal<{ id: string; name: string }[]>([]);
  readonly tenantProfile = signal<TenantDto | null>(null);
  readonly activePrintReport = signal<CompanyWideReportDto | null>(null);

  ngOnInit(): void {
    this.loadTenantProfile();
    this.loadProjectsDropdown();
    this.loadReport();
  }

  loadTenantProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.tenantProfile.set(res.data);
        }
      }
    });
  }

  loadProjectsDropdown(): void {
    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.projectsList.set(res.data.map((p: ProjectDto) => ({ id: p.id, name: p.name })));
        }
      }
    });
  }

  loadReport(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const sDate = this.startDate() || undefined;
    const eDate = this.endDate() || undefined;
    const pId = this.selectedProjectId() || undefined;

    this.reportService.getCompanyWideFullReport(sDate, eDate, pId).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.reportData.set(res.data);
        } else {
          this.errorMessage.set(res.message || 'فشل تحميل بيانات التقرير المالي.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || err.message || 'حدث خطأ أثناء استخراج التقرير المالي.');
      }
    });
  }

  onStartDateChange(val: string): void {
    this.startDate.set(val);
    this.loadReport();
  }

  onEndDateChange(val: string): void {
    this.endDate.set(val);
    this.loadReport();
  }

  onProjectFilterChange(val: string): void {
    this.selectedProjectId.set(val);
    this.loadReport();
  }

  resetToFullPeriod(): void {
    this.startDate.set('');
    this.endDate.set('');
    this.selectedProjectId.set('');
    this.loadReport();
  }

  triggerPrint(): void {
    const data = this.reportData();
    if (!data) return;

    this.activePrintReport.set(data);
    setTimeout(() => {
      window.print();
    }, 150);
  }
}
