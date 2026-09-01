import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { inject, ApplicationRef, NgZone } from '@angular/core';
import { Observable, tap } from 'rxjs';

/**
 * Structural Safety Net Interceptor:
 * Guarantees that EVERY HTTP response (successful or error) triggers Angular change detection reliably,
 * ensuring that nested @if/@for control-flow blocks render on first paint — zero manual user
 * interaction (click/scroll/focus) required.
 *
 * ROOT CAUSE THIS SOLVES:
 * With `provideZoneChangeDetection({ eventCoalescing: true })`, Angular coalesces
 * multiple change detection triggers into a SINGLE tick per animation frame. The
 * previous approach used `finalize()` which fires on observable completion (AFTER
 * the subscriber's `.next()` has already set signals). The coalescing engine
 * batches the Zone-triggered CD (from the HTTP task completing) together with our
 * explicit `appRef.tick()` calls into ONE pass. This single pass creates new @if
 * DOM branches but the @for loops inside those branches need a SECOND pass to
 * iterate — which never comes because coalescing already consumed the tick budget.
 *
 * FIX:
 * Use `tap()` to react to emissions (both success and error), and schedule the
 * safety-net tick via `requestAnimationFrame` for foreground tabs, backed by an
 * automatic fallback for background tabs or tabs switched away while data was in-flight.
 *
 * BACKGROUND TAB RESILIENCE:
 * Browsers throttle or suspend `requestAnimationFrame` when the tab is backgrounded.
 * To guarantee data is fully rendered even if the user switches tabs during fetch:
 *   1. If `document.visibilityState === 'hidden'`, execute immediately via `setTimeout(0)`.
 *   2. If in foreground, race `requestAnimationFrame` with a 150ms timeout fallback.
 *      If the user switches tabs immediately after request completion, the timeout fires
 *      and renders the view in the background so it is 100% ready when they switch back.
 */
export const changeDetectionSafetyInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const appRef = inject(ApplicationRef);
  const ngZone = inject(NgZone);

  const scheduleSafetyTick = () => {
    ngZone.runOutsideAngular(() => {
      let executed = false;
      const triggerTick = () => {
        if (executed) return;
        executed = true;
        ngZone.run(() => {
          try {
            appRef.tick();
          } catch {
            /* guard against ExpressionChangedAfterItHasBeenChecked in dev mode */
          }
        });
      };

      // 1. If document is currently hidden (tab is in background), rAF is suspended or heavily throttled.
      // Immediate setTimeout guarantees the tick runs without waiting for tab switch.
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        setTimeout(triggerTick, 0);
        return;
      }

      // 2. Foreground tab: schedule in next animation frame to let current frame's coalesced pass finish.
      // Also register a fallback timeout in case the tab is switched to background immediately after scheduling.
      const fallbackTimer = setTimeout(triggerTick, 150);

      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
          clearTimeout(fallbackTimer);
          triggerTick();
        });
      }
    });
  };

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          scheduleSafetyTick();
        }
      },
      error: () => {
        scheduleSafetyTick();
      }
    })
  );
};
