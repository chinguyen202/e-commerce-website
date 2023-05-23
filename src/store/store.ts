import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './reducers/categoriesSlice';
import productsReducer from './reducers/productsSlice';
import productReducer from './reducers/productSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    product: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchCategories';
export * from './thunks/fetchProducts';
export * from './thunks/fetchSingleProduct';
export * from './thunks/fetchProductsByCategory';
export default store;
