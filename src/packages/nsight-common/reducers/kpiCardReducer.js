import actionTypes from '../actions/kpiCardActionTypes';

function kpiCardReducer(state = {}, action) {
  const { type, meta, payload } = action;
  switch (type) {
    case actionTypes.GET_KPI_CARD_START:
      return {
        ...state,
        [meta.name]: {
          isLoading: true
        }
      };
    case actionTypes.GET_KPI_CARD_SUCCESS:
      return {
        ...state,
        [meta.name]: {
          ...payload,
          error: null,
          isLoading: false
        }
      };
    case actionTypes.GET_KPI_CARD_FAILURE:
      return {
        ...state,
        [meta.name]: {
          ...state[meta.name],
          error: payload,
          isLoading: false
        }
      };
    default:
      return state;
  }
}

export default kpiCardReducer;
