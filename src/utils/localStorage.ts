import { User } from '../types/User';

export const addUserToLocalStorage = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromStorage = (user: User) => {
  localStorage.removeItem(JSON.stringify(user));
};

export const getUserFromStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addTokenToLocalStorage = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const removeTokenFromLocalStorage = (token: string) => {
  localStorage.removeItem(token);
};

export const getTokenFromStorage = () => {
  const result = localStorage.getItem('access_token');
  const token = result ? result : null;
  return token;
};
