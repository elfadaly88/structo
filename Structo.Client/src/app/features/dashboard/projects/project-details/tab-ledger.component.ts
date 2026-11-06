import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectDetailsStore } from './project-details.store';

/** Financial ledger (transactions) tab. */
@Component({
  selector: 'app-pd-tab-ledger',
  standalone: true,
  imports: [DecimalPipe, TranslatePipe],
  template: `
    @if (vm.activeTab() === 'transactions') {
      <!-- Ledger Section Wrapper -->
      <div class="w-full bg-[#0d1322] border border-slate-800 rounded-xl p-4 my-4 font-cairo">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-white">الدفتر العام</h3>
          <span class="text-xs text-slate-400 font-mono">{{ vm.transactions().length }} قيود</span>
        </div>

        @if (vm.isLoadingTransactions()) {
          <div class="flex justify-center py-12">
            <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <!-- Desktop Table (md and above) -->
          <div class="hidden md:block w-full overflow-x-auto">
            <table class="w-full text-right text-xs border-collapse font-sans">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 font-cairo">
                  <th class="py-3 px-2">التاريخ</th>
                  <th class="py-3 px-2">METHOD</th>
                  <th class="py-3 px-2">الوصف</th>
                  <th class="py-3 px-2 text-center">الحالة</th>
                  <th class="py-3 px-2 text-left">المبلغ</th>
                  <th class="py-3 px-2 text-center">RECEIPT</th>
                  <th class="py-3 px-2 text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                @for (tx of (vm.transactions?.() || vm.transactions || []); track (tx.id || $index)) {
                  <tr class="hover:bg-slate-800/30 transition-colors">
                    <!-- Date -->
                    <td class="py-3 px-2 whitespace-nowrap text-slate-300 font-mono">
                      {{ vm.formatTxDate(tx) }}
                    </td>

                    <!-- Method -->
                    <td class="py-3 px-2 whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 uppercase">
                        {{ tx.method || tx.paymentMethod || tx.PaymentMethod || 'CASH' }}
                      </span>
                    </td>

                    <!-- Description -->
                    <td class="py-3 px-2 text-white max-w-[200px] truncate font-cairo" [title]="tx.description || tx.Description || tx.notes || '-'">
                      {{ tx.description || tx.Description || tx.notes || '-' }}
                    </td>

                    <!-- Status / Type -->
                    <td class="py-3 px-2 text-center whitespace-nowrap">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold font-cairo"
                        [class.bg-emerald-950/60]="tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income'"
                        [class.text-emerald-400]="tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income'"
                        [class.bg-rose-950/60]="tx.type !== 'Income' && tx.Type !== 'Income' && tx.type !== 0 && tx.transactionType !== 'Income'"
                        [class.text-rose-400]="tx.type !== 'Income' && tx.Type !== 'Income' && tx.type !== 0 && tx.transactionType !== 'Income'">
                        {{ (tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income') ? 'إيراد' : 'مصروف' }}
                      </span>
                    </td>

                    <!-- Amount -->
                    <td class="py-3 px-2 text-left whitespace-nowrap font-mono font-bold"
                      [class.text-emerald-400]="tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income'"
                      [class.text-rose-400]="tx.type !== 'Income' && tx.Type !== 'Income' && tx.type !== 0 && tx.transactionType !== 'Income'">
                      {{ (tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income') ? '+' : '-' }}{{ (tx.amount ?? tx.Amount ?? tx.value ?? 0) | number:'1.2-2' }} <span class="text-[10px] text-slate-400">ج.م</span>
                    </td>

                    <!-- Receipt -->
                    <td class="py-3 px-2 text-center whitespace-nowrap">
                      @if (tx.receiptPhotoUrl || tx.ReceiptPhotoUrl || tx.receiptUrl || tx.invoiceUrl) {
                        <a [href]="tx.receiptPhotoUrl || tx.ReceiptPhotoUrl || tx.receiptUrl || tx.invoiceUrl" target="_blank" class="px-2 py-1 text-[11px] rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800 hover:bg-indigo-900 inline-block font-cairo">معاينة</a>
                      } @else {
                        <span class="text-slate-600">-</span>
                      }
                    </td>

                    <!-- Actions / Locked -->
                    <td class="py-3 px-2 text-center whitespace-nowrap">
                      @if (tx?.isLocked || tx?.IsLocked || tx?.isClosed || tx?.canEdit === false) {
                        <span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700 font-cairo">🔒 مقفلة</span>
                      } @else {
                        <div class="flex items-center justify-center gap-1 font-cairo">
                          <button (click)="vm.openEditTransactionModal(tx)" class="px-2 py-0.5 text-[10px] rounded bg-amber-950 text-amber-300 border border-amber-800">Edit</button>
                          <button (click)="vm.onDeleteTransaction(tx.id)" class="px-2 py-0.5 text-[10px] rounded bg-rose-950 text-rose-300 border border-rose-800">Delete</button>
                        </div>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="py-8 text-center text-slate-500 font-cairo">
                      {{ 'DETAILS.NO_TRANSACTIONS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards (sm and below) -->
          <div class="block md:hidden space-y-3 font-cairo">
            @for (tx of (vm.transactions?.() || vm.transactions || []); track (tx.id || $index)) {
              <div class="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-xs font-mono text-slate-400">{{ vm.formatTxDate(tx) }}</span>
                  <span class="font-mono font-bold text-sm" 
                    [class.text-emerald-400]="tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income'" 
                    [class.text-rose-400]="tx.type !== 'Income' && tx.Type !== 'Income' && tx.type !== 0 && tx.transactionType !== 'Income'">
                    {{ (tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income') ? '+' : '-' }}{{ (tx.amount ?? tx.Amount ?? tx.value ?? 0) | number:'1.2-2' }} ج.م
                  </span>
                </div>
                <p class="text-xs text-white break-words cursor-pointer hover:text-sky-400" (click)="vm.openTransactionInspectionModal(tx)">{{ tx.description || tx.Description || tx.notes || '-' }}</p>
                <div class="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                  <span class="px-2 py-0.5 rounded text-[10px]" 
                    [class.bg-emerald-950]="tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income'" 
                    [class.text-emerald-400]="tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income'" 
                    [class.bg-rose-950]="tx.type !== 'Income' && tx.Type !== 'Income' && tx.type !== 0 && tx.transactionType !== 'Income'" 
                    [class.text-rose-400]="tx.type !== 'Income' && tx.Type !== 'Income' && tx.type !== 0 && tx.transactionType !== 'Income'">
                    {{ (tx.type === 'Income' || tx.Type === 'Income' || tx.type === 0 || tx.transactionType === 'Income') ? 'إيراد' : 'مصروف' }}
                  </span>
                  @if (tx.receiptPhotoUrl || tx.ReceiptPhotoUrl || tx.receiptUrl || tx.invoiceUrl) {
                    <a [href]="tx.receiptPhotoUrl || tx.ReceiptPhotoUrl || tx.receiptUrl || tx.invoiceUrl" target="_blank" class="px-2 py-0.5 text-[10px] rounded bg-indigo-950 text-indigo-300 border border-indigo-800">معاينة الإيصال</a>
                  }
                  @if (tx?.isLocked || tx?.IsLocked || tx?.isClosed || tx?.canEdit === false || tx?.description?.toLowerCase()?.startsWith('petty cash settlement -')) {
                    <span class="text-[10px] text-slate-400">🔒 مقفلة</span>
                  } @else if (vm.isOwnerOrAccountant()) {
                    <div class="flex items-center gap-1">
                      <button (click)="vm.openEditTransactionModal(tx)" [disabled]="vm.project()?.status === 'Closed'" class="px-2 py-0.5 text-[10px] rounded bg-amber-950 text-amber-300 border border-amber-800 disabled:opacity-40">Edit</button>
                      <button (click)="vm.onDeleteTransaction(tx.id)" [disabled]="vm.isDeletingTransaction() || vm.project()?.status === 'Closed'" class="px-2 py-0.5 text-[10px] rounded bg-rose-950 text-rose-300 border border-rose-800 disabled:opacity-40">Delete</button>
                    </div>
                  }
                </div>
              </div>
            } @empty {
              <div class="py-8 text-center text-slate-500 text-sm font-cairo">
                {{ 'DETAILS.NO_TRANSACTIONS' | translate }}
              </div>
            }
          </div>
        }
      </div>
    }
  `
})
export class ProjectLedgerTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
