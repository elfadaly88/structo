import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    // User is not authenticated, redirect to login page with returnUrl query param
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }

  const currentUser = authService.currentUser();
  const userRole = currentUser?.role;

  // Check role-based access
  const allowedRoles = route.data?.['roles'] as string[];
  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    // Redirect to default page based on role
    if (userRole === 'SuperAdmin') {
      return router.createUrlTree(['/dashboard/overview']);
    } else {
      return router.createUrlTree(['/dashboard/projects']);
    }
  }

  return true;
};
