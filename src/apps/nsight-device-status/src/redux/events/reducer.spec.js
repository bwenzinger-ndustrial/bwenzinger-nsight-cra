import { expect } from 'chai';
import faker from 'faker';
import _ from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import eventsReducer, { INITIAL_STATE } from './reducer';

describe('nsight-device-status/redux/reducer', function() {
  it('returns the initial state', function() {
    expect(eventsReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_SUBSCRIBE_EVENT_START', function() {
    let nextState;
    let prevState;
    let initialUserEventSubscriptions;
    let formattedUserEventSubscriptions;

    beforeEach(function() {
      initialUserEventSubscriptions = fixtures.buildList(
        'userEventSubscription',
        faker.random.number({ min: 1, max: 5 })
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

      prevState = {
        ...INITIAL_STATE,
        hasError: true,
        items: formattedUserEventSubscriptions
      };

      nextState = eventsReducer(prevState, {
        type: 'LOAD_SUBSCRIBE_EVENT_START'
      });
    });

    it('resets hasLoadingError and keeps the original state', function() {
      expect(nextState).to.deep.equal({
        hasError: false,
        items: formattedUserEventSubscriptions
      });
    });
  });

  describe('LOAD_SUBSCRIBE_EVENT_SUCCESS', function() {
    let nextState;
    let expectedUserEventSubscriptions;

    it('stores the user event subscriptions', function() {
      expectedUserEventSubscriptions = fixtures.build('userEventSubscription');

      nextState = eventsReducer(INITIAL_STATE, {
        type: 'LOAD_SUBSCRIBE_EVENT_SUCCESS',
        payload: expectedUserEventSubscriptions
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        items: {
          ...INITIAL_STATE.items,
          [expectedUserEventSubscriptions.eventId]: {
            eventId: expectedUserEventSubscriptions.eventId,
            subscriptionId: expectedUserEventSubscriptions.id
          }
        }
      });
    });
  });

  describe('LOAD_SUBSCRIBE_EVENT_FAILURE', function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
    });

    it('returns a failure', function() {
      nextState = eventsReducer(INITIAL_STATE, {
        type: 'LOAD_SUBSCRIBE_EVENT_FAILURE',
        payload: expectedError
      });

      expect(nextState.error).to.deep.equal(expectedError);
      expect(nextState.hasError).to.equal(true);
    });
  });

  describe('LOAD_UNSUBSCRIBE_EVENT_START', function() {
    let nextState;
    let prevState;
    let initialUserEventSubscriptions;
    let formattedUserEventSubscriptions;

    beforeEach(function() {
      initialUserEventSubscriptions = fixtures.buildList(
        'userEventSubscription',
        faker.random.number({ min: 1, max: 5 })
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

      prevState = {
        ...INITIAL_STATE,
        hasError: true,
        items: formattedUserEventSubscriptions
      };

      nextState = eventsReducer(prevState, {
        type: 'LOAD_UNSUBSCRIBE_EVENT_START'
      });
    });

    it('resets hasLoadingError and keeps the original state', function() {
      expect(nextState).to.deep.equal({
        hasError: false,
        items: formattedUserEventSubscriptions
      });
    });
  });

  describe('LOAD_UNSUBSCRIBE_EVENT_SUCCESS', function() {
    let nextState;
    let prevState;
    let deletedEventId;
    let initialUserEventSubscriptions;
    let formattedUserEventSubscriptions;

    it('deletes the user event subscription', function() {
      deletedEventId = fixtures.build('event').id;
      initialUserEventSubscriptions = fixtures.buildList(
        'userEventSubscription',
        faker.random.number({ min: 1, max: 5 })
      );

      initialUserEventSubscriptions.push(
        fixtures.build('userEventSubscription', { eventId: deletedEventId })
      );

      formattedUserEventSubscriptions = _.groupBy(
        initialUserEventSubscriptions,
        'eventId'
      );

      prevState = {
        ...INITIAL_STATE,
        items: formattedUserEventSubscriptions
      };

      nextState = eventsReducer(prevState, {
        type: 'LOAD_UNSUBSCRIBE_EVENT_SUCCESS',
        payload: deletedEventId
      });

      delete formattedUserEventSubscriptions[deletedEventId];

      expect(nextState).to.deep.equal({
        hasError: false,
        items: {
          ...formattedUserEventSubscriptions,
          [deletedEventId]: undefined
        }
      });
    });
  });

  describe('LOAD_UNSUBSCRIBE_EVENT_FAILURE', function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
    });

    it('returns a failure', function() {
      nextState = eventsReducer(INITIAL_STATE, {
        type: 'LOAD_UNSUBSCRIBE_EVENT_FAILURE',
        payload: expectedError
      });

      expect(nextState.error).to.deep.equal(expectedError);
      expect(nextState.hasError).to.equal(true);
    });
  });

  describe('LOAD_USER_SUBSCRIPTION_INFO_START', function() {
    let nextState;
    let prevState;
    let initialUserEventSubscriptions;
    let formattedUserEventSubscriptions;

    beforeEach(function() {
      initialUserEventSubscriptions = fixtures.buildList(
        'userEventSubscription',
        faker.random.number({ min: 1, max: 5 })
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

      prevState = {
        ...INITIAL_STATE,
        hasError: true,
        items: formattedUserEventSubscriptions
      };

      nextState = eventsReducer(prevState, {
        type: 'LOAD_USER_SUBSCRIPTION_INFO_START'
      });
    });

    it('resets hasLoadingError and keeps the original state', function() {
      expect(nextState).to.deep.equal({
        hasError: false,
        items: formattedUserEventSubscriptions
      });
    });
  });

  describe('LOAD_USER_SUBSCRIPTION_INFO_SUCCESS', function() {
    let nextState;
    let expectedUserEventSubscriptions;
    let initialUserEventSubscriptions;

    it('stores the user event subscriptions', function() {
      initialUserEventSubscriptions = fixtures.buildList(
        'userEventSubscription',
        faker.random.number({ min: 1, max: 10 })
      );

      nextState = eventsReducer(INITIAL_STATE, {
        type: 'LOAD_USER_SUBSCRIPTION_INFO_SUCCESS',
        payload: initialUserEventSubscriptions
      });

      expectedUserEventSubscriptions = initialUserEventSubscriptions.reduce(
        (memo, subscription) => {
          memo[subscription.eventId] = {
            eventId: subscription.eventId,
            subscriptionId: subscription.id
          };
          return memo;
        },
        {}
      );

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        items: expectedUserEventSubscriptions
      });
    });
  });

  describe('LOAD_USER_SUBSCRIPTION_INFO_FAILURE', function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
    });

    it('returns a failure', function() {
      nextState = eventsReducer(INITIAL_STATE, {
        type: 'LOAD_USER_SUBSCRIPTION_INFO_FAILURE',
        payload: expectedError
      });

      expect(nextState.error).to.deep.equal(expectedError);
      expect(nextState.hasError).to.equal(true);
    });
  });
});
