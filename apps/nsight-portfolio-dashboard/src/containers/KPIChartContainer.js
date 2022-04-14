import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import ConfigFactory from '@ndustrial/nsight-common/charts/ConfigFactory';
import { getSelectedOrganization } from '@ndustrial/nsight-common/selectors';

import KPIChart from '../components/PortfolioDashboard/KPIChart';
import { getPortfolioKPIData } from '../redux/kpi/actions';

const propTypes = {
  kpiConfig: PropTypes.shape({
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    tooltip: PropTypes.string,
    label: PropTypes.string
  }).isRequired
};

function KPIChartContainer({ kpiConfig }) {
  const error = useSelector(
    (state) =>
      state.kpi[kpiConfig.monthly.key] && state.kpi[kpiConfig.monthly.key].error
  );
  const allKpiCharts = useSelector((state) => state.kpi);

  const theme = useSelector((state) => state.user && state.user.theme);

  const isLoading = useSelector(
    (state) =>
      state.kpi[kpiConfig.monthly.key] &&
      state.kpi[kpiConfig.monthly.key].isLoading
  );

  let primaryData;
  let secondaryData;

  if (allKpiCharts[kpiConfig.monthly.key]) {
    ({ primaryData, secondaryData } = allKpiCharts[kpiConfig.monthly.key]);
  }

  const comparisonRange = useMemo(() => {
    const today = moment();
    const rangeEnd = today
      .utc()
      .subtract(1, 'month')
      .endOf('month');
    const rangeStart = rangeEnd
      .clone()
      .subtract(11, 'months')
      .startOf('month');

    return {
      primaryRangeStart: rangeStart,
      primaryRangeEnd: rangeEnd,
      secondaryRangeStart: rangeStart.clone().subtract(1, 'year'),
      secondaryRangeEnd: rangeEnd.clone().subtract(1, 'year')
    };
  }, []);

  const chartConfig = useMemo(() => {
    if (kpiConfig && theme && !isLoading && primaryData && secondaryData) {
      const data = [];
      if (primaryData) data.push(primaryData);
      if (secondaryData) data.push(secondaryData);

      return ConfigFactory.getKpiChartConfig({
        data,
        metricConfig: kpiConfig,
        theme,
        primaryDates: {
          from: moment(comparisonRange.primaryRangeStart),
          to: moment(comparisonRange.primaryRangeEnd)
        },
        comparisonDates: {
          from: moment(comparisonRange.secondaryRangeStart),
          to: moment(comparisonRange.secondaryRangeEnd)
        },
        isRealTimeEnabled: false,
        useIndexForXAxisValue: false,
        isPortfolio: true
      });
    }

    return {};
  }, [
    kpiConfig,
    theme,
    isLoading,
    primaryData,
    secondaryData,
    comparisonRange.primaryRangeStart,
    comparisonRange.primaryRangeEnd,
    comparisonRange.secondaryRangeStart,
    comparisonRange.secondaryRangeEnd
  ]);

  const selectedOrganization = useSelector(getSelectedOrganization);
  const dispatch = useDispatch();

  useEffect(() => {
    const hasSelectedOrganization = !!selectedOrganization;
    const hasComparisonDates =
      comparisonRange.primaryRangeStart &&
      comparisonRange.primaryRangeEnd &&
      comparisonRange.secondaryRangeStart &&
      comparisonRange.secondaryRangeEnd;

    if (hasSelectedOrganization && hasComparisonDates) {
      dispatch(
        getPortfolioKPIData(selectedOrganization.id, kpiConfig, comparisonRange)
      );
    }
  }, [dispatch, selectedOrganization, kpiConfig, comparisonRange]);

  const onMenuItemClick = (downloadType, chart, title) => {
    chart.userOptions.chart.events.exportData(
      downloadType,
      chart,
      title,
      selectedOrganization.name
    );
  };

  return (
    <KPIChart
      onMenuItemClick={onMenuItemClick}
      selectedOrganization={selectedOrganization}
      title={kpiConfig.label}
      tooltip={kpiConfig.tooltip}
      kpiChart={chartConfig}
      error={error}
      isLoading={isLoading}
    />
  );
}

KPIChartContainer.propTypes = propTypes;

export default KPIChartContainer;
