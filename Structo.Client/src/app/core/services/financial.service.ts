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
  //private readonly baseUrl = 'http://localhost:5000/api/projects';
  private readonly baseUrl = (environment as any).apiUrl + '/projects';
  

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
}
