import actionTypes from '@ndustrial/nsight-common/actions/feedStatusActionTypes';

const INITIAL_STATE = {
  error: '',
  hasLoadingError: false,
  items: []
};

function feedsReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.LOAD_FEED_STATUSES_FAILURE:
      return {
        ...state,
        error: payload,
        hasLoadingError: true
      };

    case actionTypes.LOAD_FEED_STATUSES_START:
      return INITIAL_STATE;

    case actionTypes.LOAD_FEED_STATUSES_SUCCESS:
      return {
        ...state,
        items: payload
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default feedsReducer;
