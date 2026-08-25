import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { TenantDto } from './public-directory.service';
import { environment } from '../../../environments/environment';

export interface TenantProfileUpdateDto {
  name?: string;
  logoUrl?: string;
  bannerUrl?: string;
  region?: string;
  companyDescription?: string;
  governorateId?: string | null;
  location?: string | null;
  personalPhone?: string | null;
  whatsAppPhone?: string | null;
  commercialRegister?: string | null;
  taxCard?: string | null;
  nationalId?: string | null;
  syndicateId?: string | null;
  manualAddress?: string | null;
  address?: string | null;
  mapLocationUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  lat?: number | null;
  lng?: number | null;
}

// ─────────────────────────────────────────────────────────
// Subscription Interfaces — designed for Paymob/Stripe swap
// ─────────────────────────────────────────────────────────

export interface SubscriptionPlanInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  maxProjects: number;
  priceEgp: number;
  priceWithVat: number;
  description: string;
  extra?: number;
  label?: string;
}

export interface SubscriptionTopUpInfo {
  extra: number;
  priceEgp: number;
  priceWithVat: number;
  label: string;
}

export interface SubscriptionPlansResponse {
  plans: SubscriptionPlanInfo[];
  topups: SubscriptionTopUpInfo[];
  vatRate: number;
}

/** Mode 1: Plan Upgrade — set targetPlanId */
export interface SubscriptionUpgradeRequest {
  targetPlanId?: string;
  extraProjectsCount?: number;
  paymentMethod?: string; // 'TestCard' for mock; 'Paymob' / 'Stripe' for real gateways
}

export interface SubscriptionUpgradeResponse {
  transactionType: string;      // 'PlanUpgrade' | 'AddOnTopUp'
  newPlan: string;
  newMaxActiveProjects: number;
  extraProjectsAdded: number;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  referenceNumber: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenantProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tenant-profile`;
  private readonly subscriptionUrl = `${environment.apiUrl}/subscription`;

  // ── Profile ──────────────────────────────────────────────
  getProfile(): Observable<ApiResponse<TenantDto>> {
    return this.http.get<ApiResponse<TenantDto>>(this.apiUrl);
  }

  updateProfile(dto: TenantProfileUpdateDto): Observable<ApiResponse<TenantDto>> {
    return this.http.put<ApiResponse<TenantDto>>(`${this.apiUrl}/update`, dto);
  }

  getQuota(): Observable<ApiResponse<{ usedProjects: number, allowedProjects: number }>> {
    return this.http.get<ApiResponse<{ usedProjects: number, allowedProjects: number }>>(`${this.apiUrl}/quota`);
  }

  // ── Subscription ─────────────────────────────────────────
  /**
   * Fetches available subscription plans and add-on top-up options with pricing.
   */
  getSubscriptionPlans(): Observable<ApiResponse<SubscriptionPlansResponse>> {
    return this.http.get<ApiResponse<SubscriptionPlansResponse>>(`${this.subscriptionUrl}/plans`);
  }
}

