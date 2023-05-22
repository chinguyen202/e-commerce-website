import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productUrl } from '../../utils/constants';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get(productUrl);
  return response.data;
});
