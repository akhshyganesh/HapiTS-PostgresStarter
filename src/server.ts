import 'dotenv/config';
import * as Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { registerPlugins } from '@/plugins';
import { registerRoutes } from '@/routes';

export const init = async (): Promise<Hapi.Server> => {
  const server = new Hapi.Server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
    routes: {
      cors: {
        // origin: ['*'], // NOTE: If you want to allow all origins, you can uncomment this line
        // but be cautious about security implications.
        origin: process.env.CORS_ORIGIN?.split(',').map((origin: string) => origin.trim()) || ['*'],
        credentials: process.env.CORS_CREDENTIALS === 'true',
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
        exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 86400,
        additionalHeaders: ['content-type'],
        additionalExposedHeaders: ['content-type'],
      },
      validate: {
        failAction: async (
          request: Hapi.Request,
          h: Hapi.ResponseToolkit,
          err: Error | undefined,
        ): Promise<never | Hapi.Lifecycle.ReturnValue> => {
          if (process.env.NODE_ENV === 'production') {
            throw Boom.badRequest('Invalid request payload');
          } else {
            if (err) throw err;
            return h.continue;
          }
        },
      },
    },
  });

  await registerPlugins(server);
  registerRoutes(server);

  return server;
};
