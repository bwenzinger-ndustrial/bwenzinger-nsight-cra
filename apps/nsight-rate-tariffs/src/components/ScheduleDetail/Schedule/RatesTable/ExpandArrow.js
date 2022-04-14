import React from 'react';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Update when we update to 3.0 for icons
import { ArrowRight } from '@ndustrial/nd-icons-svg';

const SanitizedArrow = ({ isExpanded, ...props }) => <ArrowRight {...props} />;
SanitizedArrow.propTypes = { isExpanded: PropTypes.bool };

const Arrow = styled(SanitizedArrow)`
  font-size: ${rem('8px')};
  transform: rotate(${({ isExpanded }) => (isExpanded ? 90 : 0)}deg);
`;

export default Arrow;
