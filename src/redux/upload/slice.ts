import {createSlice} from '@reduxjs/toolkit';
import {uploadFile} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: {items: [], pagination: {currentPage: 0, totalPages: 0, totalRecords: 0}},
  },
  item: {
    loading: false,
    result: [],
  },
};

export const slice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      (state.item.loading = true), (state.item.result = undefined), (state.item.error = {});
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      (state.item.loading = false), (state.item.result = action.payload), (state.item.error = {});
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      (state.item.loading = false),
        (state.item.result = action.error),
        (state.item.error = undefined);
    });
  },
});

// > Export
// * Action
export const actions = {
  ...slice.actions,
  uploadFile,
};
// * Reducer
export const {reducer} = slice;
