import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';

export interface TenantDto {
  id: string;
  name: string;
  subscriptionPlan: string;
  maxActiveProjects: number;
  logoUrl: string;
  bannerUrl: string;
  region: string;
  companyDescription: string;
  contactPhone: string | null;
  whatsAppPhone: string | null;
  location?: string | null;
  rating: number;
  createdAt: string;
  status: string;
  latitude?: number | null;
  longitude?: number | null;
  accountType?: string | null;
  mobileNumber?: string | null;
  commercialRegister?: string | null;
  taxCard?: string | null;
  nationalId?: string | null;
  syndicateId?: string | null;
  manualAddress?: string | null;
  mapLocationUrl?: string | null;
  adminEmail?: string | null;
  adminFirstName?: string | null;
  adminLastName?: string | null;
}

export interface PublicProjectDto {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  category: string;
  sitePhotos: string[];
}

export interface PublicTenantPortfolioDto {
  id: string;
  name: string;
  logoUrl: string;
  bannerUrl: string;
  region: string;
  companyDescription: string;
  rating: number;
  projects: PublicProjectDto[];
}

@Injectable({
  providedIn: 'root'
})
export class PublicDirectoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/public`;

  getTenants(filters?: { region?: string; category?: string; minRating?: number }): Observable<ApiResponse<TenantDto[]>> {
    let params = new HttpParams();
    if (filters?.region) {
      params = params.set('region', filters.region);
    }
    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    if (filters?.minRating !== undefined) {
      params = params.set('minRating', filters.minRating.toString());
    }
    return this.http.get<ApiResponse<TenantDto[]>>(`${this.apiUrl}/tenants`, { params });
  }

  getTenantPortfolio(id: string): Observable<ApiResponse<PublicTenantPortfolioDto>> {
    return this.http.get<ApiResponse<PublicTenantPortfolioDto>>(`${this.apiUrl}/tenants/${id}/portfolio`);
  }
}
