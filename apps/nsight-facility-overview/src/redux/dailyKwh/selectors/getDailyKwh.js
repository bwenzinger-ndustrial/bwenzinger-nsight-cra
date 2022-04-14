import { createSelector, createStructuredSelector } from 'reselect';

import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import { chartConfigurations, dailyKwhChartUtils } from '../../../helpers';
import getDailyKwhLoadingStatus from './getDailyKwhLoadingStatus';

const getDailyKwhData = (state) => state.dailyKwh;
const getTheme = (state) => state.user && state.user.theme;

const getDailyKwhChartConfig = createSelector(
  getDailyKwhData,
  getSelectedFacility,
  getTheme,
  (dailyKwhData, selectedFacility, theme) => {
    const baseChartOptions = { chart: { type: '' } };
    const timezone = selectedFacility && selectedFacility.timezone;

    if (dailyKwhData) {
      const series = dailyKwhChartUtils.getDailyKwhSeries(
        dailyKwhData,
        timezone,
        theme
      );
      const chartConfigObj = {
        series
      };
      return chartConfigurations.getDailyKwhChartConfig(chartConfigObj);
    } else {
      return baseChartOptions;
    }
  }
);

const getDailyKwhHasData = createSelector(
  getDailyKwhData,
  (dailyKwh) => {
    if (dailyKwh) {
      return dailyKwh.current.length > 0 || dailyKwh.last.length > 0;
    }
    return false;
  }
);

const getDailyKwhWarning = createSelector(
  getDailyKwhData,
  (dailyKwh) => {
    if (!dailyKwh) {
      return dailyKwh.current._metadata.error || dailyKwh.last._metadata.error;
    }
    return '';
  }
);

const getError = createSelector(
  getDailyKwhData,
  (dailyKwh) => dailyKwh && dailyKwh.error
);

const getKwhData = createStructuredSelector({
  chartOptions: getDailyKwhChartConfig,
  error: getError,
  hasData: getDailyKwhHasData,
  isLoading: getDailyKwhLoadingStatus,
  warning: getDailyKwhWarning
});

export default getKwhData;
