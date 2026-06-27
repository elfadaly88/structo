import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { PettyCashMobileDto, PaginatedList, PettyCashCreateDto, PettyCashSettleDto } from '../models/petty-cash.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  getProjectPettyCash(
    projectId: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<PaginatedList<PettyCashMobileDto>>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<PaginatedList<PettyCashMobileDto>>>(
      `${this.baseUrl}/${projectId}/pettycash/mobile`,
      { params }
    );
  }

  requestPettyCash(projectId: string, dto: PettyCashCreateDto): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/pettycash`,
      dto
    );
  }

  approvePettyCash(projectId: string, id: string, dto: { sourcePoolId: string }): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/pettycash/${id}/approve`,
      dto
    );
  }

  rejectPettyCash(projectId: string, id: string, comments: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/pettycash/${id}/reject`,
      { comments }
    );
  }

  settlePettyCash(
    projectId: string,
    id: string,
    dto: PettyCashSettleDto
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/pettycash/${id}/settle`,
      dto
    );
  }

  /** Update a Pending petty cash record. Only TenantOwner / Accountant will be authorized. */
  updatePettyCash(
    projectId: string,
    id: string,
    dto: { amount: number; reason: string; category: string }
  ): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/pettycash/${id}`,
      dto
    );
  }

  /**
   * Delete a petty cash record.
   * The API automatically refunds the pool balance if the voucher was in "Issued" status.
   * Only TenantOwner / Accountant will be authorized.
   */
  deletePettyCash(
    projectId: string,
    id: string
  ): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/pettycash/${id}`
    );
  }
}
