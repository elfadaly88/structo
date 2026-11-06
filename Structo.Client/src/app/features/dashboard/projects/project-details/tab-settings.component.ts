import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsStore } from './project-details.store';

/** Project and company settings tab. */
@Component({
  selector: 'app-pd-tab-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <!-- Tab Content: Company Admin Settings -->
    @if (vm.activeTab() === 'admin-settings') {
      <div class="space-y-6">
        <!-- Company profile details edit form -->
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 class="text-lg font-bold text-white font-cairo">تعديل بيانات الشركة الأساسية</h3>


          <form [formGroup]="vm.profileForm" (ngSubmit)="vm.onProfileSubmit()" class="space-y-5 overflow-y-auto min-h-0 pr-1 flex-1">
            <!-- Banner upload -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">بانر الشركة</label>
              <div class="w-full h-36 sm:h-44 bg-slate-800 rounded-xl relative overflow-hidden group border border-slate-700">
                @if (vm.profileForm.get('bannerUrl')?.value) {
                  <img [src]="vm.profileForm.get('bannerUrl')?.value" alt="Banner" class="w-full h-full object-cover">
                } @else {
                  <div class="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 flex items-center justify-center">
                    <span class="text-xs text-slate-500">لا يوجد بانر</span>
                  </div>
                }
                <button
                  type="button"
                  (click)="bannerFileInput.click()"
                  class="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <span class="flex items-center gap-2 text-white text-xs font-bold font-cairo bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-sm">
                    @if (vm.isUploadingBanner()) {
                      جاري الرفع...
                    } @else {
                      تغيير البانر / Change Banner
                    }
                  </span>
                </button>
                <input #bannerFileInput type="file" (change)="vm.onBannerFileSelected($event)" accept="image/*" class="hidden">
              </div>
            </div>

            <!-- Logo upload & profile name -->
            <div class="flex items-end gap-4">
              <div class="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden relative group shadow-xl shrink-0">
                @if (vm.profileForm.get('logoUrl')?.value) {
                  <img [src]="vm.profileForm.get('logoUrl')?.value" alt="Logo" class="w-full h-full object-cover">
                } @else {
                  <span class="text-3xl font-extrabold text-slate-600 select-none">Logo</span>
                }
                <button
                  type="button"
                  (click)="logoFileInput.click()"
                  class="absolute inset-0 rounded-full bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <span class="text-white text-[10px] font-bold text-center">
                    @if (vm.isUploadingLogo()) {
                      جاري...
                    } @else {
                      تغيير / Change
                    }
                  </span>
                </button>
                <input #logoFileInput type="file" (change)="vm.onLogoFileSelected($event)" accept="image/*" class="hidden">
              </div>

              <div class="flex-1 space-y-4">
                <div>
                  <label for="prof-name" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">اسم الشركة / Company Name *</label>
                  <input
                    id="prof-name"
                    type="text"
                    formControlName="name"
                    class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                    placeholder="Company Name">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="prof-region" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">المنطقة</label>
                <input
                  id="prof-region"
                  type="text"
                  formControlName="region"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                  placeholder="e.g. Cairo, Riyadh">
              </div>
              <div>
                <label for="prof-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">وصف الشركة</label>
                <textarea
                  id="prof-desc"
                  formControlName="companyDescription"
                  rows="3"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                  placeholder="Write a brief overview..."></textarea>
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="submit"
                [disabled]="vm.profileForm.invalid || vm.isSavingProfile()"
                class="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                حفظ البيانات
              </button>
            </div>
          </form>
        </div>

        <!-- Project visibility switch -->
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 class="text-lg font-bold text-white font-cairo">إعدادات خصوصية وعرض المشروع</h3>
          <p class="text-xs text-slate-400 font-cairo">حدد ما إذا كان هذا المشروع سيظهر للعامة في معرض المشروعات والبروفايل العام لشركتك أم سيظل خاصاً.</p>

          <form [formGroup]="vm.projectSettingsForm" (ngSubmit)="vm.onProjectSettingsSubmit()" class="space-y-4 overflow-y-auto min-h-0 pr-1 flex-1">
            <div class="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div class="space-y-0.5">
                <label class="text-sm font-bold text-slate-200 font-cairo">عرض المشروع في المعرض العام</label>
                <p class="text-xs text-slate-500 font-cairo">عند التفعيل، سيتم إتاحة صور وبيانات المشروع للزوار والشركات الخارجية.</p>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="is-public-portfolio"
                  formControlName="isPublicPortfolio"
                  class="w-5 h-5 text-indigo-600 border-slate-700 bg-slate-950 rounded focus:ring-indigo-500 focus:ring-2 focus:ring-offset-slate-900 cursor-pointer">
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button
                type="submit"
                [disabled]="vm.isSavingProjectSettings()"
                class="px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                تحديث الخصوصية
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class ProjectSettingsTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
