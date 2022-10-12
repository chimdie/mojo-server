import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connect from "@utils/connect"
import log from "@utils/logger/index"
import { routesV1 } from "./routes";
import appMiddleWares from './config/middlewares';
import { SERVER_PORT, SERVER_HOST } from "./config";



const app = express();
app.use(appMiddleWares);

const port = SERVER_PORT
const host = SERVER_HOST

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(express.json());

// this is for 404
// app.use(function (req, res, next) {
//   res.status(404).send("route not found");
// });

app.listen(port, host, async () => {
  log.info(`Server listening at http://${host}:${port}`);
  await connect();

  app.use("/api/v1", routesV1);
});

export default app;
