import {createSlice} from '@reduxjs/toolkit';
import {addPlayer, createGame, getGame,} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: {items: [], pagination: {currentPage: 0, totalPages: 0, totalRecords: 0}},
  },
  item: {
    loading: false,
    result: {},
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
  name: 'loaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGame.pending, (state) => {
      (state.list.loading = true), (state.list.result = undefined), (state.list.error = {});
    });
    builder.addCase(createGame.fulfilled, (state, action) => {
      (state.list.loading = false), (state.list.result = action.payload), (state.list.error = {});
    });
    builder.addCase(createGame.rejected, (state, action) => {
      (state.list.loading = false),
        (state.list.result = action.error),
        (state.list.error = undefined);
    });
    builder.addCase(getGame.pending, (state) => {
      state.list.loading = true;
      state.list.listone = {};
    });
    builder.addCase(getGame.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.listone = action.payload;
      state.list.error = {};
    });
    builder.addCase(getGame.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
      state.list.listone = initialState.list.listone;
    });
     builder.addCase(addPlayer.pending, (state) => {
       state.item.loading = true;
       state.item.result = {};
     });
     builder.addCase(addPlayer.fulfilled, (state, action) => {
       state.item.loading = false;
       state.item.result = action.payload;
       state.item.error = {};
     });
     builder.addCase(addPlayer.rejected, (state, action) => {
       state.item.loading = false;
       state.item.error = action.error;
       state.item.result = initialState.item.result;
     });
    // builder.addCase(create.pending, (state) => {
    //   state.create.loading = true;
    //   state.create.error = {};
    // });
    // builder.addCase(create.fulfilled, (state) => {
    //   state.create.loading = false;
    //   state.create.error = {};
    // });
    // builder.addCase(create.rejected, (state, action) => {
    //   state.create.loading = false;
    //   state.create.error = action.error;
    // });
   

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
export const actions = {...slice.actions, getGame, createGame, addPlayer};
// * Reducer
export const {reducer} = slice;
