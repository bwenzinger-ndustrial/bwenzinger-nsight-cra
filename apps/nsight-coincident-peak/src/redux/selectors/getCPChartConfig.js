import _ from 'lodash';
import { createSelector } from 'reselect';

import { BaseChartConfig } from '@ndustrial/nsight-common/charts/configs';

import { chartConfigurations, chartUtils } from '../../helpers';
import getActualDemand from './getActualDemand';
import getCPDates from './getCPDates';
import getDemandForecast from './getDemandForecast';
import getHourlyWeather from './getHourlyWeather';
import getRegionLocations from './getRegionLocations';
import getSelectedLocation from './getSelectedLocation';

const getTheme = (state) => state.user && state.user.theme;

const getCoincidentPeak = createSelector(
  getDemandForecast,
  getActualDemand,
  getCPDates,
  getHourlyWeather,
  getRegionLocations,
  getSelectedLocation,
  getTheme,
  (
    demandForecast,
    actualDemand,
    cpDates,
    hourlyWeather,
    locations,
    selectedLocation,
    theme
  ) => {
    const baseConfig = BaseChartConfig.getCommonChartConfig({
      theme,
      chartType: 'line'
    });

    if (demandForecast && actualDemand && hourlyWeather) {
      const actualDemandSeries = _.map(
        _.sortBy(actualDemand, ['time']),
        (val) => ({
          time: val.time,
          value: val.value
        })
      );

      const historicPeakSeries = demandForecast.series.historicPeak.length
        ? chartUtils.buildPeakSeries(
            demandForecast.series,
            demandForecast.series.historicPeak,
            '#E9724C',
            'Historic Peak',
            cpDates
          )
        : [];

      const currentPeakSeries = demandForecast.series.currentPeak.length
        ? chartUtils.buildPeakSeries(
            demandForecast.series,
            demandForecast.series.currentPeak,
            '#6E0E0A',
            'Month-to-date Peak',
            cpDates
          )
        : [];

      const coincidentPeakConfig = chartConfigurations.getCoincidentPeakConfig(
        demandForecast.series,
        actualDemandSeries,
        hourlyWeather,
        historicPeakSeries,
        currentPeakSeries,
        cpDates,
        selectedLocation,
        locations
      );

      const newChartOptions = _.merge(baseConfig, coincidentPeakConfig);
      return newChartOptions;
    } else {
      return baseConfig;
    }
  }
);

export default getCoincidentPeak;
