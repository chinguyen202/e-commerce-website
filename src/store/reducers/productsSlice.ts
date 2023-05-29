import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ProductsState, SortPayload, FilterOptions } from '../../types/Product';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  fetchSingleProduct,
  updateProduct,
} from '../store';
import { Category } from '../../types/Category';

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
  filterOptions: {
    minPrice: 0,
    maxPrice: 0,
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
          if (state.isFilter) {
            state.sortedProducts = [...state.filterProducts].sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          } else {
            state.sortedProducts = [...state.products].sort((a, b) =>
              a.title.localeCompare(b.title)
            );
          }
          state.isSort = true;
          break;
        case 'NAME_DESC':
          if (state.isFilter) {
            state.sortedProducts = [...state.filterProducts].sort((a, b) =>
              b.title.localeCompare(a.title)
            );
          } else {
            state.sortedProducts = [...state.products].sort((a, b) =>
              b.title.localeCompare(a.title)
            );
          }
          state.isSort = true;
          break;
        case 'PRICE_HIGHEST':
          if (state.isFilter) {
            state.sortedProducts = [...state.filterProducts].sort(
              (a, b) => b.price - a.price
            );
          } else {
            state.sortedProducts = [...state.products].sort(
              (a, b) => b.price - a.price
            );
          }
          state.isSort = true;
          break;
        case 'PRICE_LOWEST':
          if (state.isFilter) {
            state.sortedProducts = [...state.filterProducts].sort(
              (a, b) => a.price - b.price
            );
          } else {
            state.sortedProducts = [...state.products].sort(
              (a, b) => a.price - b.price
            );
          }
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
      state.isSort = false;
      state.filterOptions = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        category: category,
      };
    },
    filterProductByCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;
      if (state.filterProducts.length <= 0) {
        if (category) {
          state.filterProducts = state.products.filter(
            (product) => product.category.id === category.id
          );
        }
      } else {
        if (category) {
          state.filterProducts = state.filterProducts.filter(
            (product) => product.category.id === category.id
          );
        }
      }
    },
    filterProductByPriceRange: (
      state,
      action: PayloadAction<FilterOptions>
    ) => {
      const { minPrice, maxPrice } = action.payload;
      if (state.filterProducts.length === 0) {
        console.log('TEST MIN');
        state.filterProducts = state.products.filter((product) => {
          return product.price >= minPrice && product.price <= maxPrice;
        });
      } else {
        state.filterProducts = state.filterProducts.filter((product) => {
          return product.price >= minPrice && product.price <= maxPrice;
        });
      }
    },
    clearFilters: (state) => {
      state.filterProducts = initialState.filterProducts;
      state.isFilter = initialState.isFilter;
      state.isSort = initialState.isSort;
      state.filterOptions = initialState.filterOptions;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload as string);
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Create product success');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        toast.error(action.payload as string);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Update product success');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isError = true;
        toast.error(action.payload as string);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Create product success');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        toast.error(action.payload as string);
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortProducts } = productsSlice.actions;
export const { setGridView } = productsSlice.actions;
export const { searchProduct } = productsSlice.actions;
export const { updateFilters } = productsSlice.actions;
export const { clearFilters } = productsSlice.actions;
export const { filterProductByCategory } = productsSlice.actions;
export const { filterProductByPriceRange } = productsSlice.actions;
export default productsReducer;
