import { batch } from 'react-redux';
import { DateTime } from 'luxon';

import { moduleConfig } from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import { OVERVIEW_METRICS } from '../../constants';
import actionTypes from './actionTypes';

function getCurrentDailyKwhData(facility, assetMetric) {
  const currentDate = DateTime.fromJSDate(new Date(), {
    zone: facility.timezone
  });

  return (dispatch) => {
    dispatch({
      type: actionTypes.DAILY_KWH_CURRENT_GET_START
    });

    return contxtSdk[moduleConfig.name]
      .getProxiedAssetMetricValues(
        [assetMetric.dailyKey],
        [facility.id],
        currentDate.minus({ days: 29 }).toISO(),
        currentDate.toISO()
      )
      .then((data) => {
        dispatch({
          type: actionTypes.DAILY_KWH_CURRENT_GET_SUCCESS,
          payload: data[facility.id][assetMetric.dailyKey],
          meta: { name: 'current' }
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.DAILY_KWH_CURRENT_GET_FAILURE,
          error: true,
          meta: { name: 'current' },
          payload: error
        });
      });
  };
}

function getLastDailyKwhData(facility, assetMetric) {
  const currentDate = DateTime.fromJSDate(new Date(), {
    zone: facility.timezone
  });

  const formattedDate = DateTime.fromISO(currentDate.toISO(), { zone: 'utc' });

  return (dispatch) => {
    dispatch({
      type: actionTypes.DAILY_KWH_LAST_GET_START
    });

    return contxtSdk[moduleConfig.name]
      .getProxiedAssetMetricValues(
        [assetMetric.dailyKey],
        [facility.id],
        formattedDate.minus({ year: 1 }).minus({ days: 29 }),
        formattedDate.minus({ year: 1 })
      )
      .then((data) => {
        dispatch({
          type: actionTypes.DAILY_KWH_LAST_GET_SUCCESS,
          payload: data[facility.id][assetMetric.dailyKey],
          meta: { name: 'last' }
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.DAILY_KWH_LAST_GET_FAILURE,
          error: true,
          meta: { name: 'last' },
          payload: error
        });
      });
  };
}

const getDailyKwhData = (facility, assetMetricLabel) => {
  return (dispatch) => {
    const assetMetric = OVERVIEW_METRICS.find(
      (item) => item.dailyKey === assetMetricLabel
    );

    batch(() => {
      dispatch(getCurrentDailyKwhData(facility, assetMetric));
      dispatch(getLastDailyKwhData(facility, assetMetric));
    });
  };
};
export { getDailyKwhData };
