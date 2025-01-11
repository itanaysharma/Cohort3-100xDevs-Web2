require("dotenv").config();
import mongoose, { model, Schema } from "mongoose";
if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL environment variable is required");
}
mongoose.connect(process.env.MONGO_URL);
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});
export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
});
export const ContentModel = model("Content", ContentSchema);
