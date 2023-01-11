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

export const route = express.Router();

route.get('/books/:idBook/rentHistory', getBookHistory);
route.get('/books/rentHistories', getBookHistories);
route.get('/books/:idBook', getBook);
route.get('/books', getBooks);

route.post('/books/:idBook/lend', postBookLend);
route.post('/books', postBookCreate);

route.put('/books/:idBook/update', putBookUpdate);

route.patch('/books/:idBook/returned/:idRent', patchBookReturn);
route.patch('/books/:idBook/active', patchBookActive);
route.patch('/books/:idBook/inactive', patchBookInactive);
