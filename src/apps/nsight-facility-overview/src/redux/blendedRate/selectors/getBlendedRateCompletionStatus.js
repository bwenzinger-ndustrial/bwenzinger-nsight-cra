import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import { BLENDED_RATE_GET } from '../actionTypes';

export default createCompletionStatusSelector('facilityOverview', [
  BLENDED_RATE_GET
]);
