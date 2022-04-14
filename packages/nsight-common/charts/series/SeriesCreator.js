import { DateTime } from 'luxon';
import moment from 'moment';

import { CHART_DISPLAY_INTERVALS, CHART_TYPES } from '../constants';

const defaultSeriesInteractiveState = {
  hover: {
    enabled: true
  },
  select: {
    enabled: true
  },
  inactive: {
    opacity: 0.6
  }
};

/**
 * @typedef SeriesObject
 * @property {[]} data
 */

/**
 *
 * @property {chartData[]} [data]
 * @property name - name of the series
 * @property [rangeLabel] - a range label to append to the series name
 * @property color
 * @property {string} [unit] - data unit
 * @property {string} [displayInterval]
 * @property {boolean} [visible]
 * @property [states] - override states @see {@link [docs](https://api.highcharts.com/highcharts/plotOptions)}
 * @property [type] - type of chart if for some reason it should override the chart type (should be very rare
 * @property {number} [yearOffset] - to place multiple years of data on one year long x-axis, you need to fake
 * highcharts out by overriding the year for each point, forcing them to the same timeline.  Use this offset to do
 * that
 * @property {boolean} [useIndexForXAxisValue] - under certain conditions, you may prefer to use an index for
 * the x axis instead of the actual value
 * @property {boolean} [useEstimatedColors]
 * @property {string} [dateKey]
 * @property {string} [timezone]
 * @property {function[]} [dataDecorators] - an array of functions: ({originalPoint, color, processedPoints}) : configForDataPoint => {}
 * @property {object} [rest] any parameters defined in {@link [highcharts/series](https://api.highcharts.com/highcharts/series)}
 */
export default class SeriesCreator {
  data;
  name;
  rangeLabel;
  type;
  color;
  unit;
  visible;
  states;
  displayInterval;
  yearOffset;
  useIndexForXAxisValue;
  useArrayForDataValue;
  dateKey;
  timezone;
  dataDecorators;
  restSeriesProps;

  constructor({
    data,
    name,
    rangeLabel = '',
    type,
    color,
    unit = '',
    visible = true,
    states = defaultSeriesInteractiveState,
    displayInterval = CHART_DISPLAY_INTERVALS.DAY,
    yearOffset = 0,
    useIndexForXAxisValue = false,
    useArrayForDataValue = false,
    dateKey = 'effectiveEndDate',
    timezone = 'local',
    dataDecorators = [],
    ...rest
  }) {
    this.name = name;
    this.rangeLabel = rangeLabel;
    this.type = type;
    this.color = color;
    this.visible = visible;
    this.states = states;
    this.unit = unit;
    this.displayInterval = displayInterval;
    this.yearOffset = yearOffset;
    this.displayInterval = displayInterval;
    this.useIndexForXAxisValue = useIndexForXAxisValue;
    this.useArrayForDataValue = useArrayForDataValue;
    this.dateKey = dateKey;
    this.timezone = timezone;
    this.dataDecorators = dataDecorators;
    this.restSeriesProps = { ...rest };

    if (data) {
      this.createDataPoints(data);
    } else {
      this.data = [];
    }
  }

  update = (attributes) => {};

  getConfig = () => {
    return {
      name: `${this.name}  ${this.rangeLabel}`,
      type: this.type,
      color: this.color,
      states: this.states,
      visible: this.visible,
      data: this.data,
      ...this.restSeriesProps
    };
  };

