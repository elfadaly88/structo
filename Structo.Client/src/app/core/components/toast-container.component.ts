import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <div 
        *ngFor="let toast of toastService.toasts()"
        (click)="handleToastClick(toast)"
        class="pointer-events-auto flex items-start p-4 rounded-xl shadow-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 transform translate-y-0 hover:-translate-x-1 hover:shadow-indigo-500/10 active:scale-95 animate-slide-in"
        [ngClass]="{
          'bg-slate-900/90 border-indigo-500/30 text-white hover:border-indigo-400': toast.type === 'info',
          'bg-emerald-950/90 border-emerald-500/30 text-emerald-100 hover:border-emerald-400': toast.type === 'success',
          'bg-amber-950/90 border-amber-500/30 text-amber-100 hover:border-amber-400': toast.type === 'warning',
          'bg-rose-950/90 border-rose-500/30 text-rose-100 hover:border-rose-400': toast.type === 'error'
        }"
      >
        <!-- Icon -->
        <div class="flex-shrink-0 mr-3">
          <ng-container [ngSwitch]="toast.type">
            <!-- Success Icon -->
            <svg *ngSwitchCase="'success'" class="h-5 w-5 text-emerald-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Warning Icon -->
            <svg *ngSwitchCase="'warning'" class="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <!-- Error Icon -->
            <svg *ngSwitchCase="'error'" class="h-5 w-5 text-rose-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Info Icon -->
            <svg *ngSwitchDefault class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </ng-container>
        </div>

        <!-- Body -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold select-none leading-snug">{{ toast.title }}</p>
          <p class="mt-1 text-xs opacity-80 leading-relaxed select-none">{{ toast.message }}</p>
        </div>

        <!-- Close Button -->
        <button 
          (click)="handleClose($event, toast.id)" 
          class="flex-shrink-0 ml-4 text-slate-400 hover:text-white transition-colors duration-150 focus:outline-none cursor-pointer"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { opacity: 0; transform: translateX(20px) scale(0.95); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    .animate-slide-in {
      animation: slide-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
  `]
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  handleToastClick(toast: ToastMessage) {
    if (toast.onClick) {
      toast.onClick();
    }
    this.toastService.dismiss(toast.id);
  }

  handleClose(event: Event, id: string) {
    event.stopPropagation();
    this.toastService.dismiss(id);
  }
}
