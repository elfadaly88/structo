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
  protected readonly title = signal('أُسُس / Osos');
  private readonly langService = inject(LanguageService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.langService.initLanguage();
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
