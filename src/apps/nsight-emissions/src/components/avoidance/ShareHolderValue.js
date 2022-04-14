import React from 'react';
import { round } from 'lodash';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

const Wrapper = styled.div`
  flex-direction: column;
  position: relative;
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  background-color: #f2f2f2;
  text-align: center;
  padding: 22px;
`;

const Title = styled.div`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #464646;
  margin-bottom: 30px;
  font-size: ${rem('17px')};
  font-weight: 500;
  text-transform: uppercase;
`;

const Value = styled.div`
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
`;

const propTypes = {
  className: PropTypes.string,
  factor: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  theme: PropTypes.object
};

const ShareHolderValue = withTheme(function({
  className,
  factor,
  value,
  theme
}) {
  return (
    <Wrapper className={className}>
      <Title>Shareholder Value</Title>
      {isFinite(value) ? (
        <Value value={value}>${round(value * factor).toLocaleString()}</Value>
      ) : (
        '---'
      )}
    </Wrapper>
  );
});

ShareHolderValue.propTypes = propTypes;

export default ShareHolderValue;
