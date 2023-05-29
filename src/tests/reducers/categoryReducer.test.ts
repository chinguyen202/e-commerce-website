import categoryReducer from '../../store/reducers/categorySlice';
import { configureStore } from '@reduxjs/toolkit';

describe('category reducer functionality', () => {
  const initialState = {
    selectedCategory: null,
    categories: [],
    isLoading: false,
    isError: false,
  };
  it('Check initial state', () => {
    expect(categoryReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
});
