import React from 'react';
import moment from 'moment';
import { rem } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Calendar as UnstyledCalendar } from '@ndustrial/nd-icons-svg';

import RatesTable from './RatesTable';

const propTypes = {
  className: PropTypes.string,
  periods: PropTypes.array,
  rateType: PropTypes.string,
  season: PropTypes.shape({
    endDay: PropTypes.number.isRequired,
    endMonth: PropTypes.number.isRequired,
    startDay: PropTypes.number.isRequired,
    startMonth: PropTypes.number.isRequired
  }).isRequired
};

const Calendar = styled(UnstyledCalendar)`
  stroke: ${({ theme }) => theme.colors.primary};
`;

const SeasonDates = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${rem('10px')};
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 1;
`;

const SeasonDatesContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  ${Calendar} {
    margin-right: 8px;
  }
`;

const Container = styled.div`
  ${SeasonDatesContainer} {
    margin: 16px 0;
  }
`;

function SeasonRates(props) {
  const { className, periods, rateType, season } = props;

  return (
    <Container className={className}>
      <SeasonDatesContainer>
        <Calendar />
        <SeasonDates>
          {moment(`${season.startMonth}-${season.startDay}`, 'M-DD')
            .format('MMM DD')
            .toUpperCase()}{' '}
          -{' '}
          {moment(`${season.endMonth}-${season.endDay}`, 'M-DD')
            .format('MMM DD')
            .toUpperCase()}
        </SeasonDates>
      </SeasonDatesContainer>
      <RatesTable periods={periods} rateType={rateType} season={season} />
    </Container>
  );
}

SeasonRates.propTypes = propTypes;

export default SeasonRates;
