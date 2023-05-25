import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';

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
