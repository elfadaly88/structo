import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { environment } from '../../../environments/environment';
import { catchError, switchMap, filter, take, throwError, Observable, Subject, merge, map } from 'rxjs';
import { extractApiMessage, translateErrorMessage } from '../utils/error-translations';

// Fails requests that were queued behind a refresh that got rate-limited (429),
// so they don't wait forever for a token that is not coming.
const refreshRateLimited$ = new Subject<HttpErrorResponse>();

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const injector = inject(Injector);
  let authService: AuthService | null = null;
  let token: string | null = null;
  try {
    authService = injector.get(AuthService);
    token = authService.getToken();
  } catch {
    // fallback if DI is initializing
  }

  let authReq = req;
  // Attach the token only if it exists and request is to our backend API
  const isApiRequest = req.url.startsWith(environment.apiUrl) ||
                       req.url.startsWith('https://structo-production.up.railway.app/api') ||
                       req.url.startsWith('/api') ||
                       req.url.includes('/api/');
  if (token && isApiRequest) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      const toast = injector.get(ToastService, null);
      const router = injector.get(Router, null);
      const auth = authService || injector.get(AuthService, null);

      const apiMessage = extractApiMessage(error);
      if (apiMessage === 'ACCOUNT_DEACTIVATED' || apiMessage === 'REFRESH_TOKEN_EXPIRED') {
        auth?.logout();
        const translatedMsg = translateErrorMessage(apiMessage);
        toast?.show('تنبيه الحساب', translatedMsg, 'error');
        router?.navigate(['/login']);
        return throwError(() => error);
      }

      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth/refresh') &&
        !req.url.includes('/auth/refresh-token') &&
        !req.url.includes('/auth/login') &&
        auth && toast && router
      ) {
        return handle401Error(authReq, next, auth, toast, router);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService, toastService: ToastService, router: Router): Observable<HttpEvent<unknown>> {
  if (!authService.isRefreshingToken) {
    authService.isRefreshingToken = true;
    authService.refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        authService.isRefreshingToken = false;
        if (response.success && response.data) {
          authService.refreshTokenSubject.next(response.data.token);
          return next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.data.token}`
              }
            })
          );
        } else {
          authService.logout();
          const apiMsg = response.message || 'REFRESH_TOKEN_EXPIRED';
          const translatedMsg = translateErrorMessage(apiMsg);
          toastService.show('تنبيه الحساب', translatedMsg, 'error');
          router.navigate(['/login']);
          return throwError(() => new Error(translatedMsg));
        }
      }),
      catchError((err) => {
        authService.isRefreshingToken = false;

        // Refresh was rate-limited: keep the session. rateLimitInterceptor has already shown the
        // message and started the cooldown; the next request will try refreshing again.
        if (err instanceof HttpErrorResponse && err.status === 429) {
          refreshRateLimited$.next(err);
          return throwError(() => err);
        }

        authService.logout();
        const apiMsg = extractApiMessage(err) || 'REFRESH_TOKEN_EXPIRED';
        const translatedMsg = translateErrorMessage(apiMsg);
        toastService.show('تنبيه الحساب', translatedMsg, 'error');
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    return merge(
      authService.refreshTokenSubject.pipe(
        filter((token): token is string => token !== null),
        map((token) => ({ token, error: null as HttpErrorResponse | null }))
      ),
      refreshRateLimited$.pipe(map((error) => ({ token: null as string | null, error })))
    ).pipe(
      take(1),
      switchMap(({ token, error }) => {
        if (!token) {
          return throwError(() => error);
        }
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        );
      })
    );
  }
}

