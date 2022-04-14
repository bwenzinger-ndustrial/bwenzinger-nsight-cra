import moment, { Moment } from 'moment';
import React, { useState, useEffect } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import styled from 'styled-components';

import {
  InputLabel,
  FormControl,
  FormHelperText
} from '@ndustrial/nd-inputs-react';

import CalendarIcon from './CalendarIcon';
import {
  MonthElementWithSelections,
  NextMonth,
  PreviousMonth,
  StandardMonthElement
} from './Navigation';
import {
  NdDateRangePickerProps,
  NdDateRangePickerStylingProps,
  NdCalendarRangeTypes
} from './types';

const DEFAULT_FORMAT = 'M/D/YYYY';

const Container = styled(FormControl)<NdDateRangePickerStylingProps>`
  display: inline-block;

  .DateRangePickerInput__withBorder {
    background-color: #fbfbfb;
    border-color: ${({ accentColor, focused, invalid, theme }) => {
      if (invalid) {
        return theme.colors.failure;
      } else if (focused) {
        return accentColor;
      } else {
        return '#ebebeb';
      }
    }};
    border-style: solid;
    border-radius: 0;
    border-width: 1px;
    cursor: pointer;
    display: inline-flex;
    padding-right: 52px;
    position: relative;
    transition: all 0.15s ease-out;
    width: 310px;

    &:hover {
      border-color: ${({ accentColor }) => accentColor};

      .DateRangePickerInput_calendarIcon {
        border-left-color: ${({ accentColor }) => accentColor};
      }
    }
  }

  .DateRangePickerInput__disabled {
    cursor: not-allowed;

    &:hover {
      border-color: #ebebeb;

      .DateRangePickerInput_calendarIcon {
        border-left-color: #ebebeb;
      }
    }
  }

  .DateInput {
    background-color: transparent;
    width: auto;

    &:first-child {
      width: ${({ currentStartDate }) => (currentStartDate ? 'auto' : '100%')};
    }

    & ~ .DateInput {
      flex-grow: 1;
      overflow: hidden;
      width: ${({ currentStartDate }) => (currentStartDate ? 'auto' : '0')};
    }
  }

  .DateInput_input {
    background-color: transparent;
    border-width: 0px;
    box-sizing: content-box;
    color: ${({ inputColor, theme }) => inputColor || theme.colors.text};
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    height: 16px;
    line-height: 16px;
    padding: 0;
    padding-bottom: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    resize: none;

    &::placeholder {
      color: #a8a8a8;
      font-weight: 400;
    }
  }

  .DateInput:first-child .DateInput_input {
    padding-right: ${({ currentStartDate }) =>
      currentStartDate ? '8px' : '16px'};
    text-align: ${({ currentStartDate }) =>
      currentStartDate ? 'right' : 'left'};
    width: ${({ currentStartDate, displayFormat }) => {
      const width =
        currentStartDate && currentStartDate.format(displayFormat).length - 0.5;

      return width ? `${width}ch` : 'calc(100% - 32px)';
    }};
  }

  .DateInput ~ .DateInput .DateInput_input {
    padding-left: ${({ currentStartDate }) =>
      currentStartDate ? '8px' : '16px'};
    width: calc(100% - 22px);
  }

  .DateInput_input__disabled {
    cursor: not-allowed;
    font-style: normal;
  }

  .DateRangePickerInput_calendarIcon {
    background-color: ${({ accentColor, focused }) =>
      focused ? accentColor : '#fbfbfb'};
    bottom: 0;
    margin: 0;
    outline: none;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 0.15s ease-out;
    width: 52px;
  }

  .DateRangePickerInput__disabled .DateRangePickerInput_calendarIcon {
    cursor: not-allowed;
  }

  .DateRangePicker_picker {
    margin-top: -3px;
  }

  .DateInput_fang {
    display: none;
  }

  .DateRangePickerInput_arrow {
    background-color: #fbfbfb;
    color: ${({ inputColor, theme }) => inputColor || theme.colors.text};
    display: ${({ currentStartDate }) =>
      currentStartDate ? 'inline-block' : 'none'};
    line-height: 40px;
  }

  .DayPickerNavigation_button {
    font-size: 20px;
    position: absolute;
    top: ${({ hasMonthYearSelection }) =>
      hasMonthYearSelection ? '25px' : '30px'};

    &:first-child {
      left: 22px;
    }

    &:last-child {
      right: 22px;
    }
  }

  .CalendarMonth_caption {
    padding-bottom: 48px;
    padding-top: 26px;
  }

  .DayPicker__withBorder {
    border-radius: 0;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  }

  .DayPicker_weekHeader_ul {
    margin: 12px 0;
  }

  .CalendarDay {
    letter-spacing: 0.25px;
  }

  .CalendarDay__default {
    border: 0;
    color: #202020;

    &:focus,
    &:hover {
      background-color: #f5f5f5;
      color: ${({ accentColor }) => accentColor};
      outline: none;
    }
  }

  .CalendarDay__today {
    position: relative;

    &::after {
      background-color: ${({ accentColor }) => accentColor};
      bottom: 8px;
      content: '';
      display: block;
      height: 4px;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 4px;
    }
  }

  .CalendarDay__selected {
    background-color: ${({ accentColor }) => accentColor};
    color: #fff;

    &:hover {
      background-color: ${({ accentColor }) => accentColor};
      color: #fff;
    }
  }

  .CalendarDay__hovered_span,
  .CalendarDay__selected_span {
    background-color: #f4f7fb;
  }

  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background-color: #fff;
    color: #a8a8a8;
  }

  .CalendarDay__blocked_out_of_range {
    border: 0;
  }
`;

