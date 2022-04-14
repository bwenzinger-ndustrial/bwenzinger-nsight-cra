import { contxtSdk } from '../utils';
import actionTypes from './feedStatusActionTypes';

function loadFeedStatusForFacility(facilityId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_FEED_STATUSES_START });

    return contxtSdk.iot.feeds
      .getStatusForFacility(facilityId)
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_FEED_STATUSES_SUCCESS,
          payload: response.feeds
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_FEED_STATUSES_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

export { loadFeedStatusForFacility };
