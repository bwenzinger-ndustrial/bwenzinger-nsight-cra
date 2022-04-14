import actionTypes from './actionTypes';

const INITIAL_STATE = {
  data: {
    _metadata: {
      error: null
    },
    values: []
  },
  error: null
};

function heatmapReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.HEATMAP_GET_CURRENT_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.payload
      };
    case actionTypes.HEATMAP_GET_CURRENT_FAILURE:
      return {
        ...state,
        [action.meta.name]: {
          ...state[action.meta.name],
          error: action.payload,
          isLoading: false
        }
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default heatmapReducer;
