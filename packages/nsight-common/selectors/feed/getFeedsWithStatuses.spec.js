import { expect } from 'chai';
import faker from 'faker';
import { find, groupBy } from 'lodash';
import moment from 'moment';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getFeedsWithStatuses from './getFeedsWithStatuses';

describe('nsight-device-status/redux/selectors/getFeedsWithStatuses', function() {
  let initialUserEventSubscriptions;
  let initialFeeds;
  let formattedUserEventSubscriptions;

  beforeEach(function() {
    initialUserEventSubscriptions = fixtures.buildList(
      'userEventSubscription',
      faker.random.number({ min: 1, max: 10 })
    );

    initialFeeds = initialUserEventSubscriptions.map((subscription) =>
      fixtures.build('feedStatus', {
        feedType: faker.random.arrayElement([
          'egauge',
          'infor',
          'ngest',
          'technisystems'
        ]),
        groupings: [fixtures.build('feedStatusGrouping')],
        statusEventId: subscription.eventId
      })
    );

    formattedUserEventSubscriptions = initialUserEventSubscriptions.reduce(
      (memo, subscription) => {
        memo[subscription.eventId] = {
          eventId: subscription.eventId,
          subscriptionId: subscription.id
        };
        return memo;
      },
      {}
    );
  });

  it('return formatted feeds', function() {
    const expectedFeeds = getFeedsWithStatuses.resultFunc(
      initialFeeds,
      formattedUserEventSubscriptions
    );

    initialUserEventSubscriptions.forEach((subscription) => {
      const expectedFeed = expectedFeeds.find(
        ({ userEventSubscriptionId }) =>
          userEventSubscriptionId === subscription.id
      );

      const initialFeed = initialFeeds.find(
        ({ statusEventId }) => statusEventId === subscription.eventId
      );
      const isSubscribed =
        formattedUserEventSubscriptions[expectedFeed.eventId] !== undefined;

      expect(expectedFeed).to.not.be.null();
      expect(expectedFeed.id).to.equal(initialFeed.id);
      expect(expectedFeed.name).to.deep.equal([
        {
          name: initialFeed.key,
          status: initialFeed.status,
          type: initialFeed.feedType.type
        }
      ]);
      expect(expectedFeed.eventId).to.equal(initialFeed.statusEventId);
      expect(expectedFeed.isSubscribed).to.equal(isSubscribed);
      expect(expectedFeed.last).to.equal(
        moment(initialFeed.updatedAt).format('lll')
      );
      expect(expectedFeed.status).to.equal(initialFeed.status);
      expect(expectedFeed.userEventSubscriptionId).to.equal(subscription.id);
      expect(expectedFeed.boxTagLabel).to.equal(initialFeed.boxTagLabel);
      expect(expectedFeed.locationTagLabel).to.equal(
        initialFeed.locationTagLabel
      );
    });
  });

  ['acquilite', 'monnit'].forEach(function(feedType) {
    it(`adds the ${feedType} prefix to ${feedType} feed names`, function() {
      const prefixedFeeds = initialFeeds.map((feed) =>
        fixtures.build('feedStatus', {
          ...feed,
          feedType: { type: feedType }
        })
      );

      const feeds = getFeedsWithStatuses.resultFunc(
        prefixedFeeds,
        formattedUserEventSubscriptions
      );

      feeds.forEach((feed) => {
        const prefixedFeed = find(prefixedFeeds, { id: feed.id });

        expect(feed.name[0].name).to.equal(`${feedType}${prefixedFeed.key}`);
      });
    });
  });

  it('sorts the feeds by status (primary sort)', function() {
    const expectedSortOrder = ['Critical', 'Healthy'];
    const shuffledInitialFeeds = faker.helpers.shuffle(
      expectedSortOrder.map((status) =>
        fixtures.build('feedStatus', {
          feedType: faker.random.arrayElement([
            'egauge',
            'infor',
            'ngest',
            'technisystems'
          ]),
          status
        })
      )
    );
    const feeds = getFeedsWithStatuses.resultFunc(
      shuffledInitialFeeds,
      formattedUserEventSubscriptions
    );

    expectedSortOrder.forEach((expectedStatus, index) => {
      expect(feeds[index].status).to.equal(expectedStatus);
    });
  });

  it('sorts the feeds by name (secondary sort)', function() {
    const sortOrder = ['Critical', 'Healthy'];
    const shuffledInitialFeeds = faker.helpers.shuffle(
      sortOrder.reduce((memo, status) => {
        memo = [
          ...memo,
          ...fixtures.buildList(
            'feedStatus',
            faker.random.number({ min: 2, max: 5 }),
            {
              status,
              feedType: faker.random.arrayElement([
                'egauge',
                'infor',
                'ngest',
                'technisystems'
              ])
            }
          )
        ];

        return memo;
      }, [])
    );

    const feeds = getFeedsWithStatuses.resultFunc(
      shuffledInitialFeeds,
      formattedUserEventSubscriptions
    );
    const groupedFeeds = groupBy(feeds, 'status');

    expect(
      groupedFeeds.Critical.map(({ name: [{ name }] }) => name.toLowerCase())
    ).to.be.ascending();
    expect(
      groupedFeeds.Healthy.map(({ name: [{ name }] }) => name.toLowerCase())
    ).to.be.ascending();
  });

  it('sorts the feed groupings by status (primary sort)', function() {
    const expectedSortOrder = ['Out-of-Date', 'Active'];
    const shuffledInitialGroupings = faker.helpers.shuffle(
      expectedSortOrder.map((status) =>
        fixtures.build('feedStatusGrouping', { status })
      )
    );
    const initialFeeds = [
      fixtures.build('feedStatus', {
        groupings: shuffledInitialGroupings,
        feedType: faker.random.arrayElement([
          'egauge',
          'infor',
          'ngest',
          'technisystems'
        ])
      })
    ];

    const feeds = getFeedsWithStatuses.resultFunc(
      initialFeeds,
      formattedUserEventSubscriptions
    );

    expectedSortOrder.forEach((expectedStatus, index) => {
      expect(feeds[0].groupings[index].status).to.equal(expectedStatus);
    });
  });

  it('sorts the feed groupings by label (secondary sort)', function() {
    const sortOrder = ['Out-of-Date', 'Active'];
    const shuffledInitialGroupings = faker.helpers.shuffle(
      sortOrder.reduce((memo, status) => {
        memo = [
          ...memo,
          ...fixtures.buildList(
            'feedStatusGrouping',
            faker.random.number({ min: 2, max: 5 }),
            { status }
          )
        ];

        return memo;
      }, [])
    );
    const initialFeeds = [
      fixtures.build('feedStatus', {
        groupings: shuffledInitialGroupings,
        feedType: faker.random.arrayElement([
          'egauge',
          'infor',
          'ngest',
          'technisystems'
        ])
      })
    ];

    const feeds = getFeedsWithStatuses.resultFunc(
      initialFeeds,
      formattedUserEventSubscriptions
    );
    const groupedGroupings = groupBy(feeds[0].groupings, 'status');

    expect(
      groupedGroupings['Out-of-Date'].map(({ label }) => label.toLowerCase())
    ).to.be.ascending();
    expect(
      groupedGroupings.Active.map(({ label }) => label.toLowerCase())
    ).to.be.ascending();
  });

  it('should ignore the troubleshooting url if not present', function() {
    const feedTypesByLabel = {
      TestFeed: fixtures.build('feedType', { type: 'TestFeed' })
    };

    const expectedFeeds = getFeedsWithStatuses.resultFunc(
      initialFeeds,
      formattedUserEventSubscriptions,
      feedTypesByLabel
    );

    expectedFeeds.forEach((feed) => {
      expect(feed.troubleshootingUrl).to.be.undefined();
    });
  });

  it('should add the troubleshooting url if present', function() {
    const feedTypesByLabel = {
      TestFeed: fixtures.build('feedType', { type: 'TestFeed' })
    };

    const troubleshootingFeeds = initialFeeds.map((feed) => {
      return {
        ...feed,
        feedType: { type: 'TestFeed' }
      };
    });

    const expectedFeeds = getFeedsWithStatuses.resultFunc(
      troubleshootingFeeds,
      formattedUserEventSubscriptions,
      feedTypesByLabel
    );

    expectedFeeds.forEach((feed) => {
      expect(feed.troubleshootingUrl.length).to.be.greaterThan(0);
      expect(feed.troubleshootingUrl).to.equal(
        feedTypesByLabel.TestFeed.troubleshootingUrl
      );
    });
  });

  it('filters logical feed types', function() {
    const logicalFeed = fixtures.build('feedStatus', {
      feedType: { type: 'logical' }
    });
    initialFeeds.push(logicalFeed);

    const expectedFeeds = getFeedsWithStatuses.resultFunc(
      initialFeeds,
      formattedUserEventSubscriptions
    );

    expect(expectedFeeds).to.have.lengthOf(initialFeeds.length - 1);
    expect(expectedFeeds).to.not.contain(logicalFeed);
  });
});
