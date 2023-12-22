import express from "express";
import { requiredAuth } from "../middlewares/required-auth";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.post("/api/users/signout", currentUser, requiredAuth, async (req, res, next) => {
  try {
    req.session = null;
    res.send({ currentUser: null });
  } catch (error) {
    next(error);
  }
});

export { router as signOutRouter };
