export interface AssignedEngineerDto {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  isOwner?: boolean;
}

export interface LinkedSettlementItemDto {
  id: string;
  settlementItemId: string;
  expenseDescription?: string | null;
  allocatedAmount: number;
  originalLineAmount: number;
  category?: string | null;
  invoiceUrl?: string | null;
}

export type SiteTaskStatus = 'Pending' | 'InProgress' | 'UnderReview' | 'Completed';

export interface SiteTaskDto {
  id: string;
  projectId: string;
  projectName: string;
  assignedEngineerId: string;
  assignedEngineerName: string;
  title: string;
  description?: string | null;
  weight: number;
  progressPercentage: number;
  status: SiteTaskStatus | string;
  plannedStartDate?: string | null;
  plannedEndDate?: string | null;
  completedAt?: string | null;
  engineerNotes?: string | null;
  attachmentUrls: string[];
  totalAllocatedExpenses: number;
  linkedSettlementItems: LinkedSettlementItemDto[];
}

export interface SiteTaskCreateDto {
  projectId: string;
  assignedEngineerId: string;
  title: string;
  description?: string;
  weight: number;
  plannedStartDate?: string | null;
  plannedEndDate?: string | null;
}

export interface SiteTaskProgressUpdateDto {
  progressPercentage: number;
  status?: SiteTaskStatus;
  engineerNotes?: string;
  completedAt?: string | null;
  attachmentUrls?: string[];
}

export interface LinkSettlementItemEntryDto {
  settlementItemId: string;
  allocatedAmount: number;
  expenseDescription?: string;
}

export interface LinkSettlementItemsDto {
  items: LinkSettlementItemEntryDto[];
}

export interface ProjectSiteTasksResponseDto {
  projectId: string;
  projectName: string;
  publicShareToken?: string | null;
  weightedOverallProgress: number;
  totalWeight: number;
  tasks: SiteTaskDto[];
}

export interface AvailableSettlementLineDto {
  id: string;
  settlementId: string;
  category: string;
  totalAmount: number;
  totalAllocatedAmount: number;
  remainingAmount: number;
  description: string;
  invoiceUrl?: string | null;
  submittedAt: string;
}

export interface PublicTaskProgressDto {
  id: string;
  title: string;
  description?: string | null;
  progressPercentage: number;
  status: string;
  plannedStartDate?: string | null;
  plannedEndDate?: string | null;
  completedAt?: string | null;
  attachmentUrls: string[];
}

export interface PublicSitePhotoDto {
  id: string;
  photoUrl: string;
  caption?: string | null;
  uploadedAt: string;
}

export interface PublicProjectTrackerDto {
  projectId: string;
  projectName: string;
  category?: string | null;
  clientName?: string | null;
  governorate?: string | null;
  cityOrZone?: string | null;
  status: string;
  weightedOverallProgress: number;
  startDate: string;
  endDate?: string | null;
  tasks: PublicTaskProgressDto[];
  sitePhotos: PublicSitePhotoDto[];
}

export type PunchItemSeverity = 'Low' | 'Medium' | 'Critical';
export type PunchItemStatus = 'Open' | 'FixedPendingReview' | 'ApprovedAndClosed';

export interface SiteDailyLogDto {
  id: string;
  projectId: string;
  logDate: string;
  loggedByUserId: string;
  loggedByUserName: string;
  weatherCondition?: string | null;
  workforceCount: number;
  workforceSummary?: string | null;
  materialsDelivered?: string | null;
  generalObservations?: string | null;
  createdAt: string;
}

export interface SiteDailyLogUpsertDto {
  projectId: string;
  logDate: string;
  weatherCondition?: string | null;
  workforceCount: number;
  workforceSummary?: string | null;
  materialsDelivered?: string | null;
  generalObservations?: string | null;
}

export interface SitePunchItemDto {
  id: string;
  projectId: string;
  siteTaskId?: string | null;
  siteTaskTitle?: string | null;
  title: string;
  severity: PunchItemSeverity | string;
  status: PunchItemStatus | string;
  subcontractorName?: string | null;
  defectPhotoUrl: string;
  resolutionPhotoUrl?: string | null;
  engineerNotes?: string | null;
  createdByUserId: string;
  createdByUserName: string;
  createdAt: string;
  resolvedAt?: string | null;
}

export interface SitePunchItemCreateDto {
  projectId: string;
  siteTaskId?: string | null;
  title: string;
  severity: PunchItemSeverity;
  subcontractorName?: string | null;
  defectPhotoUrl: string;
  engineerNotes?: string | null;
}

export interface SitePunchItemStatusUpdateDto {
  status: PunchItemStatus;
  resolutionPhotoUrl?: string | null;
  engineerNotes?: string | null;
}

