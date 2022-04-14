import { createSelector } from 'reselect';

const getWeatherData = (state) => state.weather;

const getWeather = createSelector(
  getWeatherData,
  (weather = {}) => {
    return {
      ...weather
    };
  }
);

export default getWeather;
