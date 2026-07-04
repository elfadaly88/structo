export interface FinancialTransactionMobileDto {
  id: string;
  amount: number;
  type: string; // 'Income' or 'Expense'
  description: string;
  transactionDate: string;
  paymentDate?: string;
  paymentMethod?: string;
  receiptPhotoUrl?: string;
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
}

export interface SettlementCreateDto {
  pettyCashId: string;
  lines: SettlementLineDto[];
}

export interface SettlementLineMobileDto {
  id: string;
  category: string;
  amount: number;
  description: string;
  invoiceUrl: string;
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
  userId: string;
  amount: number;
  description: string;
  sourcePoolId: string;
  paymentMethod: 'Cash' | 'BankTransfer' | 'InstaPay' | 'Cheque';
}
