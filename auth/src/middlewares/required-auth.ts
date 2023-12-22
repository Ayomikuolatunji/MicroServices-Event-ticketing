import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/not-found-error";

export const requiredAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.currentUser) {
      throw new NotFoundError("User not found");
    }
    next()
  } catch (error) {
    next(error);
  }
};
