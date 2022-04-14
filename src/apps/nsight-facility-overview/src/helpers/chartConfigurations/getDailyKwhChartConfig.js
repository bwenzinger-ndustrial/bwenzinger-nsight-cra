import { round } from 'lodash';
import { DateTime } from 'luxon';
import moment from 'moment';

import { TICK_INTERVALS } from '@ndustrial/nsight-common/charts/constants';

function getDailyKwhChartConfig({ series, timezone }) {
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
      reversed: true,
      floating: false
    },
    series,
    xAxis: {
      tickInterval: TICK_INTERVALS.DAY,
      startOnTick: false,
      crosshair: {
        color: 'gray',
        width: 2
      },
      labels: {
        align: 'center',
        y: 20,
        style: { fontWeight: 'bold' },
        formatter: function() {
          if (series[1].data.length === 0) {
            return '';
          }

          return `<span><strong>${moment(this.value)
            .startOf('day')
            .format('DD')}</strong></span>`;
        }
      }
    },
    yAxis: {
      title: {
        text: null
      },
      gridLineWidth: 1,
      min: 0,
      opposite: false,
      lineWidth: 1,
      lineColor: '#d8d8d8',
      labels: {
        formatter: function() {
          let label = this.axis.defaultLabelFormatter.call(this);
          label = `<span style='font-weight: bold'>${this.value.toLocaleString(
            'en-US'
          )} kWh</span>`;
          return label;
        }
      }
    },
    tooltip: {
      split: false,
      shared: true,
      shadow: false,
      useHTML: true,
      borderWidth: 0,
      style: {
        zIndex: 10
      },
      formatter: function() {
        return [
          `<strong>
            ${DateTime.fromMillis(this.x, {
              zone: timezone
            }).toFormat('MMMM dd')}
            </strong>`
        ].concat(
          this.points.reverse().map(function(point) {
            const roundedValue = round(point.y, 3).toLocaleString();
            return `<div style='color: ${point.color};'>${point.series.name}: ${roundedValue} kWh</div>`;
          })
        );
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

export default getDailyKwhChartConfig;
