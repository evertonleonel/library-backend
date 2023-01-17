import { allBooks as books } from '../books/allBooks.js';
import { randomUUID } from 'crypto';
import { createBook } from '../repositories/booksRepository.js';

/* 
-------------------------------
          EMPRESTAR LIVRO
-------------------------------
*/
export const postBookLend = (request, response) => {
  const { idBook } = request.params;
  const { studentName, className, withdrawalDate, deliveryDate } = request.body;

  if (!studentName || !className || !withdrawalDate || !deliveryDate) {
    return response.status(400).json({
      error:
        'Possible information is missing:studentName,className,withdrawalDate, systemEntryDate ',
    });
  }

  if (new Date(withdrawalDate).valueOf > new Date(deliveryDate).valueOf) {
    return response
      .status(204)
      .json({ error: 'Entry date cannot be greater than withdrawal date' });
  }

  const indexBook = books.findIndex(item => item.id === idBook);

  if (indexBook < 0) {
    return response.status(404).json({ error: 'Book not found' });
  }

  const newRentHistory = {
    studentName,
    className,
    withdrawalDate,
    deliveryDate,
    id: randomUUID(),
  };

  books[indexBook].rentHistory.push(newRentHistory);

  return response.status(201).json(newRentHistory);
};

/* 
-------------------------------
          CRIAR LIVRO
-------------------------------
*/
export const postBookCreate = (request, response) => {
  const { tittle, author, genre, systemEntryDate, synopsis } = request.body;
  const image = request.file;

  console.log(image);

  if (!tittle || !author || !genre || !systemEntryDate || !synopsis) {
    return response.status(400).json({
      error:
        'Possible information is missing: tittle, author, genre,image,systemEntryDate, synopsis ',
    });
  }

  const newBook = {
    id: randomUUID(),
    tittle,
    author,
    genre,
    status: {
      description: '',
      isActive: true,
    },
    image: request.imageName,
    systemEntryDate,
    synopsis,
    rentHistory: [],
  };

  createBook(newBook);

  return response.status(201).json(newBook);
};
