import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12 relative overflow-hidden">
      <!-- Glow background -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="max-w-4xl mx-auto z-10 relative">
        <header class="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <span class="text-xs font-bold text-indigo-400 tracking-wider uppercase">Workspace</span>
            <h1 class="text-3xl font-extrabold tracking-tight mt-1 text-white">لوحة تحكم أُسُس / Ousos Dashboard</h1>
          </div>
          <button (click)="logout()" class="px-4 py-2 border border-slate-800 rounded-xl bg-slate-900/50 hover:bg-slate-900 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200">
            Log Out
          </button>
        </header>

        <main class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
            <h2 class="text-xl font-bold text-white mb-4">User Session Information</h2>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">User ID</span>
                <span class="font-mono text-xs bg-slate-950 px-2 py-0.5 rounded text-indigo-300">{{ authService.currentUser()?.userId }}</span>
              </div>
              <div class="flex justify-between border-b border-slate-800 pb-2">
                <span class="text-slate-400">Role</span>
                <span class="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-medium text-xs">{{ authService.currentUser()?.role }}</span>
              </div>
              <div class="flex justify-between pb-2">
                <span class="text-slate-400">Tenant ID</span>
                <span class="font-mono text-xs bg-slate-950 px-2 py-0.5 rounded text-pink-300">
                  {{ authService.currentUser()?.tenantId || 'No Tenant assigned' }}
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h2 class="text-xl font-bold text-white mb-2">Operational Services Status</h2>
              <p class="text-slate-400 text-sm mb-4">Your connection to the .NET 9 API gateway is active and secured.</p>
              <div class="flex items-center space-x-2">
                <span class="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span class="h-2 w-2 rounded-full bg-emerald-500 absolute"></span>
                <span class="text-emerald-400 text-xs font-semibold uppercase tracking-wider pl-3">API: Online</span>
              </div>
            </div>
            <div class="mt-6 text-xs text-slate-500">
              Session expires in 12 hours. JWT token is automatically attached to outgoing API requests.
            </div>
          </div>
        </main>
      </div>
    </div>
  `
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
