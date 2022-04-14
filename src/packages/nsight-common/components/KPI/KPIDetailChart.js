import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';

import ConfigFactory from '../../charts/ConfigFactory';

require('highcharts/modules/no-data-to-display')(Highcharts);

const propTypes = {
  hasNoData: PropTypes.bool,
  setDetailChart: PropTypes.func,
  primaryData: PropTypes.shape({
    values: PropTypes.array
  }),
  secondaryData: PropTypes.shape({
    values: PropTypes.array
  }),
  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }),
  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }),
  kpiConfig: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    label: PropTypes.string,
    id: PropTypes.string,
    interval: PropTypes.number,
    compareBy: PropTypes.string
  }),
  isRealTimeEnabled: PropTypes.bool,
  useIndexForXAxisValue: PropTypes.bool,
  isPortfolio: PropTypes.bool
};

function KPIDetailChart({
  primaryData,
  secondaryData,
  primaryDates,
  comparisonDates,
  hasNoData,
  setDetailChart,
  kpiConfig,
  isRealTimeEnabled = false,
  useIndexForXAxisValue = false,
  isPortfolio = false
}) {
  const chartRef = useRef(null);
  const theme = useSelector((state) => state.user && state.user.theme);

  if (chartRef.current && hasNoData) {
    chartRef.current.chart.hideNoData();
    chartRef.current.chart.showNoData('No data for the specific time range');
  }

  useEffect(() => {
    // after charts get unmounted from the dom, Highcharts.charts gets filled with `undefined` items in the array
    // this causes issues so need to filter those out to only contain the detail chart
    const detailChart = commonChartUtils.getActiveCharts(Highcharts.charts);
    setDetailChart(detailChart);
  }, [setDetailChart]);

  const chartConfig = useMemo(() => {
    if (kpiConfig) {
      const primary = primaryData ? { ...primaryData } : {};
      const secondary = secondaryData ? { ...secondaryData } : {};

      return ConfigFactory.getKpiChartConfig({
        data: [primary, secondary],
        metricConfig: kpiConfig,
        theme,
        primaryDates,
        comparisonDates,
        isRealTimeEnabled,
        useIndexForXAxisValue,
        isPortfolio
      });
    }
  }, [
    kpiConfig,
    primaryData,
    secondaryData,
    theme,
    primaryDates,
    comparisonDates,
    isRealTimeEnabled,
    useIndexForXAxisValue,
    isPortfolio
  ]);

  return (
    <Fragment>
      <HighchartsReact
        constructorType="stockChart"
        containerProps={{ style: { height: '350px', width: '100%' } }}
        highcharts={Highcharts}
        options={chartConfig}
        ref={chartRef}
      />
    </Fragment>
  );
}

KPIDetailChart.propTypes = propTypes;

export default KPIDetailChart;
