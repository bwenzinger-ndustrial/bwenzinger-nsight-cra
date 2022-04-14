import Highcharts from 'highcharts';
import _ from 'lodash';
import moment from 'moment';

import ChartPieColored from '@ndustrial/nsight-common/assets/chartPieColored.svg';
import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import { CHART_TYPES } from '@ndustrial/nsight-common/charts/constants';

export default function getChartConfig(
  series,
  name,
  isNegativeIndicator,
  theme,
  isRealTimeEnabled,
  chartType
) {
  return {
    chart: {
      backgroundColor: '#fff',
      spacing: 0,
      zoomType: 'x',
      type: isRealTimeEnabled ? 'areaspline' : 'column',
      style: {
        fontFamily: 'Roboto, Arial, sans-serif'
      },
      resetZoomButton: {
        theme: {
          display: 'none'
        }
      }
    },
    title: {
      text: undefined
    },
    series,
    xAxis: {
      visible: false,
      min: 0,
      minRange: 0,
      crosshair: {
        width: 2,
        snap: true
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
      softMin: 0,
      visible: false
    },
    legend: {
      enabled: false,
      reversed: !isRealTimeEnabled
    },
    tooltip: {
      shared: true,
      useHTML: true,
      borderWidth: 0,
      shadow: false,
      formatter: function() {
        let tooltipString = `<strong>${name}</strong><table style='width: 250px;'>`;
        let variance = '';
        let varianceColor = '';
        let changeDirection;
        let changeSign;

        // TODO, probably a better solution.  This is required because we reverse the order of series for
        //  an areaspline graph
        let points = this.points;

        if (chartType === CHART_TYPES.AREASPLINE) {
          points = [...this.points.reverse()];
        }

        if (points[0] && points[1]) {
          variance = commonChartUtils.getPercentChange(
            points[1].y,
            points[0].y
          );

          changeDirection = commonChartUtils.getChangeDirection(
            points[1].y,
            points[0].y
          );

          changeSign = commonChartUtils.getChangeSign(changeDirection);

          varianceColor = commonChartUtils.getVarianceColor(
            !isNegativeIndicator,
            theme,
            changeDirection
          );
        }

        tooltipString += points
          .map(function(point) {
            const isEstimated = point.point.isEstimated
              ? `<img src="${ChartPieColored}" style="vertical-align: middle;" />`
              : '';

            const date = isRealTimeEnabled
              ? point.point.date
              : moment(point.point.date).format('MMM YYYY');

            return `
              <tr style="color: ${point.point.seriesColor};">
                <td>${date}:</td>
                <td style="text-align: right;">${_.round(
                  point.y,
                  2
                ).toLocaleString()} ${point.point.unit} 
                ${isEstimated}</td>
              </tr>`;
          })
          .join('');

        if (variance !== '') {
          tooltipString += `
          <tr style="color:${varianceColor};">
            <td>% Change:</td>
            <td style="text-align: right;">${changeSign}${Math.abs(
            variance
          )}%</td>
          </tr>`;
        }

        tooltipString += '</table>';

        return tooltipString;
      }
    },
    plotOptions: {
      series: {
        fillOpacity: 0.6,
        marker: {
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '',
          radius: 4
        }
      }
    },
    credits: {
      enabled: false
    }
  };
}
