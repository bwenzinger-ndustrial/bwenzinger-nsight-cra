import moment from 'moment';
import React, { useState } from 'react';
import {
  FocusedInputShape,
  SingleDatePicker,
  SingleDatePickerShape
} from 'react-dates';
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

const DEFAULT_FORMAT = 'M/D/YYYY';
const MIN_WIDTH = 310;

interface OnFocusChangeProps {
  focused: boolean;
}

export interface SingleDatePickerContainerStylingProps {
  accentColor?: string;
  width?: number;
  focused?: boolean;
  hasMonthYearSelection?: boolean;
  invalid?: boolean;
}

interface SingleDatePickerPassedProps {
  // accentColor?: string,
  autoFocus?: boolean;
  className?: string;
  date?: moment.Moment;
  disabled?: boolean;
  displayFormat?: string;
  // hasMonthYearSelection?: boolean,
  helperText?: string;
  id: string;
  // invalid?: boolean,
  isOutsideRange?: (day: moment.Moment) => boolean;
  label?: string;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  onFocusChange?: ({ focused }: OnFocusChangeProps) => void;
  required?: boolean;
  value: moment.Moment | null;
  // width?: number
}

// omitting these properties below because we're handling them manually ourselves within this component
export type SingleDatePickerProps = SingleDatePickerPassedProps &
  SingleDatePickerContainerStylingProps &
  Omit<SingleDatePickerShape, 'onFocusChange' | 'focused' | 'date'>;

interface RenderMonthElementProps {
  month: moment.Moment;
  onMonthSelect: (currentMonth: moment.Moment, newMonthVal: string) => void;
  onYearSelect: (currentMonth: moment.Moment, newMonthVal: string) => void;
}

const Container = styled(FormControl)<SingleDatePickerContainerStylingProps>`
  display: inline-block;

  .SingleDatePickerInput__withBorder {
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
    width: ${({ width }) => width + 'px'};
    position: relative;
    transition: all 0.15s ease-out;

    &:hover {
      border-color: ${({ accentColor }) => accentColor};
    }
  }

  .SingleDatePickerInput__disabled {
    cursor: not-allowed;

    &:hover {
      border-color: #ebebeb;
    }
  }

  .DateInput {
    padding-right: 52px;
    width: 100%;
  }

  .DateInput_input {
    background-color: #fbfbfb;
    border-width: 0px;
    box-sizing: content-box;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    font-size: 14px;
    height: 16px;
    line-height: 16px;
    padding-bottom: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    resize: none;
    width: 100%;

    &::placeholder {
      color: #a8a8a8;
    }
  }

  .DateInput_input__disabled {
    cursor: not-allowed;
    font-style: normal;
  }

  .SingleDatePickerInput_calendarIcon {
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

    &:focus {
      background-color: ${({ accentColor }) => accentColor};

      ${CalendarIcon} {
        stroke: #fbfbfb;
      }
    }
  }

  .SingleDatePickerInput__disabled .SingleDatePickerInput_calendarIcon {
    cursor: not-allowed;
  }

  .DateInput_fang {
    display: none;
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

function SingleDatePickerContainer(props: SingleDatePickerProps) {
  const {
    accentColor = '#2764ae',
    autoFocus = false,
    className,
    disabled,
    displayFormat = DEFAULT_FORMAT,
    hasMonthYearSelection = true,
    helperText,
    id,
    invalid,
    isOutsideRange,
    label,
    maxDate = moment().add(10, 'years'),
    minDate = moment().subtract(10, 'years'),
    onFocusChange,
    required,
    value,
    width = MIN_WIDTH,
    ...restProps
  } = props;

  const [focused, setFocused] = useState(autoFocus);
  const [isMenuFocused, setMenuFocus] = useState(false);

  return (
    <Container
      accentColor={accentColor}
      width={width}
      className={className}
      focused={focused}
      hasMonthYearSelection={hasMonthYearSelection}
      invalid={invalid || (required && !value)}
    >
      {label && (
        <InputLabel htmlFor={id}>
          {label}
          {required && <span>&nbsp;*</span>}
        </InputLabel>
      )}
      <SingleDatePicker
        customInputIcon={
          <CalendarIcon
            accentColor={accentColor}
            disabled={disabled}
            focused={focused}
          />
        }
        hideKeyboardShortcutsPanel
        inputIconPosition="after"
        numberOfMonths={1}
        placeholder={displayFormat}
        {...(restProps as SingleDatePickerShape)}
        date={value}
        daySize={40}
        disabled={disabled}
        displayFormat={displayFormat}
        focused={focused}
        horizontalMonthPadding={4}
        id={id}
        isOutsideRange={(day) => {
          if (isOutsideRange) {
            return isOutsideRange(day);
          }

          return maxDate.isBefore(day) || minDate.isAfter(day);
        }}
        navNext={<NextMonth />}
        navPrev={<PreviousMonth />}
        onFocusChange={({ focused }) => {
          if (hasMonthYearSelection && isMenuFocused) {
            return;
          }

          if (onFocusChange) {
            onFocusChange({ focused });
          }

          setFocused(focused);
        }}
        renderMonthText={undefined}
        renderMonthElement={({
          month,
          onMonthSelect,
          onYearSelect
        }: RenderMonthElementProps) =>
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
        small
        verticalSpacing={12}
        weekDayFormat="dd"
      />
      {helperText && <FormHelperText as="div">{helperText}</FormHelperText>}
    </Container>
  );
}

export default SingleDatePickerContainer;
