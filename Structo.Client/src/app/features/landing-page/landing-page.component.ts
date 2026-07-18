import { Component, inject, OnInit, signal, computed, Renderer2 } from '@angular/core';
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
          <span class="text-base md:text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-cairo">أُسُس / Ousos</span>
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
            Ousos | Track your project cash & monitor site expenses <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">instantly without an accountant</span>
          }
        </h1>

        <p class="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-cairo">
          {{ 'HERO.SUBTITLE' | translate }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 mb-16">
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
      </header>

      <!-- Interactive Pricing Calculator Section -->
      <section id="pricing" class="py-16 px-6 max-w-4xl mx-auto border-t border-slate-900">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-extrabold tracking-tight mb-2 font-cairo">
            {{ langService.currentLang() === 'ar' ? 'حاسبة الأسعار التفاعلية' : 'Interactive Pricing Calculator' }}
          </h2>
          <p class="text-slate-400 font-cairo text-sm max-w-lg mx-auto">
            {{ langService.currentLang() === 'ar' ? 'اختر عدد المشاريع التي تحتاج لإدارتها وشاهد التكلفة فوراً.' : 'Select the number of projects you need to manage and see the cost instantly.' }}
          </p>
        </div>

        <div class="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div class="absolute -right-16 -top-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div class="absolute -left-16 -bottom-16 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>

          <!-- Left side: Slider -->
          <div class="w-full md:w-3/5 space-y-6">
            <div class="flex justify-between items-center">
              <span class="text-sm font-semibold text-slate-400 font-cairo">
                {{ langService.currentLang() === 'ar' ? 'عدد المشاريع المطلوبة' : 'Number of Projects' }}
              </span>
              <span class="text-2xl font-extrabold text-indigo-400 font-mono">
                {{ sliderVal() }} @if (sliderVal() === 10) { + }
              </span>
            </div>

            <div class="relative pt-2">
              <input 
                type="range" 
                min="1" 
                max="10" 
                [value]="sliderVal()" 
                (input)="onSliderInput($event)"
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none">
              
              <div class="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10+</span>
              </div>
            </div>

            <!-- Features Included Dynamic text -->
            <div class="p-4 bg-slate-950/40 border border-slate-800/80 rounded-2xl flex items-center gap-3">
              <div class="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                💡
              </div>
              <p class="text-xs text-slate-300 font-cairo">
                {{ langService.currentLang() === 'ar' ? pricingInfo().noteAr : pricingInfo().noteEn }}
              </p>
            </div>
          </div>

          <!-- Right side: Price display card -->
          <div class="w-full md:w-2/5 p-6 bg-slate-950 border border-slate-800/80 rounded-2xl flex flex-col justify-between text-center min-h-[180px] shadow-lg">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-cairo block mb-1">
                {{ langService.currentLang() === 'ar' ? 'التكلفة الإجمالية' : 'Total Price' }}
              </span>
              <div class="text-3xl font-extrabold text-white font-mono my-2 tracking-tight">
                {{ pricingInfo().price }}
              </div>
              <span class="text-[10px] text-slate-500 font-cairo">
                {{ langService.currentLang() === 'ar' ? 'تفعيل فوري لمدى الحياة' : 'Lifetime instant activation' }}
              </span>
            </div>

            <button 
              (click)="onPricingAction()"
              class="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white font-cairo transition-all duration-150 flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer">
              {{ pricingInfo().isCustom 
                  ? (langService.currentLang() === 'ar' ? 'تواصل مع الإدارة' : 'Contact Support') 
                  : (langService.currentLang() === 'ar' ? 'ابدأ الآن' : 'Get Started') }}
            </button>
          </div>
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
                <option value="">All Categories</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
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
                        <img [src]="comp.logoUrl" alt="Logo" class="h-12 w-12 rounded-xl object-cover border border-slate-700 bg-slate-950">
                      } @else {
                        <div class="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-base shadow-md">
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
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div (click)="closeModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

          <div class="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col p-0 shadow-2xl z-10 font-sans">
            <div class="overflow-y-auto min-h-0 w-full flex-1">
            <!-- Banner Image -->
            <div class="relative h-44 w-full bg-gradient-to-r from-indigo-950 via-purple-950 to-pink-950 border-b border-slate-800">
              @if (selectedCompany()!.bannerUrl) {
                <img [src]="selectedCompany()!.bannerUrl" alt="Banner" class="w-full h-full object-cover">
              }
              <button 
                (click)="closeModal()"
                class="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-950/40 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-950/60 transition-colors duration-150 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Profile Info Box -->
            <div class="px-6 md:px-8 pb-8 pt-4 space-y-6 relative">
              <!-- Float Logo -->
              <div class="absolute -top-12 left-6 md:left-8">
                @if (selectedCompany()!.logoUrl) {
                  <img [src]="selectedCompany()!.logoUrl" alt="Logo" class="h-20 w-20 rounded-2xl object-cover border-4 border-slate-900 bg-slate-950 shadow-lg">
                } @else {
                  <div class="h-20 w-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-2xl border-4 border-slate-900 shadow-lg">
                    {{ selectedCompany()!.name.substring(0,2) }}
                  </div>
                }
              </div>

              <!-- General details -->
              <div class="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 class="text-2xl font-extrabold text-white font-cairo">{{ selectedCompany()!.name }}</h2>
                  <div class="flex items-center gap-4 mt-1">
                    <span class="text-sm text-slate-400 font-mono">{{ selectedCompany()!.region || 'Global' }}</span>
                    <span class="h-1.5 w-1.5 rounded-full bg-slate-700"></span>
                    <button
                      (click)="openReviewsModal($event, selectedCompany()!.id, selectedCompany()!.name)"
                      title="View all client reviews"
                      class="flex items-center gap-1 text-sm font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer bg-transparent border-0 p-0 focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-400 fill-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {{ selectedCompany()!.rating | number:'1.1-1' }}
                    </button>
                  </div>
                </div>
                <div class="px-5 py-2.5 bg-slate-950/40 border border-slate-800 rounded-xl flex items-center gap-3">
                  <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'MARKETPLACE.STATS_PROJECTS' | translate }}</span>
                  <span class="text-xl font-extrabold text-white">{{ selectedCompany()!.projects.length }}</span>
                </div>
              </div>

              <!-- About description -->
              <div>
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider font-cairo mb-2">{{ 'PROFILE.FIELD_COMP_DESC' | translate }}</h3>
                <p class="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/20 border border-slate-800/40 rounded-xl p-4">
                  {{ selectedCompany()!.companyDescription || 'No description available for this corporate profile.' }}
                </p>
              </div>

              <!-- Projects public gallery -->
              <div>
                <h3 class="text-sm font-bold text-white font-cairo mb-4 border-b border-slate-800/80 pb-2">{{ 'MARKETPLACE.PROJECT_GALLERY' | translate }}</h3>
                
                <div class="space-y-6">
                  @for (proj of selectedCompany()!.projects; track proj.id) {
                    <div class="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-5 space-y-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h4 class="text-base font-bold text-white">{{ proj.name }}</h4>
                          <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs border border-indigo-500/20 mt-1 inline-block font-cairo">
                            {{ 'PROJECTS.CATEGORIES.' + proj.category | translate }}
                          </span>
                        </div>
                        <span class="text-xs text-slate-500 font-mono">{{ proj.startDate | date:'dd/MM/yyyy' }} @if (proj.endDate) { - {{ proj.endDate | date:'dd/MM/yyyy' }} } @else { - Present }</span>
                      </div>

                      <p class="text-slate-400 text-sm leading-relaxed">{{ proj.description || ('PROJECTS.NO_DESCRIPTION' | translate) }}</p>

                      <!-- Project Images Grid -->
                      @if (proj.sitePhotos.length > 0) {
                        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
                          @for (photo of proj.sitePhotos; track photo) {
                            <div class="relative group aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-sm cursor-pointer">
                              <img [src]="photo" alt="Project gallery" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                            </div>
                          }
                        </div>
                      } @else {
                        <p class="text-xs text-slate-600 italic font-cairo">{{ 'MARKETPLACE.NO_PHOTOS' | translate }}</p>
                      }
                    </div>
                  } @empty {
                    <div class="py-10 text-center text-slate-600 font-cairo text-sm">
                      No public projects published in this portfolio.
                    </div>
                  }
                </div>
              </div>
            </div>
            </div>
          </div>
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
    if (val <= 1) {
      return {
        price: '0 EGP',
        isCustom: false,
        noteAr: 'الخطة المجانية الأساسية - مشروع واحد نشط مجاناً مدى الحياة.',
        noteEn: 'Basic Free Plan - 1 Active Project free for lifetime.'
      };
    }
    if (val >= 10) {
      return {
        price: this.langService.currentLang() === 'ar' ? 'سعر مخصص' : 'Custom Pricing',
        isCustom: true,
        noteAr: 'للمؤسسات والشركات الكبيرة (10+ مشاريع). تواصل معنا للحصول على عرض سعر مخصص.',
        noteEn: 'For large enterprises (10+ projects). Contact us for a custom quote.'
      };
    }
    const map: Record<number, { price: string, noteAr: string, noteEn: string }> = {
      2: { price: '2,000 EGP', noteAr: 'باقة تفعيل مشروع إضافي واحد فوري.', noteEn: '1 Extra Project instant activation.' },
      3: { price: '4,000 EGP', noteAr: 'باقة تفعيل مشروعين إضافيين فوري.', noteEn: '2 Extra Projects instant activation.' },
      4: { price: '6,000 EGP', noteAr: 'باقة تفعيل 3 مشاريع إضافية فورية.', noteEn: '3 Extra Projects instant activation.' },
      5: { price: '7,500 EGP', noteAr: 'باقة 5 مشاريع متميزة (وفر 2,500 جنيه مقارنة بالشراء الفردي).', noteEn: 'Premium 5-Project Pack (Save 2,500 EGP).' },
      6: { price: '9,500 EGP', noteAr: 'باقة 5 مشاريع + تفعيل مشروع إضافي واحد.', noteEn: '5-Project Pack + 1 Extra Project.' },
      7: { price: '11,500 EGP', noteAr: 'باقة 5 مشاريع + تفعيل مشروعين إضافيين.', noteEn: '5-Project Pack + 2 Extra Projects.' },
      8: { price: '13,500 EGP', noteAr: 'باقة 5 مشاريع + تفعيل 3 مشاريع إضافية.', noteEn: '5-Project Pack + 3 Extra Projects.' },
      9: { price: '15,000 EGP', noteAr: 'باقة مزدوجة 10 مشاريع مخفضة (توفير إضافي).', noteEn: 'Double 5-Project Pack Discounted.' }
    };
    return {
      price: map[val]?.price || 'Custom',
      isCustom: false,
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
    this.renderer.removeClass(this.document.body, 'overflow-hidden');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
