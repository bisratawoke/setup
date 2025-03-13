import express from "express";
import { ZodError, ZodSchema } from "zod";

declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
    }
  }
}

export default function genericValidationMiddleware(
  schema: ZodSchema<any>,
  source: "body" | "params" | "query"
): any {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any => {
    try {
      const result = schema.parse(req[source]);
      req.validatedData = result;
      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        next(err);
      } else {
        next(new Error("Validation error"));
      }
    }
  };
}
