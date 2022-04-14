import _ from 'lodash';

import { METRIC_UNIT_TO_DISPLAY_UNIT } from '../../kpi-config/constants';
import commonChartUtils from '../commonChartUtils';
import { TICK_INTERVALS } from '../constants';

export default class BaseChartConfig {
  metric;
  plotLines = [];
  max;
  min;
  orderedSeries;
  hasNoData;

  constructor(props) {
    const {
      metric,
      theme,
      series, // TODO, consider passing in data, and having this class (or subclass) generate the series
      tickInterval = TICK_INTERVALS.DEFAULT,
      chartInterval,
      chartType,
      additionalDataPoints = [],
      useArrayForDataValues = false,
      xAxisType = 'datetime',
      ...rest
    } = props;

    this.metric = metric;
    this.theme = theme;
    this.series = series;
    this.primarySeries = series?.length ? series[0] : [];
    this.tickInterval = tickInterval;
    this.chartInterval = chartInterval;
    this.chartType = chartType;
    this.additionalDataPoints = additionalDataPoints;
    this.useArrayForDataValues = useArrayForDataValues;
    this.xAxisType = xAxisType;
    this.restChartProps = { ...rest };

    this.hasNoData =
      !this.series ||
      !this.series.some((seriesItem) => {
        return seriesItem.data && seriesItem.data.length > 0;
      });

    const unit = this.metric?.unit || '';
    this.yAxisTitle = METRIC_UNIT_TO_DISPLAY_UNIT[unit]
      ? unescape(METRIC_UNIT_TO_DISPLAY_UNIT[unit])
      : unit;
  }

  getConfig = () => {
    const seriesData = [
      ...this.series.map(({ data }) => data),
      this.additionalDataPoints
    ];

    this.max = commonChartUtils.getMaxForDataSets(seriesData);
    this.min = commonChartUtils.getMinForDataSets(seriesData);

    const baseConfig = BaseChartConfig.getCommonChartConfig({
      chartType: this.chartType,
      theme: this.theme,
      hasNoData: this.hasNoData
    });

    baseConfig.series = this.series;

    const extendedConfig = this.createConfig();
    return _.merge(baseConfig, extendedConfig);
  };

  addYAxisPlotLines = (plotLines) => {
    this.plotLines = [...this.plotLines, ...plotLines];
  };

  createConfig() {
    return {
      chart: this.createChart(),
      tooltip: this.createTooltip(),
      xAxis: {
        labels: this.createXAxisLabels(),
        ...this.createXAxis()
      },
      yAxis: {
        ...this.createYAxis(),
        plotLines: this.plotLines
      },
      plotOptions: this.createPlotOptions()
    };
  }

  createChart() {
    return {};
  }

  createXAxis() {
    return {
      startOnTick: true,
      tickInterval: this.tickInterval,
      type: this.xAxisType
    };
  }

  createYAxis() {
    return {
      max: this.max,
      title: {
        text: this.yAxisTitle,
        useHTML: true
      }
    };
  }

  createPlotOptions() {
    // implement in extending classes
    return {};
  }

  createTooltip() {
    // implement in extending classes
    return {};
  }

  createXAxisLabels() {
    // implement in extending classes
    return {};
  }

  getYAxisLabels() {
    // TODO, implement if needed
    return {};
  }

  static createPlotLine({
    value,
    text,
    color = 'black',
    labelOffset = { x: 0, y: 0 },
    dashStyle = 'dash',
    zIndex = 5,
    align = 'right'
  }) {
    const plotlineLabelTextElement = (text) =>
      `<span style='text-align: right; color: #393D3F; font-size: 0.65rem ; padding: 2px; background: rgba(255,255,255,0.7)'>
        ${text}
      </span>`;

    return {
      color,
      dashStyle,
      label: {
        align,
        useHTML: true,
        text: plotlineLabelTextElement(
          typeof text === 'function' ? text() : text
        ),
        x: labelOffset.x,
        y: labelOffset.y,
        zIndex
      },
      value,
      width: 1
    };
  }

  static getCommonChartConfig({ theme, chartType, hasNoData = false }) {
    return {
      title: {
        text: undefined
      },
      chart: {
        backgroundColor: '#fff',
        type: chartType ?? '',
        plotBorderColor: '#EAEAEA',
        style: {
          fontFamily: 'Roboto, Arial, sans-serif'
        },
        plotBorderWidth: 2,
        spacing: 1,
        spacingBottom: 15,
        zoomType: 'x'
      },
      noData: {
        style: {
          fontSize: '15px',
          color: theme.colors.text
        }
      },
      legend: {
        align: 'center',
        backgroundColor: '#fff',
        enabled: true,
        reversed: commonChartUtils.isLegendReversed(chartType),
        labelFormatter: function() {
          return `<span style='color: ${this.color};'>${this.name}</span>`;
        },
        zIndex: 10
      },
      xAxis: {
        visible: !hasNoData,
        alternateGridColor: '#f3f3f3',
        tickColor: '#EAEAEA',
        crosshair: {
          color: '#d8d8d8',
          width: 2
        },
        showFirstLabel: true,
        showLastLabel: true,
        endOnTick: false,
        startOnTick: true
      },
      yAxis: {
        visible: !hasNoData,
        gridLineWidth: 1,
        gridLineDashStyle: 'longdash',
        opposite: false,
        labels: {
          style: { fontWeight: 'bold' },
          y: 10
        },
        showLastLabel: true,
        startOnTick: false,
        endOnTick: true
      },
      tooltip: {
        borderWidth: 0,
        split: false,
        shadow: false,
        shared: true,
        useHTML: true
      },
      plotOptions: {
        series: {
          fillOpacity: 0.6,
          pointPadding: 0.12,
          step: 1,
          marker: {
            enabled: true
          },
          select: {
            enabled: false
          }
        },
        marker: {
          enabled: false,
          lineWidth: 2,
          symbol: 'circle',
          radius: 4
        },
        states: {
          hover: {
            enabled: true
          },
          select: {
            enabled: true
          },
          inactive: {
            opacity: 0.6
          }
        },
        fillOpacity: 0.6
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      rangeSelector: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      }
    };
  }
}
