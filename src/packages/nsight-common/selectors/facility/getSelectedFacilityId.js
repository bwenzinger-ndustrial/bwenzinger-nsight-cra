import { createSelector } from 'reselect';

import getSelectedFacility from './getSelectedFacility';

const getSelectedFacilityId = createSelector(
  getSelectedFacility,
  (selectedFacility) => (selectedFacility ? selectedFacility.id : undefined)
);

export default getSelectedFacilityId;
