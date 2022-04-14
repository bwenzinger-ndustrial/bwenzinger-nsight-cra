import { createSelector } from 'reselect';

import getSelectedFacilitySlug from './getSelectedFacilitySlug';

const getFacilitiesMap = (state) => state.facilities.items;

// TODO, is this sort of thing done elsewhere?
const getSelectedFacility = createSelector(
  getFacilitiesMap,
  getSelectedFacilitySlug,
  (facilities, selectedFacilitySlug) => facilities[selectedFacilitySlug]
);

export default getSelectedFacility;
