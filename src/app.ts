/* eslint-disable import/order */

/* eslint-disable import/first */
import 'reflect-metadata';
import express from 'express';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

import connect from '@utils/connect';
import log from '@utils/logger/index';
import { SERVER_PORT } from './config';
import appMiddleWares from './config/middlewares';
import { routesV1 } from './routes';

const app = express();
app.use(appMiddleWares);

const port = SERVER_PORT;
// eslint-disable-next-line no-console
console.log({ port, host: os.hostname() });
app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use(express.json());

// this is for 404
// app.use(function (req, res, next) {
//   res.status(404).send("route not found");
// });

app.listen(port, async () => {
  log.info(`Server listening on ${port}`);
  await connect();

  app.use('/api/v1', routesV1);
});

export default app;
