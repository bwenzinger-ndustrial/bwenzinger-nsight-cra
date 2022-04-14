import actionTypes from '../actions/feedTypeActionTypes';

const INITIAL_STATE = {
  items: [],
  error: null
};

function feedTypesReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.FEED_TYPES_GET_SUCCESS:
      return {
        ...state,
        items: payload
      };

    case actionTypes.FEED_TYPES_GET_FAILURE:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default feedTypesReducer;
