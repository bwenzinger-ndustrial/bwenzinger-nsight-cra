import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';

import { AGGREGATE_DEMAND_GET } from '../actionTypes';

export default createLoadingStatusSelector('facilityOverview', [
  AGGREGATE_DEMAND_GET
]);
