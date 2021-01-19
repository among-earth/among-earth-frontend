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

export const deleteLandmark = landmarkList => ({
  type: types.DELETE_LANDMARK,
  payload: { landmarkList },
});

export const deleteSelectedLandmark = id => ({
  type: types.DELETE_SELECTED_LANDMARK,
  payload: { id },
});
