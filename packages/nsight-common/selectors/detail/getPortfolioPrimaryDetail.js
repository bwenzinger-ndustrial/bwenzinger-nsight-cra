import { createSelector } from 'reselect';

import getActiveMetric from '../metric/getActiveMetric';

const getPrimaryDetailByMetric = (state) =>
  state.portfolioPrimaryDetail.primaryDetailByMetric;

const getPortfolioPrimaryDetail = createSelector(
  [getActiveMetric, getPrimaryDetailByMetric],
  (activeMetric, primaryDetailByMetric) => {
    return primaryDetailByMetric[activeMetric];
  }
);

export default getPortfolioPrimaryDetail;
