import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-subscription-failed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-cairo" dir="rtl">
      <div class="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <!-- Failure Ambient Glow -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-slate-800/20 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Failure Icon -->
        <div class="mx-auto w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 shadow-lg shadow-rose-500/10">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-black text-white mb-2">
          لم تكتمل عملية الدفع
        </h1>
        <p class="text-sm text-slate-400 mb-6 leading-relaxed">
          تم إلغاء عملية الدفع أو تعذر سحب المبلغ من البطاقة. لم يتم خصم أي مبالغ من حسابك.
        </p>

        @if (transactionReference()) {
          <div class="text-xs text-slate-500 font-mono mb-6">
            رقم المحاولة: <span class="text-slate-400">{{ transactionReference() }}</span>
          </div>
        }

        <!-- Actions -->
        <div class="space-y-3">
          <button 
            (click)="retryPayment()"
            class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>إعادة المحاولة واختيار باقة</span>
          </button>

          <button 
            (click)="goToProjects()"
            class="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer">
            <span>العودة للمشاريع</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionFailedComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly transactionReference = signal<string | null>(null);

  ngOnInit(): void {
    const txnId = this.route.snapshot.queryParamMap.get('txnId') 
      || this.route.snapshot.queryParamMap.get('id');

    if (txnId) {
      this.transactionReference.set(txnId);
    }
  }

  retryPayment(): void {
    this.router.navigate(['/dashboard/subscription']);
  }

  goToProjects(): void {
    this.router.navigate(['/dashboard/projects']);
  }
}
