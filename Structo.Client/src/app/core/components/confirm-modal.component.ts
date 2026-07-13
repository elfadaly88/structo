import { Component, inject } from '@angular/core';
import { ConfirmModalService } from '../../core/services/confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    <!-- ────────── Confirmation Dialog ────────── -->
    @if (modal.isConfirmOpen()) {
      <div class="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <!-- Backdrop clickable to dismiss -->
        <div (click)="modal.resolveConfirm(false)" class="absolute inset-0"></div>

        <!-- Modal Panel -->
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="p-4 sm:p-6 overflow-y-auto min-h-0 w-full flex-1">
          <!-- Icon -->
          <div class="flex items-center gap-3 mb-4">
            @if (modal.confirmConfig().type === 'danger') {
              <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            } @else if (modal.confirmConfig().type === 'warning') {
              <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            } @else {
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            <h3 class="text-lg font-bold text-white leading-tight">{{ modal.confirmConfig().title }}</h3>
          </div>

          <!-- Body -->
          <p class="text-sm text-slate-300 leading-relaxed mb-6 pl-[52px]">
            {{ modal.confirmConfig().message }}
          </p>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3">
            <button
              (click)="modal.resolveConfirm(false)"
              class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
              {{ modal.confirmConfig().cancelText }}
            </button>
            <button
              (click)="modal.resolveConfirm(true)"
              class="px-5 py-2 text-sm font-semibold rounded-xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
              [class.bg-rose-600]="modal.confirmConfig().type === 'danger'"
              [class.hover:bg-rose-500]="modal.confirmConfig().type === 'danger'"
              [class.bg-amber-600]="modal.confirmConfig().type === 'warning'"
              [class.hover:bg-amber-500]="modal.confirmConfig().type === 'warning'"
              [class.bg-indigo-600]="modal.confirmConfig().type === 'info'"
              [class.hover:bg-indigo-500]="modal.confirmConfig().type === 'info'">
              {{ modal.confirmConfig().confirmText }}
            </button>
          </div>
          </div>
        </div>
      </div>
    }

    <!-- ────────── Alert Dialog ────────── -->
    @if (modal.isAlertOpen()) {
      <div class="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
        <!-- Backdrop clickable to dismiss -->
        <div (click)="modal.resolveAlert()" class="absolute inset-0"></div>

        <!-- Modal Panel -->
        <div class="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/60 shadow-2xl transition-all z-10 animate-[scaleIn_0.15s_ease-out]">
          <div class="p-4 sm:p-6 overflow-y-auto min-h-0 w-full flex-1">
          <!-- Icon -->
          <div class="flex items-center gap-3 mb-4">
            @if (modal.alertConfig().type === 'error') {
              <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            } @else if (modal.alertConfig().type === 'success') {
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            } @else {
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            }
            <h3 class="text-lg font-bold text-white leading-tight">{{ modal.alertConfig().title }}</h3>
          </div>

          <!-- Body -->
          <p class="text-sm text-slate-300 leading-relaxed mb-6 pl-[52px]">
            {{ modal.alertConfig().message }}
          </p>

          <!-- Dismiss -->
          <div class="flex items-center justify-end">
            <button
              (click)="modal.resolveAlert()"
              class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
              {{ modal.alertConfig().buttonText }}
            </button>
          </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95) translateY(4px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `]
})
export class ConfirmModalComponent {
  readonly modal = inject(ConfirmModalService);
}
