export interface TenantLifecycleSummary {
  totalTenants: number;
  activeCount: number;
  suspendedCount: number;
  pendingDeletionCount: number;
  freeTenantsCount: number;
  proTenantsCount: number;
  inactiveOver45DaysCount: number;
  totalProjectsCount: number;
  totalStorageFootprintMb: number;
  estimatedPurgedStorageMb: number;
}

export interface AdminTenantItem {
  id: string;
  name: string;
  planType: string;
  maxActiveProjects: number;
  status: string;
  createdAt: string;
  lastActiveAt?: string | null;
  daysInactive: number;
  storageFootprintMb: number;
  isCleanupExempt: boolean;
  totalProjects: number;
  totalUsers: number;
  adminEmail?: string | null;
  adminName?: string | null;
  region?: string | null;
  logoUrl?: string | null;
}

export interface AdminTenantQueryParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  statusFilter?: string;
  planFilter?: string;
  onlyInactiveOver45Days?: boolean;
}

export interface AdminTenantPagedResult {
  items: AdminTenantItem[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ForcePurgeResult {
  tenantId: string;
  tenantName: string;
  deletedFilesCount: number;
  deletedProjectsCount: number;
  deletedTransactionsCount: number;
  deletedUsersCount: number;
  success: boolean;
  message: string;
  purgedAt: string;
}

export interface ExemptionToggleResponse {
  tenantId: string;
  tenantName: string;
  isCleanupExempt: boolean;
  message: string;
}
