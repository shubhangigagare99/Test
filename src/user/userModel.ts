import * as mongoose from "mongoose";
import userSchema from "./userSchema";
import userInterface from "./userInterface";

export const UserSchema = new userSchema({
  collection: "user",
  versionKey: false,
});

export const userModel: mongoose.Model<userInterface> = mongoose.model<userInterface>(
  "user",
  UserSchema
);
