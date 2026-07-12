import { Component, OnInit, inject, signal, computed, ElementRef, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectDto, ProjectCreateDto } from '../../../core/models/project.models';
import { TenantUserService, UserDto, UserCreateDto } from '../../../core/services/tenant-user.service';
import { TenantProfileService, TenantProfileUpdateDto } from '../../../core/services/tenant-profile.service';
import { OfflineSyncService } from '../../../core/services/offline-sync.service';
import { WhatsAppLinkService } from '../../../core/services/whatsapp-link.service';
import { ImageUploadService } from '../../../core/services/image-upload.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmModalService } from '../../../core/services/confirm-modal.service';
import { ToastService } from '../../../core/services/toast.service';
import { take } from 'rxjs';
import * as L from 'leaflet';

interface MapSearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface GovernorateOption {
  id: string;
  label: string;
}
export interface ProjectViewDto extends ProjectDto {
  client: string;
  budget: number;
  status: 'Active' | 'Delayed' | 'Completed';
  category: string;
  isPublicPortfolio: boolean;
}

const GOVERNORATES: GovernorateOption[] = [
  { id: 'Cairo', label: 'Cairo / القاهرة' },
  { id: 'Giza', label: 'Giza / الجيزة' },
  { id: 'Alexandria', label: 'Alexandria / الإسكندرية' },
  { id: 'Qalyubia', label: 'Qalyubia / القليوبية' },
  { id: 'Gharbia', label: 'Gharbia / الغربية' },
  { id: 'Dakahlia', label: 'Dakahlia / الدقهلية' },
  { id: 'Sharqia', label: 'Sharqia / الشرقية' },
  { id: 'Monufia', label: 'Monufia / المنوفية' },
  { id: 'Beheira', label: 'Beheira / البحيرة' },
  { id: 'Kafr El Sheikh', label: 'Kafr El Sheikh / كفر الشيخ' },
  { id: 'Damietta', label: 'Damietta / دمياط' },
  { id: 'Port Said', label: 'Port Said / بورسعيد' },
  { id: 'Ismailia', label: 'Ismailia / الإسماعيلية' },
  { id: 'Suez', label: 'Suez / السويس' },
  { id: 'Aswan', label: 'Aswan / أسوان' },
  { id: 'Luxor', label: 'Luxor / الأقصر' },
  { id: 'Red Sea', label: 'Red Sea / البحر الأحمر' },
  { id: 'Matrouh', label: 'Matrouh / مطروح' }
];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, TranslatePipe],
  template: `
    <div class="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            @if (activeTab() === 'projects') {
              {{ 'PROJECTS.PAGE_TITLE' | translate }}
            } @else if (activeTab() === 'users') {
              {{ 'USERS.TAB_USERS' | translate }}
            } @else {
              {{ 'PROFILE.TAB_PROFILE' | translate }}
            }
          </h1>
          <p class="text-sm text-slate-400 mt-1">
            @if (activeTab() === 'projects') {
              {{ 'PROJECTS.PAGE_SUBTITLE' | translate }}
            } @else if (activeTab() === 'users') {
              {{ 'USERS.MODAL_SUBTITLE' | translate }}
            } @else {
              {{ 'MARKETPLACE.SECTION_SUBTITLE' | translate }}
            }
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          @if (activeTab() === 'projects' && currentUserRole() === 'TenantOwner') {
            <button
              id="btn-new-project"
              (click)="openProjectModal()"
              class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-cairo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              {{ 'PROJECTS.NEW_PROJECT' | translate }}
            </button>
          } @else if (activeTab() === 'users') {
            <button
              id="btn-new-user"
              (click)="openUserModal()"
              class="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-cairo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              {{ 'USERS.NEW_USER' | translate }}
            </button>
          }
        </div>
      </div>

      <!-- Navigation Tabs -->
      @if (currentUserRole() === 'TenantOwner') {
        <div class="border-b border-slate-800">
          <nav class="flex gap-8">
            <button 
              (click)="navigateToTab('projects')" 
              class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
              [class.border-indigo-500]="activeTab() === 'projects'"
              [class.text-indigo-400]="activeTab() === 'projects'"
              [class.border-transparent]="activeTab() !== 'projects'"
              [class.text-slate-400]="activeTab() !== 'projects'"
              [class.hover:text-slate-200]="activeTab() !== 'projects'">
              {{ 'PROJECTS.PAGE_TITLE' | translate }}
            </button>
            <button 
              (click)="navigateToTab('users')" 
              class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
              [class.border-indigo-500]="activeTab() === 'users'"
              [class.text-indigo-400]="activeTab() === 'users'"
              [class.border-transparent]="activeTab() !== 'users'"
              [class.text-slate-400]="activeTab() !== 'users'"
              [class.hover:text-slate-200]="activeTab() !== 'users'">
              {{ 'USERS.TAB_USERS' | translate }}
            </button>
            <button 
              (click)="navigateToTab('profile')" 
              class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
              [class.border-indigo-500]="activeTab() === 'profile'"
              [class.text-indigo-400]="activeTab() === 'profile'"
              [class.border-transparent]="activeTab() !== 'profile'"
              [class.text-slate-400]="activeTab() !== 'profile'"
              [class.hover:text-slate-200]="activeTab() !== 'profile'">
              {{ 'PROFILE.TAB_PROFILE' | translate }}
            </button>
          </nav>
        </div>
      }

      <!-- SECTION 1: PROJECTS HUB -->
      @if (activeTab() === 'projects') {
        <!-- Projects Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.STAT_TOTAL' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-white mt-1">{{ projects().length }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.STAT_ACTIVE' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-indigo-400 mt-1">{{ activeProjectsCount() }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'PROJECTS.STAT_COMPLETED' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">{{ completedProjectsCount() }}</h3>
          </div>
        </div>

        <!-- Projects Loading State -->
        @if (isLoadingProjects()) {
          <div class="flex justify-center items-center py-20">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }

        <!-- Projects Error State -->
        @if (projectError()) {
          <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-5 text-sm text-red-400 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ projectError() }}</span>
          </div>
        }

        <!-- Projects Grid / Table View -->
        @if (!isLoadingProjects()) {
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
            <div class="overflow-x-auto font-sans">
              <table class="w-full text-left rtl:text-right">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-950/40">
                    <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_NAME' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_CLIENT' | translate }}</th>
                    @if (!isEngineer()) {
                      <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</th>
                    }
                    <th class="px-6 py-4 text-center font-cairo">{{ 'PROJECTS.TABLE_STATUS' | translate }}</th>
                    <th class="px-6 py-4 text-center font-cairo">{{ 'PROJECTS.FIELD_CATEGORY' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_START_DATE' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (proj of projects(); track proj.id) {
                    <tr 
                      (click)="viewDetails(proj.id)"
                      class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300 cursor-pointer">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                          <div class="font-bold text-white hover:text-indigo-400 transition-colors duration-200">
                            {{ proj.name }}
                          </div>
                          @if (proj.isPublicPortfolio) {
                            <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Public</span>
                          }
                        </div>
                        <span class="block text-xs font-normal text-slate-500 mt-0.5 max-w-xs truncate">
                          {{ proj.description || ('PROJECTS.NO_DESCRIPTION' | translate) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-slate-400 font-medium">{{ proj.client }}</td>
                      @if (!isEngineer()) {
                        <td class="px-6 py-4 font-mono text-emerald-400 font-bold">
                          {{ proj.budget | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}
                        </td>
                      }
                      <td class="px-6 py-4 text-center">
                        @if (proj.status === 'Active') {
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-cairo">
                            {{ 'PROJECTS.STATUS.ACTIVE' | translate }}
                          </span>
                        } @else if (proj.status === 'Delayed') {
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 font-cairo">
                            {{ 'PROJECTS.STATUS.DELAYED' | translate }}
                          </span>
                        } @else {
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-400 border border-slate-700 font-cairo">
                            {{ 'PROJECTS.STATUS.COMPLETED' | translate }}
                          </span>
                        }
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span class="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 text-xs border border-slate-700 font-cairo">
                          {{ 'PROJECTS.CATEGORIES.' + proj.category | translate }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-slate-400">{{ proj.startDate | date:'dd/MM/yyyy' }}</td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="px-6 py-16 text-center text-slate-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                        </svg>
                        <p class="font-bold text-slate-400 font-cairo">{{ 'PROJECTS.NO_PROJECTS' | translate }}</p>
                        <p class="text-xs text-slate-500 mt-1 font-cairo">{{ 'PROJECTS.CREATE_FIRST' | translate }}</p>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      }

      <!-- SECTION 2: COMPANY USERS MANAGEMENT -->
      @if (activeTab() === 'users' && currentUserRole() === 'TenantOwner') {
        <!-- Users Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'USERS.STAT_TOTAL' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-white mt-1">{{ users().length }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'USERS.STAT_MANAGERS' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-indigo-400 mt-1">{{ managerCount() }}</h3>
          </div>
          <div class="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
            <span class="text-xs text-slate-500 font-bold uppercase tracking-wider font-cairo">{{ 'USERS.STAT_ENGINEERS' | translate }}</span>
            <h3 class="text-3xl font-extrabold text-emerald-400 mt-1">{{ engineerCount() }}</h3>
          </div>
        </div>

        <!-- Users Table View -->
        @if (!isLoadingUsers()) {
          <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
            <div class="overflow-x-auto font-sans">
              <table class="w-full text-left rtl:text-right">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-950/40">
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_FIRST_NAME' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_LAST_NAME' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_EMAIL' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">Contact</th>
                    <th class="px-6 py-4 font-cairo">WhatsApp</th>
                    <th class="px-6 py-4 text-center font-cairo">{{ 'USERS.TABLE_ROLE' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_CREATED_AT' | translate }}</th>
                    <th class="px-6 py-4 text-center font-cairo">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (usr of users(); track usr.id) {
                    <tr class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4">
                        <div class="flex items-center justify-between gap-3">
                          <div class="min-w-0">
                            <div class="font-bold text-white truncate">{{ usr.firstName }}</div>
                            <div class="mt-1 inline-flex items-center gap-2 text-xs font-semibold"
                              [class.text-emerald-400]="usr.isActive"
                              [class.text-rose-400]="!usr.isActive">
                              <span class="h-2.5 w-2.5 rounded-full shadow-[0_0_10px_currentColor]"
                                [class.bg-emerald-400]="usr.isActive"
                                [class.bg-rose-400]="!usr.isActive"></span>
                              {{ usr.isActive ? ('USERS.STATUS_ACTIVE' | translate) : ('USERS.STATUS_SUSPENDED' | translate) }}
                            </div>

                            @if (usr.id === currentUserId()) {
                              <span class="mt-2 inline-flex rounded-full border border-slate-700 bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {{ 'USERS.CURRENT_USER' | translate }}
                              </span>
                            }
                          </div>

                          <button
                            type="button"
                            (click)="toggleUserStatus(usr)"
                            [disabled]="isUserToggleLoading(usr.id) || usr.id === currentUserId()"
                            class="inline-flex items-center gap-2 rounded-full border px-2 py-1.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            [class.border-emerald-500/30]="usr.isActive"
                            [class.bg-emerald-500/10]="usr.isActive"
                            [class.text-emerald-400]="usr.isActive"
                            [class.hover:bg-emerald-500/20]="usr.isActive"
                            [class.border-rose-500/30]="!usr.isActive"
                            [class.bg-rose-500/10]="!usr.isActive"
                            [class.text-rose-400]="!usr.isActive"
                            [class.hover:bg-rose-500/20]="!usr.isActive"
                            [class.shadow-[0_0_18px_rgba(16,185,129,0.12)]]="usr.isActive"
                            [class.shadow-[0_0_18px_rgba(244,63,94,0.12)]]="!usr.isActive">
                            @if (isUserToggleLoading(usr.id)) {
                              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                                <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            } @else if (usr.id === currentUserId()) {
                              <span class="text-[10px] font-bold uppercase tracking-wider">
                                {{ 'USERS.CURRENT_USER' | translate }}
                              </span>
                            } @else {
                              <span class="h-2.5 w-2.5 rounded-full"
                                [class.bg-emerald-400]="usr.isActive"
                                [class.bg-rose-400]="!usr.isActive"></span>
                              <span class="text-[10px] font-bold uppercase tracking-wider">
                                {{ usr.isActive ? ('USERS.ACTION_SUSPEND' | translate) : ('USERS.ACTION_ACTIVATE' | translate) }}
                              </span>
                            }
                          </button>
                        </div>
                      </td>
                      <td class="px-6 py-4 font-medium text-slate-300">{{ usr.lastName }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono">{{ usr.email }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono">{{ usr.personalPhone || '—' }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono">{{ usr.whatsAppPhone || '—' }}</td>
                      <td class="px-6 py-4 text-center">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase font-cairo"
                          [class.bg-indigo-500/10]="usr.role === 'Manager'"
                          [class.text-indigo-400]="usr.role === 'Manager'"
                          [class.border]="usr.role === 'Manager'"
                          [class.border-indigo-500/20]="usr.role === 'Manager'"
                          [class.bg-emerald-500/10]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.text-emerald-400]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.border-emerald-500/20]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.border]="usr.role === 'SiteEngineer' || usr.role === 'DesignEngineer'"
                          [class.bg-purple-500/10]="usr.role === 'Accountant'"
                          [class.text-purple-400]="usr.role === 'Accountant'"
                          [class.border-purple-500/20]="usr.role === 'Accountant'"
                          [class.border]="usr.role === 'Accountant'">
                          {{ 'USERS.ROLES.' + usr.role | translate }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-slate-400">{{ usr.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
                      <td class="px-6 py-4 text-center">
                        @if (usr.whatsAppPhone) {
                          <button
                            type="button"
                            (click)="openWhatsAppForUser(usr)"
                            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer font-cairo">
                            إرسال عبر الواتساب
                          </button>
                        } @else {
                          <span class="text-slate-600 text-xs">—</span>
                        }
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="8" class="px-6 py-16 text-center text-slate-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p class="font-bold text-slate-400 font-cairo">{{ 'USERS.NO_USERS' | translate }}</p>
                        <p class="text-xs text-slate-500 mt-1 font-cairo">{{ 'USERS.CREATE_FIRST' | translate }}</p>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
      }

      <!-- SECTION 3: CORPORATE PROFILE EDITOR -->
      @if (activeTab() === 'profile' && currentUserRole() === 'TenantOwner') {
        <div class="bg-slate-900/25 border border-slate-800/80 rounded-2xl shadow-2xl max-w-3xl overflow-hidden">

          <!-- Banner Preview Header -->
          <div class="w-full h-36 sm:h-44 bg-slate-800 relative overflow-hidden group">
            @if (profileForm.get('bannerUrl')?.value) {
              <img [src]="profileForm.get('bannerUrl')?.value" alt="Banner" class="w-full h-full object-cover">
            } @else {
              <div class="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 flex items-center justify-center">
                <svg class="w-10 h-10 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            }
            <!-- Banner Upload Overlay -->
            <button type="button" (click)="bannerFileInput.click()" class="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
              <span class="flex items-center gap-2 text-white text-xs font-bold font-cairo bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700 backdrop-blur-sm">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                تغيير البانر
              </span>
            </button>
            <input #bannerFileInput type="file" class="hidden" (change)="onBannerFileSelected($event)" accept="image/*">
            <input type="hidden" [formControl]="$any(profileForm.get('bannerUrl'))">
            <!-- Banner Uploading Overlay -->
            @if (isUploadingBanner()) {
              <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <svg class="animate-spin h-8 w-8 text-indigo-400 mb-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span class="text-xs text-indigo-300 font-cairo font-bold">جاري الرفع...</span>
              </div>
            }
          </div>

          <!-- Logo + Form Body -->
          <div class="p-6 md:p-8 -mt-12 relative z-10">
            <!-- Logo Circle -->
            <div class="flex items-end gap-4 mb-6">
              <div class="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden relative group shadow-xl shrink-0">
                @if (profileForm.get('logoUrl')?.value) {
                  <img [src]="profileForm.get('logoUrl')?.value" alt="Logo" class="w-full h-full object-cover">
                } @else {
                  <span class="text-3xl font-extrabold text-slate-600 select-none">{{ (profileForm.get('name')?.value || 'S').charAt(0).toUpperCase() }}</span>
                }
                <!-- Logo Upload Overlay -->
                <button type="button" (click)="logoFileInput.click()" class="absolute inset-0 rounded-full bg-slate-950/0 group-hover:bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                  <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
                <input #logoFileInput type="file" class="hidden" (change)="onLogoFileSelected($event)" accept="image/*">
                <input type="hidden" [formControl]="$any(profileForm.get('logoUrl'))">
                <!-- Logo Uploading Overlay -->
                @if (isUploadingLogo()) {
                  <div class="absolute inset-0 rounded-full bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <svg class="animate-spin h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                }
              </div>
              <div class="pb-1">
                <h3 class="text-lg font-bold text-white font-cairo">{{ profileForm.get('name')?.value || 'Company Profile' }}</h3>
                <p class="text-xs text-slate-500 font-cairo">{{ resolveGovernorateLabel(profileForm.get('governorateId')?.value || profileForm.get('region')?.value) || 'Region not set' }}</p>
              </div>
            </div>

            @if (profileSuccessMessage()) {
              <div class="mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-400 font-cairo">
                ✓ {{ profileSuccessMessage() }}
              </div>
            }

            <form [formGroup]="profileForm" (ngSubmit)="onProfileSubmit()" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label for="prof-name" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_NAME' | translate }} <span class="text-red-400">*</span></label>
                  <input id="prof-name" type="text" formControlName="name" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200" placeholder="Company Name">
                </div>
                <div>
                  <label for="prof-gov" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Governorate</label>
                  <select id="prof-gov" formControlName="governorateId" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                    <option value="">-- Select governorate --</option>
                    @for (gov of governorates; track gov.id) {
                      <option [value]="gov.id">{{ gov.label }}</option>
                    }
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label for="prof-personal-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Personal Phone</label>
                  <input id="prof-personal-phone" type="tel" formControlName="personalPhone" inputmode="numeric" maxlength="11" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200" placeholder="01xxxxxxxxx">
                </div>
                <div>
                  <label for="prof-whatsapp-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.86.52 3.58 1.42 5.06L2 22l4.99-1.39A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.63-1.28 1.2-1.76 1.25-.47.05-1.05.07-1.7-.14-.4-.13-.91-.31-1.57-.59-2.77-1.19-4.58-3.98-4.72-4.17-.13-.19-1.13-1.52-1.13-2.9 0-1.38.72-2.06.97-2.34.25-.28.55-.35.74-.35h.53c.17 0 .42-.06.66.5.25.59.85 2.04.93 2.19.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.32.38-.46.51-.15.15-.3.31-.13.61.17.29.76 1.26 1.63 2.05 1.12 1 2.05 1.31 2.36 1.46.3.15.48.13.66-.08.18-.2.77-.9.98-1.21.2-.31.4-.26.67-.15.27.1 1.72.81 2.02.96.3.14.5.22.57.34.07.12.07.71-.16 1.34z"/>
                    </svg>
                    WhatsApp Phone
                  </label>
                  <input id="prof-whatsapp-phone" type="tel" formControlName="whatsAppPhone" inputmode="numeric" maxlength="11" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200" placeholder="01xxxxxxxxx">
                </div>
              </div>

              <div class="grid grid-cols-1 gap-5">
                <div>
                  <label for="prof-address" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Manual Address</label>
                  <input id="prof-address" type="text" formControlName="manualAddress" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200" placeholder="Enter or update the corporate site address">
                </div>
              </div>

              <div class="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-cairo">Interactive Location</span>
                    <p class="text-[11px] text-slate-500 font-cairo mt-1">Search an address, drag the pin, or restore the saved corporate site.</p>
                  </div>
                </div>

                <div class="relative">
                  <input
                    type="text"
                    [value]="profileMapSearchQuery"
                    (input)="onProfileMapSearchChange($event)"
                    (keydown.enter)="onProfileMapSearchSubmit()"
                    placeholder="Search by city, street, or landmark"
                    class="w-full px-3 py-2.5 pr-10 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <button type="button" (click)="onProfileMapSearchSubmit()" class="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-white">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2m1.2-4.8a6.8 6.8 0 11-13.6 0 6.8 6.8 0 0113.6 0z" /></svg>
                  </button>
                </div>

                @if (profileMapSearchResults().length > 0) {
                  <div class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden max-h-44 overflow-y-auto">
                    @for (result of profileMapSearchResults(); track result.display_name) {
                      <button type="button" (click)="selectProfileMapSearchResult(result)" class="w-full text-left px-3 py-2.5 text-xs text-slate-300 hover:bg-slate-900 border-b border-slate-800 last:border-b-0 transition-colors font-cairo">
                        {{ result.display_name }}
                      </button>
                    }
                  </div>
                }

                <div #profileMapContainer id="profile-map" class="w-full h-72 rounded-2xl border border-slate-800"></div>

                @if (profileForm.get('latitude')?.value && profileForm.get('longitude')?.value) {
                  <div class="text-[11px] text-slate-500 font-mono">
                    Coordinates: {{ profileForm.get('latitude')?.value }} , {{ profileForm.get('longitude')?.value }}
                  </div>
                }
              </div>

              <div>
                <label for="prof-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROFILE.FIELD_COMP_DESC' | translate }}</label>
                <textarea id="prof-desc" formControlName="companyDescription" rows="5" class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none" placeholder="Write a brief overview of your business..."></textarea>
              </div>

              <div class="flex flex-col-reverse md:flex-row justify-end gap-3 w-full pt-2">
                <button type="submit" [disabled]="profileForm.invalid || isSavingProfile()" class="w-full md:w-auto px-6 py-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo font-bold">
                  @if (isSavingProfile()) {
                    {{ 'PROFILE.SAVING' | translate }}
                  } @else {
                    {{ 'PROFILE.BTN_UPDATE' | translate }}
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>

    <!-- MODAL 1: CREATE PROJECT -->
    @if (isProjectModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4">
        <!-- Backdrop -->
        <div (click)="closeProjectModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <!-- Modal container -->
        <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[95vh] md:max-h-[90vh] flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-white font-cairo">{{ 'PROJECTS.MODAL_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1 font-cairo">{{ 'PROJECTS.MODAL_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeProjectModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (projectValidationErrors().length > 0) {
            <div class="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1 font-cairo">{{ 'PROJECTS.VALIDATION_TITLE' | translate }}</span>
              @for (err of projectValidationErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="projectForm" (ngSubmit)="onProjectSubmit()" class="space-y-4">
            <div>
              <label for="proj-name" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_NAME' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="proj-name"
                type="text"
                formControlName="name"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                placeholder="e.g. New Administrative Capital Tower">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="proj-client" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.TABLE_CLIENT' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="proj-client"
                  type="text"
                  formControlName="client"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                  placeholder="e.g. Orascom">
              </div>

              <div>
                <label for="proj-budget" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="proj-budget"
                  type="number"
                  formControlName="budget"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                  placeholder="e.g. 15000000">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="proj-start" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_START' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="proj-start"
                  type="date"
                  formControlName="startDate"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
              </div>
              <div>
                <label for="proj-end" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_END' | translate }}</label>
                <input
                  id="proj-end"
                  type="date"
                  formControlName="endDate"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
              </div>
            </div>

            <!-- Geographic Location Group -->
            <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4.5 space-y-3.5">
              <span class="text-[11px] font-bold text-indigo-400 font-cairo uppercase tracking-wider block border-b border-slate-800/60 pb-1.5">
                📍 تفاصيل الموقع الجغرافي دقیقًا / Geographic Location
              </span>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label for="proj-gov" class="block text-[10px] font-bold text-slate-400 mb-1 font-cairo">المحافظة / Governorate <span class="text-red-400">*</span></label>
                  <select
                    id="proj-gov"
                    formControlName="governorate"
                    class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                    <option value="" disabled selected>-- اختر المحافظة --</option>
                    <option value="Cairo">Cairo / القاهرة</option>
                    <option value="Giza">Giza / الجيزة</option>
                    <option value="Alexandria">Alexandria / الإسكندرية</option>
                    <option value="Qalyubia">Qalyubia / القليوبية</option>
                    <option value="Gharbia">Gharbia / الغربية</option>
                    <option value="Dakahlia">Dakahlia / الدقهلية</option>
                    <option value="Sharqia">Sharqia / الشرقية</option>
                    <option value="Monufia">Monufia / المنوفية</option>
                    <option value="Beheira">Beheira / البحيرة</option>
                    <option value="Kafr El Sheikh">Kafr El Sheikh / كفر الشيخ</option>
                    <option value="Damietta">Damietta / دمياط</option>
                    <option value="Port Said">Port Said / بورسعيد</option>
                    <option value="Ismailia">Ismailia / الإسماعيلية</option>
                    <option value="Suez">Suez / السويس</option>
                    <option value="Aswan">Aswan / أسوان</option>
                    <option value="Luxor">Luxor / الأقصر</option>
                    <option value="Red Sea">Red Sea / البحر الأحمر</option>
                    <option value="Matrouh">Matrouh / مطروح</option>
                  </select>
                  @if (isProjectFieldInvalid('governorate')) {
                    <p class="text-[9px] text-rose-400 mt-1 font-cairo">المحافظة مطلوبة / Governorate is required.</p>
                  }
                </div>
                <div>
                  <label for="proj-city" class="block text-[10px] font-bold text-slate-400 mb-1 font-cairo">المدينة أو المنطقة / City or Zone <span class="text-red-400">*</span></label>
                  <input
                    id="proj-city"
                    type="text"
                    formControlName="cityOrZone"
                    placeholder="e.g. التجمع الخامس"
                    class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                  @if (isProjectFieldInvalid('cityOrZone')) {
                    <p class="text-[9px] text-rose-400 mt-1 font-cairo">المنطقة مطلوبة / Zone is required.</p>
                  }
                </div>
              </div>
              <div>
                <label for="proj-address" class="block text-[10px] font-bold text-slate-400 mb-1 font-cairo">العنوان التفصيلي / Physical Site Address <span class="text-red-400">*</span></label>
                <input
                  id="proj-address"
                  type="text"
                  formControlName="siteAddress"
                  placeholder="e.g. شارع التسعين الشمالي، قطعة 44"
                  class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                @if (isProjectFieldInvalid('siteAddress')) {
                  <p class="text-[9px] text-rose-400 mt-1 font-cairo">العنوان مطلوب / Address is required.</p>
                }
              </div>
            </div>

            <!-- Client & Owner Details Group -->
            <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4.5 space-y-3.5">
              <span class="text-[11px] font-bold text-indigo-400 font-cairo uppercase tracking-wider block border-b border-slate-800/60 pb-1.5">
                👤 بيانات العميل وصاحب المشروع / Client & Owner Info
              </span>
              <div>
                <label for="proj-client-wh" class="block text-[10px] font-bold text-slate-400 mb-1 font-cairo">رقم واتساب العميل / Client WhatsApp <span class="text-red-400">*</span></label>
                <input
                  id="proj-client-wh"
                  type="text"
                  formControlName="clientWhatsApp"
                  placeholder="e.g. +201012345678"
                  class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                @if (isProjectFieldInvalid('clientWhatsApp')) {
                  <p class="text-[9px] text-rose-400 mt-1 font-cairo">رقم واتساب العميل مطلوب بصيغة صحيحة / Invalid WhatsApp number.</p>
                }
              </div>
            </div>

            <!-- Property Classification Group -->
            <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4.5 space-y-3.5">
              <span class="text-[11px] font-bold text-indigo-400 font-cairo uppercase tracking-wider block border-b border-slate-800/60 pb-1.5">
                🏢 تصنيف المنشأ / Property Classification
              </span>
              <div>
                <label for="proj-prop-type" class="block text-[10px] font-bold text-slate-400 mb-1 font-cairo">تصنيف العقار / Property Type <span class="text-red-400">*</span></label>
                <select
                  id="proj-prop-type"
                  formControlName="propertyType"
                  class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all">
                  <option value="Residential">Residential / سكني</option>
                  <option value="Administrative">Administrative / إداري</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="proj-status" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.TABLE_STATUS' | translate }} <span class="text-red-400">*</span></label>
                <select
                  id="proj-status"
                  formControlName="status"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <option value="Active">{{ 'PROJECTS.STATUS.ACTIVE' | translate }}</option>
                  <option value="Delayed">{{ 'PROJECTS.STATUS.DELAYED' | translate }}</option>
                  <option value="Completed">{{ 'PROJECTS.STATUS.COMPLETED' | translate }}</option>
                </select>
              </div>

              <div>
                <label for="proj-cat" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_CATEGORY' | translate }} <span class="text-red-400">*</span></label>
                <select
                  id="proj-cat"
                  formControlName="category"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                  <option value="Residential">{{ 'PROJECTS.CATEGORIES.Residential' | translate }}</option>
                  <option value="Commercial">{{ 'PROJECTS.CATEGORIES.Commercial' | translate }}</option>
                  <option value="Industrial">{{ 'PROJECTS.CATEGORIES.Industrial' | translate }}</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-3 py-2">
              <input
                id="proj-pub"
                type="checkbox"
                formControlName="isPublicPortfolio"
                class="h-4 w-4 rounded border-slate-700 text-indigo-600 bg-slate-950 focus:ring-0">
              <label for="proj-pub" class="text-sm text-slate-300 font-cairo font-semibold cursor-pointer select-none">
                {{ 'PROJECTS.FIELD_PUBLIC' | translate }}
              </label>
            </div>

            <div>
              <label for="proj-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_DESC' | translate }}</label>
              <textarea
                id="proj-desc"
                formControlName="description"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-none"
                placeholder="Scope details..."></textarea>
            </div>

            <div class="flex flex-col-reverse md:flex-row justify-end gap-3 w-full p-4 border-t border-slate-900">
              <button
                type="button"
                (click)="closeProjectModal()"
                class="w-full md:w-auto px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="projectForm.invalid || isSavingProject()"
                class="w-full md:w-auto px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
                {{ 'PROJECTS.BTN_CREATE' | translate }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- MODAL 2: REGISTER COMPANY USER -->
    @if (isUserModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-stretch justify-center p-3 sm:p-4">
        <div (click)="closeUserModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <div class="relative z-10 w-full max-w-2xl mx-auto my-auto p-4 md:p-6 max-h-[95vh] md:max-h-[90vh] flex flex-col bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h3 class="text-xl font-bold text-white font-cairo">{{ 'USERS.MODAL_TITLE' | translate }}</h3>
              <p class="text-xs text-slate-400 mt-1 font-cairo">{{ 'USERS.MODAL_SUBTITLE' | translate }}</p>
            </div>
            <button
              (click)="closeUserModal()"
              class="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          @if (userValidationErrors().length > 0) {
            <div class="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1 font-cairo">{{ 'PROJECTS.VALIDATION_TITLE' | translate }}</span>
              @for (err of userValidationErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="userForm" (ngSubmit)="onUserSubmit()" autocomplete="off" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="usr-first" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_FIRST_NAME' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="usr-first"
                  type="text"
                  formControlName="firstName"
                  autocomplete="off"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Ahmed">
              </div>

              <div>
                <label for="usr-last" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_LAST_NAME' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="usr-last"
                  type="text"
                  formControlName="lastName"
                  autocomplete="off"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Ali">
              </div>
            </div>

            <div>
              <label for="usr-email" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_EMAIL' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="usr-email"
                type="email"
                formControlName="email"
                autocomplete="off"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="e.g. ahmed.ali@company.com">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="usr-contact-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">Personal Phone</label>
                <input
                  id="usr-contact-phone"
                  type="tel"
                  formControlName="personalPhone"
                  inputmode="numeric"
                  maxlength="11"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="01xxxxxxxxx">
              </div>

              <div>
                <label for="usr-whatsapp-phone" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">WhatsApp Phone</label>
                <input
                  id="usr-whatsapp-phone"
                  type="tel"
                  formControlName="whatsAppPhone"
                  inputmode="numeric"
                  maxlength="11"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="01xxxxxxxxx">
              </div>
            </div>

            <div>
              <label for="usr-pass" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_PASSWORD' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="usr-pass"
                type="password"
                formControlName="password"
                autocomplete="new-password"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="Min 6 characters">
            </div>

            <div>
              <label for="usr-role" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_ROLE' | translate }} <span class="text-red-400">*</span></label>
              <select
                id="usr-role"
                formControlName="role"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200">
                <option value="Manager">{{ 'USERS.ROLES.Manager' | translate }}</option>
                <option value="Accountant">{{ 'USERS.ROLES.Accountant' | translate }}</option>
                <option value="SiteEngineer">{{ 'USERS.ROLES.SiteEngineer' | translate }}</option>
                <option value="DesignEngineer">{{ 'USERS.ROLES.DesignEngineer' | translate }}</option>
              </select>
            </div>

            <div class="flex flex-col-reverse md:flex-row justify-end gap-3 w-full p-4 border-t border-slate-900">
              <button
                type="button"
                (click)="closeUserModal()"
                class="w-full md:w-auto px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="userForm.invalid || isSavingUser()"
                class="w-full md:w-auto px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
                {{ 'USERS.BTN_CREATE' | translate }}
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .font-cairo {
      font-family: 'Cairo', 'Inter', sans-serif;
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly userService = inject(TenantUserService);
  private readonly profileService = inject(TenantProfileService);
  private readonly offlineSync = inject(OfflineSyncService);
  private readonly whatsappLink = inject(WhatsAppLinkService);
  private readonly uploadService = inject(ImageUploadService);
  private readonly authService = inject(AuthService);
  private readonly translateService = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly confirmService = inject(ConfirmModalService);
  private readonly toastService = inject(ToastService);
  @ViewChild('profileMapContainer') profileMapContainer?: ElementRef<HTMLDivElement>;
  readonly activeTab = signal<'projects' | 'users' | 'profile'>('projects');
  readonly togglingUserId = signal<string | null>(null);
  readonly currentUserId = computed(() => this.authService.currentUser()?.userId || '');

  readonly currentUserRole = computed(() => this.authService.currentUser()?.role || '');
  readonly isEngineer = computed(() => ['manager', 'siteengineer', 'designengineer'].includes(this.currentUserRole().toLowerCase()));

  // Upload Signals
  readonly isUploadingLogo = signal(false);
  readonly isUploadingBanner = signal(false);

  // Signals for Projects
  readonly projects = signal<ProjectViewDto[]>([]);
  readonly isLoadingProjects = signal(false);
  readonly isProjectModalOpen = signal(false);
  readonly isSavingProject = signal(false);
  readonly projectValidationErrors = signal<string[]>([]);
  readonly projectError = signal<string | null>(null);

  // Signals for Users
  readonly users = signal<UserDto[]>([]);
  readonly isLoadingUsers = signal(false);
  readonly isUserModalOpen = signal(false);
  readonly isSavingUser = signal(false);
  readonly userValidationErrors = signal<string[]>([]);
  readonly userError = signal<string | null>(null);

  // Signals for Profile
  readonly isSavingProfile = signal(false);
  readonly profileSuccessMessage = signal<string | null>(null);
  readonly profileMapSearchResults = signal<MapSearchResult[]>([]);

  readonly governorates = GOVERNORATES;

  private profileMap: L.Map | null = null;
  private profileMarker: L.Marker | null = null;
  private profileMapSearchTimeout: ReturnType<typeof setTimeout> | null = null;
  private profileMapLatLng: L.LatLng = L.latLng(30.0444, 31.2357);
  profileMapSearchQuery = '';

  // Computed counters
  readonly activeProjectsCount = computed(() => this.projects().filter(p => p.status === 'Active' || p.status === 'Delayed').length);
  readonly completedProjectsCount = computed(() => this.projects().filter(p => p.status === 'Completed').length);

  readonly managerCount = computed(() => this.users().filter(u => u.role === 'Manager').length);
  readonly engineerCount = computed(() => this.users().filter(u => u.role === 'SiteEngineer' || u.role === 'DesignEngineer').length);

  // Forms
  readonly projectForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    client: ['', Validators.required],
    budget: [null, [Validators.required, Validators.min(0)]],
    startDate: [new Date().toISOString().substring(0, 10), Validators.required],
    endDate: [null],
    status: ['Active', Validators.required],
    category: ['Residential', Validators.required],
    isPublicPortfolio: [false],
    description: [''],
    governorate: ['', Validators.required],
    cityOrZone: ['', Validators.required],
    siteAddress: ['', Validators.required],
    clientWhatsApp: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    propertyType: ['Residential', Validators.required]
  });

  readonly userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    personalPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    whatsAppPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['Manager', Validators.required]
  });

  readonly profileForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    logoUrl: [''],
    bannerUrl: [''],
    region: [''],
    governorateId: [''],
    personalPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    whatsAppPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    manualAddress: [''],
    mapLocationUrl: [''],
    latitude: [null as number | null],
    longitude: [null as number | null],
    companyDescription: ['']
  });

  ngOnInit(): void {
    const url = this.router.url;
    const isRestrictedTab = url.includes('/dashboard/users') || url.includes('/dashboard/profile');
    if (isRestrictedTab && this.currentUserRole() !== 'TenantOwner') {
      this.activeTab.set('projects');
      this.router.navigate(['/dashboard/projects'], { replaceUrl: true });
      return;
    }

    if (url.includes('/dashboard/users')) {
      this.activeTab.set('users');
    } else if (url.includes('/dashboard/profile')) {
      this.activeTab.set('profile');
    } else {
      this.activeTab.set('projects');
    }

    this.fetchProjects();
    if (this.currentUserRole() === 'TenantOwner') {
      this.fetchUsers();
      this.fetchProfile();
    }

    this.offlineSync.registerHandler<TenantProfileUpdateDto>('tenant-profile-update', (dto) => this.profileService.updateProfile(dto));
    this.offlineSync.registerHandler<UserCreateDto>('user-create', (dto) => this.userService.createUser(dto));
  }

  navigateToTab(tab: 'projects' | 'users' | 'profile'): void {
    this.activeTab.set(tab);
    if (tab === 'projects') {
      this.router.navigate(['/dashboard/projects']);
    } else {
      this.router.navigate([`/dashboard/${tab}`]);
      if (tab === 'profile') {
        setTimeout(() => this.syncProfileMapFromForm(), 0);
      }
    }
  }

  private resolveGovernorateId(rawValue: string | null | undefined): string {
    if (!rawValue) {
      return '';
    }

    const normalized = rawValue.trim().toLowerCase();
    const match = GOVERNORATES.find(option =>
      option.id.toLowerCase() === normalized ||
      option.label.toLowerCase() === normalized ||
      option.label.toLowerCase().startsWith(normalized)
    );

    return match?.id ?? rawValue;
  }

  resolveGovernorateLabel(rawValue: string | null | undefined): string {
    if (!rawValue) {
      return '';
    }

    const resolved = this.resolveGovernorateId(rawValue);
    return GOVERNORATES.find(option => option.id === resolved)?.label ?? resolved;
  }

  private queueProfileMapSync(): void {
    setTimeout(() => this.syncProfileMapFromForm(), 0);
  }

  private syncProfileMapFromForm(): void {
    const latitude = this.profileForm.get('latitude')?.value as number | null;
    const longitude = this.profileForm.get('longitude')?.value as number | null;
    const hasCoordinates = latitude != null && longitude != null;

    if (hasCoordinates) {
      this.profileMapLatLng = L.latLng(latitude, longitude);
      this.profileMapSearchQuery = this.profileForm.get('manualAddress')?.value || this.profileMapSearchQuery;
    }

    if (!this.profileMapContainer?.nativeElement) {
      return;
    }

    if (!this.profileMap) {
      this.initProfileMap();
      return;
    }

    this.profileMap.invalidateSize();
    this.profileMap.setView(this.profileMapLatLng, hasCoordinates ? 15 : 12);
    if (this.profileMarker) {
      this.profileMarker.setLatLng(this.profileMapLatLng);
    }
  }

  private initProfileMap(): void {
    if (!this.profileMapContainer?.nativeElement || this.profileMap) {
      return;
    }

    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.profileMap = L.map(this.profileMapContainer.nativeElement).setView(this.profileMapLatLng, 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.profileMap);

    this.profileMarker = L.marker(this.profileMapLatLng, { draggable: true }).addTo(this.profileMap);
    this.profileMarker.on('dragend', () => {
      const latLng = this.profileMarker!.getLatLng();
      this.profileMapLatLng = latLng;
      this.profileForm.patchValue({
        latitude: latLng.lat,
        longitude: latLng.lng,
        manualAddress: `Coordinates: ${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`,
        mapLocationUrl: `https://www.google.com/maps/search/?api=1&query=${latLng.lat},${latLng.lng}`
      });
    });

    this.profileMap.invalidateSize();
  }

  onProfileMapSearchChange(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.profileMapSearchQuery = query;

    if (this.profileMapSearchTimeout) {
      clearTimeout(this.profileMapSearchTimeout);
    }

    if (query.length < 2) {
      this.profileMapSearchResults.set([]);
      return;
    }

    this.profileMapSearchTimeout = setTimeout(() => this.searchProfileMap(query), 400);
  }

  onProfileMapSearchSubmit(): void {
    const query = this.profileMapSearchQuery.trim();
    if (query.length >= 2) {
      this.searchProfileMap(query);
    }
  }

  private searchProfileMap(query: string): void {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=en`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        const results: MapSearchResult[] = (response.features || []).map((feature: any) => ({
          lat: feature.geometry.coordinates[1].toString(),
          lon: feature.geometry.coordinates[0].toString(),
          display_name: feature.properties.name || feature.properties.street || feature.properties.city || feature.properties.country || query
        }));

        this.profileMapSearchResults.set(results);
      },
      error: () => {
        this.profileMapSearchResults.set([]);
      }
    });
  }

  selectProfileMapSearchResult(result: MapSearchResult): void {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    this.profileMapLatLng = L.latLng(lat, lng);
    this.profileMapSearchQuery = result.display_name;
    this.profileMapSearchResults.set([]);

    if (this.profileMap) {
      this.profileMap.flyTo(this.profileMapLatLng, 15);
    }

    if (this.profileMarker) {
      this.profileMarker.setLatLng(this.profileMapLatLng);
    }

    this.profileForm.patchValue({
      latitude: lat,
      longitude: lng,
      manualAddress: result.display_name,
      mapLocationUrl: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    });
  }

  fetchProjects(): void {
    this.isLoadingProjects.set(true);
    this.projectError.set(null);
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.isLoadingProjects.set(false);
        if (response.success && response.data) {
          const mapped = response.data.map((p, index) => {
            let client = index % 2 === 0 ? 'El-Mokawloon El-Arab' : 'Orascom Construction';
            let budget = index % 2 === 0 ? 5400000 : 8900000;
            let status: 'Active' | 'Delayed' | 'Completed' = p.isActive ? (index % 3 === 0 ? 'Delayed' : 'Active') : 'Completed';
            let category = 'Residential';
            let isPublicPortfolio = false;
            let description = p.description;

            try {
              if (p.description && p.description.startsWith('{')) {
                const parsed = JSON.parse(p.description);
                if (parsed.client) client = parsed.client;
                if (parsed.budget !== undefined) budget = parsed.budget;
                if (parsed.status) status = parsed.status;
                if (parsed.category) category = parsed.category;
                if (parsed.isPublicPortfolio !== undefined) isPublicPortfolio = parsed.isPublicPortfolio;
                if (parsed.description !== undefined) description = parsed.description;
              }
            } catch (e) { }

            // Prefer the first-class clientName field over legacy JSON
            if (p.clientName) client = p.clientName;

            return {
              ...p,
              client,
              budget,
              status,
              category,
              isPublicPortfolio,
              description
            };
          });

          let filtered = mapped;

          this.projects.set(filtered as ProjectViewDto[]);
        } else {
          this.projectError.set(response.message || 'Failed to load projects.');
        }
      },
      error: (err) => {
        this.isLoadingProjects.set(false);
        this.projectError.set(
          err.status === 401
            ? 'Session expired. Please log in again.'
            : err.error?.message || 'Error connecting to backend.'
        );
      }
    });
  }

  fetchUsers(): void {
    this.isLoadingUsers.set(true);
    this.userError.set(null);
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.isLoadingUsers.set(false);
        if (response.success && response.data) {
          this.users.set(response.data);
        } else {
          this.userError.set(response.message || 'Failed to load users.');
        }
      },
      error: (err) => {
        this.isLoadingUsers.set(false);
        this.userError.set(
          err.status === 401
            ? 'Session expired. Please log in again.'
            : err.error?.message || 'Error connecting to backend.'
        );
      }
    });
  }

  isUserToggleLoading(userId: string): boolean {
    return this.togglingUserId() === userId;
  }

  toggleUserStatus(user: UserDto): void {
    if (this.currentUserRole() !== 'TenantOwner') {
      return;
    }

    if (user.id === this.currentUserId()) {
      this.toastService.show(
        this.translateService.instant('COMMON.ERROR'),
        this.translateService.instant('USERS.CANNOT_DISABLE_SELF'),
        'error'
      );
      return;
    }

    this.togglingUserId.set(user.id);
    this.userService.toggleUserStatus(user.id).pipe(take(1)).subscribe({
      next: (response) => {
        this.togglingUserId.set(null);
        if (response.success) {
          const updatedActiveState = response.data ?? !user.isActive;
          this.users.update(current => current.map(item => item.id === user.id ? { ...item, isActive: updatedActiveState } : item));
          this.toastService.show(
            this.translateService.instant('COMMON.SUCCESS'),
            this.translateService.instant('USERS.STATUS_UPDATED_SUCCESS'),
            'success'
          );
        } else {
          this.toastService.show(
            this.translateService.instant('COMMON.ERROR'),
            this.translateService.instant(response.message || 'USERS.STATUS_UPDATE_FAILED'),
            'error'
          );
        }
      },
      error: (err) => {
        this.togglingUserId.set(null);
        this.toastService.show(
          this.translateService.instant('COMMON.ERROR'),
          this.translateService.instant(err.error?.message || err.message || 'USERS.STATUS_UPDATE_FAILED'),
          'error'
        );
      }
    });
  }

  fetchProfile(): void {
    this.profileService.getProfile().pipe(take(1)).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const getCleanUrl = (url: string | null | undefined) => {
            if (!url) return url;
            if (url.startsWith('PRESIGNED_SPLIT')) {
              const parts = url.split('|');
              return parts.length > 2 ? parts[2] : url;
            }
            return url;
          };

          this.profileForm.patchValue({
            name: res.data.name,
            logoUrl: getCleanUrl(res.data.logoUrl),
            bannerUrl: getCleanUrl(res.data.bannerUrl),
            region: this.resolveGovernorateId(res.data.governorateId ?? res.data.region),
            governorateId: this.resolveGovernorateId(res.data.governorateId ?? res.data.region),
            personalPhone: res.data.personalPhone,
            whatsAppPhone: res.data.whatsAppPhone,
            manualAddress: res.data.manualAddress,
            mapLocationUrl: res.data.mapLocationUrl,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            companyDescription: res.data.companyDescription
          });
          this.profileMapSearchQuery = res.data.manualAddress || '';
          this.queueProfileMapSync();
        }
      }
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.isSavingProfile.set(true);
    this.profileSuccessMessage.set(null);

    const governorateId = this.resolveGovernorateId(this.profileForm.value.governorateId || this.profileForm.value.region || '');
    const dto: TenantProfileUpdateDto = {
      ...this.profileForm.value,
      region: governorateId,
      governorateId,
      personalPhone: this.profileForm.value.personalPhone || null,
      whatsAppPhone: this.profileForm.value.whatsAppPhone || null,
      manualAddress: this.profileForm.value.manualAddress || null,
      mapLocationUrl: this.profileForm.value.mapLocationUrl || null,
      latitude: this.profileForm.value.latitude || null,
      longitude: this.profileForm.value.longitude || null
    };

    this.offlineSync.submit('tenant-profile-update', dto, (value) => this.profileService.updateProfile(value)).pipe(take(1)).subscribe({
      next: (res) => {
        this.isSavingProfile.set(false);
        if (res.success) {
          this.profileSuccessMessage.set(res.message || 'PROFILE.SUCCESS');
          if (navigator.onLine) {
            this.fetchProfile();
          }
          this.queueProfileMapSync();
          setTimeout(() => this.profileSuccessMessage.set(null), 5000);
        }
      },
      error: () => {
        this.isSavingProfile.set(false);
      }
    });
  }

  onLogoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'حجم الملف كبير جداً! الحد الأقصى للصور 2 ميجا وللمقايسات 5 ميجا.',
          type: 'error'
        });
        input.value = '';
        return;
      }
      this.isUploadingLogo.set(true);
      this.uploadService.uploadTenantLogo(file).pipe(take(1)).subscribe({
        next: (res) => {
          this.isUploadingLogo.set(false);
          if (res.success && res.data && res.data.url) {
            this.profileForm.patchValue({ logoUrl: res.data.url });
          }
        },
        error: () => {
          this.isUploadingLogo.set(false);
          this.confirmService.alert({ title: 'خطأ', message: 'فشل رفع الملف.', type: 'error' });
        }
      });
    }
  }

  onBannerFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.confirmService.alert({
          title: 'حجم الملف كبير جداً',
          message: 'حجم الملف كبير جداً! الحد الأقصى للصور 2 ميجا وللمقايسات 5 ميجا.',
          type: 'error'
        });
        input.value = '';
        return;
      }
      this.isUploadingBanner.set(true);
      this.uploadService.uploadTenantBanner(file).pipe(take(1)).subscribe({
        next: (res) => {
          this.isUploadingBanner.set(false);
          if (res.success && res.data && res.data.url) {
            this.profileForm.patchValue({ bannerUrl: res.data.url });
          }
        },
        error: () => {
          this.isUploadingBanner.set(false);
          this.confirmService.alert({ title: 'خطأ', message: 'فشل رفع الملف.', type: 'error' });
        }
      });
    }
  }

  isProjectFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openProjectModal(): void {
    this.projectForm.reset({
      name: '',
      client: '',
      budget: null,
      startDate: new Date().toISOString().substring(0, 10),
      endDate: null,
      status: 'Active',
      category: 'Residential',
      isPublicPortfolio: false,
      description: '',
      governorate: '',
      cityOrZone: '',
      siteAddress: '',
      clientWhatsApp: '',
      propertyType: 'Residential'
    });
    this.projectValidationErrors.set([]);
    this.isProjectModalOpen.set(true);
  }

  closeProjectModal(): void {
    this.isProjectModalOpen.set(false);
  }

  onProjectSubmit(): void {
    if (this.currentUserRole() !== 'TenantOwner') {
      return;
    }
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.isSavingProject.set(true);
    this.projectValidationErrors.set([]);

    const formVal = this.projectForm.value;
    const descPayload = {
      client: formVal.client,
      budget: Number(formVal.budget),
      status: formVal.status,
      category: formVal.category,
      isPublicPortfolio: !!formVal.isPublicPortfolio,
      description: formVal.description || ''
    };

    const dto: ProjectCreateDto = {
      name: formVal.name,
      description: JSON.stringify(descPayload),
      startDate: new Date(formVal.startDate).toISOString(),
      endDate: formVal.endDate ? new Date(formVal.endDate).toISOString() : null,
      managerId: null,
      tenantId: null,
      governorate: formVal.governorate,
      cityOrZone: formVal.cityOrZone,
      siteAddress: formVal.siteAddress,
      clientName: formVal.client,
      clientWhatsApp: formVal.clientWhatsApp,
      propertyType: formVal.propertyType
    };

    this.projectService.createProject(dto).subscribe({
      next: (response) => {
        this.isSavingProject.set(false);
        if (response.success && response.data) {
          this.closeProjectModal();
          this.fetchProjects();
        } else {
          this.projectValidationErrors.set(response.errors || [response.message || 'Failed to create project.']);
        }
      },
      error: (err) => {
        this.isSavingProject.set(false);
        const errors = err.error?.errors || [err.error?.message || err.message || 'Error occurred.'];
        this.projectValidationErrors.set(Array.isArray(errors) ? errors : [errors]);
      }
    });
  }

  isUserFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openUserModal(): void {
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      personalPhone: '',
      whatsAppPhone: '',
      password: '',
      role: 'Manager'
    });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.userValidationErrors.set([]);
    this.isUserModalOpen.set(true);
  }

  closeUserModal(): void {
    this.isUserModalOpen.set(false);
  }

  onUserSubmit(): void {
    if (this.currentUserRole() !== 'TenantOwner') {
      return;
    }
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSavingUser.set(true);
    this.userValidationErrors.set([]);

    const dto: UserCreateDto = this.userForm.value;

    this.offlineSync.submit('user-create', dto, (value) => this.userService.createUser(value)).pipe(take(1)).subscribe({
      next: (response) => {
        this.isSavingUser.set(false);
        if (response.success) {
          this.closeUserModal();
          if (navigator.onLine) {
            this.fetchUsers();
          }
        } else {
          this.userValidationErrors.set(response.errors || [response.message || 'Failed to add user.']);
        }
      },
      error: (err) => {
        this.isSavingUser.set(false);
        const errors = err.error?.errors || [err.error?.message || err.message || 'Error occurred.'];
        this.userValidationErrors.set(Array.isArray(errors) ? errors : [errors]);
      }
    });
  }

  openWhatsAppForUser(user: UserDto): void {
    const message = `مرحباً ${user.firstName} ${user.lastName}، هذه رسالة من Structo.`;
    this.whatsappLink.openChat(user.whatsAppPhone, message);
  }

  viewDetails(id: string): void {
    this.router.navigate(['/dashboard/projects', id]);
  }
}
