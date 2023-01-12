import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const booksPathName = path.join(dirname, '..', 'books', 'allBooks.json');

export const getAllBooks = () => {
  const file = fs.readFileSync(booksPathName, 'utf-8');
  return JSON.parse(file);
};

export const createBook = book => {
  const books = getAllBooks();
  books.push(book);
  fs.writeFileSync(booksPathName, JSON.stringify(books, null, 2));
  // escrever
  return book;
};

export const getBook = bookID => {
  const books = getAllBooks();
  return books.find(book => book.id === bookID);
};

export const updateBook = (bookFind, updateBook) => {
  const bookFound = getAllBooks().find(book => book === bookFind);

  getAllBooks().Object.assign(bookFound, updateBook);

  return updateBook;
};
