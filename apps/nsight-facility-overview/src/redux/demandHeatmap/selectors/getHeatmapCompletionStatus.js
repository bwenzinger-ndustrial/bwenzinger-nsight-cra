import { createCompletionStatusSelector } from '@ndustrial/nsight-common/selectors';

import { DEMAND_HEATMAP } from '../actionTypes';

export default createCompletionStatusSelector('demandHeatmap', [
  DEMAND_HEATMAP
]);
