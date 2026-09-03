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
  /** Optional caption entered by the uploader (max 200 chars) */
  caption?: string | null;
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
  private readonly apiUrl = `${environment.apiUrl}/ImageUpload`;

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

  /**
   * Upload a project gallery image with an optional caption.
   * Creates a SitePhoto record in the database.
   */
  uploadProjectGallery(projectId: string, file: File, caption?: string, category?: string): Observable<ApiResponse<UploadResult>> {
    const formData = new FormData();
    formData.append('file', file);
    if (caption && caption.trim().length > 0) {
      formData.append('caption', caption.trim().substring(0, 200));
    }
    if (category && category.trim().length > 0) {
      formData.append('category', category.trim());
    }
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/project-gallery/${projectId}`, formData);
  }

  /**
   * Upload a financial receipt image for a project.
   * This uses the dedicated receipts/ path and does NOT create a SitePhoto record.
   * Use this for PettyCash, FinancialTransaction, and Settlement receipt attachments.
   */
  uploadReceipt(projectId: string, file: File): Observable<ApiResponse<UploadResult>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/project-receipt/${projectId}`, formData);
  }

  getProjectPhotos(projectId: string, pageNumber: number = 1, pageSize: number = 24): Observable<ApiResponse<PaginatedList<SitePhotoDto>>> {
    return this.http.get<ApiResponse<PaginatedList<SitePhotoDto>>>(
      `${environment.apiUrl}/projects/${projectId}/SitePhotos/mobile?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  uploadProjectDocument(projectId: string, file: File): Observable<ApiResponse<UploadResult>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/project-document/${projectId}`, formData);
  }

  deleteProjectPhoto(projectId: string, photoId: string): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${environment.apiUrl}/projects/${projectId}/SitePhotos/${photoId}`);
  }
}
