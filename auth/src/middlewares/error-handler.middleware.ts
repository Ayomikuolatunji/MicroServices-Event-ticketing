import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    if (process.env.NODE_ENV !== "test") {
      console.log(err.serializeErrors());
    }
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
