/* eslint-disable no-console */
import 'reflect-metadata';
import './config/dotenv';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import createConnection from './database';

createConnection();
const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

console.log('Server running on port 3333');
app.listen(3333);
