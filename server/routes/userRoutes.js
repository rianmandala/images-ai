import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import User from '../mongodb/models/user.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLAUDINARY_CLAUD_NAME,
  api_key: process.env.CLAUDINARY_API_KEY,
  api_secret: process.env.CLAUDINARY_API_SECRET,
});

const router = express.Router();

router.route('/:userId').get(async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route('/create').post(async (req, res) => {
  try {
    const { photo, name, userId, email, providerId } = req.body;

    const existingUser = await User.findById(userId);
    if (!existingUser?._id) {
      const createUser = await User.create({
        name,
        email,
        photo,
        providerId,
        _id: userId,
      });

      res.status(201).json(createUser);
    } else {
      res.status(201).json(existingUser);
    }
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

router.route('/update').post(async (req, res) => {
  try {
    const { photo, name, userId } = req.body;

    const photoUrl = async () => await cloudinary.uploader.upload(photo);

    const updateUser =
      photo === ''
        ? {
            name,
          }
        : {
            name,
            photo: (await photoUrl()).url,
          };

    await User.updateOne({ _id: userId }, updateUser);

    res.status(201).json({ name, photo });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

export default router;
