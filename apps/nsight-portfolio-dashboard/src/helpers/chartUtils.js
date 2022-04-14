import { round } from 'lodash';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';

function getVarianceMarkup(points, theme, kpiConfig) {
  if (!points[0] || !points[1]) {
    return '';
  }
  const primary = points[1].y;
  const secondary = points[0].y;
  const changeDirection = commonChartUtils.getChangeDirection(
    secondary,
    primary,
    kpiConfig.compareBy
  );
  const color = commonChartUtils.getVarianceColor(
    kpiConfig.isNegativeIndicator,
    theme,
    changeDirection
  );
  const change = Math.abs(
    commonChartUtils.getPercentChange(secondary, primary)
  );

  const varianceText = commonChartUtils.getVarianceText(
    kpiConfig.isNegativeIndicator,
    changeDirection,
    kpiConfig.changeLanguage.positive,
    kpiConfig.changeLanguage.negative
  );
  const label = `${round(change, 2)}%`;
  if (change) {
    return `<span style='color: ${color}'>
              <strong>Change: ${label} ${varianceText}</strong>
              </span>`;
  }
  return '';
}

export default {
  getVarianceMarkup
};
