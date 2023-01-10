import express from 'express';
import { allBooks as books } from './routes/books/allBooks.mjs';
const { randomUUID } = require('crypto');

const express = require('express');
export const app = express();

app.use(express.json());
//Pedimos para o express passar a considerar o padrão json nas rotas.

/* 
-------------------------------
       TODAS AS ROTAS
-------------------------------
*/

/*  
  ATIVAR LIVRO
*/

app.patch('/books/:idBook/active', function (request, response) {
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
});

/*-------------------------------
        BUSCAR HISTORICO DO LIVRO
-------------------------------
*/
app.get('/books/:idBook/rentHistory', function (request, response) {
  const { idBook } = request.params;

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: 'Project not found' });
  }

  return response.json(bookFind.rentHistory);
});

/* 
-------------------------------
        BUSCAR TODOS HISTORICOS
-------------------------------
*/
app.get('/books/rentHistories', function (request, response) {
  const rentHistories = books.map(book => {
    if (book.rentHistory.length > 0) {
      return book.rentHistory;
    }
  });

  return response.json(rentHistories);
});

/* 
-------------------------------
        BUSCAR LIVROS
-------------------------------
*/
app.get('/books/:idBook', function (request, response) {
  const { idBook } = request.params;

  const indexBook = books.findIndex(item => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: 'Book not found' });
  }
  return response.json(bookFind);
});

/* 
-------------------------------
        BUSCAR TODOS OS LIVROS
-------------------------------
*/
app.get('/books', function (request, response) {
  return response.json(books);
});

/* 
-------------------------------
          CRIAR LIVRO
-------------------------------
*/
app.post('/books', function (request, response) {
  const { tittle, author, genre, image, systemEntryDate, synopsis } =
    request.body;

  if (!tittle || !author || !genre || !image || !systemEntryDate || !synopsis) {
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
    image,
    systemEntryDate,
    synopsis,
    rentHistory: [],
  };

  books.push(newBook);

  return response.status(201).json(newBook);
  //status 201 = sucesso na criação de um recurso
});

/* 
-------------------------------
         ATUALIZAR LIVRO
-------------------------------
*/
app.put('/books/:idBook/update', function (request, response) {
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
});

/* 
-------------------------------
          EMPRESTAR LIVRO
-------------------------------
*/

app.post('/books/:idBook/lend', function (request, response) {
  const { idBook } = request.params;
  const { studentName, className, withdrawalDate, deliveryDate } = request.body;

  if (!studentName || !className || !withdrawalDate || !deliveryDate) {
    return response.status(400).json({
      error:
        'Possible information is missing:studentName,className,withdrawalDate, systemEntryDate ',
    });
    //Status 400 pois é uma bad request.
  }

  if (new Date(withdrawalDate).valueOf > new Date(deliveryDate).valueOf) {
    return response
      .status(204)
      .json({ error: 'Entry date cannot be greater than withdrawal date' });
  }

  const indexBook = books.findIndex(item => item.id === idBook);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
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
});

/* 
-------------------------------
          DEVOLVER LIVRO
-------------------------------
*/
app.patch('/books/:idBook/returned/:idRent', function (request, response) {
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
});

/*
  INATIVAR LIVRO
*/

app.patch('/books/:idBook/inactive', function (request, response) {
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
});

app.listen(3000, () => {
  console.log('Server Started on port 3000! 💀');
});
// O listen vai garantir que a porta escolhida retorne a resposta da nossa rota
