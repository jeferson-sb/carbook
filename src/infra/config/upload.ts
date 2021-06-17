import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

interface Storage {
  storage: {
    destination: string;
    filename: (request, file, callback) => unknown;
  };
}

export default {
  upload(folder: string): Storage {
    return {
      storage: multer.diskStorage({
        destination: resolve('./', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
