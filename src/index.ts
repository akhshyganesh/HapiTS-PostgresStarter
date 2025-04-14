import 'dotenv/config';
import { startServer } from './server';
import { connectDatabase, closeDatabaseConnection } from './config/database';
import logger from './utils/logger';
import { IAny } from '@/types';

const start = async (): Promise<void> => {
  try {
    // Connect to PostgreSQL
    await connectDatabase();

    // Start Hapi server
    const server = await startServer();
    logger.info(`Server running at: ${server.info.uri}`);

    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      await server.stop();
      await closeDatabaseConnection();
      process.exit(0);
    });
  } catch (error: IAny) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

start();

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  process.exit(1);
});
