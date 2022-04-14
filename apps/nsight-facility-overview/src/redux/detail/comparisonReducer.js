import actionTypes from './actionTypes';

const INITIAL_STATE = {
  comparisonDetailByMetric: {},
  comparisonDates: {
    from: undefined,
    to: undefined
  }
};

function comparisonReducer(state = INITIAL_STATE, action) {
  const { metricName, payload, type } = action;

  switch (type) {
    case actionTypes.COMPARISON_DATE_SET:
      return {
        ...state,
        comparisonDates: payload
      };

    case actionTypes.FACILITY_DETAIL_COMPARISON_GET_START:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.FACILITY_DETAIL_COMPARISON_GET_SUCCESS:
      return {
        comparisonDetailByMetric: {
          ...state.comparisonDetailByMetric,
          [metricName]: payload
        },
        comparisonDates: state.comparisonDates,
        error: null,
        isLoading: false
      };

    case actionTypes.FACILITY_DETAIL_COMPARISON_GET_FAILURE:
      return {
        ...INITIAL_STATE,
        comparisonDates: state.comparisonDates,
        error: payload,
        isLoading: false
      };

    case actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET:
      return {
        ...INITIAL_STATE,
        comparisonDates: state.comparisonDates,
        error: null,
        isLoading: false
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default comparisonReducer;
