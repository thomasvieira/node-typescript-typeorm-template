/* eslint-disable no-console */
import 'reflect-metadata';
import './config/dotenv';

import express from 'express';

import { getRepository } from 'typeorm';

import createConnection from './database';
import Photo from './entity/Photo';

createConnection();
const app = express();

app.get('/photos', async (request, response) => {
  const photoRepository = getRepository(Photo);
  const savedPhotos = await photoRepository.find();

  return response.json({
    ok: 'Hello RocketLab',
    savedPhotos,
  });
});

app.get('/', (request, response) => {
  response.json({
    ok: 'Hello RocketLab',
    TYPEORM_HOST: process.env.TYPEORM_HOST,
    NODE_ENV: process.env.NODE_ENV,
  });
});

console.log('Server running on port 3333');
app.listen(3333);
