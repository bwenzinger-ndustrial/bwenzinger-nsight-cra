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
  stroke: #fff;
  transform: rotate(${({ isOpen }) => (!isOpen ? '-90' : '0')}deg);
`;

export default AccordionArrow;
