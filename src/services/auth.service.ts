import Boom from '@hapi/boom';
import { User } from '@/entities/user.entity';
import { generateToken } from '@/middleware/auth/auth.middleware';
import { EntityManager } from '@mikro-orm/core';
import { getORM } from '@/config/database';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export class AuthService {
  private em: EntityManager;
  private initialized = false;

  constructor() {
    // Lazy initialization - will be called when methods are executed
    this.em = {} as EntityManager;
  }

  private getEntityManager(): EntityManager {
    // Only get the EntityManager when needed
    if (!this.initialized) {
      this.em = getORM().em.fork();
      this.initialized = true;
    }
    return this.em;
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const em = this.getEntityManager();
      const user = await em.findOne(User, { email });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      if (!user.isActive) {
        throw Boom.forbidden('Account is disabled');
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
