import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ManualPaymentRequest, ManualPaymentService } from '../../../core/services/manual-payment.service';
import { ApiDatePipe, parseApiDate } from '../../../core/pipes/api-date.pipe';
import { ConfirmModalService } from '../../../core/services/confirm-modal.service';
import { ToastService } from '../../../core/services/toast.service';

/**
 * SuperAdmin review of manual InstaPay payments. All view state lives in signals (no plain fields
 * mutated in async callbacks) and dates go through apiDate, so rows render as soon as data arrives.
 */
@Component({
  selector: 'app-payment-requests',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ApiDatePipe],
  template: `
    <div class="p-4 sm:p-6 max-w-7xl mx-auto space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 class="text-xl font-bold text-white">{{ 'INSTAPAY.ADMIN_TITLE' | translate }}</h1>
          <p class="text-xs text-slate-400 mt-1">{{ 'INSTAPAY.ADMIN_SUBTITLE' | translate }}</p>
        </div>
        <div class="flex gap-2">
          <button (click)="filter.set('Pending')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            [class.bg-indigo-600]="filter() === 'Pending'" [class.text-white]="filter() === 'Pending'"
            [class.bg-slate-800]="filter() !== 'Pending'" [class.text-slate-300]="filter() !== 'Pending'">
            {{ 'INSTAPAY.FILTER_PENDING' | translate }} ({{ pendingCount() }})
          </button>
          <button (click)="filter.set('All')" class="px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer"
            [class.bg-indigo-600]="filter() === 'All'" [class.text-white]="filter() === 'All'"
            [class.bg-slate-800]="filter() !== 'All'" [class.text-slate-300]="filter() !== 'All'">
            {{ 'INSTAPAY.FILTER_ALL' | translate }} ({{ requests().length }})
          </button>
        </div>
      </div>

      <div role="note" class="flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-200 text-sm font-bold">
        <span aria-hidden="true">⚠️</span>
        <span>{{ 'INSTAPAY.ADMIN_REMINDER' | translate }}</span>
      </div>

      @if (isLoading() && requests().length === 0) {
        <p class="text-sm text-slate-400">{{ 'INSTAPAY.LOADING' | translate }}</p>
      } @else if (visible().length === 0) {
        <p class="text-sm text-slate-400">{{ (filter() === 'Pending' ? 'INSTAPAY.NO_PENDING' : 'INSTAPAY.NO_ITEMS') | translate }}</p>
      } @else {
        <div class="space-y-3">
          @for (req of visible(); track req.id) {
            <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 grid gap-4 md:grid-cols-[1fr_auto] text-sm">
              <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <p class="text-[11px] text-slate-500">{{ 'INSTAPAY.COL_TENANT' | translate }}</p>
                  <p class="font-bold text-white break-words">{{ req.tenantName }}</p>
                </div>
                <div>
                  <p class="text-[11px] text-slate-500">{{ 'INSTAPAY.COL_PACKAGE' | translate }}</p>
                  <p class="text-slate-200">{{ ('INSTAPAY.PACKAGE_' + req.packageType) | translate }}</p>
                </div>
                <div>
                  <p class="text-[11px] text-slate-500">{{ 'INSTAPAY.COL_AMOUNT' | translate }}</p>
                  <p class="font-bold text-emerald-300">{{ req.amountEgp | number:'1.0-0' }} {{ 'INSTAPAY.EGP' | translate }}</p>
                </div>
                <div>
                  <p class="text-[11px] text-slate-500">{{ 'INSTAPAY.COL_REFERENCE' | translate }}</p>
                  <p class="font-mono font-bold text-indigo-300" dir="ltr">{{ req.referenceCode }}</p>
                </div>
                <div>
                  <p class="text-[11px] text-slate-500">{{ 'INSTAPAY.COL_AGE' | translate }}</p>
                  <p class="text-slate-200" [title]="req.createdAt | apiDate:'dd/MM/yyyy HH:mm'">{{ age(req) }}</p>
                </div>
                <div class="col-span-2 lg:col-span-5 flex flex-wrap items-center gap-3">
                  <span class="px-2.5 py-1 rounded-full text-xs font-bold"
                    [class.bg-amber-500/15]="req.status === 'Pending'" [class.text-amber-300]="req.status === 'Pending'"
                    [class.bg-emerald-500/15]="req.status === 'Approved'" [class.text-emerald-300]="req.status === 'Approved'"
                    [class.bg-rose-500/15]="req.status === 'Rejected'" [class.text-rose-300]="req.status === 'Rejected'"
                    [class.bg-slate-500/15]="req.status === 'Expired'" [class.text-slate-300]="req.status === 'Expired'">
                    {{ ('INSTAPAY.STATUS_' + req.status) | translate }}
                  </span>
                  @if (req.rejectReason) {
                    <span class="text-xs text-rose-300">{{ 'INSTAPAY.REJECT_REASON' | translate }}: {{ req.rejectReason }}</span>
                  }
                  @if (req.adminNote) {
                    <span class="text-xs text-slate-400">📝 {{ req.adminNote }}</span>
                  }
                </div>
              </div>

              <div class="flex md:flex-col items-start md:items-end gap-3">
                @if (req.screenshotUrl) {
                  <a [href]="req.screenshotUrl" target="_blank" rel="noopener" class="block" [title]="'INSTAPAY.VIEW_RECEIPT' | translate">
                    <img [src]="req.screenshotUrl" [alt]="'INSTAPAY.VIEW_RECEIPT' | translate"
                      class="h-24 w-24 object-cover rounded-xl border border-slate-700 bg-slate-800" loading="lazy" />
                  </a>
                } @else {
                  <span class="text-xs text-slate-500">{{ 'INSTAPAY.NO_RECEIPT' | translate }}</span>
                }

                @if (req.status === 'Pending') {
                  @if (rejectingId() === req.id) {
                    <div class="w-full md:w-72 space-y-2">
                      <textarea rows="2" maxlength="500" [value]="rejectReason()" (input)="rejectReason.set($any($event.target).value)"
                        [placeholder]="'INSTAPAY.REJECT_REASON_PLACEHOLDER' | translate"
                        class="w-full rounded-xl bg-slate-800 border border-slate-700 p-2 text-xs text-white"></textarea>
                      <textarea rows="1" maxlength="1000" [value]="adminNote()" (input)="adminNote.set($any($event.target).value)"
                        [placeholder]="'INSTAPAY.ADMIN_NOTE_PLACEHOLDER' | translate"
                        class="w-full rounded-xl bg-slate-800 border border-slate-700 p-2 text-xs text-white"></textarea>
                      @if (rejectError()) {
                        <p class="text-xs text-rose-300">{{ rejectError() }}</p>
                      }
                      <div class="flex gap-2">
                        <button (click)="confirmReject(req)" [disabled]="busyId() === req.id"
                          class="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50">
                          {{ 'INSTAPAY.CONFIRM_REJECT' | translate }}
                        </button>
                        <button (click)="rejectingId.set(null)" class="px-3 py-1.5 rounded-xl bg-slate-700 text-white text-xs font-bold cursor-pointer">
                          {{ 'INSTAPAY.CANCEL' | translate }}
                        </button>
                      </div>
                    </div>
                  } @else {
                    <div class="flex gap-2">
                      <button (click)="approve(req)" [disabled]="busyId() !== null"
                        class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer disabled:opacity-50">
                        {{ 'INSTAPAY.APPROVE' | translate }}
                      </button>
                      <button (click)="startReject(req)" [disabled]="busyId() !== null"
                        class="px-4 py-2 rounded-xl bg-slate-700 hover:bg-rose-600 text-white text-xs font-bold cursor-pointer disabled:opacity-50">
                        {{ 'INSTAPAY.REJECT' | translate }}
                      </button>
                    </div>
                  }
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class PaymentRequestsComponent implements OnInit {
  private readonly manualPayments = inject(ManualPaymentService);
  private readonly confirmModal = inject(ConfirmModalService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly requests = signal<ManualPaymentRequest[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly filter = signal<'Pending' | 'All'>('Pending');
  readonly busyId = signal<string | null>(null);
  readonly rejectingId = signal<string | null>(null);
  readonly rejectReason = signal<string>('');
  readonly adminNote = signal<string>('');
  readonly rejectError = signal<string | null>(null);
  /** Ticks every minute so the age column stays current without a reload. */
  private readonly now = signal<number>(Date.now());

  readonly pendingCount = computed(() => this.requests().filter((r) => r.status === 'Pending').length);
  readonly visible = computed(() => {
    const list = this.requests();
    return this.filter() === 'Pending' ? list.filter((r) => r.status === 'Pending') : list;
  });

  ngOnInit(): void {
    this.load();
    interval(60_000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.now.set(Date.now()));
  }

  load(): void {
    this.isLoading.set(true);
    this.manualPayments.adminList().subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.requests.set(res.data ?? []);
      },
      error: () => this.isLoading.set(false)
    });
  }

  age(req: ManualPaymentRequest): string {
    const created = parseApiDate(req.createdAt);
    if (!created) return '—';
    const minutes = Math.max(0, Math.floor((this.now() - created.getTime()) / 60_000));
    if (minutes < 60) return this.translate.instant('INSTAPAY.AGE_MINUTES', { n: minutes });
    const hours = Math.floor(minutes / 60);
    if (hours < 48) return this.translate.instant('INSTAPAY.AGE_HOURS', { n: hours });
    return this.translate.instant('INSTAPAY.AGE_DAYS', { n: Math.floor(hours / 24) });
  }

  async approve(req: ManualPaymentRequest): Promise<void> {
    const ok = await this.confirmModal.confirm({
      title: this.translate.instant('INSTAPAY.APPROVE_CONFIRM_TITLE'),
      message: this.translate.instant('INSTAPAY.APPROVE_CONFIRM_MESSAGE', {
        projects: req.projectsQuantity, company: req.tenantName, code: req.referenceCode, amount: req.amountEgp
      }),
      confirmText: this.translate.instant('INSTAPAY.APPROVE'),
      cancelText: this.translate.instant('INSTAPAY.CANCEL'),
      type: 'warning'
    });
    if (!ok) return;

    this.busyId.set(req.id);
    this.manualPayments.approve(req.id).subscribe({
      next: (res) => {
        this.busyId.set(null);
        this.toast.show(this.translate.instant('INSTAPAY.APPROVED_TOAST'), res.message, 'success');
        this.load();
      },
      error: (err) => {
        this.busyId.set(null);
        this.toast.show(this.translate.instant('INSTAPAY.ERROR'), err?.error?.message ?? '', 'error');
        this.load();
      }
    });
  }

  startReject(req: ManualPaymentRequest): void {
    this.rejectingId.set(req.id);
    this.rejectReason.set('');
    this.adminNote.set('');
    this.rejectError.set(null);
  }

  confirmReject(req: ManualPaymentRequest): void {
    const reason = this.rejectReason().trim();
    if (!reason) {
      this.rejectError.set(this.translate.instant('INSTAPAY.REASON_REQUIRED'));
      return;
    }

    this.busyId.set(req.id);
    this.manualPayments.reject(req.id, reason, this.adminNote().trim() || undefined).subscribe({
      next: () => {
        this.busyId.set(null);
        this.rejectingId.set(null);
        this.toast.show(this.translate.instant('INSTAPAY.REJECTED_TOAST'), req.referenceCode, 'info');
        this.load();
      },
      error: (err) => {
        this.busyId.set(null);
        this.rejectError.set(err?.error?.message ?? this.translate.instant('INSTAPAY.ERROR'));
      }
    });
  }
}
