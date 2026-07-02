import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, firstValueFrom } from 'rxjs';

interface OfflineQueueItem {
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
}

type OfflineHandler = (payload: any) => Observable<any>;

@Injectable({
  providedIn: 'root'
})
export class OfflineSyncService {
  private readonly storageKey = 'structo_offline_queue';
  private readonly handlers = new Map<string, OfflineHandler>();
  private isFlushing = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.syncPendingRequests());
    }
  }

  registerHandler<T>(type: string, handler: (payload: T) => Observable<any>): void {
    this.handlers.set(type, handler as OfflineHandler);
    void this.syncPendingRequests();
  }

  submit<T>(type: string, payload: T, executor: (payload: T) => Observable<any>): Observable<any> {
    if (!this.isOnline()) {
      this.queueOperation(type, payload);
      return of({ success: true, message: 'Saved offline. It will sync automatically when the connection returns.', data: null });
    }

    return new Observable(observer => {
      executor(payload).subscribe({
        next: (value) => {
          observer.next(value);
          observer.complete();
        },
        error: (error: unknown) => {
          if (this.isNetworkError(error)) {
            this.queueOperation(type, payload);
            observer.next({ success: true, message: 'Saved offline. It will sync automatically when the connection returns.', data: null });
            observer.complete();
            return;
          }

          observer.error(error);
        }
      });
    });
  }

  private isOnline(): boolean {
    return typeof navigator === 'undefined' ? true : navigator.onLine;
  }

  private isNetworkError(error: unknown): boolean {
    return error instanceof HttpErrorResponse && error.status === 0;
  }

  private queueOperation<T>(type: string, payload: T): void {
    const queue = this.getQueue();
    queue.push({
      id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      payload,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }

  private getQueue(): OfflineQueueItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) as OfflineQueueItem[] : [];
    } catch {
      return [];
    }
  }

  private setQueue(queue: OfflineQueueItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(queue));
  }

  public syncPendingRequests(): void {
    void this.flushQueue();
  }

  private async flushQueue(): Promise<void> {
    if (this.isFlushing || !this.isOnline()) {
      return;
    }

    this.isFlushing = true;

    try {
      const queue = this.getQueue();
      if (queue.length === 0) {
        return;
      }

      const remaining: OfflineQueueItem[] = [];

      for (const item of queue) {
        const handler = this.handlers.get(item.type);
        if (!handler) {
          remaining.push(item);
          continue;
        }

        try {
          await firstValueFrom(handler(item.payload));
        } catch {
          remaining.push(item);
          break;
        }
      }

      this.setQueue(remaining);
    } finally {
      this.isFlushing = false;
    }
  }
}