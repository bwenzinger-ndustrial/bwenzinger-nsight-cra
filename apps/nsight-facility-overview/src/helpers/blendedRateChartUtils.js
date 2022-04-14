import _ from 'lodash';
import { DateTime } from 'luxon';
import moment from 'moment';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';

function getBlendedRateLabel(month, year, value) {
  return `${month} ${year} Max Demand (${value.value} ${value.unit})`;
}

function getBlendedRateVariance(points) {
  if (!points[0] || !points[1]) {
    return '';
  }

  const currYearBlendedRate = points[1].y;
  const lastYearBlendedRate = points[0].y;
  const color =
    currYearBlendedRate > lastYearBlendedRate ? '#da5f73' : '#8ec640';
  const change = Math.abs(
    commonChartUtils.getPercentChange(lastYearBlendedRate, currYearBlendedRate)
  );
  const changeDirection = currYearBlendedRate > lastYearBlendedRate ? '+' : '-';

  if (change) {
    const label = `${changeDirection}${_.round(change, 2)}%`;
    return `<span style='color: ${color}'>
              <strong>% Change: ${label}</strong>
              </span>`;
  }
  return '';
}

function formatBlendedRateData(pointsYear, lastYear, avg, theme) {
  const current = {
    name: 'Current Year',
    color: theme.colors.primary,
    data: [],
    avg: avg.curr
  };

  const last = {
    name: 'Last Year',
    color: theme.colors.secondary,
    data: [],
    avg: avg.prev
  };

  const sortedPointsYear = commonChartUtils.sortByEffectiveDate(pointsYear);
  const sortedLastYear = commonChartUtils.sortByEffectiveDate(lastYear);

  if (sortedPointsYear.length) {
    current.name = `${DateTime.fromISO(
      sortedPointsYear[0].effectiveStartDate
    ).toFormat('MMM dd, yyyy')} - ${DateTime.fromISO(
      sortedPointsYear[sortedPointsYear.length - 1].effectiveEndDate
    ).toFormat('MMM dd, yyyy')}`;
  }

  if (sortedLastYear.length) {
    last.name = `${DateTime.fromISO(
      sortedLastYear[0].effectiveStartDate
    ).toFormat('MMM dd, yyyy')} - ${DateTime.fromISO(
      sortedLastYear[sortedLastYear.length - 1].effectiveEndDate
    ).toFormat('MMM dd, yyyy')}`;
  }

  sortedPointsYear.forEach((v) => {
    const point = [];
    point.push(DateTime.fromISO(v.effectiveStartDate).toMillis());
    point.push(parseFloat(v.value));
    current.data.push(point);
  });

  sortedLastYear.forEach((v) => {
    const point = [];
    point.push(
      DateTime.fromISO(v.effectiveStartDate)
        .plus({ year: 1 })
        .toMillis()
    );
    point.push(parseFloat(v.value));
    last.data.push(point);
  });

  return [last, current];
}

function getBlendedRateCeiling(blendedRate) {
  const current = blendedRate.series.curr.length
    ? Math.max.apply(
        Math,
        blendedRate.series.curr.map(function(o) {
          return o.value !== null ? o.value : 0;
        })
      )
    : null;

  const last = blendedRate.series.prev.length
    ? Math.max.apply(
        Math,
        blendedRate.series.prev.map(function(o) {
          return o.value !== null ? o.value : 0;
        })
      )
    : null;

  return Math.max(current, last);
}

const getBlendedRateTooltips = (points, variance) => {
  let tooltipString = '<strong>AVG Cost / kWh</strong>';

  points.forEach((point, idx) => {
    if (!point) {
      return;
    }

    const seriesColor = idx === 1 ? points[1].color : points[0].color;
    const seriesDate =
      idx === 0 ? moment(points[0].x).subtract(1, 'year') : moment(points[0].x);

    tooltipString += `<div style='color: ${seriesColor}'>${seriesDate.format(
      'MMM DD, YYYY'
    )}: ${_.round(point.y, 3)} / kWh</div>`;
  });

  tooltipString += `<div>${variance}</div>`;

  return tooltipString;
};

export default {
  getBlendedRateCeiling,
  getBlendedRateLabel,
  getBlendedRateVariance,
  formatBlendedRateData,
  getBlendedRateTooltips
};
