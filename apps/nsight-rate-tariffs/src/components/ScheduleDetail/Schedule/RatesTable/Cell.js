import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  nestingPath: PropTypes.arrayOf(PropTypes.number).isRequired,
  value: PropTypes.node
};

const Content = styled.div`
  background-color: ${({ isEven }) => (isEven ? '#fbfbfb' : 'transparent')};
  border-color: ${({ isEven }) => (isEven ? '#fff' : 'transparent')};
  border-style: solid;
  border-width: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${rem('10px')};
  letter-spacing: 0.5px;
  line-height: 1.2;
  padding: 12px;
`;

function Cell({ nestingPath, value }) {
  const periodIndex = nestingPath[1];

  return <Content isEven={periodIndex % 2 === 0}>{value}</Content>;
}

Cell.propTypes = propTypes;

export { Cell, Content as CellContent };
