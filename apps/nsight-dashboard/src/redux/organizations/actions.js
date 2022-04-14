import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function loadOrganizations() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_ORGANIZATIONS_START
    });

    return contxtSdk.coordinator.organizations
      .getAll()
      .then((organizations) => {
        dispatch({
          type: actionTypes.LOAD_ORGANIZATIONS_SUCCESS,
          payload: {
            organizations
          }
        });
      });
  };
}

function setSelectedOrganizationSlug(organizationSlug) {
  return {
    type: actionTypes.SET_SELECTED_ORGANIZATION_SLUG,
    payload: organizationSlug
  };
}

export { loadOrganizations, setSelectedOrganizationSlug };
