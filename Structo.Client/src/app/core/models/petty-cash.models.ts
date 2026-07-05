export interface PettyCashMobileDto {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  reason: string;
  issuedAt: string;
  isSettled: boolean;
  issuedTo: string;
  status: string;
  category: string;
  comments: string;
  receiptPhotoUrl: string;
  settlementPaymentMethod: string;
  expenseDate?: string;
  isReimbursement?: boolean;
}

export interface PaginatedList<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface PettyCashCreateDto {
  issuedToUserId: string;
  amount: number;
  reason: string;
  category: string;
  sourcePoolId?: string;
}

export interface PettyCashSettleDto {
  spentAmount: number;
  receiptDescription: string;
  receiptPhotoUrl: string;
  settlementPaymentMethod: string;
  expenseDate: Date;
}

export interface PettyCashApproveDto {
  sourcePoolId: string;
}
