import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import orgActionTypes from '../../organizations/actionTypes';

export default createCompletionStatusSelector('dashboard', [
  orgActionTypes.LOAD_ORGANIZATIONS,
  'LOAD_USER_INFO'
]);
