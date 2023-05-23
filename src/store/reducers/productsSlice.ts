import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsState, SortPayload } from '../../types/Product';
import { fetchProducts, fetchSingleProduct } from '../store';

const initialState: ProductsState = {
  products: [],
  product: null,
  filterProducts: [],
  sortedProducts: [],
  isFilter: false,
  isSort: false,
  gridView: true,
  isLoading: false,
  isError: false,
  error: '',
  filterOptions: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    sortProducts: (state, action: PayloadAction<SortPayload>) => {
      const { sortType } = action.payload;
      switch (sortType) {
        case 'NAME_ASC':
          state.sortedProducts = [...state.products].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          state.isSort = true;
          break;
        case 'NAME_DESC':
          state.sortedProducts = [...state.products].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          state.isSort = true;
          break;
        case 'PRICE_HIGHEST':
          state.sortedProducts = [...state.products].sort(
            (a, b) => b.price - a.price
          );
          state.isSort = true;
          break;
        case 'PRICE_LOWEST':
          state.sortedProducts = [...state.products].sort(
            (a, b) => a.price - b.price
          );
          state.isSort = true;
          break;
        default:
          return;
      }
    },
    setGridView: (state, action: PayloadAction<boolean>) => {
      state.gridView = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.error = action.error?.message || 'Unknown error occurred';
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || 'Unknown error occurred';
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortProducts } = productsSlice.actions;
export const { setGridView } = productsSlice.actions;
export default productsReducer;
