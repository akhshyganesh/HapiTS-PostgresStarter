import { ServerRoute } from '@hapi/hapi';
import { UserController } from '@/controllers/user.controller';

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/users',
    handler: UserController.getAllUsers,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: UserController.getUserById,
  },
  {
    method: 'POST',
    path: '/users',
    handler: UserController.createUser,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: UserController.updateUser,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: UserController.deleteUser,
  },
];

export default routes;
