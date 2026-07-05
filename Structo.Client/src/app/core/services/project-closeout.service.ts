import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import {
  ProjectReconciliationReportDto,
  ClientReviewSubmitDto
} from '../models/project.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectCloseoutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;
  private readonly publicApiUrl = `${environment.apiUrl}/public/projects`;

  /** GET reconciliation audit report for a project */
  getReconciliationReport(projectId: string): Observable<ApiResponse<ProjectReconciliationReportDto>> {
    return this.http.get<ApiResponse<ProjectReconciliationReportDto>>(
      `${this.apiUrl}/${projectId}/reconciliation-report`
    );
  }

  /** POST freeze project (TenantOwner or Accountant) */
  freezeProject(projectId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.apiUrl}/${projectId}/freeze`,
      {}
    );
  }

  /** POST final closeout (TenantOwner only, requires full reconciliation) */
  finalCloseout(projectId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.apiUrl}/${projectId}/final-closeout`,
      {}
    );
  }

  /** POST anonymous client review (no auth required) */
  submitClientReview(token: string, dto: ClientReviewSubmitDto): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.publicApiUrl}/review/${token}`,
      dto
    );
  }
}
