import Highcharts from 'highcharts';
import _ from 'lodash';

import { KPI_KEYS, kpiEnums } from '../kpi-config/constants';
import { CHART_DISPLAY_INTERVALS, CHART_TYPES } from './constants';

const { COMPARE_BY_TYPES, DATE_INTERVALS } = kpiEnums;

const getChangeSign = (changeDirection) => {
  return changeDirection === 'positive' ? '+' : '-';
};

const getChangeDirection = (value1, value2, compareBy) => {
  if (!value1 || !value2) {
    return 'blank';
  }
  const difference = value1 - value2;
  if (!difference) {
    return 'neutral';
  }

  if (compareBy === kpiEnums.COMPARE_BY_TYPES.DATE) {
    return value2 > value1 ? 'positive' : 'negative';
  } else {
    return difference > 0 ? 'negative' : 'positive';
  }
};

const getPercentChange = (value1, value2, numDigits = 0) => {
  return _.round(((value2 - value1) / Math.abs(value1)) * 100, numDigits);
};

function sortByEffectiveDate(data) {
  return data.sort((a, b) =>
    a.effectiveStartDate > b.effectiveStartDate ? 1 : -1
  );
}

function getVariance(points) {
  if (!points[0] || !points[1]) {
    return '';
  }
  const currMonthDemand = points[1].y;
  const lastWeek = points[0].y;
  const color = currMonthDemand > lastWeek ? '#da5f73' : '#8ec640';
  const change = getPercentChange(lastWeek, currMonthDemand);
  if (change) {
    const label = `${change > 0 ? '+' : ''}${_.round(change, 2)}%`;
    return `<span style='color: ${color}'>
              <strong>% Change: ${label}</strong>
              </span>`;
  }
  return '';
}

const getVarianceColor = (isNegativeIndicator, theme, changeDirection) => {
  switch (changeDirection) {
    case 'positive':
      return isNegativeIndicator ? theme.colors.failure : theme.colors.success;
    case 'negative':
      return isNegativeIndicator ? theme.colors.success : theme.colors.failure;
    default:
      return theme.colors.textLight;
  }
};

const getVarianceText = (
  isNegativeIndicator,
  changeDirection,
  positiveText,
  negativeText
) => {
  if (changeDirection === 'positive') {
    return isNegativeIndicator ? negativeText : positiveText;
  } else {
    return isNegativeIndicator ? positiveText : negativeText;
  }
};

const getVarianceSign = (isNegativeIndicator, changeDirection) => {
  if (changeDirection === 'positive') {
    return isNegativeIndicator ? '-' : '+';
  } else {
    return isNegativeIndicator ? '+' : '-';
  }
};

const getActiveCharts = (charts) => {
  return charts.filter((chart) => chart !== undefined && !_.isEmpty(chart));
};

