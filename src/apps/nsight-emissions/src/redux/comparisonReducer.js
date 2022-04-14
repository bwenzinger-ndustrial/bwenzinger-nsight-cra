import actionTypes from './actionTypes';

const INITIAL_STATE = {
  data: null,
  comparisonDates: {
    from: undefined,
    to: undefined
  }
};

function comparisonReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.EMISSIONS_COMPARISON_START:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.EMISSIONS_COMPARISON_SUCCESS:
      return {
        data: payload,
        error: null,
        isLoading: false,
        comparisonDates: state.comparisonDates
      };

    case actionTypes.EMISSIONS_COMPARISON_FAILURE:
      return {
        ...INITIAL_STATE,
        error: payload,
        isLoading: false,
        comparisonDates: state.comparisonDates
      };

    case actionTypes.EMISSIONS_COMPARISON_DATA_RESET:
      return {
        ...INITIAL_STATE,
        data: null,
        error: null,
        isLoading: false,
        comparisonDates: state.comparisonDates
      };

    case actionTypes.EMISSIONS_COMPARISON_DATE_SET:
      return {
        ...state,
        data: null,
        comparisonDates: payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default comparisonReducer;
