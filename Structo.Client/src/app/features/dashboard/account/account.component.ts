import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { ToastService } from '../../../core/services/toast.service';
import { ApiDatePipe } from '../../../core/pipes/api-date.pipe';
import { roleLabel } from '../../../core/utils/labels';

const MESSAGES: Record<string, { ar: string; en: string }> = {
  'ACCOUNT.PROFILE_SAVED': { ar: 'تم حفظ بياناتك.', en: 'Your details were saved.' },
  'ACCOUNT.INVALID_PHONE': { ar: 'رقم التليفون غير صحيح. اكتب أرقام فقط (8 إلى 15 رقم).', en: 'Invalid phone number. Use 8 to 15 digits.' },
  'ACCOUNT.PASSWORD_CHANGED': { ar: 'تم تغيير كلمة المرور. الأجهزة التانية هتحتاج تسجّل دخول من جديد.', en: 'Password changed. Other devices will need to sign in again.' },
  'ACCOUNT.WRONG_CURRENT_PASSWORD': { ar: 'كلمة المرور الحالية غير صحيحة.', en: 'Current password is incorrect.' },
  'ACCOUNT.WEAK_PASSWORD': { ar: 'كلمة المرور لازم تكون 8 حروف على الأقل وفيها حرف ورقم.', en: 'Password must be at least 8 characters with a letter and a digit.' },
};

