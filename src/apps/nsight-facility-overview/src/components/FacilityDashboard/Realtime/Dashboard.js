import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { KPICardContainer } from '@ndustrial/nsight-common/containers';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import {
  getFacilityConfigs,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import AggregateDemandContainer from '../../../containers/AggregateDemandContainer';
import BlendedRateContainer from '../../../containers/BlendedRateContainer';
import DemandWrapperContainer from '../../../containers/DemandWrapperContainer';
import EventFeedContainer from '../../../containers/EventFeedContainer';

const ContainerDiv = styled.div`
  background-color: #e3e3e3;
  padding: 10px;
  flex: 1;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
  width: calc(100% + 10px);
`;

const GridItem = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 5px;
`;

const KPIWrapper = styled(GridItem)`
  flex-basis: 50%;
  max-width: 50%;

  @media screen and (min-width: 1200px) {
    flex-basis: 25%;
    max-width: 25%;
  }
`;

const DemandWrapper = styled(GridItem)`
  flex-basis: 100%;
  max-width: 100%;
`;

const SmallChartContainer = styled(GridItem)`
  flex-basis: 100%;
  max-width: 100%;

  @media screen and (min-width: 897px) {
    flex-basis: 33.333333%;
    max-width: 33.333333%;
  }
`;

/**
 * one of the main differences between Realtime and Utility dashboard is the range used to fetch
 * data.  See the chartWindow value for KPICardContainer
 */

// TODO: set the range value in the url so we don't need to rely on kpi labels and complicated
//  selectors/hooks to figure it out
const RealTimeFacilityDashboard = () => {
  const allConfigs = useSelector(getFacilityConfigs);
  const selectedFacility = useSelector(getSelectedFacility);

  return (
    <ContainerDiv>
      <GridContainer>
        {allConfigs.map((config) => (
          <KPIWrapper key={config.id}>
            <KPICardContainer
              kpiConfig={config}
              id={selectedFacility.id}
              chartWindow={kpiEnums.CHART_DISPLAY_WINDOWS.MONTH}
              urlParamsToRemoveOnNavigate={[
                'demandView',
                'heatmap',
                'dailyKwh'
              ]}
            />
          </KPIWrapper>
        ))}

        <DemandWrapper>
          <DemandWrapperContainer />
        </DemandWrapper>
        <SmallChartContainer>
          <AggregateDemandContainer />
        </SmallChartContainer>
        <SmallChartContainer>
          <BlendedRateContainer />
        </SmallChartContainer>
        <SmallChartContainer>
          <EventFeedContainer />
        </SmallChartContainer>
      </GridContainer>
    </ContainerDiv>
  );
};

export default RealTimeFacilityDashboard;
