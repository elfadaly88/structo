import { Component, inject, OnInit, signal, computed, Renderer2, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { PublicDirectoryService, TenantDto, PublicTenantPortfolioDto, PublicProjectDto } from '../../core/services/public-directory.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { WhatsAppLinkService } from '../../core/services/whatsapp-link.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <!-- Nav Bar -->
      <nav class="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
            <span class="text-white font-extrabold text-sm">أ</span>
          </div>
          <span class="text-base md:text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-cairo">أُسُس / Osos</span>
        </div>
        <div class="flex items-center gap-2 md:gap-4">
          <a href="#marketplace" class="hidden sm:inline-block text-xs md:text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-200 font-cairo">
            {{ 'USERS.TAB_USERS' | translate }}
          </a>
          <button 
            (click)="langService.toggleLanguage()"
            class="text-[10px] md:text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 active:scale-95">
            {{ langService.currentLang() === 'en' ? 'عربي' : 'English' }}
          </button>
          @if (authService.isAuthenticated()) {
            <span class="hidden lg:inline-block text-xs md:text-sm text-slate-400 font-medium font-cairo">
              Welcome back, <span class="text-white font-semibold">{{ authService.currentUser()?.name }}</span>
            </span>
            <a routerLink="/dashboard" class="relative group overflow-hidden px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-indigo-600 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
              <span class="relative z-10">Dashboard</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          } @else {
            <a routerLink="/login" class="text-xs md:text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 font-cairo px-1">
              {{ 'NAV.LOGIN' | translate }}
            </a>
            <button (click)="navigateToLogin()" class="relative group overflow-hidden px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-indigo-600 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
              <span class="relative z-10">{{ 'NAV.GET_STARTED' | translate }}</span>
              <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          }
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative pt-32 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-fade-in-down">
          <span>{{ 'HERO.LIVE_TAG' | translate }}</span>
        </div>

        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-5xl leading-tight mb-8 font-cairo">
          @if (langService.currentLang() === 'ar') {
            أُسُس | اضبط عُهد مشاريعك، وراقب مصاريف موقعك <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">في ثانية وبدون محاسب</span>
          } @else {
            Osos | Track your project cash & monitor site expenses <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">instantly without an accountant</span>
          }
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-cairo">
          {{ 'HERO.SUBTITLE' | translate }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-12">
          @if (authService.isAuthenticated()) {
            <a routerLink="/dashboard" class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer font-cairo">
              Go to Dashboard
              <span class="inline-block transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ml-1 rtl:mr-1 rtl:ml-0">&rarr;</span>
            </a>
          } @else {
            <button (click)="navigateToLogin()" class="px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl shadow-indigo-600/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer font-cairo">
              {{ langService.currentLang() === 'ar' ? 'ابدأ مشروعك الأول مجاناً فوراً' : 'Start Your First Project Free Now' }}
              <span class="inline-block transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ml-1 rtl:mr-1 rtl:ml-0">&rarr;</span>
            </button>
          }
          <a href="#marketplace" class="px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 font-semibold text-slate-300 hover:text-white transition-all duration-300 font-cairo">
            {{ 'MARKETPLACE.VIEW_PORTFOLIO' | translate }}
          </a>
        </div>

        <!-- Scroll Down Indicator to Marketplace -->
        <a href="#marketplace" class="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-100 opacity-80 mt-2">
          <span class="text-xs font-semibold text-slate-400 group-hover:text-indigo-400 font-cairo transition-colors duration-200">
            {{ langService.currentLang() === 'ar' ? 'استكشف دليل الشركات والمشاريع المسجلة بالمنصة' : 'Explore Registered Companies & Portfolios' }}
          </span>
          <div class="w-9 h-9 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 animate-bounce transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </a>
      </header>

      <!-- Modern 3-Card Pricing Section -->
      <section id="pricing" class="py-20 px-6 max-w-6xl mx-auto border-t border-slate-900">
        <!-- Section Header -->
        <div class="text-center mb-14 max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-cairo text-white">
            {{ langService.currentLang() === 'ar' ? 'خطط أسعار مرنة تناسب حجم أعمالك' : 'Transparent & Flexible Pricing' }}
          </h2>
          <p class="text-slate-400 font-cairo text-sm sm:text-base leading-relaxed">
            {{ langService.currentLang() === 'ar' ? 'جميع الأسعار بالجنيه المصري والدفع مرة واحدة بدون أي اشتراكات شهرية متكررة.' : 'All prices in EGP with one-time payment and zero recurring monthly fees.' }}
          </p>
        </div>

        <!-- 3-Card Pricing Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">

          <!-- Card 1: Free Lifetime Plan -->
          <div class="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 shadow-xl relative group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">🎁 مجاناً للأبد</span>
                <span class="text-xs font-mono text-slate-500 font-bold">0 EGP</span>
              </div>
              <h3 class="text-xl font-bold text-white font-cairo mb-2">الباقة المجانية / Free</h3>
              <div class="my-4">
                <span class="text-3xl font-extrabold text-emerald-400 font-mono">0 ج.م</span>
                <span class="text-xs text-slate-400 font-cairo block mt-1">مجاني مدى الحياة / Free Forever</span>
              </div>
              <ul class="space-y-3 my-6 text-xs text-slate-300 font-cairo">
                <li class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">✓</span>
                  <span>2 مشاريع مجاناً مدى الحياة (2 Lifetime Projects)</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">✓</span>
                  <span>إمكانية تجربة كامل ميزات المنصة</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-emerald-400 font-bold">✓</span>
                  <span>بدون أي بطاقة إئتمانية</span>
                </li>
              </ul>
            </div>
            <button 
              (click)="onSelectPricingPlan(0)"
              class="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs rounded-xl font-cairo transition-all duration-200 text-center shadow-md cursor-pointer block">
              <span>ابدأ مجاناً الان / Start Free</span>
            </button>
          </div>

          <!-- Card 2: +1 Single Project Topup -->
          <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 shadow-xl relative group">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-cairo">📦 مشروع إضافي</span>
                <span class="text-xs font-mono text-slate-400 font-bold">250 EGP</span>
              </div>
              <h3 class="text-xl font-bold text-white font-cairo mb-2">مشروع إضافي / Single Project</h3>
              <div class="my-4">
                <span class="text-3xl font-extrabold text-white font-mono">250 ج.م</span>
                <span class="text-xs text-slate-400 font-cairo block mt-1">دفع مرة واحدة / One-Time Payment</span>
              </div>
              <ul class="space-y-3 my-6 text-xs text-slate-300 font-cairo">
                <li class="flex items-center gap-2">
                  <span class="text-indigo-400 font-bold">✓</span>
                  <span>إضافة مشروع 1 إضافي لرصيدك الحالي</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-indigo-400 font-bold">✓</span>
                  <span>تفعيل فوري ومباشر</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-indigo-400 font-bold">✓</span>
                  <span>الملكية دائمة بدون اشتراك شهري</span>
                </li>
              </ul>
            </div>
            <button 
              (click)="onSelectPricingPlan(1)"
              class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl font-cairo transition-all duration-200 text-center shadow-lg shadow-indigo-600/30 cursor-pointer block">
              <span>شراء مشروع إضافي / Buy Single Project</span>
            </button>
          </div>

          <!-- Card 3: +5 Projects Package (Highlighted Card) -->
          <div class="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-amber-950/30 border-2 border-indigo-500 shadow-xl shadow-indigo-500/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-400 transition-all duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-2xl font-cairo shadow-md">
              ⭐️ الأكثر مبيعاً - توفير 300 ج.م
            </div>
            <div class="pt-2">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 font-cairo">🚀 حزمة 5 مشاريع</span>
                <span class="text-xs font-mono text-amber-400 font-bold">950 EGP</span>
              </div>
              <h3 class="text-xl font-extrabold text-white font-cairo mb-2">حزمة 5 مشاريع / +5 Projects</h3>
              <div class="my-4">
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-extrabold text-amber-400 font-mono">950 ج.م</span>
                  <span class="text-sm text-slate-500 line-through font-mono">1,250 ج.م</span>
                </div>
                <span class="text-xs text-amber-300/90 font-cairo block mt-1">دفع مرة واحدة بدلاً من 1250 ج.م</span>
              </div>
              <ul class="space-y-3 my-6 text-xs text-slate-200 font-cairo">
                <li class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">✓</span>
                  <span>إضافة 5 مشاريع كاملة لرصيدك الحالي</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">✓</span>
                  <span>توفير 300 ج.م فوراً</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-amber-400 font-bold">✓</span>
                  <span>أولوية والدعم الفني</span>
                </li>
              </ul>
            </div>
            <button 
              (click)="onSelectPricingPlan(5)"
              class="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl font-cairo transition-all duration-200 text-center shadow-xl shadow-indigo-600/30 active:scale-[0.98] ring-2 ring-amber-500/30 cursor-pointer block">
              <span>اشترِ الحزمة ووفر الان / Buy Package & Save</span>
            </button>
          </div>

        </div>

        <!-- Scroll Down Cue to Directory -->
        <div class="mt-12 text-center flex flex-col items-center">
          <a href="#marketplace" class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-800 hover:border-indigo-500/40 bg-slate-900/60 hover:bg-indigo-950/30 text-xs font-bold text-slate-300 hover:text-indigo-300 transition-all duration-300 shadow-lg group cursor-pointer font-cairo">
            <span>{{ langService.currentLang() === 'ar' ? 'تصفح قائمة الشركات والمشاريع المشتركة معنا' : 'Browse Subscribed Companies & Projects Directory' }}</span>
            <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      <!-- MARKETPLACE SaaS DIRECTORY -->
      <section id="marketplace" class="py-20 px-6 border-t border-slate-900 bg-slate-900/10 relative">
        <div class="max-w-7xl mx-auto">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 font-cairo">
              {{ 'MARKETPLACE.SECTION_TITLE' | translate }}
            </h2>
            <p class="text-slate-400 font-cairo text-sm">
              {{ 'MARKETPLACE.SECTION_SUBTITLE' | translate }}
            </p>
          </div>

          <!-- Filter Controls -->
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 mb-10 grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-cairo">{{ 'MARKETPLACE.FILTER_REGION' | translate }}</label>
              <input 
                type="text" 
                [(ngModel)]="regionFilter" 
                (ngModelChange)="onFilterChange()"
                [placeholder]="'MARKETPLACE.SEARCH_PLACEHOLDER' | translate"
                class="w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-cairo">{{ 'MARKETPLACE.FILTER_CATEGORY' | translate }}</label>
              <select 
                [(ngModel)]="categoryFilter" 
                (ngModelChange)="onFilterChange()"
                class="w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option value="">{{ langService.currentLang() === 'ar' ? 'جميع التصنيفات' : 'All Categories' }}</option>
                <option value="Residential">{{ 'PROJECTS.CATEGORIES.Residential' | translate }}</option>
                <option value="Commercial">{{ 'PROJECTS.CATEGORIES.Commercial' | translate }}</option>
                <option value="Industrial">{{ 'PROJECTS.CATEGORIES.Industrial' | translate }}</option>
                <option value="Other">{{ 'PROJECTS.CATEGORIES.Other' | translate }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 font-cairo">{{ 'MARKETPLACE.FILTER_RATING' | translate }}</label>
              <select 
                [(ngModel)]="ratingFilter" 
                (ngModelChange)="onFilterChange()"
                class="w-full px-3 py-2 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option [value]="undefined">All Ratings</option>
                <option value="3">3.0+ Stars</option>
                <option value="4">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>

          <!-- Company Portfolios Grid -->
          @if (isLoading()) {
            <div class="flex justify-center py-16">
              <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (comp of companies(); track comp.id) {
                <div class="group flex flex-col justify-between bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-300 shadow-xl">
                  <div>
                    <div class="flex items-center gap-4 mb-4">
                      <!-- Company Logo -->
                      @if (comp.logoUrl) {
                        <div class="relative h-12 w-12 rounded-xl border border-slate-700 bg-slate-950 overflow-hidden flex items-center justify-center shrink-0">
                          <img [src]="comp.logoUrl" (error)="onLogoError($event)" alt="" class="h-full w-full object-cover">
                          <div class="hidden h-full w-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-base shadow-md font-cairo">
                            {{ comp.name.substring(0,2) }}
                          </div>
                        </div>
                      } @else {
                        <div class="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-base shadow-md font-cairo shrink-0">
                          {{ comp.name.substring(0,2) }}
                        </div>
                      }
                      <div>
                        <h3 class="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 font-cairo">{{ comp.name }}</h3>
                        <p class="text-xs text-slate-500 font-mono">{{ comp.region || 'Global' }}</p>
                      </div>
                    </div>

                    <p class="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {{ comp.companyDescription || 'No description available for this corporate portfolio yet.' }}
                    </p>
                  </div>

                  <div class="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                    <!-- Rating Indicator -->
                    <button
                      (click)="openReviewsModal($event, comp.id, comp.name)"
                      title="View client reviews"
                      class="flex items-center gap-1.5 cursor-pointer hover:underline text-amber-400 hover:text-amber-300 font-bold focus:outline-none bg-transparent border-0 p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span class="text-sm font-bold">{{ comp.rating | number:'1.1-1' }}</span>
                    </button>

                    <button 
                      (click)="openPortfolioModal(comp.id)"
                      class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white shadow-md shadow-indigo-600/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer font-cairo">
                      {{ 'MARKETPLACE.VIEW_PORTFOLIO' | translate }}
                    </button>
                  </div>
                </div>
              } @empty {
                <div class="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p class="font-bold font-cairo">{{ 'MARKETPLACE.NO_COMPANIES' | translate }}</p>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- PORTFOLIO PROFILE DETAILS MODAL -->
      @if (isModalOpen() && selectedCompany()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
          <div (click)="closeModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-md"></div>

          <div class="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-11/12 sm:w-full max-h-[92vh] flex flex-col p-0 shadow-2xl z-10 font-sans overflow-hidden">
            
            <!-- 1️⃣ FIXED TOP HEADER (PERMANENTLY VISIBLE ON SCROLL) -->
            <div class="shrink-0 bg-slate-900 border-b border-slate-800 relative z-20 shadow-md">
              <!-- Banner Container with Dark Gradient Overlay -->
              <div class="relative h-28 sm:h-36 w-full bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-slate-800/80 overflow-hidden">
                @if (selectedCompany()!.bannerUrl) {
                  <img [src]="selectedCompany()!.bannerUrl" (error)="onImgError($event)" alt="" class="w-full h-full object-cover">
                }
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                <!-- Close Button (X) -->
                <button 
                  (click)="closeModal()"
                  class="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/70 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-950 transition-all duration-150 cursor-pointer shadow-lg z-30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Fixed Avatar & Profile Summary Bar -->
              <div class="px-4 sm:px-8 pb-4 pt-1 font-cairo">
                <div class="relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 -mt-10 sm:-mt-12 z-10">
                  <!-- Company Avatar & Name -->
                  <div class="flex items-end gap-4">
                    @if (selectedCompany()!.logoUrl) {
                      <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl border-4 border-slate-900 bg-slate-950 shadow-2xl overflow-hidden shrink-0 flex items-center justify-center">
                        <img [src]="selectedCompany()!.logoUrl" (error)="onLogoError($event)" alt="" class="h-full w-full object-cover">
                      </div>
                    } @else {
                      <div class="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center font-black text-white text-2xl sm:text-3xl border-4 border-slate-900 shadow-2xl font-cairo shrink-0">
                        {{ selectedCompany()!.name.substring(0,2) }}
                      </div>
                    }
                    <div>
                      <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight font-cairo">{{ selectedCompany()!.name }}</h2>
                      <div class="flex items-center gap-3 mt-1 flex-wrap">
                        <span class="text-xs sm:text-sm text-indigo-400 font-bold font-cairo flex items-center gap-1">
                          📍 {{ selectedCompany()!.region || 'مصر' }}
                        </span>
                        <span class="h-1.5 w-1.5 rounded-full bg-slate-700"></span>
                        <button
                          (click)="openReviewsModal($event, selectedCompany()!.id, selectedCompany()!.name)"
                          title="View all client reviews"
                          class="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer bg-slate-950/60 px-2.5 py-1 rounded-lg border border-amber-500/20">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{{ selectedCompany()!.rating | number:'1.1-1' }}</span>
                          <span class="text-[10px] text-amber-400/80 font-normal">(تقييمات العملاء)</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Projects Stats Badge -->
                  <div class="px-3.5 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-2.5 shadow-md shrink-0">
                    <span class="text-xs text-slate-400 font-bold font-cairo">المشاريع الموثقة</span>
                    <span class="text-base font-black text-indigo-400 font-mono">{{ selectedCompany()!.projects.length }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2️⃣ SCROLLABLE CONTENT AREA (PROJECTS GRID & ABOUT SCROLL UNDERNEATH) -->
            <div class="overflow-y-auto min-h-0 w-full flex-1 px-4 sm:px-8 py-6 font-cairo scrollbar-none space-y-6">
              <!-- About Description Section -->
              <div>
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider font-cairo mb-2 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                  عن الشركة والنشاط
                </h3>
                <p class="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 border border-slate-800/60 rounded-2xl p-4 sm:p-5 shadow-inner font-cairo">
                  {{ selectedCompany()!.companyDescription || 'لا يتوفر وصف منفصل لهذا الملف التعريفي للشركة حالياً.' }}
                </p>
              </div>

              <!-- Public Projects Grid Showcase -->
              <div>
                <h3 class="text-base font-extrabold text-white font-cairo mb-4 border-b border-slate-800 pb-3 flex items-center justify-between">
                  <span class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    معرض المشاريع المنفذة والعلنية
                  </span>
                  <span class="text-xs font-normal text-slate-400">({{ selectedCompany()!.projects.length }} مشروع)</span>
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  @for (proj of selectedCompany()!.projects; track proj.id) {
                    @let meta = parseProjectDetails(proj.description);
                    <div class="bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-xl group">
                      <!-- Project Card Cover Photo & Badges (Click Cover to Open Lightbox) -->
                      <div 
                        (click)="proj.sitePhotos && proj.sitePhotos.length > 0 && openLightbox(proj.sitePhotos, 0, $event)"
                        class="relative h-44 w-full bg-slate-900 overflow-hidden"
                        [class.cursor-pointer]="proj.sitePhotos && proj.sitePhotos.length > 0">
                        @if (proj.sitePhotos && proj.sitePhotos.length > 0) {
                          <img [src]="proj.sitePhotos[0]" (error)="onImgError($event)" alt="{{ proj.name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span class="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold font-cairo flex items-center gap-1.5 shadow-xl border border-white/20">
                              🔍 معاينة الصورة بالكامل
                            </span>
                          </div>
                        } @else {
                          <div class="w-full h-full bg-gradient-to-br from-slate-900 to-indigo-950/40 flex flex-col items-center justify-center p-4 text-slate-600">
                            <svg class="w-10 h-10 mb-2 opacity-40 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
                            </svg>
                            <span class="text-xs text-slate-500 font-cairo">معرض صور قيد التحديث</span>
                          </div>
                        }

                        <!-- Category / Classification Badge -->
                        <div class="absolute top-3 right-3 flex items-center gap-2">
                          <span class="px-3 py-1 rounded-xl text-xs font-bold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 font-cairo shadow-lg">
                            {{ meta.category || 'عام' }}
                          </span>
                        </div>

                        <!-- Photos Count Badge -->
                        @if (proj.sitePhotos && proj.sitePhotos.length > 0) {
                          <div class="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-slate-200 flex items-center gap-1 font-mono">
                            📷 {{ proj.sitePhotos.length }} صور
                          </div>
                        }
                      </div>

                      <!-- Project Card Content -->
                      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 class="text-lg font-bold text-white font-cairo group-hover:text-indigo-400 transition-colors line-clamp-1">{{ proj.name }}</h4>
                          @if (meta.governorate) {
                            <p class="text-xs text-indigo-400 font-cairo font-medium mt-1">📍 {{ meta.governorate }} @if (meta.cityOrZone) { - {{ meta.cityOrZone }} }</p>
                          }
                          <p class="text-xs text-slate-400 leading-relaxed font-cairo mt-2 line-clamp-2">
                            {{ meta.cleanDescription || ('PROJECTS.NO_DESCRIPTION' | translate) }}
                          </p>
                        </div>

                        <!-- Card Footer Action Button -->
                        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span class="text-[11px] text-slate-500 font-mono">
                            {{ proj.startDate | date:'dd/MM/yyyy' }}
                          </span>
                          <button
                            (click)="toggleProjectDetailsExpand(proj.id)"
                            class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 transition-all cursor-pointer font-cairo flex items-center gap-1.5">
                            <span>عرض التفاصيل والصور</span>
                            <svg class="w-3.5 h-3.5 transition-transform" [class.rotate-180]="expandedProjectId() === proj.id" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        <!-- Expanded Project Details & Photos Gallery -->
                        @if (expandedProjectId() === proj.id) {
                          <div class="pt-3 border-t border-slate-800/80 space-y-3 animate-fade-in">
                            @if (proj.sitePhotos && proj.sitePhotos.length > 0) {
                              <div class="grid grid-cols-3 gap-2">
                                @for (photo of proj.sitePhotos; track photo; let idx = $index) {
                                  <div 
                                    (click)="openLightbox(proj.sitePhotos, idx, $event)"
                                    class="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer group/photo">
                                    <img [src]="photo" (error)="onImgError($event)" alt="" class="w-full h-full object-cover group-hover/photo:scale-110 transition-transform">
                                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                                      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                      </svg>
                                    </div>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  } @empty {
                    <div class="col-span-2 py-12 text-center text-slate-500 font-cairo text-sm bg-slate-950/40 rounded-2xl border border-slate-800">
                      لا يوجد مشاريع علنية مضافة في المعرض العام لهذه الشركة حتى الآن.
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- 🖼️ FULLSCREEN LIGHTBOX VIEWER -->
      @if (isLightboxOpen() && lightboxPhotos().length > 0) {
        <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
          <!-- Backdrop Click to Close -->
          <div (click)="closeLightbox()" class="absolute inset-0 z-0"></div>

          <!-- Close Button (X) -->
          <button 
            (click)="closeLightbox()" 
            class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-2xl">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Counter Indicator -->
          <div class="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2 font-cairo">
            <span>📷</span>
            <span>{{ activeLightboxIndex() + 1 }} / {{ lightboxPhotos().length }}</span>
          </div>

          <!-- Main Image Container -->
          <div class="relative z-10 max-w-5xl max-h-[85vh] flex items-center justify-center p-2">
            <img 
              [src]="lightboxPhotos()[activeLightboxIndex()]" 
              (error)="onImgError($event)" 
              alt="Public Portfolio Photo" 
              class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-200">
          </div>

          <!-- Navigation Arrow Prev (<) & Next (>) -->
          @if (lightboxPhotos().length > 1) {
            <button 
              (click)="prevLightboxPhoto()" 
              class="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
              <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              (click)="nextLightboxPhoto()" 
              class="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
              <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          }
        </div>
      }

      <!-- CLIENT REVIEWS LEDGER MODAL -->
      @if (isReviewsModalOpen()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <div (click)="closeReviewsModal()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

          <div class="relative z-10 w-full max-w-2xl mx-auto my-auto max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/85 font-sans">
            <!-- Modal Header -->
            <div class="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 px-5 py-4 backdrop-blur-sm flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-cairo">سجل تقييمات العملاء / Client Reviews Ledger</span>
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
                <div class="space-y-4">
                  @for (rev of reviewsList(); track rev.projectName) {
                    <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-2.5">
                      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <h4 class="text-sm font-bold text-white font-cairo">{{ rev.clientName || 'العميل الكريم' }}</h4>
                          <span class="text-[11px] text-slate-500 font-cairo font-medium">مشروع: {{ rev.projectName }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          @for (star of [1,2,3,4,5]; track star) {
                            <span class="text-base" [class.text-amber-400]="star <= rev.ratingScore" [class.text-slate-800]="star > rev.ratingScore">★</span>
                          }
                          <span class="text-[10px] font-mono text-slate-500 ml-1">({{ rev.reviewDate | date:'dd/MM/yyyy' }})</span>
                        </div>
                      </div>
                      
                      @if (rev.comment) {
                        <div class="text-xs text-slate-300 leading-relaxed font-cairo bg-slate-900/30 border border-slate-850 p-3 rounded-lg max-h-36 overflow-y-auto italic">
                          {{ rev.comment }}
                        </div>
                      } @else {
                        <p class="text-[11px] text-slate-600 italic font-cairo bg-slate-900/10 border border-slate-850/40 p-2.5 rounded-lg">لم يترك العميل تعليقاً نصياً.</p>
                      }
                    </div>
                  } @empty {
                    <div class="py-12 text-center text-slate-500 text-sm font-cairo">لا توجد تقييمات مكتوبة مسجلة لهذه الشركة بعد.</div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- Footer -->
      <footer class="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <p>{{ 'FOOTER.COPYRIGHT' | translate }}</p>
      </footer>
    </div>
  `,
  styles: [`
    .font-cairo {
      font-family: 'Cairo', 'Inter', sans-serif;
    }
  `]
})
export class LandingPageComponent implements OnInit {
  private readonly router = inject(Router);
  protected readonly langService = inject(LanguageService);
  protected readonly authService = inject(AuthService);
  private readonly directoryService = inject(PublicDirectoryService);
  private readonly whatsappLink = inject(WhatsAppLinkService);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  readonly companies = signal<TenantDto[]>([]);
  readonly selectedCompany = signal<PublicTenantPortfolioDto | null>(null);
  readonly isModalOpen = signal(false);
  readonly isLoading = signal(false);
  readonly expandedProjectId = signal<string | null>(null);

  // Lightbox Viewer State
  readonly lightboxPhotos = signal<string[]>([]);
  readonly activeLightboxIndex = signal<number>(0);
  readonly isLightboxOpen = signal<boolean>(false);

  openLightbox(photos: string[], startIndex: number = 0, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (!photos || photos.length === 0) return;
    this.lightboxPhotos.set(photos);
    this.activeLightboxIndex.set(startIndex);
    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
    this.lightboxPhotos.set([]);
    this.activeLightboxIndex.set(0);
  }

  nextLightboxPhoto(): void {
    const photos = this.lightboxPhotos();
    if (photos.length === 0) return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() + 1) % photos.length);
  }

  prevLightboxPhoto(): void {
    const photos = this.lightboxPhotos();
    if (photos.length === 0) return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() - 1 + photos.length) % photos.length);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isLightboxOpen()) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowRight') {
        this.nextLightboxPhoto();
      } else if (event.key === 'ArrowLeft') {
        this.prevLightboxPhoto();
      }
    } else if (this.isModalOpen() && event.key === 'Escape') {
      this.closeModal();
    } else if (this.isReviewsModalOpen() && event.key === 'Escape') {
      this.closeReviewsModal();
    }
  }

  // Reviews states
  readonly isReviewsModalOpen = signal(false);
  readonly reviewsModalTenantName = signal('');
  readonly reviewsList = signal<any[]>([]);
  readonly isLoadingReviews = signal(false);

  openReviewsModal(event: Event, tenantId: string, tenantName: string): void {
    event.stopPropagation(); // Avoid triggering details modal if clicked inside company card
    this.reviewsModalTenantName.set(tenantName);
    this.isReviewsModalOpen.set(true);
    this.isLoadingReviews.set(true);
    this.reviewsList.set([]);

    this.directoryService.getTenantReviews(tenantId).subscribe({
      next: (res) => {
        this.isLoadingReviews.set(false);
        if (res.success && res.data) {
          this.reviewsList.set(res.data);
        }
      },
      error: () => {
        this.isLoadingReviews.set(false);
      }
    });
  }

  closeReviewsModal(): void {
    this.isReviewsModalOpen.set(false);
    this.reviewsModalTenantName.set('');
    this.reviewsList.set([]);
  }

  // Pricing state
  readonly sliderVal = signal(1);
  readonly pricingInfo = computed(() => {
    const val = this.sliderVal();
    const isAr = this.langService.currentLang() === 'ar';

    if (val <= 2) {
      return {
        planNameAr: 'الباقة المجانية',
        planNameEn: 'Free Plan',
        price: '0 EGP',
        periodAr: 'تفعيل فوري لمدى الحياة (مجاني للأبد)',
        periodEn: 'Lifetime instant activation (Free forever)',
        isCustom: false,
        noteAr: 'الباقة المجانية الأساسية — تتضمن مشروعين (2) نشطين مجاناً مدى الحياة.',
        noteEn: 'Basic Free Plan — includes 2 active projects free for lifetime.'
      };
    }

    if (val >= 7) {
      return {
        planNameAr: 'باقة 5 مشاريع (+2 مجاناً)',
        planNameEn: '5-Project Pack (+2 Free)',
        price: '950 EGP',
        periodAr: 'دفع مرة واحدة — توفير إضافي (أكثر من 7؟ تواصل معنا)',
        periodEn: 'One-time payment — Save 300 EGP (7+ contact support)',
        isCustom: false,
        noteAr: 'الباقة المجانية (2 مشاريع) + باقة 5 مشاريع إضافية (توفير 300 جنيه).',
        noteEn: 'Free Plan (2 Projects) + 5-Project Pack (Save 300 EGP).',

      };
    }

    const map: Record<number, {
      planNameAr: string;
      planNameEn: string;
      price: string;
      periodAr: string;
      periodEn: string;
      isCustom: boolean;
      noteAr: string;
      noteEn: string;
    }> = {
      3: {
        planNameAr: '+1 مشروع إضافي',
        planNameEn: '+1 Extra Project',
        price: '250 EGP',
        periodAr: 'دفع مرة واحدة — تفعيل فوري',
        periodEn: 'One-time payment — Instant activation',
        isCustom: false,
        noteAr: 'الباقة المجانية (2 مشاريع) + مشروع إضافي واحد بتكلفة 250 ج.م.',
        noteEn: 'Free Plan (2 Projects) + 1 Extra Project (250 EGP).'
      },
      4: {
        planNameAr: '+2 مشروع إضافي',
        planNameEn: '+2 Extra Projects',
        price: '500 EGP',
        periodAr: 'دفع مرة واحدة — تفعيل فوري',
        periodEn: 'One-time payment — Instant activation',
        isCustom: false,
        noteAr: 'الباقة المجانية (2 مشاريع) + 2 مشروع إضافي بتكلفة 500 ج.م.',
        noteEn: 'Free Plan (2 Projects) + 2 Extra Projects (500 EGP).'
      },
      5: {
        planNameAr: '+3 مشاريع إضافية',
        planNameEn: '+3 Extra Projects',
        price: '750 EGP',
        periodAr: 'دفع مرة واحدة — تفعيل فوري',
        periodEn: 'One-time payment — Instant activation',
        isCustom: false,
        noteAr: 'الباقة المجانية (2 مشاريع) + 3 مشاريع إضافية بتكلفة 750 ج.م.',
        noteEn: 'Free Plan (2 Projects) + 3 Extra Projects (750 EGP).'
      },
      6: {
        planNameAr: 'باقة 5 مشاريع (+5)',
        planNameEn: '5-Project Pack (+5)',
        price: '950 EGP',
        periodAr: 'دفع مرة واحدة — توفير إضافي (وفر 300 ج.م)',
        periodEn: 'One-time payment — Save 300 EGP',
        isCustom: false,
        noteAr: 'توفير متميز: باقة 5 مشاريع إضافية تمنحك 7 مشاريع كلياً بـ 950 ج.م فقط (أوفر من شراء 4 مشاريع فردية).',
        noteEn: 'Best Value: 5-Project Pack gives 7 total projects for 950 EGP (cheaper than 4 single projects).'
      }
    };

    return {
      planNameAr: map[val]?.planNameAr || 'مخصص',
      planNameEn: map[val]?.planNameEn || 'Custom',
      price: map[val]?.price || 'Custom',
      periodAr: map[val]?.periodAr || '',
      periodEn: map[val]?.periodEn || '',
      isCustom: map[val]?.isCustom || false,
      noteAr: map[val]?.noteAr || '',
      noteEn: map[val]?.noteEn || ''
    };
  });

  // Filters
  regionFilter = '';
  categoryFilter = '';
  ratingFilter: number | undefined = undefined;

  ngOnInit(): void {
    this.fetchCompanies();
  }

  onSliderInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.sliderVal.set(parseInt(target.value, 10));
  }

  onPricingAction(): void {
    if (this.pricingInfo().isCustom) {
      const msg = `مرحباً، أود ترقية باقة المشاريع لمنصة أُسُس لعدد 10+ مشاريع.`;
      this.whatsappLink.openChat('201004500766', msg);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSelectPricingPlan(extraProjectsCount: number = 0): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard/projects']);
    } else {
      if (extraProjectsCount === 0) {
        this.router.navigate(['/register']);
      } else {
        this.router.navigate(['/register'], { queryParams: { plan: extraProjectsCount } });
      }
    }
  }

  fetchCompanies(): void {
    this.isLoading.set(true);
    this.directoryService.getTenants({
      region: this.regionFilter || undefined,
      category: this.categoryFilter || undefined,
      minRating: this.ratingFilter
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.companies.set(res.data);
        }
      },
      error: () => this.isLoading.set(false)
    });
  }

  onFilterChange(): void {
    this.fetchCompanies();
  }

  openPortfolioModal(id: string): void {
    this.directoryService.getTenantPortfolio(id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.selectedCompany.set(res.data);
          this.isModalOpen.set(true);
          this.renderer.addClass(this.document.body, 'overflow-hidden');
        }
      }
    });
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedCompany.set(null);
    this.expandedProjectId.set(null);
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
  }

  toggleProjectDetailsExpand(id: string): void {
    if (this.expandedProjectId() === id) {
      this.expandedProjectId.set(null);
    } else {
      this.expandedProjectId.set(id);
    }
  }

  parseProjectDetails(rawDescription?: string): {
    cleanDescription: string;
    category: string;
    governorate: string;
    cityOrZone: string;
    client: string;
  } {
    if (!rawDescription) {
      return { cleanDescription: '', category: '', governorate: '', cityOrZone: '', client: '' };
    }
    if (rawDescription.startsWith('{')) {
      try {
        const parsed = JSON.parse(rawDescription);
        return {
          cleanDescription: parsed.description || '',
          category: parsed.category || '',
          governorate: parsed.governorate || '',
          cityOrZone: parsed.cityOrZone || '',
          client: parsed.client || ''
        };
      } catch (e) { }
    }
    return { cleanDescription: rawDescription, category: '', governorate: '', cityOrZone: '', client: '' };
  }


  getCategoryTranslation(cat?: string): string {
    if (!cat) return 'PROJECTS.CATEGORIES.Other';
    const trimmed = cat.trim();
    const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    const known = ['Residential', 'Commercial', 'Industrial', 'Other'];
    if (known.includes(normalized)) {
      return `PROJECTS.CATEGORIES.${normalized}`;
    }
    return 'PROJECTS.CATEGORIES.Other';
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const fallback = img.nextElementSibling as HTMLElement;
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.classList.add('flex');
      }
    }
  }

  onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const fallback = img.nextElementSibling as HTMLElement;
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.classList.add('flex');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
