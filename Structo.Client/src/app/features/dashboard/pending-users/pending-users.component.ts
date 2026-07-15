import { Component, inject, OnInit, signal, DestroyRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/services/toast.service';

export interface PendingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  personalPhone: string;
  whatsAppPhone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  tenantId: string | null;
  tenantName: string | null;
  subscriptionPlan: string | null;
}

@Component({
  selector: 'app-pending-users',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            ⏳ المستخدمون المعلقون / Pending Approvals
          </h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">تفعيل حسابات ملاك الشركات الجدد والتحقق من خطط اشتراكاتهم قبل منحهم حق الوصول للمنصة.</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-indigo-500/5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider block">بانتظار التفعيل / Awaiting Approval</span>
          <h3 class="text-3xl font-extrabold text-white mt-1">{{ pendingUsers().length }}</h3>
        </div>
      </div>

      <!-- Main Container with custom scrolls -->
      <div class="bg-slate-900/20 border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto min-h-0">
          <table class="w-full text-left border-collapse font-cairo">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th class="py-4 px-6">المستخدم / User Details</th>
                <th class="py-4 px-6">الشركة / Company Details</th>
                <th class="py-4 px-6">خطة الاشتراك / Plan</th>
                <th class="py-4 px-6">تاريخ التسجيل / Created At</th>
                <th class="py-4 px-6 text-right">الإجراءات / Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300 text-sm">
              @if (isLoading()) {
                <tr>
                  <td colspan="5" class="py-12 text-center text-slate-500 font-semibold animate-pulse">
                    Loading pending users...
                  </td>
                </tr>
              } @else if (pendingUsers().length === 0) {
                <tr>
                  <td colspan="5" class="py-12 text-center text-slate-500 font-semibold font-cairo">
                    لا يوجد مستخدمون بانتظار التفعيل حالياً / No pending users awaiting approval.
                  </td>
                </tr>
              } @else {
                @for (user of pendingUsers(); track user.id) {
                  <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                    <td class="py-4 px-6">
                      <div class="font-bold text-white text-sm">{{ user.firstName }} {{ user.lastName }}</div>
                      <div class="text-xs text-slate-400 mt-0.5">{{ user.email }}</div>
                    </td>
                    <td class="py-4 px-6">
                      @if (user.tenantName) {
                        <div class="font-semibold text-slate-200">{{ user.tenantName }}</div>
                        <div class="text-[10px] text-slate-500 font-mono mt-0.5">ID: {{ user.tenantId }}</div>
                      } @else {
                        <span class="text-xs text-slate-500 font-semibold">—</span>
                      }
                    </td>
                    <td class="py-4 px-6">
                      @if (user.subscriptionPlan) {
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          [ngClass]="{
                            'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': user.subscriptionPlan === 'Premium',
                            'bg-blue-500/10 text-blue-400 border border-blue-500/20': user.subscriptionPlan === 'Standard',
                            'bg-slate-500/10 text-slate-400 border border-slate-500/20': user.subscriptionPlan === 'Free'
                          }">
                          {{ user.subscriptionPlan }}
                        </span>
                      } @else {
                        <span class="text-xs text-slate-500 font-semibold">—</span>
                      }
                    </td>
                    <td class="py-4 px-6 text-xs text-slate-400">
                      {{ user.createdAt | date: 'dd/MM/yyyy h:mm a' }}
                    </td>
                    <td class="py-4 px-6 text-right">
                      <button
                        (click)="approve(user)"
                        [disabled]="processingId() === user.id"
                        class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        @if (processingId() === user.id) {
                          Processing...
                        } @else {
                          تفعيل وتنشيط / Activate & Approve
                        }
                      </button>
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class PendingUsersComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  readonly pendingUsers = signal<PendingUser[]>([]);
  readonly isLoading = signal(false);
  readonly processingId = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchPendingUsers();
  }

  private fetchPendingUsers(): void {
    this.isLoading.set(true);
    this.http.get<any>(`${environment.apiUrl}/superadmin/pending-users`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          if (res.success && res.data) {
            this.pendingUsers.set(res.data);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.toast.show('خطأ / Error', 'Failed to load pending users.', 'error');
        }
      });
  }

  approve(user: PendingUser): void {
    this.processingId.set(user.id);
    this.http.post<any>(`${environment.apiUrl}/superadmin/approve/${user.id}`, {})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.processingId.set(null);
          if (res.success) {
            this.toast.show('نجاح / Success', `تم تفعيل حساب ${user.firstName} بنجاح.`, 'success');
            this.pendingUsers.update(users => users.filter(u => u.id !== user.id));
          } else {
            this.toast.show('خطأ / Error', res.message || 'Failed to approve user.', 'error');
          }
        },
        error: (err) => {
          this.processingId.set(null);
          this.toast.show('خطأ / Error', err.error?.message || err.message || 'Failed to approve user.', 'error');
        }
      });
  }
}
