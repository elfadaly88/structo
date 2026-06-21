import { Component, signal } from '@angular/core';

interface TenantDemo {
  id: string;
  name: string;
  subscriptionPlan: 'Free' | 'Standard' | 'Premium';
  maxActiveProjects: number;
  createdAt: string;
}

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Tenants Management</h1>
          <p class="text-sm text-slate-400 mt-1">SuperAdmin overview to manage active software environments and subscription limits.</p>
        </div>
        <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold rounded-xl text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:scale-105 active:scale-95">
          + Provision Tenant
        </button>
      </div>

      <!-- Tenants Grid -->
      <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <h3 class="text-base font-bold text-white">System Environments</h3>
          <span class="text-xs text-slate-500 font-semibold">{{ tenants().length }} environments active</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                <th class="px-6 py-4">Tenant Name</th>
                <th class="px-6 py-4">ID (Environment Key)</th>
                <th class="px-6 py-4">Plan Type</th>
                <th class="px-6 py-4">Project Quota</th>
                <th class="px-6 py-4">Created Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-sm text-slate-300">
              @for (tenant of tenants(); track tenant.id) {
                <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                  <td class="px-6 py-4 font-semibold text-white">{{ tenant.name }}</td>
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
                  <td class="px-6 py-4 text-slate-400">{{ tenant.createdAt }}</td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="px-6 py-12 text-center text-slate-500 text-sm">No tenants found.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class TenantsComponent {
  readonly tenants = signal<TenantDemo[]>([
    {
      id: 'd9b73678-75b4-4b53-b4cd-8a6a24cd8c21',
      name: 'Tenant 1',
      subscriptionPlan: 'Premium',
      maxActiveProjects: 50,
      createdAt: '2026-06-21'
    },
    {
      id: 'fae81b67-a2f0-464a-bd54-1594e9f538e1',
      name: 'Tenant 2',
      subscriptionPlan: 'Free',
      maxActiveProjects: 2,
      createdAt: '2026-06-21'
    }
  ]);
}
