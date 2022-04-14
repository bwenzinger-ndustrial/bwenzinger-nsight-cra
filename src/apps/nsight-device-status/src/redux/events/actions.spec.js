import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import * as eventsActions from './actions';

describe('nsight-device-status/redux/events/actions', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('getUserSubscriptionInfo', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retrieving user event info', function() {
      let expectedEventUser;
      let promise;

      beforeEach(function() {
        expectedEventUser = fixtures.build('eventUser');

        sinon.stub(contxtSdk.events, 'getUserInfo').resolves(expectedEventUser);

        promise = eventsActions.getUserSubscriptionInfo(expectedEventUser.id)(
          dispatch
        );
      });

      it('dispatches a LOAD_USER_SUBSCRIPTION_INFO_START', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_USER_SUBSCRIPTION_INFO_START'
          });
        });
      });

      it('gets the user event info from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.events.getUserInfo).to.be.calledWith(
            expectedEventUser.id
          );
        });
      });

      it('dispatches a LOAD_USER_SUBSCRIPTION_INFO_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_USER_SUBSCRIPTION_INFO_SUCCESS',
            payload: expectedEventUser.userEventSubscriptions
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is a problem getting the user event info', function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        sinon.stub(contxtSdk.events, 'getUserInfo').rejects(expectedError);

        promise = eventsActions.getUserSubscriptionInfo(
          fixtures.build('eventUser').id
        )(dispatch);
      });

      it('dispatches a LOAD_USER_SUBSCRIPTION_INFO_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_USER_SUBSCRIPTION_INFO_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });

      it('returns a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });

  describe('subscribeUserToEvent', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully subscribing a user to an event', function() {
      let eventUser;
      let expectedUserEventSubscription;
      let eventId;
      let promise;

      beforeEach(function() {
        eventUser = fixtures.build('eventUser');
        eventId = fixtures.build('feed').eventId;
        expectedUserEventSubscription = fixtures.build(
          'userEventSubscription',
          { userId: eventUser.id, eventId }
        );

        sinon
          .stub(contxtSdk.events, 'subscribeUser')
          .resolves(expectedUserEventSubscription);

        promise = eventsActions.subscribeUserToEvent(eventUser.id, eventId)(
          dispatch
        );
      });

      it('dispatches a LOAD_SUBSCRIBE_EVENT_START', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_SUBSCRIBE_EVENT_START'
          });
        });
      });

      it('creates a user subscription to the event from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.events.subscribeUser).to.be.calledWith(
            eventUser.id,
            eventId
          );
        });
      });

      it('dispatches a LOAD_SUBSCRIBE_EVENT_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_SUBSCRIBE_EVENT_SUCCESS',
            payload: expectedUserEventSubscription
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context(
      'when there is a problem subscribing a user to an event',
      function() {
        let expectedError;
        let promise;

        beforeEach(function() {
          expectedError = new Error(faker.hacker.phrase());

          sinon.stub(contxtSdk.events, 'subscribeUser').rejects(expectedError);

          promise = eventsActions.subscribeUserToEvent(
            fixtures.build('eventUser').id,
            fixtures.build('feed').eventId
          )(dispatch);
        });

        it('dispatches a LOAD_SUBSCRIBE_EVENT_FAILURE action', function() {
          return promise.then(expect.fail).catch(() => {
            expect(dispatch).to.be.calledWith({
              type: 'LOAD_SUBSCRIBE_EVENT_FAILURE',
              error: true,
              payload: expectedError
            });
          });
        });

        it('returns a rejected promise', function() {
          return expect(promise).to.be.rejectedWith(expectedError);
        });
      }
    );
  });

  describe('unsubscribeUserFromEvent', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully unsubscribing a user from an event', function() {
      let eventUserId;
      let userEventSubscriptionId;
      let eventId;
      let promise;

      beforeEach(function() {
        eventUserId = fixtures.build('eventUser').id;
        eventId = fixtures.build('feed').eventId;
        userEventSubscriptionId = fixtures.build('userEventSubscription').id;

        sinon.stub(contxtSdk.events, 'unsubscribeUser').resolves();

        promise = eventsActions.unsubscribeUserFromEvent(
          eventUserId,
          userEventSubscriptionId,
          eventId
        )(dispatch);
      });

      it('dispatches a LOAD_UNSUBSCRIBE_EVENT_START', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UNSUBSCRIBE_EVENT_START'
          });
        });
      });

      it('deletes a user subscription from an event', function() {
        return promise.then(() => {
          expect(contxtSdk.events.unsubscribeUser).to.be.calledWith(
            eventUserId,
            userEventSubscriptionId
          );
        });
      });

      it('dispatches a LOAD_UNSUBSCRIBE_EVENT_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_UNSUBSCRIBE_EVENT_SUCCESS',
            payload: eventId
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context(
      'when there is a problem unsubscribing a user from an event',
      function() {
        let expectedError;
        let promise;

        beforeEach(function() {
          expectedError = new Error(faker.hacker.phrase());

          sinon
            .stub(contxtSdk.events, 'unsubscribeUser')
            .rejects(expectedError);

          promise = eventsActions.unsubscribeUserFromEvent(
            fixtures.build('eventUser').id,
            fixtures.build('userEventSubscription').id,
            fixtures.build('feed').eventId
          )(dispatch);
        });

        it('dispatches a LOAD_UNSUBSCRIBE_EVENT_FAILURE action', function() {
          return promise.then(expect.fail).catch(() => {
            expect(dispatch).to.be.calledWith({
              type: 'LOAD_UNSUBSCRIBE_EVENT_FAILURE',
              error: true,
              payload: expectedError
            });
          });
        });

        it('returns a rejected promise', function() {
          return expect(promise).to.be.rejectedWith(expectedError);
        });
      }
    );
  });
});
