import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandComponent } from '../../core/components/brand.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, BrandComponent],
  template: `
    <main class="min-h-dvh bg-[#070A10] text-slate-200 flex flex-col items-center justify-center px-4 text-center font-cairo" dir="rtl">
      <app-brand size="lg" />
      <p class="mt-10 text-7xl font-black text-indigo-400/90 font-sans">404</p>
      <h1 class="mt-4 text-2xl sm:text-3xl font-extrabold text-white">الصفحة غير موجودة</h1>
      <p class="mt-3 max-w-md text-slate-400 leading-relaxed">الرابط الذي فتحته غير صحيح أو تم نقله. تأكد من الرابط أو ارجع للصفحة الرئيسية.</p>
      <div class="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
        <a routerLink="/" class="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 font-bold text-white transition">الصفحة الرئيسية</a>
        <a routerLink="/login" class="rounded-xl border border-slate-700 hover:border-slate-500 px-6 py-3 font-bold text-slate-200 transition">تسجيل الدخول</a>
      </div>
    </main>
  `
})
export class NotFoundComponent {}
