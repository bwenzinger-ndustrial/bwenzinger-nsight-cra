import actionTypes from './actionTypes';

const INITIAL_STATE = {
  items: {},
  hasError: false
};

function eventsReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.LOAD_SUBSCRIBE_EVENT_FAILURE:
      return {
        ...state,
        error: payload,
        hasError: true
      };

    case actionTypes.LOAD_SUBSCRIBE_EVENT_START:
      return { ...state, hasError: false };

    case actionTypes.LOAD_SUBSCRIBE_EVENT_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload.eventId]: {
            eventId: payload.eventId,
            subscriptionId: payload.id
          }
        }
      };

    case actionTypes.LOAD_UNSUBSCRIBE_EVENT_FAILURE:
      return {
        ...state,
        error: payload,
        hasError: true
      };

    case actionTypes.LOAD_UNSUBSCRIBE_EVENT_START:
      return { ...state, hasError: false };

    case actionTypes.LOAD_UNSUBSCRIBE_EVENT_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [payload]: undefined
        }
      };

    case actionTypes.LOAD_USER_SUBSCRIPTION_INFO_FAILURE:
      return {
        ...state,
        error: payload,
        hasError: true
      };

    case actionTypes.LOAD_USER_SUBSCRIPTION_INFO_START:
      return { ...state, hasError: false };

    case actionTypes.LOAD_USER_SUBSCRIPTION_INFO_SUCCESS:
      const items = payload.reduce((memo, subscription) => {
        memo[subscription.eventId] = {
          eventId: subscription.eventId,
          subscriptionId: subscription.id
        };
        return memo;
      }, {});

      return {
        ...state,
        items
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default eventsReducer;
