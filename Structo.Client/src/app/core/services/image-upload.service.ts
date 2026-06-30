import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
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
  private readonly apiUrl = `${environment.apiUrl}/ImageUpload`;

  // Centrally handles the S3/R2 direct upload if a presigned URL structure is returned
  private handlePresignedUpload(res: ApiResponse<UploadResult>, file: File): Observable<ApiResponse<UploadResult>> {
    if (res.success && res.data && res.data.url && res.data.url.startsWith('PRESIGNED_SPLIT')) {
      const parts = res.data.url.split('|');
      if (parts.length === 3) {
        const presignedPutUrl = parts[1];
        const publicGetUrl = parts[2];
        
        return new Observable<ApiResponse<UploadResult>>(observer => {
          this.uploadToPresignedUrl(presignedPutUrl, file, file.type).subscribe({
            next: () => {
              observer.next({
                success: true,
                message: res.message,
                data: { url: publicGetUrl }
              });
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            }
          });
        });
      }
    }
    return of(res);
  }

  uploadTenantLogo(file: File): Observable<ApiResponse<UploadResult>> {
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/tenant-logo`, {
      fileName: file.name,
      contentType: file.type
    }).pipe(
      switchMap(res => this.handlePresignedUpload(res, file))
    );
  }

  uploadTenantBanner(file: File): Observable<ApiResponse<UploadResult>> {
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/tenant-banner`, {
      fileName: file.name,
      contentType: file.type
    }).pipe(
      switchMap(res => this.handlePresignedUpload(res, file))
    );
  }

  uploadProjectGallery(projectId: string, file: File): Observable<ApiResponse<UploadResult>> {
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/project-gallery/${projectId}`, {
      fileName: file.name,
      contentType: file.type
    }).pipe(
      switchMap(res => this.handlePresignedUpload(res, file))
    );
  }

  getProjectPhotos(projectId: string, pageNumber: number = 1, pageSize: number = 24): Observable<ApiResponse<PaginatedList<SitePhotoDto>>> {
    return this.http.get<ApiResponse<PaginatedList<SitePhotoDto>>>(
      `${environment.apiUrl}/projects/${projectId}/SitePhotos/mobile?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  uploadProjectDocument(projectId: string, file: File): Observable<ApiResponse<UploadResult>> {
    return this.http.post<ApiResponse<UploadResult>>(`${this.apiUrl}/project-document/${projectId}`, {
      fileName: file.name,
      contentType: file.type
    }).pipe(
      switchMap(res => this.handlePresignedUpload(res, file))
    );
  }

  uploadToPresignedUrl(url: string, file: File, contentType: string): Observable<any> {
    return this.http.put(url, file, {
      headers: {
        'Content-Type': contentType
      }
    });
  }
}
