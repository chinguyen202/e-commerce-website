import { createSlice } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../store';
import { CategoryState } from '../../types/Category';
import { toast } from 'react-toastify';

const initialState: CategoryState = {
  selectedCategory: null,
  categories: [],
  isLoading: false,
  isError: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
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
        toast.error(action.payload as string);
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Create category success.');
      })
      .addCase(createCategory.rejected, (state) => {
        state.isError = true;
        toast.error('Error in creating category. Please try again!');
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success('Update category successfully');
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload as string);
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success('Delete category successfully');
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload as string);
      });
  },
});

export default categorySlice.reducer;
