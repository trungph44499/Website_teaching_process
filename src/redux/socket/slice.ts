import {createSlice} from '@reduxjs/toolkit';
import {createSocket} from './actions';

const initialState: any = {
  item: {
    
    socket: null,
  },
};

export const slice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(createSocket.pending, (state) => {
    //   state.item.loading = true;
    //   state.item.socket = null;
    // });
    builder.addCase(createSocket.fulfilled, (state, action) => {
      // state.item.loading = false;
      state.item.socket = action.payload;
      // state.item.error = null;
    });
    // builder.addCase(createSocket.rejected, (state, action) => {
    //   state.item.loading = false;
    //   state.item.error = action.error;
    //   state.item.socket = initialState.item.socket;
    // });
  },
});

// > Export
// * Action
export const actions = {...slice.actions, createSocket};
// * Reducer
export const {reducer} = slice;
