import { normalizeSchedule } from '../../helpers';
import actionTypes from './actionTypes';

const INITIAL_STATE = {
  items: {},
  orderedItemIds: []
};

function schedulesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.LOAD_RATE_SCHEDULE_SUCCESS:
      const { demandSeasons, energySeasons, ...restSchedule } = action.payload;

      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...restSchedule,
            ...normalizeSchedule(action.payload)
          }
        }
      };

    case actionTypes.LOAD_RATE_SCHEDULES_SUCCESS:
      const { items, orderedItemIds } = action.payload.schedules.reduce(
        (memo, schedule) => {
          const { demandSeasons, energySeasons, ...restSchedule } = schedule;

          memo.items[schedule.id] = {
            ...restSchedule,
            ...normalizeSchedule(schedule)
          };
          memo.orderedItemIds.push(schedule.id);

          return memo;
        },
        { items: {}, orderedItemIds: [] }
      );

      return {
        ...state,
        items,
        orderedItemIds
      };

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default schedulesReducer;
