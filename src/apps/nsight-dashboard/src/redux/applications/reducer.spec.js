import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import applicationsReducer, { INITIAL_STATE } from './reducer';

describe('nsight-dashboard/redux/applications/reducer', function() {
  it('returns the initial state', function() {
    expect(applicationsReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('LOAD_APPLICATION_GROUPINGS_SUCCESS', function() {
    let expectedGroupings;
    let nextState;

    beforeEach(function() {
      expectedGroupings = fixtures.buildList(
        'applicationGrouping',
        faker.random.number({ min: 1, max: 10 })
      );

      nextState = applicationsReducer(INITIAL_STATE, {
        type: 'LOAD_APPLICATION_GROUPINGS_SUCCESS',
        payload: expectedGroupings
      });
    });

    it('stores the application groupings', function() {
      expect(nextState.groupings).to.equal(expectedGroupings);
    });
  });

  describe('RESET_APPLICATION_GROUPINGS', function() {
    let nextState;

    beforeEach(function() {
      const previousState = {
        ...INITIAL_STATE,
        groupings: fixtures.buildList(
          'applicationGrouping',
          faker.random.number({ min: 1, max: 10 })
        )
      };

      nextState = applicationsReducer(previousState, {
        type: 'RESET_APPLICATION_GROUPINGS'
      });
    });

    it('resets the application groupings to their initial state', function() {
      expect(nextState.groupings).to.equal(INITIAL_STATE.groupings);
    });
  });

  describe('RESET_DEFAULT_APPLICATION_ROUTE', function() {
    let nextState;

    beforeEach(function() {
      const previousState = {
        ...INITIAL_STATE,
        defaultApplicationRoute: fixtures.build('applicationModule').slug
      };

      nextState = applicationsReducer(previousState, {
        type: 'RESET_DEFAULT_APPLICATION_ROUTE'
      });
    });

    it('reset the default application route to its initial state', function() {
      expect(nextState.defaultApplicationRoute).to.equal(
        INITIAL_STATE.defaultApplicationRoute
      );
    });
  });

  describe('SET_DEFAULT_APPLICATION_ROUTE', function() {
    let expectedDefaultApplicationRoute;
    let nextState;

    beforeEach(function() {
      expectedDefaultApplicationRoute = fixtures.build('applicationModule')
        .slug;

      nextState = applicationsReducer(INITIAL_STATE, {
        type: 'SET_DEFAULT_APPLICATION_ROUTE',
        payload: expectedDefaultApplicationRoute
      });
    });

    it('stores the default application route', function() {
      expect(nextState.defaultApplicationRoute).to.equal(
        expectedDefaultApplicationRoute
      );
    });
  });
});
