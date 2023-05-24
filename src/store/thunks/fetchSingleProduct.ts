import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productUrl } from '../../utils/constants';

export const fetchSingleProduct = createAsyncThunk(
  'product/fetch',
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`${productUrl}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Error in getting product with id ${id}`);
    }
  }
);
