import { createSelector, createStructuredSelector } from 'reselect';

import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import { chartConfigurations, demandHeatmapUtils } from '../../../helpers';
import getDemandComparisonLoadingStatus from '../../demandComparison/selectors/getDemandComparisonLoadingStatus';
import { getDemandUnits } from '../../facilityMetadata/selectors';

const getHeatmapDemandData = (state) => state.heatmapDemand.data;

const getHeatmapChartConfig = createSelector(
  getHeatmapDemandData,
  getSelectedFacility,
  getDemandUnits,
  (demandData, selectedFacility, units) => {
    const baseChartOptions = {};
    const timezone = selectedFacility && selectedFacility.timezone;

    if (demandData) {
      const chartConfigObj = demandHeatmapUtils.formatDailyDemand(
        demandData,
        timezone
      );
      const heatmapChartConfig = chartConfigurations.getHeatmapDemandConfig(
        chartConfigObj,
        units
      );
      return heatmapChartConfig;
    } else {
      return baseChartOptions;
    }
  }
);

const getDemandHeatmapHasData = createSelector(
  getHeatmapDemandData,
  (dailyHeatmapDemand) =>
    dailyHeatmapDemand &&
    dailyHeatmapDemand.values &&
    dailyHeatmapDemand.values.length > 0
);

const getDemandHeatmapWarning = createSelector(
  getHeatmapDemandData,
  (dailyHeatmapDemand) => {
    if (dailyHeatmapDemand) {
      return dailyHeatmapDemand._metadata.error;
    }
    return '';
  }
);

const getError = createSelector(
  getHeatmapDemandData,
  (dailyHeatmapDemand) =>
    dailyHeatmapDemand && dailyHeatmapDemand._metadata.error
);

const getDailyHeatmapData = createStructuredSelector({
  chartOptions: getHeatmapChartConfig,
  error: getError,
  hasData: getDemandHeatmapHasData,
  isLoading: getDemandComparisonLoadingStatus,
  warning: getDemandHeatmapWarning
});

export default getDailyHeatmapData;
