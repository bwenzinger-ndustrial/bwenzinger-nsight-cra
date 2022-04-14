import actionTypes from './actionTypes';

const INITIAL_STATE = {
  defaultApplicationRoute: null,
  groupings: []
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_APPLICATION_GROUPINGS_SUCCESS:
      return {
        ...state,
        groupings: action.payload
      };

    case actionTypes.RESET_APPLICATION_GROUPINGS:
      return {
        ...state,
        groupings: INITIAL_STATE.groupings
      };

    case actionTypes.RESET_DEFAULT_APPLICATION_ROUTE:
      return {
        ...state,
        defaultApplicationRoute: INITIAL_STATE.defaultApplicationRoute
      };

    case actionTypes.SET_DEFAULT_APPLICATION_ROUTE:
      return {
        ...state,
        defaultApplicationRoute: action.payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default reducer;
