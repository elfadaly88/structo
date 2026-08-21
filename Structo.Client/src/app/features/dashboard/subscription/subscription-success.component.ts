import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-subscription-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-cairo" dir="rtl">
      <div class="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <!-- Ambient Glow -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Success Icon / Celebration -->
        <div class="mx-auto w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10 animate-bounce">
          <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="text-2xl sm:text-3xl font-black text-white mb-2">
          🎉 تم ترقية باقة اشتراكك بنجاح!
        </h1>
        <p class="text-sm text-slate-400 mb-6 leading-relaxed">
          تمت معالجة الدفعة عبر بوابة Paymob بنجاح، وتحديث سعة مشاريعك في قاعدة بيانات Structo فورياً.
        </p>

        <!-- Dynamic Quota Badge -->
        <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6 flex items-center justify-between">
          <div class="text-right">
            <span class="text-xs text-slate-400 font-bold block">سعة مشاريعك الجديدة:</span>
            <span class="text-lg font-black text-emerald-400 font-mono">
              {{ allowedQuota() }} مشاريع نشطة
            </span>
          </div>
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        @if (transactionReference()) {
          <div class="text-xs text-slate-500 font-mono mb-6">
            رقم المعاملة: <span class="text-slate-400">{{ transactionReference() }}</span>
          </div>
        }

        <!-- Actions -->
        <div class="space-y-3">
          <button 
            (click)="goToProjects()"
            class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>الانتقال إلى قائمة المشاريع</span>
          </button>

          <button 
            (click)="goToBilling()"
            class="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer">
            <span>عرض تفاصيل الحساب والاشتراك</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionSuccessComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly profileService = inject(TenantProfileService);
  private readonly auth = inject(AuthService);

  readonly allowedQuota = signal<number>(2);
  readonly transactionReference = signal<string | null>(null);

  ngOnInit(): void {
    const txnId = this.route.snapshot.queryParamMap.get('txnId') 
      || this.route.snapshot.queryParamMap.get('id')
      || this.route.snapshot.queryParamMap.get('ref');

    if (txnId) {
      this.transactionReference.set(txnId);
    }

    // Refresh tenant quota and profile signals
    this.profileService.getQuota().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.allowedQuota.set(res.data.allowedProjects || 2);
        }
      }
    });

    // Best-effort silent refresh of auth tokens/profile
    this.auth.refreshToken().subscribe({
      next: () => {},
      error: () => {}
    });
  }

  goToProjects(): void {
    this.router.navigate(['/dashboard/projects']);
  }

  goToBilling(): void {
    this.router.navigate(['/dashboard/profile']);
  }
}
