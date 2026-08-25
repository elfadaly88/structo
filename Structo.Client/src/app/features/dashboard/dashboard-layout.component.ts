import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { NotificationBellComponent } from '../../core/components/notification-bell.component';
import { NotificationService } from '../../core/services/notification.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TenantProfileService } from '../../core/services/tenant-profile.service';

interface NavItem {
  label: string;
  route: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe, NotificationBellComponent],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">

      <!-- Top Navbar -->
      <nav class="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-3 sm:px-6 z-40">
        <!-- Brand & Mobile Toggle -->
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            (click)="toggleSidebar()"
            aria-label="Toggle Navigation Sidebar"
            class="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a routerLink="/dashboard" class="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <img src="assets/images/default-tenant-logo.png" alt="Osos Logo" class="h-7 sm:h-9 w-auto object-contain">
            <span class="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:inline-block font-cairo">أُسُس / Osos</span>
          </a>
        </div>

        <!-- User info, Language & Actions -->
        <div class="flex items-center gap-1.5 sm:gap-3">
          
          <!-- Clickable Subscription Upgrade Badge for TenantOwner only -->
          @if (authService.isTenantOwner()) {
            <button 
              (click)="openUpgradeModal()"
              title="انقر لترقية الباقة وزيادة سعة المشاريع / Upgrade Capacity"
              class="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 hover:from-amber-500/25 hover:via-indigo-500/25 hover:to-purple-500/25 border border-amber-500/35 text-amber-300 hover:text-amber-200 text-xs font-bold font-cairo transition-all shadow-md shadow-amber-500/10 active:scale-95 cursor-pointer shrink-0">
              <span class="text-amber-400 animate-pulse text-xs sm:text-sm">💎</span>
              <span class="hidden sm:inline">شراء / ترقية مشاريع</span>
              <span class="sm:hidden text-[11px]">ترقية</span>
              <span class="hidden md:inline text-[10px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded font-mono font-bold">+إضافة</span>
            </button>
          }

          <!-- Language Switcher -->
          <button 
            (click)="langService.toggleLanguage()"
            class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer px-2 sm:px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 active:scale-95 shrink-0">
            {{ langService.currentLang() === 'en' ? 'عربي' : 'EN' }}
          </button>

          <!-- Notification Bell -->
          <app-notification-bell></app-notification-bell>

          <!-- User Menu Dropdown Trigger Button -->
          <div class="relative shrink-0">
            <button
              (click)="toggleUserMenu()"
              class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all duration-200 cursor-pointer focus:outline-none"
              [class.bg-slate-800]="isUserMenuOpen()"
              [class.border-slate-700]="isUserMenuOpen()">
              <div class="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-400 uppercase font-mono shrink-0">
                {{ (authService.currentUser()?.name || authService.currentUser()?.role || 'U').charAt(0) }}
              </div>
              
              <div class="hidden md:flex flex-col text-right rtl:text-left text-xs leading-tight">
                <span class="font-bold text-slate-200 max-w-[120px] truncate">{{ authService.currentUser()?.name }}</span>
                <span class="text-[10px] text-slate-400 font-mono">{{ authService.currentUser()?.role }}</span>
              </div>

              <svg class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block" [class.rotate-180]="isUserMenuOpen()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Consolidated User Menu Popover -->
            @if (isUserMenuOpen()) {
              <div
                (click)="$event.stopPropagation()"
                class="absolute end-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in font-cairo space-y-3">
                
                <div class="border-b border-slate-800 pb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-sm text-indigo-400 uppercase font-mono shrink-0">
                      {{ (authService.currentUser()?.name || 'U').charAt(0) }}
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-bold text-white truncate">{{ authService.currentUser()?.name }}</p>
                      <p class="text-[11px] text-slate-400 font-mono truncate">{{ authService.currentUser()?.email }}</p>
                    </div>
                  </div>
                  <div class="mt-2.5 flex items-center justify-between">
                    <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">الدور / Role:</span>
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wide">
                      {{ authService.currentUser()?.role }}
                    </span>
                  </div>
                  @if (authService.currentUser()?.tenantId) {
                    <div class="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span class="text-slate-500">Tenant:</span>
                      <span class="font-mono text-slate-400 truncate max-w-[130px]" [title]="authService.currentUser()?.tenantId ?? ''">
                        {{ authService.currentUser()?.tenantId }}
                      </span>
                    </div>
                  }
                </div>

                <div class="space-y-1 text-xs">
                  @if (authService.isTenantOwner()) {
                    <a
                      [routerLink]="['/dashboard/subscription']"
                      (click)="closeUserMenu()"
                      class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors">
                      <span>💳</span>
                      <span>الاشتراكات وتوسعة الباقة</span>
                    </a>
                    <a
                      [routerLink]="['/dashboard/settings']"
                      (click)="closeUserMenu()"
                      class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors">
                      <span>⚙️</span>
                      <span>إعدادات الحساب والشركة</span>
                    </a>
                  }
                </div>

                <div class="pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    (click)="logout()"
                    class="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>{{ 'COMMON.LOGOUT' | translate }}</span>
                  </button>
                </div>

              </div>
            }
          </div>

        </div>
      </nav>

      <!-- Sidebar + Main content -->
      <div class="flex flex-1 pt-16 h-screen overflow-hidden">

        <!-- Mobile Backdrop -->
        @if (isSidebarOpen()) {
          <div
            (click)="closeSidebar()"
            class="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-30 md:hidden animate-fade-in">
          </div>
        }

        <!-- User Menu Backdrop to close menu on click outside -->
        @if (isUserMenuOpen()) {
          <div
            (click)="closeUserMenu()"
            class="fixed inset-0 z-40 bg-transparent">
          </div>
        }

        <!-- Sidebar Navigation Drawer -->
        <aside
          class="fixed md:relative inset-y-0 start-0 pt-16 md:pt-0 bg-slate-900 flex flex-col z-[35] md:z-20 transition-all duration-300 ease-in-out overflow-hidden shrink-0"
          [class.w-64]="isSidebarOpen()"
          [class.w-0]="!isSidebarOpen()"
          [class.border-e]="isSidebarOpen()"
          [class.border-slate-800]="isSidebarOpen()"
          [class.sidebar-open]="isSidebarOpen()"
          [class.sidebar-closed]="!isSidebarOpen()">

          <div class="w-64 flex-1 px-4 py-6 space-y-1 overflow-y-auto min-h-0 custom-scrollbar">
            <span class="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase px-3 block mb-4 font-cairo">
              {{ 'DASHBOARD.SIDEBAR_NAV' | translate }}
            </span>

            @for (item of menuItems(); track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-slate-800 text-indigo-400 border-indigo-500/40"
                [routerLinkActiveOptions]="{ exact: false }"
                (click)="closeSidebar()"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all duration-200 font-cairo">
                <span [innerHTML]="item.icon" class="h-5 w-5 shrink-0 flex items-center justify-center"></span>
                <span>{{ item.label | translate }}</span>
              </a>
            }

            <!-- Sidebar Sign Out Option (Neutral Standard SaaS Styling) -->
            <button
              (click)="logout()"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all duration-200 text-right rtl:text-left cursor-pointer focus:outline-none mt-4 border-t border-slate-800/60 pt-4 font-cairo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{{ 'COMMON.LOGOUT' | translate }}</span>
            </button>
          </div>

          <!-- Bottom Tenant Info -->
          @if (authService.currentUser()?.tenantId) {
            <div class="w-64 p-4 border-t border-slate-800 bg-slate-950/40 shrink-0">
              <span class="text-[10px] font-extrabold text-slate-500 tracking-wider uppercase block font-cairo">
                {{ 'DASHBOARD.TENANT_ENV' | translate }}
              </span>
              <span class="text-xs font-mono text-slate-400 truncate block mt-1 select-all" [title]="authService.currentUser()?.tenantId ?? ''">
                {{ authService.currentUser()?.tenantId }}
              </span>
            </div>
          }

        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 overflow-y-auto min-h-0 custom-scrollbar p-3 sm:p-6 lg:p-8 font-sans">
          <div class="max-w-7xl mx-auto w-full space-y-6">
            <!-- Profile incomplete warning banner -->
            @if (authService.isTenantOwner() && authService.currentUser()?.isApproved && authService.currentUser()?.isProfileComplete === false) {
              <div class="mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl p-4 flex items-start gap-3 shadow-lg shadow-amber-500/5 font-cairo">
                <svg class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 class="font-bold text-sm text-white">استكمال الملف شخصياً / Legal profile setup required</h4>
                  <p class="text-xs text-amber-200/80 mt-1 font-semibold">⚠️ حسابك مفعل ومقبول، ولكن يرجى استكمال باقي بياناتك القانونية والعنوان على الخريطة لتجنب تعليق الحساب مستقبلاً.</p>
                </div>
              </div>
            }
            <router-outlet></router-outlet>
          </div>
        </main>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    aside {
      transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @media (max-width: 767px) {
      :host ::ng-deep html[dir="ltr"] .sidebar-closed {
        transform: translateX(-100%);
      }
      :host ::ng-deep html[dir="rtl"] .sidebar-closed {
        transform: translateX(100%);
      }
      .sidebar-open {
        transform: translateX(0) !important;
      }
    }
  `]
})
export class DashboardLayoutComponent {
  readonly authService = inject(AuthService);
  protected readonly langService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly profileService = inject(TenantProfileService);

  readonly isSidebarOpen = signal<boolean>(
    typeof window !== 'undefined'
      ? localStorage.getItem('structo_sidebar_open') !== null
        ? localStorage.getItem('structo_sidebar_open') === 'true'
        : window.innerWidth >= 1024
      : false
  );
  readonly isUserMenuOpen = signal(false);

  constructor() {
    const user = this.authService.currentUser();
    if (user) {
      this.notificationService.initializeOneSignal(user.userId, user.email);
    }
  }

  ngOnInit(): void {
    const user = this.authService.currentUser();
    // Check profile completion for TenantOwner only
    if (this.authService.isTenantOwner() && user) {
      this.profileService.getProfile().subscribe({
        next: (res) => {
          if (res.success && res.data) {
            if (res.data.latitude && res.data.region) {
              const updatedUser = { ...user, isProfileComplete: true };
              this.authService.currentUser.set(updatedUser);
            }
          }
        }
      });
    }
  }

  // SVG icons for sidebar items
  private readonly icons = {
    overview: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
    tenants: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
    projects: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    financials: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
    pettyCash: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    profile: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`,
    paymentAudit: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>`
  };

  // Role-based navigation computed from auth state
  readonly menuItems = computed<NavItem[]>(() => {
    const role = this.authService.currentUser()?.role;
    switch (role) {
      case 'SuperAdmin':
        return [
          { label: 'DASHBOARD.GLOBAL_OVERVIEW', route: '/dashboard/overview', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.overview) },
          { label: 'DASHBOARD.TENANTS_MGMT', route: '/dashboard/tenants', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.tenants) },
          { label: 'Pending Approvals / تفعيل الحسابات', route: '/dashboard/pending-users', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.users) },
          { label: 'مدفوعات المنصة / Payment Audit', route: '/dashboard/admin-payments', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.paymentAudit) }
        ];
      case 'TenantOwner':
        return [
          { label: 'DASHBOARD.FINANCIALS', route: '/dashboard/financials', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.financials) },
          { label: 'PROJECTS.PAGE_TITLE', route: '/dashboard/projects', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.projects) },
          { label: 'الاشتراكات وتوسعة الباقة', route: '/dashboard/subscription', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.pettyCash) },
          { label: 'USERS.TAB_USERS', route: '/dashboard/users', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.users) },
          { label: 'PROFILE.TAB_PROFILE', route: '/dashboard/profile', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.profile) }
        ];
      case 'Accountant':
        return [
          { label: 'DASHBOARD.FINANCIALS', route: '/dashboard/financials', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.financials) },
          { label: 'PROJECTS.PAGE_TITLE', route: '/dashboard/projects', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.projects) }
        ];
      case 'Manager':
      case 'SiteEngineer':
      case 'DesignEngineer':
        return [
          { label: 'My Custody / عهدي', route: '/dashboard/projects', icon: this.sanitizer.bypassSecurityTrustHtml(this.icons.pettyCash) }
        ];
      default:
        return [];
    }
  });

  toggleSidebar(): void {
    const next = !this.isSidebarOpen();
    this.isSidebarOpen.set(next);
    try {
      localStorage.setItem('structo_sidebar_open', String(next));
    } catch (e) {}
  }

  closeSidebar(): void {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
      try {
        localStorage.setItem('structo_sidebar_open', 'false');
      } catch (e) {}
    }
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen.update(v => !v);
  }

  closeUserMenu(): void {
    this.isUserMenuOpen.set(false);
  }

  logout(): void {
    this.closeUserMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openUpgradeModal(): void {
    this.router.navigate(['/dashboard/subscription']);
  }
}


