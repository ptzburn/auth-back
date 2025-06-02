import { Router } from 'express';
import { signIn, signUp, uploadAvatar } from '../controllers/auth.controller.js';
import upload from '../middlewares/upload.middleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/upload', upload.single('file'), uploadAvatar);

export default authRouter;
