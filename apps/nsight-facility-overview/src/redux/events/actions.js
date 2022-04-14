import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const DEFAULT_EVENT_TYPE_ID = '42a9972a-5aa8-45a0-b2f1-b673277e8a29';
const DEFAULT_LIMIT = 50;

const getTriggeredEvents = (
  facilityId,
  limit = DEFAULT_LIMIT,
  eventTypeId = DEFAULT_EVENT_TYPE_ID
) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.EVENTS_GET_START
    });

    return contxtSdk.events
      .getTriggeredEventsByFacilityId(facilityId, {
        eventTypeId,
        limit,
        orderBy: 'trigger_start_at',
        reverseOrder: true
      })
      .then((events) => {
        dispatch({
          type: actionTypes.EVENTS_GET_SUCCESS,
          payload: events.records
        });
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        dispatch({
          type: actionTypes.EVENTS_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

export { getTriggeredEvents };
