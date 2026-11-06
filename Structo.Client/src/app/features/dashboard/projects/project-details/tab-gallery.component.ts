import { Component, inject } from '@angular/core';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectDetailsStore } from './project-details.store';

/** Site photo gallery tab. */
@Component({
  selector: 'app-pd-tab-gallery',
  standalone: true,
  imports: [ApiDatePipe, TranslatePipe],
  template: `
    @if (vm.activeTab() === 'gallery') {
      <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">

        <div class="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-white font-cairo">{{ 'MARKETPLACE.PROJECT_GALLERY' | translate }}</h3>
            <p class="text-xs text-slate-400 mt-1 font-cairo">Upload and manage site photos for public portfolio listings.</p>
          </div>

          <button
            type="button"
            (click)="galleryFileInput.click()"
            [disabled]="vm.isUploadingGallery()"
            class="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold font-cairo text-xs sm:text-sm transition-colors duration-150 shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2 cursor-pointer shrink-0">
            @if (vm.isUploadingGallery()) {
              <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ 'DETAILS.UPLOADING' | translate }}</span>
            } @else {
              <span class="text-base leading-none">+</span>
              <span>{{ 'DETAILS.UPLOAD_IMAGE' | translate }}</span>
            }
          </button>
          <input
              #galleryFileInput
              type="file"
              class="hidden"
              (change)="vm.onGalleryFileSelected($event)"
              accept="image/*">
        </div>

        @if (vm.isLoadingGallery()) {
          <div class="flex justify-center py-16">
            <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            @for (photo of vm.galleryPhotos(); track photo.id; let idx = $index) {
              <!-- Fixed-aspect ratio container with strict overflow clipping and GPU-accelerated transforms -->
              <div
                (click)="vm.openLightbox(vm.galleryPhotos(), idx, $event)"
                class="group relative aspect-video w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800 transition-all duration-200 hover:border-indigo-500/50 shadow-md cursor-pointer">
                <img
                  [src]="photo.photoUrl"
                  (error)="vm.onImgError($event)"
                  [alt]="photo.caption || 'Project Image'"
                  class="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 transform-gpu"
                  loading="lazy"
                />

                <!-- Image Error Fallback -->
                <div class="hidden flex-col items-center justify-center p-3 text-slate-600 font-cairo text-xs gap-1.5 w-full h-full bg-slate-950/80">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-[11px] text-slate-500 font-cairo">صورة غير متاحة</span>
                </div>

                <!-- Delete Button (Tenant Owner) -->
                @if (vm.isTenantOwner()) {
                  <button
                    type="button"
                    (click)="$event.stopPropagation(); vm.onDeletePhoto(photo.id)"
                    class="absolute top-2 right-2 rtl:left-2 rtl:right-auto p-1.5 rounded-lg bg-rose-500/90 hover:bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer shadow-lg z-20 pointer-events-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                }

                <!-- Hover Overlay (Absolute - does NOT alter DOM layout) -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-end pointer-events-none">
                  @if (photo.caption) {
                    <p class="text-xs text-white font-medium truncate font-cairo mb-0.5">{{ photo.caption }}</p>
                  }
                  <div class="flex items-center justify-between text-[10px] text-slate-400">
                    <span class="font-mono">{{ photo.uploadedAt | apiDate:'dd/MM/yyyy HH:mm' }}</span>
                    <span class="truncate">By: {{ photo.uploadedBy || 'Owner' }}</span>
                  </div>
                </div>
              </div>
            } @empty {
              <div class="col-span-2 sm:col-span-3 lg:col-span-4 py-16 text-center text-slate-500 text-sm font-cairo">
                {{ 'MARKETPLACE.NO_PHOTOS' | translate }}
              </div>
            }
          </div>
        }
      </div>

      <!-- ═══════════════════════════════════════════════════════════════
           Caption Upload Dialog — shows before upload to enter caption
           ═══════════════════════════════════════════════════════════════ -->
      @if (vm.showCaptionDialog()) {
        <div class="fixed inset-0 z-[9000] flex items-center justify-center p-4" style="max-height:92vh">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" (click)="vm.cancelGalleryUpload()"></div>
          <!-- Dialog -->
          <div class="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style="max-height:88vh">
            <!-- Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
              <h4 class="text-sm font-bold text-white font-cairo flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                إضافة وصف للصورة
              </h4>
              <button type="button" (click)="vm.cancelGalleryUpload()" class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <!-- Body -->
            <div class="flex flex-col gap-4 px-5 py-5 overflow-y-auto min-h-0">
              @if (vm.pendingGalleryFile()) {
                <div class="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-700/50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span class="text-xs text-slate-300 font-mono truncate">{{ vm.pendingGalleryFile()!.name }}</span>
                </div>
              }
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-slate-300 font-cairo" for="galleryCaptionInput">
                  وصف الصورة <span class="text-slate-500 font-normal">(اختياري)</span>
                </label>
                <textarea
                  id="galleryCaptionInput"
                  [value]="vm.pendingCaption()"
                  (input)="vm.pendingCaption.set($any($event.target).value)"
                  rows="3"
                  maxlength="200"
                  placeholder="مثال: صورة الموقع من الجهة الشمالية..."
                  class="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 font-cairo focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"></textarea>
                <p class="text-[10px] text-slate-500 text-end font-mono">{{ vm.pendingCaption().length }} / 200</p>
              </div>
            </div>
            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 px-5 py-4 border-t border-slate-800 shrink-0">
              <button
                type="button"
                (click)="vm.cancelGalleryUpload()"
                class="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-150 cursor-pointer font-cairo">
                إلغاء
              </button>
              <button
                type="button"
                (click)="vm.confirmGalleryUpload()"
                class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                رفع الصورة
              </button>
            </div>
          </div>
        </div>
      }

    }
  `
})
export class ProjectGalleryTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
