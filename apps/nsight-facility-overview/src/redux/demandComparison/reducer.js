import actionTypes from './actionTypes';

const INITIAL_STATE = {
  currMonthDemand: {
    _metadata: {
      error: null
    },
    values: []
  },
  currYearMax: {
    value: null
  },
  lastYearDemand: {
    _metadata: {
      error: null
    },
    values: []
  },
  lastYearMax: {
    value: null
  },
  error: null
};

function demandReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.DEMAND_GET_LAST_SUCCESS:
      return {
        ...state,
        error: null,
        lastYearDemand: action.payload
      };
    case actionTypes.DEMAND_GET_CURRENT_SUCCESS:
      return {
        ...state,
        error: null,
        currMonthDemand: action.payload
      };
    case actionTypes.DEMAND_MAX_GET_CURRENT_SUCCESS:
      return {
        ...state,
        error: null,
        currYearMax: action.payload
      };
    case actionTypes.DEMAND_MAX_GET_LAST_SUCCESS:
      return {
        ...state,
        error: null,
        lastYearMax: action.payload
      };
    case actionTypes.DEMAND_GET_LAST_FAILURE:
    case actionTypes.DEMAND_GET_CURRENT_FAILURE:
    case actionTypes.DEMAND_MAX_GET_CURRENT_FAILURE:
    case actionTypes.DEMAND_MAX_GET_LAST_FAILURE:
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          error: action.payload,
          isLoading: false
        }
      };

    case 'SET_SELECTED_FACILITY_SLUG': {
      return {
        ...INITIAL_STATE
      };
    }
    default:
      return state;
  }
}

export { INITIAL_STATE };
export default demandReducer;
