import { Component, inject, signal, computed, effect, AfterViewInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { RateLimitService } from '../../../core/services/rate-limit.service';
import { ToastService } from '../../../core/services/toast.service';
import * as L from 'leaflet';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: string[];
}

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

@Component({
  selector: 'app-tenant-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      
      <!-- Left Side: Copy & Branding -->
      <div class="hidden md:flex md:w-4/12 bg-slate-900 border-r border-slate-800 p-8 lg:p-12 flex-col justify-between relative overflow-hidden">
        <!-- Abstract glowing orbs -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div class="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
          <div class="absolute bottom-[10%] -right-[20%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-10">
            <div class="h-10 w-10 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span class="text-white font-extrabold text-lg">S</span>
            </div>
            <span class="text-2xl font-bold tracking-tight text-white font-cairo">Structo</span>
          </div>

          <h1 class="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 font-cairo">
            منظومة التسجيل الآمنة والذكية
          </h1>
          <p class="text-slate-400 text-sm lg:text-base leading-relaxed mb-8 font-cairo">
            قم بتسجيل شركتك أو حسابك المستقل بسهولة في خطوات مدمجة مع نظام التحقق الجغرافي والأمان المتكامل.
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="h-7 w-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <h3 class="text-white font-bold text-xs font-cairo">عزل صارم للمستأجرين / Multi-Tenant Security</h3>
                <p class="text-slate-500 text-xs">بيانات شركتك معزولة بأمان تام باستخدام أحدث معايير JWT.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="h-7 w-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <h3 class="text-white font-bold text-xs font-cairo">تحقق جغرافي دقيق / Precise Geo-Tagging</h3>
                <p class="text-slate-500 text-xs">تحديد موقعك الفعلي على الخريطة لحفظ بيانتك القانونية الرسمية.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative z-10 pt-6">
          <p class="text-[11px] text-slate-600 font-mono">© 2026 Structo Platforms Inc.</p>
        </div>
      </div>

      <!-- Right Side: Compact Multi-Step Wizard -->
      <div class="w-full md:w-8/12 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-y-auto">
        <div class="w-full max-w-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          @if (isSuccess()) {
            <!-- Success Confirmation -->
            <div class="text-center py-8 animate-fade-in-up">
              <div class="h-20 w-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                <svg class="h-10 w-10 text-emerald-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-cairo">تم إرسال الطلب بنجاح!</h2>
              <p class="text-slate-300 text-sm leading-relaxed mb-8 font-cairo max-w-md mx-auto">
                تم تسجيل حساب شركتك بنجاح. حسابك حالياً بانتظار مراجعة وتفعيل مدير النظام. ستصلك إشعار فور تفعيل الحساب.
              </p>
              <button routerLink="/" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition-all font-cairo cursor-pointer">
                العودة للصفحة الرئيسية
              </button>
            </div>
          } @else {
            
            <!-- Header & Stepper -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h2 class="text-xl sm:text-2xl font-extrabold text-white font-cairo">تسجيل شركة جديدة / Company Registration</h2>
                  <p class="text-slate-400 text-xs font-cairo mt-1">الخطوة {{ currentStep() }} من 3 - استكمل البيانات المطلوبة أدناه</p>
                </div>
                <span class="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  Step {{ currentStep() }}/3
                </span>
              </div>

              <!-- Multi-Step Progress Stepper -->
              <div class="grid grid-cols-3 gap-2 py-2">
                <!-- Step 1 Indicator -->
                <button type="button" (click)="goToStep(1)" class="flex flex-col gap-1 text-right focus:outline-none cursor-pointer">
                  <div class="h-2 rounded-full transition-all duration-300"
                    [class.bg-indigo-500]="currentStep() >= 1"
                    [class.bg-slate-800]="currentStep() < 1"></div>
                  <span class="text-[10px] font-bold font-cairo"
                    [class.text-indigo-400]="currentStep() === 1"
                    [class.text-slate-400]="currentStep() !== 1">1. بيانات الحساب</span>
                </button>
                <!-- Step 2 Indicator -->
                <button type="button" (click)="goToStep(2)" class="flex flex-col gap-1 text-right focus:outline-none cursor-pointer">
                  <div class="h-2 rounded-full transition-all duration-300"
                    [class.bg-indigo-500]="currentStep() >= 2"
                    [class.bg-slate-800]="currentStep() < 2"></div>
                  <span class="text-[10px] font-bold font-cairo"
                    [class.text-indigo-400]="currentStep() === 2"
                    [class.text-slate-400]="currentStep() !== 2">2. البيانات القانونية</span>
                </button>
                <!-- Step 3 Indicator -->
                <button type="button" (click)="goToStep(3)" class="flex flex-col gap-1 text-right focus:outline-none cursor-pointer">
                  <div class="h-2 rounded-full transition-all duration-300"
                    [class.bg-indigo-500]="currentStep() >= 3"
                    [class.bg-slate-800]="currentStep() < 3"></div>
                  <span class="text-[10px] font-bold font-cairo"
                    [class.text-indigo-400]="currentStep() === 3"
                    [class.text-slate-400]="currentStep() !== 3">3. العنوان والموقع</span>
                </button>
              </div>
            </div>

            <!-- Standard Error Alert -->
            @if (errorMessage()) {
              <div class="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-400 font-medium">
                <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4" autocomplete="off">
              
              <!-- STEP 1: Company & Account Details -->
              @if (currentStep() === 1) {
                <div class="space-y-4 animate-fade-in">
                  <div class="border-b border-slate-800 pb-2">
                    <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider font-cairo">الخطوة 1: بيانات الشركة وحساب مدير النظام</h3>
                  </div>

                  <!-- Tenant Name -->
                  <div>
                    <label for="tenantName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                      اسم المستأجر / الشركة <span class="text-rose-400">*</span>
                    </label>
                    <input id="tenantName" type="text" formControlName="tenantName" placeholder="مثال: شركة المقاولات الحديثة" autocomplete="off" aria-autocomplete="none"
                      class="w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                      [class.border-rose-500]="isFieldInvalid('tenantName')"
                      [class.border-slate-800]="!isFieldInvalid('tenantName')">
                    @if (isFieldInvalid('tenantName')) {
                      <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ اسم الشركة مطلوب (حتى 100 حرف).</p>
                    }
                  </div>

                  <!-- Admin First & Last Name -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label for="adminFirstName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        الاسم الأول لمدير النظام <span class="text-rose-400">*</span>
                      </label>
                      <input id="adminFirstName" type="text" formControlName="adminFirstName" placeholder="أحمد" autocomplete="off" aria-autocomplete="none"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('adminFirstName')"
                        [class.border-slate-800]="!isFieldInvalid('adminFirstName')">
                      @if (isFieldInvalid('adminFirstName')) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ الاسم الأول مطلوب.</p>
                      }
                    </div>
                    <div>
                      <label for="adminLastName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        اسم العائلة لمدير النظام <span class="text-rose-400">*</span>
                      </label>
                      <input id="adminLastName" type="text" formControlName="adminLastName" placeholder="محمود" autocomplete="off" aria-autocomplete="none"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('adminLastName')"
                        [class.border-slate-800]="!isFieldInvalid('adminLastName')">
                      @if (isFieldInvalid('adminLastName')) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ اسم العائلة مطلوب.</p>
                      }
                    </div>
                  </div>

                  <!-- Email & Subscription Plan -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        البريد الإلكتروني الرسمي <span class="text-rose-400">*</span>
                      </label>
                      <input id="email" type="email" formControlName="email" placeholder="admin@company.com" autocomplete="off" aria-autocomplete="none"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('email') || !!emailError()"
                        [class.border-slate-800]="!isFieldInvalid('email') && !emailError()">
                      @if (emailError()) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ {{ emailError() }}</p>
                      } @else if (isFieldInvalid('email')) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ يرجى أدخال بريد إلكتروني صحيح.</p>
                      }
                    </div>

                    <div>
                      <label for="subscriptionPlan" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        خطة الاشتراك / Subscription Plan <span class="text-rose-400">*</span>
                      </label>
                      <select id="subscriptionPlan" formControlName="subscriptionPlan"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                        <option value="Free">Free Plan (2 Projects max)</option>
                        <option value="Standard">Standard Plan (10 Projects max)</option>
                        <option value="Premium">Premium Plan (50 Projects max)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Password & Strength Meter -->
                  <div>
                    <label for="password" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                      كلمة المرور / Password <span class="text-rose-400">*</span>
                    </label>
                    <div class="relative">
                      <input id="password" [type]="showPassword() ? 'text' : 'password'" formControlName="password" placeholder="••••••••" autocomplete="new-password"
                        class="w-full pl-3.5 pr-10 py-2.5 bg-slate-950 border rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('password')"
                        [class.border-slate-800]="!isFieldInvalid('password')">
                      <button type="button" (click)="togglePasswordVisibility()" class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none">
                        @if (showPassword()) {
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        } @else {
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        }
                      </button>
                    </div>

                    <!-- Password Strength Meter -->
                    <div class="mt-2 space-y-1 bg-slate-950/60 border border-slate-800 rounded-xl p-2">
                      <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden flex gap-0.5">
                        <div class="h-full rounded-full transition-all duration-300"
                          [style.width.%]="passwordStrength() * 25"
                          [class.bg-rose-500]="passwordStrength() <= 1"
                          [class.bg-amber-500]="passwordStrength() === 2"
                          [class.bg-emerald-500]="passwordStrength() >= 3">
                        </div>
                      </div>
                      <div class="flex justify-between items-center text-[10px] font-medium font-cairo">
                        <span class="text-slate-500">قوة كلمة المرور:</span>
                        <span [class.text-rose-400]="passwordStrength() <= 1"
                              [class.text-amber-400]="passwordStrength() === 2"
                              [class.text-emerald-400]="passwordStrength() >= 3">
                          {{ passwordStrength() <= 1 ? 'ضعيف (يتطلب أرقام وحروف وأحجام مختلفة)' : passwordStrength() === 2 ? 'متوسط' : 'قوي جداً ومقبول للتسجيل' }}
                        </span>
                      </div>
                    </div>

                    @if (isFieldInvalid('password')) {
                      <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.</p>
                    }
                  </div>
                </div>
              }

              <!-- STEP 2: Legal & Contact Information -->
              @if (currentStep() === 2) {
                <div class="space-y-4 animate-fade-in">
                  <div class="border-b border-slate-800 pb-2">
                    <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider font-cairo">الخطوة 2: البيانات القانونية وأرقام الاتصال</h3>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Account Type -->
                    <div>
                      <label for="accountType" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        نوع الحساب / Account Type <span class="text-rose-400">*</span>
                      </label>
                      <select id="accountType" formControlName="accountType"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                        <option value="Company">Company / شركة أو مؤسسة</option>
                        <option value="Freelancer">Freelancer / مستقل أو مهندس حر</option>
                      </select>
                    </div>

                    <!-- Governorate Location -->
                    <div>
                      <label for="location" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        المحافظة / Location <span class="text-rose-400">*</span>
                      </label>
                      <select id="location" formControlName="location"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('location')"
                        [class.border-slate-800]="!isFieldInvalid('location')">
                        <option value="" disabled selected>-- اختر المحافظة --</option>
                        <option value="Cairo">Cairo / القاهرة</option>
                        <option value="Giza">Giza / الجيزة</option>
                        <option value="Alexandria">Alexandria / الإسكندرية</option>
                        <option value="Qalyubia">Qalyubia / القليوبية</option>
                        <option value="Gharbia">Gharbia / الغربية</option>
                        <option value="Dakahlia">Dakahlia / الدقهلية</option>
                        <option value="Sharqia">Sharqia / الشرقية</option>
                        <option value="Monufia">Monufia / المنوفية</option>
                        <option value="Beheira">Beheira / البحيرة</option>
                        <option value="Kafr El Sheikh">Kafr El Sheikh / كفر الشيخ</option>
                        <option value="Damietta">Damietta / دمياط</option>
                        <option value="Port Said">Port Said / بورسعيد</option>
                        <option value="Ismailia">Ismailia / الإسماعيلية</option>
                        <option value="Suez">Suez / السويس</option>
                        <option value="Aswan">Aswan / أسوان</option>
                        <option value="Luxor">Luxor / الأقصر</option>
                        <option value="Red Sea">Red Sea / البحر الأحمر</option>
                        <option value="Matrouh">Matrouh / مطروح</option>
                      </select>
                      @if (isFieldInvalid('location')) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ اختار المحافظة مطلوب لتحديد بيئة الحساب.</p>
                      }
                    </div>
                  </div>

                  <!-- Contact Phone Numbers -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label for="personalPhone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        رقم الهاتف الشخصي / Personal Phone
                      </label>
                      <input id="personalPhone" type="tel" formControlName="personalPhone" inputmode="numeric" maxlength="11" placeholder="01xxxxxxxxx"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('personalPhone')">
                      @if (isFieldInvalid('personalPhone')) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ يجب أن يتكون من 11 رقماً ويبدأ بـ 01.</p>
                      }
                    </div>
                    <div>
                      <label for="whatsAppPhone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                        رقم الواتساب / WhatsApp Phone
                      </label>
                      <input id="whatsAppPhone" type="tel" formControlName="whatsAppPhone" inputmode="numeric" maxlength="11" placeholder="01xxxxxxxxx"
                        class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans"
                        [class.border-rose-500]="isFieldInvalid('whatsAppPhone')">
                      @if (isFieldInvalid('whatsAppPhone')) {
                        <p class="text-[11px] text-rose-400 mt-1 font-medium font-cairo">⚠️ يجب أن يتكون من 11 رقماً ويبدأ بـ 01.</p>
                      }
                    </div>
                  </div>

                  <!-- Company Dynamic Legal Inputs -->
                  @if (registerForm.get('accountType')?.value === 'Company') {
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label for="commercialRegister" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                          رقم السجل التجاري / Commercial Register
                        </label>
                        <input id="commercialRegister" type="text" formControlName="commercialRegister" placeholder="رقم السجل التجاري الرسمي"
                          class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                      </div>
                      <div>
                        <label for="taxCard" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                          الرقم الضريبي / Tax Card
                        </label>
                        <input id="taxCard" type="text" formControlName="taxCard" placeholder="رقم البطاقة الضريبية"
                          class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                      </div>
                    </div>
                  }

                  <!-- Freelancer Dynamic Legal Inputs -->
                  @if (registerForm.get('accountType')?.value === 'Freelancer') {
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label for="nationalId" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                          الرقم القومي (14 رقم) / National ID
                        </label>
                        <input id="nationalId" type="text" formControlName="nationalId" placeholder="14 رقم قومي"
                          class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                      </div>
                      <div>
                        <label for="syndicateId" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                          رقم عضوية النقابة / Syndicate ID
                        </label>
                        <input id="syndicateId" type="text" formControlName="syndicateId" placeholder="رقم القيد بنقابة المهندسين"
                          class="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                      </div>
                    </div>
                  }
                </div>
              }

              <!-- STEP 3: Location, Map & Final Confirmation -->
              @if (currentStep() === 3) {
                <div class="space-y-4 animate-fade-in">
                  <div class="border-b border-slate-800 pb-2">
                    <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider font-cairo">الخطوة 3: العنوان الفعلي وتحديد الخريطة والتأكيد</h3>
                  </div>

                  <!-- Physical Address & Map Launcher -->
                  <div>
                    <label for="manualAddress" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 font-cairo">
                      العنوان الفعلي المقر الرئيسي / Physical Address
                    </label>
                    <div class="flex gap-2">
                      <input id="manualAddress" type="text" formControlName="manualAddress" placeholder="أدخل العنوان التفصيلي أو حدد من الخريطة"
                        class="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-sans">
                      <button type="button" (click)="openMapModal()"
                        class="px-4 py-2.5 bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 hover:bg-indigo-900/50 transition-all rounded-xl text-xs font-bold font-cairo shrink-0 cursor-pointer flex items-center gap-1.5 shadow-md">
                        📍 الخريطة / Map
                      </button>
                    </div>
                    @if (registerForm.get('latitude')?.value) {
                      <div class="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[11px] text-emerald-400 font-mono flex items-center gap-2">
                        <span>✓ Map Pin Dropped: {{ registerForm.get('latitude')?.value }} , {{ registerForm.get('longitude')?.value }}</span>
                      </div>
                    }
                  </div>

                  <!-- Final Summary Confirmation Card -->
                  <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 text-xs font-cairo">
                    <h4 class="font-bold text-indigo-400 border-b border-slate-800/80 pb-1.5">مراجعة بيانات التسجيل النهائي:</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                      <div><span class="text-slate-500">اسم الشركة:</span> {{ registerForm.value.tenantName || 'غير محدد' }}</div>
                      <div><span class="text-slate-500">مدير النظام:</span> {{ registerForm.value.adminFirstName }} {{ registerForm.value.adminLastName }}</div>
                      <div><span class="text-slate-500">البريد الإلكتروني:</span> {{ registerForm.value.email || 'غير محدد' }}</div>
                      <div><span class="text-slate-500">نوع الحساب:</span> {{ registerForm.value.accountType }}</div>
                      <div><span class="text-slate-500">المحافظة:</span> {{ registerForm.value.location || 'غير محدد' }}</div>
                      <div><span class="text-slate-500">خطة الاشتراك:</span> {{ registerForm.value.subscriptionPlan }}</div>
                    </div>
                  </div>
                </div>
              }

              <!-- SUMMARY ERROR BANNER -->
              @if (showSummaryBanner() && getInvalidFieldLabels().length > 0) {
                <div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-cairo text-xs space-y-1 animate-slide-in">
                  <div class="font-bold flex items-center gap-1.5">
                    <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    <span>يرجى استكمال الحقول المطلوبة الكلية ({{ getInvalidFieldLabels().length }} حقل متبقي):</span>
                  </div>
                  <ul class="list-disc list-inside text-[11px] opacity-90 pr-2">
                    @for (label of getInvalidFieldLabels(); track $index) {
                      <li>{{ label }}</li>
                    }
                  </ul>
                </div>
              }

              <!-- STEP NAVIGATION & ACTION BUTTONS -->
              <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <!-- Back Button -->
                @if (currentStep() > 1) {
                  <button type="button" (click)="prevStep()"
                    class="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all font-cairo cursor-pointer">
                    السابق / Back
                  </button>
                } @else {
                  <div></div>
                }

                <!-- Next / Submit Button -->
                @if (currentStep() < 3) {
                  <button type="button" (click)="nextStep()"
                    class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all font-cairo cursor-pointer">
                    التالي / Next →
                  </button>
                } @else {
                  <button type="submit"
                    [disabled]="isLoading() || passwordStrength() < 3 || registerForm.invalid || rateLimitService.isLockedOut()"
                    class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] flex items-center justify-center font-cairo cursor-pointer">
                    @if (rateLimitService.isLockedOut()) {
                      <div class="flex items-center space-x-2 rtl:space-x-reverse text-amber-300 font-bold">
                        <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>محظور مؤقتاً ({{ rateLimitService.cooldownSeconds() }}ث)...</span>
                      </div>
                    } @else if (isLoading()) {
                      <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span class="mr-2">جاري التسجيل...</span>
                    } @else {
                      إنشاء الحساب / Complete Registration
                    }
                  </button>
                }
              </div>

              <p class="text-center text-xs text-slate-500 mt-4 font-cairo">
                لديك حساب بالفعل؟ 
                <a routerLink="/login" class="text-indigo-400 font-bold hover:underline">تسجيل الدخول هنا</a>
              </p>

            </form>
          }
        </div>
      </div>
    </div>

    <!-- MAP SELECTOR MODAL -->
    @if (isMapModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4">
        <!-- Backdrop -->
        <div (click)="closeMapModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[92vh] flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl font-cairo">
          <!-- Header -->
          <div class="p-4 border-b border-slate-900 flex justify-between items-center">
            <h3 class="text-sm font-bold text-white">تحديد الموقع الجغرافي / Drop Pin on Map</h3>
            <button type="button" (click)="closeMapModal()" class="text-slate-500 hover:text-white">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto">
            <!-- Search Input -->
            <div class="relative shrink-0">
              <input 
                type="text" 
                [(ngModel)]="searchQuery"
                (ngModelChange)="onSearchQueryChange($event)"
                (keydown.enter)="onSearchSubmit()"
                placeholder="ابحث عن مدينة أو منطقة / Search for city or area..."
                class="w-full px-4 py-3 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-cairo text-sm"
              />
              <button 
                type="button" 
                (click)="onSearchSubmit()"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>

            <!-- Search Results Dropdown -->
            @if (searchResults.length > 0) {
              <div class="bg-slate-900 border border-slate-800 rounded-lg max-h-48 overflow-y-auto shrink-0">
                @for (result of searchResults; track $index) {
                  <button 
                    type="button" 
                    (click)="selectSearchResult(result)"
                    class="w-full px-4 py-3 text-left text-sm text-slate-200 hover:bg-slate-800 transition-colors font-cairo border-b border-slate-800 last:border-b-0"
                  >
                    {{ result.display_name }}
                  </button>
                }
              </div>
            }

            <p class="text-xs text-slate-400 leading-relaxed shrink-0">
              انقر على زر إسقاط الدبوس لتحديد إحداثيات موقعك التلقائية وملء حقول العنوان ومحافظة القاهرة تلقائياً.
            </p>

            <!-- Interactive Leaflet Map -->
            <div #mapContainer id="interactive-map" class="w-full h-[280px] rounded-lg border border-slate-900 shrink-0"></div>
          </div>

          <!-- Footer Actions -->
          <div class="flex flex-col-reverse md:flex-row justify-end gap-3 w-full p-4 border-t border-slate-900 bg-slate-950/80">
            <button type="button" (click)="closeMapModal()"
              class="w-full md:w-auto px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-all text-xs">
              إلغاء / Cancel
            </button>
            <button type="button" (click)="confirmPinDrop()"
              class="w-full md:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/15 text-xs">
              إسقاط الدبوس / Drop Pin & Confirm
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
    .leaflet-container {
      height: 280px !important;
      width: 100% !important;
      display: block !important;
      z-index: 9999 !important;
    }
    #interactive-map {
      height: 280px !important;
      width: 100% !important;
      display: block !important;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.25s ease-out both;
    }
  `]
})
export class TenantRegisterComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  readonly rateLimitService = inject(RateLimitService);
  readonly toastService = inject(ToastService);
  
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private currentLatLng: L.LatLng = L.latLng(30.0444, 31.2357); // Cairo/Giza
  
  searchQuery = '';
  searchResults: NominatimResult[] = [];
  private searchTimeout: any = null;
  
  readonly currentStep = signal<number>(1);
  readonly showSummaryBanner = signal<boolean>(false);
  readonly isLoading = signal(false);
  readonly isSuccess = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly emailError = signal<string | null>(null);

  readonly passwordValue = signal('');

  readonly passwordStrength = computed(() => {
    const pass = this.passwordValue();
    if (!pass) return 0;
    let score = 0;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;
    return score;
  });

  readonly isMapModalOpen = signal(false);

  readonly registerForm = this.fb.nonNullable.group({
    tenantName: ['', [Validators.required, Validators.maxLength(100)]],
    adminFirstName: ['', [Validators.required, Validators.maxLength(50)]],
    adminLastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    subscriptionPlan: ['Free', Validators.required],
    accountType: ['Company', Validators.required],
    location: ['', Validators.required],
    personalPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    whatsAppPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    commercialRegister: [''],
    taxCard: [''],
    nationalId: [''],
    syndicateId: [''],
    manualAddress: [''],
    mapLocationUrl: [''],
    latitude: [null as number | null],
    longitude: [null as number | null]
  });

  constructor() {
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordValue.set(value || '');
    });

    // Auto-Clear error state on any input change (On Input Change)
    this.registerForm.valueChanges.subscribe(() => {
      this.clearErrorState();
    });

    // Auto-Clear error state ONLY when a running Cooldown Timer finishes (transitions from >0 to 0)
    let wasLockedOut = false;
    effect(() => {
      const cd = this.rateLimitService.cooldownSeconds();
      if (cd > 0) {
        wasLockedOut = true;
      } else if (wasLockedOut && cd === 0) {
        wasLockedOut = false;
        this.clearErrorState();
      }
    });
  }

  clearErrorState(): void {
    if (this.emailError()) {
      this.emailError.set(null);
    }
    if (this.errorMessage()) {
      this.errorMessage.set(null);
    }
    if (this.showSummaryBanner()) {
      this.showSummaryBanner.set(false);
    }
    if (this.toastService.toasts().length > 0) {
      this.toastService.clearAll();
    }
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        if (control.touched) {
          control.markAsUntouched({ onlySelf: true });
        }
        if (control.dirty) {
          control.markAsPristine({ onlySelf: true });
        }
      }
    });
  }

  // Helper mapping for user-friendly field labels
  private readonly fieldLabels: Record<string, string> = {
    tenantName: 'اسم المستأجر / الشركة',
    adminFirstName: 'الاسم الأول لمدير النظام',
    adminLastName: 'اسم العائلة لمدير النظام',
    email: 'البريد الإلكتروني الرسمي',
    password: 'كلمة المرور',
    location: 'المحافظة / الموقع الرئيسي',
    personalPhone: 'رقم الهاتف الشخصي',
    whatsAppPhone: 'رقم الواتساب'
  };

  goToStep(step: number): void {
    if (step < this.currentStep() || this.isStepValid(this.currentStep())) {
      this.showSummaryBanner.set(false);
      this.currentStep.set(step);
    } else {
      this.showSummaryBanner.set(true);
      this.markCurrentStepControlsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  nextStep(): void {
    if (this.isStepValid(this.currentStep())) {
      this.showSummaryBanner.set(false);
      this.currentStep.update(s => Math.min(s + 1, 3));
    } else {
      this.showSummaryBanner.set(true);
      this.markCurrentStepControlsTouched();
      this.scrollToFirstInvalidControl();
    }
  }

  prevStep(): void {
    this.showSummaryBanner.set(false);
    this.currentStep.update(s => Math.max(s - 1, 1));
  }

  private currentStepControlNames(step: number = this.currentStep()): string[] {
    switch (step) {
      case 1:
        return ['tenantName', 'adminFirstName', 'adminLastName', 'email', 'password'];
      case 2:
        return ['accountType', 'location', 'personalPhone', 'whatsAppPhone'];
      case 3:
        return ['manualAddress'];
      default:
        return [];
    }
  }

  isStepValid(step: number = this.currentStep()): boolean {
    const controls = this.currentStepControlNames(step);
    const allValid = controls.every(name => {
      const c = this.registerForm.get(name);
      return !c || c.valid;
    });

    if (step === 1) {
      return allValid && this.passwordStrength() >= 3;
    }
    return allValid;
  }

  private markCurrentStepControlsTouched(): void {
    const controls = this.currentStepControlNames(this.currentStep());
    controls.forEach(name => {
      this.registerForm.get(name)?.markAsTouched();
    });
  }

  getInvalidFieldLabels(): string[] {
    const invalidLabels: string[] = [];
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control && control.invalid) {
        if (this.fieldLabels[key]) {
          invalidLabels.push(this.fieldLabels[key]);
        }
      }
    });

    if (this.passwordStrength() < 3 && this.registerForm.get('password')?.value) {
      if (!invalidLabels.includes('كلمة المرور (يجب أن تكون قوية)')) {
        invalidLabels.push('كلمة المرور (يجب أن تكون قوية تحتوي على أرقام وحروف)');
      }
    }
    return invalidLabels;
  }

  private scrollToFirstInvalidControl(): void {
    setTimeout(() => {
      const firstInvalid = document.querySelector('.border-rose-500, input.ng-invalid, select.ng-invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstInvalid as HTMLElement).focus();
      }
    }, 100);
  }

  openMapModal(): void {
    this.isMapModalOpen.set(true);
    setTimeout(() => {
      this.initMap();
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 200);
  }

  closeMapModal(): void {
    this.isMapModalOpen.set(false);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap(): void {
    if (this.map || !this.mapContainer) return;
    
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
    
    this.map = L.map(this.mapContainer.nativeElement).setView(this.currentLatLng, 12);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);
    
    this.marker = L.marker(this.currentLatLng, { draggable: true }).addTo(this.map);
    
    this.marker.on('dragend', (e: any) => {
      this.currentLatLng = this.marker!.getLatLng();
    });
    
    this.map.invalidateSize();
  }

  confirmPinDrop(): void {
    const lat = this.currentLatLng.lat;
    const lng = this.currentLatLng.lng;
    const computedAddr = `موقع تم إسقاطه على الخريطة / Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    this.registerForm.patchValue({
      manualAddress: computedAddr,
      mapLocationUrl: mapUrl,
      latitude: lat,
      longitude: lng,
      location: 'Cairo'
    });

    this.isMapModalOpen.set(false);
  }

  onSearchQueryChange(query: string): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    if (query.length < 2) {
      this.searchResults = [];
      return;
    }
    this.searchTimeout = setTimeout(() => this.searchNominatim(query), 500);
  }

  onSearchSubmit(): void {
    if (this.searchQuery.length >= 2) {
      this.searchNominatim(this.searchQuery);
    }
  }

  private searchNominatim(query: string): void {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=en`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.searchResults = response.features.map((feature: any) => ({
          lat: feature.geometry.coordinates[1].toString(),
          lon: feature.geometry.coordinates[0].toString(),
          display_name: feature.properties.name || feature.properties.street || feature.properties.city || feature.properties.country || query
        }));
      },
      error: (err) => {
        console.error('Photon search failed:', err);
      }
    });
  }

  selectSearchResult(result: NominatimResult): void {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    this.currentLatLng = L.latLng(lat, lng);
    
    if (this.map) {
      this.map.flyTo(this.currentLatLng, 14);
    }
    
    if (this.marker) {
      this.marker.setLatLng(this.currentLatLng);
    }
    
    this.searchResults = [];
    this.searchQuery = result.display_name;
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.passwordStrength() < 3 || this.rateLimitService.isLockedOut()) {
      this.showSummaryBanner.set(true);
      this.registerForm.markAllAsTouched();
      this.scrollToFirstInvalidControl();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.showSummaryBanner.set(false);

    const payload = {
      companyName: this.registerForm.value.tenantName,
      businessDomain: 'Construction',
      ownerName: `${this.registerForm.value.adminFirstName} ${this.registerForm.value.adminLastName}`.trim(),
      adminEmail: this.registerForm.value.email,
      password: this.registerForm.value.password,
      subscriptionPlan: String(this.registerForm.value.subscriptionPlan),
      accountType: this.registerForm.value.accountType,
      location: this.registerForm.value.location,
      personalPhone: this.registerForm.value.personalPhone,
      whatsAppPhone: this.registerForm.value.whatsAppPhone,
      commercialRegister: this.registerForm.value.commercialRegister || null,
      taxCard: this.registerForm.value.taxCard || null,
      nationalId: this.registerForm.value.nationalId || null,
      syndicateId: this.registerForm.value.syndicateId || null,
      manualAddress: this.registerForm.value.manualAddress || null,
      mapLocationUrl: this.registerForm.value.mapLocationUrl || null,
      latitude: this.registerForm.value.latitude || null,
      longitude: this.registerForm.value.longitude || null
    };

    this.http.post<ApiResponse<string>>(`${environment.apiUrl}/Auth/register-tenant`, payload)
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          if (res.success) {
            this.isSuccess.set(true);
          } else {
            const msg = res.message || 'Registration failed.';
            if (msg.toLowerCase().includes('email') || msg.includes('مُسجل') || msg.includes('مسجل') || msg.toLowerCase().includes('taken')) {
              const friendlyEmailMsg = 'البريد الإلكتروني مُسجل مسبقاً، يرجى استخدام بريد آخر أو تسجيل الدخول.';
              this.emailError.set(friendlyEmailMsg);
              this.errorMessage.set(friendlyEmailMsg);
              this.toastService.show('تنبيه البريد الإلكتروني', friendlyEmailMsg, 'warning');
              this.goToStep(1);
            } else {
              this.errorMessage.set(msg);
            }
          }
        },
        error: (err) => {
          this.isLoading.set(false);

          if (err.status === 400) {
            const rawMsg = err.error?.message || err.error?.title || (typeof err.error === 'string' ? err.error : '') || err.message || '';
            const errorCode = err.error?.code || '';

            const isSecurityRejection = errorCode === 'SECURITY_REJECTION' ||
              errorCode === 'XSS_DETECTED' ||
              errorCode === 'TAINT_DETECTED' ||
              rawMsg.includes('Sanitization') ||
              rawMsg.includes('Security Rejection') ||
              rawMsg.includes('Invalid Characters') ||
              rawMsg.includes('Payload Error') ||
              rawMsg.includes('مُدخلات غير مسموح بها لأسباب أمنية');

            if (isSecurityRejection) {
              // Security Rejection (RequestSanitizationMiddleware / FluentValidation Taint)
              this.toastService.show(
                'تنبيه أمني',
                'تنبيه أمني: تم رصد مُدخلات غير مسموح بها لأسباب أمنية. يرجى تصحيح البيانات والمحاولة مجدداً.',
                'error'
              );
              this.rateLimitService.startCooldown(60);
              this.errorMessage.set(null);
              return;
            }

            // Business Validation 400 Bad Request (Duplicate Email / Duplicate Tenant / Phone Exists / Weak Password)
            // DO NOT start Cooldown Timer! Keep form and submit button immediately active for editing.
            if (rawMsg.toLowerCase().includes('email') || rawMsg.includes('مُسجل') || rawMsg.includes('مسجل') || rawMsg.toLowerCase().includes('taken')) {
              const friendlyEmailMsg = 'البريد الإلكتروني مُسجل مسبقاً، يرجى استخدام بريد آخر أو تسجيل الدخول.';
              this.emailError.set(friendlyEmailMsg);
              this.errorMessage.set(friendlyEmailMsg);
              this.toastService.show('تنبيه البريد الإلكتروني', friendlyEmailMsg, 'warning');
              this.goToStep(1);
            } else {
              this.errorMessage.set(rawMsg || 'حدث خطأ في البيانات المدخلة. يرجى مراجعة الحقول والمحاولة مجدداً.');
            }
            return;
          }

          if (err.status === 429 || err.status === 503) {
            this.rateLimitService.startCooldown(60);
            this.errorMessage.set(null);
            return;
          }

          const msg = err.error?.message || err.message || 'An error occurred during registration.';
          if (typeof msg === 'string' && (msg.includes('Http failure') || msg.includes('status 400') || msg.includes('status 503'))) {
            this.errorMessage.set(null);
          } else {
            this.errorMessage.set(msg);
          }
        }
      });
  }
}
