import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function getContractFile(fileId, contractId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_CONTRACT_FILE_START,
      meta: { contractId }
    });

    return contxtSdk.files
      .download(fileId)
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_CONTRACT_FILE_SUCCESS,
          payload: response.downloadInfo.inlineUrl,
          meta: { contractId }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_CONTRACT_FILE_FAILURE,
          error: true,
          payload: err,
          meta: { contractId }
        });

        throw err;
      });
  };
}

function loadContractById(facilityId, contractId) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_UTILITY_CONTRACT_START });

    if (!facilityId || !contractId) {
      return dispatch({
        type: actionTypes.LOAD_UTILITY_CONTRACT_FAILURE,
        error: true,
        payload:
          'Facility ID and Contract ID required to load a utility contract'
      });
    }

    return contxtSdk.ratesEms
      .getContractById(facilityId, contractId)
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_UTILITY_CONTRACT_SUCCESS,
          payload: response
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_UTILITY_CONTRACT_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

export { getContractFile, loadContractById };
