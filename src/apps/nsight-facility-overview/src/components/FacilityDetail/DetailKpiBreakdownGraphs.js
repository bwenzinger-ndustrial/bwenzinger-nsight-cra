import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { maxBy } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import { WeatherLightning } from '@ndustrial/nd-icons-svg';
import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import {
  CHART_DISPLAY_INTERVALS,
  CHART_TYPES,
  DATE_FORMATS
} from '@ndustrial/nsight-common/charts/constants';
import {
  fillMissingBreakdownData,
  orderSeriesByChartType,
  SeriesCreator
} from '@ndustrial/nsight-common/charts/series';
import getWeatherConfig from '@ndustrial/nsight-common/charts/weather/weatherConfig';
import weatherUtils from '@ndustrial/nsight-common/charts/weather/weatherUtils';
import { KPI_ICON_HASH } from '@ndustrial/nsight-common/kpi-config/constants';
import { getDisplayLabel } from '@ndustrial/nsight-common/kpi-config/getDisplayValues';

import { chartConfigurations } from '../../helpers';
import useFilteredBreakdown from '../../hooks/useFilteredBreakdown';
import WeatherToggle from '../WeatherToggle';

const ChartContainer = styled.div`
  flex: 1;
  border: 1px solid #d8d8d8;
  height: 100%;
  overflow-x: auto;
`;

const BreakdownName = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  width: 280px;
  border-bottom: 1px dashed #d8d8d8;
  display: none;
  height: 120px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: flex;
  }
`;

const KPIBreakdownRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;

  ${ChartContainer} {
    margin-right: 12px;
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    ${ChartContainer} {
      margin-left: 0;
    }

    ${BreakdownName} {
      margin-left: 12px;
    }
  }
`;

const Container = styled.div`
  width: 100%;

  ${KPIBreakdownRow}:not(:last-child) {
    margin-bottom: 4px;
  }
`;

function groupData(data, startDate, aggregateFunction) {
  return data.reduce((acc, obj) => {
    const isAfterStartDate = moment(obj.effectiveStartDate)
      .utc()
      .isSameOrAfter(startDate, 'day');

    if (isAfterStartDate) {
      const key = moment(obj.effectiveStartDate)
        .utc()
        .format('MM/YYYY');

      let totalValue;

      if (aggregateFunction === 'max') {
        totalValue = parseFloat(maxBy(data, 'value').value);
      } else {
        totalValue = (acc[key]?.value ?? 0) + +obj.value;
      }

      acc[key] = {
        effectiveEndDate: obj.effectiveStartDate,
        value: totalValue
      };
    }

    return acc;
  }, {});
}

