import { actions } from '../../helpers';

export const AGGREGATE_DEMAND_GET = 'AGGREGATE_DEMAND_GET';
export const AGGREGATE_MAX_DEMAND_GET_CURRENT =
  'AGGREGATE_MAX_DEMAND_GET_CURRENT';

export const CURRENT_TOTAL_DEMAND_GET = 'CURRENT_TOTAL_DEMAND_GET';

const aggregateDemandGetAsync = actions.asyncAction(AGGREGATE_DEMAND_GET);
const aggregateDemandMaxCurrentGetAsync = actions.asyncAction(
  AGGREGATE_MAX_DEMAND_GET_CURRENT
);
const currentTotalDemandGetAsync = actions.asyncAction(
  CURRENT_TOTAL_DEMAND_GET
);

export default {
  ...aggregateDemandGetAsync,
  ...aggregateDemandMaxCurrentGetAsync,
  ...currentTotalDemandGetAsync
};
