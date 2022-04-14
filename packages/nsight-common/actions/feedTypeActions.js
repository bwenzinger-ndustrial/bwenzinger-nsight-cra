import { contxtSdk } from '../utils';
import actionTypes from './feedTypeActionTypes';

const getFeedTypes = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FEED_TYPES_GET_START });

    return contxtSdk.iot.feedTypes
      .getAll()
      .then((feedTypes) => {
        dispatch({
          type: actionTypes.FEED_TYPES_GET_SUCCESS,
          payload: feedTypes
        });
      })
      .catch((err) => {
        const error = err.response ? err.response.data.message : err.message;
        dispatch({
          type: actionTypes.FEED_TYPES_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

export { getFeedTypes };
