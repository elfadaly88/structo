export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  managerId: string | null;
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
