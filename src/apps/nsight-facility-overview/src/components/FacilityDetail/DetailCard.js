import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SecondaryButton } from '@ndustrial/nd-button-react';
import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';
import {
  DetailCardDivider,
  TooltipIcon
} from '@ndustrial/nsight-common/components';
import Card, { Content, Title } from '@ndustrial/nsight-common/components/Card';
import KpiSummary from '@ndustrial/nsight-common/components/KPI/KpiSummary/KpiSummary';
import TopKpiSummary from '@ndustrial/nsight-common/components/KPI/TopKpiSummary/TopKpiSummary';
import { useKpiWindow } from '@ndustrial/nsight-common/hooks';
import {
  KPI_ICON_HASH,
  kpiEnums
} from '@ndustrial/nsight-common/kpi-config/constants';
import { expressionParser } from '@ndustrial/nsight-common/utils';

import KPIDetailChartContainer from '../../containers/KPIDetailChartContainer';
import DetailKpiBreakdown from '../FacilityDetail/DetailKpiBreakdown';

const defaultProps = {
  comparisonDetail: {
    breakdown: {},
    chartData: []
  },
  primaryDetail: {
    breakdown: {},
    chartData: []
  }
};

const propTypes = {
  kpiWindow: PropTypes.string,
  comparisonDates: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  comparisonDetail: PropTypes.object,
  error: PropTypes.string,
  primaryDates: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date)
  }),
  primaryDetail: PropTypes.object,
  warning: PropTypes.string,
  weather: PropTypes.shape({
    primaryWeather: PropTypes.object.isRequired,
    secondaryWeather: PropTypes.object.isRequired,
    error: PropTypes.string
  }).isRequired,
  kpiConfig: PropTypes.shape({
    tooltip: PropTypes.string.isRequired,
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired
  })
};

const KPI_ICONS = Object.keys(KPI_ICON_HASH).reduce((memo, key) => {
  memo[key] = styled(KPI_ICON_HASH[key])`
    height: 40px;
    width: 40px;
  `;

  return memo;
}, {});

// NOTE: This map/join looks a little funky -- it works via the `toString`
// method implemented on every styled-component
const StyledCard = styled(Card)`
  ${Object.keys(KPI_ICONS)
    .map((key) => KPI_ICONS[key])
    .join(',')} {
    @media screen and (min-width: 897px) and (orientation: landscape),
      screen and (min-width: 768px) and (orientation: portrait) {
      margin-left: 20px;
    }
  }
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
`;

// this is to center the title text accounting for the tooltip icon
const StyledCardTitle = styled(Title)`
  ${Tooltip} {
    margin-left: 10px;
  }
`;

const StyledKpiSummary = styled(KpiSummary)`
  flex-basis: 300px;
`;

const StyledTopKpiSummary = styled(TopKpiSummary)`
  display: flex;
  flex-direction: column;
  height: 100px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
  }
`;

const CardContent = styled(Content)`
  flex-direction: column;
  overflow: hidden;

  ${StyledKpiSummary} {
    margin-right: 20px;
  }
`;

const CardTop = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    flex-direction: row;
  }
`;

const CardBottom = styled.div`
  display: flex;
`;

const StyledChartContainer = styled(KPIDetailChartContainer)`
  height: 350px;
`;

const ResetZoomButton = styled(SecondaryButton)`
  position: absolute;
  right: 18px;
  margin-right: 12px;
  font-weight: normal;
  font-size: 12px;
  padding: 8px 30px;
