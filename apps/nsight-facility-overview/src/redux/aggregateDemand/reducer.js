import actionTypes from './actionTypes';

const INITIAL_STATE = {
  values: [],
  currMonthMax: {},
  currDemandTotal: {},
  error: null
};

function aggregateDemandReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.AGGREGATE_DEMAND_GET_SUCCESS:
      return {
        ...state,
        values: payload
      };

    case actionTypes.AGGREGATE_MAX_DEMAND_GET_CURRENT_SUCCESS:
      return {
        ...state,
        monthPeak: payload.monthPeak,
        historicPeak: payload.historicPeak
      };

    case actionTypes.CURRENT_TOTAL_DEMAND_GET_SUCCESS:
      return {
        ...state,
        currDemandTotal: payload
      };

    case actionTypes.AGGREGATE_DEMAND_GET_FAILURE:
    case actionTypes.AGGREGATE_MAX_DEMAND_GET_CURRENT_FAILURE:
    case actionTypes.CURRENT_TOTAL_DEMAND_GET_FAILURE:
      return {
        ...state,
        error: payload
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
export default aggregateDemandReducer;
