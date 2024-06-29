import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_CLAUD_NAME,
  api_key: process.env.CLAUDINARY_API_KEY,
  api_secret: process.env.CLAUDINARY_API_SECRET,
});

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const { page, limit } = req.query;
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .where({ isPrivate: false })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate("user");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/user/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .where({ user: userId })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate("user");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/like").post(async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    res.send(post);
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/liked-by/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;
    const { page, limit } = req.query;
    const posts = await Post.find({ likes: userId })
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate("user")
      .exec();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/switch-mode").post(async (req, res) => {
  try {
    const { postId, isPrivate } = req.body;
    const updatePost = await Post.updateOne(
      { _id: postId },
      {
        isPrivate,
      }
    );
    res.status(201).json({ success: true, data: updatePost });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/search").get(async (req, res) => {
  try {
    const { prompt } = req.query;

    const searchPosts = await Post.find({
      prompt: { $regex: prompt, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();

    res.status(201).json(searchPosts);
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/delete/:postId").post(async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    await cloudinary.uploader.destroy(post.photoPublicId, {
      invalidate: true,
    });

    const deletePost = await Post.deleteOne({ _id: postId });

    res.status(201).json({ success: true, data: deletePost });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { photo, prompt, userId, isPrivate } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo, {
      folder: "DALL-E-AI",
      overwrite: true,
      resource_type: "image",
      format: "jpg",
      eager: [
        { quality: 1, width: 100, height: 100 },
        { quality: 50 },
        { quality: 100 },
      ],
    });

    const newPost = await Post.create({
      user: userId,
      prompt,
      photo: cloudinary.url(photoUrl.public_id, { quality: 100 }),
      thumbnail: cloudinary.url(photoUrl.public_id, { quality: 50 }),
      placeholder: cloudinary.url(photoUrl.public_id, {
        quality: 1,
        width: 100,
        height: 100,
      }),
      photoPublicId: photoUrl.public_id,
      isPrivate,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

export default router;
