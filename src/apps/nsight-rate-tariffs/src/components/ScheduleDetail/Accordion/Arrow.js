import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChevronDown } from '@ndustrial/nd-icons-svg';

const propTypes = {
  isOpen: PropTypes.bool
};

function SanitizedTriangleDown({ isOpen, ...rest }) {
  return <ChevronDown {...rest} />;
}
SanitizedTriangleDown.propTypes = propTypes;

const AccordionArrow = styled(SanitizedTriangleDown)`
  stroke: ${({ theme }) => theme.colors.button};
  font-size: 8px;
  transform: rotate(${({ isOpen }) => (!isOpen ? '-90' : '0')}deg);
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export default AccordionArrow;
