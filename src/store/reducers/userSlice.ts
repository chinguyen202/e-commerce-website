import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  fetchAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateInfo,
} from '../store';
import { UserState } from '../../types/User';
import {
  addTokenToLocalStorage,
  getTokenFromStorage,
  removeTokenFromLocalStorage,
} from '../../utils/localStorage';

const initialState: UserState = {
  isAuth: getTokenFromStorage() ? true : false,
  users: [],
  isLoading: false,
  currentUser: null,
  token: getTokenFromStorage() ?? undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.isAuth = false;
      state.token = undefined;
      state.currentUser = initialState.currentUser;
      removeTokenFromLocalStorage();
      toast.success('Log out successfully!');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { access_token } = action.payload;
        state.isLoading = false;
        state.isAuth = true;
        state.token = access_token;
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
export default userSlice.reducer;
