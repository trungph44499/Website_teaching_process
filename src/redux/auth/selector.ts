import {RootState} from '~/redux/store';
import {createSelector} from '@reduxjs/toolkit';

const selectSelf = (state: RootState) => state.auth;

export const selector = {
  auth: createSelector(selectSelf, (state) => state),
  user: createSelector(selectSelf, (state) => state.user),
  isAuthenticated: createSelector(selectSelf, (state) => state.isAuthenticated),
};
