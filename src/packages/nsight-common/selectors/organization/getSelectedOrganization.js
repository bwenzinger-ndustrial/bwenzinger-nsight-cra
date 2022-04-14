import { createSelector } from 'reselect';

import getOrganizationsMap from './getOrganizationsMap';
import getSelectedOrganizationSlug from './getSelectedOrganizationSlug';

const getSelectedOrganization = createSelector(
  getOrganizationsMap,
  getSelectedOrganizationSlug,
  (organizations, selectedOrganizationSlug) => {
    return organizations[selectedOrganizationSlug];
  }
);

export default getSelectedOrganization;
