import { Component, inject, OnInit, signal, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TenantsService } from '../../../core/services/tenants.service';
import { WhatsAppLinkService } from '../../../core/services/whatsapp-link.service';
import { TenantDto } from '../../../core/services/public-directory.service';
import { ProjectDto } from '../../../core/models/project.models';

type TenantActionType = 'Activate' | 'Reject' | 'Suspend';

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
  imports: [CommonModule, TranslatePipe, FormsModule, DatePipe, DecimalPipe],
  template: `
    <div class="space-y-6 w-full max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            🛡️ {{ 'DASHBOARD.TENANTS_MGMT' | translate }}
          </h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">إدارة شؤون الشركات، تعليق الحسابات، مراجعة السعات التخزينية ومراقبة التعليقات العامة.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">إجمالي الشركات / Total Companies</span>
          <h3 class="text-3xl font-extrabold text-white mt-1 font-mono tabular-nums">{{ tenants().length }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">الشركات النشطة / Active Companies</span>
          <h3 class="text-3xl font-extrabold text-emerald-400 mt-1 font-mono tabular-nums">{{ activeCount() }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">الحسابات المعلقة / Suspended Accounts</span>
          <h3 class="text-3xl font-extrabold text-rose-400 mt-1 font-mono tabular-nums">{{ suspendedCount() }}</h3>
        </div>
      </div>

      @if (errorMessage()) {
        <div class="bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl p-4 text-sm font-semibold flex items-center justify-between">
          <span>{{ errorMessage() }}</span>
          <button (click)="errorMessage.set(null)" class="text-rose-400 hover:text-rose-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }
      @if (successMessage()) {
        <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-4 text-sm font-semibold flex items-center justify-between">
          <span>{{ successMessage() }}</span>
          <button (click)="successMessage.set(null)" class="text-emerald-400 hover:text-emerald-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }

      <div class="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
        <div class="px-6 py-4 border-b border-slate-850 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h3 class="text-base font-bold text-white font-cairo">سجل الشركات والمؤسسات</h3>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="بحث باسم الشركة أو الموقع..."
            class="px-4 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 w-full sm:w-64 transition-all">
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right">
              <thead>
                <tr class="border-b border-slate-850 text-slate-500 text-xs font-bold uppercase tracking-wider font-cairo bg-slate-900/10">
                  <th class="px-6 py-4">الشركة / Tenant Name</th>
                  <th class="px-6 py-4">معرف الشركة / Tenant ID</th>
                  <th class="px-6 py-4">الاشتراك / Plan</th>
                  <th class="px-6 py-4">الموقع / Location</th>
                  <th class="px-6 py-4 text-center">التقييم / Rating</th>
                  <th class="px-6 py-4">تاريخ الانضمام / Created</th>
                  <th class="px-6 py-4">حالة الحساب / Status</th>
                  <th class="px-6 py-4 text-center">التحكم والعمليات / Controls</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-850 text-slate-300 text-xs">
                @for (tenant of filteredTenants(); track tenant.id) {
                  <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        @if (tenant.logoUrl) {
                          <img [src]="tenant.logoUrl" class="w-8 h-8 rounded-lg object-cover">
                        } @else {
                          <div class="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs uppercase">{{ tenant.name.substring(0, 2) }}</div>
                        }
                        <span class="font-bold text-white text-sm">{{ tenant.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-[10px] text-slate-500 select-all">{{ tenant.id }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.subscriptionPlan === 'Premium') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/25">Premium</span>
                      } @else if (tenant.subscriptionPlan === 'Standard') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">Standard</span>
                      } @else {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700/60">Free</span>
                      }
                    </td>
                    <td class="px-6 py-4 font-cairo font-semibold text-slate-400">{{ tenant.region || 'غير محدد' }}</td>
                    <td class="px-6 py-4 text-center">
                       <button
                         (click)="openReviewsModal(tenant.id, tenant.name)"
                         title="View all client reviews"
                         class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/25 rounded-lg text-[11px] font-bold transition-all cursor-pointer">
                         ⭐ {{ (tenant.rating || 0) | number:'1.1-1' }}
                       </button>
                    </td>
                    <td class="px-6 py-4 text-slate-400 font-mono">{{ tenant.createdAt | date:'dd/MM/yyyy' }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.status === 'Active') {
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25">Active</span>
                      } @else if (tenant.status === 'Suspended') {
                        <span class="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/25">🚫 Suspended</span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25">{{ tenant.status }}</span>
                      }
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button
                          (click)="inspectTenant(tenant)"
                          class="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-indigo-400 border border-indigo-900/30 rounded-xl text-[10px] font-bold font-cairo transition-all duration-200 active:scale-95 cursor-pointer">
                          مراجعة / Inspect
                        </button>

                        <button
                          (click)="openManualUpgradeModal(tenant)"
                          class="px-2.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-bold font-cairo transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1">
                          <span>💳 ترقية وإيصال</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="8" class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">لا توجد شركات مسجلة في المنصة حالياً.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      @if (selectedTenant(); as tenant) {
        <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4">
          <div (click)="closeInspector()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

            <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[92vh] flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-black/80">
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
              @if (activeActionContext(); as actionContext) {
                <div
                  class="rounded-2xl border px-5 py-4 shadow-lg shadow-black/20 transition-all duration-300"
                  [class.border-emerald-500/30]="actionContext.status === 'Activate'"
                  [class.bg-emerald-500/10]="actionContext.status === 'Activate'"
                  [class.border-amber-500/30]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                  [class.bg-amber-500/10]="actionContext.status === 'Reject'"
                  [class.bg-rose-500/10]="actionContext.status === 'Suspend'">
                  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div class="space-y-1">
                      <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-cairo">Operational Action Tray</div>
                      <div class="text-sm font-bold text-white font-cairo">
                        @if (actionContext.status === 'Activate') {
                          تم اعتماد طلب الانضمام للشركة {{ actionContext.tenantName }}.
                        } @else if (actionContext.status === 'Reject') {
                          تم إرسال طلب التعديل للشركة {{ actionContext.tenantName }}.
                        } @else {
                          تم تعليق الشركة {{ actionContext.tenantName }} مؤقتاً.
                        }
                      </div>
                      <div class="text-xs text-slate-300 font-cairo">المسؤول: {{ actionContext.ownerName }} · الهاتف: {{ actionContext.phone }}</div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-3">
                      <button
                        (click)="launchWhatsAppAction()"
                        class="px-4 py-2 rounded-xl text-xs font-bold font-cairo border transition-all duration-200 active:scale-95 cursor-pointer"
                        [class.bg-emerald-500/15]="actionContext.status === 'Activate'"
                        [class.text-emerald-300]="actionContext.status === 'Activate'"
                        [class.border-emerald-500/30]="actionContext.status === 'Activate'"
                        [class.hover:bg-emerald-500/20]="actionContext.status === 'Activate'"
                        [class.bg-amber-500/15]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.text-amber-300]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.border-amber-500/30]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.hover:bg-amber-500/20]="actionContext.status === 'Reject' || actionContext.status === 'Suspend'"
                        [class.bg-rose-500/15]="actionContext.status === 'Suspend'"
                        [class.text-rose-300]="actionContext.status === 'Suspend'"
                        [class.border-rose-500/30]="actionContext.status === 'Suspend'">
                        إرسال عبر WhatsApp
                      </button>

                      @if (actionContext.status === 'Reject' && actionContext.mapLink) {
                        <button
                          (click)="launchTargetMapLocation()"
                          class="px-4 py-2 rounded-xl text-xs font-bold font-cairo border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 transition-all duration-200 active:scale-95 cursor-pointer">
                          فتح مكان التعديل المطلوب على الخريطة / Open Targeted Map Location
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }

              @if (isLoadingAudit()) {
                <div class="flex justify-center items-center py-16">
                  <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                      <div>
                        <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">بيانات التسجيل / Registration Data</span>
                        <h4 class="text-lg font-bold text-white font-cairo mt-1">ملف العميل الأساسي</h4>
                      </div>
                      @if (tenant.status === 'Active') {
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25 text-[10px]">Active</span>
                      } @else if (tenant.status === 'Suspended') {
                        <span class="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/25 text-[10px]">Suspended</span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25 text-[10px]">{{ tenant.status }}</span>
                      }
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
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">نوع الحساب</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.accountType || 'Company' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">المحافظة / Location</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.location || tenant.region || 'غير محدد' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">رقم الهاتف</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.personalPhone || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">الاشتراك</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.subscriptionPlan }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3" [class.sm:col-span-2]="true">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">السجل التجاري</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.commercialRegister || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">البطاقة الضريبية</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.taxCard || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">الرقم القومي</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.nationalId || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">رقم النقابة</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">{{ tenant.syndicateId || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:col-span-2">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">العنوان التفصيلي</div>
                        <div class="mt-1 text-slate-200 font-semibold">{{ tenant.manualAddress || 'N/A' }}</div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:col-span-2">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">رابط الموقع على الخريطة</div>
                        <div class="mt-1 text-slate-200 break-all">
                          @if (tenant.mapLocationUrl) {
                            <a [href]="tenant.mapLocationUrl" target="_blank" rel="noreferrer" class="text-indigo-300 hover:text-indigo-200 underline decoration-dotted">افتح الموقع / Open map location</a>
                          } @else {
                            N/A
                          }
                        </div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">الإحداثيات</div>
                        <div class="mt-1 text-slate-200 font-mono break-all">
                          {{ tenant.latitude ?? 'N/A' }} , {{ tenant.longitude ?? 'N/A' }}
                        </div>
                      </div>
                      <div class="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                        <div class="text-slate-500 uppercase tracking-wider font-bold font-cairo">تاريخ الانضمام</div>
                        <div class="mt-1 text-slate-200 font-semibold font-mono">{{ tenant.createdAt | date:'dd/MM/yyyy' }}</div>
                      </div>
                    </div>

                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">Administrative Action Set</span>
                          <h4 class="text-lg font-bold text-white font-cairo mt-1">إجراءات المراجعة المباشرة</h4>
                        </div>
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        @if (tenant.status !== 'Active') {
                          <button
                            (click)="onAction(tenant.id, 'Activate')"
                            [disabled]="isActioningId() === tenant.id"
                            class="px-3 py-2 rounded-xl text-xs font-bold font-cairo border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
                            @if (isActioningId() === tenant.id) {
                              <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Activate
                          </button>
                        }

                        @if (tenant.status !== 'Suspended') {
                          <button
                            (click)="onAction(tenant.id, 'Reject')"
                            [disabled]="isActioningId() === tenant.id"
                            class="px-3 py-2 rounded-xl text-xs font-bold font-cairo border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
                            @if (isActioningId() === tenant.id) {
                              <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Reject
                          </button>

                          <button
                            (click)="onAction(tenant.id, 'Suspend')"
                            [disabled]="isActioningId() === tenant.id"
                            class="px-3 py-2 rounded-xl text-xs font-bold font-cairo border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
                            @if (isActioningId() === tenant.id) {
                              <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            }
                            Suspend
                          </button>
                        }
                      </div>

                      </div>

                    <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4 text-sm text-slate-300 font-cairo">
                      بيانات التسجيل الحساسة تبقى داخل شاشة السوبرأدمِن فقط، ولا تظهر في الجدول العام أو أي واجهة عامة للمستخدمين.
                    </div>
                  </div>

                  <div class="space-y-4 w-full">
                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-4">
                      <div class="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                        <div>
                          <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">الإحصائيات والمراجعات / Audit & Moderation</span>
                          <h4 class="text-lg font-bold text-white font-cairo mt-1">سجل الأداء والمراجعات</h4>
                        </div>
                      </div>

                      @if (auditProfile()) {
                        <div class="grid grid-cols-3 gap-3">
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">عدد المشاريع</span>
                            <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().totalProjectsCount }}</div>
                          </div>
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">المستخدمين النشطين</span>
                            <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().activeUserCount }}</div>
                          </div>
                          <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                            <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">التقييم العام</span>
                            <button
                              (click)="openReviewsModal(tenant.id, tenant.name)"
                              title="Click to view detailed customer reviews ledger"
                              class="w-full text-right flex items-center gap-1.5 text-xl font-bold text-amber-400 mt-0.5 hover:text-amber-300 transition-colors cursor-pointer focus:outline-none">
                              ⭐ {{ auditProfile().globalRatingScore | number:'1.1-1' }}
                            </button>
                          </div>
                        </div>

                        <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4.5 space-y-2">
                          <div class="flex justify-between items-center text-xs">
                            <span class="text-slate-400 font-cairo font-bold">💾 السعة التخزينية المستخدمة / Storage Metrics</span>
                            <span class="font-mono text-indigo-400 font-bold">{{ auditProfile().storageUsedMb }} MB / 100 MB</span>
                          </div>
                          <div class="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                            <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500" [style.width.%]="storagePercentage()"></div>
                          </div>
                          <div class="flex justify-between items-center text-[10px] text-slate-500 font-cairo">
                            <span>تم احتسابها من ملفات المقايسات المرفوعة والعهدة.</span>
                            <span>نسبة الاستهلاك: {{ storagePercentage() | number:'1.0-0' }}%</span>
                          </div>
                        </div>
                      } @else {
                        <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4 text-sm text-slate-400 font-cairo">
                          لا توجد بيانات مراجعة متاحة بعد.
                        </div>
                      }
                    </div>

                    <div class="bg-slate-950/55 border border-slate-800 rounded-2xl p-5 space-y-3">
                      <span class="text-xs font-bold text-indigo-400 font-cairo uppercase tracking-wider block border-b border-slate-800 pb-2">✍️ Review Moderation Hub</span>

                      <div class="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
                        @for (project of moderatedProjects(); track project.id) {
                          <div class="bg-slate-950/65 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div class="space-y-1">
                              <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-white">{{ project.name }}</span>
                                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-bold border border-slate-800">⭐ {{ project.clientRating }}</span>
                              </div>
                              <p class="text-xs text-slate-400 font-cairo font-medium">العميل: {{ project.clientName || 'غير مسجل' }}</p>
                              <p class="text-[11px] text-slate-300 italic bg-slate-900/30 rounded p-2 border border-slate-850/60 font-cairo mt-1.5">{{ project.clientReviewNotes || 'لم يكتب تعليقاً نصياً' }}</p>
                            </div>

                            <div class="shrink-0 flex items-center gap-2 self-end sm:self-center">
                              @if (project.isReviewHidden) {
                                <span class="text-[10px] font-bold text-rose-400 bg-rose-950/20 border border-rose-900/30 px-2 py-0.5 rounded font-cairo">مخفي / Hidden</span>
                              } @else {
                                <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded font-cairo">نشط / Visible</span>
                              }

                              <button
                                (click)="toggleReview(project)"
                                [disabled]="isModeratingId() === project.id"
                                class="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:text-white rounded-xl text-[10px] font-bold font-cairo cursor-pointer active:scale-95 transition-all flex items-center gap-1">
                                @if (isModeratingId() === project.id) {
                                  <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                } @else {
                                  {{ project.isReviewHidden ? 'إظهار / Show' : 'حجب / Hide' }}
                                }
                              </button>
                            </div>
                          </div>
                        } @empty {
                          <p class="text-xs text-slate-500 text-center font-cairo py-6 bg-slate-950/30 rounded-xl border border-slate-850">لا توجد تقييمات مكتوبة مسجلة لهذه الشركة بعد.</p>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Client Reviews Ledger Popup Modal -->
    @if (showReviewsModal()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
        <div (click)="closeReviewsModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

        <div class="relative z-10 w-full max-w-3xl mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/85 font-sans">
          <!-- Modal Header -->
          <div class="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 px-5 py-4 backdrop-blur-sm flex items-center justify-between">
            <div>
              <span class="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-cairo">سجل تقييمات العملاء / Client Ratings Ledger</span>
              <h3 class="text-base font-bold text-white font-cairo mt-1">تقييمات شركة: {{ reviewsModalTenantName() }}</h3>
            </div>
            <button
              (click)="closeReviewsModal()"
              class="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-850 transition-colors duration-150 text-xs font-bold font-cairo cursor-pointer">
              إغلاق / Close
            </button>
          </div>

          <!-- Modal Body (Independent Scroll Box) -->
          <div class="flex-1 overflow-y-auto min-h-0 p-5 space-y-4">
            @if (isLoadingReviews()) {
              <div class="flex flex-col items-center justify-center py-12 gap-3">
                <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-xs text-slate-400 font-cairo">جاري تحميل سجل التقييمات...</span>
              </div>
            } @else {
              <div class="w-full overflow-x-auto block">
                <table class="w-full text-right border-collapse min-w-[650px]">
                  <thead>
                    <tr class="border-b border-slate-800 text-slate-400 text-xs font-bold font-cairo">
                      <th class="pb-3 px-3">المشروع / Project</th>
                      <th class="pb-3 px-3">العميل / Client</th>
                      <th class="pb-3 px-3 text-center">التقييم / Rating</th>
                      <th class="pb-3 px-3">التعليق / Comments</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-850 text-slate-300 text-xs font-sans">
                    @for (rev of reviewsList(); track rev.id) {
                      <tr class="hover:bg-slate-950/20 transition-colors">
                        <td class="py-3.5 px-3 font-semibold text-white font-cairo">{{ rev.name }}</td>
                        <td class="py-3.5 px-3 text-slate-400 font-cairo">{{ rev.clientName || 'غير مسجل' }}</td>
                        <td class="py-3.5 px-3 text-center">
                          <div class="flex items-center justify-center gap-0.5">
                            @if (rev.clientRating) {
                              @for (star of [1,2,3,4,5]; track star) {
                                <span class="text-sm" [class.text-amber-400]="star <= rev.clientRating" [class.text-slate-700]="star > rev.clientRating">★</span>
                              }
                              <span class="text-[10px] font-bold text-amber-500/80 font-mono ml-1">({{ rev.clientRating }})</span>
                            } @else {
                              <span class="text-slate-500 font-cairo">بدون تقييم نجوم</span>
                            }
                          </div>
                        </td>
                        <td class="py-3.5 px-3 max-w-[280px] break-words">
                          @if (rev.clientReviewNotes) {
                            <div class="text-slate-300 italic font-cairo bg-slate-950/30 border border-slate-850 p-2.5 rounded-lg">
                              {{ rev.clientReviewNotes }}
                            </div>
                          } @else {
                            <span class="text-slate-550 font-cairo italic">لا يوجد تعليق نصي</span>
                          }
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="4" class="py-12 text-center text-slate-500 text-sm font-cairo">لا توجد تقييمات مسجلة لهذه الشركة بعد.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
    }

    <!-- SUPER ADMIN MANUAL UPGRADE & RECEIPT MODAL -->
    @if (isManualUpgradeModalOpen() && selectedTenantForUpgrade(); as t) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            <!-- FORM STATE -->
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

              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">ملاحظات الإيصال (اختياري)</label>
                <input 
                  type="text" 
                  [ngModel]="manualNotes()" 
                  (ngModelChange)="manualNotes.set($event)"
                  placeholder="مثال: تم تحصيل المبلغ بحوالة بنكية رقم 84920" 
                  class="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-cairo" />
              </div>

              <div class="pt-2 flex items-center justify-end gap-3">
                <button 
                  (click)="closeManualUpgradeModal()" 
                  class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer">
                  إلغاء
                </button>

                <button 
                  [disabled]="isSubmittingManualUpgrade()"
                  (click)="submitManualUpgrade()"
                  class="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer">
                  @if (isSubmittingManualUpgrade()) {
                    <span>جاري التفعيل وتوليد الإيصال...</span>
                  } @else {
                    <span>⚡ تفعيل وإصدار إيصال رسمياً</span>
                  }
                </button>
              </div>
            </div>
          } @else {
            <!-- OFFICIAL PRINTABLE ADMIN RECEIPT -->
            <div class="p-6 space-y-5 text-right font-cairo">
              
              <!-- Official Enterprise Printable Admin Receipt Container -->
              <div class="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-2xl relative shadow-xl print-only space-y-4 text-right font-cairo" dir="rtl">
                
                <!-- Receipt Header / Letterhead -->
                <div class="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-1">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-indigo-500/20 border border-indigo-500/40 rounded-xl flex items-center justify-center text-indigo-400 text-2xl font-bold">
                      📜
                    </div>
                    <div>
                      <h4 class="font-black text-lg text-white">إيصال سداد وتفعيل إداري محصّل</h4>
                      <span class="text-[11px] text-indigo-400 font-mono tracking-wider">SUPER ADMIN OFFICIAL INVOICE · STRUCTO PLATFORM</span>
                    </div>
                  </div>

                  <div class="text-left font-mono">
                    <span class="px-3 py-1 text-xs font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 rounded-lg inline-block mb-1">
                      ✓ مكتمل ومفعل إدارياً / CONFIRMED
                    </span>
                    <p class="text-[10px] text-slate-400">رقم الإيصال: <strong class="text-indigo-400 font-mono">{{ adminReceiptData()?.referenceNumber }}</strong></p>
                  </div>
                </div>

                <!-- Subtitle Bar -->
                <div class="flex items-center justify-between bg-slate-950/80 border border-slate-800 p-3 rounded-xl">
                  <div>
                    <h5 class="font-black text-xs text-white">إيصال سداد وتحصيل إداري مباشر (Super Admin Manual Receipt)</h5>
                    <p class="text-[10px] text-slate-400">صادر رسمياً عن الإدارة العليا لمنصة أُسُس لإعادة شحن وتفعيل الحسابات.</p>
                  </div>
                  <span class="text-[10px] font-mono text-indigo-300 bg-indigo-950 border border-indigo-500/30 px-2.5 py-1 rounded">
                    ADMIN-AUTH
                  </span>
                </div>

                <!-- Parties Info Grid -->
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1">
                    <span class="text-[10px] text-slate-400 block font-cairo">الجهة التحصيلية (Super Admin):</span>
                    <span class="font-bold text-white block font-cairo">إدارة منصة أُسُس / Structo Central Admin</span>
                    <span class="text-[10px] text-slate-400 font-mono block">admin@structo.app</span>
                  </div>

                  <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-850 space-y-1">
                    <span class="text-[10px] text-slate-400 block font-cairo">الشركة والعميل المستفيد:</span>
                    <span class="font-bold text-white block font-cairo truncate">{{ t.name }}</span>
                    <span class="text-[10px] text-slate-400 font-mono block truncate">ID: {{ t.id }}</span>
                  </div>
                </div>

                <!-- Itemized Service Breakdown Table -->
                <div class="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table class="w-full text-right font-cairo">
                    <thead class="bg-slate-950 text-slate-300 font-bold border-b border-slate-800 text-[11px]">
                      <tr>
                        <th class="p-2.5">بيان التفعيل والتحصيل الإداري</th>
                        <th class="p-2.5 text-center">الرصيد المضاف</th>
                        <th class="p-2.5 text-center">طريقة التحصيل</th>
                        <th class="p-2.5 text-left">المبلغ المحصل</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-850 bg-slate-900/60">
                      <tr>
                        <td class="p-2.5">
                          <span class="font-bold text-white block">شحن مشاريع إضافية وتفعيل فوري (Manual Top-Up)</span>
                          <span class="text-[10px] text-slate-400 block">تم التفعيل اليدوي بواسطة السوبر أدمن.</span>
                        </td>
                        <td class="p-2.5 text-center font-bold text-emerald-400">+{{ adminReceiptData()?.extraProjectsAdded }} مشاريع</td>
                        <td class="p-2.5 text-center font-bold text-slate-200">{{ manualPaymentMethod() }}</td>
                        <td class="p-2.5 text-left font-mono font-black text-amber-400 text-sm">{{ adminReceiptData()?.totalAmount | number }} EGP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Summary Breakdown Grid -->
                <div class="grid grid-cols-3 gap-2.5 text-xs">
                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">حالة العملية</span>
                    <span class="font-bold text-emerald-400 font-cairo text-xs">مكتمل ومحصل 100%</span>
                  </div>

                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">الزيادة المضافة</span>
                    <span class="font-bold text-emerald-400 font-cairo text-xs">+{{ adminReceiptData()?.extraProjectsAdded }} مشاريع</span>
                  </div>

                  <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-850">
                    <span class="text-[10px] text-slate-400 block mb-0.5 font-cairo">السعة الكلية الجديدة</span>
                    <span class="font-mono font-bold text-amber-400 text-xs">{{ adminReceiptData()?.newMaxActiveProjects }} مشاريع</span>
                  </div>
                </div>

                <!-- Total Paid Card -->
                <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span class="text-xs font-bold text-white font-cairo block">المبلغ الإجمالي المحصّل (صافي)</span>
                    <span class="text-[10px] text-slate-400 font-mono">TOTAL COLLECTED AMOUNT · NET</span>
                  </div>
                  <div class="text-xl font-black font-mono text-amber-400">
                    {{ adminReceiptData()?.totalAmount | number }} EGP
                  </div>
                </div>

                <!-- Official Footer Disclaimer -->
                <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-cairo">
                  <span>📜 إيصال تحصيل وسداد إداري رسمي صادر إلكترونياً ومسجل بقاعدة بيانات منصة أُسُس.</span>
                  <span class="font-mono text-slate-500">Structo Super Admin Authority</span>
                </div>

              </div>

              <!-- Buttons (Hidden during PDF print) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 no-print">
                <button 
                  (click)="sendAdminReceiptWhatsApp()"
                  class="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer">
                  <span>📲 إرسال الإيصال عبر الواتساب</span>
                </button>

                <button 
                  (click)="printAdminReceipt()"
                  class="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span>🖨️ طباعة الإيصال / Print PDF</span>
                </button>
              </div>

              <div class="pt-2 no-print">
                <button 
                  (click)="closeManualUpgradeModal()"
                  class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/30 cursor-pointer">
                  تم الإغلاق والعودة لقائمة الشركات
                </button>
              </div>

            </div>
          }

        </div>
      </div>
    }
  `
})
export class TenantsComponent implements OnInit {
  private readonly tenantsService = inject(TenantsService);
  private readonly whatsAppLink = inject(WhatsAppLinkService);
  private readonly destroyRef = inject(DestroyRef);

