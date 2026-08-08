import { Injectable, inject, signal, computed, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { ApiResponse, LoginRequest, AuthResponse, UserSession } from '../models/auth.models';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  
  private readonly tokenKey = 'access_token';
  private readonly refreshKey = 'refresh_token';
  private readonly userKey = 'user_profile';

  isRefreshingToken = false;
  refreshTokenSubject = new BehaviorSubject<string | null>(null);

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

  googleLogin(idToken: string, subscriptionPlan?: string): Observable<ApiResponse<AuthResponse>> {
    const googleApiUrl = `${environment.apiUrl}/google-auth/google-login`;
    return this.http.post<ApiResponse<AuthResponse>>(googleApiUrl, { idToken, subscriptionPlan }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setSession(response.data);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = localStorage.getItem(this.refreshKey);
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setSession(response.data);
        } else {
          this.logout();
        }
      })
    );
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
    const refreshToken = localStorage.getItem(this.refreshKey);
    const userStr = localStorage.getItem(this.userKey);

    if (userStr && (token || refreshToken)) {
      try {
        const user = JSON.parse(userStr) as UserSession;
        const isExpired = token ? this.isTokenExpired(token) : true;

        if (!isExpired) {
          this.currentUser.set(user);
          this.initializeNotifications(user);
          return;
        } else if (refreshToken) {
          // Token is expired but refresh token exists. Set user session so route guards allow access,
          // then attempt silent refresh in background.
          this.currentUser.set(user);
          this.initializeNotifications(user);

          this.refreshToken().subscribe({
            error: () => {
              this.logout();
              try {
                const router = this.injector.get(Router);
                router.navigate(['/login']);
              } catch (e) {
                // Ignore router error during bootstrap
              }
            }
          });
          return;
        }
      } catch (e) {
        // JSON parse failed
      }
    }
    this.logout();
  }

  private initializeNotifications(user: UserSession) {
    setTimeout(() => {
      try {
        const notificationService = this.injector.get(NotificationService);
        notificationService.initializeOneSignal(user.userId || (user as any).id, user.email);
      } catch (err) {
        console.warn('[AuthService] Could not initialize notifications on hydration:', err);
      }
    });
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

  setSession(authData: AuthResponse): void {
    const { token, refreshToken, ...userData } = authData;
    const email = this.getEmailFromToken(token);
    const name = userData.name || this.getNameFromToken(token);
    const session: UserSession = { ...userData, email, name };
    
    localStorage.setItem(this.tokenKey, token);
    if (refreshToken) {
      localStorage.setItem(this.refreshKey, refreshToken);
    }
    localStorage.setItem(this.userKey, JSON.stringify(session));
    this.currentUser.set(session);
  }

  updateProfileCompletionStatus(isComplete: boolean): void {
    const user = this.currentUser();
    if (user) {
      const updatedUser = { ...user, isProfileComplete: isComplete };
      this.currentUser.set(updatedUser);
      
      const userStr = localStorage.getItem(this.userKey);
      if (userStr) {
        try {
          const session = JSON.parse(userStr);
          session.isProfileComplete = isComplete;
          localStorage.setItem(this.userKey, JSON.stringify(session));
        } catch (e) {
          // ignore parsing error
        }
      }
    }
  }
}
