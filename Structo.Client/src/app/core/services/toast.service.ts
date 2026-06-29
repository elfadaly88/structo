import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  onClick?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  show(title: string, message: string, type: ToastMessage['type'] = 'info', onClick?: () => void) {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: ToastMessage = { id, title, message, type, onClick };
    console.log('[ToastService] show() called:', toast);
    this.toasts.update(current => [...current, toast]);

    // Auto-dismiss after 6 seconds
    setTimeout(() => this.dismiss(id), 6000);
  }

  dismiss(id: string) {
    console.log('[ToastService] dismiss() called for ID:', id);
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
