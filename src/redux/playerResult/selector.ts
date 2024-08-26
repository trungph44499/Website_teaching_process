import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: any) => state.playerresult;

export const selector = {
  selectData: createSelector(selectSelf, (state) => state),
  selectList: createSelector(selectSelf, (state) => state.list),
  selectGetTransaction: createSelector(selectSelf, (state) => state.get),
  selectCreateTransaction: createSelector(selectSelf, (state) => state.create),

  selectUpdateTransactioncurrent: createSelector(selectSelf, (state) => state.updateCurrent),
  selectUpdateTransaction: createSelector(selectSelf, (state) => state.update),
  selectDeleteTransaction: createSelector(selectSelf, (state) => state.delete),
  selectDeletesTransaction: createSelector(selectSelf, (state) => state.deleteMultiple),
};
