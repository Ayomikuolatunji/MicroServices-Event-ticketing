import express from "express";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/Bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/sign-in",
  [
    body("email").isEmail().withMessage("Email must be valid and must  not be empty").notEmpty(),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new BadRequestError("Invalid email or password!");
      }
      const passwordMatch = await Password.comparePassword(user.password, password);
      if (!passwordMatch) {
        throw new BadRequestError("Invalid email or password!");
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );
     return res.status(200).json(user);
    } catch (error:any) {
      console.log(error.message);
      next(error);
    }
  }
);

export { router as signInRouter };
