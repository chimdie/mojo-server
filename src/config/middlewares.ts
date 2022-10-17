import express from 'express';
import cors from 'cors';
import deserializeUser from '@middlewares/deserializeUser';
import { SERVER_PORT, SERVER_HOST } from './env';

const port = SERVER_PORT;
const host = SERVER_HOST;

const app = express();
app.use(
  cors({
    origin: [
      `http://${host}:${port}`,
      `http://${host}:8080`,
      `http://localhost:8081`,
      `http://localhost:3000`,
    ],
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(deserializeUser);

export default app;
