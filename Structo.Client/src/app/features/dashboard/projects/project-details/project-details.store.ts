import { Injectable, inject, signal, computed, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../../../core/services/project.service';
import { PettyCashService } from '../../../../core/services/petty-cash.service';
import { FinancialService } from '../../../../core/services/financial.service';
import { ProjectDto, ProjectCashPoolDto, ProjectReconciliationReportDto, ProjectMemberDto, CloseoutDisposition, FinalCloseoutRequestDto } from '../../../../core/models/project.models';
import { PettyCashMobileDto, PettyCashSettleDto } from '../../../../core/models/petty-cash.models';
import { FinancialTransactionMobileDto, SettlementMobileDto } from '../../../../core/models/financial.models';
import { ImageUploadService, SitePhotoDto } from '../../../../core/services/image-upload.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ConfirmModalService } from '../../../../core/services/confirm-modal.service';
import { TenantProfileService } from '../../../../core/services/tenant-profile.service';
import { TenantUserService, UserDto } from '../../../../core/services/tenant-user.service';
import { SettlementService } from '../../../../core/services/settlement.service';
import { OfflineSyncService } from '../../../../core/services/offline-sync.service';
import { WhatsAppLinkService } from '../../../../core/services/whatsapp-link.service';
import { ProjectCloseoutService } from '../../../../core/services/project-closeout.service';
import { LanguageService } from '../../../../core/services/language.service';
import { FinancialReportService } from '../../../../core/services/financial-report.service';
import { ProjectFullReportDto } from '../../../../core/models/financial-report.models';
import { TenantDto } from '../../../../core/services/public-directory.service';

/**
 * State and actions of the project details page. Provided by ProjectDetailsComponent, so every tab and
 * dialog component of one page shares the same instance (and a new page gets a fresh one).
 */
@Injectable()
export class ProjectDetailsStore {  readonly isHeaderCollapsed = signal<boolean>(
    typeof window !== 'undefined' ? localStorage.getItem('structo_project_header_collapsed') === 'true' : false
  );

  toggleHeaderCollapse(): void {
    const next = !this.isHeaderCollapsed();
    this.isHeaderCollapsed.set(next);
    try {
      localStorage.setItem('structo_project_header_collapsed', String(next));
    } catch (e) { }
  }

  readonly isTabInfoDismissed = signal(false);
  readonly activePrintSettlement = signal<SettlementMobileDto | null>(null);
  readonly activeTextInspection = signal<{ title: string; content: string; subtitle?: string } | null>(null);

  readonly isApproveModalOpen = signal(false);
  readonly selectedApprovePettyCash = signal<PettyCashMobileDto | null>(null);
  readonly selectedApprovePoolId = signal<string>('');

  readonly isRejectModalOpen = signal(false);
  readonly selectedRejectPettyCash = signal<PettyCashMobileDto | null>(null);
  readonly rejectionReasonText = signal<string>('');

  openApprovePettyCashModal(item: PettyCashMobileDto): void {
    this.selectedApprovePettyCash.set(item);
    const pools = this.cashPools();
    const validPool = pools.find(p => p.availableBalance >= item.amount) || pools[0];
    this.selectedApprovePoolId.set(validPool ? validPool.id : '');
    this.isApproveModalOpen.set(true);
  }

  closeApprovePettyCashModal(): void {
    this.isApproveModalOpen.set(false);
    this.selectedApprovePettyCash.set(null);
    this.selectedApprovePoolId.set('');
  }

  getSelectedPoolAvailableBalance(): number {
    const pool = this.cashPools().find(p => p.id === this.selectedApprovePoolId());
    return pool ? pool.availableBalance : 0;
  }

  submitApprovePettyCash(): void {
    const item = this.selectedApprovePettyCash();
    const poolId = this.selectedApprovePoolId();
    if (!item || !poolId) return;
    this.closeApprovePettyCashModal();
    this.onApprovePettyCashRequest(item, poolId);
  }

  openRejectPettyCashModal(item: PettyCashMobileDto): void {
    this.selectedRejectPettyCash.set(item);
    this.rejectionReasonText.set('');
    this.isRejectModalOpen.set(true);
  }

  closeRejectPettyCashModal(): void {
    this.isRejectModalOpen.set(false);
    this.selectedRejectPettyCash.set(null);
    this.rejectionReasonText.set('');
  }

  submitRejectPettyCash(): void {
    const item = this.selectedRejectPettyCash();
    const reason = this.rejectionReasonText().trim();
    if (!item) return;
    if (!reason) {
      this.confirmService.alert({
        title: 'سبب الرفض مطلوب',
        message: 'يرجى كتابة سبب رفض طلب العهدة لتوضيحه للموظف.',
        type: 'info'
      });
      return;
    }

    this.closeRejectPettyCashModal();
    this.executeRejectPettyCash(item, reason);
  }

  executeRejectPettyCash(item: PettyCashMobileDto, comments: string): void {
    this.isLoadingPettyCash.set(true);
    this.pettyCashService.rejectPettyCash(this.projectId, item.id, comments).subscribe({
      next: (res) => {
        this.isLoadingPettyCash.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: 'تم الرفض بنجاح',
            message: 'تم رفض طلب العهدة وتسجيل السبب وإرسال التنبيه للموظف.',
            type: 'success'
          });
          this.fetchPettyCash();
          this.onRunReconciliation();
        } else {
          this.confirmService.alert({
            title: 'فشل رفض العهدة',
            message: res.message || 'حدث خطأ أثناء رفض العهدة.',
            type: 'error'
          });
        }
      },
      error: (err) => {
        this.isLoadingPettyCash.set(false);
        this.confirmService.alert({
          title: 'خطأ في العملية',
          message: err.error?.message || err.message || 'فشلت عملية رفض العهدة.',
          type: 'error'
        });
      }
    });
  }

  openRejectionReasonModal(item: PettyCashMobileDto): void {
    const reasonText = item.comments && item.comments.trim() ? item.comments : 'لم يتم تسجيل سبب محدد للرفض.';
    const dateStr = item.issuedAt ? new Date(item.issuedAt).toLocaleString('en-GB') : '';
    const subtitle = `طلب عهدة: ${item.issuedTo || 'الموظف'} • ${item.amount.toLocaleString()} ج.م` + (dateStr ? ` • ${dateStr}` : '');
    this.openTextInspectionModal('سبب رفض طلب العهدة', reasonText, subtitle);
  }

  openTextInspectionModal(title: string, content: string, subtitle?: string): void {
    if (!content) return;
    this.activeTextInspection.set({ title, content, subtitle });
  }

  closeTextInspectionModal(): void {
    this.activeTextInspection.set(null);
  }

  openPettyCashReasonModal(item: PettyCashMobileDto): void {
    if (!item.reason) return;
    const dateStr = item.issuedAt ? new Date(item.issuedAt).toLocaleString('en-GB') : '';
    const subtitle = (item.issuedTo || 'Staff') + (dateStr ? ` • ${dateStr}` : '');
    this.openTextInspectionModal('البيان / السبب', item.reason, subtitle);
  }

  openTransactionInspectionModal(t: FinancialTransactionMobileDto): void {
    if (!t.description) return;
    const rawDate = t.transactionDate || t.paymentDate || t.createdAt;
    const dateStr = rawDate ? new Date(rawDate).toLocaleString('en-GB') : '';
    this.openTextInspectionModal('تفاصيل المعاملة المالية', t.description, dateStr);
  }

  printSettlement(item: any): void {
    const linesHtml = (item.lines || []).map((line: any, index: number) => `
      <tr style="border-bottom: 1px solid #e2e8f0; text-align: right;">
        <td style="padding: 10px;">${index + 1}</td>
        <td style="padding: 10px; font-weight: bold;">${line.description || line.invoiceNumber || '-'}</td>
        <td style="padding: 10px;">${line.category || 'عام'}</td>
        <td style="padding: 10px;">${line.expenseResponsibility === 'Company' || line.isBillableToClient === false ? 'خسارة شركة' : 'عميل'}</td>
        <td style="padding: 10px; font-weight: bold; color: #1e293b;">EGP ${Number(line.amount || 0).toLocaleString()}</td>
      </tr>
    `).join('');

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <title>تسوية عهدة - ${item.engineerName || item.submittedBy || item.issuedTo || 'مهندس'}</title>
        <style>
          body { font-family: 'Cairo', sans-serif, Tahoma; margin: 30px; color: #0f172a; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #6366f1; padding-bottom: 15px; margin-bottom: 20px; }
          .badge { padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; background: #ecfdf5; color: #059669; }
          .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px; }
          .stat-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
          th { background: #f1f5f9; padding: 10px; border-bottom: 2px solid #cbd5e1; text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h2 style="margin:0;">طلب تسوية عهدة معتمد</h2>
            <p style="margin:5px 0 0; color:#64748b; font-size:13px;">المهندس: <b>${item.engineerName || item.submittedBy || item.issuedTo || 'غير محدد'}</b> | البيان: ${item.notes || item.description || item.custodyReason || '-'}</p>
          </div>
          <div style="text-align:left;">
            <span class="badge">معتمد</span>
            <p style="margin:5px 0 0; font-size:12px; color:#64748b;">${new Date(item.settlementDate || item.date || item.submittedAt || item.createdAt || Date.now()).toLocaleDateString('ar-EG')}</p>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-box">
            <span style="font-size:11px; color:#64748b;">مبلغ العهدة المستلمة</span>
            <h3 style="margin:5px 0 0; color:#0f172a;">EGP ${Number(item.custodyAmount || 0).toLocaleString()}</h3>
          </div>
          <div class="stat-box">
            <span style="font-size:11px; color:#64748b;">إجمالي المصروف الفعلي</span>
            <h3 style="margin:5px 0 0; color:#d97706;">EGP ${Number(item.spentAmount || item.totalAmount || 0).toLocaleString()}</h3>
          </div>
          <div class="stat-box">
            <span style="font-size:11px; color:#64748b;">الفرق المتبقي / العجز</span>
            <h3 style="margin:5px 0 0; color:#2563eb;">EGP ${Number(item.difference ?? item.netDifference ?? 0).toLocaleString()}</h3>
          </div>
        </div>

        <h4 style="margin: 20px 0 5px;">تفاصيل الفواتير والبنود المصروفة</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>بيان البند / الفاتورة</th>
              <th>التصنيف</th>
              <th>جهة التحمل</th>
              <th>المبلغ</th>
            </tr>
          </thead>
          <tbody>
            ${linesHtml || '<tr><td colspan="5" style="text-align:center; padding:20px;">لا توجد بنود</td></tr>'}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 250);
  }

  printSettlementReport(s: SettlementMobileDto): void {
    this.printSettlement(s);
  }

  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly pettyCashService = inject(PettyCashService);
  private readonly financialService = inject(FinancialService);
  private readonly uploadService = inject(ImageUploadService);
  private readonly fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly confirmService = inject(ConfirmModalService);
  private readonly profileService = inject(TenantProfileService);
  private readonly settlementService = inject(SettlementService);
  private readonly offlineSync = inject(OfflineSyncService);
  private readonly whatsappLink = inject(WhatsAppLinkService);
  private readonly userService = inject(TenantUserService);
  private readonly projectCloseoutService = inject(ProjectCloseoutService);
  private readonly toastService = inject(ToastService);
  private readonly reportService = inject(FinancialReportService);
  readonly langService = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly reconciliationReport = signal<ProjectReconciliationReportDto | null>(null);
  readonly isCloseoutLoading = signal(false);
  readonly selectedDrilldown = signal<'unsettled' | 'refunds' | 'reimbursements' | null>(null);
  selectedReimbursementPool: { [key: string]: string } = {};
  selectedPettyCashPool: { [key: string]: string } = {};

  readonly isWhatsAppModalOpen = signal(false);
  readonly whatsAppPhone = signal('');
  readonly whatsAppCountryCode = signal('+20');
  readonly isCloseoutModalOpen = signal(false);
  readonly selectedDisposition = signal<CloseoutDisposition>('RefundToClient');

  readonly countryCodes = [
    { code: '+20', label: 'مصر (+20)', flag: '🇪🇬' },
    { code: '+966', label: 'السعودية (+966)', flag: '🇸🇦' },
    { code: '+971', label: 'الإمارات (+971)', flag: '🇦🇪' },
    { code: '+965', label: 'الكويت (+965)', flag: '🇰🇼' },
    { code: '+974', label: 'قطر (+974)', flag: '🇶🇦' },
    { code: '+968', label: 'عُمان (+968)', flag: '🇴🇲' },
    { code: '+973', label: 'البحرين (+973)', flag: '🇧🇭' },
    { code: '+962', label: 'الأردن (+962)', flag: '🇯🇴' },
  ];

  readonly unsettledCustodyList = computed(() =>
    this.pettyCashes().filter(pc => 
      !pc.isSettled && 
      pc.status !== 'Settled' && 
      pc.status !== 'Rejected' && 
      pc.status !== 'Pending' && 
      !pc.isReimbursement
    )
  );

  readonly unsettledCustodySum = computed(() =>
    this.unsettledCustodyList().reduce((sum, item) => sum + (item.amount || 0), 0)
  );

  readonly pendingRefundsList = computed(() =>
    this.settlements().filter(s => s.status === 'ApprovedPendingRefund')
  );

  readonly pendingRefundsSum = computed(() =>
    this.pendingRefundsList().reduce((sum, item) => sum + item.netDifference, 0)
  );

  readonly pendingReimbursementsList = computed(() =>
    this.pettyCashes().filter(pc => pc.status === 'Pending' && pc.isReimbursement)
  );

  readonly pendingReimbursementsSum = computed(() =>
    this.pendingReimbursementsList().reduce((sum, item) => sum + item.amount, 0)
  );

  readonly isSettlementLocked = computed(() => {
    const pc = this.selectedPettyCashForSettlement();
    if (!pc) return false;
    const sett = this.settlements().find(s => s.pettyCashId === pc.id);
    return !!sett && sett.status !== 'Draft' && sett.status !== 'Rejected';
  });

  readonly isEditPettyCashModalOpen = signal(false);
  readonly isEditingPettyCash = signal(false);
  selectedPettyCashToEdit: PettyCashMobileDto | null = null;
  readonly editPettyCashForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    reason: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly isEditTransactionModalOpen = signal(false);
  readonly isSavingTransaction = signal(false);
  selectedTransactionToEdit: FinancialTransactionMobileDto | null = null;
  readonly editTransactionForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly isReviseBudgetModalOpen = signal(false);
  readonly isRevisingBudget = signal(false);
  readonly budgetHistory = signal<any[]>([]);
  readonly isUploadingBoq = signal(false);
  selectedBoqFile: File | null = null;
  readonly reviseBudgetForm: FormGroup = this.fb.group({
    newBudget: [null, [Validators.required, Validators.min(0.01)]],
    reasonForChange: ['', [Validators.required, Validators.minLength(5)]],
    boqFileUrl: ['']
  });

  // Direct Disbursement signals & form
  readonly isDisburseModalOpen = signal(false);
  readonly isDisbursing = signal(false);
  readonly disburseErrors = signal<string[]>([]);
  readonly usersList = signal<any[]>([]); // To populate engineer select in direct disbursement
  readonly disburseForm: FormGroup = this.fb.group({
    userId: [null],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    sourcePoolId: [null, Validators.required],
    paymentMethod: ['Cash', Validators.required]
  });

  // Settlement signals & FormArray form
  readonly isSettlementModalOpen = signal(false);
  readonly isSubmittingSettlement = signal(false);
  readonly settlementErrors = signal<string[]>([]);
  readonly selectedPettyCashForSettlement = signal<PettyCashMobileDto | null>(null);
  readonly settlements = signal<SettlementMobileDto[]>([]);
  readonly isLoadingSettlements = signal(false);
  readonly activePreviewPhotoUrl = signal<string | null>(null);

  // Accordion card state for settlements
  expandedSettlements = new Set<string>();

  toggleExpand(id: string): void {
    if (this.expandedSettlements.has(id)) {
      this.expandedSettlements.delete(id);
    } else {
      this.expandedSettlements.add(id);
    }
    this.cdr.markForCheck();
  }

  isExpanded(id: string): boolean {
    return this.expandedSettlements.has(id);
  }

  expandAllSettlements(): void {
    this.settlements().forEach(s => this.expandedSettlements.add(s.id));
    this.cdr.markForCheck();
  }

  collapseAllSettlements(): void {
    this.expandedSettlements.clear();
    this.cdr.markForCheck();
  }

  readonly settlementForm: FormGroup = this.fb.group({
    lines: this.fb.array([])
  });

  get settlementLines(): FormArray {
    return this.settlementForm.get('lines') as FormArray;
  }

  addSettlementLine(): void {
    this.settlementLines.push(this.fb.group({
      category: ['Cement', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      invoiceUrl: [''],
      isBillableToClient: [true],
      uploading: [false],
      localPreviewUrl: ['']
    }));
  }

  removeSettlementLine(index: number): void {
    this.settlementLines.removeAt(index);
  }

  calculateSettlementTotal(): number {
    return this.settlementLines.controls.reduce((sum, control) => sum + (control.get('amount')?.value || 0), 0);
  }


  readonly currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  readonly isTenantOwner = this.authService.isTenantOwner;
  readonly isSuperAdmin = this.authService.isSuperAdmin;
  readonly isProjectManager = this.authService.isManager;
  readonly isAccountant = this.authService.isAccountant;
  readonly isOwnerOrAccountant = computed(() => ['tenantowner', 'accountant', 'manager', 'admin'].includes(this.currentUserRole().toLowerCase()));
  readonly isEngineer = this.authService.isEngineer;
  readonly canManageMembers = computed(() => this.isTenantOwner() || this.isProjectManager() || this.isSuperAdmin());
  readonly canManageFinancials = computed(() => this.isTenantOwner() || this.isProjectManager() || this.isAccountant() || this.isSuperAdmin());
  readonly canViewFinancialReports = computed(() => (this.isTenantOwner() || this.isAccountant() || this.isProjectManager()) && !this.isSuperAdmin());

  readonly tenantProfile = signal<TenantDto | null>(null);
  readonly isProjectReportModalOpen = signal(false);
  readonly isProjectReportLoading = signal(false);
  readonly projectReportData = signal<ProjectFullReportDto | null>(null);
  readonly projectReportError = signal<string | null>(null);
  readonly reportStartDate = signal<string>('');
  readonly reportEndDate = signal<string>('');
  readonly activePrintFullReport = signal<ProjectFullReportDto | null>(null);
  readonly reportActiveTab = signal<'summary' | 'transactions' | 'pettyCashes' | 'settlements'>('summary');


  readonly projectId = this.route.snapshot.paramMap.get('id') || '';
  readonly project = signal<ProjectDto | null>(null);

  readonly parsedClient = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        const client = JSON.parse(desc).client;
        // Normally a name string; tolerate an object ({ name }) from older/foreign data
        return typeof client === 'string' ? client : (client?.name ?? '');
      } catch (e) { }
    }
    return '';
  });

  readonly parsedBudget = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).budget || 0;
      } catch (e) { }
    }
    return 0;
  });

  readonly parsedDescription = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).description || '';
      } catch (e) { }
    }
    return desc || '';
  });

  readonly isPublicPortfolio = computed(() => {
    const proj = this.project();
    if (!proj) return false;
    if ((proj as any).isPublicPortfolio !== undefined) {
      return !!(proj as any).isPublicPortfolio;
    }
    if (proj.description && proj.description.startsWith('{')) {
      try {
        const parsed = JSON.parse(proj.description);
        return !!parsed.isPublicPortfolio || !!parsed.isPublic;
      } catch (e) { }
    }
    return false;
  });

  togglePublicVisibility(newValue: boolean): void {
    if (!this.isTenantOwner() && !this.isSuperAdmin()) return;
    const currentProj = this.project();
    if (!currentProj) return;

    this.projectSettingsForm.patchValue({ isPublicPortfolio: newValue });
    this.onProjectSettingsSubmit();
  }

  readonly boqFileDetails = computed(() => {
    const proj = this.project();
    if (!proj) return { fileUrl: '', fileName: '' };
    if ((proj as any).boqFileUrl) {
      return {
        fileUrl: (proj as any).boqFileUrl,
        fileName: (proj as any).boqFileName || 'المقايسة_المرجعية_للمشروع.pdf'
      };
    }
    if (proj.description && proj.description.startsWith('{')) {
      try {
        const parsed = JSON.parse(proj.description);
        return {
          fileUrl: parsed.boqFileUrl || '',
          fileName: parsed.boqFileName || 'المقايسة_المرجعية_للمشروع.pdf'
        };
      } catch (e) { }
    }
    return { fileUrl: '', fileName: '' };
  });

  readonly isUploadingBOQ = signal(false);
  readonly boqUploadError = signal<string | null>(null);

  onBOQFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (file.size > 10 * 1024 * 1024) {
      this.boqUploadError.set('حجم الملف يتجاوز الحد الأقصى المسموح به (10 ميجابايت).');
      return;
    }

    this.boqUploadError.set(null);
    this.isUploadingBOQ.set(true);

    this.uploadService.uploadProjectDocument(this.projectId, file).subscribe({
      next: (res: any) => {
        this.isUploadingBOQ.set(false);
        const uploadedUrl = res.data?.url || (typeof res.data === 'string' ? res.data : null);
        if (res.success && uploadedUrl) {
          this.updateProjectBOQReference(uploadedUrl, file.name);
        } else {
          this.boqUploadError.set('فشل رفع ملف المقايسة. يرجى المحاولة مرة أخرى.');
        }
      },
      error: () => {
        this.isUploadingBOQ.set(false);
        this.boqUploadError.set('حدث خطأ أثناء رفع ملف المقايسة.');
      }
    });
  }

  updateProjectBOQReference(fileUrl: string, fileName: string): void {
    const proj = this.project();
    if (!proj) return;

    let payloadObj: any = {};
    if (proj.description && proj.description.startsWith('{')) {
      try {
        payloadObj = JSON.parse(proj.description);
      } catch (e) { }
    } else {
      payloadObj = { description: proj.description || '' };
    }

    payloadObj.boqFileUrl = fileUrl;
    payloadObj.boqFileName = fileName;

    const updateDto = {
      name: proj.name,
      description: JSON.stringify(payloadObj),
      status: proj.status
    };

    this.projectService.updateProject(this.projectId, updateDto as any).subscribe({
      next: (res) => {
        if (res.success) {
          this.fetchProjectDetails();
        }
      }
    });
  }

  openDatePicker(picker: HTMLInputElement): void {
    if (picker && typeof picker.showPicker === 'function') {
      picker.showPicker();
    } else if (picker) {
      picker.click();
    }
  }

  formatDisplayDate(rawVal: any): string {
    if (!rawVal) return '';
    if (typeof rawVal === 'string') {
      const trimmed = rawVal.trim();
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
        return trimmed;
      }
      if (trimmed.includes('-')) {
        const parts = trimmed.split('T')[0].split('-');
        if (parts.length === 3) {
          const [yyyy, mm, dd] = parts;
          return `${dd}/${mm}/${yyyy}`;
        }
      }
    }
    if (rawVal instanceof Date && !isNaN(rawVal.getTime())) {
      const dd = String(rawVal.getDate()).padStart(2, '0');
      const mm = String(rawVal.getMonth() + 1).padStart(2, '0');
      const yyyy = rawVal.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    return String(rawVal);
  }

  onNativeDatePicked(event: Event, fieldName: string, formGroup: FormGroup): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      formGroup.get(fieldName)?.setValue(input.value);
    }
  }

  onDateInputChanged(event: Event, fieldName: string, formGroup: FormGroup): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    const val = input.value.trim();
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
      const [dd, mm, yyyy] = val.split('/');
      const isoDate = `${yyyy}-${mm}-${dd}`;
      formGroup.get(fieldName)?.setValue(isoDate);
    } else if (val === '') {
      formGroup.get(fieldName)?.setValue('');
    }
  }

  // Lightbox Viewer State
  readonly lightboxPhotos = signal<string[]>([]);
  readonly activeLightboxIndex = signal<number>(0);
  readonly isLightboxOpen = signal<boolean>(false);

  openLightbox(photos: any[], startIndex: number = 0, event?: Event): void {
    if (event) event.stopPropagation();
    if (!photos || photos.length === 0) return;

    const urls = photos.map(p => typeof p === 'string' ? p : p.photoUrl).filter(Boolean);
    if (urls.length === 0) return;

    this.lightboxPhotos.set(urls);
    this.activeLightboxIndex.set(startIndex);
    this.isLightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.isLightboxOpen.set(false);
    this.lightboxPhotos.set([]);
    this.activeLightboxIndex.set(0);
  }

  nextLightboxPhoto(): void {
    const photos = this.lightboxPhotos();
    if (photos.length === 0) return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() + 1) % photos.length);
  }

  prevLightboxPhoto(): void {
    const photos = this.lightboxPhotos();
    if (photos.length === 0) return;
    this.activeLightboxIndex.set((this.activeLightboxIndex() - 1 + photos.length) % photos.length);
  }

  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.isLightboxOpen()) {
      if (event.key === 'Escape') {
        this.closeLightbox();
      } else if (event.key === 'ArrowRight') {
        this.nextLightboxPhoto();
      } else if (event.key === 'ArrowLeft') {
        this.prevLightboxPhoto();
      }
    }
  }


  readonly pettyCashes = signal<PettyCashMobileDto[]>([]);
  readonly transactions = signal<FinancialTransactionMobileDto[]>([]);
  readonly cashPools = signal<ProjectCashPoolDto[]>([]);

  readonly isLoadingProject = signal(false);
  readonly isLoadingPettyCash = signal(false);
  readonly isLoadingTransactions = signal(false);

  readonly activeTab = signal<'petty-cash' | 'transactions' | 'gallery' | 'admin-settings' | 'settlements' | 'closeout' | 'members'>('petty-cash');

  // Project Members Signals & Methods
  readonly projectMembers = signal<ProjectMemberDto[]>([]);
  readonly isLoadingMembers = signal(false);
  readonly isAddMemberModalOpen = signal(false);
  readonly isSavingMembers = signal(false);
  readonly removingMemberUserId = signal<string | null>(null);
  readonly selectedMemberUserIds = signal<string[]>([]);
  readonly availableCompanyUsers = signal<UserDto[]>([]);
  readonly isLoadingCompanyUsers = signal(false);

  readonly unassignedCompanyUsers = computed(() => {
    const memberUserIds = new Set(this.projectMembers().map(m => m.userId));
    return this.availableCompanyUsers().filter(u => 
      !memberUserIds.has(u.id) && 
      u.role !== 'TenantOwner' && 
      u.role !== 'SuperAdmin' &&
      u.isActive !== false
    );
  });

  getRoleBadge(role: string): { label: string; class: string } {
    const normalized = (role || '').toUpperCase();
    if (normalized.includes('TENANTOWNER') || normalized.includes('OWNER')) {
      return { label: 'مالك المنشأة', class: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' };
    }
    if (normalized.includes('ACCOUNTANT')) {
      return { label: 'محاسب', class: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' };
    }
    if (normalized.includes('SITEENGINEER') || normalized.includes('SITE_ENGINEER')) {
      return { label: 'مهندس موقع', class: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' };
    }
    if (normalized.includes('DESIGNENGINEER') || normalized.includes('DESIGN_ENGINEER')) {
      return { label: 'مهندس تصميم', class: 'bg-teal-500/10 text-teal-400 border border-teal-500/20' };
    }
    if (normalized.includes('MANAGER')) {
      return { label: 'مدير مشاريع', class: 'bg-blue-500/10 text-blue-400 border border-blue-500/20' };
    }
    if (normalized.includes('ENGINEER')) {
      return { label: 'مهندس موقع', class: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' };
    }
    return { label: role || 'عضو فريق', class: 'bg-slate-800 text-slate-300 border border-slate-700' };
  }

  fetchProjectMembers(): void {
    if (!this.projectId) return;
    this.isLoadingMembers.set(true);
    this.projectService.getProjectMembers(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.isLoadingMembers.set(false);
        const list = Array.isArray(res) ? res : (res?.data || []);
        this.projectMembers.set(list);
      },
      error: () => {
        this.isLoadingMembers.set(false);
        this.projectMembers.set([]);
      }
    });
  }

  openAddMemberModal(): void {
    this.selectedMemberUserIds.set([]);
    this.isAddMemberModalOpen.set(true);
    this.isLoadingCompanyUsers.set(true);

    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.isLoadingCompanyUsers.set(false);
        const list = Array.isArray(res) ? res : (res?.data || []);
        this.availableCompanyUsers.set(list);
      },
      error: () => {
        this.isLoadingCompanyUsers.set(false);
        this.availableCompanyUsers.set([]);
      }
    });
  }

  closeAddMemberModal(): void {
    this.isAddMemberModalOpen.set(false);
  }

  toggleSelectMemberUser(userId: string): void {
    this.selectedMemberUserIds.update(ids =>
      ids.includes(userId) ? ids.filter(id => id !== userId) : [...ids, userId]
    );
  }

  onAddMembersSubmit(): void {
    const userIds = this.selectedMemberUserIds();
    if (userIds.length === 0) return;

    this.isSavingMembers.set(true);
    this.projectService.addProjectMembers(this.projectId, userIds).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.isSavingMembers.set(false);
        if (res.success) {
          this.toastService.show('نجاح / Success', 'تم إسناد الأعضاء للمشروع بنجاح.', 'success');
          this.closeAddMemberModal();
          this.fetchProjectMembers();
        } else {
          this.toastService.show('تنبيه / Notice', res.message || 'فشل إسناد الأعضاء.', 'warning');
        }
      },
      error: (err) => {
        this.isSavingMembers.set(false);
        this.toastService.show('خطأ / Error', err.error?.message || err.message || 'حدث خطأ أثناء إسناد الأعضاء.', 'error');
      }
    });
  }

  removeMember(member: ProjectMemberDto): void {
    if (!member.userId) return;
    this.removingMemberUserId.set(member.userId);

    this.projectService.removeProjectMember(this.projectId, member.userId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.removingMemberUserId.set(null);
        if (res.success) {
          this.projectMembers.update(list => list.filter(m => m.userId !== member.userId));
          this.toastService.show('نجاح / Success', `تمت إزالة ${member.fullName || 'العضو'} من المشروع.`, 'success');
        } else {
          this.toastService.show('خطأ / Error', res.message || 'فشلت إزالة العضو.', 'error');
        }
      },
      error: (err) => {
        this.removingMemberUserId.set(null);
        this.toastService.show('خطأ / Error', err.error?.message || err.message || 'حدث خطأ أثناء إزالة العضو.', 'error');
      }
    });
  }

  // Admin settings forms & signals

  readonly isUploadingLogo = signal(false);
  readonly isUploadingBanner = signal(false);
  readonly isSavingProfile = signal(false);
  readonly profileSuccessMessage = signal<string | null>(null);
  readonly isSavingProjectSettings = signal(false);

  readonly profileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    logoUrl: [''],
    bannerUrl: [''],
    region: [''],
    companyDescription: ['']
  });

  readonly projectSettingsForm: FormGroup = this.fb.group({
    isPublicPortfolio: [false]
  });


  // Gallery signals
  readonly galleryPhotos = signal<SitePhotoDto[]>([]);
  readonly isLoadingGallery = signal(false);
  readonly isUploadingGallery = signal(false);
  // Caption dialog state
  readonly showCaptionDialog = signal(false);
  readonly pendingGalleryFile = signal<File | null>(null);
  readonly pendingCaption = signal('');

  readonly isSettleModalOpen = signal(false);
  readonly isSettling = signal(false);
  readonly settleErrors = signal<string[]>([]);
  readonly activePettyCash = signal<PettyCashMobileDto | null>(null);
  readonly selectedSettleReceipt = signal<File | null>(null);

  readonly settleForm: FormGroup = this.fb.group({
    spentAmount: [null, [Validators.required, Validators.min(0.01)]],
    receiptDescription: ['', [Validators.required, Validators.minLength(5)]],
    settlementPaymentMethod: [null, Validators.required],
    expenseDate: [new Date().toISOString().substring(0, 10), Validators.required],
    receiptPhotoUrl: ['']
  });

  readonly isRequestModalOpen = signal(false);
  readonly isRequesting = signal(false);
  readonly requestErrors = signal<string[]>([]);

  readonly isInjectModalOpen = signal(false);
  readonly isInjecting = signal(false);
  readonly injectErrors = signal<string[]>([]);

  readonly requestForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    reason: ['', [Validators.required, Validators.minLength(5)]],
    sourcePoolId: [null]
  }, {
    validators: (group: any) => this.insufficientBalanceValidator(group as FormGroup)
  });

  insufficientBalanceValidator(formGroup: FormGroup) {
    const amountControl = formGroup.get('amount');
    const sourcePoolIdControl = formGroup.get('sourcePoolId');
    if (!amountControl) return null;

    const amount = amountControl.value;
    if (amount === null || amount === undefined) {
      this.clearInsufficientBalanceError(amountControl);
      return null;
    }

    const sourcePoolId = sourcePoolIdControl?.value;
    if (sourcePoolId) {
      const pool = this.cashPools().find(p => p.id === sourcePoolId);
      if (pool && amount > pool.availableBalance) {
        amountControl.setErrors({ ...amountControl.errors, insufficientBalance: true });
        return { insufficientBalance: true };
      }
    } else {
      const totalAvailable = this.cashPools().reduce((sum, p) => sum + p.availableBalance, 0);
      if (totalAvailable > 0 && amount > totalAvailable) {
        amountControl.setErrors({ ...amountControl.errors, insufficientBalance: true });
        return { insufficientBalance: true };
      }
    }

    this.clearInsufficientBalanceError(amountControl);
    return null;
  }

  private clearInsufficientBalanceError(control: any) {
    if (control.hasError('insufficientBalance')) {
      const errors = { ...control.errors };
      delete errors['insufficientBalance'];
      control.setErrors(Object.keys(errors).length ? errors : null);
    }
  }


  readonly injectForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    sourceType: ['ClientDeposit', Validators.required],
    paymentDate: [new Date().toISOString().substring(0, 10), Validators.required],
    paymentMethod: ['Cash', Validators.required],
    description: ['', [Validators.required]]
  });

  readonly selectedInjectReceipt = signal<File | null>(null);

  onInjectReceiptSelected(event: any): void {
    const file = event.target.files?.[0];
    this.selectedInjectReceipt.set(file || null);
  }

  // Computed financial KPIs from transaction data
  readonly totalIncome = computed(() =>
    (this.transactions() || [])
      .filter((t: any) => t.type === 'Income' || t.Type === 'Income' || t.type === 0 || t.transactionType === 'Income')
      .reduce((sum: number, t: any) => sum + (t.amount ?? t.Amount ?? t.value ?? 0), 0)
  );

  readonly totalExpenses = computed(() =>
    (this.transactions() || [])
      .filter((t: any) => t.type === 'Expense' || t.Type === 'Expense' || t.type === 1 || t.transactionType === 'Expense' || t.type === 'DirectProjectExpense' || t.Type === 'DirectProjectExpense')
      .reduce((sum: number, t: any) => sum + (t.amount ?? t.Amount ?? t.value ?? 0), 0)
  );

  readonly netBalance = computed(() => this.totalIncome() - this.totalExpenses());

  readonly totalUnsettledPettyCash = computed(() => {
    return this.pettyCashes()
      .filter(p => 
        !p.isSettled && 
        p.status !== 'Settled' && 
        p.status !== 'Rejected' && 
        p.status !== 'Pending' && 
        !p.isReimbursement
      )
      .reduce((sum, p) => {
        const sett = this.settlements().find(s => s.pettyCashId === p.id);
        const spent = sett ? sett.lines.reduce((sSum, l) => sSum + (l.amount || 0), 0) : 0;
        return sum + ((p.amount || 0) - spent);
      }, 0);
  });

  readonly unsettledCount = computed(() =>
    this.pettyCashes().filter(p => 
      !p.isSettled && 
      p.status !== 'Settled' && 
      p.status !== 'Rejected' && 
      p.status !== 'Pending' && 
      !p.isReimbursement
    ).length
  );

  /** Called once by the page component. */
  init(): void {
    if (this.projectId) {
      if (this.isEngineer()) {
        this.activeTab.set('petty-cash');
      } else if (this.isAccountant()) {
        this.activeTab.set('transactions');
      } else {
        this.activeTab.set('petty-cash');
      }

      this.fetchProjectDetails();
      this.fetchProjectMembers();
      this.fetchBudgetHistory();
      this.fetchPettyCash();
      this.fetchSettlements();

      if (!this.isEngineer()) {
        this.fetchTransactions();
        this.fetchCashPools();
      }
      this.fetchGalleryPhotos();
      if (this.isTenantOwner()) {
        this.fetchCompanyProfile();
      }
      if (this.isOwnerOrAccountant()) {
        this.fetchUsersList();
      }
      if (this.canViewFinancialReports()) {
        this.loadTenantProfile();
      }

      this.offlineSync.registerHandler('create-settlement', (payload: any) =>
        this.settlementService.createSettlement(this.projectId, payload)
      );
    }
  }

  fetchGalleryPhotos(): void {
    this.isLoadingGallery.set(true);
    this.uploadService.getProjectPhotos(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingGallery.set(false);
        if (response.success && response.data) {
          const items = (response.data.items || []).filter(
            p => !p.photoUrl?.includes('/receipts/') && !p.photoUrl?.toLowerCase().includes('receipt')
          );
          this.galleryPhotos.set(items);
        }
      },
      error: () => this.isLoadingGallery.set(false)
    });
  }

  onGalleryFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (this.galleryPhotos().length >= 5) {
        this.confirmService.alert({
          title: 'الحد الأقصى للصور / Max Photos Limit',
          message: 'لا يمكن رفع أكثر من 5 صور لكل مشروع. برجاء مسح بعض الصور القديمة أولاً. / A project can have a maximum of 5 site photos. Please delete old ones first.',
          type: 'info'
        });
        // Reset input so the same file can be re-selected if needed
        input.value = '';
        return;
      }
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً / File Size Too Large',
          message: 'حجم الملف كبير جداً! الحد الأقصى للملفات 5 ميجا. / The maximum file size is 5MB.',
          type: 'error'
        });
        input.value = '';
        return;
      }
      // Store the file and open the caption dialog before uploading
      this.pendingGalleryFile.set(file);
      this.pendingCaption.set('');
      this.showCaptionDialog.set(true);
      input.value = '';
    }
  }

  confirmGalleryUpload(): void {
    const file = this.pendingGalleryFile();
    if (!file) return;
    const caption = this.pendingCaption().trim();
    this.showCaptionDialog.set(false);
    this.isUploadingGallery.set(true);
    this.uploadService.uploadProjectGallery(this.projectId, file, caption || undefined).subscribe({
      next: (res) => {
        this.isUploadingGallery.set(false);
        this.pendingGalleryFile.set(null);
        this.pendingCaption.set('');
        if (res.success) {
          this.fetchGalleryPhotos();
        }
      },
      error: () => {
        this.isUploadingGallery.set(false);
        this.pendingGalleryFile.set(null);
        this.pendingCaption.set('');
      }
    });
  }

  cancelGalleryUpload(): void {
    this.showCaptionDialog.set(false);
    this.pendingGalleryFile.set(null);
    this.pendingCaption.set('');
  }

  onDeletePhoto(photoId: string): void {
    this.confirmService.confirm({
      title: 'حذف الصورة / Delete Photo',
      message: 'هل أنت متأكد من حذف هذه الصورة؟ / Are you sure you want to delete this photo?',
      confirmText: 'نعم، احذف / Yes, Delete',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.uploadService.deleteProjectPhoto(this.projectId, photoId).subscribe({
          next: (res) => {
            if (res.success) {
              this.fetchGalleryPhotos();
            }
          }
        });
      }
    });
  }

  fetchCompanyProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const cleanUrl = (url: string) => {
            if (url && url.startsWith('PRESIGNED_SPLIT')) {
              const parts = url.split('|');
              return parts.length > 2 ? parts[2] : url;
            }
            return url;
          };
          this.profileForm.patchValue({
            name: res.data.name,
            logoUrl: cleanUrl(res.data.logoUrl),
            bannerUrl: cleanUrl(res.data.bannerUrl),
            region: res.data.region,
            companyDescription: res.data.companyDescription
          });
        }
      }
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) return;
    this.isSavingProfile.set(true);
    this.profileSuccessMessage.set(null);

    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        if (res.success) {
          this.profileSuccessMessage.set('تم حفظ بيانات الشركة بنجاح / Profile updated successfully');
          this.fetchCompanyProfile();
          setTimeout(() => this.profileSuccessMessage.set(null), 3000);
        }
      },
      error: () => this.isSavingProfile.set(false)
    });
  }

  onLogoFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'الحد الأقصى للصور 2 ميجابايت.',
          type: 'error'
        });
        return;
      }
      this.isUploadingLogo.set(true);
      this.uploadService.uploadTenantLogo(file).subscribe({
        next: (res) => {
          this.isUploadingLogo.set(false);
          if (res.success && res.data) {
            this.profileForm.patchValue({ logoUrl: res.data.url });
          }
        },
        error: () => this.isUploadingLogo.set(false)
      });
    }
  }

  onBannerFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'الحد الأقصى للصور 2 ميجابايت.',
          type: 'error'
        });
        return;
      }
      this.isUploadingBanner.set(true);
      this.uploadService.uploadTenantBanner(file).subscribe({
        next: (res) => {
          this.isUploadingBanner.set(false);
          if (res.success && res.data) {
            this.profileForm.patchValue({ bannerUrl: res.data.url });
          }
        },
        error: () => this.isUploadingBanner.set(false)
      });
    }
  }

  onProjectSettingsSubmit(): void {
    const isPublic = this.projectSettingsForm.value.isPublicPortfolio;
    this.isSavingProjectSettings.set(true);

    const currentProj = this.project();
    if (!currentProj) return;

    let client = '';
    let budget = 0;
    let status = 'Active';
    let category = 'Other';
    let description = currentProj.description;

    if (currentProj.description && currentProj.description.startsWith('{')) {
      try {
        const parsed = JSON.parse(currentProj.description);
        client = parsed.client || '';
        budget = parsed.budget || 0;
        status = parsed.status || 'Active';
        category = parsed.category || 'Other';
        description = parsed.description || '';
      } catch (e) { }
    }

    const legacyDescObj = {
      client,
      budget,
      status,
      category,
      isPublicPortfolio: isPublic,
      description
    };

    const dto = {
      name: currentProj.name,
      description: JSON.stringify(legacyDescObj),
      startDate: currentProj.startDate,
      endDate: currentProj.endDate,
      managerId: currentProj.managerId
    };

    this.projectService.updateProject(this.projectId, dto).subscribe({
      next: (res) => {
        this.isSavingProjectSettings.set(false);
        if (res.success) {
          this.fetchProjectDetails();
          this.confirmService.alert({
            title: 'تم التحديث / Updated',
            message: 'تم تحديث حالة عرض المشروع بنجاح. / Project visibility settings updated successfully.',
            type: 'success'
          });
        }
      },
      error: () => this.isSavingProjectSettings.set(false)
    });
  }

  fetchProjectDetails(): void {
    this.isLoadingProject.set(true);
    this.projectService.getProjectById(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const proj = response.data;
          let isPublicPortfolio = false;
          if (proj.description && proj.description.startsWith('{')) {
            try {
              const parsed = JSON.parse(proj.description);
              isPublicPortfolio = !!parsed.isPublicPortfolio || !!parsed.isPublic;
            } catch (e) { }
          }

          this.isLoadingProject.set(false);
          this.project.set(proj);
          this.projectSettingsForm.patchValue({ isPublicPortfolio });

          // Silently load reconciliation report for Closed or Frozen projects
          if (proj.status === 'Closed' || proj.status === 'FinancialFreeze') {
            this.projectCloseoutService.getReconciliationReport(this.projectId).subscribe({
              next: (res) => {
                if (res.success && res.data) {
                  this.reconciliationReport.set(res.data);
                }
              }
            });
          }
        } else {
          this.isLoadingProject.set(false);
        }
      },
      error: () => {
        this.isLoadingProject.set(false);
      }
    });
  }

  fetchPettyCash(): void {
    this.isLoadingPettyCash.set(true);
    this.pettyCashService.getProjectPettyCash(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingPettyCash.set(false);
        if (response) {
          const resData = response.data !== undefined ? response.data : response;
          const rawItems: any[] = (resData as any)?.items || (resData as any)?.Items || (Array.isArray(resData) ? resData : []);
          const normalized: PettyCashMobileDto[] = rawItems.filter(x => x != null).map(x => ({
            id: String(x.id || x.Id || ''),
            projectId: String(x.projectId || x.ProjectId || this.projectId),
            projectName: String(x.projectName || x.ProjectName || ''),
            amount: Number(x.amount ?? x.Amount ?? 0),
            reason: String(x.reason || x.Reason || ''),
            issuedAt: String(x.issuedAt || x.IssuedAt || x.createdAt || x.CreatedAt || ''),
            isSettled: Boolean(x.isSettled ?? x.IsSettled ?? (x.status === 'Settled' || x.Status === 'Settled')),
            issuedTo: String(x.issuedTo || x.IssuedTo || 'Staff'),
            status: String(x.status || x.Status || (x.isSettled ? 'Settled' : 'Pending')),
            category: String(x.category || x.Category || ''),
            comments: String(x.comments || x.Comments || ''),
            receiptPhotoUrl: String(x.receiptPhotoUrl || x.ReceiptPhotoUrl || ''),
            settlementPaymentMethod: String(x.settlementPaymentMethod || x.SettlementPaymentMethod || ''),
            expenseDate: x.expenseDate || x.ExpenseDate,
            isReimbursement: Boolean(x.isReimbursement ?? x.IsReimbursement ?? false)
          }));
          this.pettyCashes.set(normalized);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoadingPettyCash.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  formatPettyCashDate(item: any): string {
    try {
      const raw = item?.issuedAt || item?.IssuedAt || item?.createdAt || item?.CreatedAt || item?.date || item?.Date;
      if (!raw) return '-';
      const d = this.parseTxDate(raw);
      if (!d || d.getFullYear() < 1970) {
        if (typeof raw === 'string' && /^\d{2}\/\d{2}\/\d{4}/.test(raw)) {
          return raw.substring(0, 16);
        }
        return typeof raw === 'string' ? raw : '-';
      }

      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'م' : 'ص';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = String(hours).padStart(2, '0') + ':' + minutes + ' ' + ampm;
      return `${dd}/${mm}/${yyyy} - ${strTime}`;
    } catch {
      return '-';
    }
  }

  fetchCashPools(): void {
    this.financialService.getCashPools(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.cashPools.set(response.data);
        }
      }
    });
  }

  fetchTransactions(): void {
    this.isLoadingTransactions.set(true);
    this.financialService.getProjectTransactions(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isLoadingTransactions.set(false);
        console.log('Ledger Transactions Payload:', response?.data?.items || response?.data);
        if (response) {
          const resData = response.data !== undefined ? response.data : response;
          const rawItems = (resData as any)?.items || (resData as any)?.Items || (resData as any)?.transactions || (resData as any)?.Transactions || (Array.isArray(resData) ? resData : []);
          this.transactions.set(rawItems);
        }
        console.log('Project Ledger Transactions:', this.transactions);
        console.log('Ledger Transactions State:', this.transactions());
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Ledger Transactions Fetch Error:', err);
        this.isLoadingTransactions.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  isSettleFieldInvalid(fieldName: string): boolean {
    const field = this.settleForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  parseTxDate(raw: any): Date | null {
    if (!raw) return null;
    if (raw instanceof Date) return isNaN(raw.getTime()) ? null : raw;
    if (typeof raw === 'number') {
      const d = new Date(raw);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof raw === 'string') {
      const str = raw.trim();
      if (!str) return null;

      // Match "DD/MM/YYYY HH:mm:ss" or "DD/MM/YYYY HH:mm" or "DD/MM/YYYY"
      const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/);
      if (dmyMatch) {
        const day = parseInt(dmyMatch[1], 10);
        const month = parseInt(dmyMatch[2], 10) - 1;
        const year = parseInt(dmyMatch[3], 10);
        const hour = dmyMatch[4] ? parseInt(dmyMatch[4], 10) : 0;
        const min = dmyMatch[5] ? parseInt(dmyMatch[5], 10) : 0;
        const sec = dmyMatch[6] ? parseInt(dmyMatch[6], 10) : 0;
        const parsed = new Date(year, month, day, hour, min, sec);
        return isNaN(parsed.getTime()) ? null : parsed;
      }

      // Match ISO strings (e.g. 2026-08-15T...)
      const d = new Date(str);
      if (!isNaN(d.getTime()) && d.getFullYear() >= 1970) {
        return d;
      }
    }
    return null;
  }

  formatTxDate(tx: any): string {
    try {
      const raw = tx?.transactionDate || tx?.TransactionDate || 
                  tx?.paymentDate || tx?.PaymentDate || 
                  tx?.date || tx?.Date || 
                  tx?.createdAt || tx?.CreatedAt;
      if (!raw) return '';

      const d = this.parseTxDate(raw);
      if (!d || d.getFullYear() < 1970) {
        if (typeof raw === 'string' && /^\d{2}\/\d{2}\/\d{4}/.test(raw)) {
          return raw.substring(0, 16);
        }
        return '';
      }

      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
    } catch { 
      return ''; 
    }
  }

  openSettleModal(item: PettyCashMobileDto): void {
    this.activePettyCash.set(item);
    this.settleErrors.set([]);
    this.selectedSettleReceipt.set(null);
    this.settleForm.reset({
      spentAmount: item.amount,
      receiptDescription: '',
      settlementPaymentMethod: null,
      expenseDate: new Date().toISOString().substring(0, 10),
      receiptPhotoUrl: ''
    });

    // Dynamically set max validator based on issued amount
    this.settleForm.get('spentAmount')?.setValidators([
      Validators.required,
      Validators.min(0.01),
      Validators.max(item.amount)
    ]);
    this.settleForm.get('spentAmount')?.updateValueAndValidity();

    this.isSettleModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeSettleModal(): void {
    this.isSettleModalOpen.set(false);
    this.activePettyCash.set(null);
    this.settleErrors.set([]);
    this.selectedSettleReceipt.set(null);
    this.confirmService.toggleBodyScroll(false);
  }

  async onSettleSubmit(): Promise<void> {
    if (this.settleForm.invalid || !this.activePettyCash()) {
      this.settleForm.markAllAsTouched();
      return;
    }

    this.isSettling.set(true);
    this.settleErrors.set([]);

    const formVal = this.settleForm.value;
    let receiptPhotoUrl = formVal.receiptPhotoUrl || '';

    const fileToUpload = this.selectedSettleReceipt();
    if (fileToUpload) {
      if (fileToUpload.size > 5 * 1024 * 1024) {
        this.isSettling.set(false);
        this.settleErrors.set(['حجم الملف كبير جداً! الحد الأقصى لإيصال الفاتورة 5 ميجا.']);
        return;
      }

      this.isUploadingSettleReceipt.set(true);
      try {
        const uploadResult = await firstValueFrom(this.uploadService.uploadProjectGallery(this.projectId, fileToUpload, undefined, 'Receipt'));
        if (uploadResult.success && uploadResult.data) {
          receiptPhotoUrl = uploadResult.data.url;
          this.settleForm.patchValue({ receiptPhotoUrl });
        } else {
          this.isUploadingSettleReceipt.set(false);
          this.isSettling.set(false);
          this.settleErrors.set([uploadResult.message || 'Failed to upload receipt image.']);
          return;
        }
      } catch (err: any) {
        this.isUploadingSettleReceipt.set(false);
        this.isSettling.set(false);
        this.settleErrors.set([err.error?.message || err.message || 'Failed to upload receipt image.']);
        return;
      }
      this.isUploadingSettleReceipt.set(false);
    }

    const dto: PettyCashSettleDto = {
      spentAmount: formVal.spentAmount,
      receiptDescription: formVal.receiptDescription,
      settlementPaymentMethod: formVal.settlementPaymentMethod,
      expenseDate: new Date(formVal.expenseDate),
      receiptPhotoUrl
    };

    const pettyCashId = this.activePettyCash()!.id;

    try {
      const response = await firstValueFrom(
        this.pettyCashService.settlePettyCash(this.projectId, pettyCashId, dto)
      );
      this.isSettling.set(false);
      if (response.success) {
        this.closeSettleModal();
        this.fetchPettyCash();
        this.fetchTransactions();
      } else {
        this.settleErrors.set(response.errors || [response.message || 'Failed to settle request.']);
      }
    } catch (err: any) {
      this.isSettling.set(false);
      const errors = err.error?.errors || [err.error?.message || err.message || 'Error occurred.'];
      this.settleErrors.set(Array.isArray(errors) ? errors : [errors]);
    }
  }

  isRequestFieldInvalid(fieldName: string): boolean {
    const field = this.requestForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openRequestModal(): void {
    if (this.project()?.status === 'Closed') return;
    this.requestErrors.set([]);
    this.requestForm.reset({
      amount: null,
      reason: '',
      sourcePoolId: null
    });

    if (this.isTenantOwner()) {
      this.requestForm.get('sourcePoolId')?.setValidators(Validators.required);
    } else {
      this.requestForm.get('sourcePoolId')?.clearValidators();
    }
    this.requestForm.get('sourcePoolId')?.updateValueAndValidity();

    this.isRequestModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
    this.requestErrors.set([]);
    this.confirmService.toggleBodyScroll(false);
  }

  async onRequestSubmit(): Promise<void> {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isRequesting.set(true);
    this.requestErrors.set([]);

    const formVal = this.requestForm.value;
    const user = this.authService.currentUser();
    if (!user) return;

    const dto = {
      issuedToUserId: user.userId,
      amount: formVal.amount,
      reason: formVal.reason,
      category: 'Other',
      sourcePoolId: formVal.sourcePoolId
    };

    try {
      const response = await firstValueFrom(
        this.pettyCashService.requestPettyCash(this.projectId, dto)
      );
      this.isRequesting.set(false);
      if (response.success) {
        this.closeRequestModal();
        this.fetchPettyCash();
      } else {
        this.requestErrors.set(response.errors || [response.message || 'Failed to request petty cash.']);
      }
    } catch (err: any) {
      this.isRequesting.set(false);
      const errors = err.error?.errors || [err.error?.message || err.message || 'Error occurred.'];
      this.requestErrors.set(Array.isArray(errors) ? errors : [errors]);
    }
  }

  openInjectModal(): void {
    this.injectErrors.set([]);
    this.selectedInjectReceipt.set(null);
    this.injectForm.reset({
      amount: null,
      sourceType: 'ClientDeposit',
      paymentDate: new Date().toISOString().substring(0, 10),
      paymentMethod: 'Cash',
      description: ''
    });
    this.isInjectModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeInjectModal(): void {
    this.isInjectModalOpen.set(false);
    this.selectedInjectReceipt.set(null);
    this.injectForm.reset({
      amount: null,
      sourceType: 'ClientDeposit',
      paymentDate: new Date().toISOString().substring(0, 10),
      paymentMethod: 'Cash',
      description: ''
    });
    this.confirmService.toggleBodyScroll(false);
  }

  async submitCapitalInjection(): Promise<void> {
    if (this.injectForm.invalid) {
      this.injectForm.markAllAsTouched();
      return;
    }

    this.isInjecting.set(true);
    this.injectErrors.set([]);

    let receiptUrl: string | null = null;
    const fileToUpload = this.selectedInjectReceipt();
    if (fileToUpload) {
      try {
        const res = await firstValueFrom(this.uploadService.uploadProjectGallery(this.projectId, fileToUpload, undefined, 'Receipt'));
        if (res.success && res.data) {
          receiptUrl = res.data.url;
        }
      } catch (err) {
        this.injectErrors.set(['Failed to upload receipt image.']);
        this.isInjecting.set(false);
        return;
      }
    }

    const formVal = this.injectForm.value;
    const paymentDateIso = new Date(formVal.paymentDate || Date.now()).toISOString();

    const dto = {
      amount: formVal.amount,
      sourceType: formVal.sourceType,
      description: formVal.description,
      paymentDate: paymentDateIso,
      transactionDate: paymentDateIso,
      paymentMethod: formVal.paymentMethod,
      receiptPhotoUrl: receiptUrl
    };

    this.financialService.injectCapital(this.projectId, dto).subscribe({
      next: (response) => {
        if (response.success) {
          this.closeInjectModal();
          this.fetchCashPools();
          this.fetchTransactions();
        } else {
          this.injectErrors.set([response.message || 'Failed to inject capital']);
        }
      },
      error: (err) => {
        this.injectErrors.set(err.error?.errors || [err.error?.message || 'An unexpected error occurred.']);
        this.isInjecting.set(false);
      },
      complete: () => {
        this.isInjecting.set(false);
      }
    });
  }

  getPoolSourceTranslationKey(sourceType: string): string {
    switch (sourceType) {
      case 'ClientDeposit': return 'CLIENT_DEPOSIT';
      case 'OwnerCapital':
      case 'OwnerLoan':
      case 'OwnerInjection': return 'OWNER_CAPITAL';
      case 'ExternalLoan': return 'EXTERNAL_LOAN';
      default: return sourceType ? sourceType.toUpperCase() : '';
    }
  }

  getPoolSourceLabel(sourceType: string, detailed: boolean = false): string {
    if (!sourceType) return '';
    switch (sourceType) {
      case 'ClientDeposit':
        return detailed ? 'دفعة من العميل (إيراد مشروع)' : 'دفعة من العميل';
      case 'OwnerCapital':
      case 'OwnerLoan':
      case 'OwnerInjection':
        return detailed ? 'تمويل مؤقت من الشركة / المالك (لحين السداد)' : 'تمويل مؤقت (شركة/مالك)';
      case 'ExternalLoan':
      case 'Loan':
        return 'تمويل إضافي';
      default:
        return sourceType;
    }
  }

  readonly isUploadingSettleReceipt = signal(false);
  readonly isDeletingTransaction = signal(false);
  readonly isDeletingPettyCash = signal(false);

  onSettleReceiptSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedSettleReceipt.set(input.files[0]);
    }
  }

  /** Delete a financial transaction — only reachable if isOwnerOrAccountant(). Rolls back pool on API side. */
  async onDeleteTransaction(id: string): Promise<void> {
    const isConfirmed = await this.confirmService.confirm({
      title: 'حذف الحركة المالية',
      message: 'هل أنت متأكد من حذف هذه الحركة؟ في حال كانت زيادة رأس مال، فسيتم إرجاع رصيد المحفظة تلقائياً.',
      confirmText: 'نعم، احذف',
      cancelText: 'إلغاء'
    });
    if (!isConfirmed) return;

    this.isDeletingTransaction.set(true);
    this.financialService.deleteTransaction(this.projectId, id).subscribe({
      next: () => {
        this.isDeletingTransaction.set(false);
        this.fetchTransactions();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isDeletingTransaction.set(false);
        this.confirmService.alert({
          title: 'خطأ في العملية',
          message: err?.error?.message || 'فشلت عملية الحذف.',
          type: 'error'
        });
      }
    });
  }

  /** Delete a petty cash voucher — only reachable if isOwnerOrAccountant(). Refunds pool on API side if Issued. */
  async onDeletePettyCash(id: string, isSettled: boolean): Promise<void> {
    const warning = isSettled
      ? 'هل أنت متأكد من حذف هذه العهدة المسواة؟ سيتم إزالتها نهائياً.'
      : 'هل أنت متأكد من الحذف؟ سيتم إرجاع الرصيد المستقطع إلى محفظة تمويل المشروع تلقائياً.';

    const isConfirmed = await this.confirmService.confirm({
      title: 'حذف العهدة النقدية',
      message: warning,
      confirmText: 'نعم، احذف',
      cancelText: 'إلغاء'
    });
    if (!isConfirmed) return;

    this.isDeletingPettyCash.set(true);
    this.pettyCashService.deletePettyCash(this.projectId, id).subscribe({
      next: () => {
        this.isDeletingPettyCash.set(false);
        this.fetchPettyCash();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isDeletingPettyCash.set(false);
        this.confirmService.alert({
          title: 'خطأ في العملية',
          message: err?.error?.message || 'فشلت عملية الحذف.',
          type: 'error'
        });
      }
    });
  }

  // ── Edit Petty Cash Modal Actions ──
  openEditPettyCashModal(item: PettyCashMobileDto): void {
    this.selectedPettyCashToEdit = item;
    this.editPettyCashForm.reset({
      amount: item.amount,
      category: item.category || 'Other',
      reason: item.reason
    });
    this.isEditPettyCashModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeEditPettyCashModal(): void {
    this.isEditPettyCashModalOpen.set(false);
    this.selectedPettyCashToEdit = null;
    this.confirmService.toggleBodyScroll(false);
  }

  submitEditPettyCash(): void {
    if (this.editPettyCashForm.invalid || !this.selectedPettyCashToEdit) return;
    this.isEditingPettyCash.set(true);
    const formVal = this.editPettyCashForm.value;

    this.pettyCashService.updatePettyCash(this.projectId, this.selectedPettyCashToEdit.id, formVal).subscribe({
      next: () => {
        this.isEditingPettyCash.set(false);
        this.closeEditPettyCashModal();
        this.fetchPettyCash();
      },
      error: (err) => {
        this.isEditingPettyCash.set(false);
        this.confirmService.alert({
          title: 'فشل التعديل',
          message: err?.error?.message || 'تعذر تعديل العهدة النقدية.',
          type: 'error'
        });
      }
    });
  }

  // ── Edit Transaction Modal Actions ──
  openEditTransactionModal(t: FinancialTransactionMobileDto): void {
    this.selectedTransactionToEdit = t;
    this.editTransactionForm.reset({
      amount: t.amount,
      description: t.description
    });
    this.isEditTransactionModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeEditTransactionModal(): void {
    this.isEditTransactionModalOpen.set(false);
    this.selectedTransactionToEdit = null;
    this.confirmService.toggleBodyScroll(false);
  }

  submitEditTransaction(): void {
    if (this.editTransactionForm.invalid || !this.selectedTransactionToEdit) return;
    this.isSavingTransaction.set(true);
    const formVal = this.editTransactionForm.value;

    this.financialService.updateTransaction(this.projectId, this.selectedTransactionToEdit.id, formVal).subscribe({
      next: () => {
        this.isSavingTransaction.set(false);
        this.closeEditTransactionModal();
        this.fetchTransactions();
        this.fetchCashPools();
      },
      error: (err) => {
        this.isSavingTransaction.set(false);
        this.confirmService.alert({
          title: 'فشل التعديل',
          message: err?.error?.message || 'تعذر تعديل الحركة المالية.',
          type: 'error'
        });
      }
    });
  }

  // ── Revise Budget Modal Actions ──
  openReviseBudgetModal(): void {
    this.reviseBudgetForm.reset({
      newBudget: this.parsedBudget(),
      reasonForChange: '',
      boqFileUrl: ''
    });
    this.selectedBoqFile = null;
    this.isReviseBudgetModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
  }

  closeReviseBudgetModal(): void {
    this.isReviseBudgetModalOpen.set(false);
    this.selectedBoqFile = null;
    this.confirmService.toggleBodyScroll(false);
  }

  onBoqFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const maxSize = isImage ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'حجم الملف كبير جداً! الحد الأقصى للصور 2 ميجا وللمقايسات 5 ميجا.',
          type: 'error'
        });
        event.target.value = '';
        return;
      }
      this.selectedBoqFile = file;
    }
  }

  submitReviseBudget(): void {
    if (this.reviseBudgetForm.invalid) return;
    this.isRevisingBudget.set(true);

    const proceed = (boqUrl: string) => {
      const formVal = this.reviseBudgetForm.value;
      const dto = {
        newBudget: formVal.newBudget,
        reasonForChange: formVal.reasonForChange,
        boqFileUrl: boqUrl
      };

      this.projectService.reviseBudget(this.projectId, dto).subscribe({
        next: () => {
          this.isRevisingBudget.set(false);
          this.closeReviseBudgetModal();
          this.fetchProjectDetails();
          this.fetchBudgetHistory();
        },
        error: (err) => {
          this.isRevisingBudget.set(false);
          this.confirmService.alert({
            title: 'فشل تعديل الميزانية',
            message: err?.error?.message || 'تعذر تعديل ميزانية المشروع.',
            type: 'error'
          });
        }
      });
    };

    if (this.selectedBoqFile) {
      this.isUploadingBoq.set(true);
      this.uploadService.uploadProjectDocument(this.projectId, this.selectedBoqFile!).subscribe({
        next: (res) => {
          this.isUploadingBoq.set(false);
          if (res.success && res.data) {
            proceed(res.data.url);
          } else {
            this.isRevisingBudget.set(false);
            this.confirmService.alert({
              title: 'فشل رفع الملف',
              message: 'فشل رفع ملف BOQ.',
              type: 'error'
            });
          }
        },
        error: () => {
          this.isUploadingBoq.set(false);
          this.isRevisingBudget.set(false);
          this.confirmService.alert({
            title: 'خطأ في الرفع',
            message: 'حدث خطأ أثناء رفع ملف BOQ.',
            type: 'error'
          });
        }
      });
    } else {
      proceed('');
    }
  }

  fetchBudgetHistory(): void {
    this.projectService.getProjectBudgetHistory(this.projectId).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.budgetHistory.set(res.data);
        }
      }
    });
  }

  fetchUsersList(): void {
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.usersList.set(res.data.filter(u => ['manager', 'siteengineer', 'designengineer'].includes(u.role.toLowerCase())));
        }
      }
    });
  }

  fetchSettlements(): void {
    this.isLoadingSettlements.set(true);
    this.settlementService.getSettlements(this.projectId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoadingSettlements.set(false);
        if (res.success && res.data) {
          this.settlements.set(res.data);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoadingSettlements.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  openDisburseModal(): void {
    if (this.project()?.status === 'Closed') return;
    this.disburseForm.reset({
      userId: null,
      amount: null,
      description: '',
      sourcePoolId: null,
      paymentMethod: 'Cash'
    });
    this.disburseErrors.set([]);
    this.isDisburseModalOpen.set(true);
  }

  closeDisburseModal(): void {
    this.isDisburseModalOpen.set(false);
  }

  onDisburseSubmit(): void {
    if (this.disburseForm.invalid) return;
    this.isDisbursing.set(true);
    this.disburseErrors.set([]);

    this.financialService.directDisbursement(this.projectId, this.disburseForm.value).subscribe({
      next: (res) => {
        this.isDisbursing.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: 'تم التحويل بنجاح',
            message: 'تم تعزيز العهدة وصرفها بنجاح وتحديث الأرصدة.',
            type: 'success'
          });
          this.closeDisburseModal();
          this.fetchCashPools();
          this.fetchPettyCash();
          this.fetchTransactions();
        } else {
          this.disburseErrors.set([res.message || 'فشل التحويل المباشر.']);
        }
      },
      error: (err) => {
        this.isDisbursing.set(false);
        this.disburseErrors.set([err.error?.message || err.message || 'حدث خطأ أثناء الاتصال بالخادم.']);
      }
    });
  }

  openSettlementModal(pettyCash: PettyCashMobileDto): void {
    this.selectedPettyCashForSettlement.set(pettyCash);
    this.settlementErrors.set([]);
    this.settlementLines.clear();

    const existing = this.settlements().find(s => s.pettyCashId === pettyCash.id);
    const isLocked = existing && existing.status !== 'Draft' && existing.status !== 'Rejected';

    if (existing && existing.lines && existing.lines.length > 0) {
      existing.lines.forEach(line => {
        this.settlementLines.push(this.fb.group({
          category: [{ value: line.category, disabled: isLocked }, Validators.required],
          amount: [{ value: line.amount, disabled: isLocked }, [Validators.required, Validators.min(0.01)]],
          description: [{ value: line.description, disabled: isLocked }, Validators.required],
          invoiceUrl: [line.invoiceUrl],
          uploading: [false],
          localPreviewUrl: [line.invoiceUrl || '']
        }));
      });
    } else {
      this.addSettlementLine();
    }
    this.isSettlementModalOpen.set(true);
  }

  closeSettlementModal(): void {
    this.isSettlementModalOpen.set(false);
    this.selectedPettyCashForSettlement.set(null);
  }

  onSettlementLineFileSelected(event: any, index: number): void {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً / File Size Too Large',
          message: 'حجم الملف كبير جداً! الحد الأقصى للملفات 5 ميجا. / The maximum file size is 5MB.',
          type: 'error'
        });
        return;
      }
      const localUrl = URL.createObjectURL(file);
      const lineGroup = this.settlementLines.at(index);
      lineGroup.patchValue({ localPreviewUrl: localUrl, uploading: true });
      this.uploadService.uploadProjectDocument(this.projectId, file).subscribe({
        next: (res) => {
          lineGroup.patchValue({ uploading: false });
          URL.revokeObjectURL(localUrl);
          if (res.success && res.data) {
            lineGroup.patchValue({ invoiceUrl: res.data.url, localPreviewUrl: res.data.url });
          } else {
            this.confirmService.alert({ title: 'فشل الرفع', message: 'فشل رفع إيصال الفاتورة.', type: 'error' });
          }
        },
        error: () => {
          lineGroup.patchValue({ uploading: false });
          URL.revokeObjectURL(localUrl);
          this.confirmService.alert({ title: 'خطأ في الرفع', message: 'حدث خطأ أثناء رفع إيصال الفاتورة.', type: 'error' });
        }
      });
    }
  }

  onSettlementSubmit(isDraft: boolean): void {
    if (this.settlementForm.invalid) return;
    const pettyCash = this.selectedPettyCashForSettlement();
    if (!pettyCash) return;

    this.isSubmittingSettlement.set(true);
    this.settlementErrors.set([]);

    const payload = {
      pettyCashId: pettyCash.id,
      lines: this.settlementLines.value.map((l: any) => ({
        category: l.category,
        amount: l.amount,
        description: l.description,
        invoiceUrl: l.invoiceUrl,
        isBillableToClient: l.isBillableToClient ?? true
      })),
      isDraft: isDraft
    };

    // Integrate Offline sync submission
    this.offlineSync.submit(
      'create-settlement',
      payload,
      (p) => this.settlementService.createSettlement(this.projectId, p)
    ).subscribe({
      next: (res) => {
        this.isSubmittingSettlement.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: isDraft ? 'تم حفظ المسودة' : 'تم تقديم واعتماد التسوية',
            message: res.message || (isDraft ? 'تم حفظ مسودة التسوية بنجاح.' : 'تم تقديم طلب التسوية بنجاح وتم الاعتماد التلقائي.'),
            buttonText: 'حسناً',
            type: 'success'
          });
          if (!isDraft) {
            this.closeSettlementModal();
          }
          this.fetchPettyCash();
          this.fetchSettlements();
        } else {
          this.settlementErrors.set([res.message || 'فشل عملية التسوية.']);
        }
      },
      error: (err) => {
        this.isSubmittingSettlement.set(false);
        this.settlementErrors.set([err.error?.message || err.message || 'حدث خطأ أثناء الاتصال بالخادم.']);
      }
    });
  }

  onApproveSettlement(id: string): void {
    this.confirmService.confirm({
      title: 'اعتماد التسوية / Approve Settlement',
      message: 'هل أنت متأكد من اعتماد طلب تسوية هذه العهدة؟ / Are you sure you want to approve this settlement?',
      confirmText: 'نعم، اعتمد / Yes, Approve',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.settlementService.approveSettlement(this.projectId, id).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الاعتماد بنجاح',
                message: res.message || 'تم اعتماد التسوية بنجاح.',
                type: 'success'
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: 'فشل الاعتماد', message: res.message || 'فشل اعتماد التسوية.', type: 'error' });
            }
          }
        });
      }
    });
  }

  onConfirmRefund(id: string): void {
    this.confirmService.confirm({
      title: 'تأكيد استرجاع النقود / Confirm Refund',
      message: 'هل تؤكد استلام المبلغ المرتجع نقداً من المهندس وإيداعه بالخزينة؟ / Do you confirm receiving the cash refund from the engineer?',
      confirmText: 'نعم، استلمت / Yes, Confirmed',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        this.settlementService.confirmRefund(this.projectId, id).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: 'تم التأكيد وإيداع المبلغ',
                message: 'تم استلام النقود بنجاح وإعادة شحن الخزينة/الصندوق.',
                type: 'success'
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: 'فشل التأكيد', message: res.message || 'فشل تأكيد استلام النقود.', type: 'error' });
            }
          }
        });
      }
    });
  }

  onRejectSettlement(id: string): void {
    this.confirmService.confirm({
      title: 'رفض التسوية / Reject Settlement',
      message: 'هل تريد رفض تسوية هذه العهدة؟ برجاء كتابة سبب الرفض أدناه: / Write reason for rejection:',
      confirmText: 'رفض / Reject',
      cancelText: 'إلغاء / Cancel'
    }).then((confirmed) => {
      if (confirmed) {
        // Prompt for reject reason
        const comments = prompt('سبب الرفض / Rejection Comments:');
        if (comments === null) return;
        if (!comments.trim()) {
          alert('يجب كتابة سبب الرفض / Rejection comments are required.');
          return;
        }

        this.settlementService.rejectSettlement(this.projectId, id, comments).subscribe({
          next: (res) => {
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الرفض',
                message: 'تم رفض طلب تسوية العهدة بنجاح وإعادتها للمهندس.',
                type: 'success'
              });
              this.fetchSettlements();
              this.fetchPettyCash();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({ title: 'فشل الرفض', message: res.message || 'فشل رفض التسوية.', type: 'error' });
            }
          }
        });
      }
    });
  }

  onApproveReimbursement(item: PettyCashMobileDto, poolId: string): void {
    if (!poolId) {
      this.confirmService.alert({
        title: 'اختر محفظة التمويل',
        message: 'يرجى اختيار محفظة التمويل أولاً لصرف التعويض.',
        type: 'info'
      });
      return;
    }

    this.confirmService.confirm({
      title: 'صرف تعويض المصاريف / Approve Reimbursement',
      message: `هل تؤكد صرف مبلغ التعويض بقيمة ${item.amount} EGP للموظف ${item.issuedTo} من محفظة التمويل المحددة؟`,
      confirmText: 'تأكيد الصرف / Yes, Disburse',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.pettyCashService.approvePettyCash(this.projectId, item.id, { sourcePoolId: poolId }).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الصرف والتسوية',
                message: 'تمت الموافقة على طلب التعويض وصرفه بنجاح من محفظة المشروع وتحديث رصيد الموظف.',
                type: 'success'
              });
              this.fetchPettyCash();
              this.fetchSettlements();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: 'فشل صرف التعويض',
                message: res.message || 'حدث خطأ أثناء صرف التعويض.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية صرف التعويض.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onApprovePettyCashRequest(item: PettyCashMobileDto, poolId: string): void {
    if (!poolId) {
      this.confirmService.alert({
        title: 'اختر محفظة التمويل',
        message: 'يرجى اختيار محفظة التمويل أولاً لاعتماد وصرف العهدة.',
        type: 'info'
      });
      return;
    }

    this.confirmService.confirm({
      title: 'اعتماد وصرف العهدة / Approve & Disburse',
      message: `هل تؤكد اعتماد وصرف مبلغ العهدة بقيمة ${item.amount} EGP للموظف ${item.issuedTo} من محفظة التمويل المحددة؟`,
      confirmText: 'تأكيد الصرف / Yes, Disburse',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isLoadingPettyCash.set(true);
        this.pettyCashService.approvePettyCash(this.projectId, item.id, { sourcePoolId: poolId }).subscribe({
          next: (res) => {
            this.isLoadingPettyCash.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الاعتماد والصرف',
                message: 'تمت الموافقة على طلب العهدة وصرفها بنجاح وتحديث أرصدة المشروع.',
                type: 'success'
              });
              this.fetchPettyCash();
              this.fetchSettlements();
              this.fetchCashPools();
              this.fetchTransactions();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: 'فشل الاعتماد والصرف',
                message: res.message || 'حدث خطأ أثناء اعتماد العهدة.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isLoadingPettyCash.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية اعتماد العهدة.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onRejectPettyCashRequest(item: PettyCashMobileDto): void {
    this.confirmService.confirm({
      title: 'رفض طلب العهدة / Reject Petty Cash',
      message: `هل أنت متأكد من رفض طلب العهدة للموظف ${item.issuedTo} بقيمة ${item.amount} EGP؟ يرجى كتابة سبب الرفض أدناه:`,
      confirmText: 'نعم، ارفض / Yes, Reject',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        const comments = prompt('سبب الرفض / Rejection Comments:');
        if (comments === null) return;
        if (!comments.trim()) {
          alert('يجب كتابة سبب الرفض / Rejection comments are required.');
          return;
        }

        this.isLoadingPettyCash.set(true);
        this.pettyCashService.rejectPettyCash(this.projectId, item.id, comments).subscribe({
          next: (res) => {
            this.isLoadingPettyCash.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم الرفض بنجاح',
                message: 'تم رفض طلب العهدة بنجاح وإرسال التنبيه للموظف.',
                type: 'success'
              });
              this.fetchPettyCash();
              this.onRunReconciliation();
            } else {
              this.confirmService.alert({
                title: 'فشل رفض العهدة',
                message: res.message || 'حدث خطأ أثناء رفض العهدة.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isLoadingPettyCash.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية رفض العهدة.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onWhatsAppAlert(pettyCash: PettyCashMobileDto, customMessage?: string): void {
    const defaultMsg = `مرحباً ${pettyCash.issuedTo}، تم اعتماد وتحديث طلب العهدة الخاص بك بقيمة ${pettyCash.amount} EGP لـ ${pettyCash.projectName} - ${pettyCash.reason}.`;
    const message = customMessage || defaultMsg;
    const targetName = (pettyCash.issuedTo || '').trim().toLowerCase();

    // 1. First search in already loaded project members (accessible to all roles including Engineer/Accountant)
    const members = this.projectMembers();
    const matchedMember = members.find(m =>
      (m.fullName && m.fullName.trim().toLowerCase() === targetName) ||
      (m.email && m.email.trim().toLowerCase() === targetName)
    );

    if (matchedMember?.phoneNumber) {
      this.whatsappLink.openChat(matchedMember.phoneNumber, message);
      return;
    }

    // 2. Fallback: if current user is Tenant Owner / Super Admin, try user service safely
    if (this.isTenantOwner() || this.isSuperAdmin()) {
      this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.success && res.data) {
            const userObj = res.data.find(u => `${u.firstName} ${u.lastName}`.trim().toLowerCase() === targetName);
            const phone = userObj?.whatsAppPhone || userObj?.personalPhone;
            if (phone) {
              this.whatsappLink.openChat(phone, message);
              return;
            }
          }
          this.showWhatsAppMissingPhoneAlert();
        },
        error: () => {
          this.showWhatsAppMissingPhoneAlert();
        }
      });
    } else {
      this.showWhatsAppMissingPhoneAlert();
    }
  }

  private showWhatsAppMissingPhoneAlert(): void {
    this.confirmService.alert({
      title: 'تنبيه واتساب',
      message: 'لم يتم العثور على رقم هاتف/واتساب مسجل لهذا المستخدم لإرسال التنبيه.',
      type: 'info'
    });
  }

  // --- Closeout & Reconciliation Operations ---

  onFreezeProject(): void {
    this.confirmService.confirm({
      title: 'تجميد العمليات المالية للمشروع / Freeze Financial Operations',
      message: 'هل أنت متأكد من تجميد جميع المعاملات المالية وطلبات العهد لهذا المشروع؟ لا يمكن التراجع عن هذه الخطوة إلا بطلب رسمي.',
      confirmText: 'نعم، قم بالتجميد / Yes, Freeze',
      cancelText: 'إلغاء / Cancel'
    }).then(confirmed => {
      if (confirmed) {
        this.isCloseoutLoading.set(true);
        this.projectCloseoutService.freezeProject(this.projectId).subscribe({
          next: (res) => {
            this.isCloseoutLoading.set(false);
            if (res.success) {
              this.confirmService.alert({
                title: 'تم التجميد المالي',
                message: 'تم تجميد العمليات المالية للمشروع وتوليد رابط تقييم العميل بنجاح.',
                type: 'success'
              });
              // Refresh project details to update status
              this.fetchProjectDetails();
            } else {
              this.confirmService.alert({
                title: 'فشل التجميد المالي',
                message: res.message || 'حدث خطأ غير متوقع أثناء تجميد العمليات.',
                type: 'error'
              });
            }
          },
          error: (err) => {
            this.isCloseoutLoading.set(false);
            this.confirmService.alert({
              title: 'خطأ في العملية',
              message: err.error?.message || err.message || 'فشلت عملية تجميد المشروع.',
              type: 'error'
            });
          }
        });
      }
    });
  }

  onRunReconciliation(): void {
    this.isCloseoutLoading.set(true);
    this.projectCloseoutService.getReconciliationReport(this.projectId).subscribe({
      next: (res) => {
        this.isCloseoutLoading.set(false);
        if (res.success && res.data) {
          this.reconciliationReport.set(res.data);
        } else {
          this.confirmService.alert({
            title: 'فشل التدقيق',
            message: res.message || 'لم نتمكن من الحصول على تقرير مطابقة الأرصدة.',
            type: 'error'
          });
        }
      },
      error: (err) => {
        this.isCloseoutLoading.set(false);
        this.confirmService.alert({
          title: 'خطأ في التدقيق',
          message: err.error?.message || err.message || 'حدث خطأ أثناء تشغيل محرك التسوية الأوتوماتيكي.',
          type: 'error'
        });
      }
    });
  }

  onFinalCloseout(): void {
    const report = this.reconciliationReport();
    if (!report?.isFullyReconciled) {
      this.confirmService.alert({
        title: 'لا يمكن الإغلاق النهائي',
        message: 'يجب تصفية جميع العهد والأرصدة المعلقة أولاً قبل إغلاق المشروع.',
        type: 'error'
      });
      return;
    }

    const remainingBalance = report.remainingPoolBalance ?? 0;

    if (remainingBalance > 0) {
      // Open modal to choose disposition
      this.selectedDisposition.set('RefundToClient');
      this.isCloseoutModalOpen.set(true);
    } else {
      // Direct confirmation
      this.confirmService.confirm({
        title: 'الإغلاق النهائي والمطابقة / Final Project Closeout',
        message: 'تحذير: سيتم إغلاق هذا المشروع نهائياً وتجميد جميع حساباته ولا يمكن تعديل أو تصفية أي عهد بعد ذلك. هل ترغب في المتابعة؟',
        confirmText: 'نعم، إغلاق نهائي / Yes, Close Out',
        cancelText: 'إلغاء / Cancel'
      }).then(confirmed => {
        if (confirmed) {
          this.executeFinalCloseout();
        }
      });
    }
  }

  closeCloseoutModal(): void {
    this.isCloseoutModalOpen.set(false);
  }

  confirmDispositionAndCloseout(): void {
    this.closeCloseoutModal();
    this.executeFinalCloseout(this.selectedDisposition());
  }

  executeFinalCloseout(disposition?: CloseoutDisposition): void {
    this.isCloseoutLoading.set(true);
    const dto: FinalCloseoutRequestDto = disposition ? { disposition } : {};
    this.projectCloseoutService.finalCloseout(this.projectId, dto).subscribe({
      next: (res) => {
        this.isCloseoutLoading.set(false);
        if (res.success) {
          this.confirmService.alert({
            title: 'تم الإغلاق بنجاح',
            message: 'تم إغلاق المشروع نهائياً وحفظ الأرشيف والبيانات المالية وتصفية الصناديق بنجاح.',
            type: 'success'
          });
          this.fetchProjectDetails();
        } else {
          this.confirmService.alert({
            title: 'فشل الإغلاق النهائي',
            message: res.message || 'يرجى مراجعة كافة المعاملات والأرصدة المعلقة أولاً.',
            type: 'error'
          });
        }
      },
      error: (err) => {
        this.isCloseoutLoading.set(false);
        this.confirmService.alert({
          title: 'خطأ في الإغلاق',
          message: err.error?.message || err.message || 'فشلت عملية الإغلاق النهائي.',
          type: 'error'
        });
      }
    });
  }

  getPublicReviewUrl(): string {
    const proj = this.project();
    if (!proj || !proj.publicReviewToken) return '';
    return `${window.location.origin}/public/project-review/${proj.publicReviewToken}`;
  }

  copyReviewLink(): void {
    const url = this.getPublicReviewUrl();
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      this.confirmService.alert({
        title: 'تم النسخ',
        message: 'تم نسخ رابط تقييم العميل إلى الحافظة بنجاح.',
        type: 'success'
      });
    });
  }

  openWhatsAppModal(): void {
    const proj = this.project();
    let initialPhone = proj?.clientWhatsApp || '';
    if (initialPhone.startsWith('+20')) {
      this.whatsAppCountryCode.set('+20');
      initialPhone = initialPhone.substring(3);
    } else if (initialPhone.startsWith('20') && initialPhone.length > 10) {
      this.whatsAppCountryCode.set('+20');
      initialPhone = initialPhone.substring(2);
    }
    this.whatsAppPhone.set(initialPhone.trim());
    this.isWhatsAppModalOpen.set(true);
  }

  closeWhatsAppModal(): void {
    this.isWhatsAppModalOpen.set(false);
  }

  getSanitizedWhatsAppNumber(): string {
    let raw = this.whatsAppPhone() || '';
    let digits = raw.replace(/\D/g, '');
    const code = this.whatsAppCountryCode().replace('+', '');

    if (code === '20') {
      if (digits.startsWith('20') && digits.length === 12) {
        return digits;
      }
      if (digits.startsWith('0') && digits.length === 11) {
        return '20' + digits.substring(1);
      }
      if (digits.startsWith('1') && digits.length === 10) {
        return '20' + digits;
      }
      if (digits.length > 0) {
        return '20' + digits.replace(/^0+/, '');
      }
      return '';
    }

    if (digits.startsWith(code)) {
      return digits;
    }
    return code + digits.replace(/^0+/, '');
  }

  getWhatsAppMessageText(): string {
    const proj = this.project();
    const url = this.getPublicReviewUrl();
    return `مرحباً ${proj?.clientName || 'العميل الكريم'}،\nيسعدنا تقييمكم لجودة تنفيذ وتسليم مشروع "${proj?.name || ''}" عبر الرابط المباشر التالي:\n${url}\n\nشكراً لثقتكم بنا!`;
  }

  sendWhatsAppNow(): void {
    const phone = this.getSanitizedWhatsAppNumber();
    if (!phone || phone.length < 8) {
      this.confirmService.alert({
        title: 'رقم الهاتف غير صالح',
        message: 'يرجى إدخال رقم هاتف صحيح لإرسال رابط التقييم.',
        type: 'error'
      });
      return;
    }

    const message = this.getWhatsAppMessageText();
    const encodedMessage = encodeURIComponent(message);
    const finalUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    if (typeof window !== 'undefined') {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
      this.closeWhatsAppModal();
      this.confirmService.alert({
        title: 'تم تجهيز الرسالة',
        message: `تم فتح محادثة واتساب مع الرقم (+${phone}) بنجاح.`,
        type: 'success'
      });
    }
  }

  getWhatsAppShareUrl(): string {
    const phone = this.getSanitizedWhatsAppNumber();
    const message = this.getWhatsAppMessageText();
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  }

  shareReviewOnWhatsApp(): void {
    this.openWhatsAppModal();
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
      const fallback = img.nextElementSibling as HTMLElement;
      if (fallback) {
        fallback.classList.remove('hidden');
        fallback.classList.add('flex');
      }
    }
  }

  loadTenantProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.tenantProfile.set(res.data);
        }
      }
    });
  }

  openProjectReportModal(): void {
    this.reportActiveTab.set('summary');
    this.isProjectReportModalOpen.set(true);
    this.confirmService.toggleBodyScroll(true);
    if (!this.projectReportData()) {
      this.fetchProjectReport();
    }
  }

  closeProjectReportModal(): void {
    this.isProjectReportModalOpen.set(false);
    this.confirmService.toggleBodyScroll(false);
  }

  fetchProjectReport(): void {
    this.isProjectReportLoading.set(true);
    this.projectReportError.set(null);

    const sDate = this.reportStartDate() || undefined;
    const eDate = this.reportEndDate() || undefined;

    this.reportService.getProjectFullReport(this.projectId, sDate, eDate).subscribe({
      next: (res) => {
        this.isProjectReportLoading.set(false);
        if (res.success && res.data) {
          this.projectReportData.set(res.data);
        } else {
          this.projectReportError.set(res.message || 'فشل تحميل بيانات تقرير المشروع.');
        }
      },
      error: (err) => {
        this.isProjectReportLoading.set(false);
        this.projectReportError.set(err.error?.message || err.message || 'حدث خطأ أثناء استخراج التقرير المالي للمشروع.');
      }
    });
  }

  onReportStartDatePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.reportStartDate.set(input.value);
    this.fetchProjectReport();
  }

  onReportEndDatePicked(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.reportEndDate.set(input.value);
    this.fetchProjectReport();
  }

  onReportStartDateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawVal = input.value.trim();
    const parts = rawVal.split('/');
    if (parts.length === 3 && parts[2].length === 4 && parts[1].length === 2 && parts[0].length === 2) {
      const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
      this.reportStartDate.set(formatted);
      this.fetchProjectReport();
    }
  }

  onReportEndDateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawVal = input.value.trim();
    const parts = rawVal.split('/');
    if (parts.length === 3 && parts[2].length === 4 && parts[1].length === 2 && parts[0].length === 2) {
      const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
      this.reportEndDate.set(formatted);
      this.fetchProjectReport();
    }
  }

  resetReportDateFilter(): void {
    this.reportStartDate.set('');
    this.reportEndDate.set('');
    this.fetchProjectReport();
  }

  triggerPrintProjectReport(): void {
    const data = this.projectReportData();
    if (!data) return;
    this.activePrintFullReport.set(data);
    setTimeout(() => {
      window.print();
    }, 150);
  }
}

