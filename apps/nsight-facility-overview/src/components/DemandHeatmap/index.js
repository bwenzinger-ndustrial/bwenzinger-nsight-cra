import React, { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { Card, TooltipIcon } from '@ndustrial/nsight-common/components';
import { useQueryParams } from '@ndustrial/nsight-common/hooks';
import {
  createChartFactory,
  getSearchString
} from '@ndustrial/nsight-common/utils';

import DemandMenu from '../DemandMenu';
import { DemandHeatmapHeader as Header } from './DemandHeatmapHeader';

const DemandHeatmapHeader = styled(Header)``;

const propTypes = {
  dailyHeatmapDemand: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool,
    warning: PropTypes.string
  }),
  facility: PropTypes.shape({
    id: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  selectedDemandView: PropTypes.string.isRequired,
  setDemandView: PropTypes.func.isRequired,
  weeklyHeatmapDemand: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool,
    warning: PropTypes.string
  })
};

const DailyChart = createChartFactory('daily', '40px');
const WeeklyChart = createChartFactory('weekly', '40px');

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
  margin-top: -4px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    margin-top: 0;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-left: calc(1em + 10px);

  ${Tooltip} {
    margin-left: 10px;
    align-self: center;
  }

  p {
    display: none;

    @media screen and (min-width: 897px) and (orientation: landscape),
      screen and (min-width: 768px) and (orientation: portrait) {
      display: contents;
    }
  }
`;

const StyledRightDemandMenu = styled(DemandMenu)`
  display: none;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: inline-flex;
  }
`;

const StyledCenterDemandMenu = styled(DemandMenu)`
  display: inline-flex;
  margin-bottom: 8px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: none;
  }
`;

function DemandHeatmap({
  dailyHeatmapDemand,
  facility,
  history,
  selectedDemandView,
  setDemandView,
  weeklyHeatmapDemand
}) {
  const [view, setView] = useState('weekly');

  const currentDate = DateTime.fromJSDate(new Date(), {
    zone: facility.timezone
  });

  const chartSubtitle = `${currentDate
    .minus({ days: 30 })
    .toFormat('MMM dd')} - ${currentDate.toFormat('MMM dd')}`;

  const viewData = view === 'weekly' ? weeklyHeatmapDemand : dailyHeatmapDemand;
  const queryParams = useQueryParams();

  const setHeatmapTab = useCallback(
    (value) => {
      setView(value);

      const searchOptions = {
        addParams: {
          heatmap: value
        },
        searchString: history.location.search
      };
      const search = getSearchString(searchOptions);
      history.push({ search });
    },
    [history]
  );

  useEffect(() => {
    if (!queryParams.heatmap) {
      setHeatmapTab(view);
    }
  }, [view]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card
      error={viewData.error}
      hasData={viewData.hasData}
      isLoading={viewData.isLoading}
      subtitle={chartSubtitle}
      title={
        <Title>
          <p>Demand Heatmap</p>
          <StyledCenterDemandMenu
            selectedDemandView={selectedDemandView}
            setDemandView={setDemandView}
          />
          <Tooltip
            content="Using a rolling average of the previous four weeks, this chart allows you to examine your facility's demand trends over time."
            placement="top"
            tagName="span"
          >
            <TooltipIcon />
          </Tooltip>
        </Title>
      }
      renderRight={() => (
        <StyledRightDemandMenu
          selectedDemandView={selectedDemandView}
          setDemandView={setDemandView}
        />
      )}
    >
      <DemandHeatmapHeader view={view} setHeatmapTab={setHeatmapTab} />
      {view === 'daily' ? (
        <DailyChart chartOptions={viewData.chartOptions} />
      ) : (
        <WeeklyChart chartOptions={viewData.chartOptions} />
      )}
    </Card>
  );
}

DemandHeatmap.propTypes = propTypes;

export default DemandHeatmap;
