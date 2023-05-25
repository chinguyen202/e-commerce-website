import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';

export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch('/users');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async (id: number, thunkAPI) => {
    try {
      const response = await customFetch(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
