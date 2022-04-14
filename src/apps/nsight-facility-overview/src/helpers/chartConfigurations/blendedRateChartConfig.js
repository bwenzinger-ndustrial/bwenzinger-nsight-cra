import Highcharts from 'highcharts';
import _ from 'lodash';

import { TICK_INTERVALS } from '@ndustrial/nsight-common/charts/constants';

import chartUtils from '../blendedRateChartUtils';

function getBlendedRateChartConfig({ max, series }) {
  return {
    chart: {
      spacingTop: 5
    },
    title: {
      text: ''
    },
    legend: {
      align: 'center',
      itemMarginBottom: 4,
      borderColor: null,
      borderWidth: 0,
      x: 0,
      y: 0,
      layout: 'horizontal',
      verticalAlign: 'bottom',
      useHTML: true,
      floating: false,
      labelFormatter: function() {
        const avg =
          this.index === 0
            ? this.chart.series[0].userOptions.avg
            : this.chart.series[1].userOptions.avg;
        return `<div style='text-align: center;'>
                  <div style='color: ${this.color};'>${this.name}</div>
                  <div style='margin-top: 4px;'>Average Rate: $${avg}</div>
                </div>`;
      }
    },
    series,
    xAxis: {
      type: 'datetime',
      minPadding: 0.05,
      maxPadding: 0.05,
      crosshair: {
        color: 'gray',
        width: 2
      },
      labels: {
        align: 'center',
        y: 20,
        style: { fontWeight: 'bold' }
      },
      dateTimeLabelFormats: {
        month: '%b'
      },
      tickInterval: TICK_INTERVALS.MONTH,
      minTickInterval: TICK_INTERVALS.MONTH, // TODO, is this required?
      events: {
        setExtremes: function(e) {
          Highcharts.syncExtremes(e);
        }
      }
    },
    yAxis: {
      title: {
        text: null
      },
      gridLineWidth: 1,
      min: 0,
      max,
      opposite: false,
      lineWidth: 1,
      lineColor: '#d8d8d8',
      labels: {
        formatter: function() {
          let label = this.axis.defaultLabelFormatter.call(this);
          label = `<span style='font-weight: bold'>$${_.round(
            this.value,
            2
          ).toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
          })}</span>`;
          return label;
        }
      }
    },
    tooltip: {
      formatter: function() {
        const variance = chartUtils.getBlendedRateVariance(this.points);
        return chartUtils.getBlendedRateTooltips(this.points, variance);
      },
      split: false,
      shared: true,
      shadow: false,
      useHTML: true,
      borderWidth: 0,
      style: {
        zIndex: 10
      }
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: true
          },
          select: {
            enabled: true
          }
        },
        fillOpacity: 0.6,
        connectNulls: true,
        marker: {
          enabled: false
        }
      }
    },
    credits: {
      enabled: false
    }
  };
}

export default getBlendedRateChartConfig;
