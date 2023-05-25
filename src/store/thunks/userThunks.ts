import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginData, RegisterData } from '../../types/User';
import customFetch from '../../utils/axios';
import { UpdateUserData } from '../../types/User';

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

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, email, password }: UpdateUserData, thunkAPI) => {
    try {
      const response = customFetch.put(`/users/${id}`, { email, password });
      return (await response).data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
