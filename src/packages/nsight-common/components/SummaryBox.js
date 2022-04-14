import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { whiten } from '../utils/colors';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  summaryColor: PropTypes.string,
  summaryStatus: PropTypes.string.isRequired,
  varianceChangePercentage: PropTypes.any
};

const SummaryPerformanceBox = styled.div`
  background-color: ${(props) => whiten(props.summaryColor, 0.9)};
  text-align: center;
  padding: 20px 0;
  width: 100%;
  color: ${(props) => {
    return props.summaryColor;
  }};
`;
const SummaryNumbers = styled.div``;

const ContainerDiv = styled.div`
  background-color: #fff;

  ${SummaryNumbers} {
    margin-top: 20px;
  }
`;

const PercentChange = styled.p`
  font-size: ${rem('46px')};
  font-weight: 300;
  color: ${(props) => {
    return props.summaryColor;
  }};
  margin: 0;
`;

const SummaryStatusText = styled.p`
  font-size: ${rem('20px')};
  line-height: ${rem('28px')};
  font-weight: 300;
  margin: 0;
`;

const SummaryBox = function({
  children,
  className,
  summaryColor,
  summaryStatus,
  varianceChangePercentage
}) {
  return (
    <ContainerDiv className={className}>
      <SummaryPerformanceBox summaryColor={summaryColor}>
        <PercentChange>
          {varianceChangePercentage ? `${varianceChangePercentage}%` : '---'}
        </PercentChange>
        <SummaryStatusText>{summaryStatus}</SummaryStatusText>
      </SummaryPerformanceBox>
      <SummaryNumbers>{children}</SummaryNumbers>
    </ContainerDiv>
  );
};

SummaryBox.propTypes = propTypes;

export default SummaryBox;
