import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { FeaturePlaceholder } from '@ndustrial/nsight-common/components';
import { KPICardContainer } from '@ndustrial/nsight-common/containers';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';
import {
  getFacilityConfigs,
  getFeedsWithStatuses,
  getSelectedFacility
} from '@ndustrial/nsight-common/selectors';

import eventFeedPlaceholder from '../../../assets/event-feed-placeholder.png';
import realtimePlaceholder from '../../../assets/realtime-placeholder.png';
import BlendedRateContainer from '../../../containers/BlendedRateContainer';
import EventFeedContainer from '../../../containers/EventFeedContainer';
import UtilityDemandChartContainer from '../../../containers/UtilityDemandChartContainer';

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

const UtilityComparisonWrapper = styled(GridItem)`
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

const KPIWrapper = styled(GridItem)`
  flex-basis: 50%;
  max-width: 50%;

  @media screen and (min-width: 1200px) {
    flex-basis: 25%;
    max-width: 25%;
  }
`;

/**
 * one of the main differences between Realtime and Utility dashboard is the range used to fetch
 * data.  See the chartWindow value for KPICardContainer
 */
const UtilityBillFacilityDashboard = () => {
  const allConfigs = useSelector(getFacilityConfigs);
  const feeds = useSelector(getFeedsWithStatuses);
  const selectedFacility = useSelector(getSelectedFacility);

  return (
    <ContainerDiv>
      <GridContainer>
        {allConfigs &&
          allConfigs.map((config) => (
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
        <UtilityComparisonWrapper>
          <UtilityDemandChartContainer />
        </UtilityComparisonWrapper>
        <SmallChartContainer>
          <FeaturePlaceholder
            placeholder={realtimePlaceholder}
            text={
              <Fragment>
                The{' '}
                <a
                  href="https://ndustrialio.atlassian.net/servicedesk/customer/kb/view/884900007"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Real Time Demand Chart
                </a>{' '}
                is not available to facilities that only have utility bill data.
              </Fragment>
            }
            subtext={
              <Fragment>
                If you would like to learn how this facility can see live
                reporting of energy demand displayed by equipment use, please
                contact{' '}
                <a href="mailto:support@ndustrial.io">support@ndustrial.io</a>
              </Fragment>
            }
          />
        </SmallChartContainer>
        <SmallChartContainer>
          <BlendedRateContainer />
        </SmallChartContainer>
        <SmallChartContainer>
          {feeds.length ? (
            <EventFeedContainer />
          ) : (
            <FeaturePlaceholder
              placeholder={eventFeedPlaceholder}
              text={
                <Fragment>
                  The{' '}
                  <a
                    href="https://ndustrialio.atlassian.net/servicedesk/customer/kb/view/891846764"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Event Feed
                  </a>{' '}
                  is currently only available to facilities that have
                  implemented energy monitoring devices.
                </Fragment>
              }
              subtext={
                <Fragment>
                  If you would like to learn how this facility can upgrade to
                  real-time energy monitoring devices, please contact{' '}
                  <a href="mailto:support@ndustrial.io">support@ndustrial.io</a>
                </Fragment>
              }
            />
          )}
        </SmallChartContainer>
      </GridContainer>
    </ContainerDiv>
  );
};

export default UtilityBillFacilityDashboard;
