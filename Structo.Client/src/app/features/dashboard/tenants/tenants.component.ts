
import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TenantsService } from '../../../core/services/tenants.service';
import { TenantDto } from '../../../core/services/public-directory.service';
import { ProjectDto } from '../../../core/models/project.models';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, TranslatePipe, FormsModule, DatePipe, DecimalPipe],
  template: `
    <div class="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            🛡️ {{ 'DASHBOARD.TENANTS_MGMT' | translate }}
          </h1>
          <p class="text-sm text-slate-400 mt-1 font-cairo">إدارة شؤون الشركات، تعليق الحسابات، مراجعة السعات التخزينية ومراقبة التعليقات العامة.</p>
        </div>
      </div>

      <!-- Quick Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">إجمالي الشركات / Total Companies</span>
          <h3 class="text-3xl font-extrabold text-white mt-1">{{ tenants().length }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">الشركات النشطة / Active Companies</span>
          <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">{{ activeCount() }}</h3>
        </div>
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">الحسابات المعلقة / Suspended Accounts</span>
          <h3 class="text-3xl font-extrabold text-rose-400 mt-1">{{ suspendedCount() }}</h3>
        </div>
      </div>

      <!-- Error & Success Alerts -->
      @if (errorMessage()) {
        <div class="bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl p-4 text-sm font-semibold flex items-center justify-between">
          <span>{{ errorMessage() }}</span>
          <button (click)="errorMessage.set(null)" class="text-rose-400 hover:text-rose-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }
      @if (successMessage()) {
        <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl p-4 text-sm font-semibold flex items-center justify-between">
          <span>{{ successMessage() }}</span>
          <button (click)="successMessage.set(null)" class="text-emerald-400 hover:text-emerald-300">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      }

      <!-- Datatable -->
      <div class="bg-slate-900/20 border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
        <div class="px-6 py-4 border-b border-slate-850 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h3 class="text-base font-bold text-white font-cairo">سجل الشركات والمؤسسات</h3>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="بحث باسم الشركة أو الموقع..."
            class="px-4 py-2 border border-slate-800 bg-slate-950 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 w-full sm:w-64 transition-all">
        </div>

        @if (isLoading()) {
          <div class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full text-left rtl:text-right">
              <thead>
                <tr class="border-b border-slate-850 text-slate-500 text-xs font-bold uppercase tracking-wider font-cairo bg-slate-900/10">
                  <th class="px-6 py-4">الشركة / Tenant Name</th>
                  <th class="px-6 py-4">معرف الشركة / Tenant ID</th>
                  <th class="px-6 py-4">الاشتراك / Plan</th>
                  <th class="px-6 py-4">الموقع / Location</th>
                  <th class="px-6 py-4">تاريخ الانضمام / Created</th>
                  <th class="px-6 py-4">حالة الحساب / Status</th>
                  <th class="px-6 py-4 text-center">التحكم والعمليات / Controls</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-850 text-slate-300 text-xs">
                @for (tenant of filteredTenants(); track tenant.id) {
                  <tr class="hover:bg-slate-900/30 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        @if (tenant.logoUrl) {
                          <img [src]="tenant.logoUrl" class="w-8 h-8 rounded-lg object-cover">
                        } @else {
                          <div class="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold text-xs uppercase">{{ tenant.name.substring(0,2) }}</div>
                        }
                        <span class="font-bold text-white text-sm">{{ tenant.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-[10px] text-slate-500 select-all">{{ tenant.id }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.subscriptionPlan === 'Premium') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/25">Premium</span>
                      } @else if (tenant.subscriptionPlan === 'Standard') {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">Standard</span>
                      } @else {
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700/60">Free</span>
                      }
                    </td>
                    <td class="px-6 py-4 font-cairo font-semibold text-slate-400">{{ tenant.region || 'غير محدد' }}</td>
                    <td class="px-6 py-4 text-slate-400 font-mono">{{ tenant.createdAt | date:'dd/MM/yyyy' }}</td>
                    <td class="px-6 py-4">
                      @if (tenant.status === 'Active') {
                        <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25">Active</span>
                      } @else if (tenant.status === 'Suspended') {
                        <span class="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 font-bold border border-rose-500/25">🚫 Suspended</span>
                      } @else {
                        <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25">{{ tenant.status }}</span>
                      }
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <!-- Toggle Status -->
                        <button
                          (click)="toggleStatus(tenant.id)"
                          [disabled]="isTogglingId() === tenant.id"
                          class="px-2.5 py-1.5 rounded-xl text-[10px] font-bold font-cairo transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1 border"
                          [class.bg-rose-950/20]="tenant.status === 'Active'"
                          [class.text-rose-400]="tenant.status === 'Active'"
                          [class.border-rose-900/30]="tenant.status === 'Active'"
                          [class.hover:bg-rose-900/30]="tenant.status === 'Active'"
                          [class.bg-emerald-950/20]="tenant.status === 'Suspended'"
                          [class.text-emerald-400]="tenant.status === 'Suspended'"
                          [class.border-emerald-900/30]="tenant.status === 'Suspended'"
                          [class.hover:bg-emerald-900/30]="tenant.status === 'Suspended'">
                          @if (isTogglingId() === tenant.id) {
                            <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          } @else {
                            {{ tenant.status === 'Active' ? 'تعليق / Suspend' : 'تفعيل / Activate' }}
                          }
                        </button>

                        <!-- Inspect / Profile -->
                        <button
                          (click)="inspectTenant(tenant)"
                          class="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-indigo-400 border border-indigo-900/30 rounded-xl text-[10px] font-bold font-cairo transition-all duration-200 active:scale-95 cursor-pointer">
                          فحص الحساب / Inspect
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-slate-500 text-sm font-cairo">لا توجد شركات مسجلة في المنصة حالياً.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>

    <!-- MODAL: INSPECT TENANT / PLATFORM GOVERNANCE ROOM -->
    @if (selectedTenant()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div (click)="closeInspector()" class="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"></div>

        <!-- Modal container -->
        <div class="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl shadow-black/80 z-10 max-h-[85vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-start justify-between mb-6 border-b border-slate-800 pb-4">
            <div>
              <span class="text-[10px] font-bold text-indigo-400 tracking-wider uppercase font-cairo">Platform Audit & Moderation Control</span>
              <h3 class="text-xl font-bold text-white font-cairo mt-1">
                {{ selectedTenant()!.name }}
              </h3>
            </div>
            <button
              (click)="closeInspector()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- Loading Inspector Data -->
          @if (isLoadingAudit()) {
            <div class="flex justify-center items-center py-12">
              <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
          } @else if (auditProfile()) {
            <div class="space-y-6 font-sans">
              <!-- Audit Stats Cards -->
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                  <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">عدد المشاريع</span>
                  <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().totalProjectsCount }}</div>
                </div>
                <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                  <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">المستخدمين النشطين</span>
                  <div class="text-xl font-bold text-slate-200 mt-0.5">{{ auditProfile().activeUserCount }}</div>
                </div>
                <div class="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                  <span class="text-[10px] text-slate-500 uppercase tracking-wider font-cairo">التقييم العام</span>
                  <div class="text-xl font-bold text-amber-400 mt-0.5">⭐ {{ auditProfile().globalRatingScore | number:'1.1-1' }}</div>
                </div>
              </div>

              <!-- Storage Metric Bar -->
              <div class="bg-slate-950/40 border border-slate-850 rounded-xl p-4.5 space-y-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-slate-400 font-cairo font-bold">💾 السعة التخزينية المستخدمة / Storage Metrics</span>
                  <span class="font-mono text-indigo-400 font-bold">{{ auditProfile().storageUsedMb }} MB / 100 MB</span>
                </div>
                <div class="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                  <div class="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    [style.width.%]="storagePercentage()">
                  </div>
                </div>
                <div class="flex justify-between items-center text-[10px] text-slate-500 font-cairo">
                  <span>تم احتسابها من ملفات المقايسات المرفوعة والعهدة.</span>
                  <span>نسبة الاستهلاك: {{ storagePercentage() | number:'1.0-0' }}%</span>
                </div>
              </div>

              <!-- Review Moderation Hub -->
              <div class="space-y-3.5">
                <span class="text-xs font-bold text-indigo-400 font-cairo uppercase tracking-wider block border-b border-slate-800 pb-2">
                  ✍️ مراجعة التقييمات العامة والتعليقات / Review Moderation Hub
                </span>
                
                <div class="space-y-3 max-h-[30vh] overflow-y-auto pr-2">
                  @for (project of moderatedProjects(); track project.id) {
                    <div class="bg-slate-950/65 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <span class="text-xs font-bold text-white">{{ project.name }}</span>
                          <span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-bold border border-slate-800">⭐ {{ project.clientRating }}</span>
                        </div>
                        <p class="text-xs text-slate-400 font-cairo font-medium">العميل: {{ project.clientName || 'غير مسجل' }}</p>
                        <p class="text-[11px] text-slate-300 italic bg-slate-900/30 rounded p-2 border border-slate-850/60 font-cairo mt-1.5">{{ project.clientReviewNotes || 'لم يكتب تعليقاً نصياً' }}</p>
                      </div>

                      <div class="shrink-0 flex items-center gap-2 self-end sm:self-center">
                        @if (project.isReviewHidden) {
                          <span class="text-[10px] font-bold text-rose-400 bg-rose-950/20 border border-rose-900/30 px-2 py-0.5 rounded font-cairo">مخفي / Hidden</span>
                        } @else {
                          <span class="text-[10px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded font-cairo">نشط / Visible</span>
                        }
                        
                        <button
                          (click)="toggleReview(project)"
                          [disabled]="isModeratingId() === project.id"
                          class="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:text-white rounded-xl text-[10px] font-bold font-cairo cursor-pointer active:scale-95 transition-all flex items-center gap-1">
                          @if (isModeratingId() === project.id) {
                            <svg class="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          } @else {
                            {{ project.isReviewHidden ? 'إظهار / Show' : 'حجب / Hide' }}
                          }
                        </button>
                      </div>
                    </div>
                  } @empty {
                    <p class="text-xs text-slate-500 text-center font-cairo py-6 bg-slate-950/30 rounded-xl border border-slate-850">لا توجد تقييمات مكتوبة مسجلة لهذه الشركة بعد.</p>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `
})
export class TenantsComponent implements OnInit {
  private readonly tenantsService = inject(TenantsService);

