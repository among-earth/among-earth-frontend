import types from './user.actionTypes';

export const setUserNickname = nickname => ({
  type: types.SET_NICKNAME,
  payload: { nickname },
});
