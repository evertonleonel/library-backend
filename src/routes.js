import express from 'express';
import {
  getBookHistory,
  getBookHistories,
  getBook,
  getBooks,
} from './controllers/getBookController.js';

import {
  postBookLend,
  postBookCreate,
} from './controllers/postBookController.js';
import { putBookUpdate } from './controllers/putBookController.js';
import {
  patchBookReturn,
  patchBookActive,
  patchBookInactive,
} from './controllers/patchBookController.js';
import { getUsers, getUserEmail } from './controllers/getUsersController.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const dirname = path.dirname(fileURLToPath(import.meta.url));

import multer from 'multer';
import { storage } from './config/multer.js';

const uploads = multer({ storage: storage });

export const route = express.Router();

route.get('/users', cors(), getUsers);

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  accessControlAllowCredentials: true,
  optionSuccessStatus: 200,
};

route.get('/uploads/:fileName', (req, res) => {
  const filePath = path.join(dirname, 'books', 'uploads', req.params.fileName);
  const exist = fs.existsSync(filePath);
  // só verifica se existe mesmo
  if (!exist) return res.status(404).end();
  return res.sendFile(filePath);
});

route.get('/users/:email', cors(corsOptions), getUserEmail);

route.get('/books/:idBook/rentHistory', cors(corsOptions), getBookHistory);
route.get('/books/rentHistories', cors(corsOptions), getBookHistories);
route.get('/books/:idBook', cors(corsOptions), getBook);
route.get('/books', cors(corsOptions), getBooks);

route.post('/books/:idBook/lend', cors(corsOptions), postBookLend);

route.post('/books', cors(), uploads.single('image'), postBookCreate);

route.put('/books/:idBook/update', cors(corsOptions), putBookUpdate);

route.patch(
  '/books/:idBook/returned/:idRent',
  cors(corsOptions),
  patchBookReturn
);
route.patch('/books/:idBook/active', cors(corsOptions), patchBookActive);
route.patch('/books/:idBook/inactive', cors(corsOptions), patchBookInactive);
