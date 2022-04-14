import { round } from 'lodash';
import moment from 'moment';
import { createSelector } from 'reselect';

import getActualDemand from './getActualDemand';
import getCurrentRun from './getCurrentRun';
import getHourlyWeather from './getHourlyWeather';

const hasValue = (value) => value || value === 0;

const formatVariance = (forecasted, actual, significantDigits) => {
  if (!(hasValue(forecasted) && hasValue(actual))) {
    return 'N/A';
  }

  const difference = forecasted - actual;
  const isOverEstimation = forecasted > actual;

  if (difference === 0) {
    return difference.toFixed(significantDigits);
  }

  return (
    (isOverEstimation ? '+' : '-') +
    Math.abs(round(difference, significantDigits)).toFixed(significantDigits)
  );
};

const getDetailTableInfo = createSelector(
  getCurrentRun,
  getActualDemand,
  getHourlyWeather,
  (run, actualDemand, hourlyWeather) => {
    const data = {
      dates: {},
      region: run.region,
      runId: run.runId,
      time: run.time
    };

    if (!run.data.forecast) {
      return data;
    }

    const formattedActualDemand = actualDemand.length
      ? actualDemand.reduce((memo, row) => {
          const key = moment(row.time).unix();

          memo[key] = row.value;

          return memo;
        }, {})
      : {};
    const formattedActualTemp = hourlyWeather.length
      ? hourlyWeather.reduce((memo, row) => {
          memo[row.time] = row.value;

          return memo;
        }, {})
      : {};

    Object.keys(run.data.forecast).forEach((key) => {
      const dateTime = moment.unix(key);
      const date = dateTime.format('YYYY-MM-DD');
      const hour = dateTime.format('hh:mm a');

      const riskProbability = hasValue(run.data.currentRisk[key])
        ? round(run.data.currentRisk[key] * 100, 1).toFixed(1)
        : 'N/A';
      const forecastedLoad = hasValue(run.data.forecast[key])
        ? round(run.data.forecast[key], 0).toFixed(0)
        : 'N/A';
      const actualLoad = hasValue(formattedActualDemand[key])
        ? round(formattedActualDemand[key], 0).toFixed(0)
        : 'N/A';
      const loadVariance = formatVariance(
        run.data.forecast[key],
        formattedActualDemand[key],
        0
      );
      const forecastedTemp = hasValue(run.data.temperature[key])
        ? round(run.data.temperature[key], 1).toFixed(1)
        : 'N/A';
      const actualTemp = hasValue(formattedActualTemp[key])
        ? round(formattedActualTemp[key], 1).toFixed(1)
        : 'N/A';
      const tempVariance = formatVariance(
        run.data.temperature[key],
        formattedActualTemp[key],
        1
      );

      if (!data.dates[date]) {
        data.dates[date] = [];
      }

      data.dates[date].push({
        actualLoad,
        actualTemp,
        hour,
        forecastedLoad,
        forecastedTemp,
        loadVariance,
        riskProbability,
        tempVariance
      });
    });

    return data;
  }
);

export default getDetailTableInfo;
