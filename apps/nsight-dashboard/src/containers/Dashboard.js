import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

import { getRequestStateModule } from '@ndustrial/nsight-common/reduxModules';
import { getSelectedOrganization } from '@ndustrial/nsight-common/selectors';

import Dashboard from '../components/Dashboard';
import { getApplicationModulesInternal } from '../redux/applications/selectors';
import { loadKpiConfigs } from '../redux/kpiConfig/actions';
import * as organizationsActions from '../redux/organizations/actions';
import {
  getApplicationGroupingsCompletionStatus,
  getApplicationGroupingsLoadingStatus,
  getDashboardCompletionStatus,
  getLoggingOutStatus
} from '../redux/requestState/selectors';
import * as userActions from '../redux/user/actions';
import types from '../types';

class DashboardContainer extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      organizations: PropTypes.shape({
        loadOrganizations: PropTypes.func.isRequired
      }).isRequired,
      user: PropTypes.shape({
        loadUserInfo: PropTypes.func.isRequired
      }).isRequired,
      loadKpiConfigs: PropTypes.func.isRequired
    }).isRequired,
    children: PropTypes.func.isRequired,
    hasInitiallyLoaded: PropTypes.bool,
    hasLoadedApplicationGroupings: PropTypes.bool,
    modules: types.applicationModules.isRequired,
    selectedOrganization: PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  };

  componentDidMount() {
    if (!this.props.hasInitiallyLoaded) {
      this.props.actions.organizations.loadOrganizations();
      this.props.actions.user.loadUserInfo();
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedOrganization } = this.props;

    if (!selectedOrganization) {
      return;
    }

    if (selectedOrganization !== prevProps.selectedOrganization) {
      this.props.actions.loadKpiConfigs();
    }
  }

  render() {
    const {
      children,
      hasLoadedApplicationGroupings,
      modules,
      selectedOrganization,
      ...restProps
    } = this.props;

    return (
      <DynamicModuleLoader modules={[getRequestStateModule('dashboard')]}>
        <Dashboard {...restProps}>
          {children({
            hasLoadedApplicationGroupings,
            modules,
            selectedOrganizationSlug: selectedOrganization
              ? selectedOrganization.slug
              : null
          })}
        </Dashboard>
      </DynamicModuleLoader>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasInitiallyLoaded: getDashboardCompletionStatus(state),
    hasLoadedApplicationGroupings: getApplicationGroupingsCompletionStatus(
      state
    ),
    isLoadingApplicationGroupings: getApplicationGroupingsLoadingStatus(state),
    isLoggingOut: getLoggingOutStatus(state),
    modules: getApplicationModulesInternal(state),
    selectedOrganization: getSelectedOrganization(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      organizations: bindActionCreators(organizationsActions, dispatch),
      user: bindActionCreators(userActions, dispatch),
      loadKpiConfigs: bindActionCreators(loadKpiConfigs, dispatch)
    }
  };
}

export { DashboardContainer as Dashboard, mapDispatchToProps, mapStateToProps };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
