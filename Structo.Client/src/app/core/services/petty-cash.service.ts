import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { PettyCashMobileDto, PaginatedList, PettyCashCreateDto, PettyCashSettleDto } from '../models/petty-cash.models';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5000/api/projects';

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
}
