import actionTypes from './actionTypes';

const INITIAL_STATE = {
  error: '',
  hasLoadingError: false,
  config: []
};

function feedsReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.LOAD_KPI_CONFIG_FAILURE:
      return {
        ...state,
        error: payload,
        hasLoadingError: true
      };

    case actionTypes.LOAD_KPI_CONFIG_START:
      return INITIAL_STATE;

    case actionTypes.LOAD_KPI_CONFIG_SUCCESS:
      return {
        ...state,
        config: payload,
        error: '',
        hasLoadingError: false
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default feedsReducer;
