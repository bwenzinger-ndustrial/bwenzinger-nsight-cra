import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import { useIsRealTimeEnabled } from '@ndustrial/nsight-common/hooks';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

import useFilteredBreakdown from '../../hooks/useFilteredBreakdown';
import DetailKpiBreakdownGraphs from './DetailKpiBreakdownGraphs';
import { DetailKpiBreakdownHeader as Header } from './DetailKpiBreakdownHeader';
import DetailKpiBreakdownTable from './DetailKpiBreakdownTable';

const Container = styled.div`
  width: 100%;
  ${DetailKpiBreakdownTable},
  ${DetailKpiBreakdownGraphs} {
    margin-top: 24px;
  }
`;

const Variance = styled.span`
  align-items: center;
`;

const WeatherVariance = styled.div`
  ${Variance} {
    &:last-child {
      margin-left: 15px;
    }
  }
`;

const propTypes = {
  comparisonDates: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  comparisonDetail: PropTypes.shape({
    breakdown: PropTypes.object
  }),
  detailChart: PropTypes.object,
  isChartZoomed: PropTypes.bool.isRequired,
  kpi: PropTypes.object,
  primaryDetail: PropTypes.shape({
    breakdown: PropTypes.object
  }),
  primaryDates: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  resetZoom: PropTypes.func.isRequired,
  setIsZoomed: PropTypes.func.isRequired,
  weather: PropTypes.shape({
    primaryWeather: PropTypes.object.isRequired,
    secondaryWeather: PropTypes.object.isRequired,
    error: PropTypes.string
  }).isRequired
};

function getVarianceDisplayValue(firstAverage, secondAverage) {
  if (
    !_.isNumber(firstAverage) ||
    !_.isNumber(secondAverage) ||
    isNaN(firstAverage) ||
    isNaN(secondAverage)
  ) {
    return '---';
  }

  const difference = firstAverage - secondAverage;

  if (difference === 0) return 0;

  const sign = difference > 0 ? '+' : '-';
  const variancePercent = commonChartUtils.getPercentChange(
    secondAverage,
    firstAverage,
    2
  );

  return `${sign}${Math.abs(variancePercent)}%`;
}

function getWeatherDisplayValue(value) {
  if (!value) {
    return '---';
  }
  return `${value}° F`;
}

function getDisplayValue(kpiBreakdown, breakdown) {
  let displayValue = '---';

  if (kpiBreakdown) {
    if (kpiBreakdown.error) {
      return 'Error';
    }

    if (breakdown.aggregateFunction === 'max') {
      displayValue = kpiBreakdown.records.length
        ? parseFloat(_.maxBy(kpiBreakdown.records, 'value').value)
        : '---';
    } else {
      displayValue = _.sumBy(kpiBreakdown.records, function(record) {
        return record.value ? parseFloat(record.value) : 0;
      });
    }
  }

  const formattedValue = Number.isFinite(displayValue)
    ? parseFloat(displayValue).toLocaleString(undefined, {
        minimumFractionDigits: breakdown.significantDigits,
        maximumFractionDigits: breakdown.significantDigits
      })
    : displayValue;

  return formattedValue;
}

