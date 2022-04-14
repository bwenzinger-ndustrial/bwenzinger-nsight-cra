import actionTypes from './actionTypes';

const INITIAL_STATE = {
  primaryDetailByMetric: {},
  primaryDates: {
    from: undefined,
    to: undefined
  }
};

function primaryReducer(state = INITIAL_STATE, action) {
  const { metricName, payload, type } = action;

  switch (type) {
    case actionTypes.PORTFOLIO_DETAIL_PRIMARY_GET_START:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.PORTFOLIO_DETAIL_PRIMARY_GET_SUCCESS:
      return {
        primaryDetailByMetric: {
          ...state.primaryDetailByMetric,
          [metricName]: payload
        },
        error: null,
        isLoading: false,
        primaryDates: state.primaryDates
      };

    case actionTypes.PORTFOLIO_DETAIL_PRIMARY_GET_FAILURE:
      return {
        ...INITIAL_STATE,
        error: payload,
        isLoading: false,
        primaryDates: state.primaryDates
      };

    case actionTypes.PORTFOLIO_DETAIL_PRIMARY_DATA_RESET:
      return {
        ...INITIAL_STATE,
        error: null,
        isLoading: false,
        primaryDates: state.primaryDates
      };

    case actionTypes.PRIMARY_DATE_SET:
      return {
        ...state,
        primaryDates: payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default primaryReducer;
