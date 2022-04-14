import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MissingSelection } from '@ndustrial/nsight-common/components';
import { KPICardContainer } from '@ndustrial/nsight-common/containers';
import { kpiEnums } from '@ndustrial/nsight-common/kpi-config/constants';

import KPIChartContainer from '../../containers/KPIChartContainer';

const propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  selectedOrganization: PropTypes.object,
  allKpiConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      monthly: PropTypes.shape({
        key: PropTypes.string.isRequired,
        formula: PropTypes.string.isRequired
      }),
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired
};

const ContainerDiv = styled.div`
  background-color: #e3e3e3;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 10px;

  @media screen and (min-width: 960px) {
    flex-grow: 1;
    width: auto;
  }

  @media screen and (min-width: 1440px) {
    align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
  }
`;

const GridItem = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  padding: 5px;
`;

const KPICardWrapper = styled.div`
  margin-bottom: 8px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const KPIWrapper = styled(GridItem)`
  flex-basis: 100%;
  max-width: 100%;

  @media screen and (min-width: 897px) {
    flex-basis: 33.333333%;
    max-width: 33.33333%;
  }
`;

const PortfolioDashboard = (props) => {
  const { allKpiConfigs, selectedOrganization } = props;

  if (!selectedOrganization) {
    return <MissingSelection requiredType="organization" />;
  }

  return (
    <ContainerDiv>
      <GridContainer>
        {allKpiConfigs &&
          allKpiConfigs.map((kpiConfig) => (
            <KPIWrapper key={kpiConfig.id}>
              <KPICardWrapper>
                <KPICardContainer
                  kpiConfig={kpiConfig}
                  id={selectedOrganization.id}
                  chartWindow={kpiEnums.CHART_DISPLAY_WINDOWS.YEAR}
                  isPortfolio={true}
                />
              </KPICardWrapper>
              <KPIChartContainer kpiConfig={kpiConfig} />
            </KPIWrapper>
          ))}
      </GridContainer>
    </ContainerDiv>
  );
};

PortfolioDashboard.propTypes = propTypes;

export default PortfolioDashboard;
