import { batch } from 'react-redux';
import { DateTime } from 'luxon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const getAggregateDemand = (facilityId, units) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AGGREGATE_DEMAND_GET_START
    });

    return contxtSdk.facilityEms
      .getAggregateDemandData(facilityId, units)
      .then((aggregateDemand) => {
        dispatch({
          type: actionTypes.AGGREGATE_DEMAND_GET_SUCCESS,
          payload: aggregateDemand
        });
      })
      .catch((err) => {
        const error =
          err.isAxiosError && err.response
            ? err.response.data.message
            : err.message;
        dispatch({
          type: actionTypes.AGGREGATE_DEMAND_GET_FAILURE,
          error: true,
          payload: error
        });

        throw err;
      });
  };
};

function getDemandPeaks(facilityId, month, year, units) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AGGREGATE_MAX_DEMAND_GET_CURRENT_START
    });

    return Promise.all([
      contxtSdk.facilityEms.getDemandMax(facilityId, month, year, units),
      contxtSdk.facilityEms.getDemandMax(facilityId, month, year - 1, units)
    ])
      .then(([monthPeak, historicPeak]) => {
        dispatch({
          type: actionTypes.AGGREGATE_MAX_DEMAND_GET_CURRENT_SUCCESS,
          payload: {
            monthPeak,
            historicPeak
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.AGGREGATE_MAX_DEMAND_GET_CURRENT_FAILURE,
          error: true,
          meta: { name: 'currMonthMax' },
          payload: err.message
        });
      });
  };
}

function getCurrentTotalDemand(facilityId, units) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CURRENT_TOTAL_DEMAND_GET_START
    });

    return contxtSdk.facilityEms
      .getCurrentDemand(facilityId, units)
      .then((data) => {
        dispatch({
          type: actionTypes.CURRENT_TOTAL_DEMAND_GET_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.CURRENT_TOTAL_DEMAND_GET_FAILURE,
          error: true,
          meta: { name: 'currTotalDemand' },
          payload: err.message
        });
      });
  };
}

const getAggregateDemandData = (facility, units) => {
  return (dispatch) => {
    const currentDate = DateTime.fromJSDate(new Date(), {
      zone: facility.timezone
    });

    batch(() => {
      dispatch(getAggregateDemand(facility.id, units));
      dispatch(getCurrentTotalDemand(facility.id, units));
      dispatch(
        getDemandPeaks(facility.id, currentDate.month, currentDate.year, units)
      );
    });
  };
};

export { getAggregateDemandData, getCurrentTotalDemand };
