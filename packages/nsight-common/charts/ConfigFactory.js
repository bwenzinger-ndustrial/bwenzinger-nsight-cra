import moment from 'moment';

import { KPI_KEYS, kpiEnums } from '../kpi-config/constants';
import commonChartUtils from './commonChartUtils';
import {
  BaseChartConfig,
  IndexedXAxisMetricChartConfig,
  MetricChartConfig
} from './configs';
import {
  CHART_DISPLAY_INTERVALS,
  CHART_TYPES,
  DATE_FORMATS,
  TICK_INTERVALS
} from './constants';
import { fillMissingDetailData, SeriesCreator } from './series';

function _getSeriesName(metricConfig, startDate, endDate, isPrimary) {
  let label = '';
  if (metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    const metric = isPrimary
      ? metricConfig.primaryMetric
      : metricConfig.comparisonMetric;

    const breakdownMetric = metricConfig.detail.breakdown.find(
      (item) => item.key === metric
    );

    if (breakdownMetric) {
      label = `${breakdownMetric.name}`;
    }
  }

  return label;
}

function _getRangeLabel(
  metricConfig,
  startDate,
  endDate,
  isPrimary,
  displayInterval
) {
  if (metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) return '';

  const format =
    displayInterval === CHART_DISPLAY_INTERVALS.DAY
      ? DATE_FORMATS.MMM_DD_YYYY
      : DATE_FORMATS.MMM_YYYY;

  const firstDate = `${moment(startDate).format(format)}`;
  const secondDate = `${moment(endDate).format(format)}`;
  return `${firstDate} - ${secondDate}`;
}

function _getSeriesTypeByKpiIsRealTimeisPortfolio(
  metricConfig,
  isPrimary,
  isRealTimeEnabled,
  isPortfolio
) {
  let type = CHART_TYPES.AREASPLINE;

  if (
    metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC ||
    (!isRealTimeEnabled && !isPortfolio)
  ) {
    type = CHART_TYPES.COLUMN;
  }

  return type;
}

function _getDisplayInterval(metricConfig, isRealTimeEnabled, isPortfolio) {
  let displayInterval = CHART_DISPLAY_INTERVALS.DAY;

  if (
    (metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC ||
      !isRealTimeEnabled ||
      metricConfig.minimumDateInterval === 'monthly' ||
      isPortfolio) &&
    metricConfig.slug !== KPI_KEYS.KWH_BUDGET
  ) {
    // TODO, update after merged with kwh budget do check for slug
    displayInterval = CHART_DISPLAY_INTERVALS.MONTH;
  }

  return displayInterval;
}

function _getDataDecorators(
  metricConfig,
  isPrimary,
  isRealTimeEnabled,
  isPortfolio,
  allSeries,
  theme
) {
  let dataDecorators = [];

  if (metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    dataDecorators.push(
      SeriesCreator.withColumns({
        showIsEstimated:
          isRealTimeEnabled &&
          !isPortfolio &&
          metricConfig.slug !== KPI_KEYS.KWH_BUDGET
      })
    );
  } else if (!isPortfolio) {
    dataDecorators.push(
      SeriesCreator.withEstimatedMarker(),
      SeriesCreator.withFormattedDateFiled({
        format: DATE_FORMATS.ddd_MMM_D_YYYY
      })
    );
  }

  // NOTE: custom for kwh budget
  if (metricConfig.slug === KPI_KEYS.KWH_BUDGET) {
    // To compare kwh to budgeted, we need both series to be in place
    if (isPrimary && allSeries[1]?.values?.length) {
      const [comparisonPoint] = allSeries[1].values;
      dataDecorators = [
        ...dataDecorators,
        ({ originalPoint, color, processedPoint }) => {
          const config = {
            borderColor: 'transparent'
          };

          let calculatedColor = 'transparent';

          if (!comparisonPoint) {
            return {
              ...config,
              color: theme.colors.primary
            };
          }

          if (originalPoint.isProjection) {
            calculatedColor = '#c9c9c9';
          } else if (originalPoint.value > comparisonPoint.value) {
            calculatedColor = theme.colors.primary;
          } else {
            calculatedColor = theme.colors.secondary;
          }

          return {
            ...config,
            color: calculatedColor
          };
        }
      ];
    }
  }

  return dataDecorators;
}

