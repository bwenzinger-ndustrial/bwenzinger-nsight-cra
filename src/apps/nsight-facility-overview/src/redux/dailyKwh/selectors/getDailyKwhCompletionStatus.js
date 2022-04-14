import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import { DAILY_KWH_CURRENT_GET, DAILY_KWH_LAST_GET } from '../actionTypes';

export default createCompletionStatusSelector('dailyKwh', [
  DAILY_KWH_CURRENT_GET,
  DAILY_KWH_LAST_GET
]);
