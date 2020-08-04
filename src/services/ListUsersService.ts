import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../entity/User';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const userRepository = getRepository(User);
    try {
      const users = await userRepository.find();

      if (!users) {
        throw new AppError('No users found', 204);
      }

      return users;
    } catch {
      throw new AppError('Unnable to find users', 401);
    }
  }
}

export default ListUsersService;
