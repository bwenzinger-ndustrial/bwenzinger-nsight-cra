import { expect } from 'chai';
import faker from 'faker';

import { fixtures } from '@ndustrial/nsight-test-utils';

import actionTypes from './actionTypes';
import kpiReducer, { INITIAL_STATE } from './kpiReducer';

const generateData = (facilityId, metric_label, count) => {
  return {
    [facilityId]: {
      [metric_label]: fixtures.buildList('portfolioDetailKpiMetric', count)
    }
  };
};

describe('nsight-portfolio-dashboard/redux/kpi/kpiReducer', function() {
  let facilities;
  let formulaAndUnit;

  let kpiLabel;
  let facilityId;
  let metricArrayLength;

  let baseData;
  let newData1;
  let newData2;

  let baseState;

  beforeEach(function() {
    facilities = fixtures.buildList('facility', 4);
    formulaAndUnit = fixtures.build('formulasAndUnits');
    kpiLabel = formulaAndUnit.label;
    facilityId = facilities[0].id;
    metricArrayLength = 5;

    baseData = generateData(facilityId, kpiLabel, metricArrayLength);
    newData1 = generateData(facilities[1].id, kpiLabel, 5);
    newData2 = generateData(facilities[2].id, kpiLabel, 5);

    baseState = {
      primaryData: {
        isLoading: {
          [kpiLabel]: {}
        },
        error: {
          [kpiLabel]: {}
        }
      },
      comparisonData: {
        isLoading: {
          [kpiLabel]: {}
        },
        error: {
          [kpiLabel]: {}
        }
      }
    };
  });

  it('returns the initial state', function() {
    expect(kpiReducer(undefined, {})).to.equal(INITIAL_STATE);
  });

  context('GET_COMPARISON_KPI_FOR_ALL_FACILITIES', function() {
    it('adds comparison data for a particular kpi to an empty state', function() {
      const label = faker.lorem.slug();
      const result = kpiReducer(baseState, {
        type: actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_SUCCESS,
        meta: { kpiKey: label, facilityIds: Object.keys(baseData) },
        payload: baseData
      });

      expect(result.comparisonData[label]).to.deep.eq(baseData);
    });

    it('appends multiple asset uuids (facilities) to an existing comparison kpiKey tree', function() {
      const label = faker.lorem.slug();
      const result = kpiReducer(baseState, {
        type: actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_SUCCESS,
        meta: { kpiKey: label, facilityIds: Object.keys(baseData) },
        payload: baseData
      });

      const newData = { ...newData1, ...newData2 };
      const update = kpiReducer(result, {
        type: actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_SUCCESS,
        meta: { kpiKey: label, facilityIds: Object.keys(newData) },
        payload: newData
      });

      const expectedCombinedData = {
        [label]: {
          ...result.comparisonData[label],
          ...newData
        }
      };

      Object.keys(update.comparisonData[label]).forEach((facilityId) => {
        expect(update.comparisonData[label][facilityId]).to.deep.eq(
          expectedCombinedData[label][facilityId]
        );
      });
    });
  });

  context('GET_PRIMARY_KPI_FOR_ALL_FACILITIES', function() {
    it('adds primary data for a particular kpiKey to an empty state', function() {
      const label = faker.lorem.slug();
      const result = kpiReducer(undefined, {
        type: actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_SUCCESS,
        meta: { kpiKey: label, facilityIds: Object.keys(baseData) },
        payload: baseData
      });

      expect(result.primaryData[label]).to.deep.eq(baseData);
    });

    it('appends multiple asset uuids (facilities) to an existing primary kpiKey tree', function() {
      const label = faker.lorem.slug();
      const result = kpiReducer(undefined, {
        type: actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_SUCCESS,
        meta: { kpiKey: label, facilityIds: Object.keys(baseData) },
        payload: baseData
      });

      const newData = { ...newData1, ...newData2 };
      const update = kpiReducer(result, {
        type: actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_SUCCESS,
        meta: { kpiKey: label, facilityIds: Object.keys(newData) },
        payload: newData
      });

      const expectedCombinedData = {
        [label]: {
          ...result.primaryData[label],
          ...newData
        }
      };

      Object.keys(update.primaryData[label]).forEach((facilityId) => {
        expect(update.primaryData[label][facilityId]).to.deep.eq(
          expectedCombinedData[label][facilityId]
        );
      });
    });
  });
});
