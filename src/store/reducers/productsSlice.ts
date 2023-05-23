import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductsState, SortPayload, FilterOptions } from '../../types/Product';
import { Category } from '../../types/Category';
import { fetchCategories, fetchProducts, fetchSingleProduct } from '../store';

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
  productsByCategory: [],
  categories: [],
  filterOptions: {
    minPrice: null,
    maxPrice: null,
    category: null,
  },
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
    searchProduct: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      state.isFilter = true;
      state.filterProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    },
    updateFilters: (state, action: PayloadAction<FilterOptions>) => {
      const { minPrice, maxPrice, category } = action.payload;
      state.isFilter = true;
      state.filterOptions = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        category: category,
      };
    },
    filterProduct: (state, action: PayloadAction<FilterOptions>) => {
      const { category, minPrice, maxPrice } = action.payload;
      if (state.filterProducts.length <= 0) {
        if (category) {
          state.filterProducts = state.products.filter(
            (product) => product.category.id === category.id
          );
        }
        if (minPrice && maxPrice) {
          state.filterProducts = state.products.filter((product) => {
            return product.price >= minPrice && product.price <= maxPrice;
          });
        }
      } else {
        if (category) {
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category.id === category.id
          );
        }
        if (minPrice !== null && maxPrice !== null) {
          state.filterProducts = state.filterProducts.filter((product) => {
            return product.price >= minPrice && product.price <= maxPrice;
          });
        }
      }
    },
    clearFilters: (state, action) => {
      state.filterProducts = initialState.filterProducts;
      state.isFilter = initialState.isFilter;
      state.filterOptions = initialState.filterOptions;
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
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortProducts } = productsSlice.actions;
export const { setGridView } = productsSlice.actions;
export const { searchProduct } = productsSlice.actions;
export const { updateFilters } = productsSlice.actions;
export const { clearFilters } = productsSlice.actions;
export const { filterProduct } = productsSlice.actions;
export default productsReducer;
