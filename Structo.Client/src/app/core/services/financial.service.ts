import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { FinancialTransactionMobileDto, FinancialTransactionCreateDto } from '../models/financial.models';
import { PaginatedList } from '../models/petty-cash.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  getProjectTransactions(
    projectId: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<PaginatedList<FinancialTransactionMobileDto>>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<PaginatedList<FinancialTransactionMobileDto>>>(
      `${this.baseUrl}/${projectId}/financialtransactions/mobile`,
      { params }
    );
  }

  createTransaction(
    projectId: string,
    dto: FinancialTransactionCreateDto
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/financialtransactions`,
      dto
    );
  }

  /** Update a financial transaction. Only TenantOwner / Accountant will be authorized. */
  updateTransaction(
    projectId: string,
    id: string,
    dto: Partial<FinancialTransactionCreateDto>
  ): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/financialtransactions/${id}`,
      dto
    );
  }

  /**
   * Delete a financial transaction.
   * The API will automatically roll back the cash pool if this was a Capital Injection.
   * Only TenantOwner / Accountant will be authorized.
   */
  deleteTransaction(
    projectId: string,
    id: string
  ): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/financialtransactions/${id}`
    );
  }

  getCashPools(projectId: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.baseUrl}/${projectId}/financialtransactions/cash-pools`
    );
  }

  injectCapital(projectId: string, dto: any): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      `${this.baseUrl}/${projectId}/financialtransactions/inject-capital`,
      dto
    );
  }
}
