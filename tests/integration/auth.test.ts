import { Server } from '@hapi/hapi';
import { init } from '../../src/server';
import { User } from '../../src/entities/user.entity';
import { MikroORM } from '@mikro-orm/core';

// Extend the ServerApplicationState interface
declare module '@hapi/hapi' {
  interface ServerApplicationState {
    orm: MikroORM;
  }
}

describe('Authentication', () => {
  let server: Server;
  let orm: MikroORM;

  beforeAll(async () => {
    server = await init();
    orm = server.app.orm; // Assuming the ORM instance is stored in server.app.orm
    // Don't connect to the database here since it's handled in setup.ts
  }, 30000); // Extend timeout for server initialization

  afterAll(async () => {
    try {
      // Clean up users created during tests using MikroORM
      const em = orm.em.fork();
      await em.nativeDelete(User, {
        username: { $in: ['testuser', 'loginuser'] },
      } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
      await server.stop();
    } catch (error) {
      console.error('Error during test cleanup:', error);
    }
  }, 30000); // Extend timeout for cleanup

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!',
        },
      });

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toHaveProperty('token');
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user', async () => {
      // First register
      await server.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'loginuser',
          email: 'login@example.com',
          password: 'Password123!',
        },
      });

      // Then login
      const response = await server.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'login@example.com',
          password: 'Password123!',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toHaveProperty('token');
    });
  });
});
