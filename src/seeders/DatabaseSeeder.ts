import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, UserRole } from '@/entities/user.entity';
import bcrypt from 'bcrypt';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const now = new Date();

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const admin = em.create(User, {
      email: 'admin@example.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    // Create regular user
    const userPassword = await bcrypt.hash('User123!', 10);
    const user = em.create(User, {
      email: 'user@example.com',
      password: userPassword,
      firstName: 'Regular',
      lastName: 'User',
      role: UserRole.USER,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    em.persist([admin, user]);
    await em.flush();
  }
}
