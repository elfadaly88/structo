import { Injectable, signal, computed } from '@angular/core';

/** Formats seconds as m:ss (e.g. 4:05), so messages need no language-specific plural forms. */
export function formatCooldown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

@Injectable({
  providedIn: 'root'
})
export class RateLimitService {
  readonly cooldownSeconds = signal<number>(0);
  readonly isLockedOut = computed(() => this.cooldownSeconds() > 0);
  readonly cooldownDisplay = computed(() => formatCooldown(this.cooldownSeconds()));

  private timerRef: any = null;

  /**
   * Starts a countdown timer for rate limit cooldown
   * @param seconds Duration in seconds (default: 60)
   */
  startCooldown(seconds: number = 60): void {
    // If a cooldown is already running, only update if requested seconds is greater
    if (this.cooldownSeconds() > 0 && seconds <= this.cooldownSeconds()) {
      return;
    }

    this.stopTimer();
    this.cooldownSeconds.set(seconds);

    if (typeof window !== 'undefined') {
      this.timerRef = setInterval(() => {
        const current = this.cooldownSeconds();
        if (current <= 1) {
          this.cooldownSeconds.set(0);
          this.stopTimer();
        } else {
          this.cooldownSeconds.set(current - 1);
        }
      }, 1000);
    }
  }

  private stopTimer(): void {
    if (this.timerRef !== null) {
      clearInterval(this.timerRef);
      this.timerRef = null;
    }
  }
}
