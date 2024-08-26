import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: any) => state.socket;

export const selector = {
  selectData: createSelector(selectSelf, (state) => state),
  selectItem: createSelector(selectSelf, (state) => state.item),
};
