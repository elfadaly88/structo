import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ProjectDetailsStore } from './project-details.store';

/** Project title, actions, KPIs, status banners. */
@Component({
  selector: 'app-pd-header',
  standalone: true,
  imports: [DecimalPipe, TranslatePipe, RouterLink],
  template: `
    <!-- Unified Project Header & KPI Container with Expand/Collapse -->
    <div class="bg-slate-900/70 border border-slate-800/90 rounded-2xl shadow-xl overflow-hidden transition-all duration-200">

      <!-- Persistent Header Section (Always Visible) -->
      <div class="p-3.5 sm:p-5 flex flex-col gap-3.5" [class.border-b]="!vm.isHeaderCollapsed()" [class.border-slate-800\/80]="!vm.isHeaderCollapsed()">

        <!-- Top Row: Back Button, Title, Badges, Location, and Condensed Metric -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">

          <!-- Left: Back Button, Title, Status & Quick Tags -->
          <div class="flex items-center gap-3 min-w-0 flex-1">
            <a
              routerLink="/dashboard/projects"
              title="العودة إلى المشاريع"
              class="p-2 sm:p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 sm:h-5 sm:w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2.5 flex-wrap">
                <h1 class="text-lg sm:text-2xl font-black tracking-tight text-white font-cairo truncate">
                  @if (vm.project()) {
                    {{ vm.project()!.name }}
                  } @else if (vm.isLoadingProject()) {
                    <span class="text-slate-500">{{ 'DETAILS.LOADING_PROJECT' | translate }}</span>
                  } @else {
                    <span class="text-slate-500">{{ 'DETAILS.PROJECT_NOT_FOUND' | translate }}</span>
                  }
                </h1>
                @if (vm.project()) {
                  @if (vm.project()!.isActive) {
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 font-cairo whitespace-nowrap">
                      {{ 'PROJECTS.STATUS.ACTIVE' | translate }}
                    </span>
                  } @else {
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 shrink-0 font-cairo whitespace-nowrap">
                      {{ 'PROJECTS.STATUS_CLOSED' | translate }}
                    </span>
                  }
                }
              </div>

              @if (vm.project()) {
                <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                  @if (vm.project()!.governorate) {
                    <span class="text-indigo-400 font-cairo font-medium whitespace-nowrap">📍 {{ vm.project()!.governorate }} @if (vm.project()!.cityOrZone) { - {{ vm.project()!.cityOrZone }} }</span>
                  }
                  @if (vm.project()!.propertyType) {
                    <span class="text-slate-600">•</span>
                    <span class="text-amber-400 font-cairo font-medium whitespace-nowrap">
                      @if (vm.project()!.propertyType === 'Residential') { 🏠 سكني } @else { 🏢 إداري }
                    </span>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Condensed Metric Pill (Visible when collapsed on top row) -->
          @if (vm.isHeaderCollapsed() && vm.project()) {
            <div class="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              @if (!vm.isEngineer()) {
                <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono whitespace-nowrap">
                  <span class="text-slate-400 text-[11px] font-cairo">الرصيد:</span>
                  <span class="font-bold tabular-nums" [class.text-emerald-400]="vm.netBalance() >= 0" [class.text-rose-400]="vm.netBalance() < 0">
                    {{ (vm.netBalance() || 0) | number:'1.0-0' }} ج.م
                  </span>
                </div>
              } @else {
                <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono whitespace-nowrap">
                  <span class="text-slate-400 text-[11px] font-cairo">العهدة المعلقة:</span>
                  <span class="font-bold text-amber-400 tabular-nums">
                    {{ (vm.totalUnsettledPettyCash() || 0) | number:'1.0-0' }} ج.م
                  </span>
                </div>
              }
            </div>
          }
        </div>

        <!-- Bottom Row: Action Buttons Bar -->
        <div class="flex items-center flex-wrap justify-between sm:justify-end gap-2.5 pt-2.5 border-t border-slate-800/60 w-full">
          <div class="flex items-center flex-wrap gap-2.5 shrink-0 w-full sm:w-auto justify-start sm:justify-end">

            <!-- Direct Public Visibility Toggle Switch -->
            @if (vm.project() && (vm.isTenantOwner() || vm.isSuperAdmin())) {
              <div class="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl font-cairo shadow-sm shrink-0 whitespace-nowrap">
                <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                  <span class="w-2 h-2 rounded-full transition-colors" [class.bg-emerald-400]="vm.isPublicPortfolio()" [class.bg-slate-600]="!vm.isPublicPortfolio()"></span>
                  <span class="whitespace-nowrap">إظهار في البروفايل</span>
                </span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    [checked]="vm.isPublicPortfolio()"
                    (change)="vm.togglePublicVisibility($any($event.target).checked)"
                    [disabled]="vm.isSavingProjectSettings()"
                    class="sr-only peer">
                  <div class="w-8 h-4.5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            }

            <!-- Project Report Action Button -->
            @if (vm.project() && vm.canViewFinancialReports()) {
              <button 
                type="button"
                id="btn-header-project-report"
                (click)="vm.openProjectReportModal()"
                class="px-3.5 sm:px-4 py-2 bg-sky-600/15 hover:bg-sky-600/25 active:bg-sky-600/35 text-sky-300 hover:text-white border border-sky-500/30 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-cairo shrink-0 whitespace-nowrap">
                <svg class="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="whitespace-nowrap">تقرير المشروع</span>
              </button>
            }

            <!-- Site Execution Action Button -->
            @if (vm.project()) {
              <a 
                [routerLink]="['/dashboard/projects', vm.project()!.id, 'site-execution']"
                class="px-3.5 sm:px-4 py-2 bg-emerald-600/15 hover:bg-emerald-600/25 active:bg-emerald-600/35 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-cairo shrink-0 whitespace-nowrap">
                <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span class="whitespace-nowrap">متابعة الموقع والتنفيذ 🏗️</span>
              </a>
            }

            <!-- Primary Action Button: + إيداع دفعة مالية -->
            @if (vm.project() && vm.isOwnerOrAccountant()) {
              <button 
                (click)="vm.openInjectModal()"
                [disabled]="vm.project()?.status === 'Closed'"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center gap-1.5 cursor-pointer font-cairo shrink-0 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500">
                <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span class="whitespace-nowrap">+ {{ 'DETAILS.INJECT_CAPITAL' | translate }}</span>
              </button>
            }

            <!-- 🔼/🔽 Collapse / Expand Toggle Button -->
            <button
              type="button"
              (click)="vm.toggleHeaderCollapse()"
              [title]="vm.isHeaderCollapsed() ? 'إظهار الملخص المالي والبيانات' : 'طي الملخص لتوفير مساحة للشاشة'"
              class="px-3 py-2 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-bold font-cairo flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0 whitespace-nowrap">
              <span class="whitespace-nowrap">{{ vm.isHeaderCollapsed() ? 'عرض الملخص' : 'إخفاء الملخص' }}</span>
              <svg class="w-4 h-4 transition-transform duration-200 shrink-0" [class.rotate-180]="!vm.isHeaderCollapsed()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

          </div>
        </div>
      </div>

      <!-- Collapsible Content Section: KPI Cards + Info Details Grid -->
      @if (!vm.isHeaderCollapsed()) {
        <div class="p-3.5 sm:p-5 space-y-3.5 bg-slate-950/30 border-t border-slate-800/40 animate-fade-in">

          <!-- 1️⃣ KPI Stats Bar -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 font-sans">
            @if (!vm.isEngineer()) {
              <!-- Card 1: Total Income -->
              <div class="bg-slate-900/80 border border-slate-800/90 p-3 rounded-xl flex flex-col justify-between shadow-sm">
                <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.TOTAL_INCOME' | translate }}</span>
                <h3 class="text-base sm:text-lg font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">{{ (vm.totalIncome() || 0) | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
              </div>
              <!-- Card 2: Total Expenses -->
              <div class="bg-slate-900/80 border border-slate-800/90 p-3 rounded-xl flex flex-col justify-between shadow-sm">
                <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.TOTAL_EXPENSES' | translate }}</span>
                <h3 class="text-base sm:text-lg font-extrabold text-rose-400 mt-1 font-mono tabular-nums">{{ (vm.totalExpenses() || 0) | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
              </div>
              <!-- Card 3: Net Balance -->
              <div class="bg-slate-900/80 border border-slate-800/90 p-3 rounded-xl flex flex-col justify-between shadow-sm">
                <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.NET_BALANCE' | translate }}</span>
                <h3 class="text-base sm:text-lg font-extrabold mt-1 font-mono tabular-nums" [class.text-emerald-400]="vm.netBalance() >= 0" [class.text-rose-400]="vm.netBalance() < 0">
                  {{ (vm.netBalance() || 0) | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                </h3>
              </div>
            }
            <!-- Card 4: Unsettled Petty Cash -->
            <div class="bg-slate-900/80 border border-slate-800/90 p-3 rounded-xl flex flex-col justify-between shadow-sm" [class.col-span-2]="vm.isEngineer()" [class.lg:col-span-4]="vm.isEngineer()">
              <span class="text-[11px] text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.UNSETTLED_PETTY_CASH' | translate }}</span>
              <h3 class="text-base sm:text-lg font-extrabold text-amber-400 mt-1 font-mono tabular-nums">{{ (vm.totalUnsettledPettyCash() || 0) | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
            </div>
          </div>

          <!-- 2️⃣ Info Grid Side-by-Side: Client, Budget, Scope -->
          @if (vm.project()) {
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-0.5">
              <!-- Client Name -->
              <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo block mb-0.5">{{ 'PROJECTS.TABLE_CLIENT' | translate }}</span>
                <p class="text-sm font-bold text-slate-200 truncate font-cairo">{{ vm.parsedClient() || '—' }}</p>
              </div>

              <!-- Budget -->
              @if (!vm.isEngineer()) {
                <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                  <div class="flex items-center justify-between mb-0.5">
                    <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</span>
                    @if (vm.isOwnerOrAccountant()) {
                      <button
                        (click)="vm.openReviseBudgetModal()"
                        [disabled]="vm.project()?.status === 'Closed'"
                        class="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-cairo disabled:opacity-40">
                        تعديل ✏️
                      </button>
                    }
                  </div>
                  <p class="text-sm font-bold text-emerald-400 font-mono">{{ vm.parsedBudget() | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</p>
                </div>
              }

              <!-- Scope Description -->
              <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 sm:col-span-1" [class.sm:col-span-2]="vm.isEngineer()">
                <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo block mb-0.5">{{ 'DETAILS.SCOPE_DESC' | translate }}</span>
                <p class="text-xs text-slate-300 leading-relaxed font-cairo line-clamp-2" [title]="vm.parsedDescription()">{{ vm.parsedDescription() || ('PROJECTS.NO_DESCRIPTION' | translate) }}</p>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Project Status Banner (Freeze / Closed Guard) -->
    @if (vm.project() && vm.project()!.status !== 'Active') {
      <div class="rounded-2xl border px-5 py-4 flex items-start gap-4"
        [class.border-amber-500]="vm.project()!.status === 'FinancialFreeze'"
        [class.bg-amber-500\/5]="vm.project()!.status === 'FinancialFreeze'"
        [class.border-slate-700]="vm.project()!.status === 'Closed'"
        [class.bg-slate-900\/40]="vm.project()!.status === 'Closed'">
        <div class="shrink-0 mt-0.5">
          @if (vm.project()!.status === 'FinancialFreeze') {
            <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          } @else {
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        </div>
        <div>
          <p class="text-sm font-bold font-cairo" [class.text-amber-300]="vm.project()!.status === 'FinancialFreeze'" [class.text-slate-300]="vm.project()!.status === 'Closed'">
            {{ vm.project()!.status === 'FinancialFreeze' ? 'المشروع في وضع التجميد المالي — لا يمكن تقديم طلبات جديدة' : 'المشروع مغلق نهائياً — جميع العمليات المالية محظورة' }}
          </p>
          <p class="text-xs text-slate-500 mt-0.5 font-cairo">{{ vm.project()!.status === 'FinancialFreeze' ? 'تم تجميد المشروع بانتظار المراجعة المالية النهائية والإغلاق الرسمي.' : 'تم إغلاق هذا المشروع بشكل نهائي. البيانات محفوظة للتدقيق.' }}</p>
        </div>
      </div>
    }

    <!-- WhatsApp Client Review Quick-Access Banner (Visible on Closed projects to Tenant Owner) -->
    @if (vm.project() && vm.project()!.status === 'Closed' && vm.project()!.publicReviewToken && vm.isTenantOwner()) {
      <div class="bg-gradient-to-r from-emerald-950/20 to-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white font-cairo">رابط تقييم المشروع للعميل</h4>
            <p class="text-xs text-slate-400 mt-0.5 font-cairo">تم إغلاق المشروع بنجاح. أرسل رابط التقييم للعميل عبر واتساب لقياس مستوى رضاكم.</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
          <input type="text" readonly [value]="vm.getPublicReviewUrl()" class="hidden sm:block bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono focus:outline-none max-w-[200px]" />
          <button (click)="vm.copyReviewLink()" class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer font-cairo">نسخ الرابط</button>
          <button type="button" (click)="vm.openWhatsAppModal()" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 justify-center">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
            </svg>
            ارسال تقييم العميل (واتساب)
          </button>
        </div>
      </div>
    }
  `
})
export class ProjectHeaderComponent {
  readonly vm = inject(ProjectDetailsStore);
}