interface OnFocusChangeProps {
  focused: FocusedInputShape | null;
}

export interface DateRangePickerPassedProps {
  autoFocus?: boolean;
  className?: string;
  endDate: Moment | null;
  endDateId: string;
  endDateOffset?: (day: Moment) => Moment;
  hasMonthYearSelection?: boolean;
  isOutsideRange?: (day: moment.Moment) => boolean;
  maxDate?: Moment;
  minDate?: Moment;
  numberOfDays?: number;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  onStartDateChange?: (start: Moment) => void;
  onFocusChange?: ({ focused }: OnFocusChangeProps) => void;
  onRangeSelect?: () => void;
  startDate: Moment | null;
  startDateId: string;
  type?: NdCalendarRangeTypes;
}

function DateRangePickerContainer(props: NdDateRangePickerProps) {
  const {
    accentColor = '#2764ae',
    autoFocus,
    className,
    disabled,
    displayFormat = DEFAULT_FORMAT,
    endDate,
    endDateId,
    endDateOffset,
    focused,
    hasMonthYearSelection = true,
    helperText,
    inputColor,
    invalid,
    isOutsideRange,
    label,
    maxDate = moment().add(10, 'years'),
    minDate = moment().subtract(10, 'years'),
    onDatesChange,
    onStartDateChange = () => {},
    onFocusChange,
    onRangeSelect = () => {},
    required,
    startDate,
    startDateId,
    type = 'primary',
    ...restProps
  } = props;

  const [dates, setDates] = useState<{
    startDate?: Moment | null;
    endDate?: Moment | null;
  }>({});
  const [_focused, setFocused] = useState<
    boolean | FocusedInputShape | undefined | null
  >(focused || (autoFocus && 'startDate'));
  const [isMenuFocused, setMenuFocus] = useState<boolean>();

  useEffect(() => {
    setDates({ endDate, startDate });
  }, [endDate, startDate]);

  useEffect(() => {
    setFocused(focused);
  }, [focused]);

  return (
    <Container
      accentColor={accentColor}
      className={className}
      currentStartDate={dates.startDate}
      displayFormat={displayFormat}
      focused={_focused}
      hasMonthYearSelection={hasMonthYearSelection} // TODO check this is correct
      inputColor={inputColor}
      invalid={invalid || (required && !(startDate && endDate))}
    >
      {label && (
        <InputLabel htmlFor={startDateId}>
          {label}
          {required && <span>&nbsp;*</span>}
        </InputLabel>
      )}
      <DateRangePicker
        customArrowIcon="-"
        customInputIcon={
          <CalendarIcon
            accentColor={accentColor}
            disabled={disabled}
            focused={_focused}
          />
        }
        endDateId={endDateId}
        endDatePlaceholderText=""
        hideKeyboardShortcutsPanel
        inputIconPosition="after"
        numberOfMonths={1}
        startDateId={startDateId}
        startDatePlaceholderText="Select a Date Range"
        {...restProps}
        daySize={40}
        disabled={disabled}
        displayFormat={displayFormat}
        endDate={dates.endDate ?? null}
        endDateOffset={endDateOffset}
        focusedInput={_focused as FocusedInputShape}
        horizontalMonthPadding={4}
        isOutsideRange={(day) => {
          if (isOutsideRange) {
            return isOutsideRange(day);
          }

          return maxDate.isBefore(day) || minDate.isAfter(day);
        }}
        navNext={<NextMonth />}
        navPrev={<PreviousMonth />}
        onDatesChange={({ endDate: end, startDate: start }) => {
          const update = {
            endDate: end,
            startDate: start
          };

          if (
            !start ||
            (!start.isSame(dates.startDate) && end && end.isSame(dates.endDate))
          ) {
            update.endDate = null;
          }

          if (start && !start.isSame(dates.startDate)) {
            onStartDateChange(start);
          }

          onRangeSelect();

          if (type === 'comparison') {
            return onDatesChange(update);
          }

          setDates(update);

          if (update.endDate && update.startDate) {
            onDatesChange(update);
          }
        }}
        onFocusChange={(focusedInput: FocusedInputShape | null) => {
          if (hasMonthYearSelection && isMenuFocused) {
            return;
          }

          const inputToFocus: FocusedInputShape | null =
            !_focused && focusedInput === 'endDate'
              ? 'startDate'
              : focusedInput;

          if (onFocusChange) {
            onFocusChange({ focused: inputToFocus });
          }

          setFocused(inputToFocus);
        }}
        renderMonthText={undefined}
        renderMonthElement={({ month, onMonthSelect, onYearSelect }) =>
          hasMonthYearSelection ? (
            <MonthElementWithSelections
              accentColor={accentColor}
              maxDate={maxDate}
              minDate={minDate}
              month={month}
              onMonthSelect={onMonthSelect}
              onYearSelect={onYearSelect}
              onMenuFocus={setMenuFocus}
            />
          ) : (
            <StandardMonthElement month={month} />
          )
        }
        renderWeekHeaderElement={(day) => day[0]}
        required={required}
        startDate={dates.startDate ?? null}
        verticalSpacing={0}
        weekDayFormat="dd"
      />
      {helperText && <FormHelperText as="div">{helperText}</FormHelperText>}
    </Container>
  );
}

export default DateRangePickerContainer;
