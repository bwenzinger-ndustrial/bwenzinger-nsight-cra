import _ from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { BaseChartConfig } from '@ndustrial/nsight-common/charts/configs';

import { blendedRateChartUtils, chartConfigurations } from '../../../helpers';
import getBlendedRateLoadingStatus from './getBlendedRateLoadingStatus';

const getBlendedRateData = (state) => state.blendedRate;
const getBlendedRateAverageData = (state) => state.blendedRateAverage;
const getTheme = (state) => state.user && state.user.theme;

const getBlendedRateAverage = createSelector(
  getBlendedRateData,
  (blendedRate) => {
    if (blendedRate && blendedRate.series) {
      const avgs = {
        curr: 0,
        prev: 0
      };
      if (blendedRate.series.curr.length > 0) {
        let sum = 0;

        blendedRate.series.curr.forEach((a) => {
          sum += parseFloat(a.value);
        });

        const avg = sum / blendedRate.series.curr.length;

        avgs.curr = _.round(avg, 3).toFixed(3);
      }

      if (blendedRate.series.prev.length > 0) {
        let sum = 0;

        blendedRate.series.prev.forEach((a) => {
          sum += parseFloat(a.value);
        });

        const avg = sum / blendedRate.series.prev.length;

        avgs.prev = _.round(avg, 3).toFixed(3);
      }

      return avgs;
    }

    return {};
  }
);

const getBlendedRateChartConfig = createSelector(
  [getBlendedRateData, getBlendedRateAverage, getTheme],
  (blendedRate, blendedRateAverage, theme) => {
    if (blendedRate && blendedRate.series) {
      const series = blendedRateChartUtils.formatBlendedRateData(
        blendedRate.series.curr,
        blendedRate.series.prev,
        blendedRateAverage,
        theme
      );
      const max = blendedRateChartUtils.getBlendedRateCeiling(blendedRate);

      const baseChartOptions = BaseChartConfig.getCommonChartConfig({
        theme,
        chartType: 'line'
      });

      const blendedRateChartConfig = chartConfigurations.getBlendedRateChartConfig(
        {
          max,
          series
        }
      );

      const newChartOptions = _.merge(baseChartOptions, blendedRateChartConfig);

      return newChartOptions;
    }
    return {
      chart: {}
    };
  }
);

const getBlendedRateHasData = createSelector(
  getBlendedRateData,
  (blendedRate) => {
    if (blendedRate && blendedRate.series) {
      return blendedRate.series.length > 0;
    }
    return false;
  }
);

const getError = createSelector(
  getBlendedRateData,
  (blendedRate) => blendedRate && blendedRate.error
);

const getBlendedRate = createStructuredSelector({
  blendedRateAverage: getBlendedRateAverage,
  chartOptions: getBlendedRateChartConfig,
  error: getError,
  hasData: getBlendedRateHasData,
  isLoading: getBlendedRateLoadingStatus
});

export { getBlendedRateAverageData as getBlendedRateAvg };
export default getBlendedRate;
