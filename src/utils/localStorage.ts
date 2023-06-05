import { CartItemI } from '../types/Cart';

export const addCartToLocalStorage = (cart: CartItemI[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeCartFromStorage = () => {
  localStorage.removeItem('cart');
};

export const getCartFromStorage = () => {
  const result = localStorage.getItem('cart');
  const cart = result ? JSON.parse(result) : [];
  return cart;
};

export const addTokenToLocalStorage = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token');
};

export const getTokenFromStorage = () => {
  const result = localStorage.getItem('access_token');
  const token = result ? result : null;
  return token;
};
