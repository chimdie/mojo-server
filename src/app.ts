import "reflect-metadata";
import express from "express";
import config from "config";
import cors from "cors";
import dotenv from "dotenv";
import connect from "@utils/connect"
import log from "@utils/logger/index"
import { routesV1 } from "./routes";

dotenv.config();

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hey you i'm here...");
});

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
