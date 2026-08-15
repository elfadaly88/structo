import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const subscriptionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  if (!authService.isTenantOwner()) {
    toastService.show(
      'غير مصرح / Unauthorized',
      'ترقية الباقة والفوترة مقتصرة حصرياً على مالك المنشأة.',
      'error'
    );
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
