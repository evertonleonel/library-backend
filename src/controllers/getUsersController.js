import { users } from '../users/allUsers.js';

export const getUsers = (request, response) => {
  return response.json(users);
};

export const getUserEmail = (request, response) => {
  const { email } = request.params;
  const findEmail = users.find(user => user.email === email);
  return response.status(200).send(findEmail);
};
