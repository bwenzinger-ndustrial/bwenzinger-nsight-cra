import moment from 'moment';

import { moduleConfig } from '@ndustrial/nsight-common/services/EmsModule';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

export const ASSET_METRIC_LABEL = 'facility_daily_blended_rate';

const getBlendedRateData = (facilityId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.BLENDED_RATE_GET_START
    });

    const currentDate = moment()
      .utc()
      .endOf('day');

    return Promise.all([
      contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        [ASSET_METRIC_LABEL],
        [facilityId],
        currentDate
          .clone()
          .subtract(2, 'years')
          .add(1, 'days')
          .startOf('day')
          .toISOString(),
        currentDate
          .clone()
          .subtract(1, 'years')
          .endOf('day')
          .toISOString()
      ),
      contxtSdk[moduleConfig.name].getProxiedAssetMetricValues(
        [ASSET_METRIC_LABEL],
        [facilityId],
        currentDate
          .clone()
          .subtract(1, 'years')
          .add(1, 'days')
          .startOf('day')
          .toISOString(),
        currentDate.toISOString()
      )
    ])
      .then(([prev, curr]) => {
        dispatch({
          type: actionTypes.BLENDED_RATE_GET_SUCCESS,
          payload: {
            curr: curr[facilityId][ASSET_METRIC_LABEL],
            prev: prev[facilityId][ASSET_METRIC_LABEL]
          }
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.BLENDED_RATE_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

export { getBlendedRateData };
