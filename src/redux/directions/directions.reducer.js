import types from './directions.actionTypes';

const initialState = {
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
    case types.CALCULATE_TOTAL_DISTANCE:
      return {
        ...state,
        totalDistance: payload.totalDistance,
      };
    case types.GET_ALL_POINTS: {
      return {
        ...state,
        points: [...state.points, ...payload.points]
      };
    }
    default:
      return state;
  }
};

export default directionsReducer;
