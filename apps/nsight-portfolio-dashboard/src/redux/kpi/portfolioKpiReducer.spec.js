import { expect } from 'chai';
import faker from 'faker';

import fixtures from '../../../test/fixtures/factories';
import reducer, { INITIAL_STATE } from './portfolioKpiReducer';

describe('nsight-portfolio-dashboard/redux/kpi/portfolioKpiReducer', function() {
  it('returns the initial state', function() {
    expect(reducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  describe('GET_PORTFOLIO_KPI_START', function() {
    let expectedKpiName;
    let otherKpiData;
    let otherKpiName;
    let nextState;

    beforeEach(function() {
      expectedKpiName = faker.lorem.word();
      otherKpiName = faker.hacker.adjective();
      otherKpiData = {
        isLoading: false,
        primaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        },
        secondaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        }
      };
      const prevState = {
        ...INITIAL_STATE,
        [expectedKpiName]: {
          error: new Error(),
          isLoading: false,
          primaryData: {
            startDate: faker.date.past().toISOString(),
            endDate: faker.date.recent().toISOString(),
            values: fixtures.buildList('portfolioDetailKpiMetric', 30)
          },
          secondaryData: {
            startDate: faker.date.past().toISOString(),
            endDate: faker.date.recent().toISOString(),
            values: fixtures.buildList('portfolioDetailKpiMetric', 30)
          }
        },
        [otherKpiName]: otherKpiData
      };

      nextState = reducer(prevState, {
        type: 'GET_PORTFOLIO_KPI_START',
        meta: { kpi: expectedKpiName }
      });
    });

    it('clears any existing error for the specific KPI', function() {
      expect(nextState[expectedKpiName].error).to.be.null();
    });

    it('sets the loading status for the specific KPI', function() {
      expect(nextState[expectedKpiName].isLoading).to.be.true();
    });

    it('resets the primary and secondary data for the specific KPI', function() {
      expect(nextState[expectedKpiName].primaryData).to.be.null();
      expect(nextState[expectedKpiName].secondaryData).to.be.null();
    });

    it('keeps existing KPI data for other KPIs', function() {
      expect(nextState[otherKpiName]).to.equal(otherKpiData);
    });
  });

  describe('GET_PORTFOLIO_KPI_SUCCESS', function() {
    let expectedKpiData;
    let expectedKpiName;
    let otherKpiData;
    let otherKpiName;
    let nextState;

    beforeEach(function() {
      expectedKpiName = faker.lorem.word();
      expectedKpiData = {
        primaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        },
        secondaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        }
      };
      otherKpiName = faker.hacker.adjective();
      otherKpiData = {
        isLoading: false,
        primaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        },
        secondaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        }
      };
      const prevState = {
        ...INITIAL_STATE,
        [expectedKpiName]: {
          isLoading: true
        },
        [otherKpiName]: otherKpiData
      };

      nextState = reducer(prevState, {
        type: 'GET_PORTFOLIO_KPI_SUCCESS',
        meta: {
          dateRanges: {
            primaryRangeStart: expectedKpiData.primaryData.startDate,
            primaryRangeEnd: expectedKpiData.primaryData.endDate,
            secondaryRangeStart: expectedKpiData.secondaryData.startDate,
            secondaryRangeEnd: expectedKpiData.secondaryData.endDate
          },
          kpi: expectedKpiName,
          metric: expectedKpiData.metric
        },
        payload: {
          primaryData: expectedKpiData.primaryData.values,
          secondaryData: expectedKpiData.secondaryData.values
        }
      });
    });

    it('sets the loading status for the specific KPI', function() {
      expect(nextState[expectedKpiName].isLoading).to.be.false();
    });

    it('stores the KPI metric metadata', function() {
      expect(nextState[expectedKpiName].metric).to.equal(
        expectedKpiData.metric
      );
    });

    it('stores the primary and secondary data for the specific KPI', function() {
      expect(nextState[expectedKpiName].primaryData).to.deep.equal(
        expectedKpiData.primaryData
      );
      expect(nextState[expectedKpiName].secondaryData).to.deep.equal(
        expectedKpiData.secondaryData
      );
    });

    it('keeps existing KPI data for other KPIs', function() {
      expect(nextState[otherKpiName]).to.equal(otherKpiData);
    });
  });

  describe('GET_PORTFOLIO_KPI_FAILURE', function() {
    let expectedError;
    let expectedKpiName;
    let otherKpiData;
    let otherKpiName;
    let nextState;

    beforeEach(function() {
      expectedKpiName = faker.lorem.word();
      expectedError = new Error(faker.hacker.phrase());
      otherKpiName = faker.hacker.adjective();
      otherKpiData = {
        isLoading: false,
        primaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        },
        secondaryData: {
          startDate: faker.date.past().toISOString(),
          endDate: faker.date.recent().toISOString(),
          values: fixtures.buildList('portfolioDetailKpiMetric', 30)
        }
      };
      const prevState = {
        ...INITIAL_STATE,
        [expectedKpiName]: {
          isLoading: true
        },
        [otherKpiName]: otherKpiData
      };

      nextState = reducer(prevState, {
        type: 'GET_PORTFOLIO_KPI_FAILURE',
        meta: { kpi: expectedKpiName },
        error: true,
        payload: expectedError
      });
    });

    it('sets the loading status for the specific KPI', function() {
      expect(nextState[expectedKpiName].isLoading).to.be.false();
    });

    it('stores the error', function() {
      expect(nextState[expectedKpiName].error).to.equal(expectedError);
    });

    it('keeps existing KPI data for other KPIs', function() {
      expect(nextState[otherKpiName]).to.equal(otherKpiData);
    });
  });
});
