import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="w-full max-w-none">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">{{ 'FINANCE.PAGE_TITLE' | translate }}</h1>
        <p class="text-slate-400">{{ 'FINANCE.PAGE_SUBTITLE' | translate }}</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2">{{ 'FINANCE.TOTAL_INCOME' | translate }}</div>
          <div class="text-3xl font-bold text-emerald-400">{{ totalIncome }} {{ 'COMMON.CURRENCY' | translate }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2">{{ 'FINANCE.TOTAL_EXPENSES' | translate }}</div>
          <div class="text-3xl font-bold text-rose-400">{{ totalExpenses }} {{ 'COMMON.CURRENCY' | translate }}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2">{{ 'FINANCE.NET_BALANCE' | translate }}</div>
          <div class="text-3xl font-bold" [class.text-emerald-400]="netBalance >= 0" [class.text-rose-400]="netBalance < 0">
            {{ netBalance }} {{ 'COMMON.CURRENCY' | translate }}
          </div>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div class="text-slate-400 text-sm font-medium mb-2">{{ 'FINANCE.PENDING_PETTY_CASH' | translate }}</div>
          <div class="text-3xl font-bold text-amber-400">{{ pendingPettyCashCount }}</div>
        </div>
      </div>

      <!-- Project Selector (for all roles) -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <div class="flex items-center gap-4">
          <label class="text-sm font-medium text-slate-300">{{ 'FINANCE.SELECT_PROJECT' | translate }}</label>
          <select 
            [(ngModel)]="selectedProjectId" 
            (change)="onProjectChange()"
            class="flex-1 max-w-md bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="">{{ 'FINANCE.ALL_PROJECTS' | translate }}</option>
            @for (project of projects(); track project.id) {
              <option [value]="project.id">{{ project.name }}</option>
            }
          </select>
          @if (isSiteEngineer()) {
            <button 
              (click)="openPettyCashModal()"
              class="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-medium transition-colors"
            >
              {{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}
            </button>
          }
        </div>
      </div>

      <!-- Pending Approvals (for TenantOwner and Accountant) -->
      @if (isOwnerOrAccountant()) {
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-white">{{ 'FINANCE.PENDING_APPROVALS' | translate }}</h2>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {{ pendingApprovals().length }} {{ 'FINANCE.PENDING' | translate }}
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-slate-400 text-sm border-b border-slate-800">
                  <th class="pb-4 font-medium">{{ 'FINANCE.REQUESTER' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.PROJECT' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.REASON' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 font-medium text-right">{{ 'FINANCE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                @for (request of pendingApprovals(); track request.id) {
                  <tr class="border-b border-slate-800/50">
                    <td class="py-4 text-white">{{ request.issuedTo }}</td>
                    <td class="py-4 text-slate-300">{{ getProjectName(request.projectId) }}</td>
                    <td class="py-4 text-white font-medium">{{ request.amount }} {{ 'COMMON.CURRENCY' | translate }}</td>
                    <td class="py-4 text-slate-300">{{ request.reason }}</td>
                    <td class="py-4 text-slate-400">{{ formatDate(request.issuedAt) }}</td>
                    <td class="py-4 text-right">
                      <div class="flex items-center gap-2 justify-end">
                        <button 
                          (click)="approvePettyCash(request)"
                          class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          {{ 'FINANCE.APPROVE' | translate }}
                        </button>
                        <button 
                          (click)="rejectPettyCash(request)"
                          class="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          {{ 'FINANCE.REJECT' | translate }}
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-8 text-center text-slate-500">
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
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 class="text-xl font-bold text-white mb-6">{{ 'FINANCE.MY_PETTY_CASH' | translate }}</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-slate-400 text-sm border-b border-slate-800">
                  <th class="pb-4 font-medium">{{ 'FINANCE.PROJECT' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.AMOUNT' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.REASON' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.STATUS' | translate }}</th>
                  <th class="pb-4 font-medium text-right">{{ 'FINANCE.ACTIONS' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                @for (request of myPettyCash(); track request.id) {
                  <tr class="border-b border-slate-800/50">
                    <td class="py-4 text-white">{{ getProjectName(request.projectId) }}</td>
                    <td class="py-4 text-white font-medium">{{ request.amount }} {{ 'COMMON.CURRENCY' | translate }}</td>
                    <td class="py-4 text-slate-300">{{ request.reason }}</td>
                    <td class="py-4 text-slate-400">{{ formatDate(request.issuedAt) }}</td>
                    <td class="py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-semibold" 
                        [class.bg-emerald-500/10]="request.isSettled" 
                        [class.text-emerald-400]="request.isSettled"
                        [class.bg-amber-500/10]="!request.isSettled" 
                        [class.text-amber-400]="!request.isSettled"
                        [class.border-emerald-500/20]="request.isSettled"
                        [class.border-amber-500/20]="!request.isSettled"
                        class="border"
                      >
                        {{ request.isSettled ? ('FINANCE.SETTLED' | translate) : ('FINANCE.PENDING' | translate) }}
                      </span>
                    </td>
                    <td class="py-4 text-right">
                      @if (!request.isSettled) {
                        <button 
                          (click)="openSettleModal(request)"
                          class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          {{ 'FINANCE.SUBMIT_RECEIPTS' | translate }}
                        </button>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="py-8 text-center text-slate-500">
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
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 class="text-xl font-bold text-white mb-6">{{ 'FINANCE.TRANSACTIONS' | translate }}</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-slate-400 text-sm border-b border-slate-800">
                  <th class="pb-4 font-medium">{{ 'FINANCE.DATE' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.DESCRIPTION' | translate }}</th>
                  <th class="pb-4 font-medium">{{ 'FINANCE.TYPE' | translate }}</th>
                  <th class="pb-4 font-medium text-right">{{ 'FINANCE.AMOUNT' | translate }}</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                @for (transaction of transactions(); track transaction.id) {
                  <tr class="border-b border-slate-800/50">
                    <td class="py-4 text-slate-400">{{ formatDate(transaction.transactionDate) }}</td>
                    <td class="py-4 text-white">{{ transaction.description }}</td>
                    <td class="py-4">
                      <span class="px-3 py-1 rounded-full text-xs font-semibold" 
                        [class.bg-emerald-500/10]="transaction.type === 'Income'" 
                        [class.text-emerald-400]="transaction.type === 'Income'"
                        [class.bg-rose-500/10]="transaction.type === 'Expense'" 
                        [class.text-rose-400]="transaction.type === 'Expense'"
                        class="border"
                      >
                        {{ transaction.type === 'Income' ? ('FINANCE.INCOME' | translate) : ('FINANCE.EXPENSE' | translate) }}
                      </span>
                    </td>
                    <td class="py-4 text-right font-medium" 
                      [class.text-emerald-400]="transaction.type === 'Income'" 
                      [class.text-rose-400]="transaction.type === 'Expense'"
                    >
                      {{ transaction.type === 'Income' ? '+' : '-' }}{{ transaction.amount }} {{ 'COMMON.CURRENCY' | translate }}
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="4" class="py-8 text-center text-slate-500">
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
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white">{{ 'FINANCE.REQUEST_PETTY_CASH' | translate }}</h3>
            <button (click)="closePettyCashModal()" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitPettyCashRequest()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.PROJECT' | translate }}</label>
              <select 
                [(ngModel)]="pettyCashForm.projectId" 
                name="projectId"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">{{ 'FINANCE.SELECT_PROJECT' | translate }}</option>
                @for (project of projects(); track project.id) {
                  <option [value]="project.id">{{ project.name }}</option>
                }
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="pettyCashForm.amount" 
                name="amount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.CATEGORY' | translate }}</label>
              <select 
                [(ngModel)]="pettyCashForm.category" 
                name="category"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
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
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.REASON' | translate }}</label>
              <textarea 
                [(ngModel)]="pettyCashForm.reason" 
                name="reason"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              ></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closePettyCashModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading()"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
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
      <div class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-white">{{ 'FINANCE.SUBMIT_RECEIPTS' | translate }}</h3>
            <button (click)="closeSettleModal()" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form (ngSubmit)="submitSettleRequest()" class="space-y-4">
            <div class="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div class="text-sm text-slate-400 mb-1">{{ 'FINANCE.ISSUED_AMOUNT' | translate }}</div>
              <div class="text-xl font-bold text-white">{{ settleRequest()?.amount }} {{ 'COMMON.CURRENCY' | translate }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.SPENT_AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="settleForm.spentAmount" 
                name="spentAmount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.RETURN_AMOUNT' | translate }}</label>
              <input 
                type="number" 
                [(ngModel)]="settleForm.returnAmount" 
                name="returnAmount"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.RECEIPT_IMAGE' | translate }}</label>
              <input 
                type="file" 
                (change)="onFileSelect($event)"
                accept="image/*"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">{{ 'FINANCE.RECEIPT_NOTES' | translate }}</label>
              <textarea 
                [(ngModel)]="settleForm.notes" 
                name="notes"
                rows="3"
                class="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              ></textarea>
            </div>
            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                (click)="closeSettleModal()"
                class="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
              >
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button 
                type="submit"
                [disabled]="loading()"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {{ loading() ? ('COMMON.LOADING' | translate) : ('FINANCE.SUBMIT_SETTLEMENT' | translate) }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class FinancialsComponent {
  readonly authService = inject(AuthService);
  readonly projectService = inject(ProjectService);
  readonly pettyCashService = inject(PettyCashService);
  readonly financialService = inject(FinancialService);
  readonly imageUploadService = inject(ImageUploadService);

  readonly projects = signal<ProjectDto[]>([]);
  readonly pendingApprovals = signal<any[]>([]);
  readonly myPettyCash = signal<any[]>([]);
  readonly transactions = signal<FinancialTransactionMobileDto[]>([]);

  readonly selectedProjectId = signal<string>('');
  readonly showPettyCashModal = signal(false);
  readonly showSettleModal = signal(false);
  readonly loading = signal(false);
  readonly settleRequest = signal<any>(null);
  readonly selectedFile = signal<File | null>(null);

  readonly pettyCashForm = {
    projectId: '',
    amount: 0,
    category: '',
    reason: '',
  };

  readonly settleForm = {
    spentAmount: 0,
    returnAmount: 0,
    notes: '',
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
    this.loadData();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        if (response.data) {
          this.projects.set(response.data);
        }
      },
    });
  }

  loadData(): void {
    // In a real app, we'd load data based on selected project
    // For now, we'll just initialize with empty data
  }

  onProjectChange(): void {
    this.loadData();
  }

  isSiteEngineer(): boolean {
    return this.authService.currentUser()?.role === 'SiteEngineer';
  }

  isOwnerOrAccountant(): boolean {
    const role = this.authService.currentUser()?.role;
    return role === 'TenantOwner' || role === 'Accountant';
  }

  getProjectName(projectId: string): string {
    const project = this.projects().find((p) => p.id === projectId);
    return project?.name || 'Unknown Project';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  openPettyCashModal(): void {
    this.pettyCashForm.projectId = '';
    this.pettyCashForm.amount = 0;
    this.pettyCashForm.category = '';
    this.pettyCashForm.reason = '';
    this.showPettyCashModal.set(true);
  }

  closePettyCashModal(): void {
    this.showPettyCashModal.set(false);
  }

  submitPettyCashRequest(): void {
    if (!this.pettyCashForm.projectId || !this.pettyCashForm.amount || !this.pettyCashForm.reason) {
      return;
    }

    this.loading.set(true);
    const dto: PettyCashCreateDto = {
      issuedToUserId: this.authService.currentUser()?.userId || '',
      amount: this.pettyCashForm.amount,
      reason: this.pettyCashForm.reason,
    };

    this.pettyCashService.requestPettyCash(this.pettyCashForm.projectId, dto).subscribe({
      next: () => {
        this.closePettyCashModal();
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
    this.settleForm.returnAmount = 0;
    this.settleForm.notes = '';
    this.selectedFile.set(null);
    this.showSettleModal.set(true);
  }

  closeSettleModal(): void {
    this.showSettleModal.set(false);
    this.settleRequest.set(null);
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
    }
  }

  submitSettleRequest(): void {
    if (!this.settleForm.spentAmount || !this.settleForm.notes || !this.settleRequest()) {
      return;
    }

    this.loading.set(true);
    const request = this.settleRequest();

    // First upload the file if selected
    if (this.selectedFile()) {
      this.imageUploadService.uploadProjectGallery(request.projectId, this.selectedFile()!).subscribe({
        next: () => {
          this.submitSettleDto(request);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.submitSettleDto(request);
    }
  }

  private submitSettleDto(request: any): void {
    const dto: PettyCashSettleDto = {
      spentAmount: this.settleForm.spentAmount,
      receiptDescription: this.settleForm.notes,
    };

    this.pettyCashService.settlePettyCash(request.projectId, request.id, dto).subscribe({
      next: () => {
        this.closeSettleModal();
        this.loadData();
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  approvePettyCash(request: any): void {
    // In a real app, we'd call the API to approve
    console.log('Approving petty cash:', request);
  }

  rejectPettyCash(request: any): void {
    // In a real app, we'd call the API to reject
    console.log('Rejecting petty cash:', request);
  }
}
