import express from 'express';
import cors from 'cors';

import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

import authRouter from './routes/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRouter);
app.use(errorMiddleware);

app.get('/api', (req, res) => {
  res.send('Welcome to the blog backend!');
});

app.listen(PORT, async () => {
  console.log(`Blog API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});
