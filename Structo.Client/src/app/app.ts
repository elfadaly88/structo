import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { ConfirmModalComponent } from './core/components/confirm-modal.component';
import { ToastContainerComponent } from './core/components/toast-container.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConfirmModalComponent, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('أُسُس / Ousos');
  private readonly langService = inject(LanguageService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.langService.initLanguage();

    if (typeof window !== 'undefined' && !this.authService.isAuthenticated()) {
      this.initGoogleOneTap();
    }
  }

  private initGoogleOneTap(): void {
    const interval = setInterval(() => {
      const google = (window as any).google;
      if (google) {
        clearInterval(interval);
        
        google.accounts.id.initialize({
          client_id: '676583115594-3rceitq71osie9agcpo4s66k5t8vp367.apps.googleusercontent.com',
          callback: (response: any) => this.handleGoogleCredential(response.credential)
        });

        google.accounts.id.prompt();
      }
    }, 200);

    setTimeout(() => clearInterval(interval), 5000);
  }

  private handleGoogleCredential(credential: string): void {
    this.authService.googleLogin(credential, 'Free').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.redirectUser(response.data.role);
        }
      },
      error: (err) => {
        console.warn('Google One Tap auto-login failed:', err.error?.message || err.message);
      }
    });
  }

  private redirectUser(role: string): void {
    if (role === 'SuperAdmin') {
      this.router.navigateByUrl('/dashboard/overview');
    } else if (role === 'TenantOwner' || role === 'Accountant') {
      this.router.navigateByUrl('/dashboard/financials');
    } else {
      this.router.navigateByUrl('/dashboard/projects');
    }
  }
}
