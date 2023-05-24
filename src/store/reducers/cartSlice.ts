import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Cart, CartItemI } from '../../types/Cart';

const initialState: Cart = {
  cartItems: [
    {
      id: 4,
      title: 'Handmade Fresh Table',
      price: 687,
      description: 'Andy shoes are designed to keeping in...',
      category: {
        id: 5,
        name: 'Others',
        image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
      },
      images: [
        'https://placeimg.com/640/480/any?r=0.9178516507833767',
        'https://placeimg.com/640/480/any?r=0.9300320592588625',
        'https://placeimg.com/640/480/any?r=0.8807778235430017',
      ],
      amount: 0,
    },
  ],
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
    removeItem: (state, action: PayloadAction<CartItemI>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increaseAmount: (state, action: PayloadAction<CartItemI>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id == action.payload.id
      );
      if (cartItem) cartItem.amount = cartItem?.amount + 1;
    },
    decreaseAmount: (state, action: PayloadAction<CartItemI>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id == action.payload.id
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
} = cartSlice.actions;
export default cartSlice.reducer;
