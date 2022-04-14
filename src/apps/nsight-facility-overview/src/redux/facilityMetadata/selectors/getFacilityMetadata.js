import { get } from 'lodash';
import { createSelector } from 'reselect';

const getFacilityMetadata = (state) => {
  return get(state, 'facilityMetadata.metadata', {});
};

const getDemandUnits = createSelector(
  getFacilityMetadata,
  (metadata) => {
    return get(metadata, 'main_services[0].demand_field.units');
  }
);

export { getDemandUnits };
export default getFacilityMetadata;
