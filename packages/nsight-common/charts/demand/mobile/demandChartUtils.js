import Highcharts from 'highcharts/highstock';
import { DateTime } from 'luxon';

import commonChartUtils from '../../commonChartUtils';
import { MOBILE_PLOTLINE_LABEL_OFFSET, TICK_INTERVALS } from '../../constants';
import { createPlotLine } from '../../plotLineUtils';
import * as chartUtils from '../demandChartUtils';

const getResponsiveConfigAreaspline = (configObj, timezone) => {
  const currentDate = DateTime.fromJSDate(new Date(), { zone: timezone });
  const { currYearMax, units } = configObj;
  const chartLabelCurrObj = {
    month: currentDate.monthLong,
    year: currentDate.year,
    value: currYearMax.value,
    unit: currYearMax.unit
  };

  return {
    condition: {
      maxWidth: 500
    },
    chartOptions: {
      chart: {
        spacingTop: 50,
        spacingBottom: 10
      },
      legend: {
        align: 'center',
        layout: 'horizontal',
        floating: false,
        verticalAlign: 'bottom',
        x: 3,
        zIndex: 10
      },
      xAxis: {
        tickInterval: TICK_INTERVALS.MONTH,
        tickColor: '#EAEAEA',
        labels: {
          align: 'left',
          formatter: function() {
            const isFirst = this.isFirst
              ? `${Highcharts.dateFormat('%b', this.value)} `
              : '\n';

            return `<span style='color: #393D3F;'>${isFirst}</span> <br /> <span><strong> ${DateTime.fromMillis(
              this.value,
              {
                zone: timezone
              }
            ).toFormat('dd')}</strong></span>`;
          },
          rotation: 0,
          x: 3,
          y: 12
        }
      },

      tooltip: {
        formatter: function() {
          const variance = commonChartUtils.getVariance(this.points);
          return [
            '<span style="font-size: 0.65rem; font-weight: 700">' +
              DateTime.fromMillis(this.x, {
                zone: timezone
              }).toFormat('EEE MMM dd, hh:mm a ZZZZ') +
              '</span>'
          ]
            .concat(
              this.points.reverse().map(function(point) {
                return `<div style='font-size: 0.65rem; color: ${point.color};'>${point.series.name}: ${point.y} ${units}</div>`;
              })
            )
            .concat(`<div style='font-size: 0.65rem;'>${variance}</div>`);
        }
      },
      yAxis: {
        labels: {
          formatter: function() {
            const formattedNumber = Highcharts.numberFormat(
              this.value,
              0,
              '',
              ','
            );
            return this.isFirst
              ? `${formattedNumber} ${units}`
              : `${formattedNumber}`;
          }
        },
        plotLines: [
          createPlotLine({
            value: configObj.currYearMax.value,
            color: '#e1697d',
            labelOffset: {
              x: -10,
              y: chartUtils.getYOffset(
                MOBILE_PLOTLINE_LABEL_OFFSET,
                configObj.currYearMax.value,
                configObj.lastYearMax.value,
                true
              ).curr,
              text: chartUtils.getDemandChartPeakLabel(chartLabelCurrObj, true)
            }
          }),
          createPlotLine({
            value: configObj.lastYearMax.value,
            color: 'green',
            labelOffset: {
              x: -10,
              y: chartUtils.getYOffset(
                MOBILE_PLOTLINE_LABEL_OFFSET,
                configObj.currYearMax.value,
                configObj.lastYearMax.value,
                true
              ).prev
            },
            text: chartUtils.getDemandChartPeakLabel(chartLabelCurrObj, true)
          })
        ]
      }
    }
  };
};

export { getResponsiveConfigAreaspline };
