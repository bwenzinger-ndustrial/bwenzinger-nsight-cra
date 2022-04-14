import { expect } from 'chai';
import faker from 'faker';

import fixture from '../../../test/fixtures/factories';
import actionTypes from './actionTypes';
import blendedRateReducer, { INITIAL_STATE } from './reducer';

describe('nsight-facility-overview/redux/blendedRate/reducer', function() {
  let prev;
  let curr;
  let payload;

  it('returns the initial state', function() {
    expect(blendedRateReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.BLENDED_RATE_GET_SUCCESS}`, function() {
    let nextState;

    beforeEach(function() {
      curr = fixture.buildList(
        'blendedRate',
        faker.random.number({ min: 1, max: 10 })
      );
      prev = fixture.buildList(
        'blendedRate',
        faker.random.number({ min: 1, max: 10 })
      );
      payload = { curr, prev };
    });

    it('stores the blended rate', function() {
      nextState = blendedRateReducer(INITIAL_STATE, {
        type: actionTypes.BLENDED_RATE_GET_SUCCESS,
        payload
      });
      expect(nextState.series).to.equal(payload);
    });
  });

  describe(`${actionTypes.BLENDED_RATE_GET_FAILURE}`, function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
    });

    it('returns the correct value for current year blended rate', function() {
      nextState = blendedRateReducer(INITIAL_STATE, {
        type: actionTypes.BLENDED_RATE_GET_FAILURE,
        payload: expectedError
      });

      expect(nextState.error).to.deep.equal(expectedError);
    });
  });

  describe('SET_SELECTED_FACILITY_SLUG', function() {
    let nextState;
    beforeEach(function() {
      const curr = fixture.buildList(
        'blendedRate',
        faker.random.number({ min: 1, max: 10 })
      );
      const prev = fixture.buildList(
        'blendedRate',
        faker.random.number({ min: 1, max: 10 })
      );

      blendedRateReducer(INITIAL_STATE, {
        type: actionTypes.BLENDED_RATE_GET_SUCCESS,
        payload: { prev, curr }
      });

      nextState = blendedRateReducer(INITIAL_STATE, {
        type: 'SET_SELECTED_FACILITY_SLUG'
      });
    });

    it('resets to the initial state', function() {
      expect(nextState).to.deep.equal(INITIAL_STATE);
    });
  });
});
