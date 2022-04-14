import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const getCoincidentPeakActualDemand = (startTime, endTime, region) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CP_DEMAND_GET_START
    });
    return contxtSdk.orgCoincidentPeak
      .getDemandSeries(startTime, endTime, region)
      .then((data) => {
        dispatch({
          type: actionTypes.CP_DEMAND_GET_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const hasAxiosError =
          err.isAxiosError &&
          err.response &&
          err.response.data &&
          err.response.data.message;
        const error = hasAxiosError ? err.response.data.message : err.message;

        dispatch({
          type: actionTypes.CP_DEMAND_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

const getCoincidentPeakDemandForecast = (startTime, endTime, region) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CP_FORECAST_GET_START
    });
    return contxtSdk.orgCoincidentPeak
      .getForecastRuns(startTime, endTime, region)
      .then((data) => {
        dispatch({
          type: actionTypes.CP_FORECAST_GET_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const hasAxiosError =
          err.isAxiosError &&
          err.response &&
          err.response.data &&
          err.response.data.message;
        const error = hasAxiosError ? err.response.data.message : err.message;

        dispatch({
          type: actionTypes.CP_FORECAST_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

const getCoincidentPeakHourlyWeather = (startTime, endTime, locationId) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CP_HOURLY_WEATHER_GET_START
    });
    return contxtSdk.orgCoincidentPeak
      .getHourlyWeather(startTime, endTime, locationId)
      .then((data) => {
        dispatch({
          type: actionTypes.CP_HOURLY_WEATHER_GET_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const hasAxiosError =
          err.isAxiosError &&
          err.response &&
          err.response.data &&
          err.response.data.message;
        const error = hasAxiosError ? err.response.data.message : err.message;

        dispatch({
          type: actionTypes.CP_HOURLY_WEATHER_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

const getRegionLocationData = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CP_LOCATIONS_GET_START
    });
    return contxtSdk.orgCoincidentPeak
      .getRegionLocations()
      .then((data) => {
        dispatch({
          type: actionTypes.CP_LOCATIONS_GET_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        const hasAxiosError =
          err.isAxiosError &&
          err.response &&
          err.response.data &&
          err.response.data.message;
        const error = hasAxiosError ? err.response.data.message : err.message;

        dispatch({
          type: actionTypes.CP_LOCATIONS_GET_FAILURE,
          error: true,
          payload: error
        });
      });
  };
};

export {
  getCoincidentPeakActualDemand,
  getCoincidentPeakDemandForecast,
  getCoincidentPeakHourlyWeather,
  getRegionLocationData
};
