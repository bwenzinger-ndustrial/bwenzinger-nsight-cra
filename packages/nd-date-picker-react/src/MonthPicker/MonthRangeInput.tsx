import React, { Fragment, useState, useMemo } from 'react';
import styled from 'styled-components';
import CalendarIcon from '../CalendarIcon';
import constants from '../constants';
import moment, { Moment } from 'moment';
import { defaultTheme } from '@ndustrial/nd-theme-react';
const { DATE_FORMAT } = constants;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
`;

interface MonthRangeInputStyledProps {
  error: any;
}

const DateInput = styled.input<MonthRangeInputStyledProps>`
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  
  ${({ error }) => {
    if (error) return 'animation: error .5s linear';
  }};

  color: ${({ color }) => color || defaultTheme.uiKitText.text};

  &:first-child {
    padding-left: 16px;
  }

  &::placeholder {
    color: ${defaultTheme.uiKitText.placeholder};
  }
  
  @keyframes error {
    0% {
      color: ${defaultTheme.uiKitStates.error || 'red'};
      transform: translate(2px,0);
    }
    50% {
      transform: translate(-2px,0);
    }
    85% {
      transform: translate(0px,0);
      color: ${defaultTheme.uiKitStates.error || 'red'};
      opacity: 1;
    }
    100% {
      opacity: 0;
   }
`;

const Dash = styled.span`
  line-height: 35px;
  padding: 0 8px 0 5px;
`;

interface MonthRangeInputTextWrapperStyledProps {
  startDate?: Moment | null;
  disabled?: boolean;
  focus?: boolean;
}

const InputTextWrapper = styled.div<MonthRangeInputTextWrapperStyledProps>`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 42px;
  border: 1px solid ${defaultTheme.uiKitInput.border};
  cursor: pointer;
  transition: all 0.15s ease-out;
  font-size: 16px;
  font-weight: 400;
  position: relative;
  background-color: ${defaultTheme.uiKitBackground.background};

  ${IconWrapper} {
    min-width: 52px;
  }

  ${DateInput} {
    width: 9.5ch;
  }

  ${DateInput}:first-child {
    width: ${({ startDate }) => (startDate ? '9.5ch' : '100%;')};
  }

  ${({ disabled, color }) =>
    disabled
      ? `
      pointer-events: none;
      opacity: .5;
      cursor: no-allowed;
      
      ${CalendarIcon} {
        stroke: ${defaultTheme.uiKitText.disabled};
      }
    `
      : `
      &:hover {
        border-color: ${color}
      }
    `}

  ${({ focus, disabled, color }) =>
    focus &&
    !disabled &&
    `
      border-color: ${color};
      ${IconWrapper} {
         background-color: ${color};         
      }
      ${CalendarIcon} {
        stroke: white;
      }
    `}
`;

const checkAndGetDate = (value: string) => {
  const now = moment();

  // MM/YYYY regex
  const format = /(0[1-9]|1[012])([- /.])((19|20)\d\d)/i;
  const parsedValued = moment(value, DATE_FORMAT);

  // moment.isValid is too lenient, so we test with a regex as well
  if (!format.test(value) || !parsedValued.isValid()) {
    return null;
  }

  if (
    parsedValued.isBefore(now, 'year') ||
    (parsedValued.isSame(now, 'year') && parsedValued.isBefore(now, 'month'))
  ) {
    return parsedValued;
  }

  return null;
};

export interface MonthRangeInputProps {
  startDate?: Moment | null;
  endDate?: Moment | null;
  onSetStartDate: (startDate: Moment) => void;
  onSetEndDate: (endDate: Moment) => void;
  onSetFocus: (focusValue: boolean) => void;
  focus: boolean;
  color?: string;
  disabled?: boolean;
}

function MonthRangeInput({
  startDate,
  endDate,
  onSetStartDate,
  onSetEndDate,
  onSetFocus,
  focus,
  color,
  disabled
}: MonthRangeInputProps) {
  // We start without any values for the from our inputs
  const [startDateFromInput, setStartDateFromInput] = useState<string | null>(
    null
  );
  const [endDateFromInput, setEndDateFromInput] = useState<string | null>(null);

  const [startInputError, setStartInputError] = useState(false);
  const [endInputError, setEndInputError] = useState(false);

  // get formatted dates from props so we can use them in the input display
  const startDateValue = useMemo(() => {
    return startDate ? startDate.format(DATE_FORMAT) : null;
  }, [startDate]);

  const endDateValue = useMemo(() => {
    return endDate ? endDate.format(DATE_FORMAT) : null;
  }, [endDate]);

  /**
   * Handles blur updates to either input in a repeatable way.  Results in
   * a date being set, or errored on, based on the input value. Requires appropriate
   * functions as arguments as this function doesn't know their internals, only how to order them.
   *
   * @param {object} e - event to get the input value
   * @param {moment} currentValue - a value to set the date back to, if the input was invalid
   * @param {function} onSetDate - set date state function
   * @param {function} setInput - set input state function
   * @param {function} errorFunc - error callback
   */
  const blur = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    currentValue: Moment | undefined | null,
    onSetDate: Function,
    setInput: Function,
    errorFunc: Function
  ) => {
    if (!e.currentTarget.value) {
      return;
    }

    const date = checkAndGetDate(e.currentTarget.value);

    // Prevent unnecessary date setting
    if (
      date &&
      currentValue &&
      date.isSame(currentValue, 'month') &&
      date.isSame(currentValue, 'year')
    ) {
      return;
    }

    if (date) {
      setInput(null);
      onSetDate(date);
    } else {
      errorFunc(true);

      // Timeout is used in conjunction with animation time of the DateInput error animation
      setTimeout(() => {
        errorFunc(false);
        setInput(currentValue ? currentValue.format(DATE_FORMAT) : null);
      }, 500);
    }
  };

  const checkKeyPressAndBlur = (e: any) => {
    if (e.charCode === 13) {
      e.currentTarget.blur();
    }
  };

  return (
    <InputTextWrapper
      startDate={startDate}
      focus={focus}
      color={color}
      onClick={() => onSetFocus(true)}
      disabled={disabled}
    >
      <DateInput
        error={startInputError}
        placeholder={'Select a date range (MM/YYYY)'}
        value={startDateFromInput || startDateValue || ''}
        onChange={(e) => setStartDateFromInput(e.currentTarget.value)}
        onKeyPress={checkKeyPressAndBlur}
        onBlur={(e) =>
          blur(
            e,
            startDate,
            onSetStartDate,
            setStartDateFromInput,
            setStartInputError
          )
        }
        color={color}
      />
      {startDate && (
        <Fragment>
          <Dash>-</Dash>
          <DateInput
            error={endInputError}
            value={endDateFromInput || endDateValue || ''}
            onChange={(e) => setEndDateFromInput(e.currentTarget.value)}
            onKeyPress={checkKeyPressAndBlur}
            onBlur={(e) =>
              blur(
                e,
                endDate,
                onSetEndDate,
                setEndDateFromInput,
                setEndInputError
              )
            }
            color={color}
          />
        </Fragment>
      )}
      <IconWrapper
        onClick={(e) => {
          // Let the user close by clicking the icon
          e.stopPropagation();
          onSetFocus(!focus);
        }}
      >
        <CalendarIcon accentColor={color} />
      </IconWrapper>
    </InputTextWrapper>
  );
}

export default MonthRangeInput;
