import { round } from 'lodash';
import moment from 'moment';

function getDemandMax(
  actualDemand,
  demandForecast,
  historicPeakSeries,
  currentPeakSeries
) {
  const actualMax = Math.max(...actualDemand.map((item) => item.value));
  const forecastMax = Math.max(...demandForecast.map((item) => item.value));

  const historicPeakMax = historicPeakSeries.reduce(function(max, arr) {
    return Math.max(max, arr[0].y);
  }, -Infinity);

  const currentPeakMax = currentPeakSeries.reduce(function(max, arr) {
    return Math.max(max, arr[0].y);
  }, -Infinity);

  const demandMax = Math.max(
    actualMax,
    forecastMax,
    historicPeakMax,
    currentPeakMax
  );

  return demandMax;
}

function getDemandMin(actualDemand, demandForecast) {
  const actualMin = Math.min(...actualDemand.map((item) => item.value));
  const forecastMin = Math.min(...demandForecast.map((item) => item.value));
  const demandMin = Math.min(actualMin, forecastMin);

  return demandMin;
}

function calculateDegreeDay(minMax, baseTemp) {
  const meanTemp = (minMax[1] + minMax[0]) / 2;
  if (meanTemp > baseTemp) {
    return { type: 'Cooling', value: round(meanTemp - baseTemp, 1) };
  } else {
    return { type: 'Heating', value: round(baseTemp - meanTemp, 1) };
  }
}

function getCurrentPeakPlotline(currentPeak) {
  if (!currentPeak.length) {
    return {
      value: 0,
      dashStyle: 'shortdash',
      width: 2,
      zIndex: 4,
      label: {
        text: 'Month-to-date Peak'
      }
    };
  }

  return {
    value: currentPeak[0].value,
    dashStyle: 'shortdash',
    width: 2,
    zIndex: 4,
    label: {
      text: 'Month-to-date Peak (' + currentPeak[0].value + ' MW)'
    }
  };
}

function getCPPlotlines(currentPeak) {
  const plotlines = [];
  plotlines.push(currentPeak);

  return plotlines;
}

function getLargestSeries(data) {
  return Object.keys(data)
    .reduce(function(acc, k) {
      if (k !== 'forecastedTemp') {
        return [...acc, { key: k, value: data[k] }];
      }

      return acc;
    }, [])
    .sort(function(a, b) {
      return b.value.length > a.value.length ? 1 : -1;
    })[0];
}

function buildPeakSeries(data, dataPeaks, seriesColor, seriesName, cpDates) {
  const largestSeries = getLargestSeries(data);
  const peaks = [];

  dataPeaks.forEach((peak) => {
    const peakData = [];
    const seriesOptions = {
      seriesColor: seriesColor,
      seriesName: seriesName,
      markerSymbol: 'circle'
    };

    largestSeries.value.forEach((val) => {
      const month = moment(parseInt(peak.time) * 1000).format('M');
      peakData.push({
        value: peak.value,
        time: val.time,
        peakDate: peak.time,
        peakMonth: month
      });
    });

    peaks.push(
      normalizeChartData(peakData, seriesOptions, undefined, false, true, true)
    );
  });

  return peaks;
}

function normalizeChartData(
  dataArray,
  seriesOptions,
  multiplier,
  toMillis,
  showPeakDate,
  showPeakMonth,
  locationId
) {
  return dataArray.map((data) => {
    const tzDateTime = data.time;
    const tzDateTimeFromMillis = parseInt(data.time) * 1000;

    const getDisplayValue = (multiplier, value) => {
      if (value && multiplier) {
        return parseFloat(value) * multiplier;
      } else if (value) {
        return parseFloat(value);
      } else {
        return null;
      }
    };

    const date = toMillis
      ? moment(tzDateTime).valueOf()
      : moment(tzDateTimeFromMillis).valueOf();

    const value = getDisplayValue(multiplier, data.value);

    return {
      x: parseInt(date),
      y: value,
      seriesColor: seriesOptions.seriesColor,
      color: seriesOptions.seriesColor,
      marker: {
        symbol: seriesOptions.markerSymbol || 'circle',
        fillColor: seriesOptions.seriesColor,
        lineColor: seriesOptions.seriesColor,
        lineWidth: 1,
        radius: 2.5,
        states: { hover: { radius: 5 } }
      },
      locationId: locationId || null,
      peakDate:
        showPeakDate && data.peakDate ? parseInt(data.peakDate) * 1000 : null,
      peakMonth: showPeakMonth ? data.peakMonth : null,
      seriesId: seriesOptions.seriesName || null
    };
  });
}

function getTempMin(actualTemp, forecastedTemp) {
  const actualMin = Math.min(...actualTemp.map((item) => item.value));
  const forecastedMin = Math.min(...forecastedTemp.map((item) => item.value));
  const tempMin = Math.min(actualMin, forecastedMin);

  return tempMin;
}

function getTempMax(actualTemp, forecastedTemp) {
  const actualMax = Math.max(...actualTemp.map((item) => item.value));
  const forecastedMax = Math.max(...forecastedTemp.map((item) => item.value));
  const tempMax = Math.max(actualMax, forecastedMax);

  return tempMax;
}

function getTempColor(temperature) {
  // TODO: pull these colors out
  if (temperature > 65) {
    return { color: '#ae384d' };
  } else if (temperature < 65) {
    return { color: '#5FA0DD' };
  } else {
    return { color: '#333333' };
  }
}

export default {
  buildPeakSeries,
  calculateDegreeDay,
  getCPPlotlines,
  getCurrentPeakPlotline,
  getDemandMax,
  getDemandMin,
  getLargestSeries,
  getTempColor,
  getTempMin,
  getTempMax,
  normalizeChartData
};
