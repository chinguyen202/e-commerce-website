import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import cartReducer from './reducers/cartSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export * from './thunks/categoryThunks';
export * from './thunks/userThunks';
export * from './thunks/productThunks';
export default store;