const syncChartEvents = (charts, setIsZoomed, detailChartExtremes) => {
  // When charts are removed from the dom, Highcharts replaces them in the `charts` array with `undefined`
  // this is filtering out the `undefined` values from that array of charts
  const activeCharts = getActiveCharts(charts);

  if (!detailChartExtremes) {
    return;
  }

  // If detail chart was zoomed before clicking on breakdown graphs tab

  if (
    detailChartExtremes.min &&
    detailChartExtremes.dataMin &&
    detailChartExtremes.min !== detailChartExtremes.dataMin
  ) {
    activeCharts.forEach((chart) => {
      chart.xAxis.forEach((xAxis) => {
        xAxis.setExtremes(detailChartExtremes.min, detailChartExtremes.max);
      });
    });

    setIsZoomed(true);
  }

  Highcharts.Pointer.prototype.reset = function() {
    return undefined;
  };

  const elements = document.getElementsByClassName('highcharts-container');

  ['mousemove', 'touchmove', 'touchstart', 'mouseover'].forEach(function(
    eventType
  ) {
    for (const el of elements) {
      el.addEventListener(eventType, function(e) {
        let event;

        activeCharts.forEach((chart) => {
          if (chart.pointer) {
            event = chart.pointer.normalize(e);

            const points = [];
            // Get the hovered points

            chart.series.forEach((series) => {
              if (!series.data.length) {
                return;
              }

              // Ensure the series is not hidden and has data
              if (series.visible && series.data.length > 0) {
                const thisPoint = series.searchPoint(event, true);

                if (thisPoint) {
                  points.push(thisPoint);
                }
              }
            });

            if (!points.length) {
              return;
            }

            // Show the tooltip
            chart.tooltip.refresh(points);

            if (chart.series[0].graph) {
              const seriesBBox = chart.series[0].graph.getBBox();
              const seriesRange =
                seriesBBox.width + seriesBBox.x + chart.plotLeft;

              // Show the crosshair
              if (event.chartX < seriesRange) {
                if (points[1] && points[1].highlight) {
                  points[1].highlight(event);
                }
                // It's stockchart and there is no highlight event
                else {
                  const useSeries = points[0].series.chart.series[0]
                    ? points[0].series.chart.series[0]
                    : points[0].series.chart.series[1];
                  useSeries.onMouseOver();
                  points[0].series.chart.xAxis[0].drawCrosshair(
                    event,
                    points[0]
                  );
                }
              }
            }
          }
        });
      });
    }
  });

  ['mouseleave'].forEach(function(eventType) {
    for (const el of elements) {
      el.addEventListener(eventType, function(e) {
        let point;

        activeCharts.forEach((chart) => {
          if (!chart.series) {
            return;
          }
          if (chart && chart.series && chart.series[0].data.length > 0) {
            point = chart.series[0].searchPoint(e, true);
            if (point && point.onMouseOut) {
              point.onMouseOut();
              chart.tooltip.hide(point);
              chart.xAxis[0].hideCrosshair();
            }
          }
        });
      });
    }
  });

  Highcharts.Point.prototype.highlight = function(event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver();
    this.series.chart.xAxis[0].drawCrosshair(event, this);
  };

  Highcharts.syncExtremes = function(e) {
    const thisChart = this.chart;
    if (e.trigger !== 'syncExtremes') {
      Highcharts.each(getActiveCharts(Highcharts.charts), function(chart) {
        if (chart && chart !== thisChart) {
          if (chart.userOptions.chart.zoomType === 'x') {
            setIsZoomed(true);
          }

          if (chart.xAxis[0].setExtremes) {
            chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
              trigger: 'syncExtremes'
            });
          }
        }
      });
    }
  };
};

/**
 *
 * @param {number[][]} dataSets
 * @returns {number}
 */
const getMaxForDataSets = (dataSets) => {
  const allValues = dataSets.reduce((memo, next) => {
    return [...memo, ...next];
  }, []);

  return Math.max(
    ...allValues.map((dataPoint) => {
      if (!dataPoint) return 0;

      if (Array.isArray(dataPoint))
        return _.isNumber(dataPoint[1]) ? dataPoint[1] : 0;

      if (typeof dataPoint === 'object')
        return _.isNumber(dataPoint.y) ? dataPoint.y : 0;

      return 0;
    })
  );
};

/**
 *
 * @param {number[][]} dataSets
 * @returns {number}
 */
const getMinForDataSets = (dataSets) => {
  const allValues = dataSets.reduce((memo, next) => {
    return [...memo, ...next];
  }, []);

  return Math.min(
    ...allValues.map((dataPoint) => {
      if (!dataPoint) return 0;

      if (Array.isArray(dataPoint))
        return _.isNumber(dataPoint[1]) ? dataPoint[1] : 0;

      if (typeof dataPoint === 'object')
        return _.isNumber(dataPoint.y) ? dataPoint.y : 0;

      return 0;
    })
  );
};

function getChartExport(downloadType, chart, title, orgName) {
  if (!chart) {
    return;
  }
  if (downloadType === 'raw_csv') {
    const origSeries = JSON.parse(JSON.stringify(chart.options.series));
    setExportOptions(title, orgName, chart, 'raw');
    formatExportData(chart.options.series, 'raw', chart);
    chart.downloadCSV();

    chart.update({
      series: origSeries
    });
  } else if (downloadType === 'estimated_csv') {
    setExportOptions(title, orgName, chart, 'estimated');
    formatExportData(chart.options.series, 'estimated', chart);
    chart.downloadCSV();
  } else if (downloadType === 'jpg') {
    chart.options.title.text = `${orgName}: Portfolio-Wide`;
    chart.options.subtitle.text = title;

    chart.exportChartLocal({
      type: 'image/jpg',
      filename: `${title}_${new Date().toISOString()}`
    });
  }
}

