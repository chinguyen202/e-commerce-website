import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { categoryUrl } from '../../utils/constants';

export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProducts',
  async (id: number) => {
    try {
      const response = await axios.get(`${categoryUrl}/${id}/products`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
