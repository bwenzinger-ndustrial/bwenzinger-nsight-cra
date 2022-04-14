import _ from 'lodash';
import { createSelector, createStructuredSelector } from 'reselect';

import { BaseChartConfig } from '@ndustrial/nsight-common/charts/configs';

import { chartConfigurations } from '../../../helpers';
import getUtilityDemandComparisonLoadingStatus from './getUtilityDemandComparisonLoadingStatus';
import getUtilityDemandSeriesData from './getUtilityDemandSeriesData';
import getUtilityDemandUnit from './getUtilityDemandUnit';

const getUtilityDemand = (state) => state.utilityDemandData;
const getTheme = (state) => state.user && state.user.theme;

const getUtilityDemandComparisonChartConfig = createSelector(
  getUtilityDemandSeriesData,
  getUtilityDemandUnit,
  getTheme,
  (seriesData, utilityDemandUnit, theme) => {
    const baseChartOptions = BaseChartConfig.getCommonChartConfig({
      theme,
      chartType: 'column'
    });
    if (!seriesData) {
      return baseChartOptions;
    }

    return _.merge(
      baseChartOptions,
      chartConfigurations.getUtilityDemandChartConfig(
        seriesData.primary,
        seriesData.comparison,
        utilityDemandUnit,
        theme
      )
    );
  }
);

const getUtilityDemandComparisonHasData = createSelector(
  getUtilityDemand,
  (utilityDemand) => {
    if (utilityDemand) {
      return utilityDemand.demand || utilityDemand.usage;
    }
    return false;
  }
);

const getUtilityDemandComparisonWarning = createSelector(
  getUtilityDemand,
  (utilityDemand) => {
    if (utilityDemand) {
      return utilityDemand.error;
    }
    return '';
  }
);

const getError = createSelector(
  getUtilityDemand,
  (utilityDemand) => utilityDemand && utilityDemand.error
);

const getUtilityDemandComparison = createStructuredSelector({
  chartOptions: getUtilityDemandComparisonChartConfig,
  error: getError,
  hasData: getUtilityDemandComparisonHasData,
  isLoading: getUtilityDemandComparisonLoadingStatus,
  warning: getUtilityDemandComparisonWarning
});

export default getUtilityDemandComparison;
