import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../types/Product';
import fetchSingleProduct from '../thunks/fetchSingleProduct';

const initialState: ProductState = {
  product: null,
  isLoading: false,
  isError: false,
  error: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message || 'Unknown error occurred';
    });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
