import { UserRole } from '@/entities/user.entity';

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}
