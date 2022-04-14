import { connect } from 'react-redux';

import { feedTypeActions } from '@ndustrial/nsight-common/actions';
import {
  getFeedTypesByLabel,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import EventFeed from '../components/EventFeed';
import { getTriggeredEvents } from '../redux/events/actions';
import {
  getEventsHasData,
  getEventsLoadingStatus
} from '../redux/events/selectors';

const mapStateToProps = (state) => ({
  error: state.eventFeedList && state.eventFeedList.error,
  events: state.eventFeedList && state.eventFeedList.items,
  hasData: getEventsHasData(state),
  isLoading: getEventsLoadingStatus(state),
  selectedFacility: getSelectedFacility(state),
  feedTypesByLabel: getFeedTypesByLabel(state),
  lastUpdatedAt: state.eventFeedList && state.eventFeedList.lastUpdatedAt
});

const mapDispatchToProps = {
  getTriggeredEvents,
  getFeedTypes: feedTypeActions.getFeedTypes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFeed);
