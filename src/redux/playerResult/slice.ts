import {createSlice} from '@reduxjs/toolkit';
import {addAnswer, createPlayerResult, getPlayerResult} from './actions';

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
    result: {}
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
  name: 'playerResult',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPlayerResult.pending, (state) => {
      state.list.loading = true;
      state.list.error = {};
    });
    builder.addCase(createPlayerResult.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.result = action.payload;
      state.list.error = {};
    });
    builder.addCase(createPlayerResult.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
    });
    builder.addCase(getPlayerResult.pending, (state) => {
      state.list.loading = true;
      state.list.error = {};
    });
    builder.addCase(getPlayerResult.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.result = action.payload;
      state.list.error = {};
    });
    builder.addCase(getPlayerResult.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
    });
      builder.addCase(addAnswer.pending, (state) => {
        state.create.loading = true;
        state.create.error = {};
      });
      builder.addCase(addAnswer.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.result = action.payload;
        state.create.error = {};
      });
      builder.addCase(addAnswer.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.error;
      });
  },
});

// > Export
// * Action
export const actions = {
  ...slice.actions,
  createPlayerResult,
  getPlayerResult,
  addAnswer,
};
// * Reducer
export const {reducer} = slice;
