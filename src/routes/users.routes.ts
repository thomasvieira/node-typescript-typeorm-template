import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const { user } = request;
  const listUsers = new ListUsersService();

  const users = await listUsers.execute();

  const requesterId = user.id;

  return response.json({ requesterId, users });
});

export default usersRouter;
