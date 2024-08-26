import {IUserModel} from '~/type/users';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {create, fetch, permanentlyDelete, update, updatePassword} from './actions';

type TState = {
  users: {
    loading: boolean;
    result: IUserModel[];
    error?: any;
  };
  create: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  update: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  delete: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  updatePassword: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
};

const initialState: TState = {
  users: {
    loading: false,
    result: [],
  },
  create: {
    loading: false,
    success: false,
    error: false,
  },
  update: {
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    loading: false,
    success: false,
    error: false,
  },
  updatePassword: {
    loading: false,
    success: false,
    error: false,
  },
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setStatusDefault(
      state,
      action: PayloadAction<{
        key: 'create' | 'update' | 'updatePassword';
        action: 'success' | 'error';
      }>
    ) {
      state[action.payload.key][action.payload.action] = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.users.loading = true;
        state.users.error = {};
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.result = action.payload;
        state.users.error = {};
      })
      .addCase(fetch.rejected, (state, action) => {
        state.users.loading = false;
        state.users.result = [];
        state.users.error = action.error;
      });

    builder
      .addCase(update.pending, (state) => {
        state.update.loading = true;
        state.update.success = false;
        state.update.error = false;
      })
      .addCase(update.fulfilled, (state) => {
        state.update.loading = false;
        state.update.success = true;
        state.update.error = false;
      })
      .addCase(update.rejected, (state) => {
        state.update.loading = false;
        state.update.success = false;
        state.update.error = true;
      });

    builder
      .addCase(updatePassword.pending, (state) => {
        state.updatePassword.loading = true;
        state.updatePassword.success = false;
        state.updatePassword.error = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.updatePassword.loading = false;
        state.updatePassword.success = true;
        state.updatePassword.error = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.updatePassword.loading = false;
        state.updatePassword.success = false;
        state.updatePassword.error = true;
      });

    builder
      .addCase(create.pending, (state) => {
        state.create.loading = true;
        state.create.success = false;
        state.create.error = false;
      })
      .addCase(create.fulfilled, (state) => {
        state.create.loading = false;
        state.create.success = true;
        state.create.error = false;
      })
      .addCase(create.rejected, (state) => {
        state.create.loading = false;
        state.create.success = false;
        state.create.error = true;
      });

    builder
      .addCase(permanentlyDelete.pending, (state) => {
        state.delete.loading = true;
        state.delete.success = false;
        state.delete.error = false;
      })
      .addCase(permanentlyDelete.fulfilled, (state) => {
        state.delete.loading = false;
        state.delete.success = true;
        state.delete.error = false;
      })
      .addCase(permanentlyDelete.rejected, (state) => {
        state.delete.loading = false;
        state.delete.success = false;
        state.delete.error = true;
      });
  },
});

// > Export
// * Action
export const actions = {...slice.actions, fetch, create, update, updatePassword, permanentlyDelete};
// * Reducer
export const {reducer} = slice;
