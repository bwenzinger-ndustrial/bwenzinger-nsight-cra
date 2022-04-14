import { createSelector } from 'reselect';

import getUtilityDemandSeriesData from './getUtilityDemandSeriesData';

const getUtilityDemandSummary = createSelector(
  getUtilityDemandSeriesData,
  (seriesData) => {
    if (!seriesData) {
      return null;
    }

    const primaryTotal = seriesData.primary.reduce((memo, point) => {
      memo += point.y;
      return memo;
    }, 0);

    const comparisonTotal = seriesData.comparison.reduce((memo, point) => {
      memo += point.y;
      return memo;
    }, 0);

    return {
      primaryTotal,
      comparisonTotal
    };
  }
);

export default getUtilityDemandSummary;
