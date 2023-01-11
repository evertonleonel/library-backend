# Backend Library

### _Concepts and definitions_

Made to simulate a backend and replace using json server.

## Tech

Backend Library uses a number of open source projects to work properly:

- node.js - evented I/O for the backend;
- Express - fast node.js network app framework. Used to make the creation and management of routes and requests more flexible;
- Nodemon - library used to automate any project update;
- Middleware - Handle requests before they are handled by the routes themselves.

## Installation

Backend Library requires [Node.js](https://nodejs.org/) v18+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i
```

How to start

```sh
npm run dev
```

## ROUTES

Requests available

| METHOD | PATH                                          | DESCRIPTION                 |
| ------ | --------------------------------------------- | --------------------------- |
| GET    | http:localhost/3000/books                     | fetch all books             |
| GET    | http:localhost/3000/books/:idBook             | fetch book                  |
| GET    | http:localhost/3000/books/rentHistories       | search all loan histories   |
| GET    | http:localhost/3000/books/:idBook/rentHistory | search loan history by book |
| POST   | http:localhost/3000/books                     | create new book             |
| POST   | http:localhost/3000/books/:id/lend            | borrow book                 |
| PUT    | http:localhost/3000/books/:id/update          | uptade book                 |
| PATCH  | http:localhost/3000/books/:idBook/:idRent     | return book                 |
| PATCH  | http:localhost/3000/books/:idBook/inactive    | inactivate book             |
| PATCH  | http:localhost/3000/books/:idBook/active      | activate book               |

You can also change localhost to whatever you like. Just remember to update
the index.js in app.listen the new port number
Follow examples

```sh
app.listen(3333, () -> {
 console.log('Server Started on port 3333💀')
});
```
