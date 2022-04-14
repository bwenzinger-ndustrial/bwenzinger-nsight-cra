const PLOTLINE_LABEL_OFFSET = { prev: -10, curr: -10 };
const MOBILE_PLOTLINE_LABEL_OFFSET = { prev: -32, curr: -32 };

const TICK_INTERVALS = {
  DEFAULT: 1,
  DAY: 24 * 3600 * 1000,
  WEEK: 24 * 3600 * 1000 * 7,
  MONTH: 1000 * 3600 * 24 * 31 // splits the difference between previous calcs (1000 * 3600 * 24 * 29 vs. 28 * 24 * 3600 * 1000)
};

const CHART_DISPLAY_INTERVALS = {
  HOUR: 'hour',
  DAY: 'day',
  MONTH: 'month'
};

/**
 * To add more chart types see {@link [plotOptions](https://api.highcharts.com/highcharts/plotOptions)}
 * @type {{COLUMN: string, AREASPLINE: string}}
 */
const CHART_TYPES = {
  AREASPLINE: 'areaspline',
  COLUMN: 'column',
  LINE: 'line'
};

/**
 * Formats used to display various moment (or luxon) dates on highcharts graphs
 * @type {{ddd_MMM_D_YYYY: string, YYY_MM_DD: string, MMM_DD_YYYY: string}}
 */
const DATE_FORMATS = {
  YYY_MM_DD: 'YYYY-MM-DD',
  ddd_MMM_D_YYYY: 'ddd, MMM D, YYYY',
  MMM_DD_YYYY: 'MMM DD, YYYY',
  MMM_YYYY: 'MMM, YYYY'
};

export {
  CHART_DISPLAY_INTERVALS,
  CHART_TYPES,
  DATE_FORMATS,
  MOBILE_PLOTLINE_LABEL_OFFSET,
  PLOTLINE_LABEL_OFFSET,
  TICK_INTERVALS
};
