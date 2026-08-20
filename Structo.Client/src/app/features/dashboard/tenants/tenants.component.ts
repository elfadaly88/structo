import {
  Component, inject, OnInit, signal, computed,
  DestroyRef, ChangeDetectorRef, NgZone
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantsService } from '../../../core/services/tenants.service';
import { WhatsAppLinkService } from '../../../core/services/whatsapp-link.service';
import { TenantDto } from '../../../core/services/public-directory.service';
import {
  TenantLifecycleSummary,
  AdminTenantItem,
  AdminTenantPagedResult,
  ForcePurgeResult,
  ExemptionToggleResponse
} from '../../../core/models/admin-tenant.models';

type TenantActionType = 'Activate' | 'Reject' | 'Suspend';
type StatusFilterType = 'All' | 'Active' | 'Suspended' | 'PendingDeletion' | 'Inactive45' | 'Exempt';

interface ActiveActionContext {
  tenantName: string;
  ownerName: string;
  phone: string;
  status: TenantActionType;
  mapLink: string | null;
}

interface ModeratedProject {
  id: string;
  name: string;
  clientRating?: number | null;
  clientName?: string | null;
  clientReviewNotes?: string | null;
  isReviewHidden?: boolean;
}

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe],
  template: `
    <div class="space-y-6 w-full max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🛡️</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-cairo">
              لوحة التحكم المركزية للسوبر أدمن / Super Admin Lifecycle Hub
            </h1>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 mt-1 font-cairo">
            مراقبة دورة حياة الشركات، تنظيف السيرفر والتخزين السحابي (Cloud Storage Purging)، وإدارة الاستثناءات والحسابات الخاملة.
          </p>
        </div>

        <button
          (click)="refreshData()"
          [disabled]="isLoading()"
          class="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-850 text-indigo-400 border border-indigo-500/25 hover:border-indigo-500/40 rounded-xl text-xs font-bold font-cairo transition-all active:scale-95 cursor-pointer">
          <svg class="w-4 h-4" [class.animate-spin]="isLoading()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>تحديث البيانات / Refresh</span>
        </button>
      </div>

      <!-- KPI Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Card 1: Total Tenants -->
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo">إجمالي الشركات / Total Tenants</span>
            <span class="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm">🏢</span>
          </div>
          <div class="mt-3">
            <h3 class="text-3xl font-extrabold text-white font-mono tabular-nums">
              {{ lifecycleSummary()?.totalTenants ?? adminTenants().length }}
            </h3>
            <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-cairo">
              <span class="text-emerald-400 font-bold">🟢 {{ lifecycleSummary()?.activeCount ?? 0 }} نشط</span>
              <span>•</span>
              <span class="text-rose-400 font-bold">🟡 {{ lifecycleSummary()?.suspendedCount ?? 0 }} معلق</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Active Free vs Pro -->
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo">الباقات / Plans Distribution</span>
            <span class="p-2 rounded-xl bg-purple-500/10 text-purple-400 text-sm">💎</span>
          </div>
          <div class="mt-3">
            <div class="flex items-baseline gap-2">
              <h3 class="text-3xl font-extrabold text-purple-400 font-mono tabular-nums">
                {{ lifecycleSummary()?.proTenantsCount ?? 0 }}
              </h3>
              <span class="text-xs text-slate-400 font-cairo font-bold">مدفوع (Pro)</span>
            </div>
            <div class="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-cairo">
              <span>المجاني (Free): <strong class="text-slate-200 font-mono">{{ lifecycleSummary()?.freeTenantsCount ?? 0 }}</strong></span>
              <span class="text-indigo-400 font-mono">📁 {{ lifecycleSummary()?.totalProjectsCount ?? 0 }} مشروع</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Inactive > 45 Days -->
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between"
             [class.border-amber-500/40]="(lifecycleSummary()?.inactiveOver45DaysCount ?? 0) > 0">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo">خامل > 45 يوم / Inactive > 45d</span>
            <span class="p-2 rounded-xl bg-amber-500/10 text-amber-400 text-sm">⚠️</span>
          </div>
          <div class="mt-3">
            <h3 class="text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
              {{ lifecycleSummary()?.inactiveOver45DaysCount ?? 0 }}
            </h3>
            <p class="text-[11px] text-amber-300/80 mt-1 font-cairo font-medium">
              مرشح للحذف التلقائي وتفريغ المساحة
            </p>
          </div>
        </div>

        <!-- Card 4: Cloud Storage Purging Stats -->
        <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo">سعة التخزين / Storage Footprint</span>
            <span class="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 text-sm">💾</span>
          </div>
          <div class="mt-3">
            <h3 class="text-3xl font-extrabold text-cyan-300 font-mono tabular-nums">
              {{ (lifecycleSummary()?.totalStorageFootprintMb ?? 0) | number:'1.1-2' }} <span class="text-sm font-sans text-slate-400">MB</span>
            </h3>
            <p class="text-[11px] text-cyan-400/80 mt-1 font-cairo">
              Cloudflare R2 Blob Storage Synced 🛡️
            </p>
          </div>
        </div>
      </div>

      <!-- Alerts & Notifications -->
      @if (errorMessage()) {
        <div class="bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl p-4 text-xs sm:text-sm font-semibold flex items-center justify-between font-cairo">
          <span>⚠️ {{ errorMessage() }}</span>
          <button (click)="errorMessage.set(null)" class="text-rose-400 hover:text-rose-200 cursor-pointer">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }
      @if (successMessage()) {
        <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-4 text-xs sm:text-sm font-semibold flex items-center justify-between font-cairo">
          <span>✅ {{ successMessage() }}</span>
          <button (click)="successMessage.set(null)" class="text-emerald-400 hover:text-emerald-200 cursor-pointer">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }

      <!-- Main Panel: Filters, Search, and Tenants Table -->
      <div class="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <!-- Filter Bar -->
        <div class="p-4 sm:p-5 border-b border-slate-800 space-y-4">
          <!-- Top Row: Search & Dropdowns -->
          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div class="relative flex-1 max-w-md">
              <input
                type="text"
                [(ngModel)]="searchQuery"
                (ngModelChange)="onSearchChange()"
                placeholder="بحث باسم الشركة، الإيميل، الموقع أو المعرف ID..."
                class="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-cairo" />
              <svg class="w-4 h-4 text-slate-500 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div class="flex items-center gap-2.5 flex-wrap">
              <!-- Plan Filter -->
              <select
                [(ngModel)]="planFilter"
                (ngModelChange)="onFilterChange()"
                class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-cairo focus:outline-none focus:border-indigo-500">
                <option value="All">جميع الباقات / All Plans</option>
                <option value="Free">باقة مجانية (Free)</option>
                <option value="Standard">باقة قياسية (Standard)</option>
                <option value="Premium">باقة احترافية (Premium)</option>
              </select>

              <!-- Page Size -->
              <select
                [(ngModel)]="pageSize"
                (ngModelChange)="onPageSizeChange()"
                class="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500">
                <option [value]="10">10 / page</option>
                <option [value]="25">25 / page</option>
                <option [value]="50">50 / page</option>
              </select>
            </div>
          </div>

          <!-- Bottom Row: Quick Status Filter Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-cairo">
            <button
              (click)="setStatusFilter('All')"
              class="px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer"
              [class.bg-indigo-600]="statusFilter() === 'All'"
              [class.text-white]="statusFilter() === 'All'"
              [class.bg-slate-950]="statusFilter() !== 'All'"
              [class.text-slate-400]="statusFilter() !== 'All'"
              [class.border]="statusFilter() !== 'All'"
              [class.border-slate-800]="statusFilter() !== 'All'">
              الكل / All
            </button>

            <button
              (click)="setStatusFilter('Active')"
              class="px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              [class.bg-emerald-600]="statusFilter() === 'Active'"
              [class.text-white]="statusFilter() === 'Active'"
              [class.bg-slate-950]="statusFilter() !== 'Active'"
              [class.text-emerald-400]="statusFilter() !== 'Active'"
              [class.border]="statusFilter() !== 'Active'"
              [class.border-emerald-500/25]="statusFilter() !== 'Active'">
              <span>🟢</span>
              <span>النشطة (Active)</span>
            </button>

            <button
              (click)="setStatusFilter('Suspended')"
              class="px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              [class.bg-amber-600]="statusFilter() === 'Suspended'"
              [class.text-white]="statusFilter() === 'Suspended'"
              [class.bg-slate-950]="statusFilter() !== 'Active' && statusFilter() !== 'Suspended'"
              [class.text-amber-400]="statusFilter() !== 'Suspended'"
              [class.border]="statusFilter() !== 'Suspended'"
              [class.border-amber-500/25]="statusFilter() !== 'Suspended'">
              <span>🟡</span>
              <span>المعلقة (Suspended)</span>
            </button>

            <button
              (click)="setStatusFilter('PendingDeletion')"
              class="px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              [class.bg-rose-600]="statusFilter() === 'PendingDeletion'"
              [class.text-white]="statusFilter() === 'PendingDeletion'"
              [class.bg-slate-950]="statusFilter() !== 'PendingDeletion'"
              [class.text-rose-400]="statusFilter() !== 'PendingDeletion'"
              [class.border]="statusFilter() !== 'PendingDeletion'"
              [class.border-rose-500/25]="statusFilter() !== 'PendingDeletion'">
              <span>🔴</span>
              <span>قيد الحذف (Pending Deletion)</span>
            </button>

            <button
              (click)="setStatusFilter('Inactive45')"
              class="px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              [class.bg-amber-700]="statusFilter() === 'Inactive45'"
              [class.text-white]="statusFilter() === 'Inactive45'"
              [class.bg-slate-950]="statusFilter() !== 'Inactive45'"
              [class.text-amber-300]="statusFilter() !== 'Inactive45'"
              [class.border]="statusFilter() !== 'Inactive45'"
              [class.border-amber-600/30]="statusFilter() !== 'Inactive45'">
              <span>⏳</span>
              <span>خامل > 45 يوم</span>
            </button>

            <button
              (click)="setStatusFilter('Exempt')"
              class="px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              [class.bg-cyan-700]="statusFilter() === 'Exempt'"
              [class.text-white]="statusFilter() === 'Exempt'"
              [class.bg-slate-950]="statusFilter() !== 'Exempt'"
              [class.text-cyan-300]="statusFilter() !== 'Exempt'"
              [class.border]="statusFilter() !== 'Exempt'"
              [class.border-cyan-500/25]="statusFilter() !== 'Exempt'">
              <span>🛡️</span>
              <span>المستثناة (Exempt)</span>
            </button>
          </div>
        </div>

        <!-- Table Content -->
        @if (isLoading()) {
          <div class="flex flex-col justify-center items-center py-20 gap-3">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-xs text-slate-400 font-cairo">جاري تحميل سجل الشركات والبيانات التخزينية...</span>
          </div>
        } @else {
          <!-- Desktop Table (md+) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-left rtl:text-right border-collapse">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider font-cairo bg-slate-950/40">
                  <th class="px-4 py-3.5">الشركة والمشرف / Tenant</th>
                  <th class="px-4 py-3.5">الباقة / Plan</th>
                  <th class="px-4 py-3.5">الحالة / Status</th>
                  <th class="px-4 py-3.5">النشاط / Inactivity</th>
                  <th class="px-4 py-3.5">التخزين / Storage</th>
                  <th class="px-4 py-3.5 text-center">الاستثناء / Exemption</th>
                  <th class="px-4 py-3.5 text-center">العمليات / Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-850 text-slate-300 text-xs">
                @for (tenant of displayedTenants(); track tenant.id) {
                  <tr class="hover:bg-slate-900/40 transition-colors duration-150"
                      [class.bg-rose-950/10]="tenant.status === 'PendingDeletion'"
                      [class.bg-amber-950/10]="tenant.daysInactive >= 45 && tenant.status !== 'PendingDeletion'">
                    
                    <!-- Tenant & Owner Info -->
                    <td class="px-4 py-3.5">
                      <div class="flex items-center gap-3">
                        @if (tenant.logoUrl) {
                          <img [src]="tenant.logoUrl" class="w-9 h-9 rounded-xl object-cover border border-slate-800 shrink-0">
                        } @else {
                          <div class="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                            {{ tenant.name.substring(0, 2) }}
                          </div>
                        }
                        <div class="min-w-0">
                          <div class="flex items-center gap-2">
                            <span class="font-bold text-white text-sm truncate">{{ tenant.name }}</span>
                            @if (tenant.isCleanupExempt) {
                              <span title="مستثناة من المسح التلقائي" class="text-xs">🛡️</span>
                            }
                          </div>
                          <div class="text-[11px] text-slate-400 truncate mt-0.5">
                            {{ tenant.adminEmail || 'بدون بريد مشرف' }}
                            @if (tenant.region) {
                              <span class="text-slate-500">· {{ tenant.region }}</span>
                            }
                          </div>
                          <span class="font-mono text-[9px] text-slate-600 block select-all">{{ tenant.id }}</span>
                        </div>
                      </div>
                    </td>

                    <!-- Subscription Plan -->
                    <td class="px-4 py-3.5">
                      @if (tenant.planType === 'Premium') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/25">💎 Premium</span>
                      } @else if (tenant.planType === 'Standard') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">⭐ Standard</span>
                      } @else {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700/60">Free ({{ tenant.maxActiveProjects }}P)</span>
                      }
                      <div class="text-[10px] text-slate-500 mt-1 font-mono">
                        {{ tenant.totalProjects }} مشاريع · {{ tenant.totalUsers }} مستخدمين
                      </div>
                    </td>

                    <!-- Status Badge -->
                    <td class="px-4 py-3.5">
                      @if (tenant.status === 'Active') {
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25 text-[11px]">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Active 🟢
                        </span>
                      } @else if (tenant.status === 'Suspended') {
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25 text-[11px]">
                          Suspended 🟡
                        </span>
                      } @else if (tenant.status === 'PendingDeletion' || tenant.status === 'Deleted') {
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/25 text-[11px]">
                          Pending Deletion 🔴
                        </span>
                      } @else {
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 font-bold border border-sky-500/25 text-[11px]">
                          {{ tenant.status }} 🔵
                        </span>
                      }
                    </td>

                    <!-- Activity / Inactivity Days -->
                    <td class="px-4 py-3.5">
                      @if (tenant.daysInactive >= 45) {
                        <div class="text-amber-400 font-bold text-xs flex items-center gap-1">
                          <span>⚠️</span>
                          <span>خامل منذ {{ tenant.daysInactive }} يوم</span>
                        </div>
                      } @else {
                        <div class="text-slate-300 font-semibold text-xs">
                          منذ {{ tenant.daysInactive }} يوم
                        </div>
                      }
                      <span class="text-[10px] text-slate-500 font-mono block mt-0.5">
                        آخر نشاط: {{ (tenant.lastActiveAt || tenant.createdAt) | date:'dd/MM/yyyy' }}
                      </span>
                    </td>

                    <!-- Storage Footprint -->
                    <td class="px-4 py-3.5">
                      <div class="font-mono font-bold text-xs text-cyan-300">
                        {{ tenant.storageFootprintMb | number:'1.1-2' }} MB
                      </div>
                      <span class="text-[10px] text-slate-500 font-cairo">R2 Blobs</span>
                    </td>

                    <!-- Exemption Toggle -->
                    <td class="px-4 py-3.5 text-center">
                      <button
                        (click)="toggleExemption(tenant)"
                        [disabled]="isUpdatingExemptionId() === tenant.id"
                        title="انقر لتبديل استثناء الشركة من الحذف التلقائي"
                        class="px-2.5 py-1.5 rounded-xl text-[10px] font-bold font-cairo transition-all active:scale-95 cursor-pointer border"
                        [class.bg-emerald-500/10]="tenant.isCleanupExempt"
                        [class.text-emerald-300]="tenant.isCleanupExempt"
                        [class.border-emerald-500/30]="tenant.isCleanupExempt"
                        [class.hover:bg-emerald-500/20]="tenant.isCleanupExempt"
                        [class.bg-slate-900]="!tenant.isCleanupExempt"
                        [class.text-slate-400]="!tenant.isCleanupExempt"
                        [class.border-slate-800]="!tenant.isCleanupExempt"
                        [class.hover:text-amber-300]="!tenant.isCleanupExempt">
                        @if (isUpdatingExemptionId() === tenant.id) {
                          <svg class="animate-spin h-3.5 w-3.5 text-current inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        } @else if (tenant.isCleanupExempt) {
                          <span>🛡️ مستثناة (Exempt)</span>
                        } @else {
                          <span>⚠️ غير مستثناة</span>
                        }
                      </button>
                    </td>

                    <!-- Actions -->
                    <td class="px-4 py-3.5">
                      <div class="flex items-center justify-center gap-1.5">
                        <!-- Inspect Audit -->
                        <button
                          (click)="inspectAdminTenant(tenant)"
                          title="فحص بروفايل الشركة والسجل"
                          class="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 text-indigo-400 border border-indigo-900/40 rounded-xl text-[10px] font-bold font-cairo transition-all active:scale-95 cursor-pointer">
                          فحص / Inspect
                        </button>

                        <!-- Upgrade Manual -->
                        <button
                          (click)="openManualUpgradeModal(tenant)"
                          title="شحن مشاريع إضافية وتوليد إيصال"
                          class="px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-bold font-cairo transition-all active:scale-95 cursor-pointer">
                          💳 ترقية
                        </button>

                        <!-- Force Purge Action Trigger -->
                        <button
                          (click)="openForcePurgeModal(tenant)"
                          title="حذف جذري فوري (قاعدة البيانات والتخزين السحابي)"
                          class="px-2.5 py-1.5 bg-rose-950/50 hover:bg-rose-900/80 text-rose-300 hover:text-rose-100 border border-rose-500/30 hover:border-rose-500/50 rounded-xl text-[10px] font-bold font-cairo transition-all active:scale-95 cursor-pointer flex items-center gap-1">
                          <span>🗑️ مسح جذري</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">
                      لا توجد شركات مطابقة لمعايير البحث الحالية.
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Mobile Cards View (< md) -->
          <div class="block md:hidden divide-y divide-slate-800/60 font-cairo">
            @for (tenant of displayedTenants(); track tenant.id) {
              <div class="p-4 space-y-3"
                   [class.bg-rose-950/10]="tenant.status === 'PendingDeletion'"
                   [class.bg-amber-950/10]="tenant.daysInactive >= 45 && tenant.status !== 'PendingDeletion'">
                <!-- Top Row: Logo, Name, Plan -->
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2.5">
                    @if (tenant.logoUrl) {
                      <img [src]="tenant.logoUrl" class="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0">
                    } @else {
                      <div class="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                        {{ tenant.name.substring(0, 2) }}
                      </div>
                    }
                    <div class="min-w-0">
                      <div class="font-bold text-white text-sm flex items-center gap-1.5">
                        <span class="truncate">{{ tenant.name }}</span>
                        @if (tenant.isCleanupExempt) {
                          <span title="مستثناة" class="text-xs">🛡️</span>
                        }
                      </div>
                      <div class="text-[11px] text-slate-400 font-mono truncate">{{ tenant.adminEmail || 'بدون بريد' }}</div>
                    </div>
                  </div>

                  @if (tenant.planType === 'Premium') {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/25 shrink-0">💎 Pro</span>
                  } @else if (tenant.planType === 'Standard') {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 shrink-0">⭐ Std</span>
                  } @else {
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700/60 shrink-0">Free</span>
                  }
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-2 gap-2 text-xs bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                  <div>
                    <span class="text-slate-500 text-[10px] block">الحالة / Status</span>
                    <span class="font-bold text-xs"
                          [class.text-emerald-400]="tenant.status === 'Active'"
                          [class.text-amber-400]="tenant.status === 'Suspended'"
                          [class.text-rose-400]="tenant.status === 'PendingDeletion'">
                      {{ tenant.status }}
                    </span>
                  </div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">التخزين / Storage</span>
                    <span class="font-mono font-bold text-cyan-300 text-xs">{{ tenant.storageFootprintMb | number:'1.1-2' }} MB</span>
                  </div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">المشاريع / Users</span>
                    <span class="text-slate-300 font-mono text-xs">{{ tenant.totalProjects }} P · {{ tenant.totalUsers }} U</span>
                  </div>
                  <div>
                    <span class="text-slate-500 text-[10px] block">النشاط / Inactivity</span>
                    <span class="text-xs" [class.text-amber-400]="tenant.daysInactive >= 45" [class.text-slate-400]="tenant.daysInactive < 45">
                      {{ tenant.daysInactive }} يوم
                    </span>
                  </div>
                </div>

                <!-- Exemption & Action Buttons -->
                <div class="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    (click)="toggleExemption(tenant)"
                    [disabled]="isUpdatingExemptionId() === tenant.id"
                    class="flex-1 min-h-[40px] px-2.5 py-1.5 rounded-xl text-xs font-bold font-cairo transition-all border flex items-center justify-center gap-1"
                    [class.bg-emerald-500/10]="tenant.isCleanupExempt"
                    [class.text-emerald-300]="tenant.isCleanupExempt"
                    [class.border-emerald-500/30]="tenant.isCleanupExempt"
                    [class.bg-slate-900]="!tenant.isCleanupExempt"
                    [class.text-slate-400]="!tenant.isCleanupExempt"
                    [class.border-slate-800]="!tenant.isCleanupExempt">
                    @if (isUpdatingExemptionId() === tenant.id) {
                      <span class="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    } @else if (tenant.isCleanupExempt) {
                      <span>🛡️ مستثناة</span>
                    } @else {
                      <span>⚠️ غير مستثناة</span>
                    }
                  </button>

                  <button
                    (click)="inspectAdminTenant(tenant)"
                    class="min-h-[40px] px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-indigo-900/40 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer">
                    فحص
                  </button>

                  <button
                    (click)="openManualUpgradeModal(tenant)"
                    class="min-h-[40px] px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer">
                    ترقية
                  </button>

                  <button
                    (click)="openForcePurgeModal(tenant)"
                    class="min-h-[40px] px-3 py-1.5 bg-rose-950/50 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold font-cairo transition-all cursor-pointer flex items-center gap-1">
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            } @empty {
              <div class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">
                لا توجد شركات مطابقة لمعايير البحث الحالية.
              </div>
            }
          </div>

          <!-- Pagination Footer -->
          <div class="px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-cairo text-slate-400">
            <div>
              عرض <strong class="text-white">{{ displayedTenants().length }}</strong> من إجمالي <strong class="text-white">{{ totalItems() }}</strong> شركة
            </div>
            <div class="flex items-center gap-2">
              <button
                (click)="prevPage()"
                [disabled]="currentPage() <= 1"
                class="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-850 hover:text-white transition-all cursor-pointer">
                السابق / Prev
              </button>
              <span class="px-2 font-mono text-slate-300">
                {{ currentPage() }} / {{ totalPages() || 1 }}
              </span>
              <button
                (click)="nextPage()"
                [disabled]="currentPage() >= totalPages()"
                class="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-850 hover:text-white transition-all cursor-pointer">
                التالي / Next
              </button>
            </div>
          </div>
        }
      </div>

      <!-- ========================================== -->
      <!-- SAFETY CONFIRMATION MODAL FOR FORCE PURGE  -->
      <!-- ========================================== -->
      @if (purgeTargetTenant(); as target) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 font-sans">
          <div (click)="closeForcePurgeModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-md"></div>

          <div class="relative z-10 w-full max-w-lg mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-950 border-2 border-rose-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-rose-950/50">
            <!-- Modal Header -->
            <div class="sticky top-0 z-10 border-b border-rose-500/20 bg-rose-950/40 px-5 py-4 backdrop-blur-sm flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <span class="text-2xl animate-bounce">🚨</span>
                <div>
                  <h3 class="text-base font-bold text-white font-cairo">تحذير أمني: الحذف الجذري للشركة (Force Purge)</h3>
                  <p class="text-[11px] text-rose-300 font-mono">Tenant ID: {{ target.id }}</p>
                </div>
              </div>
              <button
                (click)="closeForcePurgeModal()"
                [disabled]="isPurging()"
                class="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Body (Independent Scroll Box) -->
            <div class="flex-1 overflow-y-auto min-h-0 p-5 space-y-4 text-right font-cairo">
              @if (purgeResult(); as result) {
                <!-- Success Result Screen -->
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-3">
                  <span class="text-4xl">🎉</span>
                  <h4 class="text-lg font-bold text-emerald-300">تم تنفيذ الحذف الجذري وتفريغ التخزين بنجاح</h4>
                  <p class="text-xs text-slate-300">{{ result.message }}</p>

                  <div class="grid grid-cols-2 gap-2 text-xs pt-2">
                    <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      <span class="text-slate-400 block text-[10px]">الملفات المحذوفة من R2</span>
                      <strong class="text-cyan-400 font-mono text-base">{{ result.deletedFilesCount }} ملف</strong>
                    </div>
                    <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      <span class="text-slate-400 block text-[10px]">المشاريع الممسوحة</span>
                      <strong class="text-purple-400 font-mono text-base">{{ result.deletedProjectsCount }} مشروع</strong>
                    </div>
                    <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      <span class="text-slate-400 block text-[10px]">المعاملات المالية</span>
                      <strong class="text-amber-400 font-mono text-base">{{ result.deletedTransactionsCount }} معاملة</strong>
                    </div>
                    <div class="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                      <span class="text-slate-400 block text-[10px]">حسابات المستخدمين</span>
                      <strong class="text-rose-400 font-mono text-base">{{ result.deletedUsersCount }} مستخدم</strong>
                    </div>
                  </div>

                  <button
                    (click)="closeForcePurgeModal()"
                    class="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
                    إغلاق وتحديث القائمة / Close
                  </button>
                </div>
              } @else {
                <!-- Safety Warning & Confirmation Form -->
                <div class="p-4 bg-rose-500/10 border border-rose-500/25 rounded-xl text-xs text-rose-200 space-y-2">
                  <p class="font-bold text-sm text-rose-100">⚠️ هذه العملية نهائية ولا يمكن التراجع عنها مطلقاً!</p>
                  <p>سيتم تنفيذ الإجراءات التالية دفعة واحدة:</p>
                  <ul class="list-disc list-inside text-[11px] space-y-1 text-slate-300">
                    <li>حذف سجل الشركة وحسابات مستخدميها بالكامل من قاعدة البيانات.</li>
                    <li>مسح كافة المشاريع، العهد النقدية، التسويات، وسجلات الميزانية.</li>
                    <li><strong>حذف فعلي وفوري لجميع الملفات والصور والإيصالات من التخزين السحابي (Cloudflare R2 Storage Purge) لمنع تراكم الملفات اليتيمة.</strong></li>
                  </ul>
                </div>

                <div class="space-y-1 text-xs">
                  <span class="text-slate-400 block">الشركة المستهدفة:</span>
                  <div class="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white font-bold text-sm flex items-center justify-between">
                    <span>{{ target.name }}</span>
                    <span class="text-xs font-mono text-amber-400">{{ target.storageFootprintMb }} MB Storage</span>
                  </div>
                </div>

                <div class="space-y-2 pt-2">
                  <label class="block text-xs font-bold text-slate-300">
                    للتأكيد، يرجى كتابة اسم الشركة <span class="text-rose-400 font-mono font-bold select-all">"{{ target.name }}"</span> في الحقل أدناه:
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="purgeConfirmationInput"
                    [placeholder]="target.name"
                    class="w-full px-3 py-2.5 bg-slate-900 border border-rose-500/40 focus:border-rose-500 rounded-xl text-sm text-white focus:outline-none font-cairo" />
                </div>

                <div class="flex items-center gap-2 pt-2 text-xs text-slate-400">
                  <input
                    type="checkbox"
                    id="ackCheck"
                    [(ngModel)]="isPurgeAcknowledged"
                    class="w-4 h-4 rounded text-rose-600 bg-slate-900 border-slate-700 cursor-pointer" />
                  <label for="ackCheck" class="cursor-pointer select-none">
                    أقر بمسؤوليتي الكاملة عن حذف هذه الشركة وكافة بياناتها وملفاتها السحابية.
                  </label>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-3 pt-3">
                  <button
                    (click)="closeForcePurgeModal()"
                    [disabled]="isPurging()"
                    class="py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-850 font-bold text-xs transition-all cursor-pointer">
                    إلغاء التراجع / Cancel
                  </button>

                  <button
                    (click)="executeForcePurge()"
                    [disabled]="!isPurgeConfirmValid() || isPurging()"
                    class="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer">
                    @if (isPurging()) {
                      <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span>جاري المسح والتطهير...</span>
                    } @else {
                      <span>تأكيد الحذف الجذري 🗑️</span>
                    }
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- ========================================== -->
      <!-- TENANT INSPECTION AUDIT & MODERATION MODAL -->
      <!-- ========================================== -->
      @if (selectedTenant(); as tenant) {
        <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4 font-sans">
          <div (click)="closeInspector()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

          <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[92vh] flex flex-col bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/80">
            <div class="sticky top-0 z-10 border-b border-slate-900 bg-slate-950/95 px-4 md:px-6 py-4 backdrop-blur-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">Platform Audit & Moderation Control</span>
                <h3 class="text-xl font-bold text-white font-cairo mt-1">{{ tenant.name }}</h3>
              </div>
              <button
                (click)="closeInspector()"
                class="self-start md:self-auto w-full md:w-auto px-3 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-150 text-xs font-bold font-cairo cursor-pointer">
                إغلاق التفاصيل / Close
              </button>
            </div>

            <div class="flex-1 overflow-y-auto min-h-0 p-4 md:p-6 space-y-6">
              @if (isLoadingAudit()) {
                <div class="flex justify-center items-center py-16">
                  <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <!-- Registration Data -->
                  <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">بيانات التسجيل / Registration Data</span>
                        <h4 class="text-lg font-bold text-white font-cairo mt-1">ملف العميل الأساسي</h4>
                      </div>
                      <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25 text-[10px]">{{ tenant.status }}</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">اسم المسؤول</div>
                        <div class="mt-1 text-slate-200 font-semibold font-cairo">{{ tenant.adminFirstName || 'غير متوفر' }} {{ tenant.adminLastName || '' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">البريد الإلكتروني</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.adminEmail || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">المحافظة / Location</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.location || tenant.region || 'غير محدد' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">رقم الهاتف</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.personalPhone || 'N/A' }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Storage & Audit Profile -->
                  <div class="space-y-4 w-full">
                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">الإحصائيات والسعة / Audit Metrics</span>
                          <h4 class="text-lg font-bold text-white font-cairo mt-1">سجل الأداء والتخزين</h4>
                        </div>
                      </div>

                      @if (auditProfile()) {
                        <div class="grid grid-cols-3 gap-3">
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">المشاريع</span>
                            <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().totalProjectsCount }}</div>
                          </div>
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">المستخدمين</span>
                            <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().activeUserCount }}</div>
                          </div>
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">التقييم</span>
                            <div class="text-xl font-bold text-amber-400 mt-0.5">⭐ {{ auditProfile().globalRatingScore | number:'1.1-1' }}</div>
                          </div>
                        </div>

                        <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4.5 space-y-2">
                          <div class="flex justify-between items-center text-xs">
                            <span class="text-slate-400 font-cairo font-bold">💾 السعة التخزينية المستخدمة / Storage Metrics</span>
                            <span class="font-mono text-indigo-400 font-bold">{{ auditProfile().storageUsedMb }} MB</span>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- ========================================== -->
      <!-- SUPER ADMIN MANUAL UPGRADE & RECEIPT MODAL -->
      <!-- ========================================== -->
      @if (isManualUpgradeModalOpen() && selectedTenantForUpgrade(); as t) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          <div (click)="closeManualUpgradeModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

          <div class="relative z-10 w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-slate-850 flex items-center justify-between bg-slate-900/60">
              <div class="flex items-center gap-2">
                <span class="text-xl">💳</span>
                <div>
                  <h3 class="font-bold text-base text-white font-cairo">إدارة الاشتراك والإيصالات يدويًا</h3>
                  <p class="text-xs text-slate-400 font-cairo">شركة: <strong class="text-indigo-400">{{ t.name }}</strong></p>
                </div>
              </div>
              <button (click)="closeManualUpgradeModal()" class="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Body -->
            @if (!adminReceiptData()) {
              <div class="p-6 space-y-4 text-right font-cairo">
                <div class="p-3 bg-indigo-950/40 border border-indigo-500/20 rounded-xl text-xs text-indigo-300 flex items-center justify-between">
                  <span>حد المشاريع الحالي للشركة:</span>
                  <span class="font-mono font-bold text-amber-400 text-sm">{{ t.maxActiveProjects }} مشاريع</span>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">عدد المشاريع الإضافية المراد إضافتها *</label>
                  <input 
                    type="number" 
                    [ngModel]="manualProjectsCount()" 
                    (ngModelChange)="manualProjectsCount.set($event)"
                    min="1" 
                    class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-mono" />
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">المبلغ المحصّل يدويًا (EGP) *</label>
                  <input 
                    type="number" 
                    [ngModel]="manualAmountEgp()" 
                    (ngModelChange)="manualAmountEgp.set($event)"
                    min="0" 
                    class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-mono" />
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1">طريقة الدفع *</label>
                  <select 
                    [ngModel]="manualPaymentMethod()" 
                    (ngModelChange)="manualPaymentMethod.set($event)"
                    class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 font-cairo">
                    <option value="Cash">نقداً / كاش (Cash)</option>
                    <option value="BankTransfer">تحويل بنكي / حساب الشركة (Bank Transfer)</option>
                    <option value="VodafoneCash">فودافون كاش / محفظة إلكترونية (Vodafone Cash)</option>
                    <option value="InstaPay">تطبيق إنستاباي (InstaPay)</option>
                    <option value="Other">طريقة أخرى / مخصصة</option>
                  </select>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    (click)="closeManualUpgradeModal()" 
                    class="py-2.5 px-4 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer">
                    إلغاء
                  </button>
                  <button 
                    (click)="submitManualUpgrade()" 
                    [disabled]="isSubmittingManualUpgrade()"
                    class="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer">
                    @if (isSubmittingManualUpgrade()) {
                      <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    }
                    <span>تأكيد الترقية وإصدار الإيصال 💳</span>
                  </button>
                </div>
              </div>
            } @else {
              <!-- Receipt View -->
              <div class="p-6 space-y-4 text-right font-cairo">
                <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                  <span class="text-3xl">🧾</span>
                  <h4 class="text-base font-bold text-emerald-400 mt-1">تمت ترقية الحساب بنجاح</h4>
                  <p class="text-xs text-slate-300 font-mono mt-1">رقم الإيصال: {{ adminReceiptData()?.referenceNumber }}</p>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    (click)="sendAdminReceiptWhatsApp()"
                    class="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>📲 إرسال بالواتساب</span>
                  </button>
                  <button 
                    (click)="closeManualUpgradeModal()"
                    class="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">
                    إغلاق
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class TenantsComponent implements OnInit {
  private readonly tenantsService = inject(TenantsService);
  private readonly whatsAppLink = inject(WhatsAppLinkService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);

  // Core Data Signals
  readonly adminTenants = signal<AdminTenantItem[]>([]);
  readonly lifecycleSummary = signal<TenantLifecycleSummary | null>(null);
  readonly totalItems = signal<number>(0);
  readonly totalPages = signal<number>(1);
  readonly currentPage = signal<number>(1);
  readonly pageSize = 10;

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  searchQuery = '';
  planFilter = 'All';
  readonly statusFilter = signal<StatusFilterType>('All');

  // Exemption Updating State
  readonly isUpdatingExemptionId = signal<string | null>(null);

  // Force Purge Modal States
  readonly purgeTargetTenant = signal<AdminTenantItem | null>(null);
  purgeConfirmationInput = '';
  isPurgeAcknowledged = false;
  readonly isPurging = signal(false);
  readonly purgeResult = signal<ForcePurgeResult | null>(null);

  // Inspection Audit States
  readonly selectedTenant = signal<any | null>(null);
  readonly auditProfile = signal<any | null>(null);
  readonly isLoadingAudit = signal(false);

  // Manual Upgrade Signals
  readonly isManualUpgradeModalOpen = signal(false);
  readonly selectedTenantForUpgrade = signal<any | null>(null);
  readonly manualProjectsCount = signal<number>(5);
  readonly manualAmountEgp = signal<number>(950);
  readonly manualPaymentMethod = signal<string>('Cash');
  readonly manualNotes = signal<string>('');
  readonly isSubmittingManualUpgrade = signal<boolean>(false);
  readonly adminReceiptData = signal<any | null>(null);

  // Computed displayed tenants (supports fast client-side filtering over the paged set)
  readonly displayedTenants = computed(() => {
    let list = this.adminTenants();
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      list = list.filter(t =>
        t.name.toLowerCase().includes(query) ||
        (t.adminEmail && t.adminEmail.toLowerCase().includes(query)) ||
        (t.region && t.region.toLowerCase().includes(query)) ||
        t.id.toLowerCase().includes(query)
      );
    }
    const filter = this.statusFilter();
    if (filter === 'Active') {
      list = list.filter(t => t.status === 'Active');
    } else if (filter === 'Suspended') {
      list = list.filter(t => t.status === 'Suspended');
    } else if (filter === 'PendingDeletion') {
      list = list.filter(t => t.status === 'PendingDeletion' || t.status === 'Deleted');
    } else if (filter === 'Inactive45') {
      list = list.filter(t => t.daysInactive >= 45);
    } else if (filter === 'Exempt') {
      list = list.filter(t => t.isCleanupExempt);
    }
    return list;
  });

  ngOnInit(): void {
    this.fetchLifecycleSummary();
    this.fetchAdminTenants();
  }

  refreshData(): void {
    this.fetchLifecycleSummary();
    this.fetchAdminTenants();
  }

  fetchLifecycleSummary(): void {
    this.tenantsService.getLifecycleSummary().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          if (res.success && res.data) {
            this.lifecycleSummary.set(res.data);
            this.cdr.markForCheck();
            this.cdr.detectChanges();
          }
        });
      },
      error: () => {
        // Non-blocking fallback
      }
    });
  }

  fetchAdminTenants(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.cdr.markForCheck();

    const queryParams = {
      pageNumber: this.currentPage(),
      pageSize: this.pageSize,
      search: this.searchQuery.trim() || undefined,
      planFilter: this.planFilter !== 'All' ? this.planFilter : undefined,
      statusFilter: this.resolveStatusFilterQuery(),
      onlyInactiveOver45Days: this.statusFilter() === 'Inactive45' ? true : undefined
    };

    this.tenantsService.getAdminTenants(queryParams).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.isLoading.set(false);
          if (res.success && res.data) {
            this.adminTenants.set([...res.data.items]);
            this.totalItems.set(res.data.totalCount);
            this.totalPages.set(res.data.totalPages);
          } else {
            this.errorMessage.set(res.message || 'فشل في تحميل بيانات الشركات.');
          }
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message || 'تعذر الاتصال بالخادم لجلب بيانات الشركات.');
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      }
    });
  }

  private resolveStatusFilterQuery(): string | undefined {
    const filter = this.statusFilter();
    if (filter === 'Active') return 'Active';
    if (filter === 'Suspended') return 'Suspended';
    if (filter === 'PendingDeletion') return 'PendingDeletion';
    return undefined;
  }

  setStatusFilter(filter: StatusFilterType): void {
    this.statusFilter.set(filter);
    this.currentPage.set(1);
    this.fetchAdminTenants();
  }

  onSearchChange(): void {
    this.currentPage.set(1);
    this.fetchAdminTenants();
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.fetchAdminTenants();
  }

  onPageSizeChange(): void {
    this.currentPage.set(1);
    this.fetchAdminTenants();
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.fetchAdminTenants();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.fetchAdminTenants();
    }
  }

  // Exemption Toggle
  toggleExemption(tenant: AdminTenantItem): void {
    this.isUpdatingExemptionId.set(tenant.id);
    const targetState = !tenant.isCleanupExempt;

    this.tenantsService.toggleCleanupExemption(tenant.id, targetState).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.isUpdatingExemptionId.set(null);
          if (res.success && res.data) {
            this.adminTenants.update(list =>
              list.map(t => t.id === tenant.id ? { ...t, isCleanupExempt: res.data.isCleanupExempt } : t)
            );
            this.successMessage.set(res.data.message || 'تم تحديث حالة الاستثناء بنجاح.');
          } else {
            this.errorMessage.set(res.message || 'فشل في تحديث الاستثناء.');
          }
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isUpdatingExemptionId.set(null);
          this.errorMessage.set(err.error?.message || 'خطأ أثناء تحديث حالة الاستثناء.');
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      }
    });
  }

  // Force Purge Modal & Execution
  openForcePurgeModal(tenant: AdminTenantItem): void {
    this.purgeTargetTenant.set(tenant);
    this.purgeConfirmationInput = '';
    this.isPurgeAcknowledged = false;
    this.isPurging.set(false);
    this.purgeResult.set(null);
  }

  closeForcePurgeModal(): void {
    if (this.purgeResult()) {
      this.fetchLifecycleSummary();
      this.fetchAdminTenants();
    }
    this.purgeTargetTenant.set(null);
    this.purgeConfirmationInput = '';
    this.isPurgeAcknowledged = false;
    this.isPurging.set(false);
    this.purgeResult.set(null);
  }

  isPurgeConfirmValid(): boolean {
    const target = this.purgeTargetTenant();
    if (!target) return false;
    return this.isPurgeAcknowledged && this.purgeConfirmationInput.trim().toLowerCase() === target.name.trim().toLowerCase();
  }

  executeForcePurge(): void {
    const target = this.purgeTargetTenant();
    if (!target || !this.isPurgeConfirmValid()) return;

    this.isPurging.set(true);
    this.errorMessage.set(null);

    this.tenantsService.forcePurgeTenant(target.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isPurging.set(false);
        if (res.success && res.data) {
          this.purgeResult.set(res.data);
          this.successMessage.set(res.data.message || 'تم الحذف الجذري وتطهير السحابة بنجاح.');
        } else {
          this.errorMessage.set(res.message || 'فشلت عملية الحذف الجذري.');
        }
      },
      error: (err) => {
        this.isPurging.set(false);
        this.errorMessage.set(err.error?.message || 'خطأ أثناء تنفيذ الحذف الجذري.');
      }
    });
  }

  // Inspection Audit
  inspectAdminTenant(tenant: AdminTenantItem): void {
    this.selectedTenant.set(tenant);
    this.isLoadingAudit.set(true);
    this.auditProfile.set(null);

    this.tenantsService.getTenantAuditProfile(tenant.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.auditProfile.set(res.data);
        }
      },
      complete: () => {
        this.isLoadingAudit.set(false);
      }
    });
  }

  closeInspector(): void {
    this.selectedTenant.set(null);
    this.auditProfile.set(null);
  }

  // Manual Upgrade & Receipts
  openManualUpgradeModal(tenant: any): void {
    this.selectedTenantForUpgrade.set(tenant);
    this.manualProjectsCount.set(5);
    this.manualAmountEgp.set(950);
    this.manualPaymentMethod.set('Cash');
    this.manualNotes.set('');
    this.adminReceiptData.set(null);
    this.isManualUpgradeModalOpen.set(true);
  }

  closeManualUpgradeModal(): void {
    this.isManualUpgradeModalOpen.set(false);
    this.selectedTenantForUpgrade.set(null);
    this.adminReceiptData.set(null);
  }

  submitManualUpgrade(): void {
    const tenant = this.selectedTenantForUpgrade();
    if (!tenant) return;

    if (this.manualProjectsCount() <= 0) {
      this.errorMessage.set('عدد المشاريع الإضافية يجب أن يكون أكبر من 0.');
      return;
    }

    this.isSubmittingManualUpgrade.set(true);
    this.errorMessage.set(null);

    const payload = {
      extraProjectsCount: this.manualProjectsCount(),
      amount: this.manualAmountEgp(),
      paymentMethod: this.manualPaymentMethod(),
      notes: this.manualNotes()
    };

    this.tenantsService.manualUpgradeTenant(tenant.id, payload).subscribe({
      next: (res) => {
        this.isSubmittingManualUpgrade.set(false);
        if (res.success && res.data) {
          this.adminReceiptData.set(res.data);
          this.adminTenants.update(list =>
            list.map(t => t.id === tenant.id ? { ...t, maxActiveProjects: res.data.newMaxActiveProjects } : t)
          );
          this.successMessage.set(`تم إضافة ${payload.extraProjectsCount} مشاريع وتوليد الإيصال رقم ${res.data.referenceNumber} بنجاح!`);
        } else {
          this.errorMessage.set(res.message || 'فشلت عملية الترقية اليدوية.');
        }
      },
      error: (err) => {
        this.isSubmittingManualUpgrade.set(false);
        this.errorMessage.set(err.error?.message || 'خطأ في تفعيل الترقية اليدوية.');
      }
    });
  }

  sendAdminReceiptWhatsApp(): void {
    const receipt = this.adminReceiptData();
    const tenant = this.selectedTenantForUpgrade();
    if (!receipt || !tenant) return;

    const phone = tenant.personalPhone || '';
    if (!phone) {
      this.errorMessage.set('لم يتم إرسال الإيصال عبر الواتساب لعدم وجود رقم هاتف مسجل.');
      return;
    }

    const msg = `مرحباً ${tenant.name}، تم إضافة مشاريع جديدة إلى رصيد حسابكم وسداد الرسم رقم (${receipt.referenceNumber}) بمبلغ ${receipt.totalAmount} EGP لعدد +${receipt.extraProjectsAdded} مشاريع إضافية (إجمالي المتاح: ${receipt.newMaxActiveProjects} مشروع). شكراً لاستخدامكم أُسُس!`;
    this.whatsAppLink.openChat(phone, msg);
    this.successMessage.set('تم فتح الواتساب لإرسال الإيصال بنجاح.');
  }
}
