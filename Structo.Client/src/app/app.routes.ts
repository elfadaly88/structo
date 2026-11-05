import { Routes } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { subscriptionGuard } from './core/guards/subscription.guard';
import { AuthService } from './core/services/auth.service';

@Component({
  standalone: true,
  template: `<div class="flex items-center justify-center h-48">
    <svg class="animate-spin h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>`
})
export class DashboardRedirectComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const role = this.auth.currentUser()?.role;
    if (role === 'SuperAdmin') {
      this.router.navigate(['/dashboard/overview'], { replaceUrl: true });
    } else {
      this.router.navigate(['/dashboard/financials'], { replaceUrl: true });
    }
  }
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing-page/landing-page.component').then(m => m.LandingPageComponent),
    data: { seo: { index: true } }
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    data: { seo: { title: 'تسجيل الدخول', description: 'سجّل الدخول إلى أسس لإدارة عُهد ومصاريف ومتابعة تنفيذ مشاريعك.', index: true } }
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/tenant-register/tenant-register.component').then(m => m.TenantRegisterComponent),
    data: { seo: { title: 'سجّل شركتك مجاناً', description: 'سجّل شركة التشطيبات أو المقاولات أو مكتبك الهندسي في أسس وابدأ بمشروعين مجاناً: عُهد، تسويات، مصاريف، ومتابعة تنفيذ.', index: true } }
  },
  {
    path: 'subscription',
    redirectTo: 'dashboard/subscription'
  },
  {
    path: 'upgrade',
    redirectTo: 'dashboard/subscription'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardRedirectComponent
      },
      {
        path: 'overview',
        loadComponent: () => import('./features/dashboard/overview/overview.component').then(m => m.OverviewComponent),
        data: { seo: { title: 'لوحة المنصة' }, roles: ['SuperAdmin'] }
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        data: { seo: { title: 'المشاريع' }, roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'projects/:id',
        loadComponent: () => import('./features/dashboard/projects/project-details.component').then(m => m.ProjectDetailsComponent),
        data: { seo: { title: 'تفاصيل المشروع' }, roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'projects/:id/site-execution',
        loadComponent: () => import('./features/dashboard/projects/site-execution/site-execution.component').then(m => m.SiteExecutionComponent),
        data: { seo: { title: 'متابعة الموقع والتنفيذ' }, roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'financials',
        loadComponent: () => import('./features/dashboard/financials/financials.component').then(m => m.FinancialsComponent),
        data: { seo: { title: 'المركز المالي' }, roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/dashboard/reports/reports.component').then(m => m.ReportsComponent),
        canActivate: [authGuard],
        data: { seo: { title: 'التقارير المالية' }, roles: ['TenantOwner', 'Accountant'] }
      },
      {
        path: 'users',
        loadComponent: () => import('./features/dashboard/users/users.component').then(m => m.UsersComponent),
        data: { seo: { title: 'مستخدمو الشركة' }, roles: ['TenantOwner'] }
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/dashboard/tenant-profile/tenant-profile.component').then(m => m.TenantProfileComponent),
        data: { seo: { title: 'الملف التعريفي للشركة' }, roles: ['TenantOwner'] }
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/dashboard/tenant-profile/tenant-profile.component').then(m => m.TenantProfileComponent),
        data: { seo: { title: 'الإعدادات' }, roles: ['TenantOwner'] }
      },
      {
        path: 'subscription',
        loadComponent: () => import('./features/dashboard/subscription/subscription.component').then(m => m.SubscriptionComponent),
        data: { seo: { title: 'الاشتراك والمشاريع الإضافية' }, roles: ['TenantOwner'] }
      },
      {
        path: 'subscription/success',
        loadComponent: () => import('./features/dashboard/subscription/subscription-success.component').then(m => m.SubscriptionSuccessComponent),
        data: { seo: { title: 'تم الدفع' }, roles: ['TenantOwner', 'SuperAdmin', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'subscription/failed',
        loadComponent: () => import('./features/dashboard/subscription/subscription-failed.component').then(m => m.SubscriptionFailedComponent),
        data: { seo: { title: 'فشل الدفع' }, roles: ['TenantOwner', 'SuperAdmin', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'upgrade',
        redirectTo: 'subscription'
      },
      {
        path: 'billing',
        redirectTo: 'subscription'
      },
      {
        path: 'tenants',
        loadComponent: () => import('./features/dashboard/tenants/tenants.component').then(m => m.TenantsComponent),
        data: { seo: { title: 'الشركات' }, roles: ['SuperAdmin'] }
      },
      {
        path: 'pending-users',
        loadComponent: () => import('./features/dashboard/pending-users/pending-users.component').then(m => m.PendingUsersComponent),
        data: { seo: { title: 'طلبات التسجيل' }, roles: ['SuperAdmin'] }
      },
      {
        path: 'admin-payments',
        loadComponent: () => import('./features/dashboard/admin-payments/admin-payments.component').then(m => m.AdminPaymentsComponent),
        data: { seo: { title: 'مراجعة المدفوعات' }, roles: ['SuperAdmin'] }
      },
      {
        path: 'payment-requests',
        loadComponent: () => import('./features/dashboard/payment-requests/payment-requests.component').then(m => m.PaymentRequestsComponent),
        data: { seo: { title: 'طلبات InstaPay' }, roles: ['SuperAdmin'] }
      },
      {
        path: 'payment-audit',
        redirectTo: 'admin-payments'
      }
    ]
  },
  {
    path: 'superadmin/dashboard',
    redirectTo: 'dashboard/tenants',
    pathMatch: 'full'
  },
  {
    path: 'admin/tenants',
    redirectTo: 'dashboard/tenants',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    redirectTo: 'dashboard/tenants',
    pathMatch: 'full'
  },
  {
    path: 'public/project-review/:token',
    loadComponent: () => import('./features/public/project-review.component').then(m => m.ProjectReviewComponent)
  },
  {
    path: 'track/:shareToken',
    loadComponent: () => import('./features/public/project-tracker.component').then(m => m.ProjectTrackerComponent),
    data: { seo: { title: 'متابعة تنفيذ المشروع', index: false } }
  },
  {
    path: '**',
    loadComponent: () => import('./features/public/not-found.component').then(m => m.NotFoundComponent),
    data: { seo: { title: 'الصفحة غير موجودة', index: false } }
  }
];
