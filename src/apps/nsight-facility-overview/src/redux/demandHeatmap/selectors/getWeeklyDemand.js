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
      const chartConfigObj = demandHeatmapUtils.formatWeeklyDemand(
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
  (weeklyHeatmapDemand) => {
    if (weeklyHeatmapDemand) {
      return weeklyHeatmapDemand.values.length > 0;
    }
    return false;
  }
);

const getDemandHeatmapWarning = createSelector(
  getHeatmapDemandData,
  (weeklyHeatmapDemand) => {
    if (weeklyHeatmapDemand) {
      return weeklyHeatmapDemand._metadata.error;
    }
    return '';
  }
);

const getError = createSelector(
  getHeatmapDemandData,
  (weeklyHeatmapDemand) =>
    weeklyHeatmapDemand && weeklyHeatmapDemand._metadata.error
);

const getWeeklyHeatmapData = createStructuredSelector({
  chartOptions: getHeatmapChartConfig,
  error: getError,
  hasData: getDemandHeatmapHasData,
  isLoading: getDemandComparisonLoadingStatus,
  warning: getDemandHeatmapWarning
});

export default getWeeklyHeatmapData;
