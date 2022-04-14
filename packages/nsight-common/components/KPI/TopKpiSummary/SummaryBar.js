import React from 'react';
import { isNumber } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import commonChartUtils from '@ndustrial/nsight-common/charts/commonChartUtils';

const propTypes = {
  className: PropTypes.string,
  changeDirection: PropTypes.string,
  isNegativeIndicator: PropTypes.bool,
  totalBudget: PropTypes.number.isRequired,
  totalUsage: PropTypes.number.isRequired,
  remainingBudget: PropTypes.number.isRequired,
  remainingDays: PropTypes.number.isRequired
};

const SummaryBarContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.disabled};
  padding: 3px;
  margin: 4px 0;
  border-radius: 3px;
`;

const SummaryBarFill = styled.div`
  display: block;
  height: 8px;
  background-color: ${(props, theme) =>
    commonChartUtils.getVarianceColor(
      props.isNegativeIndicator,
      props.theme,
      props.changeDirection
    )};
  border-radius: 1px;
  width: ${(props) => props.width}%;
  transition: width 500ms ease-in-out;
`;

const SmallText = styled.span`
  float: ${(props) => props.position};
  font-size: ${rem('14px')};
`;

const SummaryBarSection = styled.div`
  height: 15px;

  ${SmallText} {
    display: inline;
  }
`;

function displayCompactValue(value) {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
}

function SummaryBar({
  className,
  changeDirection,
  isNegativeIndicator,
  remainingBudget,
  remainingDays,
  totalBudget,
  totalUsage
}) {
  let barWidth = 0;

  if (totalUsage && totalBudget) {
    barWidth = (totalUsage / totalBudget) * 100;

    if (barWidth > 100) {
      barWidth = 100;
    }
  }

  return (
    <>
      <SummaryBarSection>
        <SmallText position="left">
          {isNumber(totalBudget) ? displayCompactValue(totalBudget) : '---'}{' '}
          Total Budget
        </SmallText>
        <SmallText position="right">{remainingDays} Days Remain</SmallText>
      </SummaryBarSection>

      <SummaryBarContainer className={className}>
        <SummaryBarFill
          width={barWidth}
          changeDirection={changeDirection}
          isNegativeIndicator={isNegativeIndicator}
        />
      </SummaryBarContainer>

      <SummaryBarSection>
        <SmallText position="left">
          {isNumber(totalUsage) ? displayCompactValue(totalUsage) : '---'} Used
        </SmallText>
        <SmallText position="right">
          {isNumber(remainingBudget)
            ? displayCompactValue(remainingBudget)
            : '---'}{' '}
          Left
        </SmallText>
      </SummaryBarSection>
    </>
  );
}

SummaryBar.propTypes = propTypes;

export default SummaryBar;
