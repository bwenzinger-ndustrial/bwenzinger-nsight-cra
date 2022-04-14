import _ from 'lodash';

import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import { moduleConfig } from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const getKpiDetailData = (metricKey, orgId, startDate, endDate) => {
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

  return contxtSdk[moduleConfig.name]
    .getProxiedAssetMetricValues(
      [metricKey],
      [orgId],
      effectiveStartDate,
      effectiveEndDate
    )
    .then((kpiData) => {
      let kpiTotal = 0;
      const kpiAssetData = kpiData[orgId][metricKey];

      kpiAssetData.forEach((data) => {
        kpiTotal += parseFloat(data.value);
      });
      const kpiAvg =
        kpiAssetData.length > 0 ? kpiTotal / kpiAssetData.length : null;
      const values = _.sortBy(kpiAssetData, ['effectiveStartDate']);
      let isEstimated = false;

      values.forEach((data, i) => {
        if (data.isEstimated) {
          isEstimated = true;
        }
      });

      return {
        avg: kpiAvg,
        values,
        isEstimated
      };
    });
};

const getComparisonDetailData = (orgId, kpiConfig, startDate, endDate) => {
  const fetchLabel =
    kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE
      ? kpiConfig.monthly.key
      : kpiConfig.comparisonMetric;

  return (dispatch) => {
    dispatch({
      type: actionTypes.PORTFOLIO_DETAIL_COMPARISON_GET_START
    });

    return getKpiDetailData(fetchLabel, orgId, startDate, endDate)
      .then((detailData) => {
        dispatch({
          type: actionTypes.PORTFOLIO_DETAIL_COMPARISON_GET_SUCCESS,
          payload: detailData,
          metricName: kpiConfig.slug
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.PORTFOLIO_DETAIL_COMPARISON_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

const resetComparisonDetailData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PORTFOLIO_DETAIL_COMPARISON_DATA_RESET
    });

    dispatch({
      type: actionTypes.COMPARISON_DATE_SET,
      payload: {
        from: undefined,
        to: undefined
      }
    });
  };
};

const getPrimaryDetailData = (orgId, kpiConfig, startDate, endDate) => {
  // NOTE: if KWH BUDGET ever makes it to portfolio, this will not work
  const fetchLabel =
    kpiConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.DATE
      ? kpiConfig.monthly.key
      : kpiConfig.primaryMetric;

  return (dispatch) => {
    dispatch({
      type: actionTypes.PORTFOLIO_DETAIL_PRIMARY_GET_START
    });

    return getKpiDetailData(fetchLabel, orgId, startDate, endDate)
      .then((detailData) => {
        dispatch({
          type: actionTypes.PORTFOLIO_DETAIL_PRIMARY_GET_SUCCESS,
          payload: detailData,
          // This is a bit weird right now, because monthly key is basically just the key of the kpi
          // and identifies it uniquely, but is also they fetch key for compareBy="date" kpis
          metricName: kpiConfig.slug
          // TODO, update variable names in other files to reduce confusion
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.PORTFOLIO_DETAIL_PRIMARY_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

const resetPrimaryDetailData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PORTFOLIO_DETAIL_PRIMARY_DATA_RESET
    });

    dispatch({
      type: actionTypes.PRIMARY_DATE_SET,
      payload: {
        from: undefined,
        to: undefined
      }
    });
  };
};

const setComparisonDates = (dateObj) => {
  return {
    type: actionTypes.COMPARISON_DATE_SET,
    payload: dateObj
  };
};

const setPrimaryDates = (dateObj) => {
  return {
    type: actionTypes.PRIMARY_DATE_SET,
    payload: dateObj
  };
};

export {
  getComparisonDetailData,
  getPrimaryDetailData,
  resetComparisonDetailData,
  resetPrimaryDetailData,
  setComparisonDates,
  setPrimaryDates
};
