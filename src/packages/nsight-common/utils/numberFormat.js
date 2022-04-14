import _ from 'lodash';

function _toLocaleStringSupportsOptions() {
  return !!(
    typeof Intl === 'object' &&
    Intl &&
    typeof Intl.NumberFormat === 'function'
  );
}

// When available in modern browsers, Number.toLocaleString lets us create
// locale specific formatting that we won't get with just _.round.
// i.e with just round: 1000000 vs toLocaleString 1,000,000

// TODO, not using full potential yet, but could add precision/rounding to config

const roundNumberString = ({ num, significantDigits, format = false }) => {
  if (_toLocaleStringSupportsOptions() && format) {
    return num.toLocaleString(undefined, {
      maximumSignificantDigits: significantDigits,
      minimumSignificantDigits: significantDigits
    });
  }

  return _.round(num, significantDigits);
};

export { roundNumberString };
