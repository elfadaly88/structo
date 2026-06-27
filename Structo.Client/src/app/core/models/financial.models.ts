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
  type: 'Income' | 'Expense';
  transactionDate: string;
}
