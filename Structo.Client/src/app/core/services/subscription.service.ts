import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';

export interface PaymobCheckoutRequest {
  targetPlanId?: string;
  extraProjectsCount?: number;
  redirectUrl?: string;
}

export interface PaymobCheckoutResponse {
  checkoutUrl: string;
  clientSecret?: string;
  paymentToken?: string;
  orderId?: string;
  amountCents: number;
  currency: string;
  planName: string;
  totalAmountEgp: number;
}

export interface SubscriptionPlanItem {
  id: string;
  nameAr: string;
  nameEn: string;
  extraProjects?: number;
  totalProjectsQuota?: number;
  priceEgp: number;
  periodAr: string;
  descriptionAr: string;
  featuresAr: string[];
  isPopular?: boolean;
  badge?: string;
  tagColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/subscription`;

  readonly isCheckingOut = signal<boolean>(false);
  readonly checkoutError = signal<string | null>(null);

  /**
   * Initiates Paymob checkout flow by requesting payment intent / checkout URL.
   */
  initiateCheckout(planId: string, extraProjects?: number): Observable<ApiResponse<PaymobCheckoutResponse>> {
    this.isCheckingOut.set(true);
    this.checkoutError.set(null);

    const payload: PaymobCheckoutRequest = {
      targetPlanId: planId,
      extraProjectsCount: extraProjects
    };

    return this.http.post<ApiResponse<PaymobCheckoutResponse>>(`${this.apiUrl}/checkout`, payload).pipe(
      tap({
        next: (res) => {
          this.isCheckingOut.set(false);
          if (!res.success) {
            this.checkoutError.set(res.message || 'فشل في تهيئة جلسة الدفع');
          }
        },
        error: (err) => {
          this.isCheckingOut.set(false);
          const errorMsg = err?.error?.message || 'حدث خطأ أثناء الاتصال ببوابة الدفع باي موب';
          this.checkoutError.set(errorMsg);
        }
      })
    );
  }

  /**
   * Returns list of subscription plans and add-on project expansion packages.
   */
  getAvailablePlans(): SubscriptionPlanItem[] {
    return [
      {
        id: 'Free',
        nameAr: 'الباقة الأساسية المجانية',
        nameEn: 'Starter Free',
        totalProjectsQuota: 2,
        priceEgp: 0,
        periodAr: 'مدى الحياة',
        descriptionAr: 'الباقة المجانية الافتراضية مع سعة مشروعين لكافة الميزات الأساسية للمنصة.',
        featuresAr: [
          'إدارة مشروعين نشطين متزامنين',
          'إدارة الميزانيات والعهد النقدية',
          'رفع صور وتقارير المواقع الهندسية',
          'ربط الفريق وتحديد الأدوار والصلاحيات',
          'دعم فني عبر البريد الإلكتروني'
        ],
        isPopular: false
      },
      {
        id: 'TopUp1',
        nameAr: 'باقة التوسعة السريعة (+1)',
        nameEn: '+1 Extra Project',
        extraProjects: 1,
        priceEgp: 250,
        periodAr: 'توسعة فورية لمرة واحدة',
        descriptionAr: 'أضف مشروعاً إضافياً واحداً فوق سعتك الحالية فوراً واستمر في التوسع بلا قيود.',
        featuresAr: [
          'زيادة فورية (+1) مشروع فوق رصيدك الحالي',
          'بدون تاريخ انتهاء للسعة الإضافية',
          'تفعيل فوري وتلقائي بمجرد نجاح الدفع عبر Paymob',
          'إمكانية إضافة حزم متعددة بشكل تراكمي',
          'تحديث فوري لتقارير الاستهلاك واللوحة'
        ],
        isPopular: false,
        badge: 'الأكثر مرونة',
        tagColor: 'from-blue-600 to-cyan-500'
      },
      {
        id: 'TopUp5',
        nameAr: 'حزمة المشاريع الاحترافية (+5)',
        nameEn: '+5 Projects Power Pack',
        extraProjects: 5,
        priceEgp: 950,
        periodAr: 'أفضل قيمة وتوفير',
        descriptionAr: 'الحزمة الأكثر طلباً لشركات المقاولات والمكاتب الهندسية لتشغيل 5 مشاريع إضافية.',
        featuresAr: [
          'زيادة فورية (+5) مشاريع فوق رصيدك الحالي',
          'توفير 300 جنيه مقارنة بشراء المشاريع منفردة',
          'تفعيل فوري وتلقائي بمجرد نجاح الدفع عبر Paymob',
          'دعم الأرشفة السحابية غير المحدودة للصور',
          'أولوية الدعم الفني والاستشارات'
        ],
        isPopular: true,
        badge: 'الأفضل قيمة وتوفيراً 🔥',
        tagColor: 'from-indigo-600 to-violet-600'
      },
      {
        id: 'Enterprise',
        nameAr: 'باقة الشركات الكبرى (Enterprise)',
        nameEn: 'Enterprise Unlimited',
        extraProjects: 20,
        priceEgp: 3500,
        periodAr: 'حلول مخصصة للشركات',
        descriptionAr: 'للشركات والمجموعات الهندسية الكبرى ذات العمليات المتعددة والتوسعات الكبيرة.',
        featuresAr: [
          'إضافة (+20) مشروع إضافي فوري في الرصيد',
          'عدد مستخدمين ومهندسين غير محدود',
          'تقارير مالية وتدقيق متقدم ومخصص',
          'مدير حساب مخصص ودعم هاتفي 24/7',
          'ربط مباشر ونسخ احتياطي فوري'
        ],
        isPopular: false,
        badge: 'للشركات والمكاتب الكبرى',
        tagColor: 'from-amber-600 to-orange-500'
      }
    ];
  }
}
