import { createSelector } from 'reselect';

import {
  getComparisonDetail,
  getPrimaryDetail
} from '@ndustrial/nsight-common/selectors';

const getKpiDetailChartDataStatus = createSelector(
  [getPrimaryDetail, getComparisonDetail],
  (primaryDetail, comparisonDetail) => {
    let isFinishedAndNoData = false;

    if (
      (primaryDetail &&
        !primaryDetail.isLoading &&
        primaryDetail.values.length === 0) ||
      (comparisonDetail &&
        !comparisonDetail.isLoading &&
        comparisonDetail.values.length === 0)
    ) {
      isFinishedAndNoData = true;
    }

    return isFinishedAndNoData;
  }
);

export default getKpiDetailChartDataStatus;
