import _ from 'lodash';

import { formatUnits } from '../unitUtils';

function getDemandChartPeakLabel({ month, year, value, unit }, isMobile) {
  return isMobile
    ? `<span>${month} ${year}
          <br/> Peak Demand
          <br/> (${!_.isNil(value) && value.toLocaleString()} ${formatUnits(
        unit
      )})
        </span>`
    : `${month} ${year} 
        Peak Demand (${!_.isNil(value) && value.toLocaleString()} 
        ${formatUnits(unit)})`;
}

function stickyTooltip(chart) {
  const points = [];
  const currIdx = _.findLastIndex(chart.series[1].points, function(item) {
    return item.y;
  });

  chart.series.forEach((value) => {
    if (value.points[currIdx] && value.points[currIdx].y) {
      points.push(value.points[currIdx]);
    }
  });

  if (chart.series[1].points.length && points.length) {
    chart.tooltip.refresh(points);
    chart.series[1].chart.tooltip.label.element.cloneNode(true);
  }
}

function getYOffset(offset, curr, prev, isMobile) {
  if (curr && prev) {
    const pxOffset = 20;
    const defaultOffset = isMobile ? -32 : offset;
    const difference = Math.abs(curr - prev);
    let isLessThan = '';
    isLessThan = prev >= curr ? 'curr' : 'prev';
    difference <= 180
      ? (offset[isLessThan] = pxOffset)
      : (offset[isLessThan] = defaultOffset[isLessThan]);
  }

  return offset;
}

export { getDemandChartPeakLabel, getYOffset, stickyTooltip };
