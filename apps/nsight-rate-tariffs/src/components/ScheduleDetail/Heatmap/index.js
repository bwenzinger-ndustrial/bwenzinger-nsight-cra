import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  dayHeatmapParser,
  yearHeatmapParser
} from '../../../helpers/heatmapParser';
import UnstyledHeader from './Header';
import HeatmapMatrix from './HeatmapMatrix';

const propTypes = {
  className: PropTypes.string,
  periods: PropTypes.array,
  rateType: PropTypes.string,
  season: PropTypes.shape({
    _scheduleType: PropTypes.string.isRequired,
    endDay: PropTypes.number.isRequired,
    endMonth: PropTypes.number.isRequired,
    seasonPeriods: PropTypes.arrayOf(
      PropTypes.shape({
        _periodId: PropTypes.number.isRequired,
        dayOfWeekEnd: PropTypes.number.isRequired,
        dayOfWeekStart: PropTypes.number.isRequired,
        hourEnd: PropTypes.number.isRequired,
        hourStart: PropTypes.number.isRequired
      })
    ).isRequired,
    startDay: PropTypes.number.isRequired,
    startMonth: PropTypes.number.isRequired
  }).isRequired
};

const Header = styled(UnstyledHeader)``;

const HeatmapContainer = styled.div`
  height: 100%;

  &:focus {
    outline: none;
  }

  ${Header} {
    margin-bottom: 16px;
    margin-top: 32px;
  }
`;

const Container = styled.div`
  align-items: stretch;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Heatmap = (props) => {
  const {
    className,
    periods,
    rateType,
    season: {
      _scheduleType,
      endDay,
      endMonth,
      seasonPeriods,
      startDay,
      startMonth
    }
  } = props;

  return (
    <Container className={className}>
      <HeatmapContainer>
        {_scheduleType === 'annual' ? (
          <Fragment>
            <Header customDateTitle="Weekday Schedule" rateType={rateType} />
            <HeatmapMatrix
              _scheduleType={_scheduleType}
              annualScheduleTypeDesc="Weekday"
              heatmap={yearHeatmapParser(
                seasonPeriods.filter((period) => period.dayOfWeekStart <= 4)
              )}
              periods={periods}
              rateType={rateType}
            />

            <Header customDateTitle="Weekend Schedule" rateType={rateType} />
            <HeatmapMatrix
              _scheduleType={_scheduleType}
              annualScheduleTypeDesc="Weekend"
              heatmap={yearHeatmapParser(
                seasonPeriods.filter((period) => period.dayOfWeekEnd >= 5)
              )}
              periods={periods}
              rateType={rateType}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Header
              endDay={endDay}
              endMonth={endMonth}
              rateType={rateType}
              startDay={startDay}
              startMonth={startMonth}
            />
            <HeatmapMatrix
              _scheduleType={_scheduleType}
              heatmap={dayHeatmapParser(seasonPeriods)}
              periods={periods}
              rateType={rateType}
            />
          </Fragment>
        )}
      </HeatmapContainer>
    </Container>
  );
};

Heatmap.propTypes = propTypes;
export default Heatmap;
