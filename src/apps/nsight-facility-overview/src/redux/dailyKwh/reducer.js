import actionTypes from './actionTypes';

const INITIAL_STATE = {
  last: {
    _metadata: {
      error: null
    },
    values: []
  },
  current: {
    _metadata: {
      error: null
    },
    values: []
  },
  error: null
};

function dailyKwhReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.DAILY_KWH_CURRENT_GET_SUCCESS:
      return {
        ...state,
        error: null,
        current: action.payload
      };
    case actionTypes.DAILY_KWH_CURRENT_GET_FAILURE:
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          error: action.payload,
          isLoading: false
        }
      };
    case actionTypes.DAILY_KWH_LAST_GET_SUCCESS:
      return {
        ...state,
        error: null,
        last: action.payload
      };
    case actionTypes.DAILY_KWH_LAST_GET_FAILURE:
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          error: action.payload,
          isLoading: false
        }
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default dailyKwhReducer;
