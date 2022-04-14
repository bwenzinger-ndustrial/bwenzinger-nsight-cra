import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { Card, TooltipIcon } from '@ndustrial/nsight-common/components';

const propTypes = {
  blendedRate: PropTypes.shape({
    blendedRateAverage: PropTypes.object.isRequired,
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool
  }).isRequired,
  getBlendedRateData: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }),
  selectedFacility: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
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

function BlendedRate({
  blendedRate: { chartOptions, error, hasData, isLoading },
  getBlendedRateData,
  selectedFacility
}) {
  const blendedRateChart = React.createRef();

  useEffect(() => {
    getBlendedRateData(selectedFacility.id);
  }, [selectedFacility, getBlendedRateData]);

  return (
    <Card
      error={error}
      hasData={hasData}
      isLoading={isLoading}
      subtitle={'Energy Spend / kWh'}
      title={
        <Title>
          Blended Rate
          <Tooltip
            content="An averaged kWh rate (in USD) for your facility. This is calculated by dividing the monthly bill by the total kWh consumed."
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
        ref={blendedRateChart}
      />
    </Card>
  );
}

BlendedRate.propTypes = propTypes;

export default BlendedRate;
