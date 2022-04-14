import actionTypes from './actionTypes';

const INITIAL_STATE = {
  data: null,
  primaryDates: {
    from: undefined,
    to: undefined
  }
};

function primaryReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.EMISSIONS_PRIMARY_START:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.EMISSIONS_PRIMARY_SUCCESS:
      return {
        data: payload,
        error: null,
        isLoading: false,
        primaryDates: state.primaryDates
      };

    case actionTypes.EMISSIONS_PRIMARY_FAILURE:
      return {
        ...INITIAL_STATE,
        error: payload,
        isLoading: false,
        primaryDates: state.primaryDates
      };

    case actionTypes.EMISSIONS_PRIMARY_DATA_RESET:
      return {
        ...INITIAL_STATE,
        error: null,
        isLoading: false,
        primaryDates: state.primaryDates
      };

    case actionTypes.EMISSIONS_PRIMARY_DATE_SET:
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
