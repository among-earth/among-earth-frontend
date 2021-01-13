import types from './directions.actionTypes';

export const selectCountry = country => ({
  type: types.SET_COUNTRY,
  payload: country,
});

export const selectLandmark = landmarkList => ({
  type: types.ADD_LANDMARK,
  payload: { landmarkList },
});

export const calculateTotalDistance = totalDistance => ({
  type: types.CALCULATE_TOTAL_DISTANCE,
  payload: { totalDistance },
});

export const getAllPoints = points => ({
  type: types.GET_ALL_POINTS,
  payload: { points },
});

export const setTravelId = travelId => ({
  type: types.SET_TRAVEL_ID,
  payload: { travelId },
});
