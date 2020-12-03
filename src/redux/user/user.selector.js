import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectUserNickname = createSelector(
  selectUser,
  user => user.nickname,
);

export const selectLoading = createSelector(selectUser, user => user.loading);

export const selectError = createSelector(selectUser, user => user.error);
