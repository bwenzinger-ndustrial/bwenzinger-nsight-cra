import actionTypes from './actionTypes';

const INITIAL_STATE = {
  error: null,
  items: [],
  lastUpdatedAt: undefined
};

function eventsReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
    case actionTypes.EVENTS_GET_SUCCESS:
      const items = payload.reduce(function(memo, event) {
        try {
          const data = JSON.parse(event.data);
          if (data.feed_type === 'monnit') {
            return memo;
          }

          memo.push({
            id: event.id,
            data,
            triggerDate: event.triggerStartAt,
            resolveDate: event.triggerEndAt
          });
          return memo;
        } catch (e) {
          return memo;
        }
      }, []);

      return {
        ...state,
        error: null,
        items: items.slice(0, 4), // Temporary hack until we have a better filter on the backend
        lastUpdatedAt: Date.now()
      };

    case actionTypes.EVENTS_GET_FAILURE:
      return {
        ...state,
        error: payload
      };

    case 'SET_SELECTED_FACILITY_SLUG': {
      return {
        ...INITIAL_STATE
      };
    }

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default eventsReducer;
