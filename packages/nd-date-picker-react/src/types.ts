import { FocusedInputShape } from 'react-dates';
import { NdFormControlProps } from '@ndustrial/nd-inputs-react';
import { DateRangePickerPassedProps } from './DateRangePicker';
import { DateRangePickerShape as ReactDatesDateRangePickerShape } from 'react-dates';
import { Moment } from 'moment';
import { ReactNode } from 'react';

export type NdCalendarTypes = 'DAY' | 'MONTH';
export type NdCalendarRangeTypes = 'primary' | 'comparison';
export type NdCalendarRangeUnitTypes = 'days' | 'months' | 'years';

export interface NdDatePickerDatesRange {
  from?: Moment | null;
  to?: Moment | null;
}

export interface NdDatePickerStartAndEndDate {
  startDate?: Moment | null;
  endDate?: Moment | null;
}

export type NdDatePickerDatesWithType = NdDatePickerStartAndEndDate & {
  type?: string;
};

export interface NdDateRangePickerStylingProps {
  accentColor?: string;
  focused?: boolean | FocusedInputShape | null;
  invalid?: boolean;
  currentStartDate?: Moment | null;
  inputColor?: string;
  displayFormat?: string;
  hasMonthYearSelection?: boolean;
}

export type NdDateRangePickerProps = DateRangePickerPassedProps &
  NdFormControlProps &
  NdDateRangePickerStylingProps &
  Omit<
    ReactDatesDateRangePickerShape,
    'onFocusChange' | 'onDatesChange' | 'focusedInput'
  >;

export type NdMonthPickerProps = {
  range?: NdDatePickerDatesRange;
  minDate?: Moment;
  maxDate?: Moment;
  maxSelectable?: Moment;
  onSetRange: (arg: NdDatePickerStartAndEndDate) => void;
  renderCalendarInfo?: (() => ReactNode) | null | undefined;
  initialDate?: Moment;
  color?: string;
  disabled?: boolean;
  endDateOffset?: (day: Moment) => Moment;
};

interface NdRangePickerCommonProps {
  dateRange: NdDatePickerDatesRange;
  maxDate: Moment;
  onDatesChange: (arg: NdDatePickerStartAndEndDate) => void;
  color?: string;
  initialValue?: () => moment.Moment;
  disabled?: boolean;
  endDateOffset?: (day: Moment) => Moment;
}

interface NdRangePickerCalendarTypeProps {
  calendarType: string;
  baseProps: NdMonthPickerProps | NdDateRangePickerProps;
}

export type NdRangePickerProps = NdRangePickerCalendarTypeProps &
  NdRangePickerCommonProps;
