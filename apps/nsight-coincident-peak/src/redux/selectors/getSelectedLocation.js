import { createSelector } from 'reselect';

import getBalancingAuthority from './getBalancingAuthority';

const getSelectedLocation = createSelector(
  getBalancingAuthority,
  (balancingAuthority) => {
    // TODO: Remove hardcoded value when we figure out how to handle this.
    // there is currently no endpoint to get locations by region
    const weatherLocationIds = {
      CPLE: 4, // Fayetteville
      CPLW: 3, // Asheville
      DEP: 4 // Fayetteville
    };
    return weatherLocationIds[balancingAuthority];
  }
);

export default getSelectedLocation;
