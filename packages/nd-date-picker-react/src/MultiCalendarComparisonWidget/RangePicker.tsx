import React from 'react';

import constants from '../constants';
import MonthPicker from '../MonthPicker';
import DateRangePicker from '../DateRangePicker';
import { NdDateRangePickerProps, NdRangePickerProps } from '../types';

// const propTypes = {
//   baseProps: PropTypes.object,
//   dateRange: PropTypes.shape({
//     from: momentPropTypes.momentObj,
//     to: momentPropTypes.momentObj
//   }),
//   maxDate: momentPropTypes.momentObj,
//   onDatesChange: PropTypes.func,
//   color: PropTypes.string,
//   calendarType: PropTypes.string,
//   initialValue: PropTypes.func,
//   disabled: PropTypes.bool,
//   endDateOffset: PropTypes.func
// };

// interface RangePickerProps {
//   baseProps: PropTypes.object,
//   dateRange: PropTypes.shape({
//     from: momentPropTypes.momentObj,
//     to: momentPropTypes.momentObj
//   }),
//   maxDate: momentPropTypes.momentObj,
//   onDatesChange: PropTypes.func,
//   color: PropTypes.string,
//   calendarType: PropTypes.string,
//   initialValue: PropTypes.func,
//   disabled: PropTypes.bool,
//   endDateOffset: PropTypes.func
// }

function RangePicker({
  baseProps,
  dateRange,
  maxDate,
  onDatesChange,
  color,
  calendarType,
  initialValue,
  disabled = false,
  endDateOffset
}: NdRangePickerProps) {
  return calendarType === constants.calendarTypes.MONTH ? (
    <MonthPicker
      {...baseProps}
      maxSelectable={maxDate}
      onSetRange={onDatesChange}
      range={dateRange}
      initialDate={initialValue && initialValue()}
      color={color}
      disabled={disabled}
      endDateOffset={endDateOffset}
    />
  ) : (
    <DateRangePicker
      {...baseProps}
      endDate={dateRange.to ?? null}
      endDateId={`${(baseProps as NdDateRangePickerProps).type}-end-date`}
      inputColor={color}
      accentColor={color}
      maxDate={maxDate}
      onDatesChange={onDatesChange}
      startDate={dateRange.from ?? null}
      startDateId={`${(baseProps as NdDateRangePickerProps).type}-start-date`}
      initialVisibleMonth={initialValue}
      disabled={disabled}
      endDateOffset={endDateOffset}
    />
  );
}

// RangePicker.propTypes = propTypes;
export default RangePicker;
