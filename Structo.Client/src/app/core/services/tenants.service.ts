import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantDto } from './public-directory.service';
import { ProjectDto } from '../models/project.models';

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

  getAllTenants(): Observable<ApiResponse<TenantDto[]>> {
    return this.http.get<ApiResponse<TenantDto[]>>(this.baseUrl);
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
}
