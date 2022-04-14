import moment from 'moment';

import { SeriesCreator } from '@ndustrial/nsight-common/charts/series';

import { CHART_DISPLAY_INTERVALS, DATE_FORMATS } from '../constants';
import { TEMPERATURE_EXTREME_TYPES } from './weatherConstants';

function meanMonthlyWeatherData(data) {
  const groupedWeatherData = data.reduce(function(acc, obj) {
    const key = moment(obj.time)
      .utc()
      .format('MM/YYYY');
    const time = moment(obj.time)
      .utc()
      .startOf('month')
      .toISOString();

    const totalHigh =
      ((acc[key] && acc[key].temperatureHigh) || 0) + +obj.data.temperatureHigh;
    const totalLow =
      ((acc[key] && acc[key].temperatureLow) || 0) + +obj.data.temperatureLow;
    const recordCount = ((acc[key] && acc[key].count) || 0) + 1;
    const meanHigh = totalHigh / recordCount;
    const meanLow = totalLow / recordCount;

    acc[key] = {
      time: time,
      data: {
        totalHigh,
        totalLow,
        count: recordCount,
        temperatureHigh: meanHigh,
        temperatureLow: meanLow
      }
    };
    return acc;
  }, {});

  const monthlyWeatherData = [];

  Object.keys(groupedWeatherData).forEach((key) => {
    monthlyWeatherData.push(groupedWeatherData[key]);
  });

  return monthlyWeatherData;
}

function createWeatherPoint(series, type, usePointAverage) {
  const _series = usePointAverage ? meanMonthlyWeatherData(series) : series;

  return _series.map((val) => ({
    value: parseInt(val.data[type]),
    effectiveEndDate: val.time
  }));
}

const getVisibility = (initialWeatherView, seriesType) => {
  return initialWeatherView === seriesType;
};

const getWeatherConfig = (
  primaryWeather,
  secondaryWeather,
  initialWeatherView,
  theme,
  useMonthlyAverage
) => {
  const weatherPoints = {
    high: {
      primary: {
        data: createWeatherPoint(
          (primaryWeather && primaryWeather.records) || [],
          'temperatureHigh',
          useMonthlyAverage
        )
      },
      secondary: {
        data: createWeatherPoint(
          (secondaryWeather && secondaryWeather.records) || [],
          'temperatureHigh',
          useMonthlyAverage
        )
      }
    },
    low: {
      primary: {
        data: createWeatherPoint(
          (primaryWeather && primaryWeather.records) || [],
          'temperatureLow',
          useMonthlyAverage
        )
      },
      secondary: {
        data: createWeatherPoint(
          (secondaryWeather && secondaryWeather.records) || [],
          'temperatureLow',
          useMonthlyAverage
        )
      }
    }
  };

  const displayInterval = useMonthlyAverage
    ? CHART_DISPLAY_INTERVALS.MONTH
    : CHART_DISPLAY_INTERVALS.DAY;
  const dataDecorators = [
    SeriesCreator.withEstimatedMarker(),
    SeriesCreator.withFormattedDateFiled({
      format: DATE_FORMATS.ddd_MMM_D_YYYY
    })
  ];
  return [
    new SeriesCreator({
      data: weatherPoints.high.primary.data,
      color: theme.colors.primary,
      unit: '°',
      name: 'Daily High',
      displayInterval,
      useIndexForXAxisValue: true,
      visible: getVisibility(
        initialWeatherView,
        TEMPERATURE_EXTREME_TYPES.HIGH
      ),
      dataDecorators,
      zIndex: 10,
      id: TEMPERATURE_EXTREME_TYPES.HIGH
    }).getConfig(),
    new SeriesCreator({
      data: weatherPoints.high.secondary.data,
      color: theme.colors.secondary,
      unit: '°',
      name: 'Daily High',
      displayInterval,
      useIndexForXAxisValue: true,
      visible: getVisibility(
        initialWeatherView,
        TEMPERATURE_EXTREME_TYPES.HIGH
      ),
      dataDecorators,
      linkedTo: TEMPERATURE_EXTREME_TYPES.HIGH
    }).getConfig(),
    new SeriesCreator({
      data: weatherPoints.low.primary.data,
      color: theme.colors.primary,
      unit: '°',
      name: 'Daily Low',
      displayInterval,
      useIndexForXAxisValue: true,
      visible: getVisibility(initialWeatherView, TEMPERATURE_EXTREME_TYPES.LOW),
      dataDecorators,
      zIndex: 10,
      id: TEMPERATURE_EXTREME_TYPES.LOW
    }).getConfig(),
    new SeriesCreator({
      data: weatherPoints.low.secondary.data,
      color: theme.colors.secondary,
      unit: '°',
      name: 'Daily Low',
      displayInterval,
      useIndexForXAxisValue: true,
      visible: getVisibility(initialWeatherView, TEMPERATURE_EXTREME_TYPES.LOW),
      dataDecorators,
      linkedTo: TEMPERATURE_EXTREME_TYPES.LOW
    }).getConfig()
  ];
};

export default getWeatherConfig;
