import { createSelector } from 'reselect';

import getActiveMetric from '../metric/getActiveMetric';

const getComparisonDetailByMetric = (state) =>
  state.portfolioComparisonDetail.comparisonDetailByMetric;

const getPortfolioComparisonDetail = createSelector(
  [getActiveMetric, getComparisonDetailByMetric],
  (activeMetric, comparisonDetailByMetric) => {
    return comparisonDetailByMetric[activeMetric];
  }
);

export default getPortfolioComparisonDetail;
