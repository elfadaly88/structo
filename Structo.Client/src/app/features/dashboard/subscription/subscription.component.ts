import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubscriptionService, SubscriptionPlanItem } from '../../../core/services/subscription.service';
import { TenantProfileService } from '../../../core/services/tenant-profile.service';
import { PaymentAuditService, MyPaymentsResponse } from '../../../core/services/payment-audit.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 p-3 sm:p-6 lg:p-8 font-cairo" dir="rtl">
      <!-- Header Section -->
      <div class="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>بوابات الدفع الإلكتروني المعتمدة - Paymob Unified Checkout</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              الاشتراكات وتدقيق عمليات الدفع
            </h1>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">
              إدارة سعة المشاريع والاطلاع الفوري على حالة وصول إشعارات الدفع (Webhook) لكل عملية.
            </p>
          </div>

          <!-- Current Quota Pill -->
          <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl self-start md:self-auto shrink-0">
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

        <!-- Navigation Tabs -->
        <div class="flex items-center gap-2 mt-6 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
          <button
            (click)="activeTab.set('plans')"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
            [class.bg-indigo-600]="activeTab() === 'plans'"
            [class.text-white]="activeTab() === 'plans'"
            [class.shadow-lg]="activeTab() === 'plans'"
            [class.shadow-indigo-500/20]="activeTab() === 'plans'"
            [class.bg-slate-900]="activeTab() !== 'plans'"
            [class.text-slate-400]="activeTab() !== 'plans'"
            [class.hover:text-slate-200]="activeTab() !== 'plans'"
            [class.hover:bg-slate-800]="activeTab() !== 'plans'">
            <span>💎</span>
            <span>باقات الشراء وتوسعة السعة</span>
          </button>

          <button
            (click)="switchTabToHistory()"
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap relative"
            [class.bg-indigo-600]="activeTab() === 'history'"
            [class.text-white]="activeTab() === 'history'"
            [class.shadow-lg]="activeTab() === 'history'"
            [class.shadow-indigo-500/20]="activeTab() === 'history'"
            [class.bg-slate-900]="activeTab() !== 'history'"
            [class.text-slate-400]="activeTab() !== 'history'"
            [class.hover:text-slate-200]="activeTab() !== 'history'"
            [class.hover:bg-slate-800]="activeTab() !== 'history'">
            <span>📜</span>
            <span>سجل المدفوعات والـ Webhook</span>
            @if (myPayments() && myPayments()!.totalNeverArrivedCount > 0) {
              <span class="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full font-bold animate-pulse">
                {{ myPayments()!.totalNeverArrivedCount }}
              </span>
            }
          </button>
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

      <!-- TAB 1: Pricing Cards Grid -->
      @if (activeTab() === 'plans') {
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
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
                    [class.bg-slate-800]="!plan.isPopular"
                    [class.text-white]="true"
                    [class.hover:bg-slate-700]="!plan.isPopular">
                    @if (selectedPlanId() === plan.id && isCheckingOut()) {
                      <svg class="animate-spin -ms-1 me-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>جاري التحويل لبوابة الدفع...</span>
                    } @else {
                      <span>ترقية الباقة والدفع الآن</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    }
                  </button>
                }
              </div>
            </div>
          }
        </div>
      }

      <!-- TAB 2: Payment History & Webhook Audit Logs -->
      @if (activeTab() === 'history') {
        <div class="max-w-7xl mx-auto space-y-6 animate-fade-in">
          <!-- Summary Cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-slate-400 font-bold block">إجمالي محاولات الدفع</span>
              <span class="text-xl sm:text-2xl font-black text-white font-mono mt-1 block">
                {{ myPayments()?.attempts?.length || 0 }}
              </span>
            </div>
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-emerald-400 font-bold block">المدفوعات المؤكدة 🟢</span>
              <span class="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1 block">
                {{ myPayments()?.totalConfirmedCount || 0 }}
              </span>
            </div>
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-rose-400 font-bold block">لم يصل الويب هوك 🔴</span>
              <span class="text-xl sm:text-2xl font-black text-rose-400 font-mono mt-1 block">
                {{ myPayments()?.totalNeverArrivedCount || 0 }}
              </span>
            </div>
            <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <span class="text-xs text-indigo-400 font-bold block">إجمالي المصروف</span>
              <div class="flex items-baseline gap-1 mt-1">
                <span class="text-xl sm:text-2xl font-black text-indigo-300 font-mono">{{ myPayments()?.totalSpentEgp || 0 }}</span>
                <span class="text-[10px] text-slate-400">ج.م</span>
              </div>
            </div>
          </div>

          <!-- Stale Webhook Warning Alert if applicable -->
          @if (myPayments() && myPayments()!.totalNeverArrivedCount > 0) {
            <div class="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-start gap-3">
              <svg class="w-6 h-6 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div class="text-xs sm:text-sm space-y-1">
                <p class="font-bold text-rose-100">⚠️ تنبيه وصول إشعارات الدفع (Webhook Gap Alert)</p>
                <p class="text-rose-200/80">
                  تم رصد {{ myPayments()!.totalNeverArrivedCount }} عملية دفع لم يصل إشعار تأكيدها التلقائي من Paymob. إذا تم خصم المبلغ من بطاقتك ولم تزد سعة حسابك، يرجى تزويد الدعم الفني برقم الطلب لتفعيل السعة يدوياً فوراً.
                </p>
              </div>
            </div>
          }

          <!-- History Table & Mobile Cards -->
          <div class="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 class="text-base font-bold text-white flex items-center gap-2">
                <span>سجل تفاصيل العمليات والـ Webhook</span>
              </h3>
              <button
                (click)="loadPaymentHistory()"
                [disabled]="isLoadingHistory()"
                class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-indigo-400 hover:text-indigo-300 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" [class.animate-spin]="isLoadingHistory()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>تحديث السجل</span>
              </button>
            </div>

            <!-- Loading State -->
            @if (isLoadingHistory()) {
              <div class="p-12 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-3">
                <div class="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span>جاري تحميل سجل المدفوعات...</span>
              </div>
            } @else if (!myPayments() || myPayments()!.attempts.length === 0) {
              <div class="p-12 text-center text-slate-500 text-xs">
                لا توجد عمليات دفع مسجلة حتى الآن.
              </div>
            } @else {
              <!-- Desktop Table View (hidden on mobile) -->
              <div class="hidden md:block overflow-x-auto">
                <table class="w-full text-right text-xs">
                  <thead class="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th class="py-3.5 px-4 font-bold">التاريخ</th>
                      <th class="py-3.5 px-4 font-bold">الباقة / الزيادة</th>
                      <th class="py-3.5 px-4 font-bold">المبلغ</th>
                      <th class="py-3.5 px-4 font-bold">رقم الطلب (Paymob ID)</th>
                      <th class="py-3.5 px-4 font-bold">حالة وصول الـ Webhook</th>
                      <th class="py-3.5 px-4 font-bold">الرقم المرجعي</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800/60">
                    @for (item of myPayments()!.attempts; track item.id) {
                      <tr class="hover:bg-slate-800/40 transition-colors">
                        <td class="py-3.5 px-4 text-slate-300 font-mono whitespace-nowrap">
                          {{ item.createdAt | date:'yyyy-MM-dd HH:mm' }}
                        </td>
                        <td class="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                          {{ item.planRequested }}
                        </td>
                        <td class="py-3.5 px-4 font-mono font-bold text-indigo-300 whitespace-nowrap">
                          {{ item.amount }} ج.م
                        </td>
                        <td class="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                          {{ item.paymobOrderId || item.specialReference || '-' }}
                        </td>
                        <td class="py-3.5 px-4 whitespace-nowrap">
                          @if (item.webhookStatus === 'Confirmed') {
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              <span>تم التأكيد والتفعيل (Confirmed)</span>
                            </span>
                          } @else if (item.webhookStatus === 'Pending') {
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                              <span>جاري المعالجة... (Pending)</span>
                            </span>
                          } @else if (item.webhookStatus === 'NeverArrived') {
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30" [title]="item.errorMessage || ''">
                              <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                              <span>لم يصل إشعار الدفع (NeverArrived)</span>
                            </span>
                          } @else if (item.webhookStatus === 'HmacFailed') {
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30" [title]="item.errorMessage || ''">
                              <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                              <span>فشل التحقق الأمني (HmacFailed)</span>
                            </span>
                          } @else {
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400">
                              {{ item.webhookStatus }}
                            </span>
                          }
                        </td>
                        <td class="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                          {{ item.referenceNumber || item.specialReference }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              <!-- Mobile Card Layout (block md:hidden, 320px - 480px) -->
              <div class="block md:hidden divide-y divide-slate-800">
                @for (item of myPayments()!.attempts; track item.id) {
                  <div class="p-4 space-y-3">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-bold text-white text-sm">{{ item.planRequested }}</span>
                      <span class="font-mono font-bold text-indigo-400 text-sm">{{ item.amount }} ج.م</span>
                    </div>

                    <div class="flex items-center justify-between text-xs text-slate-400">
                      <span>التاريخ:</span>
                      <span class="font-mono text-slate-300">{{ item.createdAt | date:'yyyy-MM-dd HH:mm' }}</span>
                    </div>

                    <div class="flex items-center justify-between text-xs text-slate-400">
                      <span>رقم الطلب:</span>
                      <span class="font-mono text-slate-300">{{ item.paymobOrderId || item.specialReference }}</span>
                    </div>

                    <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span class="text-[11px] text-slate-400">حالة الـ Webhook:</span>
                      @if (item.webhookStatus === 'Confirmed') {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          تم التأكيد 🟢
                        </span>
                      } @else if (item.webhookStatus === 'Pending') {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          جاري المعالجة 🟡
                        </span>
                      } @else if (item.webhookStatus === 'NeverArrived') {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                          لم يصل الويب هوك 🔴
                        </span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                          {{ item.webhookStatus }}
                        </span>
                      }
                    </div>

                    @if (item.errorMessage) {
                      <p class="text-[11px] text-rose-400/90 bg-rose-500/5 p-2 rounded-xl border border-rose-500/20">
                        {{ item.errorMessage }}
                      </p>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }

      <!-- Trust Footer Badges -->
      <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-500 text-xs">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>تشفير معاملات 256-bit SSL آمن</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>دعم جميع البطاقات والمحافظ الإلكترونية</span>
        </div>
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>تفعيل وتوسعة فورية للسعة</span>
        </div>
      </div>
    </div>
  `
})
export class SubscriptionComponent implements OnInit {
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly profileService = inject(TenantProfileService);
  private readonly paymentAuditService = inject(PaymentAuditService);

  readonly plans = signal<SubscriptionPlanItem[]>([]);
  readonly usedQuota = signal<number>(0);
  readonly totalQuota = signal<number>(2);
  readonly selectedPlanId = signal<string | null>(null);
  readonly isCheckingOut = this.subscriptionService.isCheckingOut;
  readonly errorMessage = signal<string | null>(null);

  // Tabs: 'plans' | 'history'
  readonly activeTab = signal<'plans' | 'history'>('plans');
  readonly myPayments = signal<MyPaymentsResponse | null>(null);
  readonly isLoadingHistory = signal<boolean>(false);

  ngOnInit(): void {
    this.plans.set(this.subscriptionService.getAvailablePlans());
    this.loadQuota();
    this.loadPaymentHistory();
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

  loadPaymentHistory(): void {
    this.isLoadingHistory.set(true);
    this.paymentAuditService.getMyPayments().subscribe({
      next: (res) => {
        this.isLoadingHistory.set(false);
        if (res.success && res.data) {
          this.myPayments.set(res.data);
          if (res.data.currentMaxProjects) {
            this.totalQuota.set(res.data.currentMaxProjects);
          }
        }
      },
      error: () => {
        this.isLoadingHistory.set(false);
      }
    });
  }

  switchTabToHistory(): void {
    this.activeTab.set('history');
    this.loadPaymentHistory();
  }

  onSelectPlan(plan: SubscriptionPlanItem): void {
    if (plan.priceEgp === 0) return;

    this.selectedPlanId.set(plan.id);
    this.errorMessage.set(null);

    this.subscriptionService.initiateCheckout(plan.id, plan.extraProjects).subscribe({
      next: (res) => {
        if (res.success && res.data?.checkoutUrl) {
          // Direct full-page browser redirect to Paymob Unified Checkout
          window.location.href = res.data.checkoutUrl;
        } else {
          this.selectedPlanId.set(null);
          this.errorMessage.set(res.message || 'تعذر استلام رابط الدفع من بوابة Paymob');
        }
      },
      error: (err) => {
        this.selectedPlanId.set(null);
        this.errorMessage.set(err?.error?.message || 'حدث خطأ أثناء بدء جلسة الدفع');
      }
    });
  }
}
