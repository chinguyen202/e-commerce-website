import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { ProductData } from '../../types/Product';

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data: ProductData, thunkAPI) => {
    try {
      const response = await customFetch.post('/products/');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch('/products');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'product/fetch',
  async (id: string, thunkAPI) => {
    try {
      const response = await customFetch(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
