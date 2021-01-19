import types from './directions.actionTypes';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const initialState = {
  id: uuidv4(),
  country: '',
  landmarkList: [],
  totalDistance: 0,
  points: [],
};

const directionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_COUNTRY:
      return {
        ...state,
        country: payload.country,
      };
    case types.ADD_LANDMARK: {
      const prevList = state.landmarkList;
      const newList = payload.landmarkList;
      return {
        ...state,
        landmarkList: [...prevList, ...newList],
      };
    }
    case types.DELETE_LANDMARK: {
      const prevList = state.landmarkList;
      const firstLandmark = _.slice(prevList, 0, 1);
      return {
        ...state,
        landmarkList: firstLandmark,
      };
    }
    case types.DELETE_SELECTED_LANDMARK: {
      const prevList = state.landmarkList;
      const targetLandmarkId = payload.id;

      const filteredList = _.filter(prevList, landmark => landmark.id !== targetLandmarkId);
      return {
        ...state,
        landmarkList: [...filteredList],
      };
    }
    case types.CALCULATE_TOTAL_DISTANCE:
      return {
        ...state,
        totalDistance: payload.totalDistance * 1000,
      };
    case types.GET_ALL_POINTS: {
      return {
        ...state,
        points: [...state.points, ...payload.points],
      };
    }
    default:
      return state;
  }
};

export default directionsReducer;
