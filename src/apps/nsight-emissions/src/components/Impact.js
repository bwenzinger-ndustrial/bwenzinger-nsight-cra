import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
import { unescape } from 'he';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
// import AvoidanceContainer from '../containers/AvoidanceContainer';
import {
  FullScreenLoadingIndicator,
  TooltipIcon
} from '@ndustrial/nsight-common/components';

import { EQUIVALENCIES } from '../constants/equivalencies';
import EquivalencyContainer from '../containers/EquivalencyContainer';
import SummaryContainer from '../containers/SummaryContainer';
import DateSelector from './DateSelector';

const PageContainer = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #f2f2f2;
  height: 100%;
`;

const SummaryWrapper = styled(SummaryContainer)`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #fff;
  justify-content: space-evenly;
`;

const EquivalencyContent = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #fff;
  margin: 16px 0;
`;

const EquivalencyWrapper = styled.div`
  text-align: center;
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 16px;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    padding: 48px 16px;
  }
`;

/* const AvoidanceWrapper = styled(AvoidanceContainer)`
  padding: 16px 0;
`; */

const Container = styled.div`
  flex-direction: column;
  padding: 16px;
  display: flex;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    flex-direction: row;
    height: 50vh;
    flex-wrap: wrap;
    display: flex;
  }
`;

// const SidebarHeading = styled.div`
//   font-size: ${rem('18px')};
//   margin-bottom: 16px;
//   text-align: center;
//   border-bottom: 1px solid #c1c1c1;
//   padding: 16px 0;
//   /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
//   color: #464646;
//   text-transform: uppercase;
// `;

const SectionHeading = styled.div`
  font-size: ${rem('18px')};
  text-align: center;
  padding: 16px;
  border-bottom: 1px solid #c1c1c1;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #464646;
  margin: 0 16px;
`;

// const RightSidebar = styled.div`
//   flex: 1;
//   flex-direction: column;
//   /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
//   background-color: #fff;
//   padding: 16px;
//   letter-spacing: 1.5px;

//   @media screen and (min-width: 1200px) and (orientation: landscape),
//     screen and (min-width: 897px) and (orientation: portrait) {
//     flex-direction: row;
//     text-align: left;
//     justify-content: space-between;

//     ${EquivalencyWrapper} {
//       justify-content: space-between;
//     }
//   }
// `;

const Content = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (min-width: 1200px) and (orientation: landscape),
    screen and (min-width: 897px) and (orientation: portrait) {
    /* width: calc(100% - 350px); */
    width: 100%;
    margin-right: 16px;
  }
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
  margin-left: 8px;
`;

const defaultProps = {
  comparisonEmissions: {
    data: null
  },
  primaryEmissions: {
    data: null
  }
};

const propTypes = {
  className: PropTypes.string,
  comparisonDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  co2MetricKey: PropTypes.string.isRequired,
  primaryDates: PropTypes.shape({
    from: momentPropTypes.momentObj,
    to: momentPropTypes.momentObj
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  resetComparisonEmissionsData: PropTypes.func,
  resetPrimaryEmissionsData: PropTypes.func,
  setComparisonDates: PropTypes.func.isRequired,
  setPrimaryDates: PropTypes.func.isRequired
};

function Impact({
  className,
  co2MetricKey,
  comparisonDates,
  isLoading,
  primaryDates,
  resetComparisonEmissionsData,
  resetPrimaryEmissionsData,
  setComparisonDates,
  setPrimaryDates
}) {
  if (isLoading) {
    return (
      <FullScreenLoadingIndicator loadingText="Loading CO&#8322; Impact" />
    );
  }
  return (
    <PageContainer>
      <DateSelector
        comparisonDates={comparisonDates}
        pickerRange="MONTH"
        primaryDates={primaryDates}
        resetComparisonEmissionsData={resetComparisonEmissionsData}
        resetPrimaryEmissionsData={resetPrimaryEmissionsData}
        setComparisonDates={setComparisonDates}
        setPrimaryDates={setPrimaryDates}
      />
      <Container className={className}>
        <Content>
          <SummaryWrapper />
          <EquivalencyContent>
            <SectionHeading>
              CO&#8322; EQUIVALENCIES
              <Tooltip
                content={unescape(EQUIVALENCIES.tooltip)}
                placement="top"
                tagName="span"
              >
                <TooltipIcon />
              </Tooltip>
            </SectionHeading>
            <EquivalencyWrapper>
              {EQUIVALENCIES.values.map((config, idx) => (
                <EquivalencyContainer
                  key={idx}
                  co2MetricKey={co2MetricKey}
                  config={config}
                />
              ))}
            </EquivalencyWrapper>
          </EquivalencyContent>
        </Content>
        {/* <RightSidebar>
          <SidebarHeading>Avoided Energy Intensity</SidebarHeading>
          <AvoidanceWrapper />
        </RightSidebar> */}
      </Container>
    </PageContainer>
  );
}

Impact.propTypes = propTypes;
Impact.defaultProps = defaultProps;

export default Impact;
