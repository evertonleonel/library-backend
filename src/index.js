import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { v4 as uuidv4 } from "uuid";
import { allBooks } from "./routes/books/allBooks.mjs";

const express = require("express");
export const app = express();

app.use(express.json());
//Pedimos para o express passar a considerar o padrão json nas rotas.

const id = uuidv4();
// Identificador único universal

const books = allBooks;

function logRoutes(request, response, next) {
  const { method, url } = request;
  const route = `[${method.toUpperCase()}] ${url}`;
  console.log(route);

  return next();
}

app.use(logRoutes);
// Invocando o middleware

/* 
-------------------------------
       TODAS AS ROTAS
-------------------------------
*/

/*
  ATIVAR LIVRO
*/

app.patch("/books/active/:idBook", function (request, response) {
  const { idBook } = request.params;

  const indexBook = books.findIndex((item) => item.id === idBook);
  const bookFind = books.find((item) => item.id === idBook);

  if (indexBook < 0) {
    return response.status(404).json({ error: "Book not found" });
  }

  const updateStatus = {
    description: "",
    isActive: true,
  };

  bookFind.status = updateStatus;

  books[indexBook] = bookFind;

  return response.status(204).send();
});

/*-------------------------------
        BUSCAR HISTORICO DO LIVRO
-------------------------------
*/
app.get("/book/:idBook/rentHistorys/", function (request, response) {
  const { idBook } = request.params;

  const indexBook = books.findIndex((item) => item.id === idBook);
  const bookFind = books[indexBook];

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: "Project not found" });
  }

  const rentHistoryBook = bookFind.rentHistory;

  return response.json(rentHistoryBook);
});

/* 
-------------------------------
        BUSCAR TODOS HISTORICOS
-------------------------------
*/
app.get("/books/allRentHistorys", function (request, response) {
  const allRentHistorys = books.map((book) => {
    if (book.rentHistory.length > 0) {
      return book.rentHistory;
    }
  });

  return response.json(allRentHistorys);
});

/* 
-------------------------------
        BUSCAR TODOS OS LIVROS
-------------------------------
*/
app.get("/books", function (request, response) {
  return response.json(books);
});

/* 
-------------------------------
          CRIAR LIVRO
-------------------------------
*/
app.post("/books", function (request, response) {
  const { tittle, author, genre, image, systemEntryDate, synopsis } =
    request.body;
  const newBook = {
    id: uuidv4(),
    tittle,
    author,
    genre,
    status: {
      description: "",
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
app.put("/books/:idBook", function (request, response) {
  const { idBook } = request.params;
  const {
    id,
    tittle,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  } = request.body;

  const indexBook = books.findIndex((item) => item.id === idBook);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: "Project not found" });
  }

  if (
    !id ||
    !tittle ||
    !author ||
    !genre ||
    !status ||
    !image ||
    !systemEntryDate ||
    !synopsis ||
    !rentHistory
  ) {
    return response.status(400).json({
      error:
        "Possible information is missing:id, tittle, author, genre, status, image,systemEntryDate, synopsis, rentHistory ",
    });
    //Status 400 pois é uma bad request.
  }
  //É necessário passar todas informações do livro para altera-lo

  const updateBook = {
    id,
    tittle,
    author,
    genre,
    status,
    image,
    systemEntryDate,
    synopsis,
    rentHistory,
  };

  books[indexBook] = updateBook;

  return response.json(updateBook);
});

/* 
-------------------------------
          DELETAR LIVRO
-------------------------------
*/
app.delete("/books/:idBook", function (request, response) {
  const { idBook } = request.params;

  const indexBook = books.findIndex((item) => item.id === idBook);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: "Project not found" });
  }

  books.splice(indexBook, 1);
  //Posição do item para apagar e a quantidade

  return response.status(204).send();
  // Como não tem conteúdo, passamos um send ao invés do json.
  // Status 204 para avisar o usuário que seu delete funcionou
});

app.listen(3000, () => {
  console.log("Server Started on port 3000! 💀");
});
// O listen vai garantir que a porta escolhida retorne a resposta da nossa rota

/* 
-------------------------------
          EMPRESTAR LIVRO
-------------------------------
*/

app.post("/books/:idBook", function (request, response) {
  const { idBook } = request.params;
  const { studentName, className, withdrawalDate, deliveryDate } = request.body;

  const indexBook = books.findIndex((item) => item.id === idBook);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: "Project not found" });
  }

  if (!studentName || !className || !withdrawalDate || !deliveryDate) {
    return response.status(400).json({
      error:
        "Possible information is missing:id, tittle, author, genre, status, image,systemEntryDate, synopsis, rentHistory ",
    });
    //Status 400 pois é uma bad request.
  }
  //É necessário passar todas informações do livro para altera-lo

  const newRentHistory = {
    studentName,
    className,
    withdrawalDate,
    deliveryDate,
    id: uuidv4(),
    isBorrowed: true,
  };

  books[indexBook].rentHistory.push(newRentHistory);

  return response.status(201).json(newRentHistory);
});

/* 
-------------------------------
          DEVOLVER LIVRO
-------------------------------
*/
app.patch("/books/:idBook/:idRent", function (request, response) {
  const { idBook, idRent } = request.params;
  const { studentName, className, withdrawalDate, deliveryDate, isBorrowed } =
    request.body;

  const indexBook = books.findIndex((item) => item.id === idBook);
  const bookFind = books.find((item) => item.id === idBook);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: "Book not found" });
  }

  const indexRent = bookFind.rentHistory.findIndex(
    (item) => item.id === idRent
  );

  if (indexRent < 0) {
    return response.status(404).json({ error: "RentHistory not found" });
  }

  if (!studentName || !className || !withdrawalDate || !deliveryDate) {
    return response.status(400).json({
      error: "Possible information is missing:id, deliveryDate ",
    });
  }

  const updateRentHistory = {
    studentName,
    className,
    withdrawalDate,
    deliveryDate,
    id: idRent,
    isBorrowed: false,
  };

  books[indexBook].rentHistory[indexRent] = updateRentHistory;

  return response.status(200).json(updateRentHistory);
});

/*
  INATIVAR LIVRO
*/

app.patch("/books/:idBook", function (request, response) {
  const { idBook } = request.params;
  const { description } = request.body;

  const indexBook = books.findIndex((item) => item.id === idBook);
  const bookFind = books.find((item) => item.id === idBook);

  if (indexBook < 0) {
    //Se não encontrou nada, retornamos um erro
    return response.status(404).json({ error: "Book not found" });
  }

  if (!description) {
    return response.status(400).json({
      error: "Description required",
    });
  }

  const updateStatus = {
    description,
    isActive: false,
  };

  bookFind.status = updateStatus;

  books[indexBook] = bookFind;

  return response.status(200).json(updateStatus);
});
