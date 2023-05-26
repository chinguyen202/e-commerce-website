import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { CategoryData, Category } from '../../types/Category';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/categories');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data: CategoryData, thunkAPI) => {
    try {
      const response = await customFetch.post('/categories', data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateSingle',
  async (data: Category, thunkAPI) => {
    try {
      const response = await customFetch.put(`/categories/${data.id}`, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Error update category ${error.response.data.message}`
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteSingle',
  async (id: number, thunkAPI) => {
    try {
      const response = await customFetch.delete(`/categories/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Error when delete category: ${error.response.data.message}`
      );
    }
  }
);
