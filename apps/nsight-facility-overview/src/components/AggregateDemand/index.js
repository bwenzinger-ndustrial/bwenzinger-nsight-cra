import React, { useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Card } from '@ndustrial/nsight-common/components';
import { useInterval } from '@ndustrial/nsight-common/hooks';

const GET_DATA_INTERVAL = 60000;

const propTypes = {
  aggregateDemand: PropTypes.shape({
    chartOptions: PropTypes.object.isRequired,
    error: PropTypes.string,
    hasData: PropTypes.bool,
    isLoading: PropTypes.bool,
    warning: PropTypes.string
  }).isRequired,
  currentDemand: PropTypes.shape({
    unit: PropTypes.string,
    value: PropTypes.number
  }),
  getAggregateDemandData: PropTypes.func.isRequired,
  facility: PropTypes.shape({
    id: PropTypes.number.isRequired,
    timezone: PropTypes.string.isRequired
  }),
  demandUnits: PropTypes.string
};

const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

function AggregateDemand({
  aggregateDemand: { chartOptions, error, hasData, isLoading, warning },
  currentDemand,
  facility,
  getAggregateDemandData,
  demandUnits
}) {
  const [updatedAt, setUpdatedAt] = useState();

  useEffect(() => {
    if (demandUnits) {
      getAggregateDemandData(facility, demandUnits);
    }
  }, [facility, demandUnits, getAggregateDemandData]);

  // this fetches aggregate data on a set interval
  useInterval(
    () => {
      if (demandUnits) {
        getAggregateDemandData(facility, demandUnits);
      }
    },
    GET_DATA_INTERVAL,
    [facility.id, demandUnits]
  );

  useEffect(() => {
    setUpdatedAt(new Date());
  }, [chartOptions]);

  const title = useMemo(() => {
    if (warning) {
      return 'Real Time Demand: ---';
    }

    if (currentDemand.value) {
      return `Real Time Demand: ${currentDemand.value} ${currentDemand.unit}`;
    }

    return 'Real Time Demand';
  }, [currentDemand, warning]);

  const aggregateDemandChart = React.createRef();
  const chartSubtitle = (
    <React.Fragment>
      <span>Last Updated: </span>
      <span>
        {DateTime.fromJSDate(new Date(updatedAt), {
          zone: facility.timezone
        }).toFormat('MMM dd, yyyy hh:mm ZZZZ')}
      </span>
    </React.Fragment>
  );

  return (
    <Card
      error={error}
      hasData={hasData}
      isLoading={isLoading}
      subtitle={chartSubtitle}
      title={title}
      warning={warning}
    >
      <ChartContainer>
        <HighchartsReact
          containerProps={{ style: { flex: 1 } }}
          constructorType={'chart'}
          highcharts={Highcharts}
          options={chartOptions}
          ref={aggregateDemandChart}
        />
      </ChartContainer>
    </Card>
  );
}

AggregateDemand.propTypes = propTypes;

export default AggregateDemand;
