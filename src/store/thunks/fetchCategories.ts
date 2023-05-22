import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { categoryUrl } from '../../utils/constants';

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const response = await axios.get(categoryUrl);
    return response.data;
  }
);
