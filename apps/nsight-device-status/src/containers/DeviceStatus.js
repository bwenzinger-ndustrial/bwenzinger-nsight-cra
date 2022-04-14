import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { feedTypeActions } from '@ndustrial/nsight-common/actions';
import {
  getFeedsWithStatusesCompletionStatus,
  getFeedsWithStatusesInTreeFormat,
  getSelectedFacility,
  getSelectedFacilitySlug
} from '@ndustrial/nsight-common/selectors';

import DeviceStatus from '../components/DeviceStatus';
import * as eventsActions from '../redux/events/actions';

const propTypes = {
  actions: PropTypes.shape({
    events: PropTypes.shape({
      getUserSubscriptionInfo: PropTypes.func.isRequired,
      subscribeUserToEvent: PropTypes.func.isRequired,
      unsubscribeUserFromEvent: PropTypes.func.isRequired
    }).isRequired,
    feedTypes: PropTypes.shape({
      getFeedTypes: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  currentUserId: PropTypes.string,
  hasSelectedFacilitySlug: PropTypes.bool,
  selectedFacility: PropTypes.shape({
    id: PropTypes.integer
  })
};

class DeviceStatusContainer extends Component {
  componentDidMount() {
    if (this.props.currentUserId) {
      this.props.actions.events.getUserSubscriptionInfo(
        this.props.currentUserId
      );
    }

    this.props.actions.feedTypes.getFeedTypes();
  }

  render() {
    return <DeviceStatus {...this.props} />;
  }
}

DeviceStatusContainer.propTypes = propTypes;

function mapStateToProps(state, props) {
  return {
    currentUserId: state.user.profile.sub,
    hasLoadedFeeds: getFeedsWithStatusesCompletionStatus(state),
    hasSelectedFacilitySlug: !!getSelectedFacilitySlug(state),
    feeds: getFeedsWithStatusesInTreeFormat(state, props),
    selectedFacility: getSelectedFacility(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      events: bindActionCreators(eventsActions, dispatch),
      feedTypes: bindActionCreators(feedTypeActions, dispatch)
    }
  };
}

export { DeviceStatusContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceStatusContainer);
