import express from 'express';
import cors from 'cors';

import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the blog backend!');
});

app.listen(PORT, async () => {
  console.log(`Blog API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});
