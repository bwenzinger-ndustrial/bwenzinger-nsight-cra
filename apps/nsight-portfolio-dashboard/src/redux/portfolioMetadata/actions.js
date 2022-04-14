import moment from 'moment';

import actionTypes from './actionTypes';

// Show last "closed" month by default
function setRangeEnd(
  momentObj = moment()
    .subtract(1, 'month')
    .endOf('month')
) {
  return {
    type: actionTypes.SET_RANGE_END,
    payload: {
      month: momentObj.month() + 1,
      year: momentObj.year()
    }
  };
}

export { setRangeEnd };
