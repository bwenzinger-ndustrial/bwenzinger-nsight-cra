import { createSelector } from 'reselect';

const getFacilitiesMap = (state) => state.facilities.items;

const getFacilitiesSlugs = (state) => state.facilities.orderedItemSlugs;

const getFacilities = createSelector(
  getFacilitiesMap,
  getFacilitiesSlugs,
  (facilities, orderedSlugs) => {
    return orderedSlugs.map((slug) => facilities[slug]);
  }
);

export default getFacilities;
