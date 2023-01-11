import { allBooks as books } from '../books/allBooks.js';

/* 
-------------------------------
       BUSCAR HISTORICO DO LIVRO
-------------------------------
*/

export const getBookHistory = (request, response) => {
  const { idBook } = request.params;

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    return response.status(404).json({ error: 'Project not found' });
  }

  return response.json(bookFind.rentHistory);
};

/* 
-------------------------------
      BUSCAR TODOS  OS HISTORICOS
-------------------------------
*/

export const getBookHistories = (request, response) => {
  const rentHistories = books.map(book => {
    if (book.rentHistory.length > 0) {
      return book.rentHistory;
    }
  });

  return response.json(rentHistories);
};

/* 
-------------------------------
      BUSCAR POR LIVRO
-------------------------------
*/

export const getBook = (request, response) => {
  const { idBook } = request.params;

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: 'Book not found' });
  }
  return response.json(bookFind);
};

/* 
-------------------------------
   BUSCAR TODOS OS LIVROS
-------------------------------
*/
export const getBooks = (request, response) => {
  return response.json(books);
};
