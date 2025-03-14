import express from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { formatZodErrors } from "./format-zod-error.handler";

export default function errorHandler(
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): any {
  console.error("Error: ", error);

  if (error instanceof ZodError) {
    return res.status(400).json({ errors: formatZodErrors(error) });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let status = 400;
    let message = "Database error";

    switch (error.code) {
      case "P2002":
        status = 409;
        message = `Duplicate value found: ${error.meta?.target}`;
        break;
      case "P2025":
        status = 404;
        message = "Record not found";
        break;
      case "P2016":
        status = 404;
        message = "No results found";
        break;
      default:
        message = `Prisma error: ${error.code}`;
    }

    return res.status(status).json({ error: message });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res
      .status(400)
      .json({ error: "Invalid Prisma query or input data" });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return res.status(500).json({ error: "Unknown database error occurred" });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return res.status(500).json({ error: "Database connection issue" });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({ error: "Database failed to initialize" });
  }

  return res
    .status(500)
    .json({ message: error.message || "Internal server error" });
}
