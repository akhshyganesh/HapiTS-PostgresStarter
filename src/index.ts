import 'dotenv/config';
import { init } from './server';
import { connectDatabase, closeDatabaseConnection } from './config/database';
import logger from './utils/logger';

const start = async (): Promise<void> => {
  try {
    // Connect to database first
    await connectDatabase();

    // Then initialize and start the server
    const server = await init();
    await server.start();

    logger.info(`Server running at: ${server.info.uri}`);

    // Handle shutdown gracefully
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      await server.stop();
      await closeDatabaseConnection();
      process.exit(0);
    });
  } catch (err) {
    logger.error('Error starting server:', err);
    await closeDatabaseConnection();
    process.exit(1);
  }
};

start();

process.on('unhandledRejection', async (err) => {
  logger.error('Unhandled rejection:', err);
  await closeDatabaseConnection();
  process.exit(1);
});
