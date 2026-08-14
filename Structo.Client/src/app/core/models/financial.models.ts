export interface FinancialTransactionMobileDto {
  id: string;
  amount?: number;
  value?: number;
  type?: string | number;
  transactionType?: string | number;
  description?: string;
  notes?: string;
  transactionDate?: string;
  paymentDate?: string;
  createdAt?: string;
  date?: string;
  method?: string;
  paymentMethod?: string;
  receiptPhotoUrl?: string;
  receiptUrl?: string;
  invoiceUrl?: string;
  isLocked?: boolean;
  isClosed?: boolean;
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
  invoiceNumber?: string;
  expenseResponsibility?: string;
  receiptPhotoUrl?: string;
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
  engineerName?: string;
  submittedBy?: string;
  notes?: string;
  description?: string;
  spentAmount?: number;
  difference?: number;
  settlementDate?: string;
  date?: string;
  createdAt?: string;
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
