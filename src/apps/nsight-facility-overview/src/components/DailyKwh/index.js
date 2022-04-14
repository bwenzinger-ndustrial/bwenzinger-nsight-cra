import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { Card, TooltipIcon } from '@ndustrial/nsight-common/components';

import { OVERVIEW_METRICS } from '../../constants';
import DemandMenu from '../DemandMenu';

const propTypes = {
  dailyKey: PropTypes.string.isRequired,
  dailyKwh: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  selectedDemandView: PropTypes.string.isRequired,
  setDemandView: PropTypes.func.isRequired
};

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  padding-left: calc(1em + 10px);

  ${Tooltip} {
    margin-left: 10px;
  }
`;

const StyledRightDemandMenu = styled(DemandMenu)`
  display: none;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: inline-flex;
  }
`;

function DailyKwh({
  dailyKey,
  dailyKwh: { chartOptions, error, hasData, isLoading },
  selectedDemandView,
  setDemandView
}) {
  const dailyKwhChart = React.createRef();

  const tooltipContent = OVERVIEW_METRICS.find(
    (item) => item.dailyKey === dailyKey
  );

  return (
    <Card
      error={error}
      hasData={hasData}
      isLoading={isLoading}
      renderRight={() => (
        <StyledRightDemandMenu
          selectedDemandView={selectedDemandView}
          setDemandView={setDemandView}
        />
      )}
      title={
        <Title>
          Daily kWh
          <Tooltip
            content={tooltipContent.tooltip}
            placement="top"
            tagName="span"
          >
            <TooltipIcon />
          </Tooltip>
        </Title>
      }
    >
      <HighchartsReact
        containerProps={{ style: { height: '100%', width: '100%' } }}
        constructorType={'chart'}
        highcharts={Highcharts}
        options={chartOptions}
        ref={dailyKwhChart}
      />
    </Card>
  );
}

DailyKwh.propTypes = propTypes;

export default DailyKwh;
