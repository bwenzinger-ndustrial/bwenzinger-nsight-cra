import moment from 'moment';

import ChartPieColored from '../assets/chartPieColored.svg';
import { kpiEnums } from '../kpi-config/constants';
import commonChartUtils from './commonChartUtils';
import { DATE_FORMATS } from './constants';

const formatDetailTooltips = (dataPoints, metric, theme, isMonthly) => {
  let tooltipString = `<strong>${unescape(metric.label)}</strong>`;
  let variance = '';
  let varianceColor = '';
  let varianceText = '';
  let changeDirection;

  if (dataPoints[0] && dataPoints[1]) {
    variance = commonChartUtils.getPercentChange(
      dataPoints[1].y,
      dataPoints[0].y
    );
    changeDirection = commonChartUtils.getChangeDirection(
      dataPoints[1].y,
      dataPoints[0].y
    );
    varianceColor = commonChartUtils.getVarianceColor(
      metric.isNegativeIndicator,
      theme,
      changeDirection
    );

    varianceText = commonChartUtils.getVarianceText(
      metric.isNegativeIndicator,
      changeDirection,
      metric.changeLanguage.positive,
      metric.changeLanguage.negative
    );
  }

  tooltipString += `<table font-weight: 600;">`;

  for (let i = 0; i < dataPoints.length; i++) {
    const { point } = dataPoints[i];
    let marginTop = '0';

    let seriesName;

    if (metric.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
      // Janky, but it works for now
      const metricKey =
        i === 0 ? metric.primaryMetric : metric.comparisonMetric;

      const metricName =
        metric.detail.breakdown.find((item) => item.key === metricKey)?.name ??
        '';
      // NOTE: This bit is here because we store metadata about the primary and comparison metrics
      //  in the breakdown.  This would not be necessary if we had a dictionary that contained every
      //  metrics' metadata, either retrieved from the DB or stored as a file
      seriesName = metricName.replace('Cumulative ', '');
    } else {
      const format = isMonthly
        ? DATE_FORMATS.MMM_YYYY
        : DATE_FORMATS.MMM_DD_YYYY;

      seriesName = moment(point.originalDate).format(format);
    }

    const seriesValue = point.y.toFixed(metric.significantDigits);
    const seriesUnit = metric.unit || '';

    if (i === 0) {
      marginTop = '10px';
    }

    const isEstimated = point.isEstimated
      ? `<img src="${ChartPieColored}" style="vertical-align: middle;" />`
      : '';

    tooltipString += `
      <tr style="color: ${point.color};">
          <td style="padding-right: 40px; padding-top: ${marginTop}">${seriesName}:</td>
          <td style="text-align: right; padding-top: ${marginTop}">${seriesValue} ${seriesUnit}          
          ${isEstimated}
          </td>
      </tr>`;
  }

  if (variance !== '') {
    tooltipString += `<tr style="color:${varianceColor};">
    <td>Change:</td>
    <td style="text-align: right;">${Math.abs(variance)}% ${varianceText}</td>
  </tr>`;
  }

  tooltipString += '</table>';

  return tooltipString;
};

export { formatDetailTooltips };
