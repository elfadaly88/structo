import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectDetailsStore } from './project-details.store';

/** Custody dialogs: request, approve, reject, edit, settle, settlement, direct disbursement, settlement print. */
@Component({
  selector: 'app-pd-custody-modals',
  standalone: true,
  imports: [ApiDatePipe, DecimalPipe, TranslatePipe, ReactiveFormsModule, FormsModule],
  template: `
    <!-- Settle Petty Cash Modal -->
    @if (vm.isSettleModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeSettleModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.settleForm" (ngSubmit)="vm.onSettleSubmit()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <div>
              <h3 class="text-lg font-bold text-white">{{ 'DETAILS.MODAL_SETTLE_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-0.5">{{ 'DETAILS.MODAL_SETTLE_SUBTITLE' | translate }}</p>
            </div>
            <button
              type="button"
              (click)="vm.closeSettleModal()"
              class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar font-sans">
            <!-- Voucher Info Card -->
            @if (vm.activePettyCash()) {
              <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div class="flex justify-between">
                  <span class="text-slate-500 font-cairo">{{ 'DETAILS.INFO_ISSUED_TO' | translate }}</span>
                  <span class="font-semibold text-white">{{ vm.activePettyCash()!.issuedTo || 'Staff' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 font-cairo">{{ 'DETAILS.INFO_ISSUED_AMOUNT' | translate }}</span>
                  <span class="font-bold text-amber-400 font-mono">{{ vm.activePettyCash()!.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-500 font-cairo">{{ 'DETAILS.INFO_REASON' | translate }}</span>
                  <span class="font-semibold text-right max-w-[200px] truncate text-slate-200">{{ vm.activePettyCash()!.reason }}</span>
                </div>
              </div>
            }

            <!-- Settle Errors -->
            @if (vm.settleErrors().length > 0) {
              <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 text-xs text-red-400 space-y-1 font-cairo">
                <span class="font-bold block mb-1">{{ 'DETAILS.SETTLE_FAILED' | translate }}</span>
                @for (err of vm.settleErrors(); track err) {
                  <div>• {{ err }}</div>
                }
              </div>
            }

            <div>
              <label for="spentAmount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'DETAILS.INPUT_SPENT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="spentAmount"
                type="number"
                formControlName="spentAmount"
                step="0.01"
                min="0"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-mono transition-all"
                placeholder="0.00">
              @if (vm.isSettleFieldInvalid('spentAmount')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  {{ 'DETAILS.INPUT_SPENT_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="receiptDescription" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'DETAILS.INPUT_NOTES' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="receiptDescription"
                formControlName="receiptDescription"
                rows="3"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none font-cairo transition-all"
                placeholder="مثال: شراء مستلزمات للموقع، حوافز عمال، فواتير نقل..."></textarea>
              @if (vm.isSettleFieldInvalid('receiptDescription')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  {{ 'DETAILS.INPUT_NOTES_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="expenseDate" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                تاريخ الصرف الفعلي <span class="text-red-400">*</span>
              </label>
              <div class="relative">
                <input
                  id="expenseDate"
                  type="text"
                  [value]="vm.formatDisplayDate(vm.settleForm.get('expenseDate')?.value)"
                  (input)="vm.onDateInputChanged($event, 'expenseDate', vm.settleForm)"
                  placeholder="DD/MM/YYYY"
                  class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-mono pr-10">
                <input
                  #expenseDatePicker
                  type="date"
                  [value]="vm.settleForm.get('expenseDate')?.value"
                  (change)="vm.onNativeDatePicked($event, 'expenseDate', vm.settleForm)"
                  class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  style="clip: rect(0,0,0,0);">
                <button
                  type="button"
                  (click)="vm.openDatePicker(expenseDatePicker)"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              @if (vm.isSettleFieldInvalid('expenseDate')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">Expense Date is required.</span>
              }
            </div>

            <div>
              <label for="settlementPaymentMethod" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                طريقة الدفع <span class="text-red-400">*</span>
              </label>
              <select
                id="settlementPaymentMethod"
                formControlName="settlementPaymentMethod"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-cairo transition-all">
                <option [ngValue]="null" disabled>اختر طريقة الدفع...</option>
                <option value="Cash">كاش (Cash)</option>
                <option value="InstaPay">إنستا باي (InstaPay)</option>
                <option value="BankTransfer">تحويل بنكي (Bank Transfer)</option>
                <option value="Cheque">شيك (Cheque)</option>
              </select>
              @if (vm.isSettleFieldInvalid('settlementPaymentMethod')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  Payment Method is required.
                </span>
              }
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                إرفاق الفاتورة / إيصال الصرف (اختياري)
              </label>
              <input
                type="file"
                (change)="vm.onSettleReceiptSelected($event)"
                accept="image/*,application/pdf"
                class="w-full px-3.5 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer font-cairo">
              @if (vm.isUploadingSettleReceipt()) {
                <span class="text-xs text-indigo-400 mt-1 flex items-center gap-2 font-cairo">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading receipt...
                </span>
              }
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button
              type="button"
              (click)="vm.closeSettleModal()"
              class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button
              type="submit"
              [disabled]="vm.settleForm.invalid || vm.isSettling()"
              class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isSettling()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{{ 'DETAILS.PROCESSING' | translate }}</span>
              } @else {
                <span>تأكيد التسوية</span>
              }
            </button>
          </div>
        </form>
      </div>
    }

    <!-- Request Petty Cash Modal -->
    @if (vm.isRequestModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeRequestModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.requestForm" (ngSubmit)="vm.onRequestSubmit()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <div>
              <h3 class="text-lg font-bold text-white">{{ 'DETAILS.MODAL_REQUEST_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-0.5">{{ 'DETAILS.MODAL_REQUEST_SUBTITLE' | translate }}</p>
            </div>
            <button
              type="button"
              (click)="vm.closeRequestModal()"
              class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar font-sans">
            <!-- Request Errors -->
            @if (vm.requestErrors().length > 0) {
              <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-3.5 text-xs text-red-400 space-y-1 font-cairo">
                <span class="font-bold block mb-1">{{ 'DETAILS.REQUEST_FAILED' | translate }}</span>
                @for (err of vm.requestErrors(); track err) {
                  <div>• {{ err }}</div>
                }
              </div>
            }

            <div>
              <label for="req-amount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'DETAILS.INPUT_AMOUNT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="req-amount"
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-mono transition-all"
                placeholder="0.00">
              @if (vm.isRequestFieldInvalid('amount')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  {{ 'DETAILS.INPUT_AMOUNT_ERR' | translate }}
                </span>
              }
              @if (vm.requestForm.get('amount')?.hasError('insufficientBalance')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  المبلغ المطلوب للعهدة أكبر من الرصيد المتاح في الصندوق المحدد! / The requested amount exceeds the available balance!
                </span>
              }
            </div>

            <div>
              <label for="req-reason" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'DETAILS.INPUT_REASON' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="req-reason"
                formControlName="reason"
                rows="3"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none font-cairo transition-all"
                placeholder="e.g. Scaffolding rental or site supplies purchase."></textarea>
              @if (vm.isRequestFieldInvalid('reason')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  {{ 'DETAILS.INPUT_REASON_ERR' | translate }}
                </span>
              }
            </div>

            @if (vm.isTenantOwner()) {
              <div>
                <label for="req-source" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                  Disburse From Pool <span class="text-red-400">*</span>
                </label>
                <select
                  id="req-source"
                  formControlName="sourcePoolId"
                  class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-cairo transition-all">
                  <option [ngValue]="null" disabled>Select funding source...</option>
                  @for (pool of vm.cashPools(); track pool.id) {
                    <option [value]="pool.id">{{ vm.getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)</option>
                  }
                </select>
                @if (vm.isRequestFieldInvalid('sourcePoolId')) {
                  <span class="text-xs text-red-400 mt-1 block font-cairo">Please select a funding source pool.</span>
                }
              </div>
            }
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button
              type="button"
              (click)="vm.closeRequestModal()"
              class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button
              type="submit"
              [disabled]="vm.requestForm.invalid || vm.isRequesting()"
              class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isRequesting()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{{ 'DETAILS.BTN_SUBMITTING' | translate }}</span>
              } @else {
                <span>{{ 'DETAILS.BTN_REQUEST_SUBMIT' | translate }}</span>
              }
            </button>
          </div>
        </form>
      </div>
    }
    <!-- Edit Petty Cash Modal -->
    @if (vm.isEditPettyCashModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeEditPettyCashModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.editPettyCashForm" (ngSubmit)="vm.submitEditPettyCash()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <h3 class="text-lg font-bold text-white">تعديل العهدة النقدية (Edit Petty Cash)</h3>
            <button type="button" (click)="vm.closeEditPettyCashModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar font-sans">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المبلغ <span class="text-red-400">*</span></label>
              <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">التصنيف <span class="text-red-400">*</span></label>
              <select formControlName="category" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-cairo">
                <option value="Cement">أسمنت</option>
                <option value="Logistics">خدمات لوجستية</option>
                <option value="Materials">مواد بناء</option>
                <option value="Labor">حوافز وأجور عمال</option>
                <option value="Other">أخرى</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">السبب <span class="text-red-400">*</span></label>
              <textarea formControlName="reason" rows="3" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-cairo"></textarea>
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button type="button" (click)="vm.closeEditPettyCashModal()" class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button type="submit" [disabled]="vm.editPettyCashForm.invalid || vm.isEditingPettyCash()" class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isEditingPettyCash()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              }
              <span>حفظ التغيرات</span>
            </button>
          </div>
        </form>
      </div>
    }

    <!-- Approve & Disburse Petty Cash Modal -->
    @if (vm.isApproveModalOpen() && vm.selectedApprovePettyCash()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-cairo">
        <div (click)="vm.closeApprovePettyCashModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10">

          <!-- Header -->
          <div class="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-base">
                ⚡
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white leading-tight">اعتماد وصرف العهدة</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">تأكيد الموافقة وصرف المبلغ من محفظة التمويل</p>
              </div>
            </div>
            <button type="button" (click)="vm.closeApprovePettyCashModal()" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-5 space-y-4 overflow-y-auto min-h-0 custom-scrollbar">
            <!-- Item Details Summary -->
            <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">المصروف إليه:</span>
                <span class="font-bold text-white">{{ vm.selectedApprovePettyCash()!.issuedTo || 'Staff' }}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">المبلغ المطلوب:</span>
                <span class="font-bold text-amber-400 font-mono text-sm tabular-nums">{{ vm.selectedApprovePettyCash()!.amount | number:'1.2-2' }} ج.م</span>
              </div>
              <div class="flex items-start justify-between text-xs pt-1.5 border-t border-slate-800/60">
                <span class="text-slate-400 shrink-0">بيان العهدة:</span>
                <span class="text-slate-200 text-left font-medium max-w-[240px]">{{ vm.selectedApprovePettyCash()!.reason }}</span>
              </div>
            </div>

            <!-- Select Pool -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-300">
                محفظة الصرف <span class="text-rose-400">*</span>
              </label>
              <select [(ngModel)]="vm.selectedApprovePoolId" 
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-cairo">
                <option value="" disabled selected>-- اختر محفظة الصرف --</option>
                @for (pool of vm.cashPools(); track pool.id) {
                  <option [value]="pool.id" [disabled]="pool.availableBalance < vm.selectedApprovePettyCash()!.amount">
                    {{ vm.getPoolSourceLabel(pool.sourceType) }} (الرصيد المتاح: {{ pool.availableBalance | number:'1.0-0' }} ج.م)
                  </option>
                }
              </select>
              @if (vm.selectedApprovePoolId() && vm.getSelectedPoolAvailableBalance() < vm.selectedApprovePettyCash()!.amount) {
                <p class="text-[11px] text-rose-400 font-medium">⚠️ رصيد هذه المحفظة غير كافٍ لتغطية مبلغ العهدة.</p>
              }
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-2.5">
            <button
              type="button"
              (click)="vm.closeApprovePettyCashModal()"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              إلغاء
            </button>
            <button
              type="button"
              (click)="vm.submitApprovePettyCash()"
              [disabled]="!vm.selectedApprovePoolId() || vm.isLoadingPettyCash() || (vm.getSelectedPoolAvailableBalance() < vm.selectedApprovePettyCash()!.amount)"
              class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer">
              @if (vm.isLoadingPettyCash()) {
                <span class="animate-spin text-xs">⏳</span>
              }
              <span>تأكيد الصرف والاعتماد</span>
            </button>
          </div>

        </div>
      </div>
    }

    <!-- Reject Petty Cash Modal -->
    @if (vm.isRejectModalOpen() && vm.selectedRejectPettyCash()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-cairo">
        <div (click)="vm.closeRejectPettyCashModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10">

          <!-- Header -->
          <div class="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-base">
                ❌
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white leading-tight">رفض طلب العهدة</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">يرجى توضيح سبب الرفض ليظهر للموظف</p>
              </div>
            </div>
            <button type="button" (click)="vm.closeRejectPettyCashModal()" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-5 space-y-4 overflow-y-auto min-h-0 custom-scrollbar">
            <!-- Item Details Summary -->
            <div class="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">المصروف إليه:</span>
                <span class="font-bold text-white">{{ vm.selectedRejectPettyCash()!.issuedTo || 'Staff' }}</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">المبلغ المطلوب:</span>
                <span class="font-bold text-amber-400 font-mono text-sm tabular-nums">{{ vm.selectedRejectPettyCash()!.amount | number:'1.2-2' }} ج.م</span>
              </div>
              <div class="flex items-start justify-between text-xs pt-1.5 border-t border-slate-800/60">
                <span class="text-slate-400 shrink-0">بيان العهدة:</span>
                <span class="text-slate-200 text-left font-medium max-w-[240px]">{{ vm.selectedRejectPettyCash()!.reason }}</span>
              </div>
            </div>

            <!-- Rejection Reason Input -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-300">
                سبب الرفض <span class="text-rose-400">*</span>
              </label>
              <textarea 
                [ngModel]="vm.rejectionReasonText()" 
                (ngModelChange)="vm.rejectionReasonText.set($event)"
                rows="3" 
                placeholder="اكتب سبب رفض طلب العهدة لتوضيحه للموظف..."
                class="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500 font-cairo resize-none"></textarea>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-2.5">
            <button
              type="button"
              (click)="vm.closeRejectPettyCashModal()"
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              إلغاء
            </button>
            <button
              type="button"
              (click)="vm.submitRejectPettyCash()"
              [disabled]="!vm.rejectionReasonText().trim() || vm.isLoadingPettyCash()"
              class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-rose-600/20 transition-all flex items-center gap-1.5 cursor-pointer">
              @if (vm.isLoadingPettyCash()) {
                <span class="animate-spin text-xs">⏳</span>
              }
              <span>تأكيد الرفض</span>
            </button>
          </div>

        </div>
      </div>
    }
    <!-- Direct Disbursement Modal -->
    @if (vm.isDisburseModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeDisburseModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.disburseForm" (ngSubmit)="vm.onDisburseSubmit()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <h3 class="text-lg font-bold text-white">تعزيز عهدة مباشر</h3>
            <button type="button" (click)="vm.closeDisburseModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar font-sans">
            @if (vm.disburseErrors().length > 0) {
              <div class="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold font-cairo">
                @for (err of vm.disburseErrors(); track err) {
                  <div>{{ err }}</div>
                }
              </div>
            }

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المهندس <span class="text-slate-500 text-[10px] normal-case">(اختياري — إذا فارغ، ستُسجل العهدة لحسابك)</span></label>
              <select formControlName="userId" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-cairo">
                <option [ngValue]="null">-- لنفسي (الأدمن الحالي) --</option>
                @for (u of vm.usersList(); track u.id) {
                  <option [value]="u.id">{{ u.firstName }} {{ u.lastName }} ({{ u.role }})</option>
                }
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المبلغ <span class="text-red-400">*</span></label>
                <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">طريقة الدفع <span class="text-red-400">*</span></label>
                <select formControlName="paymentMethod" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-cairo">
                  <option value="Cash">نقدي</option>
                  <option value="BankTransfer">تحويل بنكي</option>
                  <option value="InstaPay">InstaPay</option>
                  <option value="Cheque">شيك</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">مصدر التمويل <span class="text-red-400">*</span></label>
              <select formControlName="sourcePoolId" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-cairo">
                <option [ngValue]="null" disabled>اختر الصندوق</option>
                @for (pool of vm.cashPools(); track pool.id) {
                  <option [value]="pool.id">{{ vm.getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">البيان <span class="text-red-400">*</span></label>
              <textarea formControlName="description" rows="2" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-cairo"></textarea>
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button type="button" (click)="vm.closeDisburseModal()" class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button type="submit" [disabled]="vm.disburseForm.invalid || vm.isDisbursing()" class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isDisbursing()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>جاري التحويل...</span>
              } @else {
                <span>تأكيد التحويل</span>
              }
            </button>
          </div>
        </form>
      </div>
    }

    <!-- Settlement Modal (Refactored Inline Dynamic Table) -->
    <!-- Settlement Modal (Refactored Inline Dynamic Table) -->
    @if (vm.isSettlementModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeSettlementModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-4xl bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">

          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <div>
              <h3 class="text-lg font-bold text-white">تسوية عهدة</h3>
              <p class="text-xs text-slate-400 mt-0.5">
                بيان العهدة: <span class="text-slate-200 font-bold">{{ vm.selectedPettyCashForSettlement()?.reason }}</span>
              </p>
            </div>
            <button type="button" (click)="vm.closeSettlementModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <form [formGroup]="vm.settlementForm" class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar flex flex-col font-sans">
            @if (vm.settlementErrors().length > 0) {
              <div class="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold shrink-0 font-cairo">
                @for (err of vm.settlementErrors(); track err) {
                  <div>{{ err }}</div>
                }
              </div>
            }

            <!-- 1️⃣ Sticky Petty Cash Live Calculation Summary -->
            <div class="bg-slate-950/80 border border-slate-800 p-3 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs shadow-md shrink-0 font-cairo">
              <div class="flex items-center gap-2.5 bg-slate-900/60 rounded-lg px-3 py-2.5 border border-slate-800/60">
                <span class="text-amber-400 text-base">🟡</span>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-500 font-semibold">إجمالي العهدة الصادرة</span>
                  <span class="font-mono font-bold text-amber-400 text-sm">{{ vm.selectedPettyCashForSettlement()?.amount | number:'1.2-2' }} EGP</span>
                </div>
              </div>

              <div class="flex items-center gap-2.5 bg-slate-900/60 rounded-lg px-3 py-2.5 border border-slate-800/60">
                <span class="text-sky-400 text-base">🔵</span>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-500 font-semibold">إجمالي البنود المصروفة</span>
                  <span class="font-mono font-bold text-sky-400 text-sm">{{ vm.calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                </div>
              </div>

              <div class="flex items-center gap-2.5 bg-slate-900/60 rounded-lg px-3 py-2.5 border border-slate-800/60">
                @let remBal = (vm.selectedPettyCashForSettlement()!.amount - vm.calculateSettlementTotal());
                <span class="text-base">{{ remBal >= 0 ? '🟢' : '🟠' }}</span>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-500 font-semibold">الرصيد المتبقي</span>
                  <span [class]="remBal >= 0 ? 'font-mono font-bold text-emerald-400 text-sm' : 'font-mono font-bold text-amber-400 text-sm'">
                    {{ remBal | number:'1.2-2' }} EGP
                  </span>
                </div>
              </div>
            </div>

            <!-- 2️⃣ Spacious 2-Row Dynamic Line Cards (Desktop Viewport - md+) -->
            <div formArrayName="lines" class="hidden md:block space-y-3 shrink-0">
              @for (line of vm.settlementLines.controls; track line; let idx = $index) {
                <div [formGroupName]="idx" class="p-3.5 bg-slate-950/70 hover:bg-slate-950 border border-slate-800/90 hover:border-slate-700/80 rounded-xl transition-all shadow-sm space-y-3 font-cairo">
                  <!-- Row 1: Item #, Category, Amount, Billable Toggle, Delete -->
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      #{{ idx + 1 }}
                    </div>

                    <!-- Category -->
                    <div class="w-48 shrink-0">
                      <select formControlName="category" class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-cairo cursor-pointer">
                        <option value="Cement">أسمنت</option>
                        <option value="Logistics">خدمات لوجستية</option>
                        <option value="Materials">مواد بناء</option>
                        <option value="Labor">حوافز وأجور عمال</option>
                        <option value="Other">أخرى</option>
                      </select>
                    </div>

                    <!-- Amount -->
                    <div class="w-48 shrink-0 relative">
                      <input type="number" formControlName="amount" placeholder="0.00" class="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-12 pr-3 py-2 text-xs text-amber-400 font-mono font-bold focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 font-bold pointer-events-none">ج.م</span>
                    </div>

                    <!-- Billable to Client Toggle -->
                    <div class="flex items-center gap-1.5 shrink-0 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                      <button type="button" (click)="line.get('isBillableToClient')?.setValue(true)" [class]="line.get('isBillableToClient')?.value ? 'px-3 py-1 rounded-md text-xs font-bold border transition-all font-cairo bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm' : 'px-3 py-1 rounded-md text-xs font-medium border border-transparent text-slate-400 hover:text-emerald-400 cursor-pointer'">
                        🟢 عميل
                      </button>
                      <button type="button" (click)="line.get('isBillableToClient')?.setValue(false)" [class]="!line.get('isBillableToClient')?.value ? 'px-3 py-1 rounded-md text-xs font-bold border transition-all font-cairo bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-sm' : 'px-3 py-1 rounded-md text-xs font-medium border border-transparent text-slate-400 hover:text-rose-400 cursor-pointer'">
                        🔴 شركة
                      </button>
                    </div>

                    <!-- Delete Button -->
                    <div class="ms-auto shrink-0">
                      @if (!vm.isSettlementLocked()) {
                        <button type="button" (click)="vm.removeSettlementLine(idx)" class="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-rose-500/20 disabled:opacity-30 disabled:cursor-not-allowed" [disabled]="vm.settlementLines.length === 1" title="حذف هذا البند">
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      }
                    </div>
                  </div>

                  <!-- Row 2: Description (Wide full space) & File / Receipt Attachment -->
                  <div class="flex items-center gap-3 pt-2.5 border-t border-slate-800/70">
                    <!-- Description / Invoice Details -->
                    <div class="flex-1 min-w-0">
                      <input type="text" formControlName="description" placeholder="البيان، تفاصيل الشراء، أو رقم الفاتورة..." class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-cairo">
                    </div>

                    <!-- Receipt File Picker -->
                    <div class="shrink-0 flex items-center gap-2 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
                      <label class="cursor-pointer px-3 py-1.5 rounded-md bg-indigo-600/10 hover:bg-indigo-600/20 text-xs font-bold text-indigo-400 border border-indigo-500/30 inline-flex items-center gap-1.5 transition-all font-cairo">
                        <span>📎</span>
                        <span>إرفاق إيصال / ملف</span>
                        <input type="file" accept="image/*,application/pdf,.xlsx,.xls" [disabled]="vm.isSettlementLocked()" (change)="vm.onSettlementLineFileSelected($event, idx)" class="hidden">
                      </label>
                      @if (line.get('localPreviewUrl')?.value) {
                        <div (click)="vm.activePreviewPhotoUrl.set(line.get('localPreviewUrl')?.value)" class="w-8 h-8 rounded-md overflow-hidden border border-indigo-500/40 bg-slate-900 cursor-pointer hover:scale-105 transition-transform shrink-0 shadow-sm" title="معاينة الإيصال">
                          <img [src]="line.get('localPreviewUrl')?.value" class="w-full h-full object-cover">
                        </div>
                      }
                      @if (line.get('uploading')?.value) {
                        <span class="text-[11px] text-indigo-400 animate-pulse font-cairo px-1">جاري الرفع...</span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- 3️⃣ Responsive Mobile Card Layout (block md:hidden) -->
            <div formArrayName="lines" class="block md:hidden space-y-3 shrink-0">
              @for (line of vm.settlementLines.controls; track line; let idx = $index) {
                <details [open]="idx === vm.settlementLines.length - 1" class="group bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-cairo shadow-md">
                  <summary class="flex items-center justify-between p-3 bg-slate-900/90 cursor-pointer select-none">
                    <div class="flex items-center gap-2">
                      <span class="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-xs font-bold font-mono">#{{ idx + 1 }}</span>
                      <span class="text-xs font-bold text-white truncate max-w-[140px]">{{ line.get('description')?.value || line.get('category')?.value || 'بند جديد' }}</span>
                    </div>
                    <div class="flex items-center gap-2.5">
                      <span class="text-xs font-mono font-bold text-emerald-400">{{ line.get('amount')?.value || 0 | number:'1.2-2' }} EGP</span>
                      <span class="text-slate-400 transition-transform group-open:rotate-180 text-[10px]">▼</span>
                    </div>
                  </summary>

                  <div [formGroupName]="idx" class="p-3.5 space-y-3 border-t border-slate-800/80 bg-slate-900/40">
                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1">التصنيف</label>
                      <select formControlName="category" class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                        <option value="Cement">أسمنت</option>
                        <option value="Logistics">خدمات لوجستية</option>
                        <option value="Materials">مواد بناء</option>
                        <option value="Labor">حوافز وأجور عمال</option>
                        <option value="Other">أخرى</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1">البيان / رقم الفاتورة</label>
                      <input type="text" formControlName="description" placeholder="الوصف أو رقم الفاتورة..." class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                    </div>

                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1">المبلغ المصروف</label>
                      <input type="number" formControlName="amount" placeholder="0.00" class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500">
                    </div>

                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1">إيصال الفاتورة</label>
                      <div class="flex items-center gap-2">
                        <label class="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-400 border border-slate-700 inline-flex items-center gap-1">
                          <span>📎</span>
                          <span>اختر ملف</span>
                          <input type="file" accept="image/*,application/pdf,.xlsx,.xls" [disabled]="vm.isSettlementLocked()" (change)="vm.onSettlementLineFileSelected($event, idx)" class="hidden">
                        </label>
                        @if (line.get('localPreviewUrl')?.value) {
                          <div (click)="vm.activePreviewPhotoUrl.set(line.get('localPreviewUrl')?.value)" class="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer shrink-0">
                            <img [src]="line.get('localPreviewUrl')?.value" class="w-full h-full object-cover">
                          </div>
                        }
                        @if (line.get('uploading')?.value) {
                          <span class="text-[10px] text-indigo-400 animate-pulse">جاري الرفع...</span>
                        }
                      </div>
                    </div>

                    <div>
                      <label class="block text-[11px] font-bold text-slate-400 mb-1.5">تحمّل البند</label>
                      <div class="flex gap-2">
                        <button type="button" (click)="line.get('isBillableToClient')?.setValue(true)" [class]="line.get('isBillableToClient')?.value ? 'flex-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all font-cairo bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_6px_rgba(16,185,129,0.15)]' : 'flex-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all font-cairo bg-slate-900 text-slate-500 border-slate-700/50 hover:text-emerald-400 cursor-pointer'">
                          🟢 يُحمّل على العميل
                        </button>
                        <button type="button" (click)="line.get('isBillableToClient')?.setValue(false)" [class]="!line.get('isBillableToClient')?.value ? 'flex-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all font-cairo bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-[0_0_6px_rgba(244,63,94,0.15)]' : 'flex-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all font-cairo bg-slate-900 text-slate-500 border-slate-700/50 hover:text-rose-400 cursor-pointer'">
                          🔴 خسارة شركة
                        </button>
                      </div>
                    </div>

                    @if (!vm.isSettlementLocked()) {
                      <div class="flex justify-end pt-1">
                        <button type="button" (click)="vm.removeSettlementLine(idx)" class="px-3 py-1.5 text-[11px] font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1" [disabled]="vm.settlementLines.length === 1">
                          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          حذف البند
                        </button>
                      </div>
                    }
                  </div>
                </details>
              }
            </div>

            <!-- Add Row Button -->
            @if (!vm.isSettlementLocked()) {
              <button type="button" (click)="vm.addSettlementLine()" class="w-full py-2.5 text-xs font-bold text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-dashed border-indigo-500/30 hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer font-cairo flex items-center justify-center gap-1.5 shrink-0">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                إضافة فاتورة / بند جديد
              </button>
            }

            <!-- Ledger summary & Net calculation -->
            <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 shrink-0 font-cairo">
              <div class="flex justify-between text-xs text-slate-400">
                <span>إجمالي مبلغ العهدة الأصلي:</span>
                <span class="font-mono font-semibold text-slate-300">{{ vm.selectedPettyCashForSettlement()?.amount | number:'1.2-2' }} EGP</span>
              </div>
              <div class="flex justify-between text-xs text-slate-400">
                <span>إجمالي المبالغ المصروفة بالفواتير:</span>
                <span class="font-mono font-semibold text-amber-400">{{ vm.calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
              </div>
              <div class="border-t border-slate-800/80 pt-2 flex justify-between text-sm font-bold">
                @if (vm.selectedPettyCashForSettlement()!.amount - vm.calculateSettlementTotal() > 0) {
                  <span class="text-emerald-400">متبقي يجب إرجاعه للخزينة:</span>
                  <span class="text-emerald-400 font-mono">+{{ vm.selectedPettyCashForSettlement()!.amount - vm.calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                } @else if (vm.selectedPettyCashForSettlement()!.amount - vm.calculateSettlementTotal() < 0) {
                  <span class="text-rose-400">مستحق للمهندس:</span>
                  <span class="text-rose-400 font-mono">{{ vm.selectedPettyCashForSettlement()!.amount - vm.calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                } @else {
                  <span class="text-slate-300">تسوية متطابقة تماماً:</span>
                  <span class="text-slate-300 font-mono">0.00 EGP</span>
                }
              </div>
            </div>
          </form>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex flex-col sm:flex-row justify-between items-center gap-3 flex-shrink-0 font-cairo">
            <button type="button" (click)="vm.closeSettlementModal()" class="w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer">إغلاق</button>

            @if (!vm.isSettlementLocked()) {
              <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button type="button" (click)="vm.onSettlementSubmit(true)" [disabled]="vm.settlementForm.invalid || vm.isSubmittingSettlement()" class="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 transition-all cursor-pointer">
                  @if (vm.isSubmittingSettlement()) {
                    جاري الحفظ...
                  } @else {
                    💾 حفظ كمسودة
                  }
                </button>

                <button type="button" (click)="vm.onSettlementSubmit(false)" [disabled]="vm.settlementForm.invalid || vm.isSubmittingSettlement()" class="w-full sm:w-auto px-6 py-2.5 text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 transition-all cursor-pointer">
                  @if (vm.isSubmittingSettlement()) {
                    جاري التقديم...
                  } @else {
                    🚀 تقديم للمراجعة النهائية
                  }
                </button>
              </div>
            }
          </div>

          <!-- Image Preview Lightbox Modal -->
          @if (vm.activePreviewPhotoUrl()) {
            <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div (click)="vm.activePreviewPhotoUrl.set(null)" class="absolute inset-0"></div>
              <div class="relative max-w-4xl max-h-[85vh] z-10">
                <button (click)="vm.activePreviewPhotoUrl.set(null)" class="absolute -top-12 right-0 text-white/80 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img [src]="vm.activePreviewPhotoUrl()" class="max-w-full max-h-[80vh] rounded-2xl object-contain border border-slate-750 shadow-2xl">
              </div>
            </div>
          }
        </div>
      </div>
    }

    <!-- Hidden Print Layout -->
    @if (vm.activePrintSettlement()) {
      <div class="print-only hidden print:block p-8 bg-white text-slate-900 font-sans leading-relaxed" dir="rtl">
        <!-- Report Header -->
        <div class="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 class="text-2xl font-extrabold font-cairo">تقرير تسوية عهدة مشروع</h1>
          <h2 class="text-lg font-bold text-slate-600 font-cairo mt-1">منصة أسس لإدارة المشاريع</h2>
        </div>

        <!-- Project & Custody details -->
        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p><strong>اسم المشروع</strong> {{ vm.project()?.name }}</p>
            <p><strong>صاحب العهدة (المهندس)</strong> {{ vm.activePrintSettlement()!.issuedTo }}</p>
            <p><strong>سبب العهدة</strong> {{ vm.activePrintSettlement()!.custodyReason }}</p>
          </div>
          <div class="text-left rtl:text-right">
            <p><strong>تاريخ التقديم</strong> {{ vm.activePrintSettlement()!.submittedAt | apiDate:'dd/MM/yyyy HH:mm' }}</p>
            <p><strong>حالة التسوية</strong> {{ vm.activePrintSettlement()!.status }}</p>
            <p><strong>رقم التسوية</strong> {{ vm.activePrintSettlement()!.id }}</p>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-slate-100 p-4 rounded-xl mb-6 grid grid-cols-3 gap-4 text-center border border-slate-300">
          <div>
            <span class="text-xs text-slate-500 font-semibold block">قيمة العهدة المستلمة</span>
            <span class="text-lg font-bold font-mono">{{ vm.activePrintSettlement()!.custodyAmount | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-semibold block">المبلغ المصروف فعلياً</span>
            <span class="text-lg font-bold font-mono text-amber-600">{{ vm.activePrintSettlement()!.totalAmount | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-semibold block">المبلغ المستحق (الفرق)</span>
            <span class="text-lg font-bold font-mono" [class.text-emerald-600]="vm.activePrintSettlement()!.netDifference > 0" [class.text-rose-600]="vm.activePrintSettlement()!.netDifference < 0">
              {{ vm.activePrintSettlement()!.netDifference | number:'1.2-2' }} EGP
            </span>
          </div>
        </div>

        <!-- Itemized Line Items -->
        <div class="mb-6">
          <h3 class="text-base font-bold mb-3 font-cairo">تفاصيل البنود والمصاريف الفردية</h3>
          <table class="w-full text-right border-collapse text-sm">
            <thead>
              <tr class="border-b-2 border-slate-300 text-slate-700 font-bold">
                <th class="py-2 px-2">التصنيف</th>
                <th class="py-2 px-2">الوصف</th>
                <th class="py-2 px-2 text-left rtl:text-right">المبلغ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (line of vm.activePrintSettlement()!.lines; track line.id) {
                <tr class="text-slate-800">
                  <td class="py-2 px-2 font-medium">{{ 'FINANCE.CATEGORY_' + line.category.toUpperCase() | translate }}</td>
                  <td class="py-2 px-2 text-slate-600">{{ line.description }}</td>
                  <td class="py-2 px-2 text-left rtl:text-right font-mono font-semibold">{{ line.amount | number:'1.2-2' }} EGP</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Verification Stamp -->
        <div class="mt-12 flex justify-between items-center text-xs text-slate-400 border-t border-slate-200 pt-6">
          <div>
            <p><strong>المراجع</strong> {{ vm.activePrintSettlement()!.resolvedBy || '—' }}</p>
            <p><strong>تاريخ الاعتماد</strong> {{ vm.activePrintSettlement()!.resolvedAt | apiDate:'dd/MM/yyyy HH:mm' }}</p>
          </div>
          <div class="text-center p-3 border border-slate-300 rounded-xl bg-slate-50 min-w-[120px] text-slate-700 font-semibold font-mono">
            VERIFIED BY OSOS
          </div>
        </div>
      </div>
    }
  `
})
export class ProjectCustodyModalsComponent {
  readonly vm = inject(ProjectDetailsStore);
}
