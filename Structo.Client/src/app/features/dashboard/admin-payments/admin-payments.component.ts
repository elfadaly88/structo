import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaymentAuditService, AdminPaymentsResponse, PaymentAttemptItem, TenantPaymentSummary } from '../../../core/services/payment-audit.service';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-cairo" dir="rtl">
      <!-- Page Header -->
      <div class="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>لوحة الرقابة والتدقيق المالي — SuperAdmin Platform Audit</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              تدقيق مدفوعات المنصة والـ Webhook
            </h1>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              متابعة مباشرة وشاملة لكافة عمليات الدفع عبر Paymob والتأكد الصارم من وصول إشعارات Webhook لكل عملية.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              (click)="loadAuditData()"
              [disabled]="isLoading()"
              class="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" [class.animate-spin]="isLoading()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>تحديث بيانات التدقيق</span>
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto space-y-6">
        <!-- PLATFORM-WIDE ALERT BANNER: Webhook Gap Detection -->
        @if (data() && (data()!.summary.neverArrivedCount > 0 || data()!.summary.hmacFailedCount > 0)) {
          <div class="p-4 sm:p-5 rounded-3xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-200 shadow-2xl shadow-rose-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
            <div class="flex items-start gap-3">
              <div class="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="space-y-1">
                <h3 class="text-sm sm:text-base font-extrabold text-white">
                  🚨 تم رصد فجوة في وصول إشعارات الدفع (Paymob Webhook Delivery Gap Detected)
                </h3>
                <p class="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                  يوجد <span class="font-bold underline text-white font-mono">{{ data()!.summary.neverArrivedCount }}</span> عملية دفع بحالة <span class="font-mono font-bold text-rose-300">NeverArrived</span> بإجمالي <span class="font-mono font-bold text-white">{{ data()!.summary.neverArrivedTotalAmountEgp }} ج.م</span> تم بدء الدفع بها ولم يصل إشعار الـ Webhook من سيرفرات Paymob خلال المهلة المحددة (15 دقيقة).
                </p>
              </div>
            </div>

            <button
              (click)="selectedStatusFilter.set('NeverArrived')"
              class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 shadow-md transition-all cursor-pointer">
              عرض العمليات المتأثرة فوراً
            </button>
          </div>
        }

        <!-- KPI Stats Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Revenue -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
            <span class="text-xs text-slate-400 font-bold block">إجمالي إيرادات الاشتراكات المؤكدة</span>
            <div class="flex items-baseline gap-1.5 mt-2">
              <span class="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{{ data()?.summary?.totalRevenueEgp || 0 }}</span>
              <span class="text-xs font-bold text-slate-400">ج.م</span>
            </div>
            <span class="text-[11px] text-emerald-500/80 font-medium mt-1 block">
              من أصل {{ data()?.summary?.confirmedCount || 0 }} عملية سداد مكتملة
            </span>
          </div>

          <!-- Confirmed Transactions -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
            <span class="text-xs text-emerald-400 font-bold block">العمليات المفعلة بنجاح 🟢</span>
            <span class="text-2xl sm:text-3xl font-black text-white font-mono mt-2 block">
              {{ data()?.summary?.confirmedCount || 0 }}
            </span>
            <span class="text-[11px] text-slate-400 mt-1 block">
              تم استلام الـ Webhook وتحديث السعة
            </span>
          </div>

          <!-- Never Arrived Webhooks -->
          <div 
            class="bg-slate-900/80 border rounded-3xl p-4 sm:p-5 shadow-xl transition-all"
            [class.border-rose-500]="(data()?.summary?.neverArrivedCount || 0) > 0"
            [class.bg-rose-950/20]="(data()?.summary?.neverArrivedCount || 0) > 0"
            [class.border-slate-800]="(data()?.summary?.neverArrivedCount || 0) === 0">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-rose-400">لم يصل الـ Webhook 🔴</span>
              @if ((data()?.summary?.neverArrivedCount || 0) > 0) {
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">تنبيه</span>
              }
            </div>
            <span class="text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-2 block">
              {{ data()?.summary?.neverArrivedCount || 0 }}
            </span>
            <span class="text-[11px] text-rose-300/80 mt-1 block">
              بإجمالي {{ data()?.summary?.neverArrivedTotalAmountEgp || 0 }} ج.م غير مؤكدة
            </span>
          </div>

          <!-- Total Attempts -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
            <span class="text-xs text-indigo-400 font-bold block">إجمالي محاولات الدفع الكلية</span>
            <span class="text-2xl sm:text-3xl font-black text-indigo-300 font-mono mt-2 block">
              {{ data()?.summary?.totalAttemptsCount || 0 }}
            </span>
            <span class="text-[11px] text-slate-400 mt-1 block">
              {{ data()?.summary?.pendingCount || 0 }} محاولة جارية حالياً 🟡
            </span>
          </div>
        </div>

        <!-- Section 1: Tenant Aggregation Summary Table -->
        <div class="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>🏢 ملخص المدفوعات حسب المنشأة والشركة (Tenants Summary)</span>
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">تجميع كلي لعدد المرات والمبالغ المستلمة من كل شركة وحالة Webhook</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-right text-xs">
              <thead class="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th class="py-3 px-4 font-bold">اسم المنشأة</th>
                  <th class="py-3 px-4 font-bold">الباقة الحالية</th>
                  <th class="py-3 px-4 font-bold">سعة المشاريع</th>
                  <th class="py-3 px-4 font-bold">العمليات المؤكدة</th>
                  <th class="py-3 px-4 font-bold">إجمالي المبالغ المدفوعة</th>
                  <th class="py-3 px-4 font-bold">العمليات المعلقة/المفقودة</th>
                  <th class="py-3 px-4 font-bold">آخر محاولة</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60">
                @for (t of data()?.tenantsSummary; track t.tenantId) {
                  <tr class="hover:bg-slate-800/40 transition-colors" [class.bg-rose-950/10]="t.hasNeverArrivedAlert">
                    <td class="py-3.5 px-4 font-bold text-white whitespace-nowrap flex items-center gap-2">
                      <span>{{ t.tenantName }}</span>
                      @if (t.hasNeverArrivedAlert) {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          ⚠️ فجوة Webhook
                        </span>
                      }
                    </td>
                    <td class="py-3.5 px-4 font-mono text-indigo-300 whitespace-nowrap">
                      {{ t.subscriptionPlan }}
                    </td>
                    <td class="py-3.5 px-4 font-mono text-slate-200 whitespace-nowrap">
                      {{ t.maxActiveProjects }} مشاريع
                    </td>
                    <td class="py-3.5 px-4 font-mono text-emerald-400 font-bold whitespace-nowrap">
                      {{ t.confirmedPurchasesCount }}
                    </td>
                    <td class="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                      {{ t.totalAmountSpentEgp }} ج.م
                    </td>
                    <td class="py-3.5 px-4 whitespace-nowrap">
                      @if (t.neverArrivedAttemptsCount > 0) {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white font-mono">
                          {{ t.neverArrivedAttemptsCount }} مفقودة
                        </span>
                      } @else {
                        <span class="text-slate-500 font-mono">0</span>
                      }
                    </td>
                    <td class="py-3.5 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {{ t.lastAttemptAt ? (t.lastAttemptAt | date:'yyyy-MM-dd HH:mm') : '-' }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Detailed Attempt Logs & Audit Table -->
        <div class="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div class="p-4 sm:p-5 border-b border-slate-800 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 class="text-base font-bold text-white flex items-center gap-2">
                  <span>📋 سجل محاولات الدفع وتدقيق الـ Webhook التفصيلي</span>
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">سجل كامل بكل محاولة بدء دفع وما إذا تم وصول إشعار Webhook بنجاح</p>
              </div>

              <!-- Search Box -->
              <div class="relative min-w-[240px]">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="بحث باسم المنشأة، البريد، رقم الطلب..."
                  class="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                <svg class="w-4 h-4 text-slate-500 absolute start-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Status Filter Pills -->
            <div class="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
              <button
                (click)="selectedStatusFilter.set('ALL')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                [class.bg-indigo-600]="selectedStatusFilter() === 'ALL'"
                [class.text-white]="selectedStatusFilter() === 'ALL'"
                [class.bg-slate-800]="selectedStatusFilter() !== 'ALL'"
                [class.text-slate-400]="selectedStatusFilter() !== 'ALL'">
                الكل ({{ data()?.attempts?.length || 0 }})
              </button>
              <button
                (click)="selectedStatusFilter.set('NeverArrived')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                [class.bg-rose-600]="selectedStatusFilter() === 'NeverArrived'"
                [class.text-white]="selectedStatusFilter() === 'NeverArrived'"
                [class.bg-slate-800]="selectedStatusFilter() !== 'NeverArrived'"
                [class.text-slate-400]="selectedStatusFilter() !== 'NeverArrived'">
                لم يصل الويب هوك 🔴 ({{ data()?.summary?.neverArrivedCount || 0 }})
              </button>
              <button
                (click)="selectedStatusFilter.set('Confirmed')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                [class.bg-emerald-600]="selectedStatusFilter() === 'Confirmed'"
                [class.text-white]="selectedStatusFilter() === 'Confirmed'"
                [class.bg-slate-800]="selectedStatusFilter() !== 'Confirmed'"
                [class.text-slate-400]="selectedStatusFilter() !== 'Confirmed'">
                المؤكدة 🟢 ({{ data()?.summary?.confirmedCount || 0 }})
              </button>
              <button
                (click)="selectedStatusFilter.set('Pending')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                [class.bg-amber-600]="selectedStatusFilter() === 'Pending'"
                [class.text-white]="selectedStatusFilter() === 'Pending'"
                [class.bg-slate-800]="selectedStatusFilter() !== 'Pending'"
                [class.text-slate-400]="selectedStatusFilter() !== 'Pending'">
                جاري المعالجة 🟡 ({{ data()?.summary?.pendingCount || 0 }})
              </button>
              <button
                (click)="selectedStatusFilter.set('HmacFailed')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                [class.bg-purple-600]="selectedStatusFilter() === 'HmacFailed'"
                [class.text-white]="selectedStatusFilter() === 'HmacFailed'"
                [class.bg-slate-800]="selectedStatusFilter() !== 'HmacFailed'"
                [class.text-slate-400]="selectedStatusFilter() !== 'HmacFailed'">
                فشل HMAC 🟣 ({{ data()?.summary?.hmacFailedCount || 0 }})
              </button>
            </div>
          </div>

          <!-- Loading State -->
          @if (isLoading()) {
            <div class="p-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3">
              <div class="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span>جاري تحميل سجل التدقيق المالي...</span>
            </div>
          } @else if (filteredAttempts().length === 0) {
            <div class="p-16 text-center text-slate-500 text-xs">
              لا توجد نتائج مطابقة للبحث أو الفلتر المحدد.
            </div>
          } @else {
            <!-- Desktop Table (hidden on mobile) -->
            <div class="hidden md:block overflow-x-auto">
              <table class="w-full text-right text-xs">
                <thead class="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th class="py-3.5 px-4 font-bold">التاريخ</th>
                    <th class="py-3.5 px-4 font-bold">المنشأة / المستخدم</th>
                    <th class="py-3.5 px-4 font-bold">الباقة / الطلب</th>
                    <th class="py-3.5 px-4 font-bold">المبلغ</th>
                    <th class="py-3.5 px-4 font-bold">رقم الطلب (Paymob ID)</th>
                    <th class="py-3.5 px-4 font-bold">حالة الـ Webhook</th>
                    <th class="py-3.5 px-4 font-bold">وقت وصول الـ Webhook</th>
                    <th class="py-3.5 px-4 font-bold">ملاحظات / أخطاء</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  @for (item of filteredAttempts(); track item.id) {
                    <tr class="hover:bg-slate-800/40 transition-colors" [class.bg-rose-950/15]="item.webhookStatus === 'NeverArrived'">
                      <td class="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                        {{ item.createdAt | date:'yyyy-MM-dd HH:mm' }}
                      </td>
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        <span class="font-bold text-white block">{{ item.tenantName }}</span>
                        <span class="text-[11px] text-slate-400 font-mono block">{{ item.userEmail || '-' }}</span>
                      </td>
                      <td class="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        {{ item.planRequested }}
                      </td>
                      <td class="py-3.5 px-4 font-mono font-bold text-indigo-300 whitespace-nowrap">
                        {{ item.amount }} ج.م
                      </td>
                      <td class="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                        {{ item.paymobOrderId || item.specialReference || '-' }}
                      </td>
                      <td class="py-3.5 px-4 whitespace-nowrap">
                        @if (item.webhookStatus === 'Confirmed') {
                          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>مؤكد (Confirmed)</span>
                          </span>
                        } @else if (item.webhookStatus === 'Pending') {
                          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            <span>جاري المعالجة (Pending)</span>
                          </span>
                        } @else if (item.webhookStatus === 'NeverArrived') {
                          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                            <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                            <span>لم يصل (NeverArrived)</span>
                          </span>
                        } @else if (item.webhookStatus === 'HmacFailed') {
                          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                            <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                            <span>فشل HMAC</span>
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400">
                            {{ item.webhookStatus }}
                          </span>
                        }
                      </td>
                      <td class="py-3.5 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {{ item.webhookReceivedAt ? (item.webhookReceivedAt | date:'yyyy-MM-dd HH:mm:ss') : '—' }}
                      </td>
                      <td class="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs truncate" [title]="item.errorMessage || ''">
                        {{ item.errorMessage || '—' }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <!-- Mobile Card Layout (block md:hidden, 320px - 480px) -->
            <div class="block md:hidden divide-y divide-slate-800">
              @for (item of filteredAttempts(); track item.id) {
                <div class="p-4 space-y-2.5" [class.bg-rose-950/10]="item.webhookStatus === 'NeverArrived'">
                  <div class="flex items-center justify-between gap-2">
                    <div>
                      <span class="font-bold text-white text-sm block">{{ item.tenantName }}</span>
                      <span class="text-[11px] text-slate-400 font-mono">{{ item.userEmail }}</span>
                    </div>
                    <span class="font-mono font-bold text-indigo-400 text-sm">{{ item.amount }} ج.م</span>
                  </div>

                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>الباقة / الزيادة:</span>
                    <span class="font-bold text-slate-200">{{ item.planRequested }}</span>
                  </div>

                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>التاريخ:</span>
                    <span class="font-mono text-slate-300">{{ item.createdAt | date:'yyyy-MM-dd HH:mm' }}</span>
                  </div>

                  <div class="flex items-center justify-between text-xs text-slate-400">
                    <span>رقم الطلب (Paymob ID):</span>
                    <span class="font-mono text-slate-300">{{ item.paymobOrderId || item.specialReference }}</span>
                  </div>

                  <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span class="text-[11px] text-slate-400">حالة وصول الـ Webhook:</span>
                    @if (item.webhookStatus === 'Confirmed') {
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        مؤكد 🟢
                      </span>
                    } @else if (item.webhookStatus === 'Pending') {
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        جاري المعالجة 🟡
                      </span>
                    } @else if (item.webhookStatus === 'NeverArrived') {
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                        لم يصل الويب هوك 🔴
                      </span>
                    } @else {
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                        {{ item.webhookStatus }}
                      </span>
                    }
                  </div>

                  @if (item.errorMessage) {
                    <p class="text-[11px] text-rose-300/90 bg-rose-500/10 p-2 rounded-xl border border-rose-500/20">
                      {{ item.errorMessage }}
                    </p>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class AdminPaymentsComponent implements OnInit {
  private readonly paymentAuditService = inject(PaymentAuditService);

  readonly data = signal<AdminPaymentsResponse | null>(null);
  readonly isLoading = signal<boolean>(false);

  // Filters
  searchQuery = '';
  readonly selectedStatusFilter = signal<string>('ALL');

  readonly filteredAttempts = computed<PaymentAttemptItem[]>(() => {
    const response = this.data();
    if (!response || !response.attempts) return [];

    let list = response.attempts;
    const status = this.selectedStatusFilter();
    if (status !== 'ALL') {
      list = list.filter(a => a.webhookStatus === status);
    }

    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(a =>
        (a.tenantName && a.tenantName.toLowerCase().includes(q)) ||
        (a.userEmail && a.userEmail.toLowerCase().includes(q)) ||
        (a.paymobOrderId && a.paymobOrderId.toLowerCase().includes(q)) ||
        (a.specialReference && a.specialReference.toLowerCase().includes(q)) ||
        (a.referenceNumber && a.referenceNumber.toLowerCase().includes(q)) ||
        (a.planRequested && a.planRequested.toLowerCase().includes(q))
      );
    }

    return list;
  });

  ngOnInit(): void {
    this.loadAuditData();
  }

  loadAuditData(): void {
    this.isLoading.set(true);
    this.paymentAuditService.getAdminPayments().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.data.set(res.data);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
      }
    });
  }
}
