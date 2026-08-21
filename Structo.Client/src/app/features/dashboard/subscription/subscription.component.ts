import { Component, inject, signal, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubscriptionService, SubscriptionPlanItem } from '../../../core/services/subscription.service';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-cairo" dir="rtl">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto mb-8 sm:mb-12">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>بوابات الدفع الإلكتروني المعتمدة - Paymob Gateway</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              خطط الاشتراك وتوسعة سعة المشاريع
            </h1>
            <p class="text-sm text-slate-400 mt-1">
              اختر الباقة المناسبة لتوسيع سعة شركتك ومشاريعك الهندسية مع تفعيل فوري وآمن عبر Paymob.
            </p>
          </div>

          <!-- Current Quota Pill -->
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl self-start md:self-auto">
            <div class="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <span class="text-xs text-slate-400 font-bold block">سعة حسابك الحالية:</span>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <span class="text-lg font-black text-indigo-400 font-mono">{{ usedQuota() }}</span>
                <span class="text-xs text-slate-400">مستخدم من أصل</span>
                <span class="text-lg font-black text-white font-mono">{{ totalQuota() }}</span>
                <span class="text-xs text-slate-400">مشاريع</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Banner -->
        @if (errorMessage()) {
          <div class="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between animate-fade-in">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errorMessage() }}</span>
            </div>
            <button (click)="errorMessage.set(null)" class="text-slate-400 hover:text-white text-lg font-bold cursor-pointer">×</button>
          </div>
        }
      </div>

      <!-- Pricing Cards Grid -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (plan of plans(); track plan.id) {
          <div 
            class="relative flex flex-col justify-between rounded-3xl bg-slate-900/70 border transition-all duration-300 backdrop-blur-sm p-6 overflow-hidden group hover:translate-y-[-4px] hover:shadow-2xl"
            [class.border-indigo-500]="plan.isPopular"
            [class.shadow-indigo-500/10]="plan.isPopular"
            [class.border-slate-800]="!plan.isPopular"
            [class.hover:border-slate-700]="!plan.isPopular">
            
            <!-- Popular Glow Effect -->
            @if (plan.isPopular) {
              <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500"></div>
            }

            <!-- Card Header -->
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {{ plan.nameAr }}
                </h3>
                @if (plan.badge) {
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white shadow-sm"
                    [class.bg-gradient-to-r]="true"
                    [class.from-indigo-600]="plan.isPopular"
                    [class.to-violet-600]="plan.isPopular"
                    [class.from-slate-700]="!plan.isPopular"
                    [class.to-slate-600]="!plan.isPopular">
                    {{ plan.badge }}
                  </span>
                }
              </div>

              <p class="text-xs text-slate-400 min-h-[38px] leading-relaxed">
                {{ plan.descriptionAr }}
              </p>

              <!-- Price Tag -->
              <div class="mt-6 mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div class="flex items-baseline gap-1.5">
                  @if (plan.priceEgp === 0) {
                    <span class="text-3xl font-black text-white">مجاناً</span>
                  } @else {
                    <span class="text-3xl font-black text-white font-mono">{{ plan.priceEgp }}</span>
                    <span class="text-xs font-bold text-slate-400">ج.م (EGP)</span>
                  }
                </div>
                <span class="text-[11px] font-medium text-indigo-400 mt-1 block">
                  {{ plan.periodAr }}
                </span>
              </div>

              <!-- Features List -->
              <ul class="space-y-3 mb-6 text-xs text-slate-300">
                @for (feature of plan.featuresAr; track feature) {
                  <li class="flex items-start gap-2.5">
                    <div class="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{{ feature }}</span>
                  </li>
                }
              </ul>
            </div>

            <!-- Action Button -->
            <div class="pt-4 border-t border-slate-800/80">
              @if (plan.priceEgp === 0) {
                <button 
                  disabled
                  class="w-full py-3 px-4 rounded-2xl bg-slate-800 text-slate-400 font-bold text-xs cursor-default flex items-center justify-center gap-2">
                  <span>باقة البداية المفعلة</span>
                </button>
              } @else {
                <button 
                  (click)="onSelectPlan(plan)"
                  [disabled]="selectedPlanId() === plan.id && isCheckingOut()"
                  class="w-full py-3 px-4 rounded-2xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98 disabled:opacity-50"
                  [class.bg-gradient-to-r]="true"
                  [class.from-indigo-600]="plan.isPopular"
                  [class.to-violet-600]="plan.isPopular"
                  [class.hover:from-indigo-500]="plan.isPopular"
                  [class.hover:to-violet-500]="plan.isPopular"
                  [class.shadow-indigo-600/25]="plan.isPopular"
                  [class.bg-slate-800]="!plan.isPopular"
                  [class.hover:bg-slate-700]="!plan.isPopular"
                  [class.text-white]="true">
                  
                  @if (selectedPlanId() === plan.id && isCheckingOut()) {
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري التوجيه إلى Paymob...</span>
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>ترقية الباقة الآن</span>
                  }
                </button>
              }
            </div>
          </div>
        }
      </div>

      <!-- Trust Badges & Guarantee Footer -->
      <div class="max-w-7xl mx-auto mt-16 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">دفع آمن ومشفر 100%</h4>
              <p class="text-xs text-slate-400 mt-0.5">معتمد عبر شبكة Paymob ومحمي بأعلى معايير PCI-DSS و 3D Secure.</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">تفعيل فوري وتلقائي</h4>
              <p class="text-xs text-slate-400 mt-0.5">تتم زيادة سعة مشاريعك فورياً باللحظة ذاتها بمجرد إتمام السداد بنجاح.</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-bold text-white">دعم فني هندسي مخصص</h4>
              <p class="text-xs text-slate-400 mt-0.5">فريقنا متواجد على مدار الساعة لمساعدتك في كل ما يخص إدارة أعمالك.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- Paymob Checkout Modal (Embedded Iframe)                    -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    @if (showCheckoutModal()) {
      <div 
        class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 animate-fade-in"
        (click)="closeCheckoutModal()">
        
        <!-- Overlay Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <!-- Modal Container -->
        <div 
          class="relative w-full max-w-2xl flex flex-col bg-slate-900/95 border border-indigo-500/30 rounded-3xl shadow-2xl shadow-indigo-500/10 backdrop-blur-xl overflow-hidden"
          style="max-height: 92vh"
          (click)="$event.stopPropagation()">
          
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 shrink-0">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">بوابة الدفع الآمنة — Paymob</h3>
                <p class="text-[11px] text-slate-400">أكمل الدفع بأمان عبر بوابة Paymob المشفرة</p>
              </div>
            </div>
            <button 
              (click)="closeCheckoutModal()"
              class="h-8 w-8 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 flex items-center justify-center text-slate-400 hover:text-rose-400 transition-all duration-200 cursor-pointer"
              title="إغلاق">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Iframe Container (independent scroll) -->
          <div class="flex-1 overflow-y-auto min-h-0">
            @if (checkoutSafeUrl()) {
              <iframe 
                [src]="checkoutSafeUrl()!"
                class="w-full border-0"
                style="min-height: 580px; height: 75vh"
                allow="payment"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-top-navigation-by-user-activation"
                title="Paymob Secure Checkout">
              </iframe>
            }
          </div>

          <!-- Modal Footer -->
          <div class="px-5 py-3 border-t border-slate-800/80 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2 text-[11px] text-slate-500">
              <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>محمي بتشفير SSL/TLS — PCI-DSS Level 1</span>
            </div>
            <button 
              (click)="closeCheckoutModal()"
              class="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
              إلغاء الدفع
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly profileService = inject(TenantProfileService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  readonly plans = signal<SubscriptionPlanItem[]>([]);
  readonly usedQuota = signal<number>(0);
  readonly totalQuota = signal<number>(2);
  readonly selectedPlanId = signal<string | null>(null);
  readonly isCheckingOut = this.subscriptionService.isCheckingOut;
  readonly errorMessage = signal<string | null>(null);

  // Checkout modal state
  readonly showCheckoutModal = signal<boolean>(false);
  readonly checkoutSafeUrl = signal<SafeResourceUrl | null>(null);

  private messageHandler = (event: MessageEvent) => this.onWindowMessage(event);

  ngOnInit(): void {
    this.plans.set(this.subscriptionService.getAvailablePlans());
    this.loadQuota();

    // Listen for postMessage events from the checkout iframe / success bridge
    window.addEventListener('message', this.messageHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageHandler);
  }

  private loadQuota(): void {
    this.profileService.getQuota().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.usedQuota.set(res.data.usedProjects || 0);
          this.totalQuota.set(res.data.allowedProjects || 2);
        }
      },
      error: () => {
        // Fallback gracefully
      }
    });
  }

  onSelectPlan(plan: SubscriptionPlanItem): void {
    if (plan.priceEgp === 0) return;

    this.selectedPlanId.set(plan.id);
    this.errorMessage.set(null);

    this.subscriptionService.initiateCheckout(plan.id, plan.extraProjects).subscribe({
      next: (res) => {
        if (res.success && res.data?.checkoutUrl) {
          // Open embedded checkout modal instead of navigating away
          this.openCheckoutModal(res.data.checkoutUrl);
        } else {
          this.errorMessage.set(res.message || 'تعذر استلام رابط الدفع من بوابة Paymob');
        }
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'حدث خطأ أثناء بدء جلسة الدفع');
      }
    });
  }

  openCheckoutModal(checkoutUrl: string): void {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(checkoutUrl);
    this.checkoutSafeUrl.set(safeUrl);
    this.showCheckoutModal.set(true);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
  }

  closeCheckoutModal(): void {
    this.showCheckoutModal.set(false);
    this.checkoutSafeUrl.set(null);
    this.selectedPlanId.set(null);
    document.body.style.overflow = '';
  }

  /**
   * Handles postMessage events from the Paymob checkout iframe.
   * The subscription-success bridge page sends { type: 'paymob-payment-success', txnId } 
   * when the payment completes and the callback redirects inside the iframe.
   */
  private onWindowMessage(event: MessageEvent): void {
    if (!this.showCheckoutModal()) return;

    const data = event.data;
    if (data && typeof data === 'object' && data.type === 'paymob-payment-success') {
      this.closeCheckoutModal();
      const txnId = data.txnId || '';
      this.router.navigate(['/dashboard/subscription/success'], {
        queryParams: txnId ? { txnId } : {}
      });
    }
  }
}
