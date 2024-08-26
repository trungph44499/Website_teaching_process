import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetch} from './actions';
import {IPermissionModel} from '~/type/permission';

type TState = {
  permissions: {
    loading: boolean;
    result: IPermissionModel[];
    error?: any;
  };
};

const initialState: TState = {
  permissions: {
    loading: false,
    result: [],
  },
};

export const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.permissions.loading = true;
        state.permissions.error = {};
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.permissions.loading = false;
        state.permissions.result = action.payload;
        state.permissions.error = {};
      })
      .addCase(fetch.rejected, (state, action) => {
        state.permissions.loading = false;
        state.permissions.result = [];
        state.permissions.error = action.error;
      });
  },
});

// > Export
// * Action
export const actions = {...slice.actions, fetch};
// * Reducer
export const {reducer} = slice;
