import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { productUrl } from '../../utils/constants';

const fetchSingleProduct = createAsyncThunk(
  'product/fetch',
  async (id: string) => {
    const response = await axios.get(`${productUrl}/${id}`);
    return response.data;
  }
);

export default fetchSingleProduct;
