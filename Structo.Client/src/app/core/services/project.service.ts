import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { ProjectDto, ProjectCreateDto } from '../models/project.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/projects`;
  getProjects(): Observable<ApiResponse<ProjectDto[]>> {
    return this.http.get<ApiResponse<ProjectDto[]>>(this.apiUrl);
  }

  getProjectById(id: string): Observable<ApiResponse<ProjectDto>> {
    return this.http.get<ApiResponse<ProjectDto>>(`${this.apiUrl}/${id}`);
  }

  createProject(dto: ProjectCreateDto): Observable<ApiResponse<ProjectDto>> {
    return this.http.post<ApiResponse<ProjectDto>>(this.apiUrl, dto);
  }

  reviseBudget(projectId: string, dto: { newBudget: number; reasonForChange: string; boqFileUrl?: string }): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/${projectId}/budget-revision`, dto);
  }

  updateProject(projectId: string, dto: any): Observable<ApiResponse<ProjectDto>> {
    return this.http.put<ApiResponse<ProjectDto>>(`${this.apiUrl}/${projectId}`, dto);
  }

  getProjectBudgetHistory(projectId: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/${projectId}/budget-history`);
  }

  // --- Team Member Management ---
  getProjectMembers(projectId: string): Observable<ApiResponse<import('../models/project.models').ProjectMemberDto[]>> {
    return this.http.get<ApiResponse<import('../models/project.models').ProjectMemberDto[]>>(`${this.apiUrl}/${projectId}/members`);
  }

  addProjectMembers(projectId: string, userIds: string[]): Observable<ApiResponse<import('../models/project.models').ProjectMemberDto[]>> {
    return this.http.post<ApiResponse<import('../models/project.models').ProjectMemberDto[]>>(`${this.apiUrl}/${projectId}/members`, { userIds });
  }

  removeProjectMember(projectId: string, userId: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.apiUrl}/${projectId}/members/${userId}`);
  }

  freezeProject(projectId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/${projectId}/freeze`, {});
  }

  finalCloseout(projectId: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/${projectId}/final-closeout`, {});
  }
}


