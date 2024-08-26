import {createSlice} from '@reduxjs/toolkit';
import {
  createQuiz,
  deleteQuiz,
  fetchTeacherQuizes,
  getQuiz,
  getQuizes,
  updateQuiz,
} from './actions';

const initialState: any = {
  list: {
    loading: false,
    result: {items: [], pagination: {currentPage: 0, totalPages: 0, totalRecords: 0}},
    listone: {},
    listStart: [],
    quiz: {},
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
  item: {
    loading: false,
    result: [],
  },
};

export const slice = createSlice({
  name: 'paidmanager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizes.pending, (state) => {
      (state.list.loading = true), (state.list.result = undefined), (state.list.error = {});
    });
    builder.addCase(getQuizes.fulfilled, (state, action) => {
      (state.list.loading = false), (state.list.result = action.payload), (state.list.error = {});
    });
    builder.addCase(getQuizes.rejected, (state, action) => {
      (state.list.loading = false),
        (state.list.result = action.error),
        (state.list.error = undefined);
    });
    builder.addCase(fetchTeacherQuizes.pending, (state) => {
      state.list.loading = true;
      state.list.listone = {};
    });
    builder.addCase(fetchTeacherQuizes.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.listone = action.payload;
      state.list.error = {};
    });
    builder.addCase(fetchTeacherQuizes.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
      state.list.listone = initialState.list.listone;
    });
    builder.addCase(createQuiz.pending, (state) => {
      (state.list.loading = true), (state.list.result = undefined), (state.list.error = {});
    });
    builder.addCase(createQuiz.fulfilled, (state, action) => {
      (state.list.loading = false), (state.list.result = action.payload), (state.list.error = {});
    });
    builder.addCase(createQuiz.rejected, (state, action) => {
      (state.list.loading = false),
        (state.list.result = action.error),
        (state.list.error = undefined);
    });

    builder.addCase(updateQuiz.pending, (state) => {
      state.update.loading = true;
      state.update.error = {};
    });
    builder.addCase(updateQuiz.fulfilled, (state) => {
      state.update.loading = false;
      state.update.error = {};
    });
    builder.addCase(updateQuiz.rejected, (state, action) => {
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
    builder.addCase(getQuiz.pending, (state) => {
      state.list.loading = true;
      state.list.quiz = {};
    });
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      state.list.loading = false;
      state.list.quiz = action.payload;
      state.list.error = {};
    });
    builder.addCase(getQuiz.rejected, (state, action) => {
      state.list.loading = false;
      state.list.error = action.error;
      state.list.quiz = initialState.item.quiz;
    });
    builder.addCase(deleteQuiz.pending, (state) => {
      state.delete.loading = true;
      state.delete.error = {};
    });
    builder.addCase(deleteQuiz.fulfilled, (state) => {
      state.delete.loading = false;
      state.delete.error = {};
    });
    builder.addCase(deleteQuiz.rejected, (state, action) => {
      state.delete.loading = false;
      state.delete.error = action.error;
    });
  },
});

// > Export
// * Action
export const actions = {
  ...slice.actions,
  createQuiz,
  fetchTeacherQuizes,
  getQuizes,
  deleteQuiz,
  getQuiz,
  updateQuiz,
};
// * Reducer
export const {reducer} = slice;
