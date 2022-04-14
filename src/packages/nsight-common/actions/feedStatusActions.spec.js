import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { fixtures } from '@ndustrial/nsight-test-utils';

import { contxtSdk } from '../utils';
import * as iotActions from './feedStatusActions';

describe('nsight-device-status/redux/feeds/actions', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('loadFeedStatusForFacility', function() {
    let dispatch;

    beforeEach(function() {
      dispatch = sinon.stub();
    });

    context('when successfully retrieving the feed list', function() {
      let expectedFeeds;
      let expectedFacilityId;
      let promise;

      beforeEach(function() {
        expectedFeeds = fixtures.buildList(
          'feedStatus',
          faker.random.number({ min: 1, max: 10 })
        );

        expectedFacilityId = fixtures.build('facility').id;

        sinon
          .stub(contxtSdk.iot.feeds, 'getStatusForFacility')
          .resolves({ feeds: expectedFeeds });

        promise = iotActions.loadFeedStatusForFacility(expectedFacilityId)(
          dispatch
        );
      });

      it('dispatches a LOAD_FEED_STATUSES_START action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FEED_STATUSES_START'
          });
        });
      });

      it('gets the facility feeds from the API', function() {
        return promise.then(() => {
          expect(contxtSdk.iot.feeds.getStatusForFacility).to.be.calledWith(
            expectedFacilityId
          );
        });
      });

      it('dispatches a LOAD_FEED_STATUSES_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FEED_STATUSES_SUCCESS',
            payload: expectedFeeds
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is a problem getting the facility feeds', function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error(faker.hacker.phrase());

        sinon
          .stub(contxtSdk.iot.feeds, 'getStatusForFacility')
          .rejects(expectedError);

        promise = iotActions.loadFeedStatusForFacility(
          fixtures.build('facility').id
        )(dispatch);
      });

      it('dispatches a LOAD_FEED_STATUSES_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FEED_STATUSES_FAILURE',
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
});