function setExportOptions(title, orgName, chart, exportType) {
  chart.options.exporting = {
    filename: `${title}_${exportType}_${orgName}_${new Date().toISOString()}`,
    chartOptions: {
      chart: {
        series: []
      }
    },
    dateFormat: '%Y-%m-%d',
    csv: {
      decimalPoint: '.',
      itemDelimiter: ',',
      lineDelimiter: '\n',
      dateFormat: '%b'
    }
  };
  chart.update({ chartOptions: { chart: { series: [] } } });
}

function formatExportData(series, exportType, chart) {
  if (!chart) {
    return;
  }

  let newSeries = [];

  if (exportType === 'estimated') {
    series.forEach((s, i) => {
      s.visible = true;
    });

    newSeries = [...series];

    chart.update({
      series: newSeries
    });
  } else {
    // hide primary estimated and secondary estimated series
    series.forEach((s, i) => {
      if (i % 2 === 0) {
        s.visible = true;
      } else {
        s.visible = false;
      }

      if (s.visible) {
        s.data.forEach((val) => {
          // is_estimated, so don't include
          if (val[2] === true) {
            val[1] = '';
          }
        });
      }
    });

    newSeries = [...series];

    chart.update({
      series: newSeries
    });
  }
}

function getDecimalPlacesToDisplay(min, max) {
  const diff = parseFloat(max - min);
  let numDecimalPlaces = 0;

  switch (true) {
    case diff <= 1 && diff > 0.01:
      numDecimalPlaces = 2;
      break;
    case diff <= 0.01 && diff > 0.001:
      numDecimalPlaces = 3;
      break;
    case diff <= 0.001 && diff > 0.0001:
      numDecimalPlaces = 4;
      break;
    case diff <= 0.0001 && diff > 0.00001:
      numDecimalPlaces = 5;
      break;
    case diff <= 0.00001:
      numDecimalPlaces = 6;
      break;
    default:
      numDecimalPlaces = 0;
      break;
  }

  return numDecimalPlaces;
}

/**
 *
 * @param {KpiConfig} metric
 * @param [params]
 * @param {boolean} [params.isRealTimeEnabled]
 * @returns {string}
 */
function getChartTypeForMetric(metric, params = {}) {
  const { isRealTimeEnabled } = params;

  // TODO, another instance where this branching will not work in the future
  //  because not all compareBy metric will be column graphs
  if (isRealTimeEnabled === false) {
    return CHART_TYPES.COLUMN;
  }

  if (
    metric.compareBy === COMPARE_BY_TYPES.METRIC ||
    metric.minimumDateInterval === DATE_INTERVALS.MONTHLY
  ) {
    return CHART_TYPES.COLUMN;
  }

  return CHART_TYPES.AREASPLINE;
}

// TODO, another instance where this branching will not work in the future
//  because not all compareBy metric will be column graphs
function getChartInterval(metric, params = {}) {
  const { isRealTimeEnabled } = params;

  if (metric.slug === KPI_KEYS.KWH_BUDGET) return CHART_DISPLAY_INTERVALS.DAY;

  if (
    isRealTimeEnabled === false ||
    metric.compareBy === COMPARE_BY_TYPES.METRIC ||
    metric.minimumDateInterval === kpiEnums.DATE_INTERVALS.MONTHLY
  ) {
    return CHART_DISPLAY_INTERVALS.MONTH;
  }

  return CHART_DISPLAY_INTERVALS.DAY;
}

function isLegendReversed(chartType) {
  switch (chartType) {
    case CHART_TYPES.AREASPLINE:
      return true;
    case CHART_TYPES.COLUMN:
      return false;
    default:
      return false;
  }
}

export default {
  formatExportData,
  getActiveCharts,
  getChangeDirection,
  getChangeSign,
  getChartExport,
  getPercentChange,
  getVariance,
  getVarianceColor,
  getVarianceText,
  getVarianceSign,
  getDecimalPlacesToDisplay,
  setExportOptions,
  sortByEffectiveDate,
  syncChartEvents,
  getChartTypeForMetric,
  getMaxForDataSets,
  getMinForDataSets,
  isLegendReversed,
  getChartInterval
};
