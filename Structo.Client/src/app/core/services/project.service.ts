import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { ProjectDto, ProjectCreateDto } from '../models/project.models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/projects';

  getProjects(): Observable<ApiResponse<ProjectDto[]>> {
    return this.http.get<ApiResponse<ProjectDto[]>>(this.apiUrl);
  }

  getProjectById(id: string): Observable<ApiResponse<ProjectDto>> {
    return this.http.get<ApiResponse<ProjectDto>>(`${this.apiUrl}/${id}`);
  }

  createProject(dto: ProjectCreateDto): Observable<ApiResponse<ProjectDto>> {
    return this.http.post<ApiResponse<ProjectDto>>(this.apiUrl, dto);
  }
}
