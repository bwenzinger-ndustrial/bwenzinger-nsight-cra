import { expect } from 'chai';
import faker from 'faker';

import requestStateReducer, { INITIAL_STATE } from './requestStateReducer';

describe('nsight-dashboard/redux/requestState/reducer', function() {
  it('returns the initial state', function() {
    const nextState = requestStateReducer(undefined, {});

    expect(nextState).to.equal(INITIAL_STATE);
  });

  it('ignores actions that do not end with _START, _SUCCESS, or _FAILURE', function() {
    const prevState = {
      hasCompleted: {
        [`LOAD_${faker.hacker.noun().toUpperCase()}`]: faker.random.boolean(),
        [`LOAD_${faker.random.word().toUpperCase()}`]: faker.random.boolean(),
        [`LOAD_${faker.lorem.word().toUpperCase()}`]: faker.random.boolean()
      },
      isLoading: {
        [`LOAD_${faker.hacker.noun().toUpperCase()}`]: faker.random.boolean(),
        [`LOAD_${faker.random.word().toUpperCase()}`]: faker.random.boolean(),
        [`LOAD_${faker.lorem.word().toUpperCase()}`]: faker.random.boolean()
      }
    };
    const nextState = requestStateReducer(prevState, {
      type: `SELECT_${faker.commerce.department}_DEPARTMENT`
    });

    expect(nextState).to.equal(prevState);
  });

  describe('completion state', function() {
    it("sets a request's completion state to true when the request successfully completes", function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const nextState = requestStateReducer(
        {
          hasCompleted: {},
          isLoading: {}
        },
        { type: `${requestName}_SUCCESS` }
      );

      expect(nextState.hasCompleted[requestName]).to.be.true();
    });

    it("sets a request's completion state to false when starting a request", function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const nextState = requestStateReducer(
        {
          hasCompleted: {},
          isLoading: {}
        },
        { type: `${requestName}_START` }
      );

      expect(nextState.hasCompleted[requestName]).to.be.false();
    });

    it("sets a request's completion state to false when the request fails", function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const nextState = requestStateReducer(
        {
          hasCompleted: {},
          isLoading: {}
        },
        { type: `${requestName}_FAILURE` }
      );

      expect(nextState.hasCompleted[requestName]).to.be.false();
    });

    it('manages the status of multiple requests', function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const prevState = {
        hasCompleted: {},
        isLoading: {
          [`LOAD_${faker.random.word().toUpperCase()}`]: faker.random.boolean(),
          [`LOAD_${faker.lorem.word().toUpperCase()}`]: faker.random.boolean(),
          [requestName]: false
        }
      };
      const nextState = requestStateReducer(prevState, {
        type: `${requestName}_SUCCESS`
      });

      expect(nextState.hasCompleted).to.deep.equal({
        ...prevState.hasCompleted,
        [requestName]: true
      });
    });
  });

  describe('loading state', function() {
    it("sets a request's loading status to true when starting a request", function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const nextState = requestStateReducer(undefined, {
        type: `${requestName}_START`
      });

      expect(nextState.isLoading[requestName]).to.be.true();
    });

    it("sets a request's loading status to false when the request successfully completes", function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const nextState = requestStateReducer(
        {
          hasCompleted: {},
          isLoading: { [requestName]: true }
        },
        { type: `${requestName}_SUCCESS` }
      );

      expect(nextState.isLoading[requestName]).to.be.false();
    });

    it("sets a request's loading status to false when the request fails", function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const nextState = requestStateReducer(
        {
          hasCompleted: {},
          isLoading: { [requestName]: true }
        },
        { type: `${requestName}_FAILURE` }
      );

      expect(nextState.isLoading[requestName]).to.be.false();
    });

    it('manages the status of multiple requests', function() {
      const requestName = `LOAD_${faker.hacker.noun().toUpperCase()}`;
      const prevState = {
        hasCompleted: {},
        isLoading: {
          [`LOAD_${faker.random.word().toUpperCase()}`]: faker.random.boolean(),
          [`LOAD_${faker.lorem.word().toUpperCase()}`]: faker.random.boolean(),
          [requestName]: true
        }
      };
      const nextState = requestStateReducer(prevState, {
        type: `${requestName}_${faker.random.arrayElement([
          'SUCCESS',
          'FAILURE'
        ])}`
      });

      expect(nextState.isLoading).to.deep.equal({
        ...prevState.isLoading,
        [requestName]: false
      });
    });
  });
});
