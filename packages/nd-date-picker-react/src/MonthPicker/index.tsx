import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import constants from '../constants';
import YearOfMonthsSelector from './YearOfMonthsSelector';
import HorizontalSelectWithArrows from './HorizontalSelectWithArrows';
import MonthRangeInput from './MonthRangeInput';
import moment from 'moment';
import useOuterClick from './useOuterClick';
import { defaultTheme } from '@ndustrial/nd-theme-react';
import { NdMonthPickerProps } from '../types';

const MonthPickerContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 310px;
  font-size: 20px;
  height: 100%;
`;

interface YearOfMonthsCalendarsProps {
  focus?: boolean;
}

const YearOfMonthsCalendars = styled.div<YearOfMonthsCalendarsProps>`
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  width: calc(100% - 4px);
  transition: all 0.1s ease-out;
  transform-origin: top;
  margin-left: auto;
  margin-right: auto;
  background-color: ${defaultTheme.uiKitBackground.background};
  ${({ focus }) =>
    focus
      ? `
      opacity: 1;
      transform: scale(1, 1);
    `
      : `
      opacity: 0;
      transform: scale(1, 0);
    `}
`;

const StyledHorizontalSelectWithArrows = styled(HorizontalSelectWithArrows)`
  padding: 26px 20px;
  max-width: ${constants.MAX_CALENDAR_WIDTH};
  margin: 0 auto;
`;

// const propTypes = {
//   range: PropTypes.shape({
//     from: momentPropTypes.momentObj,
//     to: momentPropTypes.momentObj
//   }).isRequired,
//   onSetRange: PropTypes.func.isRequired,
//   minDate: momentPropTypes.momentObj,
//   maxDate: momentPropTypes.momentObj,
//   initialDate: momentPropTypes.momentObj,
//   color: PropTypes.string,
//   disabled: PropTypes.bool,
//   renderCalendarInfo: PropTypes.func,
//   maxSelectable: momentPropTypes.momentObj,
//   endDateOffset: PropTypes.func
// };

// const defaultProps = {
//   initialDate: moment(),
//   maxDate: moment().add(3, 'years'),
//   minDate: moment().subtract(10, 'years'),
//   color: defaultTheme.uiKitCalendar.calendarPrimary,
//   range: { from: null, to: null }
// };

// {...baseProps}
//       maxSelectable={maxDate}
//       onSetRange={onDatesChange}
//       range={dateRange}
//       initialDate={initialValue && initialValue()}
//       color={color}
//       disabled={disabled}
//       endDateOffset={endDateOffset}

// TODO, implement initialYear, color, disabled, and renderCalendarInfo
function MonthPicker({
  range = { from: null, to: null },
  minDate = moment().subtract(10, 'years'),
  maxDate = moment().add(3, 'years'),
  maxSelectable,
  onSetRange,
  renderCalendarInfo,
  initialDate = moment(),
  color = defaultTheme.uiKitCalendar.calendarPrimary,
  disabled,
  endDateOffset
}: NdMonthPickerProps) {
  const [startDate, setStartDate] = useState(range ? range.from : null);
  const [endDate, setEndDate] = useState(range ? range.to : null);
  const [focus, setFocus] = useState(false);

  const monthPickerRef = useOuterClick(() => setFocus(false));

  // range of years to appear in the horizontal year selector
  const years = useMemo(() => {
    const _years = [];
    for (let i = minDate.year(); i <= maxDate.year(); i++) {
      _years.push(i);
    }
    return _years;
  }, [minDate, maxDate]);

  const [yearIndex, setYearIndex] = useState(years.indexOf(initialDate.year()));

  useEffect(() => {
    setStartDate(range.from);
    setEndDate(range.to);
    if (range.from && range.to) {
      setFocus(false);
    }
  }, [range]);

  useEffect(() => {
    if (range.from && focus) {
      setYearIndex(years.indexOf(range.from.year()));
    }
  }, [focus]);

  const onSelectMonth = (selectedDate: moment.Moment) => {
    const selectedDatePrepped = selectedDate.clone().date(1);
    if (endDateOffset) {
      const autoEndDate = endDateOffset(selectedDatePrepped.clone());
      const now = moment();
      if (
        autoEndDate.isSameOrBefore(now, 'months') &&
        autoEndDate.isSameOrBefore(maxSelectable, 'months')
      ) {
        onSetRange({ startDate: selectedDatePrepped, endDate: autoEndDate });
      }
    } else if (
      !startDate ||
      selectedDate.isBefore(startDate, 'month') ||
      (range.to && range.from)
    ) {
      onSetRange({ startDate: selectedDatePrepped, endDate: null });
    } else {
      onSetRange({
        startDate: range.from ?? null,
        endDate: selectedDatePrepped
      });
      setFocus(false);
    }
  };

  return (
    <MonthPickerContainer ref={monthPickerRef}>
      <MonthRangeInput
        onSetStartDate={(startDate) => onSetRange({ startDate, endDate: null })}
        onSetEndDate={(endDate) =>
          onSetRange({ startDate: range.from ?? null, endDate })
        }
        startDate={range.from}
        endDate={range.to}
        onSetFocus={(focusValue) => {
          setFocus(focusValue);
        }}
        focus={focus}
        color={color}
        disabled={disabled}
      />
      <YearOfMonthsCalendars focus={focus}>
        {renderCalendarInfo && renderCalendarInfo()}
        <StyledHorizontalSelectWithArrows
          values={years}
          valueIndex={yearIndex}
          onUpdateIndex={(i) => setYearIndex(i)}
        />
        <YearOfMonthsSelector
          values={years}
          valueIndex={yearIndex}
          startDate={startDate}
          endDate={endDate}
          onSelectMonth={onSelectMonth}
          maxSelectable={maxSelectable}
          color={color}
          endDateOffset={endDateOffset}
        />
      </YearOfMonthsCalendars>
    </MonthPickerContainer>
  );
}

// MonthPicker.propTypes = propTypes;
// MonthPicker.defaultProps = defaultProps;
export default MonthPicker;