  readonly tenants = signal<TenantDto[]>([]);
  readonly isLoading = signal(false);
  readonly isTogglingId = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Search & Filter
  searchQuery = '';

  // Inspector Panel / Audit State
  readonly selectedTenant = signal<TenantDto | null>(null);
  readonly auditProfile = signal<any | null>(null);
  readonly isLoadingAudit = signal(false);
  readonly moderatedProjects = signal<ProjectDto[]>([]);
  readonly isModeratingId = signal<string | null>(null);

  // Computed signals
  readonly filteredTenants = computed(() => {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) return this.tenants();
    return this.tenants().filter(t =>
      t.name.toLowerCase().includes(query) ||
      (t.region && t.region.toLowerCase().includes(query)) ||
      t.id.toLowerCase().includes(query)
    );
  });

  readonly activeCount = computed(() => this.tenants().filter(t => t.status === 'Active').length);
  readonly suspendedCount = computed(() => this.tenants().filter(t => t.status === 'Suspended').length);

  readonly storagePercentage = computed(() => {
    const profile = this.auditProfile();
    if (!profile) return 0;
    const pct = (profile.storageUsedMb / 100) * 100;
    return Math.min(Math.max(pct, 2), 100); // keep visual bar between 2% and 100%
  });

  ngOnInit(): void {
    this.fetchTenants();
  }

  fetchTenants(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.tenantsService.getAllTenants().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success && res.data) {
          this.tenants.set(res.data);
        } else {
          this.errorMessage.set(res.message || 'Failed to fetch tenants.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error loading companies list.');
      }
    });
  }

  toggleStatus(id: string): void {
    this.isTogglingId.set(id);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.tenantsService.toggleTenantStatus(id).subscribe({
      next: (res) => {
        this.isTogglingId.set(null);
        if (res.success) {
          this.successMessage.set(res.message || 'Status updated successfully.');
          this.fetchTenants();
        } else {
          this.errorMessage.set(res.message || 'Failed to toggle status.');
        }
      },
      error: (err) => {
        this.isTogglingId.set(null);
        this.errorMessage.set(err.error?.message || 'Error occurred toggling company status.');
      }
    });
  }

  inspectTenant(tenant: TenantDto): void {
    this.selectedTenant.set(tenant);
    this.isLoadingAudit.set(true);
    this.auditProfile.set(null);
    this.moderatedProjects.set([]);

    // Fetch audit profile stats
    this.tenantsService.getTenantAuditProfile(tenant.id).subscribe({
      next: (res) => {
        if (res.success) {
          this.auditProfile.set(res.data);
        }
      },
      complete: () => {
        this.isLoadingAudit.set(false);
      }
    });

    // Fetch projects for review moderation
    this.tenantsService.getTenantProjects(tenant.id).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // Filter projects that have clientReviewNotes to populate moderation list
          this.moderatedProjects.set(res.data.filter(p => !!p.clientReviewNotes));
        }
      }
    });
  }

  closeInspector(): void {
    this.selectedTenant.set(null);
    this.auditProfile.set(null);
    this.moderatedProjects.set([]);
  }

  toggleReview(project: ProjectDto): void {
    this.isModeratingId.set(project.id);
    this.tenantsService.toggleReviewVisibility(project.id).subscribe({
      next: (res) => {
        this.isModeratingId.set(null);
        if (res.success) {
          // Toggle local state
          const updated = this.moderatedProjects().map(p =>
            p.id === project.id ? { ...p, isReviewHidden: !p.isReviewHidden } : p
          );
          this.moderatedProjects.set(updated);
        }
      },
      error: () => {
        this.isModeratingId.set(null);
      }
    });
  }
}
