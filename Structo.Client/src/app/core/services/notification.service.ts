

import { Injectable, inject, signal, computed, OnDestroy, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    OneSignalDeferred?: any[];
  }
}

export interface NotificationItem {
  id: string;
  tenantId: string | null;
  senderId: string | null;
  receiverId: string | null;
  title: string;
  message: string;
  type: string;
  deepLink: string;
  isRead: boolean;
  targetRole: string | null;
  readAt: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly apiUrl = `${environment.apiUrl}/notifications`;
  private hubConnection: HubConnection | null = null;
  private static oneSignalInitialized = false;
  private static oneSignalInitInFlight = false;
  private static oneSignalSyncedUserId: string | null = null;

  initializeOneSignal(userId: string, email: string): void {
    if (!userId) {
      return;
    }

    if (NotificationService.oneSignalSyncedUserId === userId && NotificationService.oneSignalInitialized) {
      return;
    }

    if (NotificationService.oneSignalInitInFlight) {
      return;
    }

    NotificationService.oneSignalInitInFlight = true;
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      const syncIdentity = async () => {
        try {
          if (typeof OneSignal?.login !== 'function' || !OneSignal?.User) {
            console.warn('[OneSignal] SDK is not ready for identity sync.');
            return;
          }

          if (OneSignal.User.externalId !== userId) {
            await OneSignal.login(userId);
          }

          if (email && email.includes('@') && typeof OneSignal.User.addEmail === 'function') {
            await OneSignal.User.addEmail(email);
            console.log(`[OneSignal] Identity synced for User: ${userId} with Email: ${email}`);
          } else {
            console.log(`[OneSignal] Identity synced for User: ${userId} (Email skipped or invalid: "${email}")`);
          }

          NotificationService.oneSignalSyncedUserId = userId;
        } catch (e) {
          console.warn('[OneSignal] Identity sync failed:', e);
        }
      };

      // Check if OneSignal is already initialized via our static flag or the native property
      if (NotificationService.oneSignalInitialized || OneSignal.initialized) {
        NotificationService.oneSignalInitialized = true;
        await syncIdentity();
        NotificationService.oneSignalInitInFlight = false;
        return;
      }

      try {
        await OneSignal.init({
          appId: "6b5e2529-37fa-4153-abe1-dcf0bae7af2e",
          allowLocalhostAsSecure: true
        });
        NotificationService.oneSignalInitialized = true;
        await syncIdentity();
      } catch (err: any) {
        const errMsg = String(err || '');
        if (errMsg.includes('already initialized') || errMsg.includes('already_initialized')) {
          NotificationService.oneSignalInitialized = true;
          await syncIdentity();
        } else {
          console.error('[OneSignal] Init failed:', err);
        }
      } finally {
        NotificationService.oneSignalInitInFlight = false;
      }
    });
  }

  // ── Reactive state ────────────────────────────────────────────────────────
  readonly notifications = signal<NotificationItem[]>([]);
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.isRead).length);

  constructor() {
    // Reactively start/stop the hub connection when auth state changes
    effect(() => {
      const user = this.authService.currentUser();
      if (user) {
        this.loadNotifications();
        this.startConnection();
      } else {
        this.stopConnection();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopConnection();
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  navigateDeepLink(deepLink: string | null | undefined): void {
    if (!deepLink) return;
    let targetLink = deepLink;

    // Convert absolute URLs to relative paths to keep the user on their current domain (local/prod)
    if (targetLink.startsWith('http://') || targetLink.startsWith('https://')) {
      try {
        const parsedUrl = new URL(targetLink);
        targetLink = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
      } catch (e) {
        // Fallback to original string if URL parsing fails
      }
    }

    // Rewrite legacy/mismatched deep links for backward compatibility
    if (targetLink.includes('/dashboard/admin/approvals')) {
      targetLink = '/dashboard/tenants';
    } else if (targetLink.includes('/dashboard/financial-requests/details')) {
      targetLink = '/dashboard/financials';
    }

    const currentUrl = this.router.url;
    // If already on the target page, force a reload by navigating away and back
    if (currentUrl.split('?')[0] === targetLink.split('?')[0]) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(targetLink);
      });
    } else {
      this.router.navigateByUrl(targetLink);
    }
  }

  markAsRead(id: string): void {
    this.notifications.update(ns =>
      ns.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    this.http.post(`${this.apiUrl}/${id}/mark-read`, {}).subscribe();
  }

  markAllAsRead(): void {
    // Capture unread IDs BEFORE updating the signal state
    const unreadIds = this.notifications()
      .filter(n => !n.isRead)
      .map(n => n.id);

    // Update local state signal
    this.notifications.update(ns => ns.map(n => ({ ...n, isRead: true })));

    // Send HTTP mark-read calls for all captured unread notifications
    unreadIds.forEach(id => {
      this.http.post(`${this.apiUrl}/${id}/mark-read`, {}).subscribe();
    });
  }

  clearAllNotifications(): void {
    this.notifications.set([]);
    this.http.delete(`${this.apiUrl}/clear-all`).subscribe();
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private loadNotifications(): void {
    this.http.get<{ data: NotificationItem[] }>(`${this.apiUrl}`)
      .subscribe({ next: res => this.notifications.set(res.data ?? []) });
  }

  private startConnection(): void {
    if (this.hubConnection) return;

    const token = this.authService.getToken();
    const apiUrl = environment.apiUrl.replace('/api', '');

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${apiUrl}/hubs/notifications`, {
        skipNegotiation: false,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => token ?? ''
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .build();

    this.hubConnection.on('ReceiveNotification', (notification: NotificationItem) => {
      console.log('[SignalR] ReceiveNotification triggered:', notification);

      // Ensure that client-side role isolation is maintained
      const currentUser = this.authService.currentUser();
      if (notification.targetRole && (!currentUser || currentUser.role !== notification.targetRole)) {
        console.log('[SignalR] Ignoring notification targeting role:', notification.targetRole);
        return;
      }

      // Prepend new notification and cap at 50
      this.notifications.update(ns => [notification, ...ns].slice(0, 50));

      // Determine toast type based on notification category
      let toastType: 'success' | 'info' | 'warning' | 'error' = 'info';
      if (notification.type === 'PettyCash') {
        toastType = 'success';
      } else if (notification.type === 'System') {
        toastType = 'warning';
      }

      // Map icons to enrich toast presentation
      const emojiMap: Record<string, string> = {
        Registration: '🏢',
        PettyCash: '💰',
        Project: '📋',
        System: '🔔'
      };
      const emoji = emojiMap[notification.type] ?? '🔔';

      // Display animated float toast alert
      this.toastService.show(
        `${emoji} ${notification.title}`,
        notification.message,
        toastType,
        () => {
          this.markAsRead(notification.id);
          this.navigateDeepLink(notification.deepLink);
        }
      );
    });

    this.hubConnection.start().catch(err =>
      console.warn('[SignalR] Connection failed:', err)
    );
  }

  private stopConnection(): void {
    this.hubConnection?.stop();
    this.hubConnection = null;
  }
}
