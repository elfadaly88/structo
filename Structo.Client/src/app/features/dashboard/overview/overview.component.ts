import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Global System Overview</h1>
        <p class="text-sm text-slate-400 mt-1">Real-time diagnostics and global status reports of all host environments.</p>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Tenants</span>
          <h3 class="text-3xl font-extrabold text-white mt-1">12</h3>
          <p class="text-xs text-emerald-400 mt-1">↑ 8.3% vs last month</p>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">Global DB Size</span>
          <h3 class="text-3xl font-extrabold text-indigo-400 mt-1">1.42 GB</h3>
          <p class="text-xs text-slate-500 mt-1">Daily delta: +22MB</p>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">API Latency</span>
          <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">42 ms</h3>
          <p class="text-xs text-slate-400 mt-1">99th percentile: 120ms</p>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">System CPU</span>
          <h3 class="text-3xl font-extrabold text-amber-400 mt-1">14.8%</h3>
          <p class="text-xs text-slate-500 mt-1">Status: Stable</p>
        </div>
      </div>

      <!-- Details panel -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm">
          <h3 class="text-lg font-bold text-white mb-4">Core System Alerts</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800/80">
              <span class="h-2 w-2 mt-1.5 rounded-full bg-emerald-500"></span>
              <div>
                <h4 class="text-sm font-semibold text-white">PostgreSQL Migrations Complete</h4>
                <p class="text-xs text-slate-400 mt-0.5">Database schema matches v1.0.3 specifications. Indexes rebuilt successfully.</p>
              </div>
            </div>
            <div class="flex items-start space-x-3 p-3 rounded-xl bg-slate-900 border border-slate-800/80">
              <span class="h-2 w-2 mt-1.5 rounded-full bg-amber-500"></span>
              <div>
                <h4 class="text-sm font-semibold text-white">Daily Backup Completed with Warnings</h4>
                <p class="text-xs text-slate-400 mt-0.5">GCS Storage sync completed. Backup file structo_backup_2026-06-21.sql generated.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-white mb-2">Resource Monitor</h3>
            <p class="text-sm text-slate-400 mb-6">Internal server allocations for Structo API daemon instance.</p>
            
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Memory Alloc (RAM)</span>
                  <span>342 MB / 2048 MB</span>
                </div>
                <div class="bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-indigo-500 h-full w-[17%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Disk Storage</span>
                  <span>14.2 GB / 100 GB</span>
                </div>
                <div class="bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div class="bg-purple-500 h-full w-[14%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <span class="text-slate-600 text-[10px] uppercase font-bold tracking-wider pt-8 block text-center">Last update: just now</span>
        </div>
      </div>
    </div>
  `
})
export class OverviewComponent {}
