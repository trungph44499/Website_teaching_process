import {TUserResponse} from '~/models/Auth.model';
import {createSlice} from '@reduxjs/toolkit';
import {getUserLogin} from './actions';
import api from '~/api';

type TState = {
  loading: boolean;
  user: TUserResponse | null;
  isAuthenticated: boolean;
  error?: string;
};

const initialState: TState = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')!),
  error: '',
  isAuthenticated: false,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      const isLogin = !!api.getToken() && !!localStorage.getItem('user');
      state.isAuthenticated = isLogin;
      if (!isLogin) state.user = null;
    },
    logout: (state) => {
      api.removeToken();
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      state.user = null;
    },
    login: (state, action) => {
      state.user = action.payload.user;
      api.setToken(action.payload.accessToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      state.isAuthenticated = true;
    },
    getUserLocal: (state) => {
      state.user = JSON.parse(localStorage.getItem('user')!) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Action
export const actions = {...slice.actions, getUserLogin};
// Reducer
export const {reducer} = slice;
