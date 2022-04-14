import produce from 'immer';

import actionTypes from './actionTypes';

/**
 * @example primaryData or comparisonData
 * {
 *   facility_monthly_kwh_per_revenue: {          // <-- kpi key (currently always monthly)
 *     27: {                                      // <-- id (facility or org)
 *       facility_daily_electricity_usage: [...], // <-- kpi metric
 *       facility_daily_revenue: [...],           // <-- kpi metric
 *     }
 *   },
 *   isLoading: {
 *    facility_monthly_kwh_per_revenue: {
 *      27: true/false
 *    }
 *   }
 * }
 */
const INITIAL_STATE = {
  primaryData: {
    isLoading: {},
    error: {}
  },
  comparisonData: {
    isLoading: {},
    error: {}
  }
};

const _mergeErrorOrLoadingState = (state, kpiKey, facilityIds, value) => {
  state[kpiKey] = {
    ...state[kpiKey],
    ...facilityIds.reduce(
      (acc, facilityId) => ({ ...acc, [facilityId]: value }),
      {}
    )
  };
};

const _mergeErrorAndLoadingState = (
  state,
  kpiKey,
  facilityIds,
  errValue,
  loadingValue
) => {
  if (!state.error[kpiKey]) {
    state.error[kpiKey] = {};
  }

  if (!state.isLoading[kpiKey]) {
    state.isLoading[kpiKey] = {};
  }
  // Update error
  _mergeErrorOrLoadingState(state.error, kpiKey, facilityIds, errValue);

  // Update isLoading
  _mergeErrorOrLoadingState(state.isLoading, kpiKey, facilityIds, loadingValue);
};

const _mergeSuccessState = (state, kpiKey, facilityIds, data) => {
  if (!state[kpiKey]) {
    state[kpiKey] = {};
  }

  state[kpiKey] = {
    ...state[kpiKey],
    ...data
  };

  _mergeErrorAndLoadingState(state, kpiKey, facilityIds, false, false);
};

const kpiReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PORTFOLIO_KPI:
      draft.selectedKpi = action.payload;
      return draft;

    //
    // PRIMARY DATA REDUCERS
    //
    case actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_START:
      _mergeErrorAndLoadingState(
        draft.primaryData,
        action.meta.kpiKey,
        action.meta.facilityIds,
        false,
        true
      );

      return draft;

    case actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_SUCCESS:
      _mergeSuccessState(
        draft.primaryData,
        action.meta.kpiKey,
        action.meta.facilityIds,
        action.payload
      );

      return draft;

    /**
     * see comment above case for GET_PRIMARY_KPI_FOR_ALL_FACILITIES_START
     */
    case actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_FAILURE:
      _mergeErrorAndLoadingState(
        draft.primaryData,
        action.meta.kpiKey,
        action.meta.facilityIds,
        action.payload,
        false
      );

      return draft;

    case actionTypes.RESET_PRIMARY_KPI_FOR_FACILITIES:
      draft.primaryData[action.meta.kpiKey] = {};
      draft.primaryData.error = {};
      draft.primaryData.isLoading = {};
      return draft;

    //
    // COMPARISON DATA REDUCERS
    //
    case actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_START:
      _mergeErrorAndLoadingState(
        draft.comparisonData,
        action.meta.kpiKey,
        action.meta.facilityIds,
        false,
        true
      );

      return draft;

    case actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_SUCCESS:
      _mergeSuccessState(
        draft.comparisonData,
        action.meta.kpiKey,
        action.meta.facilityIds,
        action.payload
      );

      return draft;

    case actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_FAILURE:
      _mergeErrorAndLoadingState(
        draft.comparisonData,
        action.meta.kpiKey,
        action.meta.facilityIds,
        action.payload,
        false
      );

      return draft;

    case actionTypes.RESET_COMPARISON_KPI_FOR_FACILITIES:
      draft.comparisonData[action.meta.kpiKey] = {};
      draft.comparisonData.error = {};
      draft.comparisonData.isLoading = {};
      return draft;
  }
}, INITIAL_STATE);

export { INITIAL_STATE };
export default kpiReducer;