  /**
   *
   * @param series
   * @param data
   */
  createDataPoints = (data) => {
    this.data = data.map((point, index) => {
      const value = point.value ? parseFloat(point.value) : null;

      let baseDataPoint = {
        isEstimated: point.isEstimated,
        seriesId: this.name,
        seriesColor: this.color,
        y: value,
        unit: this.unit
      };

      let dataPoint;

      if (point[this.dateKey]) {
        const time = this.__createTimeForPoint(
          point[this.dateKey],
          this.displayInterval,
          this.yearOffset,
          this.timezone
        );

        // TODO: reevaluate if this should always just be milliseconds
        const date = moment(time).toISOString();

        if (this.useIndexForXAxisValue === true) {
          dataPoint = {
            x: index,
            date
          };
        } else {
          dataPoint = { x: time, date };
        }

        // TODO, for very large datasets it's slow to use object dataPoints
        //  it would be beneficial to convert all of them to an array based point in
        //  the future, so that they can be treated the same
        if (this.useArrayForDataValue) {
          return [dataPoint.x, baseDataPoint.y]; //
        }

        if (this.dataDecorators.length) {
          baseDataPoint = this.dataDecorators.reduce((basePoint, decorator) => {
            const result = decorator({
              originalPoint: point,
              color: this.color,
              processedPoint: dataPoint
            });
            return { ...basePoint, ...result };
          }, baseDataPoint);
        }

        return {
          ...dataPoint,
          ...baseDataPoint,
          originalDate: point[this.dateKey]
        };
      }

      return [];
    });
  };

  __createTimeForPoint = (isoFormatDate) => {
    let date;

    switch (this.displayInterval) {
      case CHART_DISPLAY_INTERVALS.DAY:
      case CHART_DISPLAY_INTERVALS.HOUR:
        date = DateTime.fromISO(isoFormatDate, { zone: this.timezone })
          .plus({ year: this.yearOffset })
          .toUTC();
        break;
      case CHART_DISPLAY_INTERVALS.MONTH:
        // Adding one second required because 0 mins/secs/millis on the first
        // day of the month causes start of month to go back an extra month.. TODO, may be due to something else
        date = DateTime.fromISO(isoFormatDate, { zone: this.timezone })
          // .plus({ second: 1 })
          .startOf('month')
          .plus({ year: this.yearOffset });
        break;
    }

    if (date) {
      return date.toMillis();
    }

    throw new Error('no matching display interval');
  };

  static withColumns = ({ showIsEstimated }) => {
    return ({ originalPoint, color, processedPoint }) => ({
      seriesColor: color,
      borderColor:
        originalPoint.isEstimated && showIsEstimated ? '#E4B030' : color,
      borderWidth: originalPoint.isEstimated && showIsEstimated ? 3.5 : 0,
      dashStyle:
        originalPoint.isEstimated && showIsEstimated ? 'ShortDash' : 'Solid'
    });
  };

  /**
   * Returend function will be fed a data point and a color by the data creation function
   * @returns {function(*, *=): {marker: {fillColor: string|*, symbol: string, lineColor: *, radius: number, lineWidth: number, states: {hover: {radius: number}}}}}
   */
  static withEstimatedMarker = () => {
    return ({ originalPoint, color, processedPoint }) => ({
      marker: {
        symbol: 'circle',
        fillColor: originalPoint.isEstimated ? '#E4B030' : color,
        lineColor: color,
        lineWidth: 2,
        radius: 3.5,
        states: { hover: { radius: 5 } }
      }
    });
  };

  // TODO, this is probably the wrong path, revisit once config is further along
  //  probably makes more sense to always include the isoString, and that's it
  //  but something is using date deep in the config, and for filling in missing data.
  //  Both of those can be refactored and simplified

  static withFormattedDateFiled = ({ format }) => {
    return ({ originalPoint, color, processedPoint }) => ({
      date: moment(processedPoint.date).format(format),
      format
    });
  };

  /**
   * This function assumes that the array it receives is always in the order [primary, secondary, tertiary, ...]
   * and returns the array in the order best suited for the chart type.  For instance, to get primary data
   * on top in an areaspline graph, it must be last in the array.
   * @param seriesArray
   * @param chartType
   * @returns {*}
   */
  static orderSeriesByChartType = (seriesArray, chartType) => {
    switch (chartType) {
      case CHART_TYPES.COLUMN:
        return seriesArray;
      case CHART_TYPES.AREASPLINE:
        return seriesArray.reverse();
      default:
        return seriesArray;
    }
  };
}
