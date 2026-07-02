import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslatePipe],
  template: `
    <div class="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Glow background -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <!-- Logo -->
        <div class="flex justify-center">
          <img src="structo_logo.png" [alt]="'NAV.LOGO_ALT' | translate" class="h-12 w-auto">
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
          {{ 'LOGIN.TITLE' | translate }}
        </h2>
        <p class="mt-2 text-center text-sm text-slate-400">
          {{ 'LOGIN.SUBTITLE' | translate }}
          <a routerLink="/" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
            {{ 'LOGIN.RETURN_HOME' | translate }}
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div class="bg-slate-900/50 backdrop-blur-md py-8 px-4 border border-slate-800/80 shadow-2xl sm:rounded-2xl sm:px-10">
          
          <!-- Error Alert -->
          @if (errorMessage()) {
            <div class="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400 flex items-start space-x-3 rtl:space-x-reverse">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{{ errorMessage() }}</span>
            </div>
          }

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Username Field -->
            <div>
              <label for="email" class="block text-sm font-semibold text-slate-300">
                {{ 'LOGIN.USERNAME_LABEL' | translate }}
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  type="text"
                  formControlName="email"
                  autocomplete="username"
                  required
                  class="appearance-none block w-full px-3 py-2.5 border border-slate-800 bg-slate-950/80 rounded-xl placeholder-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                  [class.border-red-500]="isFieldInvalid('email')"
                  [placeholder]="'LOGIN.USERNAME_PLACEHOLDER' | translate"
                />
              </div>
              @if (isFieldInvalid('email')) {
                <p class="mt-1 text-xs text-red-400">
                  {{ 'LOGIN.USERNAME_REQ' | translate }}
                </p>
              }
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-semibold text-slate-300">
                {{ 'LOGIN.PASSWORD_LABEL' | translate }}
              </label>
              <div class="mt-1 relative">
                <input
                  id="password"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  autocomplete="current-password"
                  required
                  class="appearance-none block w-full pl-3 pr-10 py-2.5 border border-slate-800 bg-slate-950/80 rounded-xl placeholder-slate-600 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                  [class.border-red-500]="isFieldInvalid('password')"
                  placeholder="••••••••"
                />
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
              @if (isFieldInvalid('password')) {
                <p class="mt-1 text-xs text-red-400">
                  {{ 'LOGIN.PASSWORD_REQ' | translate }}
                </p>
              }
            </div>

            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500/20 border-slate-800 bg-slate-950 rounded"
                />
                <label for="remember-me" class="ml-2 rtl:mr-2 rtl:ml-0 block text-slate-400">
                  {{ 'LOGIN.REMEMBER_ME' | translate }}
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                  {{ 'LOGIN.FORGOT_PASSWORD' | translate }}
                </a>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                [disabled]="loginForm.invalid || isLoading()"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                @if (isLoading()) {
                  <svg class="animate-spin -ml-1 mr-3 rtl:ml-3 rtl:mr-1 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ 'LOGIN.SIGNING_IN' | translate }}
                @} @else {
                  {{ 'LOGIN.SIGN_IN' | translate }}
                }
              </button>
            </div>
          </form>

          <!-- Public Registration Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-slate-400">
              Don't have an account? 
              <a routerLink="/register" class="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200">
                Register your tenant/company here
              </a>
            </p>
          </div>

          <!-- Mock account info tip -->
          <div class="mt-6 border-t border-slate-800/80 pt-6">
            <span class="text-xs font-semibold text-indigo-400/80 uppercase tracking-wider block mb-2">{{ 'LOGIN.DEV_INFO' | translate }}</span>
            <p class="text-xs text-slate-400 leading-relaxed">
              {{ 'LOGIN.DEV_INFO_TEXT' | translate }}
            </p>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  readonly isLoading = signal(false);
  readonly showPassword = signal(false);
  readonly errorMessage = signal<string | null>(null);

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigateByUrl(returnUrl);
        } else {
          this.errorMessage.set(this.translateService.instant(response.message || 'LOGIN.FAILED'));
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          this.translateService.instant(
            err.error?.message ||
            err.message ||
            'LOGIN.BACKEND_UNAVAILABLE'
          )
        );
      }
    });
  }
}

