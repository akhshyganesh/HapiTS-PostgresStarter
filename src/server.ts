import * as Hapi from '@hapi/hapi';
import { getEntityManager, initORM } from '@/utils/db';
import routes from '@/routes';
import config from '@/config';

const server: Hapi.Server = Hapi.server({
  port: config.port,
  host: config.host,
});

const start = async () => {
  await initORM();
  const em = getEntityManager();

  server.ext('onRequest', (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    (request as any).em = em; // Attach em to the request object
    return h.continue;
  });

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

start();
