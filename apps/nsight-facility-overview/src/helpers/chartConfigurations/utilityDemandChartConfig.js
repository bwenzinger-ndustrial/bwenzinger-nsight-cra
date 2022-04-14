import Highcharts from 'highcharts';
import moment from 'moment';

import { TICK_INTERVALS } from '@ndustrial/nsight-common/charts/constants';

function getSeriesName(seriesData) {
  const startDate = moment(seriesData[0].x).format('MMM YYYY');
  const endDate = moment(seriesData[seriesData.length - 1].x).format(
    'MMM YYYY'
  );

  return `${startDate} - ${endDate}`;
}

function getUtilityDemandChartConfig(
  primarySeriesData,
  comparisonSeriesData,
  utilityDemandUnit,
  theme
) {
  const series = [];
  const plotLines = [];

  let primaryMax = 0;
  let comparisonMax = 0;

  const helperText = utilityDemandUnit === 'kwh' ? 'Peak Usage' : 'Peak Demand';

  if (comparisonSeriesData.length) {
    const adjustedComparisonData = comparisonSeriesData.map((point) => {
      comparisonMax = Math.max(comparisonMax, point.y);

      return {
        x:
          moment(point.x)
            .add(1, 'year')
            .unix() * 1000,
        y: point.y,
        originalYear: moment(point.x).year()
      };
    });

    const name = getSeriesName(comparisonSeriesData);

    series.push({
      name,
      type: 'column',
      color: theme.colors.secondary,
      data: adjustedComparisonData,
      total: comparisonSeriesData.reduce((memo, point) => {
        memo += point.y;
        return memo;
      }, 0)
    });

    plotLines.push({
      value: comparisonMax,
      color: theme.colors.secondary,
      label: {
        useHTML: true,
        align: 'right',
        formatter: function() {
          return `<div style="color: ${theme.colors.secondary}; font-weight: 700; margin-right: 10px;">${name} ${helperText} (${comparisonMax} ${utilityDemandUnit})</div>`;
        }
      }
    });
  }

  if (primarySeriesData.length) {
    primaryMax = primarySeriesData.reduce(
      (memo, point) => Math.max(memo, point.y),
      0
    );
    const name = getSeriesName(primarySeriesData);

    series.push({
      name,
      type: 'column',
      color: theme.colors.primary,
      data: primarySeriesData,
      total: primarySeriesData.reduce((memo, point) => {
        memo += point.y;
        return memo;
      }, 0)
    });

    plotLines.push({
      value: primaryMax,
      color: theme.colors.primary,
      label: {
        align: 'right',
        y: 16,
        useHTML: true,
        formatter: function() {
          return `<div style="color: ${theme.colors.primary}; font-weight: 700; margin-right: 10px;">${name} ${helperText} (${primaryMax} ${utilityDemandUnit})</div>`;
        }
      }
    });
  }

  return {
    series,
    tooltip: {
      borderWidth: 0,
      useHTML: true,
      shadow: false,
      shared: true,
      split: false,
      formatter: function() {
        return ['<b>' + moment(this.x).format('MMM') + '</b>'].concat(
          this.points.reverse().map(function(point) {
            return `<div style='color: ${
              point.color
            };'>${point.point.originalYear || moment(point.point.x).format('YYYY')}: ${point.y.toFixed(2)} ${utilityDemandUnit}</div>`;
          })
        );
      }
    },
    legend: {
      borderWidth: 0,
      reversed: true,
      labelFormatter: function() {
        return `<span style='color: ${this.color};'>${this.name}:</span>
        <span style='padding-left: 8px;'>${this.userOptions.total.toFixed(
          2
        )} ${utilityDemandUnit}</span>`;
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.25
      }
    },
    xAxis: {
      alternateGridColor: '',
      startOnTick: true,
      type: 'datetime',
      tickInterval: TICK_INTERVALS.MONTH, // 1 month
      labels: {
        formatter: function() {
          return `${Highcharts.dateFormat('%b', this.value)}`;
        },
        allowOverlap: true
      },
      events: {
        setExtremes: function(e) {
          if (Highcharts.syncExtremes) {
            Highcharts.syncExtremes(e);
          }
        }
      }
    },
    yAxis: {
      max: Math.max(primaryMax, comparisonMax) * 1.25, // Add buffer to make room for legend
      plotLines
    }
  };
}

export default getUtilityDemandChartConfig;
