import _ from 'lodash';
import moment from 'moment';

import commonChartUtils from '../commonChartUtils';
import { TEMPERATURE_EXTREME_TYPES } from './weatherConstants';

// TODO, changing the initla view based on months is not intuitive in the UI,
//  could be revisted
function getInitialWeatherView(month) {
  const warmMonths = [4, 5, 6, 7, 8, 9];

  if (_.includes(warmMonths, month)) {
    return TEMPERATURE_EXTREME_TYPES.HIGH;
  } else {
    return TEMPERATURE_EXTREME_TYPES.LOW;
  }
}

function onWeatherChange(value, chart) {
  if (value === TEMPERATURE_EXTREME_TYPES.HIGH) {
    chart.series[0].show();
    chart.series[2].hide();
  } else {
    chart.series[0].hide();
    chart.series[2].show();
  }
}

function getWeatherTooltip(theme, isRealTimeEnabled) {
  return {
    shared: true,
    useHTML: true,
    shadow: false,
    borderWidth: 0,
    formatter: function() {
      let tooltipString = `<strong>Weather</strong><table style='width: 250px'>`;
      let variance = '';
      let varianceColor = '';
      let changeDirection;
      let changeSign;

      if (this.points[0] && this.points[1]) {
        const divisor = this.points[1].y === 0 ? 1 : this.points[1].y;

        changeDirection = commonChartUtils.getChangeDirection(
          this.points[1].y,
          this.points[0].y
        );

        variance = commonChartUtils.getPercentChange(divisor, this.points[0].y);
        varianceColor = commonChartUtils.getVarianceColor(
          true,
          theme,
          changeDirection
        );

        changeSign = commonChartUtils.getChangeSign(changeDirection);
      }

      const points = isRealTimeEnabled ? this.points : this.points.reverse();

      tooltipString += points
        .map(function(point) {
          const tooltipDate = !isRealTimeEnabled
            ? moment(point.point.date).format('MMM YYYY')
            : point.point.date;
          return `
              <tr style="color: ${point.point.color};">
                <td>${tooltipDate}:</td>
                <td style="text-align: right;">${_.round(
                  point.y,
                  2
                ).toLocaleString()} ${point.point.unit} F</td>
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
  };
}

function getWeatherAverage(series, averageType) {
  if (series.length > 0) {
    let sum = 0;

    series.forEach((a) => {
      sum += parseFloat(a.data[averageType]);
    });

    const avg = sum / series.length;

    return _.round(avg);
  }
}

export default {
  getWeatherAverage,
  getWeatherTooltip,
  onWeatherChange,
  getInitialWeatherView
};
