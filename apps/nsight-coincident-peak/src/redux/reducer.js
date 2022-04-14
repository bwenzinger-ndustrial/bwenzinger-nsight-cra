import _ from 'lodash';

import actionTypes from './actionTypes';

const INITIAL_STATE = {
  actualDemand: [],
  error: '',
  hasLoadingError: false,
  hourlyWeather: [],
  loadingDemand: false,
  loadingForecast: false,
  loadingLocations: false,
  loadingWeather: false,
  locations: [],
  runOrder: [],
  runs: {},
  selectedLocation: null,
  step: -1
};

function coincidentPeakReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.CP_DEMAND_GET_FAILURE:
      return {
        ...state,
        error: payload,
        loadingDemand: false
      };
    case actionTypes.CP_DEMAND_GET_SUCCESS:
      return {
        ...state,
        actualDemand: payload,
        loadingDemand: false
      };
    case actionTypes.CP_DEMAND_GET_START:
      return {
        ...state,
        actualDemand: INITIAL_STATE.actualDemand,
        loadingDemand: true
      };
    case actionTypes.CP_HOURLY_WEATHER_GET_START:
      return {
        ...state,
        hourlyWeather: INITIAL_STATE.hourlyWeather,
        loadingWeather: true
      };
    case actionTypes.CP_HOURLY_WEATHER_GET_SUCCESS:
      return {
        ...state,
        hourlyWeather: payload,
        loadingWeather: false
      };
    case actionTypes.CP_HOURLY_WEATHER_GET_FAILURE:
      return {
        ...state,
        error: payload,
        loadingWeather: false
      };
    case actionTypes.CP_FORECAST_GET_FAILURE:
      return {
        ...state,
        error: payload,
        loadingForecast: false,
        hasLoadingError: true
      };

    case actionTypes.CP_FORECAST_GET_START:
      return {
        ...state,
        error: INITIAL_STATE.error,
        hasLoadingError: INITIAL_STATE.hasLoadingError,
        loadingForecast: true,
        runOrder: INITIAL_STATE.runOrder,
        runs: INITIAL_STATE.runs,
        step: INITIAL_STATE.step
      };

    case actionTypes.CP_FORECAST_GET_SUCCESS:
      const runs = {};
      const runOrder = [];
      _.forEach(payload, (run) => {
        runs[run.runId] = run;
        runOrder.push(run.runId);
      });
      return {
        ...state,
        loadingForecast: false,
        runOrder,
        runs,
        step: runOrder.length > 0 ? runOrder.length - 1 : -1
      };
    case actionTypes.CP_LOCATIONS_GET_START:
      return {
        ...state,
        locations: INITIAL_STATE.locations,
        loadingLocations: true
      };
    case actionTypes.CP_LOCATIONS_GET_SUCCESS:
      return {
        ...state,
        locations: payload,
        loadingLocations: false
      };
    case actionTypes.CP_LOCATIONS_GET_FAILURE:
      return {
        ...state,
        error: payload,
        loadingLocations: false
      };
    default:
      return state;
  }
}

export { INITIAL_STATE };
export default coincidentPeakReducer;
