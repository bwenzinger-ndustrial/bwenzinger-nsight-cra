import { expect } from 'chai';
import faker from 'faker';

import fixture from '../../../test/fixtures/factories';
import actionTypes from './actionTypes';
import aggregateDemandReducer, { INITIAL_STATE } from './reducer';

describe('nsight-facility-overview/redux/aggregateDemand/reducer', function() {
  let aggDemand;
  let payload;

  it('returns the initial state', function() {
    expect(aggregateDemandReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.AGGREGATE_DEMAND_GET_SUCCESS}`, function() {
    let nextState;

    beforeEach(function() {
      aggDemand = fixture.buildList(
        'aggregateDemand',
        faker.random.number({ min: 2, max: 10 })
      );

      payload = aggDemand;
    });

    it('stores the aggregate demand', function() {
      nextState = aggregateDemandReducer(INITIAL_STATE, {
        type: actionTypes.AGGREGATE_DEMAND_GET_SUCCESS,
        payload
      });
      expect(nextState.values).to.equal(payload);
    });
  });

  describe(`${actionTypes.AGGREGATE_DEMAND_GET_FAILURE}`, function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
      nextState = aggregateDemandReducer(INITIAL_STATE, {
        type: actionTypes.AGGREGATE_DEMAND_GET_FAILURE,
        payload: expectedError
      });
    });

    it('returns the correct value for aggregate demand', function() {
      expect(nextState.error).to.deep.equal(expectedError);
    });

    it('values are reset to an empty array', function() {
      expect(nextState.values).to.deep.equal([]);
    });

    context(
      'when data already exists and there is a failure on an interval call',
      function() {
        let prevState;

        beforeEach(function() {
          expectedError = faker.hacker.phrase();

          prevState = {
            values: fixture.buildList(
              'aggregateDemand',
              faker.random.number({ min: 2, max: 10 })
            ),
            error: null
          };

          nextState = aggregateDemandReducer(prevState, {
            type: actionTypes.AGGREGATE_DEMAND_GET_FAILURE,
            payload: expectedError
          });
        });

        it('sets the error but persists the data', function() {
          expect(nextState).to.deep.equal({
            values: prevState.values,
            error: expectedError
          });
        });
      }
    );
  });

  describe('CURRENT_TOTAL_DEMAND_GET_SUCCESS', function() {
    let nextState;

    beforeEach(function() {
      const currentTotal = {
        type: 'electric',
        value: faker.random.number()
      };

      payload = currentTotal;
    });

    it('stores the current total demand', function() {
      nextState = aggregateDemandReducer(INITIAL_STATE, {
        type: 'CURRENT_TOTAL_DEMAND_GET_SUCCESS',
        payload
      });
      expect(nextState.currDemandTotal).to.equal(payload);
    });
  });

  describe('CURRENT_TOTAL_DEMAND_GET_FAILURE', function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = faker.hacker.phrase();
      nextState = aggregateDemandReducer(INITIAL_STATE, {
        type: 'CURRENT_TOTAL_DEMAND_GET_FAILURE',
        payload: expectedError
      });
    });

    it('returns the correct error', function() {
      expect(nextState.error).to.deep.equal(expectedError);
    });

    it('values are reset to an empty object', function() {
      expect(nextState.currDemandTotal).to.deep.equal({});
    });
  });

  describe('SET_SELECTED_FACILITY_SLUG', function() {
    let nextState;
    beforeEach(function() {
      const prevState = {
        values: fixture.buildList(
          'aggregateDemand',
          faker.random.number({ min: 2, max: 10 })
        ),
        error: null
      };

      nextState = aggregateDemandReducer(prevState, {
        type: 'SET_SELECTED_FACILITY_SLUG'
      });
    });

    it('resets to the initial state', function() {
      expect(nextState).to.deep.equal(INITIAL_STATE);
    });
  });
});
