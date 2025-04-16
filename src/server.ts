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
        // origin: ['*'],
        origin: ['localhost:3001', 'http://localhost:3001'],
        credentials: true,
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
