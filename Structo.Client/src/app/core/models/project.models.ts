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
  governorate?: string;
  cityOrZone?: string;
  siteAddress?: string;
  clientName?: string;
  clientWhatsApp?: string;
  propertyType?: string;
  clientReviewNotes?: string | null;
  clientRating?: number | null;
  isReviewHidden?: boolean;
}

export interface ProjectMemberDto {
  projectId: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  phoneNumber?: string;
  assignedAt: string;
  assignedByUserId?: string;
}

export interface ProjectCreateDto {
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  managerId: string | null;
  tenantId?: string | null;
  governorate: string;
  cityOrZone: string;
  siteAddress: string;
  clientName: string;
  clientWhatsApp: string;
  propertyType: string;
  assignedUserIds?: string[];
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

export type CloseoutDisposition = 'RefundToClient' | 'TransferToCompanyProfits';

export interface FinalCloseoutRequestDto {
  disposition?: CloseoutDisposition;
}

// --- Closeout / Reconciliation ---

export interface EmployeeBalanceDto {
  userId: string;
  fullName: string;
  totalIssued: number;
  totalSettled: number;
  totalReturnAmount: number;
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
  totalCustodyReturned: number;
  unsettledCustodyCount: number;
  remainingPoolBalance?: number;
  employeeBalances: EmployeeBalanceDto[];
  isFullyReconciled: boolean;
  generatedAt: string;
}

export interface ClientReviewSubmitDto {
  notes?: string;
  rating?: number;
}

