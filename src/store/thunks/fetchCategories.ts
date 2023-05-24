import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { categoryUrl } from '../../utils/constants';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(categoryUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'There is an error in fetching categories'
      );
    }
  }
);
