import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as kpiCardActions from '../actions/kpiCardActions';
import KPICard from '../components/KPI/KPICard';
import { useInterval, useKpiCardDateRanges, useKpiWindow } from '../hooks';
import { KPI_ICON_HASH, kpiEnums } from '../kpi-config/constants';
import { getKpiCardFactory, getKpiCardLoadingStatus } from '../selectors';
import { getSearchString } from '../utils';

const propTypes = {
  kpiConfig: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    compareBy: PropTypes.string,
    label: PropTypes.string,
    daily: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    monthly: PropTypes.shape({
      key: PropTypes.string.isRequired,
      formula: PropTypes.string.isRequired
    }),
    primaryMetric: PropTypes.string,
    significantDigits: PropTypes.number,
    interval: PropTypes.number,
    icon: PropTypes.string.isRequired
  }),
  urlParamsToRemoveOnNavigate: PropTypes.arrayOf(PropTypes.string),
  chartWindow: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isPortfolio: PropTypes.bool
};

// TODO, chartWindow is a display window for the chart, not the window we use to
//  fetch the data
function KpiCardContainer(props) {
  const {
    kpiConfig,
    urlParamsToRemoveOnNavigate,
    id,
    chartWindow = kpiEnums.CHART_DISPLAY_WINDOWS.MONTH
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // Determine which window we need to display in the detail chart for this kpi
  const configBasedKpiChartWindow = useKpiWindow(kpiConfig);

  const isLoading = useSelector(
    (state) =>
      !kpiConfig || getKpiCardLoadingStatus(state, kpiConfig.monthly.key)
  );

  const { monthRange, annualRange } = useKpiCardDateRanges();

  const kpiCardData = useSelector(
    useMemo(() => getKpiCardFactory(kpiConfig), [kpiConfig])
  );

  useEffect(() => {
    dispatch(kpiCardActions.getKpiCardData(id, kpiConfig, monthRange));
  }, [dispatch, id, kpiConfig, monthRange]);

  // this fetches kpi data on a set interval
  useInterval(
    () => dispatch(kpiCardActions.getKpiCardData(id, kpiConfig, monthRange)),
    kpiConfig.interval,
    [id, kpiConfig, monthRange]
  );

  const chartRange =
    chartWindow === kpiEnums.CHART_DISPLAY_WINDOWS.YEAR
      ? annualRange
      : monthRange;

  const onKpiClick = useCallback(() => {
    const {
      primaryRangeStart,
      primaryRangeEnd,
      secondaryRangeStart
    } = chartRange;

    const search = getSearchString({
      searchString: location.search,
      addParams: {
        metric: kpiConfig.slug,
        primaryStart: primaryRangeStart.format('YYYY-MM-DD'),
        primaryEnd: primaryRangeEnd.format('YYYY-MM-DD'),
        comparisonStart: secondaryRangeStart.format('YYYY-MM-DD')
      },
      removeParams: urlParamsToRemoveOnNavigate
    });

    history.push({
      pathname: `${location.pathname}/detail`,
      search
    });
  }, [
    history,
    location.pathname,
    location.search,
    kpiConfig.slug,
    chartRange,
    urlParamsToRemoveOnNavigate
  ]);

  return (
    <KPICard
      kpiWindow={configBasedKpiChartWindow}
      kpiConfig={kpiConfig}
      {...kpiCardData}
      isLoading={isLoading}
      KPIIcon={KPI_ICON_HASH[kpiConfig.icon]}
      onKpiClick={onKpiClick}
    />
  );
}

KpiCardContainer.propTypes = propTypes;

export default KpiCardContainer;
