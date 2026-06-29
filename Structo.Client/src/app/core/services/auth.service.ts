import { Injectable, inject, signal, computed, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ApiResponse, LoginRequest, AuthResponse, UserSession } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  
  private readonly tokenKey = 'access_token';
  private readonly userKey = 'user_profile';

  // Core signals for state management
  readonly currentUser = signal<UserSession | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {
    this.hydrateAuthState();
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

  isTokenExpired(token: string): boolean {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) {
        return false;
      }
      const expiry = decoded.exp * 1000;
      return Date.now() >= expiry;
    } catch (e) {
      return true;
    }
  }

  private hydrateAuthState() {
    const token = localStorage.getItem(this.tokenKey);
    const userStr = localStorage.getItem(this.userKey);

    if (token && userStr) {
      const isExpired = this.isTokenExpired(token);
      if (!isExpired) {
        try {
          const user = JSON.parse(userStr) as UserSession;
          this.currentUser.set(user);

          // Re-initialize OneSignal and SignalR dynamically to avoid circular references
          setTimeout(() => {
            try {
              const notificationService = this.injector.get(NotificationService);
              notificationService.initializeOneSignal(user.userId || (user as any).id, user.email);
            } catch (err) {
              console.warn('[AuthService] Could not initialize notifications on hydration:', err);
            }
          });
          return;
        } catch (e) {
          // JSON parse failed
        }
      }
    }
    this.logout();
  }

  private getEmailFromToken(token: string): string {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded['unique_name'] || 
             decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
             decoded['email'] || 
             '';
    } catch (e) {
      return '';
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
}
