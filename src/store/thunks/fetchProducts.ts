import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productUrl } from '../../utils/constants';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(productUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error in fetching all products');
    }
  }
);
