import { createSelector } from 'reselect';

import getPortfolioComparisonDetail from './detail/getPortfolioComparisonDetail';
import getPortfolioPrimaryDetail from './detail/getPortfolioPrimaryDetail';
import { getComparisonDetail, getPrimaryDetail } from './index';

const getKpiState = (state) => state.kpiCard;

const makeHasEstimatedDataSelector = (isDetailRoute, isPortfolioRoute) => {
  let comparisonSelector = getComparisonDetail;
  let primarySelector = getPrimaryDetail;

  if (isPortfolioRoute) {
    comparisonSelector = getPortfolioComparisonDetail;
    primarySelector = getPortfolioPrimaryDetail;
  }
  return createSelector(
    [comparisonSelector, getKpiState, primarySelector],
    (comparisonDetail, kpiState, primaryDetail) => {
      if (!isDetailRoute) {
        for (const kpi in kpiState) {
          const kpiObj = kpiState[kpi];

          if (
            kpiObj.prev &&
            kpiObj.curr &&
            (kpiObj.prev.isEstimated || kpiObj.curr.isEstimated)
          ) {
            return true;
          }
        }
        return false;
      } else {
        if (!comparisonDetail || !primaryDetail) return false;

        if (comparisonDetail.isEstimated || primaryDetail.isEstimated) {
          return true;
        }

        for (const breakdown in comparisonDetail.breakdown) {
          const breakdown_obj = comparisonDetail.breakdown[breakdown];
          if (breakdown_obj.isBreakdownEstimated) {
            return true;
          }
        }

        for (const breakdown in primaryDetail.breakdown) {
          const breakdown_obj = primaryDetail.breakdown[breakdown];
          if (breakdown_obj.isBreakdownEstimated) {
            return true;
          }
        }

        return false;
      }
    }
  );
};

export default makeHasEstimatedDataSelector;
