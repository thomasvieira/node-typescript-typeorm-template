/* eslint-disable no-console */
import 'reflect-metadata';
import './config/dotenv';

import express from 'express';

const app = express();

app.get('/', (request, response) =>
  response.json({ message: 'Hello RocketLab' }),
);

console.log('Server running on port 3333');
app.listen(3333);
