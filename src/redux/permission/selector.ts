import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: RootState) => state.permission;

export const selector = {
  selectData: createSelector(selectSelf, (state) => state),
  selectPermissions: createSelector(selectSelf, (state) => state.permissions),
};
