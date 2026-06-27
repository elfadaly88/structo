import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: string[];
}

@Component({
  selector: 'app-tenant-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
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
                Your registration is complete. Our SuperAdmin is setting up your secure dashboard workspace. You will receive an activation email shortly once provisioned.
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

            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Company Name</label>
                  <input type="text" formControlName="companyName" placeholder="Acme Corp" 
                    class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                  @if (isFieldInvalid('companyName')) {
                    <p class="text-xs text-rose-400 mt-1.5 font-medium">Company name is required.</p>
                  }
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Business Domain</label>
                  <input type="text" formControlName="businessDomain" placeholder="Real Estate, Logistics..." 
                    class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                  @if (isFieldInvalid('businessDomain')) {
                    <p class="text-xs text-rose-400 mt-1.5 font-medium">Domain is required.</p>
                  }
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Owner Full Name</label>
                <input type="text" formControlName="ownerName" placeholder="Jane Doe" 
                  class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                @if (isFieldInvalid('ownerName')) {
                  <p class="text-xs text-rose-400 mt-1.5 font-medium">Owner name is required.</p>
                }
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Admin Email</label>
                <input type="email" formControlName="adminEmail" placeholder="admin@company.com" 
                  class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                @if (isFieldInvalid('adminEmail')) {
                  <p class="text-xs text-rose-400 mt-1.5 font-medium">A valid email is required.</p>
                }
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-cairo">Password</label>
                <input type="password" formControlName="password" placeholder="••••••••" 
                  class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-sans">
                @if (isFieldInvalid('password')) {
                  <p class="text-xs text-rose-400 mt-1.5 font-medium">Password must be at least 6 characters.</p>
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
                <button type="submit" [disabled]="isLoading()" 
                  class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-sm font-bold rounded-xl text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center font-cairo">
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
  `,
  styles: [`
    .font-cairo {
      font-family: 'Cairo', 'Inter', sans-serif;
    }
  `]
})
export class TenantRegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  
  readonly isLoading = signal(false);
  readonly isSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly registerForm = this.fb.nonNullable.group({
    companyName: ['', [Validators.required, Validators.maxLength(100)]],
    businessDomain: ['', Validators.required],
    ownerName: ['', [Validators.required, Validators.maxLength(100)]],
    adminEmail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    subscriptionPlan: ['Free', Validators.required]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload = {
      ...this.registerForm.value,
      subscriptionPlan: String(this.registerForm.value.subscriptionPlan)
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
