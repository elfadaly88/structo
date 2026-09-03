import { Component, OnInit, inject, signal, computed, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SiteExecutionService } from '../../../../core/services/site-execution.service';
import { ImageUploadService } from '../../../../core/services/image-upload.service';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import {
  AssignedEngineerDto,
  AvailableSettlementLineDto,
  LinkSettlementItemEntryDto,
  PunchItemSeverity,
  PunchItemStatus,
  SiteDailyLogDto,
  SiteDailyLogUpsertDto,
  SitePunchItemCreateDto,
  SitePunchItemDto,
  SiteTaskCreateDto,
  SiteTaskDto,
  SiteTaskStatus
} from '../../../../core/models/site-execution.models';

@Component({
  selector: 'app-site-execution',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, DecimalPipe, NgClass],
  template: `
    <div class="space-y-6 w-full px-3 sm:px-6 lg:px-8 font-cairo">
      
      <!-- Top Navigation & KPI Summary Header -->
      <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          <!-- Title & Back Link -->
          <div class="flex items-start sm:items-center gap-3">
            <a
              [routerLink]="['/dashboard/projects', projectId()]"
              class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all shrink-0 cursor-pointer shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </a>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h1 class="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {{ projectName() || 'بنود ومتابعة تنفيذ الموقع' }}
                </h1>
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Site Operations
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1">
                تتبع بنود الموقع التنفيذية، اليوميات الميدانية، ومحاضر الاستلام الفني (Punch List)
              </p>
            </div>
          </div>

          <!-- Actions: Add Task / Punch Item & Copy Share Link -->
          <div class="flex items-center gap-2.5 flex-wrap">
            @if (publicShareToken()) {
              <button
                type="button"
                (click)="copyPublicShareLink()"
                class="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm">
                <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                نسخ رابط متابعة العميل
              </button>
            }

            @if (activeTab() === 'tasks' && canManageTasks()) {
              <button
                type="button"
                (click)="openCreateModal()"
                class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                إضافة بند تنفيذي جديد
              </button>
            }

            @if (activeTab() === 'punchList' && canManageTasks()) {
              <button
                type="button"
                (click)="openCreatePunchModal()"
                class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                + تسجيل ملاحظة فنية / عيب موقع
              </button>
            }
          </div>
        </div>

        <!-- KPI Quick Highlights Bar -->
        <div class="mt-6 pt-5 border-t border-slate-800/70 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <!-- Overall Weighted Progress -->
          <div class="sm:col-span-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
                نسبة إنجاز المشروع التراكمية (Weighted Progress)
              </span>
              <span class="text-lg font-black font-mono" [class.text-emerald-400]="weightedProgress() >= 75" [class.text-indigo-400]="weightedProgress() < 75">
                {{ weightedProgress() }}%
              </span>
            </div>
            <!-- Progress Bar -->
            <div class="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700/60">
              <div
                class="h-full rounded-full transition-all duration-500"
                [ngClass]="{
                  'bg-gradient-to-r from-indigo-500 to-indigo-400': weightedProgress() < 50,
                  'bg-gradient-to-r from-amber-500 to-amber-400': weightedProgress() >= 50 && weightedProgress() < 80,
                  'bg-gradient-to-r from-emerald-500 to-emerald-400': weightedProgress() >= 80
                }"
                [style.width.%]="weightedProgress()">
              </div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
              <span>البنود المكتملة: {{ completedTasksCount() }} من {{ tasks().length }}</span>
              <span>مجموع الأوزان: {{ totalWeight() | number:'1.1-2' }}</span>
            </div>
          </div>

          <!-- Total Allocated Settlements on Site Tasks -->
          <div class="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">
              إجمالي تسويات الموقع المحملة
            </span>
            <div class="mt-2">
              <h3 class="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                {{ totalAllocatedExpenses() | number:'1.2-2' }} ج.م
              </h3>
              <p class="text-[11px] text-slate-500 mt-1">
                مرتبطة عبر بنود التسويات المعتمدة
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- 🚀 Upper Tabs Navigation Bar (Zero Network Lag on Switch)    -->
      <!-- ============================================================ -->
      <div class="flex items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg overflow-x-auto">
        
        <!-- Tab 1: Tasks -->
        <button
          type="button"
          (click)="activeTab.set('tasks')"
          [class.bg-indigo-600]="activeTab() === 'tasks'"
          [class.text-white]="activeTab() === 'tasks'"
          [class.shadow-md]="activeTab() === 'tasks'"
          [class.text-slate-400]="activeTab() !== 'tasks'"
          [class.hover:text-slate-200]="activeTab() !== 'tasks'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>جدول الأعمال وبنود التنفيذ</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-black"
            [class.bg-indigo-700]="activeTab() === 'tasks'"
            [class.text-indigo-100]="activeTab() === 'tasks'"
            [class.bg-slate-800]="activeTab() !== 'tasks'"
            [class.text-slate-400]="activeTab() !== 'tasks'">
            {{ tasks().length }}
          </span>
        </button>

        <!-- Tab 2: Daily Logs -->
        <button
          type="button"
          (click)="activeTab.set('dailyLogs')"
          [class.bg-indigo-600]="activeTab() === 'dailyLogs'"
          [class.text-white]="activeTab() === 'dailyLogs'"
          [class.shadow-md]="activeTab() === 'dailyLogs'"
          [class.text-slate-400]="activeTab() !== 'dailyLogs'"
          [class.hover:text-slate-200]="activeTab() !== 'dailyLogs'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>اليوميات الميدانية</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-black"
            [class.bg-indigo-700]="activeTab() === 'dailyLogs'"
            [class.text-indigo-100]="activeTab() === 'dailyLogs'"
            [class.bg-slate-800]="activeTab() !== 'dailyLogs'"
            [class.text-slate-400]="activeTab() !== 'dailyLogs'">
            {{ dailyLogs().length }}
          </span>
        </button>

        <!-- Tab 3: Punch List -->
        <button
          type="button"
          (click)="activeTab.set('punchList')"
          [class.bg-indigo-600]="activeTab() === 'punchList'"
          [class.text-white]="activeTab() === 'punchList'"
          [class.shadow-md]="activeTab() === 'punchList'"
          [class.text-slate-400]="activeTab() !== 'punchList'"
          [class.hover:text-slate-200]="activeTab() !== 'punchList'"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>محاضر وملاحظات الاستلام (Punch List)</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-black"
            [class.bg-rose-500]="openPunchCount() > 0 && activeTab() !== 'punchList'"
            [class.text-white]="openPunchCount() > 0 && activeTab() !== 'punchList'"
            [class.bg-indigo-700]="activeTab() === 'punchList'"
            [class.text-indigo-100]="activeTab() === 'punchList'"
            [class.bg-slate-800]="openPunchCount() === 0 && activeTab() !== 'punchList'"
            [class.text-slate-400]="openPunchCount() === 0 && activeTab() !== 'punchList'">
            {{ punchList().length }}
          </span>
        </button>

      </div>

      <!-- ============================================================ -->
      <!-- 🚀 TAB 1 CONTENT: Site Tasks & Execution Schedule            -->
      <!-- ============================================================ -->
      @if (activeTab() === 'tasks') {
        <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl shadow-xl overflow-hidden">
          
          <!-- Table Header & Filter Bar -->
          <div class="p-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-slate-200">سجل بنود الموقع الميدانية</span>
              <span class="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-400">
                {{ tasks().length }}
              </span>
            </div>

            <!-- Quick Status Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
              <button
                type="button"
                (click)="selectedStatusFilter.set('All')"
                [class.bg-indigo-600]="selectedStatusFilter() === 'All'"
                [class.text-white]="selectedStatusFilter() === 'All'"
                [class.bg-slate-950]="selectedStatusFilter() !== 'All'"
                [class.text-slate-400]="selectedStatusFilter() !== 'All'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                الكل
              </button>
              <button
                type="button"
                (click)="selectedStatusFilter.set('InProgress')"
                [class.bg-indigo-600]="selectedStatusFilter() === 'InProgress'"
                [class.text-white]="selectedStatusFilter() === 'InProgress'"
                [class.bg-slate-950]="selectedStatusFilter() !== 'InProgress'"
                [class.text-slate-400]="selectedStatusFilter() !== 'InProgress'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                قيد التنفيذ
              </button>
              <button
                type="button"
                (click)="selectedStatusFilter.set('Completed')"
                [class.bg-indigo-600]="selectedStatusFilter() === 'Completed'"
                [class.text-white]="selectedStatusFilter() === 'Completed'"
                [class.bg-slate-950]="selectedStatusFilter() !== 'Completed'"
                [class.text-slate-400]="selectedStatusFilter() !== 'Completed'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                المكتملة
              </button>
            </div>
          </div>

          <!-- Skeleton Loader -->
          @if (isLoading()) {
            <div class="p-6 space-y-4 animate-pulse">
              @for (i of [1, 2, 3, 4]; track i) {
                <div class="h-16 bg-slate-800/50 rounded-xl"></div>
              }
            </div>
          } @else if (filteredTasks().length === 0) {
            <!-- Empty State -->
            <div class="p-12 text-center">
              <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 class="text-base font-bold text-white">لا توجد بنود تنفيذية مطابقة</h3>
              <p class="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                قم بإضافة أول بند تنفيذي للمشروع وإسناده للمهندس المسؤول لبدء تتبع الإنجاز وربط التسويات.
              </p>
              @if (canManageTasks()) {
                <button
                  type="button"
                  (click)="openCreateModal()"
                  class="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer">
                  إضافة بند جديد الآن
                </button>
              }
            </div>
          } @else {
            <!-- Responsive Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-right text-xs text-slate-300 min-w-[850px]">
                <thead class="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" class="py-3 px-4 w-60">البند التنفيذي</th>
                    <th scope="col" class="py-3 px-3 w-40">المهندس المسؤول</th>
                    <th scope="col" class="py-3 px-3 w-28 text-center">الوزن النسبي</th>
                    <th scope="col" class="py-3 px-4 w-44">نسبة الإنجاز</th>
                    <th scope="col" class="py-3 px-3 w-36 text-center">التسويات المرتبطة</th>
                    <th scope="col" class="py-3 px-3 w-32 text-center">صور الإثبات</th>
                    <th scope="col" class="py-3 px-4 w-28 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 font-medium">
                  @for (task of filteredTasks(); track task.id) {
                    <tr class="hover:bg-slate-800/30 transition-colors">
                      
                      <!-- Title & Description -->
                      <td class="py-3.5 px-4">
                        <div class="font-bold text-slate-100 text-sm">
                          {{ task.title }}
                        </div>
                        @if (task.description) {
                          <p class="text-xs text-slate-400 mt-0.5 line-clamp-1" [title]="task.description">
                            {{ task.description }}
                          </p>
                        }
                        @if (task.plannedStartDate || task.plannedEndDate) {
                          <div class="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-mono">
                            <span>📅 {{ formatTaskDate(task.plannedStartDate) }}</span>
                            @if (task.plannedEndDate) {
                              <span>← {{ formatTaskDate(task.plannedEndDate) }}</span>
                            }
                          </div>
                        }
                      </td>

                      <!-- Assigned Engineer -->
                      <td class="py-3.5 px-3">
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                          <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                          <span class="font-bold text-xs truncate max-w-[120px]">{{ task.assignedEngineerName }}</span>
                        </div>
                      </td>

                      <!-- Weight -->
                      <td class="py-3.5 px-3 text-center font-mono font-bold text-slate-300">
                        {{ task.weight | number:'1.1-2' }}
                      </td>

                      <!-- Progress & Status -->
                      <td class="py-3.5 px-4">
                        <div class="space-y-1.5">
                          <div class="flex items-center justify-between text-[11px] font-mono">
                            <span [class]="getStatusBadgeClass(task.status)">
                              {{ getStatusLabel(task.status) }}
                            </span>
                            <span class="font-bold text-white">{{ task.progressPercentage }}%</span>
                          </div>
                          <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                            <div
                              class="h-full rounded-full transition-all duration-300"
                              [ngClass]="{
                                'bg-indigo-500': task.progressPercentage < 100,
                                'bg-emerald-400': task.progressPercentage === 100
                              }"
                              [style.width.%]="task.progressPercentage">
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- Linked Settlements -->
                      <td class="py-3.5 px-3 text-center">
                        @if (task.totalAllocatedExpenses > 0) {
                          <div class="inline-flex flex-col items-center">
                            <span class="font-bold font-mono text-amber-400 text-xs">
                              {{ task.totalAllocatedExpenses | number:'1.0-0' }} ج.م
                            </span>
                            <span class="text-[10px] text-slate-500 font-mono">
                              ({{ task.linkedSettlementItems.length }} بند تسوية)
                            </span>
                          </div>
                        } @else {
                          <span class="text-[11px] text-slate-600 font-mono">لا توجد تسويات</span>
                        }
                      </td>

                      <!-- Attachments -->
                      <td class="py-3.5 px-3 text-center">
                        @if (task.attachmentUrls && task.attachmentUrls.length > 0) {
                          <div class="flex items-center justify-center -space-x-1.5 rtl:space-x-reverse overflow-hidden">
                            @for (url of task.attachmentUrls.slice(0, 3); track url) {
                              <button
                                type="button"
                                (click)="openImagePreview(url)"
                                class="cursor-pointer transition-transform hover:scale-110">
                                <img
                                  [src]="url"
                                  alt="إثبات الإنجاز"
                                  class="w-7 h-7 rounded-lg object-cover border-2 border-slate-900 bg-slate-800" />
                              </button>
                            }
                            @if (task.attachmentUrls.length > 3) {
                              <span class="w-7 h-7 rounded-lg bg-slate-800 border-2 border-slate-900 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                                +{{ task.attachmentUrls.length - 3 }}
                              </span>
                            }
                          </div>
                        } @else {
                          <span class="text-[11px] text-slate-600 font-mono">—</span>
                        }
                      </td>

                      <!-- Action Button -->
                      <td class="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          (click)="openTaskAction(task)"
                          class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm">
                          تحديث البند
                        </button>
                      </td>

                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }

        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 TAB 2 CONTENT: Daily Site Logs (Today's Entry + Timeline) -->
      <!-- ============================================================ -->
      @if (activeTab() === 'dailyLogs') {
        <div class="space-y-6">

          <!-- Card 1: Fast Entry for Today's Log -->
          <div class="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="text-base sm:text-lg font-black text-white tracking-tight">
                    تدوين تقرير اليوم الميداني (Daily Site Log)
                  </h3>
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Upsert Guard
                  </span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">
                  يُسمح بتقرير واحد للمشروع يومياً؛ إرسال أي تحديث لليوم نفسه يتم حفظه فوراً دون تكرار.
                </p>
              </div>

              <!-- Date Picker Input -->
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-400 font-bold">تاريخ التقرير:</span>
                <input
                  type="date"
                  [ngModel]="dailyLogDate()"
                  (ngModelChange)="dailyLogDate.set($event)"
                  class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono" />
              </div>
            </div>

            <div class="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              <!-- Left side: Workforce Counter & Weather Picker (lg:col-span-5) -->
              <div class="lg:col-span-5 space-y-4">
                
                <!-- Workforce Total Counter -->
                <div class="bg-slate-950 border border-slate-800/90 rounded-xl p-4">
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-xs font-bold text-slate-300">
                      إجمالي العمالة المتواجدة بالموقع
                    </label>
                    <span class="text-lg font-black font-mono text-amber-400">
                      {{ dailyWorkforceCount() }} عامل / فني
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      (click)="incrementWorkforce(-1)"
                      class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 font-bold text-lg flex items-center justify-center transition-all cursor-pointer">
                      -
                    </button>
                    <input
                      type="number"
                      [ngModel]="dailyWorkforceCount()"
                      (ngModelChange)="dailyWorkforceCount.set($event)"
                      min="0"
                      class="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl text-center text-sm font-mono font-bold text-white py-2 focus:outline-none focus:border-indigo-500" />
                    <button
                      type="button"
                      (click)="incrementWorkforce(1)"
                      class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 font-bold text-lg flex items-center justify-center transition-all cursor-pointer">
                      +
                    </button>
                  </div>
                </div>

                <!-- Weather Condition Picker -->
                <div class="bg-slate-950 border border-slate-800/90 rounded-xl p-4">
                  <label class="block text-xs font-bold text-slate-300 mb-2">
                    حالة الطقس والظروف الجوية
                  </label>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    @for (w of weatherOptions; track w.key) {
                      <button
                        type="button"
                        (click)="dailyWeatherCondition.set(w.key)"
                        [class.bg-indigo-600]="dailyWeatherCondition() === w.key"
                        [class.text-white]="dailyWeatherCondition() === w.key"
                        [class.border-indigo-500]="dailyWeatherCondition() === w.key"
                        [class.bg-slate-900]="dailyWeatherCondition() !== w.key"
                        [class.text-slate-300]="dailyWeatherCondition() !== w.key"
                        [class.border-slate-800]="dailyWeatherCondition() !== w.key"
                        class="p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer hover:border-slate-700">
                        <span class="text-base">{{ w.icon }}</span>
                        <span class="text-[11px]">{{ w.label }}</span>
                      </button>
                    }
                  </div>
                </div>

                <!-- Detailed Workforce breakdown -->
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    تفصيل المهن والفرق الميدانية
                  </label>
                  <input
                    type="text"
                    [ngModel]="dailyWorkforceSummary()"
                    (ngModelChange)="dailyWorkforceSummary.set($event)"
                    placeholder="مثال: 4 نجارين، 6 حدادين، 12 عمال حفر، 2 سباكة..."
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>

              </div>

              <!-- Right side: Materials Delivered & General Observations (lg:col-span-7) -->
              <div class="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    الخامات الموردة وأذون الاستلام اليومية
                  </label>
                  <textarea
                    [ngModel]="dailyMaterialsDelivered()"
                    (ngModelChange)="dailyMaterialsDelivered.set($event)"
                    rows="3"
                    placeholder="سجل أرقام أذون التوريد والخامات مثل: توريد 40 طن حديد عز (إذن 1042)، 150 شيكارة أسمنت لافارج..."
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"></textarea>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    ملاحظات الموقع وسير العمليات
                  </label>
                  <textarea
                    [ngModel]="dailyGeneralObservations()"
                    (ngModelChange)="dailyGeneralObservations.set($event)"
                    rows="3"
                    placeholder="أهم الملاحظات الفنية، معوقات العمل، أو توجيهات الاستشاري اليومية..."
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"></textarea>
                </div>

                <!-- Instant Save Action Button -->
                <div class="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    (click)="saveTodayDailyLog()"
                    [disabled]="isSavingDailyLog()"
                    class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center gap-2">
                    @if (isSavingDailyLog()) {
                      <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      <span>جاري حفظ اليومية...</span>
                    } @else {
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>حفظ وتحديث تقرير اليوم</span>
                    }
                  </button>
                </div>

              </div>

            </div>
          </div>

          <!-- Card 2: Timeline / Table of Past Daily Logs -->
          <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <h3 class="text-sm sm:text-base font-bold text-white">سجل اليوميات الميدانية السابقة</h3>
                <span class="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-400">
                  {{ dailyLogs().length }} تقرير
                </span>
              </div>
            </div>

            @if (dailyLogs().length === 0) {
              <div class="p-10 text-center bg-slate-950/40 rounded-xl border border-slate-800/80">
                <div class="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 class="text-xs font-bold text-slate-200">لا توجد تقارير يومية سابقة مسجلة</h4>
                <p class="text-[11px] text-slate-500 mt-1">ابدأ بتدوين تقرير اليوم باستخدام النموذج أعلاه.</p>
              </div>
            } @else {
              <div class="space-y-4">
                @for (log of dailyLogs(); track log.id) {
                  <div class="bg-slate-950/80 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700 space-y-3">
                    
                    <!-- Log Header -->
                    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-2.5">
                      <div class="flex items-center gap-2.5">
                        <span class="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono font-bold">
                          📅 {{ formatTaskDate(log.logDate) }}
                        </span>
                        @if (log.weatherCondition) {
                          <span class="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-bold">
                            {{ getWeatherIcon(log.weatherCondition) }} {{ log.weatherCondition }}
                          </span>
                        }
                      </div>
                      
                      <div class="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                        <span>دوّنه:</span>
                        <span class="text-white font-bold">{{ log.loggedByUserName }}</span>
                      </div>
                    </div>

                    <!-- Log Stats & Details -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      
                      <!-- Workforce -->
                      <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          العمالة المتواجدة ({{ log.workforceCount }})
                        </span>
                        <p class="text-slate-200 font-medium">
                          {{ log.workforceSummary || 'لم يتم تحديد تفصيل المهن' }}
                        </p>
                      </div>

                      <!-- Materials Delivered -->
                      <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          الخامات وأذون التوريد
                        </span>
                        <p class="text-slate-200 font-medium">
                          {{ log.materialsDelivered || 'لا توجد توريدات مسجلة لهذا اليوم' }}
                        </p>
                      </div>

                      <!-- General Observations -->
                      <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          ملاحظات الموقع
                        </span>
                        <p class="text-slate-200 font-medium">
                          {{ log.generalObservations || 'سير الأعمال منتظم بدون ملاحظات استثنائية' }}
                        </p>
                      </div>

                    </div>

                  </div>
                }
              </div>
            }

          </div>

        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 TAB 3 CONTENT: Punch List & Quality Assurance             -->
      <!-- ============================================================ -->
      @if (activeTab() === 'punchList') {
        <div class="space-y-6">

          <!-- KPI Summary Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <!-- Open Defects -->
            <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  ملاحظات مفتوحة
                </span>
                <h3 class="text-2xl font-black text-rose-400 font-mono mt-1">
                  {{ openPunchCount() }}
                </h3>
              </div>
              <div class="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            <!-- Fixed Pending Review -->
            <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  قيد الفحص والمراجعة
                </span>
                <h3 class="text-2xl font-black text-amber-400 font-mono mt-1">
                  {{ pendingReviewPunchCount() }}
                </h3>
              </div>
              <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <!-- Approved and Closed -->
            <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  معتمدة ومغلقة
                </span>
                <h3 class="text-2xl font-black text-emerald-400 font-mono mt-1">
                  {{ closedPunchCount() }}
                </h3>
              </div>
              <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

          </div>

          <!-- Filter & Action Bar -->
          <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-3">
            
            <!-- Filter Tabs -->
            <div class="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
              <button
                type="button"
                (click)="selectedPunchFilter.set('All')"
                [class.bg-indigo-600]="selectedPunchFilter() === 'All'"
                [class.text-white]="selectedPunchFilter() === 'All'"
                [class.bg-slate-950]="selectedPunchFilter() !== 'All'"
                [class.text-slate-400]="selectedPunchFilter() !== 'All'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                الكل ({{ punchList().length }})
              </button>
              <button
                type="button"
                (click)="selectedPunchFilter.set('Open')"
                [class.bg-rose-600]="selectedPunchFilter() === 'Open'"
                [class.text-white]="selectedPunchFilter() === 'Open'"
                [class.bg-slate-950]="selectedPunchFilter() !== 'Open'"
                [class.text-slate-400]="selectedPunchFilter() !== 'Open'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                مفتوحة ({{ openPunchCount() }})
              </button>
              <button
                type="button"
                (click)="selectedPunchFilter.set('FixedPendingReview')"
                [class.bg-amber-600]="selectedPunchFilter() === 'FixedPendingReview'"
                [class.text-white]="selectedPunchFilter() === 'FixedPendingReview'"
                [class.bg-slate-950]="selectedPunchFilter() !== 'FixedPendingReview'"
                [class.text-slate-400]="selectedPunchFilter() !== 'FixedPendingReview'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                قيد الفحص ({{ pendingReviewPunchCount() }})
              </button>
              <button
                type="button"
                (click)="selectedPunchFilter.set('ApprovedAndClosed')"
                [class.bg-emerald-600]="selectedPunchFilter() === 'ApprovedAndClosed'"
                [class.text-white]="selectedPunchFilter() === 'ApprovedAndClosed'"
                [class.bg-slate-950]="selectedPunchFilter() !== 'ApprovedAndClosed'"
                [class.text-slate-400]="selectedPunchFilter() !== 'ApprovedAndClosed'"
                class="px-3 py-1.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                المغلقة ({{ closedPunchCount() }})
              </button>
            </div>

            @if (canManageTasks()) {
              <button
                type="button"
                (click)="openCreatePunchModal()"
                class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                تسجيل ملاحظة استلام فنية جديدة
              </button>
            }

          </div>

          <!-- Cards Grid -->
          @if (filteredPunchList().length === 0) {
            <div class="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-12 text-center">
              <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-white">لا توجد ملاحظات استلام مطابقة</h3>
              <p class="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                سجل الملاحظات نظيف تماماً في هذا النطاق، أو لم يتم تسجيل أي عيب فني بعد.
              </p>
            </div>
          } @else {
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              @for (item of filteredPunchList(); track item.id) {
                <div class="bg-slate-900/90 border border-slate-800/90 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:border-slate-700">
                  
                  <!-- Card Top Section (Photo + Badges) -->
                  <div>
                    <div class="relative h-48 bg-slate-950 overflow-hidden group">
                      <img
                        [src]="item.defectPhotoUrl"
                        [alt]="item.title"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      
                      <!-- Overlay with Click to Zoom -->
                      <button
                        type="button"
                        (click)="openImagePreview(item.defectPhotoUrl)"
                        class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 cursor-pointer backdrop-blur-[2px]">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        <span>معاينة الصورة بالحجم الكامل</span>
                      </button>

                      <!-- Badges over Photo -->
                      <div class="absolute top-2.5 right-2.5 flex items-center gap-1.5 flex-wrap">
                        <span [class]="getPunchSeverityClass(item.severity)">
                          {{ getPunchSeverityLabel(item.severity) }}
                        </span>
                      </div>

                      <div class="absolute top-2.5 left-2.5">
                        <span [class]="getPunchStatusClass(item.status)">
                          {{ getPunchStatusLabel(item.status) }}
                        </span>
                      </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-4 space-y-2.5">
                      <h4 class="text-sm font-bold text-white leading-snug">
                        {{ item.title }}
                      </h4>

                      <!-- Metadata: Subcontractor & Linked Task -->
                      <div class="space-y-1 text-xs">
                        @if (item.subcontractorName) {
                          <div class="flex items-center gap-1.5 text-slate-400">
                            <span class="text-slate-500 font-bold">المسؤول/الفني:</span>
                            <span class="text-slate-200 font-bold">{{ item.subcontractorName }}</span>
                          </div>
                        }
                        @if (item.siteTaskTitle) {
                          <div class="flex items-center gap-1.5 text-slate-400">
                            <span class="text-slate-500 font-bold">البند المرتبط:</span>
                            <span class="text-indigo-400 font-bold truncate max-w-[200px]">{{ item.siteTaskTitle }}</span>
                          </div>
                        }
                      </div>

                      <!-- Engineer Notes -->
                      @if (item.engineerNotes) {
                        <p class="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                          {{ item.engineerNotes }}
                        </p>
                      }

                      <!-- Resolution Photo Proof (if exists) -->
                      @if (item.resolutionPhotoUrl) {
                        <div class="pt-2 border-t border-slate-800/70">
                          <span class="text-[10px] font-bold text-emerald-400 block mb-1">
                            ✓ إثبات المعالجة الميدانية:
                          </span>
                          <button
                            type="button"
                            (click)="openImagePreview(item.resolutionPhotoUrl)"
                            class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold hover:bg-emerald-500/20 transition-all cursor-pointer">
                            <img
                              [src]="item.resolutionPhotoUrl"
                              alt="صورة المعالجة"
                              class="w-6 h-6 rounded object-cover" />
                            <span>عرض صورة الإصلاح</span>
                          </button>
                        </div>
                      }

                      <!-- Footer Info -->
                      <div class="pt-2 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>📅 {{ formatTaskDate(item.createdAt) }}</span>
                        <span>بواسطة: {{ item.createdByUserName }}</span>
                      </div>

                    </div>
                  </div>

                  <!-- Card Action Buttons -->
                  <div class="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                    
                    <!-- Engineer Action: Upload Resolution Photo -->
                    @if (item.status !== 'ApprovedAndClosed') {
                      <button
                        type="button"
                        (click)="openResolvePunchModal(item)"
                        class="flex-1 py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>رفع صورة المعالجة</span>
                      </button>
                    }

                    <!-- Manager / Owner Action: Approve and Close -->
                    @if (canApprovePunch() && item.status !== 'ApprovedAndClosed') {
                      <button
                        type="button"
                        (click)="approveAndClosePunch(item)"
                        class="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>اعتماد وإغلاق</span>
                      </button>
                    }

                    @if (item.status === 'ApprovedAndClosed') {
                      <div class="w-full py-1.5 text-center text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        ✓ تم اعتماد وإغلاق الملاحظة نهائياً
                      </div>
                    }

                  </div>

                </div>
              }
            </div>
          }

        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 MODAL 1: Update Task Progress & Settlement Linkage        -->
      <!-- ============================================================ -->
      @if (isActionModalOpen() && selectedTask()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            
            <!-- Modal Header -->
            <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-white">تحديث نسبة الإنجاز والربط</h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ selectedTask()?.title }}</p>
              </div>
              <button
                type="button"
                (click)="closeActionModal()"
                class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Body (Scrollable) -->
            <div class="p-4 sm:p-6 overflow-y-auto min-h-0 space-y-5 text-right">
              
              <!-- Progress Slider -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-bold text-slate-300">نسبة الإنجاز الفعلية</label>
                  <span class="text-base font-black font-mono text-indigo-400">{{ actionProgress() }}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  [ngModel]="actionProgress()"
                  (ngModelChange)="actionProgress.set($event)"
                  class="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg" />
              </div>

              <!-- Status Override -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">حالة البند</label>
                <select
                  [(ngModel)]="actionStatus"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                  <option value="Pending">معلق (Pending)</option>
                  <option value="InProgress">قيد التنفيذ (In Progress)</option>
                  <option value="UnderReview">قيد المراجعة الفنية (Under Review)</option>
                  <option value="Completed">مكتمل بنسبة 100% (Completed)</option>
                </select>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">ملاحظات المهندس الميداني</label>
                <textarea
                  [(ngModel)]="actionNotes"
                  rows="3"
                  placeholder="سجل ملاحظات التنفيذ الفنية أو أسباب التأخير إن وجدت..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"></textarea>
              </div>

              <!-- Upload Site Proof Attachments -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">صور وتقارير إثبات الإنجاز</label>
                <div class="flex items-center gap-2">
                  <label class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>رفع صورة إثبات</span>
                    <input type="file" accept="image/*" class="hidden" (change)="onUploadAttachment($event)" />
                  </label>
                  @if (isUploading()) {
                    <span class="text-xs text-indigo-400 animate-pulse">جاري الرفع...</span>
                  }
                </div>

                @if (actionAttachments().length > 0) {
                  <div class="grid grid-cols-4 gap-2 mt-3">
                    @for (url of actionAttachments(); track url; let idx = $index) {
                      <div class="relative group rounded-lg overflow-hidden border border-slate-800 h-16 bg-slate-950">
                        <img [src]="url" alt="إثبات" class="w-full h-full object-cover" />
                        <button
                          type="button"
                          (click)="removeAttachment(idx)"
                          class="absolute top-1 left-1 bg-rose-600/90 text-white rounded p-1 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          ✕
                        </button>
                      </div>
                    }
                  </div>
                }
              </div>

              <!-- Linked Settlements -->
              <div class="pt-4 border-t border-slate-800/80">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h4 class="text-xs font-bold text-slate-200">ربط بنود التسويات المعتمدة بهذا البند</h4>
                    <p class="text-[10px] text-slate-400">تحميل جزء أو كامل بند التسوية على هذا البند التنفيذي</p>
                  </div>
                  @if (settlementLines().length > 0) {
                    <button
                      type="button"
                      (click)="addNewSettlementAllocation()"
                      class="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-bold hover:bg-amber-500/20 transition-all cursor-pointer">
                      + إضافة ربط تسوية
                    </button>
                  }
                </div>

                @if (settlementLines().length === 0) {
                  <div class="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-center text-xs text-slate-500">
                    لا توجد بنود تسويات معتمدة ومتاحة للربط في هذا المشروع حالياً.
                  </div>
                } @else {
                  <div class="space-y-3">
                    @for (alloc of actionAllocations(); track $index; let idx = $index) {
                      <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <div class="flex items-center justify-between gap-2">
                          <span class="text-[11px] font-bold text-slate-400">بند التسوية #{{ idx + 1 }}</span>
                          <button
                            type="button"
                            (click)="removeSettlementAllocation(idx)"
                            class="text-rose-400 hover:text-rose-300 text-xs font-bold cursor-pointer">
                            حذف الربط
                          </button>
                        </div>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label class="block text-[10px] text-slate-500 mb-1">اختر بند التسوية</label>
                            <select
                              [(ngModel)]="alloc.settlementItemId"
                              class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none">
                              <option value="" disabled>-- اختر بند تسوية --</option>
                              @for (line of settlementLines(); track line.id) {
                                <option [value]="line.id">
                                  {{ line.category }} - {{ line.description }} (متبقي: {{ line.remainingAmount | number:'1.0-0' }} ج.م)
                                </option>
                              }
                            </select>
                          </div>

                          <div>
                            <label class="block text-[10px] text-slate-500 mb-1">المبلغ المحمل (ج.م)</label>
                            <input
                              type="number"
                              [(ngModel)]="alloc.allocatedAmount"
                              min="0"
                              placeholder="0.00"
                              class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none" />
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            [(ngModel)]="alloc.expenseDescription"
                            placeholder="وصف إضافي لتخصيص هذا المبلغ (اختياري)..."
                            class="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none" />
                        </div>
                      </div>
                    }
                  </div>
                }
              </div>

            </div>

            <!-- Modal Footer -->
            <div class="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                (click)="closeActionModal()"
                class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer">
                إلغاء
              </button>
              <button
                type="button"
                (click)="saveTaskAction()"
                [disabled]="isSaving()"
                class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md">
                {{ isSaving() ? 'جاري الحفظ...' : 'حفظ التحديثات' }}
              </button>
            </div>

          </div>
        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 MODAL 2: Create Site Task Modal                            -->
      <!-- ============================================================ -->
      @if (isCreateModalOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            
            <!-- Modal Header -->
            <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-white">إضافة بند تنفيذي جديد</h3>
                <p class="text-xs text-slate-400 mt-0.5">حدد تفاصيل البند والمهندس المسند للمشروع</p>
              </div>
              <button
                type="button"
                (click)="closeCreateModal()"
                class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Form Body (Scrollable) -->
            <form [formGroup]="createForm" (ngSubmit)="submitCreateTask()" class="flex flex-col min-h-0 flex-1">
              <div class="p-4 sm:p-6 overflow-y-auto min-h-0 space-y-4 text-right">
                
                <!-- Title -->
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    عنوان البند التنفيذي <span class="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    formControlName="title"
                    placeholder="مثال: أعمال الحفر وصب الخرسانة العادية..."
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
                  @if (createForm.get('title')?.touched && createForm.get('title')?.invalid) {
                    <p class="text-rose-400 text-[10px] mt-1 font-bold">عنوان البند مطلوب.</p>
                  }
                </div>

                <!-- Assigned Engineer -->
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <label class="text-xs font-bold text-slate-300">
                      المهندس المسؤول عن التنفيذ <span class="text-rose-400">*</span>
                    </label>
                    @if (isOwnerSelected()) {
                      <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        👑 مالك المنشأة / مهندس التنفيذ
                      </span>
                    }
                  </div>
                  <select
                    formControlName="assignedEngineerId"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-cairo">
                    <option value="" disabled>-- اختر المهندس المسؤول --</option>
                    @for (eng of engineers(); track eng.id) {
                      <option [value]="eng.id">
                        {{ eng.fullName }} ({{ getRoleArabic(eng.role) }})
                      </option>
                    }
                  </select>
                  @if (createForm.get('assignedEngineerId')?.touched && createForm.get('assignedEngineerId')?.invalid) {
                    <p class="text-rose-400 text-[10px] mt-1 font-bold">يجب اختيار المهندس المسؤول.</p>
                  }
                </div>

                <!-- Weight -->
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    الوزن النسبي للبند <span class="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    formControlName="weight"
                    step="0.1"
                    min="0.1"
                    placeholder="1.0"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500" />
                </div>

                <!-- Planned Start & End Dates -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1.5">تاريخ البدء المخطط</label>
                    <input
                      type="date"
                      formControlName="plannedStartDate"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1.5">تاريخ الانتهاء المخطط</label>
                    <input
                      type="date"
                      formControlName="plannedEndDate"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">وصف البند ومواصفاته</label>
                  <textarea
                    formControlName="description"
                    rows="3"
                    placeholder="تفاصيل فنية إضافية تخص تنفيذ هذا البند..."
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"></textarea>
                </div>

              </div>

              <!-- Modal Footer -->
              <div class="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  (click)="closeCreateModal()"
                  class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer">
                  إلغاء
                </button>
                <button
                  type="submit"
                  [disabled]="createForm.invalid || isSaving()"
                  class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md">
                  {{ isSaving() ? 'جاري الإنشاء...' : 'حفظ البند' }}
                </button>
              </div>
            </form>

          </div>
        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 MODAL 3: Create Punch Item Modal (New Defect)             -->
      <!-- ============================================================ -->
      @if (isCreatePunchModalOpen()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            
            <!-- Modal Header -->
            <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-white">تسجيل ملاحظة فنية / استلام موقع</h3>
                <p class="text-xs text-slate-400 mt-0.5">توثيق عيب تنفيذي مع إرفاق صورة الإثبات</p>
              </div>
              <button
                type="button"
                (click)="closeCreatePunchModal()"
                class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Body (Scrollable) -->
            <div class="p-4 sm:p-6 overflow-y-auto min-h-0 space-y-4 text-right">
              
              <!-- Title -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">
                  عنوان الملاحظة الفنية / العيب <span class="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  [ngModel]="punchCreateTitle()"
                  (ngModelChange)="punchCreateTitle.set($event)"
                  placeholder="مثال: تعشيش في عمود C4 بالدور الأرضي..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
              </div>

              <!-- Severity & Site Task Selection -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    درجة الخطورة <span class="text-rose-400">*</span>
                  </label>
                  <select
                    [ngModel]="punchCreateSeverity()"
                    (ngModelChange)="punchCreateSeverity.set($event)"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                    <option value="Low">منخفض (Low) - ملاحظة تشطيبات بسيطة</option>
                    <option value="Medium">متوسط (Medium) - يتطلب معالجة قياسية</option>
                    <option value="Critical">حرج / خطر (Critical) - عيب إنشائي هام</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    البند التنفيذي المرتبط (اختياري)
                  </label>
                  <select
                    [ngModel]="punchCreateTaskId()"
                    (ngModelChange)="punchCreateTaskId.set($event)"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-cairo">
                    <option value="">-- بدون ربط ببند محدد --</option>
                    @for (task of tasks(); track task.id) {
                      <option [value]="task.id">{{ task.title }}</option>
                    }
                  </select>
                </div>
              </div>

              <!-- Subcontractor Name -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">
                  اسم الفني / المقاول المسؤول عن العيب
                </label>
                <input
                  type="text"
                  [ngModel]="punchCreateSubcontractor()"
                  (ngModelChange)="punchCreateSubcontractor.set($event)"
                  placeholder="مثال: مقاول الخرسانات م. سمير / فني الكهرباء..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
              </div>

              <!-- Defect Photo Upload (Required) -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">
                  صورة العيب الفني قبل المعالجة <span class="text-rose-400">*</span>
                </label>
                <div class="space-y-3">
                  <label class="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl bg-slate-950 cursor-pointer transition-all">
                    <svg class="w-8 h-8 text-slate-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-xs font-bold text-slate-300">اضغط لالتقاط أو رفع صورة العيب</span>
                    <span class="text-[10px] text-slate-500 mt-0.5">JPG, PNG, WebP (بحد أقصى 10MB)</span>
                    <input type="file" accept="image/*" class="hidden" (change)="onUploadPunchPhoto($event)" />
                  </label>

                  @if (isUploadingPunchPhoto()) {
                    <div class="text-center text-xs text-indigo-400 animate-pulse font-bold">
                      جاري رفع صورة الإثبات...
                    </div>
                  }

                  @if (punchCreatePhotoUrl()) {
                    <div class="relative rounded-xl overflow-hidden border border-slate-700 h-36 bg-slate-950">
                      <img [src]="punchCreatePhotoUrl()" alt="صورة العيب" class="w-full h-full object-cover" />
                      <button
                        type="button"
                        (click)="punchCreatePhotoUrl.set('')"
                        class="absolute top-2 left-2 bg-rose-600 text-white rounded-lg px-2 py-1 text-xs font-bold cursor-pointer">
                        ✕ حذف الصورة
                      </button>
                    </div>
                  }
                </div>
              </div>

              <!-- Notes -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">ملاحظات وتوجيهات الاستلام</label>
                <textarea
                  [ngModel]="punchCreateNotes()"
                  (ngModelChange)="punchCreateNotes.set($event)"
                  rows="3"
                  placeholder="وصف المشكلة وكيفية المعالجة المطلوبة هندسياً..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"></textarea>
              </div>

            </div>

            <!-- Modal Footer -->
            <div class="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                (click)="closeCreatePunchModal()"
                class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer">
                إلغاء
              </button>
              <button
                type="button"
                (click)="submitCreatePunchItem()"
                [disabled]="!punchCreateTitle() || !punchCreatePhotoUrl() || isSavingPunchItem()"
                class="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md">
                {{ isSavingPunchItem() ? 'جاري التسجيل...' : 'تسجيل الملاحظة الفنية' }}
              </button>
            </div>

          </div>
        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 MODAL 4: Resolve Punch Item (Upload Resolution Proof)     -->
      <!-- ============================================================ -->
      @if (isResolvePunchModalOpen() && selectedPunchItem()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            
            <!-- Modal Header -->
            <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-white">إثبات معالجة العيب الميداني</h3>
                <p class="text-xs text-slate-400 mt-0.5">{{ selectedPunchItem()?.title }}</p>
              </div>
              <button
                type="button"
                (click)="closeResolvePunchModal()"
                class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Body (Scrollable) -->
            <div class="p-4 sm:p-6 overflow-y-auto min-h-0 space-y-4 text-right">
              
              <!-- Original Defect Photo Reference -->
              <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
                <img
                  [src]="selectedPunchItem()?.defectPhotoUrl"
                  [alt]="selectedPunchItem()?.title"
                  class="w-16 h-16 rounded-lg object-cover border border-slate-700 shrink-0" />
                <div class="text-xs">
                  <span class="text-slate-400 font-bold block">العيب الأصلي:</span>
                  <span class="text-slate-200 font-medium">{{ selectedPunchItem()?.title }}</span>
                </div>
              </div>

              <!-- Upload Resolution Photo -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">
                  صورة الإثبات بعد الإصلاح والمعالجة <span class="text-rose-400">*</span>
                </label>
                <div class="space-y-3">
                  <label class="w-full flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl bg-slate-950 cursor-pointer transition-all">
                    <svg class="w-8 h-8 text-emerald-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-xs font-bold text-slate-300">اضغط لرفع صورة إثبات الإصلاح</span>
                    <span class="text-[10px] text-slate-500 mt-0.5">سيتم تحويل الحالة تلقائياً إلى (قيد الفحص)</span>
                    <input type="file" accept="image/*" class="hidden" (change)="onUploadResolutionPhoto($event)" />
                  </label>

                  @if (isUploadingResolutionPhoto()) {
                    <div class="text-center text-xs text-indigo-400 animate-pulse font-bold">
                      جاري رفع صورة المعالجة...
                    </div>
                  }

                  @if (punchResolutionPhotoUrl()) {
                    <div class="relative rounded-xl overflow-hidden border border-emerald-600/50 h-36 bg-slate-950">
                      <img [src]="punchResolutionPhotoUrl()" alt="صورة المعالجة" class="w-full h-full object-cover" />
                      <button
                        type="button"
                        (click)="punchResolutionPhotoUrl.set('')"
                        class="absolute top-2 left-2 bg-rose-600 text-white rounded-lg px-2 py-1 text-xs font-bold cursor-pointer">
                        ✕ حذف الصورة
                      </button>
                    </div>
                  }
                </div>
              </div>

              <!-- Engineer Notes -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">تفاصيل وملاحظات الإصلاح</label>
                <textarea
                  [ngModel]="punchResolutionNotes()"
                  (ngModelChange)="punchResolutionNotes.set($event)"
                  rows="3"
                  placeholder="وضح طريقة المعالجة والمواد المستخدمة لاعتمادها من الإدارة..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"></textarea>
              </div>

            </div>

            <!-- Modal Footer -->
            <div class="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                (click)="closeResolvePunchModal()"
                class="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer">
                إلغاء
              </button>
              <button
                type="button"
                (click)="submitResolvePunchItem()"
                [disabled]="!punchResolutionPhotoUrl() || isSavingPunchStatus()"
                class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md">
                {{ isSavingPunchStatus() ? 'جاري الإرسال...' : 'إرسال للمراجعة والاعتماد' }}
              </button>
            </div>

          </div>
        </div>
      }

      <!-- ============================================================ -->
      <!-- 🚀 MODAL 5: Fullscreen Lightbox Image Preview                -->
      <!-- ============================================================ -->
      @if (previewImageUrl()) {
        <div
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in"
          (click)="closeImagePreview()">
          <div class="relative max-w-4xl max-h-[90vh] flex flex-col items-center" (click)="$event.stopPropagation()">
            <button
              type="button"
              (click)="closeImagePreview()"
              class="absolute -top-12 left-0 p-2 text-white hover:text-slate-300 bg-slate-900/80 border border-slate-700 rounded-xl transition-all cursor-pointer">
              ✕ إغلاق المعاينة
            </button>
            <img
              [src]="previewImageUrl()!"
              alt="معاينة بالحجم الكامل"
              class="max-w-full max-h-[85vh] object-contain rounded-2xl border border-slate-850 shadow-2xl" />
          </div>
        </div>
      }

    </div>
  `
})
export class SiteExecutionComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly siteService = inject(SiteExecutionService);
  private readonly uploadService = inject(ImageUploadService);
  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  // Active Tab Signal (Zero Network Lag on Switch)
  readonly activeTab = signal<'tasks' | 'dailyLogs' | 'punchList'>('tasks');

  // Core Signals
  readonly projectId = signal<string>('');
  readonly projectName = signal<string>('');
  readonly publicShareToken = signal<string | null>(null);
  readonly weightedProgress = signal<number>(0);
  readonly totalWeight = signal<number>(0);
  readonly tasks = signal<SiteTaskDto[]>([]);
  readonly engineers = signal<AssignedEngineerDto[]>([]);
  readonly settlementLines = signal<AvailableSettlementLineDto[]>([]);
  readonly dailyLogs = signal<SiteDailyLogDto[]>([]);
  readonly punchList = signal<SitePunchItemDto[]>([]);

  readonly isLoading = signal<boolean>(true);
  readonly isSaving = signal<boolean>(false);
  readonly isUploading = signal<boolean>(false);

  // Filters & Selection
  readonly selectedStatusFilter = signal<string>('All');
  readonly selectedPunchFilter = signal<string>('All');
  readonly selectedTask = signal<SiteTaskDto | null>(null);
  readonly selectedPunchItem = signal<SitePunchItemDto | null>(null);
  readonly previewImageUrl = signal<string | null>(null);

  // Modal State Signals
  readonly isActionModalOpen = signal<boolean>(false);
  readonly isCreateModalOpen = signal<boolean>(false);
  readonly isCreatePunchModalOpen = signal<boolean>(false);
  readonly isResolvePunchModalOpen = signal<boolean>(false);

  // Action Modal Local Form Fields
  readonly actionProgress = signal<number>(0);
  actionStatus: SiteTaskStatus = 'Pending';
  actionNotes: string = '';
  readonly actionAttachments = signal<string[]>([]);
  readonly actionAllocations = signal<LinkSettlementItemEntryDto[]>([]);

  // Daily Log Fast Entry Form Signals
  readonly dailyLogDate = signal<string>(new Date().toISOString().split('T')[0]);
  readonly dailyWorkforceCount = signal<number>(0);
  readonly dailyWorkforceSummary = signal<string>('');
  readonly dailyWeatherCondition = signal<string>('مشمس');
  readonly dailyMaterialsDelivered = signal<string>('');
  readonly dailyGeneralObservations = signal<string>('');
  readonly isSavingDailyLog = signal<boolean>(false);

  // Punch Item Creation Signals
  readonly punchCreateTitle = signal<string>('');
  readonly punchCreateSeverity = signal<PunchItemSeverity>('Medium');
  readonly punchCreateTaskId = signal<string>('');
  readonly punchCreateSubcontractor = signal<string>('');
  readonly punchCreateNotes = signal<string>('');
  readonly punchCreatePhotoUrl = signal<string>('');
  readonly isUploadingPunchPhoto = signal<boolean>(false);
  readonly isSavingPunchItem = signal<boolean>(false);

  // Punch Item Resolution Signals
  readonly punchResolutionPhotoUrl = signal<string>('');
  readonly punchResolutionNotes = signal<string>('');
  readonly isUploadingResolutionPhoto = signal<boolean>(false);
  readonly isSavingPunchStatus = signal<boolean>(false);

  // Weather Options
  readonly weatherOptions = [
    { key: 'مشمس', label: 'مشمس / صحو', icon: '☀️' },
    { key: 'معتدل', label: 'معتدل', icon: '🌤️' },
    { key: 'ممطر', label: 'ممطر', icon: '🌧️' },
    { key: 'عاصف', label: 'عاصف / حار', icon: '🌪️' }
  ];

  // Create Task Form
  readonly createForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(250)]],
    assignedEngineerId: ['', Validators.required],
    weight: [1.0, [Validators.required, Validators.min(0.1)]],
    plannedStartDate: [''],
    plannedEndDate: [''],
    description: ['']
  });

  // Computed Values
  readonly filteredTasks = computed(() => {
    const filter = this.selectedStatusFilter();
    const all = this.tasks();
    if (filter === 'All') return all;
    return all.filter(t => t.status === filter);
  });

  readonly completedTasksCount = computed(() => {
    return this.tasks().filter(t => t.progressPercentage === 100).length;
  });

  readonly totalAllocatedExpenses = computed(() => {
    return this.tasks().reduce((acc, t) => acc + (t.totalAllocatedExpenses || 0), 0);
  });

  readonly filteredPunchList = computed(() => {
    const filter = this.selectedPunchFilter();
    const all = this.punchList();
    if (filter === 'All') return all;
    return all.filter(p => p.status === filter);
  });

  readonly openPunchCount = computed(() => {
    return this.punchList().filter(p => p.status === 'Open').length;
  });

  readonly pendingReviewPunchCount = computed(() => {
    return this.punchList().filter(p => p.status === 'FixedPendingReview').length;
  });

  readonly closedPunchCount = computed(() => {
    return this.punchList().filter(p => p.status === 'ApprovedAndClosed').length;
  });

  isOwnerSelected(): boolean {
    const selectedId = this.createForm.get('assignedEngineerId')?.value;
    if (!selectedId) return false;
    const eng = this.engineers().find(e => e.id === selectedId);
    return !!eng && (eng.isOwner === true || eng.role === 'TenantOwner');
  }

  getRoleArabic(role: string): string {
    const r = (role || '').toUpperCase();
    if (r.includes('TENANTOWNER') || r.includes('OWNER')) return 'مالك المنشأة / مدير تنفيذي';
    if (r.includes('SITEENGINEER') || r.includes('SITE_ENGINEER')) return 'مهندس موقع';
    if (r.includes('DESIGNENGINEER') || r.includes('DESIGN_ENGINEER')) return 'مهندس تصميم';
    if (r.includes('ENGINEER')) return 'مهندس موقع';
    if (r.includes('MANAGER')) return 'مدير مشاريع';
    if (r.includes('ACCOUNTANT')) return 'محاسب';
    return role || 'عضو';
  }

  private notifySuccess(msg: string): void {
    this.toast.show('نجاح العملية', msg, 'success');
  }

  private notifyError(msg: string): void {
    this.toast.show('تنبيه', msg, 'error');
  }

  private notifyInfo(msg: string): void {
    this.toast.show('معلومة', msg, 'info');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notifyError('معرّف المشروع مفقود');
      this.router.navigate(['/dashboard/projects']);
      return;
    }
    this.projectId.set(id);
    this.loadAllDataProactively(id);
  }

  canManageTasks(): boolean {
    const role = this.authService.currentUser()?.role?.toLowerCase() || '';
    return ['tenantowner', 'admin', 'manager', 'siteengineer', 'designengineer'].includes(role);
  }

  canApprovePunch(): boolean {
    const role = this.authService.currentUser()?.role?.toLowerCase() || '';
    return ['tenantowner', 'admin', 'manager'].includes(role);
  }

  // 🚀 Proactive Lifecycle Loading in ngOnInit (Tasks, Logs, and Punch List in Parallel)
  private loadAllDataProactively(projId: string): void {
    this.isLoading.set(true);

    forkJoin({
      tasksRes: this.siteService.getProjectSiteTasks(projId),
      engineersRes: this.siteService.getAssignedEngineers(projId),
      settlementsRes: this.siteService.getAvailableSettlementItems(projId),
      dailyLogsRes: this.siteService.getDailyLogs(projId),
      punchListRes: this.siteService.getPunchList(projId)
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: ({ tasksRes, engineersRes, settlementsRes, dailyLogsRes, punchListRes }) => {
        if (tasksRes.success && tasksRes.data) {
          this.projectName.set(tasksRes.data.projectName);
          this.publicShareToken.set(tasksRes.data.publicShareToken || null);
          this.weightedProgress.set(tasksRes.data.weightedOverallProgress);
          this.totalWeight.set(tasksRes.data.totalWeight);
          this.tasks.set(tasksRes.data.tasks);
        }
        if (engineersRes.success && engineersRes.data) {
          this.engineers.set(engineersRes.data);
        }
        if (settlementsRes.success && settlementsRes.data) {
          this.settlementLines.set(settlementsRes.data);
        }
        if (dailyLogsRes.success && dailyLogsRes.data) {
          this.dailyLogs.set(dailyLogsRes.data);
          // Prefill today's card if a report for today already exists
          const todayIso = new Date().toISOString().split('T')[0];
          const todayLog = dailyLogsRes.data.find(l => (l.logDate || '').startsWith(todayIso));
          if (todayLog) {
            this.dailyWorkforceCount.set(todayLog.workforceCount || 0);
            this.dailyWorkforceSummary.set(todayLog.workforceSummary || '');
            this.dailyWeatherCondition.set(todayLog.weatherCondition || 'مشمس');
            this.dailyMaterialsDelivered.set(todayLog.materialsDelivered || '');
            this.dailyGeneralObservations.set(todayLog.generalObservations || '');
          }
        }
        if (punchListRes.success && punchListRes.data) {
          this.punchList.set(punchListRes.data);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.notifyError('تعذر جلب بيانات الموقع التنفيذية');
        this.isLoading.set(false);
      }
    });
  }

  // -------------------------------------------------------------
  // Daily Logs Methods
  // -------------------------------------------------------------
  incrementWorkforce(delta: number): void {
    const nextVal = Math.max(0, this.dailyWorkforceCount() + delta);
    this.dailyWorkforceCount.set(nextVal);
  }

  getWeatherIcon(condition?: string | null): string {
    const opt = this.weatherOptions.find(w => w.key === condition);
    return opt ? opt.icon : '☀️';
  }

  saveTodayDailyLog(): void {
    const dateVal = this.dailyLogDate();
    if (!dateVal) {
      this.notifyError('يرجى تحديد تاريخ اليومية.');
      return;
    }

    this.isSavingDailyLog.set(true);

    const dto: SiteDailyLogUpsertDto = {
      projectId: this.projectId(),
      logDate: `${dateVal}T00:00:00Z`,
      weatherCondition: this.dailyWeatherCondition(),
      workforceCount: this.dailyWorkforceCount(),
      workforceSummary: this.dailyWorkforceSummary(),
      materialsDelivered: this.dailyMaterialsDelivered(),
      generalObservations: this.dailyGeneralObservations()
    };

    this.siteService.upsertDailyLog(this.projectId(), dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isSavingDailyLog.set(false);
          if (res.success && res.data) {
            this.notifySuccess(res.message || 'تم حفظ اليومية الميدانية بنجاح');
            
            // In-place signal update to eliminate network lag
            const savedLog = res.data;
            const targetDateStr = dateVal;
            const existingIdx = this.dailyLogs().findIndex(l => (l.logDate || '').startsWith(targetDateStr));

            if (existingIdx >= 0) {
              this.dailyLogs.update(logs => {
                const copy = [...logs];
                copy[existingIdx] = savedLog;
                return copy;
              });
            } else {
              this.dailyLogs.update(logs => [savedLog, ...logs]);
            }
          } else {
            this.notifyError(res.message || 'فشل حفظ التقرير اليومي');
          }
        },
        error: (err) => {
          this.isSavingDailyLog.set(false);
          const msg = err.error?.message || 'خطأ أثناء حفظ التقرير اليومي';
          this.notifyError(msg);
        }
      });
  }

  // -------------------------------------------------------------
  // Punch List Methods
  // -------------------------------------------------------------
  openCreatePunchModal(): void {
    this.punchCreateTitle.set('');
    this.punchCreateSeverity.set('Medium');
    this.punchCreateTaskId.set('');
    this.punchCreateSubcontractor.set('');
    this.punchCreateNotes.set('');
    this.punchCreatePhotoUrl.set('');
    this.isCreatePunchModalOpen.set(true);
  }

  closeCreatePunchModal(): void {
    this.isCreatePunchModalOpen.set(false);
  }

  onUploadPunchPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploadingPunchPhoto.set(true);

    this.uploadService.uploadProjectGallery(this.projectId(), file, 'Defect Photo', 'SitePunchItem')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isUploadingPunchPhoto.set(false);
          if (res.success && res.data && res.data.url) {
            this.punchCreatePhotoUrl.set(res.data.url);
            this.notifySuccess('تم رفع صورة العيب بنجاح');
          } else {
            this.notifyError('تعذر رفع الصورة.');
          }
        },
        error: () => {
          this.isUploadingPunchPhoto.set(false);
          this.notifyError('فشل في رفع صورة العيب.');
        }
      });
  }

  submitCreatePunchItem(): void {
    const title = this.punchCreateTitle().trim();
    const photoUrl = this.punchCreatePhotoUrl().trim();

    if (!title) {
      this.notifyError('عنوان الملاحظة الفنية مطلوب.');
      return;
    }
    if (!photoUrl) {
      this.notifyError('صورة العيب الفني مطلوبة.');
      return;
    }

    this.isSavingPunchItem.set(true);

    const dto: SitePunchItemCreateDto = {
      projectId: this.projectId(),
      siteTaskId: this.punchCreateTaskId() || null,
      title,
      severity: this.punchCreateSeverity(),
      subcontractorName: this.punchCreateSubcontractor().trim() || null,
      defectPhotoUrl: photoUrl,
      engineerNotes: this.punchCreateNotes().trim() || null
    };

    this.siteService.createPunchItem(this.projectId(), dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isSavingPunchItem.set(false);
          if (res.success && res.data) {
            this.notifySuccess('تم تسجيل ملاحظة الاستلام بنجاح');
            this.closeCreatePunchModal();
            // Prepend new item to signal directly
            this.punchList.update(items => [res.data!, ...items]);
          } else {
            this.notifyError(res.message || 'فشل تسجيل الملاحظة');
          }
        },
        error: (err) => {
          this.isSavingPunchItem.set(false);
          const msg = err.error?.message || 'خطأ أثناء تسجيل الملاحظة';
          this.notifyError(msg);
        }
      });
  }

  openResolvePunchModal(item: SitePunchItemDto): void {
    this.selectedPunchItem.set(item);
    this.punchResolutionPhotoUrl.set(item.resolutionPhotoUrl || '');
    this.punchResolutionNotes.set(item.engineerNotes || '');
    this.isResolvePunchModalOpen.set(true);
  }

  closeResolvePunchModal(): void {
    this.isResolvePunchModalOpen.set(false);
    this.selectedPunchItem.set(null);
  }

  onUploadResolutionPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploadingResolutionPhoto.set(true);

    this.uploadService.uploadProjectGallery(this.projectId(), file, 'Resolution Proof', 'SitePunchResolution')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isUploadingResolutionPhoto.set(false);
          if (res.success && res.data && res.data.url) {
            this.punchResolutionPhotoUrl.set(res.data.url);
            this.notifySuccess('تم رفع صورة إثبات المعالجة بنجاح');
          } else {
            this.notifyError('تعذر رفع الصورة.');
          }
        },
        error: () => {
          this.isUploadingResolutionPhoto.set(false);
          this.notifyError('فشل في رفع صورة المعالجة.');
        }
      });
  }

  submitResolvePunchItem(): void {
    const item = this.selectedPunchItem();
    if (!item) return;

    const photoUrl = this.punchResolutionPhotoUrl().trim();
    if (!photoUrl) {
      this.notifyError('صورة إثبات المعالجة مطلوبة.');
      return;
    }

    this.isSavingPunchStatus.set(true);

    this.siteService.updatePunchItemStatus(item.id, {
      status: 'FixedPendingReview',
      resolutionPhotoUrl: photoUrl,
      engineerNotes: this.punchResolutionNotes().trim() || null
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        this.isSavingPunchStatus.set(false);
        if (res.success) {
          this.notifySuccess('تم تحديث حالة الملاحظة إلى (قيد الفحص)');
          this.closeResolvePunchModal();
          // In-place signal update
          this.punchList.update(items => items.map(p => {
            if (p.id === item.id) {
              return {
                ...p,
                status: 'FixedPendingReview',
                resolutionPhotoUrl: photoUrl,
                engineerNotes: this.punchResolutionNotes().trim() || p.engineerNotes
              };
            }
            return p;
          }));
        } else {
          this.notifyError(res.message || 'فشل تحديث الحالة');
        }
      },
      error: (err) => {
        this.isSavingPunchStatus.set(false);
        const msg = err.error?.message || 'خطأ أثناء تحديث الملاحظة';
        this.notifyError(msg);
      }
    });
  }

  approveAndClosePunch(item: SitePunchItemDto): void {
    if (!confirm(`هل أنت متأكد من رغبتك في اعتماد وإغلاق الملاحظة: "${item.title}" نهائياً؟`)) {
      return;
    }

    this.siteService.updatePunchItemStatus(item.id, {
      status: 'ApprovedAndClosed',
      resolutionPhotoUrl: item.resolutionPhotoUrl,
      engineerNotes: item.engineerNotes
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.notifySuccess('تم اعتماد وإغلاق الملاحظة بنجاح ✓');
          // In-place signal update
          this.punchList.update(items => items.map(p => {
            if (p.id === item.id) {
              return {
                ...p,
                status: 'ApprovedAndClosed',
                resolvedAt: new Date().toISOString()
              };
            }
            return p;
          }));
        } else {
          this.notifyError(res.message || 'فشل اعتماد وإغلاق الملاحظة');
        }
      },
      error: (err) => {
        const msg = err.error?.message || 'خطأ أثناء اعتماد وإغلاق الملاحظة';
        this.notifyError(msg);
      }
    });
  }

  getPunchSeverityClass(severity: string): string {
    switch (severity) {
      case 'Critical':
        return 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/90 text-white shadow-sm';
      case 'Medium':
        return 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/90 text-slate-950 shadow-sm';
      case 'Low':
      default:
        return 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/90 text-white shadow-sm';
    }
  }

  getPunchSeverityLabel(severity: string): string {
    switch (severity) {
      case 'Critical': return 'خطر / حرج';
      case 'Medium': return 'متوسط الخطورة';
      case 'Low': return 'منخفض الخطورة';
      default: return severity;
    }
  }

  getPunchStatusClass(status: string): string {
    switch (status) {
      case 'ApprovedAndClosed':
        return 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/90 text-white shadow-sm';
      case 'FixedPendingReview':
        return 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/90 text-slate-950 shadow-sm';
      case 'Open':
      default:
        return 'px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-600/90 text-white shadow-sm';
    }
  }

  getPunchStatusLabel(status: string): string {
    switch (status) {
      case 'ApprovedAndClosed': return 'معتمد ومغلق';
      case 'FixedPendingReview': return 'تم الإصلاح - قيد الفحص';
      case 'Open': return 'مفتوح للعمل';
      default: return status;
    }
  }

  openImagePreview(url: string): void {
    this.previewImageUrl.set(url);
  }

  closeImagePreview(): void {
    this.previewImageUrl.set(null);
  }

  // -------------------------------------------------------------
  // Task Management Methods
  // -------------------------------------------------------------
  openTaskAction(task: SiteTaskDto): void {
    this.selectedTask.set(task);
    this.actionProgress.set(task.progressPercentage);
    this.actionStatus = (task.status as SiteTaskStatus) || 'Pending';
    this.actionNotes = task.engineerNotes || '';
    this.actionAttachments.set([...(task.attachmentUrls || [])]);
    
    const existing = (task.linkedSettlementItems || []).map(i => ({
      settlementItemId: i.settlementItemId,
      allocatedAmount: i.allocatedAmount,
      expenseDescription: i.expenseDescription || ''
    }));
    this.actionAllocations.set(existing);

    this.isActionModalOpen.set(true);
  }

  closeActionModal(): void {
    this.isActionModalOpen.set(false);
    this.selectedTask.set(null);
  }

  openCreateModal(): void {
    this.createForm.reset({
      weight: 1.0,
      assignedEngineerId: this.engineers().length > 0 ? this.engineers()[0].id : '',
      title: '',
      description: '',
      plannedStartDate: '',
      plannedEndDate: ''
    });
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  onUploadAttachment(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.isUploading.set(true);

    this.uploadService.uploadProjectGallery(this.projectId(), file, this.selectedTask()?.title, 'SiteTaskAttachment')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isUploading.set(false);
          if (res.success && res.data && res.data.url) {
            this.actionAttachments.update(urls => [...urls, res.data!.url]);
            this.notifySuccess('تم رفع الصورة بنجاح');
          }
        },
        error: () => {
          this.isUploading.set(false);
          this.notifyError('فشل في رفع الصورة');
        }
      });
  }

  removeAttachment(index: number): void {
    this.actionAttachments.update(urls => urls.filter((_, i) => i !== index));
  }

  addNewSettlementAllocation(): void {
    const available = this.settlementLines();
    const defaultId = available.length > 0 ? available[0].id : '';
    this.actionAllocations.update(items => [
      ...items,
      { settlementItemId: defaultId, allocatedAmount: 0, expenseDescription: '' }
    ]);
  }

  removeSettlementAllocation(index: number): void {
    this.actionAllocations.update(items => items.filter((_, i) => i !== index));
  }

  saveTaskAction(): void {
    const task = this.selectedTask();
    if (!task) return;

    this.isSaving.set(true);

    const progressUpdate = {
      progressPercentage: this.actionProgress(),
      status: this.actionStatus,
      engineerNotes: this.actionNotes,
      attachmentUrls: this.actionAttachments()
    };

    this.siteService.updateTaskProgress(task.id, progressUpdate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (progRes) => {
          if (!progRes.success) {
            this.isSaving.set(false);
            this.notifyError(progRes.message || 'فشل تحديث نسبة الإنجاز');
            return;
          }

          const validAllocations = this.actionAllocations().filter(a => a.settlementItemId && a.allocatedAmount > 0);
          
          this.siteService.linkSettlementItems(task.id, { items: validAllocations })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (linkRes) => {
                this.isSaving.set(false);
                if (linkRes.success) {
                  this.notifySuccess('تم حفظ التحديثات بنجاح');
                  this.closeActionModal();
                  this.loadAllDataProactively(this.projectId());
                } else {
                  this.notifyError(linkRes.message || 'فشل في ربط بنود التسويات');
                }
              },
              error: (err) => {
                this.isSaving.set(false);
                const msg = err.error?.message || 'خطأ في تخصيص بنود التسويات';
                this.notifyError(msg);
              }
            });
        },
        error: (err) => {
          this.isSaving.set(false);
          const msg = err.error?.message || 'خطأ أثناء تحديث البند';
          this.notifyError(msg);
        }
      });
  }

  submitCreateTask(): void {
    if (this.createForm.invalid) return;

    this.isSaving.set(true);
    const formVal = this.createForm.value;

    const dto: SiteTaskCreateDto = {
      projectId: this.projectId(),
      assignedEngineerId: formVal.assignedEngineerId,
      title: formVal.title,
      description: formVal.description,
      weight: formVal.weight,
      plannedStartDate: formVal.plannedStartDate || null,
      plannedEndDate: formVal.plannedEndDate || null
    };

    this.siteService.createSiteTask(dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isSaving.set(false);
          if (res.success) {
            this.notifySuccess('تم إضافة البند التنفيذي بنجاح');
            this.closeCreateModal();
            this.loadAllDataProactively(this.projectId());
          } else {
            this.notifyError(res.message || 'فشل إنشاء البند');
          }
        },
        error: (err) => {
          this.isSaving.set(false);
          const msg = err.error?.message || 'تعذر حفظ البند';
          this.notifyError(msg);
        }
      });
  }

  copyPublicShareLink(): void {
    const token = this.publicShareToken();
    if (!token) return;

    const url = `${window.location.origin}/track/${token}`;
    navigator.clipboard.writeText(url).then(() => {
      this.notifySuccess('تم نسخ رابط متابعة العميل للحافظة بنجاح 📋');
    }).catch(() => {
      this.notifyInfo(`رابط العميل: ${url}`);
    });
  }

  formatTaskDate(dateStr?: string | null): string {
    if (!dateStr) return '—';
    const str = String(dateStr).trim();
    if (str.includes('/')) {
      const parts = str.split(' ')[0].split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${day}/${month}/${year}`;
      }
      return str.split(' ')[0];
    }
    const d = new Date(str);
    if (isNaN(d.getTime())) {
      return str.split('T')[0];
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'InProgress':
        return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'UnderReview':
        return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default:
        return 'px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Completed': return 'مكتمل';
      case 'InProgress': return 'قيد التنفيذ';
      case 'UnderReview': return 'قيد المراجعة';
      default: return 'معلق';
    }
  }
}
