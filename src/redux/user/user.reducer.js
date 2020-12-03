import types from './user.actionTypes';

const initialState = {
  nickname: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_NICKNAME:
      return {
        ...state,
        nickname: payload.nickname,
      };
    default:
      return state;
  }
};

export default userReducer;
