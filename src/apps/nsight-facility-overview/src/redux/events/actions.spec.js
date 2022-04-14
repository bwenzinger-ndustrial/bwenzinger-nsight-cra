import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import fixture from '../../../test/fixtures/factories';
import * as eventsActions from './actions';
import actionTypes from './actionTypes';

describe('nsight-facility-overview/redux/events/actions', function() {
  let facilityId;

  beforeEach(function() {
    facilityId = fixtures.build('facility').id;
  });

  afterEach(function() {
    sinon.restore();
  });

  describe('loadTriggeredEvents', function() {
    let dispatch;
    let expectedEvents;

    beforeEach(function() {
      dispatch = sinon.stub();
      expectedEvents = fixture.buildList(
        'event',
        faker.random.number({ min: 1, max: 10 })
      );
    });

    context('when successfully getting the events', function() {
      let promise;

      beforeEach(function() {
        sinon
          .stub(contxtSdk.events, 'getTriggeredEventsByFacilityId')
          .resolves({ records: expectedEvents });

        promise = eventsActions.getTriggeredEvents(facilityId)(dispatch);
      });

      it(`dispatches a ${actionTypes.EVENTS_GET_START} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.EVENTS_GET_START
          });
        });
      });

      it('gets the events', function() {
        return promise.then(() => {
          expect(
            contxtSdk.events.getTriggeredEventsByFacilityId
          ).to.be.calledWith(facilityId);
        });
      });

      it(`dispatches a ${actionTypes.EVENTS_GET_SUCCESS} action`, function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.EVENTS_GET_SUCCESS,
            payload: expectedEvents
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context('when there is a problem getting the events', function() {
      let expectedErrorMessage;
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedErrorMessage = faker.hacker.phrase();
        expectedError = new Error(expectedErrorMessage);

        sinon
          .stub(contxtSdk.events, 'getTriggeredEventsByFacilityId')
          .rejects(expectedError);

        promise = eventsActions.getTriggeredEvents()(dispatch);
      });

      it(`dispatches a ${actionTypes.EVENTS_GET_FAILURE} action`, function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: actionTypes.EVENTS_GET_FAILURE,
            error: true,
            payload: expectedErrorMessage
          });
        });
      });
    });
  });
});
