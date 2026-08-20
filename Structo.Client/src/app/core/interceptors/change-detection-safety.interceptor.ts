import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject, ApplicationRef, NgZone } from '@angular/core';
import { Observable, finalize } from 'rxjs';

/**
 * Structural Safety Net Interceptor:
 * Guarantees that EVERY HTTP response (whether successful or failing) triggers an
 * immediate Angular ApplicationRef.tick() change detection pass on the next microtask.
 *
 * This ensures that whenever component subscribe callbacks (.next / .error / .complete)
 * update signals or component state, the DOM is guaranteed to be re-evaluated and rendered
 * on the very first paint with zero manual user interaction (click/scroll/focus) required.
 */
export const changeDetectionSafetyInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const appRef = inject(ApplicationRef);
  const ngZone = inject(NgZone);

  return next(req).pipe(
    finalize(() => {
      ngZone.run(() => {
        // 1. Immediate microtask pass (for fast local updates)
        queueMicrotask(() => {
          try {
            appRef.tick();
          } catch {}
        });

        // 2. Macrotask pass (guarantees execution after new @if / @for DOM branches attach)
        setTimeout(() => {
          try {
            appRef.tick();
          } catch {}
        }, 0);
      });
    })
  );
};