`;

function parseBreakdown(formula, breakdown, kpi, isPrimaryValue) {
  const customKeys = {
    end_date: (key) => breakdown[key]
  };

  if (kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    const metric = isPrimaryValue ? kpi.primaryMetric : kpi.comparisonMetric;

    // NOTE: There are currently no aggregate function definitions for the
    //  primary and comparison metrics.  We might need to define them as we
    //  further define metric/kpi configurations.  For now we just sum them
    //  up as the the only compare by metric kpi is budget

    if (!breakdown[metric] || !breakdown[metric].records) {
      return null;
    }

    return breakdown[metric].records.reduce(
      (acc, record) => acc + Number(record.value),
      0
    );
  }

  const breakdownKeys = Object.keys(breakdown);
  const filteredKeys = breakdownKeys.filter(
    (key) => Object.keys(customKeys).indexOf(key) < 0
  );
  if (!breakdownKeys.length || !formula || !filteredKeys.length) {
    return;
  }

  const getValues = (key) => {
    if (customKeys[key]) {
      return customKeys[key](key);
    }
    return breakdown[key].records.map((record) => Number(record.value));
  };

  const variables = breakdownKeys.reduce((memo, key) => {
    memo[key] = getValues(key);
    return memo;
  }, {});

  return expressionParser.evaluate(formula, variables);
}

function setMetricLabel(kpi, isPrimaryValue) {
  if (kpi.compareBy === kpiEnums.COMPARE_BY_TYPES.METRIC) {
    let metric = isPrimaryValue ? kpi.primaryMetric : kpi.comparisonMetric;

    if (metric === 'facility_daily_rolling_month_cuml_kwh_budget') {
      metric = 'facility_daily_kwh_budget';
    }
    if (metric === 'facility_monthly_electricity_usage') {
      metric = 'facility_daily_electricity_usage';
    }
  }
}

function DetailCard({
  comparisonDates,
  comparisonDetail,
  error,
  primaryDates,
  primaryDetail,
  warning,
  weather,
  kpiConfig
}) {
  const Icon = KPI_ICONS[kpiConfig.icon];

  const [detailChart, setDetailChart] = useState([]);
  const [isChartZoomed, setIsZoomed] = useState(false);

  const kpiWindow = useKpiWindow(kpiConfig);

  // TODO: add new config prop instead of checking here?
  const showTopSummary = kpiConfig.slug === 'kwh-budget';

  useEffect(() => {
    Highcharts.charts.push(detailChart[0]);
    let detailChartExtremes = null;

    if (detailChart && detailChart[0]) {
      detailChartExtremes = detailChart[0].xAxis[0].getExtremes();
    }

    commonChartUtils.syncChartEvents(
      Highcharts.charts,
      setIsZoomed,
      detailChartExtremes
    );

    return function cleanup() {
      Highcharts.charts.pop();
    };
  }, [detailChart]);

  const activeCharts = commonChartUtils.getActiveCharts(Highcharts.charts);

  function resetZoom() {
    activeCharts.forEach((chart) => {
      if (chart && chart.xAxis) {
        chart.xAxis[0].setExtremes();
      }
    });
    setIsZoomed(false);
  }

  // This sets a custom parameter for use in calculation of a kpi formula
  if (
    primaryDates &&
    primaryDates.to &&
    primaryDetail &&
    primaryDetail.breakdown
  ) {
    primaryDetail.breakdown.end_date = moment(primaryDates.to);
  }

  if (
    comparisonDates &&
    comparisonDates.to &&
    comparisonDetail &&
    comparisonDetail.breakdown
  ) {
    comparisonDetail.breakdown.end_date = moment(comparisonDates.to);
  }

  const primaryValue = useMemo(() => {
    if (primaryDetail && primaryDetail.breakdown) {
      setMetricLabel(kpiConfig, true);
      return parseBreakdown(
        kpiConfig.daily.formula,
        primaryDetail.breakdown,
        kpiConfig,
        true
      );
    } else {
      return undefined;
    }
  }, [primaryDetail.breakdown, kpiConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  const comparisonValue = useMemo(() => {
    if (comparisonDetail && comparisonDetail.breakdown) {
      setMetricLabel(kpiConfig);
      return parseBreakdown(
        kpiConfig.daily.formula,
        comparisonDetail.breakdown,
        kpiConfig
      );
    } else {
      return undefined;
    }
  }, [comparisonDetail.breakdown, kpiConfig]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledCard
      error={error}
      isDraggable
      isFullHeight
      title={
        <StyledCardTitle>
          {kpiConfig.label}
          {kpiConfig.tooltip && (
            <Tooltip
              content={kpiConfig.tooltip}
              placement="right"
              tagName="span"
            >
              <TooltipIcon />
            </Tooltip>
          )}

          {isChartZoomed && (
            <ResetZoomButton onClick={resetZoom}>Reset Zoom</ResetZoomButton>
          )}
        </StyledCardTitle>
      }
      renderLeft={() => <Icon />}
      warning={warning}
    >
      <CardContent>
        {showTopSummary && (
          <StyledTopKpiSummary
            kpi={kpiConfig}
            primaryDates={primaryDates}
            primaryDetail={primaryDetail}
            additionalMetrics={primaryDetail.additionalMetrics}
          />
        )}
        <CardTop>
          {!showTopSummary && (
            <StyledKpiSummary
              kpiWindow={kpiWindow}
              kpi={kpiConfig}
              comparisonDates={comparisonDates}
              primaryDates={primaryDates}
              primaryValue={primaryValue}
              comparisonValue={comparisonValue}
            />
          )}
          <StyledChartContainer
            kpiConfig={kpiConfig}
            detailChart={detailChart}
            isChartZoomed={isChartZoomed}
            resetZoom={resetZoom}
            setDetailChart={setDetailChart}
            setIsZoomed={setIsZoomed}
            weather={weather}
          />
        </CardTop>

        {!error && (
          <Fragment>
            <DetailCardDivider warning={warning} />
            <CardBottom>
              <DetailKpiBreakdown
                comparisonDates={comparisonDates}
                comparisonDetail={comparisonDetail}
                detailChart={detailChart[0]}
                isChartZoomed={isChartZoomed}
                kpi={kpiConfig}
                primaryDates={primaryDates}
                primaryDetail={primaryDetail}
                resetZoom={resetZoom}
                setIsZoomed={setIsZoomed}
                weather={weather}
              />
            </CardBottom>
          </Fragment>
        )}
      </CardContent>
    </StyledCard>
  );
}

DetailCard.propTypes = propTypes;
DetailCard.defaultProps = defaultProps;

export default DetailCard;
