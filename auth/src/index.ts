import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signIn";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

app.use(json());

app.use(currentUserRouter);
app.use(signOutRouter);
app.use(signInRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Auth service server is running on port 3000");
});
