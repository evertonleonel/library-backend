import { allBooks as books } from '../books/allBooks.js';

/* 
-------------------------------
         ATUALIZAR LIVRO
-------------------------------
*/

export const putBookUpdate = (request, response) => {
  const { idBook } = request.params;
  const { tittle, author, genre, image, systemEntryDate, synopsis } =
    request.body;

  const indexBook = books.findIndex(item => item.id === idBook);

  if (indexBook < 0) {
    return response.status(404).json({ error: 'Book not found!' });
    //Se não encontrou nada, retornamos um erro
  }

  if (!tittle || !author || !genre || !image || !systemEntryDate || !synopsis) {
    return response.status(400).json({
      error:
        'Possible information is missing: tittle, author, genre, image,systemEntryDate, synopsis ',
    });
    //Status 400 pois é uma bad request.
  }

  const updateBook = {
    ...books[indexBook],
    tittle,
    author,
    genre,
    image,
    systemEntryDate,
    synopsis,
  };

  books[indexBook] = updateBook;

  return response.json(updateBook);
};
