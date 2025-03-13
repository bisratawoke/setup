import express from "express";
import { ZodError } from "zod";
import { formatZodErrors } from "./format-zod-error.handler";

export default function errorHandler(
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): any {
  if (error instanceof ZodError) {
    res.status(400).json({ errors: formatZodErrors(error) });
  } else {
    res.status(500).json({ message: error.message });
  }
}
