import { Request, ResponseToolkit } from '@hapi/hapi';
import { UserService } from '@/services/user.service';

export const UserController = {
  async getAllUsers(request: Request, h: ResponseToolkit) {
    try {
      const users = await UserService.getAllUsers();
      return h.response({ success: true, data: users });
    } catch (error) {
      return h
        .response({ success: false, error: 'Unable to fetch users' })
        .code(500);
    }
  },

  async getUserById(request: Request, h: ResponseToolkit) {
    if (!request.params.id)
      return h.response({ success: false, error: 'Id not provided' }).code(400);
    try {
      const userId = parseInt(request.params.id);
      if (isNaN(userId) || userId <= 0) {
        return h
          .response({ success: false, error: 'Invalid user ID' })
          .code(400);
      }

      const user = await UserService.getUserById(userId);
      return user
        ? h.response({ success: true, data: user })
        : h.response({ success: false, error: 'User not found' }).code(404);
    } catch (error) {
      return h
        .response({ success: false, error: 'Unable to fetch user' })
        .code(500);
    }
  },

  async createUser(request: Request, h: ResponseToolkit) {
    try {
      const { name, email } = request.payload as {
        name: string;
        email: string;
      };

      if (!name || !email) {
        return h
          .response({ success: false, error: 'Name and email are required' })
          .code(400);
      }

      const newUser = await UserService.createUser(name, email);
      return h.response({ success: true, data: newUser }).code(201);
    } catch (error) {
      return h
        .response({ success: false, error: 'Unable to create user' })
        .code(500);
    }
  },

  async updateUser(request: Request, h: ResponseToolkit) {
    if (!request.params.id)
      return h.response({ success: false, error: 'Id not provided' }).code(400);
    try {
      const userId = parseInt(request.params.id);
      const { name, email } = request.payload as {
        name: string;
        email: string;
      };

      if (isNaN(userId) || userId <= 0) {
        return h
          .response({ success: false, error: 'Invalid user ID' })
          .code(400);
      }

      if (!name || !email) {
        return h
          .response({ success: false, error: 'Name and email are required' })
          .code(400);
      }

      const updatedUser = await UserService.updateUser(userId, name, email);
      return updatedUser
        ? h.response({ success: true, data: updatedUser })
        : h.response({ success: false, error: 'User not found' }).code(404);
    } catch (error) {
      return h
        .response({ success: false, error: 'Unable to update user' })
        .code(500);
    }
  },

  async deleteUser(request: Request, h: ResponseToolkit) {
    if (!request.params.id)
      return h.response({ success: false, error: 'Id not provided' }).code(400);
    try {
      const userId = parseInt(request.params.id);

      if (isNaN(userId) || userId <= 0) {
        return h
          .response({ success: false, error: 'Invalid user ID' })
          .code(400);
      }

      await UserService.deleteUser(userId);
      return h.response({ success: true }).code(204);
    } catch (error) {
      return h
        .response({ success: false, error: 'Unable to delete user' })
        .code(500);
    }
  },
};
