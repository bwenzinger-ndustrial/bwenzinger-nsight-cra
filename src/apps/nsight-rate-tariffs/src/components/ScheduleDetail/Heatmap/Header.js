import React from 'react';
import { find } from 'lodash';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SCHEDULE_TABS } from '../../../constants';

const propTypes = {
  className: PropTypes.string,
  customDateTitle: PropTypes.string,
  endDay: PropTypes.number,
  endMonth: PropTypes.number,
  rateType: PropTypes.string.isRequired,
  startDay: PropTypes.number,
  startMonth: PropTypes.number
};

const RateTypeText = styled.h4`
  font-size: ${rem('14px')};
  font-weight: 300;
  line-height: 0.857;
  margin: 0;
`;

const SeasonDates = styled.h5`
  font-size: ${rem('10px')};
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
`;

const SeasonDatesContainer = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: 0.5px;
  text-align: center;
  text-transform: uppercase;

  ${RateTypeText} {
    margin-bottom: 10px;
  }
`;

function Header(props) {
  const {
    className,
    customDateTitle,
    endDay,
    endMonth,
    rateType,
    startDay,
    startMonth
  } = props;
  const rateTypeTitle = find(SCHEDULE_TABS, { key: rateType }).title;

  const dateTitle =
    customDateTitle ||
    moment(`${startMonth}-${startDay}`, 'M-DD')
      .format('MMM DD')
      .toUpperCase() +
      ' - ' +
      moment(`${endMonth}-${endDay}`, 'M-DD')
        .format('MMM DD')
        .toUpperCase();

  return (
    <SeasonDatesContainer className={className}>
      <RateTypeText>{rateTypeTitle} HeatMap</RateTypeText>
      <SeasonDates>{dateTitle}</SeasonDates>
    </SeasonDatesContainer>
  );
}

Header.propTypes = propTypes;

export default Header;
