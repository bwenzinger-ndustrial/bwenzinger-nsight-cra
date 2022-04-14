import { createLoadingStatusSelector } from '@ndustrial/nsight-common/selectors';

import { EVENTS_GET } from '../actionTypes';

export default createLoadingStatusSelector('facilityOverview', [EVENTS_GET]);
