import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchCategories';
export * from './thunks/fetchProducts';
export * from './thunks/fetchSingleProduct';
export default store;
