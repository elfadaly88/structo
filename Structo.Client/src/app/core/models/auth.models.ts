export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  currentUserRole?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  role: string;
  tenantId: string | null;
  name: string;
  isApproved: boolean;
  isProfileComplete: boolean;
}

export interface UserSession {
  userId: string;
  role: string;
  tenantId: string | null;
  email: string;
  name: string;
  isApproved: boolean;
  isProfileComplete: boolean;
}

