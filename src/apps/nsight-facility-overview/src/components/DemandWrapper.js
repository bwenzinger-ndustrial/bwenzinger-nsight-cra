import React, { Fragment, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useInterval, useQueryParams } from '@ndustrial/nsight-common/hooks';
import { getSearchString } from '@ndustrial/nsight-common/utils';

import DailyKwh from './DailyKwh';
import DemandHeatmap from './DemandHeatmap';
import DemandComparisonChart from './FacilityDashboard/Realtime/DemandComparisonChart';

const GET_DATA_INTERVAL = 900000;

const propTypes = {
  dailyKwh: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    hasData: PropTypes.any
  }),
  dailyHeatmapDemand: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    hasData: PropTypes.any
  }),
  demandComparison: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool,
    warning: PropTypes.string
  }).isRequired,
  facility: PropTypes.shape({
    id: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired
  }),
  getDailyKwhData: PropTypes.func.isRequired,
  getDemandComparisonData: PropTypes.func.isRequired,
  getHeatmapData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  selectedDemandView: PropTypes.string,
  weeklyHeatmapDemand: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    hasData: PropTypes.any
  }),
  demandUnits: PropTypes.string
};

function DemandWrapper({
  dailyKwh,
  dailyHeatmapDemand,
  demandComparison,
  facility,
  getDailyKwhData,
  getDemandComparisonData,
  getHeatmapData,
  history,
  selectedDemandView,
  weeklyHeatmapDemand,
  demandUnits
}) {
  const daily_kwh_key = 'facility_daily_electricity_usage';

  useEffect(() => {
    if (demandUnits) {
      getDemandComparisonData(facility, demandUnits);
    }
  }, [facility, demandUnits, getDemandComparisonData]);

  useInterval(
    () => {
      if (demandUnits) {
        getDemandComparisonData(facility, demandUnits);
      }
    },
    GET_DATA_INTERVAL,
    [facility, demandUnits, getDemandComparisonData]
  );

  useEffect(() => {
    if (demandUnits) {
      getHeatmapData(facility, demandUnits);
    }
  }, [facility, demandUnits, getHeatmapData]);

  useEffect(() => {
    getDailyKwhData(facility, daily_kwh_key);
  }, [facility, getDailyKwhData, daily_kwh_key]);

  useInterval(
    () => {
      if (demandUnits) {
        getHeatmapData(facility, demandUnits);
      }
    },
    GET_DATA_INTERVAL,
    [facility, demandUnits, getHeatmapData]
  );

  const queryParams = useQueryParams();
  const defaultDemandView = 'comparison';

  const setDemandView = useCallback(
    (value) => {
      const searchOptions = {
        addParams: {
          demandView: value
        },
        searchString: history.location.search
      };
      const search = getSearchString(searchOptions);
      history.push({ search });
    },
    [history]
  );

  useEffect(() => {
    if (!queryParams.demandView) {
      setDemandView(defaultDemandView);
    }
  }, [defaultDemandView, queryParams.demandView]); // eslint-disable-line react-hooks/exhaustive-deps

  const showChart = (selectedDemandView) => {
    if (selectedDemandView === 'comparison') {
      return (
        <DemandComparisonChart
          demandComparison={demandComparison}
          facility={facility}
          selectedDemandView={selectedDemandView || defaultDemandView}
          setDemandView={setDemandView}
          demandUnits={demandUnits}
        />
      );
    } else if (selectedDemandView === 'heatmap') {
      return (
        <DemandHeatmap
          dailyHeatmapDemand={dailyHeatmapDemand}
          facility={facility}
          history={history}
          selectedDemandView={selectedDemandView || defaultDemandView}
          setDemandView={setDemandView}
          weeklyHeatmapDemand={weeklyHeatmapDemand}
        />
      );
    } else {
      return (
        <DailyKwh
          dailyKwh={dailyKwh}
          facility={facility}
          dailyKey={daily_kwh_key}
          history={history}
          selectedDemandView={selectedDemandView || defaultDemandView}
          setDemandView={setDemandView}
        />
      );
    }
  };

  return <Fragment>{showChart(selectedDemandView)}</Fragment>;
}

DemandWrapper.propTypes = propTypes;

export default withRouter(DemandWrapper);
