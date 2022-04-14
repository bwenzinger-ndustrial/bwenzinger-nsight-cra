import { expect } from 'chai';
import faker from 'faker';

import actionTypes from './actionTypes';
import primaryReducer, { INITIAL_STATE } from './primaryReducer';

describe('nsight-facility-overview/redux/detail/primary/reducer', function() {
  it('returns the initial state', function() {
    expect(primaryReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe(`${actionTypes.FACILITY_DETAIL_PRIMARY_GET_START}`, function() {
    let nextState;

    it('sets the loading status to be true', function() {
      nextState = primaryReducer(INITIAL_STATE, {
        type: actionTypes.FACILITY_DETAIL_PRIMARY_GET_START
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        isLoading: true
      });
    });
  });

  describe(`${actionTypes.FACILITY_DETAIL_PRIMARY_GET_SUCCESS}`, function() {
    let nextState;
    let expectedData;

    beforeEach(function() {
      expectedData = {
        avg: faker.random.number(),
        values: [{ [faker.random.word]: faker.random.number() }],
        breakdown: {
          [faker.random.word]: faker.random.number()
        },
        primaryDates: undefined
      };
    });

    it('sets the action payload to the state', function() {
      nextState = primaryReducer(
        {},
        {
          type: actionTypes.FACILITY_DETAIL_PRIMARY_GET_SUCCESS,
          payload: expectedData,
          metricName: 'test'
        }
      );

      expect(nextState).to.deep.equal({
        primaryDetailByMetric: {
          test: expectedData
        },
        error: null,
        isLoading: false,
        primaryDates: undefined
      });
    });
  });

  describe(`${actionTypes.FACILITY_DETAIL_PRIMARY_GET_FAILURE}`, function() {
    let expectedError;
    let nextState;

    it('sets the error to the state and clears the data', function() {
      nextState = primaryReducer(
        {},
        {
          type: actionTypes.FACILITY_DETAIL_PRIMARY_GET_FAILURE,
          payload: expectedError
        }
      );

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        error: expectedError,
        isLoading: false,
        primaryDates: undefined
      });
    });
  });

  describe(`${actionTypes.FACILITY_DETAIL_PRIMARY_DATA_RESET}`, function() {
    let nextState;
    let prevState;

    it('resets to the initial state', function() {
      prevState = {
        avg: faker.random.number(),
        primaryDates: {
          from: faker.date.past(),
          to: faker.date.recent()
        },
        values: [{ [faker.random.word]: faker.random.number() }],
        breakdown: {
          [faker.random.word]: faker.random.number()
        }
      };

      nextState = primaryReducer(prevState, {
        type: actionTypes.FACILITY_DETAIL_PRIMARY_DATA_RESET
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        primaryDates: prevState.primaryDates,
        isLoading: false,
        error: null
      });
    });
  });

  describe(`${actionTypes.PRIMARY_DATE_SET}`, function() {
    let datePayload;
    let nextState;

    it('sets the primary dates', function() {
      datePayload = {
        [faker.random.word()]: new Date()
      };
      nextState = primaryReducer(INITIAL_STATE, {
        type: actionTypes.PRIMARY_DATE_SET,
        payload: datePayload
      });

      expect(nextState).to.deep.equal({
        ...INITIAL_STATE,
        primaryDates: datePayload
      });
    });
  });
});
