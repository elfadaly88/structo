import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { ProjectFullReportDto, CompanyWideReportDto } from '../models/financial-report.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getProjectFullReport(projectId: string, startDate?: string, endDate?: string): Observable<ApiResponse<ProjectFullReportDto>> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<ApiResponse<ProjectFullReportDto>>(
      `${this.apiUrl}/projects/${projectId}/full-report`,
      { params }
    );
  }

  getCompanyWideFullReport(startDate?: string, endDate?: string, projectId?: string): Observable<ApiResponse<CompanyWideReportDto>> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (projectId) params = params.set('projectId', projectId);

    return this.http.get<ApiResponse<CompanyWideReportDto>>(
      `${this.apiUrl}/tenant/full-report`,
      { params }
    );
  }
}
