import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import directionsReducer from './directions/directions.reducer';

export default combineReducers({
  user: userReducer,
  directions: directionsReducer,
});
