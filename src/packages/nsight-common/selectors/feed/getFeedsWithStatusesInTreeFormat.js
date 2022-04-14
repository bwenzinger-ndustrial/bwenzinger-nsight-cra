import moment from 'moment';
import { createSelector } from 'reselect';

import getFeedTypesByLabel from './getFeedTypesByLabel';

const PREFIXED_SENSOR_TYPES = ['acquilite', 'monnit'];

const getFeedsData = (state) => state.feeds && state.feeds.items;
const getUserSubscriptionInfo = (state) => state.events && state.events.items;

const getFeedsWithStatusesInTreeFormat = createSelector(
  getFeedsData,
  getUserSubscriptionInfo,
  getFeedTypesByLabel,
  (feeds = [], userSubscriptions = {}, feedTypesByLabel = {}) => {
    const toReturn = [];
    feeds
      .filter((x) => x.feedType.type !== 'logical')
      .forEach((feed) => {
        const feedType = feedTypesByLabel[feed.feedType.type];
        const name =
          PREFIXED_SENSOR_TYPES.indexOf(feed.feedType.type) === -1
            ? feed.key
            : `${feed.feedType.type}${feed.key}`;

        // always push top level node
        toReturn.push({
          hierarchy: [name],
          id: feed.id,
          name: name,
          type: feed.feedType.type,
          eventId: feed.statusEventId,
          boxTagLabel: feed.boxTagLabel,
          locationTagLabel: feed.locationTagLabel,
          isSubscribed: userSubscriptions[feed.statusEventId] !== undefined,
          last: moment(feed.updatedAt).format('lll'),
          status: feed.status,
          troubleshootingUrl: feedType && feedType.troubleshootingUrl,
          userEventSubscriptionId:
            userSubscriptions[feed.statusEventId] &&
            userSubscriptions[feed.statusEventId].subscriptionId
        });

        if (feed.groupings && feed.groupings.length > 0) {
          feed.groupings.forEach((grouping) => {
            toReturn.push({
              hierarchy: [name, grouping.label],
              id: feed.id,
              type: feed.feedType.type,
              eventId: feed.statusEventId,
              grouping: {
                ...grouping,
                updatedAt: moment(grouping.updatedAt).format('lll')
              },
              last: moment(feed.updatedAt).format('lll'),
              status: feed.status,
              troubleshootingUrl: feedType && feedType.troubleshootingUrl,
              userEventSubscriptionId:
                userSubscriptions[feed.statusEventId] &&
                userSubscriptions[feed.statusEventId].subscriptionId
            });
          });
        }
      });

    return toReturn;
  }
);

export default getFeedsWithStatusesInTreeFormat;
