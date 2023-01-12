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

const dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(dirname, 'sou o dir');

console.log(path.resolve());

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

route.get('/users/:email', cors(corsOptions), getUserEmail);

route.get('/books/:idBook/rentHistory', cors(corsOptions), getBookHistory);
route.get('/books/rentHistories', cors(corsOptions), getBookHistories);
route.get('/books/:idBook', cors(corsOptions), getBook);
route.get('/books', cors(corsOptions), getBooks);

route.post('/books/:idBook/lend', cors(corsOptions), postBookLend);
route.post('/books', cors(), postBookCreate);

route.put('/books/:idBook/update', cors(corsOptions), putBookUpdate);

route.patch(
  '/books/:idBook/returned/:idRent',
  cors(corsOptions),
  patchBookReturn
);
route.patch('/books/:idBook/active', cors(corsOptions), patchBookActive);
route.patch('/books/:idBook/inactive', cors(corsOptions), patchBookInactive);

route.use(cors(corsOptions));
