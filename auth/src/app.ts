import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import { signInRouter } from "./routes/signIn";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { NotFoundError } from "./errors/not-found-error";
import { UserPayload } from "./middlewares/current-user";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signOutRouter);
app.use(signInRouter);
app.use(signupRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

export { app };
