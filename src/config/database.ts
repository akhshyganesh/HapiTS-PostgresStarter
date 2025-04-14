import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import logger from '@/utils/logger';
import config from './mikro-orm.config';

let orm: MikroORM<PostgreSqlDriver>;

export const connectDatabase = async (): Promise<MikroORM> => {
  try {
    const dbName = process.env.DB_NAME || 'hapi_starter';
    const dbHost = process.env.DB_HOST || 'localhost';
    logger.info(`Connecting to PostgreSQL database ${dbName} at ${dbHost}`);

    orm = await MikroORM.init<PostgreSqlDriver>(config);

    // Run migrations if not in production
    if (process.env.NODE_ENV !== 'production' && process.env.AUTO_MIGRATE === 'true') {
      const migrator = orm.getMigrator();
      const pendingMigrations = await migrator.getPendingMigrations();

      if (pendingMigrations.length > 0) {
        logger.info(`Running ${pendingMigrations.length} pending migrations`);
        await migrator.up();
      }
    }

    logger.info('Connected to PostgreSQL database');
    return orm;
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL database', error);
    throw error;
  }
};

export const getORM = (): MikroORM => {
  if (!orm) {
    throw new Error('Database connection not initialized. Call connectDatabase() first.');
  }
  return orm;
};

export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    if (orm) {
      await orm.close();
      logger.info('Closed PostgreSQL connection');
    }
  } catch (error) {
    logger.error('Error closing PostgreSQL connection', error);
  }
};
