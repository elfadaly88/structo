import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/auth.models';
import { environment } from '../../../environments/environment';

export interface UserDto {
  id: string;
  isActive: boolean;
  firstName: string;
  lastName: string;
  email: string;
  personalPhone: string | null;
  whatsAppPhone: string | null;
  role: 'SuperAdmin' | 'TenantOwner' | 'Manager' | 'Accountant' | 'SiteEngineer' | 'DesignEngineer';
  createdAt: string;
}

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  personalPhone?: string | null;
  whatsAppPhone?: string | null;
  role: 'Manager' | 'Accountant' | 'SiteEngineer' | 'DesignEngineer';
}

@Injectable({
  providedIn: 'root'
})
export class TenantUserService {
  
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  getUsers(): Observable<ApiResponse<UserDto[]>> {
    return this.http.get<ApiResponse<UserDto[]>>(this.apiUrl);
  }

  createUser(dto: UserCreateDto): Observable<ApiResponse<UserDto>> {
    return this.http.post<ApiResponse<UserDto>>(this.apiUrl, dto);
  }

  toggleUserStatus(userId: string): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/${userId}/toggle-status`, {});
  }
}
