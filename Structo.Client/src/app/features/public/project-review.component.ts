import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectCloseoutService } from '../../core/services/project-closeout.service';

@Component({
  selector: 'app-project-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      
      <!-- Top Decorator -->
      <div class="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>

      <!-- Main Container -->
      <div class="relative max-w-lg w-full mx-auto my-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <!-- Brand / Header -->
        <div class="text-center space-y-2">
          <div class="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.242.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.175 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.883c-.773-.569-.374-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
            </svg>
          </div>
          <h2 class="text-2xl font-extrabold tracking-tight text-white font-cairo">
            تقييم المشروع / Project Evaluation
          </h2>
          <p class="text-sm text-slate-400 font-cairo max-w-sm mx-auto">
            ملاحظاتكم تساعدنا على تطوير جودة الخدمة والمشاريع المستدامة.
          </p>
        </div>

        @if (isSuccess()) {
          <!-- Success State -->
          <div class="text-center py-8 space-y-4 animate-[scaleIn_0.2s_ease-out]">
            <div class="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-bold text-white font-cairo">تم تسجيل تقييمك بنجاح!</h3>
              <p class="text-xs text-slate-400 font-cairo">نشكرك جزيل الشكر على وقتك وملاحظاتك القيمة.</p>
            </div>
            <div class="pt-4">
              <a routerLink="/" class="inline-flex items-center justify-center px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all font-cairo">
                الرجوع للرئيسية / Home
              </a>
            </div>
          </div>
        } @else {
          <!-- Form State -->
          <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="space-y-5">
            
            <!-- Rating Star Selector -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 font-cairo">
                التقييم العام / Star Rating <span class="text-red-400">*</span>
              </label>
              
              <div class="flex items-center gap-3 justify-center py-3 bg-slate-950/40 rounded-2xl border border-slate-800">
                @for (star of [1, 2, 3, 4, 5]; track star) {
                  <button
                    type="button"
                    (click)="setRating(star)"
                    (mouseenter)="hoverRating.set(star)"
                    (mouseleave)="hoverRating.set(0)"
                    class="p-1 hover:scale-125 transition-transform duration-100 text-3xl focus:outline-none cursor-pointer">
                    <span [class.text-amber-400]="star <= (hoverRating() || currentRating())" [class.text-slate-700]="star > (hoverRating() || currentRating())">
                      ★
                    </span>
                  </button>
                }
              </div>
              @if (reviewForm.get('rating')?.touched && reviewForm.get('rating')?.invalid) {
                <p class="text-[11px] text-rose-400 font-cairo text-center">يرجى اختيار التقييم بالنجوم / Rating is required</p>
              }
            </div>

            <!-- Notes TextArea -->
            <div class="space-y-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 font-cairo">
                تعليقاتك وملاحظاتك / Review Notes <span class="text-red-400">*</span>
              </label>
              <textarea
                formControlName="notes"
                rows="4"
                placeholder="أضف تعليقاتك حول أداء العمل، الجودة، والتواصل..."
                class="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-cairo resize-none"></textarea>
              @if (reviewForm.get('notes')?.touched && reviewForm.get('notes')?.invalid) {
                <p class="text-[11px] text-rose-400 font-cairo">التعليق مطلوب ولا يقل عن 10 أحرف / Notes must be at least 10 characters</p>
              }
            </div>

            <!-- Error Banner -->
            @if (errorMessage()) {
              <div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold text-center font-cairo">
                {{ errorMessage() }}
              </div>
            }

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="reviewForm.invalid || isSubmitting()"
              class="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-bold rounded-2xl text-white shadow-xl hover:shadow-indigo-500/10 transition-all duration-150 cursor-pointer font-cairo">
              @if (isSubmitting()) {
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 5.373 12 12h4z"></path>
                </svg>
                <span>جاري الإرسال...</span>
              } @else {
                <span>إرسال التقييم / Submit Review</span>
              }
            </button>

          </form>
        }

      </div>

      <!-- Footer -->
      <div class="text-center text-xs text-slate-600 font-cairo">
        &copy; {{ currentYear }} Structo Accounting System. All rights reserved.
      </div>

    </div>
  `
})
export class ProjectReviewComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly closeoutService = inject(ProjectCloseoutService);

  readonly currentRating = signal<number>(0);
  readonly hoverRating = signal<number>(0);
  readonly isSubmitting = signal<boolean>(false);
  readonly isSuccess = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly currentYear = new Date().getFullYear();
  token = '';

  readonly reviewForm: FormGroup = this.fb.group({
    rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    notes: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    if (!this.token) {
      this.errorMessage.set('رابط التقييم غير صالح / Invalid review link.');
    }
  }

  setRating(val: number): void {
    this.currentRating.set(val);
    this.reviewForm.patchValue({ rating: val });
    this.reviewForm.get('rating')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.reviewForm.invalid || !this.token) {
      this.reviewForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formVal = this.reviewForm.value;
    const dto = {
      rating: formVal.rating,
      notes: formVal.notes
    };

    this.closeoutService.submitClientReview(this.token, dto).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.isSuccess.set(true);
        } else {
          this.errorMessage.set(res.message || 'فشل إرسال التقييم. قد يكون الرابط منتهي الصلاحية.');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.message || err.message || 'حدث خطأ غير متوقع أثناء الاتصال بالخادم.');
      }
    });
  }
}
