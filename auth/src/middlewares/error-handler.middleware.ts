import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Something went wrong", error.message);
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ errors: error.serializeErrors() });
    }
    next();
  } catch (error) {
    next(error);
  }
};
