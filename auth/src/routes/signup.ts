import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { AlreadyExist } from "../errors/already-exists";
import { validateRequest } from "../middlewares/validate-request";

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
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      await User.deleteMany();
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        throw new AlreadyExist("User already exists");
      }
      const user = await User.build({ email, password });
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );
      req.session = {
        jwt: userJwt,
      };
      return res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signupRouter };
