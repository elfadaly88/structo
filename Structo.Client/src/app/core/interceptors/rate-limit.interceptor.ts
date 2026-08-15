import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { RateLimitService } from '../services/rate-limit.service';

export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 429 || error.status === 503) {
          const toastService = injector.get(ToastService, null);
          const rateLimitService = injector.get(RateLimitService, null);

          // Show unified elegant Arabic toast message
          toastService?.show(
            'تنبيه المحاولات الكثيرة',
            'لقد تجاوزت عدد المحاولات المسموحة. يرجى الانتظار دقيقة قبل المحاولة مجدداً.',
            'warning'
          );

          // Activate application-wide 60-second cooldown lock
          rateLimitService?.startCooldown(60);
        }
      }
      return throwError(() => error);
    })
  );
};
