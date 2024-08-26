import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  create,
  fetch,
  read,
  remove,
  update,
  readSlots,
  readSchedule,
  fetchTrash,
  fetchDemoClassAvailable,
} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: {items: [], pagination: {currentPage: 0, totalPages: 0, totalRecords: 0}},
    listSlot: [],
  },
  listTrash: {
    loading: false,
    result: [],
  },
  listDemoClassAvailable: {
    loading: false,
    result: [],
  },
  get: {
    loading: false,
  },
  schedule: {
    result: [],
  },
  create: {
    loading: false,
    success: false,
  },
  update: {
    loading: false,
    success: false,
  },
  delete: {
    loading: false,
  },
  deleteMultiple: {
    loading: false,
  },
};

export const slice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    setStatusDefault(
      state,
      action: PayloadAction<{
        key: 'create' | 'update';
        action: 'success' | 'error';
      }>
    ) {
      state[action.payload.key][action.payload.action] = false;
    },
  },
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
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
    });
    // fetchTrash
    builder.addCase(fetchTrash.pending, (state) => {
      state.listTrash.loading = true;
      state.listTrash.error = {};
    });
    builder.addCase(fetchTrash.fulfilled, (state, action) => {
      state.listTrash.loading = false;
      state.listTrash.result = action.payload;
      state.listTrash.error = {};
    });
    builder.addCase(fetchTrash.rejected, (state, action) => {
      state.listTrash.loading = false;
      state.listTrash.error = action.error;
    });
    // fetchDemoClassAvailable
    builder.addCase(fetchDemoClassAvailable.pending, (state) => {
      state.listDemoClassAvailable.loading = true;
      state.listDemoClassAvailable.error = {};
    });
    builder.addCase(fetchDemoClassAvailable.fulfilled, (state, action) => {
      state.listDemoClassAvailable.loading = false;
      state.listDemoClassAvailable.result = action.payload;
      state.listDemoClassAvailable.error = {};
    });
    builder.addCase(fetchDemoClassAvailable.rejected, (state, action) => {
      state.listDemoClassAvailable.loading = false;
      state.listDemoClassAvailable.error = action.error;
    });
    //update
    builder.addCase(update.pending, (state) => {
      state.update.loading = true;
      state.update.result = undefined;
      state.update.success = false;
      state.update.error = {};
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.update.loading = false;
      state.update.result = action.payload;
      state.update.success = true;
      state.update.error = {};
    });
    builder.addCase(update.rejected, (state, action) => {
      state.update.loading = false;
      state.update.result = undefined;
      state.update.success = false;
      state.update.error = action.error;
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
      state.create.loading = true;
      state.create.result = undefined;
      state.create.success = false;
      state.create.error = {};
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.create.loading = false;
      state.create.result = action.payload;
      state.create.success = true;
      state.create.error = {};
    });
    builder.addCase(create.rejected, (state, action) => {
      state.create.loading = false;
      state.create.result = undefined;
      state.create.error = action.error;
      state.create.success = false;
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
    builder.addCase(readSchedule.pending, (state) => {
      (state.schedule.loading = true),
        (state.schedule.result = undefined),
        (state.schedule.error = {});
    });
    builder.addCase(readSchedule.fulfilled, (state, action) => {
      (state.schedule.loading = false),
        (state.schedule.result = action.payload),
        (state.schedule.error = {});
    });
    builder.addCase(readSchedule.rejected, (state, action) => {
      (state.schedule.loading = false),
        (state.schedule.result = action.error),
        (state.schedule.error = undefined);
    });
    builder.addCase(readSlots.pending, (state) => {
      state.list.loading = true;
      state.list.error = {};
    });
    builder.addCase(readSlots.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.listSlot = action.payload;
      state.list.error = {};
    });
    builder.addCase(readSlots.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
    });
    // builder.addCase(fetchMany.pending, (state) => {
    //   state.list.loading = true;
    //   state.list.error = {};
    // });
    // builder.addCase(fetchMany.fulfilled, (state, action) => {
    //   state.list.loading = false;
    //   state.list.result = action.payload.data;
    //   state.list.error = {};
    // });
    // builder.addCase(fetchMany.rejected, (state, action) => {
    //   state.list.loading = false;
    //   state.list.error = action.error;
    //   state.list.result = initialState.list.result;
    // });
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
    // builder.addCase(update.pending, (state) => {
    //   state.update.loading = true;
    //   state.update.error = {};
    // });
    // builder.addCase(update.fulfilled, (state) => {
    //   state.update.loading = false;
    //   state.update.error = {};
    // });
    // builder.addCase(update.rejected, (state, action) => {
    //   state.update.loading = false;
    //   state.update.error = action.error;
    // });
    // builder.addCase(remove.pending, (state) => {
    //   state.delete.loading = true;
    //   state.delete.error = {};
    // });
    // builder.addCase(remove.fulfilled, (state) => {
    //   state.delete.loading = false;
    //   state.delete.error = {};
    // });
    // builder.addCase(remove.rejected, (state, action) => {
    //   state.delete.loading = false;
    //   state.delete.error = action.error;
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
  fetch,
  update,
  read,
  create,
  remove,
  readSlots,
  readSchedule,
  fetchTrash,
  fetchDemoClassAvailable,
};
// * Reducer
export const {reducer} = slice;
