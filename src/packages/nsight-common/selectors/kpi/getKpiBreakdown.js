import { createSelector } from 'reselect';

import { getKpiConfigWithRouter } from './getKpiConfig';

const getKpiBreakdown = createSelector(
  getKpiConfigWithRouter,
  (kpiConfig) => {
    if (!(kpiConfig && kpiConfig.detail && kpiConfig.detail.breakdown)) {
      return [];
    }

    return kpiConfig.detail.breakdown;
  }
);

export default getKpiBreakdown;
