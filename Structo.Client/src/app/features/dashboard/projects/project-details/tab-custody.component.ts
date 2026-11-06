import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectDetailsStore } from './project-details.store';

/** Site custody (petty cash) tab. */
@Component({
  selector: 'app-pd-tab-custody',
  standalone: true,
  imports: [DecimalPipe, TranslatePipe],
  template: `
    <!-- Tab Content: Petty Cash -->
    @if (vm.activeTab() === 'petty-cash') {
      <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <h3 class="text-base font-bold text-white">{{ 'DETAILS.VOUCHERS_TITLE' | translate }}</h3>
          <div class="flex items-center gap-3">
            @if (vm.isOwnerOrAccountant()) {
              <button
                (click)="vm.openDisburseModal()"
                [disabled]="vm.project()?.status === 'Closed'"
                class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                تعزيز عهدة مباشر
              </button>
            }
            @if ((vm.isEngineer() || vm.isTenantOwner()) && vm.project()?.status !== 'Closed') {
              <button
                (click)="vm.openRequestModal()"
                [disabled]="vm.project()?.status === 'Closed'"
                class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:hover:scale-100 disabled:active:scale-100 disabled:pointer-events-none">
                {{ 'DETAILS.BTN_REQUEST_PETTY' | translate }}
              </button>
            }
            <span class="text-xs text-slate-500 font-semibold">{{ vm.pettyCashes().length }} {{ 'DETAILS.RECORDS' | translate }}</span>
          </div>
        </div>

        @if (vm.isLoadingPettyCash()) {
          <div class="flex justify-center py-12">
            <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <!-- 📱 Mobile View (< md): Adaptive Touch Cards Stack -->
          <div class="md:hidden divide-y divide-slate-800/80 font-cairo">
            @for (item of vm.pettyCashes(); track item.id) {
              <div class="p-4 space-y-3 bg-slate-950/20 hover:bg-slate-900/30 transition-colors">

                <!-- Top Row: User Avatar & Name, Date & Status Badge -->
                <div class="flex items-start justify-between gap-2">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {{ ((item.issuedTo || 'U').charAt(0)).toUpperCase() }}
                    </div>
                    <div class="min-w-0">
                      <h4 class="text-xs sm:text-sm font-bold text-white truncate">{{ item.issuedTo || 'Staff' }}</h4>
                      <span class="text-[10px] text-slate-400 font-mono block" dir="ltr">{{ vm.formatPettyCashDate(item) }}</span>
                    </div>
                  </div>

                  <div class="shrink-0">
                    @if (item.isSettled || item.status === 'Settled') {
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {{ 'DETAILS.STATUS_SETTLED' | translate }}
                      </span>
                    } @else if (item.status === 'Pending') {
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                        {{ 'DETAILS.STATUS_PENDING' | translate }}
                      </span>
                    } @else if (item.status === 'Issued') {
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                        تم الصرف
                      </span>
                    } @else if (item.status === 'Rejected') {
                      <button
                        type="button"
                        (click)="vm.openRejectionReasonModal(item)"
                        title="انقر لعرض سبب الرفض"
                        class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 transition-all cursor-pointer">
                        <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                        <span>مرفوض</span>
                        <svg class="w-3 h-3 text-rose-400/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    } @else {
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">
                        {{ item.status }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Middle Row: Reason & Amount -->
                <div class="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-3">
                  <div class="min-w-0 flex-1">
                    <span class="text-[10px] text-slate-400 font-bold block mb-0.5">البيان / السبب:</span>
                    <p class="text-xs text-slate-200 line-clamp-2 leading-relaxed cursor-pointer hover:text-indigo-400 transition-colors font-medium"
                       (click)="vm.openPettyCashReasonModal(item)">
                      {{ item.reason || '-' }}
                    </p>
                  </div>
                  <div class="text-left shrink-0">
                    <span class="text-[10px] text-slate-400 font-bold block mb-0.5">المبلغ:</span>
                    <span class="text-sm font-extrabold text-amber-400 font-mono tabular-nums">
                      {{ item.amount | number:'1.2-2' }} <span class="text-[10px] text-amber-400/70 font-sans">ج.م</span>
                    </span>
                  </div>
                </div>

                <!-- Mobile Actions Section -->
                <div class="pt-1">
                  @if (item.status === 'Pending' && vm.isOwnerOrAccountant()) {
                    <!-- Approval Action on Mobile -->
                    <div class="space-y-2.5 bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl">
                      <div class="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          (click)="vm.openApprovePettyCashModal(item)"
                          [disabled]="vm.project()?.status === 'Closed'"
                          class="w-full py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-cairo shadow-sm flex items-center justify-center gap-1.5">
                          <span>⚡ اعتماد وصرف</span>
                        </button>
                        <button
                          type="button"
                          (click)="vm.openRejectPettyCashModal(item)"
                          [disabled]="vm.project()?.status === 'Closed'"
                          class="w-full py-2 rounded-lg text-xs font-bold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-cairo flex items-center justify-center gap-1">
                          <span>❌ رفض</span>
                        </button>
                      </div>

                      <!-- Secondary Actions on Mobile -->
                      <div class="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
                        <button
                          type="button"
                          (click)="vm.onWhatsAppAlert(item)"
                          class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer py-1">
                          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                          </svg>
                          <span>واتساب</span>
                        </button>

                        <div class="flex items-center gap-3">
                          <button
                            type="button"
                            (click)="vm.openEditPettyCashModal(item)"
                            [disabled]="vm.project()?.status === 'Closed'"
                            class="text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer py-1">
                            تعديل
                          </button>
                          <span class="text-slate-700">|</span>
                          <button
                            type="button"
                            (click)="vm.onDeletePettyCash(item.id, item.isSettled)"
                            [disabled]="vm.isDeletingPettyCash() || vm.project()?.status === 'Closed'"
                            class="text-[11px] font-bold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer py-1 flex items-center gap-1">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>حذف</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div class="flex items-center justify-between gap-2 flex-wrap">
                      <div class="flex items-center gap-2 flex-wrap">
                        @if (!item.isSettled && item.status === 'Issued') {
                          <button
                            type="button"
                            (click)="vm.openSettlementModal(item)"
                            [disabled]="vm.project()?.status === 'Closed'"
                            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-md shadow-indigo-600/10 transition-all cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ 'DETAILS.BTN_SETTLE' | translate }}
                          </button>
                        }

                        @if (item.isSettled || item.status === 'Settled') {
                          <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2.5 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            🔒 مقفلة
                          </span>

                          @if (item.receiptPhotoUrl) {
                            <a [href]="item.receiptPhotoUrl" target="_blank" 
                               class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                               title="View Receipt">
                              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>الإيصال</span>
                            </a>
                          }
                        }

                        @if (!(item.isSettled || item.status === 'Settled')) {
                          <button
                            type="button"
                            (click)="vm.onWhatsAppAlert(item)"
                            class="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 font-cairo">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                            </svg>
                            <span>واتساب</span>
                          </button>
                        }
                      </div>

                      @if (vm.isOwnerOrAccountant() && !(item.isSettled || item.status === 'Settled')) {
                        <div class="flex items-center gap-2">
                          <button
                            type="button"
                            (click)="vm.openEditPettyCashModal(item)"
                            [disabled]="vm.project()?.status === 'Closed'"
                            title="تعديل"
                            class="px-2 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer font-cairo">
                            تعديل
                          </button>
                          <button
                            type="button"
                            (click)="vm.onDeletePettyCash(item.id, item.isSettled)"
                            [disabled]="vm.isDeletingPettyCash() || vm.project()?.status === 'Closed'"
                            title="حذف"
                            class="px-2 py-1 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
            } @empty {
              <div class="p-8 text-center text-slate-500 text-sm">
                {{ 'DETAILS.NO_VOUCHERS' | translate }}
              </div>
            }
          </div>

          <!-- 🖥️ Desktop / Tablet View (>= md): Full Natural Responsive Table without horizontal scroll -->
          <div class="hidden md:block w-full overflow-x-auto font-sans custom-scrollbar">
            <table class="w-full text-right rtl:text-right font-cairo">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-950/30">
                  <th class="px-4 py-3.5 whitespace-nowrap">{{ 'DETAILS.TH_ISSUED_TO' | translate }}</th>
                  <th class="px-4 py-3.5">{{ 'DETAILS.TH_REASON' | translate }}</th>
                  <th class="px-4 py-3.5 whitespace-nowrap">{{ 'DETAILS.TH_DATE' | translate }}</th>
                  <th class="px-4 py-3.5 whitespace-nowrap">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                  <th class="px-4 py-3.5 text-center whitespace-nowrap">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                  <th class="px-4 py-3.5 text-center whitespace-nowrap">{{ 'DETAILS.TH_ACTION' | translate }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-sm">
                @for (item of vm.pettyCashes(); track item.id) {
                  <tr class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300">
                    <!-- Issued To -->
                    <td class="px-4 py-3.5 font-bold text-white whitespace-nowrap">
                      <div class="flex items-center gap-2">
                        <div class="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          {{ ((item.issuedTo || 'U').charAt(0)).toUpperCase() }}
                        </div>
                        <span class="text-xs sm:text-sm font-semibold">{{ item.issuedTo || 'Staff' }}</span>
                      </div>
                    </td>

                    <!-- Reason -->
                    <td class="px-4 py-3.5 text-slate-300 max-w-[200px] xl:max-w-[320px]">
                      <span class="truncate block cursor-pointer hover:text-indigo-400 transition-colors text-xs sm:text-sm font-medium"
                            [title]="item.reason || ''"
                            (click)="vm.openPettyCashReasonModal(item)">
                        {{ item.reason || '-' }}
                      </span>
                    </td>

                    <!-- Date -->
                    <td class="px-4 py-3.5 text-slate-400 text-xs font-mono whitespace-nowrap" dir="ltr">
                      {{ vm.formatPettyCashDate(item) }}
                    </td>

                    <!-- Amount -->
                    <td class="px-4 py-3.5 font-mono font-bold text-amber-400 whitespace-nowrap text-sm">
                      {{ item.amount | number:'1.2-2' }} <span class="text-xs text-amber-400/70 font-sans">{{ 'COMMON.CURRENCY' | translate }}</span>
                    </td>

                    <!-- Status Badge -->
                    <td class="px-4 py-3.5 text-center whitespace-nowrap">
                      @if (item.isSettled || item.status === 'Settled') {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {{ 'DETAILS.STATUS_SETTLED' | translate }}
                        </span>
                      } @else if (item.status === 'Pending') {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                          {{ 'DETAILS.STATUS_PENDING' | translate }}
                        </span>
                      } @else if (item.status === 'Issued') {
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                          تم الصرف
                        </span>
                      } @else if (item.status === 'Rejected') {
                        <button
                          type="button"
                          (click)="vm.openRejectionReasonModal(item)"
                          title="انقر لعرض سبب الرفض"
                          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm">
                          <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                          <span>مرفوض</span>
                          <svg class="w-3 h-3 text-rose-400/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      } @else {
                        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400">
                          {{ item.status }}
                        </span>
                      }
                    </td>

                    <!-- Action Column -->
                    <td class="px-4 py-3.5 text-center whitespace-nowrap">
                      <div class="flex items-center justify-center gap-2">
                        @if (item.status === 'Pending' && vm.isOwnerOrAccountant()) {
                          <!-- Approve & Disburse Modal Trigger -->
                          <button
                            type="button"
                            (click)="vm.openApprovePettyCashModal(item)"
                            [disabled]="vm.project()?.status === 'Closed'"
                            title="اعتماد وصرف العهدة"
                            class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/15 transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-cairo flex items-center gap-1">
                            <span>⚡</span>
                            <span>صرف / اعتماد</span>
                          </button>
                          <button
                            type="button"
                            (click)="vm.openRejectPettyCashModal(item)"
                            [disabled]="vm.project()?.status === 'Closed'"
                            title="رفض الطلب"
                            class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-cairo">
                            رفض
                          </button>
                          <button
                            type="button"
                            (click)="vm.onWhatsAppAlert(item)"
                            title="إرسال تنبيه واتساب"
                            class="p-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs transition-all duration-150 cursor-pointer">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                            </svg>
                          </button>
                          <button
                            type="button"
                            (click)="vm.openEditPettyCashModal(item)"
                            [disabled]="vm.project()?.status === 'Closed'"
                            title="تعديل"
                            class="p-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 text-xs transition-all cursor-pointer font-cairo">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            (click)="vm.onDeletePettyCash(item.id, item.isSettled)"
                            [disabled]="vm.isDeletingPettyCash() || vm.project()?.status === 'Closed'"
                            title="حذف"
                            class="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-xs transition-all cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        } @else {
                          <!-- Standard Issued / Settled Action Row -->
                          @if (!item.isSettled && item.status === 'Issued') {
                            <button
                              type="button"
                              (click)="vm.openSettlementModal(item)"
                              [disabled]="vm.project()?.status === 'Closed'"
                              class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-md shadow-indigo-600/10 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer font-cairo disabled:opacity-50 disabled:cursor-not-allowed">
                              {{ 'DETAILS.BTN_SETTLE' | translate }}
                            </button>
                          }

                          @if (item.isSettled || item.status === 'Settled') {
                            <span class="inline-flex items-center gap-1 text-slate-500 text-xs font-semibold px-2.5 py-1 bg-slate-950/40 border border-slate-800 rounded-lg select-none">
                              <svg class="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              🔒 مقفلة
                            </span>

                            @if (item.receiptPhotoUrl) {
                              <a [href]="item.receiptPhotoUrl" target="_blank" 
                                 class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-400 border border-indigo-500/20 transition-all cursor-pointer font-cairo shadow-sm" 
                                 title="View Receipt">
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>الإيصال</span>
                              </a>
                            }
                          }

                          <!-- WhatsApp Button (Only for unsettled / active items) -->
                          @if (!item.isSettled && item.status !== 'Settled') {
                            <button
                              type="button"
                              (click)="vm.onWhatsAppAlert(item)"
                              title="إرسال تنبيه واتساب"
                              class="px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-xl transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1 font-cairo">
                              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.028L2 22l5.135-1.348a9.91 9.91 0 004.877 1.28h.005c5.505 0 9.989-4.478 9.99-9.984A10.02 10.02 0 0012.012 2zm5.772 14.184c-.237.669-1.38 1.282-1.9 1.373-.464.082-.9.18-2.95-.624-2.617-1.026-4.304-3.69-4.437-3.868-.131-.177-1.07-1.428-1.07-2.723 0-1.294.673-1.927.915-2.186.242-.259.525-.324.7-.324h.5c.137 0 .323-.05.503.39.186.455.637 1.558.694 1.672.057.114.095.247.02.4-.075.153-.114.248-.228.381l-.224.238c-.114.133-.243.278-.104.516.14.238.622 1.025 1.332 1.657.914.814 1.684 1.066 1.922 1.185.238.12.377.101.517-.06.14-.16.602-.703.763-.94.161-.238.322-.2.54-.12.217.08 1.38.653 1.618.772.238.12.398.18.458.283.06.103.06.598-.178 1.267z"/>
                              </svg>
                              <span>واتساب</span>
                            </button>
                          }

                          @if (vm.isOwnerOrAccountant() && !item.isSettled && item.status !== 'Settled') {
                            <button
                              type="button"
                              (click)="vm.openEditPettyCashModal(item)"
                              [disabled]="vm.project()?.status === 'Closed'"
                              title="تعديل"
                              class="p-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer font-cairo">
                              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              (click)="vm.onDeletePettyCash(item.id, item.isSettled)"
                              [disabled]="vm.isDeletingPettyCash() || vm.project()?.status === 'Closed'"
                              title="حذف"
                              class="p-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer">
                              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          }
                        }
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-14 text-center text-slate-500 text-sm">
                      {{ 'DETAILS.NO_VOUCHERS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    }
  `
})
export class ProjectCustodyTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
