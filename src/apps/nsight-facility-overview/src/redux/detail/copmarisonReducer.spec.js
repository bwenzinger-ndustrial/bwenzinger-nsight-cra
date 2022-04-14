import { expect } from 'chai';
import faker from 'faker';

import actionTypes from './actionTypes';
import comparisonReducer, { INITIAL_STATE } from './comparisonReducer';

describe('nsight-facility-overview/redux/detail/comparison/reducer', function() {
  it('returns the initial state', function() {
    expect(comparisonReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.FACILITY_DETAIL_COMPARISON_GET_START}`, function() {
    let nextState;

    it('sets the loading status to be true', function() {
      nextState = comparisonReducer(INITIAL_STATE, {
        type: actionTypes.FACILITY_DETAIL_COMPARISON_GET_START
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        isLoading: true
      });
    });
  });

  describe(`${actionTypes.FACILITY_DETAIL_COMPARISON_GET_SUCCESS}`, function() {
    let nextState;
    let expectedData;

    beforeEach(function() {
      expectedData = {
        avg: faker.random.number(),
        values: [{ [faker.random.word]: faker.random.number() }],
        breakdown: {
          [faker.random.word]: faker.random.number()
        }
      };
    });

    it('sets the action payload to the state', function() {
      nextState = comparisonReducer(
        {},
        {
          type: actionTypes.FACILITY_DETAIL_COMPARISON_GET_SUCCESS,
          payload: expectedData,
          metricName: 'test'
        }
      );

      expect(nextState).to.deep.equal({
        comparisonDates: undefined,
        comparisonDetailByMetric: {
          test: expectedData
        },
        error: null,
        isLoading: false
      });
    });
  });

  describe(`${actionTypes.FACILITY_DETAIL_COMPARISON_GET_FAILURE}`, function() {
    let expectedError;
    let nextState;

    it('sets the error to the state and clears the data', function() {
      nextState = comparisonReducer(
        {},
        {
          type: actionTypes.FACILITY_DETAIL_COMPARISON_GET_FAILURE,
          payload: expectedError
        }
      );

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        comparisonDates: undefined,
        error: expectedError,
        isLoading: false
      });
    });
  });

  describe(`${actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET}`, function() {
    let nextState;
    let prevState;

    it('resets to the initial state', function() {
      prevState = {
        avg: faker.random.number(),
        comparisonDates: {
          from: faker.date.past(),
          to: faker.date.recent()
        },
        values: [{ [faker.random.word]: faker.random.number() }],
        breakdown: {
          [faker.random.word]: faker.random.number()
        }
      };

      nextState = comparisonReducer(prevState, {
        type: actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        comparisonDates: prevState.comparisonDates,
        isLoading: false,
        error: null
      });
    });
  });

  describe(`${actionTypes.COMPARISON_DATE_SET}`, function() {
    let datePayload;
    let nextState;

    it('sets the comparison dates', function() {
      datePayload = {
        [faker.random.word()]: new Date()
      };
      nextState = comparisonReducer(INITIAL_STATE, {
        type: actionTypes.COMPARISON_DATE_SET,
        payload: datePayload
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        comparisonDates: datePayload
      });
    });
  });
});
