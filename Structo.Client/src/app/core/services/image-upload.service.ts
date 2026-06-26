import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';

export interface UploadResult {
  url: string;
}

export interface SitePhotoDto {
  id: string;
  photoUrl: string;
  description: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface PaginatedList<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private readonly http = inject(HttpClient);
//private readonly apiUrl = (environment as any).apiUrl + '/ImageUpload';
 private get apiUrl(): string {
    return (environment as any).apiUrl + '/ImageUpload';
  }

  //private readonly apiUrl = 'http://localhost:5000/api/ImageUpload';

  uploadTenantLogo(file: File): Observable<ApiResponse<UploadResult>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/tenant-logo`, formData);
  }

  uploadTenantBanner(file: File): Observable<ApiResponse<UploadResult>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/tenant-banner`, formData);
  }

  uploadProjectGallery(projectId: string, file: File): Observable<ApiResponse<UploadResult>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/project-gallery/${projectId}`, formData);
  }

  getProjectPhotos(projectId: string, pageNumber: number = 1, pageSize: number = 24): Observable<ApiResponse<PaginatedList<SitePhotoDto>>> {
    return this.http.get<ApiResponse<PaginatedList<SitePhotoDto>>>(
      `${this.apiUrl.replace('/ImageUpload', '')}/projects/${projectId}/SitePhotos/mobile?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
}
