import {createSlice} from '@reduxjs/toolkit';
import {read, update} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: [],
  },
  get: {
    loading: false,
    result: [],
  },
  create: {
    loading: false,
  },
  update: {
    loading: false,
    result: {},
  },
  delete: {
    loading: false,
  },
  deleteMultiple: {
    loading: false,
  },
};

export const slice = createSlice({
  name: 'paid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //read
    builder.addCase(read.pending, (state) => {
      state.get.loading = true;
    });
    builder.addCase(read.fulfilled, (state, action) => {
      state.get.result = action.payload;
      state.get.loading = false;
    });
    builder.addCase(read.rejected, (state, action) => {
      state.get.loading = false;
      state.get.error = action.error;
    });
    //update
    builder.addCase(update.pending, (state) => {
      (state.update.loading = true), (state.update.result = undefined), (state.update.error = {});
    });
    builder.addCase(update.fulfilled, (state, action) => {
      (state.update.loading = false),
        (state.update.result = action.payload),
        (state.update.error = {});
    });
    builder.addCase(update.rejected, (state, action) => {
      (state.update.loading = false),
        (state.update.result = undefined),
        (state.update.error = action.error);
    });
  },
});

// > Export
// * Action
export const actions = {...slice.actions, read, update};
// * Reducer
export const {reducer} = slice;
