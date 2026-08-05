import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, signal, computed, AfterViewInit, ViewEncapsulation, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TenantProfileService, TenantProfileUpdateDto, SubscriptionPlanInfo, SubscriptionTopUpInfo, SubscriptionUpgradeResponse } from '../../../core/services/tenant-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { ImageUploadService, UploadResult } from '../../../core/services/image-upload.service';
import { TenantDto } from '../../../core/services/public-directory.service';
import { ToastService } from '../../../core/services/toast.service';
import * as L from 'leaflet';


interface GovernorateOption {
  id: string;
  nameEn: string;
  nameAr: string;
  label: string;
}

export const EGYPT_GOVERNORATES: GovernorateOption[] = [
  { id: 'Cairo', nameEn: 'Cairo', nameAr: 'القاهرة', label: 'القاهرة / Cairo' },
  { id: 'Giza', nameEn: 'Giza', nameAr: 'الجيزة', label: 'الجيزة / Giza' },
  { id: 'Alexandria', nameEn: 'Alexandria', nameAr: 'الإسكندرية', label: 'الإسكندرية / Alexandria' },
  { id: 'Qalyubia', nameEn: 'Qalyubia', nameAr: 'القليوبية', label: 'القليوبية / Qalyubia' },
  { id: 'Gharbia', nameEn: 'Gharbia', nameAr: 'الغربية', label: 'الغربية / Gharbia' },
  { id: 'Dakahlia', nameEn: 'Dakahlia', nameAr: 'الدقهلية', label: 'الدقهلية / Dakahlia' },
  { id: 'Sharqia', nameEn: 'Sharqia', nameAr: 'الشرقية', label: 'الشرقية / Sharqia' },
  { id: 'Monufia', nameEn: 'Monufia', nameAr: 'المنوفية', label: 'المنوفية / Monufia' },
  { id: 'Beheira', nameEn: 'Beheira', nameAr: 'البحيرة', label: 'البحيرة / Beheira' },
  { id: 'Kafr El Sheikh', nameEn: 'Kafr El Sheikh', nameAr: 'كفر الشيخ', label: 'كفر الشيخ / Kafr El Sheikh' },
  { id: 'Damietta', nameEn: 'Damietta', nameAr: 'دمياط', label: 'دمياط / Damietta' },
  { id: 'Port Said', nameEn: 'Port Said', nameAr: 'بورسعيد', label: 'بورسعيد / Port Said' },
  { id: 'Ismailia', nameEn: 'Ismailia', nameAr: 'الإسماعيلية', label: 'الإسماعيلية / Ismailia' },
  { id: 'Suez', nameEn: 'Suez', nameAr: 'السويس', label: 'السويس / Suez' },
  { id: 'Aswan', nameEn: 'Aswan', nameAr: 'أسوان', label: 'أسوان / Aswan' },
  { id: 'Luxor', nameEn: 'Luxor', nameAr: 'الأقصر', label: 'الأقصر / Luxor' },
  { id: 'Red Sea', nameEn: 'Red Sea', nameAr: 'البحر الأحمر', label: 'البحر الأحمر / Red Sea' },
  { id: 'Matrouh', nameEn: 'Matrouh', nameAr: 'مطروح', label: 'مطروح / Matrouh' },
  { id: 'Sohag', nameEn: 'Sohag', nameAr: 'سوهاج', label: 'سوهاج / Sohag' },
  { id: 'Asyut', nameEn: 'Asyut', nameAr: 'أسيوط', label: 'أسيوط / Asyut' },
  { id: 'Minya', nameEn: 'Minya', nameAr: 'المنيا', label: 'المنيا / Minya' },
  { id: 'Beni Suef', nameEn: 'Beni Suef', nameAr: 'بني سويف', label: 'بني سويف / Beni Suef' },
  { id: 'Faiyum', nameEn: 'Faiyum', nameAr: 'الفيوم', label: 'الفيوم / Faiyum' },
  { id: 'Qena', nameEn: 'Qena', nameAr: 'قنا', label: 'قنا / Qena' },
  { id: 'North Sinai', nameEn: 'North Sinai', nameAr: 'شمال سيناء', label: 'شمال سيناء / North Sinai' },
  { id: 'South Sinai', nameEn: 'South Sinai', nameAr: 'جنوب سيناء', label: 'جنوب سيناء / South Sinai' },
  { id: 'New Valley', nameEn: 'New Valley', nameAr: 'الوادي الجديد', label: 'الوادي الجديد / New Valley' }
];

interface MapSearchResult {
  display_name: string;
  lat: string;
  lon: string;
}

