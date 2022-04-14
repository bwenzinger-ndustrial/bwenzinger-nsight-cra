import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card } from '@ndustrial/nsight-common/components';

import '../../../assets/tooltipOverride.css';

import DemandMenu from '../../DemandMenu';

require('highcharts/modules/no-data-to-display')(Highcharts);

const propTypes = {
  demandComparison: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool,
    warning: PropTypes.string
  }).isRequired,
  selectedDemandView: PropTypes.string,
  setDemandView: PropTypes.func,
  demandUnits: PropTypes.string
};

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-left: calc(1em + 10px);

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

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    display: none;
  }
`;

function DemandComparisonChart({
  demandComparison: { chartOptions, error, hasData, isLoading, warning },
  selectedDemandView,
  setDemandView,
  demandUnits
}) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && !hasData) {
      chartRef.current.chart.hideNoData();
      chartRef.current.chart.showNoData('No data to display');
    } else if (chartRef.current && hasData) {
      chartRef.current.chart.hideNoData();
    }
  }, [hasData, isLoading]);

  return (
    <Card
      error={error}
      hasData={hasData}
      isLoading={isLoading}
      title={
        <Title>
          <p>Demand Comparison {demandUnits ? `(${demandUnits})` : ''}</p>
          <StyledCenterDemandMenu
            selectedDemandView={selectedDemandView}
            setDemandView={setDemandView}
          />
        </Title>
      }
      warning={warning}
      renderRight={() => (
        <StyledRightDemandMenu
          selectedDemandView={selectedDemandView}
          setDemandView={setDemandView}
        />
      )}
    >
      <HighchartsReact
        constructorType="chart"
        containerProps={{
          style: { height: '100%', width: '100%', marginTop: '0px' }
        }}
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    </Card>
  );
}

DemandComparisonChart.propTypes = propTypes;

export default DemandComparisonChart;
