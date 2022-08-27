import { Request, Response, Router } from "express";

let router = Router();

router.get("/health", (req: Request, res: Response) => {
  res.status(200).send("version 2.0.0 : Server is healthy");
});


export default router;