@Component({
  selector: 'app-tenant-profile',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
  template: `
    <div class="w-full max-w-5xl mx-auto space-y-6">
      
      <!-- HEADER BANNER & COMPANY IDENTITY -->
      <div class="relative bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
        <!-- Banner Image / Gradient -->
        <div class="w-full h-40 sm:h-52 bg-slate-800 relative overflow-hidden group">
          @if (profileForm.get('bannerUrl')?.value) {
            <img [src]="profileForm.get('bannerUrl')?.value" alt="Banner" class="w-full h-full object-cover">
          } @else {
            <div class="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
              <svg class="w-12 h-12 text-indigo-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
              </svg>
            </div>
          }
          
          <!-- Banner Upload Button -->
          <button type="button" (click)="bannerFileInput.click()" 
            class="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
            <span class="flex items-center gap-2 text-white text-xs font-bold font-cairo bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-md hover:bg-indigo-600 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              تغيير صورة الغلاف / Change Banner
            </span>
          </button>
          <input #bannerFileInput type="file" class="hidden" (change)="onBannerFileSelected($event)" accept="image/*">
          
          @if (isUploadingBanner()) {
            <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div class="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span class="text-xs text-indigo-300 font-cairo font-bold">جاري الرفع... / Uploading...</span>
            </div>
          }
        </div>

        <!-- Identity Bar -->
        <div class="p-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 sm:-mt-14">
          <div class="flex items-end gap-4">
            <!-- Logo Box -->
            <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-900 border-4 border-slate-900 shadow-2xl overflow-hidden group flex-shrink-0">
              @if (profileForm.get('logoUrl')?.value) {
                <img [src]="profileForm.get('logoUrl')?.value" alt="Logo" class="w-full h-full object-cover">
              } @else {
                <img src="assets/images/default-tenant-logo.png" alt="Default Logo" class="w-full h-full object-cover opacity-80">
              }
              <button type="button" (click)="logoFileInput.click()" 
                class="absolute inset-0 bg-slate-950/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </button>
              <input #logoFileInput type="file" class="hidden" (change)="onLogoFileSelected($event)" accept="image/*">
              
              @if (isUploadingLogo()) {
                <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                  <div class="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              }
            </div>

            <!-- Titles & Status Badges -->
            <div class="pb-1 space-y-1 font-cairo">
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-xl sm:text-2xl font-bold text-white">
                  {{ profileForm.get('name')?.value || 'بروفايل الشركة' }}
                </h2>
                <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {{ tenantData()?.accountType || 'Company' }}
                </span>
                <span class="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Plan: {{ tenantData()?.subscriptionPlan || 'Free' }}
                </span>
              </div>
              <p class="text-xs text-slate-400 flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ resolveGovernorateLabel(profileForm.get('governorateId')?.value || profileForm.get('location')?.value) || 'لم يتم تحديد المحافظة / Region not set' }}
              </p>
            </div>
          </div>

          <!-- Overall Quick Save Action -->
          <div class="w-full sm:w-auto flex items-center justify-end">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all font-cairo flex items-center justify-center gap-2 cursor-pointer">
              @if (isSaving()) {
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري الحفظ...</span>
              } @else {
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>حفظ التعديلات / Save Changes</span>
              }
            </button>
          </div>
        </div>

        <!-- SUCCESS TOAST BANNER -->
        @if (toastMessage()) {
          <div class="mx-6 mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold font-cairo flex items-center justify-between animate-fade-in">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ toastMessage() }}</span>
            </div>
            <button type="button" (click)="toastMessage.set(null)" class="text-slate-400 hover:text-white text-sm font-bold">×</button>
          </div>
        }
      </div>

      <!-- TAB NAVIGATION BAR -->
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto font-cairo shadow-lg">
        <button type="button" (click)="selectTab(1)"
          [class.bg-indigo-600]="activeTab() === 1"
          [class.text-white]="activeTab() === 1"
          [class.shadow-md]="activeTab() === 1"
          [class.text-slate-400]="activeTab() !== 1"
          [class.hover:text-slate-200]="activeTab() !== 1"
          [class.hover:bg-slate-800/60]="activeTab() !== 1"
          class="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
          </svg>
          <span>1. بيانات الشركة والحساب</span>
        </button>

        <button type="button" (click)="selectTab(2)"
          [class.bg-indigo-600]="activeTab() === 2"
          [class.text-white]="activeTab() === 2"
          [class.shadow-md]="activeTab() === 2"
          [class.text-slate-400]="activeTab() !== 2"
          [class.hover:text-slate-200]="activeTab() !== 2"
          [class.hover:bg-slate-800/60]="activeTab() !== 2"
          class="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>2. البيانات القانونية والاتصال</span>
        </button>

        <button type="button" (click)="selectTab(3)"
          [class.bg-indigo-600]="activeTab() === 3"
          [class.text-white]="activeTab() === 3"
          [class.shadow-md]="activeTab() === 3"
          [class.text-slate-400]="activeTab() !== 3"
          [class.hover:text-slate-200]="activeTab() !== 3"
          [class.hover:bg-slate-800/60]="activeTab() !== 3"
          class="flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>3. الموقع والجغرافيا</span>
        </button>
      </div>

      <!-- MAIN FORM CONTAINER -->
      <form [formGroup]="profileForm" (ngSubmit)="saveCurrentTab()" class="space-y-6">

        <!-- TAB 1: COMPANY & ACCOUNT DATA -->
        <div [hidden]="activeTab() !== 1" class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl font-cairo">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                بيانات الشركة والحساب الأساسية / Company & Account Details
              </h3>
              <p class="text-[11px] text-slate-400">إدارة معلومات الكيان، اسم المؤسسة والاتصال الأساسي</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Company Name -->
            <div>
              <label for="prof-name" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                اسم الشركة / Company Name <span class="text-rose-400">*</span>
              </label>
              <input id="prof-name" type="text" formControlName="name" placeholder="أدخل اسم الشركة"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all">
            </div>

            <!-- Admin Email (Readonly) -->
            <div>
              <label for="prof-email" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                البريد الإلكتروني للآدمن / Admin Email
              </label>
              <input id="prof-email" type="email" [value]="tenantData()?.adminEmail || auth.currentUser()?.email || 'N/A'" readonly disabled
                class="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-400 text-xs cursor-not-allowed">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Personal Phone -->
            <div>
              <label for="prof-personal-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                رقم الهاتف الشخصي / Personal Phone
              </label>
              <input id="prof-personal-phone" type="tel" formControlName="personalPhone" maxlength="11" placeholder="01xxxxxxxxx"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>

            <!-- WhatsApp Phone -->
            <div>
              <label for="prof-whatsapp-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                رقم الواتساب / WhatsApp Phone
              </label>
              <input id="prof-whatsapp-phone" type="tel" formControlName="whatsAppPhone" maxlength="11" placeholder="01xxxxxxxxx"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>
          </div>

          <div class="col-span-1 sm:col-span-2">
            <!-- ═══════════ SUBSCRIPTION PREMIUM CARD ═══════════ -->
            <div class="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-5 shadow-2xl">
              <!-- Background glow -->
              <div class="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-indigo-600/20 blur-2xl pointer-events-none"></div>
              <div class="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-violet-600/20 blur-2xl pointer-events-none"></div>

              <div class="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <!-- Plan Info -->
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <div class="p-1.5 rounded-lg bg-indigo-500/20">
                      <svg class="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/>
                      </svg>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-indigo-400">الاشتراك الحالي / Subscription</span>
                  </div>
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-black text-white">{{ tenantData()?.subscriptionPlan || 'Free' }}</span>
                    <span class="text-xs font-bold text-slate-400">Plan</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex items-center gap-1 text-xs text-slate-300">
                      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"/>
                      </svg>
                      @if ((tenantData()?.maxActiveProjects ?? 2) === -1) {
                        <span>مشاريع غير محدودة</span>
                      } @else {
                        <span>{{ tenantData()?.maxActiveProjects ?? 2 }} مشاريع نشطة</span>
                      }
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <!-- Upgrade Plan Button -->
                  @if ((tenantData()?.subscriptionPlan || 'Free') !== 'Enterprise') {
                    <button type="button" id="btn-upgrade-plan" (click)="openPlanModal()"
                      class="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 cursor-pointer">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                      </svg>
                      ترقية الباقة / Upgrade Plan
                    </button>
                  }
                  <!-- Add Extra Projects Button -->
                  @if ((tenantData()?.maxActiveProjects ?? 2) !== -1) {
                    <button type="button" id="btn-add-extra" (click)="openTopUpModal()"
                      class="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer">
                      <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                      </svg>
                      شحن مشاريع إضافية / +Add Projects
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>


          <!-- Company Description -->
          <div>
            <label for="prof-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              وصف الشركة والنشاط / Company Description
            </label>
            <textarea id="prof-desc" formControlName="companyDescription" rows="3" placeholder="نبذة مختصرة عن نشاط الشركة وخدماتها..."
              class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none"></textarea>
          </div>

          <!-- Tab 1 Footer Actions -->
          <div class="flex items-center justify-end pt-3 border-t border-slate-800">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span>حفظ بيانات الحساب / Save Tab 1</span>
            </button>
          </div>
        </div>

        <!-- TAB 2: LEGAL & CONTACT DATA -->
        <div [hidden]="activeTab() !== 2" class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl font-cairo">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                البيانات القانونية والوثائق / Legal Information & Documents
              </h3>
              <p class="text-[11px] text-slate-400">تحديث المحافظة والمستندات الرسمية والسجلات</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Governorate Dropdown (Strict Binding Fix) -->
            <div>
              <label for="prof-gov" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                المحافظة / Governorate <span class="text-rose-400">*</span>
              </label>
              <select id="prof-gov" formControlName="governorateId"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                <option value="">-- اختر المحافظة / Select Governorate --</option>
                @for (gov of governorates; track gov.id) {
                  <option [value]="gov.id">{{ gov.label }}</option>
                }
              </select>
            </div>

            <!-- Commercial Register -->
            <div>
              <label for="prof-cr" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                رقم السجل التجاري / Commercial Register
              </label>
              <input id="prof-cr" type="text" formControlName="commercialRegister" placeholder="مثال: 102030"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Tax Card -->
            <div>
              <label for="prof-tax" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                البطاقة الضريبية / Tax Card
              </label>
              <input id="prof-tax" type="text" formControlName="taxCard" placeholder="مثال: 334-556-789"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>

            <!-- National ID -->
            <div>
              <label for="prof-nat" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                الرقم القومي للمالك / National ID
              </label>
              <input id="prof-nat" type="text" formControlName="nationalId" maxlength="14" placeholder="14 رقم قومي"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>

            <!-- Syndicate ID -->
            <div>
              <label for="prof-syn" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                رقم كارنيه النقابة / Syndicate ID
              </label>
              <input id="prof-syn" type="text" formControlName="syndicateId" placeholder="رقم القيد النقابي"
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
            </div>
          </div>

          <!-- Tab 2 Footer Actions -->
          <div class="flex items-center justify-end pt-3 border-t border-slate-800">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span>حفظ البيانات القانونية / Save Tab 2</span>
            </button>
          </div>
        </div>

        <!-- TAB 3: LOCATION & GEOGRAPHY -->
        <div [hidden]="activeTab() !== 3" class="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl font-cairo">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                الموقع والجغرافيا / Location & Geolocation
              </h3>
              <p class="text-[11px] text-slate-400">تحديد العنوان الدقيق وموقع المكاتب والفروع عبر الخريطة</p>
            </div>
          </div>

          <!-- Manual Address Field -->
          <div>
            <label for="prof-address" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              العنوان التفصيلي / Manual Address
            </label>
            <input id="prof-address" type="text" formControlName="manualAddress" placeholder="اسم الشارع، المبنى، رقم الدور، الحي..."
              class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all">
          </div>

          <!-- Interactive Map Header & Search -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                تحديد الموقع على الخريطة / Drop Pin Map Selector
              </label>
              @if (profileForm.get('latitude')?.value && profileForm.get('longitude')?.value) {
                <span class="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  Lat: {{ profileForm.get('latitude')?.value | number:'1.4-6' }} | Lng: {{ profileForm.get('longitude')?.value | number:'1.4-6' }}
                </span>
              }
            </div>

            <!-- Map Search Input -->
            <div class="relative">
              <input type="text" [value]="mapSearchQuery" (input)="onMapSearchChange($event)" (keydown.enter)="onMapSearchSubmit()"
                placeholder="ابحث عن منطقة أو عنوان لتحديد الخريطة (مثال: المعادي، التجمع)..."
                class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all pr-10">
              <button type="button" (click)="onMapSearchSubmit()" class="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-white flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <!-- Search Results Dropdown -->
            @if (mapSearchResults().length > 0) {
              <div class="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
                @for (result of mapSearchResults(); track result.display_name) {
                  <button type="button" (click)="selectMapSearchResult(result)" 
                    class="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-slate-900 border-b border-slate-800/80 last:border-b-0 transition-colors font-cairo flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span class="truncate">{{ result.display_name }}</span>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Leaflet Container -->
          <div #profileMapContainer 
     style="height: 380px; width: 100%; min-height: 380px;" 
     [hidden]="activeTab() !== 3" 
     class="w-full h-[380px] min-h-[380px] rounded-xl border border-slate-800 overflow-hidden shadow-inner bg-slate-900 block relative">
</div>

          <!-- Map Location URL -->
          <div>
            <label for="prof-map-url" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              رابط خرائط جوجل (اختر اختياري) / Google Maps Link
            </label>
            <input id="prof-map-url" type="url" formControlName="mapLocationUrl" (input)="onMapUrlInputChange($event)" placeholder="https://maps.google.com/..."
              class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
          </div>

          <!-- Tab 3 Footer Actions -->
          <div class="flex items-center justify-end pt-3 border-t border-slate-800">
            <button type="button" (click)="saveCurrentTab()" [disabled]="isSaving()" 
              class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
              <span>حفظ بيانات الموقع والجغرافيا / Save Tab 3</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- SUCCESS FLOATING TOAST -->
    @if (toastMessage()) {
      <div class="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 px-5 py-3.5 bg-emerald-600/95 backdrop-blur-md border border-emerald-400/30 text-white rounded-2xl shadow-2xl font-cairo text-sm max-w-md animate-slide-in">
        <div class="p-1.5 bg-emerald-500/30 rounded-xl text-white shrink-0">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span class="font-bold">{{ toastMessage() }}</span>
        <button type="button" (click)="toastMessage.set(null)" class="text-white/80 hover:text-white text-base font-bold ml-2">×</button>
      </div>
    }

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- MODAL 1 — PLAN SELECTION MODAL                                  -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    @if (showPlanModal()) {
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" (click)="closePlanModal()">
        <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800">
            <div>
              <h3 class="text-base font-black text-white font-cairo">اختر الباقة المناسبة / Choose Your Plan</h3>
              <p class="text-[11px] text-slate-400 font-cairo mt-0.5">جميع الأسعار بالجنيه المصري شاملة ضريبة القيمة المضافة 14%</p>
            </div>
            <button type="button" (click)="closePlanModal()" id="btn-close-plan-modal"
              class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Plan Cards -->
          <div class="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-y-auto min-h-0">
            @for (plan of availablePlans(); track plan.id) {
              <div (click)="selectPlan(plan)"
                [class.ring-2]="selectedPlan()?.id === plan.id"
                [class.ring-indigo-500]="selectedPlan()?.id === plan.id"
                [class.bg-indigo-950]="selectedPlan()?.id === plan.id"
                [class.border-indigo-500]="selectedPlan()?.id === plan.id"
                [class.opacity-40]="isCurrentPlan(plan.id)"
                [class.cursor-not-allowed]="isCurrentPlan(plan.id)"
                [class.cursor-pointer]="!isCurrentPlan(plan.id)"
                class="relative p-4 bg-slate-950 border border-slate-800 rounded-xl transition-all duration-200 hover:border-slate-600">

                <!-- Current Plan Badge -->
                @if (isCurrentPlan(plan.id)) {
                  <span class="absolute -top-2 left-3 text-[10px] font-bold px-2 py-0.5 bg-emerald-500 text-white rounded-full">الباقة الحالية</span>
                }
                @if (plan.id === 'Enterprise') {
                  <span class="absolute -top-2 right-3 text-[10px] font-bold px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full">⭐ الأفضل</span>
                }

                <div class="mb-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                    [class.bg-slate-700]="plan.id === 'Free'"
                    [class.bg-indigo-600]="plan.id === 'Pro'"
                    [class.bg-gradient-to-br]="plan.id === 'Enterprise'"
                    [class.from-amber-500]="plan.id === 'Enterprise'"
                    [class.to-orange-600]="plan.id === 'Enterprise'">
                    @if (plan.id === 'Free') {
                      <svg class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    } @else if (plan.id === 'Pro') {
                      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    } @else {
                      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
                    }
                  </div>
                  <h4 class="text-sm font-black text-white">{{ plan.nameEn }}</h4>
                  <p class="text-[10px] text-slate-400 mt-0.5">{{ plan.nameAr }}</p>
                </div>

                <div class="mb-3">
                  @if (plan.priceEgp === 0) {
                    <span class="text-lg font-black text-emerald-400">مجاني</span>
                  } @else {
                    <div>
                      <span class="text-lg font-black text-white">{{ plan.priceWithVat | number:'1.0-0' }}</span>
                      <span class="text-xs text-slate-400 mr-1">ج.م / شهر</span>
                    </div>
                    <span class="text-[10px] text-slate-500">(شامل 14% ضريبة)</span>
                  }
                </div>

                <p class="text-[11px] text-slate-400 leading-relaxed">{{ plan.description }}</p>
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between p-5 border-t border-slate-800">
            <button type="button" (click)="closePlanModal()" class="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors font-cairo cursor-pointer">إلغاء</button>
            <button type="button" id="btn-proceed-checkout" (click)="proceedToCheckout('upgrade')"
              [disabled]="!selectedPlan() || isCurrentPlan(selectedPlan()?.id || '')"
              class="px-7 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-600/40 transition-all flex items-center gap-2 cursor-pointer">
              <!-- Cart / Buy Icon -->
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              شراء الباقة / Buy Plan
            </button>
          </div>
        </div>
      </div>
    }

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- MODAL 2 — ADD-ON TOP-UP MODAL                                   -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    @if (showTopUpModal()) {
      <div class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" (click)="closeTopUpModal()">
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col" (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800">
            <div>
              <h3 class="text-base font-black text-white font-cairo">شحن مشاريع إضافية / Add Extra Projects</h3>
              <p class="text-[11px] text-slate-400 font-cairo mt-0.5">تُضاف فوراً فوق سعتك الحالية ({{ tenantData()?.maxActiveProjects ?? 2 }} مشروع)</p>
            </div>
            <button type="button" (click)="closeTopUpModal()" id="btn-close-topup-modal"
              class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Free Plan Info Badge -->
          <div class="mx-5 mt-4 flex items-center gap-2.5 p-3 bg-slate-800/60 border border-slate-700 rounded-xl">
            <div class="p-1.5 rounded-lg bg-slate-700">
              <svg class="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <p class="text-[10px] text-slate-300 font-cairo leading-relaxed">
              الباقة المجانية تشمل مشروعين مدى الحياة. المشروع المنتهي أو المغلق يستهلك الرصيد بشكل دائم.
            </p>
          </div>

          <!-- Top-Up Options -->
          <div class="p-5 space-y-3 overflow-y-auto min-h-0">
            @for (opt of availableTopUps(); track opt.extra) {
              <div (click)="selectTopUp(opt)"
                [class.ring-2]="selectedTopUp()?.extra === opt.extra"
                [class.ring-emerald-500]="selectedTopUp()?.extra === opt.extra"
                [class.bg-emerald-950]="selectedTopUp()?.extra === opt.extra"
                [class.border-emerald-500]="selectedTopUp()?.extra === opt.extra"
                class="p-4 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer transition-all duration-200 hover:border-slate-600 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-sm font-black text-white">{{ opt.label }}</span>
                    <p class="text-[10px] text-slate-400 mt-0.5">يصبح الإجمالي: {{ (tenantData()?.maxActiveProjects ?? 2) + opt.extra }} مشاريع</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-base font-black text-white">{{ opt.priceWithVat | number:'1.0-0' }}</div>
                  <div class="text-[10px] text-slate-400">ج.م شامل ضريبة</div>
                </div>
              </div>
            }

            <!-- Contact Admin Card (for > 5 projects) -->
            <a href="mailto:admin@structo.app" target="_blank"
              class="block p-4 bg-slate-950 border border-dashed border-amber-500/40 hover:border-amber-400/70 rounded-xl transition-all duration-200 group">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <span class="text-sm font-black text-amber-300">أكثر من 5 مشاريع / Need More?</span>
                    <p class="text-[10px] text-slate-400 mt-0.5">تواصل مع الإدارة للحصول على عرض مخصص</p>
                  </div>
                </div>
                <div class="flex items-center gap-1 text-[10px] text-amber-400 font-bold group-hover:gap-2 transition-all">
                  اتصل بنا
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </div>
            </a>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between p-5 border-t border-slate-800">
            <button type="button" (click)="closeTopUpModal()" class="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors font-cairo cursor-pointer">إلغاء</button>
            <button type="button" id="btn-proceed-topup" (click)="proceedToCheckout('topup')"
              [disabled]="!selectedTopUp()"
              class="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/40 transition-all flex items-center gap-2 cursor-pointer">
              <!-- Cart / Buy Icon -->
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              شراء الحزمة / Buy Package
            </button>
          </div>
        </div>
      </div>
    }

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- MODAL 3 — MOCK CHECKOUT SCREEN                                  -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    @if (showCheckoutModal()) {
      <div class="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
        <div class="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-indigo-600">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-black text-white font-cairo">بوابة الدفع التجريبية / Mock Checkout</h3>
                <p class="text-[10px] text-slate-400 font-cairo">آمن ومشفر • SSL Encrypted</p>
              </div>
            </div>
            @if (!isProcessingPayment()) {
              <button type="button" (click)="closeCheckoutModal()" class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            }
          </div>

          <!-- Checkout Body -->
          <div class="p-5 space-y-5 overflow-y-auto min-h-0">

            <!-- Order Summary -->
            <div class="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">ملخص الطلب / Order Summary</h4>
              <div class="flex justify-between text-xs">
                <span class="text-slate-300">{{ checkoutSummary().description }}</span>
                <span class="text-white font-bold">{{ checkoutSummary().amount | number:'1.0-2' }} ج.م</span>
              </div>
              <div class="flex justify-between text-xs">
                <span class="text-slate-400">ضريبة القيمة المضافة (14%)</span>
                <span class="text-slate-300">{{ checkoutSummary().taxAmount | number:'1.0-2' }} ج.م</span>
              </div>
              <div class="border-t border-slate-700 pt-2 flex justify-between">
                <span class="text-sm font-black text-white">الإجمالي</span>
                <span class="text-sm font-black text-indigo-300">{{ checkoutSummary().totalAmount | number:'1.0-2' }} ج.م</span>
              </div>
            </div>

            <!-- Mock Card Fields -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400">بيانات الكارت (تجريبي) / Card Details (Test Mode)</h4>

              <!-- Card Number -->
              <div>
                <label for="mock-card-num" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">رقم الكارت / Card Number</label>
                <div class="relative">
                  <input id="mock-card-num" type="text" [value]="mockCardNumber" (input)="onMockCardInput($event)"
                    maxlength="19" placeholder="4242 4242 4242 4242"
                    class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono tracking-wider pr-10"
                    [disabled]="isProcessingPayment()">
                  <div class="absolute inset-y-0 right-3 flex items-center">
                    <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-[10px] text-indigo-400 mt-1">💡 استخدم: 4242 4242 4242 4242</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <!-- Expiry -->
                <div>
                  <label for="mock-expiry" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">تاريخ الانتهاء</label>
                  <input id="mock-expiry" type="text" [value]="mockExpiry" (input)="onMockExpiryInput($event)"
                    maxlength="5" placeholder="MM/YY"
                    class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono"
                    [disabled]="isProcessingPayment()">
                </div>
                <!-- CVC -->
                <div>
                  <label for="mock-cvc" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">CVC</label>
                  <input id="mock-cvc" type="password" [(ngModel)]="mockCvc" maxlength="4" placeholder="•••"
                    class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-mono"
                    [disabled]="isProcessingPayment()">
                </div>
              </div>
            </div>

            <!-- Test Mode Badge -->
            <div class="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-[10px] text-amber-300 font-cairo">هذه بوابة دفع تجريبية — لن يتم خصم أي مبالغ حقيقية</span>
            </div>
          </div>

          <!-- Checkout Footer -->
          <div class="p-5 border-t border-slate-800">
            <button type="button" id="btn-process-payment" (click)="processPayment()"
              [disabled]="isProcessingPayment()"
              class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60 text-white font-black text-sm rounded-xl shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer">
              @if (isProcessingPayment()) {
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري المعالجة... / Processing...</span>
              } @else {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>إتمام الدفع التجريبي / Process Test Payment</span>
              }
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    /* 🛑 استيراد ملف Leaflet CSS مباشرة عشان يشتغل مع ViewEncapsulation.None */
    @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';

    .font-cairo {
      font-family: 'Cairo', 'Inter', sans-serif;
    }
    
    /* 🛑 تجبير الـ Leaflet Container والـ Tiles على الظهور */
    .leaflet-container {
      height: 380px !important;
      min-height: 380px !important;
      width: 100% !important;
      background-color: #0f172a !important;
      z-index: 1 !important;
    }

    .leaflet-tile-container img {
      width: 256px !important;
      height: 256px !important;
    }

    /* 🛰️ تنسيق زر التبديل بين الشوارع والقمر الصناعي */
    .leaflet-control-layers {
      background-color: #0f172a !important;
      color: #f8fafc !important;
      border: 1px solid #334155 !important;
      border-radius: 0.75rem !important;
      padding: 6px 12px !important;
      font-family: 'Cairo', sans-serif !important;
      font-size: 12px !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
    }
    .leaflet-control-layers-expanded {
      background-color: #0f172a !important;
      color: #f8fafc !important;
    }
    .leaflet-control-layers-base label {
      display: flex !important;
      items-center: center !important;
      gap: 6px !important;
      margin-bottom: 4px !important;
      cursor: pointer !important;
    }

    @keyframes slide-in-toast {
      from { opacity: 0; transform: translateY(12px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-slide-in {
      animation: slide-in-toast 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
  `]
})
export class TenantProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly profileService = inject(TenantProfileService);
  public readonly auth = inject(AuthService);
  private readonly imageUploadService = inject(ImageUploadService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly cdr = inject(ChangeDetectorRef);

  @ViewChild('profileMapContainer', { static: false }) profileMapContainer?: ElementRef<HTMLDivElement>;

  readonly governorates = EGYPT_GOVERNORATES;
  readonly activeTab = signal<1 | 2 | 3>(1);
  readonly tenantData = signal<TenantDto | null>(null);
  readonly isSaving = signal(false);
  readonly isUploadingLogo = signal(false);
  readonly isUploadingBanner = signal(false);
  readonly toastMessage = signal<string | null>(null);

  readonly mapSearchResults = signal<MapSearchResult[]>([]);
  mapSearchQuery = '';
  private mapSearchTimeout: ReturnType<typeof setTimeout> | null = null;
  private profileMap: any = null;
  private profileMarker: any = null;
  private currentLatLng = { lat: 30.0444, lng: 31.2357 };

  // ── Subscription Modal Signals ──────────────────────────────
  readonly showPlanModal      = signal(false);
  readonly showTopUpModal     = signal(false);
  readonly showCheckoutModal  = signal(false);
  readonly isProcessingPayment = signal(false);
  readonly selectedPlan       = signal<SubscriptionPlanInfo | null>(null);
  readonly selectedTopUp      = signal<SubscriptionTopUpInfo | null>(null);
  readonly availablePlans     = signal<SubscriptionPlanInfo[]>([]);
  readonly availableTopUps    = signal<SubscriptionTopUpInfo[]>([]);
  private checkoutMode: 'upgrade' | 'topup' = 'upgrade';

  // Mock card fields (tightly scoped to checkout)
  mockCardNumber = '4242 4242 4242 4242';
  mockExpiry     = '12/29';
  mockCvc        = '123';

  readonly checkoutSummary = computed(() => {
    if (this.checkoutMode === 'upgrade' && this.selectedPlan()) {
      const p = this.selectedPlan()!;
      return {
        description: `ترقية إلى باقة ${p.nameEn} / Upgrade to ${p.nameEn}`,
        amount:      p.priceEgp,
        taxAmount:   Math.round(p.priceEgp * 0.14 * 100) / 100,
        totalAmount: p.priceWithVat
      };
    }
    if (this.checkoutMode === 'topup' && this.selectedTopUp()) {
      const t = this.selectedTopUp()!;
      return {
        description: `إضافة ${t.extra} مشاريع / Add ${t.extra} Extra Projects`,
        amount:      t.priceEgp,
        taxAmount:   Math.round(t.priceEgp * 0.14 * 100) / 100,
        totalAmount: t.priceWithVat
      };
    }
    return { description: '', amount: 0, taxAmount: 0, totalAmount: 0 };
  });

  profileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    logoUrl: [''],
    bannerUrl: [''],
    companyDescription: [''],
    personalPhone: [''],
    whatsAppPhone: [''],
    governorateId: [''],
    location: [''],
    commercialRegister: [''],
    taxCard: [''],
    nationalId: [''],
    syndicateId: [''],
    manualAddress: [''],
    mapLocationUrl: [''],
    latitude: [null],
    longitude: [null]
  });

  ngOnInit(): void {
    this.loadProfile();
    this.loadSubscriptionPlans();
  }

  ngAfterViewInit(): void {
    if (this.activeTab() === 3) {
      this.cdr.detectChanges();
      setTimeout(() => this.initMap(), 200);
    }
  }

  ngOnDestroy(): void {
    if (this.profileMap) {
      this.profileMap.remove();
      this.profileMap = null;
    }
  }

  selectTab(tab: 1 | 2 | 3 | string): void {
    const targetTab = typeof tab === 'string' ? (tab === 'location' ? 3 : (parseInt(tab, 10) || 1)) : tab;
    this.activeTab.set(targetTab as 1 | 2 | 3);
    if (targetTab === 3 || tab === 'location') {
      this.cdr.detectChanges(); // 🛑 إجبار Angular على رندر الـ HTML Element الخاص بالـ Tab 3
      setTimeout(() => {
        this.initMap();
        if (this.profileMap) {
          this.profileMap.invalidateSize();
        }
      }, 200);
    }
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const tenant = res.data;
          this.tenantData.set(tenant);

          const resolvedGov = this.resolveGovernorateId(tenant.governorateId || tenant.location || tenant.region);

          this.profileForm.patchValue({
            name: tenant.name || '',
            logoUrl: tenant.logoUrl || '',
            bannerUrl: tenant.bannerUrl || '',
            companyDescription: tenant.companyDescription || '',
            personalPhone: tenant.personalPhone || '',
            whatsAppPhone: tenant.whatsAppPhone || '',
            governorateId: resolvedGov,
            location: resolvedGov,
            commercialRegister: tenant.commercialRegister || '',
            taxCard: tenant.taxCard || '',
            nationalId: tenant.nationalId || '',
            syndicateId: tenant.syndicateId || '',
            manualAddress: tenant.manualAddress || tenant.address || '',
            mapLocationUrl: tenant.mapLocationUrl || ((tenant.latitude || tenant.lat) && (tenant.longitude || tenant.lng) ? `https://www.google.com/maps/search/?api=1&query=${tenant.latitude ?? tenant.lat},${tenant.longitude ?? tenant.lng}` : ''),
            latitude: tenant.latitude ?? tenant.lat ?? null,
            longitude: tenant.longitude ?? tenant.lng ?? null
          });

          if (tenant.latitude && tenant.longitude) {
            this.currentLatLng = { lat: tenant.latitude, lng: tenant.longitude };
          }
        }
      },
      error: (err) => {
        console.error('Error fetching tenant profile:', err);
      }
    });
  }

  resolveGovernorateId(rawValue: string | null | undefined): string {
    if (!rawValue) return '';
    const clean = rawValue.trim().toLowerCase();
    const match = EGYPT_GOVERNORATES.find(gov =>
      gov.id.toLowerCase() === clean ||
      gov.nameEn.toLowerCase() === clean ||
      gov.nameAr.toLowerCase() === clean ||
      gov.label.toLowerCase().includes(clean)
    );
    return match ? match.id : rawValue;
  }

  resolveGovernorateLabel(rawValue: string | null | undefined): string {
    const resolved = this.resolveGovernorateId(rawValue);
    const gov = EGYPT_GOVERNORATES.find(g => g.id === resolved);
    return gov ? gov.label : rawValue || '';
  }

  saveCurrentTab(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    const formVal = this.profileForm.value;
    const resolvedGov = this.resolveGovernorateId(formVal.governorateId || formVal.location);

    const dto: TenantProfileUpdateDto = {
      name: formVal.name,
      logoUrl: formVal.logoUrl,
      bannerUrl: formVal.bannerUrl,
      companyDescription: formVal.companyDescription,
      personalPhone: formVal.personalPhone || null,
      whatsAppPhone: formVal.whatsAppPhone || null,
      governorateId: resolvedGov,
      location: resolvedGov,
      region: resolvedGov,
      commercialRegister: formVal.commercialRegister || null,
      taxCard: formVal.taxCard || null,
      nationalId: formVal.nationalId || null,
      syndicateId: formVal.syndicateId || null,
      manualAddress: formVal.manualAddress || null,
      address: formVal.manualAddress || null,
      mapLocationUrl: formVal.mapLocationUrl || null,
      latitude: formVal.latitude ?? null,
      longitude: formVal.longitude ?? null,
      lat: formVal.latitude ?? null,
      lng: formVal.longitude ?? null
    };

    this.profileService.updateProfile(dto).subscribe({
      next: (res) => {
        this.isSaving.set(false);
        if (res.success && res.data) {
          this.tenantData.set(res.data);
          const msg = 'تم حفظ تعديلات بروفايل الشركة بنجاح! / Profile updated successfully.';
          this.showToast(msg);
          this.toastService.show('نجاح / Success', msg, 'success');
          try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch {
            // fallback
          }
        } else {
          const errMsg = res.message || 'حدث خطأ أثناء الحفظ / Failed to update profile';
          this.showToast(errMsg);
          this.toastService.show('خطأ / Error', errMsg, 'error');
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        const errMsg = 'تعذر حفظ البيانات، يرجى التأكد من الاتصال بالشبكة.';
        this.showToast(errMsg);
        this.toastService.show('خطأ / Error', errMsg, 'error');
      }
    });
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set(null);
      }
    }, 4500);
  }

  // --- MAP FUNCTIONS ---
  private initMap(): void {
    try {
      console.log('1. initMap Called');
      console.log('2. isPlatformBrowser:', isPlatformBrowser(this.platformId));
      console.log('3. profileMapContainer:', this.profileMapContainer?.nativeElement);
      console.log('4. typeof L:', typeof L);

      if (!isPlatformBrowser(this.platformId)) return;
      if (!this.profileMapContainer?.nativeElement) return;
      if (typeof L === 'undefined') return;

      const lat = this.profileForm.get('latitude')?.value || this.currentLatLng.lat;
      const lng = this.profileForm.get('longitude')?.value || this.currentLatLng.lng;

      // Icon Setup
      const iconDefault = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      if (!this.profileMap) {
        // إنشاء الماب باستخدام nativeElement المباشر
        this.profileMap = L.map(this.profileMapContainer.nativeElement, {
          center: [lat, lng],
          zoom: 13,
          zoomControl: true
        });

        // Tile layers (Street Map & Satellite View)
        const streetMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        const satelliteMap = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: '&copy; Google Maps'
        });

        streetMap.addTo(this.profileMap);

        const baseMaps = {
          "🗺️ شوارع / Street": streetMap,
          "🛰️ قمر صناعي / Satellite": satelliteMap
        };

        L.control.layers(baseMaps, undefined, { position: 'topright' }).addTo(this.profileMap);

        this.profileMarker = L.marker([lat, lng], { draggable: true, icon: iconDefault }).addTo(this.profileMap);

        this.profileMarker.on('dragend', () => {
          const pos = this.profileMarker.getLatLng();
          this.updateCoords(pos.lat, pos.lng);
        });

        this.profileMap.on('click', (e: any) => {
          this.profileMarker.setLatLng(e.latlng);
          this.updateCoords(e.latlng.lat, e.latlng.lng);
        });
      }

      // الإنعاش السحري لإعادة رسم الأبعاد
      setTimeout(() => {
        if (this.profileMap) {
          this.profileMap.invalidateSize();
          this.profileMap.setView([lat, lng], 13);
          if (this.profileMarker) {
            this.profileMarker.setLatLng([lat, lng]);
          }
        }
      }, 200);

    } catch (err) {
      console.error('Leaflet Map Init Error:', err);
    }
  }

  private updateCoords(lat: number, lng: number): void {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    this.profileForm.patchValue({
      latitude: lat,
      longitude: lng,
      mapLocationUrl: googleMapsUrl
    });
    this.cdr.detectChanges();
  }

  onMapUrlInputChange(event: Event): void {
    const url = (event.target as HTMLInputElement).value;
    if (!url) return;

    const regex = /(?:q=|query=|@)(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        this.profileForm.patchValue({
          latitude: lat,
          longitude: lng
        });
        this.currentLatLng = { lat, lng };
        if (this.profileMap && this.profileMarker) {
          this.profileMap.setView([lat, lng], 14);
          this.profileMarker.setLatLng([lat, lng]);
        }
        this.cdr.detectChanges();
      }
    }
  }

  onMapSearchChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.mapSearchQuery = val;
    if (this.mapSearchTimeout) clearTimeout(this.mapSearchTimeout);
    if (!val || val.trim().length < 3) {
      this.mapSearchResults.set([]);
      return;
    }
    this.mapSearchTimeout = setTimeout(() => this.searchNominatim(val), 400);
  }

  onMapSearchSubmit(): void {
    if (this.mapSearchQuery && this.mapSearchQuery.trim().length >= 3) {
      this.searchNominatim(this.mapSearchQuery);
    }
  }

  private searchNominatim(query: string): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=eg&limit=5`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          this.mapSearchResults.set(data);
        }
      })
      .catch(() => this.mapSearchResults.set([]));
  }

  selectMapSearchResult(result: MapSearchResult): void {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    this.mapSearchResults.set([]);
    this.mapSearchQuery = result.display_name;

    if (!isNaN(lat) && !isNaN(lon)) {
      this.updateCoords(lat, lon);
      if (this.profileMap && this.profileMarker) {
        this.profileMap.setView([lat, lon], 14);
        this.profileMarker.setLatLng([lat, lon]);
      }
    }
  }

  // --- FILE UPLOAD HANDLERS ---
  onLogoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    this.isUploadingLogo.set(true);
    this.imageUploadService.uploadTenantLogo(file).subscribe({
      next: (res: any) => {
        this.isUploadingLogo.set(false);
        if (res.success && res.data?.url) {
          this.profileForm.patchValue({ logoUrl: res.data.url });
          this.saveCurrentTab();
        }
      },
      error: () => this.isUploadingLogo.set(false)
    });
  }

  onBannerFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    this.isUploadingBanner.set(true);
    this.imageUploadService.uploadTenantBanner(file).subscribe({
      next: (res: any) => {
        this.isUploadingBanner.set(false);
        if (res.success && res.data?.url) {
          this.profileForm.patchValue({ bannerUrl: res.data.url });
          this.saveCurrentTab();
        }
      },
      error: () => this.isUploadingBanner.set(false)
    });
  }

  // ─────────────────────────────────────────────────────────────
  // SUBSCRIPTION UPGRADE & MOCK PAYMENT METHODS
  // ─────────────────────────────────────────────────────────────

  private loadSubscriptionPlans(): void {
    this.profileService.getSubscriptionPlans().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.availablePlans.set(res.data.plans);
          this.availableTopUps.set(res.data.topups);
        }
      },
      error: () => {
        // Fallback hardcoded pricing (mirrors SubscriptionController.GetPlans)
        this.availablePlans.set([
          { id: 'Free',       nameAr: 'المجانية',   nameEn: 'Free',       maxProjects: 2,  priceEgp: 0,    priceWithVat: 0,       description: '2 مشاريع مدى الحياة — مجاني للأبد / 2 Lifetime Projects Free' },
          { id: 'Pro',        nameAr: 'الاحترافية', nameEn: 'Pro',        maxProjects: 10, priceEgp: 299,  priceWithVat: 340.86,  description: '10 مشاريع + الميزات المتقدمة / 10 Projects + Advanced Features' },
          { id: 'Enterprise', nameAr: 'المؤسسية',   nameEn: 'Enterprise', maxProjects: -1, priceEgp: 799,  priceWithVat: 910.86,  description: 'مشاريع غير محدودة + الأولوية / Unlimited + Priority Support' }
        ]);
        this.availableTopUps.set([
          { extra: 2, priceEgp: 500,  priceWithVat: 570,   label: '+2 مشاريع' },
          { extra: 5, priceEgp: 2500, priceWithVat: 2850,  label: '+5 مشاريع' }
        ]);
      }
    });
  }

  isCurrentPlan(planId: string): boolean {
    const current = (this.tenantData()?.subscriptionPlan || 'Free').toLowerCase();
    return current === planId.toLowerCase();
  }

  openPlanModal(): void {
    this.selectedPlan.set(null);
    this.showPlanModal.set(true);
  }

  closePlanModal(): void {
    this.showPlanModal.set(false);
  }

  openTopUpModal(): void {
    this.selectedTopUp.set(null);
    this.showTopUpModal.set(true);
  }

  closeTopUpModal(): void {
    this.showTopUpModal.set(false);
  }

  closeCheckoutModal(): void {
    this.showCheckoutModal.set(false);
  }

  selectPlan(plan: SubscriptionPlanInfo): void {
    if (this.isCurrentPlan(plan.id)) return;
    this.selectedPlan.set(plan);
  }

  selectTopUp(opt: SubscriptionTopUpInfo): void {
    this.selectedTopUp.set(opt);
  }

  proceedToCheckout(mode: 'upgrade' | 'topup'): void {
    this.checkoutMode = mode;
    if (mode === 'upgrade') this.showPlanModal.set(false);
    else this.showTopUpModal.set(false);
    // Reset mock card fields
    this.mockCardNumber = '4242 4242 4242 4242';
    this.mockExpiry     = '12/29';
    this.mockCvc        = '123';
    this.showCheckoutModal.set(true);
  }

  processPayment(): void {
    // Show processing spinner for 1.5s (mock processing delay)
    this.isProcessingPayment.set(true);

    setTimeout(() => {
      const req = this.checkoutMode === 'upgrade'
        ? { targetPlanId: this.selectedPlan()?.id, paymentMethod: 'TestCard' }
        : { extraProjectsCount: this.selectedTopUp()?.extra, paymentMethod: 'TestCard' };

      this.profileService.upgradeSubscription(req).subscribe({
        next: (res) => {
          this.isProcessingPayment.set(false);
          if (res.success && res.data) {
            // Close checkout modal
            this.showCheckoutModal.set(false);

            // Update tenant data immediately without reload
            const current = this.tenantData();
            if (current) {
              this.tenantData.set({
                ...current,
                subscriptionPlan:  res.data.newPlan,
                maxActiveProjects: res.data.newMaxActiveProjects
              });
            }

            // Show success toast
            const successMsg = this.checkoutMode === 'upgrade'
              ? `🎉 تمت الترقية إلى ${res.data.newPlan} بنجاح! REF: ${res.data.referenceNumber}`
              : `✅ تمت إضافة ${res.data.extraProjectsAdded} مشاريع! الإجمالي: ${res.data.newMaxActiveProjects} مشروع`;

            this.showToast(successMsg);
            this.toastService.show('نجاح / Success', successMsg, 'success');

            // Reset selections
            this.selectedPlan.set(null);
            this.selectedTopUp.set(null);
          } else {
            const errMsg = res.message || 'فشلت عملية الدفع — يرجى المحاولة مرة أخرى';
            this.showToast(errMsg);
            this.toastService.show('خطأ / Error', errMsg, 'error');
          }
        },
        error: (err) => {
          this.isProcessingPayment.set(false);
          const errMsg = 'تعذر إتمام العملية — تأكد من الاتصال بالشبكة';
          this.showToast(errMsg);
          this.toastService.show('خطأ / Error', errMsg, 'error');
        }
      });
    }, 1500); // 1.5s mock processing spinner
  }

  // Mock card input formatters
  onMockCardInput(event: Event): void {
    let val = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    val = val.match(/.{1,4}/g)?.join(' ') ?? val;
    this.mockCardNumber = val;
    (event.target as HTMLInputElement).value = val;
  }

  onMockExpiryInput(event: Event): void {
    let val = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
    this.mockExpiry = val;
    (event.target as HTMLInputElement).value = val;
  }
}
