import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProjectDetailsStore } from './project-details.store';

/** Shared dialogs: text inspection, add member, WhatsApp review link, close-out disposition, lightbox, save toast. */
@Component({
  selector: 'app-pd-common-modals',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
    @if (vm.profileSuccessMessage()) {
      <div class="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-600 border border-emerald-500 text-white rounded-xl shadow-2xl font-cairo text-sm max-w-sm">
        <div class="p-1 bg-emerald-700 rounded-lg text-white shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span>{{ vm.profileSuccessMessage() }}</span>
      </div>
    }

    <!-- Quick Inspection Modal for Truncated Text -->
    @if (vm.activeTextInspection()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in font-sans">
        <div (click)="vm.closeTextInspectionModal()" class="absolute inset-0"></div>
        <div class="relative w-full max-w-lg bg-[#0d1322] border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 font-cairo">
          <!-- 1. Fixed Modal Header -->
          <div class="flex items-center justify-between p-5 border-b border-slate-800 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold text-white">{{ vm.activeTextInspection()!.title }}</h3>
                @if (vm.activeTextInspection()!.subtitle) {
                  <p class="text-xs text-slate-400 mt-0.5">{{ vm.activeTextInspection()!.subtitle }}</p>
                }
              </div>
            </div>
            <button type="button" (click)="vm.closeTextInspectionModal()" class="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- 2. Scrollable Modal Form Body -->
          <div class="flex-1 overflow-y-auto p-5 space-y-4 min-h-0 custom-scrollbar">
            <div class="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 selection:bg-sky-500/30 selection:text-sky-200">
              {{ vm.activeTextInspection()!.content }}
            </div>
          </div>

          <!-- 3. ALWAYS VISIBLE Sticky Footer Actions -->
          <div class="p-4 border-t border-slate-800 bg-[#0d1322] flex items-center justify-end gap-3 flex-shrink-0 font-cairo">
            <button type="button" (click)="vm.closeTextInspectionModal()" class="px-5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer">
              إغلاق
            </button>
          </div>
        </div>
      </div>
    }

    <!-- ADD TEAM MEMBER MODAL (Strict Responsive 92vh Independent Scroll Design) -->
    @if (vm.isAddMemberModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm" dir="rtl">
        <div (click)="vm.closeAddMemberModal()" class="absolute inset-0"></div>

        <div class="relative z-10 bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden font-cairo flex flex-col max-h-[92vh]">

          <!-- Modal Header -->
          <div class="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                👥
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white leading-tight">إسناد أعضاء للمشروع</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">اختر الموظفين من فريق شركتك لإسنادهم لهذا المشروع</p>
              </div>
            </div>
            <button type="button" (click)="vm.closeAddMemberModal()" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              ✕
            </button>
          </div>

          <!-- Modal Body (Independent Scroll Box) -->
          <div class="flex-1 overflow-y-auto min-h-0 p-5 space-y-4">
            @if (vm.isLoadingCompanyUsers()) {
              <div class="p-8 text-center text-xs text-slate-500 bg-slate-900/60 rounded-xl border border-slate-800">
                <span class="inline-block w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin ml-2 align-middle"></span>
                جاري تحميل قائمة الموظفين...
              </div>
            } @else if (vm.unassignedCompanyUsers().length === 0) {
              <div class="p-6 text-center text-xs text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
                جميع موظفي الشركة مسندون بالفعل لهذا المشروع، أو لا يوجد موظفون متاحون للإسناد.
              </div>
            } @else {
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>الموظفون المتاحون للإسناد:</span>
                  <span class="font-mono text-indigo-400">({{ vm.selectedMemberUserIds().length }} محدد)</span>
                </div>

                <div class="space-y-1.5 max-h-64 overflow-y-auto p-2 bg-slate-900/70 border border-slate-800 rounded-xl">
                  @for (user of vm.unassignedCompanyUsers(); track user.id) {
                    <label 
                      class="flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer hover:bg-slate-800/80 select-none"
                      [ngClass]="vm.selectedMemberUserIds().includes(user.id) ? 'bg-indigo-950/40 border border-indigo-500/30' : 'border border-transparent'">
                      <input 
                        type="checkbox" 
                        [checked]="vm.selectedMemberUserIds().includes(user.id)" 
                        (change)="vm.toggleSelectMemberUser(user.id)"
                        class="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 cursor-pointer">
                      <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm font-bold text-white truncate">
                          {{ user.firstName }} {{ user.lastName }}
                        </div>
                        <div class="text-[11px] text-slate-400 font-mono truncate">{{ user.email }}</div>
                      </div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold shrink-0" [ngClass]="vm.getRoleBadge(user.role).class">
                        {{ vm.getRoleBadge(user.role).label }}
                      </span>
                    </label>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-end gap-2.5 shrink-0">
            <button 
              type="button" 
              (click)="vm.closeAddMemberModal()" 
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-850 transition-colors cursor-pointer">
              إلغاء
            </button>
            <button 
              type="button" 
              (click)="vm.onAddMembersSubmit()" 
              [disabled]="vm.selectedMemberUserIds().length === 0 || vm.isSavingMembers()" 
              class="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
              @if (vm.isSavingMembers()) {
                <span class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              }
              <span>{{ vm.isSavingMembers() ? 'جاري الإسناد...' : 'تأكيد الإسناد' }}</span>
            </button>
          </div>
        </div>
      </div>
    }

    <!-- WHATSAPP REVIEW LINK MODAL (Strict Responsive 92vh Independent Scroll Design) -->
    @if (vm.isWhatsAppModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm" dir="rtl">
        <div (click)="vm.closeWhatsAppModal()" class="absolute inset-0"></div>

        <div class="relative z-10 bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden font-cairo flex flex-col max-h-[92vh]">
          <!-- Modal Header -->
          <div class="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                💬
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white leading-tight">إرسال رابط التقييم عبر واتساب</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">{{ vm.project()?.name }}</p>
              </div>
            </div>
            <button type="button" (click)="vm.closeWhatsAppModal()" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              ✕
            </button>
          </div>

          <!-- Modal Body (Independent Scroll Box) -->
          <div class="flex-1 overflow-y-auto min-h-0 p-5 space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">اسم العميل:</label>
              <div class="text-xs font-bold text-indigo-400 bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-xl">
                {{ vm.project()?.clientName || 'عميل غير محدد' }}
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1.5">كود الدولة ورقم الهاتف المحمول (واتساب):</label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select 
                  [value]="vm.whatsAppCountryCode()" 
                  (change)="vm.whatsAppCountryCode.set($any($event.target).value)" 
                  class="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500">
                  @for (c of vm.countryCodes; track c.code) {
                    <option [value]="c.code">{{ c.flag }} {{ c.label }}</option>
                  }
                </select>

                <input 
                  type="tel" 
                  [value]="vm.whatsAppPhone()" 
                  (input)="vm.whatsAppPhone.set($any($event.target).value)" 
                  placeholder="010XXXXXXXX" 
                  class="sm:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
              </div>
              <p class="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                <span>الرقم المنسق النهائي:</span>
                <span class="font-mono text-emerald-400 font-bold" dir="ltr">+{{ vm.getSanitizedWhatsAppNumber() || '---' }}</span>
              </p>
            </div>

            <div class="bg-slate-900/40 border border-slate-800 rounded-xl p-3">
              <label class="block text-[11px] font-semibold text-slate-400 mb-1">نص الرسالة التي سيتم إرسالها:</label>
              <div class="text-[11px] text-slate-300 whitespace-pre-line leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                {{ vm.getWhatsAppMessageText() }}
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-end gap-2.5 shrink-0">
            <button 
              type="button" 
              (click)="vm.closeWhatsAppModal()" 
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-850 transition-colors cursor-pointer">
              إلغاء
            </button>
            <button 
              type="button" 
              (click)="vm.sendWhatsAppNow()" 
              class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.004 2c-5.518 0-10 4.482-10 10 0 1.758.46 3.41 1.266 4.858L2.03 21.684a1.002 1.002 0 0 0 1.286 1.286l4.826-1.24A9.957 9.957 0 0 0 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm0 18c-1.56 0-3.03-.393-4.323-1.085a1 1 0 0 0-.743-.075l-3.328.855.855-3.328a1 1 0 0 0-.075-.743A7.95 7.95 0 0 1 4.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
              <span>إرسال الآن عبر واتساب</span>
            </button>
          </div>
        </div>
      </div>
    }

    <!-- CLOSEOUT DISPOSITION MODAL (Strict Responsive 92vh Independent Scroll Design) -->
    @if (vm.isCloseoutModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm" dir="rtl">
        <div (click)="vm.closeCloseoutModal()" class="absolute inset-0"></div>

        <div class="relative z-10 bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden font-cairo flex flex-col max-h-[92vh]">
          <!-- Modal Header -->
          <div class="px-5 py-3.5 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                ⚖️
              </div>
              <div>
                <h3 class="text-sm sm:text-base font-bold text-white leading-tight">تصفية رصيد صندوق سيولة المشروع</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">يوجد رصيد متبقي غير منفق في صندوق سيولة المشروع</p>
              </div>
            </div>
            <button type="button" (click)="vm.closeCloseoutModal()" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
              ✕
            </button>
          </div>

          <!-- Modal Body (Independent Scroll Box) -->
          <div class="flex-1 overflow-y-auto min-h-0 p-5 space-y-4">
            <div class="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span class="text-xs text-amber-300 font-semibold block">إجمالي الرصيد المتبقي في الصناديق:</span>
                <span class="text-[11px] text-slate-400">سيتم تصفية هذا الرصيد ليصبح رصيد الصندوق 0.00 ج.م</span>
              </div>
              <div class="text-lg sm:text-xl font-bold font-mono text-amber-400">
                {{ (vm.reconciliationReport()?.remainingPoolBalance || 0) | number:'1.2-2' }} <span class="text-xs">ج.م</span>
              </div>
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-bold text-slate-300">اختر وجهة تسوية وتصفية الرصيد المتبقي:</label>

              <!-- Option A: RefundToClient -->
              <label 
                class="flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none"
                [ngClass]="vm.selectedDisposition() === 'RefundToClient' ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900'">
                <input 
                  type="radio" 
                  name="closeoutDisposition" 
                  value="RefundToClient" 
                  [checked]="vm.selectedDisposition() === 'RefundToClient'"
                  (change)="vm.selectedDisposition.set('RefundToClient')"
                  class="mt-1 w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 cursor-pointer">
                <div>
                  <div class="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>💵 خيار (أ): رد باقي الدفعة للعميل (Refund to Client)</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    يتم إنشاء قيد مالي مصروفي متوازن (<span class="text-indigo-300">مصروف - رد باقي الدفعة للعميل</span>) بمبلغ الرصيد المتبقي وتصفية صندوق السيولة إلى الصفر.
                  </p>
                </div>
              </label>

              <!-- Option B: TransferToCompanyProfits -->
              <label 
                class="flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none"
                [ngClass]="vm.selectedDisposition() === 'TransferToCompanyProfits' ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg' : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900'">
                <input 
                  type="radio" 
                  name="closeoutDisposition" 
                  value="TransferToCompanyProfits" 
                  [checked]="vm.selectedDisposition() === 'TransferToCompanyProfits'"
                  (change)="vm.selectedDisposition.set('TransferToCompanyProfits')"
                  class="mt-1 w-4 h-4 text-emerald-600 bg-slate-900 border-slate-700 focus:ring-emerald-500 cursor-pointer">
                <div>
                  <div class="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>🏢 خيار (ب): تحويل المتبقي كأرباح مرحلة للشركة (Transfer to Company Profits)</span>
                  </div>
                  <p class="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    يتم ترحيل الفائض من سيولة المشروع إلى خزينة الشركة الرئيسية كهامش ربح محقق وتصفية صندوق المشروع إلى الصفر.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-end gap-2.5 shrink-0">
            <button 
              type="button" 
              (click)="vm.closeCloseoutModal()" 
              class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-850 transition-colors cursor-pointer">
              إلغاء
            </button>
            <button 
              type="button" 
              (click)="vm.confirmDispositionAndCloseout()" 
              [disabled]="vm.isCloseoutLoading()"
              class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 active:scale-95 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-1.5 cursor-pointer">
              @if (vm.isCloseoutLoading()) {
                <span class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              }
              <span>تأكيد الإغلاق والتصفية</span>
            </button>
          </div>
        </div>
      </div>
    }

    <!-- 🖼️ FULLSCREEN LIGHTBOX VIEWER -->
    @if (vm.isLightboxOpen() && vm.lightboxPhotos().length > 0) {

      <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
        <div (click)="vm.closeLightbox()" class="absolute inset-0 z-0"></div>

        <button 
          (click)="vm.closeLightbox()" 
          class="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-slate-800 transition-all cursor-pointer shadow-2xl">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/20 text-white text-xs font-mono font-bold shadow-xl flex items-center gap-2 font-cairo">
          <span>📷</span>
          <span>{{ vm.activeLightboxIndex() + 1 }} / {{ vm.lightboxPhotos().length }}</span>
        </div>

        <div class="relative z-10 max-w-5xl max-h-[85vh] flex items-center justify-center p-2">
          <img 
            [src]="vm.lightboxPhotos()[vm.activeLightboxIndex()]" 
            (error)="vm.onImgError($event)" 
            alt="Site Photo Full View" 
            class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-slate-800 transition-all duration-200">
        </div>

        @if (vm.lightboxPhotos().length > 1) {
          <button 
            (click)="vm.prevLightboxPhoto()" 
            class="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
            <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            (click)="vm.nextLightboxPhoto()" 
            class="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-indigo-600 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95">
            <svg class="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        }
      </div>
    }
  `
})
export class ProjectCommonModalsComponent {
  readonly vm = inject(ProjectDetailsStore);
}
