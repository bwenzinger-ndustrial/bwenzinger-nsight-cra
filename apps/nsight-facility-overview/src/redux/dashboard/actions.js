import facilityKpiConfig from '../../../test/data/facilityKpiConfig.json';
import actionTypes from './actionTypes';

const dashboardGet = (_organizationId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DASHBOARD_GET_START
    });

    return Promise.resolve(facilityKpiConfig)
      .then((result) => {
        dispatch({
          type: actionTypes.DASHBOARD_GET_SUCCESS,
          payload: result
        });
      })
      .catch((err) => {
        const error = err.isAxiosError
          ? err.response.data.message
          : err.message;
        dispatch({
          type: actionTypes.DASHBOARD_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

export { dashboardGet };
