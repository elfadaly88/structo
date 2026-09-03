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
                  Site Execution
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1">
                تتبع بنود الموقع التنفيذية، نسب الإنجاز المرجحة، وتخصيص بنود التسويات المعتمدة
              </p>
            </div>
          </div>

          <!-- Actions: Add Task & Copy Share Link -->
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

            @if (canManageTasks()) {
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
          </div>
        </div>

        <!-- Weighted Progress KPI Card -->
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
              <span>مجموع الأوزان النسبية: {{ totalWeight() | number:'1.1-2' }}</span>
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

      <!-- Main Tasks Table View -->
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

                    <!-- Progress Bar & Status Badge -->
                    <td class="py-3.5 px-4">
                      <div class="flex items-center justify-between text-xs font-mono font-bold mb-1">
                        <span [ngClass]="getStatusBadgeClass(task.status)">
                          {{ getStatusLabel(task.status) }}
                        </span>
                        <span [class.text-emerald-400]="task.progressPercentage === 100" [class.text-indigo-300]="task.progressPercentage < 100">
                          {{ task.progressPercentage }}%
                        </span>
                      </div>
                      <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          class="h-full rounded-full transition-all duration-300"
                          [ngClass]="{
                            'bg-slate-600': task.progressPercentage === 0,
                            'bg-indigo-500': task.progressPercentage > 0 && task.progressPercentage < 50,
                            'bg-amber-500': task.progressPercentage >= 50 && task.progressPercentage < 100,
                            'bg-emerald-500': task.progressPercentage === 100
                          }"
                          [style.width.%]="task.progressPercentage">
                        </div>
                      </div>
                    </td>

                    <!-- Linked Settlements Total -->
                    <td class="py-3.5 px-3 text-center">
                      @if (task.totalAllocatedExpenses > 0) {
                        <div class="font-mono font-bold text-amber-400 text-xs">
                          {{ task.totalAllocatedExpenses | number:'1.0-0' }} ج.م
                        </div>
                        <span class="text-[10px] text-slate-500">
                          ({{ task.linkedSettlementItems.length }} بنود)
                        </span>
                      } @else {
                        <span class="text-slate-600 text-xs">—</span>
                      }
                    </td>

                    <!-- Attachments Thumbnails -->
                    <td class="py-3.5 px-3 text-center">
                      @if (task.attachmentUrls && task.attachmentUrls.length > 0) {
                        <div class="flex items-center justify-center -space-x-1.5 rtl:space-x-reverse overflow-hidden">
                          @for (url of task.attachmentUrls.slice(0, 3); track url) {
                            <a [href]="url" target="_blank" class="block w-7 h-7 rounded-lg border border-slate-700 overflow-hidden shrink-0 hover:scale-110 transition-transform">
                              <img [src]="url" alt="إثبات" class="w-full h-full object-cover" />
                            </a>
                          }
                          @if (task.attachmentUrls.length > 3) {
                            <span class="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center justify-center">
                              +{{ task.attachmentUrls.length - 3 }}
                            </span>
                          }
                        </div>
                      } @else {
                        <span class="text-slate-600 text-xs">لا يوجد</span>
                      }
                    </td>

                    <!-- Action Button -->
                    <td class="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        (click)="openTaskAction(task)"
                        class="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer shadow-sm">
                        تحديث / ربط
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      <!-- ============================================================ -->
      <!-- 🚀 MODAL 1: Task Action Modal (Zero Network Lag via Signals)  -->
      <!-- ============================================================ -->
      @if (isActionModalOpen() && selectedTask()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            
            <!-- Modal Header -->
            <div class="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
              <div>
                <h3 class="text-base sm:text-lg font-bold text-white">
                  إجراء وتحديث: {{ selectedTask()!.title }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  المهندس المسند: {{ selectedTask()!.assignedEngineerName }}
                </p>
              </div>
              <button
                type="button"
                (click)="closeActionModal()"
                class="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                ✕
              </button>
            </div>

            <!-- Modal Body (Independent Scrollable Container) -->
            <div class="p-4 sm:p-6 overflow-y-auto min-h-0 space-y-6 text-right">
              
              <!-- 1. Quick Progress Buttons -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-2">
                  نسبة الإنجاز الميداني: <span class="text-indigo-400 font-mono text-sm">{{ actionProgress() }}%</span>
                </label>
                <div class="grid grid-cols-5 gap-2">
                  @for (pct of [0, 25, 50, 75, 100]; track pct) {
                    <button
                      type="button"
                      (click)="actionProgress.set(pct)"
                      [class.bg-indigo-600]="actionProgress() === pct"
                      [class.text-white]="actionProgress() === pct"
                      [class.border-indigo-500]="actionProgress() === pct"
                      [class.bg-slate-950]="actionProgress() !== pct"
                      [class.text-slate-300]="actionProgress() !== pct"
                      class="py-2.5 rounded-xl border border-slate-800 font-mono font-bold text-xs hover:border-indigo-500 transition-all cursor-pointer">
                      {{ pct }}%
                    </button>
                  }
                </div>
                <!-- Custom Slider -->
                <input
                  type="range"
                  min="0"
                  max="100"
                  [value]="actionProgress()"
                  (input)="actionProgress.set(+$any($event.target).value)"
                  class="w-full mt-3 accent-indigo-500 cursor-pointer" />
              </div>

              <!-- 2. Status Selection -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">حالة البند</label>
                <select
                  [(ngModel)]="actionStatus"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                  <option value="Pending">معلق (Pending)</option>
                  <option value="InProgress">قيد التنفيذ (In Progress)</option>
                  <option value="UnderReview">قيد المراجعة والاستلام (Under Review)</option>
                  <option value="Completed">مكتمل ومعتمد (Completed)</option>
                </select>
              </div>

              <!-- 3. Engineer Notes -->
              <div>
                <label class="block text-xs font-bold text-slate-300 mb-1.5">ملاحظات المهندس الميدانية</label>
                <textarea
                  [(ngModel)]="actionNotes"
                  rows="2"
                  placeholder="سجل ملاحظات التنفيذ أو أسباب أي تأخير..."
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none">
                </textarea>
              </div>

              <!-- 4. Photo Proof Attachments -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-bold text-slate-300">صور إثبات الإنجاز الميداني</label>
                  <label class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold cursor-pointer transition-all">
                    <span>+ رفع صورة من الموقع</span>
                    <input type="file" accept="image/*" class="hidden" (change)="onUploadAttachment($event)" [disabled]="isUploading()" />
                  </label>
                </div>

                @if (isUploading()) {
                  <div class="text-center py-3 text-xs text-indigo-400 font-bold animate-pulse">
                    جاري رفع الصورة إلى الموقع...
                  </div>
                }

                @if (actionAttachments().length > 0) {
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    @for (url of actionAttachments(); track url; let idx = $index) {
                      <div class="relative group rounded-xl overflow-hidden border border-slate-800 aspect-square">
                        <img [src]="url" alt="إثبات" class="w-full h-full object-cover" />
                        <button
                          type="button"
                          (click)="removeAttachment(idx)"
                          class="absolute top-1 left-1 p-1 rounded-lg bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                          ✕
                        </button>
                      </div>
                    }
                  </div>
                } @else {
                  <p class="text-[11px] text-slate-500 text-center py-2">لا توجد صور مرفقة حتى الآن لهذا البند.</p>
                }
              </div>

              <!-- 5. Settlement Lines Linkage Section -->
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

                <!-- Assigned Engineer (Strict Wall with Owner-Operated Support) -->
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
                    <option value="" disabled>-- اختر مهندساً مسنداً أو المالك --</option>
                    @for (eng of engineers(); track eng.id) {
                      <option [value]="eng.id">
                        {{ eng.fullName }} @if (eng.isOwner || eng.role === 'TenantOwner') { (مالك المنشأة / مدير تنفيذي) } @else { ({{ getRoleArabic(eng.role) }}) }
                      </option>
                    }
                  </select>
                  @if (hasNoExternalEngineers() && engineers().length > 0) {
                    <p class="text-indigo-300/80 text-[10px] mt-1.5 flex items-center gap-1 font-cairo">
                      <span>💡</span>
                      <span>المشروع يدار ذاتياً بواسطة مالك المنشأة (تم اختياره تلقائياً كمسؤول افتراضي).</span>
                    </p>
                  } @else if (engineers().length === 0) {
                    <p class="text-amber-400 text-[10px] mt-1 font-cairo">
                      ⚠️ لا يوجد مهندسون مسندون أو مالك متاح لهذا المشروع حالياً.
                    </p>
                  }
                </div>

                <!-- Weight -->
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">
                    الوزن النسبي للبند في المشروع (Weight) <span class="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    formControlName="weight"
                    step="0.1"
                    min="0.1"
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500" />
                  <p class="text-[10px] text-slate-500 mt-1">
                    يستخدم لاحتساب نسبة إنجاز المشروع كمتوسط مرجح (مثال: 1.0 للبند العادي، 2.5 للبند الأكبر تأثيراً).
                  </p>
                </div>

                <!-- Planned Dates -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1.5">تاريخ البدء المخطط</label>
                    <input
                      type="date"
                      formControlName="plannedStartDate"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1.5">تاريخ الانتهاء المخطط</label>
                    <input
                      type="date"
                      formControlName="plannedEndDate"
                      class="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-xs font-bold text-slate-300 mb-1.5">وصف ونطاق البند</label>
                  <textarea
                    formControlName="description"
                    rows="2"
                    placeholder="مواصفات التنفيذ والمعايير المطلوبة..."
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none">
                  </textarea>
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
                  {{ isSaving() ? 'جاري الحفظ...' : 'إنشاء البند' }}
                </button>
              </div>
            </form>

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

  // Core Signals
  readonly projectId = signal<string>('');
  readonly projectName = signal<string>('');
  readonly publicShareToken = signal<string | null>(null);
  readonly weightedProgress = signal<number>(0);
  readonly totalWeight = signal<number>(0);
  readonly tasks = signal<SiteTaskDto[]>([]);
  readonly engineers = signal<AssignedEngineerDto[]>([]);
  readonly settlementLines = signal<AvailableSettlementLineDto[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly isSaving = signal<boolean>(false);
  readonly isUploading = signal<boolean>(false);

  // Filters & Selection
  readonly selectedStatusFilter = signal<string>('All');
  readonly selectedTask = signal<SiteTaskDto | null>(null);

  // Modal State Signals
  readonly isActionModalOpen = signal<boolean>(false);
  readonly isCreateModalOpen = signal<boolean>(false);

  // Action Modal Local Form Fields (Signals for instant interaction)
  readonly actionProgress = signal<number>(0);
  actionStatus: SiteTaskStatus = 'Pending';
  actionNotes: string = '';
  readonly actionAttachments = signal<string[]>([]);
  readonly actionAllocations = signal<LinkSettlementItemEntryDto[]>([]);

  // Create Form
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

  readonly hasNoExternalEngineers = computed(() => {
    return !this.engineers().some(e => !e.isOwner && e.role !== 'TenantOwner');
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

  // 🚀 Proactive Lifecycle Loading in ngOnInit
  private loadAllDataProactively(projId: string): void {
    this.isLoading.set(true);

    forkJoin({
      tasksRes: this.siteService.getProjectSiteTasks(projId),
      engineersRes: this.siteService.getAssignedEngineers(projId),
      settlementsRes: this.siteService.getAvailableSettlementItems(projId)
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: ({ tasksRes, engineersRes, settlementsRes }) => {
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
        this.isLoading.set(false);
      },
      error: () => {
        this.notifyError('تعذر جلب بيانات الموقع التنفيذية');
        this.isLoading.set(false);
      }
    });
  }

  // 🚀 Instant Modal Interaction reading local Signal
  openTaskAction(task: SiteTaskDto): void {
    this.selectedTask.set(task);
    this.actionProgress.set(task.progressPercentage);
    this.actionStatus = (task.status as SiteTaskStatus) || 'Pending';
    this.actionNotes = task.engineerNotes || '';
    this.actionAttachments.set([...(task.attachmentUrls || [])]);
    
    // Populate existing settlement allocations
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
    let defaultAssigneeId = '';
    const engList = this.engineers();
    if (engList.length > 0) {
      // If external engineers exist, prefer them; otherwise select Owner
      const externalEng = engList.find(e => !e.isOwner && e.role !== 'TenantOwner');
      defaultAssigneeId = externalEng ? externalEng.id : engList[0].id;
    }

    this.createForm.reset({
      title: '',
      assignedEngineerId: defaultAssigneeId,
      weight: 1.0,
      plannedStartDate: '',
      plannedEndDate: '',
      description: ''
    });
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  // Photo Attachment Upload
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

    // 1. Update Progress & Attachments
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

          // 2. Link Settlement Items if any
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

  formatSafeDate(dateStr?: string | null): string {
    return this.formatTaskDate(dateStr);
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
