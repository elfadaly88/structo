import { Component, OnInit, inject, DestroyRef, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TenantUserService, UserDto, UserCreateDto } from '../../../core/services/tenant-user.service';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectDto } from '../../../core/models/project.models';
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
  private readonly userService = inject(TenantUserService);
  private readonly projectService = inject(ProjectService);
  private readonly authService = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly translate = inject(TranslateService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly users = signal<SanitizedUser[]>([]);
  readonly isLoading = signal(false);
  readonly togglingUserId = signal<string | null>(null);

  // Add User Modal State
  readonly isUserModalOpen = signal(false);
  readonly isSavingUser = signal(false);
  readonly userValidationErrors = signal<string[]>([]);
  readonly availableProjects = signal<ProjectDto[]>([]);
  readonly selectedProjectIds = signal<string[]>([]);
  readonly isLoadingProjects = signal(false);

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

  readonly activeUsersCount = computed(() => this.users().filter(u => u.isActive).length);

  readonly engineersCount = computed(() =>
    this.users().filter(u => {
      const r = (u.role || '').toUpperCase();
      return r.includes('ENGINEER') || r.includes('MANAGER');
    }).length
  );

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response: any) => {
        const rawData = Array.isArray(response) ? response : (response?.data || []);
        const currentId = this.currentUserId;

        // Guarantee array immutability and sanitize every user record
        const mappedUsers: SanitizedUser[] = (rawData || []).map((u: any) => {
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

        this.users.set(mappedUsers);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoading.set(false);
        this.toast.show('خطأ / Error', 'فشل تحميل بيانات المستخدمين.', 'error');
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

    this.togglingUserId.set(user.id);
    this.userService.toggleUserStatus(user.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.togglingUserId.set(null);
        if (res.success) {
          this.users.update(list =>
            list.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u)
          );
          const nextState = !user.isActive;
          this.toast.show(
            'نجاح / Success',
            nextState ? 'تم تفعيل الحساب بنجاح.' : 'تم إيقاف الحساب بنجاح.',
            'success'
          );
        } else {
          this.toast.show('خطأ / Error', res.message || 'فشل تحديث حالة المستخدم.', 'error');
        }
      },
      error: (err) => {
        this.togglingUserId.set(null);
        this.toast.show('خطأ / Error', err.error?.message || err.message || 'فشل تحديث حالة المستخدم.', 'error');
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
    this.userValidationErrors.set([]);
    this.selectedProjectIds.set([]);
    this.isUserModalOpen.set(true);

    this.isLoadingProjects.set(true);
    this.projectService.getProjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.isLoadingProjects.set(false);
        const list = Array.isArray(res) ? res : (res?.data || []);
        // Only active projects can be assigned
        this.availableProjects.set(list.filter((p: ProjectDto) => p.status === 'Active' || p.isActive));
      },
      error: () => {
        this.isLoadingProjects.set(false);
        this.availableProjects.set([]);
      }
    });
  }

  closeUserModal(): void {
    this.isUserModalOpen.set(false);
  }

  toggleProjectSelection(projectId: string): void {
    this.selectedProjectIds.update(current =>
      current.includes(projectId)
        ? current.filter(id => id !== projectId)
        : [...current, projectId]
    );
  }

  isProjectSelected(projectId: string): boolean {
    return this.selectedProjectIds().includes(projectId);
  }

  selectAllProjects(): void {
    const allIds = this.availableProjects().map(p => p.id);
    this.selectedProjectIds.set(allIds);
  }

  deselectAllProjects(): void {
    this.selectedProjectIds.set([]);
  }

  onUserSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSavingUser.set(true);
    this.userValidationErrors.set([]);

    const formVal = this.userForm.value;
    const dto: UserCreateDto = {
      ...formVal,
      assignedProjectIds: this.selectedProjectIds()
    };

    this.userService.createUser(dto).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.isSavingUser.set(false);
        if (response.success) {
          this.toast.show('نجاح / Success', 'تمت إضافة المستخدم وتعيين مشاريعه بنجاح.', 'success');
          this.closeUserModal();
          this.loadUsers();
        } else {
          this.userValidationErrors.set(response.errors || [response.message || 'فشلت إضافة المستخدم.']);
        }
      },
      error: (err) => {
        this.isSavingUser.set(false);
        const errors = err.error?.errors || [err.error?.message || err.message || 'حدث خطأ أثناء إضافة المستخدم.'];
        this.userValidationErrors.set(Array.isArray(errors) ? errors : [errors]);
      }
    });
  }
}

