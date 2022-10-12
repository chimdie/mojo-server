import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        qury: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      console.log(e);
      return res.status(400).send({
        success: false,
        error: "BAD REQUEST",
        message: e.errors[0].message,
        result: null,
      });
    }
  };
export default validate;
