import { expect } from 'chai';
import faker from 'faker';

import fixture from '../../../test/fixtures/factories';
import actionTypes from './actionTypes';
import demandReducer, { INITIAL_STATE } from './reducer';

describe('nsight-facility-overview/redux/demandComparison/reducer', function() {
  it('returns the initial state', function() {
    expect(demandReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.DEMAND_GET_CURRENT_SUCCESS}`, function() {
    let nextState;
    let expectedDemandData;
    let demandFixture;

    beforeEach(function() {
      demandFixture = fixture.buildList(
        'demand',
        faker.random.number({ min: 1, max: 10 })
      );

      expectedDemandData = {
        currMonthDemand: demandFixture
      };
    });

    it('stores current month/year demand data', function() {
      nextState = demandReducer(INITIAL_STATE, {
        type: actionTypes.DEMAND_GET_CURRENT_SUCCESS,
        payload: expectedDemandData,
        meta: { name: 'currMonthDemand', value: 'values' }
      });

      expect(nextState.currMonthDemand).to.equal(expectedDemandData);
    });
  });

  describe(`${actionTypes.DEMAND_GET_LAST_SUCCESS}`, function() {
    let nextState;
    let expectedDemandData;
    let demandFixture;

    beforeEach(function() {
      demandFixture = fixture.buildList(
        'demand',
        faker.random.number({ min: 1, max: 10 })
      );

      expectedDemandData = {
        lastYearDemand: demandFixture
      };
    });

    it('stores last month/year demand data', function() {
      nextState = demandReducer(INITIAL_STATE, {
        type: actionTypes.DEMAND_GET_LAST_SUCCESS,
        payload: expectedDemandData,
        meta: { name: 'lastYearDemand', value: 'values' }
      });

      expect(nextState.lastYearDemand).to.equal(expectedDemandData);
    });
  });

  describe(`${actionTypes.DEMAND_MAX_GET_CURRENT_SUCCESS}`, function() {
    let nextState;
    let expectedDemandData;
    let demandMaxFixture;

    beforeEach(function() {
      demandMaxFixture = faker.random.number({ min: 1, max: 10 });

      expectedDemandData = {
        currYearMax: demandMaxFixture
      };
    });

    it('stores current year max demand', function() {
      nextState = demandReducer(INITIAL_STATE, {
        type: actionTypes.DEMAND_MAX_GET_CURRENT_SUCCESS,
        payload: expectedDemandData,
        meta: { name: 'currYearMax', value: 'value' }
      });

      expect(nextState.currYearMax).to.equal(expectedDemandData);
    });
  });

  describe(`${actionTypes.DEMAND_MAX_GET_LAST_SUCCESS}`, function() {
    let nextState;
    let expectedDemandData;
    let demandMaxFixture;

    beforeEach(function() {
      demandMaxFixture = faker.random.number({ min: 1, max: 10 });

      expectedDemandData = {
        lastYearMax: demandMaxFixture
      };
    });

    it('stores last year max demand', function() {
      nextState = demandReducer(INITIAL_STATE, {
        type: actionTypes.DEMAND_MAX_GET_LAST_SUCCESS,
        payload: expectedDemandData,
        meta: { name: 'lastYearMax', value: 'value' }
      });

      expect(nextState.lastYearMax).to.equal(expectedDemandData);
    });
  });

  describe('failure states', function() {
    const failureStates = [
      {
        action: 'DEMAND_GET_LAST_FAILURE',
        meta: { name: 'lastYearDemand', value: 'values' },
        expectedValue: [],
        expectedDemandData: null,
        prevSuccess: 'DEMAND_GET_LAST_SUCCESS'
      },
      {
        action: 'DEMAND_GET_CURRENT_FAILURE',
        meta: { name: 'currMonthDemand', value: 'values' },
        expectedValue: [],
        expectedDemandData: null,
        prevSuccess: 'DEMAND_GET_CURRENT_SUCCESS'
      },
      {
        action: 'DEMAND_MAX_GET_LAST_FAILURE',
        meta: { name: 'lastYearMax', value: 'value' },
        expectedValue: null,
        expectedDemandData: null,
        prevSuccess: 'DEMAND_MAX_GET_LAST_SUCCESS'
      },
      {
        action: 'DEMAND_MAX_GET_CURRENT_FAILURE',
        meta: { name: 'currYearMax', value: 'value' },
        expectedValue: null,
        expectedDemandData: null,
        prevSuccess: 'DEMAND_MAX_GET_CURRENT_SUCCESS'
      }
    ];

    failureStates.forEach((failure) => {
      let nextState;
      let expectedError;

      const demandFixture = fixture.buildList(
        'demand',
        faker.random.number({ min: 2, max: 10 })
      );

      const expectedDemandDataArray = {
        values: demandFixture
      };

      const expectedDemandDataString = {
        value: faker.random.number()
      };

      failure.expectedDemandData = failure.expectedValue
        ? expectedDemandDataArray
        : expectedDemandDataString;

      beforeEach(function() {
        expectedError = faker.hacker.phrase();
        nextState = demandReducer(INITIAL_STATE, {
          type: failure.action,
          payload: expectedError,
          meta: failure.meta
        });
      });

      it('returns the correct value', function() {
        expect(nextState[failure.meta.name].error).to.deep.equal(expectedError);
      });

      it('values are reset to an empty array', function() {
        expect(nextState[failure.meta.name][failure.meta.value]).to.deep.equal(
          failure.expectedValue
        );
      });

      context(
        'when data already exists and there is a failure on an interval call',
        function() {
          let prevState;
          let nextState;

          beforeEach(function() {
            expectedError = faker.hacker.phrase();

            prevState = demandReducer(INITIAL_STATE, {
              type: failure.prevSuccess,
              payload: failure.expectedDemandData,
              meta: failure.meta
            });

            nextState = demandReducer(prevState, {
              type: failure.action,
              payload: expectedError,
              meta: failure.meta
            });
          });

          it('sets the error but persists the data', function() {
            expect(nextState[failure.meta.name]).to.deep.equal({
              [failure.meta.value]:
                prevState[failure.meta.name][failure.meta.value],
              error: expectedError,
              isLoading: false
            });
          });
        }
      );
    });
  });

  describe('SET_SELECTED_FACILITY_SLUG', function() {
    let nextState;
    beforeEach(function() {
      const demandFixture = fixture.buildList(
        'demand',
        faker.random.number({ min: 1, max: 10 })
      );

      const expectedDemandData = {
        currMonthDemand: demandFixture
      };

      demandReducer(INITIAL_STATE, {
        type: actionTypes.DEMAND_GET_CURRENT_SUCCESS,
        payload: expectedDemandData
      });

      nextState = demandReducer(INITIAL_STATE, {
        type: 'SET_SELECTED_FACILITY_SLUG'
      });
    });

    it('resets to the initial state', function() {
      expect(nextState).to.deep.equal(INITIAL_STATE);
    });
  });
});
