// TODO: move to luxon asap
import moment from 'moment';

import { CHART_DISPLAY_INTERVALS, CHART_TYPES } from '../constants';

function fillMissingBreakdownData(startDate, endDate, data, isRealTimeEnabled) {
  let index = 0;
  const timeframe = isRealTimeEnabled ? 'day' : 'month';
  const dateFormat = isRealTimeEnabled ? 'YYYY-MM-DD' : 'YYYY-MM';
  const sortedData = [...data];

  const startMoment = moment(startDate)
    .utc()
    .startOf(timeframe);
  const endMoment = moment(endDate)
    .utc()
    .endOf(timeframe);

  while (startMoment.isSameOrBefore(endMoment)) {
    if (!sortedData[index]) {
      sortedData.splice(index, 0, {
        effectiveStartDate: startMoment.toISOString(),
        value: null
      });
    } else if (
      moment(sortedData[index].effectiveStartDate).format(dateFormat) !==
        startMoment.format(dateFormat) &&
      isRealTimeEnabled
    ) {
      sortedData.splice(index, 0, {
        effectiveStartDate: startMoment.toISOString(),
        value: null
      });
    }

    index++;
    startMoment.add(1, timeframe);
  }

  return sortedData;
}

const fillMissingDetailData = (
  startDate,
  endDate,
  data,
  window = CHART_DISPLAY_INTERVALS.DAY
) => {
  let index = 0;

  const sortedData = data
    .map((d) => ({
      ...d,
      unixDate: moment(d.date, 'ddd, MMM D, YYYY')
        .startOf('day')
        .unix()
    }))
    .sort((a, b) => (a.unixDate > b.unixDate ? 1 : -1));

  const startMoment = moment(startDate).startOf('day');
  const endMoment = moment(endDate).endOf('day');

  while (startMoment.isSameOrBefore(endMoment)) {
    if (!sortedData[index]) {
      sortedData.splice(index, 0, {
        date: startMoment.format('ddd, MMM DD, YYYY'),
        x: index,
        y: null
      });
    } else {
      if (sortedData[index].unixDate !== startMoment.unix()) {
        sortedData.splice(index, 0, {
          x: index,
          y: null,
          date: startMoment.format('ddd, MMM DD, YYYY')
        });

        // need to increment x values for remaining records
        for (let i = index + 1; i < sortedData.length; i++) {
          sortedData[i].x = i;
        }
      }
    }

    index++;
    startMoment.add(1, window);
  }

  return sortedData;
};

/**
 * This function assumes that the array it receives is always in the order [primary, secondary, tertiary, ...]
 * and returns the array in the order best suited for the chart type.  For instance, to get primary data
 * on top in an areaspline graph, it must be last in the array.
 * @param seriesArray
 * @param chartType
 * @returns {*}
 */
const orderSeriesByChartType = (seriesArray, chartType) => {
  switch (chartType) {
    case CHART_TYPES.COLUMN:
      return seriesArray;
    case CHART_TYPES.AREASPLINE:
      return seriesArray.reverse();
    default:
      return seriesArray;
  }
};

export {
  fillMissingBreakdownData,
  fillMissingDetailData,
  orderSeriesByChartType
};
