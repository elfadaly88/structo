import { Injectable, signal } from '@angular/core';

export interface ConfirmModalConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export interface AlertModalConfig {
  title: string;
  message: string;
  buttonText?: string;
  type?: 'error' | 'success' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  // ── Confirm state ──
  readonly isConfirmOpen = signal(false);
  readonly confirmConfig = signal<ConfirmModalConfig>({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger'
  });
  private confirmResolve: ((value: boolean) => void) | null = null;

  // ── Alert state ──
  readonly isAlertOpen = signal(false);
  readonly alertConfig = signal<AlertModalConfig>({
    title: '',
    message: '',
    buttonText: 'OK',
    type: 'error'
  });
  private alertResolve: (() => void) | null = null;

  toggleBodyScroll(lock: boolean): void {
    if (typeof document !== 'undefined' && document.body) {
      if (lock) {
        document.body.classList.add('overflow-hidden');
      } else {
        // Only unlock if no other modal is currently active/open
        // We'll check if there's any active overlay or if components call this manually
        document.body.classList.remove('overflow-hidden');
      }
    }
  }

  /**
   * Opens a confirmation dialog. Returns a Promise that resolves to
   * `true` (confirmed) or `false` (cancelled).
   */
  confirm(config: ConfirmModalConfig): Promise<boolean> {
    this.confirmConfig.set({
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      type: 'danger',
      ...config
    });
    this.isConfirmOpen.set(true);
    this.toggleBodyScroll(true);
    return new Promise<boolean>((resolve) => {
      this.confirmResolve = resolve;
    });
  }

  /** Called internally by the modal component. */
  resolveConfirm(result: boolean): void {
    this.isConfirmOpen.set(false);
    this.toggleBodyScroll(false);
    this.confirmResolve?.(result);
    this.confirmResolve = null;
  }

  /**
   * Opens an alert dialog (single "OK" button). Returns a Promise
   * that resolves when the user dismisses the alert.
   */
  alert(config: AlertModalConfig): Promise<void> {
    this.alertConfig.set({
      buttonText: 'OK',
      type: 'error',
      ...config
    });
    this.isAlertOpen.set(true);
    this.toggleBodyScroll(true);
    return new Promise<void>((resolve) => {
      this.alertResolve = resolve;
    });
  }

  /** Called internally by the modal component. */
  resolveAlert(): void {
    this.isAlertOpen.set(false);
    this.toggleBodyScroll(false);
    this.alertResolve?.();
    this.alertResolve = null;
  }
}
