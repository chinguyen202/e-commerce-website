import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../../types/Category';
import { fetchCategories } from '../store';
import fetchProductsByCategory from '../thunks/fetchProductsByCategory';

const initialState: CategoryState = {
  categories: [],
  productsByCategory: [],
  isLoading: false,
  isError: false,
  error: '',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
    builder.addCase(fetchProductsByCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsByCategory = action.payload;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
