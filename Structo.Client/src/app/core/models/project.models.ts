export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  managerId: string | null;
  status: string;
  publicReviewToken?: string | null;
}

export interface ProjectCreateDto {
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  managerId: string | null;
  tenantId?: string | null;
}

export interface ProjectClientViewDto {
  projectId: string;
  projectName: string;
  publicDescription: string;
  progressPercentage: number;
  recentPhotoUrls: string[];
}

export interface ProjectCashPoolDto {
  id: string;
  sourceType: string;
  totalInjected: number;
  availableBalance: number;
}

// --- Closeout / Reconciliation ---

export interface EmployeeBalanceDto {
  userId: string;
  fullName: string;
  totalIssued: number;
  totalSettled: number;
  balance: number;
  isClean: boolean;
  unsettledCount: number;
}

export interface ProjectReconciliationReportDto {
  projectId: string;
  projectName: string;
  status: string;
  totalBudget: number;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalCustodyIssued: number;
  totalCustodySettled: number;
  totalCustodyPending: number;
  unsettledCustodyCount: number;
  employeeBalances: EmployeeBalanceDto[];
  isFullyReconciled: boolean;
  generatedAt: string;
}

export interface ClientReviewSubmitDto {
  notes?: string;
  rating?: number;
}

