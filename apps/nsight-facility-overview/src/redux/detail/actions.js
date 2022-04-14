import _ from 'lodash';
import { DateTime } from 'luxon';

import { kpiConfig } from '@ndustrial/nsight-common';
import { moduleConfig } from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const {
  constants: { KPI_KEYS, kpiEnums }
} = kpiConfig;

const _getFetchDates = (startDate, endDate, isRealTimeEnabled) => {
  let effectiveStartDate;
  let effectiveEndDate;

  if (isRealTimeEnabled) {
    effectiveStartDate = startDate
      .clone()
      .utc()
      .startOf('day')
      .toISOString();
    effectiveEndDate = endDate
      .clone()
      .utc()
      .endOf('day')
      .toISOString();
  } else {
    effectiveStartDate = startDate
      .clone()
      .utc()
      .startOf('month')
      .toISOString();
    effectiveEndDate = endDate
      .clone()
      .utc()
      .endOf('month')
      .toISOString();
  }

  return { effectiveStartDate, effectiveEndDate };
};

const _hasIsEstimated = (kpiDetail, breakdown) => {
  let isEstimated = kpiDetail.values.some((value) => value.isEstimated);

  for (let i = 0, values = Object.values(breakdown); i < values.length; i++) {
    if (isEstimated) {
      break;
    }
    isEstimated = values.some((value) => value.isEstimated);
  }

  return isEstimated;
};

const _getFetchMetrics = (kpiConfig, window, isPrimary) => {
  const { COMPARE_BY_TYPES } = kpiEnums;
  let metric;
  if (kpiConfig.compareBy === COMPARE_BY_TYPES.METRIC) {
    metric = isPrimary ? kpiConfig.primaryMetric : kpiConfig.comparisonMetric;

    // NOTE: this is a departure due to kpi config incompatibility with
    //  our implementation and a lack of support for this special kpi type
    //  which isn't exactly compareBy "metric" or compareBy "date"
    if (kpiConfig.slug === KPI_KEYS.KWH_BUDGET) {
      if (metric === 'facility_daily_rolling_month_cuml_kwh_budget') {
        metric = 'facility_daily_kwh_budget';
      }

      metric = metric.replace('monthly', 'daily');
    }
  } else {
    metric = kpiConfig[window].key;
  }

  return metric;
};

const _getKpiDetailBreakdownData = (
  breakdown,
  effectiveStartDate,
  effectiveEndDate,
  facilityId
) => {
  return contxtSdk[moduleConfig.name]
    .getProxiedAssetMetricValues(
      breakdown.reduce((memo, item) => {
        if (item.hide) {
          return memo;
        }

        return [...memo, item.key];
      }, []),
      [facilityId],
      effectiveStartDate,
      effectiveEndDate
    )
    .then((breakdownData) => {
      if (!breakdownData[facilityId]) {
        return {};
      }

      return Object.keys(breakdownData[facilityId]).reduce(
        (accumulator, metricKey) => {
          const breakdownChartData = _.sortBy(
            breakdownData[facilityId][metricKey],
            ['effectiveStartDate']
          );

          // prettier-ignore
          accumulator[metricKey] = {
            isBreakdownEstimated: breakdownData[facilityId][metricKey]
              .some((data) => data.isEstimated),
            records: breakdownChartData
          };

          return accumulator;
        },
        {}
      );
    });
};

const _getKpiDetailData = (
  fetchLabel,
  facilityId,
  effectiveStartDate,
  effectiveEndDate
) => {
  return contxtSdk[moduleConfig.name]
    .getProxiedAssetMetricValues(
      [fetchLabel],
      [facilityId],
      effectiveStartDate,
      effectiveEndDate
    )
    .then((dataByIdKpiLabel) => {
      const records = dataByIdKpiLabel[facilityId][fetchLabel];

      const kpiTotal = records.reduce((total, data) => {
        return total + parseFloat(data.value);
      }, 0);

      const kpiAvg = records.length > 0 ? kpiTotal / records.length : null;

      return {
        avg: kpiAvg,
        values: _.sortBy(records, ['effectiveStartDate'])
      };
    });
};

const _getAdditionalMetrics = (
  kpiConfig,
  facilityId,
  effectiveStartDate,
  effectiveEndDate
) => {
  if (kpiConfig.slug !== KPI_KEYS.KWH_BUDGET) {
    return null;
  }

  const calculatedStart = DateTime.fromISO(effectiveStartDate)
    .startOf('month')
    .toISO();
  const calculatedEnd = DateTime.fromISO(effectiveEndDate)
    .endOf('month')
    .toISO();

  return contxtSdk[moduleConfig.name]
    .getProxiedAssetMetricValues(
      kpiConfig.additionalMetrics.map((metricItem) => metricItem.metric),
      [facilityId],
      calculatedStart,
      calculatedEnd
    )
    .then((dataByFacilityIdKpiLabel) => {
      const records = dataByFacilityIdKpiLabel[facilityId];
      return Object.keys(records).reduce(
        (memo, metricKey) => ({
          ...memo,
          [metricKey]: {
            records: _.sortBy(records[metricKey], ['effectiveStartDate'])
          }
        }),
        {}
      );
    });
};

