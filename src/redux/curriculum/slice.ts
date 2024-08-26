import {createSlice} from '@reduxjs/toolkit';
import {create, fetch, readone, removeMany, update} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: {items: [], pagination: {currentPage: 0, totalPages: 0, totalRecords: 0}},
    listone: {},
    // listStart: [],
  },
  get: {
    loading: false,
  },
  create: {
    loading: false,
  },
  update: {
    loading: false,
  },
  delete: {
    loading: false,
  },
  deleteMultiple: {
    loading: false,
  },
};

export const slice = createSlice({
  name: 'curriculumn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      (state.list.loading = true), (state.list.result = undefined), (state.list.error = {});
    });
    builder.addCase(fetch.fulfilled, (state, action) => {
      (state.list.loading = false), (state.list.result = action.payload), (state.list.error = {});
    });
    builder.addCase(fetch.rejected, (state, action) => {
      (state.list.loading = false),
        (state.list.result = action.error),
        (state.list.error = undefined);
    });
    // builder.addCase(removeMany.pending, (state) => {
    //   (state.list.loading = true), (state.list.result = undefined), (state.list.error = {});
    // });
    // builder.addCase(removeMany.fulfilled, (state, action) => {
    //   (state.list.loading = false), (state.list.result = action.payload), (state.list.error = {});
    // });
    // builder.addCase(removeMany.rejected, (state, action) => {
    //   (state.list.loading = false),
    //     (state.list.result = action.error),
    //     (state.list.error = undefined);
    // });
    builder.addCase(readone.pending, (state) => {
      state.list.loading = true;
      state.list.listone = {};
    });
    builder.addCase(readone.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.listone = action.payload;
      state.list.error = {};
    });
    builder.addCase(readone.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
      state.list.listone = initialState.list.listone;
    });
    builder.addCase(create.pending, (state) => {
      (state.list.loading = true), (state.list.result = undefined), (state.list.error = {});
    });
    builder.addCase(create.fulfilled, (state, action) => {
      (state.list.loading = false), (state.list.result = action.payload), (state.list.error = {});
    });
    builder.addCase(create.rejected, (state, action) => {
      (state.list.loading = false),
        (state.list.result = action.error),
        (state.list.error = undefined);
    });
    builder.addCase(update.pending, (state) => {
      state.update.loading = true;
      state.update.error = {};
    });
    builder.addCase(update.fulfilled, (state) => {
      state.update.loading = false;
      state.update.error = {};
    });
    builder.addCase(update.rejected, (state, action) => {
      state.update.loading = false;
      state.update.error = action.error;
    });
    // builder.addCase(getDateStart.pending, (state) => {
    //   state.list.loading = true;
    //   state.list.listStart = {};
    // });
    // builder.addCase(getDateStart.fulfilled, (state, action) => {
    //   state.list.loading = false;
    //   state.list.listStart = action.payload;
    //   state.list.error = {};
    // });
    // builder.addCase(getDateStart.rejected, (state, action) => {
    //   state.list.loading = false;
    //   state.list.error = action.error;
    //   state.list.listStart = initialState.list.listStart;
    // });
    builder.addCase(removeMany.pending, (state) => {
      state.delete.loading = true;
      state.delete.error = {};
    });
    builder.addCase(removeMany.fulfilled, (state) => {
      state.delete.loading = false;
      state.delete.error = {};
    });
    builder.addCase(removeMany.rejected, (state, action) => {
      state.delete.loading = false;
      state.delete.error = action.error;
    });
    // builder.addCase(removeMany.pending, (state) => {
    //   state.delete.loading = true;
    //   state.delete.error = {};
    // });
    // builder.addCase(removeMany.fulfilled, (state) => {
    //   state.delete.loading = false;
    //   state.delete.error = {};
    // });
    // builder.addCase(removeMany.rejected, (state, action) => {
    //   state.delete.loading = false;
    //   state.delete.error = action.error;
    // });
  },
});

// > Export
// * Action
export const actions = {...slice.actions, fetch, create, readone, update, removeMany};
// * Reducer
export const {reducer} = slice;
