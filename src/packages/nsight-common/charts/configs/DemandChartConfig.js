import Highcharts from 'highcharts/highstock';
import { merge, round } from 'lodash';
import { DateTime } from 'luxon';
import moment from 'moment';

import commonChartUtils from '../commonChartUtils';
import { stickyTooltip } from '../demand/demandChartUtils';
import { BaseChartConfig } from './';

export default class DemandChartConfig extends BaseChartConfig {
  constructor(props) {
    super(props);

    const { timezone = 'local', currYearMax, lastYearMax } = props;

    this.useIndexForXAxisValues = false;
    this.useArrayForDataValues = true;
    this.timezone = timezone;
    this.currYearMax = currYearMax;
    this.lastYearMax = lastYearMax;
  }

  createChart() {
    const baseChart = super.createChart();
    const chart = {
      events: {
        render: function() {
          stickyTooltip(this);
        }
      }
    };

    return merge(baseChart, chart);
  }

  createTooltip() {
    const {
      timezone,
      metric: { unit }
    } = this;

    return {
      formatter: function() {
        const variance = commonChartUtils.getVariance(this.points);
        const date = `<b>${DateTime.fromMillis(this.x, {
          zone: timezone
        }).toFormat('EEE MMM dd, hh:mm a ZZZZ')}</b>`;

        return date
          .concat(
            this.points
              .reverse()
              .map(function(point) {
                const roundedValue = round(point.y, 3).toLocaleString();
                return `<div style='color: ${point.color};'>${point.series.name}: ${roundedValue} ${unit}</div>`;
              })
              .join('')
          )
          .concat(`<div>${variance}</div>`);
      }
    };
  }

  createPlotOptions() {
    const basePlotOptions = super.createPlotOptions();

    const plotOptions = {
      series: {
        marker: {
          enabled: false
        },
        events: {
          mouseOut: function(event) {
            setTimeout(() => {
              if (event.target.chart && event.target.chart.tooltip.isHidden) {
                stickyTooltip(event.target.chart);
              }
            }, 1000);
          }
        },
        dataGrouping: {
          approximation: 'high',
          enabled: true
        }
      }
    };

    return merge(basePlotOptions, plotOptions);
  }

  createXAxis() {
    const baseXAxis = super.createXAxis();

    const { tickInterval } = this;
    const xAxis = {
      tickPositioner: function(min, max) {
        const ticks = [];

        while (min < max) {
          ticks.push(min);
          min += tickInterval;
        }
        return ticks;
      }
    };

    return merge(baseXAxis, xAxis);
  }

  createXAxisLabels() {
    return {
      formatter: function() {
        const isFirst = this.isFirst
          ? `${Highcharts.dateFormat('%b', this.value)} `
          : '\n';

        return `<span style='color: #393D3F;'>${isFirst}</span> <br /> <span><strong> ${moment(
          this.value
        )
          .utc()
          .format('DD')}</strong></span>`;
      },
      x: 2,
      y: 12
    };
  }
}
