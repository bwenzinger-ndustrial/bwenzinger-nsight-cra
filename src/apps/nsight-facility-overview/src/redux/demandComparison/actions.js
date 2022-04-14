import { batch } from 'react-redux';
import { DateTime } from 'luxon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function getCurrMonthDemand(facilityId, startTime, endTime, units) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DEMAND_GET_CURRENT_START
    });
    return contxtSdk.facilityEms
      .getDemandData(facilityId, startTime, endTime, units)
      .then((data) => {
        dispatch({
          type: actionTypes.DEMAND_GET_CURRENT_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.DEMAND_GET_CURRENT_FAILURE,
          error: true,
          meta: { name: 'currMonthDemand' },
          payload: error
        });
      });
  };
}

function getLastMonthDemand(facilityId, startTime, endTime, units) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DEMAND_GET_LAST_START
    });
    return contxtSdk.facilityEms
      .getDemandData(facilityId, startTime, endTime, units)
      .then((data) => {
        dispatch({
          type: actionTypes.DEMAND_GET_LAST_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DEMAND_GET_LAST_FAILURE,
          error: true,
          meta: { name: 'lastYearDemand' },
          payload: err.message
        });
      });
  };
}

function getCurrMaxDemand(facilityId, month, year, units) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DEMAND_MAX_GET_CURRENT_START
    });
    return contxtSdk.facilityEms
      .getDemandMax(facilityId, month, year, units)
      .then((data) => {
        dispatch({
          type: actionTypes.DEMAND_MAX_GET_CURRENT_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DEMAND_MAX_GET_CURRENT_FAILURE,
          error: true,
          meta: { name: 'currYearMax' },
          payload: err.message
        });
      });
  };
}

function getLastMaxDemand(facilityId, month, year, units) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DEMAND_MAX_GET_LAST_START
    });
    return contxtSdk.facilityEms
      .getDemandMax(facilityId, month, year, units)
      .then((data) => {
        dispatch({
          type: actionTypes.DEMAND_MAX_GET_LAST_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.DEMAND_MAX_GET_LAST_FAILURE,
          error: true,
          meta: { name: 'lastYearMax' },
          payload: err.message
        });
      });
  };
}

const getDemandComparisonData = (facility, demandUnits) => {
  return (dispatch) => {
    const currentDate = DateTime.fromJSDate(new Date(), {
      zone: facility.timezone
    });

    batch(() => {
      dispatch(
        getCurrMonthDemand(
          facility.id,
          currentDate.startOf('month').toSeconds(),
          currentDate.endOf('month').toSeconds(),
          demandUnits
        )
      );
      dispatch(
        getLastMonthDemand(
          facility.id,
          currentDate
            .minus({ year: 1 })
            .startOf('month')
            .toSeconds(),
          currentDate
            .minus({ year: 1 })
            .endOf('month')
            .toSeconds(),
          demandUnits
        )
      );
      dispatch(
        getCurrMaxDemand(
          facility.id,
          currentDate.month,
          currentDate.year,
          demandUnits
        )
      );
      dispatch(
        getLastMaxDemand(
          facility.id,
          currentDate.month,
          currentDate.minus({ year: 1 }).year,
          demandUnits
        )
      );
    });
  };
};

export {
  getCurrMaxDemand,
  getCurrMonthDemand,
  getDemandComparisonData,
  getLastMaxDemand,
  getLastMonthDemand
};
