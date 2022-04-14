import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  rateType: PropTypes.string
};

const Message = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: ${rem('16px')};
  text-align: center;
  letter-spacing: 0.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

function MissingData({ className, rateType }) {
  return (
    <Message className={className}>
      Sorry, no {rateType} data available.
    </Message>
  );
}

MissingData.propTypes = propTypes;
export default MissingData;
