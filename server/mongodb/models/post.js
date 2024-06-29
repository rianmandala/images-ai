import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "users",
    },
    prompt: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    photoPublicId: {
      type: String,
      required: true,
    },
    likes: { type: [String], default: [], ref: "users" },
    isPrivate: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = mongoose.model("posts", Post);

export default PostSchema;
