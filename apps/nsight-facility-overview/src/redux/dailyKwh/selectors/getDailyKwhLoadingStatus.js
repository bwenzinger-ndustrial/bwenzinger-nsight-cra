import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';

import { DAILY_KWH_CURRENT_GET, DAILY_KWH_LAST_GET } from '../actionTypes';

export default createLoadingStatusSelector('dailyKwh', [
  DAILY_KWH_CURRENT_GET,
  DAILY_KWH_LAST_GET
]);
