import _ from 'lodash';
import { createSelector } from 'reselect';

import getDataInDateRange from '../../helpers/getDataInDateRange';
import getCPDates from './getCPDates';

const getCPHourlyWeather = (state) => state.coincidentPeak.hourlyWeather || [];

const getHourlyWeather = createSelector(
  getCPDates,
  getCPHourlyWeather,
  (cpDates, hourlyWeather) => {
    const sortedHourlyWeather = _.sortBy(hourlyWeather, ['time']);
    const sortedFilteredHourlyWeather = getDataInDateRange(
      sortedHourlyWeather,
      cpDates,
      true
    );

    const hourlyWeatherSeries = hourlyWeather.length
      ? _.map(sortedFilteredHourlyWeather, (val) => {
          return {
            time: val.data.time,
            value: val.data.temperature,
            location: val.location
          };
        })
      : [];

    return hourlyWeatherSeries;
  }
);

export default getHourlyWeather;
