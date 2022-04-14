import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';

import { BLENDED_RATE_GET } from '../actionTypes';

export default createLoadingStatusSelector('facilityOverview', [
  BLENDED_RATE_GET
]);
