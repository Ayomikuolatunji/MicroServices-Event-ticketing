import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requiredAuth } from "../middlewares/required-auth";
const router = express.Router();

router.get("/api/users/currentUser", currentUser, requiredAuth, async (req, res, next) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
