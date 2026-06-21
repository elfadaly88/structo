import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectDto, ProjectCreateDto } from '../../../core/models/project.models';
import { TenantUserService, UserDto, UserCreateDto } from '../../../core/services/tenant-user.service';
import { TranslatePipe } from '@ngx-translate/core';

export interface ProjectViewDto extends ProjectDto {
  client: string;
  budget: number;
  status: 'Active' | 'Delayed' | 'Completed';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, TranslatePipe],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/60 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight text-white font-cairo">
            {{ activeTab() === 'projects' ? ('PROJECTS.PAGE_TITLE' | translate) : ('USERS.TAB_USERS' | translate) }}
          </h1>
          <p class="text-sm text-slate-400 mt-1">
            {{ activeTab() === 'projects' ? ('PROJECTS.PAGE_SUBTITLE' | translate) : ('USERS.MODAL_SUBTITLE' | translate) }}
          </p>
        </div>

        <div class="flex gap-3">
          @if (activeTab() === 'projects') {
            <button
              id="btn-new-project"
              (click)="openProjectModal()"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-cairo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              {{ 'PROJECTS.NEW_PROJECT' | translate }}
            </button>
          } @else {
            <button
              id="btn-new-user"
              (click)="openUserModal()"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer font-cairo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              {{ 'USERS.NEW_USER' | translate }}
            </button>
          }
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="border-b border-slate-800">
        <nav class="flex gap-8">
          <button 
            (click)="activeTab.set('projects')" 
            class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
            [class.border-indigo-500]="activeTab() === 'projects'"
            [class.text-indigo-400]="activeTab() === 'projects'"
            [class.border-transparent]="activeTab() !== 'projects'"
            [class.text-slate-400]="activeTab() !== 'projects'"
            [class.hover:text-slate-200]="activeTab() !== 'projects'">
            {{ 'PROJECTS.PAGE_TITLE' | translate }}
          </button>
          <button 
            (click)="activeTab.set('users')" 
            class="pb-4 text-sm font-bold border-b-2 cursor-pointer transition-all duration-200 font-cairo"
            [class.border-indigo-500]="activeTab() === 'users'"
            [class.text-indigo-400]="activeTab() === 'users'"
            [class.border-transparent]="activeTab() !== 'users'"
            [class.text-slate-400]="activeTab() !== 'users'"
            [class.hover:text-slate-200]="activeTab() !== 'users'">
            {{ 'USERS.TAB_USERS' | translate }}
          </button>
        </nav>
      </div>

      <!-- SECTION 1: PROJECTS HUB -->
      @if (activeTab() === 'projects') {
        <!-- Projects Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
                    <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }}</th>
                    <th class="px-6 py-4 text-center font-cairo">{{ 'PROJECTS.TABLE_STATUS' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'PROJECTS.TABLE_START_DATE' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (proj of projects(); track proj.id) {
                    <tr 
                      (click)="viewDetails(proj.id)"
                      class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300 cursor-pointer">
                      <td class="px-6 py-4">
                        <div class="font-bold text-white hover:text-indigo-400 transition-colors duration-200">
                          {{ proj.name }}
                        </div>
                        <span class="block text-xs font-normal text-slate-500 mt-0.5 max-w-xs truncate">
                          {{ proj.description || ('PROJECTS.NO_DESCRIPTION' | translate) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-slate-400 font-medium">{{ proj.client }}</td>
                      <td class="px-6 py-4 font-mono text-emerald-400 font-bold">
                        {{ proj.budget | number:'1.0-0' }} {{ 'COMMON.CURRENCY' | translate }}
                      </td>
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
                      <td class="px-6 py-4 text-slate-400">{{ proj.startDate | date:'yyyy-MM-dd' }}</td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="5" class="px-6 py-16 text-center text-slate-500 text-sm">
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
      @if (activeTab() === 'users') {
        <!-- Users Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
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

        <!-- Users Loading State -->
        @if (isLoadingUsers()) {
          <div class="flex justify-center items-center py-20">
            <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        }

        <!-- Users Error State -->
        @if (userError()) {
          <div class="rounded-xl bg-red-500/10 border border-red-500/30 p-5 text-sm text-red-400 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ userError() }}</span>
          </div>
        }

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
                    <th class="px-6 py-4 text-center font-cairo">{{ 'USERS.TABLE_ROLE' | translate }}</th>
                    <th class="px-6 py-4 font-cairo">{{ 'USERS.TABLE_CREATED_AT' | translate }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60 text-sm">
                  @for (usr of users(); track usr.id) {
                    <tr class="hover:bg-slate-900/40 transition-colors duration-150 text-slate-300">
                      <td class="px-6 py-4 font-bold text-white">{{ usr.firstName }}</td>
                      <td class="px-6 py-4 font-medium text-slate-300">{{ usr.lastName }}</td>
                      <td class="px-6 py-4 text-slate-400 font-mono">{{ usr.email }}</td>
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
                      <td class="px-6 py-4 text-slate-400">{{ usr.createdAt | date:'yyyy-MM-dd HH:mm' }}</td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="5" class="px-6 py-16 text-center text-slate-500 text-sm">
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
    </div>

    <!-- MODAL 1: CREATE PROJECT -->
    @if (isProjectModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div (click)="closeProjectModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <!-- Modal container -->
        <div class="relative bg-slate-900 border border-slate-700/60 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl shadow-black/50 z-10">
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

          <!-- Errors block -->
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
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="e.g. New Administrative Capital Tower">
              @if (isProjectFieldInvalid('name')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'PROJECTS.FIELD_NAME_REQ' | translate }}</span>
              }
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="proj-client" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.TABLE_CLIENT' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="proj-client"
                  type="text"
                  formControlName="client"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Orascom">
                @if (isProjectFieldInvalid('client')) {
                  <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'PROJECTS.FIELD_NAME_REQ' | translate }}</span>
                }
              </div>

              <div>
                <label for="proj-budget" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.TABLE_BUDGET' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="proj-budget"
                  type="number"
                  formControlName="budget"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. 15000000">
                @if (isProjectFieldInvalid('budget')) {
                  <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'PROJECTS.FIELD_NAME_REQ' | translate }}</span>
                }
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <div>
              <label for="proj-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'PROJECTS.FIELD_DESC' | translate }}</label>
              <textarea
                id="proj-desc"
                formControlName="description"
                rows="3"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600 resize-none"
                placeholder="Scope details..."></textarea>
            </div>

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeProjectModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="projectForm.invalid || isSavingProject()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
                @if (isSavingProject()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'PROJECTS.SAVING' | translate }}
                  </span>
                } @else {
                  {{ 'PROJECTS.BTN_CREATE' | translate }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    }

    <!-- MODAL 2: REGISTER COMPANY USER -->
    @if (isUserModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div (click)="closeUserModal()" class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

        <!-- Modal container -->
        <div class="relative bg-slate-900 border border-slate-700/60 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl shadow-black/50 z-10">
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

          <!-- Errors block -->
          @if (userValidationErrors().length > 0) {
            <div class="mb-5 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs text-red-400 space-y-1">
              <span class="font-bold block mb-1 font-cairo">{{ 'PROJECTS.VALIDATION_TITLE' | translate }}</span>
              @for (err of userValidationErrors(); track err) {
                <div>• {{ err }}</div>
              }
            </div>
          }

          <form [formGroup]="userForm" (ngSubmit)="onUserSubmit()" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="usr-first" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_FIRST_NAME' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="usr-first"
                  type="text"
                  formControlName="firstName"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Ahmed">
                @if (isUserFieldInvalid('firstName')) {
                  <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'USERS.FIELD_FIRST_NAME_REQ' | translate }}</span>
                }
              </div>

              <div>
                <label for="usr-last" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_LAST_NAME' | translate }} <span class="text-red-400">*</span></label>
                <input
                  id="usr-last"
                  type="text"
                  formControlName="lastName"
                  class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                  placeholder="e.g. Ali">
                @if (isUserFieldInvalid('lastName')) {
                  <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'USERS.FIELD_LAST_NAME_REQ' | translate }}</span>
                }
              </div>
            </div>

            <div>
              <label for="usr-email" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_EMAIL' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="usr-email"
                type="email"
                formControlName="email"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="e.g. ahmed.ali@company.com">
              @if (isUserFieldInvalid('email')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'USERS.FIELD_EMAIL_REQ' | translate }}</span>
              }
            </div>

            <div>
              <label for="usr-pass" class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-cairo">{{ 'USERS.FIELD_PASSWORD' | translate }} <span class="text-red-400">*</span></label>
              <input
                id="usr-pass"
                type="password"
                formControlName="password"
                class="w-full px-3 py-2.5 border border-slate-700 bg-slate-950 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 placeholder-slate-600"
                placeholder="Min 6 characters">
              @if (isUserFieldInvalid('password')) {
                <span class="text-xs text-red-400 mt-1 block font-cairo">{{ 'USERS.FIELD_PASSWORD_REQ' | translate }}</span>
              }
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

            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                (click)="closeUserModal()"
                class="px-4 py-2 text-sm font-semibold rounded-xl text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-all duration-200 cursor-pointer font-cairo">
                {{ 'COMMON.CANCEL' | translate }}
              </button>
              <button
                type="submit"
                [disabled]="userForm.invalid || isSavingUser()"
                class="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-cairo">
                @if (isSavingUser()) {
                  <span class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ 'USERS.ADDING' | translate }}
                  </span>
                } @else {
                  {{ 'USERS.BTN_CREATE' | translate }}
                }
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
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  readonly activeTab = signal<'projects' | 'users'>('projects');

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
    description: ['']
  });

  readonly userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['Manager', Validators.required]
  });

  ngOnInit(): void {
    this.fetchProjects();
    this.fetchUsers();
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
            let description = p.description;

            try {
              if (p.description && p.description.startsWith('{')) {
                const parsed = JSON.parse(p.description);
                if (parsed.client) client = parsed.client;
                if (parsed.budget !== undefined) budget = parsed.budget;
                if (parsed.status) status = parsed.status;
                if (parsed.description !== undefined) description = parsed.description;
              }
            } catch (e) {
              // fallback
            }

            return {
              ...p,
              client,
              budget,
              status,
              description
            };
          });
          this.projects.set(mapped as ProjectViewDto[]);
        } else {
          this.projectError.set(response.message || 'Failed to load projects.');
        }
      },
      error: (err) => {
        this.isLoadingProjects.set(false);
        this.projectError.set(
          err.status === 401
            ? 'Session expired. Please log in again.'
            : err.error?.message || 'Error connecting to backend. Ensure the API is running.'
        );
        console.error('Error fetching projects', err);
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
            : err.error?.message || 'Error connecting to backend. Ensure the API is running.'
        );
        console.error('Error fetching users', err);
      }
    });
  }

  // Projects Modal Controls
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
      description: ''
    });
    this.projectValidationErrors.set([]);
    this.isProjectModalOpen.set(true);
  }

  closeProjectModal(): void {
    this.isProjectModalOpen.set(false);
  }

  onProjectSubmit(): void {
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
      description: formVal.description || ''
    };

    const dto: ProjectCreateDto = {
      name: formVal.name,
      description: JSON.stringify(descPayload),
      startDate: new Date(formVal.startDate).toISOString(),
      endDate: formVal.endDate ? new Date(formVal.endDate).toISOString() : null,
      managerId: null,
      tenantId: null
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

  // Users Modal Controls
  isUserFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  openUserModal(): void {
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'Manager'
    });
    this.userValidationErrors.set([]);
    this.isUserModalOpen.set(true);
  }

  closeUserModal(): void {
    this.isUserModalOpen.set(false);
  }

  onUserSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSavingUser.set(true);
    this.userValidationErrors.set([]);

    const dto: UserCreateDto = this.userForm.value;

    this.userService.createUser(dto).subscribe({
      next: (response) => {
        this.isSavingUser.set(false);
        if (response.success && response.data) {
          this.closeUserModal();
          this.fetchUsers();
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

  viewDetails(id: string): void {
    this.router.navigate(['/dashboard/projects', id]);
  }
}
