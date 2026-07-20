import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectService } from '../../../core/services/project.service';
import { PettyCashService } from '../../../core/services/petty-cash.service';
import { FinancialService } from '../../../core/services/financial.service';
import { ImageUploadService } from '../../../core/services/image-upload.service';
import { ProjectDto } from '../../../core/models/project.models';
import { PettyCashMobileDto, PaginatedList, PettyCashCreateDto, PettyCashSettleDto } from '../../../core/models/petty-cash.models';
import { FinancialTransactionMobileDto } from '../../../core/models/financial.models';
import { ConfirmModalService } from '../../../core/services/confirm-modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, ReactiveFormsModule],
  template: `
    @if (!isSuperAdmin()) {
      <div class="w-full max-w-none">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2 font-cairo">{{ 'FINANCE.PAGE_TITLE' | translate }}</h1>
        <p class="text-slate-400 font-cairo">{{ 'FINANCE.PAGE_SUBTITLE' | translate }}</p>
      </div>

      <!-- Stats Cards -->
      <ng-container *ngIf="!isEngineer()"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 font-sans">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.TOTAL_INCOME' | translate }}</div>
          <div class="text-3xl font-bold text-emerald-400 font-mono">{{ totalIncome | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.TOTAL_EXPENSES' | translate }}</div>
          <div class="text-3xl font-bold text-rose-400 font-mono">{{ totalExpenses | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.NET_BALANCE' | translate }}</div>
          <div class="text-3xl font-bold font-mono" [class.text-emerald-400]="netBalance >= 0" [class.text-rose-400]="netBalance < 0">
            {{ netBalance | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
          </div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2 font-cairo">{{ 'FINANCE.PENDING_PETTY_CASH' | translate }}</div>
          <div class="text-3xl font-bold text-amber-400 font-mono">{{ pendingPettyCashCount }}</div>
        </div>
      </div>
      </ng-container>

      <!-- Project Selector (for all roles) -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <label class="text-sm font-medium text-slate-300 font-cairo shrink-0">{{ 'FINANCE.SELECT_PROJECT' | translate }}</label>
            <select 
              [(ngModel)]="selectedProjectId" 
              (change)="onProjectChange()"
              class="w-full sm:w-80 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 font-sans"
            >
              <option value="">{{ 'FINANCE.ALL_PROJECTS' | translate }}</option>
              @for (project of projects(); track project.id) {
                <option [value]="project.id">{{ project.name }}</option>
              }
            </select>
          </div>
          @if (isSiteEngineer()) {
            <button 
              (click)="openPettyCashModal()"
              [disabled]="isClosedProjectSelected()"
              class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-cairo text-sm w-full sm:w-auto text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
            >
              {{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}
            </button>
          }
        </div>
      </div>

      <!-- Project Budget Consumption (Burn Rate) Widescreen UI -->
      <div *ngIf="!isEngineer()" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-6 font-cairo">{{ 'FINANCE.BURN_RATES' | translate }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of getFilteredProjects(); track project.id) {
            @let budget = getProjectBudget(project);
            @let spent = projectExpenses().get(project.id) || 0;
            @let pct = getProjectBurnRate(project);
            <div class="bg-slate-950 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-lg">
              <div>
                <h3 class="text-base font-bold text-white font-cairo truncate">{{ project.name }}</h3>
                <span class="text-xs text-slate-500 font-medium block mt-1.5 font-cairo">
                  {{ 'PROJECTS.TABLE_CLIENT' | translate }}: {{ getProjectClient(project) }}
                </span>
              </div>
              <div class="mt-5 space-y-2.5">
                <div class="flex justify-between text-xs text-slate-400 font-mono">
                  <span>{{ spent | number:'1.0-0' }} / {{ budget | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</span>
                  <span [class.text-rose-400]="pct > 85" [class.text-indigo-400]="pct <= 85" class="font-bold">{{ pct | number:'1.1-1' }}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    [class.bg-rose-500]="pct > 85"
                    [class.bg-indigo-600]="pct <= 85" 
                    class="h-full rounded-full transition-all duration-500" 
                    [style.width.%]="pct"
                  ></div>
                </div>
              </div>
            </div>
          } @empty {
            <div class="col-span-full py-10 text-center text-slate-500 text-sm font-cairo">
              {{ 'PROJECTS.NO_PROJECTS' | translate }}
            </div>
          }
        </div>
      </div>

      <!-- Pending Approvals (for TenantOwner and Accountant) -->
      @if (isOwnerOrAccountant()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white font-cairo">{{ 'FINANCE.PENDING_APPROVALS' | translate }}</h2>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
              {{ pendingApprovals().length }} {{ 'FINANCE.PENDING' | translate }}
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="pb-4 font-cairo">{{ 'FINANCE.REQUESTER' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.PROJECT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.REASON' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-800/60 text-slate-300">
                @for (request of pendingApprovals(); track request.id) {
                  <tr class="hover:bg-slate-950/20">
                    <td class="py-4 text-white font-semibold">{{ request.issuedTo }}</td>
                    <td class="py-4 text-slate-300 font-medium">{{ getProjectName(request) }}</td>
                    <td class="py-4 text-amber-400 font-bold font-mono">{{ request.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                    <td class="py-4 text-slate-400 max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                        [title]="request.reason"
                        (click)="openPendingApprovalReasonModal(request)">
                      {{ request.reason }}
                    </td>
                    <td class="py-4 text-slate-400 font-mono">{{ request.issuedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="py-4">
                      <div class="flex items-center gap-2 justify-center">
                        <button 
                          (click)="openApproveModal(request)"
                          class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo"
                        >
                          {{ 'FINANCE.APPROVE' | translate }}
                        </button>
                        <button 
                          (click)="openRejectModal(request)"
                          class="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo"
                        >
                          {{ 'FINANCE.REJECT' | translate }}
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-12 text-center text-slate-500 font-cairo">
                      {{ 'FINANCE.NO_PENDING_APPROVALS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Petty Cash Requests (for Site Engineer) -->
      @if (isSiteEngineer()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 class="text-xl font-bold text-white mb-6 font-cairo">{{ 'FINANCE.MY_PETTY_CASH' | translate }}</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="pb-4 font-cairo">{{ 'FINANCE.PROJECT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.REASON' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.STATUS' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-800/60 text-slate-300">
                @for (request of myPettyCash(); track request.id) {
                  <tr class="hover:bg-slate-950/20">
                    <td class="py-4 text-white font-medium">{{ getProjectName(request) }}</td>
                    <td class="py-4 text-amber-400 font-bold font-mono">{{ request.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                    <td class="py-4 text-slate-400 max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                        [title]="request.reason"
                        (click)="openMyPettyCashReasonModal(request)">
                      {{ request.reason }}
                    </td>
                    <td class="py-4 text-slate-400 font-mono">{{ request.issuedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="py-4 text-center">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border font-cairo" 
                        [class.bg-emerald-500/10]="request.status === 'Settled'" 
                        [class.text-emerald-400]="request.status === 'Settled'"
                        [class.border-emerald-500/20]="request.status === 'Settled'"
                        [class.bg-amber-500/10]="request.status === 'Issued'" 
                        [class.text-amber-400]="request.status === 'Issued'"
                        [class.border-amber-500/20]="request.status === 'Issued'"
                        [class.bg-blue-500/10]="request.status === 'Pending'" 
                        [class.text-blue-400]="request.status === 'Pending'"
                        [class.border-blue-500/20]="request.status === 'Pending'"
                        [class.bg-rose-500/10]="request.status === 'Rejected'" 
                        [class.text-rose-400]="request.status === 'Rejected'"
                        [class.border-rose-500/20]="request.status === 'Rejected'"
                      >
                        @if (request.status === 'Pending') {
                          {{ 'FINANCE.PENDING' | translate }}
                        } @else if (request.status === 'Issued') {
                          Approved
                        } @else if (request.status === 'Rejected') {
                          Rejected
                        } @else {
                          {{ 'FINANCE.SETTLED' | translate }}
                        }
                      </span>
                    </td>
                    <td class="py-4 text-center">
                      @if (request.status === 'Issued') {
                        <button 
                          (click)="openSettleModal(request)"
                          class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo"
                        >
                          {{ 'FINANCE.SUBMIT_RECEIPTS' | translate }}
                        </button>
                      } @else if (request.status === 'Rejected' && request.comments) {
                        <span class="text-xs text-rose-400 italic block max-w-xs truncate" [title]="request.comments">Reason: {{ request.comments }}</span>
                      } @else if (request.status === 'Settled') {
                        <div class="flex items-center justify-center gap-2">
                          @if (request.receiptPhotoUrl) {
                            <a [href]="request.receiptPhotoUrl" target="_blank" 
                               class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                               title="View Receipt">
                              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>معاينة الإيصال</span>
                            </a>
                          }
                          @if (request.settlementPaymentMethod) {
                            <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300" title="Payment Method">
                              {{ request.settlementPaymentMethod }}
                            </span>
                          }
                          @if (request.expenseDate) {
                            <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400" title="Expense Date">
                              {{ request.expenseDate | date:'dd/MM/yyyy' }}
                            </span>
                          }
                        </div>
                      } @else {
                        <span class="text-xs text-slate-600 italic font-cairo">-</span>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-12 text-center text-slate-500 font-cairo">
                      {{ 'FINANCE.NO_PETTY_CASH' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Financial Transactions (for TenantOwner and Accountant) -->
      @if (isOwnerOrAccountant()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 class="text-xl font-bold text-white mb-6 font-cairo">{{ 'FINANCE.TRANSACTIONS' | translate }}</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right font-sans">
              <thead>
                <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-800/80">
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.DESCRIPTION' | translate }}</th>
                  <th class="pb-4 font-cairo">{{ 'FINANCE.TYPE' | translate }}</th>
                  <th class="pb-4 text-center font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  @if (isOwnerOrAccountant()) {
                    <th class="pb-4 text-center font-cairo">{{ 'FINANCE.ACTIONS' | translate }}</th>
                  }
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-800/60 text-slate-300">
                @for (transaction of transactions(); track transaction.id) {
                  <tr class="hover:bg-slate-950/20">
                    <td class="py-4 text-slate-400 font-mono">{{ transaction.transactionDate | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="py-4 text-white font-medium max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                        [title]="transaction.description"
                        (click)="openTransactionInspectionModal(transaction)">
                      {{ transaction.description }}
                    </td>
                    <td class="py-4">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border font-cairo" 
                        [class.bg-emerald-500/10]="transaction.type === 'Income'" 
                        [class.text-emerald-400]="transaction.type === 'Income'"
                        [class.border-emerald-500/20]="transaction.type === 'Income'"
                        [class.bg-rose-500/10]="transaction.type === 'Expense'" 
                        [class.text-rose-400]="transaction.type === 'Expense'"
                        [class.border-rose-500/20]="transaction.type === 'Expense'"
                      >
                        {{ transaction.type === 'Income' ? ('FINANCE.INCOME' | translate) : ('FINANCE.EXPENSE' | translate) }}
                      </span>
                    </td>
                    <td class="py-4 text-center font-bold font-mono" 
                      [class.text-emerald-400]="transaction.type === 'Income'" 
                      [class.text-rose-400]="transaction.type === 'Expense'"
                    >
                      {{ transaction.type === 'Income' ? '+' : '-' }}{{ transaction.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                    </td>
                    @if (isOwnerOrAccountant()) {
                      <td class="py-4 text-center">
                        @if (transaction.description.toLowerCase().startsWith('petty cash settlement -')) {
                          <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            🔒 مقفلة
                          </span>
                        } @else {
                          <div class="flex items-center justify-center gap-1.5">
                            <button
                              (click)="openEditTransactionModal(transaction)"
                              title="Edit transaction"
                              class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-150 cursor-pointer font-cairo">
                              Edit
                            </button>
                            <button
                              (click)="onDeleteTransaction(transaction.id, selectedProjectId())"
                              [disabled]="isDeletingTx()"
                              title="Delete transaction — capital injections roll back the pool automatically"
                              class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer font-cairo">
                              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        }
                      </td>
                    }
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="4" class="py-12 text-center text-slate-500 font-cairo">
                      {{ 'FINANCE.NO_TRANSACTIONS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>

    <!-- Petty Cash Request Modal -->
    @if (showPettyCashModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closePettyCashModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">{{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}</h3>
            <button (click)="closePettyCashModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitPettyCashRequest()" class="space-y-4 font-sans">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.PROJECT' | translate }}</label>
              <select 
                [(ngModel)]="pettyCashForm.projectId" 
                name="projectId"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">{{ 'FINANCE.SELECT_PROJECT' | translate }}</option>
                @for (project of projects(); track project.id) {
                  <option [value]="project.id">{{ project.name }}</option>
                }
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="pettyCashForm.amount" 
                name="amount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.CATEGORY' | translate }}</label>
              <select 
                [(ngModel)]="pettyCashForm.category" 
                name="category"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">{{ 'FINANCE.SELECT_CATEGORY' | translate }}</option>
                <option value="Cement">{{ 'FINANCE.CATEGORY_CEMENT' | translate }}</option>
                <option value="Logistics">{{ 'FINANCE.CATEGORY_LOGISTICS' | translate }}</option>
                <option value="Materials">{{ 'FINANCE.CATEGORY_MATERIALS' | translate }}</option>
                <option value="Labor">{{ 'FINANCE.CATEGORY_LABOR' | translate }}</option>
                <option value="Other">{{ 'FINANCE.CATEGORY_OTHER' | translate }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.REASON' | translate }}</label>
              <textarea 
                [(ngModel)]="pettyCashForm.reason" 
                name="reason"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                required
              ></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closePettyCashModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || !pettyCashForm.projectId || pettyCashForm.amount <= 0 || !pettyCashForm.reason"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : ('FINANCE.SUBMIT_REQUEST' | translate) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Settle Petty Cash Modal -->
    @if (showSettleModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeSettleModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">{{ 'FINANCE.SUBMIT_RECEIPTS' | translate }}</h3>
            <button (click)="closeSettleModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitSettleRequest()" class="space-y-4 font-sans">
            <div class="bg-slate-950 border border-slate-800/80 rounded-xl p-4">
              <div class="text-sm text-slate-400 mb-1 font-cairo">{{ 'FINANCE.ISSUED_AMOUNT' | translate }}</div>
              <div class="text-xl font-bold text-white font-mono">{{ settleRequest()?.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.SPENT_AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="settleForm.spentAmount" 
                name="spentAmount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.RETURN_AMOUNT' | translate }}</label>
              <div class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 font-mono">
                {{ getCalculatedReturnAmount() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">تاريخ الصرف الفعلي <span class="text-red-400">*</span></label>
              <input 
                type="date" 
                [(ngModel)]="settleForm.expenseDate" 
                name="expenseDate"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">إرفاق الفاتورة / إيصال الصرف (اختياري)</label>
              <input 
                type="file" 
                (change)="onFileSelect($event)"
                accept="image/*"
                class="w-full bg-slate-955 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">{{ 'FINANCE.RECEIPT_NOTES' | translate }}</label>
              <textarea 
                [(ngModel)]="settleForm.notes" 
                name="notes"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                required
                placeholder="مثال: شراء نثريات للموقع، حوافز عمال، فواتير نقل..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Payment Method / طريقة الدفع <span class="text-red-400">*</span></label>
              <select 
                [(ngModel)]="settleForm.settlementPaymentMethod" 
                name="settlementPaymentMethod"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select Method...</option>
                <option value="Cash">كاش (Cash)</option>
                <option value="InstaPay">إنستا باي (InstaPay)</option>
                <option value="BankTransfer">تحويل بنكي (Bank Transfer)</option>
                <option value="Cheque">شيك (Cheque)</option>
              </select>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeSettleModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || settleForm.spentAmount <= 0 || settleForm.spentAmount > (settleRequest()?.amount || 0) || !settleForm.notes || !settleForm.settlementPaymentMethod || !settleForm.expenseDate"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : 'تأكيد التسوية' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Reject Comments Modal -->
    @if (showRejectModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeRejectModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">Reject Petty Cash Request</h3>
            <button (click)="closeRejectModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitRejectRequest()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Rejection Comments / Reason <span class="text-red-400">*</span></label>
              <textarea 
                [(ngModel)]="rejectComments" 
                name="comments"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 resize-none"
                required
                placeholder="Type the reason for rejection..."
              ></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeRejectModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || !rejectComments.trim()"
                class="flex-1 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                Reject Request
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Approve Modal -->
    @if (showApproveModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeApproveModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">Approve Petty Cash</h3>
            <button (click)="closeApproveModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitApproveRequest()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Source Cash Pool <span class="text-red-400">*</span></label>
              <select 
                [(ngModel)]="approveSourcePoolId" 
                name="sourcePoolId"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                required>
                <option value="" disabled>Select cash pool...</option>
                @for (pool of currentProjectPools(); track pool.id) {
                  <option [value]="pool.id">{{ pool.sourceType }} (Avail: {{ pool.availableBalance | number:'1.2-2' }})</option>
                }
              </select>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeApproveModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading() || !approveSourcePoolId"
                class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : ('FINANCE.APPROVE' | translate) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Edit Transaction Modal -->
    @if (isEditTransactionModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div (click)="closeEditTransactionModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">تعديل الحركة المالية (Edit Transaction)</h3>
            <button (click)="closeEditTransactionModal()" class="text-slate-400 hover:text-white cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="editTransactionForm" (ngSubmit)="submitEditTransaction()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Amount</label>
              <input type="number" formControlName="amount" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2 font-cairo">Description</label>
              <textarea formControlName="description" rows="3" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none" required></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button type="button" (click)="closeEditTransactionModal()" class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer font-cairo text-sm">Cancel</button>
              <button type="submit" [disabled]="editTransactionForm.invalid || isSavingTransaction()" class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer font-cairo text-sm">Save</button>
            </div>
          </form>
        </div>
      </div>
    }
    } @else {
      <div class="p-6 text-center text-rose-400 font-bold font-cairo">
        غير مسموح للمسؤول العام بعرض التفاصيل المالية للمستأجرين.
      </div>
    }

    <!-- Quick Inspection Modal for Truncated Text -->
    @if (activeTextInspection()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in font-sans">
        <div (click)="closeTextInspectionModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 p-5 sm:p-6 shadow-2xl z-10 transition-all">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white font-cairo">{{ activeTextInspection()!.title }}</h3>
                @if (activeTextInspection()!.subtitle) {
                  <p class="text-xs text-slate-400 font-cairo mt-0.5">{{ activeTextInspection()!.subtitle }}</p>
                }
              </div>
            </div>
            <button (click)="closeTextInspectionModal()" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="overflow-y-auto min-h-0 pr-1 space-y-3 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-cairo bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 selection:bg-sky-500/30 selection:text-sky-200">
            {{ activeTextInspection()!.content }}
          </div>
          <div class="mt-4 pt-3 border-t border-slate-800 flex justify-end">
            <button (click)="closeTextInspectionModal()" class="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer font-cairo">
              إغلاق / Close
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .font-cairo {
      font-family: 'Cairo', 'Inter', sans-serif;
    }
  `]
})
export class FinancialsComponent implements OnInit {
  readonly activeTextInspection = signal<{ title: string; content: string; subtitle?: string } | null>(null);

