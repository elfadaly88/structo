import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiResponse, LoginRequest, AuthResponse, UserSession } from '../models/auth.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
private readonly apiUrl = (environment as any).apiUrl + '/auth';
  private readonly tokenKey = 'structo_auth_token';
  private readonly userKey = 'structo_user_info';

  // Core signals for state management
  readonly currentUser = signal<UserSession | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {
    this.loadStoredSession();
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, request).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setSession(response.data);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getEmailFromToken(token: string): string {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      // .NET claims mappings (XML schemas) or standard name claims
      return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
             decoded['email'] || 
             'User';
    } catch (e) {
      return 'User';
    }
  }

  private getNameFromToken(token: string): string {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded['name'] || 
             decoded['unique_name'] || 
             decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] || 
             'User';
    } catch (e) {
      return 'User';
    }
  }

  private setSession(authData: AuthResponse): void {
    const { token, ...userData } = authData;
    const email = this.getEmailFromToken(token);
    const name = userData.name || this.getNameFromToken(token);
    const session: UserSession = { ...userData, email, name };
    
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(session));
    this.currentUser.set(session);
  }

  private loadStoredSession(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userJson = localStorage.getItem(this.userKey);

    if (token && userJson) {
      try {
        const session = JSON.parse(userJson) as UserSession;
        if (!session.name && token) {
          session.name = this.getNameFromToken(token);
        }
        this.currentUser.set(session);
      } catch (e) {
        this.logout();
      }
    }
  }
}
