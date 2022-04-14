import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import { reroute } from '../actions/routerPathActions';
import {
  ErrorBanner,
  ErrorText,
  FullScreenLoadingIndicator,
  MissingSelection
} from '../components';
import {
  getSelectedFacility,
  getSelectedFacilitySlug,
  getSelectedOrganization
} from '../selectors';

class LegacyAngularAdapter extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      reroute: PropTypes.func
    }),
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    hasSelectedFacilitySlug: PropTypes.bool,
    legacyPath: PropTypes.string.isRequired,
    selectedFacility: PropTypes.shape({
      id: PropTypes.number
    }),
    selectedOrganization: PropTypes.shape({
      id: PropTypes.string,
      legacyOrganizationId: PropTypes.number
    })
  };

  state = {
    nSightBaseUrl: window.nd.legacyNSightBaseUrl
  };

  constructor() {
    super();
    this.iframeRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.props.selectedFacility) !==
      JSON.stringify(nextProps.selectedFacility)
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    window.addEventListener('message', this.onMessageReceived);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onMessageReceived);
  }

  onMessageReceived = ({ origin, data }) => {
    if (origin === this.state.nSightBaseUrl && data.contxt) {
      switch (data.contxt.operation) {
        case 'GET_CONTXT_ACCESS_TOKEN':
          this.sendTokenToChild();
          break;
        case 'GET_USER_PROFILE':
          this.sendUserProfileToChild();
          break;
        case 'URL_CHANGE':
          this.props.actions.reroute({
            pathname: data.contxt.payload.newUrl,
            search: this.props.location.search
          });
          break;
      }
    }
  };

  sendTokenToChild() {
    if (this.iframeRef.current) {
      this.iframeRef.current.contentWindow.postMessage(
        {
          contxt: {
            operation: 'SET_CONTXT_ACCESS_TOKEN',
            payload: {
              accessToken: contxtSdk.auth._sessionInfo.accessToken,
              expiresAt: contxtSdk.auth._sessionInfo.expiresAt
            }
          }
        },
        '*'
      );
    }
  }

  sendUserProfileToChild() {
    if (this.iframeRef.current) {
      contxtSdk.auth.getProfile().then((profile) => {
        this.iframeRef.current.contentWindow.postMessage(
          {
            contxt: {
              operation: 'SET_USER_PROFILE',
              payload: {
                profile
              }
            }
          },
          '*'
        );
      });
    }
  }

  getUrl() {
    return `${this.state.nSightBaseUrl}/organizations/${this.props.selectedOrganization.legacyOrganizationId}/portfolio/facilities/${this.props.selectedFacility.id}/${this.props.legacyPath}?embed=true`;
  }

  render() {
    if (this.props.hasSelectedFacilitySlug && !this.props.selectedFacility) {
      return <FullScreenLoadingIndicator loadingText="Loading" />;
    }

    if (
      this.props.selectedOrganization &&
      !this.props.selectedOrganization.legacyOrganizationId
    ) {
      return (
        <ErrorBanner>
          {() => (
            <ErrorText>
              Your selected organization is not correctly provisioned for this
              section of nSight. Please contact support to get this corrected.
            </ErrorText>
          )}
        </ErrorBanner>
      );
    }

    if (!this.props.selectedFacility) {
      return <MissingSelection requiredType="facility" />;
    }

    return (
      <iframe
        data-hj-allow-iframe
        src={this.getUrl()}
        frameBorder="0"
        width="100%"
        style={{
          border: 'none',
          width: '100%',
          height: '100%'
        }}
        ref={this.iframeRef}
      />
    );
  }
}

function mapStateToProps(state) {
  const hasSelectedFacilitySlug = !!getSelectedFacilitySlug(state);
  const selectedFacility = getSelectedFacility(state);
  const selectedOrganization = getSelectedOrganization(state);

  return {
    hasSelectedFacilitySlug,
    selectedFacility,
    selectedOrganization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      reroute: bindActionCreators(reroute, dispatch)
    }
  };
}

export { LegacyAngularAdapter };
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LegacyAngularAdapter)
);
