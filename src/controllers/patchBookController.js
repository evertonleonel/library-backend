import { allBooks as books } from '../books/allBooks.js';
/* 
-------------------------------
          DEVOLVER LIVRO
-------------------------------
*/
export const patchBookReturn = (request, response) => {
  const { idBook, idRent } = request.params;

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  const rentIndex = bookFind.rentHistory.findIndex(rent => rent.id === idRent);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: 'Book not found' });
  }

  const indexRent = bookFind.rentHistory.findIndex(item => item.id === idRent);

  if (indexRent < 0) {
    return response.status(404).json({ error: 'RentHistory not found' });
  }

  const updateRenthistory = {
    ...bookFind.rentHistory[rentIndex],
    deliveryDate: new Date().toISOString(),
  };

  return response.status(200).json(updateRenthistory);
};

/*  
  ATIVAR LIVRO
*/

export const patchBookActive = (request, response) => {
  const { idBook } = request.params;

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    return response.status(404).json({ error: 'Book not found' });
  }

  const updateStatus = {
    description: '',
    isActive: true,
  };

  bookFind.status = updateStatus;

  return response.status(204).send();
};

/*
  INATIVAR LIVRO
*/

export const patchBookInactive = (request, response) => {
  const { idBook } = request.params;
  const { description } = request.body;

  if (!description) {
    return response.status(400).json({
      error: 'Description required',
    });
  }

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: 'Book not found' });
  }

  const updateStatus = {
    description,
    isActive: false,
  };

  bookFind.status = updateStatus;

  return response.status(200).json(updateStatus);
};