/** "My account": every role can view and edit their own details and change their password. */
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule, ApiDatePipe],
  template: `
    <div class="font-cairo space-y-6" [attr.dir]="isAr() ? 'rtl' : 'ltr'">
      <header>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">{{ t('حسابي', 'My account') }}</h1>
        <p class="mt-1 text-sm text-slate-400">{{ t('بياناتك الشخصية وأمان حسابك.', 'Your personal details and account security.') }}</p>
      </header>

      @if (isLoading() && !account()) {
        <div class="grid gap-4 lg:grid-cols-3" aria-busy="true">
          <div class="h-56 rounded-3xl bg-slate-900/60 animate-pulse"></div>
          <div class="h-56 rounded-3xl bg-slate-900/60 animate-pulse lg:col-span-2"></div>
        </div>
      } @else if (account(); as me) {
        <div class="grid gap-5 lg:grid-cols-3 items-start">
          <!-- Identity card -->
          <section class="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center lg:sticky lg:top-0">
            <div class="mx-auto h-20 w-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl font-black text-indigo-300">
              {{ initials() }}
            </div>
            <h2 class="mt-4 text-xl font-extrabold text-white break-words">{{ me.firstName }} {{ me.lastName }}</h2>
            <p class="mt-1 text-sm text-slate-400 break-all font-sans">{{ me.email }}</p>
            <span class="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{{ role() }}</span>
            <dl class="mt-6 grid grid-cols-2 gap-3 text-start">
              @if (me.tenantName) {
                <div class="col-span-2 rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
                  <dt class="text-[11px] text-slate-500">{{ t('الشركة', 'Company') }}</dt>
                  <dd class="mt-0.5 font-bold text-slate-200 truncate">{{ me.tenantName }}</dd>
                </div>
              }
              <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
                <dt class="text-[11px] text-slate-500">{{ t('عضو منذ', 'Member since') }}</dt>
                <dd class="mt-0.5 font-bold text-slate-200 font-sans">{{ me.createdAt | apiDate:'dd/MM/yyyy' }}</dd>
              </div>
              <div class="rounded-2xl bg-slate-900/80 border border-slate-800 p-3">
                <dt class="text-[11px] text-slate-500">{{ t('مشاريع مُسندة', 'Assigned projects') }}</dt>
                <dd class="mt-0.5 font-bold text-slate-200 font-sans">{{ me.assignedProjectsCount }}</dd>
              </div>
            </dl>
          </section>

          <div class="lg:col-span-2 space-y-5">
            <!-- Personal details -->
            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6" novalidate>
              <h2 class="text-lg font-bold text-white">{{ t('البيانات الشخصية', 'Personal details') }}</h2>
              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('الاسم الأول', 'First name') }}</span>
                  <input formControlName="firstName" autocomplete="given-name" class="field mt-1.5" [class.field-error]="invalid('firstName')">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('اسم العائلة', 'Last name') }}</span>
                  <input formControlName="lastName" autocomplete="family-name" class="field mt-1.5" [class.field-error]="invalid('lastName')">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('رقم الموبايل', 'Mobile number') }}</span>
                  <input formControlName="personalPhone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="01xxxxxxxxx" class="field mt-1.5 font-sans text-start">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('رقم الواتساب', 'WhatsApp number') }}</span>
                  <input formControlName="whatsAppPhone" type="tel" inputmode="tel" dir="ltr" placeholder="01xxxxxxxxx" class="field mt-1.5 font-sans text-start">
                </label>
                <label class="block sm:col-span-2">
                  <span class="text-sm font-semibold text-slate-300">{{ t('البريد الإلكتروني', 'Email') }}</span>
                  <input [value]="me.email" disabled dir="ltr" class="field mt-1.5 font-sans text-start opacity-60 cursor-not-allowed">
                  <span class="mt-1 block text-xs text-slate-500">{{ t('البريد هو اسم الدخول ولا يمكن تغييره من هنا.', 'Your email is your login and can’t be changed here.') }}</span>
                </label>
              </div>
              <div class="mt-6 flex justify-end">
                <button type="submit" [disabled]="isSavingProfile() || profileForm.pristine"
                  class="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition">
                  {{ isSavingProfile() ? t('جاري الحفظ…', 'Saving…') : t('حفظ البيانات', 'Save details') }}
                </button>
              </div>
            </form>

            <!-- Password -->
            <form [formGroup]="passwordForm" (ngSubmit)="changePassword()" class="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6" novalidate>
              <h2 class="text-lg font-bold text-white">{{ t('تغيير كلمة المرور', 'Change password') }}</h2>
              <p class="mt-1 text-sm text-slate-400">{{ t('8 حروف على الأقل وفيها حرف ورقم. بعد التغيير هيتطلب تسجيل الدخول من جديد على الأجهزة التانية.', 'At least 8 characters with a letter and a digit. Other devices will need to sign in again.') }}</p>
              <div class="mt-5 grid gap-4 sm:grid-cols-3">
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('كلمة المرور الحالية', 'Current password') }}</span>
                  <input formControlName="currentPassword" [type]="showPasswords() ? 'text' : 'password'" autocomplete="current-password" dir="ltr" class="field mt-1.5 font-sans">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('كلمة المرور الجديدة', 'New password') }}</span>
                  <input formControlName="newPassword" [type]="showPasswords() ? 'text' : 'password'" autocomplete="new-password" dir="ltr" class="field mt-1.5 font-sans" [class.field-error]="invalid('newPassword', passwordForm)">
                </label>
                <label class="block">
                  <span class="text-sm font-semibold text-slate-300">{{ t('تأكيد كلمة المرور', 'Confirm password') }}</span>
                  <input formControlName="confirmPassword" [type]="showPasswords() ? 'text' : 'password'" autocomplete="new-password" dir="ltr" class="field mt-1.5 font-sans" [class.field-error]="mismatch()">
                </label>
              </div>
              @if (mismatch()) {
                <p class="mt-2 text-sm text-rose-400">{{ t('كلمتا المرور غير متطابقتين.', 'Passwords don’t match.') }}</p>
              }
              <div class="mt-6 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <label class="inline-flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                  <input type="checkbox" class="h-4 w-4 accent-indigo-500" [checked]="showPasswords()" (change)="showPasswords.set(!showPasswords())">
                  {{ t('إظهار كلمات المرور', 'Show passwords') }}
                </label>
                <button type="submit" [disabled]="isChangingPassword() || passwordForm.invalid || mismatch()"
                  class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold transition">
                  {{ isChangingPassword() ? t('جاري التغيير…', 'Changing…') : t('تغيير كلمة المرور', 'Change password') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <div class="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-6 text-center">
          <p class="text-rose-300 font-bold">{{ t('تعذر تحميل بيانات حسابك.', 'Couldn’t load your account.') }}</p>
          <button type="button" (click)="load()" class="mt-4 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold">{{ t('إعادة المحاولة', 'Try again') }}</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .field { width: 100%; border-radius: 0.75rem; background: rgb(2 6 23 / 0.6); border: 1px solid rgb(51 65 85); padding: 0.75rem 1rem; color: rgb(241 245 249); font-size: 1rem; outline: none; transition: border-color .15s, box-shadow .15s; }
    .field:focus { border-color: rgb(99 102 241); box-shadow: 0 0 0 3px rgb(99 102 241 / 0.2); }
    .field-error { border-color: rgb(244 63 94) !important; }
  `]
})
export class AccountComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly authService = inject(AuthService);
  private readonly lang = inject(LanguageService);
  private readonly toast = inject(ToastService);
  private readonly fb = inject(FormBuilder);

  readonly account = this.accountService.me;
  readonly isLoading = signal(false);
  readonly isSavingProfile = signal(false);
  readonly isChangingPassword = signal(false);
  readonly showPasswords = signal(false);

  readonly isAr = computed(() => this.lang.currentLang() !== 'en');
  readonly role = computed(() => roleLabel(this.account()?.role, this.isAr() ? 'ar' : 'en'));
  readonly initials = computed(() => {
    const me = this.account();
    const first = me?.firstName?.trim().charAt(0) ?? '';
    const last = me?.lastName?.trim().charAt(0) ?? '';
    // Arabic letters join into a ligature, so show one letter; Latin names get two
    return (/[A-Za-z]/.test(first) ? first + last : first).toUpperCase() || 'U';
  });

  readonly profileForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    lastName: ['', [Validators.required, Validators.maxLength(60)]],
    personalPhone: [''],
    whatsAppPhone: [''],
  });

  readonly passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z؀-ۿ])(?=.*\d).+$/)]],
    confirmPassword: ['', Validators.required],
  });

  t(ar: string, en: string): string {
    return this.isAr() ? ar : en;
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.accountService.load().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.profileForm.reset({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            personalPhone: res.data.personalPhone ?? '',
            whatsAppPhone: res.data.whatsAppPhone ?? '',
          });
        }
      },
      error: () => this.isLoading.set(false),
    });
  }

  invalid(name: string, form = this.profileForm as any): boolean {
    const c = form.get(name);
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  mismatch(): boolean {
    const { newPassword, confirmPassword } = this.passwordForm.getRawValue();
    return !!confirmPassword && newPassword !== confirmPassword;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const v = this.profileForm.getRawValue();
    this.isSavingProfile.set(true);
    this.accountService.update({
      firstName: v.firstName.trim(),
      lastName: v.lastName.trim(),
      personalPhone: v.personalPhone.trim() || null,
      whatsAppPhone: v.whatsAppPhone.trim() || null,
    }).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        this.notify(res.message, res.success);
        if (res.success) {
          const user = this.authService.currentUser();
          if (user) {
            const name = `${v.firstName.trim()} ${v.lastName.trim()}`;
            this.authService.currentUser.set({ ...user, name });
            try {
              const stored = JSON.parse(localStorage.getItem('user_profile') || '{}');
              localStorage.setItem('user_profile', JSON.stringify({ ...stored, name }));
            } catch { /* storage unavailable */ }
          }
          this.load();
        }
      },
      error: (err) => {
        this.isSavingProfile.set(false);
        this.notify(err?.error?.message, false);
      },
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid || this.mismatch()) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    const { currentPassword, newPassword } = this.passwordForm.getRawValue();
    this.isChangingPassword.set(true);
    this.accountService.changePassword(currentPassword, newPassword).subscribe({
      next: (res) => {
        this.isChangingPassword.set(false);
        this.notify(res.message, res.success);
        if (res.success) this.passwordForm.reset();
      },
      error: (err) => {
        this.isChangingPassword.set(false);
        this.notify(err?.error?.message, false);
      },
    });
  }

  private notify(code: string | undefined, success: boolean): void {
    const known = code ? MESSAGES[code] : undefined;
    const text = known ? this.t(known.ar, known.en) : success ? this.t('تم.', 'Done.') : this.t('حصل خطأ، حاول مرة تانية.', 'Something went wrong, please try again.');
    this.toast.show(success ? this.t('تم', 'Done') : this.t('تنبيه', 'Notice'), text, success ? 'success' : 'error');
  }
}
