import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TenantsService } from '../../../core/services/tenants.service';
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
    <div class="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            🛡️ {{ 'DASHBOARD.TENANTS_MGMT' | translate }}
          </h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">إدارة شؤون الشركات، تعليق الحسابات، مراجعة السعات التخزينية ومراقبة التعليقات العامة.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">إجمالي الشركات / Total Companies</span>
          <h3 class="text-3xl font-extrabold text-white mt-1">{{ tenants().length }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">الشركات النشطة / Active Companies</span>
          <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">{{ activeCount() }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">الحسابات المعلقة / Suspended Accounts</span>
          <h3 class="text-3xl font-extrabold text-rose-400 mt-1">{{ suspendedCount() }}</h3>
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
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">لا توجد شركات مسجلة في المنصة حالياً.</td>
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
                            <div class="text-xl font-bold text-amber-400 mt-0.5">⭐ {{ auditProfile().globalRatingScore | number:'1.1-1' }}</div>
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
  `
})
export class TenantsComponent implements OnInit {
  private readonly tenantsService = inject(TenantsService);

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
    this.tenantsService.getAllTenants().subscribe({
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

    this.tenantsService.getTenantAuditProfile(tenant.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.auditProfile.set(res.data);
        }
      },
      complete: () => {
        this.isLoadingAudit.set(false);
      }
    });

    this.tenantsService.getTenantProjects(tenant.id).subscribe({
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
      this.tenantsService.provisionTenant(tenantId).subscribe({
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

    this.tenantsService.toggleTenantStatus(tenantId).subscribe({
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
    this.tenantsService.toggleReviewVisibility(project.id).subscribe({
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
}
