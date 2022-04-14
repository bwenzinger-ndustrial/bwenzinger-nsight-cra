import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function loadScheduleById(scheduleId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_RATE_SCHEDULE_START });

    return contxtSdk.rates
      .getScheduleById(scheduleId)
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_RATE_SCHEDULE_SUCCESS,
          payload: response
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_RATE_SCHEDULE_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

function loadSchedulesByFacilityId(facilityId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_RATE_SCHEDULES_START
    });

    return contxtSdk.rates
      .getSchedulesByFacilityId(facilityId)
      .then((schedules) => {
        return Promise.all([
          schedules.records,
          ...schedules.records
            .filter((schedule) => schedule.utilityContractId)
            .map((schedule) =>
              contxtSdk.ratesEms.getContractById(
                facilityId,
                schedule.utilityContractId
              )
            )
        ]);
      })
      .then(([schedules, ...contracts]) => {
        dispatch({
          type: actionTypes.LOAD_RATE_SCHEDULES_SUCCESS,
          payload: { schedules, contracts }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_RATE_SCHEDULES_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

export { loadScheduleById, loadSchedulesByFacilityId };
