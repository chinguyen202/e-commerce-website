import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../../types/Cart';

const initialState: Cart = {
  cartItem: [],
  totalPrice: 0,
  amount: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});
export default cartSlice.reducer;
