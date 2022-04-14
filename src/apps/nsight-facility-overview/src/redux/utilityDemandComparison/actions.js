import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function getUtilityDemandComparisonData(facilityId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UTILITY_DEMAND_GET_CURRENT_START
    });

    return contxtSdk.facilitySis
      .getAccountSummary(facilityId)
      .then((data) => {
        dispatch({
          type: actionTypes.UTILITY_DEMAND_GET_CURRENT_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.UTILITY_DEMAND_GET_CURRENT_FAILURE,
          error: true,
          meta: { name: 'getUtilityDemand' },
          payload: error
        });
      });
  };
}

export { getUtilityDemandComparisonData };
