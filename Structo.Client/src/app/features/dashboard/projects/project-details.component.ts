import { Component, OnInit, inject, signal, computed, DestroyRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { PettyCashService } from '../../../core/services/petty-cash.service';
import { FinancialService } from '../../../core/services/financial.service';
import { ProjectDto, ProjectCashPoolDto, ProjectReconciliationReportDto } from '../../../core/models/project.models';
import { PettyCashMobileDto, PettyCashSettleDto } from '../../../core/models/petty-cash.models';
import { FinancialTransactionMobileDto, SettlementMobileDto } from '../../../core/models/financial.models';
import { ImageUploadService, SitePhotoDto } from '../../../core/services/image-upload.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmModalService } from '../../../core/services/confirm-modal.service';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { TenantUserService } from '../../../core/services/tenant-user.service';
import { SettlementService } from '../../../core/services/settlement.service';
import { OfflineSyncService } from '../../../core/services/offline-sync.service';
import { WhatsAppLinkService } from '../../../core/services/whatsapp-link.service';
import { ProjectCloseoutService } from '../../../core/services/project-closeout.service';
import { LanguageService } from '../../../core/services/language.service';



@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, DatePipe, DecimalPipe, TranslatePipe, FormsModule],
  template: `
    <div class="space-y-5 w-full px-3 sm:px-6 lg:px-8">

      <!-- 1️⃣ Compact Top KPI Stats Bar -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 font-sans">
        @if (!isEngineer()) {
          <!-- Card 1: Total Income -->
          <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.TOTAL_INCOME' | translate }}</span>
            <h3 class="text-base lg:text-lg font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">{{ totalIncome() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
          </div>
          <!-- Card 2: Total Expenses -->
          <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.TOTAL_EXPENSES' | translate }}</span>
            <h3 class="text-base lg:text-lg font-extrabold text-rose-400 mt-1 font-mono tabular-nums">{{ totalExpenses() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
          </div>
          <!-- Card 3: Net Balance -->
          <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm">
            <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.NET_BALANCE' | translate }}</span>
            <h3 class="text-base lg:text-lg font-extrabold mt-1 font-mono tabular-nums" [class.text-emerald-400]="netBalance() >= 0" [class.text-rose-400]="netBalance() < 0">
              {{ netBalance() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
            </h3>
          </div>
        }
        <!-- Card 4: Unsettled Petty Cash -->
        <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col justify-between shadow-sm" [class.col-span-2]="isEngineer()" [class.lg:col-span-4]="isEngineer()">
          <span class="text-xs text-slate-400 font-bold uppercase tracking-wider font-cairo block truncate">{{ 'DETAILS.UNSETTLED_PETTY_CASH' | translate }}</span>
          <h3 class="text-base lg:text-lg font-extrabold text-amber-400 mt-1 font-mono tabular-nums">{{ totalUnsettledPettyCash() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
        </div>
      </div>

      <!-- 2️⃣ Unified Project Info & Actions Header -->
      <div class="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <!-- Top Row: Back Button, Title, Badges & Primary Action (+ إيداع دفعة مالية) -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
          <div class="flex items-center gap-3 min-w-0">
            <a
              routerLink="/dashboard/projects"
              class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white font-cairo truncate">
                  @if (project()) {
                    {{ project()!.name }}
                  } @else if (isLoadingProject()) {
                    <span class="text-slate-500">{{ 'DETAILS.LOADING_PROJECT' | translate }}</span>
                  } @else {
                    <span class="text-slate-500">{{ 'DETAILS.PROJECT_NOT_FOUND' | translate }}</span>
                  }
                </h1>
                @if (project()) {
                  @if (project()!.isActive) {
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 font-cairo">
                      {{ 'PROJECTS.STATUS.ACTIVE' | translate }}
                    </span>
                  } @else {
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 shrink-0 font-cairo">
                      {{ 'PROJECTS.STATUS_CLOSED' | translate }}
                    </span>
                  }
                }
              </div>
              @if (project()) {
                <div class="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                  @if (project()!.governorate) {
                    <span class="text-indigo-400 font-cairo font-medium">📍 {{ project()!.governorate }} @if (project()!.cityOrZone) { - {{ project()!.cityOrZone }} }</span>
                  }
                  @if (project()!.propertyType) {
                    <span class="text-slate-600">•</span>
                    <span class="text-amber-400 font-cairo font-medium">
                      @if (project()!.propertyType === 'Residential') { 🏠 سكني } @else { 🏢 إداري }
                    </span>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Primary Action & Header Controls -->
          @if (isOwnerOrAccountant() && project()) {
            <div class="flex items-center gap-3 shrink-0 flex-wrap">
              <!-- Direct Public Visibility Toggle Switch -->
              <div class="flex items-center gap-2.5 bg-slate-950/80 border border-slate-800 px-3.5 py-2 rounded-xl font-cairo shadow-sm">
                <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full transition-colors" [class.bg-emerald-400]="isPublicPortfolio()" [class.bg-slate-600]="!isPublicPortfolio()"></span>
                  <span>إظهار في البروفايل العام</span>
                </span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    [checked]="isPublicPortfolio()"
                    (change)="togglePublicVisibility($any($event.target).checked)"
                    [disabled]="isSavingProjectSettings()"
                    class="sr-only peer">
                  <div class="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <!-- Primary Action Button: + إيداع دفعة مالية -->
              <button 
                (click)="openInjectModal()"
                [disabled]="project()?.status === 'Closed'"
                class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center gap-2 cursor-pointer font-cairo shrink-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>+ {{ 'DETAILS.INJECT_CAPITAL' | translate }}</span>
              </button>
            </div>
          }
        </div>

        <!-- Info Grid Side-by-Side: Client, Budget, Scope -->
        @if (project()) {
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <!-- Client Name -->
            <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3">
              <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo block mb-0.5">{{ 'PROJECTS.TABLE_CLIENT' | translate }}</span>
              <p class="text-sm font-bold text-slate-200 truncate font-cairo">{{ parsedClient() || 'N/A' }}</p>
            </div>

            <!-- Budget -->
            @if (!isEngineer()) {
              <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3">
                <div class="flex items-center justify-between mb-0.5">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</span>
                  @if (isOwnerOrAccountant()) {
                    <button
                      (click)="openReviseBudgetModal()"
                      [disabled]="project()?.status === 'Closed'"
                      class="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-cairo disabled:opacity-40">
                      تعديل ✏️
                    </button>
                  }
                </div>
                <p class="text-sm font-bold text-emerald-400 font-mono">{{ parsedBudget() | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</p>
              </div>
            }

            <!-- Scope Description -->
            <div class="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 sm:col-span-1" [class.sm:col-span-2]="isEngineer()">
              <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo block mb-0.5">{{ 'DETAILS.SCOPE_DESC' | translate }}</span>
              <p class="text-xs text-slate-300 leading-relaxed font-cairo line-clamp-2" [title]="parsedDescription()">{{ parsedDescription() || ('PROJECTS.NO_DESCRIPTION' | translate) }}</p>
            </div>
          </div>
        }
      </div>

      <!-- Project Status Banner (Freeze / Closed Guard) -->
      @if (project() && project()!.status !== 'Active') {
        <div class="rounded-2xl border px-5 py-4 flex items-start gap-4"
          [class.border-amber-500]="project()!.status === 'FinancialFreeze'"
          [class.bg-amber-500\/5]="project()!.status === 'FinancialFreeze'"
          [class.border-slate-700]="project()!.status === 'Closed'"
          [class.bg-slate-900\/40]="project()!.status === 'Closed'">
          <div class="shrink-0 mt-0.5">
            @if (project()!.status === 'FinancialFreeze') {
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
            <p class="text-sm font-bold font-cairo" [class.text-amber-300]="project()!.status === 'FinancialFreeze'" [class.text-slate-300]="project()!.status === 'Closed'">
              {{ project()!.status === 'FinancialFreeze' ? 'المشروع في وضع التجميد المالي — لا يمكن تقديم طلبات جديدة' : 'المشروع مغلق نهائياً — جميع العمليات المالية محظورة' }}
            </p>
            <p class="text-xs text-slate-500 mt-0.5 font-cairo">{{ project()!.status === 'FinancialFreeze' ? 'تم تجميد المشروع بانتظار المراجعة المالية النهائية والإغلاق الرسمي.' : 'تم إغلاق هذا المشروع بشكل نهائي. البيانات محفوظة للتدقيق.' }}</p>
          </div>
        </div>
      }

      <!-- WhatsApp Client Review Quick-Access Banner (Visible on Closed projects to Tenant Owner) -->
      @if (project() && project()!.status === 'Closed' && project()!.publicReviewToken && isTenantOwner()) {
        <div class="bg-gradient-to-r from-emerald-950/20 to-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div class="flex items-center gap-3">
            <div class="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white font-cairo">رابط تقييم المشروع للعميل / Client Review Link</h4>
              <p class="text-xs text-slate-400 mt-0.5 font-cairo">تم إغلاق المشروع بنجاح. أرسل رابط التقييم للعميل عبر واتساب لقياس مستوى رضاكم.</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto shrink-0 justify-end">
            <input type="text" readonly [value]="getPublicReviewUrl()" class="hidden sm:block bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono focus:outline-none max-w-[200px]" />
            <button (click)="copyReviewLink()" class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer font-cairo">نسخ الرابط</button>
            <a [href]="getWhatsAppShareUrl()" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 justify-center">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
              </svg>
              ارسال تقييم العميل (واتساب)
            </a>
          </div>
        </div>
      }

      <!-- 📱 Mobile / Tablet Navigation (< md): Adaptive Select Picker -->
      <div class="md:hidden w-full pb-3 border-b border-slate-800 font-cairo">
        <label for="mobile-tab-select" class="sr-only">اختر القسم</label>
        <div class="relative">
          <select
            id="mobile-tab-select"
            [value]="activeTab()"
            (change)="activeTab.set($any($event.target).value)"
            class="w-full appearance-none bg-slate-900 border border-indigo-500/40 text-indigo-300 font-bold text-sm rounded-xl py-3 pr-4 pl-10 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-lg cursor-pointer transition-all duration-150 font-cairo">
            <option value="petty-cash" class="bg-slate-900 text-slate-100 py-2">
              🧾 عهدة الموقع {{ unsettledCount() > 0 ? '(' + unsettledCount() + ')' : '' }}
            </option>
            @if (!isEngineer()) {
              <option value="transactions" class="bg-slate-900 text-slate-100 py-2">📖 الدفتر المالي</option>
            }
            <option value="settlements" class="bg-slate-900 text-slate-100 py-2">⚖️ التسويات</option>
            @if (!isAccountant()) {
              <option value="gallery" class="bg-slate-900 text-slate-100 py-2">📸 معرض الصور</option>
            }
            @if (isOwnerOrAccountant()) {
              <option value="closeout" class="bg-slate-900 text-slate-100 py-2">⚙️ إدارة المشروع</option>
            }
          </select>
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 🖥️ Desktop Navigation (>= md): Equal Distribution Tabs Container -->
      <div class="hidden md:flex w-full items-center justify-between gap-2 border-b border-slate-800 font-cairo scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <!-- Tab 1: Site Petty Cash -->
        <button
          id="tab-petty-cash"
          (click)="activeTab.set('petty-cash')"
          class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
          [class.bg-indigo-600\/10]="activeTab() === 'petty-cash'"
          [class.text-indigo-400]="activeTab() === 'petty-cash'"
          [class.border-indigo-500]="activeTab() === 'petty-cash'"
          [class.border-transparent]="activeTab() !== 'petty-cash'"
          [class.text-slate-400]="activeTab() !== 'petty-cash'">
          <span>🧾 عهدة الموقع</span>
          @if (unsettledCount() > 0) {
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 font-mono shrink-0">{{ unsettledCount() }}</span>
          }
        </button>

        <!-- Tab 2: Financial Ledger -->
        @if (!isEngineer()) {
          <button
            id="tab-transactions"
            (click)="activeTab.set('transactions')"
            class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
            [class.bg-indigo-600\/10]="activeTab() === 'transactions'"
            [class.text-indigo-400]="activeTab() === 'transactions'"
            [class.border-indigo-500]="activeTab() === 'transactions'"
            [class.border-transparent]="activeTab() !== 'transactions'"
            [class.text-slate-400]="activeTab() !== 'transactions'">
            <span>📖 الدفتر المالي</span>
          </button>
        }

        <!-- Tab 3: Settlements -->
        <button
          id="tab-settlements"
          (click)="activeTab.set('settlements')"
          class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
          [class.bg-indigo-600\/10]="activeTab() === 'settlements'"
          [class.text-indigo-400]="activeTab() === 'settlements'"
          [class.border-indigo-500]="activeTab() === 'settlements'"
          [class.border-transparent]="activeTab() !== 'settlements'"
          [class.text-slate-400]="activeTab() !== 'settlements'">
          <span>⚖️ التسويات</span>
        </button>

        <!-- Tab 4: Site Photos -->
        @if (!isAccountant()) {
          <button
            id="tab-gallery"
            (click)="activeTab.set('gallery')"
            class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
            [class.bg-indigo-600\/10]="activeTab() === 'gallery'"
            [class.text-indigo-400]="activeTab() === 'gallery'"
            [class.border-indigo-500]="activeTab() === 'gallery'"
            [class.border-transparent]="activeTab() !== 'gallery'"
            [class.text-slate-400]="activeTab() !== 'gallery'">
            <span>📸 معرض الصور</span>
          </button>
        }

        <!-- Tab 5: Project Control & Admin -->
        @if (isOwnerOrAccountant()) {
          <button
            id="tab-closeout"
            (click)="activeTab.set('closeout')"
            class="flex-1 min-w-0 px-3 py-2.5 text-xs lg:text-sm font-bold border-b-2 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-t-lg whitespace-nowrap"
            [class.bg-indigo-600\/10]="activeTab() === 'closeout'"
            [class.text-indigo-400]="activeTab() === 'closeout'"
            [class.border-indigo-500]="activeTab() === 'closeout'"
            [class.border-transparent]="activeTab() !== 'closeout'"
            [class.text-slate-400]="activeTab() !== 'closeout'">
            <span>⚙️ إدارة المشروع</span>
          </button>
        }
      </div>

      <!-- Contextual Dynamic Tab Info Banner -->
      <div class="bg-indigo-950/40 border-l-4 border-indigo-500 text-slate-300 text-xs p-3 rounded-lg mb-4 flex items-center gap-2 font-cairo shadow-sm">
        @switch (activeTab()) {
          @case ('petty-cash') {
            <span>💡 <strong>عهد الموقع:</strong> صرف ومتابعة المبالغ المالية السائلة المسلمة لمهندس الموقع للمصاريف اليومية.</span>
          }
          @case ('transactions') {
            <span>💡 <strong>الدفتر المالي:</strong> السجل الشامل والموثق لجميع الإيرادات والمصروفات الفعلية الخاصة بالمشروع.</span>
          }
          @case ('settlements') {
            <span>💡 <strong>التسويات:</strong> مراجعة واعتماد الفواتير والمستندات المقدمة من مهندس الموقع لتسوية العهدة المالية.</span>
          }
          @case ('gallery') {
            <span>💡 <strong>معرض الصور:</strong> رفع وتوثيق صور التقدم الميداني للمشروع (يمكن إظهارها في البروفايل العام).</span>
          }
          @case ('closeout') {
            <span>💡 <strong>إدارة المشروع:</strong> تعديل بيانات المشروع الأساسية، حالة الظهور، ورفع ملفات المقايسة المرجعية.</span>
          }
        }
      </div>


      <!-- ======================== CLOSEOUT DASHBOARD TAB ======================== -->
      @if (activeTab() === 'closeout' && isOwnerOrAccountant()) {
        <div class="space-y-6">
          <!-- Header -->
          <div class="bg-gradient-to-br from-slate-900/80 to-rose-950/20 border border-rose-900/40 rounded-2xl p-6 shadow-xl">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-extrabold text-white font-cairo flex items-center gap-2">
                  <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  لوحة إغلاق المشروع / Project Closeout Dashboard
                </h3>
                <p class="text-xs text-slate-400 mt-1 font-cairo">مرحلة تجميد العمليات المالية، مراجعة الأرصدة، والإغلاق النهائي الموثَّق.</p>
              </div>
              @if (project()) {
                <span class="px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase font-cairo border"
                  [class.bg-emerald-500\/10]="project()!.status === 'Active'"
                  [class.text-emerald-400]="project()!.status === 'Active'"
                  [class.border-emerald-500\/30]="project()!.status === 'Active'"
                  [class.bg-amber-500\/10]="project()!.status === 'FinancialFreeze'"
                  [class.text-amber-300]="project()!.status === 'FinancialFreeze'"
                  [class.border-amber-500\/30]="project()!.status === 'FinancialFreeze'"
                  [class.bg-slate-800]="project()!.status === 'Closed'"
                  [class.text-slate-400]="project()!.status === 'Closed'"
                  [class.border-slate-700]="project()!.status === 'Closed'">
                  {{ project()!.status === 'Active' ? '🟢 نشط' : project()!.status === 'FinancialFreeze' ? '🟡 مجمّد' : '⚫ مغلق نهائياً' }}
                </span>
              }
            </div>
          </div>

          <!-- 📄 Private BOQ / Estimation Attachment Card (إدارة المشروع Tab) -->
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/60 pb-3">
              <div>
                <h4 class="text-sm font-extrabold text-white font-cairo flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  المقايسة المرجعية للمشروع / Project BOQ Reference
                </h4>
                <p class="text-xs text-slate-400 mt-1 font-cairo">
                  رفع وإدارة مستند جدول الكميات والمقايسة التقديرية المرجعية الخاصة بالمشروع.
                </p>
              </div>
              <span class="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-bold rounded-xl font-cairo shrink-0">
                مستند مرجعي خاص
              </span>
            </div>

            <!-- Lock Notice Banner -->
            <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300 font-cairo flex items-center gap-2">
              <span class="text-base shrink-0">🔒</span>
              <span>هذا المستند مرجعي داخلي فقط ولا يظهر إطلاقاً في بروفايل الشركة العام ولا يؤثر على العمليات المالية.</span>
            </div>

            <!-- Upload / Download Actions Box -->
            @if (boqFileDetails().fileUrl) {
              <div class="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3 overflow-hidden">
                  <div class="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs font-bold text-white font-mono truncate" [title]="boqFileDetails().fileName">
                      {{ boqFileDetails().fileName }}
                    </p>
                    <p class="text-[10px] text-emerald-400 font-cairo mt-0.5">✅ ملف المقايسة مرفوع ومحفوظ</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <!-- Download BOQ Button -->
                  <a 
                    [href]="boqFileDetails().fileUrl" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download
                    class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 shadow-md">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    تحميل المقايسة
                  </a>

                  <!-- Replace BOQ Button -->
                  @if (isOwnerOrAccountant()) {
                    <button 
                      (click)="boqFileInput.click()" 
                      [disabled]="isUploadingBOQ()"
                      class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer font-cairo flex items-center gap-1.5">
                      🔄 استبدال الملف
                    </button>
                  }
                </div>
              </div>
            } @else {
              <!-- Empty Upload Box -->
              <div class="border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-6 text-center bg-slate-950/30 transition-all">
                <svg class="w-10 h-10 mx-auto text-slate-600 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-xs font-bold text-slate-300 font-cairo">لم يتم رفع ملف مقايسة مرجعية لهذا المشروع بعد</p>
                <p class="text-[11px] text-slate-500 font-cairo mt-1">يُسمح برفع ملفات (.pdf, .xlsx, .docx) حتى 10 ميجابايت</p>
                
                @if (isOwnerOrAccountant()) {
                  <button 
                    (click)="boqFileInput.click()" 
                    [disabled]="isUploadingBOQ()"
                    class="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer font-cairo inline-flex items-center gap-1.5">
                    @if (isUploadingBOQ()) {
                      <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري رفع ملف المقايسة...
                    } @else {
                      📁 اختيار ملف المقايسة
                    }
                  </button>
                }
              </div>
            }

            <input 
              #boqFileInput 
              type="file" 
              class="hidden" 
              (change)="onBOQFileSelected($event)" 
              accept=".pdf,.xlsx,.xls,.docx,.doc">

            @if (boqUploadError()) {
              <p class="text-xs text-rose-400 font-cairo font-bold mt-1">⚠️ {{ boqUploadError() }}</p>
            }
          </div>

          <!-- Client Review Link Card (Displayed stably inside Closeout tab when publicReviewToken exists) -->
          @if (project() && project()!.publicReviewToken) {
            <div class="bg-slate-900/40 border border-indigo-900/40 rounded-2xl p-5 shadow-xl">
              <h4 class="text-sm font-bold text-indigo-300 font-cairo flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                رابط تقييم المشروع للعميل / Project Review Link
              </h4>
              <p class="text-xs text-slate-400 mb-3 font-cairo">أرسل هذا الرابط للعميل عبر واتساب لتقييم جودة تسليم المشروع — لا يتطلب تسجيل دخول.</p>
              <div class="flex items-center gap-2">
                <input type="text" readonly [value]="getPublicReviewUrl()" class="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono focus:outline-none" />
                <button (click)="copyReviewLink()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo shrink-0">نسخ الرابط</button>
                <a [href]="getWhatsAppShareUrl()" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer font-cairo flex items-center gap-1.5 shrink-0 justify-center">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.022-.014-.029-.022-.054-.054l-.405-.405a1.107 1.107 0 0 0-1.565 0l-.364.364c-.162.162-.338.25-.562.15-.365-.163-.739-.372-1.127-.624-.388-.252-.76-.554-1.116-.906-.356-.352-.656-.724-.908-1.112a14.7 14.7 0 0 1-.624-1.127c-.1-.225-.013-.4.15-.563l.363-.363a1.108 1.108 0 0 0 0-1.566l-.405-.405c-.032-.025-.04-.032-.054-.054A1.123 1.123 0 0 0 9.07 8.35c-.412.413-.679.932-.782 1.488-.13.7.072 1.487.608 2.355.536.868 1.258 1.777 2.15 2.668.892.892 1.8 1.614 2.668 2.15.868.536 1.656.738 2.355.608a2.91 2.91 0 0 0 1.488-.782 1.122 1.122 0 0 0 .15-.717 1.096 1.096 0 0 0-.236-.837zM12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                  ارسال واتساب
                </a>
              </div>
            </div>
          }

          <!-- Action Buttons -->
          @if (project() && project()!.status !== 'Closed') {
            <div class="flex flex-wrap gap-3">
              @if (project()!.status === 'Active') {
                <button id="btn-freeze-project" (click)="onFreezeProject()" [disabled]="isCloseoutLoading()"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  تجميد المشروع مالياً
                </button>
              }
              <button id="btn-run-audit" (click)="onRunReconciliation()" [disabled]="isCloseoutLoading()"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer font-cairo">
                @if (isCloseoutLoading()) {
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z"></path></svg>
                } @else {
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M15 7h.01M9 17h6" /></svg>
                }
                تشغيل تدقيق الأرصدة
              </button>
              @if (isTenantOwner()) {
                <button id="btn-final-closeout" (click)="onFinalCloseout()"
                  [disabled]="isCloseoutLoading() || !reconciliationReport()?.isFullyReconciled || project()!.status !== 'FinancialFreeze'"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-cairo">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  الإغلاق النهائي للمشروع
                  @if (!reconciliationReport()?.isFullyReconciled) { <span class="text-[10px] opacity-60">(يتطلب تصفية كاملة)</span> }
                </button>
              }
            </div>
          }

          <!-- Reconciliation Report -->
          @if (reconciliationReport()) {
            <div class="space-y-4">
              <!-- KPI Summary -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي الميزانية</span>
                  <p class="text-xl font-extrabold text-slate-200 mt-1 font-mono">{{ reconciliationReport()!.totalBudget | number:'1.0-0' }} EGP</p>
                </div>
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي الدخل</span>
                  <p class="text-xl font-extrabold text-emerald-400 mt-1 font-mono">{{ reconciliationReport()!.totalIncome | number:'1.0-0' }} EGP</p>
                </div>
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي المصروفات</span>
                  <p class="text-xl font-extrabold text-rose-400 mt-1 font-mono">{{ reconciliationReport()!.totalExpenses | number:'1.0-0' }} EGP</p>
                </div>
                <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                  <span class="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-cairo">صافي الرصيد</span>
                  <p class="text-xl font-extrabold mt-1 font-mono" [class.text-emerald-400]="reconciliationReport()!.netBalance >= 0" [class.text-rose-400]="reconciliationReport()!.netBalance < 0">{{ reconciliationReport()!.netBalance | number:'1.0-0' }} EGP</p>
                </div>
              </div>
              <!-- Custody Row (Clickable KPI Drill-Down triggers) -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Card 1: Unsettled Custody -->
                <div (click)="selectedDrilldown.set(selectedDrilldown() === 'unsettled' ? null : 'unsettled')"
                  class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                  [class.border-amber-500]="selectedDrilldown() === 'unsettled'"
                  [class.border-slate-800\/60]="selectedDrilldown() !== 'unsettled'"
                  [class.bg-amber-500\/5]="selectedDrilldown() === 'unsettled'">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">عُهَد معلَّقة للغلق / Unsettled Custody</span>
                  <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                    {{ unsettledCustodyList().length }} عهدة ({{ unsettledCustodySum() | number:'1.0-0' }} EGP)
                  </p>
                  <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">اضغط للتفاصيل وإرسال التذكيرات</span>
                </div>

                <!-- Card 2: Pending Treasury Refunds -->
                <div (click)="selectedDrilldown.set(selectedDrilldown() === 'refunds' ? null : 'refunds')"
                  class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                  [class.border-amber-500]="selectedDrilldown() === 'refunds'"
                  [class.border-slate-800\/60]="selectedDrilldown() !== 'refunds'"
                  [class.bg-amber-500\/5]="selectedDrilldown() === 'refunds'">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">مرتجعات الخزينة المعلقة / Treasury Refunds</span>
                  <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                    {{ pendingRefundsList().length }} تسوية ({{ pendingRefundsSum() | number:'1.0-0' }} EGP)
                  </p>
                  <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">اضغط لتأكيد استلام المبلغ نقداً</span>
                </div>

                <!-- Card 3: Pending Reimbursements -->
                <div (click)="selectedDrilldown.set(selectedDrilldown() === 'reimbursements' ? null : 'reimbursements')"
                  class="bg-slate-900/40 border p-4 rounded-xl text-center cursor-pointer transition-all duration-200 hover:border-slate-700 select-none hover:scale-[1.01]"
                  [class.border-amber-500]="selectedDrilldown() === 'reimbursements'"
                  [class.border-slate-800\/60]="selectedDrilldown() !== 'reimbursements'"
                  [class.bg-amber-500\/5]="selectedDrilldown() === 'reimbursements'">
                  <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-cairo block">تعويضات الموظفين المعلقة / Reimbursements</span>
                  <p class="text-lg font-bold text-amber-400 mt-1 font-mono hover:underline">
                    {{ pendingReimbursementsList().length }} طلب ({{ pendingReimbursementsSum() | number:'1.0-0' }} EGP)
                  </p>
                  <span class="text-[9px] text-slate-500 font-cairo block mt-0.5">اضغط لصرف التعويض للموظف</span>
                </div>
              </div>

              <!-- Drill-down details container -->
              @if (selectedDrilldown() !== null) {
                <div class="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 space-y-4 transition-all duration-200 shadow-lg">
                  <div class="flex items-center justify-between pb-2 border-b border-slate-800/50">
                    <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                      <svg class="w-4 h-4 text-amber-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                      @if (selectedDrilldown() === 'unsettled') {
                        تفاصيل العهد المعلقة / Unsettled Custody Details
                      } @else if (selectedDrilldown() === 'refunds') {
                        تفاصيل مرتجعات الخزينة المطلوبة / Pending Treasury Refunds
                      } @else if (selectedDrilldown() === 'reimbursements') {
                        تفاصيل التعويضات المستحقة للموظفين / Pending Reimbursements
                      }
                    </h4>
                    <button (click)="selectedDrilldown.set(null)" class="text-slate-400 hover:text-white text-xs font-cairo cursor-pointer">
                      إغلاق / Close ×
                    </button>
                  </div>

                  <!-- Details View: Unsettled Custody -->
                  @if (selectedDrilldown() === 'unsettled') {
                    <div class="overflow-x-auto">
                      <table class="w-full text-left rtl:text-right text-xs">
                        <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                          <tr>
                            <th class="px-4 py-2.5 font-cairo">المستلم / Engineer</th>
                            <th class="px-4 py-2.5 font-cairo">البيان / Reason</th>
                            <th class="px-4 py-2.5 text-right font-cairo">المبلغ / Amount</th>
                            <th class="px-4 py-2.5 font-cairo">الحالة / Status</th>
                            <th class="px-4 py-2.5 text-center font-cairo">إجراء سريع / Quick Reminder</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/30">
                          @for (item of unsettledCustodyList(); track item.id) {
                            <tr class="hover:bg-slate-900/20 text-slate-300">
                              <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ item.issuedTo || 'Staff' }}</td>
                              <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ item.reason }}</td>
                              <td class="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 font-mono text-[10px] text-amber-500">{{ item.status }}</td>
                              <td class="px-4 py-2.5 text-center">
                                <button (click)="onWhatsAppAlert(item, 'مرحباً ' + item.issuedTo + '، يرجى تسوية عهدتك المعلقة بقيمة ' + item.amount + ' EGP لـ ' + item.projectName + ' - ' + item.reason + '.')" 
                                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                                  </svg>
                                  إرسال تذكير تسوية / WhatsApp Reminder
                                </button>
                              </td>
                            </tr>
                          } @empty {
                            <tr>
                              <td colspan="5" class="px-4 py-8 text-center text-slate-500 font-cairo">لا توجد عهد معلقة للغلق</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }

                  <!-- Details View: Pending Refunds -->
                  @if (selectedDrilldown() === 'refunds') {
                    <div class="overflow-x-auto">
                      <table class="w-full text-left rtl:text-right text-xs">
                        <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                          <tr>
                            <th class="px-4 py-2.5 font-cairo">المستلم / Engineer</th>
                            <th class="px-4 py-2.5 font-cairo">البيان الأساسي / Reason</th>
                            <th class="px-4 py-2.5 text-right font-cairo">قيمة العهدة</th>
                            <th class="px-4 py-2.5 text-right font-cairo">إجمالي الصرف</th>
                            <th class="px-4 py-2.5 text-right font-cairo">المبلغ المرتجع / Net Difference</th>
                            <th class="px-4 py-2.5 text-center font-cairo">إجراء سريع / Immediate Action</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/30">
                          @for (sett of pendingRefundsList(); track sett.id) {
                            <tr class="hover:bg-slate-900/20 text-slate-300">
                              <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ sett.issuedTo }}</td>
                              <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ sett.custodyReason }}</td>
                              <td class="px-4 py-2.5 text-right font-mono text-slate-400">{{ sett.custodyAmount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 text-right font-mono text-slate-400">{{ sett.totalAmount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 text-right font-mono font-bold text-emerald-400">{{ sett.netDifference | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5 text-center">
                                <button (click)="onConfirmRefund(sett.id)" 
                                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                  تأكيد استلام المرتجع / Confirm Refund
                                </button>
                              </td>
                            </tr>
                          } @empty {
                            <tr>
                              <td colspan="6" class="px-4 py-8 text-center text-slate-500 font-cairo">لا توجد مبالغ مرتجعة معلقة بالخزينة</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }

                  <!-- Details View: Pending Reimbursements -->
                  @if (selectedDrilldown() === 'reimbursements') {
                    <div class="overflow-x-auto">
                      <table class="w-full text-left rtl:text-right text-xs">
                        <thead class="bg-slate-950/40 text-slate-400 border-b border-slate-800/50">
                          <tr>
                            <th class="px-4 py-2.5 font-cairo">المستحق / Employee</th>
                            <th class="px-4 py-2.5 font-cairo">تفاصيل المصاريف الزائدة / Reason</th>
                            <th class="px-4 py-2.5 text-right font-cairo">مبلغ التعويض المطلوب</th>
                            <th class="px-4 py-2.5 font-cairo">محفظة الصرف / Treasury Pool</th>
                            <th class="px-4 py-2.5 text-center font-cairo">إجراء سريع / Immediate Action</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-800/30">
                          @for (item of pendingReimbursementsList(); track item.id) {
                            <tr class="hover:bg-slate-900/20 text-slate-300">
                              <td class="px-4 py-2.5 font-semibold text-white font-cairo">{{ item.issuedTo || 'Staff' }}</td>
                              <td class="px-4 py-2.5 text-slate-400 max-w-xs truncate font-cairo">{{ item.reason }}</td>
                              <td class="px-4 py-2.5 text-right font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} EGP</td>
                              <td class="px-4 py-2.5">
                                <select [(ngModel)]="selectedReimbursementPool[item.id]" 
                                  class="w-full max-w-xs bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-cairo">
                                  <option [value]="undefined" disabled selected>-- اختر محفظة الصندوق --</option>
                                  @for (pool of cashPools(); track pool.id) {
                                    <option [value]="pool.id" [disabled]="pool.availableBalance < item.amount">
                                      {{ getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)
                                    </option>
                                  }
                                </select>
                              </td>
                              <td class="px-4 py-2.5 text-center">
                                <button (click)="onApproveReimbursement(item, selectedReimbursementPool[item.id])" 
                                  class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold cursor-pointer font-cairo transition-all">
                                  اعتماد وصرف التعويض / Disburse
                                </button>
                              </td>
                            </tr>
                          } @empty {
                            <tr>
                              <td colspan="5" class="px-4 py-8 text-center text-slate-500 font-cairo">لا توجد تعويضات معلقة مستحقة للموظفين</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              }

              <!-- Status Banner -->
              <div class="rounded-xl border px-5 py-3 flex flex-col gap-2"
                [class.bg-emerald-500\/5]="reconciliationReport()!.isFullyReconciled" [class.border-emerald-500\/30]="reconciliationReport()!.isFullyReconciled"
                [class.bg-rose-500\/5]="!reconciliationReport()!.isFullyReconciled" [class.border-rose-500\/30]="!reconciliationReport()!.isFullyReconciled">
                <div class="flex items-center gap-3">
                  @if (reconciliationReport()!.isFullyReconciled) {
                    <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p class="text-sm font-bold text-emerald-300 font-cairo">✅ جميع الأرصدة مصفَّاة — المشروع جاهز للإغلاق النهائي</p>
                  } @else {
                    <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                    <p class="text-sm font-bold text-rose-300 font-cairo">⚠️ لا يمكن الإغلاق — يوجد عهد معلَّقة أو أرصدة موظفين غير صفرية</p>
                  }
                </div>
                @if (!reconciliationReport()!.isFullyReconciled) {
                  <p class="text-xs text-rose-400 font-cairo ml-8 rtl:mr-8 rtl:ml-0">
                    * يجب تصفية جميع العهد المعلقة، واسترداد المبالغ المرتجعة، وصرف التعويضات المستحقة للموظفين حتى تتساوى كافة الأرصدة إلى 0.00 EGP تماماً لتمكين زر الإغلاق النهائي للمشروع.
                  </p>
                }
              </div>
              <!-- Employee Ledger -->
              @if (reconciliationReport()!.employeeBalances.length > 0) {
                <div class="bg-slate-950/50 border border-slate-800/60 rounded-2xl overflow-hidden">
                  <div class="px-5 py-3 border-b border-slate-800/60 bg-slate-900/40">
                    <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                      <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      دفتر أرصدة الموظفين / Employee Balance Ledger
                    </h4>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-left rtl:text-right text-xs">
                      <thead class="bg-slate-900/60 border-b border-slate-800/60">
                        <tr class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <th class="px-4 py-3 font-cairo">الموظف</th>
                          <th class="px-4 py-3 text-right font-cairo">إجمالي العُهَد</th>
                          <th class="px-4 py-3 text-right font-cairo">المُسوَّى</th>
                          <th class="px-4 py-3 text-right font-cairo">المرتجع</th>
                          <th class="px-4 py-3 text-right font-cairo">الرصيد</th>
                          <th class="px-4 py-3 text-center font-cairo">الحالة</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-800/40">
                        @for (emp of reconciliationReport()!.employeeBalances; track emp.userId) {
                          <tr class="hover:bg-slate-900/30 transition-colors" [class.bg-rose-950\/10]="!emp.isClean">
                            <td class="px-4 py-3 font-semibold text-slate-200 font-cairo">{{ emp.fullName }}</td>
                            <td class="px-4 py-3 text-right font-mono text-amber-300">{{ emp.totalIssued | number:'1.2-2' }}</td>
                            <td class="px-4 py-3 text-right font-mono text-emerald-400">{{ emp.totalSettled | number:'1.2-2' }}</td>
                            <td class="px-4 py-3 text-right font-mono text-cyan-400">
                              @if (emp.totalReturnAmount > 0) {
                                {{ emp.totalReturnAmount | number:'1.2-2' }}
                              } @else {
                                <span class="text-slate-600">—</span>
                              }
                            </td>
                            <td class="px-4 py-3 text-right font-mono font-bold" [class.text-rose-400]="emp.balance > 0" [class.text-slate-300]="emp.balance === 0" [class.text-blue-400]="emp.balance < 0">{{ emp.balance | number:'1.2-2' }}</td>
                            <td class="px-4 py-3 text-center">
                              @if (emp.isClean) {
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">✅ مُصفَّى</span>
                              } @else if (emp.balance > 0) {
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 font-cairo">⚠️ دَيْن</span>
                              } @else {
                                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 font-cairo">💙 تعويض</span>
                              }
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              }
              <p class="text-[11px] text-slate-600 text-center font-cairo">آخر تدقيق: {{ reconciliationReport()!.generatedAt | date:'dd/MM/yyyy HH:mm:ss' }}</p>
            </div>
          } @else if (!isCloseoutLoading()) {
            <div class="text-center py-12 text-slate-500">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p class="text-sm font-cairo">اضغط "تشغيل تدقيق الأرصدة" لتوليد تقرير المراجعة المالية الشاملة.</p>
            </div>
          }
        </div>
      }

      @if (activeTab() === 'gallery') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">

          <div class="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 class="text-base font-bold text-white font-cairo">{{ 'MARKETPLACE.PROJECT_GALLERY' | translate }}</h3>
              <p class="text-xs text-slate-500 mt-1 font-cairo">Upload and manage site photos for public portfolio listings.</p>
            </div>
            <div>
              <button
                type="button"
                (click)="galleryFileInput.click()"
                [disabled]="isUploadingGallery()"
                class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo">
                @if (isUploadingGallery()) {
                  <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ 'DETAILS.UPLOADING' | translate }}
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  {{ 'DETAILS.UPLOAD_IMAGE' | translate }}
                }
              </button>
              <!-- <input
                #galleryFileInput
                type="file"
                class="hidden"
                (change)="onGalleryFileSelected($event)"
                accept="image/*"> -->
                <input
                  #galleryFileInput
                  type="file"
                  class="hidden"
                  (change)="onGalleryFileSelected($event)"
                  accept="image/*">
            </div>
          </div>

          @if (isLoadingGallery()) {
            <div class="flex justify-center py-16">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              @for (photo of galleryPhotos(); track photo.id; let idx = $index) {
                <div 
                  (click)="openLightbox(galleryPhotos(), idx, $event)"
                  class="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md flex items-center justify-center cursor-pointer">
                  <img [src]="photo.photoUrl" (error)="onImgError($event)" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform">
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-[11px] font-bold text-white font-cairo flex items-center gap-1">
                      🔍 معاينة
                    </span>
                  </div>
                  <div class="hidden flex-col items-center justify-center p-3 text-slate-600 font-cairo text-xs gap-1.5 w-full h-full bg-slate-950/80">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-[11px] text-slate-500 font-cairo">صورة غير متاحة</span>
                  </div>
                  
                  @if (isTenantOwner()) {
                    <button
                      type="button"
                      (click)="onDeletePhoto(photo.id)"
                      class="absolute top-2 right-2 rtl:left-2 rtl:right-auto p-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer shadow-lg z-20">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  }

                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-end">
                    <p class="text-[10px] text-slate-300 font-mono">{{ photo.uploadedAt | date:'dd/MM/yyyy HH:mm' }}</p>
                    <p class="text-[10px] text-slate-400 truncate mt-0.5">By: {{ photo.uploadedBy || 'Owner' }}</p>
                  </div>
                </div>
              } @empty {
                <div class="col-span-2 sm:col-span-3 lg:col-span-4 py-16 text-center text-slate-500 text-sm font-cairo">
                  {{ 'MARKETPLACE.NO_PHOTOS' | translate }}
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- Tab Content: Petty Cash -->
      @if (activeTab() === 'petty-cash') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white">{{ 'DETAILS.VOUCHERS_TITLE' | translate }}</h3>
            <div class="flex items-center gap-3">
              @if (isOwnerOrAccountant()) {
                <button
                  (click)="openDisburseModal()"
                  [disabled]="project()?.status === 'Closed'"
                  class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                  تعزيز عهدة مباشر
                </button>
              }
              @if ((isEngineer() || isTenantOwner()) && project()?.status !== 'Closed') {
                <button
                  (click)="openRequestModal()"
                  [disabled]="project()?.status === 'Closed'"
                  class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                  {{ 'DETAILS.BTN_REQUEST_PETTY' | translate }}
                </button>
              }
              <span class="text-xs text-slate-500 font-semibold">{{ pettyCashes().length }} {{ 'DETAILS.RECORDS' | translate }}</span>
            </div>
          </div>

          @if (isLoadingPettyCash()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="w-full overflow-x-auto block font-sans">
              <table class="w-full text-left rtl:text-right min-w-[800px]">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4">{{ 'DETAILS.TH_ISSUED_TO' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_REASON' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_DATE' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                    <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                    <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_ACTION' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (item of pettyCashes(); track item.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 font-semibold text-white">{{ item.issuedTo || 'Staff' }}</td>
                      <td class="px-6 py-4 text-slate-400 max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                          [title]="item.reason"
                          (click)="openPettyCashReasonModal(item)">
                        {{ item.reason }}
                      </td>
                      <td class="px-6 py-4 text-slate-400">{{ item.issuedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-4 font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                      <td class="px-6 py-4 text-center">
                        @if (item.isSettled) {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400">
                            {{ 'DETAILS.STATUS_SETTLED' | translate }}
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400">
                            {{ 'DETAILS.STATUS_PENDING' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 text-center">
                        <div class="flex items-center justify-center gap-2">
                          @if (!item.isSettled && item.status === 'Issued') {
                            <button
                              (click)="openSettlementModal(item)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white shadow-md shadow-indigo-600/10 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                              {{ 'DETAILS.BTN_SETTLE' | translate }}
                            </button>
                          }
                          @if (item.status === 'Issued' || item.status === 'Pending' || item.isSettled) {
                            <button
                              (click)="onWhatsAppAlert(item)"
                              class="px-2.5 py-1.5 bg-emerald-600/80 hover:bg-emerald-700 text-xs font-semibold rounded-lg text-white shadow-md transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 font-cairo">
                              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                              </svg>
                              <span>واتساب</span>
                            </button>
                          } @else {
                            @if (item.receiptPhotoUrl) {
                              <a [href]="item.receiptPhotoUrl" target="_blank" 
                                 class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                                 title="View Receipt">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>معاينة الإيصال</span>
                              </a>
                            }
                            @if (item.settlementPaymentMethod) {
                              <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300" title="Payment Method">
                                {{ item.settlementPaymentMethod }}
                              </span>
                            }
                            @if (item.expenseDate) {
                              <span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-400" title="Expense Date">
                                {{ item.expenseDate | date:'dd/MM/yyyy' }}
                              </span>
                            }
                          }
                          @if (isOwnerOrAccountant()) {
                            @if (item.isSettled || item.status === 'Settled') {
                              <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                                <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                🔒 مقفلة
                              </span>
                            } @else {
                              <div class="flex items-center justify-center gap-2 flex-wrap">
                                @if (item.status === 'Pending') {
                                  <div class="flex items-center gap-1.5 bg-slate-950/40 border border-slate-800/80 p-1.5 rounded-xl">
                                    <select [(ngModel)]="selectedPettyCashPool[item.id]" 
                                      class="bg-slate-900 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-cairo">
                                      <option [value]="undefined" disabled selected>-- محفظة الصرف / Source Pool --</option>
                                      @for (pool of cashPools(); track pool.id) {
                                        <option [value]="pool.id" [disabled]="pool.availableBalance < item.amount">
                                          {{ getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)
                                        </option>
                                      }
                                    </select>
                                    <button
                                      (click)="onApprovePettyCashRequest(item, selectedPettyCashPool[item.id])"
                                      [disabled]="project()?.status === 'Closed'"
                                      title="Approve and disburse"
                                      class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                      Approve / Disburse
                                    </button>
                                    <button
                                      (click)="onRejectPettyCashRequest(item)"
                                      [disabled]="project()?.status === 'Closed'"
                                      title="Reject request"
                                      class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                                      Reject
                                    </button>
                                  </div>
                                }
                                <button
                                  (click)="openEditPettyCashModal(item)"
                                  [disabled]="project()?.status === 'Closed'"
                                  title="Edit pending request"
                                  class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800/10 disabled:text-slate-500 disabled:border-slate-800/20 disabled:pointer-events-none">
                                  Edit
                                </button>
                                <button
                                  (click)="onDeletePettyCash(item.id, item.isSettled)"
                                  [disabled]="isDeletingPettyCash() || project()?.status === 'Closed'"
                                  title="Delete voucher and restore pool balance"
                                  class="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer">
                                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            }
                          }
                        </div>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="px-6 py-14 text-center text-slate-500 text-sm">
                        {{ 'DETAILS.NO_VOUCHERS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Settlements -->
      @if (activeTab() === 'settlements') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white font-cairo">طلبات تسوية العهد / Settlements</h3>
            <span class="text-xs text-slate-500 font-semibold font-cairo">{{ settlements().length }} سجل / Records</span>
          </div>

          @if (isLoadingSettlements()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="w-full overflow-x-auto block font-sans">
              <table class="w-full text-left rtl:text-right min-w-[900px]">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4 font-cairo">صاحب العهدة / Engineer</th>
                    <th class="px-6 py-4 font-cairo">مبلغ العهدة / Custody</th>
                    <th class="px-6 py-4 font-cairo">المبلغ المصروف / Spent</th>
                    <th class="px-6 py-4 font-cairo">الفرق / Difference</th>
                    <th class="px-6 py-4 font-cairo">الحالة / Status</th>
                    <th class="px-6 py-4 font-cairo">التاريخ / Date</th>
                    <th class="px-6 py-4 text-center font-cairo">العمليات / Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (s of settlements(); track s.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4">
                        <div class="font-semibold text-white">{{ s.issuedTo }}</div>
                        <div class="text-xs text-slate-500 max-w-xs truncate">{{ s.custodyReason }}</div>
                      </td>
                      <td class="px-6 py-4 font-mono font-bold text-slate-400">{{ s.custodyAmount | number:'1.2-2' }} EGP</td>
                      <td class="px-6 py-4 font-mono font-bold text-amber-400">{{ s.totalAmount | number:'1.2-2' }} EGP</td>
                      <td class="px-6 py-4 font-mono font-bold" [class.text-emerald-400]="s.netDifference > 0" [class.text-rose-400]="s.netDifference < 0">
                        {{ s.netDifference | number:'1.2-2' }} EGP
                      </td>
                      <td class="px-6 py-4">
                        @if (s.status === 'Draft') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-500/20 text-slate-400">Draft / مسودة</span>
                        } @else if (s.status === 'Approved') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400">Approved</span>
                        } @else if (s.status === 'ApprovedPendingRefund') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-orange-500/10 text-orange-400">Pending Refund</span>
                        } @else if (s.status === 'Refunded') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400">Refunded</span>
                        } @else if (s.status === 'Rejected') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/10 text-rose-400">Rejected</span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400">Pending Approval</span>
                        }
                      </td>
                      <td class="px-6 py-4 text-slate-400 text-xs">{{ s.submittedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center justify-center gap-2">
                          @if (s.status === 'Pending' && isOwnerOrAccountant()) {
                            <button
                              (click)="onApproveSettlement(s.id)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold rounded-lg text-white font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none">
                              اعتماد
                            </button>
                            <button
                              (click)="onRejectSettlement(s.id)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-xs font-semibold rounded-lg text-white font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none">
                              رفض
                            </button>
                          }
                          @if (s.status === 'ApprovedPendingRefund' && isOwnerOrAccountant()) {
                            <button
                              (click)="onConfirmRefund(s.id)"
                              [disabled]="project()?.status === 'Closed'"
                              class="px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-xs font-semibold rounded-lg text-white font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:pointer-events-none">
                              تأكيد استلام المرتجع
                            </button>
                          }
                          <button
                            (click)="printSettlementReport(s)"
                            class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 hover:text-white border border-slate-700 transition-all font-cairo flex items-center gap-1 active:scale-95 cursor-pointer">
                            طباعة / Print 🖨️
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Difference Clarification Sub-Row -->
                    @if (s.netDifference !== 0 && s.status !== 'Pending' && s.status !== 'Draft' && s.status !== 'Rejected') {
                      <tr class="bg-slate-950/30">
                        <td colspan="7" class="px-6 py-2.5 border-b border-slate-800/30">
                          @if (s.netDifference < 0) {
                            <div class="flex items-center gap-2.5">
                              <span class="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/15 shrink-0">
                                <svg class="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                              </span>
                              <div>
                                <span class="text-[11px] font-bold text-rose-300 font-cairo">⚡ المهندس صرف أكثر من العهدة بـ {{ (s.netDifference * -1) | number:'1.2-2' }} EGP</span>
                                <span class="text-[10px] text-rose-400/70 font-cairo mr-2 rtl:mr-0 rtl:ml-2">— تم توليد طلب تعويض تلقائي (Reimbursement) يتطلب اعتماد المحاسب وصرفه من محفظة الصندوق</span>
                              </div>
                            </div>
                          } @else {
                            <div class="flex items-center gap-2.5">
                              @if (s.status === 'ApprovedPendingRefund') {
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/15 shrink-0">
                                  <svg class="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <div>
                                  <span class="text-[11px] font-bold text-orange-300 font-cairo">💰 مرتجع {{ s.netDifference | number:'1.2-2' }} EGP بانتظار تأكيد استلام المحاسب</span>
                                  <span class="text-[10px] text-orange-400/70 font-cairo mr-2 rtl:mr-0 rtl:ml-2">— المهندس صرف أقل من العهدة والباقي يجب إرجاعه للصندوق</span>
                                </div>
                              } @else if (s.status === 'Refunded') {
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/15 shrink-0">
                                  <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <div>
                                  <span class="text-[11px] font-bold text-cyan-300 font-cairo">✅ تم استرداد {{ s.netDifference | number:'1.2-2' }} EGP بنجاح وإعادتها للصندوق</span>
                                  <span class="text-[10px] text-cyan-400/70 font-cairo mr-2 rtl:mr-0 rtl:ml-2">— المرتجع مُؤَكَّد ومُسجَّل كـ RefundToTreasury</span>
                                </div>
                              } @else {
                                <span class="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 shrink-0">
                                  <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <div>
                                  <span class="text-[11px] font-bold text-emerald-300 font-cairo">المهندس صرف أقل من العهدة — فائض {{ s.netDifference | number:'1.2-2' }} EGP</span>
                                </div>
                              }
                            </div>
                          }
                        </td>
                      </tr>
                    }
                    <!-- Nested Lines View -->
                    <tr class="bg-slate-950/20">
                      <td colspan="7" class="px-6 py-3 border-b border-slate-800/40">
                        <div class="text-xs font-bold text-slate-400 mb-2 font-cairo">تفاصيل البنود المصروفة / Invoiced Lines:</div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          @for (line of s.lines; track line.id) {
                            <div class="bg-slate-900/50 border border-slate-800/50 rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 font-cairo">{{ line.category }}</span>
                                <div class="text-xs text-white mt-1 font-semibold">{{ line.description }}</div>
                              </div>
                              <div class="text-right">
                                <div class="text-xs font-bold text-amber-400 font-mono">{{ line.amount }} EGP</div>
                                @if (line.invoiceUrl) {
                                  <a [href]="line.invoiceUrl" target="_blank" class="text-[10px] text-indigo-400 hover:underline font-cairo mt-1 block">📄 الفاتورة</a>
                                }
                              </div>
                            </div>
                          }
                        </div>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="7" class="px-6 py-14 text-center text-slate-500 text-sm font-cairo">
                        لا توجد طلبات تسوية مقدمة حالياً / No settlements submitted yet.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Financial Transactions -->
      @if (activeTab() === 'transactions') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white">{{ 'DETAILS.LEDGER_TITLE' | translate }}</h3>
            <div class="flex items-center gap-3">
              <span class="text-xs text-slate-500 font-semibold">{{ transactions().length }} {{ 'DETAILS.ENTRIES' | translate }}</span>
            </div>
          </div>

          @if (isLoadingTransactions()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="w-full overflow-x-auto block font-sans">
              <table class="w-full text-left rtl:text-right min-w-[800px]">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4">{{ 'DETAILS.TH_DATE' | translate }}</th>
                    <th class="px-6 py-4">Method</th>
                    <th class="px-6 py-4">{{ 'PROJECTS.FIELD_DESC' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                    <th class="px-6 py-4 text-center">Receipt</th>
                    @if (isOwnerOrAccountant()) {
                      <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_ACTION' | translate }}</th>
                    }
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (t of transactions(); track t.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 text-slate-400">
                        <div>{{ t.transactionDate | date:'dd/MM/yyyy HH:mm' }}</div>
                        @if (t.paymentDate) {
                          <div class="text-[10px] text-slate-500 mt-1">Paid: {{ t.paymentDate | date:'dd/MM/yyyy' }}</div>
                        }
                      </td>
                      <td class="px-6 py-4">
                        @if (t.paymentMethod) {
                          <span class="px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-slate-300">
                            {{ t.paymentMethod }}
                          </span>
                        } @else {
                          <span class="text-xs text-slate-600">-</span>
                        }
                      </td>
                      <td class="px-6 py-4 font-medium text-white max-w-[220px] lg:max-w-[320px] truncate cursor-pointer hover:text-sky-400 transition-colors"
                          [title]="t.description"
                          (click)="openTransactionInspectionModal(t)">
                        {{ t.description }}
                      </td>
                      <td class="px-6 py-4">
                        @if (t.type === 'Income') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400">
                            {{ 'DETAILS.BADGE_INCOME' | translate }}
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400">
                            {{ 'DETAILS.BADGE_EXPENSE' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 font-mono font-bold"
                          [class.text-emerald-400]="t.type === 'Income'"
                          [class.text-rose-400]="t.type !== 'Income'">
                        {{ t.type === 'Income' ? '+' : '-' }}{{ t.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                      </td>
                      <td class="px-6 py-4 text-center">
                        @if (t.receiptPhotoUrl) {
                          <a [href]="t.receiptPhotoUrl" target="_blank" 
                             class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                             title="View Receipt">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>معاينة الإيصال</span>
                          </a>
                        } @else {
                          <span class="text-xs text-slate-600">-</span>
                        }
                      </td>
                      @if (isOwnerOrAccountant()) {
                        <td class="px-6 py-4 text-center">
                          @if (t.isLocked || t.canEdit === false || t.description.toLowerCase().startsWith('petty cash settlement -')) {
                            <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none font-cairo">
                              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              🔒 مقفلة
                            </span>
                          } @else {
                            <div class="flex items-center justify-center gap-1.5">
                              <button
                                (click)="openEditTransactionModal(t)"
                                [disabled]="project()?.status === 'Closed'"
                                title="Edit transaction"
                                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800/10 disabled:text-slate-500 disabled:border-slate-800/20 disabled:pointer-events-none">
                                Edit
                              </button>
                              <button
                                (click)="onDeleteTransaction(t.id)"
                                [disabled]="isDeletingTransaction() || project()?.status === 'Closed'"
                                title="Delete transaction and roll back pool"
                                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer">
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
                      <td colspan="4" class="px-6 py-14 text-center text-slate-500 text-sm">
                        {{ 'DETAILS.NO_TRANSACTIONS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Company Admin Settings -->
      @if (activeTab() === 'admin-settings') {
        <div class="space-y-6">
          <!-- Company profile details edit form -->
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 class="text-lg font-bold text-white font-cairo">تعديل بيانات الشركة الأساسية / Edit Company Profile</h3>


            <form [formGroup]="profileForm" (ngSubmit)="onProfileSubmit()" class="space-y-5 overflow-y-auto min-h-0 pr-1 flex-1">
              <!-- Banner upload -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">بانر الشركة / Company Banner</label>
                <div class="w-full h-36 sm:h-44 bg-slate-800 rounded-xl relative overflow-hidden group border border-slate-700">
                  @if (profileForm.get('bannerUrl')?.value) {
                    <img [src]="profileForm.get('bannerUrl')?.value" alt="Banner" class="w-full h-full object-cover">
                  } @else {
                    <div class="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 flex items-center justify-center">
                      <span class="text-xs text-slate-500">لا يوجد بانر / No Banner</span>
                    </div>
                  }
                  <button
                    type="button"
                    (click)="bannerFileInput.click()"
                    class="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <span class="flex items-center gap-2 text-white text-xs font-bold font-cairo bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-sm">
                      @if (isUploadingBanner()) {
                        جاري الرفع...
                      } @else {
                        تغيير البانر / Change Banner
                      }
                    </span>
                  </button>
                  <input #bannerFileInput type="file" (change)="onBannerFileSelected($event)" accept="image/*" class="hidden">
                </div>
              </div>

              <!-- Logo upload & profile name -->
              <div class="flex items-end gap-4">
                <div class="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden relative group shadow-xl shrink-0">
                  @if (profileForm.get('logoUrl')?.value) {
                    <img [src]="profileForm.get('logoUrl')?.value" alt="Logo" class="w-full h-full object-cover">
                  } @else {
                    <span class="text-3xl font-extrabold text-slate-600 select-none">Logo</span>
                  }
                  <button
                    type="button"
                    (click)="logoFileInput.click()"
                    class="absolute inset-0 rounded-full bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                    <span class="text-white text-[10px] font-bold text-center">
                      @if (isUploadingLogo()) {
                        جاري...
                      } @else {
                        تغيير / Change
                      }
                    </span>
                  </button>
                  <input #logoFileInput type="file" (change)="onLogoFileSelected($event)" accept="image/*" class="hidden">
                </div>

                <div class="flex-1 space-y-4">
                  <div>
                    <label for="prof-name" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">اسم الشركة / Company Name *</label>
                    <input
                      id="prof-name"
                      type="text"
                      formControlName="name"
                      class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Company Name">
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="prof-region" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المنطقة / Region</label>
                  <input
                    id="prof-region"
                    type="text"
                    formControlName="region"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                    placeholder="e.g. Cairo, Riyadh">
                </div>
                <div>
                  <label for="prof-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">وصف الشركة / Company Description</label>
                  <textarea
                    id="prof-desc"
                    formControlName="companyDescription"
                    rows="3"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                    placeholder="Write a brief overview..."></textarea>
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  [disabled]="profileForm.invalid || isSavingProfile()"
                  class="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                  حفظ البيانات / Save Settings
                </button>
              </div>
            </form>
          </div>

          <!-- Project visibility switch -->
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 class="text-lg font-bold text-white font-cairo">إعدادات خصوصية وعرض المشروع / Project Visibility Settings</h3>
            <p class="text-xs text-slate-400 font-cairo">حدد ما إذا كان هذا المشروع سيظهر للعامة في معرض المشروعات والبروفايل العام لشركتك أم سيظل خاصاً.</p>

            <form [formGroup]="projectSettingsForm" (ngSubmit)="onProjectSettingsSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
              <div class="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div class="space-y-0.5">
                  <label class="text-sm font-bold text-slate-200 font-cairo">عرض المشروع في المعرض العام / Show on Public Portfolio Gallery</label>
                  <p class="text-xs text-slate-500 font-cairo">عند التفعيل، سيتم إتاحة صور وبيانات المشروع للزوار والشركات الخارجية.</p>
                </div>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="is-public-portfolio"
                    formControlName="isPublicPortfolio"
                    class="w-5 h-5 text-indigo-600 border-slate-700 bg-slate-950 rounded focus:ring-indigo-500 focus:ring-2 focus:ring-offset-slate-900 cursor-pointer">
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button
                  type="submit"
                  [disabled]="isSavingProjectSettings()"
                  class="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                  تحديث الخصوصية / Update Visibility
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>


    <!-- Settle Petty Cash Modal -->
    @if (isSettleModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-xl font-bold text-white">{{ 'DETAILS.MODAL_SETTLE_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ 'DETAILS.MODAL_SETTLE_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeSettleModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Voucher Info Card -->
          @if (activePettyCash()) {
            <div class="my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_ISSUED_TO' | translate }}</span>
                <span class="font-semibold">{{ activePettyCash()!.issuedTo || 'Staff' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_ISSUED_AMOUNT' | translate }}</span>
                <span class="font-bold text-amber-400 font-mono">{{ activePettyCash()!.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_REASON' | translate }}</span>
                <span class="font-semibold text-right max-w-[180px] truncate">{{ activePettyCash()!.reason }}</span>
              </div>
            </div>
          }

          <!-- Settle Errors -->
          @if (settleErrors().length > 0) {
            <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1">{{ 'DETAILS.SETTLE_FAILED' | translate }}</span>
              @for (err of settleErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="settleForm" (ngSubmit)="onSettleSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label for="spentAmount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_SPENT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="spentAmount"
                type="number"
                formControlName="spentAmount"
                step="0.01"
                min="0"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="0.00">
              @if (isSettleFieldInvalid('spentAmount')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_SPENT_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="receiptDescription" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_NOTES' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="receiptDescription"
                formControlName="receiptDescription"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="مثال: شراء مستلزمات للموقع، حوافز عمال، فواتير نقل..."></textarea>
              @if (isSettleFieldInvalid('receiptDescription')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_NOTES_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="expenseDate" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                تاريخ الصرف الفعلي <span class="text-red-400">*</span>
              </label>
              <div class="relative">
                <input
                  id="expenseDate"
                  type="text"
                  [value]="formatDisplayDate(settleForm.get('expenseDate')?.value)"
                  (input)="onDateInputChanged($event, 'expenseDate', settleForm)"
                  placeholder="DD/MM/YYYY"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 font-mono pr-10">
                <input
                  #expenseDatePicker
                  type="date"
                  [value]="settleForm.get('expenseDate')?.value"
                  (change)="onNativeDatePicked($event, 'expenseDate', settleForm)"
                  class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                  style="clip: rect(0,0,0,0);">
                <button
                  type="button"
                  (click)="openDatePicker(expenseDatePicker)"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              @if (isSettleFieldInvalid('expenseDate')) {
                <span class="text-xs text-red-400 mt-1 block">Expense Date is required.</span>
              }
            </div>

            <div>
              <label for="settlementPaymentMethod" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Payment Method / طريقة الدفع <span class="text-red-400">*</span>
              </label>
              <select
                id="settlementPaymentMethod"
                formControlName="settlementPaymentMethod"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option [ngValue]="null" disabled>Select Method</option>
                <option value="Cash">كاش (Cash)</option>
                <option value="InstaPay">إنستا باي (InstaPay)</option>
                <option value="BankTransfer">تحويل بنكي (Bank Transfer)</option>
                <option value="Cheque">شيك (Cheque)</option>
              </select>
              @if (isSettleFieldInvalid('settlementPaymentMethod')) {
                <span class="text-xs text-red-400 mt-1 block">
                  Payment Method is required.
                </span>
              }
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                إرفاق الفاتورة / إيصال الصرف (اختياري)
              </label>
              <input
                type="file"
                (change)="onSettleReceiptSelected($event)"
                accept="image/*,application/pdf"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer">
              @if (isUploadingSettleReceipt()) {
                <span class="text-xs text-indigo-400 mt-1 flex items-center gap-2">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading receipt...
                </span>
              }
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeSettleModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="settleForm.invalid || isSettling()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                @if (isSettling()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'DETAILS.PROCESSING' | translate }}
                  </span>
                } @else {
                  تأكيد التسوية
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Request Petty Cash Modal -->
    @if (isRequestModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-xl font-bold text-white">{{ 'DETAILS.MODAL_REQUEST_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ 'DETAILS.MODAL_REQUEST_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeRequestModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Request Errors -->
          @if (requestErrors().length > 0) {
            <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1">{{ 'DETAILS.REQUEST_FAILED' | translate }}</span>
              @for (err of requestErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="requestForm" (ngSubmit)="onRequestSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label for="req-amount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_AMOUNT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="req-amount"
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="0.00">
              @if (isRequestFieldInvalid('amount')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_AMOUNT_ERR' | translate }}
                </span>
              }
              @if (requestForm.get('amount')?.hasError('insufficientBalance')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">
                  المبلغ المطلوب للعهدة أكبر من الرصيد المتاح في الصندوق المحدد! / The requested amount exceeds the available balance!
                </span>
              }

            </div>

            <div>
              <label for="req-reason" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_REASON' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="req-reason"
                formControlName="reason"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="e.g. Scaffolding rental or site supplies purchase."></textarea>
              @if (isRequestFieldInvalid('reason')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_REASON_ERR' | translate }}
                </span>
              }
            </div>

            @if (isTenantOwner()) {
              <div>
                <label for="req-source" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Disburse From Pool <span class="text-red-400">*</span>
                </label>
                <select
                  id="req-source"
                  formControlName="sourcePoolId"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <option [ngValue]="null" disabled>Select funding source...</option>
                  @for (pool of cashPools(); track pool.id) {
                    <option [value]="pool.id">{{ getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)</option>
                  }
                </select>
                @if (isRequestFieldInvalid('sourcePoolId')) {
                  <span class="text-xs text-red-400 mt-1 block">Please select a funding source pool.</span>
                }
              </div>
            }

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeRequestModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="requestForm.invalid || isRequesting()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                @if (isRequesting()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'DETAILS.BTN_SUBMITTING' | translate }}
                  </span>
                } @else {
                  {{ 'DETAILS.BTN_REQUEST_SUBMIT' | translate }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Inject Capital Modal -->
    @if (isInjectModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 !overflow-hidden box-border deposit-modal-container scrollbar-none" style="overflow: hidden !important;">
          <div class="flex justify-between items-center mb-6 shrink-0">
            <h3 class="text-xl font-bold text-white font-cairo">{{ 'DETAILS.INJECT_CAPITAL' | translate }}</h3>
            <button (click)="closeInjectModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (injectErrors().length > 0) {
            <div class="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 mb-4 shrink-0">
              <ul class="list-disc list-inside text-xs text-rose-400">
                @for (error of injectErrors(); track error) {
                  <li>{{ error }}</li>
                }
              </ul>
            </div>
          }

          <form [formGroup]="injectForm" (ngSubmit)="submitCapitalInjection()" class="space-y-5 font-sans !overflow-x-hidden !overflow-y-hidden deposit-modal-body min-h-0 pr-1 pb-2 flex-1 box-border scrollbar-none" style="overflow-x: hidden !important; overflow-y: hidden !important;">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'FINANCE.AMOUNT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 font-mono"
                placeholder="0.00">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'FINANCE.SOURCE_TYPE' | translate }} <span class="text-red-400">*</span>
              </label>
              <select
                formControlName="sourceType"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option [ngValue]="null" disabled>{{ 'FINANCE.SELECT_SOURCE' | translate }}</option>
                <option value="ClientDeposit">{{ 'FINANCE.CLIENT_DEPOSIT' | translate }}</option>
                <option value="OwnerCapital">{{ 'FINANCE.OWNER_CAPITAL' | translate }}</option>
                <option value="ExternalLoan">{{ 'FINANCE.EXTERNAL_LOAN' | translate }}</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Payment Date <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <input
                    type="text"
                    [value]="formatDisplayDate(injectForm.get('paymentDate')?.value)"
                    (input)="onDateInputChanged($event, 'paymentDate', injectForm)"
                    placeholder="DD/MM/YYYY"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 font-mono pr-10">
                  <input
                    #injectDatePicker
                    type="date"
                    [value]="injectForm.get('paymentDate')?.value"
                    (change)="onNativeDatePicked($event, 'paymentDate', injectForm)"
                    class="sr-only opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    style="clip: rect(0,0,0,0);">
                  <button
                    type="button"
                    (click)="openDatePicker(injectDatePicker)"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer z-20">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Payment Method <span class="text-red-400">*</span>
                </label>
                <select
                  formControlName="paymentMethod"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <option [ngValue]="null" disabled>Select Method</option>
                  <option value="Cash">Cash</option>
                  <option value="BankTransfer">Bank Transfer</option>
                  <option value="InstaPay">InstaPay</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'FINANCE.NOTES_REFERENCE' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                formControlName="description"
                rows="2"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="e.g. Received check #12345 from Client"></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Receipt / Proof of Payment <span class="text-xs font-normal text-slate-500">(Optional)</span>
              </label>
              <input 
                type="file" 
                accept="image/*" 
                (change)="onInjectReceiptSelected($event)" 
                class="w-full text-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 cursor-pointer">
            </div>

            <div class="flex justify-end gap-3 pt-4 pb-1 mb-1">
              <button
                type="button"
                (click)="closeInjectModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo focus:outline-none focus:ring-0">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="injectForm.invalid || isInjecting()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-0 cursor-pointer font-cairo shadow-lg shadow-indigo-600/20 box-border">
                @if (isInjecting()) {
                  {{ 'COMMON.LOADING' | translate }}
                } @else {
                  {{ 'DETAILS.INJECT_CAPITAL' | translate }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Edit Petty Cash Modal -->
    @if (isEditPettyCashModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">تعديل العهدة النقدية (Edit Petty Cash)</h3>
            <button (click)="closeEditPettyCashModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="editPettyCashForm" (ngSubmit)="submitEditPettyCash()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Amount / المبلغ</label>
              <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Category / التصنيف</label>
              <select formControlName="category" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                <option value="Cement">Cement / أسمنت</option>
                <option value="Logistics">Logistics / خدمات لوجستية</option>
                <option value="Materials">Materials / مواد بناء</option>
                <option value="Labor">Labor / حوافز وأجور عمال</option>
                <option value="Other">Other / أخرى</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Reason / السبب</label>
              <textarea formControlName="reason" rows="3" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none"></textarea>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeEditPettyCashModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">إلغاء</button>
              <button type="submit" [disabled]="editPettyCashForm.invalid || isEditingPettyCash()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-cairo">حفظ التغيرات</button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Edit Transaction Modal -->
    @if (isEditTransactionModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">تعديل الحركة المالية (Edit Transaction)</h3>
            <button (click)="closeEditTransactionModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="editTransactionForm" (ngSubmit)="submitEditTransaction()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Amount / المبلغ</label>
              <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Description / الوصف</label>
              <textarea formControlName="description" rows="3" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none"></textarea>
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeEditTransactionModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">إلغاء</button>
              <button type="submit" [disabled]="editTransactionForm.invalid || isSavingTransaction()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-cairo">حفظ التغيرات</button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Revise Budget Modal -->
    @if (isReviseBudgetModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">تعديل ميزانية المشروع (Revise Budget)</h3>
            <button (click)="closeReviseBudgetModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form [formGroup]="reviseBudgetForm" (ngSubmit)="submitReviseBudget()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">New Budget / الميزانية الجديدة <span class="text-red-400">*</span></label>
              <input type="number" formControlName="newBudget" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Reason / سبب التغيير <span class="text-red-400">*</span></label>
              <textarea formControlName="reasonForChange" rows="3" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none" placeholder="e.g. Scope revision or cost adjustment..."></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">BOQ Document / جدول الكميات (PDF, Excel) <span class="text-xs font-normal text-slate-500">(Optional)</span></label>
              <input type="file" accept=".pdf,.xlsx,.xls,image/*" (change)="onBoqFileSelected($event)" class="w-full text-slate-200 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-slate-800 file:text-indigo-400 hover:file:bg-slate-700 cursor-pointer">
              @if (isUploadingBoq()) {
                <span class="text-xs text-indigo-400 mt-1 flex items-center gap-2 font-cairo">
                  <svg class="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading BOQ document...
                </span>
              }
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeReviseBudgetModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">إلغاء</button>
              <button type="submit" [disabled]="reviseBudgetForm.invalid || isRevisingBudget() || isUploadingBoq()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 font-cairo">
                @if (isRevisingBudget()) {
                  {{ 'COMMON.LOADING' | translate }}
                } @else {
                  حفظ التغيرات
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Direct Disbursement Modal -->
    @if (isDisburseModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <div class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white font-cairo">تعزيز عهدة مباشر</h3>
            <button (click)="closeDisburseModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (disburseErrors().length > 0) {
            <div class="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold">
              @for (err of disburseErrors(); track err) {
                <div>{{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="disburseForm" (ngSubmit)="onDisburseSubmit()" class="space-y-4 font-sans overflow-y-auto min-h-0 pr-1 flex-1">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المهندس <span class="text-slate-500 text-[10px] normal-case">(اختياري — إذا فارغ، ستُسجل العهدة لحسابك)</span></label>
              <select formControlName="userId" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                <option [ngValue]="null">-- لنفسي (الأدمن الحالي) --</option>
                @for (u of usersList(); track u.id) {
                  <option [value]="u.id">{{ u.firstName }} {{ u.lastName }} ({{ u.role }})</option>
                }
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المبلغ <span class="text-red-400">*</span></label>
                <input type="number" formControlName="amount" step="0.01" min="0.01" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
              </div>
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">طريقة الدفع <span class="text-red-400">*</span></label>
                <select formControlName="paymentMethod" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                  <option value="Cash">نقدي</option>
                  <option value="BankTransfer">تحويل بنكي</option>
                  <option value="InstaPay">InstaPay</option>
                  <option value="Cheque">شيك</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">مصدر التمويل <span class="text-red-400">*</span></label>
              <select formControlName="sourcePoolId" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/40">
                <option [ngValue]="null" disabled>اختر الصندوق</option>
                @for (pool of cashPools(); track pool.id) {
                  <option [value]="pool.id">{{ getPoolSourceLabel(pool.sourceType) }} (الرصيد: {{ pool.availableBalance | number:'1.0-2' }} ج.م)</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">البيان <span class="text-red-400">*</span></label>
              <textarea formControlName="description" rows="2" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm resize-none"></textarea>
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button type="button" (click)="closeDisburseModal()" class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 bg-slate-950 border border-slate-800 font-cairo">إلغاء</button>
              <button type="submit" [disabled]="disburseForm.invalid || isDisbursing()" class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 font-cairo">
                @if (isDisbursing()) {
                  جاري التحويل...
                } @else {
                  تأكيد التحويل
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Settlement Modal (Refactored Inline Dynamic Table) -->
    @if (isSettlementModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm font-cairo">
        <div (click)="closeSettlementModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-4xl mx-auto max-h-[92vh] flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-700/60 p-4 sm:p-6 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          
          <!-- Header -->
          <div class="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <div>
              <h3 class="text-xl font-bold text-white">تسوية عهدة</h3>
              <p class="text-xs text-slate-400 mt-1">
                بيان العهدة: <span class="text-slate-200 font-bold">{{ selectedPettyCashForSettlement()?.reason }}</span>
              </p>
            </div>
            <button (click)="closeSettlementModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (settlementErrors().length > 0) {
            <div class="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold">
              @for (err of settlementErrors(); track err) {
                <div>{{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="settlementForm" class="flex flex-col flex-1 min-h-0 space-y-4">
            
            <!-- 1️⃣ Sticky Petty Cash Live Calculation Summary -->
            <div class="bg-slate-950/60 border border-slate-800 p-3 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3 text-xs shadow-md">
              <div class="flex items-center gap-2.5 bg-slate-900/60 rounded-lg px-3 py-2.5 border border-slate-800/60">
                <span class="text-amber-400 text-base">🟡</span>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-500 font-semibold">إجمالي العهدة الصادرة</span>
                  <span class="font-mono font-bold text-amber-400 text-sm">{{ selectedPettyCashForSettlement()?.amount | number:'1.2-2' }} EGP</span>
                </div>
              </div>

              <div class="flex items-center gap-2.5 bg-slate-900/60 rounded-lg px-3 py-2.5 border border-slate-800/60">
                <span class="text-sky-400 text-base">🔵</span>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-500 font-semibold">إجمالي البنود المصروفة</span>
                  <span class="font-mono font-bold text-sky-400 text-sm">{{ calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                </div>
              </div>

              <div class="flex items-center gap-2.5 bg-slate-900/60 rounded-lg px-3 py-2.5 border border-slate-800/60">
                @let remBal = (selectedPettyCashForSettlement()!.amount - calculateSettlementTotal());
                <span class="text-base">{{ remBal >= 0 ? '🟢' : '🟠' }}</span>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-500 font-semibold">الرصيد المتبقي</span>
                  <span [class]="remBal >= 0 ? 'font-mono font-bold text-emerald-400 text-sm' : 'font-mono font-bold text-amber-400 text-sm'">
                    {{ remBal | number:'1.2-2' }} EGP
                  </span>
                </div>
              </div>
            </div>

            <!-- Scrollable Content Area -->
            <div class="flex-1 overflow-y-auto min-h-0 pr-1 space-y-3">
              
              <!-- 2️⃣ Compact Dynamic Inline Table (Desktop Viewport - md+) -->
              <div formArrayName="lines" class="hidden md:block overflow-x-auto border border-slate-800/80 rounded-xl bg-slate-950/40">
                <table class="w-full text-right rtl:text-right font-sans text-xs">
                  <thead>
                    <tr class="bg-slate-900/90 text-slate-400 text-[11px] font-bold border-b border-slate-800 font-cairo">
                      <th class="py-2.5 px-3 text-center w-10">#</th>
                      <th class="py-2.5 px-3 w-40">التصنيف</th>
                      <th class="py-2.5 px-3">البيان / رقم الفاتورة</th>
                      <th class="py-2.5 px-3 w-32">المبلغ</th>
                      <th class="py-2.5 px-3 w-44">الإيصال</th>
                      <th class="py-2.5 px-3 text-center w-16">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60 text-slate-200">
                    @for (line of settlementLines.controls; track line; let idx = $index) {
                      <tr [formGroupName]="idx" class="hover:bg-slate-900/40 transition-colors">
                        <td class="py-2 px-3 text-center font-bold text-indigo-400 font-mono">{{ idx + 1 }}</td>
                        <td class="py-2 px-3">
                          <select formControlName="category" class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-cairo">
                            <option value="Cement">أسمنت</option>
                            <option value="Logistics">خدمات لوجستية</option>
                            <option value="Materials">مواد بناء</option>
                            <option value="Labor">حوافز وأجور عمال</option>
                            <option value="Other">أخرى</option>
                          </select>
                        </td>
                        <td class="py-2 px-3">
                          <input type="text" formControlName="description" placeholder="الوصف أو رقم الفاتورة..." class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-cairo">
                        </td>
                        <td class="py-2 px-3">
                          <input type="number" formControlName="amount" placeholder="0.00" class="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500">
                        </td>
                        <td class="py-2 px-3">
                          <div class="flex items-center gap-2">
                            <label class="cursor-pointer px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-indigo-400 border border-slate-700 inline-flex items-center gap-1 font-cairo">
                              <span>📎</span>
                              <span>اختر ملف</span>
                              <input type="file" accept="image/*,application/pdf,.xlsx,.xls" [disabled]="isSettlementLocked()" (change)="onSettlementLineFileSelected($event, idx)" class="hidden">
                            </label>
                            @if (line.get('localPreviewUrl')?.value) {
                              <div (click)="activePreviewPhotoUrl.set(line.get('localPreviewUrl')?.value)" class="w-7 h-7 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer hover:scale-110 transition-transform shrink-0" title="معاينة الإيصال">
                                <img [src]="line.get('localPreviewUrl')?.value" class="w-full h-full object-cover">
                              </div>
                            }
                            @if (line.get('uploading')?.value) {
                              <span class="text-[10px] text-indigo-400 animate-pulse font-cairo">جاري الرفع...</span>
                            }
                          </div>
                        </td>
                        <td class="py-2 px-3 text-center">
                          @if (!isSettlementLocked()) {
                            <button type="button" (click)="removeSettlementLine(idx)" class="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer" [disabled]="settlementLines.length === 1" title="حذف البند">
                              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <!-- 3️⃣ Responsive Mobile Card Layout (block md:hidden) -->
              <div formArrayName="lines" class="block md:hidden space-y-3">
                @for (line of settlementLines.controls; track line; let idx = $index) {
                  <details [open]="idx === settlementLines.length - 1" class="group bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-cairo shadow-md">
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
                            <input type="file" accept="image/*,application/pdf,.xlsx,.xls" [disabled]="isSettlementLocked()" (change)="onSettlementLineFileSelected($event, idx)" class="hidden">
                          </label>
                          @if (line.get('localPreviewUrl')?.value) {
                            <div (click)="activePreviewPhotoUrl.set(line.get('localPreviewUrl')?.value)" class="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 cursor-pointer shrink-0">
                              <img [src]="line.get('localPreviewUrl')?.value" class="w-full h-full object-cover">
                            </div>
                          }
                          @if (line.get('uploading')?.value) {
                            <span class="text-[10px] text-indigo-400 animate-pulse">جاري الرفع...</span>
                          }
                        </div>
                      </div>

                      @if (!isSettlementLocked()) {
                        <div class="flex justify-end pt-1">
                          <button type="button" (click)="removeSettlementLine(idx)" class="px-3 py-1.5 text-[11px] font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1" [disabled]="settlementLines.length === 1">
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
              @if (!isSettlementLocked()) {
                <button type="button" (click)="addSettlementLine()" class="w-full py-2.5 text-xs font-bold text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-dashed border-indigo-500/30 hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer font-cairo flex items-center justify-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  إضافة فاتورة / بند جديد
                </button>
              }

              <!-- Ledger summary & Net calculation -->
              <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div class="flex justify-between text-xs text-slate-400 font-cairo">
                  <span>إجمالي مبلغ العهدة الأصلي:</span>
                  <span class="font-mono font-semibold text-slate-300">{{ selectedPettyCashForSettlement()?.amount | number:'1.2-2' }} EGP</span>
                </div>
                <div class="flex justify-between text-xs text-slate-400 font-cairo">
                  <span>إجمالي المبالغ المصروفة بالفواتير:</span>
                  <span class="font-mono font-semibold text-amber-400">{{ calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                </div>
                <div class="border-t border-slate-800/80 pt-2 flex justify-between text-sm font-bold font-cairo">
                  @if (selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() > 0) {
                    <span class="text-emerald-400">متبقي يجب إرجاعه للخزينة:</span>
                    <span class="text-emerald-400 font-mono">+{{ selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                  } @else if (selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() < 0) {
                    <span class="text-rose-400">مستحق للمهندس:</span>
                    <span class="text-rose-400 font-mono">{{ selectedPettyCashForSettlement()!.amount - calculateSettlementTotal() | number:'1.2-2' }} EGP</span>
                  } @else {
                    <span class="text-slate-300">تسوية متطابقة تماماً:</span>
                    <span class="text-slate-300 font-mono">0.00 EGP</span>
                  }
                </div>
              </div>
            </div> <!-- End of Scrollable Content Area -->

            <!-- 4️⃣ Action Bar (Clean Arabic Labels) -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-800">
              <button type="button" (click)="closeSettlementModal()" class="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all font-cairo cursor-pointer">إغلاق</button>
              
              @if (!isSettlementLocked()) {
                <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button type="button" (click)="onSettlementSubmit(true)" [disabled]="settlementForm.invalid || isSubmittingSettlement()" class="w-full sm:w-auto px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 bg-slate-800 hover:bg-slate-750 border border-slate-700 disabled:opacity-50 transition-all font-cairo cursor-pointer">
                    @if (isSubmittingSettlement()) {
                      جاري الحفظ...
                    } @else {
                      💾 حفظ كمسودة
                    }
                  </button>

                  <button type="button" (click)="onSettlementSubmit(false)" [disabled]="settlementForm.invalid || isSubmittingSettlement()" class="w-full sm:w-auto px-5 py-2.5 text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] disabled:opacity-50 transition-all font-cairo cursor-pointer">
                    @if (isSubmittingSettlement()) {
                      جاري التقديم...
                    } @else {
                      🚀 تقديم للمراجعة النهائية
                    }
                  </button>
                </div>
              }
            </div>

            <!-- Image Preview Lightbox Modal -->
            @if (activePreviewPhotoUrl()) {
              <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                <div (click)="activePreviewPhotoUrl.set(null)" class="absolute inset-0"></div>
                <div class="relative max-w-4xl max-h-[85vh] z-10">
                  <button (click)="activePreviewPhotoUrl.set(null)" class="absolute -top-12 right-0 text-white/80 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <img [src]="activePreviewPhotoUrl()" class="max-w-full max-h-[80vh] rounded-2xl object-contain border border-slate-750 shadow-2xl">
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    }

    <!-- Hidden Print Layout -->
    @if (activePrintSettlement()) {
      <div class="print-only hidden print:block p-8 bg-white text-slate-900 font-sans leading-relaxed" dir="rtl">
        <!-- Report Header -->
        <div class="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 class="text-2xl font-extrabold font-cairo">تقرير تسوية عهدة مشروع</h1>
          <h2 class="text-lg font-bold text-slate-600 font-cairo mt-1">منصة أُسُس لإدارة المشاريع / Osos</h2>
        </div>

        <!-- Project & Custody details -->
        <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p><strong>اسم المشروع / Project Name:</strong> {{ project()?.name }}</p>
            <p><strong>صاحب العهدة (المهندس) / Engineer:</strong> {{ activePrintSettlement()!.issuedTo }}</p>
            <p><strong>سبب العهدة / Custody Reason:</strong> {{ activePrintSettlement()!.custodyReason }}</p>
          </div>
          <div class="text-left rtl:text-right">
            <p><strong>تاريخ التقديم / Submitted At:</strong> {{ activePrintSettlement()!.submittedAt | date:'dd/MM/yyyy HH:mm' }}</p>
            <p><strong>حالة التسوية / Status:</strong> {{ activePrintSettlement()!.status }}</p>
            <p><strong>رقم التسوية / ID:</strong> {{ activePrintSettlement()!.id }}</p>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-slate-100 p-4 rounded-xl mb-6 grid grid-cols-3 gap-4 text-center border border-slate-300">
          <div>
            <span class="text-xs text-slate-500 font-semibold block">قيمة العهدة المستلمة / Custody Amount</span>
            <span class="text-lg font-bold font-mono">{{ activePrintSettlement()!.custodyAmount | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-semibold block">المبلغ المصروف فعلياً / Spent Amount</span>
            <span class="text-lg font-bold font-mono text-amber-600">{{ activePrintSettlement()!.totalAmount | number:'1.2-2' }} EGP</span>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-semibold block">المبلغ المستحق (الفرق) / Net Difference</span>
            <span class="text-lg font-bold font-mono" [class.text-emerald-600]="activePrintSettlement()!.netDifference > 0" [class.text-rose-600]="activePrintSettlement()!.netDifference < 0">
              {{ activePrintSettlement()!.netDifference | number:'1.2-2' }} EGP
            </span>
          </div>
        </div>

        <!-- Itemized Line Items -->
        <div class="mb-6">
          <h3 class="text-base font-bold mb-3 font-cairo">تفاصيل البنود والمصاريف الفردية / Itemized Expenses</h3>
          <table class="w-full text-right border-collapse text-sm">
            <thead>
              <tr class="border-b-2 border-slate-300 text-slate-700 font-bold">
                <th class="py-2 px-2">التصنيف / Category</th>
                <th class="py-2 px-2">الوصف / Description</th>
                <th class="py-2 px-2 text-left rtl:text-right">المبلغ / Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              @for (line of activePrintSettlement()!.lines; track line.id) {
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
            <p><strong>المراجع / Approved By:</strong> {{ activePrintSettlement()!.resolvedBy || '—' }}</p>
            <p><strong>تاريخ الاعتماد / Resolved At:</strong> {{ activePrintSettlement()!.resolvedAt ? (activePrintSettlement()!.resolvedAt | date:'dd/MM/yyyy HH:mm') : '—' }}</p>
          </div>
          <div class="text-center p-3 border border-slate-300 rounded-xl bg-slate-50 min-w-[120px] text-slate-700 font-semibold font-mono">
            VERIFIED BY OSOS
          </div>
        </div>
      </div>
    }

    @if (profileSuccessMessage()) {
      <div class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-600 border border-emerald-500 text-white rounded-xl shadow-2xl font-cairo text-sm max-w-sm">
        <div class="p-1 bg-emerald-700 rounded-lg text-white shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span>{{ profileSuccessMessage() }}</span>
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

    <!-- 🖼️ FULLSCREEN LIGHTBOX VIEWER -->
    @if (isLightboxOpen() && lightboxPhotos().length > 0) {
      <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
        <div (click)="closeLightbox()" class="absolute inset-0 z-0"></div>

        <button 
          (click)="closeLightbox()" 
          class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-2xl">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2 font-cairo">
          <span>📷</span>
          <span>{{ activeLightboxIndex() + 1 }} / {{ lightboxPhotos().length }}</span>
        </div>

        <div class="relative z-10 max-w-5xl max-h-[85vh] flex items-center justify-center p-2">
          <img 
            [src]="lightboxPhotos()[activeLightboxIndex()]" 
            (error)="onImgError($event)" 
            alt="Site Photo Full View" 
            class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-200">
        </div>

        @if (lightboxPhotos().length > 1) {
          <button 
            (click)="prevLightboxPhoto()" 
            class="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
            <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            (click)="nextLightboxPhoto()" 
            class="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
            <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        }
      </div>
    }
  `
})
export class ProjectDetailsComponent implements OnInit {
  readonly activePrintSettlement = signal<SettlementMobileDto | null>(null);
  readonly activeTextInspection = signal<{ title: string; content: string; subtitle?: string } | null>(null);

