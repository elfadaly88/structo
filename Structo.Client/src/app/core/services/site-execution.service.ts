import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.models';
import {
  AssignedEngineerDto,
  AvailableSettlementLineDto,
  LinkSettlementItemsDto,
  ProjectSiteTasksResponseDto,
  PublicProjectTrackerDto,
  SiteDailyLogDto,
  SiteDailyLogUpsertDto,
  SitePunchItemCreateDto,
  SitePunchItemDto,
  SitePunchItemStatusUpdateDto,
  SiteTaskCreateDto,
  SiteTaskDto,
  SiteTaskProgressUpdateDto
} from '../models/site-execution.models';

@Injectable({
  providedIn: 'root'
})
export class SiteExecutionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAssignedEngineers(projectId: string): Observable<ApiResponse<AssignedEngineerDto[]>> {
    return this.http.get<ApiResponse<AssignedEngineerDto[]>>(
      `${this.apiUrl}/projects/${projectId}/assigned-engineers`
    );
  }

  getProjectSiteTasks(projectId: string): Observable<ApiResponse<ProjectSiteTasksResponseDto>> {
    return this.http.get<ApiResponse<ProjectSiteTasksResponseDto>>(
      `${this.apiUrl}/projects/${projectId}/site-tasks`
    );
  }

  getAvailableSettlementItems(projectId: string): Observable<ApiResponse<AvailableSettlementLineDto[]>> {
    return this.http.get<ApiResponse<AvailableSettlementLineDto[]>>(
      `${this.apiUrl}/projects/${projectId}/available-settlement-items`
    );
  }

  createSiteTask(dto: SiteTaskCreateDto): Observable<ApiResponse<SiteTaskDto>> {
    return this.http.post<ApiResponse<SiteTaskDto>>(`${this.apiUrl}/site-tasks`, dto);
  }

  updateTaskProgress(taskId: string, dto: SiteTaskProgressUpdateDto): Observable<ApiResponse<boolean>> {
    return this.http.patch<ApiResponse<boolean>>(`${this.apiUrl}/site-tasks/${taskId}/progress`, dto);
  }

  linkSettlementItems(taskId: string, dto: LinkSettlementItemsDto): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/site-tasks/${taskId}/link-settlement-items`, dto);
  }

  getPublicProjectTracker(shareToken: string): Observable<ApiResponse<PublicProjectTrackerDto>> {
    return this.http.get<ApiResponse<PublicProjectTrackerDto>>(
      `${this.apiUrl}/public/project-tracker/${shareToken}`
    );
  }

  getDailyLogs(projectId: string): Observable<ApiResponse<SiteDailyLogDto[]>> {
    return this.http.get<ApiResponse<SiteDailyLogDto[]>>(
      `${this.apiUrl}/projects/${projectId}/daily-logs`
    );
  }

  upsertDailyLog(projectId: string, dto: SiteDailyLogUpsertDto): Observable<ApiResponse<SiteDailyLogDto>> {
    return this.http.post<ApiResponse<SiteDailyLogDto>>(
      `${this.apiUrl}/projects/${projectId}/daily-logs`,
      dto
    );
  }

  getPunchList(projectId: string, status?: string): Observable<ApiResponse<SitePunchItemDto[]>> {
    const url = status 
      ? `${this.apiUrl}/projects/${projectId}/punch-list?status=${encodeURIComponent(status)}`
      : `${this.apiUrl}/projects/${projectId}/punch-list`;
    return this.http.get<ApiResponse<SitePunchItemDto[]>>(url);
  }

  createPunchItem(projectId: string, dto: SitePunchItemCreateDto): Observable<ApiResponse<SitePunchItemDto>> {
    return this.http.post<ApiResponse<SitePunchItemDto>>(
      `${this.apiUrl}/projects/${projectId}/punch-list`,
      dto
    );
  }

  updatePunchItemStatus(id: string, dto: SitePunchItemStatusUpdateDto): Observable<ApiResponse<boolean>> {
    return this.http.patch<ApiResponse<boolean>>(
      `${this.apiUrl}/punch-list/${id}/status`,
      dto
    );
  }
}
