import { contxtSdk } from '@ndustrial/nsight-common/utils';

import { getTheme } from '../../services/themeService';
import actionTypes from './actionTypes';

function loadUserInfo() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_USER_INFO_START
    });

    return Promise.all([contxtSdk.auth.getProfile(), getTheme()])
      .then(([profile, theme]) => {
        dispatch({
          type: actionTypes.LOAD_USER_INFO_SUCCESS,
          payload: {
            profile,
            theme
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_USER_INFO_FAILURE,
          error: true,
          payload: err
        });

        contxtSdk.auth.logOut();
      });
  };
}

function logOutUser() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOG_OUT_USER_START
    });

    try {
      contxtSdk.auth.logOut();
    } catch (err) {
      dispatch({
        type: actionTypes.LOG_OUT_USER_FAILURE,
        error: true,
        payload: err
      });

      throw err;
    }
  };
}

export { loadUserInfo, logOutUser };
