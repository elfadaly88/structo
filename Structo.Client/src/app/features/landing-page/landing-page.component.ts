import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <!-- Nav Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <img src="logo.png" [alt]="'NAV.LOGO_ALT' | translate" class="h-8 w-auto">
        </div>
        <div class="flex items-center gap-6">
          <button 
            (click)="langService.toggleLanguage()"
            class="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 active:scale-95">
            {{ langService.currentLang() === 'en' ? 'عربي' : 'English' }}
          </button>
          <a routerLink="/login" class="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">{{ 'NAV.LOGIN' | translate }}</a>
          <button (click)="navigateToLogin()" class="relative group overflow-hidden px-4 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            <span class="relative z-10">{{ 'NAV.GET_STARTED' | translate }}</span>
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <!-- Background Glowing Orbs -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-down">
          <span>{{ 'HERO.LIVE_TAG' | translate }}</span>
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-8">
          {{ 'HERO.TITLE_START' | translate }}
          <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {{ 'HERO.TITLE_HIGHLIGHT' | translate }}
          </span>
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          {{ 'HERO.SUBTITLE' | translate }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-16">
          <button (click)="navigateToLogin()" class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer">
            {{ 'HERO.CTA_START' | translate }}
            <span class="inline-block transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ml-1 rtl:mr-1 rtl:ml-0">&rarr;</span>
          </button>
          <a href="#features" class="px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 font-semibold text-slate-300 hover:text-white transition-all duration-300">
            {{ 'HERO.CTA_LEARN' | translate }}
          </a>
        </div>

        <!-- Dashboard Preview Box -->
        <div class="w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm shadow-2xl shadow-indigo-500/5 transition-transform duration-500 hover:scale-[1.01]">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div class="flex gap-2">
              <span class="h-3 w-3 rounded-full bg-rose-500/80"></span>
              <span class="h-3 w-3 rounded-full bg-amber-500/80"></span>
              <span class="h-3 w-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span class="text-xs font-semibold text-slate-600 tracking-wider">{{ 'HERO.PREVIEW_DOMAIN' | translate }}</span>
            <div class="w-8"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-80 bg-slate-950/80 rounded-xl p-6 text-left rtl:text-right">
            <div class="border border-slate-800/60 rounded-lg p-4 bg-slate-900/30 flex flex-col justify-between min-h-[160px]">
              <div>
                <span class="text-xs font-bold text-indigo-400 tracking-wider uppercase">{{ 'HERO.PREVIEW_PROJECTS_TITLE' | translate }}</span>
                <h3 class="text-lg font-bold text-white mt-1">{{ 'HERO.PREVIEW_PROJECTS_NAME' | translate }}</h3>
                <div class="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div class="bg-indigo-500 h-full rounded-full w-4/5"></div>
                </div>
              </div>
              <span class="text-xs text-slate-500 mt-2">{{ 'HERO.PREVIEW_PROJECTS_HINT' | translate }}</span>
            </div>
            <div class="border border-slate-800/60 rounded-lg p-4 bg-slate-900/30 flex flex-col justify-between min-h-[160px]">
              <div>
                <span class="text-xs font-bold text-emerald-400 tracking-wider uppercase">{{ 'HERO.PREVIEW_FINANCIALS_TITLE' | translate }}</span>
                <h3 class="text-3xl font-extrabold text-white mt-2">$248,390</h3>
                <p class="text-xs text-slate-400 mt-1">{{ 'HERO.PREVIEW_FINANCIALS_HINT' | translate }}</p>
              </div>
              <span class="text-xs text-emerald-500 mt-2">{{ 'HERO.PREVIEW_FINANCIALS_STATUS' | translate }}</span>
            </div>
            <div class="border border-slate-800/60 rounded-lg p-4 bg-slate-900/30 flex flex-col justify-between min-h-[160px]">
              <div>
                <span class="text-xs font-bold text-purple-400 tracking-wider uppercase">{{ 'HERO.PREVIEW_CASH_TITLE' | translate }}</span>
                <div class="mt-3 space-y-2">
                  <div class="flex justify-between items-center text-xs border-b border-slate-800 pb-1">
                    <span class="text-slate-300">{{ 'HERO.PREVIEW_CASH_ITEM_1' | translate }}</span>
                    <span class="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">{{ 'HERO.PREVIEW_CASH_APPROVED' | translate }}</span>
                  </div>
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-slate-300">{{ 'HERO.PREVIEW_CASH_ITEM_2' | translate }}</span>
                    <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-medium">{{ 'HERO.PREVIEW_CASH_PENDING' | translate }}</span>
                  </div>
                </div>
              </div>
              <span class="text-xs text-slate-500 mt-2">{{ 'HERO.PREVIEW_CASH_UPDATED' | translate }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Features Grid Section -->
      <section id="features" class="py-24 px-6 border-t border-slate-900 bg-slate-900/10 relative">
        <div class="max-w-7xl mx-auto">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              {{ 'FEATURES.SECTION_TITLE' | translate }}
            </h2>
            <p class="text-slate-400">
              {{ 'FEATURES.SECTION_SUBTITLE' | translate }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Projects Card -->
            <div class="group relative rounded-2xl border border-slate-800 bg-slate-900/20 p-8 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-300">
              <div class="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ 'FEATURES.HUB_TITLE' | translate }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                {{ 'FEATURES.HUB_DESC' | translate }}
              </p>
            </div>

            <!-- Financials Card -->
            <div class="group relative rounded-2xl border border-slate-800 bg-slate-900/20 p-8 hover:border-purple-500/40 hover:bg-slate-900/40 transition-all duration-300">
              <div class="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ 'FEATURES.FIN_TITLE' | translate }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                {{ 'FEATURES.FIN_DESC' | translate }}
              </p>
            </div>

            <!-- Petty Cash Card -->
            <div class="group relative rounded-2xl border border-slate-800 bg-slate-900/20 p-8 hover:border-pink-500/40 hover:bg-slate-900/40 transition-all duration-300">
              <div class="h-12 w-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-3">{{ 'FEATURES.CASH_TITLE' | translate }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                {{ 'FEATURES.CASH_DESC' | translate }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="py-24 px-6 max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {{ 'PRICING.SECTION_TITLE' | translate }}
          </h2>
          <p class="text-slate-400">
            {{ 'PRICING.SECTION_SUBTITLE' | translate }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <!-- Free Plan -->
          <div class="flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-900/20 p-8 hover:border-slate-800 transition-all duration-300">
            <div>
              <span class="text-slate-400 text-sm font-semibold uppercase tracking-wider">{{ 'PRICING.FREE_TITLE' | translate }}</span>
              <div class="flex items-baseline mt-4">
                <span class="text-5xl font-extrabold text-white">$0</span>
                <span class="text-slate-500 text-sm ml-2">{{ 'PRICING.PER_MONTH' | translate }}</span>
              </div>
              <p class="text-slate-400 text-sm mt-6 leading-relaxed">
                {{ 'PRICING.FREE_DESC' | translate }}
              </p>
              <ul class="mt-8 space-y-4 text-sm text-slate-300">
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.FREE_FEAT_1' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.FREE_FEAT_2' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.FREE_FEAT_3' | translate }}
                </li>
              </ul>
            </div>
            <button (click)="navigateToLogin()" class="w-full py-3 mt-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-indigo-600 hover:text-white font-semibold text-slate-300 transition-all duration-200 cursor-pointer">
              {{ 'PRICING.FREE_CTA' | translate }}
            </button>
          </div>

          <!-- Standard Plan (Featured) -->
          <div class="relative flex flex-col justify-between rounded-2xl border-2 border-indigo-500 bg-slate-900/35 p-8 shadow-indigo-500/10 shadow-2xl transition-all duration-300 scale-100 md:scale-105">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider">
              {{ 'PRICING.STD_TAG' | translate }}
            </div>
            <div>
              <span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">{{ 'PRICING.STD_TITLE' | translate }}</span>
              <div class="flex items-baseline mt-4">
                <span class="text-5xl font-extrabold text-white">$29</span>
                <span class="text-slate-500 text-sm ml-2">{{ 'PRICING.PER_MONTH' | translate }}</span>
              </div>
              <p class="text-slate-400 text-sm mt-6 leading-relaxed">
                {{ 'PRICING.STD_DESC' | translate }}
              </p>
              <ul class="mt-8 space-y-4 text-sm text-slate-300">
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.STD_FEAT_1' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.STD_FEAT_2' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.STD_FEAT_3' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.STD_FEAT_4' | translate }}
                </li>
              </ul>
            </div>
            <button (click)="navigateToLogin()" class="w-full py-3 mt-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200 cursor-pointer">
              {{ 'PRICING.STD_CTA' | translate }}
            </button>
          </div>

          <!-- Premium Plan -->
          <div class="flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-900/20 p-8 hover:border-slate-800 transition-all duration-300">
            <div>
              <span class="text-slate-400 text-sm font-semibold uppercase tracking-wider">{{ 'PRICING.PREM_TITLE' | translate }}</span>
              <div class="flex items-baseline mt-4">
                <span class="text-5xl font-extrabold text-white">$79</span>
                <span class="text-slate-500 text-sm ml-2">{{ 'PRICING.PER_MONTH' | translate }}</span>
              </div>
              <p class="text-slate-400 text-sm mt-6 leading-relaxed">
                {{ 'PRICING.PREM_DESC' | translate }}
              </p>
              <ul class="mt-8 space-y-4 text-sm text-slate-300">
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.PREM_FEAT_1' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.PREM_FEAT_2' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.PREM_FEAT_3' | translate }}
                </li>
                <li class="flex items-center gap-3">
                  <span class="text-emerald-500">&checkmark;</span> {{ 'PRICING.PREM_FEAT_4' | translate }}
                </li>
              </ul>
            </div>
            <button (click)="navigateToLogin()" class="w-full py-3 mt-8 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-indigo-600 hover:text-white font-semibold text-slate-300 transition-all duration-200 cursor-pointer">
              {{ 'PRICING.PREM_CTA' | translate }}
            </button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>{{ 'FOOTER.COPYRIGHT' | translate }}</p>
      </footer>
    </div>
  `,
  styles: [`
    /* We can place component specific custom keyframes or styles here if needed */
  `]
})
export class LandingPageComponent {
  private readonly router = inject(Router);
  protected readonly langService = inject(LanguageService);

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

