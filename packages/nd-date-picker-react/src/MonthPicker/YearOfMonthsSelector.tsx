import React, { useState } from 'react';
import styled from 'styled-components';
import YearOfMonthsCalendar, {
  YearOfMonthsCalendarAutoDateRange
} from './YearOfMonthsCalendar';
import constants from '../constants';
import moment, { Moment } from 'moment';

const { TOGGLE_TRANSITION_SPEED } = constants;

const YearOfMonthsContainer = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
`;

interface YearOfMonthsAnimatorProps {
  valueIndex: number;
  values: number[];
}

const YearOfMonthsAnimator = styled.div<YearOfMonthsAnimatorProps>`
  transition: transform ${TOGGLE_TRANSITION_SPEED}s ease-out;
  transform: translateX(
    ${(props) => (props.valueIndex ? `-${props.valueIndex * 100}%` : 0)}
  );
  display: grid;
  grid-template-columns: repeat(${(props) => props.values.length}, 100%);
`;

interface YearOfMonthsSelectorProps {
  values: number[];
  valueIndex: number;
  startDate?: Moment | null;
  endDate?: Moment | null;
  onSelectMonth: (date: Moment) => void;
  maxSelectable?: Moment;
  color: string;
  endDateOffset?: (day: Moment) => Moment;
}

function YearOfMonthsSelector({
  values,
  valueIndex = 1,
  startDate,
  endDate,
  onSelectMonth,
  maxSelectable,
  color,
  endDateOffset
}: YearOfMonthsSelectorProps) {
  const [hoverEndDate, setHoverEndDate] = useState<moment.Moment | null>(null);
  const [autoDateRange, setAutoDateRange] =
    useState<YearOfMonthsCalendarAutoDateRange | null>(null);

  const onMouseEnterMonth = (hoverDate: moment.Moment) => {
    if (startDate && !endDate) {
      setHoverEndDate(hoverDate);
    }

    if (endDateOffset) {
      const endPreselectDate = endDateOffset(hoverDate.clone());
      setAutoDateRange({ autoStart: hoverDate, autoEnd: endPreselectDate });
    }
  };

  const onMouseLeaveMonth = () => {
    setHoverEndDate(null);
    setAutoDateRange(null);
  };

  return (
    <YearOfMonthsContainer>
      <YearOfMonthsAnimator valueIndex={valueIndex} values={values}>
        {values.map((year) => (
          <YearOfMonthsCalendar
            key={`${year}`}
            onClickMonth={onSelectMonth}
            onMouseEnterMonth={onMouseEnterMonth}
            onMouseLeaveMonth={onMouseLeaveMonth}
            hoverEndDate={hoverEndDate}
            year={year}
            startDate={startDate}
            endDate={endDate}
            maxSelectable={maxSelectable}
            color={color}
            autoDateRange={autoDateRange}
          />
        ))}
      </YearOfMonthsAnimator>
    </YearOfMonthsContainer>
  );
}

export default YearOfMonthsSelector;
