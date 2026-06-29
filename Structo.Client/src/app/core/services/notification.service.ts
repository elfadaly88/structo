import { Injectable, inject, signal, computed, OnDestroy, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

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
  readAt: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/notifications`;
  private hubConnection: signalR.HubConnection | null = null;

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

  markAsRead(id: string): void {
    this.notifications.update(ns =>
      ns.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    this.http.post(`${this.apiUrl}/${id}/mark-read`, {}).subscribe();
  }

  markAllAsRead(): void {
    this.notifications.update(ns => ns.map(n => ({ ...n, isRead: true })));
    // Mark each unread item via the API
    this.notifications().filter(n => !n.isRead).forEach(n =>
      this.http.post(`${this.apiUrl}/${n.id}/mark-read`, {}).subscribe()
    );
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private loadNotifications(): void {
    this.http.get<{ data: NotificationItem[] }>(`${this.apiUrl}`)
      .subscribe({ next: res => this.notifications.set(res.data ?? []) });
  }

  private startConnection(): void {
    if (this.hubConnection) return;

    const token = this.authService.getToken();
    const hubUrl = `${environment.apiUrl.replace('/api', '')}/hubs/notifications`;

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => token ?? '',
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    this.hubConnection.on('ReceiveNotification', (notification: NotificationItem) => {
      // Prepend new notification and cap at 50
      this.notifications.update(ns => [notification, ...ns].slice(0, 50));
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
