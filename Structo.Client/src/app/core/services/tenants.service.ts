import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantDto } from './public-directory.service';
import { ProjectDto } from '../models/project.models';
import {
  TenantLifecycleSummary,
  AdminTenantPagedResult,
  AdminTenantQueryParams,
  ForcePurgeResult,
  ExemptionToggleResponse
} from '../models/admin-tenant.models';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TenantsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Tenants`;
  private readonly adminUrl = `${environment.apiUrl}/admin/tenants`;

  getAllTenants(): Observable<ApiResponse<TenantDto[]>> {
    return this.http.get<ApiResponse<TenantDto[]>>(this.baseUrl);
  }

  getLifecycleSummary(): Observable<ApiResponse<TenantLifecycleSummary>> {
    return this.http.get<ApiResponse<TenantLifecycleSummary>>(`${this.adminUrl}/lifecycle-summary`);
  }

  getAdminTenants(params?: AdminTenantQueryParams): Observable<ApiResponse<AdminTenantPagedResult>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber.toString());
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.statusFilter) httpParams = httpParams.set('statusFilter', params.statusFilter);
      if (params.planFilter) httpParams = httpParams.set('planFilter', params.planFilter);
      if (params.onlyInactiveOver45Days !== undefined) httpParams = httpParams.set('onlyInactiveOver45Days', params.onlyInactiveOver45Days.toString());
    }
    return this.http.get<ApiResponse<AdminTenantPagedResult>>(this.adminUrl, { params: httpParams });
  }

  forcePurgeTenant(id: string): Observable<ApiResponse<ForcePurgeResult>> {
    return this.http.post<ApiResponse<ForcePurgeResult>>(`${this.adminUrl}/${id}/force-purge`, {});
  }

  toggleCleanupExemption(id: string, isExempt?: boolean): Observable<ApiResponse<ExemptionToggleResponse>> {
    return this.http.post<ApiResponse<ExemptionToggleResponse>>(`${this.adminUrl}/${id}/exempt`, { isExempt });
  }

  provisionTenant(id: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/${id}/provision`, {});
  }

  toggleTenantStatus(id: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/${id}/toggle-status`, {});
  }

  getTenantAuditProfile(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${environment.apiUrl}/superadmin/tenants/${id}/profile`);
  }

  getTenantProjects(tenantId: string): Observable<ApiResponse<ProjectDto[]>> {
    return this.http.get<ApiResponse<ProjectDto[]>>(`${environment.apiUrl}/projects?tenantId=${tenantId}`);
  }

  toggleReviewVisibility(reviewId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${environment.apiUrl}/superadmin/reviews/${reviewId}/toggle-visibility`, {});
  }

  manualUpgradeTenant(id: string, req: { extraProjectsCount: number; amount: number; paymentMethod: string; notes?: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/${id}/manual-upgrade`, req);
  }
}

