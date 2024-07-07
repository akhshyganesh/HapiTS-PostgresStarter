import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import env from './index';

const config: Options = {
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: env.dbName,
  driver: PostgreSqlDriver,
  user: env.dbUser,
  password: env.dbPassword,
  debug: env.debug,
  extensions: [Migrator],
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './src/migrations/',
    pathTs: './src/migrations/',
  },
};

export default config;
