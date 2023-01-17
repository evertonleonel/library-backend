import multer from 'multer';
import path from 'path';

import { fileURLToPath } from 'url';
const dirname = path.dirname(fileURLToPath(import.meta.url));
const booksPathName = path.join(dirname, '..', 'books', 'uploads');

export const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, booksPathName);
  },
  filename: (request, file, callback) => {
    const time = new Date().getTime();

    const nameFiles = `${time}_${file.originalname}`;
    callback(null, nameFiles);
    request.imageName = nameFiles;
    //
  },
});
// vamos receber o arquivo no servidor e salvar ele no disco
