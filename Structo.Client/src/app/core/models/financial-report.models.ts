import { FinancialTransactionMobileDto, SettlementMobileDto } from './financial.models';
import { PettyCashMobileDto } from './petty-cash.models';

export interface ProjectInfoDto {
  id: string;
  name: string;
  client?: string | null;
  budget: number;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
}

export interface ReportDateRangeDto {
  startDate?: string | null;
  endDate?: string | null;
  isFullPeriod: boolean;
  filterProjectId?: string | null;
  filterProjectName?: string | null;
}

export interface ProjectReportSummaryDto {
  totalBudget: number;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalCustodyIssued: number;
  totalCustodySettled: number;
  totalCustodyPending: number;
  totalCustodyReturned: number;
  unsettledCustodyCount: number;
  remainingPoolBalance: number;
}

export interface ProjectFullReportDto {
  project: ProjectInfoDto;
  dateRange: ReportDateRangeDto;
  summary: ProjectReportSummaryDto;
  transactions: FinancialTransactionMobileDto[];
  pettyCashes: PettyCashMobileDto[];
  settlements: SettlementMobileDto[];
  generatedAt: string;
}

export interface CompanyFinancialTotalsDto {
  totalBudget: number;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalOutstandingPettyCash: number;
  totalSettlements: number;
  projectCount: number;
}

export interface ProjectFinancialBreakdownDto {
  projectId: string;
  projectName: string;
  status: string;
  budget: number;
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  outstandingPettyCash: number;
  totalSettlements: number;
}

export interface CompanyTransactionDto {
  id: string;
  projectId: string;
  projectName: string;
  amount: number;
  type: string;
  description: string;
  transactionDate: string;
  paymentDate?: string | null;
  paymentMethod?: string | null;
  receiptPhotoUrl?: string | null;
  isLocked: boolean;
}

export interface CompanyWideReportDto {
  dateRange: ReportDateRangeDto;
  aggregatedTotals: CompanyFinancialTotalsDto;
  projectBreakdowns: ProjectFinancialBreakdownDto[];
  combinedTransactions: CompanyTransactionDto[];
  generatedAt: string;
}
