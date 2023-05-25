import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartItemI, CartAction } from '../../types/Cart';
import { Product } from '../../types/Product';

const initialState: Cart = {
  cartItems: [],
  total: 0,
  totalAmount: 2,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItem: (state, action: PayloadAction<CartAction>) => {
      const { product, amount } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingItem) {
        // If the product is already in the cart, increase the amount
        existingItem.amount += 1;
      } else {
        // const { title, price, description, category, images } = product;
        const cartItem: CartItemI = {
          ...product,
          amount: amount,
        };
        state.cartItems.push(cartItem);
      }
    },
    removeItem: (state, action: PayloadAction<CartItemI>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increaseAmount: (state, action: PayloadAction<Product | CartItemI>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) cartItem.amount = cartItem?.amount + 1;
    },
    decreaseAmount: (state, action: PayloadAction<Product | CartItemI>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) cartItem.amount = cartItem?.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let totalPrice = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        totalPrice += item.amount * item.price;
      });
      state.totalAmount = amount;
      state.total = totalPrice;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calculateTotal,
  addItem,
} = cartSlice.actions;
export default cartSlice.reducer;
