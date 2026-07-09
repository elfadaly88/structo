import { Component, inject, signal, computed, AfterViewInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
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
      <div class="hidden md:flex md:w-5/12 bg-slate-900 border-r border-slate-800 p-12 flex-col justify-between relative overflow-hidden">
        <!-- Abstract glowing orbs -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div class="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
          <div class="absolute bottom-[10%] -right-[20%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-16">
            <div class="h-10 w-10 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span class="text-white font-extrabold text-lg">S</span>
            </div>
            <span class="text-2xl font-bold tracking-tight text-white font-cairo">Structo</span>
          </div>

          <h1 class="text-4xl font-extrabold text-white leading-tight mb-6 font-cairo">
            Scale your construction operations securely.
          </h1>
          <p class="text-slate-400 text-lg leading-relaxed mb-12 font-cairo">
            Join the premier directory. Manage dynamic budgets, handle multi-tenant workspaces safely, and track receipt proofs via Cloudinary all in one unified dashboard.
          </p>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="h-8 w-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                <svg class="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <h3 class="text-white font-bold mb-1 font-cairo">Strict Multi-Tenancy</h3>
                <p class="text-slate-500 text-sm">Your data is strictly isolated with robust JWT claim verification.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1">
                <svg class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <h3 class="text-white font-bold mb-1 font-cairo">Live Burn Rates</h3>
                <p class="text-slate-500 text-sm">Real-time budget analysis and petty cash settlement flows.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative z-10">
          <p class="text-xs text-slate-600 font-mono">© 2026 Structo Platforms Inc.</p>
        </div>
      </div>

      <!-- Right Side: Form -->
      <div class="w-full md:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">
        <div class="w-full max-w-md">
          
          @if (isSuccess()) {
            <!-- Success Confirmation -->
            <div class="text-center animate-fade-in-up">
              <div class="h-20 w-20 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="h-10 w-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </div>
              <h2 class="text-3xl font-extrabold text-white mb-4 font-cairo">Registration Successful!</h2>
              <p class="text-slate-400 leading-relaxed mb-8 font-cairo">
                Registration successful! Your account is pending SuperAdmin approval.
              </p>
              <button routerLink="/" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold rounded-xl text-white shadow-lg transition-all font-cairo">
                Return to Landing Page
              </button>
            </div>
          } @else {
            <!-- Registration Form -->
            <div class="mb-10 text-center md:text-left">
              <h2 class="text-3xl font-extrabold text-white mb-2 font-cairo">Register your Company</h2>
              <p class="text-slate-400 text-sm font-cairo">Setup your corporate tenant environment in seconds.</p>
            </div>

            @if (errorMessage()) {
              <div class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-sm text-rose-400 font-medium">
                <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>{{ errorMessage() }}</span>
              </div>
            }

            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5" autocomplete="off">
              
              <!-- Verification & Onboarding Block (Top) -->
              <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div class="border-b border-slate-800 pb-3">
                  <h3 class="text-xs font-bold text-indigo-400 font-cairo uppercase tracking-wider flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    بيانات الاعتماد والتحقق / Verification Credentials
                  </h3>
                  <p class="text-[9px] text-slate-500 font-cairo mt-1">يطلع عليها مدير النظام مباشرة للتحقق والموافقة على الحساب.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Account Type Selector -->
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">نوع الحساب / Account Type</label>
                    <select formControlName="accountType"
                      class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                      <option value="Company">Company / شركة أو مؤسسة</option>
                      <option value="Freelancer">Freelancer / مستقل أو مهندس حر</option>
                    </select>
                  </div>

                  <!-- Governorate Location Dropdown -->
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المحافظة / Location</label>
                    <select formControlName="location"
                      class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
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
                      <p class="text-[10px] text-rose-400 mt-1 font-medium font-cairo">الموقع مطلوب / Location is required.</p>
                    }
                  </div>
                </div>

                <!-- Physical Address & Map Selector Trigger -->
                <div class="grid grid-cols-1 gap-4 pt-1">
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">العنوان الفعلي / Physical Address (Optional)</label>
                    <div class="flex gap-2">
                      <input type="text" formControlName="manualAddress" placeholder="أدخل العنوان يدوياً أو اختر من الخريطة"
                        class="flex-1 px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                      
                      <button type="button" (click)="openMapModal()"
                        class="px-3 py-2.5 bg-indigo-950/40 text-indigo-400 border border-indigo-900/35 hover:bg-indigo-900/30 transition-all duration-200 rounded-xl text-xs font-bold font-cairo shrink-0 cursor-pointer active:scale-95 flex items-center gap-1">
                        📍 الخريطة / Map
                      </button>
                    </div>
                    @if (registerForm.get('latitude')?.value) {
                      <div class="mt-2 text-[10px] text-slate-500 font-mono">
                        Coordinates: {{ registerForm.get('latitude')?.value }} , {{ registerForm.get('longitude')?.value }}
                      </div>
                    }
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">رقم الهاتف الشخصي / Personal Phone</label>
                    <input type="tel" formControlName="personalPhone" inputmode="numeric" maxlength="11" placeholder="01xxxxxxxxx"
                      class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                  </div>
                  <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo flex items-center gap-1.5">
                      <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.86.52 3.58 1.42 5.06L2 22l4.99-1.39A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.63-1.28 1.2-1.76 1.25-.47.05-1.05.07-1.7-.14-.4-.13-.91-.31-1.57-.59-2.77-1.19-4.58-3.98-4.72-4.17-.13-.19-1.13-1.52-1.13-2.9 0-1.38.72-2.06.97-2.34.25-.28.55-.35.74-.35h.53c.17 0 .42-.06.66.5.25.59.85 2.04.93 2.19.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.32.38-.46.51-.15.15-.3.31-.13.61.17.29.76 1.26 1.63 2.05 1.12 1 2.05 1.31 2.36 1.46.3.15.48.13.66-.08.18-.2.77-.9.98-1.21.2-.31.4-.26.67-.15.27.1 1.72.81 2.02.96.3.14.5.22.57.34.07.12.07.71-.16 1.34z"/>
                      </svg>
                      رقم الواتساب / WhatsApp Phone
                    </label>
                    <input type="tel" formControlName="whatsAppPhone" inputmode="numeric" maxlength="11" placeholder="01xxxxxxxxx"
                      class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                  </div>
                </div>

                <!-- Company-only Fields -->
                @if (registerForm.get('accountType')?.value === 'Company') {
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">السجل التجاري / Commercial Register</label>
                      <input type="text" formControlName="commercialRegister" placeholder="رقم السجل التجاري"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">البطاقة الضريبية / Tax Card</label>
                      <input type="text" formControlName="taxCard" placeholder="الرقم الضريبي"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                    </div>
                  </div>
                }

                <!-- Freelancer-only Fields -->
                @if (registerForm.get('accountType')?.value === 'Freelancer') {
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">الرقم القومي (14 رقم) / National ID (Optional)</label>
                      <input type="text" formControlName="nationalId" placeholder="أدخل 14 رقماً (اختياري)"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                    </div>
                    <div>
                      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">رقم النقابة / Syndicate ID (Optional)</label>
                      <input type="text" formControlName="syndicateId" placeholder="عضوية نقابة المهندسين"
                        class="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans text-xs">
                    </div>
                  </div>
                }
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Tenant Name</label>
                <input type="text" formControlName="tenantName" placeholder="Acme Corp" autocomplete="off"
                  class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                @if (isFieldInvalid('tenantName')) {
                  <p class="text-xs text-rose-400 mt-1.5 font-medium">Tenant name is required.</p>
                }
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Admin First Name</label>
                  <input type="text" formControlName="adminFirstName" placeholder="Jane" autocomplete="off"
                    class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                  @if (isFieldInvalid('adminFirstName')) {
                    <p class="text-xs text-rose-400 mt-1.5 font-medium">First name is required.</p>
                  }
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Admin Last Name</label>
                  <input type="text" formControlName="adminLastName" placeholder="Doe" autocomplete="off"
                    class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                  @if (isFieldInvalid('adminLastName')) {
                    <p class="text-xs text-rose-400 mt-1.5 font-medium">Last name is required.</p>
                  }
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Email</label>
                <input type="email" formControlName="email" placeholder="admin@company.com" autocomplete="off"
                  class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                @if (isFieldInvalid('email')) {
                  <p class="text-xs text-rose-400 mt-1.5 font-medium">A valid email is required.</p>
                }
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Password</label>
                <div class="relative">
                  <input [type]="showPassword() ? 'text' : 'password'" formControlName="password" placeholder="••••••••" autocomplete="new-password"
                    class="w-full pl-4 pr-10 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                  <button
                    type="button"
                    (click)="togglePasswordVisibility()"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                  >
                    @if (showPassword()) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    }
                  </button>
                </div>
                
                <!-- Password Strength Meter Bar -->
                <div class="mt-2.5 space-y-1.5 bg-slate-900/40 border border-slate-850 rounded-xl p-2.5">
                  <div class="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden flex gap-0.5">
                    <div class="h-full rounded-full transition-all duration-300"
                      [style.width.%]="passwordStrength() * 25"
                      [class.bg-rose-500]="passwordStrength() <= 1"
                      [class.bg-amber-500]="passwordStrength() === 2"
                      [class.bg-emerald-500]="passwordStrength() >= 3">
                    </div>
                  </div>
                  <div class="flex justify-between items-center text-[10px] font-medium font-cairo">
                    <span class="text-slate-500">قوة كلمة المرور / Password Strength:</span>
                    <span [class.text-rose-400]="passwordStrength() <= 1"
                          [class.text-amber-400]="passwordStrength() === 2"
                          [class.text-emerald-400]="passwordStrength() >= 3">
                      {{ passwordStrength() <= 1 ? 'Weak / ضعيف (يجب إدراج رموز وأرقام)' : passwordStrength() === 2 ? 'Fair / متوسط (قريب من القوي)' : 'Strong / قوي جداً (مقبول للتسجيل)' }}
                    </span>
                  </div>
                </div>

                @if (isFieldInvalid('password')) {
                  <p class="text-xs text-rose-400 mt-1.5 font-medium">Password must be at least 6 characters.</p>
                }
                @if (passwordStrength() < 3 && registerForm.get('password')?.dirty) {
                  <p class="text-[10px] text-rose-400 mt-1 font-medium font-cairo">يجب أن تكون كلمة المرور قوية لتتمكن من إرسال النموذج.</p>
                }
              </div>
              
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Subscription Plan</label>
                <select formControlName="subscriptionPlan" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                  <option value="Free">Free (2 Projects)</option>
                  <option value="Standard">Standard (10 Projects)</option>
                  <option value="Premium">Premium (50 Projects)</option>
                </select>
              </div>

              <div class="pt-2">
                <button type="submit" [disabled]="isLoading() || passwordStrength() < 3 || registerForm.invalid" 
                  class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold rounded-xl text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center font-cairo">
                  @if (isLoading()) {
                    <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  } @else {
                    Complete Registration
                  }
                </button>
              </div>

              <p class="text-center text-sm text-slate-500 mt-6 font-cairo">
                Already have an account? 
                <a routerLink="/login" class="text-indigo-400 font-bold hover:underline">Log in here</a>
              </p>

            </form>
          }
        </div>
      </div>
    </div>

    <!-- MAP SELECTOR MODAL -->
    @if (isMapModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div (click)="closeMapModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div class="relative max-w-2xl w-full max-h-[90vh] flex flex-col bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-10 font-cairo">
          <!-- Header -->
          <div class="p-4 border-b border-slate-900 flex justify-between items-center">
            <h3 class="text-sm font-bold text-white">تحديد الموقع الجغرافي / Drop Pin on Map</h3>
            <button type="button" (click)="closeMapModal()" class="text-slate-500 hover:text-white">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">
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

            <!-- Descriptive Text -->
            <p class="text-xs text-slate-400 leading-relaxed shrink-0">
              انقر على زر إسقاط الدبوس لتحديد إحداثيات موقعك التلقائية وملء حقول العنوان ومحافظة القاهرة تلقائياً.
            </p>

            <!-- Interactive Leaflet Map -->
            <div #mapContainer id="interactive-map" class="w-full h-[280px] rounded-lg border border-slate-900 shrink-0"></div>
          </div>

          <!-- Footer Actions -->
          <div class="p-4 border-t border-slate-900 flex justify-end gap-3 bg-slate-950/80">
            <button type="button" (click)="closeMapModal()"
              class="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-all text-xs">
              إلغاء / Cancel
            </button>
            <button type="button" (click)="confirmPinDrop()"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/15 text-xs">
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
  `]
})

export class TenantRegisterComponent implements AfterViewInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;
  
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  private currentLatLng: L.LatLng = L.latLng(30.0444, 31.2357); // Cairo/Giza
  
  searchQuery = '';
  searchResults: NominatimResult[] = [];
  private searchTimeout: any = null;
  
  readonly isLoading = signal(false);
  readonly isSuccess = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);

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

  openMapModal(): void {
    this.isMapModalOpen.set(true);
    setTimeout(() => {
      this.initMap();
      // Ensure map size is calculated correctly after modal layout
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
    
    // Fix broken Leaflet marker icon with CDN assets
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
    
    // Create red marker
    this.marker = L.marker(this.currentLatLng, { draggable: true }).addTo(this.map);
    
    // Listen to drag events
    this.marker.on('dragend', (e) => {
      this.currentLatLng = this.marker!.getLatLng();
    });
    
    // Invalidate size after initializing to fix display issues
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
    // Also keep passwordValue signal in sync
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordValue.set(value || '');
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.passwordStrength() < 3) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

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
            this.errorMessage.set(res.message || 'Registration failed.');
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          const msg = err.error?.message || err.message || 'An error occurred during registration.';
          this.errorMessage.set(msg);
        }
      });
  }
}
