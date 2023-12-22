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
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid and must  not be empty").notEmpty(),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .notEmpty()
      .withMessage("Password is required"),
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
        process.env.JWT_SECRET!
      );
      req.session = {
        jwt: token,
      };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signInRouter };
