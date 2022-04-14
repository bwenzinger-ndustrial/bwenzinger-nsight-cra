import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import {
  UTILITY_DEMAND_GET_CURRENT,
  UTILITY_DEMAND_GET_LAST,
  UTILITY_DEMAND_MAX_GET_CURRENT,
  UTILITY_DEMAND_MAX_GET_LAST
} from '../actionTypes';

export default createCompletionStatusSelector('facilityOverview', [
  UTILITY_DEMAND_GET_LAST,
  UTILITY_DEMAND_GET_CURRENT,
  UTILITY_DEMAND_MAX_GET_CURRENT,
  UTILITY_DEMAND_MAX_GET_LAST
]);
