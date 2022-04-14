import { createSelector } from 'reselect';

import getActiveMetric from '../metric/getActiveMetric';

const getPrimaryDetailByMetric = (state) =>
  state.primaryDetail.primaryDetailByMetric;

const getPrimaryDetail = createSelector(
  [getActiveMetric, getPrimaryDetailByMetric],
  (activeMetric, primaryDetailByMetric) => {
    return primaryDetailByMetric[activeMetric];
  }
);

export default getPrimaryDetail;
