import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { ProductData } from '../../types/Product';

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data: ProductData, thunkAPI) => {
    try {
      const response = await customFetch.post('/products/', data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Error occurred: ${error.response.data.message}`
      );
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
      return thunkAPI.rejectWithValue(
        `Error fetching products ${error.response.data.message}`
      );
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
      return thunkAPI.rejectWithValue(
        `Error fetching product ${error.response.data.message}`
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async (data: ProductData, thunkAPI) => {
    try {
      const response = await customFetch.put(`/products/${data.id}`, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Updating product: ${error.response.data.message}`
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteSingle',
  async (id: number, thunkAPI) => {
    try {
      const response = await customFetch.delete(`/products/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Error when delete product: ${error.response.data.messages}`
      );
    }
  }
);
