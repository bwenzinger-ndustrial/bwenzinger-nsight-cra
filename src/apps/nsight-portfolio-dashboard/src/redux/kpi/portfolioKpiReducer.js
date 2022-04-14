import actionTypes from './actionTypes';

const INITIAL_STATE = {};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.GET_PORTFOLIO_KPI_START:
      return {
        ...state,
        [action.meta.kpi]: {
          ...state[action.meta.kpi],
          error: null,
          isLoading: true,
          primaryData: null,
          secondaryData: null,
          chart: null
        }
      };

    case actionTypes.GET_PORTFOLIO_KPI_SUCCESS:
      return {
        ...state,
        [action.meta.kpi]: {
          ...state[action.meta.kpi],
          isLoading: false,
          primaryData: {
            startDate: action.meta.dateRanges.primaryRangeStart,
            endDate: action.meta.dateRanges.primaryRangeEnd,
            values: action.payload.primaryData
          },
          secondaryData: {
            startDate: action.meta.dateRanges.secondaryRangeStart,
            endDate: action.meta.dateRanges.secondaryRangeEnd,
            values: action.payload.secondaryData
          }
        }
      };

    case actionTypes.GET_PORTFOLIO_KPI_FAILURE:
      return {
        ...state,
        [action.meta.kpi]: {
          ...state[action.meta.kpi],
          isLoading: false,
          error: action.payload
        }
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default reducer;
