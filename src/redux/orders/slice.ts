import {createSlice} from '@reduxjs/toolkit';
import {fetch, update, read, create, remove, applyOrder, cancelApplyOrder} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: [],
  },
  get: {
    loading: false,
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
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch
    builder.addCase(fetch.pending, (state) => {
      state.list.loading = true;
      state.list.error = {};
    });
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.result = action.payload;
      state.list.error = {};
      console.log('state.list.result: ', state.list.result);
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.list.loading = false;
      state.list.result = undefined;
      state.list.error = action.error;
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
    //read
    builder.addCase(read.pending, (state) => {
      (state.get.loading = true), (state.get.result = undefined), (state.get.error = {});
    });
    builder.addCase(read.fulfilled, (state, action) => {
      (state.get.loading = false), (state.get.result = action.payload), (state.get.error = {});
    });
    builder.addCase(read.rejected, (state, action) => {
      (state.get.loading = false), (state.get.result = undefined), (state.get.error = action.error);
    });
    //create
    builder.addCase(create.pending, (state) => {
      (state.create.loading = true), (state.create.result = undefined), (state.create.error = {});
    });
    builder.addCase(create.fulfilled, (state, action) => {
      (state.create.loading = false),
        (state.create.result = action.payload),
        (state.create.error = {});
    });
    builder.addCase(create.rejected, (state, action) => {
      (state.create.loading = false),
        (state.create.result = undefined),
        (state.create.error = action.error);
    });
    //remove
    builder.addCase(remove.pending, (state) => {
      (state.delete.loading = true), (state.delete.result = undefined), (state.delete.error = {});
    });
    builder.addCase(remove.fulfilled, (state, action) => {
      (state.delete.loading = false),
        (state.delete.result = action.payload),
        (state.delete.error = {});
    });
    builder.addCase(remove.rejected, (state, action) => {
      (state.delete.loading = false),
        (state.delete.result = undefined),
        (state.delete.error = action.error);
    });
  },
});

// > Export
// * Action
export const actions = {
  ...slice.actions,
  fetch,
  update,
  read,
  create,
  remove,
  applyOrder,
  cancelApplyOrder,
};
// * Reducer
export const {reducer} = slice;
