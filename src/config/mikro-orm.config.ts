import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import path from 'path';
import logger from '@/utils/logger';
import { IAny } from '@/types';

// Import entities
import { User } from '@/entities/user.entity';

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  entities: [User],
  dbName: process.env.DB_NAME || 'hapi_starter',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  debug: process.env.NODE_ENV !== 'production',
  logger: (msg: IAny) => logger.debug(msg),
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: path.join(process.cwd(), 'src/migrations'),
    pathTs: path.join(process.cwd(), 'src/migrations'),
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false, // Don't drop tables in production
    safe: false, // Disable safe migrations in development
    snapshot: true, // Save snapshot of the migration
  },
  seeder: {
    path: path.join(process.cwd(), 'src/seeders'),
    pathTs: path.join(process.cwd(), 'src/seeders'),
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
};

export default config;
