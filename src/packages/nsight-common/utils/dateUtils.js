import { DateTime } from 'luxon';
import moment from 'moment';

/**
 * Validates a date string to ensure it is a date and that it is in the past
 *
 * @export
 * @param {String} dateString
 * @return {moment} A moment date object or null
 */
function validatePastDate(dateString) {
  const dateMoment = moment(dateString);
  if (!dateString || !dateMoment.isValid()) {
    return null;
  }

  return dateMoment.isAfter(moment()) ? moment() : dateMoment;
}

function getStartOfDayISOString(date) {
  return date
    .clone()
    .utc()
    .startOf('day')
    .toISOString();
}

function getEndOfDayISOString(date) {
  return date
    .clone()
    .utc()
    .endOf('day')
    .toISOString();
}

function luxonNowWithTimezone(timezone) {
  return DateTime.fromJSDate(new Date(), { timezone });
}

export {
  getEndOfDayISOString,
  getStartOfDayISOString,
  luxonNowWithTimezone,
  validatePastDate
};
