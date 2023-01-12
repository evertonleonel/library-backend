import express from 'express';
import { route as routes } from './routes.js';
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Express conseguirá ler json.

app.use(routes);

//Invocando as rotas

app.listen(3000, () => {
  console.log('Acess: http://localhost:3000');
  console.log('Server started port 3000💀');
});
// O listen vai garantir que a porta escolhida retorne a resposta da nossa rota
