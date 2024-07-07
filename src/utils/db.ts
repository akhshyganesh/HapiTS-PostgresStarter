import { MikroORM, EntityManager } from '@mikro-orm/core';
import config from '@/config/mikro-orm.config';

let orm: MikroORM;

export const initORM = async () => {
  orm = await MikroORM.init(config);
  return orm;
};

export const getORM = () => orm;

export const getEntityManager = (): EntityManager => {
  if (!orm) {
    throw new Error('ORM not initialized');
  }
  return orm.em.fork();
};
