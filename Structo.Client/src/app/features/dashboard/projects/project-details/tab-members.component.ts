import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDatePipe } from '../../../../core/pipes/api-date.pipe';
import { ProjectDetailsStore } from './project-details.store';

/** Team members tab. */
@Component({
  selector: 'app-pd-tab-members',
  standalone: true,
  imports: [CommonModule, ApiDatePipe],
  template: `
    <!-- ======================== TEAM MEMBERS TAB ======================== -->
    @if (vm.activeTab() === 'members') {
      <div class="space-y-6 animate-fade-in font-cairo">
        <!-- Team Header Card -->
        <div class="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/20 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-lg">
                👥
              </div>
              <div>
                <h3 class="text-base sm:text-lg font-black text-white leading-tight">فريق العمل المسند</h3>
                <p class="text-xs text-slate-400 mt-0.5">المهندسون والمحاسبون المصرح لهم بالاطلاع وإدارة العمليات الميدانية والمالية لهذا المشروع</p>
              </div>
            </div>
          </div>

          @if (vm.canManageMembers() && vm.project()?.status === 'Active') {
            <button
              type="button"
              id="btn-add-member"
              (click)="vm.openAddMemberModal()"
              class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm transition-all duration-150 shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer shrink-0">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>إسناد عضو جديد</span>
            </button>
          }
        </div>

        <!-- Team Members Grid -->
        @if (vm.isLoadingMembers()) {
          <div class="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
            <span class="inline-block w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin ml-2 align-middle"></span>
            جاري تحميل أعضاء الفريق...
          </div>
        } @else if (vm.projectMembers().length === 0) {
          <div class="p-10 text-center bg-slate-900/30 rounded-2xl border border-slate-800/80 space-y-2">
            <div class="text-3xl">👥</div>
            <p class="text-sm font-bold text-slate-300">لا يوجد أعضاء مسندون لهذا المشروع حالياً</p>
            <p class="text-xs text-slate-500">مالك المنشأة لديه صلاحية تلقائية. يمكنك تعيين مهندسين ومحاسبين للمشروع.</p>
            @if (vm.canManageMembers() && vm.project()?.status === 'Active') {
              <button
                type="button"
                (click)="vm.openAddMemberModal()"
                class="mt-3 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs font-bold transition-all cursor-pointer">
                + تعيين أول عضو في الفريق
              </button>
            }
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (member of vm.projectMembers(); track member.userId) {
              <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 space-y-3 shadow-lg hover:border-slate-700 transition-all">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200 uppercase shrink-0">
                      {{ member.fullName ? member.fullName.charAt(0) : 'U' }}
                    </div>
                    <div class="min-w-0">
                      <h4 class="text-sm font-bold text-white leading-tight truncate">{{ member.fullName || 'عضو فريق' }}</h4>
                      <span class="text-[11px] text-slate-400 font-mono truncate block" dir="ltr">{{ member.email }}</span>
                    </div>
                  </div>
                  <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-bold shrink-0" [ngClass]="vm.getRoleBadge(member.role).class">
                    {{ vm.getRoleBadge(member.role).label }}
                  </span>
                </div>

                <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div class="text-slate-400 text-[11px]">
                    @if (member.phoneNumber) {
                      <span class="font-mono text-slate-300" dir="ltr">📞 {{ member.phoneNumber }}</span>
                    } @else {
                      <span class="text-slate-500 font-mono text-[10px]">تاريخ الإسناد: {{ member.assignedAt | apiDate:'dd/MM/yyyy' }}</span>
                    }
                  </div>

                  @if (vm.canManageMembers() && vm.project()?.status === 'Active') {
                    <button
                      type="button"
                      (click)="vm.removeMember(member)"
                      [disabled]="vm.removingMemberUserId() === member.userId"
                      class="px-2.5 py-1 rounded-lg text-xs font-semibold border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1">
                      @if (vm.removingMemberUserId() === member.userId) {
                        <span class="inline-block w-3 h-3 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></span>
                      } @else {
                        <span>إزالة</span>
                      }
                    </button>
                  }
                </div>
              </div>
            }
          </div>
        }
      </div>
    }
  `
})
export class ProjectMembersTabComponent {
  readonly vm = inject(ProjectDetailsStore);
}
