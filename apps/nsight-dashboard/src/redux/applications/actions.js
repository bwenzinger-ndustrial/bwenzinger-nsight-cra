import { replace } from 'connected-react-router';

import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

function loadGroupings(applicationId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.LOAD_APPLICATION_GROUPINGS_START
    });

    return contxtSdk.coordinator.applications
      .getGroupings(applicationId)
      .then((applicationGroupings) => {
        dispatch({
          type: actionTypes.LOAD_APPLICATION_GROUPINGS_SUCCESS,
          payload: applicationGroupings
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.LOAD_APPLICATION_GROUPINGS_FAILURE,
          error: true,
          payload: err
        });

        throw err;
      });
  };
}

function resetDefaultApplicationRoute() {
  return {
    type: actionTypes.RESET_DEFAULT_APPLICATION_ROUTE
  };
}

function resetGroupings() {
  return {
    type: actionTypes.RESET_APPLICATION_GROUPINGS
  };
}

function setDefaultApplicationRoute(defaultApplicationRoute) {
  return function(dispatch, getState) {
    dispatch({
      type: actionTypes.SET_DEFAULT_APPLICATION_ROUTE,
      payload: defaultApplicationRoute
    });

    const {
      router: {
        location: { pathname, search }
      }
    } = getState();

    if (pathname === '/') {
      dispatch(
        replace({
          pathname: `/${defaultApplicationRoute}`,
          search
        })
      );
    }
  };
}

export {
  loadGroupings,
  resetDefaultApplicationRoute,
  resetGroupings,
  setDefaultApplicationRoute
};
