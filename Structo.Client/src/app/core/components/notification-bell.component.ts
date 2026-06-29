import { Component, inject, signal, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, NotificationItem } from '../services/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [DatePipe],
  template: `
    <!-- Bell Button -->
    <div class="relative" id="notification-bell-container">
      <button
        id="notification-bell-btn"
        (click)="toggleDropdown()"
        class="relative flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 cursor-pointer">

        <!-- Bell Icon -->
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>

        <!-- Unread Badge -->
        @if (notifService.unreadCount() > 0) {
          <span
            class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center
                   rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white text-[10px] font-extrabold
                   shadow-lg shadow-red-500/40 animate-pulse ring-2 ring-slate-900">
            {{ notifService.unreadCount() > 99 ? '99+' : notifService.unreadCount() }}
          </span>
        }
      </button>

      <!-- Dropdown Panel -->
      @if (isOpen()) {
        <div
          id="notification-dropdown"
          class="absolute end-0 top-[calc(100%+10px)] w-[340px] max-h-[480px] flex flex-col
                 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-slate-950/80
                 overflow-hidden z-50 animate-slide-in">

          <!-- Header -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-800 shrink-0">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span class="text-sm font-semibold text-slate-100">Notifications</span>
              @if (notifService.unreadCount() > 0) {
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {{ notifService.unreadCount() }} new
                </span>
              }
            </div>
            @if (notifService.unreadCount() > 0) {
              <button
                (click)="markAllAsRead()"
                class="text-[11px] font-medium text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
                Mark all read
              </button>
            }
          </div>

          <!-- Notification list -->
          <div class="overflow-y-auto flex-1 divide-y divide-slate-800/60" id="notification-list">
            @if (notifService.notifications().length === 0) {
              <div class="flex flex-col items-center justify-center py-12 px-4 gap-3">
                <div class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p class="text-sm text-slate-500 font-medium">No notifications yet</p>
                <p class="text-xs text-slate-600 text-center">You're all caught up! New notifications will appear here in real-time.</p>
              </div>
            }

            @for (notif of notifService.notifications(); track notif.id) {
              <button
                id="notif-item-{{ notif.id }}"
                (click)="handleClick(notif)"
                class="w-full flex items-start gap-3 px-4 py-3 text-left transition-all duration-150 cursor-pointer group"
                [class.bg-indigo-500/5]="!notif.isRead"
                [class.hover:bg-slate-800/60]="notif.isRead"
                [class.hover:bg-indigo-500/10]="!notif.isRead">

                <!-- Icon by type -->
                <div class="shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                     [class]="getTypeStyles(notif.type)">
                  <span class="text-sm">{{ getTypeEmoji(notif.type) }}</span>
                </div>

                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-100 leading-snug truncate">{{ notif.title }}</p>
                  <p class="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{{ notif.message }}</p>
                  <p class="text-[10px] text-slate-600 mt-1.5 font-medium">
                    {{ notif.createdAt | date:'MMM d, h:mm a' }}
                  </p>
                </div>

                <!-- Unread dot -->
                @if (!notif.isRead) {
                  <div class="shrink-0 mt-2 w-2 h-2 rounded-full bg-indigo-500 shadow-md shadow-indigo-500/40"></div>
                }
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in {
      from { opacity: 0; transform: translateY(-8px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-slide-in {
      animation: slide-in 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class NotificationBellComponent {
  protected readonly notifService = inject(NotificationService);
  private readonly router = inject(Router);

  readonly isOpen = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('#notification-bell-container')) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  handleClick(notif: NotificationItem): void {
    this.notifService.markAsRead(notif.id);
    if (notif.deepLink) {
      this.router.navigateByUrl(notif.deepLink);
    }
    this.isOpen.set(false);
  }

  markAllAsRead(): void {
    this.notifService.markAllAsRead();
  }

  getTypeEmoji(type: string): string {
    const map: Record<string, string> = {
      Registration: '🏢',
      PettyCash:    '💰',
      Project:      '📋',
      System:       '🔔'
    };
    return map[type] ?? '🔔';
  }

  getTypeStyles(type: string): string {
    const map: Record<string, string> = {
      Registration: 'bg-indigo-500/15 text-indigo-400',
      PettyCash:    'bg-emerald-500/15 text-emerald-400',
      Project:      'bg-blue-500/15 text-blue-400',
      System:       'bg-slate-700/60 text-slate-400'
    };
    return map[type] ?? 'bg-slate-700/60 text-slate-400';
  }
}
