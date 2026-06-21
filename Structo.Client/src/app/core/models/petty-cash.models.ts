export interface PettyCashMobileDto {
  id: string;
  amount: number;
  reason: string;
  issuedAt: string;
  isSettled: boolean;
  issuedTo: string;
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
}

export interface PettyCashSettleDto {
  spentAmount: number;
  receiptDescription: string;
}
