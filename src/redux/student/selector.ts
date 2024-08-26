import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: any) => state.student;

export const selector = {
  selectData: createSelector(selectSelf, (state) => state),
  selectList: createSelector(selectSelf, (state) => state.list),
  selectSchedule: createSelector(selectSelf, (state) => state.schedule),
  selectGetTransaction: createSelector(selectSelf, (state) => state.get),
  selectCreateTransaction: createSelector(selectSelf, (state) => state.create),
  selectUpdateTransaction: createSelector(selectSelf, (state) => state.update),
  selectDeleteTransaction: createSelector(selectSelf, (state) => state.delete),
  selectDeletesTransaction: createSelector(selectSelf, (state) => state.deleteMultiple),
};
