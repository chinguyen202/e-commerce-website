import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from '../store';
import { CategoryState, Category } from '../../types/Category';

const initialState: CategoryState = {
  selectedCategory: null,
  categories: [],
  isLoading: false,
  isError: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;
