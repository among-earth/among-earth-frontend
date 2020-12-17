import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import directionsReducer from './directions/directions.reducer';
import travelReducer from './travel/travel.reducer';

export default combineReducers({
  user: userReducer,
  directions: directionsReducer,
  travel: travelReducer,
});
