import React from 'react';
import { unescape } from 'he';
import { round } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Tooltip as UnstyledTooltip } from '@ndustrial/nd-tooltip-react';
import { TooltipIcon } from '@ndustrial/nsight-common/components';

const propTypes = {
  config: PropTypes.object.isRequired,
  percentChange: PropTypes.number,
  theme: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired
};

const Container = styled.div`
  align-items: center;
  font-weight: 300;
  letter-spacing: ${rem('1.17px')};
`;

const Value = styled.div`
  font-size: ${rem('24px')};
  font-weight: 400;
  letter-spacing: ${rem('1.17px')};
  margin-right: 12px;
  color: ${(props) => {
    if (props.showPercent) {
      if (props.value > 0) {
        return props.theme.colors.success;
      } else if (props.value < 0) {
        return props.theme.colors.failure;
      } else {
        return '#5F5F5F';
      }
    } else {
      return '#5F5F5F';
    }
  }};

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    font-size: ${rem('24px')};
    letter-spacing: ${rem('1.25px')};
  }
`;

const PercentChange = styled.span`
  margin-right: 12px;

  @media screen and (min-width: 897px) and (orientation: landscape),
    screen and (min-width: 768px) and (orientation: portrait) {
    border-right: 1px solid #868686;
    padding-right: 12px;
  }
`;

const Title = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #868686;
  font-size: ${rem('16px')};
  flex: 1;
  margin-top: 8px;

  @media screen and (min-width: 560px) {
    font-size: ${rem('18px')};
  }
`;

const Tooltip = styled(UnstyledTooltip)`
  display: inline-flex;
  margin-left: 8px;
`;

function SummaryItemValue({ config, percentChange, theme, value }) {
  return (
    <Container>
      {isFinite(value) ? (
        <>
          <Value value={value} showPercent={config.showPercent} theme={theme}>
            {percentChange && config.showPercent ? (
              <PercentChange>{percentChange}%</PercentChange>
            ) : (
              ''
            )}
            {config.unitPosition === 'prefix' && (
              <span>{unescape(config.unit)}</span>
            )}
            {round(value).toLocaleString()}
            {config.unitPosition === 'postfix' && (
              <span> {unescape(config.unit)}</span>
            )}
          </Value>
        </>
      ) : (
        <>
          <span>---</span>
        </>
      )}
      <Title>
        {unescape(config.title)}
        <Tooltip
          content={unescape(config.tooltip)}
          placement="top"
          tagName="span"
        >
          <TooltipIcon />
        </Tooltip>
      </Title>
    </Container>
  );
}

SummaryItemValue.propTypes = propTypes;

export default SummaryItemValue;
