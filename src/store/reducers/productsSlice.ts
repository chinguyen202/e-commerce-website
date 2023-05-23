import { createSlice } from '@reduxjs/toolkit';
import { ProductsState } from '../../types/Product';
import { fetchProducts } from '../store';

const initialState: ProductsState = {
  products: [],
  isError: false,
  isLoading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error?.message || 'Unknown error occurred';
      state.isLoading = false;
    });
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
