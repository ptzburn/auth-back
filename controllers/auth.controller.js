import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import Upload from '../models/upload.model.js';

import { EMAIL, JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import transporter from '../config/nodemailer.js';
import { passwordResetTemplate } from '../utils/password-reset-template.js';
import { welcomeTemplate } from '../utils/welcome-template.js';

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, password, avatarUrl } = req.body;

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

    if (avatarUrl) {
      await Upload.create({ userId: newUsers[0].id, url: avatarUrl });
    }

    const token = jwt.sign({ userId: newUsers[0].id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: 'Welcome to my blog!',
      html: welcomeTemplate
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error(error, 'Error sending email');

      console.log('Email sent: ' + info.response);
    });

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
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(
      '-verifyOtp -verifyOtpExpiresAt -resetOtp -resetOtpExpiresAt'
    );

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
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const fileName = req.file.filename;

    res.status(200).json({ url: `/uploads/${fileName}` });

    if (req.body.userId) {
      await Upload.create({ userId: req.body.userId, url: `/uploads/${fileName}` });
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    next(error);
  }
};

export const sendVerifyOtp = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);

    console.log('user', user);

    if (user.isVerified) {
      const error = new Error('Account already verified');
      error.statusCode = 400;
      throw error;
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Account verification',
      text: `Hi ${user.firstName} ${user.lastName}! Use this one-time password within 24 hours to verify your account: ${otp}`
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error(error, 'Error sending email');

      console.log('Email sent: ' + info.response);
    });

    res.status(200).json({ success: true, message: 'Verification email sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { otp } = req.body;
  const { _id } = req.user;

  if (!_id || !otp) {
    console.error('Missing details');
    return res.status(400).json({ success: false, message: 'Missing details' });
  }

  try {
    const user = await User.findById(_id);

    if (!user) {
      console.error('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === '') {
      console.error('Invalid verification code');
      return res.status(400).json({ success: false, message: 'Invalid verification code' });
    }

    if (user.verifyOtpExpiresAt < Date.now()) {
      console.error('Expired code');
      return res.status(400).json({ success: false, message: 'Expired code' });
    }

    user.isVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiresAt = 0;

    await user.save();
    return res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const sendResetOtp = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: EMAIL,
      to: user.email,
      subject: 'Password reset',
      html: passwordResetTemplate.replace('{{otp}}', otp).replace('{{email}}', user.email)
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error(error, 'Error sending email');

      console.log('Email sent: ' + info.response);
    });

    res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: 'Email, OTP and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.resetOtp === '' || otp !== user.resetOtp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (user.resetOtpExpiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'Expired code' });
    }

    if (newPassword.length < 8) {
      console.error('Password must be at least 8 characters long');
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.hashedPassword = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpiresAt = 0;

    await user.save();

    return res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    next(error);
  }
};
