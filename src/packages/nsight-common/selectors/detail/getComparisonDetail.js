import { createSelector } from 'reselect';

import getActiveMetric from '../metric/getActiveMetric';

const getComparisonDetailByMetric = (state) =>
  state.comparisonDetail.comparisonDetailByMetric;

const getComparisonDetail = createSelector(
  [getActiveMetric, getComparisonDetailByMetric],
  (activeMetric, comparisonDetailByMetric) => {
    return comparisonDetailByMetric[activeMetric];
  }
);

export default getComparisonDetail;
