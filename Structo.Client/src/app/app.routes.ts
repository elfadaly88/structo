import { Routes } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
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
    loadComponent: () => import('./features/landing-page/landing-page.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
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
        data: { roles: ['SuperAdmin'] }
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        data: { roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'projects/:id',
        loadComponent: () => import('./features/dashboard/projects/project-details.component').then(m => m.ProjectDetailsComponent),
        data: { roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'financials',
        loadComponent: () => import('./features/dashboard/financials/financials.component').then(m => m.FinancialsComponent),
        data: { roles: ['TenantOwner', 'Accountant', 'Manager', 'SiteEngineer', 'DesignEngineer'] }
      },
      {
        path: 'users',
        loadComponent: () => import('./features/dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        data: { roles: ['TenantOwner'] }
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/dashboard/projects/projects.component').then(m => m.ProjectsComponent),
        data: { roles: ['TenantOwner'] }
      },
      {
        path: 'tenants',
        loadComponent: () => import('./features/dashboard/tenants/tenants.component').then(m => m.TenantsComponent),
        data: { roles: ['SuperAdmin'] }
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
