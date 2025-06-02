import multer from 'multer';
import fs from 'fs';
import * as path from 'node:path';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${suffix}${ext}`);
  }
});

const upload = multer({ storage });

export default upload;
