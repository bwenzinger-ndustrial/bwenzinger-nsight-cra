import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import { EVENTS_GET } from '../actionTypes';

export default createCompletionStatusSelector('facilityOverview', [EVENTS_GET]);
