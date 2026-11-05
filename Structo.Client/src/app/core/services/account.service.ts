import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/auth.models';

export interface MyAccount {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  personalPhone: string | null;
  whatsAppPhone: string | null;
  role: string;
  tenantName: string | null;
  createdAt: string;
  assignedProjectsCount: number;
}

export interface UpdateMyAccount {
  firstName: string;
  lastName: string;
  personalPhone: string | null;
  whatsAppPhone: string | null;
}

/** The signed-in user's own account (any role). */
@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/account`;

  /** Last loaded account, shared by the layout (company name) and the account page. */
  readonly me = signal<MyAccount | null>(null);

  load(): Observable<ApiResponse<MyAccount>> {
    return this.http.get<ApiResponse<MyAccount>>(this.apiUrl).pipe(
      tap((res) => { if (res.success && res.data) this.me.set(res.data); })
    );
  }

  update(dto: UpdateMyAccount): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(this.apiUrl, dto);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.apiUrl}/change-password`, { currentPassword, newPassword });
  }

  /** TenantOwner only: set a new password for an employee of the same company. */
  setEmployeePassword(userId: string, newPassword: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${environment.apiUrl}/users/${userId}/set-password`, { newPassword });
  }

  clear(): void {
    this.me.set(null);
  }
}
