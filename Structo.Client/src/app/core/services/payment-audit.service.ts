import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PaymentAttemptItem {
  id: string;
  tenantId: string;
  tenantName?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  amount: number;
  planRequested: string;
  extraProjectsCount: number;
  paymobOrderId?: string;
  specialReference: string;
  createdAt: string;
  webhookReceivedAt?: string;
  webhookStatus: 'Pending' | 'Confirmed' | 'HmacFailed' | 'NeverArrived' | string;
  linkedTransactionId?: string;
  referenceNumber?: string;
  paymentMethod?: string;
  errorMessage?: string;
  isStaleUnconfirmed: boolean;
}

export interface MyPaymentsResponse {
  currentMaxProjects: number;
  currentPlan: string;
  attempts: PaymentAttemptItem[];
  totalConfirmedCount: number;
  totalNeverArrivedCount: number;
  totalSpentEgp: number;
}

export interface AdminPaymentsSummary {
  totalAttemptsCount: number;
  confirmedCount: number;
  neverArrivedCount: number;
  hmacFailedCount: number;
  pendingCount: number;
  totalRevenueEgp: number;
  neverArrivedTotalAmountEgp: number;
}

export interface TenantPaymentSummary {
  tenantId: string;
  tenantName: string;
  subscriptionPlan: string;
  maxActiveProjects: number;
  confirmedPurchasesCount: number;
  totalAmountSpentEgp: number;
  neverArrivedAttemptsCount: number;
  lastAttemptAt?: string;
  hasNeverArrivedAlert: boolean;
}

export interface AdminPaymentsResponse {
  summary: AdminPaymentsSummary;
  tenantsSummary: TenantPaymentSummary[];
  attempts: PaymentAttemptItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PaymentAuditService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}`;

  /**
   * Retrieves payment history and webhook status for current TenantOwner
   */
  getMyPayments(): Observable<ApiResponse<MyPaymentsResponse>> {
    return this.http.get<ApiResponse<MyPaymentsResponse>>(`${this.baseUrl}/subscription/my-payments`);
  }

  /**
   * Retrieves platform-wide payment audit logs and KPIs for SuperAdmin
   */
  getAdminPayments(): Observable<ApiResponse<AdminPaymentsResponse>> {
    return this.http.get<ApiResponse<AdminPaymentsResponse>>(`${this.baseUrl}/superadmin/payments`);
  }
}
