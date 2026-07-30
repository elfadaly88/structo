import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { environment } from '../../../environments/environment';
import { catchError, switchMap, filter, take, throwError, Observable } from 'rxjs';
import { extractApiMessage, translateErrorMessage } from '../utils/error-translations';

export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const router = inject(Router);
  const token = authService.getToken();

  let authReq = req;
  // Attach the token only if it exists and request is to our backend API
  if (token && req.url.startsWith(environment.apiUrl)) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      const apiMessage = extractApiMessage(error);
      if (apiMessage === 'ACCOUNT_DEACTIVATED' || apiMessage === 'REFRESH_TOKEN_EXPIRED') {
        authService.logout();
        const translatedMsg = translateErrorMessage(apiMessage);
        toastService.show('تنبيه الحساب', translatedMsg, 'error');
        router.navigate(['/login']);
        return throwError(() => error);
      }

      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth/refresh') &&
        !req.url.includes('/auth/refresh-token') &&
        !req.url.includes('/auth/login')
      ) {
        return handle401Error(authReq, next, authService, toastService, router);
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
        authService.logout();
        const apiMsg = extractApiMessage(err) || 'REFRESH_TOKEN_EXPIRED';
        const translatedMsg = translateErrorMessage(apiMsg);
        toastService.show('تنبيه الحساب', translatedMsg, 'error');
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    return authService.refreshTokenSubject.pipe(
      filter((token): token is string => token !== null),
      take(1),
      switchMap((token: string) => {
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

