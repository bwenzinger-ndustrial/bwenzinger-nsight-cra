import styled from 'styled-components';
import { defaultTheme } from '@ndustrial/nd-theme-react';
import moment from 'moment';
import React, { MouseEventHandler } from 'react';
import constants from '../constants';

const { MAX_CALENDAR_WIDTH } = constants;

interface MonthTileProps {
  isRangeLimit?: boolean;
  isInRange?: boolean;
  isInHoverRange?: boolean;
  isOutOfRange?: boolean;
  isInAutoSelectRange?: boolean | null;
  isCurrentMonth?: boolean;
  color?: string;
}

const MonthTile = styled.span<MonthTileProps>`
  display: flex;
  width: calc(100% / 3);
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  ${({
    isRangeLimit,
    isInRange,
    isInHoverRange,
    isOutOfRange,
    isInAutoSelectRange,
    color
  }) => {
    if (isRangeLimit)
      return `
        background-color: ${color};
        color: white;
      `;
    else if (isInAutoSelectRange)
      return `
        background-color: ${defaultTheme.uiKitCalendar.calendarHover};        
      `;
    else if (isInRange)
      return `
        background-color: ${defaultTheme.uiKitCalendar.calendarInRange};        
      `;
    else if (isInHoverRange)
      return `
        background-color: ${defaultTheme.uiKitCalendar.calendarHover};        
      `;
    else if (isOutOfRange)
      return `
        color: ${defaultTheme.colors.disabled};
      `;
    else
      return `
        background-color: transparent;     
        color: ${defaultTheme.colors.text};
      `;
  }};

  &:hover {
    color: ${({ isRangeLimit, isOutOfRange, color }) =>
      !isRangeLimit && !isOutOfRange ? color : 'auto'};
    background-color: ${({
      isRangeLimit,
      isInRange,
      isInHoverRange,
      isOutOfRange
    }) =>
      !isRangeLimit && !isInRange && !isOutOfRange
        ? defaultTheme.uiKitCalendar.calendarHover
        : 'auto'};
  }

  ${({ isCurrentMonth, color }) =>
    isCurrentMonth &&
    `
    &::after {
      content: '';
      width: 4px;
      height: 4px;
      background-color: ${color};
      position: absolute;
      bottom: 8px;      
    }
  `}
`;

const YearOfMonths = styled.div`
  display: inline-block;
  width: 100%;
  padding-bottom: 30px;
`;

const YearOfMonthsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: ${MAX_CALENDAR_WIDTH};
  margin: 0 auto;
`;

// 0 indexed months
const months = moment.monthsShort();

export interface YearOfMonthsCalendarAutoDateRange {
  autoStart: moment.Moment;
  autoEnd: moment.Moment;
}

interface YearOfMonthsCalendarProps {
  onClickMonth: (date: moment.Moment) => void;
  onMouseLeaveMonth?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseEnterMonth: (date: moment.Moment) => void;
  year: number;
  startDate?: moment.Moment | null;
  endDate?: moment.Moment | null;
  hoverEndDate?: moment.Moment | null;
  maxSelectable?: moment.Moment;
  color?: string;
  autoDateRange?: YearOfMonthsCalendarAutoDateRange | null;
}

function YearOfMonthsCalendar({
  onClickMonth,
  onMouseLeaveMonth,
  onMouseEnterMonth,
  year,
  startDate,
  endDate,
  hoverEndDate = null,
  maxSelectable,
  color,
  autoDateRange
}: YearOfMonthsCalendarProps) {
  return (
    <YearOfMonths>
      <YearOfMonthsGrid>
        {/* months are indexed same as moment months, allowing easy moment month set using idx */}
        {months.map((month, idx) => {
          const date = moment().year(year).month(idx);
          const currentDate = moment();
          const isRangeLimit =
            date.isSame(startDate, 'month') || date.isSame(endDate, 'month');

          const isInRange =
            date.isAfter(startDate, 'month') && date.isBefore(endDate, 'month');

          const isOutOfRange =
            date.isAfter(currentDate, 'month') ||
            (maxSelectable && date.isAfter(maxSelectable, 'month'));

          const isInHoverRange =
            date.isAfter(startDate, 'month') &&
            date.isSameOrBefore(hoverEndDate, 'month');

          const isInAutoSelectRange =
            !isOutOfRange &&
            autoDateRange &&
            date.isAfter(autoDateRange.autoStart, 'months') &&
            date.isSameOrBefore(autoDateRange.autoEnd, 'months');

          return (
            <MonthTile
              key={`month_${year}_${idx}`}
              isRangeLimit={isRangeLimit}
              isInRange={isInRange}
              isInHoverRange={isInHoverRange}
              isInAutoSelectRange={isInAutoSelectRange}
              isOutOfRange={isOutOfRange}
              isCurrentMonth={date.isSame(currentDate, 'month')}
              onClick={() => {
                !isOutOfRange && onClickMonth(date);
              }}
              onMouseEnter={() => onMouseEnterMonth(date)}
              onMouseLeave={onMouseLeaveMonth}
              color={color}
            >
              {month.toUpperCase()}
            </MonthTile>
          );
        })}
      </YearOfMonthsGrid>
    </YearOfMonths>
  );
}

export default YearOfMonthsCalendar;
