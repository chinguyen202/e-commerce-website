import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateInfo,
  updateAvatar,
} from '../store';
import { UserState } from '../../types/User';
import {
  addTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from '../../utils/localStorage';

const initialState: UserState = {
  isAuth: false,
  users: [],
  isLoading: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIsAuth: (state) => {
      state.isAuth = true;
    },
    logoutUser: (state) => {
      state.isAuth = false;
      state.currentUser = null;
      removeTokenFromLocalStorage();
      toast.success('Log out succesfully!');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token } = action.payload;
        state.isLoading = false;
        state.isAuth = true;
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
        state.isLoading = false;
        state.isAuth = true;
        state.currentUser = action.payload;
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
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        const errorMessage = action.payload as string;
        toast.error(errorMessage);
      })
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        toast.success('Update avatar successfully!');
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.isLoading = false;
        const error = action.payload as string;
        toast.error(error);
      })
      .addCase(updateInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        toast.success('Update info successfully!');
      })
      .addCase(updateInfo.rejected, (state, action) => {
        state.isLoading = false;
        const error = action.payload as string;
        toast.error(error);
      });
  },
});

export const { logoutUser } = userSlice.actions;
export const { updateIsAuth } = userSlice.actions;
export default userSlice.reducer;
