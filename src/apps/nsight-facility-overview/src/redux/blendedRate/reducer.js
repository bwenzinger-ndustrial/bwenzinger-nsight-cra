import actionTypes from './actionTypes';

const INITIAL_STATE = {
  series: { curr: [], prev: [] },
  error: null
};

function blendedRateReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.BLENDED_RATE_GET_SUCCESS:
      return {
        ...state,
        error: null,
        series: payload
      };

    case actionTypes.BLENDED_RATE_GET_FAILURE:
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
export default blendedRateReducer;
