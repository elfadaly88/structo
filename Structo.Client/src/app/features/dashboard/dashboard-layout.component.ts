import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">

      <!-- Top Navbar -->
      <nav class="bg-slate-900 border-b border-slate-800 fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 z-40">
        <!-- Brand & Mobile Toggle -->
        <div class="flex items-center gap-3">
          <button
            (click)="toggleSidebar()"
            class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors duration-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="flex items-center gap-2">
            <div class="h-8 w-8 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span class="text-white font-extrabold text-sm">S</span>
            </div>
            <span class="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent hidden sm:inline-block">Structo</span>
          </div>
        </div>

        <!-- User info, Language & Logout -->
        <div class="flex items-center gap-4">
          <button 
            (click)="langService.toggleLanguage()"
            class="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-all duration-200 cursor-pointer px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 active:scale-95">
            {{ langService.currentLang() === 'en' ? 'عربي' : 'English' }}
          </button>

          <div class="hidden md:flex flex-col text-right rtl:text-left">
            <span class="text-xs font-semibold text-slate-500">{{ 'DASHBOARD.LOGGED_IN_AS' | translate }}</span>
            <span class="text-sm font-medium text-slate-200">{{ authService.currentUser()?.name }}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wide">
            {{ authService.currentUser()?.role }}
          </span>
          <button
            (click)="logout()"
            class="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-500/40 bg-slate-950 hover:bg-red-950/20 text-xs font-semibold text-slate-400 hover:text-red-400 transition-all duration-200 cursor-pointer">
            {{ 'COMMON.LOGOUT' | translate }}
          </button>
        </div>
      </nav>

      <!-- Sidebar + Main content -->
      <div class="flex flex-1 pt-16 h-screen overflow-hidden">

        <!-- Mobile Backdrop -->
        @if (isSidebarOpen()) {
          <div
            (click)="closeSidebar()"
            class="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-30 md:hidden">
          </div>
        }

        <!-- Sidebar -->
        <aside
          class="fixed md:relative inset-y-0 start-0 pt-16 md:pt-0 bg-slate-900 flex flex-col z-[35] md:z-20 transition-all duration-300 ease-in-out overflow-hidden"
          [class.w-64]="isSidebarOpen()"
          [class.w-0]="!isSidebarOpen()"
          [class.border-e]="isSidebarOpen()"
          [class.border-slate-800]="isSidebarOpen()"
          [class.translate-x-0]="isSidebarOpen()"
          [class.ltr:-translate-x-full]="!isSidebarOpen()"
          [class.rtl:translate-x-full]="!isSidebarOpen()"
          [class.md:translate-x-0]="true">

          <div class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <span class="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase px-3 block mb-4">
              {{ 'DASHBOARD.SIDEBAR_NAV' | translate }}
            </span>

            @for (item of menuItems(); track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-slate-800 text-indigo-400 border-indigo-500/40"
                [routerLinkActiveOptions]="{ exact: false }"
                (click)="closeSidebar()"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-all duration-200">
                <span [innerHTML]="item.icon" class="h-5 w-5 shrink-0 flex items-center justify-center"></span>
                <span>{{ item.label | translate }}</span>
              </a>
            }
          </div>

          <!-- Bottom Tenant Info -->
          @if (authService.currentUser()?.tenantId) {
            <div class="p-4 border-t border-slate-800 bg-slate-950/40">
              <span class="text-[10px] font-extrabold text-slate-500 tracking-wider uppercase block">
                {{ 'DASHBOARD.TENANT_ENV' | translate }}
              </span>
              <span class="text-xs font-mono text-slate-400 truncate block mt-1 select-all" [title]="authService.currentUser()?.tenantId ?? ''">
                {{ authService.currentUser()?.tenantId }}
              </span>
            </div>
          }
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-slate-950 p-6 md:p-8">
          <router-outlet></router-outlet>
        </main>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class DashboardLayoutComponent {
  readonly authService = inject(AuthService);
  protected readonly langService = inject(LanguageService);
  private readonly router = inject(Router);

  readonly isSidebarOpen = signal(typeof window !== 'undefined' ? window.innerWidth >= 768 : false);

  // SVG icons for sidebar items
  private readonly icons = {
    overview: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
    tenants: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
    projects: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>`,
    users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    financials: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
    pettyCash: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    profile: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`
  };

  // Role-based navigation computed from auth state (using translation keys instead of raw text)
  readonly menuItems = computed<NavItem[]>(() => {
    const role = this.authService.currentUser()?.role;
    switch (role) {
      case 'SuperAdmin':
        return [
          { label: 'DASHBOARD.GLOBAL_OVERVIEW', route: '/dashboard/overview', icon: this.icons.overview },
          { label: 'DASHBOARD.TENANTS_MGMT', route: '/dashboard/tenants', icon: this.icons.tenants }
        ];
      case 'TenantOwner':
        return [
          { label: 'DASHBOARD.FINANCIALS', route: '/dashboard/financials', icon: this.icons.financials },
          { label: 'PROJECTS.PAGE_TITLE', route: '/dashboard/projects', icon: this.icons.projects },
          { label: 'USERS.TAB_USERS', route: '/dashboard/users', icon: this.icons.users },
          { label: 'PROFILE.TAB_PROFILE', route: '/dashboard/profile', icon: this.icons.profile }
        ];
      case 'Accountant':
        return [
          { label: 'DASHBOARD.FINANCIALS', route: '/dashboard/financials', icon: this.icons.financials },
          { label: 'PROJECTS.PAGE_TITLE', route: '/dashboard/projects', icon: this.icons.projects }
        ];
      case 'Manager':
      case 'SiteEngineer':
      case 'DesignEngineer':
        return [
          { label: 'DASHBOARD.FINANCIALS', route: '/dashboard/financials', icon: this.icons.financials },
          { label: 'DASHBOARD.MY_PROJECTS', route: '/dashboard/projects', icon: this.icons.projects }
        ];
      default:
        return [];
    }
  });

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