  openTextInspectionModal(title: string, content: string, subtitle?: string): void {
    if (!content) return;
    this.activeTextInspection.set({ title, content, subtitle });
  }

  closeTextInspectionModal(): void {
    this.activeTextInspection.set(null);
  }

  openPettyCashReasonModal(item: PettyCashMobileDto): void {
    if (!item.reason) return;
    const dateStr = item.issuedAt ? new Date(item.issuedAt).toLocaleString('en-GB') : '';
    const subtitle = (item.issuedTo || 'Staff') + (dateStr ? ` • ${dateStr}` : '');
    this.openTextInspectionModal('البيان / السبب', item.reason, subtitle);
  }

  openTransactionInspectionModal(t: FinancialTransactionMobileDto): void {
    if (!t.description) return;
    const dateStr = t.transactionDate ? new Date(t.transactionDate).toLocaleString('en-GB') : '';
    this.openTextInspectionModal('تفاصيل المعاملة المالية', t.description, dateStr);
  }

  printSettlementReport(s: SettlementMobileDto): void {
    this.activePrintSettlement.set(s);
    setTimeout(() => {
      window.print();
    }, 100);
  }

  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly pettyCashService = inject(PettyCashService);
  private readonly financialService = inject(FinancialService);
  private readonly uploadService = inject(ImageUploadService);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmModalService);
  private readonly profileService = inject(TenantProfileService);
  private readonly settlementService = inject(SettlementService);
  private readonly offlineSync = inject(OfflineSyncService);
  private readonly whatsappLink = inject(WhatsAppLinkService);
  private readonly userService = inject(TenantUserService);
  private readonly projectCloseoutService = inject(ProjectCloseoutService);
  protected readonly langService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly reconciliationReport = signal<ProjectReconciliationReportDto | null>(null);
  readonly isCloseoutLoading = signal(false);
  readonly selectedDrilldown = signal<'unsettled' | 'refunds' | 'reimbursements' | null>(null);
  selectedReimbursementPool: { [key: string]: string } = {};
  selectedPettyCashPool: { [key: string]: string } = {};

  readonly unsettledCustodyList = computed(() =>
    this.pettyCashes().filter(pc => !pc.isSettled && !pc.isReimbursement)
  );

  readonly unsettledCustodySum = computed(() =>
    this.unsettledCustodyList().reduce((sum, item) => sum + item.amount, 0)
  );

  readonly pendingRefundsList = computed(() =>
    this.settlements().filter(s => s.status === 'ApprovedPendingRefund')
  );

  readonly pendingRefundsSum = computed(() =>
    this.pendingRefundsList().reduce((sum, item) => sum + item.netDifference, 0)
  );

  readonly pendingReimbursementsList = computed(() =>
    this.pettyCashes().filter(pc => pc.status === 'Pending' && pc.isReimbursement)
  );

  readonly pendingReimbursementsSum = computed(() =>
    this.pendingReimbursementsList().reduce((sum, item) => sum + item.amount, 0)
  );

  readonly isSettlementLocked = computed(() => {
    const pc = this.selectedPettyCashForSettlement();
    if (!pc) return false;
    const sett = this.settlements().find(s => s.pettyCashId === pc.id);
    return !!sett && sett.status !== 'Draft' && sett.status !== 'Rejected';
  });

  readonly isEditPettyCashModalOpen = signal(false);
  readonly isEditingPettyCash = signal(false);
  selectedPettyCashToEdit: PettyCashMobileDto | null = null;
  readonly editPettyCashForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    reason: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly isEditTransactionModalOpen = signal(false);
  readonly isSavingTransaction = signal(false);
  selectedTransactionToEdit: FinancialTransactionMobileDto | null = null;
  readonly editTransactionForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly isReviseBudgetModalOpen = signal(false);
  readonly isRevisingBudget = signal(false);
  readonly budgetHistory = signal<any[]>([]);
  readonly isUploadingBoq = signal(false);
  selectedBoqFile: File | null = null;
  readonly reviseBudgetForm: FormGroup = this.fb.group({
    newBudget: [null, [Validators.required, Validators.min(0.01)]],
    reasonForChange: ['', [Validators.required, Validators.minLength(5)]],
    boqFileUrl: ['']
  });

  // Direct Disbursement signals & form
  readonly isDisburseModalOpen = signal(false);
  readonly isDisbursing = signal(false);
  readonly disburseErrors = signal<string[]>([]);
  readonly usersList = signal<any[]>([]); // To populate engineer select in direct disbursement
  readonly disburseForm: FormGroup = this.fb.group({
    userId: [null],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    sourcePoolId: [null, Validators.required],
    paymentMethod: ['Cash', Validators.required]
  });

  // Settlement signals & FormArray form
  readonly isSettlementModalOpen = signal(false);
  readonly isSubmittingSettlement = signal(false);
  readonly settlementErrors = signal<string[]>([]);
  readonly selectedPettyCashForSettlement = signal<PettyCashMobileDto | null>(null);
  readonly settlements = signal<SettlementMobileDto[]>([]);
  readonly isLoadingSettlements = signal(false);
  readonly activePreviewPhotoUrl = signal<string | null>(null);

  readonly settlementForm: FormGroup = this.fb.group({
    lines: this.fb.array([])
  });

  get settlementLines(): FormArray {
    return this.settlementForm.get('lines') as FormArray;
  }

  addSettlementLine(): void {
    this.settlementLines.push(this.fb.group({
      category: ['Cement', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      invoiceUrl: [''],
      uploading: [false],
      localPreviewUrl: ['']
    }));
  }

  removeSettlementLine(index: number): void {
    this.settlementLines.removeAt(index);
  }

  calculateSettlementTotal(): number {
    return this.settlementLines.controls.reduce((sum, control) => sum + (control.get('amount')?.value || 0), 0);
  }


  readonly currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  readonly isTenantOwner = computed(() => ['tenantowner', 'admin'].includes(this.currentUserRole().toLowerCase()));
  readonly isAccountant = computed(() => this.currentUserRole().toLowerCase() === 'accountant');
  readonly isOwnerOrAccountant = computed(() => ['tenantowner', 'accountant', 'admin'].includes(this.currentUserRole().toLowerCase()));
  readonly isEngineer = computed(() => ['manager', 'siteengineer', 'designengineer'].includes(this.currentUserRole().toLowerCase()));

  readonly projectId = this.route.snapshot.paramMap.get('id') || '';
  readonly project = signal<ProjectDto | null>(null);

  readonly parsedClient = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).client || '';
      } catch (e) { }
    }
    return '';
  });

  readonly parsedBudget = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).budget || 0;
      } catch (e) { }
    }
    return 0;
  });

  readonly parsedDescription = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).description || '';
      } catch (e) { }
    }
    return desc || '';
  });

  readonly isPublicPortfolio = computed(() => {
    const proj = this.project();
    if (!proj) return false;
    if ((proj as any).isPublicPortfolio !== undefined) {
      return !!(proj as any).isPublicPortfolio;
    }
    if (proj.description && proj.description.startsWith('{')) {
      try {
        const parsed = JSON.parse(proj.description);
        return !!parsed.isPublicPortfolio || !!parsed.isPublic;
      } catch (e) { }
    }
    return false;
  });

  togglePublicVisibility(newValue: boolean): void {
    const currentProj = this.project();
    if (!currentProj) return;

    this.projectSettingsForm.patchValue({ isPublicPortfolio: newValue });
    this.onProjectSettingsSubmit();
  }

  readonly boqFileDetails = computed(() => {
    const proj = this.project();
    if (!proj) return { fileUrl: '', fileName: '' };
    if ((proj as any).boqFileUrl) {
      return {
        fileUrl: (proj as any).boqFileUrl,
        fileName: (proj as any).boqFileName || 'المقايسة_المرجعية_للمشروع.pdf'
      };
    }
    if (proj.description && proj.description.startsWith('{')) {
      try {
        const parsed = JSON.parse(proj.description);
        return {
          fileUrl: parsed.boqFileUrl || '',
          fileName: parsed.boqFileName || 'المقايسة_المرجعية_للمشروع.pdf'
        };
      } catch (e) { }
    }
    return { fileUrl: '', fileName: '' };
  });

  readonly isUploadingBOQ = signal(false);
  readonly boqUploadError = signal<string | null>(null);

  onBOQFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (file.size > 10 * 1024 * 1024) {
      this.boqUploadError.set('حجم الملف يتجاوز الحد الأقصى المسموح به (10 ميجابايت).');
      return;
    }

    this.boqUploadError.set(null);
    this.isUploadingBOQ.set(true);

    this.uploadService.uploadProjectGallery(this.projectId, file).subscribe({
      next: (res: any) => {
        this.isUploadingBOQ.set(false);
        const uploadedUrl = res.data?.url || (typeof res.data === 'string' ? res.data : null);
        if (res.success && uploadedUrl) {
          this.updateProjectBOQReference(uploadedUrl, file.name);
        } else {
          this.boqUploadError.set('فشل رفع ملف المقايسة. يرجى المحاولة مرة أخرى.');
        }
      },
      error: () => {
        this.isUploadingBOQ.set(false);
        this.boqUploadError.set('حدث خطأ أثناء رفع ملف المقايسة.');
      }
    });
  }

  updateProjectBOQReference(fileUrl: string, fileName: string): void {
    const proj = this.project();
    if (!proj) return;

    let payloadObj: any = {};
    if (proj.description && proj.description.startsWith('{')) {
      try {
        payloadObj = JSON.parse(proj.description);
      } catch (e) { }
    } else {
      payloadObj = { description: proj.description || '' };
    }

    payloadObj.boqFileUrl = fileUrl;
    payloadObj.boqFileName = fileName;

    const updateDto = {
      name: proj.name,
      description: JSON.stringify(payloadObj),
      status: proj.status
    };

    this.projectService.updateProject(this.projectId, updateDto as any).subscribe({
      next: (res) => {
        if (res.success) {
          this.fetchProjectDetails();
        }
      }
    });
  }

  openDatePicker(picker: HTMLInputElement): void {
    if (picker && typeof picker.showPicker === 'function') {
      picker.showPicker();
    } else if (picker) {
      picker.click();
    }
  }

  formatDisplayDate(rawVal: any): string {
    if (!rawVal) return '';
    if (typeof rawVal === 'string') {
      const trimmed = rawVal.trim();
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
        return trimmed;
      }
      if (trimmed.includes('-')) {
        const parts = trimmed.split('T')[0].split('-');
        if (parts.length === 3) {
          const [yyyy, mm, dd] = parts;
          return `${dd}/${mm}/${yyyy}`;
        }
      }
    }
    if (rawVal instanceof Date && !isNaN(rawVal.getTime())) {
      const dd = String(rawVal.getDate()).padStart(2, '0');
      const mm = String(rawVal.getMonth() + 1).padStart(2, '0');
      const yyyy = rawVal.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    return String(rawVal);
  }

  onNativeDatePicked(event: Event, fieldName: string, formGroup: FormGroup): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      formGroup.get(fieldName)?.setValue(input.value);
    }
  }

  onDateInputChanged(event: Event, fieldName: string, formGroup: FormGroup): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const val = input.value.trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
      const [dd, mm, yyyy] = val.split('/');
      const isoDate = `${yyyy}-${mm}-${dd}`;
      formGroup.get(fieldName)?.setValue(isoDate);
    } else if (val === '') {
      formGroup.get(fieldName)?.setValue('');
    }
  }

  // Lightbox Viewer State
  readonly lightboxPhotos = signal<string[]>([]);
  readonly activeLightboxIndex = signal<number>(0);
  readonly isLightboxOpen = signal<boolean>(false);

  openLightbox(photos: any[], startIndex: number = 0, event?: Event): void {
    if (event) event.stopPropagation();
    if (!photos || photos.length === 0) return;

    const urls = photos.map(p => typeof p === 'string' ? p : p.photoUrl).filter(Boolean);
    if (urls.length === 0) return;

    this.lightboxPhotos.set(urls);
    this.activeLightboxIndex.set(startIndex);
    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
    this.lightboxPhotos.set([]);
    this.activeLightboxIndex.set(0);
  }

  nextLightboxPhoto(): void {
    const photos = this.lightboxPhotos();
    if (photos.length === 0) return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() + 1) % photos.length);
  }

  prevLightboxPhoto(): void {
    const photos = this.lightboxPhotos();
    if (photos.length === 0) return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() - 1 + photos.length) % photos.length);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isLightboxOpen()) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowRight') {
        this.nextLightboxPhoto();
      } else if (event.key === 'ArrowLeft') {
        this.prevLightboxPhoto();
      }
    }
  }


  readonly pettyCashes = signal<PettyCashMobileDto[]>([]);
  readonly transactions = signal<FinancialTransactionMobileDto[]>([]);
  readonly cashPools = signal<ProjectCashPoolDto[]>([]);

  readonly isLoadingProject = signal(false);
  readonly isLoadingPettyCash = signal(false);
  readonly isLoadingTransactions = signal(false);

  readonly activeTab = signal<'petty-cash' | 'transactions' | 'gallery' | 'admin-settings' | 'settlements' | 'closeout'>('petty-cash');

  // Admin settings forms & signals
  readonly isUploadingLogo = signal(false);
  readonly isUploadingBanner = signal(false);
  readonly isSavingProfile = signal(false);
  readonly profileSuccessMessage = signal<string | null>(null);
  readonly isSavingProjectSettings = signal(false);

  readonly profileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    logoUrl: [''],
    bannerUrl: [''],
    region: [''],
    companyDescription: ['']
  });

  readonly projectSettingsForm: FormGroup = this.fb.group({
    isPublicPortfolio: [false]
  });


  // Gallery signals
  readonly galleryPhotos = signal<SitePhotoDto[]>([]);
  readonly isLoadingGallery = signal(false);
  readonly isUploadingGallery = signal(false);

  readonly isSettleModalOpen = signal(false);
  readonly isSettling = signal(false);
  readonly settleErrors = signal<string[]>([]);
  readonly activePettyCash = signal<PettyCashMobileDto | null>(null);
  readonly selectedSettleReceipt = signal<File | null>(null);

  readonly settleForm: FormGroup = this.fb.group({
    spentAmount: [null, [Validators.required, Validators.min(0.01)]],
    receiptDescription: ['', [Validators.required, Validators.minLength(5)]],
    settlementPaymentMethod: [null, Validators.required],
    expenseDate: [new Date().toISOString().substring(0, 10), Validators.required],
    receiptPhotoUrl: ['']
  });

  readonly isRequestModalOpen = signal(false);
  readonly isRequesting = signal(false);
  readonly requestErrors = signal<string[]>([]);

  readonly isInjectModalOpen = signal(false);
  readonly isInjecting = signal(false);
  readonly injectErrors = signal<string[]>([]);

  readonly requestForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    reason: ['', [Validators.required, Validators.minLength(5)]],
    sourcePoolId: [null]
  }, {
    validators: (group: any) => this.insufficientBalanceValidator(group as FormGroup)
  });

  insufficientBalanceValidator(formGroup: FormGroup) {
    const amountControl = formGroup.get('amount');
    const sourcePoolIdControl = formGroup.get('sourcePoolId');
    if (!amountControl) return null;

    const amount = amountControl.value;
    if (amount === null || amount === undefined) {
      this.clearInsufficientBalanceError(amountControl);
      return null;
    }

    const sourcePoolId = sourcePoolIdControl?.value;
    if (sourcePoolId) {
      const pool = this.cashPools().find(p => p.id === sourcePoolId);
      if (pool && amount > pool.availableBalance) {
        amountControl.setErrors({ ...amountControl.errors, insufficientBalance: true });
        return { insufficientBalance: true };
      }
    } else {
      const totalAvailable = this.cashPools().reduce((sum, p) => sum + p.availableBalance, 0);
      if (totalAvailable > 0 && amount > totalAvailable) {
        amountControl.setErrors({ ...amountControl.errors, insufficientBalance: true });
        return { insufficientBalance: true };
      }
    }

    this.clearInsufficientBalanceError(amountControl);
    return null;
  }

  private clearInsufficientBalanceError(control: any) {
    if (control.hasError('insufficientBalance')) {
      const errors = { ...control.errors };
      delete errors['insufficientBalance'];
      control.setErrors(Object.keys(errors).length ? errors : null);
    }
  }


  readonly injectForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    sourceType: [null, Validators.required],
    paymentDate: [new Date().toISOString().substring(0, 10), Validators.required],
    paymentMethod: [null, Validators.required],
    description: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly selectedInjectReceipt = signal<File | null>(null);

  onInjectReceiptSelected(event: any): void {
    const file = event.target.files?.[0];
    this.selectedInjectReceipt.set(file || null);
  }

  // Computed financial KPIs from transaction data
  readonly totalIncome = computed(() =>
    this.transactions()
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this.transactions()
      .filter(t => t.type === 'Expense' || t.type === 'DirectProjectExpense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly netBalance = computed(() => this.totalIncome() - this.totalExpenses());

  readonly totalUnsettledPettyCash = computed(() => {
    return this.pettyCashes()
      .filter(p => !p.isSettled)
      .reduce((sum, p) => {
        const sett = this.settlements().find(s => s.pettyCashId === p.id);
        const spent = sett ? sett.lines.reduce((sSum, l) => sSum + l.amount, 0) : 0;
        return sum + (p.amount - spent);
      }, 0);
  });

  readonly unsettledCount = computed(() =>
    this.pettyCashes().filter(p => !p.isSettled).length
  );

  ngOnInit(): void {
    if (this.projectId) {
      if (this.isEngineer()) {
        this.activeTab.set('petty-cash');
      } else if (this.isAccountant()) {
        this.activeTab.set('transactions');
      } else {
        this.activeTab.set('petty-cash');
      }

      this.fetchProjectDetails();
      this.fetchBudgetHistory();
      this.fetchPettyCash();
      this.fetchSettlements();
      if (!this.isEngineer()) {
        this.fetchTransactions();
        this.fetchCashPools();
      }
      this.fetchGalleryPhotos();
      if (this.isTenantOwner()) {
        this.fetchCompanyProfile();
      }
      if (this.isOwnerOrAccountant()) {
        this.fetchUsersList();
      }

      this.offlineSync.registerHandler('create-settlement', (payload: any) =>
        this.settlementService.createSettlement(this.projectId, payload)
      );
    }
  }

  fetchGalleryPhotos(): void {
    this.isLoadingGallery.set(true);
    this.uploadService.getProjectPhotos(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingGallery.set(false);
        if (response.success && response.data) {
          this.galleryPhotos.set(response.data.items);
        }
      },
      error: () => this.isLoadingGallery.set(false)
    });
  }

  onGalleryFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (this.galleryPhotos().length >= 5) {
        this.confirmService.alert({
          title: 'الحد الأقصى للصور / Max Photos Limit',
          message: 'لا يمكن رفع أكثر من 5 صور لكل مشروع. برجاء مسح بعض الصور القديمة أولاً. / A project can have a maximum of 5 site photos. Please delete old ones first.',
          type: 'info'
        });
        return;
      }
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً / File Size Too Large',
          message: 'حجم الملف كبير جداً! الحد الأقصى للملفات 5 ميجا. / The maximum file size is 5MB.',
          type: 'error'
        });
        return;
      }
      this.isUploadingGallery.set(true);
      this.uploadService.uploadProjectGallery(this.projectId, file).subscribe({
        next: (res) => {
          this.isUploadingGallery.set(false);
          if (res.success) {
            this.fetchGalleryPhotos();
          }
        },
        error: () => this.isUploadingGallery.set(false)
      });
    }
  }

  onDeletePhoto(photoId: string): void {
    this.confirmService.confirm({
      title: 'حذف الصورة / Delete Photo',
      message: 'هل أنت متأكد من حذف هذه الصورة؟ / Are you sure you want to delete this photo?',
      confirmText: 'نعم، احذف / Yes, Delete',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.uploadService.deleteProjectPhoto(this.projectId, photoId).subscribe({
          next: (res) => {
            if (res.success) {
              this.fetchGalleryPhotos();
            }
          }
        });
      }
    });
  }

  fetchCompanyProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const cleanUrl = (url: string) => {
            if (url && url.startsWith('PRESIGNED_SPLIT')) {
              const parts = url.split('|');
              return parts.length > 2 ? parts[2] : url;
            }
            return url;
          };
          this.profileForm.patchValue({
            name: res.data.name,
            logoUrl: cleanUrl(res.data.logoUrl),
            bannerUrl: cleanUrl(res.data.bannerUrl),
            region: res.data.region,
            companyDescription: res.data.companyDescription
          });
        }
      }
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) return;
    this.isSavingProfile.set(true);
    this.profileSuccessMessage.set(null);

    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        if (res.success) {
          this.profileSuccessMessage.set('تم حفظ بيانات الشركة بنجاح / Profile updated successfully');
          this.fetchCompanyProfile();
          setTimeout(() => this.profileSuccessMessage.set(null), 3000);
        }
      },
      error: () => this.isSavingProfile.set(false)
    });
  }

  onLogoFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'الحد الأقصى للصور 2 ميجابايت.',
          type: 'error'
        });
        return;
      }
      this.isUploadingLogo.set(true);
      this.uploadService.uploadTenantLogo(file).subscribe({
        next: (res) => {
          this.isUploadingLogo.set(false);
          if (res.success && res.data) {
            this.profileForm.patchValue({ logoUrl: res.data.url });
          }
        },
        error: () => this.isUploadingLogo.set(false)
      });
    }
  }

  onBannerFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'الحد الأقصى للصور 2 ميجابايت.',
          type: 'error'
        });
        return;
      }
      this.isUploadingBanner.set(true);
      this.uploadService.uploadTenantBanner(file).subscribe({
        next: (res) => {
          this.isUploadingBanner.set(false);
          if (res.success && res.data) {
            this.profileForm.patchValue({ bannerUrl: res.data.url });
          }
        },
        error: () => this.isUploadingBanner.set(false)
      });
    }
  }

  onProjectSettingsSubmit(): void {
    const isPublic = this.projectSettingsForm.value.isPublicPortfolio;
    this.isSavingProjectSettings.set(true);

    const currentProj = this.project();
    if (!currentProj) return;

    let client = '';
    let budget = 0;
    let status = 'Active';
    let category = 'Other';
    let description = currentProj.description;

    if (currentProj.description && currentProj.description.startsWith('{')) {
      try {
        const parsed = JSON.parse(currentProj.description);
        client = parsed.client || '';
        budget = parsed.budget || 0;
        status = parsed.status || 'Active';
        category = parsed.category || 'Other';
        description = parsed.description || '';
      } catch (e) { }
    }

    const legacyDescObj = {
      client,
      budget,
      status,
      category,
      isPublicPortfolio: isPublic,
      description
    };

    const dto = {
      name: currentProj.name,
      description: JSON.stringify(legacyDescObj),
      startDate: currentProj.startDate,
      endDate: currentProj.endDate,
      managerId: currentProj.managerId
    };

    this.projectService.updateProject(this.projectId, dto).subscribe({
      next: (res) => {
        this.isSavingProjectSettings.set(false);
        if (res.success) {
          this.fetchProjectDetails();
          this.confirmService.alert({
            title: 'تم التحديث / Updated',
            message: 'تم تحديث حالة عرض المشروع بنجاح. / Project visibility settings updated successfully.',
            type: 'success'
          });
        }
      },
      error: () => this.isSavingProjectSettings.set(false)
    });
  }

  fetchProjectDetails(): void {
    this.isLoadingProject.set(true);
    this.projectService.getProjectById(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingProject.set(false);
        if (response.success && response.data) {
          const proj = response.data;
          const user = this.authService.currentUser();
          this.project.set(proj);

          // Extract isPublicPortfolio to patch form
          let isPublicPortfolio = false;
          if (proj.description && proj.description.startsWith('{')) {
            try {
              const parsed = JSON.parse(proj.description);
              isPublicPortfolio = !!parsed.isPublicPortfolio || !!parsed.isPublic;
            } catch (e) { }
          }
          this.projectSettingsForm.patchValue({ isPublicPortfolio });

          // Silently load reconciliation report for Closed or Frozen projects
          if (proj.status === 'Closed' || proj.status === 'FinancialFreeze') {
            this.projectCloseoutService.getReconciliationReport(this.projectId).subscribe({
              next: (res) => {
                if (res.success && res.data) {
                  this.reconciliationReport.set(res.data);
                }
              }
            });
          }
        }
      },
      error: () => this.isLoadingProject.set(false)
    });
  }


  fetchPettyCash(): void {
    this.isLoadingPettyCash.set(true);
    this.pettyCashService.getProjectPettyCash(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingPettyCash.set(false);
        if (response.success && response.data) {
          this.pettyCashes.set(response.data.items);
        }
      },
      error: () => this.isLoadingPettyCash.set(false)
    });
  }

  fetchCashPools(): void {
    this.financialService.getCashPools(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.cashPools.set(response.data);
        }
      }
    });
  }

  fetchTransactions(): void {
    this.isLoadingTransactions.set(true);
    this.financialService.getProjectTransactions(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingTransactions.set(false);
        if (response.success && response.data) {
          this.transactions.set(response.data.items);
          this.cdr.detectChanges();
        }
      },
      error: () => {
        this.isLoadingTransactions.set(false);
        this.cdr.detectChanges();
      }
    });
  }

  isSettleFieldInvalid(fieldName: string): boolean {
    const field = this.settleForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openSettleModal(item: PettyCashMobileDto): void {
    this.activePettyCash.set(item);
    this.settleErrors.set([]);
    this.selectedSettleReceipt.set(null);
    this.settleForm.reset({
      spentAmount: item.amount,
      receiptDescription: '',
      settlementPaymentMethod: null,
      expenseDate: new Date().toISOString().substring(0, 10),
      receiptPhotoUrl: ''
    });

    // Dynamically set max validator based on issued amount
    this.settleForm.get('spentAmount')?.setValidators([
      Validators.required,
      Validators.min(0.01),
      Validators.max(item.amount)
    ]);
    this.settleForm.get('spentAmount')?.updateValueAndValidity();

    this.isSettleModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeSettleModal(): void {
    this.isSettleModalOpen.set(false);
    this.activePettyCash.set(null);
    this.settleErrors.set([]);
    this.selectedSettleReceipt.set(null);
    this.confirmService.toggleBodyScroll(false);
  }

  async onSettleSubmit(): Promise<void> {
    if (this.settleForm.invalid || !this.activePettyCash()) {
      this.settleForm.markAllAsTouched();
      return;
    }

    this.isSettling.set(true);
    this.settleErrors.set([]);

    const formVal = this.settleForm.value;
    let receiptPhotoUrl = formVal.receiptPhotoUrl || '';

    const fileToUpload = this.selectedSettleReceipt();
    if (fileToUpload) {
      if (fileToUpload.size > 5 * 1024 * 1024) {
        this.isSettling.set(false);
        this.settleErrors.set(['حجم الملف كبير جداً! الحد الأقصى لإيصال الفاتورة 5 ميجا.']);
        return;
      }

      this.isUploadingSettleReceipt.set(true);
      try {
        const uploadResult = await firstValueFrom(this.uploadService.uploadProjectGallery(this.projectId, fileToUpload));
        if (uploadResult.success && uploadResult.data) {
          receiptPhotoUrl = uploadResult.data.url;
          this.settleForm.patchValue({ receiptPhotoUrl });
        } else {
          this.isUploadingSettleReceipt.set(false);
          this.isSettling.set(false);
          this.settleErrors.set([uploadResult.message || 'Failed to upload receipt image.']);
          return;
        }
      } catch (err: any) {
        this.isUploadingSettleReceipt.set(false);
        this.isSettling.set(false);
        this.settleErrors.set([err.error?.message || err.message || 'Failed to upload receipt image.']);
        return;
      }
      this.isUploadingSettleReceipt.set(false);
    }

    const dto: PettyCashSettleDto = {
      spentAmount: formVal.spentAmount,
      receiptDescription: formVal.receiptDescription,
      settlementPaymentMethod: formVal.settlementPaymentMethod,
      expenseDate: new Date(formVal.expenseDate),
      receiptPhotoUrl
    };

    const pettyCashId = this.activePettyCash()!.id;

    try {
      const response = await firstValueFrom(
        this.pettyCashService.settlePettyCash(this.projectId, pettyCashId, dto)
      );
      this.isSettling.set(false);
      if (response.success) {
        this.closeSettleModal();
        this.fetchPettyCash();
        this.fetchTransactions();
      } else {
        this.settleErrors.set(response.errors || [response.message || 'Failed to settle request.']);
      }
    } catch (err: any) {
      this.isSettling.set(false);
      const errors = err.error?.errors || [err.error?.message || err.message || 'Error occurred.'];
      this.settleErrors.set(Array.isArray(errors) ? errors : [errors]);
    }
  }

  isRequestFieldInvalid(fieldName: string): boolean {
    const field = this.requestForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openRequestModal(): void {
    if (this.project()?.status === 'Closed') return;
    this.requestErrors.set([]);
    this.requestForm.reset({
      amount: null,
      reason: '',
      sourcePoolId: null
    });

    if (this.isTenantOwner()) {
      this.requestForm.get('sourcePoolId')?.setValidators(Validators.required);
    } else {
      this.requestForm.get('sourcePoolId')?.clearValidators();
    }
    this.requestForm.get('sourcePoolId')?.updateValueAndValidity();

    this.isRequestModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
    this.requestErrors.set([]);
    this.confirmService.toggleBodyScroll(false);
  }

  async onRequestSubmit(): Promise<void> {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isRequesting.set(true);
    this.requestErrors.set([]);

    const formVal = this.requestForm.value;
    const user = this.authService.currentUser();
    if (!user) return;

    const dto = {
      issuedToUserId: user.userId,
      amount: formVal.amount,
      reason: formVal.reason,
      category: 'Other',
      sourcePoolId: formVal.sourcePoolId
    };

    try {
      const response = await firstValueFrom(
        this.pettyCashService.requestPettyCash(this.projectId, dto)
      );
      this.isRequesting.set(false);
      if (response.success) {
        this.closeRequestModal();
        this.fetchPettyCash();
      } else {
        this.requestErrors.set(response.errors || [response.message || 'Failed to request petty cash.']);
      }
    } catch (err: any) {
      this.isRequesting.set(false);
      const errors = err.error?.errors || [err.error?.message || err.message || 'Error occurred.'];
      this.requestErrors.set(Array.isArray(errors) ? errors : [errors]);
    }
  }

  openInjectModal(): void {
    this.injectErrors.set([]);
    this.injectForm.reset({
      amount: null,
      sourceType: null,
      description: ''
    });
    this.isInjectModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeInjectModal(): void {
    this.isInjectModalOpen.set(false);
    this.injectForm.reset();
    this.confirmService.toggleBodyScroll(false);
  }

  async submitCapitalInjection(): Promise<void> {
    if (this.injectForm.invalid) return;

    this.isInjecting.set(true);
    this.injectErrors.set([]);

    let receiptUrl: string | null = null;
    const fileToUpload = this.selectedInjectReceipt();
    if (fileToUpload) {
      try {
        const res = await firstValueFrom(this.uploadService.uploadProjectGallery(this.projectId, fileToUpload));
        if (res.success && res.data) {
          receiptUrl = res.data.url;
        }
      } catch (err) {
        this.injectErrors.set(['Failed to upload receipt image.']);
        this.isInjecting.set(false);
        return;
      }
    }

    const formVal = this.injectForm.value;
    const dto = {
      amount: formVal.amount,
      sourceType: formVal.sourceType,
      description: formVal.description,
      paymentDate: new Date(formVal.paymentDate).toISOString(),
      paymentMethod: formVal.paymentMethod,
      receiptPhotoUrl: receiptUrl
    };

    this.financialService.injectCapital(this.projectId, dto).subscribe({
      next: (response) => {
        if (response.success) {
          this.closeInjectModal();
          this.fetchCashPools();
          this.fetchTransactions();
        } else {
          this.injectErrors.set([response.message || 'Failed to inject capital']);
        }
      },
      error: (err) => {
        this.injectErrors.set(err.error?.errors || [err.error?.message || 'An unexpected error occurred.']);
        this.isInjecting.set(false);
      },
      complete: () => {
        this.isInjecting.set(false);
      }
    });
  }

  getPoolSourceTranslationKey(sourceType: string): string {
    switch (sourceType) {
      case 'ClientDeposit': return 'CLIENT_DEPOSIT';
      case 'OwnerCapital':
      case 'OwnerLoan':
      case 'OwnerInjection': return 'OWNER_CAPITAL';
      case 'ExternalLoan': return 'EXTERNAL_LOAN';
      default: return sourceType ? sourceType.toUpperCase() : '';
    }
  }

  getPoolSourceLabel(sourceType: string, detailed: boolean = false): string {
    if (!sourceType) return '';
    switch (sourceType) {
      case 'ClientDeposit':
        return detailed ? 'دفعة من العميل (إيراد مشروع)' : 'دفعة من العميل';
      case 'OwnerCapital':
      case 'OwnerLoan':
      case 'OwnerInjection':
        return detailed ? 'تمويل شخصي من المالك (جاري المالك - يسترد لاحقاً)' : 'تمويل شخصي من المالك';
      case 'ExternalLoan':
      case 'Loan':
        return 'تمويل إضافي';
      default:
        return sourceType;
    }
  }

  readonly isUploadingSettleReceipt = signal(false);
  readonly isDeletingTransaction = signal(false);
  readonly isDeletingPettyCash = signal(false);

  onSettleReceiptSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedSettleReceipt.set(input.files[0]);
    }
  }

  /** Delete a financial transaction — only reachable if isOwnerOrAccountant(). Rolls back pool on API side. */
  async onDeleteTransaction(id: string): Promise<void> {
    const isConfirmed = await this.confirmService.confirm({
      title: 'حذف الحركة المالية',
      message: 'هل أنت متأكد من حذف هذه الحركة؟ في حال كانت زيادة رأس مال، فسيتم إرجاع رصيد المحفظة تلقائياً.',
      confirmText: 'نعم، احذف',
      cancelText: 'إلغاء'
    });
    if (!isConfirmed) return;

    this.isDeletingTransaction.set(true);
    this.financialService.deleteTransaction(this.projectId, id).subscribe({
      next: () => {
        this.isDeletingTransaction.set(false);
        this.fetchTransactions();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isDeletingTransaction.set(false);
        this.confirmService.alert({
          title: 'خطأ في العملية',
          message: err?.error?.message || 'فشلت عملية الحذف.',
          type: 'error'
        });
      }
    });
  }

  /** Delete a petty cash voucher — only reachable if isOwnerOrAccountant(). Refunds pool on API side if Issued. */
  async onDeletePettyCash(id: string, isSettled: boolean): Promise<void> {
    const warning = isSettled
      ? 'هل أنت متأكد من حذف هذه العهدة المسواة؟ سيتم إزالتها نهائياً.'
      : 'هل أنت متأكد من الحذف؟ سيتم إرجاع الرصيد المستقطع إلى محفظة تمويل المشروع تلقائياً.';

    const isConfirmed = await this.confirmService.confirm({
      title: 'حذف العهدة النقدية',
      message: warning,
      confirmText: 'نعم، احذف',
      cancelText: 'إلغاء'
    });
    if (!isConfirmed) return;

    this.isDeletingPettyCash.set(true);
    this.pettyCashService.deletePettyCash(this.projectId, id).subscribe({
      next: () => {
        this.isDeletingPettyCash.set(false);
        this.fetchPettyCash();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isDeletingPettyCash.set(false);
        this.confirmService.alert({
          title: 'خطأ في العملية',
          message: err?.error?.message || 'فشلت عملية الحذف.',
          type: 'error'
        });
      }
    });
  }

  // ── Edit Petty Cash Modal Actions ──
  openEditPettyCashModal(item: PettyCashMobileDto): void {
    this.selectedPettyCashToEdit = item;
    this.editPettyCashForm.reset({
      amount: item.amount,
      category: item.category || 'Other',
      reason: item.reason
    });
    this.isEditPettyCashModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeEditPettyCashModal(): void {
    this.isEditPettyCashModalOpen.set(false);
    this.selectedPettyCashToEdit = null;
    this.confirmService.toggleBodyScroll(false);
  }

  submitEditPettyCash(): void {
    if (this.editPettyCashForm.invalid || !this.selectedPettyCashToEdit) return;
    this.isEditingPettyCash.set(true);
    const formVal = this.editPettyCashForm.value;

    this.pettyCashService.updatePettyCash(this.projectId, this.selectedPettyCashToEdit.id, formVal).subscribe({
      next: () => {
        this.isEditingPettyCash.set(false);
        this.closeEditPettyCashModal();
        this.fetchPettyCash();
      },
      error: (err) => {
        this.isEditingPettyCash.set(false);
        this.confirmService.alert({
          title: 'فشل التعديل',
          message: err?.error?.message || 'تعذر تعديل العهدة النقدية.',
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

    this.financialService.updateTransaction(this.projectId, this.selectedTransactionToEdit.id, formVal).subscribe({
      next: () => {
        this.isSavingTransaction.set(false);
        this.closeEditTransactionModal();
        this.fetchTransactions();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isSavingTransaction.set(false);
        this.confirmService.alert({
          title: 'فشل التعديل',
          message: err?.error?.message || 'تعذر تعديل الحركة المالية.',
          type: 'error'
        });
      }
    });
  }

  // ── Revise Budget Modal Actions ──
  openReviseBudgetModal(): void {
    this.reviseBudgetForm.reset({
      newBudget: this.parsedBudget(),
      reasonForChange: '',
      boqFileUrl: ''
    });
    this.selectedBoqFile = null;
    this.isReviseBudgetModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeReviseBudgetModal(): void {
    this.isReviseBudgetModalOpen.set(false);
    this.selectedBoqFile = null;
    this.confirmService.toggleBodyScroll(false);
  }

  onBoqFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const maxSize = isImage ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'حجم الملف كبير جداً! الحد الأقصى للصور 2 ميجا وللمقايسات 5 ميجا.',
          type: 'error'
        });
        event.target.value = '';
        return;
      }
      this.selectedBoqFile = file;
    }
  }

  submitReviseBudget(): void {
    if (this.reviseBudgetForm.invalid) return;
    this.isRevisingBudget.set(true);

    const proceed = (boqUrl: string) => {
      const formVal = this.reviseBudgetForm.value;
      const dto = {
        newBudget: formVal.newBudget,
        reasonForChange: formVal.reasonForChange,
        boqFileUrl: boqUrl
      };

      this.projectService.reviseBudget(this.projectId, dto).subscribe({
        next: () => {
          this.isRevisingBudget.set(false);
          this.closeReviseBudgetModal();
          this.fetchProjectDetails();
          this.fetchBudgetHistory();
        },
        error: (err) => {
          this.isRevisingBudget.set(false);
          this.confirmService.alert({
            title: 'فشل تعديل الميزانية',
            message: err?.error?.message || 'تعذر تعديل ميزانية المشروع.',
            type: 'error'
          });
        }
      });
    };

    if (this.selectedBoqFile) {
      this.isUploadingBoq.set(true);
      this.uploadService.uploadProjectDocument(this.projectId, this.selectedBoqFile!).subscribe({
        next: (res) => {
          this.isUploadingBoq.set(false);
          if (res.success && res.data) {
            proceed(res.data.url);
          } else {
            this.isRevisingBudget.set(false);
            this.confirmService.alert({
              title: 'فشل رفع الملف',
              message: 'فشل رفع ملف BOQ.',
              type: 'error'
            });
          }
        },
        error: () => {
          this.isUploadingBoq.set(false);
          this.isRevisingBudget.set(false);
          this.confirmService.alert({
            title: 'خطأ في الرفع',
            message: 'حدث خطأ أثناء رفع ملف BOQ.',
            type: 'error'
          });
        }
      });
    } else {
      proceed('');
    }
  }

  fetchBudgetHistory(): void {
    this.projectService.getProjectBudgetHistory(this.projectId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.budgetHistory.set(res.data);
        }
      }
    });
  }

  fetchUsersList(): void {
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.usersList.set(res.data.filter(u => ['manager', 'siteengineer', 'designengineer'].includes(u.role.toLowerCase())));
        }
      }
    });
  }

  fetchSettlements(): void {
    this.isLoadingSettlements.set(true);
    this.settlementService.getSettlements(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoadingSettlements.set(false);
        if (res.success && res.data) {
          this.settlements.set(res.data);
        }
      },
      error: () => this.isLoadingSettlements.set(false)
    });
  }

  openDisburseModal(): void {
    if (this.project()?.status === 'Closed') return;
    this.disburseForm.reset({
      userId: null,
      amount: null,
      description: '',
      sourcePoolId: null,
      paymentMethod: 'Cash'
    });
    this.disburseErrors.set([]);
    this.isDisburseModalOpen.set(true);
  }

  closeDisburseModal(): void {
    this.isDisburseModalOpen.set(false);
  }

  onDisburseSubmit(): void {
    if (this.disburseForm.invalid) return;
    this.isDisbursing.set(true);
    this.disburseErrors.set([]);

    this.financialService.directDisbursement(this.projectId, this.disburseForm.value).subscribe({
      next: (res) => {
        this.isDisbursing.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: 'تم التحويل بنجاح',
            message: 'تم تعزيز العهدة وصرفها بنجاح وتحديث الأرصدة.',
            type: 'success'
          });
          this.closeDisburseModal();
          this.fetchCashPools();
          this.fetchPettyCash();
          this.fetchTransactions();
        } else {
          this.disburseErrors.set([res.message || 'فشل التحويل المباشر.']);
        }
      },
      error: (err) => {
        this.isDisbursing.set(false);
        this.disburseErrors.set([err.error?.message || err.message || 'حدث خطأ أثناء الاتصال بالخادم.']);
      }
    });
  }

  openSettlementModal(pettyCash: PettyCashMobileDto): void {
    this.selectedPettyCashForSettlement.set(pettyCash);
    this.settlementErrors.set([]);
    this.settlementLines.clear();

    const existing = this.settlements().find(s => s.pettyCashId === pettyCash.id);
    const isLocked = existing && existing.status !== 'Draft' && existing.status !== 'Rejected';

    if (existing && existing.lines && existing.lines.length > 0) {
      existing.lines.forEach(line => {
        this.settlementLines.push(this.fb.group({
          category: [{ value: line.category, disabled: isLocked }, Validators.required],
          amount: [{ value: line.amount, disabled: isLocked }, [Validators.required, Validators.min(0.01)]],
          description: [{ value: line.description, disabled: isLocked }, Validators.required],
          invoiceUrl: [line.invoiceUrl],
          uploading: [false],
          localPreviewUrl: [line.invoiceUrl || '']
        }));
      });
    } else {
      this.addSettlementLine();
    }
    this.isSettlementModalOpen.set(true);
  }

  closeSettlementModal(): void {
    this.isSettlementModalOpen.set(false);
    this.selectedPettyCashForSettlement.set(null);
  }

  onSettlementLineFileSelected(event: any, index: number): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً / File Size Too Large',
          message: 'حجم الملف كبير جداً! الحد الأقصى للملفات 5 ميجا. / The maximum file size is 5MB.',
          type: 'error'
        });
        return;
      }
      const localUrl = URL.createObjectURL(file);
      const lineGroup = this.settlementLines.at(index);
      lineGroup.patchValue({ localPreviewUrl: localUrl, uploading: true });
      this.uploadService.uploadProjectDocument(this.projectId, file).subscribe({
        next: (res) => {
          lineGroup.patchValue({ uploading: false });
          URL.revokeObjectURL(localUrl);
          if (res.success && res.data) {
            lineGroup.patchValue({ invoiceUrl: res.data.url, localPreviewUrl: res.data.url });
          } else {
            this.confirmService.alert({ title: 'فشل الرفع', message: 'فشل رفع إيصال الفاتورة.', type: 'error' });
          }
        },
        error: () => {
          lineGroup.patchValue({ uploading: false });
          URL.revokeObjectURL(localUrl);
          this.confirmService.alert({ title: 'خطأ في الرفع', message: 'حدث خطأ أثناء رفع إيصال الفاتورة.', type: 'error' });
        }
      });
    }
  }

  onSettlementSubmit(isDraft: boolean): void {
    if (this.settlementForm.invalid) return;
    const pettyCash = this.selectedPettyCashForSettlement();
    if (!pettyCash) return;

    this.isSubmittingSettlement.set(true);
    this.settlementErrors.set([]);

    const payload = {
      pettyCashId: pettyCash.id,
      lines: this.settlementLines.value.map((l: any) => ({
        category: l.category,
        amount: l.amount,
        description: l.description,
        invoiceUrl: l.invoiceUrl
      })),
      isDraft: isDraft
    };

    // Integrate Offline sync submission
    this.offlineSync.submit(
      'create-settlement',
      payload,
      (p) => this.settlementService.createSettlement(this.projectId, p)
    ).subscribe({
      next: (res) => {
        this.isSubmittingSettlement.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: isDraft ? 'تم حفظ المسودة' : 'تم تقديم التسوية للمراجعة',
            message: res.message || (isDraft ? 'تم حفظ مسودة التسوية بنجاح.' : 'تم تقديم طلب تسوية العهدة بنجاح للمراجعة النهائية.'),
            type: 'success'
          });
          if (!isDraft) {
            this.closeSettlementModal();
          }
          this.fetchPettyCash();
          this.fetchSettlements();
        } else {
          this.settlementErrors.set([res.message || 'فشل عملية التسوية.']);
        }
      },
      error: (err) => {
        this.isSubmittingSettlement.set(false);
        this.settlementErrors.set([err.error?.message || err.message || 'حدث خطأ أثناء الاتصال بالخادم.']);
      }
    });
  }

  onApproveSettlement(id: string): void {
    this.confirmService.confirm({
      title: 'اعتماد التسوية / Approve Settlement',
      message: 'هل أنت متأكد من اعتماد طلب تسوية هذه العهدة؟ / Are you sure you want to approve this settlement?',
      confirmText: 'نعم، اعتمد / Yes, Approve',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.settlementService.approveSettlement(this.projectId, id).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الاعتماد بنجاح',
                message: res.message || 'تم اعتماد التسوية بنجاح.',
                type: 'success'
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: 'فشل الاعتماد', message: res.message || 'فشل اعتماد التسوية.', type: 'error' });
            }
          }
        });
      }
    });
  }

  onConfirmRefund(id: string): void {
    this.confirmService.confirm({
      title: 'تأكيد استرجاع النقود / Confirm Refund',
      message: 'هل تؤكد استلام المبلغ المرتجع نقداً من المهندس وإيداعه بالخزينة؟ / Do you confirm receiving the cash refund from the engineer?',
      confirmText: 'نعم، استلمت / Yes, Confirmed',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.settlementService.confirmRefund(this.projectId, id).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: 'تم التأكيد وإيداع المبلغ',
                message: 'تم استلام النقود بنجاح وإعادة شحن الخزينة/الصندوق.',
                type: 'success'
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: 'فشل التأكيد', message: res.message || 'فشل تأكيد استلام النقود.', type: 'error' });
            }
          }
        });
      }
    });
  }

  onRejectSettlement(id: string): void {
    this.confirmService.confirm({
      title: 'رفض التسوية / Reject Settlement',
      message: 'هل تريد رفض تسوية هذه العهدة؟ برجاء كتابة سبب الرفض أدناه: / Write reason for rejection:',
      confirmText: 'رفض / Reject',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        // Prompt for reject reason
        const comments = prompt('سبب الرفض / Rejection Comments:');
        if (comments === null) return;
        if (!comments.trim()) {
          alert('يجب كتابة سبب الرفض / Rejection comments are required.');
          return;
        }

        this.settlementService.rejectSettlement(this.projectId, id, comments).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الرفض',
                message: 'تم رفض طلب تسوية العهدة بنجاح وإعادتها للمهندس.',
                type: 'success'
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: 'فشل الرفض', message: res.message || 'فشل رفض التسوية.', type: 'error' });
            }
          }
        });
      }
    });
  }

  onApproveReimbursement(item: PettyCashMobileDto, poolId: string): void {
    if (!poolId) {
      this.confirmService.alert({
        title: 'اختر محفظة التمويل',
        message: 'يرجى اختيار محفظة التمويل أولاً لصرف التعويض.',
        type: 'info'
      });
      return;
    }

    this.confirmService.confirm({
      title: 'صرف تعويض المصاريف / Approve Reimbursement',
      message: `هل تؤكد صرف مبلغ التعويض بقيمة ${item.amount} EGP للموظف ${item.issuedTo} من محفظة التمويل المحددة؟`,
      confirmText: 'تأكيد الصرف / Yes, Disburse',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.pettyCashService.approvePettyCash(this.projectId, item.id, { sourcePoolId: poolId }).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الصرف والتسوية',
                message: 'تمت الموافقة على طلب التعويض وصرفه بنجاح من محفظة المشروع وتحديث رصيد الموظف.',
                type: 'success'
              });
              this.fetchPettyCash();
              this.fetchSettlements();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: 'فشل صرف التعويض',
                message: res.message || 'حدث خطأ أثناء صرف التعويض.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية صرف التعويض.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onApprovePettyCashRequest(item: PettyCashMobileDto, poolId: string): void {
    if (!poolId) {
      this.confirmService.alert({
        title: 'اختر محفظة التمويل',
        message: 'يرجى اختيار محفظة التمويل أولاً لاعتماد وصرف العهدة.',
        type: 'info'
      });
      return;
    }

    this.confirmService.confirm({
      title: 'اعتماد وصرف العهدة / Approve & Disburse',
      message: `هل تؤكد اعتماد وصرف مبلغ العهدة بقيمة ${item.amount} EGP للموظف ${item.issuedTo} من محفظة التمويل المحددة؟`,
      confirmText: 'تأكيد الصرف / Yes, Disburse',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isLoadingPettyCash.set(true);
        this.pettyCashService.approvePettyCash(this.projectId, item.id, { sourcePoolId: poolId }).subscribe({
          next: (res) => {
            this.isLoadingPettyCash.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الاعتماد والصرف',
                message: 'تمت الموافقة على طلب العهدة وصرفها بنجاح وتحديث أرصدة المشروع.',
                type: 'success'
              });
              this.fetchPettyCash();
              this.fetchSettlements();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: 'فشل الاعتماد والصرف',
                message: res.message || 'حدث خطأ أثناء اعتماد العهدة.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isLoadingPettyCash.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية اعتماد العهدة.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onRejectPettyCashRequest(item: PettyCashMobileDto): void {
    this.confirmService.confirm({
      title: 'رفض طلب العهدة / Reject Petty Cash',
      message: `هل أنت متأكد من رفض طلب العهدة للموظف ${item.issuedTo} بقيمة ${item.amount} EGP؟ يرجى كتابة سبب الرفض أدناه:`,
      confirmText: 'نعم، ارفض / Yes, Reject',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        const comments = prompt('سبب الرفض / Rejection Comments:');
        if (comments === null) return;
        if (!comments.trim()) {
          alert('يجب كتابة سبب الرفض / Rejection comments are required.');
          return;
        }

        this.isLoadingPettyCash.set(true);
        this.pettyCashService.rejectPettyCash(this.projectId, item.id, comments).subscribe({
          next: (res) => {
            this.isLoadingPettyCash.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الرفض بنجاح',
                message: 'تم رفض طلب العهدة بنجاح وإرسال التنبيه للموظف.',
                type: 'success'
              });
              this.fetchPettyCash();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: 'فشل رفض العهدة',
                message: res.message || 'حدث خطأ أثناء رفض العهدة.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isLoadingPettyCash.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية رفض العهدة.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onWhatsAppAlert(pettyCash: PettyCashMobileDto, customMessage?: string): void {
    const defaultMsg = `مرحباً ${pettyCash.issuedTo}، تم اعتماد وتحديث طلب العهدة الخاص بك بقيمة ${pettyCash.amount} EGP لـ ${pettyCash.projectName} - ${pettyCash.reason}.`;
    const message = customMessage || defaultMsg;
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const userObj = res.data.find(u => `${u.firstName} ${u.lastName}`.trim() === pettyCash.issuedTo.trim());
          const phone = userObj?.whatsAppPhone || userObj?.personalPhone;
          if (phone) {
            this.whatsappLink.openChat(phone, message);
          } else {
            this.confirmService.alert({
              title: 'تنبيه واتساب',
              message: 'لم يتم العثور على رقم واتساب مسجل لهذا المستخدم لإرسال التنبيه.',
              type: 'info'
            });
          }
        }
      }
    });
  }

  // --- Closeout & Reconciliation Operations ---

  onFreezeProject(): void {
    this.confirmService.confirm({
      title: 'تجميد العمليات المالية للمشروع / Freeze Financial Operations',
      message: 'هل أنت متأكد من تجميد جميع المعاملات المالية وطلبات العهد لهذا المشروع؟ لا يمكن التراجع عن هذه الخطوة إلا بطلب رسمي.',
      confirmText: 'نعم، قم بالتجميد / Yes, Freeze',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.projectCloseoutService.freezeProject(this.projectId).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم التجميد المالي',
                message: 'تم تجميد العمليات المالية للمشروع وتوليد رابط تقييم العميل بنجاح.',
                type: 'success'
              });
              // Refresh project details to update status
              this.fetchProjectDetails();
            } else {
              this.confirmService.alert({
                title: 'فشل التجميد المالي',
                message: res.message || 'حدث خطأ غير متوقع أثناء تجميد العمليات.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية تجميد المشروع.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onRunReconciliation(): void {
    this.isCloseoutLoading.set(true);
    this.projectCloseoutService.getReconciliationReport(this.projectId).subscribe({
      next: (res) => {
        this.isCloseoutLoading.set(false);
        if (res.success && res.data) {
          this.reconciliationReport.set(res.data);
        } else {
          this.confirmService.alert({
            title: 'فشل التدقيق',
            message: res.message || 'لم نتمكن من الحصول على تقرير مطابقة الأرصدة.',
            type: 'error'
          });
        }
      },
      error: (err) => {
        this.isCloseoutLoading.set(false);
        this.confirmService.alert({
          title: 'خطأ في التدقيق',
          message: err.error?.message || err.message || 'حدث خطأ أثناء تشغيل محرك التسوية الأوتوماتيكي.',
          type: 'error'
        });
      }
    });
  }

  onFinalCloseout(): void {
    this.confirmService.confirm({
      title: 'الإغلاق النهائي والمطابقة / Final Project Closeout',
      message: 'تحذير: سيتم إغلاق هذا المشروع نهائياً وتجميد جميع حساباته ولا يمكن تعديل أو تصفية أي عهد بعد ذلك. هل ترغب في المتابعة؟',
      confirmText: 'نعم، إغلاق نهائي / Yes, Close Out',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.projectCloseoutService.finalCloseout(this.projectId).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الإغلاق بنجاح',
                message: 'تم إغلاق المشروع نهائياً وحفظ الأرشيف والبيانات المالية بنجاح.',
                type: 'success'
              });
              this.fetchProjectDetails();
            } else {
              this.confirmService.alert({
                title: 'فشل الإغلاق النهائي',
                message: res.message || 'يرجى مراجعة كافة المعاملات والأرصدة المعلقة أولاً.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: 'خطأ في الإغلاق',
              message: err.error?.message || err.message || 'فشلت عملية الإغلاق النهائي.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  getPublicReviewUrl(): string {
    const proj = this.project();
    if (!proj || !proj.publicReviewToken) return '';
    return `${window.location.origin}/public/project-review/${proj.publicReviewToken}`;
  }

  copyReviewLink(): void {
    const url = this.getPublicReviewUrl();
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      this.confirmService.alert({
        title: 'تم النسخ',
        message: 'تم نسخ رابط تقييم العميل إلى الحافظة بنجاح.',
        type: 'success'
      });
    });
  }

  getWhatsAppShareUrl(): string {
    const proj = this.project();
    if (!proj) return '#';
    const url = this.getPublicReviewUrl();
    if (!url) return '#';

    // Clean and normalize phone number
    let phone = proj.clientWhatsApp || '';
    phone = phone.replace(/\D/g, ''); // Strip non-digits

    if (phone.startsWith('01') && phone.length === 11) {
      phone = '2' + phone; // Prefix '2' to Egyptian numbers (010... -> 2010...)
    } else if (phone.startsWith('1') && phone.length === 10) {
      phone = '20' + phone; // Prefix '20' (10... -> 2010...)
    } else if (phone.startsWith('0') && phone.length > 9) {
      phone = '2' + phone.substring(1); // Standard prefixing fallback for other formats
    }

    const message = `مرحباً ${proj.clientName || 'العميل الكريم'}، يرجى التكرم بتقييم مستوى رضاكم وجودة تنفيذ مشروعكم "${proj.name}" من خلال الرابط التالي:\n${url}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  shareReviewOnWhatsApp(): void {
    const waUrl = this.getWhatsAppShareUrl();
    if (waUrl && waUrl !== '#' && typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const fallback = img.nextElementSibling as HTMLElement;
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.classList.add('flex');
      }
    }
  }
}

