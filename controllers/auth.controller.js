import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, password } = req.body;
    const avatarUrl = req.body.avatarUrl ? req.body.avatarUrl : '';

    if (password.length < 8) {
      console.error('Password must be at least 8 characters long');
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    // Check if a user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ firstName, lastName, email, hashedPassword, avatarUrl }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0].id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    await session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0]
      }
    });
  } catch (error) {
    console.error(`Couldn't complete the process: `, error.message);
    res.status(500).json({ success: false, error: error.message });

    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    console.error(`Error occurred: `, error.message);
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const fileName = req.file.originalname;

    res.status(200).json({ url: `/uploads/${fileName}` });
  } catch (error) {
    console.error(`Error occurred: `, error.message);
    next(error);
  }
};
