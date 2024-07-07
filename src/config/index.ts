import * as dotenv from 'dotenv';
dotenv.config();

export default {
  dbName: process.env.POSTGRES_DB_NAME,
  dbUser: process.env.POSTGRES_DB_USER,
  dbPassword: process.env.POSTGRES_DB_PASSWORD,
  debug: (process.env.DEBUG || '') === 'true',
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
};
