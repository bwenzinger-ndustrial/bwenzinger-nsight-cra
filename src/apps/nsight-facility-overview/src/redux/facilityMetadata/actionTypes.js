import { actions } from '../../helpers';

export const FACILITY_METADATA_GET = 'FACILITY_METADATA_GET';

const facilityMetadataGetAsync = actions.asyncAction(FACILITY_METADATA_GET);

export default {
  ...facilityMetadataGetAsync
};
