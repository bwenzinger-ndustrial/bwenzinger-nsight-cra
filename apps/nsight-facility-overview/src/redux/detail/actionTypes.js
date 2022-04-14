import { actions } from '../../helpers';

export const COMPARISON_DATE_SET = 'COMPARISON_DATE_SET';

export const FACILITY_DETAIL_COMPARISON_GET = 'FACILITY_DETAIL_COMPARISON_GET';
export const FACILITY_DETAIL_COMPARISON_DATA_RESET =
  'FACILITY_DETAIL_COMPARISON_RESET';

export const FACILITY_DETAIL_PRIMARY_GET = 'FACILITY_DETAIL_PRIMARY_GET';
export const FACILITY_DETAIL_PRIMARY_DATA_RESET =
  'FACILITY_DETAIL_PRIMARY_RESET';

export const PRIMARY_DATE_SET = 'PRIMARY_DATE_SET';

const facilityDetailComparisonGetAsync = actions.asyncAction(
  FACILITY_DETAIL_COMPARISON_GET
);
const facilityDetailPrimaryGetAsync = actions.asyncAction(
  FACILITY_DETAIL_PRIMARY_GET
);

export default {
  ...facilityDetailComparisonGetAsync,
  ...facilityDetailPrimaryGetAsync,
  COMPARISON_DATE_SET,
  FACILITY_DETAIL_COMPARISON_DATA_RESET,
  FACILITY_DETAIL_PRIMARY_DATA_RESET,
  PRIMARY_DATE_SET
};
