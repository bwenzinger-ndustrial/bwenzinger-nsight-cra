import _ from 'lodash';

import { moduleConfig } from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const _getFetchDates = (startDate, endDate) => {
  const effectiveStartDate = startDate
    .clone()
    .utc()
    .startOf('month')
    .toISOString();
  const effectiveEndDate = endDate
    .clone()
    .utc()
    .endOf('month')
    .toISOString();

  return { effectiveStartDate, effectiveEndDate };
};

const _getEmissionsData = (
  fetchLabel,
  id,
  effectiveStartDate,
  effectiveEndDate
) => {
  return contxtSdk[moduleConfig.name]
    .getProxiedAssetMetricValues(
      [fetchLabel],
      [id],
      effectiveStartDate,
      effectiveEndDate,
      true
    )
    .then((dataByIdKpiLabel) => {
      const metricsByYear = {};
      Object.keys(dataByIdKpiLabel[id]).forEach((metricKey) => {
        // for each metric, group values by year. We'll need this to do aggregate math
        // on, at least, one avoidance value (spend avoidance)
        metricsByYear[metricKey] = [];

        Object.keys(dataByIdKpiLabel[id][metricKey]).forEach((key) => {
          const groupedByYear = _.groupBy(
            dataByIdKpiLabel[id][metricKey],
            (record) => {
              return record.effectiveStartDate.substring(0, 4);
            }
          );

          // for each year, sum up values and use total value
          Object.keys(groupedByYear).forEach((year) => {
            dataByIdKpiLabel[id][metricKey] = {};

            const yearlySum = _.sumBy(groupedByYear[year], (record) => {
              return parseFloat(record.value);
            });

            metricsByYear[metricKey].push({ value: yearlySum, year: year });
          });
        });
      });

      return metricsByYear;
    });
};

const EMISSIONS_ACTIONS = {
  primary: [
    actionTypes.EMISSIONS_PRIMARY_START,
    actionTypes.EMISSIONS_PRIMARY_SUCCESS,
    actionTypes.EMISSIONS_PRIMARY_FAILURE
  ],
  comparison: [
    actionTypes.EMISSIONS_COMPARISON_START,
    actionTypes.EMISSIONS_COMPARISON_SUCCESS,
    actionTypes.EMISSIONS_COMPARISON_FAILURE
  ]
};

const getEmissions = (
  id,
  metricLabels,
  { effectiveStartDate, effectiveEndDate },
  actions
) => {
  const [START, SUCCESS, FAILURE] = actions;
  return (dispatch) => {
    dispatch({
      type: START,
      isLoading: true
    });

    return Promise.all([
      _getEmissionsData(metricLabels, id, effectiveStartDate, effectiveEndDate)
    ])
      .then(([response]) => {
        dispatch({
          type: SUCCESS,
          payload: response,
          isLoading: false
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: FAILURE,
          error: true,
          payload: error,
          isLoading: false
        });
      });
  };
};

const resetComparisonEmissionsData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.EMISSIONS_COMPARISON_DATA_RESET
    });

    dispatch({
      type: actionTypes.EMISSIONS_COMPARISON_DATE_SET,
      payload: {
        from: undefined,
        to: undefined
      }
    });
  };
};

const getComparisonEmissionsData = (id, metricLabels, startDate, endDate) => {
  const dates = _getFetchDates(startDate, endDate);
  return getEmissions(id, metricLabels, dates, EMISSIONS_ACTIONS.comparison);
};

const getPrimaryEmissionsData = (id, metricLabels, startDate, endDate) => {
  const dates = _getFetchDates(startDate, endDate);
  return getEmissions(id, metricLabels, dates, EMISSIONS_ACTIONS.primary);
};

const resetPrimaryEmissionsData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.EMISSIONS_PRIMARY_DATA_RESET
    });

    dispatch({
      type: actionTypes.EMISSIONS_PRIMARY_DATE_SET,
      payload: {
        from: undefined,
        to: undefined
      }
    });
  };
};

const setComparisonDates = (dateObj) => {
  return {
    type: actionTypes.EMISSIONS_COMPARISON_DATE_SET,
    payload: dateObj
  };
};

const setPrimaryDates = (dateObj) => {
  return {
    type: actionTypes.EMISSIONS_PRIMARY_DATE_SET,
    payload: dateObj
  };
};

export {
  getComparisonEmissionsData,
  getPrimaryEmissionsData,
  resetComparisonEmissionsData,
  resetPrimaryEmissionsData,
  setComparisonDates,
  setPrimaryDates
};
