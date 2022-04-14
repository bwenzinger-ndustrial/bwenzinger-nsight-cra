import _ from 'lodash';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { moduleConfig } from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

// With the request using facility ids, we should be able to handle
// a very large number of facilities in one request before the url
// becomes to large.
const FACILITY_REQUEST_COUNT = 1000;

function getPortfolioKPIData(orgId, kpiConfig, comparisonDates) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_PORTFOLIO_KPI_START,
      meta: {
        kpi: kpiConfig.monthly.key
      }
    });

    const compareByStartDate =
      kpiConfig.compareBy === 'metric'
        ? comparisonDates.primaryRangeStart
        : comparisonDates.secondaryRangeStart;
    const compareByEndDate =
      kpiConfig.compareBy === 'metric'
        ? comparisonDates.primaryRangeEnd
        : comparisonDates.secondaryRangeEnd;

    return Promise.all([
      contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        [
          kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE
            ? kpiConfig.monthly.key
            : kpiConfig.primaryMetric
        ],
        [orgId],
        comparisonDates.primaryRangeStart,
        comparisonDates.primaryRangeEnd
      ),
      contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        [
          kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE
            ? kpiConfig.monthly.key
            : kpiConfig.comparisonMetric
        ],
        [orgId],
        compareByStartDate,
        compareByEndDate
      )
    ])
      .then((response) => {
        const [primaryData, secondaryData] = response;

        const primaryMetric =
          kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE
            ? kpiConfig.monthly.key
            : kpiConfig.primaryMetric;

        const comparisonMetric =
          kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE
            ? kpiConfig.monthly.key
            : kpiConfig.comparisonMetric;

        const primaryDataValues = _.sortBy(primaryData[orgId][primaryMetric], [
          'effectiveStartDate'
        ]);
        const secondaryDataValues = _.sortBy(
          secondaryData[orgId][comparisonMetric],
          ['effectiveStartDate']
        );

        dispatch({
          type: actionTypes.GET_PORTFOLIO_KPI_SUCCESS,
          payload: {
            primaryData: primaryDataValues,
            secondaryData: secondaryDataValues
          },
          meta: {
            dateRanges: comparisonDates,
            kpi: kpiConfig.monthly.key
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_PORTFOLIO_KPI_FAILURE,
          error: true,
          meta: {
            kpi: kpiConfig.monthly.key
          },
          payload: err.message
        });

        throw err;
      });
  };
}

const actions = {
  primary: [
    actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_START,
    actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_SUCCESS,
    actionTypes.GET_PRIMARY_KPI_FOR_ALL_FACILITIES_FAILURE
  ],
  comparison: [
    actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_START,
    actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_SUCCESS,
    actionTypes.GET_COMPARISON_KPI_FOR_ALL_FACILITIES_FAILURE
  ]
};
function getKpiDataForFacilities(kpiKey, labels, facilityIds, range, actions) {
  return (dispatch) => {
    dispatch({
      type: actions[0],
      meta: {
        kpiKey,
        facilityIds
      }
    });

    // Batch out the facilityIds so that we can
    const facilityIdBatchs = [];
    let fetchIndex = 0;
    while (fetchIndex < facilityIds.length) {
      const ids = facilityIds.slice(
        fetchIndex,
        fetchIndex + FACILITY_REQUEST_COUNT
      );

      facilityIdBatchs.push(ids);
      fetchIndex = fetchIndex + FACILITY_REQUEST_COUNT;
    }

    const dataPromises = facilityIdBatchs.map((facilityIdBatch) => {
      return contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        labels,
        facilityIdBatch,
        range.from,
        range.to
      );
    });

    return Promise.all(dataPromises)
      .then((metricDataArray) => {
        const metricData = metricDataArray.reduce((acc, next) => {
          Object.keys(next).forEach((key) => {
            acc[key] = next[key];
          });
          return acc;
        });
        dispatch({
          type: actions[1],
          meta: {
            kpiKey,
            facilityIds
          },
          payload: metricData
        });
      })
      .catch((err) => {
        dispatch({
          type: actions[2],
          error: true,
          payload: err,
          meta: {
            kpiKey,
            facilityIds
          }
        });
      });
  };
}

function getComparisonKPIDataForFacilities(kpiKey, labels, facilityIds, range) {
  return getKpiDataForFacilities(
    kpiKey,
    labels,
    facilityIds,
    range,
    actions.comparison
  );
}

function getPrimaryKPIDataForFacilities(kpiKey, labels, facilityIds, range) {
  return getKpiDataForFacilities(
    kpiKey,
    labels,
    facilityIds,
    range,
    actions.primary
  );
}

function resetComparisonKPIDetailData(kpiKey) {
  return {
    type: actionTypes.RESET_COMPARISON_KPI_FOR_FACILITIES,
    meta: {
      kpiKey
    }
  };
}

function resetPrimaryKPIDetailData(kpiKey) {
  return {
    type: actionTypes.RESET_PRIMARY_KPI_FOR_FACILITIES,
    meta: {
      kpiKey
    }
  };
}

export {
  getComparisonKPIDataForFacilities,
  getPortfolioKPIData,
  getPrimaryKPIDataForFacilities,
  resetComparisonKPIDetailData,
  resetPrimaryKPIDetailData
};
