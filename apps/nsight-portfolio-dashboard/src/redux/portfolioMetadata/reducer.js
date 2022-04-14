import moment from 'moment';

import actionTypes from './actionTypes';

const INITIAL_STATE = {};

function portfolioMetadata(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_RANGE_END: {
      const primaryRangeEnd = moment()
        .utc()
        .month(payload.month - 1)
        .year(payload.year)
        .endOf('month');
      const primaryRangeStart = primaryRangeEnd
        .clone()
        .subtract(11, 'months')
        .startOf('month');
      const secondaryRangeEnd = primaryRangeEnd
        .clone()
        .subtract(12, 'months')
        .endOf('month');
      const secondaryRangeStart = primaryRangeStart
        .clone()
        .subtract(12, 'months')
        .startOf('month');

      return {
        ...state,
        currentMonth: payload.month,
        currentYear: payload.year,
        primaryRangeStart: primaryRangeStart.toISOString(),
        primaryRangeEnd: primaryRangeEnd.toISOString(),
        secondaryRangeStart: secondaryRangeStart.toISOString(),
        secondaryRangeEnd: secondaryRangeEnd.toISOString()
      };
    }

    default:
      return state;
  }
}

export { INITIAL_STATE };
export default portfolioMetadata;
