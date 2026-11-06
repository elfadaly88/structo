import { Component, inject, OnInit, signal, computed, Renderer2, HostListener } from '@angular/core';
import { ApiDatePipe } from '../../core/pipes/api-date.pipe';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { PublicDirectoryService, TenantDto, PublicTenantPortfolioDto, PublicProjectDto } from '../../core/services/public-directory.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { WhatsAppLinkService } from '../../core/services/whatsapp-link.service';
import { BrandComponent } from '../../core/components/brand.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ApiDatePipe, CommonModule, RouterLink, TranslatePipe, FormsModule, BrandComponent],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      <!-- Nav Bar -->
      <nav class="fixed top-0 inset-x-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-900/80 pt-[env(safe-area-inset-top)]">
        <div class="max-w-7xl mx-auto px-4 md:px-6 h-16 flex justify-between items-center gap-3">
          <a routerLink="/" class="shrink-0" aria-label="أسس Osos">
            <app-brand size="sm" />
          </a>
          <div class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400 font-cairo">
            <a href="#features" class="hover:text-white transition-colors">{{ isAr() ? 'المميزات' : 'Features' }}</a>
            <a href="#pricing" class="hover:text-white transition-colors">{{ isAr() ? 'الأسعار' : 'Pricing' }}</a>
            <a href="#marketplace" class="hover:text-white transition-colors">{{ isAr() ? 'دليل الشركات' : 'Directory' }}</a>
            <a href="#faq" class="hover:text-white transition-colors">{{ isAr() ? 'الأسئلة الشائعة' : 'FAQ' }}</a>
          </div>
          <div class="flex items-center gap-2 md:gap-3">
            <button type="button" (click)="langService.toggleLanguage()"
              class="text-xs font-semibold text-indigo-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/15 transition">
              {{ isAr() ? 'English' : 'عربي' }}
            </button>
            @if (authService.isAuthenticated()) {
              <a routerLink="/dashboard" class="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs md:text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition font-cairo">
                {{ isAr() ? 'لوحة التحكم' : 'Dashboard' }}
              </a>
            } @else {
              <a routerLink="/login" class="hidden sm:inline text-sm font-semibold text-slate-300 hover:text-white transition font-cairo px-1">{{ 'NAV.LOGIN' | translate }}</a>
              <a routerLink="/register" class="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs md:text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition font-cairo">
                {{ isAr() ? 'ابدأ مجاناً' : 'Start free' }}
              </a>
            }
          </div>
        </div>
      </nav>

      <main>
      <!-- Hero -->
      <header class="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto text-center">
        <div class="absolute top-24 left-1/2 -translate-x-1/2 w-[min(560px,90vw)] h-[min(560px,90vw)] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <p class="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-300 text-xs font-bold mb-6 font-cairo">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          {{ isAr() ? 'مشروعين مجاناً، بدون اشتراك شهري' : 'Two projects free, no monthly subscription' }}
        </p>

        <h1 class="relative text-[2rem] leading-[1.25] sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto mb-6 font-cairo text-white">
          @if (isAr()) {
            اضبط عُهد مشاريعك وراقب مصاريف موقعك
            <span class="block bg-gradient-to-l from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">من غير إكسيل ومن غير محاسب</span>
          } @else {
            Control site cash and track every project expense
            <span class="block bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">without spreadsheets or an accountant</span>
          }
        </h1>

        <p class="relative text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-cairo">
          {{ heroText() }}
        </p>

        <div class="relative flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-none mx-auto">
          @if (authService.isAuthenticated()) {
            <a routerLink="/dashboard" class="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-600/30 transition font-cairo">
              {{ isAr() ? 'افتح لوحة التحكم' : 'Open dashboard' }}
            </a>
          } @else {
            <a routerLink="/register" class="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-600/30 transition font-cairo">
              {{ isAr() ? 'سجّل شركتك وابدأ مجاناً' : 'Register your company free' }}
            </a>
          }
          <a href="#features" class="px-8 py-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 font-bold text-slate-200 transition font-cairo">
            {{ isAr() ? 'شوف بيعمل إيه' : 'See how it works' }}
          </a>
        </div>

        <ul class="relative mt-12 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto text-center font-cairo">
          @for (s of heroStats(); track s.label) {
            <li class="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-2 py-4">
              <p class="text-xl sm:text-2xl font-extrabold text-white">{{ s.value }}</p>
              <p class="text-[11px] sm:text-xs text-slate-400 mt-1 leading-snug">{{ s.label }}</p>
            </li>
          }
        </ul>
      </header>

      <!-- Features -->
      <section id="features" class="scroll-mt-20 py-16 md:py-24 px-4 md:px-6 border-t border-slate-900">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 font-cairo text-white">
              {{ isAr() ? 'كل اللي محتاجه عشان تمسك فلوس الموقع' : 'Everything you need to control site money' }}
            </h2>
            <p class="text-slate-400 font-cairo leading-relaxed">
              {{ isAr() ? 'مصمم لشركات التشطيبات والديكور والمقاولات والمهندسين المستقلين في مصر.' : 'Built for finishing, interior and contracting companies and freelance engineers in Egypt.' }}
            </p>
          </div>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            @for (f of features(); track f.title) {
              <article class="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 hover:border-indigo-500/40 transition">
                <div class="h-11 w-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl mb-4" aria-hidden="true">{{ f.icon }}</div>
                <h3 class="text-lg font-bold text-white font-cairo mb-2">{{ f.title }}</h3>
                <p class="text-sm text-slate-400 leading-relaxed font-cairo">{{ f.text }}</p>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section class="py-16 md:py-20 px-4 md:px-6 border-t border-slate-900 bg-slate-900/20">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-10 font-cairo text-white text-center">
            {{ isAr() ? 'دورة العُهدة في أسس' : 'The custody cycle in Osos' }}
          </h2>
          <ol class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            @for (step of steps(); track step.title; let i = $index) {
              <li class="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <span class="absolute -top-3 start-5 h-7 w-7 rounded-full bg-indigo-600 text-white text-sm font-black flex items-center justify-center shadow-lg shadow-indigo-600/30">{{ i + 1 }}</span>
                <h3 class="mt-2 font-bold text-white font-cairo">{{ step.title }}</h3>
                <p class="mt-1.5 text-sm text-slate-400 leading-relaxed font-cairo">{{ step.text }}</p>
              </li>
            }
          </ol>
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing" class="scroll-mt-20 py-16 md:py-24 px-4 md:px-6 border-t border-slate-900">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12 max-w-2xl mx-auto">
            <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 font-cairo text-white">
              {{ isAr() ? 'أسعار واضحة بالمشروع' : 'Simple per-project pricing' }}
            </h2>
            <p class="text-slate-400 font-cairo leading-relaxed">
              {{ isAr() ? 'ادفع مرة واحدة لكل مشروع إضافي، بدون اشتراك شهري. رصيد المشاريع بتاعك مدى الحياة. الدفع حالياً عن طريق InstaPay.' : 'Pay once per extra project, no monthly fees. Your project credit never expires. Payment is via InstaPay.' }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            @for (plan of plans(); track plan.key) {
              <article class="relative rounded-3xl p-6 sm:p-7 flex flex-col border transition"
                [class]="plan.highlight ? 'border-2 border-indigo-500 bg-gradient-to-b from-indigo-950/60 to-slate-900 shadow-xl shadow-indigo-500/20' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'">
                @if (plan.badge) {
                  <span class="absolute -top-3 start-6 px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 font-cairo shadow">{{ plan.badge }}</span>
                }
                <h3 class="text-lg font-bold text-white font-cairo">{{ plan.name }}</h3>
                <p class="mt-4 flex items-baseline gap-2">
                  <span class="text-4xl font-extrabold font-sans" [class]="plan.price === 0 ? 'text-emerald-400' : 'text-white'">{{ plan.price === 0 ? (isAr() ? 'مجاناً' : 'Free') : (plan.price | number) }}</span>
                  @if (plan.price > 0) { <span class="text-sm font-bold text-slate-400 font-cairo">{{ isAr() ? 'ج.م' : 'EGP' }}</span> }
                  @if (plan.was) { <span class="text-sm text-slate-500 line-through font-sans">{{ plan.was | number }}</span> }
                </p>
                <p class="mt-1 text-xs text-slate-400 font-cairo">{{ plan.note }}</p>
                <ul class="mt-6 mb-8 space-y-3 text-sm text-slate-300 font-cairo flex-1">
                  @for (item of plan.items; track item) {
                    <li class="flex items-start gap-2"><span class="text-emerald-400 font-bold mt-0.5" aria-hidden="true">✓</span><span>{{ item }}</span></li>
                  }
                </ul>
                <button type="button" (click)="onSelectPricingPlan(plan.projects)"
                  class="w-full py-3 px-4 rounded-xl font-bold text-sm font-cairo transition"
                  [class]="plan.highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'">
                  {{ plan.cta }}
                </button>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- MARKETPLACE SaaS DIRECTORY -->
      <section id="marketplace" class="scroll-mt-20 py-16 md:py-24 px-4 md:px-6 border-t border-slate-900 bg-slate-900/10 relative">
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
                <div class="group flex flex-col justify-between bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-300 shadow-xl relative">
                  <div>
                    <!-- Top Row: Logo, Name & Prominent Star Rating Badge -->
                    <div class="flex items-start justify-between gap-3 mb-4">
                      <div class="flex items-center gap-3.5 min-w-0">
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
                        <div class="min-w-0">
                          <h3 class="text-base font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 font-cairo truncate">{{ comp.name }}</h3>
                          <p class="text-xs text-slate-500 font-mono">{{ comp.region || 'مصر' }}</p>
                        </div>
                      </div>

                      <!-- Top Badge: Prominent Star Rating & Reviews Count OR New Member Badge -->
                      @if ((comp.reviewsCount || 0) > 0) {
                        <button
                          (click)="openReviewsModal($event, comp.id, comp.name)"
                          title="View client reviews"
                          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all cursor-pointer font-bold text-xs shrink-0 shadow-sm">
                          <span>⭐</span>
                          <span class="font-mono text-sm font-black">{{ comp.rating | number:'1.1-1' }}</span>
                          <span class="text-[11px] text-amber-300/80 font-cairo font-medium">({{ comp.reviewsCount }} {{ langService.currentLang() === 'ar' ? 'تقييم' : 'reviews' }})</span>
                        </button>
                      } @else {
                        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold font-cairo shrink-0 shadow-sm">
                          <span>✨</span>
                          <span>{{ langService.currentLang() === 'ar' ? 'عضو جديد' : 'New Member' }}</span>
                        </span>
                      }
                    </div>

                    <!-- Project Indicators Badges: [ 🏆 X مكتمل ] [ 🟢 Y جاري التنفيذ ] -->
                    <div class="flex items-center gap-2 mb-4 flex-wrap">
                      @if ((comp.completedProjectsCount || 0) > 0) {
                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">
                          <span>🏆</span>
                          <span>{{ comp.completedProjectsCount }} {{ langService.currentLang() === 'ar' ? 'مكتمل' : 'Completed' }}</span>
                        </span>
                      }
                      @if ((comp.activeProjectsCount || 0) > 0) {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 font-cairo">
                          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>{{ comp.activeProjectsCount }} {{ langService.currentLang() === 'ar' ? 'جاري التنفيذ' : 'In Progress' }}</span>
                        </span>
                      }
                    </div>

                    <p class="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-cairo">
                      {{ comp.companyDescription || (langService.currentLang() === 'ar' ? 'شركة مقاولات وهندسة مسجلة ومعتمدة لدى منصة أسس.' : 'Verified engineering and contracting firm registered on Osos.') }}
                    </p>
                  </div>

                  <div class="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                    <span class="text-xs text-slate-500 font-mono">
                      {{ (comp.completedProjectsCount || 0) + (comp.activeProjectsCount || 0) }} {{ langService.currentLang() === 'ar' ? 'مشاريع موثقة' : 'Projects' }}
                    </span>

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
                        @if ((selectedCompany()!.reviewsCount || 0) > 0) {
                          <button
                            (click)="openReviewsModal($event, selectedCompany()!.id, selectedCompany()!.name)"
                            title="View all client reviews"
                            class="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline cursor-pointer bg-slate-950/60 px-2.5 py-1 rounded-lg border border-amber-500/20">
                            <span>⭐</span>
                            <span class="font-mono text-sm font-black">{{ selectedCompany()!.rating | number:'1.1-1' }}</span>
                            <span class="text-[10px] text-amber-400/80 font-normal">({{ selectedCompany()!.reviewsCount }} {{ langService.currentLang() === 'ar' ? 'تقييم' : 'reviews' }})</span>
                          </button>
                        } @else {
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold font-cairo">
                            <span>✨</span>
                            <span>{{ langService.currentLang() === 'ar' ? 'عضو جديد' : 'New Member' }}</span>
                          </span>
                        }
                        @if ((selectedCompany()!.completedProjectsCount || 0) > 0) {
                          <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">
                            🏆 {{ selectedCompany()!.completedProjectsCount }} {{ langService.currentLang() === 'ar' ? 'مكتمل' : 'Completed' }}
                          </span>
                        }
                        @if ((selectedCompany()!.activeProjectsCount || 0) > 0) {
                          <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 font-cairo">
                            🟢 {{ selectedCompany()!.activeProjectsCount }} {{ langService.currentLang() === 'ar' ? 'جاري التنفيذ' : 'In Progress' }}
                          </span>
                        }
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
                        (click)="proj.publicImages && proj.publicImages.length > 0 && openLightbox(proj.publicImages, 0, $event)"
                        class="relative h-44 w-full bg-slate-900 overflow-hidden"
                        [class.cursor-pointer]="proj.publicImages && proj.publicImages.length > 0">
                        @if (proj.publicImages && proj.publicImages.length > 0) {
                          <img [src]="proj.publicImages[0]" (error)="onImgError($event)" alt="{{ proj.name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out transform-gpu" loading="lazy">
                          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span class="px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold font-cairo flex items-center gap-1.5 shadow-xl border border-white/20">
                              🔍 معاينة الصورة بالكامل
                            </span>
                          </div>
                        } @else {
                          <div class="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 flex flex-col items-center justify-center p-4 text-slate-500 select-none">
                            <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-2 shadow-inner">
                              <svg class="w-6 h-6 text-indigo-400 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m3 0h1m-4-8l-2-2m0 0l-2 2m2-2v6" />
                              </svg>
                            </div>
                            <span class="text-xs font-medium text-slate-400 font-cairo">مشروع معتمد</span>
                          </div>
                        }

                        <!-- Category & Project Status Badges: [ 🏆 مكتمل ] / [ 🟢 جاري التنفيذ ] -->
                        <div class="absolute top-3 right-3 flex items-center gap-2">
                          <span class="px-3 py-1 rounded-xl text-xs font-bold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 font-cairo shadow-lg">
                            {{ meta.category || 'عام' }}
                          </span>
                          @if (proj.status === 'Closed' || proj.isClosed) {
                            <span class="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 font-cairo shadow-lg flex items-center gap-1">
                              <span>🏆</span>
                              <span>{{ langService.currentLang() === 'ar' ? 'مكتمل' : 'Completed' }}</span>
                            </span>
                          } @else {
                            <span class="px-2.5 py-1 rounded-xl text-xs font-bold bg-sky-950/80 backdrop-blur-md text-sky-400 border border-sky-500/30 font-cairo shadow-lg flex items-center gap-1">
                              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span>{{ langService.currentLang() === 'ar' ? 'جاري التنفيذ' : 'In Progress' }}</span>
                            </span>
                          }
                        </div>

                        <!-- Photos Count Badge: ONLY if publicImages exist and count > 0 -->
                        @if (proj.publicImages && proj.publicImages.length > 0) {
                          <div class="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-slate-200 flex items-center gap-1 font-mono shadow-md">
                            📷 {{ proj.publicImages.length }} صور
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
                          @if (proj.displayDate && !proj.displayDate.startsWith('0001') && !proj.displayDate.startsWith('2001-01-01')) {
                            <span class="text-xs font-mono text-slate-400">
                              {{ proj.displayDate | apiDate:'dd/MM/yyyy' }}
                            </span>
                          } @else if (proj.createdAt && !proj.createdAt.startsWith('0001') && !proj.createdAt.startsWith('2001-01-01')) {
                            <span class="text-xs font-mono text-slate-400">
                              {{ proj.createdAt | apiDate:'dd/MM/yyyy' }}
                            </span>
                          } @else if (proj.startDate && !proj.startDate.startsWith('0001') && !proj.startDate.startsWith('2001-01-01')) {
                            <span class="text-xs font-mono text-slate-400">
                              {{ proj.startDate | apiDate:'dd/MM/yyyy' }}
                            </span>
                          } @else {
                            <span></span>
                          }
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
                            @if (proj.publicImages && proj.publicImages.length > 0) {
                              <div class="grid grid-cols-3 gap-2">
                                @for (photo of proj.publicImages; track photo; let idx = $index) {
                                    <div 
                                      (click)="openLightbox(proj.publicImages, idx, $event)"
                                      class="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer group/photo">
                                      <img [src]="photo" (error)="onImgError($event)" alt="" class="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300 ease-out transform-gpu" loading="lazy">
                                      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                      </svg>
                                    </div>
                                  </div>
                                }
                              </div>
                            } @else {
                              <p class="text-xs text-slate-500 font-cairo">لا توجد صور عامة مضافة لهذا المشروع في المعرض.</p>
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
                <span class="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-cairo">سجل تقييمات العملاء</span>
                <h3 class="text-base font-bold text-white font-cairo mt-1">تقييمات شركة: {{ reviewsModalTenantName() }}</h3>
              </div>
              <button
                (click)="closeReviewsModal()"
                class="px-3 py-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-850 transition-colors duration-150 text-xs font-bold font-cairo cursor-pointer">
                إغلاق
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
                          <span class="text-[10px] font-mono text-slate-500 ml-1">({{ rev.reviewDate | apiDate:'dd/MM/yyyy' }})</span>
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

      <!-- FAQ -->
      <section id="faq" class="scroll-mt-20 py-16 md:py-24 px-4 md:px-6 border-t border-slate-900">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-8 font-cairo text-white text-center">
            {{ isAr() ? 'الأسئلة الشائعة' : 'Frequently asked questions' }}
          </h2>
          <div class="space-y-3">
            @for (q of faqs(); track q.q) {
              <details class="group rounded-2xl border border-slate-800 bg-slate-900/40 open:border-indigo-500/40">
                <summary class="cursor-pointer list-none flex items-center justify-between gap-4 p-5 font-bold text-white font-cairo">
                  <span>{{ q.q }}</span>
                  <span class="text-indigo-300 transition group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span>
                </summary>
                <p class="px-5 pb-5 -mt-1 text-sm text-slate-400 leading-relaxed font-cairo">{{ q.a }}</p>
              </details>
            }
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      @if (!authService.isAuthenticated()) {
        <section class="px-4 md:px-6 pb-20">
          <div class="max-w-5xl mx-auto rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 p-8 sm:p-12 text-center">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white font-cairo">{{ isAr() ? 'ابدأ أول مشروعين مجاناً النهارده' : 'Start your first two projects free today' }}</h2>
            <p class="mt-3 text-slate-400 font-cairo">{{ isAr() ? 'التسجيل في دقيقة، ومن غير بطاقة بنكية.' : 'Sign up in a minute, no bank card needed.' }}</p>
            <a routerLink="/register" class="mt-7 inline-block px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-600/30 transition font-cairo">
              {{ isAr() ? 'سجّل شركتك مجاناً' : 'Register your company free' }}
            </a>
          </div>
        </section>
      }
      </main>

      <!-- Footer -->
      <footer class="border-t border-slate-900 px-4 md:px-6 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-start">
          <div class="max-w-sm">
            <app-brand size="sm" />
            <p class="mt-3 text-sm text-slate-500 leading-relaxed font-cairo">
              {{ isAr() ? 'منصة إدارة عُهد ومصاريف ومتابعة تنفيذ مشاريع التشطيبات والمقاولات.' : 'Custody, expense and site-progress management for finishing and contracting projects.' }}
            </p>
          </div>
          <nav class="grid grid-cols-2 gap-x-10 gap-y-2 text-sm font-cairo" aria-label="Footer">
            <a href="#features" class="text-slate-400 hover:text-white">{{ isAr() ? 'المميزات' : 'Features' }}</a>
            <a routerLink="/register" class="text-slate-400 hover:text-white">{{ isAr() ? 'تسجيل شركة' : 'Register' }}</a>
            <a href="#pricing" class="text-slate-400 hover:text-white">{{ isAr() ? 'الأسعار' : 'Pricing' }}</a>
            <a routerLink="/login" class="text-slate-400 hover:text-white">{{ isAr() ? 'تسجيل الدخول' : 'Log in' }}</a>
            <a href="#marketplace" class="text-slate-400 hover:text-white">{{ isAr() ? 'دليل الشركات' : 'Directory' }}</a>
            <a href="#faq" class="text-slate-400 hover:text-white">{{ isAr() ? 'الأسئلة الشائعة' : 'FAQ' }}</a>
          </nav>
        </div>
        <p class="mt-10 text-center text-xs text-slate-600 font-cairo">{{ 'FOOTER.COPYRIGHT' | translate }}</p>
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

  // ----- Marketing content (Arabic first, English when the visitor switches language) -----
  readonly isAr = computed(() => this.langService.currentLang() !== 'en');

  readonly heroText = computed(() => this.isAr()
    ? 'أسس بيربط صاحب الشركة والمحاسب ومهندس الموقع في مكان واحد: عُهدة بتتطلب وتتعتمد، وتسوية بالفواتير، ودفتر مالي لكل مشروع، ورابط يتابع منه العميل التنفيذ من غير ما يشوف أي أرقام.'
    : 'Osos connects the owner, the accountant and the site engineer: custody requested and approved, settled with receipts, a ledger per project, and a client link that shows progress without any figures.');

  readonly heroStats = computed(() => this.isAr()
    ? [{ value: '2', label: 'مشروع مجاناً' }, { value: '0', label: 'اشتراك شهري' }, { value: '5', label: 'أدوار وصلاحيات' }]
    : [{ value: '2', label: 'free projects' }, { value: '0', label: 'monthly fees' }, { value: '5', label: 'team roles' }]);

  readonly features = computed(() => this.isAr()
    ? [
        { icon: '💼', title: 'العُهد والتسويات', text: 'المهندس يطلب العُهدة، وانت أو المحاسب تعتمدها من الصندوق، وبعدها يسوّيها بنود بفواتيرها ويرجّع الباقي أو ياخد فرقه.' },
        { icon: '📒', title: 'دفتر مالي لكل مشروع', text: 'إيرادات العميل، المصروفات، صناديق المشروع، والصرف المباشر، مع رصيد صافي محدّث في أي لحظة.' },
        { icon: '🏗️', title: 'متابعة التنفيذ', text: 'بنود أعمال بأوزان ونِسب إنجاز، يوميات الموقع، وقائمة ملاحظات الاستلام بصور قبل وبعد.' },
        { icon: '🔗', title: 'رابط متابعة للعميل', text: 'ابعت للعميل رابط يشوف منه نسبة الإنجاز والبنود وصور الموقع، من غير أي أرقام مالية.' },
        { icon: '📊', title: 'تقارير وإقفال المشروع', text: 'تقرير لكل مشروع وتقرير شامل للشركة، وإقفال نهائي بعد مطابقة كل العُهد والصناديق.' },
        { icon: '👥', title: 'فريق وصلاحيات', text: 'مالك، مدير مشروع، محاسب، مهندس موقع، ومهندس تصميم، وكل واحد يشوف اللي يخصه بس.' },
      ]
    : [
        { icon: '💼', title: 'Custody & settlements', text: 'Engineers request cash, you or the accountant approve it from a project pool, then they settle line by line with receipts.' },
        { icon: '📒', title: 'A ledger per project', text: 'Client income, expenses, cash pools and direct payouts, with an always-current net balance.' },
        { icon: '🏗️', title: 'Site execution', text: 'Weighted work items with progress, daily site logs and a punch list with before/after photos.' },
        { icon: '🔗', title: 'Client progress link', text: 'Send clients a link to follow progress, tasks and site photos, without any financial figures.' },
        { icon: '📊', title: 'Reports & close-out', text: 'Per-project and company-wide reports, and a final close-out after every custody and pool is reconciled.' },
        { icon: '👥', title: 'Team & permissions', text: 'Owner, project manager, accountant, site engineer and design engineer, each seeing only what they need.' },
      ]);

  readonly steps = computed(() => this.isAr()
    ? [
        { title: 'طلب عُهدة', text: 'مهندس الموقع يطلب مبلغ وسببه من الموبايل.' },
        { title: 'اعتماد وصرف', text: 'المالك أو المحاسب يعتمد ويحدد الصندوق اللي هيتخصم منه.' },
        { title: 'تسوية بالفواتير', text: 'المهندس يسجّل البنود بفواتيرها، والسيستم يحسب الفرق.' },
        { title: 'مراجعة وإقفال', text: 'تعتمد التسوية، والمتبقي يرجع للصندوق تلقائياً.' },
      ]
    : [
        { title: 'Request', text: 'The site engineer requests an amount and a reason from their phone.' },
        { title: 'Approve & issue', text: 'The owner or accountant approves it and picks the source pool.' },
        { title: 'Settle with receipts', text: 'The engineer records lines with receipts; the difference is calculated.' },
        { title: 'Review & close', text: 'Approve the settlement and any remainder returns to the pool.' },
      ]);

  readonly plans = computed(() => {
    const ar = this.isAr();
    return [
      {
        key: 'free', projects: 0, price: 0, was: 0, highlight: false, badge: '',
        name: ar ? 'الباقة المجانية' : 'Free',
        note: ar ? 'مجاناً مدى الحياة' : 'Free forever',
        items: ar ? ['مشروعين مجاناً مدى الحياة', 'كل مميزات المنصة', 'بدون بطاقة بنكية'] : ['2 lifetime projects', 'Every feature included', 'No bank card needed'],
        cta: ar ? 'ابدأ مجاناً' : 'Start free',
      },
      {
        key: 'plus1', projects: 1, price: 250, was: 0, highlight: false, badge: '',
        name: ar ? 'مشروع إضافي' : 'One extra project',
        note: ar ? 'دفع مرة واحدة' : 'One-time payment',
        items: ar ? ['مشروع إضافي على رصيدك', 'رصيد دائم بدون اشتراك', 'الدفع عبر InstaPay، والتفعيل بعد تأكيد التحويل'] : ['One extra project credit', 'Permanent, no subscription', 'Pay via InstaPay, activated once the transfer is confirmed'],
        cta: ar ? 'اشترِ مشروع' : 'Buy one project',
      },
      {
        key: 'plus5', projects: 5, price: 950, was: 1250, highlight: true, badge: ar ? 'الأوفر: وفّر 300 ج.م' : 'Best value: save 300 EGP',
        name: ar ? 'حزمة 5 مشاريع' : '5-project pack',
        note: ar ? 'دفع مرة واحدة' : 'One-time payment',
        items: ar ? ['5 مشاريع إضافية على رصيدك', 'وفّر 300 ج.م عن الشراء منفرد', 'أولوية في الدعم الفني'] : ['5 extra project credits', 'Save 300 EGP vs single', 'Priority support'],
        cta: ar ? 'اشترِ الحزمة' : 'Buy the pack',
      },
    ];
  });

  readonly faqs = computed(() => this.isAr()
    ? [
        { q: 'هل فيه اشتراك شهري؟', a: 'لا. أول مشروعين مجاناً، وكل مشروع إضافي بتدفعه مرة واحدة (250 ج.م للمشروع أو 950 ج.م لحزمة 5 مشاريع)، والرصيد بتاعك مدى الحياة.' },
        { q: 'إزاي أدفع؟', a: 'حالياً الدفع عن طريق InstaPay: بتحوّل المبلغ وترفع صورة التحويل من صفحة الاشتراك، والرصيد بيتضاف لحسابك بعد مراجعة التحويل.' },
        { q: 'هل العميل بيشوف الأرقام المالية؟', a: 'لا. رابط المتابعة اللي بتبعته للعميل بيعرض نسبة الإنجاز والبنود وصور الموقع بس، من غير أي مبالغ أو فواتير.' },
        { q: 'ينفع لمهندس مستقل مش شركة؟', a: 'أيوه، تقدر تسجّل كمهندس مستقل أو كشركة، وتشتغل لوحدك أو تضيف فريقك بصلاحيات مختلفة.' },
        { q: 'بيشتغل على الموبايل؟', a: 'أيوه، بيشتغل من المتصفح على الموبايل والتابلت والكمبيوتر، وتقدر تضيفه للشاشة الرئيسية كتطبيق.' },
        { q: 'بيانات شركتي آمنة؟', a: 'كل شركة بياناتها منفصلة تماماً عن غيرها، والدخول بصلاحيات حسب دور كل مستخدم.' },
      ]
    : [
        { q: 'Is there a monthly subscription?', a: 'No. Your first two projects are free, and each extra project is a one-time payment (250 EGP, or 950 EGP for five). Credits never expire.' },
        { q: 'How do I pay?', a: 'Payment is currently via InstaPay: transfer the amount, upload the receipt from the subscription page, and credits are added after the transfer is reviewed.' },
        { q: 'Does the client see financial figures?', a: 'No. The tracking link shows progress, tasks and site photos only, without amounts or invoices.' },
        { q: 'Can a freelance engineer use it?', a: 'Yes. Register as a freelancer or a company, work alone or add your team with different roles.' },
        { q: 'Does it work on mobile?', a: 'Yes, in the browser on phone, tablet and desktop, and you can add it to your home screen as an app.' },
        { q: 'Is my company data safe?', a: 'Each company’s data is fully isolated, and access follows each user’s role.' },
      ]);

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
        noteAr: 'الباقة المجانية الأساسية — تتضمن مشروعين (2) مجاناً مدى الحياة.',
        noteEn: 'Basic Free Plan — includes 2 lifetime projects free.'
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
      const msg = `مرحباً، أود ترقية باقة المشاريع لمنصة أسس لعدد 10+ مشاريع.`;
      this.whatsappLink.openChat('201004500766', msg);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onSelectPricingPlan(extraProjectsCount: number = 0): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([extraProjectsCount > 0 ? '/dashboard/subscription' : '/dashboard/projects']);
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
          const portfolio = res.data;
          if (portfolio.projects) {
            portfolio.projects.forEach(p => {
              const rawList = p.publicImages || p.sitePhotos || [];
              p.publicImages = rawList.filter(
                url => url && !url.includes('/receipts/') && !url.toLowerCase().includes('receipt') && !url.toLowerCase().includes('invoice')
              );
              p.sitePhotos = p.publicImages;
            });
          }
          this.selectedCompany.set(portfolio);
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
      const container = img.closest('.relative');
      if (container) {
        const badge = container.querySelector('.font-mono');
        if (badge) (badge as HTMLElement).style.display = 'none';
      }
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
