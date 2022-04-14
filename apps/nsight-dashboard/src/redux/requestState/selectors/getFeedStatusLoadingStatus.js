import actionTypes from '@ndustrial/nsight-common/actions/feedStatusActionTypes';
import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';
export default createLoadingStatusSelector('dashboard', [
  actionTypes.LOAD_FEED_STATUSES
]);
