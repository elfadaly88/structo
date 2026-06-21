import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { TenantDto } from './public-directory.service';

export interface TenantProfileUpdateDto {
  name: string;
  logoUrl: string;
  bannerUrl: string;
  region: string;
  companyDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenantProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/tenant-profile';

  getProfile(): Observable<ApiResponse<TenantDto>> {
    return this.http.get<ApiResponse<TenantDto>>(this.apiUrl);
  }

  updateProfile(dto: TenantProfileUpdateDto): Observable<ApiResponse<TenantDto>> {
    return this.http.put<ApiResponse<TenantDto>>(`${this.apiUrl}/update`, dto);
  }
}
