import { DateTime } from 'luxon';
import { createSelector, createStructuredSelector } from 'reselect';

import {
  BaseChartConfig,
  DemandChartConfig
} from '@ndustrial/nsight-common/charts/configs';
import {
  CHART_DISPLAY_INTERVALS,
  CHART_TYPES,
  PLOTLINE_LABEL_OFFSET,
  TICK_INTERVALS
} from '@ndustrial/nsight-common/charts/constants';
import {
  getDemandChartPeakLabel,
  getYOffset
} from '@ndustrial/nsight-common/charts/demand/demandChartUtils';
import { SeriesCreator } from '@ndustrial/nsight-common/charts/series';
import metrics from '@ndustrial/nsight-common/kpi-config/metrics';
// TODO, consolidate export to index file in charts
import { getSelectedFacility } from '@ndustrial/nsight-common/selectors';

import getDemandComparisonLoadingStatus from './getDemandComparisonLoadingStatus';

const getDemandData = (state) => state.demandData;
const getTheme = (state) => state.user && state.user.theme;

const getDemandComparisonChartConfig = createSelector(
  getDemandData,
  getSelectedFacility,
  getTheme,
  (demandData, selectedFacility, theme) => {
    const timezone = selectedFacility && selectedFacility.timezone;
    const currentDate = DateTime.fromJSDate(new Date(), {
      zone: timezone
    });

    const primarySeries = new SeriesCreator({
      name: ``,
      rangeLabel: `${currentDate.monthShort} ${currentDate.year}`,
      color: theme.colors.primary,
      unit: 'kw',
      dateKey: 'event_time',
      displayInterval: CHART_DISPLAY_INTERVALS.HOUR,
      useArrayForDataValue: true,
      timezone
    });

    const comparisonSeries = new SeriesCreator({
      name: ``,
      rangeLabel: `${currentDate.monthShort} ${
        currentDate.minus({ year: 1 }).year
      }`,
      color: theme.colors.secondary,
      unit: 'kw',
      dateKey: 'event_time',
      displayInterval: CHART_DISPLAY_INTERVALS.HOUR,
      yearOffset: 1,
      useArrayForDataValue: true,
      timezone
    });

    if (demandData.currMonthDemand?.values?.length > 0) {
      primarySeries.createDataPoints(demandData.currMonthDemand.values);
    }

    if (demandData.lastYearDemand?.values?.length > 0) {
      comparisonSeries.createDataPoints(demandData.lastYearDemand.values);
    }

    const demandChartConfig = new DemandChartConfig({
      metric: metrics.kw,
      theme,
      series: [primarySeries.getConfig(), comparisonSeries.getConfig()],
      additionalDataPoints: [
        demandData.currYearMax.value,
        demandData.lastYearMax.value
      ],
      chartType: CHART_TYPES.AREASPLINE,
      chartInterval: CHART_DISPLAY_INTERVALS.DAY,
      tickInterval: TICK_INTERVALS.DAY,
      useIndexForXAxisValues: false,
      useArrayForDataValues: true
    });

    if (demandData.currYearMax && demandData.lastYearMax) {
      demandChartConfig.addYAxisPlotLines([
        BaseChartConfig.createPlotLine({
          value: demandData.currYearMax.value,
          labelOffset: {
            x: -10,
            y: getYOffset(
              PLOTLINE_LABEL_OFFSET,
              demandData.currYearMax.value,
              demandData.lastYearMax.value
            ).curr
          },
          color: '#979797',
          text: getDemandChartPeakLabel(
            {
              month: currentDate.monthLong,
              year: currentDate.year,
              value: demandData.currYearMax.value,
              unit: demandData.currYearMax.unit
            },
            false
          )
        }),
        BaseChartConfig.createPlotLine({
          value: demandData.lastYearMax.value,
          labelOffset: {
            x: -10,
            y: getYOffset(
              PLOTLINE_LABEL_OFFSET,
              demandData.currYearMax.value,
              demandData.lastYearMax.value
            ).prev
          },
          color: '#E1697D',
          text: getDemandChartPeakLabel(
            {
              month: currentDate.monthLong,
              year: currentDate.minus({ year: 1 }).year,
              value: demandData.lastYearMax.value,
              unit: demandData.lastYearMax.unit
            },
            false
          )
        })
      ]);
    }
    return demandChartConfig.getConfig();
  }
);

const getDemandComparisonHasData = createSelector(
  getDemandData,
  (demandData) => {
    if (demandData) {
      return (
        demandData.currMonthDemand.values.length > 0 ||
        demandData.lastYearDemand.values.length > 0 ||
        !!demandData.currYearMax.value ||
        !!demandData.lastYearMax.value
      );
    }
    return false;
  }
);

const getDemandComparisonWarning = createSelector(
  getDemandData,
  (demandData) => {
    if (demandData) {
      return (
        demandData.currMonthDemand._metadata.error ||
        demandData.lastYearDemand._metadata.error
      );
    }
    return '';
  }
);

const getError = createSelector(
  getDemandData,
  (demandData) => demandData && demandData.error
);

const getDemandComparison = createStructuredSelector({
  chartOptions: getDemandComparisonChartConfig,
  error: getError,
  hasData: getDemandComparisonHasData,
  isLoading: getDemandComparisonLoadingStatus,
  warning: getDemandComparisonWarning
});

export default getDemandComparison;
