import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import dateTextStyles from './dateTextStyles';

export interface StandardMonthElementProps {
  month: moment.Moment;
}

const DateText = styled.span`
  ${dateTextStyles}
`;

function StandardMonthElement({ month }: StandardMonthElementProps) {
  return <DateText>{month.format('MMM YYYY')}</DateText>;
}

export { StandardMonthElement };
