import express from 'express';
import deserializeUser from '@middlewares/deserializeUser';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(deserializeUser);

export default app;
