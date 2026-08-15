import { Component, OnInit, ChangeDetectorRef, NgZone, inject, DestroyRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TenantUserService, UserDto, UserCreateDto } from '../../../core/services/tenant-user.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

export interface SanitizedUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber: string;
  role: string;
  roleLabel: string;
  isActive: boolean;
  isCurrentAccount: boolean;
  createdAt: string | null;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  templateUrl: './users.component.html',
  styles: [`
    .font-cairo {
      font-family: 'Cairo', 'Inter', sans-serif;
    }
  `]
})
export class UsersComponent implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);
  private readonly userService = inject(TenantUserService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  users: SanitizedUser[] = [];
  isLoading = false;
  togglingUserId: string | null = null;

  // Add User Modal State
  isUserModalOpen = false;
  isSavingUser = false;
  userValidationErrors: string[] = [];

  readonly userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    personalPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    whatsAppPhone: ['', [Validators.pattern(/^01\d{9}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['SiteEngineer', Validators.required]
  });

  get currentUserId(): string {
    return this.authService.currentUser()?.userId || '';
  }

  get activeUsersCount(): number {
    return this.users.filter(u => u.isActive).length;
  }

  get engineersCount(): number {
    return this.users.filter(u => {
      const r = (u.role || '').toUpperCase();
      return r.includes('ENGINEER') || r.includes('MANAGER');
    }).length;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response: any) => {
        this.ngZone.run(() => {
          const rawData = Array.isArray(response) ? response : (response?.data || []);
          const currentId = this.currentUserId;

          // Guarantee array immutability and sanitize every user record
          this.users = (rawData || []).map((u: any) => {
            const userId = u.id || u.userId || '';
            const fName = (u.firstName || '').trim();
            const lName = (u.lastName || '').trim();
            const fullName = (fName || lName) ? `${fName} ${lName}`.trim() : '';
            const displayName = fullName || u.userName || (u.email ? u.email.split('@')[0] : 'مستخدم');
            const phone = u.phoneNumber || u.personalPhone || u.phone || '-';
            const whatsapp = u.whatsappNumber || u.whatsAppPhone || u.whatsapp || phone;
            const role = u.role || 'Member';

            return {
              id: userId,
              firstName: fName,
              lastName: lName,
              displayName: displayName,
              email: u.email || '-',
              phoneNumber: phone,
              whatsappNumber: whatsapp,
              role: role,
              roleLabel: this.getSafeRoleLabel(role),
              isActive: u.isActive ?? true,
              isCurrentAccount: u.isCurrentAccount ?? (userId !== '' && userId === currentId),
              createdAt: u.createdAt || null
            };
          });

          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          console.error('Error fetching users:', err);
          this.isLoading = false;
          this.toast.show('خطأ / Error', 'فشل تحميل بيانات المستخدمين.', 'error');
          this.cdr.detectChanges();
        });
      }
    });
  }

  getSafeRoleLabel(role: string): string {
    const r = (role || '').toUpperCase();
    if (r.includes('TENANTOWNER') || r.includes('OWNER')) return 'مالك المنشأة';
    if (r.includes('ACCOUNTANT')) return 'محاسب';
    if (r.includes('SITEENGINEER') || r.includes('SITE_ENGINEER')) return 'مهندس موقع';
    if (r.includes('DESIGNENGINEER') || r.includes('DESIGN_ENGINEER')) return 'مهندس تصميم';
    if (r.includes('ENGINEER')) return 'مهندس موقع';
    if (r.includes('MANAGER')) return 'مدير مشاريع';
    if (r.includes('CLIENT')) return 'عميل';
    return 'عضو';
  }

  trackByUserId(index: number, user: SanitizedUser): string {
    return user.id || index.toString();
  }

  toggleStatus(user: SanitizedUser): void {
    if (!user.id || user.isCurrentAccount) {
      return;
    }

    this.togglingUserId = user.id;
    this.userService.toggleUserStatus(user.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          this.togglingUserId = null;
          if (res.success) {
            user.isActive = !user.isActive;
            this.toast.show(
              'نجاح / Success',
              user.isActive ? 'تم تفعيل الحساب بنجاح.' : 'تم إيقاف الحساب بنجاح.',
              'success'
            );
          } else {
            this.toast.show('خطأ / Error', res.message || 'فشل تحديث حالة المستخدم.', 'error');
          }
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.togglingUserId = null;
          this.toast.show('خطأ / Error', err.error?.message || err.message || 'فشل تحديث حالة المستخدم.', 'error');
          this.cdr.detectChanges();
        });
      }
    });
  }

  openUserModal(): void {
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      personalPhone: '',
      whatsAppPhone: '',
      password: '',
      role: 'SiteEngineer'
    });
    this.userValidationErrors = [];
    this.isUserModalOpen = true;
  }

  closeUserModal(): void {
    this.isUserModalOpen = false;
  }

  onUserSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSavingUser = true;
    this.userValidationErrors = [];

    const dto: UserCreateDto = this.userForm.value;

    this.userService.createUser(dto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.isSavingUser = false;
          if (response.success) {
            this.toast.show('نجاح / Success', 'تمت إضافة المستخدم بنجاح.', 'success');
            this.closeUserModal();
            this.loadUsers();
          } else {
            this.userValidationErrors = response.errors || [response.message || 'فشلت إضافة المستخدم.'];
          }
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.isSavingUser = false;
          const errors = err.error?.errors || [err.error?.message || err.message || 'حدث خطأ أثناء إضافة المستخدم.'];
          this.userValidationErrors = Array.isArray(errors) ? errors : [errors];
          this.cdr.detectChanges();
        });
      }
    });
  }
}