export default class ConfigFactory {
  static getKpiChartConfig(params) {
    const {
      data,
      metricConfig,
      theme,
      primaryDates,
      comparisonDates,
      isRealTimeEnabled,
      useIndexForXAxisValue,
      isPortfolio
    } = params;

    const _data = [...data];

    if (metricConfig.slug === KPI_KEYS.KWH_BUDGET) {
      // NOTE, This combines the primary daily kwh data with the remaining budget data.
      //  It may be advantageous to create another series due to the way tooltips are currently being
      //  displayed (remaining budget show as daily kwh).  However, the current tooltip function doesn't know
      //  more than 2 series
      if (_data[0]?.values?.length) {
        const remainingBudget =
          _data[0].additionalMetrics.facility_daily_remaining_kwh_budget;
        _data[0].records = [
          ..._data[0].values,
          ...remainingBudget.records.map((value) => ({
            ...value,
            isProjection: true
          }))
        ];
      }

      // NOTE: The daily budget is currently a series.  However, we only fetch it partially,
      //  and to display it across the entire month we need to fill in missing days. It may
      //  make more sense in the future to make this a plot line and then handle update
      //  IndexedXAxisMetricChartConfig to understand to include plotlines in the tooltip
      if (_data[1]?.values?.length) {
        const remainingDays =
          primaryDates.to.daysInMonth() - primaryDates.to.date();
        const budget = _data[1].values[0].value;
        const fillValues = [];
        const primaryDatesTo = primaryDates.to.clone();

        for (let i = 0; i < remainingDays; i++) {
          fillValues.push({
            value: budget,
            effectiveEndDate: primaryDatesTo.add(1, 'day')
          });
        }

        _data[1].values = [..._data[1].values, ...fillValues];
      }
    }

    const series = ConfigFactory.createSeries({
      data: _data,
      metricConfig,
      theme,
      primaryDates,
      comparisonDates,
      isRealTimeEnabled,
      isPortfolio,
      useIndexForXAxisValue
    });

    // NOTE: we currently do a lot of checking if there's primary data (data[0]) and returning
    //  an empty chart if there isn't.  Not sure we need to continue this, but it's implemented
    //  that way for now

    if (!series?.length) {
      return {
        ...BaseChartConfig.getCommonChartConfig({ theme, hasNoData: true }),
        series
      };
    }

    const chartClass = useIndexForXAxisValue
      ? IndexedXAxisMetricChartConfig
      : MetricChartConfig;

    const chartInterval = commonChartUtils.getChartInterval(metricConfig, {
      isRealTimeEnabled
    });

    const tickInterval =
      isPortfolio ||
      !isRealTimeEnabled ||
      metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC
        ? TICK_INTERVALS.MONTH
        : TICK_INTERVALS.DAY;

    const chartConfig = new chartClass({
      metric: metricConfig,
      theme,
      series,
      chartInterval,
      tickInterval
    });

    if (metricConfig.slug === KPI_KEYS.KWH_BUDGET && _data[0]?.values?.length) {
      const averageUsageData =
        _data[0].additionalMetrics
          .facility_daily_rolling_month_avg_electricity_usage.records;

      const plotLines = [];
      if (averageUsageData.length) {
        plotLines.push({
          value: averageUsageData[0].value,
          dashStyle: 'Dash',
          color: '#9f9f9f',
          width: 2
        });
      }

      chartConfig.addYAxisPlotLines(plotLines);
      chartConfig.series.splice(
        1,
        0,
        {
          name: 'Daily Limit',
          type: CHART_TYPES.AREASPLINE,
          color: '#9f9f9f',
          data: []
        },
        {
          name: 'Daily Average Usage',
          data: [],
          color: '#9f9f9f',
          type: CHART_TYPES.LINE,
          dashStyle: 'Dash',
          marker: {
            enabled: false
          }
        }
      );
    }

    return chartConfig.getConfig();
  }

  static createSeries(params) {
    const {
      data,
      metricConfig,
      comparisonDates,
      primaryDates,
      theme,
      isRealTimeEnabled,
      isPortfolio,
      useIndexForXAxisValue
    } = params;
    return data.map((dataItem, chartIndex, seriesArr) => {
      const isPrimary = chartIndex === 0;
      let startDate = primaryDates.from;
      let endDate = primaryDates.to;

      // Determine which dates to use
      if (
        !isPrimary &&
        metricConfig.compareBy !== kpiEnums.COMPARE_BY_TYPES.METRIC
      ) {
        startDate = comparisonDates.from;
        endDate = comparisonDates.to;
      }

      // Determine the display interval, which is used to set dates correctly by the SeriesCreator
      const calculatedDisplayInterval = _getDisplayInterval(
        metricConfig,
        isRealTimeEnabled,
        isPortfolio
      );

      // Set up series
      const series = new SeriesCreator({
        color: isPrimary ? theme.colors.primary : theme.colors.secondary, // color based on order (so far we only use 2 data arrays)
        name: _getSeriesName(metricConfig, startDate, endDate, isPrimary),
        rangeLabel: _getRangeLabel(
          metricConfig,
          startDate,
          endDate,
          isPrimary,
          calculatedDisplayInterval
        ),
        displayInterval: calculatedDisplayInterval,
        type: _getSeriesTypeByKpiIsRealTimeisPortfolio(
          metricConfig,
          isPrimary,
          isRealTimeEnabled,
          isPortfolio
        ),
        dataDecorators: _getDataDecorators(
          metricConfig,
          isPrimary,
          isRealTimeEnabled,
          isPortfolio,
          seriesArr,
          theme
        ),
        useIndexForXAxisValue,
        zIndex: seriesArr.length - chartIndex
      });

      // Figure out if there needs to be a year offset for display purposes.  The x axis is only the primary series,
      // so we need to make the other series the same year to align them on the graph
      if (!isPrimary && !useIndexForXAxisValue) {
        series.yearOffset =
          metricConfig.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC
            ? 0
            : primaryDates.from.diff(comparisonDates.from, 'years');
      }

      // NOTE: custom for kwh budget
      if (metricConfig.slug === KPI_KEYS.KWH_BUDGET && !isPrimary) {
        series.dataDecorators = [];
        series.type = CHART_TYPES.LINE;
        series.color = '#5e5e5e';
        series.name = series.name.replace('Cumulative ', '');
        series.restSeriesProps = {
          lineWidth: 1.5,
          dashStyle: 'Solid',
          marker: {
            enabled: false
          }
        };
      }

      if (dataItem.values) {
        series.createDataPoints(dataItem.values);
      }

      if (
        isRealTimeEnabled &&
        metricConfig.compareBy !== kpiEnums.COMPARE_BY_TYPES.METRIC &&
        !isPortfolio
      ) {
        series.data = fillMissingDetailData(
          startDate,
          endDate,
          series.data,
          calculatedDisplayInterval
        );
      }

      return series.getConfig();
    });
  }
}