const DetailKpiBreakdownGraphs = withTheme(function({
  kpi,
  className,
  comparisonBreakdown,
  comparisonDateRange,
  detailChart,
  isRealTimeEnabled,
  primaryBreakdown,
  primaryDateRange,
  setIsZoomed,
  theme,
  weather
}) {
  const filteredBreakdown = useFilteredBreakdown(kpi.detail?.breakdown);

  useEffect(() => {
    Highcharts.charts.push(detailChart);

    return function cleanup() {
      Highcharts.charts.pop();
    };
  }, [detailChart]);

  let detailChartExtremes = null;

  if (detailChart) {
    detailChartExtremes = detailChart.xAxis[0].getExtremes();
  }

  setTimeout(() => {
    commonChartUtils.syncChartEvents(
      Highcharts.charts,
      setIsZoomed,
      detailChartExtremes
    );
  });

  const currentMonth = moment().format('MM');
  const initialWeatherView = weatherUtils.getInitialWeatherView(currentMonth);
  let weatherSeries = [];
  let configWithWeather = {};

  const childNodes =
    filteredBreakdown?.map((breakdown) => {
      const BreakdownIcon = KPI_ICON_HASH[breakdown.icon];
      const displayLabel = getDisplayLabel(breakdown.key, breakdown.name);

      let primaryFilledData = [];
      let comparisonFilledData = [];

      primaryFilledData = primaryBreakdown[breakdown.key]
        ? fillMissingBreakdownData(
            primaryDateRange.from,
            primaryDateRange.to,
            primaryBreakdown[breakdown.key].records
          )
        : [];

      comparisonFilledData = comparisonBreakdown[breakdown.key]
        ? fillMissingBreakdownData(
            comparisonDateRange.from,
            comparisonDateRange.to,
            comparisonBreakdown[breakdown.key].records
          )
        : [];

      if (!isRealTimeEnabled) {
        const groupedComparisonData = groupData(
          comparisonFilledData,
          comparisonDateRange.from,
          breakdown.aggregateFunction
        );
        const groupedPrimaryData = groupData(
          primaryFilledData,
          primaryDateRange.from,
          breakdown.aggregateFunction
        );

        comparisonFilledData = [];
        primaryFilledData = [];

        Object.keys(groupedComparisonData).forEach((key) => {
          comparisonFilledData.push(groupedComparisonData[key]);
        });

        Object.keys(groupedPrimaryData).forEach((key) => {
          primaryFilledData.push(groupedPrimaryData[key]);
        });
      }

      const displayInterval = isRealTimeEnabled
        ? CHART_DISPLAY_INTERVALS.DAY
        : CHART_DISPLAY_INTERVALS.MONTH;
      const chartType = isRealTimeEnabled
        ? CHART_TYPES.AREASPLINE
        : CHART_TYPES.COLUMN;
      const dataDecorators = [
        SeriesCreator.withEstimatedMarker(),
        SeriesCreator.withFormattedDateFiled({
          format: DATE_FORMATS.ddd_MMM_D_YYYY
        })
      ];
      const graphSeries = [
        new SeriesCreator({
          data: primaryFilledData,
          color: theme.colors.primary,
          name: 'Primary',
          unit: breakdown.unit,
          displayInterval,
          useIndexForXAxisValue: true,
          dataDecorators
        }).getConfig(),
        new SeriesCreator({
          data: comparisonFilledData,
          color: theme.colors.secondary,
          name: 'Comparison',
          unit: breakdown.unit,
          displayInterval,
          useIndexForXAxisValue: true,
          dataDecorators
        }).getConfig()
      ];

      const detailBreakdownChartConfig = chartConfigurations.kpiDetailBreakdownChartConfig(
        orderSeriesByChartType(graphSeries, chartType),
        breakdown.name,
        breakdown.isNegativeIndicator,
        theme,
        isRealTimeEnabled,
        chartType
      );

      return (
        <KPIBreakdownRow key={breakdown.key}>
          {!!BreakdownIcon && <BreakdownIcon width="40px" height="40px" />}
          <BreakdownName>{displayLabel}</BreakdownName>
          <ChartContainer>
            <HighchartsReact
              containerProps={{ style: { height: '100%', width: '100%' } }}
              constructorType="chart"
              highcharts={Highcharts}
              options={detailBreakdownChartConfig}
            />
          </ChartContainer>
        </KPIBreakdownRow>
      );
    }) ?? [];

  weatherSeries = getWeatherConfig(
    weather.primaryWeather.data,
    weather.secondaryWeather.data,
    initialWeatherView,
    theme,
    !isRealTimeEnabled
  );

  configWithWeather = chartConfigurations.kpiDetailBreakdownChartConfig(
    weatherSeries,
    'Weather',
    false,
    theme,
    isRealTimeEnabled
  );

  configWithWeather.legend = {
    enabled: false
  };

  const weatherChartRef = useRef(null);
  configWithWeather.tooltip = weatherUtils.getWeatherTooltip(
    theme,
    isRealTimeEnabled
  );

  return (
    <Container className={className} data-testid="detail-kpi-breakdown-graphs">
      {childNodes.length > 0 && childNodes}
      <KPIBreakdownRow>
        <WeatherLightning width="40px" height="40px" />
        <BreakdownName>Weather</BreakdownName>
        <ChartContainer>
          <HighchartsReact
            containerProps={{ style: { height: '100%', width: '100%' } }}
            constructorType="chart"
            highcharts={Highcharts}
            ref={weatherChartRef}
            options={configWithWeather}
          />
        </ChartContainer>
      </KPIBreakdownRow>
      <WeatherToggle
        chartRef={weatherChartRef}
        initialWeatherView={initialWeatherView}
      />
    </Container>
  );
});

DetailKpiBreakdownGraphs.propTypes = {
  className: PropTypes.string,
  comparisonBreakdown: PropTypes.object,
  comparisonDateRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  detailChart: PropTypes.object,
  isRealTimeEnabled: PropTypes.bool.isRequired,
  kpi: PropTypes.shape({
    isNegativeIndicator: PropTypes.bool,
    detail: PropTypes.shape({
      breakdown: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired
        })
      )
    })
  }).isRequired,
  primaryBreakdown: PropTypes.object,
  primaryDateRange: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string.isRequired
    })
  }),
  setIsZoomed: PropTypes.func.isRequired,
  weather: PropTypes.shape({
    primaryWeather: PropTypes.object.isRequired,
    secondaryWeather: PropTypes.object.isRequired,
    error: PropTypes.string
  }).isRequired
};

export default styled(DetailKpiBreakdownGraphs)``;
