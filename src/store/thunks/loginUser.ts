import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, RegisterData } from '../../types/User';
import customFetch from '../../utils/axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/login', data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (token: string, thunkAPI) => {
    try {
      const response = await customFetch.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: RegisterData, thunkAPI) => {
    try {
      const response = await customFetch.post('/users', userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
