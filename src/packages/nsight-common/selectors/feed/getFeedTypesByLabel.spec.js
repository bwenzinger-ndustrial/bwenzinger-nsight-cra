import { expect } from 'chai';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getFeedTypesByLabel from './getFeedTypesByLabel';

describe('nsight-common/reducers/feedTypes/selectors/getFeedTypesByLabel', function() {
  it('returns feed types by label', function() {
    const state = {
      feedTypes: {
        items: fixtures.buildList('feedType', 3)
      }
    };

    const feedTypesByLabel = getFeedTypesByLabel(state);

    expect(Object.keys(feedTypesByLabel)).to.have.length(
      state.feedTypes.items.length
    );
    state.feedTypes.items.forEach((feedType) => {
      expect(feedTypesByLabel[feedType.type]).to.equal(feedType);
    });
  });

  it('handles undefined feed state', function() {
    const state = { feedTypes: {} };

    const feedTypesByLabel = getFeedTypesByLabel(state);

    expect(feedTypesByLabel).to.be.undefined();
  });
});