export default function DetailKpiBreakdown(props) {
  const {
    comparisonDates,
    comparisonDetail: { breakdown: comparisonBreakdown },
    detailChart,
    isChartZoomed,
    kpi,
    primaryDates,
    primaryDetail: { breakdown: primaryBreakdown },
    resetZoom,
    setIsZoomed,
    weather
  } = props;

  const isRealTimeEnabled = useSelector(useIsRealTimeEnabled);

  const filteredBreakdown = useFilteredBreakdown(kpi.detail?.breakdown);

  const tableData = useMemo(() => {
    const detailBreakdownInfo = (kpi.detail && filteredBreakdown) || [];

    return detailBreakdownInfo.map((breakdown) => {
      const primary = primaryBreakdown && primaryBreakdown[breakdown.key];
      const comparison =
        comparisonBreakdown && comparisonBreakdown[breakdown.key];

      const primaryValue = getDisplayValue(primary, breakdown);
      const comparisonValue = getDisplayValue(comparison, breakdown);

      const primaryValueUnformatted = primaryValue.replace(/,/g, '');
      const comparisonValueUnformatted = comparisonValue.replace(/,/g, '');

      const changeDirection = commonChartUtils.getChangeDirection(
        parseFloat(primaryValue),
        parseFloat(comparisonValue),
        kpi.compareBy
      );

      const primaryData = primaryValue.toLocaleString();

      if (kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
        return {
          primary: { value: primaryData }
        };
      } else {
        return {
          primary: {
            value: primaryData,
            isEstimated: primary ? primary.isBreakdownEstimated : false
          },
          comparison: {
            value: comparisonValue.toLocaleString(),
            isEstimated: comparison ? comparison.isBreakdownEstimated : false
          },
          variance: (
            <Variance breakdown={breakdown} changeDirection={changeDirection}>
              {getVarianceDisplayValue(
                parseFloat(primaryValueUnformatted),
                parseFloat(comparisonValueUnformatted)
              )}
            </Variance>
          )
        };
      }
    });
  }, [kpi, filteredBreakdown, primaryBreakdown, comparisonBreakdown]);

  const tableDataWithWeather = useMemo(() => {
    const highTempVariance = getVarianceDisplayValue(
      parseFloat(weather.primaryWeather.details.avgHigh),
      parseFloat(weather.secondaryWeather.details.avgHigh)
    );

    const lowTempVariance = getVarianceDisplayValue(
      parseFloat(weather.primaryWeather.details.avgLow),
      parseFloat(weather.secondaryWeather.details.avgLow)
    );

    const primaryWeatherLabel = `High: ${getWeatherDisplayValue(
      weather.primaryWeather.details.avgHigh
    )}, Low: ${getWeatherDisplayValue(weather.primaryWeather.details.avgLow)}`;

    // kpi with compare by metric only get the primary weather label
    if (kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
      return [...tableData, { primary: { value: primaryWeatherLabel } }];
    }

    const tableDataRow = {
      primary: { value: primaryWeatherLabel },
      comparison: {
        value: `High: ${getWeatherDisplayValue(
          weather.secondaryWeather.details.avgHigh
        )}, Low: ${getWeatherDisplayValue(
          weather.secondaryWeather.details.avgLow
        )}`
      },
      variance: (
        <WeatherVariance>
          <Variance changeDirection="neutral">
            High: {highTempVariance}
          </Variance>
          <Variance changeDirection="neutral">Low: {lowTempVariance}</Variance>
        </WeatherVariance>
      )
    };

    return [...tableData, tableDataRow];
  }, [kpi, tableData, weather]);

  const [view, setView] = useState('table');

  return (
    <Container>
      <Header
        kpi={kpi}
        view={view}
        setView={setView}
        isZoomed={isChartZoomed}
        resetZoom={resetZoom}
        setIsZoomed={setIsZoomed}
      />
      {view === 'table' ? (
        <DetailKpiBreakdownTable
          comparisonDateRange={comparisonDates}
          isRealTimeEnabled={isRealTimeEnabled}
          kpi={kpi}
          primaryDateRange={primaryDates}
          tableData={tableDataWithWeather}
        />
      ) : (
        <DetailKpiBreakdownGraphs
          comparisonBreakdown={comparisonBreakdown}
          comparisonDateRange={comparisonDates}
          detailChart={detailChart}
          isRealTimeEnabled={isRealTimeEnabled}
          kpi={kpi}
          primaryBreakdown={primaryBreakdown}
          primaryDateRange={primaryDates}
          setIsZoomed={setIsZoomed}
          weather={weather}
        />
      )}
    </Container>
  );
}

DetailKpiBreakdown.propTypes = propTypes;
