import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function getUserSubscriptionInfo(currentUserId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_USER_SUBSCRIPTION_INFO_START });

    return contxtSdk.events
      .getUserInfo(currentUserId)
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_USER_SUBSCRIPTION_INFO_SUCCESS,
          payload: response.userEventSubscriptions
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_USER_SUBSCRIPTION_INFO_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

function subscribeUserToEvent(currentUserId, eventId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_SUBSCRIBE_EVENT_START });

    return contxtSdk.events
      .subscribeUser(currentUserId, eventId, { medium_type: 'email' })
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_SUBSCRIBE_EVENT_SUCCESS,
          payload: response
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_SUBSCRIBE_EVENT_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

function unsubscribeUserFromEvent(
  currentUserId,
  userEventSubscriptionId,
  eventId
) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_UNSUBSCRIBE_EVENT_START });

    return contxtSdk.events
      .unsubscribeUser(currentUserId, userEventSubscriptionId)
      .then(() => {
        dispatch({
          type: actionTypes.LOAD_UNSUBSCRIBE_EVENT_SUCCESS,
          payload: eventId
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_UNSUBSCRIBE_EVENT_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

export {
  getUserSubscriptionInfo,
  subscribeUserToEvent,
  unsubscribeUserFromEvent
};
