import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TenantsService } from '../../../core/services/tenants.service';
import { TenantDto } from '../../../core/services/public-directory.service';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl font-cairo">{{ 'TENANTS.PAGE_TITLE' | translate }}</h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">{{ 'TENANTS.PAGE_SUBTITLE' | translate }}</p>
        </div>
      </div>

      <!-- Error Alert -->
      @if (provisionError()) {
        <div class="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 flex items-center justify-between shadow-lg mb-6">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm font-semibold text-rose-200">{{ provisionError() }}</span>
          </div>
          <button (click)="provisionError.set(null)" class="text-rose-400 hover:text-rose-300 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      }

      <!-- Tenants Grid -->
      <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden font-sans">
        <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <h3 class="text-base font-bold text-white font-cairo">{{ 'TENANTS.SECTION_TITLE' | translate }}</h3>
          <span class="text-xs text-slate-500 font-semibold">{{ tenants().length }} active</span>
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide font-cairo">
                  <th class="px-6 py-4">{{ 'TENANTS.TABLE_NAME' | translate }}</th>
                  <th class="px-6 py-4">{{ 'TENANTS.TABLE_ID' | translate }}</th>
                  <th class="px-6 py-4">{{ 'TENANTS.TABLE_PLAN' | translate }}</th>
                  <th class="px-6 py-4">{{ 'TENANTS.TABLE_QUOTA' | translate }}</th>
                  <th class="px-6 py-4">{{ 'TENANTS.TABLE_CREATED' | translate }}</th>
                  <th class="px-6 py-4">{{ 'TENANTS.TABLE_STATUS' | translate }}</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-sm text-slate-300">
                @for (tenant of tenants(); track tenant.id) {
                  <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                    <td class="px-6 py-4 font-semibold text-white">
                      <div class="flex items-center gap-3">
                        @if (tenant.logoUrl) {
                          <img [src]="tenant.logoUrl" class="w-8 h-8 rounded-md object-cover">
                        } @else {
                          <div class="w-8 h-8 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">{{ tenant.name.substring(0,2) }}</div>
                        }
                        {{ tenant.name }}
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-xs text-indigo-300 select-all">{{ tenant.id }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.subscriptionPlan === 'Premium') {
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400">Premium</span>
                      } @else if (tenant.subscriptionPlan === 'Standard') {
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400">Standard</span>
                      } @else {
                        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">Free</span>
                      }
                    </td>
                    <td class="px-6 py-4 text-slate-300 font-medium">{{ tenant.maxActiveProjects }} Projects</td>
                    <td class="px-6 py-4 text-slate-400">{{ tenant.createdAt | date }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.status === 'Active') {
                        <span class="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Active</span>
                      } @else if (tenant.status === 'PendingApproval') {
                        <span class="px-2 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">Pending</span>
                      } @else {
                        <span class="px-2 py-1 rounded bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">{{ tenant.status }}</span>
                      }
                    </td>
                    <td class="px-6 py-4 text-right">
                      @if (tenant.status === 'PendingApproval') {
                        <button 
                          (click)="provisionTenant(tenant.id)"
                          [disabled]="isProvisioning()"
                          class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs font-semibold rounded-lg text-white shadow-md transition-all font-cairo">
                          @if (isProvisioning() && targetTenantId === tenant.id) {
                            Processing...
                          } @else {
                            {{ 'TENANTS.PROVISION_BUTTON' | translate }}
                          }
                        </button>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">{{ 'TENANTS.NO_TENANTS' | translate }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  `
})
export class TenantsComponent implements OnInit {
  private readonly tenantsService = inject(TenantsService);

  readonly tenants = signal<TenantDto[]>([]);
  readonly isLoading = signal(false);
  readonly isProvisioning = signal(false);
  readonly provisionError = signal<string | null>(null);
  
  targetTenantId: string | null = null;

  ngOnInit(): void {
    this.fetchTenants();
  }

  fetchTenants(): void {
    this.isLoading.set(true);
    this.tenantsService.getAllTenants().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.tenants.set(res.data);
        }
      },
      error: () => this.isLoading.set(false)
    });
  }

  provisionTenant(id: string): void {
    this.isProvisioning.set(true);
    this.provisionError.set(null);
    this.targetTenantId = id;
    this.tenantsService.provisionTenant(id).subscribe({
      next: (res) => {
        this.isProvisioning.set(false);
        this.targetTenantId = null;
        if (res.success) {
          this.fetchTenants();
        } else {
          this.provisionError.set('Failed to provision: ' + res.message);
        }
      },
      error: (err) => {
        this.isProvisioning.set(false);
        this.targetTenantId = null;
        this.provisionError.set('An error occurred while provisioning the tenant.');
      }
    });
  }
}
