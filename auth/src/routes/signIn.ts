import express from "express";

const router = express.Router();

router.post("/api/users/signin", async (req, res, next) => {
  try {
    res.status(200).json("Hi there!");
  } catch (error) {
    next(error);
  }
});

export { router as signInRouter };