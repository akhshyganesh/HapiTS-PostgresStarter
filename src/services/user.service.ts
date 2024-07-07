import { EntityManager } from '@mikro-orm/core';
import { User } from '@/entities/User';
import { getEntityManager } from '@/utils/db';

export const UserService = {
  async getAllUsers() {
    try {
      const em: EntityManager = getEntityManager();
      return await em.find(User, {});
    } catch (error) {
      console.error('Error getting all users', error);
      throw new Error('Unable to fetch users');
    }
  },

  async getUserById(userId: number) {
    if (isNaN(userId) || userId <= 0) {
      throw new Error('Invalid user ID');
    }

    try {
      const em: EntityManager = getEntityManager();
      return (await em.findOne(User, { id: userId })) || null;
    } catch (error) {
      console.error(`Error getting user with id ${userId}`, error);
      throw new Error('Unable to fetch user');
    }
  },

  async createUser(name: string, email: string) {
    if (!name || !email) {
      throw new Error('Name and email are required');
    }

    try {
      const em: EntityManager = getEntityManager();
      const user = new User();
      user.name = name;
      user.email = email;
      await em.persistAndFlush(user);
      return user;
    } catch (error) {
      console.error(
        `Error creating user with name ${name} and email ${email}`,
        error,
      );
      throw new Error('Unable to create user');
    }
  },

  async updateUser(userId: number, name: string, email: string) {
    if (isNaN(userId) || userId <= 0) {
      throw new Error('Invalid user ID');
    }

    if (!name || !email) {
      throw new Error('Name and email are required');
    }

    try {
      const em: EntityManager = getEntityManager();
      const user = await em.findOne(User, { id: userId });
      if (!user) return null;
      user.name = name;
      user.email = email;
      await em.persistAndFlush(user);
      return user;
    } catch (error) {
      console.error(`Error updating user with id ${userId}`, error);
      throw new Error('Unable to update user');
    }
  },

  async deleteUser(userId: number) {
    if (isNaN(userId) || userId <= 0) {
      throw new Error('Invalid user ID');
    }

    try {
      const em: EntityManager = getEntityManager();
      const user = await em.findOne(User, { id: userId });
      if (!user) return;
      await em.removeAndFlush(user);
    } catch (error) {
      console.error(`Error deleting user with id ${userId}`, error);
      throw new Error('Unable to delete user');
    }
  },
};
