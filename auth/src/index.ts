import { app } from "./app";
import { DatabaseConnectError } from "./errors/database-connection-error";
import { InternalServerError } from "./errors/internal-server-error";
import { ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const PORT = 3000;

const start = async () => {
  if (!process.env.MONGO_URL) {
    throw new DatabaseConnectError("MONGO_URL Not provided");
  } else if (!process.env.JWT_KEY) {
    throw new InternalServerError("Internal server error caused my JWT_KEY not been provided");
  }
  await mongoose
    .connect(process.env.MONGO_URL, <{}>{
      serverApi: ServerApiVersion.v1,
    })
    .then(() => {
      console.log("Database connected!!");
      app.listen(PORT, async () => {
        try {
          console.log("Auth service server is running on port 3000");
        } catch (error) {
          console.log(error);
        }
      });
    })
    .catch((err) => {
      console.log("Err:", err);
    });
};
start();
