import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'qs';
import { bindActionCreators } from 'redux';

import * as feedStatusActions from '@ndustrial/nsight-common/actions/feedStatusActions';
import {
  createLoadingStatusSelector,
  getFacilities,
  getFacilityGroupings,
  getOrganizations,
  getSelectedFacility,
  getSelectedOrganization
} from '@ndustrial/nsight-common/selectors';
import { contxtSdk, getSearchString } from '@ndustrial/nsight-common/utils';

import FacilitySelector from '../components/FacilitySelector';
import * as applicationActions from '../redux/applications/actions';
import * as facilitiesActions from '../redux/facilities/actions';
import facilitiesActionTypes from '../redux/facilities/actionTypes';
import * as organizationsActions from '../redux/organizations/actions';
import orgActionTypes from '../redux/organizations/actionTypes';
import { changeRoute } from '../redux/router/actions';
import { getDefaultApplicationRoute } from '../services/routeService';

const getFacilitiesLoadingStatus = createLoadingStatusSelector('dashboard', [
  facilitiesActionTypes.LOAD_FACILITIES
]);
const getOrganizationsLoadingStatus = createLoadingStatusSelector('dashboard', [
  orgActionTypes.LOAD_ORGANIZATIONS
]);

const propTypes = {
  actions: PropTypes.shape({
    applications: PropTypes.shape({
      loadGroupings: PropTypes.func.isRequired,
      resetGroupings: PropTypes.func.isRequired,
      resetDefaultApplicationRoute: PropTypes.func.isRequired,
      setDefaultApplicationRoute: PropTypes.func.isRequired
    }).isRequired,
    facilities: PropTypes.shape({
      loadFacilities: PropTypes.func.isRequired,
      resetFacilities: PropTypes.func.isRequired,
      setSelectedFacilitySlug: PropTypes.func.isRequired
    }).isRequired,
    organizations: PropTypes.shape({
      setSelectedOrganizationSlug: PropTypes.func.isRequired
    }).isRequired,
    feedsWithStatus: PropTypes.shape({
      loadFeedStatusForFacility: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  applicationGroupings: PropTypes.arrayOf(
    PropTypes.shape({
      applicationModules: PropTypes.arrayOf(
        PropTypes.shape({
          slug: PropTypes.string
        })
      ).isRequired
    })
  ),
  facilities: PropTypes.array,
  helpers: PropTypes.shape({
    getDefaultApplicationRoute: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  selectedFacility: PropTypes.shape({
    slug: PropTypes.string,
    id: PropTypes.number
  }),
  selectedOrganization: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string
  })
};

function FacilitySelectorContainer(props) {
  const searchParams = qs.parse(props.location.search, {
    ignoreQueryPrefix: true
  });
  const hasSetOrganizationSlug = useRef(false);

  useEffect(() => {
    props.actions.organizations.setSelectedOrganizationSlug(
      searchParams.organization
    );

    if (!searchParams.organization) {
      // TODO: Move this call to set the organization ID to the
      // setSelectedOrganizationSlug action
      contxtSdk.coordinator.setOrganizationId(null);

      props.actions.applications.resetDefaultApplicationRoute();

      props.actions.applications.resetGroupings();

      props.actions.facilities.resetFacilities();
    } else {
      hasSetOrganizationSlug.current = true;
    }
  }, [
    searchParams.organization,
    props.actions.applications,
    props.actions.facilities,
    props.actions.organizations
  ]);

  useEffect(() => {
    if (
      !searchParams.organization &&
      !hasSetOrganizationSlug.current &&
      props.selectedOrganization &&
      props.selectedOrganization.slug
    ) {
      const search = getSearchString({
        addParams: {
          organization: props.selectedOrganization.slug
        },
        searchString: props.location.search
      });

      props.history.replace({ search });

      hasSetOrganizationSlug.current = true;
    }
  }, [
    searchParams.organization,
    props.history,
    props.location.search,
    props.selectedOrganization
  ]);

  useEffect(() => {
    if (props.selectedOrganization && props.selectedOrganization.id) {
      // TODO: Move this call to set the organization ID to the
      // setSelectedOrganizationSlug action
      contxtSdk.coordinator.setOrganizationId(props.selectedOrganization.id);

      props.actions.applications.loadGroupings(window.nd.application.id);
      props.actions.facilities.loadFacilities(props.selectedOrganization.id);
      props.actions.facilities.setSelectedFacilitySlug(null);
    }
  }, [
    props.selectedOrganization,
    props.actions.applications,
    props.actions.facilities
  ]);

  useEffect(() => {
    if (props.applicationGroupings.length && props.selectedOrganization) {
      const defaultApplicationRoute = props.helpers.getDefaultApplicationRoute(
        props.applicationGroupings,
        props.selectedOrganization.slug
      );

      props.actions.applications.setDefaultApplicationRoute(
        defaultApplicationRoute
      );
    }
  }, [
    props.actions.applications,
    props.applicationGroupings,
    props.helpers,
    props.selectedOrganization
  ]);

  useEffect(() => {
    // Organzition is selected and only has one facility
    // Routes to facility view
    if (
      props.selectedOrganization &&
      props.facilities.length === 1 &&
      !props.selectedFacility
    ) {
      const search = getSearchString({
        addParams: {
          facility: props.facilities[0].slug
        },
        searchString: props.location.search
      });

      props.history.push({
        pathname: '/facility-dashboard',
        search
      });
      props.actions.facilities.setSelectedFacilitySlug(
        props.facilities[0].slug
      );
    }
    // Organization selected, but has no defined facilities
    else if (props.selectedOrganization && props.facilities.length === 0) {
      props.actions.facilities.setSelectedFacilitySlug(null);
    }
    // Usual workflow.
    // Org selected and has more than one facility
    else {
      props.actions.facilities.setSelectedFacilitySlug(searchParams.facility);
    }
  }, [
    props.actions.facilities,
    props.facilities,
    props.selectedFacility,
    props.selectedOrganization,
    searchParams.facility,
    props.history,
    props.location.search
  ]);

  useEffect(() => {
    if (props.selectedFacility) {
      props.actions.feedsWithStatus.loadFeedStatusForFacility(
        props.selectedFacility.id
      );
    }
  }, [
    props.actions.facilities,
    props.actions.feedsWithStatus,
    props.selectedFacility
  ]);

  return <FacilitySelector {...props} />;
}

function mapStateToProps(state) {
  return {
    applicationGroupings: state.applications.groupings,
    facilities: getFacilities(state),
    facilityGroupings: getFacilityGroupings(state),
    isLoadingFacilities: getFacilitiesLoadingStatus(state),
    isLoadingOrganizations: getOrganizationsLoadingStatus(state),
    organizations: getOrganizations(state),
    selectedFacility: getSelectedFacility(state),
    selectedOrganization: getSelectedOrganization(state)
  };
}

FacilitySelectorContainer.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      applications: bindActionCreators(applicationActions, dispatch),
      facilities: bindActionCreators(facilitiesActions, dispatch),
      organizations: bindActionCreators(organizationsActions, dispatch),
      changeRoute: bindActionCreators(changeRoute, dispatch),
      feedsWithStatus: bindActionCreators(feedStatusActions, dispatch)
    },
    helpers: {
      getDefaultApplicationRoute
    }
  };
}

export {
  FacilitySelectorContainer as FacilitySelector,
  mapDispatchToProps,
  mapStateToProps
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FacilitySelectorContainer)
);
