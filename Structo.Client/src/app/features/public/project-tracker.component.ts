import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SiteExecutionService } from '../../core/services/site-execution.service';
import { PublicProjectTrackerDto, PublicSitePhotoDto } from '../../core/models/site-execution.models';

@Component({
  selector: 'app-project-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-cairo antialiased selection:bg-indigo-500 selection:text-white">
      
      <!-- Top Decorative Ambient Glow -->
      <div class="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-600/10 via-slate-900/0 to-transparent pointer-events-none"></div>

      <!-- Top Header Bar -->
      <header class="relative z-10 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-sm shadow-md">
            S
          </div>
          <div>
            <span class="font-bold text-sm text-white tracking-wide">STRUCTO</span>
            <span class="text-[10px] text-indigo-400 mr-2 font-medium">بوابة متابعة العميل المباشرة</span>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs text-slate-400">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="hidden sm:inline">متابعة مباشرة ومحدثة</span>
        </div>
      </header>

      <!-- Main Content Container -->
      <main class="relative z-10 max-w-5xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 flex-1">
        
        <!-- Loading State -->
        @if (isLoading()) {
          <div class="space-y-6 animate-pulse">
            <div class="h-44 bg-slate-900/80 border border-slate-800 rounded-3xl"></div>
            <div class="h-64 bg-slate-900/80 border border-slate-800 rounded-3xl"></div>
          </div>
        } @else if (hasError() || !tracker()) {
          <!-- Error / Invalid Token State -->
          <div class="text-center py-16 bg-slate-900/70 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto shadow-2xl space-y-4">
            <div class="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 class="text-lg font-extrabold text-white">رابط المتابعة غير صالح أو منتهي</h2>
            <p class="text-xs text-slate-400">
              يرجى التواصل مع إدارة المشروع للحصول على رابط المتابعة الميداني المعتمد.
            </p>
          </div>
        } @else {
          <!-- Project Hero Card -->
          <div class="bg-gradient-to-b from-slate-900/90 to-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              
              <!-- Left: Project Info -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {{ tracker()!.category || 'مشروع هندسي' }}
                  </span>
                  @if (tracker()!.governorate) {
                    <span class="text-xs text-slate-400 flex items-center gap-1">
                      📍 {{ tracker()!.governorate }} @if (tracker()!.cityOrZone) { - {{ tracker()!.cityOrZone }} }
                    </span>
                  }
                </div>

                <h1 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {{ tracker()!.projectName }}
                </h1>

                @if (tracker()!.clientName) {
                  <p class="text-xs text-slate-400">
                    العميل الكريم: <span class="text-slate-200 font-bold">{{ tracker()!.clientName }}</span>
                  </p>
                }
              </div>

              <!-- Right: Overall Weighted Progress Dial/Badge -->
              <div class="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg">
                <div class="text-center">
                  <span class="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">نسبة الإنجاز الكلية</span>
                  <span class="text-3xl sm:text-4xl font-black font-mono text-emerald-400">
                    {{ tracker()!.weightedOverallProgress }}%
                  </span>
                </div>

                <div class="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-800 relative flex items-center justify-center shrink-0">
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
              </div>
            </div>

            <!-- Global Progress Bar -->
            <div class="mt-6 pt-5 border-t border-slate-800/80">
              <div class="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-bold">
                <span>التقدم العام في الموقع</span>
                <span class="font-mono text-emerald-400">{{ tracker()!.weightedOverallProgress }}%</span>
              </div>
              <div class="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
                <div
                  class="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400"
                  [style.width.%]="tracker()!.weightedOverallProgress">
                </div>
              </div>
            </div>
          </div>

          <!-- Section 1: Execution Milestones Timeline -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg sm:text-xl font-bold text-white">مراحل وبنود التنفيذ الميداني</h2>
                <p class="text-xs text-slate-400 mt-0.5">متابعة دقيقة لحالة ونسب إنجاز كافة بنود الموقع</p>
              </div>
              <span class="text-xs font-mono font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-xl">
                {{ tracker()!.tasks.length }} بنود
              </span>
            </div>

            <div class="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-6 divide-y divide-slate-800/80">
              @for (task of tracker()!.tasks; track task.id; let idx = $index) {
                <div class="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  
                  <!-- Left: Title, Description & Dates -->
                  <div class="space-y-1 max-w-xl">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold font-mono flex items-center justify-center shrink-0">
                        {{ idx + 1 }}
                      </span>
                      <h3 class="text-sm sm:text-base font-bold text-slate-100">
                        {{ task.title }}
                      </h3>
                      <span [class]="getMilestoneBadgeClass(task.status, task.progressPercentage)">
                        {{ getMilestoneLabel(task.status, task.progressPercentage) }}
                      </span>
                    </div>

                    @if (task.description) {
                      <p class="text-xs text-slate-400 pr-8">
                        {{ task.description }}
                      </p>
                    }

                    @if (task.plannedStartDate || task.plannedEndDate) {
                      <div class="text-[11px] text-slate-500 font-mono pr-8">
                        <span>الفترة: {{ formatSafeDate(task.plannedStartDate) }}</span>
                        @if (task.plannedEndDate) {
                          <span> إلى {{ formatSafeDate(task.plannedEndDate) }}</span>
                        }
                      </div>
                    }
                  </div>

                  <!-- Right: Progress Indicator -->
                  <div class="sm:w-48 shrink-0 space-y-1.5 pr-8 sm:pr-0">
                    <div class="flex items-center justify-between text-xs font-mono font-bold">
                      <span class="text-slate-400">الإنجاز:</span>
                      <span [class.text-emerald-400]="task.progressPercentage === 100" [class.text-indigo-400]="task.progressPercentage < 100">
                        {{ task.progressPercentage }}%
                      </span>
                    </div>
                    <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        class="h-full rounded-full transition-all duration-500"
                        [class.bg-emerald-500]="task.progressPercentage === 100"
                        [class.bg-indigo-500]="task.progressPercentage < 100"
                        [style.width.%]="task.progressPercentage">
                      </div>
                    </div>
                  </div>

                </div>
              }
            </div>
          </div>

          <!-- Section 2: Live Verified Site Photos Gallery -->
          @if (tracker()!.sitePhotos && tracker()!.sitePhotos.length > 0) {
            <div class="space-y-4">
              <div>
                <h2 class="text-lg sm:text-xl font-bold text-white">معرض صور وتوثيق الموقع المعتمدة</h2>
                <p class="text-xs text-slate-400 mt-0.5">لقطات حية من أرض الواقع توثق مراحل التشييد والتسليم</p>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                @for (photo of tracker()!.sitePhotos; track photo.id) {
                  <div
                    (click)="openPhotoPreview(photo)"
                    class="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-square cursor-pointer shadow-lg hover:border-indigo-500/60 transition-all">
                    <img
                      [src]="photo.photoUrl"
                      [alt]="photo.caption || 'صورة الموقع'"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      @if (photo.caption) {
                        <p class="text-[11px] text-white font-bold line-clamp-1">{{ photo.caption }}</p>
                      }
                      <span class="text-[9px] text-slate-400 font-mono">{{ formatSafeDate(photo.uploadedAt) }}</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        }
      </main>

      <!-- Lightbox Photo Preview Modal -->
      @if (previewPhoto()) {
        <div
          (click)="closePhotoPreview()"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in cursor-pointer">
          <div class="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center" (click)="$event.stopPropagation()">
            <img
              [src]="previewPhoto()!.photoUrl"
              [alt]="previewPhoto()!.caption || 'معاينة الصورة'"
              class="max-h-[75vh] w-auto max-w-full rounded-2xl border border-slate-800 object-contain shadow-2xl" />
            @if (previewPhoto()!.caption) {
              <p class="text-xs text-slate-200 mt-3 text-center font-bold">{{ previewPhoto()!.caption }}</p>
            }
            <button
              type="button"
              (click)="closePhotoPreview()"
              class="absolute -top-10 left-0 p-2 text-slate-400 hover:text-white text-sm font-bold">
              ✕ إغلاق
            </button>
          </div>
        </div>
      }

      <!-- Footer -->
      <footer class="relative z-10 border-t border-slate-800/80 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500 font-mono">
        STRUCTO Platform • نظام إدارة وتتبع تنفيذ المشاريع الميدانية
      </footer>

    </div>
  `
})
export class ProjectTrackerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly siteService = inject(SiteExecutionService);

  readonly tracker = signal<PublicProjectTrackerDto | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);
  readonly previewPhoto = signal<PublicSitePhotoDto | null>(null);

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('shareToken');
    if (!token) {
      this.hasError.set(true);
      this.isLoading.set(false);
      return;
    }

    this.siteService.getPublicProjectTracker(token).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.tracker.set(res.data);
        } else {
          this.hasError.set(true);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  openPhotoPreview(photo: PublicSitePhotoDto): void {
    this.previewPhoto.set(photo);
  }

  closePhotoPreview(): void {
    this.previewPhoto.set(null);
  }

  formatSafeDate(dateStr?: string | null): string {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return String(dateStr).split('T')[0];
      return d.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return String(dateStr);
    }
  }

  getMilestoneBadgeClass(status: string, pct: number): string {
    if (pct === 100 || status === 'Completed') {
      return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    }
    if (pct > 0 || status === 'InProgress') {
      return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    }
    if (status === 'UnderReview') {
      return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20';
    }
    return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700';
  }

  getMilestoneLabel(status: string, pct: number): string {
    if (pct === 100 || status === 'Completed') return 'مكتمل';
    if (status === 'UnderReview') return 'قيد المراجعة';
    if (pct > 0 || status === 'InProgress') return 'قيد التنفيذ';
    return 'قيد الانتظار';
  }
}
