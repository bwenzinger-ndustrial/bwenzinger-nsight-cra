import { createSelector } from 'reselect';

const getFacilitiesMap = (state) => state.facilities.items;

const getFacilitiesKeyedById = createSelector(
  getFacilitiesMap,
  (facilities) => {
    return Object.keys(facilities).reduce((memo, slug) => {
      memo[facilities[slug].id] = facilities[slug];
      return memo;
    }, {});
  }
);

export default getFacilitiesKeyedById;
