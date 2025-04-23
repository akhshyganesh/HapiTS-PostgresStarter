import logger from '@/utils/logger';
import dotenv from 'dotenv';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from '@/config/mikro-orm.config';

// Load test environment variables
dotenv.config({ path: '.env.test' });

process.env.NODE_ENV = 'test';
process.env.PORT = '4000';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DB_NAME = 'hapi_starter_test';

let orm: MikroORM;

// Setup before all tests
beforeAll(async () => {
  jest.setTimeout(60000); // Increase timeout for this operation

  try {
    // Create a test database connection
    const testConfig = {
      ...config,
      dbName: process.env.DB_NAME,
      // Customize for testing if needed
      debug: false,
    };

    orm = await MikroORM.init<PostgreSqlDriver>(testConfig);

    // Ensure schema is created
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.createSchema();

    logger.info(`Connected to PostgreSQL test database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error('Failed to start test database', error);
    throw error;
  }
});

// Cleanup after all tests
afterAll(async () => {
  if (orm) {
    // Clean up the test database
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await orm.close();
    logger.info('Closed PostgreSQL test database connection');
  }
});

// This ensures the file has at least one test
describe('Test setup', () => {
  it('should setup test environment correctly', () => {
    expect(process.env.DB_NAME).toBeDefined();
    expect(orm.isConnected()).toBe(true);
  });
});
