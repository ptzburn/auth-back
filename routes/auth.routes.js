import { Router } from 'express';
import {
  isAuthenticated,
  resetPassword,
  checkOtp,
  sendResetOtp,
  sendVerifyOtp,
  signIn,
  signUp,
  uploadAvatar,
  verifyEmail
} from '../controllers/auth.controller.js';
import upload from '../middlewares/upload.middleware.js';
import authorize from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/upload', upload.single('file'), uploadAvatar);
authRouter.post('/send-verification', authorize, sendVerifyOtp);
authRouter.post('/verify-email', authorize, verifyEmail);
authRouter.post('/is-auth', authorize, isAuthenticated);
authRouter.post('/send-reset', sendResetOtp);
authRouter.post('/check-otp', checkOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
