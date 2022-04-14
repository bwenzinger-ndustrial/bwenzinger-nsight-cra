import moment from 'moment';
import { createSelector } from 'reselect';

import getFeedTypesByLabel from './getFeedTypesByLabel';

const STATUS_ORDER = {
  Critical: 1,
  Healthy: 3,
  default: Infinity
};

const GROUPING_STATUS_ORDER = {
  'Out-of-Date': 1,
  Active: 2,
  default: Infinity
};

const PREFIXED_SENSOR_TYPES = ['acquilite', 'monnit'];

const getFeedsData = (state) => state.feeds && state.feeds.items;
const getUserSubscriptionInfo = (state) => state.events && state.events.items;

const getFeedsWithStatuses = createSelector(
  getFeedsData,
  getUserSubscriptionInfo,
  getFeedTypesByLabel,
  (feeds = [], userSubscriptions = {}, feedTypesByLabel = {}) => {
    return feeds
      .reduce((acc, feed) => {
        // Logical types should not be displayed
        if (feed.feedType.type !== 'logical') {
          const feedType = feedTypesByLabel[feed.feedType.type];

          acc.push({
            id: feed.id,
            name: [
              {
                name:
                  PREFIXED_SENSOR_TYPES.indexOf(feed.feedType.type) === -1
                    ? feed.key
                    : `${feed.feedType.type}${feed.key}`,
                status: feed.status,
                type: feed.feedType.type
              }
            ],
            eventId: feed.statusEventId,
            boxTagLabel: feed.boxTagLabel,
            locationTagLabel: feed.locationTagLabel,
            groupings: feed.groupings
              .map((grouping) => {
                return {
                  ...grouping,
                  updatedAt: moment(grouping.updatedAt).format('lll')
                };
              })
              .sort(
                (a, b) =>
                  (GROUPING_STATUS_ORDER[a.status] ||
                    GROUPING_STATUS_ORDER.default) -
                    (GROUPING_STATUS_ORDER[b.status] ||
                      GROUPING_STATUS_ORDER.default) ||
                  a.label.localeCompare(b.label)
              ),
            isSubscribed: userSubscriptions[feed.statusEventId] !== undefined,
            last: moment(feed.updatedAt).format('lll'),
            status: feed.status,
            troubleshootingUrl: feedType && feedType.troubleshootingUrl,
            userEventSubscriptionId:
              userSubscriptions[feed.statusEventId] &&
              userSubscriptions[feed.statusEventId].subscriptionId
          });
        }

        return acc;
      }, [])
      .sort(
        (a, b) =>
          (STATUS_ORDER[a.status] || STATUS_ORDER.default) -
            (STATUS_ORDER[b.status] || STATUS_ORDER.default) ||
          a.name[0].name.localeCompare(b.name[0].name)
      );
  }
);

export default getFeedsWithStatuses;
