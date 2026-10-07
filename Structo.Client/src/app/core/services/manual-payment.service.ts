import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';

export type ManualPaymentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Expired';
export type ProjectPackageType = 'PLUS_1' | 'PLUS_5';

export interface ManualPaymentRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  packageType: ProjectPackageType;
  projectsQuantity: number;
  amountEgp: number;
  referenceCode: string;
  status: ManualPaymentStatus;
  hasScreenshot: boolean;
  /** Short-lived signed link (owner of the request or SuperAdmin only). */
  screenshotUrl?: string | null;
  createdAt: string;
  expiresAt: string;
  reviewedAt?: string | null;
  rejectReason?: string | null;
  adminNote?: string | null;
  instaPayNumber?: string | null;
  whatsAppNumber?: string | null;
}

/** Manual InstaPay payments: tenant owner requests and SuperAdmin review. */
@Injectable({ providedIn: 'root' })
export class ManualPaymentService {
  private readonly http = inject(HttpClient);
  private readonly ownerUrl = `${environment.apiUrl}/subscription/instapay/requests`;
  private readonly adminUrl = `${environment.apiUrl}/superadmin/payment-requests`;

  /** Only the package type is sent; the server sets quantity and price. */
  create(packageType: ProjectPackageType): Observable<ApiResponse<ManualPaymentRequest>> {
    return this.http.post<ApiResponse<ManualPaymentRequest>>(this.ownerUrl, { packageType });
  }

  mine(): Observable<ApiResponse<ManualPaymentRequest[]>> {
    return this.http.get<ApiResponse<ManualPaymentRequest[]>>(this.ownerUrl);
  }

  uploadReceipt(requestId: string, file: File): Observable<ApiResponse<ManualPaymentRequest>> {
    const form = new FormData();
    form.append('file', file);
    return this.http.post<ApiResponse<ManualPaymentRequest>>(`${this.ownerUrl}/${requestId}/screenshot`, form);
  }

  adminList(): Observable<ApiResponse<ManualPaymentRequest[]>> {
    return this.http.get<ApiResponse<ManualPaymentRequest[]>>(this.adminUrl);
  }

  approve(requestId: string): Observable<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(`${this.adminUrl}/${requestId}/approve`, {});
  }

  reject(requestId: string, reason: string, adminNote?: string): Observable<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(`${this.adminUrl}/${requestId}/reject`, { reason, adminNote });
  }
}
