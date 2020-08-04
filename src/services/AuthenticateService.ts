import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';
import User from '../entity/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    try {
      const user = await usersRepository.findOne({ where: { email } });
    } catch {
      throw new AppError('Invalid Token', 401);
    }
    if (!user) {
      throw new AppError('Wrong credentials', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Wrong credentials', 401);
    }

    const { secret, expiresIn } = authConfig;

    if (!secret) {
      throw new AppError('Missing setting', 501);
    }

    if (!expiresIn) {
      throw new AppError('Missing setting', 501);
    }

    try {
      const token = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      return { user, token };
    } catch {
      throw new AppError('Invalid Token', 401);
    }
  }
}

export default AuthenticateService;
