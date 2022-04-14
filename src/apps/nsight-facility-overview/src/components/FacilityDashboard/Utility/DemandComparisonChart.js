import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { Card, TooltipIcon } from '@ndustrial/nsight-common/components';

import '../../../assets/tooltipOverride.css';

import DemandMenu from '../../DemandMenu';

require('highcharts/modules/no-data-to-display')(Highcharts);

const propTypes = {
  facilityId: PropTypes.number.isRequired,
  getUtilityDemandComparisonData: PropTypes.func.isRequired,
  utilityDemandComparison: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool,
    warning: PropTypes.string
  }).isRequired,
  utilityDemandSummary: PropTypes.shape({
    primaryTotal: PropTypes.number,
    comparisonTotal: PropTypes.number
  }),
  utilityDemandUnit: PropTypes.string
};

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: none;
  }
`;

const RightTooltip = styled(UnstyledTooltip)`
  display: none;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: inline-flex;
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

  ${RightTooltip} {
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

const StyledDisabledRightDemandMenu = styled(DemandMenu)`
  display: none;
  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: inline-flex;

    * {
      pointer-events: none;
      opacity: 0.8;
      color: ${({ theme }) => theme.colors.gray};
    }
  }
`;

const StyledDisabledCenterDemandMenu = styled(DemandMenu)`
  display: inline-flex;

  * {
    pointer-events: none;
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.gray};
  }

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: none;
  }
`;

function UtilityDemandComparisonChart({
  utilityDemandComparison: { chartOptions, error, hasData, isLoading, warning },
  utilityDemandSummary,
  utilityDemandUnit,
  facilityId,
  getUtilityDemandComparisonData
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    getUtilityDemandComparisonData(facilityId);
  }, [facilityId, getUtilityDemandComparisonData]);

  const utilityDemandUnitView = utilityDemandUnit
    ? `(${utilityDemandUnit})`
    : '';

  useEffect(() => {
    if (chartRef.current && !hasData) {
      chartRef.current.chart.hideNoData();
      chartRef.current.chart.showNoData('No data to display');
    } else if (chartRef.current && hasData) {
      chartRef.current.chart.hideNoData();
    }
  }, [hasData, isLoading]);

  const titleView = utilityDemandUnit === 'kwh' ? 'Usage' : 'Demand';

  return (
    <Card
      error={error}
      hasData={hasData}
      isLoading={isLoading}
      title={
        <Title>
          <p>
            {titleView} Comparison {utilityDemandUnitView}
          </p>
          <StyledDisabledCenterDemandMenu selectedDemandView="comparison" />
          <Tooltip
            content="Alternative graph views, such as Demand Heatmap, are not available
            to facilities that only have utility bill data."
            placement="top"
            tagName="span"
          >
            <TooltipIcon />
          </Tooltip>
        </Title>
      }
      warning={warning}
      renderRight={() => (
        <Title>
          <StyledDisabledRightDemandMenu
            disabled
            selectedDemandView="comparison"
          />
          <RightTooltip
            content="Alternative graph views, such as Demand Heatmap, are not available
                  to facilities that only have utility bill data."
            placement="top"
            tagName="span"
          >
            <TooltipIcon />
          </RightTooltip>
        </Title>
      )}
    >
      <HighchartsReact
        constructorType="stockChart"
        containerProps={{ style: { height: '100%', width: '100%' } }}
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    </Card>
  );
}

UtilityDemandComparisonChart.propTypes = propTypes;

export default UtilityDemandComparisonChart;
