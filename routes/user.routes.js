import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { getUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/data', authorize, getUser);

export default userRouter;
