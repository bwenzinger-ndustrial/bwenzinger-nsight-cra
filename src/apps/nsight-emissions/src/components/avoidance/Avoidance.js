import React from 'react';
import { unescape } from 'he';
import { round } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import electricity from '../../assets/electricity.svg';
import ShareHolderValue from './ShareHolderValue';

const AvoidanceWrapper = styled.div`
  flex-direction: column;
  position: relative;

  img {
    max-height: 20px;
  }
`;

const AvoidanceItem = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.span`
  margin-top: 8px;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #464646;
  margin-left: 4px;
  font-size: ${rem('17px')};
  text-transform: uppercase;
`;

const Value = styled.span`
  color: ${(props) => {
    if (props.value > 0) {
      return props.theme.colors.success;
    } else if (props.value < 0) {
      return props.theme.colors.failure;
    } else {
      return '#5F5F5F';
    }
  }};
  font-size: ${rem('20px')};
  letter-spacing: 1.2px;
  margin-left: 16px;
`;

const propTypes = {
  className: PropTypes.string,
  avoidance: PropTypes.array.isRequired,
  theme: PropTypes.object
};

const Avoidance = withTheme(function({ className, avoidance, theme }) {
  const spendValue = avoidance.find((x) => x.config.key === 'spend_avoidance');

  // TODO: remove hardcode value and use asset attribute once provisioned
  const shareHolderValueFactor = 17;

  return (
    <>
      <AvoidanceWrapper className={className}>
        {avoidance.map((item, idx) => (
          <AvoidanceItem key={idx}>
            <img src={electricity} />

            {isFinite(item.value) ? (
              <Value value={item.value} theme={theme}>
                {item.config.prefixUnit || ''}
                {round(item.value).toLocaleString()}
              </Value>
            ) : (
              <Value value={0} theme={theme}>
                {item.config.prefixUnit || ''}
                ---
              </Value>
            )}

            <Title>{unescape(item.config.unit)}</Title>
          </AvoidanceItem>
        ))}
      </AvoidanceWrapper>
      <ShareHolderValue
        value={spendValue.value}
        factor={shareHolderValueFactor}
      ></ShareHolderValue>
    </>
  );
});

Avoidance.propTypes = propTypes;

export default Avoidance;
