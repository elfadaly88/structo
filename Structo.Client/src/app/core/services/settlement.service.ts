import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { SettlementCreateDto, SettlementMobileDto } from '../models/financial.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  getSettlements(projectId: string): Observable<ApiResponse<SettlementMobileDto[]>> {
    return this.http.get<ApiResponse<SettlementMobileDto[]>>(
      `${this.baseUrl}/${projectId}/settlements`
    );
  }

  createSettlement(projectId: string, dto: SettlementCreateDto): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.baseUrl}/${projectId}/settlements`,
      dto
    );
  }

  approveSettlement(projectId: string, id: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/settlements/${id}/approve`,
      {}
    );
  }

  confirmRefund(projectId: string, id: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/settlements/${id}/confirm-refund`,
      {}
    );
  }

  rejectSettlement(projectId: string, id: string, comments: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/settlements/${id}/reject`,
      { comments }
    );
  }
}
