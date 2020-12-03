import types from './directions.actionTypes';

export const setUserNickname = nickname => ({
  type: types.SET_NICKNAME,
  payload: { nickname },
});
