import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { RateLimitService, formatCooldown } from '../services/rate-limit.service';

const DEFAULT_COOLDOWN_SECONDS = 60;
// The server's fixed-window Retry-After is an upper bound (the full window); if it is still
// too early after this cap, the server simply answers 429 again.
const MAX_COOLDOWN_SECONDS = 300;

/** Reads the server's Retry-After header (seconds), capped at 5 minutes; 60s when absent or invalid. */
function retryAfterSeconds(error: HttpErrorResponse): number {
  const seconds = Number(error.headers?.get('Retry-After'));
  const requested = Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : DEFAULT_COOLDOWN_SECONDS;
  return Math.min(requested, MAX_COOLDOWN_SECONDS);
}

export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 429 || error.status === 503) {
          const toastService = injector.get(ToastService, null);
          const rateLimitService = injector.get(RateLimitService, null);
          const translate = injector.get(TranslateService, null);
          const seconds = retryAfterSeconds(error);

          toastService?.show(
            translate?.instant('AUTH.RATE_LIMIT_TITLE') ?? 'تنبيه المحاولات الكثيرة',
            translate?.instant('AUTH.RATE_LIMITED', { time: formatCooldown(seconds) })
              ?? 'لقد تجاوزت عدد المحاولات المسموحة. يرجى الانتظار قبل المحاولة مجدداً.',
            'warning'
          );

          // Application-wide cooldown lock for as long as the server asked
          rateLimitService?.startCooldown(seconds);
        }
      }
      return throwError(() => error);
    })
  );
};
