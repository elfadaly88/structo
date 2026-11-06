import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { ProjectDetailsStore } from './project-details.store';

/** Settlements tab. */
@Component({
  selector: 'app-pd-tab-settlements',
  standalone: true,
  imports: [CommonModule, ApiDatePipe, DecimalPipe],
  template: `
    <!-- Tab Content: Settlements -->
    @if (vm.activeTab() === 'settlements') {
      <div class="space-y-4">
        <!-- Header Bar with Stats & Quick Actions -->
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-bold text-white font-cairo">طلبات تسوية العهد</h3>
              <p class="text-xs text-slate-400 font-cairo">متابعة ومطابقة فواتير ومصروفات العهد النقدية</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-xl text-xs font-bold font-cairo bg-slate-800 text-slate-300 border border-slate-700/60">
              {{ vm.settlements().length }} سجل / Records
            </span>
            @if (vm.settlements().length > 1) {
              <button
                type="button"
                (click)="vm.expandAllSettlements()"
                class="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-colors font-cairo cursor-pointer">
                توسيع الكل
              </button>
              <button
                type="button"
                (click)="vm.collapseAllSettlements()"
                class="px-2.5 py-1 text-xs font-medium rounded-lg text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 transition-colors font-cairo cursor-pointer">
                طي الكل
              </button>
            }
          </div>
        </div>

        @if (vm.isLoadingSettlements()) {
          <div class="flex flex-col items-center justify-center py-16 bg-slate-900/20 border border-slate-800/60 rounded-2xl">
            <svg class="animate-spin h-8 w-8 text-indigo-500 mb-3" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs text-slate-400 font-cairo font-medium">جاري تحميل طلبات التسوية...</span>
          </div>
        } @else {
          @if (vm.settlements().length === 0) {
            <div class="text-center py-16 px-4 bg-slate-900/20 border border-dashed border-slate-800/80 rounded-2xl">
              <div class="w-12 h-12 rounded-2xl bg-slate-800/60 text-slate-500 flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 class="text-sm font-bold text-slate-300 font-cairo mb-1">لا توجد طلبات تسوية مقدمة حالياً</h4>
              <p class="text-xs text-slate-500 font-cairo">No settlements submitted yet for this project.</p>
            </div>
          } @else {
            <!-- Accordion Cards List with High Visual Contrast & Clear Separation -->
            <div class="space-y-6 sm:space-y-8 font-cairo" dir="rtl">
              @for (item of vm.settlements(); track item.id) {
                <div class="bg-[#0b101d] border-2 border-slate-700/80 hover:border-slate-600 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xl"
                     [class.border-t-4]="true"
                     [class.border-t-emerald-500]="item.status === 'Approved'"
                     [class.border-t-amber-500]="item.status === 'ApprovedPendingRefund' || item.status === 'Pending'"
                     [class.border-t-rose-500]="item.status === 'Rejected'"
                     [class.border-t-cyan-500]="item.status === 'Refunded'"
                     [class.border-t-indigo-500]="item.status === 'Draft' || !item.status">

                  <!-- 1. Distinct Top Header Bar -->
                  <div class="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#131b2e] to-slate-900 border-b-2 border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div class="flex items-center gap-3.5 min-w-0">
                      <div class="w-11 h-11 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg shrink-0 shadow-sm">
                        👤
                      </div>
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <h4 class="text-sm sm:text-base font-bold text-white tracking-wide truncate">{{ item.engineerName || item.submittedBy || item.issuedTo || 'مهندس الموقع' }}</h4>
                          <span class="text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">تسوية عهدة</span>
                        </div>
                        <p class="text-xs text-slate-300 font-medium mt-1 truncate max-w-[280px] sm:max-w-md">{{ item.notes || item.description || item.custodyReason || 'تسوية مصاريف المشروع' }}</p>
                      </div>
                    </div>

                    <div class="flex items-center gap-2.5 flex-wrap">
                      @if (item.status === 'Draft') {
                        <span class="px-3 py-1 rounded-xl text-xs font-bold bg-slate-500/15 text-slate-300 border border-slate-500/30 flex items-center gap-1.5 shadow-sm">
                          <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                          مسودة
                        </span>
                      } @else if (item.status === 'Approved') {
                        <span class="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                          معتمد
                        </span>
                      } @else if (item.status === 'ApprovedPendingRefund') {
                        <span class="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                          بانتظار المرتجع
                        </span>
                      } @else if (item.status === 'Refunded') {
                        <span class="px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                          <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                          تم الاسترداد
                        </span>
                      } @else if (item.status === 'Rejected') {
                        <span class="px-3 py-1 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 shadow-sm">
                          <span class="w-2 h-2 rounded-full bg-rose-400"></span>
                          مرفوضة
                        </span>
                      } @else {
                        <span class="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                          {{ item.status || 'APPROVED' }}
                        </span>
                      }

                      @if (item.status === 'Pending' && vm.isOwnerOrAccountant()) {
                        <button
                          type="button"
                          (click)="$event.stopPropagation(); vm.onApproveSettlement(item.id)"
                          [disabled]="vm.project()?.status === 'Closed'"
                          class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-xl text-white font-cairo shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                          اعتماد
                        </button>
                        <button
                          type="button"
                          (click)="$event.stopPropagation(); vm.onRejectSettlement(item.id)"
                          [disabled]="vm.project()?.status === 'Closed'"
                          class="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-xs font-bold rounded-xl text-white font-cairo shadow-md shadow-rose-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                          رفض
                        </button>
                      }
                      @if (item.status === 'ApprovedPendingRefund' && vm.isOwnerOrAccountant()) {
                        <button
                          type="button"
                          (click)="$event.stopPropagation(); vm.onConfirmRefund(item.id)"
                          [disabled]="vm.project()?.status === 'Closed'"
                          class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-xs font-bold rounded-xl text-white font-cairo shadow-md shadow-amber-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                          تأكيد استلام المرتجع
                        </button>
                      }

                      <button type="button" 
                              (click)="$event.stopPropagation(); vm.printSettlement(item)" 
                              class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-sm">
                        <span>🖨️</span>
                        <span>طباعة</span>
                      </button>

                      <button type="button" 
                              (click)="$event.stopPropagation(); vm.toggleExpand(item.id)" 
                              class="w-9 h-9 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
                              [class.rotate-180]="vm.isExpanded(item.id)"
                              [title]="vm.isExpanded(item.id) ? 'إخفاء تفاصيل البنود' : 'عرض تفاصيل البنود'">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>
                      </button>
                    </div>
                  </div>

                  <!-- 2. Distinct Financial Summary Grid -->
                  <div class="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5 bg-[#070b14] border-b-2 border-slate-800">
                    <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-700/70 shadow-sm">
                      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">مبلغ العهدة</span>
                      <span class="text-sm sm:text-base font-bold text-white font-mono">EGP {{ item.custodyAmount | number:'1.0-2' }}</span>
                    </div>

                    <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-700/70 shadow-sm">
                      <span class="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider block mb-1">المصروف</span>
                      <span class="text-sm sm:text-base font-bold text-amber-400 font-mono">EGP {{ (item.spentAmount || item.totalAmount) | number:'1.0-2' }}</span>
                    </div>

                    <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-700/70 shadow-sm">
                      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">الفرق</span>
                      <span class="text-sm sm:text-base font-bold font-mono" 
                            [ngClass]="(item.difference ?? item.netDifference) === 0 ? 'text-slate-400' : (item.difference ?? item.netDifference) > 0 ? 'text-emerald-400' : 'text-rose-400'">
                        EGP {{ (item.difference ?? item.netDifference) | number:'1.0-2' }}
                      </span>
                    </div>

                    <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-700/70 shadow-sm">
                      <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">التاريخ / البنود</span>
                      <div class="flex items-center justify-between mt-0.5">
                        <span class="text-xs sm:text-sm font-semibold text-slate-300 font-mono" dir="ltr">
                          {{ (item.settlementDate || item.date || item.submittedAt || item.createdAt) | apiDate:'dd/MM/yyyy' }}
                        </span>
                        <span class="text-[11px] px-2.5 py-0.5 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-bold font-mono">
                          {{ item.lines?.length || 0 }} بنود
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- 3. Prominent Invoiced Lines Section (Accordion Body) -->
                  @if (vm.isExpanded(item.id)) {
                    <div class="p-4 sm:p-5 bg-[#080d1a] space-y-4">
                      <!-- Section Header Badge -->
                      <div class="flex items-center justify-between p-3 bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-sm">
                        <div class="flex items-center gap-2">
                          <span class="text-indigo-400 font-bold">📋</span>
                          <span class="text-xs sm:text-sm font-bold text-white font-cairo">تفاصيل البنود والفواتير المصروفة</span>
                        </div>
                        <span class="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-1 rounded-lg font-mono">
                          {{ item.lines?.length || 0 }} فواتير / بنود
                        </span>
                      </div>

                      @if (!item.lines || item.lines.length === 0) {
                        <div class="text-center py-6 bg-slate-900/40 border border-dashed border-slate-800 rounded-xl">
                          <p class="text-xs text-slate-400 font-cairo">لا توجد بنود مفصلة مضافة لهذه التسوية.</p>
                        </div>
                      } @else {
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                          @for (line of item.lines; track line.id || $index) {
                            <div class="p-4 bg-[#0d1424] border-2 border-slate-700/80 hover:border-indigo-500/50 rounded-xl flex flex-col justify-between gap-3.5 shadow-md transition-all">
                              <!-- Top: Description & Amount -->
                              <div class="flex items-start justify-between gap-2.5">
                                <div class="min-w-0 flex-1">
                                  <span class="text-xs sm:text-sm font-bold text-white block leading-relaxed" [title]="line.description || line.invoiceNumber">
                                    {{ line.description || line.invoiceNumber || 'بند مصروف' }}
                                  </span>
                                  @if (line.category) {
                                    <span class="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 mt-1.5 inline-block font-bold">
                                      {{ line.category }}
                                    </span>
                                  }
                                </div>
                                <div class="text-left shrink-0">
                                  <span class="text-xs sm:text-sm font-extrabold text-amber-400 font-mono tabular-nums block">
                                    EGP {{ line.amount | number:'1.0-2' }}
                                  </span>
                                </div>
                              </div>

                              <!-- Bottom: Responsibility & Invoice Link -->
                              <div class="flex items-center justify-between pt-2.5 border-t border-slate-800/90 text-xs">
                                <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm"
                                      [ngClass]="(line.expenseResponsibility === 'Company' || line.isBillableToClient === false) ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'">
                                  {{ (line.expenseResponsibility === 'Company' || line.isBillableToClient === false) ? '🔴 خسارة شركة' : '🟢 تحمّل عميل' }}
                                </span>

                                @if (line.invoiceUrl || line.receiptPhotoUrl) {
                                  <a [href]="line.invoiceUrl || line.receiptPhotoUrl" 
                                     target="_blank" 
                                     (click)="$event.stopPropagation()"
                                     class="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors shadow-sm">
                                    <span>عرض الفاتورة</span>
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                                  </a>
                                }
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          }
        }
      </div>
    }
  `
})
export class ProjectSettlementsTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
