import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectDetailsStore } from './project-details.store';

/** Finance dialogs: capital injection, edit transaction, budget revision, project report and its print layout. */
@Component({
  selector: 'app-pd-finance-modals',
  standalone: true,
  imports: [ApiDatePipe, DecimalPipe, TranslatePipe, ReactiveFormsModule],
  template: `
    <!-- Inject Capital Modal -->
    @if (vm.isInjectModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeInjectModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.injectForm" (ngSubmit)="vm.submitCapitalInjection()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <h3 class="text-lg font-bold text-white">{{ 'DETAILS.INJECT_CAPITAL' | translate }}</h3>
            <button type="button" (click)="vm.closeInjectModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar font-sans">
            @if (vm.injectErrors().length > 0) {
              <div class="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 shrink-0 font-cairo">
                <ul class="list-disc list-inside text-xs text-rose-400">
                  @for (error of vm.injectErrors(); track error) {
                    <li>{{ error }}</li>
                  }
                </ul>
              </div>
            }

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'FINANCE.AMOUNT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-mono transition-all"
                placeholder="0.00">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'FINANCE.SOURCE_TYPE' | translate }} <span class="text-red-400">*</span>
              </label>
              <select
                formControlName="sourceType"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-cairo transition-all">
                <option [ngValue]="null" disabled>{{ 'FINANCE.SELECT_SOURCE' | translate }}</option>
                <option value="ClientDeposit">{{ 'FINANCE.CLIENT_DEPOSIT' | translate }}</option>
                <option value="OwnerCapital">{{ 'FINANCE.OWNER_CAPITAL' | translate }}</option>
                <option value="ExternalLoan">{{ 'FINANCE.EXTERNAL_LOAN' | translate }}</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                  تاريخ الدفع <span class="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  formControlName="paymentDate"
                  class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-mono transition-all">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                  Payment Method <span class="text-red-400">*</span>
                </label>
                <select
                  formControlName="paymentMethod"
                  class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-cairo transition-all">
                  <option [ngValue]="null" disabled>Select Method</option>
                  <option value="Cash">Cash</option>
                  <option value="BankTransfer">Bank Transfer</option>
                  <option value="InstaPay">InstaPay</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                {{ 'FINANCE.NOTES_REFERENCE' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                formControlName="description"
                rows="2"
                class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none font-cairo transition-all"
                placeholder="e.g. Received check #12345 from Client"></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">
                Receipt / Proof of Payment <span class="text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                (change)="vm.onInjectReceiptSelected($event)" 
                class="w-full px-3.5 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer font-cairo">
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button
              type="button"
              (click)="vm.closeInjectModal()"
              class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button
              type="submit"
              [disabled]="vm.injectForm.invalid || vm.isInjecting()"
              class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isInjecting()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{{ 'COMMON.LOADING' | translate }}</span>
              } @else {
                <span>{{ 'DETAILS.INJECT_CAPITAL' | translate }}</span>
              }
            </button>
          </div>
        </form>
      </div>
    }
    <!-- Edit Transaction Modal -->
    @if (vm.isEditTransactionModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeEditTransactionModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.editTransactionForm" (ngSubmit)="vm.submitEditTransaction()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <h3 class="text-lg font-bold text-white">تعديل الحركة المالية (Edit Transaction)</h3>
            <button type="button" (click)="vm.closeEditTransactionModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
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
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">الوصف <span class="text-red-400">*</span></label>
              <textarea formControlName="description" rows="3" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-cairo"></textarea>
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button type="button" (click)="vm.closeEditTransactionModal()" class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button type="submit" [disabled]="vm.editTransactionForm.invalid || vm.isSavingTransaction()" class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isSavingTransaction()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              }
              <span>حفظ التغيرات</span>
            </button>
          </div>
        </form>
      </div>
    }

    <!-- Revise Budget Modal -->
    @if (vm.isReviseBudgetModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-cairo">
        <div (click)="vm.closeReviseBudgetModal()" class="absolute inset-0"></div>
        <form [formGroup]="vm.reviseBudgetForm" (ngSubmit)="vm.submitReviseBudget()" class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <h3 class="text-lg font-bold text-white">تعديل ميزانية المشروع (Revise Budget)</h3>
            <button type="button" (click)="vm.closeReviseBudgetModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar font-sans">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">الميزانية الجديدة <span class="text-red-400">*</span></label>
              <input type="number" formControlName="newBudget" step="0.01" min="0.01" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 font-mono">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">سبب التغيير <span class="text-red-400">*</span></label>
              <textarea formControlName="reasonForChange" rows="3" class="w-full px-3.5 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-cairo" placeholder="e.g. Scope revision or cost adjustment..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">جدول الكميات (PDF, Excel) <span class="text-xs font-normal text-slate-500">(Optional)</span></label>
              <input type="file" accept=".pdf,.xlsx,.xls,image/*" (change)="vm.onBoqFileSelected($event)" class="w-full px-3.5 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer font-cairo">
              @if (vm.isUploadingBoq()) {
                <span class="text-xs text-indigo-400 mt-1 flex items-center gap-2 font-cairo">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading BOQ document...
                </span>
              }
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button type="button" (click)="vm.closeReviseBudgetModal()" class="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              {{ 'COMMON.CANCEL' | translate }}
            </button>
            <button type="submit" [disabled]="vm.reviseBudgetForm.invalid || vm.isRevisingBudget() || vm.isUploadingBoq()" class="px-6 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer">
              @if (vm.isRevisingBudget()) {
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>{{ 'COMMON.LOADING' | translate }}</span>
              } @else {
                <span>حفظ التغيرات</span>
              }
            </button>
          </div>
        </form>
      </div>
    }
    <!-- 📊 Project Financial Report Modal -->
    @if (vm.isProjectReportModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-sm animate-fade-in font-cairo">
        <div (click)="vm.closeProjectReportModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-[95vw] xl:max-w-7xl bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10 font-cairo">

          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-800 shrink-0 bg-slate-900/90 backdrop-blur-md">
            <div class="flex items-center gap-3">
              <div class="p-2 sm:p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm sm:text-base md:text-lg font-bold text-white leading-tight flex items-center gap-2 flex-wrap">
                  <span>التقرير المالي الشامل للمشروع</span>
                  <span class="text-xs text-slate-400 font-normal hidden sm:inline">/ Project Financial Report</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <span>مشروع:</span>
                  <strong class="text-slate-200 font-bold">{{ vm.project()?.name }}</strong>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="vm.closeProjectReportModal()"
                class="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="إغلاق / Close">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- 2. Scrollable Modal Body -->
          <div class="flex-1 overflow-y-auto min-h-0 p-3 sm:p-5 md:p-6 space-y-4 custom-scrollbar font-sans">
            <!-- Date Filter Strip -->
            <div class="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800/90 space-y-3 font-cairo shadow-sm">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>تحديد النطاق الزمني للتقرير</span>
                </span>
                <button
                  type="button"
                  (click)="vm.resetReportDateFilter()"
                  class="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 shrink-0">
                  <span>⚡</span>
                  <span>الفترة الكاملة</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[11px] font-bold text-slate-400 mb-1">من تاريخ</label>
                  <div class="relative">
                    <input
                      id="reportStartDate"
                      type="text"
                      [value]="vm.formatDisplayDate(vm.reportStartDate())"
                      (input)="vm.onReportStartDateInput($event)"
                      placeholder="DD/MM/YYYY"
                      class="w-full px-3 py-2 border border-slate-700/80 bg-slate-900/90 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono pr-9">
                    <input
                      #reportStartDatePicker
                      type="date"
                      [value]="vm.reportStartDate()"
                      (change)="vm.onReportStartDatePicked($event)"
                      class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                      style="clip: rect(0,0,0,0);">
                    <button
                      type="button"
                      (click)="vm.openDatePicker(reportStartDatePicker)"
                      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold text-slate-400 mb-1">إلى تاريخ</label>
                  <div class="relative">
                    <input
                      id="reportEndDate"
                      type="text"
                      [value]="vm.formatDisplayDate(vm.reportEndDate())"
                      (input)="vm.onReportEndDateInput($event)"
                      placeholder="DD/MM/YYYY"
                      class="w-full px-3 py-2 border border-slate-700/80 bg-slate-900/90 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500 font-mono pr-9">
                    <input
                      #reportEndDatePicker
                      type="date"
                      [value]="vm.reportEndDate()"
                      (change)="vm.onReportEndDatePicked($event)"
                      class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                      style="clip: rect(0,0,0,0);">
                    <button
                      type="button"
                      (click)="vm.openDatePicker(reportEndDatePicker)"
                      class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            @if (vm.isProjectReportLoading()) {
              <div class="py-20 flex flex-col items-center justify-center font-cairo">
                <svg class="animate-spin h-9 w-9 text-sky-400 mb-3" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-xs text-slate-300 font-medium">جاري استخراج وتحليل بيانات تقرير المشروع...</span>
              </div>
            } @else if (vm.projectReportError()) {
              <div class="p-6 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-center space-y-3 font-cairo">
                <p class="text-xs sm:text-sm font-bold text-rose-400">⚠️ {{ vm.projectReportError() }}</p>
                <button
                  type="button"
                  (click)="vm.fetchProjectReport()"
                  class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer">
                  إعادة المحاولة
                </button>
              </div>
            } @else if (vm.projectReportData()) {
              <!-- Tabbed Sub-Navigation Bar -->
              <div class="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto custom-scrollbar shrink-0 font-cairo">
                <button
                  type="button"
                  (click)="vm.reportActiveTab.set('summary')"
                  class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 border"
                  [class.bg-indigo-600]="vm.reportActiveTab() === 'summary'"
                  [class.text-white]="vm.reportActiveTab() === 'summary'"
                  [class.shadow-lg]="vm.reportActiveTab() === 'summary'"
                  [class.shadow-indigo-600\/20]="vm.reportActiveTab() === 'summary'"
                  [class.border-indigo-500\/40]="vm.reportActiveTab() === 'summary'"
                  [class.bg-slate-900\/60]="vm.reportActiveTab() !== 'summary'"
                  [class.text-slate-400]="vm.reportActiveTab() !== 'summary'"
                  [class.hover:text-slate-200]="vm.reportActiveTab() !== 'summary'"
                  [class.border-slate-800]="vm.reportActiveTab() !== 'summary'">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>الملخص المالي العام</span>
                </button>

                <button
                  type="button"
                  (click)="vm.reportActiveTab.set('transactions')"
                  class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 border"
                  [class.bg-indigo-600]="vm.reportActiveTab() === 'transactions'"
                  [class.text-white]="vm.reportActiveTab() === 'transactions'"
                  [class.shadow-lg]="vm.reportActiveTab() === 'transactions'"
                  [class.shadow-indigo-600\/20]="vm.reportActiveTab() === 'transactions'"
                  [class.border-indigo-500\/40]="vm.reportActiveTab() === 'transactions'"
                  [class.bg-slate-900\/60]="vm.reportActiveTab() !== 'transactions'"
                  [class.text-slate-400]="vm.reportActiveTab() !== 'transactions'"
                  [class.hover:text-slate-200]="vm.reportActiveTab() !== 'transactions'"
                  [class.border-slate-800]="vm.reportActiveTab() !== 'transactions'">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>دفتر الحركات المالية</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/70 border border-slate-700/60 text-slate-300">
                    {{ vm.projectReportData()!.transactions.length }}
                  </span>
                </button>

                <button
                  type="button"
                  (click)="vm.reportActiveTab.set('pettyCashes')"
                  class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 border"
                  [class.bg-indigo-600]="vm.reportActiveTab() === 'pettyCashes'"
                  [class.text-white]="vm.reportActiveTab() === 'pettyCashes'"
                  [class.shadow-lg]="vm.reportActiveTab() === 'pettyCashes'"
                  [class.shadow-indigo-600\/20]="vm.reportActiveTab() === 'pettyCashes'"
                  [class.border-indigo-500\/40]="vm.reportActiveTab() === 'pettyCashes'"
                  [class.bg-slate-900\/60]="vm.reportActiveTab() !== 'pettyCashes'"
                  [class.text-slate-400]="vm.reportActiveTab() !== 'pettyCashes'"
                  [class.hover:text-slate-200]="vm.reportActiveTab() !== 'pettyCashes'"
                  [class.border-slate-800]="vm.reportActiveTab() !== 'pettyCashes'">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>سجل العُهَد النقدية</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/70 border border-slate-700/60 text-slate-300">
                    {{ vm.projectReportData()!.pettyCashes.length }}
                  </span>
                </button>

                <button
                  type="button"
                  (click)="vm.reportActiveTab.set('settlements')"
                  class="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 border"
                  [class.bg-indigo-600]="vm.reportActiveTab() === 'settlements'"
                  [class.text-white]="vm.reportActiveTab() === 'settlements'"
                  [class.shadow-lg]="vm.reportActiveTab() === 'settlements'"
                  [class.shadow-indigo-600\/20]="vm.reportActiveTab() === 'settlements'"
                  [class.border-indigo-500\/40]="vm.reportActiveTab() === 'settlements'"
                  [class.bg-slate-900\/60]="vm.reportActiveTab() !== 'settlements'"
                  [class.text-slate-400]="vm.reportActiveTab() !== 'settlements'"
                  [class.hover:text-slate-200]="vm.reportActiveTab() !== 'settlements'"
                  [class.border-slate-800]="vm.reportActiveTab() !== 'settlements'">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span>سجل التسويات</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-950/70 border border-slate-700/60 text-slate-300">
                    {{ vm.projectReportData()!.settlements.length }}
                  </span>
                </button>
              </div>

              <!-- TAB 1: SUMMARY -->
              @if (vm.reportActiveTab() === 'summary') {
                <div class="space-y-4 font-cairo animate-fade-in">
                  <!-- Project Meta Card -->
                  <div class="bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shadow-sm">
                    <div>
                      <span class="text-slate-400 text-[11px] block font-medium">اسم المشروع</span>
                      <span class="font-bold text-white text-sm mt-0.5 block">{{ vm.projectReportData()!.project.name }}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[11px] block font-medium">العميل</span>
                      <span class="font-bold text-slate-200 text-sm mt-0.5 block">{{ vm.projectReportData()!.project.client || '—' }}</span>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[11px] block font-medium">الميزانية التقديرية</span>
                      <span class="font-mono font-bold text-amber-400 text-sm mt-0.5 block">{{ vm.projectReportData()!.project.budget | number:'1.2-2' }} EGP</span>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[11px] block font-medium">حالة المشروع</span>
                      <span class="font-bold text-indigo-400 text-sm mt-0.5 block">{{ vm.projectReportData()!.project.status }}</span>
                    </div>
                  </div>

                  <!-- Summary Metrics 6-Card Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
                      <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">إجمالي الإيرادات</span>
                      <p class="text-sm sm:text-base font-bold font-mono text-emerald-400">+{{ vm.projectReportData()!.summary.totalIncome | number:'1.2-2' }}</p>
                      <span class="text-[10px] text-slate-500 block">مقبوضات المشروع</span>
                    </div>

                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
                      <span class="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">إجمالي المصروفات</span>
                      <p class="text-sm sm:text-base font-bold font-mono text-rose-400">-{{ vm.projectReportData()!.summary.totalExpenses | number:'1.2-2' }}</p>
                      <span class="text-[10px] text-slate-500 block">مصاريف مسجلة</span>
                    </div>

                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
                      <span class="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">صافي السيولة النقدية</span>
                      <p class="text-sm sm:text-base font-bold font-mono" [class.text-emerald-400]="vm.projectReportData()!.summary.netBalance >= 0" [class.text-rose-400]="vm.projectReportData()!.summary.netBalance < 0">
                        {{ vm.projectReportData()!.summary.netBalance | number:'1.2-2' }}
                      </p>
                      <span class="text-[10px] text-slate-500 block">رصيد الصندوق</span>
                    </div>

                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
                      <span class="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">عهد معلقة قيد التسوية</span>
                      <p class="text-sm sm:text-base font-bold font-mono text-amber-400">{{ vm.projectReportData()!.summary.totalCustodyPending | number:'1.2-2' }}</p>
                      <span class="text-[10px] text-slate-500 block">{{ vm.projectReportData()!.summary.unsettledCustodyCount }} عهدة معلقة</span>
                    </div>

                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
                      <span class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider block">إجمالي العهد المصروفة</span>
                      <p class="text-sm sm:text-base font-bold font-mono text-indigo-300">{{ vm.projectReportData()!.summary.totalCustodyIssued | number:'1.2-2' }}</p>
                      <span class="text-[10px] text-slate-500 block">صرفت للموقع</span>
                    </div>

                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-800 shadow-sm space-y-1">
                      <span class="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">عهد تم تسويتها</span>
                      <p class="text-sm sm:text-base font-bold font-mono text-teal-300">{{ vm.projectReportData()!.summary.totalCustodySettled | number:'1.2-2' }}</p>
                      <span class="text-[10px] text-slate-500 block">تسويات معتمدة</span>
                    </div>
                  </div>

                  <!-- Quick Navigation Cards to Deep Sections -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <button
                      type="button"
                      (click)="vm.reportActiveTab.set('transactions')"
                      class="p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 text-right transition-all cursor-pointer group">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-2">
                          <span class="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">📖</span>
                          <span>الحركات المالية</span>
                        </span>
                        <span class="text-xs font-mono font-bold text-indigo-400">{{ vm.projectReportData()!.transactions.length }} حركة ←</span>
                      </div>
                      <p class="text-[11px] text-slate-400">استعراض كافة المقبوضات والمصروفات المسجلة بالمشروع مع طريقة الدفع.</p>
                    </button>

                    <button
                      type="button"
                      (click)="vm.reportActiveTab.set('pettyCashes')"
                      class="p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 text-right transition-all cursor-pointer group">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-2">
                          <span class="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">🧾</span>
                          <span>العهد النقدية</span>
                        </span>
                        <span class="text-xs font-mono font-bold text-indigo-400">{{ vm.projectReportData()!.pettyCashes.length }} عهدة ←</span>
                      </div>
                      <p class="text-[11px] text-slate-400">تفاصيل العهد النقدية المسلمة للمهندسين والمشرفين وحالة كل عهدة.</p>
                    </button>

                    <button
                      type="button"
                      (click)="vm.reportActiveTab.set('settlements')"
                      class="p-4 rounded-2xl bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800 text-right transition-all cursor-pointer group">
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-2">
                          <span class="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">⚖️</span>
                          <span>سجل التسويات</span>
                        </span>
                        <span class="text-xs font-mono font-bold text-indigo-400">{{ vm.projectReportData()!.settlements.length }} تسوية ←</span>
                      </div>
                      <p class="text-[11px] text-slate-400">كشوف الفواتير المرفقة ومطابقة المصروف الفعلي مع المبالغ المسلمة.</p>
                    </button>
                  </div>
                </div>
              }

              <!-- TAB 2: TRANSACTIONS -->
              @if (vm.reportActiveTab() === 'transactions') {
                <div class="bg-slate-900/30 rounded-2xl border border-slate-800/80 overflow-hidden font-cairo shadow-xl animate-fade-in">
                  <div class="p-3.5 sm:p-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center text-xs">
                    <span class="font-bold text-white flex items-center gap-2">
                      <span>📖</span>
                      <span>دفتر الحركات المالية</span>
                    </span>
                    <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                      {{ vm.projectReportData()!.transactions.length }} حركة مسجلة
                    </span>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-right text-xs">
                      <thead class="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                        <tr>
                          <th class="p-3">التاريخ</th>
                          <th class="p-3 text-center">النوع</th>
                          <th class="p-3">البيان / الوصف</th>
                          <th class="p-3 text-left font-mono">المبلغ</th>
                          <th class="p-3 text-center">طريقة الدفع</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/50">
                        @for (t of vm.projectReportData()!.transactions; track t.id) {
                          <tr class="hover:bg-slate-800/30 transition-colors">
                            <td class="p-3 font-mono text-slate-400">{{ t.transactionDate | apiDate:'dd/MM/yyyy' }}</td>
                            <td class="p-3 text-center">
                              <span class="px-2 py-0.5 rounded text-[10px] font-bold"
                                    [class.bg-emerald-950\/60]="t.type === 'Income'"
                                    [class.text-emerald-400]="t.type === 'Income'"
                                    [class.bg-rose-950\/60]="t.type !== 'Income'"
                                    [class.text-rose-400]="t.type !== 'Income'">
                                {{ t.type === 'Income' ? 'إيراد' : 'مصروف' }}
                              </span>
                            </td>
                            <td class="p-3 text-slate-200 break-words max-w-md">{{ t.description || '—' }}</td>
                            <td class="p-3 text-left font-mono font-bold"
                                [class.text-emerald-400]="t.type === 'Income'"
                                [class.text-rose-400]="t.type !== 'Income'">
                              {{ t.type === 'Income' ? '+' : '-' }}{{ t.amount | number:'1.2-2' }} EGP
                            </td>
                            <td class="p-3 text-center font-mono text-slate-400">{{ t.paymentMethod || '—' }}</td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="5" class="p-8 text-center text-slate-500 text-xs font-cairo">
                              لا توجد حركات مالية مسجلة في هذا النطاق
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }

              <!-- TAB 3: PETTY CASH -->
              @if (vm.reportActiveTab() === 'pettyCashes') {
                <div class="bg-slate-900/30 rounded-2xl border border-slate-800/80 overflow-hidden font-cairo shadow-xl animate-fade-in">
                  <div class="p-3.5 sm:p-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center text-xs">
                    <span class="font-bold text-white flex items-center gap-2">
                      <span>🧾</span>
                      <span>سجل العُهَد النقدية</span>
                    </span>
                    <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                      {{ vm.projectReportData()!.pettyCashes.length }} عهدة مسجلة
                    </span>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-right text-xs">
                      <thead class="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                        <tr>
                          <th class="p-3">المستلم</th>
                          <th class="p-3">البيان / الغرض</th>
                          <th class="p-3">التاريخ</th>
                          <th class="p-3 text-left font-mono">المبلغ</th>
                          <th class="p-3 text-center">الحالة</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/50">
                        @for (pc of vm.projectReportData()!.pettyCashes; track pc.id) {
                          <tr class="hover:bg-slate-800/30 transition-colors">
                            <td class="p-3 font-bold text-white">{{ pc.issuedTo || '—' }}</td>
                            <td class="p-3 text-slate-300 break-words max-w-md">{{ pc.reason }}</td>
                            <td class="p-3 font-mono text-slate-400">{{ pc.issuedAt | apiDate:'dd/MM/yyyy' }}</td>
                            <td class="p-3 text-left font-mono font-bold text-amber-400">{{ pc.amount | number:'1.2-2' }} EGP</td>
                            <td class="p-3 text-center font-mono text-xs">
                              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                    [class.bg-emerald-500\/15]="pc.status === 'Settled'"
                                    [class.text-emerald-400]="pc.status === 'Settled'"
                                    [class.bg-amber-500\/15]="pc.status === 'Pending'"
                                    [class.text-amber-400]="pc.status === 'Pending'"
                                    [class.bg-rose-500\/15]="pc.status === 'Rejected'"
                                    [class.text-rose-400]="pc.status === 'Rejected'">
                                {{ pc.status }}
                              </span>
                            </td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="5" class="p-8 text-center text-slate-500 text-xs font-cairo">
                              لا توجد عهد نقدية مسجلة في هذا النطاق
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }

              <!-- TAB 4: SETTLEMENTS -->
              @if (vm.reportActiveTab() === 'settlements') {
                <div class="bg-slate-900/30 rounded-2xl border border-slate-800/80 overflow-hidden font-cairo shadow-xl animate-fade-in">
                  <div class="p-3.5 sm:p-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center text-xs">
                    <span class="font-bold text-white flex items-center gap-2">
                      <span>⚖️</span>
                      <span>سجل التسويات المعتمدة</span>
                    </span>
                    <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                      {{ vm.projectReportData()!.settlements.length }} تسوية مسجلة
                    </span>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-right text-xs">
                      <thead class="bg-slate-950/70 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
                        <tr>
                          <th class="p-3">المهندس / المستلم</th>
                          <th class="p-3">بيان العهدة</th>
                          <th class="p-3 text-left font-mono">العهدة</th>
                          <th class="p-3 text-left font-mono">المصروف الفعلي</th>
                          <th class="p-3 text-left font-mono">الفرق</th>
                          <th class="p-3 text-center">الحالة</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/50">
                        @for (s of vm.projectReportData()!.settlements; track s.id) {
                          <tr class="hover:bg-slate-800/30 transition-colors">
                            <td class="p-3 font-bold text-white">{{ s.issuedTo }}</td>
                            <td class="p-3 text-slate-300 break-words max-w-xs">{{ s.custodyReason }}</td>
                            <td class="p-3 text-left font-mono text-slate-300">{{ s.custodyAmount | number:'1.2-2' }}</td>
                            <td class="p-3 text-left font-mono text-amber-400 font-bold">{{ s.totalAmount | number:'1.2-2' }}</td>
                            <td class="p-3 text-left font-mono font-bold" [class.text-emerald-400]="s.netDifference >= 0" [class.text-rose-400]="s.netDifference < 0">
                              {{ s.netDifference | number:'1.2-2' }}
                            </td>
                            <td class="p-3 text-center text-xs">
                              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                                {{ s.status }}
                              </span>
                            </td>
                          </tr>
                        } @empty {
                          <tr>
                            <td colspan="6" class="p-8 text-center text-slate-500 text-xs font-cairo">
                              لا توجد تسويات مسجلة في هذا النطاق
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }
            }
          </div>

          <!-- 3. Fixed Modal Footer -->
          <div class="p-3 sm:p-4 bg-[#0d1322] border-t border-slate-800 flex items-center justify-between gap-3 shrink-0 font-cairo">
            <button
              type="button"
              (click)="vm.closeProjectReportModal()"
              class="px-4 sm:px-5 py-2.5 text-xs font-bold rounded-xl text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>إغلاق</span>
            </button>

            <div class="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                (click)="vm.triggerPrintProjectReport()"
                [disabled]="vm.isProjectReportLoading() || !vm.projectReportData()"
                class="px-5 sm:px-6 py-2.5 text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>طباعة التقرير</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- 🖨️ Hidden Project Report Print Layout -->
    @if (vm.activePrintFullReport()) {
      <div class="print-only hidden print:block p-8 bg-white text-slate-900 font-sans leading-relaxed" dir="rtl">
        <!-- Letterhead -->
        <div class="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-6">
          <div class="flex items-center gap-4">
            @if (vm.tenantProfile()?.logoUrl) {
              <img [src]="vm.tenantProfile()!.logoUrl" alt="Logo" class="h-16 w-16 object-contain rounded-lg border border-slate-300 p-1">
            }
            <div>
              <h1 class="text-2xl font-black font-cairo text-slate-950">{{ vm.tenantProfile()?.name || 'شركة المقاولات والتطوير' }}</h1>
              <p class="text-xs text-slate-600 font-cairo">تقرير الإدارة المالية للمشروع • منصة أسس</p>
            </div>
          </div>
          <div class="text-left font-cairo text-xs space-y-1">
            <p><strong>تاريخ الاستخراج:</strong> {{ vm.activePrintFullReport()!.generatedAt | apiDate:'dd/MM/yyyy HH:mm' }}</p>
            <p><strong>النطاق الزمني:</strong> 
              {{ vm.activePrintFullReport()!.dateRange.isFullPeriod ? 'الفترة الكاملة للمشروع' : ((vm.activePrintFullReport()!.dateRange.startDate | apiDate:'dd/MM/yyyy') + ' إلى ' + (vm.activePrintFullReport()!.dateRange.endDate | apiDate:'dd/MM/yyyy')) }}
            </p>
            <p><strong>كود المشروع:</strong> <span class="font-mono">{{ vm.activePrintFullReport()!.project.id }}</span></p>
          </div>
        </div>

        <!-- Project Meta Grid -->
        <div class="bg-slate-100 p-4 rounded-xl mb-6 border border-slate-300 text-xs font-cairo grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span class="text-slate-500 block">اسم المشروع:</span>
            <span class="font-bold text-slate-900 text-sm">{{ vm.activePrintFullReport()!.project.name }}</span>
          </div>
          <div>
            <span class="text-slate-500 block">العميل المستفيد:</span>
            <span class="font-bold text-slate-900">{{ vm.activePrintFullReport()!.project.client || '—' }}</span>
          </div>
          <div>
            <span class="text-slate-500 block">الميزانية التقديرية:</span>
            <span class="font-bold font-mono text-slate-900">{{ vm.activePrintFullReport()!.project.budget | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-slate-500 block">حالة المشروع:</span>
            <span class="font-bold text-slate-900">{{ vm.activePrintFullReport()!.project.status }}</span>
          </div>
        </div>

        <!-- Summary Totals Grid -->
        <div class="bg-slate-50 border border-slate-300 rounded-xl p-4 mb-6">
          <h3 class="text-xs font-bold font-cairo text-slate-700 mb-3">الملخص المالي للمشروع</h3>
          <div class="grid grid-cols-4 gap-3 text-center text-xs font-cairo">
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">إجمالي الإيرادات</span>
              <span class="text-base font-bold font-mono text-emerald-700">+{{ vm.activePrintFullReport()!.summary.totalIncome | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">إجمالي المصروفات</span>
              <span class="text-base font-bold font-mono text-rose-700">-{{ vm.activePrintFullReport()!.summary.totalExpenses | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">صافي السيولة النقدية</span>
              <span class="text-base font-bold font-mono text-slate-900">{{ vm.activePrintFullReport()!.summary.netBalance | number:'1.2-2' }} EGP</span>
            </div>
            <div class="p-2.5 bg-white border border-slate-200 rounded-lg">
              <span class="text-slate-500 block">عهد معلقة قيد التسوية</span>
              <span class="text-base font-bold font-mono text-amber-700">{{ vm.activePrintFullReport()!.summary.totalCustodyPending | number:'1.2-2' }} EGP</span>
            </div>
          </div>
        </div>

        <!-- Transactions Ledger Table -->
        <div class="mb-6">
          <h3 class="text-xs font-bold font-cairo text-slate-800 mb-2">دفتر العمليات المالية / Financial Ledger ({{ vm.activePrintFullReport()!.transactions.length }} عملية)</h3>
          <table class="w-full text-right border-collapse text-xs">
            <thead>
              <tr class="bg-slate-100 border-b-2 border-slate-300 font-bold text-slate-700">
                <th class="py-1.5 px-2">التاريخ</th>
                <th class="py-1.5 px-2">النوع</th>
                <th class="py-1.5 px-2">البيان</th>
                <th class="py-1.5 px-2 text-left font-mono">المبلغ</th>
                <th class="py-1.5 px-2 text-center">طريقة الدفع</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (tx of vm.activePrintFullReport()!.transactions; track tx.id) {
                <tr>
                  <td class="py-1.5 px-2 font-mono text-slate-600">{{ tx.transactionDate | apiDate:'dd/MM/yyyy' }}</td>
                  <td class="py-1.5 px-2 font-semibold" [class.text-emerald-700]="tx.type === 'Income'" [class.text-rose-700]="tx.type !== 'Income'">
                    {{ tx.type === 'Income' ? 'إيراد' : 'مصروف' }}
                  </td>
                  <td class="py-1.5 px-2 text-slate-800">{{ tx.description || '-' }}</td>
                  <td class="py-1.5 px-2 text-left font-mono font-bold" [class.text-emerald-700]="tx.type === 'Income'" [class.text-rose-700]="tx.type !== 'Income'">
                    {{ tx.type === 'Income' ? '+' : '-' }}{{ tx.amount | number:'1.2-2' }} EGP
                  </td>
                  <td class="py-1.5 px-2 text-center font-mono text-[11px]">{{ tx.paymentMethod || 'CASH' }}</td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="py-3 text-center text-slate-500">لا توجد عمليات مسجلة في هذه الفترة</td></tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Petty Cash Table -->
        <div class="mb-6">
          <h3 class="text-xs font-bold font-cairo text-slate-800 mb-2">سجل العهد النقدية / Petty Cash Records ({{ vm.activePrintFullReport()!.pettyCashes.length }} عهدة)</h3>
          <table class="w-full text-right border-collapse text-xs">
            <thead>
              <tr class="bg-slate-100 border-b-2 border-slate-300 font-bold text-slate-700">
                <th class="py-1.5 px-2">المستلم</th>
                <th class="py-1.5 px-2">البيان</th>
                <th class="py-1.5 px-2">التاريخ</th>
                <th class="py-1.5 px-2 text-left font-mono">قيمة العهدة</th>
                <th class="py-1.5 px-2 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (pc of vm.activePrintFullReport()!.pettyCashes; track pc.id) {
                <tr>
                  <td class="py-1.5 px-2 font-semibold">{{ pc.issuedTo || 'Staff' }}</td>
                  <td class="py-1.5 px-2 text-slate-700">{{ pc.reason }}</td>
                  <td class="py-1.5 px-2 font-mono text-slate-600">{{ pc.issuedAt | apiDate:'dd/MM/yyyy' }}</td>
                  <td class="py-1.5 px-2 text-left font-mono font-bold text-amber-700">{{ pc.amount | number:'1.2-2' }} EGP</td>
                  <td class="py-1.5 px-2 text-center font-mono text-[11px]">{{ pc.status }}</td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="py-3 text-center text-slate-500">لا توجد عهد في هذه الفترة</td></tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Settlements Table with Line Items -->
        <div class="mb-8">
          <h3 class="text-xs font-bold font-cairo text-slate-800 mb-2">سجل التسويات المعتمدة / Settlements & Line Items ({{ vm.activePrintFullReport()!.settlements.length }} تسوية)</h3>
          <table class="w-full text-right border-collapse text-xs">
            <thead>
              <tr class="bg-slate-100 border-b-2 border-slate-300 font-bold text-slate-700">
                <th class="py-1.5 px-2">المهندس</th>
                <th class="py-1.5 px-2">بيان العهدة</th>
                <th class="py-1.5 px-2 text-left font-mono">مبلغ العهدة</th>
                <th class="py-1.5 px-2 text-left font-mono">المصروف الفعلي</th>
                <th class="py-1.5 px-2 text-left font-mono">الفرق</th>
                <th class="py-1.5 px-2 text-center">الحالة</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (s of vm.activePrintFullReport()!.settlements; track s.id) {
                <tr>
                  <td class="py-1.5 px-2 font-semibold">{{ s.issuedTo }}</td>
                  <td class="py-1.5 px-2 text-slate-700">{{ s.custodyReason }}</td>
                  <td class="py-1.5 px-2 text-left font-mono">{{ s.custodyAmount | number:'1.2-2' }} EGP</td>
                  <td class="py-1.5 px-2 text-left font-mono text-amber-700 font-bold">{{ s.totalAmount | number:'1.2-2' }} EGP</td>
                  <td class="py-1.5 px-2 text-left font-mono font-bold" [class.text-emerald-700]="s.netDifference >= 0" [class.text-rose-700]="s.netDifference < 0">
                    {{ s.netDifference | number:'1.2-2' }} EGP
                  </td>
                  <td class="py-1.5 px-2 text-center text-[11px]">{{ s.status }}</td>
                </tr>
              } @empty {
                <tr><td colspan="6" class="py-3 text-center text-slate-500">لا توجد تسويات في هذه الفترة</td></tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Verification Stamp -->
        <div class="mt-10 pt-6 border-t border-slate-300 flex justify-between items-center text-xs text-slate-500 font-cairo">
          <div>
            <p><strong>المراجع المالي:</strong> {{ vm.authService.currentUser()?.name || '—' }}</p>
            <p><strong>الصفة:</strong> {{ vm.authService.currentUser()?.role || '—' }}</p>
          </div>
          <div class="text-center p-3 border-2 border-slate-400 rounded-xl bg-slate-50 min-w-[150px] font-mono font-bold text-slate-800">
            VERIFIED FINANCIAL REPORT
          </div>
        </div>
      </div>
    }
  `
})
export class ProjectFinanceModalsComponent {
  readonly vm = inject(ProjectDetailsStore);
}
