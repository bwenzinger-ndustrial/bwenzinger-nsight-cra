import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import iotReducer, { INITIAL_STATE } from './reducer';

describe('nsight-device-status/redux/feeds/reducer', function() {
  let payload;

  it('returns the initial state', function() {
    expect(iotReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_FEED_STATUSES_SUCCESS', function() {
    let nextState;

    it('stores the facility feeds', function() {
      payload = fixtures.buildList(
        'feedStatus',
        faker.random.number({ min: 1, max: 10 })
      );

      nextState = iotReducer(INITIAL_STATE, {
        type: 'LOAD_FEED_STATUSES_SUCCESS',
        payload
      });
      expect(nextState.items).to.equal(payload);
    });
  });

  describe('LOAD_FEED_STATUSES_FAILURE', function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
    });

    it('returns a failure', function() {
      nextState = iotReducer(INITIAL_STATE, {
        type: 'LOAD_FEED_STATUSES_FAILURE',
        payload: expectedError
      });

      expect(nextState.error).to.deep.equal(expectedError);
      expect(nextState.hasLoadingError).to.equal(true);
    });
  });
});
