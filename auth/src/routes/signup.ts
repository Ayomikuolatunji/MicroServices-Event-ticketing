import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation";
import { User } from "../models/user";
import { AlreadyExist } from "../errors/already-exists";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid and must  not be empty").notEmpty(),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .notEmpty()
      .withMessage("Password is required"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new AlreadyExist("User already exists");
      }
      const user = await User.build({ email, password });
      return res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signupRouter };