const RANGE_TYPE = {
  PRIMARY: 'primary',
  COMPARISON: 'comparison'
};

const DETAIL_ACTIONS = {
  [RANGE_TYPE.PRIMARY]: [
    actionTypes.FACILITY_DETAIL_PRIMARY_GET_START,
    actionTypes.FACILITY_DETAIL_PRIMARY_GET_SUCCESS,
    actionTypes.FACILITY_DETAIL_PRIMARY_GET_FAILURE
  ],
  [RANGE_TYPE.COMPARISON]: [
    actionTypes.FACILITY_DETAIL_COMPARISON_GET_START,
    actionTypes.FACILITY_DETAIL_COMPARISON_GET_SUCCESS,
    actionTypes.FACILITY_DETAIL_COMPARISON_GET_FAILURE
  ]
};

const getKpiDetails = (
  facilityId,
  kpiConfig,
  fetchLabel,
  { effectiveStartDate, effectiveEndDate },
  rangeType
) => {
  const [START, SUCCESS, FAILURE] = DETAIL_ACTIONS[rangeType];

  return (dispatch) => {
    dispatch({
      type: START,
      isLoading: true
    });

    const endDate = DateTime.fromISO(effectiveEndDate);
    const startDate = DateTime.fromISO(effectiveStartDate).plus({ day: 1 });

    // TODO, not sure what to do for multimonth request yet, so will dispatch an error/failure
    if (
      kpiConfig.slug === KPI_KEYS.KWH_BUDGET &&
      (endDate.diff(startDate).months > 1 || endDate.month !== startDate.month)
    ) {
      return dispatch({
        type: FAILURE,
        error: true,
        payload: {
          msg: 'KWH_BUDGET does not currently support a multi month request'
        },
        isLoading: false
      });
    }

    const requests = [
      _getKpiDetailData(
        fetchLabel,
        facilityId,
        effectiveStartDate,
        effectiveEndDate
      ),
      _getKpiDetailBreakdownData(
        kpiConfig.detail.breakdown,
        effectiveStartDate,
        effectiveEndDate,
        facilityId
      )
    ];

    if (rangeType === RANGE_TYPE.PRIMARY) {
      requests.push(
        _getAdditionalMetrics(
          kpiConfig,
          facilityId,
          effectiveStartDate,
          effectiveEndDate
        )
      );
    }

    return Promise.all(requests)
      .then(([kpiDetail, breakdown, additionalMetrics = null]) => {
        dispatch({
          type: SUCCESS,
          payload: {
            avg: kpiDetail.avg,
            values: kpiDetail.values,
            additionalMetrics,
            breakdown,
            isEstimated: _hasIsEstimated(kpiDetail, breakdown),
            isLoading: false
          },
          metricName: kpiConfig.slug
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

const resetComparisonDetailData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FACILITY_DETAIL_COMPARISON_DATA_RESET
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

const getComparisonDetailData = (
  facilityId,
  kpiConfig,
  startDate,
  endDate,
  isRealTimeEnabled,
  window
) => {
  const { DATE_INTERVALS } = kpiEnums;
  const dates = _getFetchDates(
    startDate,
    endDate,
    isRealTimeEnabled &&
      kpiConfig.minimumDateInterval !== DATE_INTERVALS.MONTHLY
  );

  return getKpiDetails(
    facilityId,
    kpiConfig,
    _getFetchMetrics(kpiConfig, window, false),
    dates,
    RANGE_TYPE.COMPARISON
  );
};

const getPrimaryDetailData = (
  facilityId,
  kpiConfig,
  startDate,
  endDate,
  isRealTimeEnabled,
  window
) => {
  const { DATE_INTERVALS } = kpiEnums;
  const dates = _getFetchDates(
    startDate,
    endDate,
    isRealTimeEnabled &&
      kpiConfig.minimumDateInterval !== DATE_INTERVALS.MONTHLY
  );

  return getKpiDetails(
    facilityId,
    kpiConfig,
    _getFetchMetrics(kpiConfig, window, true),
    dates,
    RANGE_TYPE.PRIMARY
  );
};

const resetPrimaryDetailData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FACILITY_DETAIL_PRIMARY_DATA_RESET
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
