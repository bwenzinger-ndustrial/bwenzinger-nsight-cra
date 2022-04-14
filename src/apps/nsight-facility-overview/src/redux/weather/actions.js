import weatherUtils from '@ndustrial/nsight-common/charts/weather/weatherUtils';
import { contxtSdk } from '@ndustrial/nsight-common/utils';

import actionTypes from './actionTypes';

const getPrimaryWeatherData = (facilityId, startDate, endDate) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_WEATHER_PRIMARY_START
    });

    return contxtSdk.facilityDashboardIot
      .getWeatherData(facilityId, startDate, endDate)
      .then((data) => {
        const averagePrimaryHighTemp = weatherUtils.getWeatherAverage(
          data.records,
          'temperatureHigh'
        );
        const averagePrimaryLowTemp = weatherUtils.getWeatherAverage(
          data.records,
          'temperatureLow'
        );

        dispatch({
          type: actionTypes.GET_WEATHER_PRIMARY_SUCCESS,
          payload: {
            data: data,
            details: {
              avgHigh: averagePrimaryHighTemp,
              avgLow: averagePrimaryLowTemp
            }
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_WEATHER_PRIMARY_FAILURE,
          error: true,
          payload: err.message
        });

        throw err;
      });
  };
};

const getSecondaryWeatherData = (facilityId, startDate, endDate) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GET_WEATHER_SECONDARY_START
    });

    return contxtSdk.facilityDashboardIot
      .getWeatherData(facilityId, startDate, endDate)
      .then((data) => {
        const averageComparisonHighTemp = weatherUtils.getWeatherAverage(
          data.records,
          'temperatureHigh'
        );
        const averageComparisonLowTemp = weatherUtils.getWeatherAverage(
          data.records,
          'temperatureLow'
        );

        dispatch({
          type: actionTypes.GET_WEATHER_SECONDARY_SUCCESS,
          payload: {
            data: data,
            details: {
              avgHigh: averageComparisonHighTemp,
              avgLow: averageComparisonLowTemp
            }
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_WEATHER_SECONDARY_FAILURE,
          error: true,
          payload: err.message
        });

        throw err;
      });
  };
};

export { getPrimaryWeatherData, getSecondaryWeatherData };
