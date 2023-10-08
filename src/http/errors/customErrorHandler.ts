import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { NextFunction, Request, Response, response } from "express";
import { ZodError } from "zod";

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  if (err instanceof ResourceNotFound) {
    return response.status(404).send(err.message);
  }
  
  return res.status(500).json({ error: 'Internal server error' });
};