import { push } from 'connected-react-router';

import { contxtSdk, getSearchString } from '@ndustrial/nsight-common/utils';

import { MODULE_PATHS_WITHOUT_FACILITY } from '../../constants';
import actionTypes from './actionTypes';

const facilityQuery = `
query {
  facilities {
    nodes {
      id
      name
      slug
      nSight2Active
      realTimeEnabled
      timezone: timezoneName
    }
  }
}
`;

const groupingsQuery = `
query {
  facilityGroups {
    nodes {
      id
      name
      parentId
      facilities {
        nodes {
          id,
          name,
          slug
        }
      }
    }
  }
}
`;

function loadFacilities(organizationId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_FACILITIES_START
    });

    return Promise.all([
      contxtSdk.nionic.executeQuery(organizationId, facilityQuery),
      contxtSdk.nionic.executeQuery(organizationId, groupingsQuery)
    ]).then(([facilitiesData, groupingsData]) => {
      dispatch({
        type: actionTypes.LOAD_FACILITIES_SUCCESS,
        payload: {
          facilities: facilitiesData.facilities.nodes,
          groupings: groupingsData.facilityGroups.nodes
        }
      });
    });
  };
}

function resetFacilities() {
  return {
    type: actionTypes.RESET_FACILITIES
  };
}

function setSelectedFacilitySlug(facilitySlug) {
  return function(dispatch, getState) {
    const state = getState();
    // state.facilities.selectedSlug is null when going to a URL for the first time
    // we do not want to redirect the user when that happens
    if (
      !state.facilities.selectedSlug &&
      MODULE_PATHS_WITHOUT_FACILITY.indexOf(state.router.location.pathname) !==
        -1
    ) {
      const searchString = getSearchString({
        searchString: state.router.location.search,
        removeParams: ['facility']
      });

      dispatch(
        push({
          pathname: state.router.location.pathname,
          search: searchString
        })
      );
    } else if (state.facilities.selectedSlug !== facilitySlug) {
      dispatch({
        type: actionTypes.SET_SELECTED_FACILITY_SLUG,
        payload: facilitySlug
      });
    }
  };
}

export { loadFacilities, resetFacilities, setSelectedFacilitySlug };
