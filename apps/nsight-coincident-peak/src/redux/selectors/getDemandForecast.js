import _ from 'lodash';
import { createSelector } from 'reselect';

import getDataInDateRange from '../../helpers/getDataInDateRange';
import getCPDates from './getCPDates';
import getCurrentRun from './getCurrentRun';

const getDemandForecast = createSelector(
  getCPDates,
  getCurrentRun,
  (cpDates, run) => {
    const historicPeaks = run.data.historicPeaks
      ? Object.keys(run.data.historicPeaks).map(
          (val) => run.data.historicPeaks[val]
        )
      : [];

    const currentPeakSeries = _.map(run.data.currentPeak, (val, key) => ({
      time: key,
      value: val
    }));
    const currentRiskSeries = _.map(run.data.currentRisk, (val, key) => ({
      time: key,
      value: val
    }));
    const forecastSeries = _.map(run.data.forecast, (val, key) => ({
      time: key,
      value: val
    }));
    const historicPeakSeries = _.flatten(
      historicPeaks.map((val) => {
        return Object.keys(val).map((key) => ({
          time: key,
          value: val[key]
        }));
      })
    );
    const historicRiskSeries = _.map(run.data.historicRisk, (val, key) => ({
      time: key,
      value: val
    }));
    const temperatureSeries = _.map(run.data.temperature, (val, key) => ({
      time: key,
      value: val
    }));

    return {
      series: {
        currentPeak: currentPeakSeries,
        currentRisk: getDataInDateRange(currentRiskSeries, cpDates),
        forecast: getDataInDateRange(forecastSeries, cpDates),
        historicPeak: historicPeakSeries,
        historicRisk: getDataInDateRange(historicRiskSeries, cpDates),
        forecastedTemp: getDataInDateRange(temperatureSeries, cpDates)
      },
      region: run.region,
      runId: run.runId,
      time: run.time
    };
  }
);

export default getDemandForecast;
