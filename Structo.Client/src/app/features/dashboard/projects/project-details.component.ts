import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../../core/services/project.service';
import { PettyCashService } from '../../../core/services/petty-cash.service';
import { FinancialService } from '../../../core/services/financial.service';
import { ProjectDto } from '../../../core/models/project.models';
import { PettyCashMobileDto, PettyCashSettleDto } from '../../../core/models/petty-cash.models';
import { FinancialTransactionMobileDto } from '../../../core/models/financial.models';
import { ImageUploadService, SitePhotoDto } from '../../../core/services/image-upload.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, DatePipe, DecimalPipe, TranslatePipe],
  template: `
    <div class="space-y-6 w-full px-4 sm:px-6 lg:px-8">

      <!-- Header / Back button -->
      <div class="flex items-center gap-4">
        <a
          routerLink="/dashboard/projects"
          class="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
        <div>
          <span class="text-xs font-bold text-indigo-400 tracking-wider uppercase">{{ 'DETAILS.WORKSPACE' | translate }}</span>
          <h1 class="text-2xl font-extrabold tracking-tight text-white sm:text-3xl mt-0.5">
            @if (project()) {
              {{ project()!.name }}
            } @else if (isLoadingProject()) {
              <span class="text-slate-500">{{ 'DETAILS.LOADING_PROJECT' | translate }}</span>
            } @else {
              <span class="text-slate-500">{{ 'DETAILS.PROJECT_NOT_FOUND' | translate }}</span>
            }
          </h1>
        </div>
        @if (project()) {
          @if (project()!.isActive) {
            <span class="ml-auto rtl:mr-auto rtl:ml-0 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {{ 'PROJECTS.STATUS.ACTIVE' | translate }}
            </span>
          } @else {
            <span class="ml-auto rtl:mr-auto rtl:ml-0 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-800 text-slate-400">
              {{ 'PROJECTS.STATUS_CLOSED' | translate }}
            </span>
          }
        }
      </div>

      <!-- KPI Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
        @if (!isEngineer()) {
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">{{ 'DETAILS.TOTAL_INCOME' | translate }}</span>
            <h3 class="text-2xl font-extrabold text-emerald-400 mt-1">{{ totalIncome() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">{{ 'DETAILS.TOTAL_EXPENSES' | translate }}</span>
            <h3 class="text-2xl font-extrabold text-rose-400 mt-1">{{ totalExpenses() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">{{ 'DETAILS.NET_BALANCE' | translate }}</span>
            @if (netBalance() >= 0) {
              <h3 class="text-2xl font-extrabold text-emerald-400 mt-1">{{ netBalance() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
            } @else {
              <h3 class="text-2xl font-extrabold text-rose-400 mt-1">{{ netBalance() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
            }
          </div>
        }
        <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5" [class.col-span-2]="isEngineer()" [class.lg:col-span-4]="isEngineer()">
          <span class="text-xs text-slate-500 font-bold uppercase tracking-wider">{{ 'DETAILS.UNSETTLED_PETTY_CASH' | translate }}</span>
          <h3 class="text-2xl font-extrabold text-amber-400 mt-1">{{ totalUnsettledPettyCash() | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</h3>
        </div>
      </div>

      <!-- Description Block -->
      @if (project()) {
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6">
          <div class="space-y-4">
            <div>
              <span class="text-xs text-slate-500 font-bold uppercase tracking-wider block font-cairo">{{ 'PROJECTS.TABLE_CLIENT' | translate }}</span>
              <p class="text-base font-semibold text-slate-200 mt-1">{{ parsedClient() || 'N/A' }}</p>
            </div>
            <div>
              <span class="text-xs text-slate-500 font-bold uppercase tracking-wider block font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</span>
              <p class="text-base font-bold text-emerald-400 mt-1">{{ parsedBudget() | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}</p>
            </div>
          </div>
          <div>
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider block font-cairo">{{ 'DETAILS.SCOPE_DESC' | translate }}</span>
            <p class="text-sm text-slate-300 leading-relaxed mt-1 whitespace-pre-line">{{ parsedDescription() || ('PROJECTS.NO_DESCRIPTION' | translate) }}</p>
          </div>
        </div>
      }

      <!-- Tabs Navigation -->
      <div class="flex border-b border-slate-800 gap-6">
        <button
          id="tab-petty-cash"
          (click)="activeTab.set('petty-cash')"
          class="pb-3 text-sm font-semibold border-b-2 transition-all duration-150 cursor-pointer font-cairo"
          [class.border-indigo-500]="activeTab() === 'petty-cash'"
          [class.text-indigo-400]="activeTab() === 'petty-cash'"
          [class.border-transparent]="activeTab() !== 'petty-cash'"
          [class.text-slate-400]="activeTab() !== 'petty-cash'">
          {{ 'DETAILS.TAB_PETTY_CASH' | translate }}
          @if (unsettledCount() > 0) {
            <span class="ml-2 rtl:mr-2 rtl:ml-0 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">{{ unsettledCount() }}</span>
          }
        </button>
        @if (!isEngineer()) {
          <button
            id="tab-transactions"
            (click)="activeTab.set('transactions')"
            class="pb-3 text-sm font-semibold border-b-2 transition-all duration-150 cursor-pointer font-cairo"
            [class.border-indigo-500]="activeTab() === 'transactions'"
            [class.text-indigo-400]="activeTab() === 'transactions'"
            [class.border-transparent]="activeTab() !== 'transactions'"
            [class.text-slate-400]="activeTab() !== 'transactions'">
            {{ 'DETAILS.TAB_LEDGER' | translate }}
          </button>
        }
        @if (!isAccountant()) {
          <button
            id="tab-gallery"
            (click)="activeTab.set('gallery')"
            class="pb-3 text-sm font-semibold border-b-2 transition-all duration-150 cursor-pointer font-cairo"
            [class.border-indigo-500]="activeTab() === 'gallery'"
            [class.text-indigo-400]="activeTab() === 'gallery'"
            [class.border-transparent]="activeTab() !== 'gallery'"
            [class.text-slate-400]="activeTab() !== 'gallery'">
            {{ 'DETAILS.TAB_GALLERY' | translate }}
          </button>
        }
      </div>

      <!-- Tab Content: Project Gallery -->
      @if (activeTab() === 'gallery') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
          <div class="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h3 class="text-base font-bold text-white font-cairo">{{ 'MARKETPLACE.PROJECT_GALLERY' | translate }}</h3>
              <p class="text-xs text-slate-500 mt-1 font-cairo">Upload and manage site photos for public portfolio listings.</p>
            </div>
            <div>
              <button
                type="button"
                (click)="galleryFileInput.click()"
                [disabled]="isUploadingGallery()"
                class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo">
                @if (isUploadingGallery()) {
                  <svg class="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ 'DETAILS.UPLOADING' | translate }}
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  {{ 'DETAILS.UPLOAD_IMAGE' | translate }}
                }
              </button>
              <input
                #galleryFileInput
                type="file"
                class="hidden"
                (change)="onGalleryFileSelected($event)"
                accept="image/*">
            </div>
          </div>

          @if (isLoadingGallery()) {
            <div class="flex justify-center py-16">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              @for (photo of galleryPhotos(); track photo.id) {
                <div class="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
                  <img [src]="photo.photoUrl" alt="Gallery image" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-end">
                    <p class="text-[10px] text-slate-300 font-mono">{{ photo.uploadedAt | date:'yyyy-MM-dd HH:mm' }}</p>
                    <p class="text-[10px] text-slate-400 truncate mt-0.5">By: {{ photo.uploadedBy || 'Owner' }}</p>
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
      }

      <!-- Tab Content: Petty Cash -->
      @if (activeTab() === 'petty-cash') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white">{{ 'DETAILS.VOUCHERS_TITLE' | translate }}</h3>
            <div class="flex items-center gap-3">
              @if (isEngineer()) {
                <button
                  (click)="openRequestModal()"
                  class="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-xl text-white shadow-lg transition-all duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer font-cairo">
                  + Request Petty Cash
                </button>
              }
              <span class="text-xs text-slate-500 font-semibold">{{ pettyCashes().length }} {{ 'DETAILS.RECORDS' | translate }}</span>
            </div>
          </div>

          @if (isLoadingPettyCash()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="overflow-x-auto font-sans">
              <table class="w-full text-left rtl:text-right">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4">{{ 'DETAILS.TH_ISSUED_TO' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_REASON' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_DATE' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                    <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                    <th class="px-6 py-4 text-center">{{ 'DETAILS.TH_ACTION' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (item of pettyCashes(); track item.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 font-semibold text-white">{{ item.issuedTo || 'Staff' }}</td>
                      <td class="px-6 py-4 text-slate-400 max-w-xs truncate">{{ item.reason }}</td>
                      <td class="px-6 py-4 text-slate-400">{{ item.issuedAt | date:'yyyy-MM-dd HH:mm' }}</td>
                      <td class="px-6 py-4 font-mono font-bold text-amber-400">{{ item.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</td>
                      <td class="px-6 py-4 text-center">
                        @if (item.isSettled) {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400">
                            {{ 'DETAILS.STATUS_SETTLED' | translate }}
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400">
                            {{ 'DETAILS.STATUS_PENDING' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 text-center">
                        @if (!item.isSettled) {
                          <button
                            (click)="openSettleModal(item)"
                            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold rounded-lg text-white shadow-md shadow-indigo-600/10 transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer">
                            {{ 'DETAILS.BTN_SETTLE' | translate }}
                          </button>
                        } @else {
                          <span class="text-xs text-slate-600 italic">{{ 'DETAILS.LABEL_DONE' | translate }}</span>
                        }
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="px-6 py-14 text-center text-slate-500 text-sm">
                        {{ 'DETAILS.NO_VOUCHERS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }

      <!-- Tab Content: Financial Transactions -->
      @if (activeTab() === 'transactions') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div class="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
            <h3 class="text-base font-bold text-white">{{ 'DETAILS.LEDGER_TITLE' | translate }}</h3>
            <span class="text-xs text-slate-500 font-semibold">{{ transactions().length }} {{ 'DETAILS.ENTRIES' | translate }}</span>
          </div>

          @if (isLoadingTransactions()) {
            <div class="flex justify-center py-12">
              <svg class="animate-spin h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          } @else {
            <div class="overflow-x-auto font-sans">
              <table class="w-full text-left rtl:text-right">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wide">
                    <th class="px-6 py-4">{{ 'DETAILS.TH_DATE' | translate }}</th>
                    <th class="px-6 py-4">{{ 'PROJECTS.FIELD_DESC' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_STATUS' | translate }}</th>
                    <th class="px-6 py-4">{{ 'DETAILS.TH_AMOUNT' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (t of transactions(); track t.id) {
                    <tr class="hover:bg-slate-900/30 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 text-slate-400">{{ t.transactionDate | date:'yyyy-MM-dd HH:mm' }}</td>
                      <td class="px-6 py-4 font-medium text-white">{{ t.description }}</td>
                      <td class="px-6 py-4">
                        @if (t.type === 'Income') {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400">
                            {{ 'DETAILS.BADGE_INCOME' | translate }}
                          </span>
                        } @else {
                          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400">
                            {{ 'DETAILS.BADGE_EXPENSE' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 font-mono font-bold"
                          [class.text-emerald-400]="t.type === 'Income'"
                          [class.text-rose-400]="t.type !== 'Income'">
                        {{ t.type === 'Income' ? '+' : '-' }}{{ t.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="4" class="px-6 py-14 text-center text-slate-500 text-sm">
                        {{ 'DETAILS.NO_TRANSACTIONS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      }
    </div>

    <!-- Settle Petty Cash Modal -->
    @if (isSettleModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div (click)="closeSettleModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
        <div class="relative bg-slate-900 border border-slate-700/60 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl shadow-black/50 z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-xl font-bold text-white">{{ 'DETAILS.MODAL_SETTLE_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1">{{ 'DETAILS.MODAL_SETTLE_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeSettleModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Voucher Info Card -->
          @if (activePettyCash()) {
            <div class="my-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_ISSUED_TO' | translate }}</span>
                <span class="font-semibold">{{ activePettyCash()!.issuedTo || 'Staff' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_ISSUED_AMOUNT' | translate }}</span>
                <span class="font-bold text-amber-400 font-mono">{{ activePettyCash()!.amount | number:'1.2-2' }} {{ 'COMMON.CURRENCY' | translate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">{{ 'DETAILS.INFO_REASON' | translate }}</span>
                <span class="font-semibold text-right max-w-[180px] truncate">{{ activePettyCash()!.reason }}</span>
              </div>
            </div>
          }

          <!-- Settle Errors -->
          @if (settleErrors().length > 0) {
            <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1">{{ 'DETAILS.SETTLE_FAILED' | translate }}</span>
              @for (err of settleErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="settleForm" (ngSubmit)="onSettleSubmit()" class="space-y-4">
            <div>
              <label for="spentAmount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_SPENT' | translate }} <span class="text-red-400">*</span>
              </label>
              <input
                id="spentAmount"
                type="number"
                formControlName="spentAmount"
                step="0.01"
                min="0"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="0.00">
              @if (isSettleFieldInvalid('spentAmount')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_SPENT_ERR' | translate }}
                </span>
              }
            </div>

            <div>
              <label for="receiptDescription" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {{ 'DETAILS.INPUT_NOTES' | translate }} <span class="text-red-400">*</span>
              </label>
              <textarea
                id="receiptDescription"
                formControlName="receiptDescription"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="e.g. Purchased cement packets and scaffolding materials."></textarea>
              @if (isSettleFieldInvalid('receiptDescription')) {
                <span class="text-xs text-red-400 mt-1 block">
                  {{ 'DETAILS.INPUT_NOTES_ERR' | translate }}
                </span>
              }
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeSettleModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="settleForm.invalid || isSettling()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                @if (isSettling()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'DETAILS.PROCESSING' | translate }}
                  </span>
                } @else {
                  {{ 'DETAILS.BTN_SETTLE_SUBMIT' | translate }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- Request Petty Cash Modal -->
    @if (isRequestModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div (click)="closeRequestModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
        <div class="relative bg-slate-900 border border-slate-700/60 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl shadow-black/50 z-10">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h3 class="text-xl font-bold text-white">Request Petty Cash</h3>
              <p class="text-xs text-slate-400 mt-1">Submit a new petty cash request for project expenses.</p>
            </div>
            <button
              (click)="closeRequestModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Request Errors -->
          @if (requestErrors().length > 0) {
            <div class="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1">Request Failed</span>
              @for (err of requestErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="requestForm" (ngSubmit)="onRequestSubmit()" class="space-y-4">
            <div>
              <label for="req-amount" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Amount <span class="text-red-400">*</span>
              </label>
              <input
                id="req-amount"
                type="number"
                formControlName="amount"
                step="0.01"
                min="0.01"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="0.00">
              @if (isRequestFieldInvalid('amount')) {
                <span class="text-xs text-red-400 mt-1 block">
                  Please enter a valid amount greater than zero.
                </span>
              }
            </div>

            <div>
              <label for="req-reason" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Reason / Scope <span class="text-red-400">*</span>
              </label>
              <textarea
                id="req-reason"
                formControlName="reason"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="e.g. Scaffolding rental or site supplies purchase."></textarea>
              @if (isRequestFieldInvalid('reason')) {
                <span class="text-xs text-red-400 mt-1 block">
                  Please specify a reason of at least 5 characters.
                </span>
              }
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeRequestModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                [disabled]="requestForm.invalid || isRequesting()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                @if (isRequesting()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                } @else {
                  Submit Request
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class ProjectDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly pettyCashService = inject(PettyCashService);
  private readonly financialService = inject(FinancialService);
  private readonly uploadService = inject(ImageUploadService);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  readonly isTenantOwner = computed(() => this.currentUserRole() === 'TenantOwner');
  readonly isAccountant = computed(() => this.currentUserRole() === 'Accountant');
  readonly isEngineer = computed(() => ['Manager', 'SiteEngineer', 'DesignEngineer'].includes(this.currentUserRole()));

  readonly projectId = this.route.snapshot.paramMap.get('id') || '';
  readonly project = signal<ProjectDto | null>(null);

  readonly parsedClient = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).client || '';
      } catch (e) {}
    }
    return '';
  });

  readonly parsedBudget = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).budget || 0;
      } catch (e) {}
    }
    return 0;
  });

  readonly parsedDescription = computed(() => {
    const desc = this.project()?.description;
    if (desc && desc.startsWith('{')) {
      try {
        return JSON.parse(desc).description || '';
      } catch (e) {}
    }
    return desc || '';
  });

  readonly pettyCashes = signal<PettyCashMobileDto[]>([]);
  readonly transactions = signal<FinancialTransactionMobileDto[]>([]);

  readonly isLoadingProject = signal(false);
  readonly isLoadingPettyCash = signal(false);
  readonly isLoadingTransactions = signal(false);

  readonly activeTab = signal<'petty-cash' | 'transactions' | 'gallery'>('petty-cash');
  
  // Gallery signals
  readonly galleryPhotos = signal<SitePhotoDto[]>([]);
  readonly isLoadingGallery = signal(false);
  readonly isUploadingGallery = signal(false);

  readonly isSettleModalOpen = signal(false);
  readonly isSettling = signal(false);
  readonly settleErrors = signal<string[]>([]);
  readonly activePettyCash = signal<PettyCashMobileDto | null>(null);

  readonly settleForm: FormGroup = this.fb.group({
    spentAmount: [null, [Validators.required, Validators.min(0.01)]],
    receiptDescription: ['', [Validators.required, Validators.minLength(5)]]
  });

  readonly isRequestModalOpen = signal(false);
  readonly isRequesting = signal(false);
  readonly requestErrors = signal<string[]>([]);

  readonly requestForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(0.01)]],
    reason: ['', [Validators.required, Validators.minLength(5)]]
  });

  // Computed financial KPIs from transaction data
  readonly totalIncome = computed(() =>
    this.transactions()
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalExpenses = computed(() =>
    this.transactions()
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly netBalance = computed(() => this.totalIncome() - this.totalExpenses());

  readonly totalUnsettledPettyCash = computed(() =>
    this.pettyCashes()
      .filter(p => !p.isSettled)
      .reduce((sum, p) => sum + p.amount, 0)
  );

  readonly unsettledCount = computed(() =>
    this.pettyCashes().filter(p => !p.isSettled).length
  );

  ngOnInit(): void {
    if (this.projectId) {
      if (this.isEngineer()) {
        this.activeTab.set('petty-cash');
      } else if (this.isAccountant()) {
        this.activeTab.set('transactions');
      } else {
        this.activeTab.set('petty-cash');
      }

      this.fetchProjectDetails();
      this.fetchPettyCash();
      if (!this.isEngineer()) {
        this.fetchTransactions();
      }
      this.fetchGalleryPhotos();
    }
  }

  fetchGalleryPhotos(): void {
    this.isLoadingGallery.set(true);
    this.uploadService.getProjectPhotos(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingGallery.set(false);
        if (response.success && response.data) {
          this.galleryPhotos.set(response.data.items);
        }
      },
      error: () => this.isLoadingGallery.set(false)
    });
  }

  onGalleryFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.isUploadingGallery.set(true);
      this.uploadService.uploadProjectGallery(this.projectId, file).subscribe({
        next: (res) => {
          this.isUploadingGallery.set(false);
          if (res.success) {
            this.fetchGalleryPhotos();
          }
        },
        error: () => this.isUploadingGallery.set(false)
      });
    }
  }

  fetchProjectDetails(): void {
    this.isLoadingProject.set(true);
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingProject.set(false);
        if (response.success && response.data) {
          const proj = response.data;
          const user = this.authService.currentUser();
          if (user && ['Manager', 'SiteEngineer', 'DesignEngineer'].includes(user.role) && proj.managerId !== user.userId) {
            this.router.navigate(['/dashboard/projects']);
            return;
          }
          this.project.set(proj);
        }
      },
      error: () => this.isLoadingProject.set(false)
    });
  }

  fetchPettyCash(): void {
    this.isLoadingPettyCash.set(true);
    this.pettyCashService.getProjectPettyCash(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingPettyCash.set(false);
        if (response.success && response.data) {
          this.pettyCashes.set(response.data.items);
        }
      },
      error: () => this.isLoadingPettyCash.set(false)
    });
  }

  fetchTransactions(): void {
    this.isLoadingTransactions.set(true);
    this.financialService.getProjectTransactions(this.projectId).subscribe({
      next: (response) => {
        this.isLoadingTransactions.set(false);
        if (response.success && response.data) {
          this.transactions.set(response.data.items);
        }
      },
      error: () => this.isLoadingTransactions.set(false)
    });
  }

  isSettleFieldInvalid(fieldName: string): boolean {
    const field = this.settleForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openSettleModal(item: PettyCashMobileDto): void {
    this.activePettyCash.set(item);
    this.settleErrors.set([]);
    this.settleForm.reset({
      spentAmount: item.amount,
      receiptDescription: ''
    });

    // Dynamically set max validator based on issued amount
    this.settleForm.get('spentAmount')?.setValidators([
      Validators.required,
      Validators.min(0.01),
      Validators.max(item.amount)
    ]);
    this.settleForm.get('spentAmount')?.updateValueAndValidity();

    this.isSettleModalOpen.set(true);
  }

  closeSettleModal(): void {
    this.isSettleModalOpen.set(false);
    this.activePettyCash.set(null);
    this.settleErrors.set([]);
  }

  async onSettleSubmit(): Promise<void> {
    if (this.settleForm.invalid || !this.activePettyCash()) {
      this.settleForm.markAllAsTouched();
      return;
    }

    this.isSettling.set(true);
    this.settleErrors.set([]);

    const formVal = this.settleForm.value;
    const dto: PettyCashSettleDto = {
      spentAmount: formVal.spentAmount,
      receiptDescription: formVal.receiptDescription
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
    this.requestErrors.set([]);
    this.requestForm.reset({
      amount: null,
      reason: ''
    });
    this.isRequestModalOpen.set(true);
  }

  closeRequestModal(): void {
    this.isRequestModalOpen.set(false);
    this.requestErrors.set([]);
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
      reason: formVal.reason
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
}


