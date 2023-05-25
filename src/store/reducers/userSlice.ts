import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateUser,
} from '../store';
import { UserState } from '../../types/User';
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getTokenFromStorage,
  getUserFromStorage,
} from '../../utils/localStorage';

const initialState: UserState = {
  token: getTokenFromStorage(),
  users: [],
  isLoading: false,
  currentUser: getUserFromStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {},
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token } = action.payload;
        state.isLoading = false;
        addTokenToLocalStorage(access_token);
        toast.success(`Welcome back`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload as string);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.currentUser = user;
        addUserToLocalStorage(action.payload);
        toast.success(`Welcome to join us!`);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload as string;
        toast.error(errorMessage);
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.error as string);
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        addUserToLocalStorage(action.payload);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload as string;
        toast.error(errorMessage);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        const error = action.payload as string;
        toast.error(error);
      });
  },
});

export default userSlice.reducer;
