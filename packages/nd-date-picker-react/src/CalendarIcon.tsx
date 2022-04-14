import React from 'react';
import styled from 'styled-components';
import { Calendar } from '@ndustrial/nd-icons-svg';

const CalendarIcon = styled(({ accentColor, disabled, focused, ...props }) => (
  <Calendar {...props} />
))`
  font-size: 15px;
  stroke: ${({ accentColor, disabled, focused }) => {
    if (disabled) {
      return '#d8d8d8';
    } else if (focused) {
      return '#fbfbfb';
    } else {
      return accentColor;
    }
  }};
  transition: all 0.15s ease-out;
`;

export default CalendarIcon;
