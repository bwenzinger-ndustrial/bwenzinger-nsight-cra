import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import { AGGREGATE_DEMAND_GET } from '../actionTypes';

export default createCompletionStatusSelector('facilityOverview', [
  AGGREGATE_DEMAND_GET
]);
