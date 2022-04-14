import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';

import {
  DEMAND_GET_CURRENT,
  DEMAND_GET_LAST,
  DEMAND_MAX_GET_CURRENT,
  DEMAND_MAX_GET_LAST
} from '../actionTypes';

export default createLoadingStatusSelector('facilityOverview', [
  DEMAND_GET_LAST,
  DEMAND_GET_CURRENT,
  DEMAND_MAX_GET_CURRENT,
  DEMAND_MAX_GET_LAST
]);