  openTextInspectionModal(title: string, content: string, subtitle?: string): void {
    if (!content) return;
    this.activeTextInspection.set({ title, content, subtitle });
  }

  closeTextInspectionModal(): void {
    this.activeTextInspection.set(null);
  }

  openPendingApprovalReasonModal(request: any): void {
    if (!request.reason) return;
    const dateStr = request.issuedAt ? new Date(request.issuedAt).toLocaleString('en-GB') : '';
    const projName = this.getProjectName(request);
    const subtitle = request.issuedTo + ' • ' + projName + (dateStr ? ` • ${dateStr}` : '');
    this.openTextInspectionModal('البيان / السبب', request.reason, subtitle);
  }

  openMyPettyCashReasonModal(request: any): void {
    if (!request.reason) return;
    const dateStr = request.issuedAt ? new Date(request.issuedAt).toLocaleString('en-GB') : '';
    const projName = this.getProjectName(request);
    const subtitle = projName + (dateStr ? ` • ${dateStr}` : '');
    this.openTextInspectionModal('البيان / السبب', request.reason, subtitle);
  }

  openTransactionInspectionModal(transaction: FinancialTransactionMobileDto): void {
    if (!transaction.description) return;
    const dateStr = transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleString('en-GB') : '';
    this.openTextInspectionModal('تفاصيل المعاملة المالية', transaction.description, dateStr);
  }
  readonly authService = inject(AuthService);
  readonly projectService = inject(ProjectService);
  readonly pettyCashService = inject(PettyCashService);
  readonly financialService = inject(FinancialService);
  readonly imageUploadService = inject(ImageUploadService);
  private readonly confirmService = inject(ConfirmModalService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly isEditTransactionModalOpen = signal(false);
  readonly isSavingTransaction = signal(false);
  selectedTransactionToEdit: FinancialTransactionMobileDto | null = null;
  readonly editTransactionForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly projects = signal<ProjectDto[]>([]);
  readonly pendingApprovals = signal<any[]>([]);
  readonly myPettyCash = signal<any[]>([]);
  readonly transactions = signal<FinancialTransactionMobileDto[]>([]);
  readonly isDeletingTx = signal(false);
  
  // Track project expenses for burn rates
  readonly projectExpenses = signal<Map<string, number>>(new Map());

  readonly selectedProjectId = signal<string>('');
  readonly showPettyCashModal = signal(false);
  readonly showSettleModal = signal(false);
  readonly showRejectModal = signal(false);
  readonly loading = signal(false);
  readonly settleRequest = signal<any>(null);
  readonly rejectRequest = signal<any>(null);
  readonly selectedFile = signal<File | null>(null);
  
  rejectComments = '';

  readonly showApproveModal = signal(false);
  readonly approveRequest = signal<any>(null);
  approveSourcePoolId = '';
  readonly currentProjectPools = signal<any[]>([]);

  readonly pettyCashForm = {
    projectId: '',
    amount: 0,
    category: '',
    reason: '',
  };

  readonly settleForm = {
    spentAmount: 0,
    notes: '',
    settlementPaymentMethod: '',
    expenseDate: new Date().toISOString().substring(0, 10),
    receiptPhotoUrl: ''
  };

  get totalIncome(): number {
    return this.transactions().filter((t) => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpenses(): number {
    return this.transactions().filter((t) => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
  }

  get netBalance(): number {
    return this.totalIncome - this.totalExpenses;
  }

  get pendingPettyCashCount(): number {
    return this.pendingApprovals().length;
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.data) {
          this.projects.set(response.data);
          // Proactively select the first project if available and not selected
          if (response.data.length > 0 && !this.selectedProjectId()) {
            this.selectedProjectId.set(response.data[0].id);
            this.loadData();
          }

          // Preload expenses for all projects to compute burn rates
          response.data.forEach(p => {
            this.financialService.getProjectTransactions(p.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
              next: (res) => {
                if (res.data) {
                  const totalExp = res.data.items
                     .filter(t => t.type === 'Expense')
                     .reduce((sum, t) => sum + t.amount, 0);

                  this.projectExpenses.update(map => {
                    map.set(p.id, totalExp);
                    return new Map(map);
                  });
                }
              }
            });
          });
        }
      },
    });
  }

  getFilteredProjects(): ProjectDto[] {
    const activeId = this.selectedProjectId();
    if (activeId) {
      return this.projects().filter(p => p.id === activeId);
    }
    return this.projects();
  }

  getProjectBudget(project: ProjectDto): number {
    const desc = project.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).budget || 0;
      } catch (e) {}
    }
    return 0;
  }

  getProjectClient(project: ProjectDto): string {
    const desc = project.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).client || 'N/A';
      } catch (e) {}
    }
    return 'N/A';
  }

  getProjectBurnRate(project: ProjectDto): number {
    const budget = this.getProjectBudget(project);
    if (budget <= 0) return 0;
    const spent = this.projectExpenses().get(project.id) || 0;
    const pct = (spent / budget) * 100;
    return isNaN(pct) || !isFinite(pct) ? 0 : Math.min(pct, 100);
  }

  getCalculatedReturnAmount(): number {
    const limit = this.settleRequest()?.amount || 0;
    const spent = this.settleForm.spentAmount || 0;
    return Math.max(0, limit - spent);
  }

  loadData(): void {
    const projectId = this.selectedProjectId();
    if (!projectId) {
      this.pendingApprovals.set([]);
      this.myPettyCash.set([]);
      this.transactions.set([]);
      return;
    }

    this.loading.set(true);

    // Fetch petty cash requests
    this.pettyCashService.getProjectPettyCash(projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const items = response.data.items;

          // Filter pending ones for Owner or Accountant
          const pending = items.filter(i => i.status === 'Pending');
          this.pendingApprovals.set(pending);

          // Filter my own requests for SiteEngineer
          const currentUserName = this.authService.currentUser()?.name;
          const myReqs = items.filter(i => i.issuedTo === currentUserName);
          this.myPettyCash.set(myReqs);
        }
      }
    });

    // Fetch transactions
    this.financialService.getProjectTransactions(projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success && response.data) {
          this.transactions.set(response.data.items);
        }
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  onProjectChange(): void {
    this.loadData();
  }

  isSiteEngineer(): boolean {
    return this.authService.currentUser()?.role === 'SiteEngineer';
  }

  isEngineer(): boolean {
    const role = this.authService.currentUser()?.role?.toLowerCase() || '';
    return ['manager', 'siteengineer', 'designengineer'].includes(role);
  }

  isSuperAdmin(): boolean {
    return this.authService.currentUser()?.role === 'SuperAdmin';
  }

  isOwnerOrAccountant(): boolean {
    const role = this.authService.currentUser()?.role;
    return role === 'TenantOwner' || role === 'Accountant';
  }

  getProjectName(requestOrProjectId: string | { projectId?: string; projectName?: string | null }): string {
    if (typeof requestOrProjectId !== 'string') {
      if (requestOrProjectId.projectName && requestOrProjectId.projectName.trim()) {
        return requestOrProjectId.projectName;
      }

      if (requestOrProjectId.projectId) {
        const project = this.projects().find((p) => p.id === requestOrProjectId.projectId);
        return project?.name || 'Project';
      }

      return 'Project';
    }

    const project = this.projects().find((p) => p.id === requestOrProjectId);
    return project?.name || 'Project';
  }

  isClosedProjectSelected(): boolean {
    const selectedProjId = this.selectedProjectId();
    if (!selectedProjId) return false;
    const proj = this.projects().find((p) => p.id === selectedProjId);
    return proj?.status === 'Closed';
  }

  openPettyCashModal(): void {
    const selectedProjId = this.selectedProjectId();
    if (selectedProjId) {
      const proj = this.projects().find((p) => p.id === selectedProjId);
      if (proj?.status === 'Closed') return;
    }
    this.pettyCashForm.projectId = selectedProjId || '';
    this.pettyCashForm.amount = 0;
    this.pettyCashForm.category = '';
    this.pettyCashForm.reason = '';
    this.showPettyCashModal.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closePettyCashModal(): void {
    this.showPettyCashModal.set(false);
    this.confirmService.toggleBodyScroll(false);
  }

  submitPettyCashRequest(): void {
    if (!this.pettyCashForm.projectId || this.pettyCashForm.amount <= 0 || !this.pettyCashForm.reason) {
      return;
    }

    this.loading.set(true);
    const dto: PettyCashCreateDto = {
      issuedToUserId: this.authService.currentUser()?.userId || '',
      amount: this.pettyCashForm.amount,
      reason: this.pettyCashForm.reason,
      category: this.pettyCashForm.category
    };

    this.pettyCashService.requestPettyCash(this.pettyCashForm.projectId, dto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closePettyCashModal();
        this.loadProjects(); // Reload pools & burn rates
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  openSettleModal(request: any): void {
    this.settleRequest.set(request);
    this.settleForm.spentAmount = request.amount;
    this.settleForm.notes = '';
    this.settleForm.settlementPaymentMethod = '';
    this.settleForm.expenseDate = new Date().toISOString().substring(0, 10);
    this.selectedFile.set(null);
    this.showSettleModal.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeSettleModal(): void {
    this.showSettleModal.set(false);
    this.settleRequest.set(null);
    this.confirmService.toggleBodyScroll(false);
  }

  onFileSelect(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'حجم الملف كبير جداً! الحد الأقصى للصور 2 ميجا وللمقايسات 5 ميجا.',
          type: 'error'
        });
        event.target.value = '';
        return;
      }
      this.selectedFile.set(file);
    }
  }

  submitSettleRequest(): void {
    if (!this.settleForm.spentAmount || !this.settleForm.notes || !this.settleForm.settlementPaymentMethod || !this.settleRequest()) {
      return;
    }

    this.loading.set(true);
    const request = this.settleRequest();

    // First upload the file if selected
    if (this.selectedFile()) {
      this.imageUploadService.uploadProjectGallery(request.projectId, this.selectedFile()!).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          const photoUrl = res.data?.url || '';
          this.submitSettleDto(request, photoUrl);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.submitSettleDto(request, '');
    }
  }

  private submitSettleDto(request: any, photoUrl: string): void {
    const dto: PettyCashSettleDto = {
      spentAmount: this.settleForm.spentAmount,
      receiptDescription: this.settleForm.notes,
      settlementPaymentMethod: this.settleForm.settlementPaymentMethod as any,
      expenseDate: new Date(this.settleForm.expenseDate),
      receiptPhotoUrl: photoUrl
    };

    this.pettyCashService.settlePettyCash(request.projectId, request.id, dto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closeSettleModal();
        this.loadProjects(); // Update project budgets
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  openApproveModal(request: any): void {
    if (!request) return;
    this.approveRequest.set(request);
    this.approveSourcePoolId = '';
    this.showApproveModal.set(true);
    this.confirmService.toggleBodyScroll(true);
    
    this.loading.set(true);
    this.financialService.getCashPools(request.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.currentProjectPools.set(res.data);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  closeApproveModal(): void {
    this.showApproveModal.set(false);
    this.approveRequest.set(null);
    this.confirmService.toggleBodyScroll(false);
  }

  submitApproveRequest(): void {
    const req = this.approveRequest();
    if (!req || !this.approveSourcePoolId) return;
    
    this.loading.set(true);
    this.pettyCashService.approvePettyCash(req.projectId, req.id, { sourcePoolId: this.approveSourcePoolId }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closeApproveModal();
        this.loadProjects(); // Update project budgets/pools
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  openRejectModal(request: any): void {
    this.rejectRequest.set(request);
    this.rejectComments = '';
    this.showRejectModal.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeRejectModal(): void {
    this.showRejectModal.set(false);
    this.rejectRequest.set(null);
    this.confirmService.toggleBodyScroll(false);
  }

  submitRejectRequest(): void {
    const req = this.rejectRequest();
    if (!req || !this.rejectComments.trim()) return;

    this.loading.set(true);
    this.pettyCashService.rejectPettyCash(req.projectId, req.id, this.rejectComments).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.closeRejectModal();
        this.loadProjects();
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  /**
   * Delete a financial transaction.
   * Only callable from the @if(isOwnerOrAccountant()) guarded section.
   * The API rolls back the cash pool balance if the record was a Capital Injection.
   */
  async onDeleteTransaction(id: string, projectId: string): Promise<void> {
    const isConfirmed = await this.confirmService.confirm({
      title: 'حذف الحركة المالية',
      message: 'هل أنت متأكد من حذف هذه الحركة؟ في حال كانت زيادة رأس مال، فسيتم إرجاع رصيد المحفظة تلقائياً.',
      confirmText: 'نعم، احذف',
      cancelText: 'إلغاء'
    });
    if (!isConfirmed) return;

    const pid = projectId || this.selectedProjectId();
    if (!pid) return;
    this.isDeletingTx.set(true);
    this.financialService.deleteTransaction(pid, id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isDeletingTx.set(false);
        this.loadData();
        this.loadProjects();
      },
      error: (err: any) => {
        this.isDeletingTx.set(false);
        this.confirmService.alert({
          title: 'خطأ في العملية',
          message: err?.error?.message || 'فشلت عملية الحذف.',
          type: 'error'
        });
      }
    });
  }

  // ── Edit Transaction Modal Actions ──
  openEditTransactionModal(t: FinancialTransactionMobileDto): void {
    this.selectedTransactionToEdit = t;
    this.editTransactionForm.reset({
      amount: t.amount,
      description: t.description
    });
    this.isEditTransactionModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeEditTransactionModal(): void {
    this.isEditTransactionModalOpen.set(false);
    this.selectedTransactionToEdit = null;
    this.confirmService.toggleBodyScroll(false);
  }

  submitEditTransaction(): void {
    if (this.editTransactionForm.invalid || !this.selectedTransactionToEdit) return;
    this.isSavingTransaction.set(true);
    const formVal = this.editTransactionForm.value;
    const pid = this.selectedProjectId();

    this.financialService.updateTransaction(pid, this.selectedTransactionToEdit.id, formVal).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.isSavingTransaction.set(false);
        this.closeEditTransactionModal();
        this.loadData();
        this.loadProjects();
      },
      error: (err: any) => {
        this.isSavingTransaction.set(false);
        this.confirmService.alert({
          title: 'فشل التعديل',
          message: err?.error?.message || 'تعذر تعديل الحركة المالية.',
          type: 'error'
        });
      }
    });
  }
}
