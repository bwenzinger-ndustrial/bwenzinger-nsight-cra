import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function getFacilityMetadata(facilityId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FACILITY_METADATA_GET_START
    });

    return contxtSdk.facilityEms
      .getFacilityMetadata(facilityId)
      .then((metadata) => {
        dispatch({
          type: actionTypes.FACILITY_METADATA_GET_SUCCESS,
          payload: metadata
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FACILITY_METADATA_GET_FAILURE,
          error: true,
          meta: { name: 'details' },
          payload: err.message
        });
      });
  };
}

export { getFacilityMetadata };
