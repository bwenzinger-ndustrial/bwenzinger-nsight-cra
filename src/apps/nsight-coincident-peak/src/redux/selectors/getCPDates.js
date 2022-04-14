import moment from 'moment';
import { createSelector } from 'reselect';

const getCPSelectedDate = (state) => state.router.location.query.selectedDate;

const getCPDates = createSelector(
  getCPSelectedDate,
  (selectedDate) => {
    if (!selectedDate) {
      return {};
    }

    // Need to fetch 7 days since we need the data point from midnight on the last day (it represents the run of the previous hour (11:00-11:59)
    return {
      from: moment(selectedDate, 'YYYY-MM-DD'),
      to: moment(selectedDate, 'YYYY-MM-DD')
        .clone()
        .add(7, 'days')
        .startOf('day')
    };
  }
);

export default getCPDates;
