import {
  getBook as findBook,
  updateBook as updateFindBook,
} from '../repositories/booksRepository.js';

/* 
-------------------------------
         ATUALIZAR LIVRO
-------------------------------
*/

export const putBookUpdate = (request, response) => {
  const { idBook } = request.params;
  const { tittle, author, genre, image, systemEntryDate, synopsis } =
    request.body;

  const book = findBook(idBook);

  if (!book) {
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
    ...book,
    tittle,
    author,
    genre,
    image,
    systemEntryDate,
    synopsis,
  };

  updateFindBook(book, updateBook);

  return response.json(updateBook);
};
