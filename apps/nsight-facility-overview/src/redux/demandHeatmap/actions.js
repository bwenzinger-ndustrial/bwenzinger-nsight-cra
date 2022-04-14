import { DateTime } from 'luxon';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function getHeatmapData(facility, units) {
  const currentDate = DateTime.fromJSDate(new Date(), {
    zone: facility.timezone
  });

  return (dispatch) => {
    dispatch({
      type: actionTypes.HEATMAP_GET_CURRENT_START
    });

    return contxtSdk.facilityEms
      .getDemandData(
        facility.id,
        currentDate.minus({ days: 30 }).toSeconds(),
        currentDate.toSeconds(),
        units
      )
      .then((data) => {
        dispatch({
          type: actionTypes.HEATMAP_GET_CURRENT_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.HEATMAP_GET_CURRENT_FAILURE,
          error: true,
          meta: { name: 'heatmapDemand' },
          payload: error
        });
      });
  };
}

export { getHeatmapData };
