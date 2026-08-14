export interface FinancialTransactionMobileDto {
  id: string;
  amount: number;
  type: string; // 'Income' or 'Expense'
  description: string;
  transactionDate?: string;
  paymentDate?: string;
  createdAt?: string;
  date?: string;
  paymentMethod?: string;
  receiptPhotoUrl?: string;
  isLocked?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface FinancialTransactionCreateDto {
  amount: number;
  description: string;
  type: 'Income' | 'Expense' | 'DirectDisbursement' | 'Reimbursement' | 'DirectProjectExpense';
  transactionDate: string;
  forceOverrun?: boolean;
}

export interface SettlementLineDto {
  category: string;
  amount: number;
  description: string;
  invoiceUrl: string;
  isBillableToClient: boolean;
}

export interface SettlementCreateDto {
  pettyCashId: string;
  lines: SettlementLineDto[];
  isDraft?: boolean;
}

export interface SettlementLineMobileDto {
  id: string;
  category: string;
  amount: number;
  description: string;
  invoiceUrl: string;
  isBillableToClient: boolean;
}

export interface SettlementMobileDto {
  id: string;
  projectId: string;
  projectName: string;
  pettyCashId: string;
  custodyAmount: number;
  custodyReason: string;
  issuedTo: string;
  totalAmount: number;
  status: 'Draft' | 'Pending' | 'Approved' | 'ApprovedPendingRefund' | 'Refunded' | 'Rejected';
  submittedAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  netDifference: number;
  comments?: string;
  lines: SettlementLineMobileDto[];
}

export interface DirectDisbursementDto {
  userId?: string;
  amount: number;
  description: string;
  sourcePoolId: string;
  paymentMethod: 'Cash' | 'BankTransfer' | 'InstaPay' | 'Cheque';
}

export interface ProjectFinancialSummaryDto {
  projectId: string;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  pendingApprovalsCount: number;
}
