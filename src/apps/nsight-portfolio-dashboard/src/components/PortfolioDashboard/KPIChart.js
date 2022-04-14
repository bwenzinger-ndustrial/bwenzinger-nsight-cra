import React, { useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MenuItem } from '@ndustrial/nd-menu-button-react';
import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import {
  Card,
  CardOptionsMenu,
  TooltipIcon
} from '@ndustrial/nsight-common/components';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);

const Tooltip = styled(UnstyledTooltip)`
  position: absolute;
  right: 10px;
  top: 10px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    position: static;
    right: 0;
    top: 0;
  }
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  padding-left: calc(1em + 10px);

  ${Tooltip} {
    margin-left: 10px;
  }
`;

const propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  kpiChart: PropTypes.shape({
    chartOptions: PropTypes.object
  }),
  onMenuItemClick: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired
};

const KPIChart = function(props) {
  const {
    className,
    error,
    kpiChart = {},
    isLoading,
    onMenuItemClick,
    subtitle,
    title,
    tooltip
  } = props;
  const chartComponent = useRef(null);

  return (
    <Card
      className={className}
      error={error}
      isLoading={isLoading}
      subtitle={subtitle}
      title={
        <Title>
          {title}
          <Tooltip content={tooltip} placement="right" tagName="span">
            <TooltipIcon />
          </Tooltip>
        </Title>
      }
      renderRight={() => (
        <CardOptionsMenu>
          <MenuItem
            onClick={() =>
              onMenuItemClick(
                'estimated_csv',
                chartComponent.current.chart,
                title
              )
            }
          >
            Download as CSV
          </MenuItem>
          <MenuItem
            onClick={() =>
              onMenuItemClick('jpg', chartComponent.current.chart, title)
            }
          >
            Download as JPG
          </MenuItem>
        </CardOptionsMenu>
      )}
    >
      <HighchartsReact
        constructorType="stockChart"
        containerProps={{ style: { height: '100%', width: '100%' } }}
        highcharts={Highcharts}
        options={kpiChart}
        ref={chartComponent}
      />
    </Card>
  );
};

KPIChart.propTypes = propTypes;

export default KPIChart;
