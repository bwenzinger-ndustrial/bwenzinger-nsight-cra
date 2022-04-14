import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';

export default createLoadingStatusSelector('dashboard', [
  'LOAD_APPLICATION_GROUPINGS'
]);
