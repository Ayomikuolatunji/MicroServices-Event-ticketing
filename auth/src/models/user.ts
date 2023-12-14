import mongoose from "mongoose";

interface IUser {
  email: string;
  password: string;
}
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: IUser): UserDoc;
}
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
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
export { User };
