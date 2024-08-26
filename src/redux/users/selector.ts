import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: RootState) => state.user;

export const selector = {
  selectData: createSelector(selectSelf, (state) => state),
  selectUsers: createSelector(selectSelf, (state) => state.users),
  selectCreateTransaction: createSelector(selectSelf, (state) => state.create),
  selectUpdateTransaction: createSelector(selectSelf, (state) => state.update),
  selectUpdatePasswordTransaction: createSelector(selectSelf, (state) => state.updatePassword),
  selectDeleteTransaction: createSelector(selectSelf, (state) => state.delete),
};
