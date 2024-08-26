import {createSlice} from '@reduxjs/toolkit';
import {createLeaderboard, updateCurrentLeaderboard, updateQuestionLeaderboard} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: {items: [], pagination: {currentPage: 0, totalPages: 0, totalRecords: 0}},
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
  updateCurrent: {
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
  name: 'loaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(createLeaderboard.pending, (state) => {
      state.list.loading = true;
      state.list.error = {};
    });
    builder.addCase(createLeaderboard.fulfilled, (state, action) => {
      console.log("actionsloader", action)
      state.list.loading = false;
      state.list.result = action.payload
      state.list.error = {};
    });
    builder.addCase(createLeaderboard.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
    });
    builder.addCase(updateQuestionLeaderboard.pending, (state) => {
      state.update.loading = true;
      state.update.result = {};
      state.update.error = {};
    });
    builder.addCase(updateQuestionLeaderboard.fulfilled, (state, action) => {
      state.update.loading = false;
      state.update.result = action.payload;
      state.update.error = {};
    });
    builder.addCase(updateQuestionLeaderboard.rejected, (state, action) => {
      state.update.loading = false;
      state.update.result = {};
      state.update.error = action.error;
    });
    builder.addCase(updateCurrentLeaderboard.pending, (state) => {
      state.updateCurrent.loading = true;
      state.updateCurrent.error = {};
      state.updateCurrent.result = {};
    });
    builder.addCase(updateCurrentLeaderboard.fulfilled, (state, action) => {
      state.updateCurrent.loading = false;
      state.updateCurrent.result = {};
      state.update.error = {};
    });
    builder.addCase(updateCurrentLeaderboard.rejected, (state, action) => {
      state.updateCurrent.loading = false;
      state.updateCurrent.result = {};
      state.updateCurrent.error = action.error;
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
export const actions = {
  ...slice.actions,
  updateQuestionLeaderboard,
  updateCurrentLeaderboard,
  createLeaderboard,
};
// * Reducer
export const {reducer} = slice;
