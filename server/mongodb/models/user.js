import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    _id: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.model("users", User);

export default UserSchema;
