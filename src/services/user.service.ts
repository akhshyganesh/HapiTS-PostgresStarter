import { EntityManager } from '@mikro-orm/core';
import { User, UserRole } from '@/entities/user.entity';
import { getORM } from '@/config/database';
import { UserResponse, CreateUserData, UpdateUserData } from '@/types/user.types';

export class UserService {
  private em: EntityManager;

  constructor() {
    this.em = getORM().em.fork();
  }

  private mapUserToResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public async createUser(userData: CreateUserData): Promise<UserResponse> {
    // Create a new date for both timestamps
    const now = new Date();

    // Create the user with timestamps and provide defaults for optional fields
    const user = this.em.create(User, {
      ...userData,
      role: userData.role || UserRole.USER, // Default to 'user' role
      isActive: userData.isActive !== undefined ? userData.isActive : true, // Default to active
      createdAt: now,
      updatedAt: now,
    });

    await this.em.persistAndFlush(user);

    return this.mapUserToResponse(user);
  }

  public async getUsers(): Promise<UserResponse[]> {
    const users = await this.em.find(User, {});

    return users.map((user) => this.mapUserToResponse(user));
  }

  public async getUserById(userId: string): Promise<UserResponse | null> {
    const user = await this.em.findOne(User, { id: userId });

    if (!user) {
      return null;
    }

    return this.mapUserToResponse(user);
  }

  public async updateUser(
    userId: string,
    updateData: UpdateUserData,
  ): Promise<UserResponse | null> {
    const user = await this.em.findOne(User, { id: userId });

    if (!user) {
      return null;
    }

    // Apply updates
    this.em.assign(user, updateData);
    await this.em.flush();

    return this.mapUserToResponse(user);
  }

  public async deleteUser(userId: string): Promise<boolean> {
    const user = await this.em.findOne(User, { id: userId });

    if (!user) {
      return false;
    }

    await this.em.removeAndFlush(user);
    return true;
  }
}
