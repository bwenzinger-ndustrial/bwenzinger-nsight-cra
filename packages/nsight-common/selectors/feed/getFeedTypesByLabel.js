import { createSelector } from 'reselect';

const getFeedTypes = (state) => state.feedTypes && state.feedTypes.items;

const getFeedTypesByLabel = createSelector(
  getFeedTypes,
  (feedTypes) => {
    if (feedTypes) {
      return feedTypes.reduce((acc, feedType) => {
        acc[feedType.type] = feedType;
        return acc;
      }, {});
    }
  }
);

export default getFeedTypesByLabel;
