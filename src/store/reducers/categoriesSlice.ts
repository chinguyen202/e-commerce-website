import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../../types/Category';
import { fetchCategories } from '../store';

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  isError: false,
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
    });
  },
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;