  readonly tenants = signal<TenantDto[]>([]);
  readonly isLoading = signal(false);
  readonly isActioningId = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly activeActionContext = signal<ActiveActionContext | null>(null);

  searchQuery = '';

  readonly selectedTenant = signal<TenantDto | null>(null);
  readonly auditProfile = signal<any | null>(null);
  readonly isLoadingAudit = signal(false);
  readonly moderatedProjects = signal<ModeratedProject[]>([]);
  readonly isModeratingId = signal<string | null>(null);

  // Super Admin Manual Upgrade Signals
  readonly isManualUpgradeModalOpen = signal(false);
  readonly selectedTenantForUpgrade = signal<TenantDto | null>(null);
  readonly manualProjectsCount = signal<number>(5);
  readonly manualAmountEgp = signal<number>(950);
  readonly manualPaymentMethod = signal<string>('Cash');
  readonly manualNotes = signal<string>('');
  readonly isSubmittingManualUpgrade = signal<boolean>(false);
  readonly adminReceiptData = signal<any | null>(null);

  readonly filteredTenants = computed(() => {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) return this.tenants();
    return this.tenants().filter(t =>
      t.name.toLowerCase().includes(query) ||
      (t.region && t.region.toLowerCase().includes(query)) ||
      t.id.toLowerCase().includes(query)
    );
  });

  readonly activeCount = computed(() => this.tenants().filter(t => t.status === 'Active').length);
  readonly suspendedCount = computed(() => this.tenants().filter(t => t.status === 'Suspended').length);

  readonly storagePercentage = computed(() => {
    const profile = this.auditProfile();
    if (!profile) return 0;
    const pct = (profile.storageUsedMb / 100) * 100;
    return Math.min(Math.max(pct, 2), 100);
  });

  ngOnInit(): void {
    this.fetchTenants();
  }

  fetchTenants(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.tenantsService.getAllTenants().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.tenants.set(res.data);
        } else {
          this.errorMessage.set(res.message || 'Failed to fetch tenants.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error loading companies list.');
      }
    });
  }

  inspectTenant(tenant: TenantDto): void {
    this.selectedTenant.set(tenant);
    this.isLoadingAudit.set(true);
    this.auditProfile.set(null);
    this.moderatedProjects.set([]);

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

    this.tenantsService.getTenantProjects(tenant.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.moderatedProjects.set(res.data.filter(p => !!p.clientReviewNotes));
        }
      }
    });
  }

  closeInspector(): void {
    this.selectedTenant.set(null);
    this.auditProfile.set(null);
    this.moderatedProjects.set([]);
    this.activeActionContext.set(null);
    this.successMessage.set(null);
  }

  // Reviews Modal states and methods
  readonly showReviewsModal = signal(false);
  readonly reviewsModalTenantName = signal('');
  readonly reviewsList = signal<any[]>([]);
  readonly isLoadingReviews = signal(false);

  openReviewsModal(tenantId: string, tenantName: string): void {
    this.reviewsModalTenantName.set(tenantName);
    this.showReviewsModal.set(true);
    this.isLoadingReviews.set(true);
    this.reviewsList.set([]);

    this.tenantsService.getTenantProjects(tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoadingReviews.set(false);
        if (res.success && res.data) {
          // Get all projects that have a rating or comments
          const reviews = res.data.filter(p => p.clientRating !== null || !!p.clientReviewNotes);
          this.reviewsList.set(reviews);
        }
      },
      error: () => {
        this.isLoadingReviews.set(false);
      }
    });
  }

  closeReviewsModal(): void {
    this.showReviewsModal.set(false);
    this.reviewsModalTenantName.set('');
    this.reviewsList.set([]);
  }

  onAction(tenantId: string, actionType: TenantActionType): void {
    const tenant = this.tenants().find(item => item.id === tenantId) ?? this.selectedTenant();

    if (!tenant) {
      this.errorMessage.set('Tenant not found.');
      return;
    }

    this.isActioningId.set(tenantId);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (actionType === 'Activate') {
      this.tenantsService.provisionTenant(tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.isActioningId.set(null);

          if (!res.success) {
            this.errorMessage.set(res.message || 'Failed to update company status.');
            return;
          }

          const ownerName = [tenant.adminFirstName, tenant.adminLastName].filter(Boolean).join(' ').trim() || 'غير متوفر';
          const phone = this.resolveActionPhone(tenant);
          const updatedTenant: TenantDto = {
            ...tenant,
            status: 'Active'
          };

          this.tenants.update(list => list.map(item => item.id === tenantId ? updatedTenant : item));
          if (this.selectedTenant()?.id === tenantId) {
            this.selectedTenant.set(updatedTenant);
          }

          this.activeActionContext.set({
            tenantName: tenant.name,
            ownerName,
            phone,
            status: 'Activate',
            mapLink: null
          });
          this.successMessage.set(res.message || 'Status updated successfully.');
        },
        error: (err: { error?: { message?: string } }) => {
          this.isActioningId.set(null);
          this.errorMessage.set(err.error?.message || 'Error occurred updating company status.');
        }
      });
      return;
    }

    this.tenantsService.toggleTenantStatus(tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isActioningId.set(null);

        if (!res.success) {
          this.errorMessage.set(res.message || 'Failed to update company status.');
          return;
        }

        const ownerName = [tenant.adminFirstName, tenant.adminLastName].filter(Boolean).join(' ').trim() || 'غير متوفر';
        const phone = this.resolveActionPhone(tenant);
        const mapLink = actionType === 'Reject' ? this.buildMapLink(tenant.latitude, tenant.longitude) : null;
        const updatedTenant: TenantDto = {
          ...tenant,
          status: 'Suspended'
        };

        this.tenants.update(list => list.map(item => item.id === tenantId ? updatedTenant : item));
        if (this.selectedTenant()?.id === tenantId) {
          this.selectedTenant.set(updatedTenant);
        }

        this.activeActionContext.set({
          tenantName: tenant.name,
          ownerName,
          phone,
          status: actionType,
          mapLink
        });
        this.successMessage.set(res.message || 'Status updated successfully.');
      },
      error: (err: { error?: { message?: string } }) => {
        this.isActioningId.set(null);
        this.errorMessage.set(err.error?.message || 'Error occurred updating company status.');
      }
    });
  }

  launchWhatsAppAction(): void {
    const actionContext = this.activeActionContext();
    if (!actionContext || !actionContext.phone) {
      return;
    }

    const message = this.buildWhatsAppMessage(actionContext);
    const encodedMessage = encodeURIComponent(message);
    let cleanPhone = actionContext.phone.replace(/[^0-9]/g, '');

    if (cleanPhone.startsWith('0')) {
      cleanPhone = `2${cleanPhone}`;
    } else if (!cleanPhone.startsWith('20') && cleanPhone.startsWith('1')) {
      cleanPhone = `20${cleanPhone}`;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  launchTargetMapLocation(): void {
    const actionContext = this.activeActionContext();
    if (!actionContext?.mapLink) {
      return;
    }

    window.open(actionContext.mapLink, '_blank');
  }

  private buildWhatsAppMessage(actionContext: ActiveActionContext): string {
    const loginUrl = new URL('/login', window.location.origin).toString();

    if (actionContext.status === 'Activate') {
      return `السلام عليكم أ/ ${actionContext.ownerName}، تم مراجعة وقبول طلب انضمام شركتك (${actionContext.tenantName}) إلى منصة Structo بنجاح! يمكنك الآن تسجيل الدخول واستكمال ملفك التجاري: ${loginUrl}`;
    }

    if (actionContext.status === 'Reject') {
      return `السلام عليكم أ/ ${actionContext.ownerName}، بخصوص طلب انضمام شركتك (${actionContext.tenantName})، يرجى إعادة مراجعة وتعديل إحداثيات موقع المكتب على الخريطة المرفقة هنا: ${actionContext.mapLink}. شكراً لك!`;
    }

    return `السلام عليكم أ/ ${actionContext.ownerName}، تم تعليق حالة شركة (${actionContext.tenantName}) مؤقتاً من قبل الإدارة. يرجى التواصل مع فريق Structo لمراجعة التفاصيل.`;
  }

  private resolveActionPhone(tenant: TenantDto): string {
    return tenant.whatsAppPhone ?? tenant.personalPhone ?? '';
  }

  private buildMapLink(latitude?: number | null, longitude?: number | null): string | null {
    if (latitude == null || longitude == null) {
      return null;
    }

    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  toggleReview(project: ModeratedProject): void {
    this.isModeratingId.set(project.id);
    this.tenantsService.toggleReviewVisibility(project.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isModeratingId.set(null);
        if (res.success) {
          const updated = this.moderatedProjects().map(p =>
            p.id === project.id ? { ...p, isReviewHidden: !p.isReviewHidden } : p
          );
          this.moderatedProjects.set(updated);
        }
      },
      error: () => {
        this.isModeratingId.set(null);
      }
    });
  }

  openManualUpgradeModal(tenant: TenantDto): void {
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
          this.tenants.update(list => list.map(t => t.id === tenant.id ? { ...t, maxActiveProjects: res.data.newMaxActiveProjects } : t));
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

    const phone = tenant.whatsAppPhone || tenant.personalPhone;
    if (!phone) {
      this.errorMessage.set('لم يتم إرسال الإيصال عبر الواتساب لعدم وجود رقم واتساب مسجل في بروفايل الشركة.');
      return;
    }

    const msg = `مرحباً ${tenant.name}، تم إضافة مشاريع جديدة إلى رصيد حسابكم وسداد الرسم رقم (${receipt.referenceNumber}) بمبلغ ${receipt.totalAmount} EGP لعدد +${receipt.extraProjectsAdded} مشاريع إضافية (إجمالي المتاح: ${receipt.newMaxActiveProjects} مشروع). شكراً لاستخدامكم أُسُس!`;

    this.whatsAppLink.openChat(phone, msg);
    this.successMessage.set('تم فتح الواتساب لإرسال الإيصال بنجاح.');
  }

  printAdminReceipt(): void {
    window.print();
  }
}
