import mongoose from "mongoose";
import { IUser, UserDoc, UserModel } from "./types.model";

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.build = async function (attrs: IUser) {
  const user = new User(attrs);
  return user.save();
};

userSchema.pre("save", async function (done) {
  
  done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
