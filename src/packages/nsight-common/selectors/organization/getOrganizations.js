import { createSelector } from 'reselect';

import getOrganizationsMap from './getOrganizationsMap';

const getOrganizationsSlugs = (state) => state.organizations.orderedItemSlugs;

const getOrganizations = createSelector(
  getOrganizationsMap,
  getOrganizationsSlugs,
  (organizations, orderedSlugs) => {
    return orderedSlugs.map((slug) => organizations[slug]);
  }
);

export default getOrganizations;
