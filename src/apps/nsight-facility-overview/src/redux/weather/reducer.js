import actionTypes from './actionTypes';

const INITIAL_STATE = {
  primaryWeather: {
    records: [],
    details: { avgHigh: undefined, avgLow: undefined }
  },
  secondaryWeather: {
    records: [],
    details: { avgHigh: undefined, avgLow: undefined }
  },
  error: null
};

function weatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_WEATHER_SECONDARY_SUCCESS:
      return {
        ...state,
        error: null,
        secondaryWeather: action.payload
      };

    case actionTypes.GET_WEATHER_PRIMARY_SUCCESS:
      return {
        ...state,
        error: null,
        primaryWeather: action.payload
      };

    case actionTypes.GET_WEATHER_SECONDARY_FAILURE:
    case actionTypes.GET_WEATHER_PRIMARY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default weatherReducer;
