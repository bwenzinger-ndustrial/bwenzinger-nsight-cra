import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { TooltipIcon } from '@ndustrial/nsight-common/components';

import DashboardDetailTabs from './DashboardDetailTabs';
import EstimatedData from './EstimatedData';

const propTypes = {
  isUsingEstimatedData: PropTypes.bool,
  sectionTitle: PropTypes.string.isRequired
};

const defaultProps = {
  isUsingEstimatedData: false
};

const StyledEstimatedData = styled(EstimatedData)``;

const PageHeading = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('20px')};
  font-weight: 300;
  margin: 0;

  @media screen and (min-width: 600px) {
    font-size: ${rem('24px')};
  }
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
`;

const PageHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 0 auto;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);

  @media screen and (min-width: 560px) {
    flex-direction: row;
  }

  ${StyledEstimatedData} {
    margin-top: 4px;

    @media screen and (min-width: 560px) {
      margin: 0 15px;
    }
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

function KPIDashboardHeader(props) {
  const { isUsingEstimatedData, sectionTitle } = props;
  const match = useRouteMatch();
  const isPortfolioDashboard = match.path === '/portfolio-dashboard';

  return (
    <RelativeContainer>
      <PageHeadingContainer>
        <Switch>
          <Route exact path={`${match.url}/detail`}>
            <PageHeading>{sectionTitle} Detail</PageHeading>
            {isUsingEstimatedData ? <StyledEstimatedData /> : null}
          </Route>
          <Route exact path={match.url}>
            <PageHeading>{sectionTitle} Dashboard</PageHeading>
            {isPortfolioDashboard ? (
              <Tooltip
                content={`These calculations may not be using data from all facilities in your portfolio due to lack of data availability. 
                To get a list of all facilities included in the calculation, please visit the corresponding table on the Portfolio Detail page.`}
                tagName="span"
              >
                <TooltipIcon />
              </Tooltip>
            ) : null}

            {isUsingEstimatedData ? <StyledEstimatedData /> : null}
          </Route>
        </Switch>
      </PageHeadingContainer>

      <DashboardDetailTabs />
    </RelativeContainer>
  );
}

KPIDashboardHeader.propTypes = propTypes;
KPIDashboardHeader.defaultProps = defaultProps;

export default KPIDashboardHeader;
