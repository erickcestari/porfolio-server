import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    // Handle Zod errors here
    return res.status(400).json({ error: 'Invalid request data' });
  }
  
  // Handle other errors as needed
  return res.status(500).json({ error: 'Internal server error' });
};