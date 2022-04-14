import React, {
  Fragment,
  useCallback,
  useState,
  useMemo,
  useEffect
} from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import constants from '../constants';
import DateRangeComparisonController from './DateRangeComparisonController';
import { defaultTheme } from '@ndustrial/nd-theme-react';
import RangePicker from './RangePicker';
import {
  NdCalendarTypes,
  NdDatePickerDatesRange,
  NdDateRangePickerProps,
  NdMonthPickerProps
} from '../types';

const WidgetText = styled.span`
  padding: 12px;
  font-size: 14px;
  color: ${defaultTheme.uiKitText.textSecondary};
`;

// const propTypes = {
//   label: PropTypes.string,
//   calendarType: PropTypes.oneOf([...Object.values(constants.calendarTypes)])
//     .isRequired,
//   onComparisonDatesChange: PropTypes.func.isRequired,
//   onPrimaryDatesChange: PropTypes.func.isRequired,
//   comparisonDates: PropTypes.shape({
//     from: momentPropTypes.momentObj,
//     to: momentPropTypes.momentObj
//   }).isRequired,
//   primaryDates: PropTypes.shape({
//     from: momentPropTypes.momentObj,
//     to: momentPropTypes.momentObj
//   }).isRequired,
//   autoFillComparisonRangeEndDate: PropTypes.bool
// };

export type DatePickerDatesRangeWithBaseline = NdDatePickerDatesRange & {
  baselineYear?: number;
};

export interface MultiCalendarComparisonWidgetProps {
  label?: string;
  calendarType: NdCalendarTypes;
  onComparisonDatesChange: (params: NdDatePickerDatesRange) => void;
  onPrimaryDatesChange: (params: NdDatePickerDatesRange) => void;
  comparisonDates: NdDatePickerDatesRange;
  primaryDates: NdDatePickerDatesRange;
  autoFillComparisonRangeEndDate?: boolean;
}

// const defaultProps = {
//   label: 'I want to compare',
//   autoFillComparisonRangeEndDate: true,
//   calendarType: constants.calendarTypes.DAY
// };

function MultiCalendarComparisonWidget({
  label = 'I want to compare',
  calendarType = 'DAY',
  primaryDates,
  onPrimaryDatesChange,
  comparisonDates,
  onComparisonDatesChange,
  autoFillComparisonRangeEndDate = true
}: MultiCalendarComparisonWidgetProps) {
  const { MONTH } = constants.calendarTypes;
  // Used to calculate moment comparisons
  const diffType = calendarType === MONTH ? 'months' : 'days';

  const [_primaryDates, _setPrimaryDates] = useState(primaryDates);
  const [_comparisonDates, _setComparisonDates] = useState(comparisonDates);

  useEffect(() => _setPrimaryDates(primaryDates), [primaryDates]);
  useEffect(() => _setComparisonDates(comparisonDates), [comparisonDates]);

  const maxPrimaryDate = useMemo(() => moment(), []);
  const maxComparisonDate = useMemo(
    () =>
      _primaryDates.from
        ? _primaryDates.from.clone().subtract(1, 'days').endOf('day')
        : moment(),
    [_primaryDates.from] // why is this maxed at previous?
  );

  const comparisonEndDayOffset = useCallback(
    (day: Moment) => {
      const { from, to } = _primaryDates;

      if (from && to) {
        return day.add(to.diff(from, diffType), diffType);
      }
      return null;
    },
    [_primaryDates]
  );

  const _onSetPrimaryDates = useCallback(
    ({ startDate, endDate }) => {
      if (startDate && endDate) {
        // When this isn't done, moment makes unpredictable calculations with diff
        startDate.hours(0);
        endDate.hours(0);

        onPrimaryDatesChange({
          from: startDate,
          to: calendarType === MONTH ? endDate : endDate.startOf('day')
        });

        // Clear old comparison out
        onComparisonDatesChange({ from: null, to: null });
      }
      _setPrimaryDates({ from: startDate, to: endDate });
    },
    [_setPrimaryDates, onPrimaryDatesChange]
  );

  const _onSetComparisonDates = useCallback(
    ({ startDate, endDate }) => {
      if (startDate && endDate) {
        onComparisonDatesChange({
          from: startDate,
          to: calendarType === MONTH ? endDate : endDate.startOf('day')
        });
      }
      _setComparisonDates({ from: startDate, to: endDate });
    },
    [_setComparisonDates, onComparisonDatesChange]
  );

  return (
    <DateRangeComparisonController
      defaultUnitSelection={calendarType === MONTH ? 'months' : 'days'}
      onComparisonDatesChange={_onSetComparisonDates}
      onPrimaryDatesChange={_onSetPrimaryDates}
      primaryDates={_primaryDates}
      calendarType={calendarType}
    >
      {({
        comparisonProps,
        primaryProps
      }: {
        comparisonProps: NdDateRangePickerProps | NdMonthPickerProps;
        primaryProps: NdDateRangePickerProps | NdMonthPickerProps;
      }) => {
        return (
          <Fragment>
            <WidgetText>{label}</WidgetText>
            <RangePicker
              baseProps={primaryProps}
              dateRange={_primaryDates}
              maxDate={maxPrimaryDate}
              onDatesChange={_onSetPrimaryDates}
              color={defaultTheme.uiKitCalendar.calendarPrimary}
              calendarType={calendarType}
            />
            <WidgetText> vs </WidgetText>
            <RangePicker
              baseProps={comparisonProps}
              dateRange={_comparisonDates}
              maxDate={maxComparisonDate}
              onDatesChange={_onSetComparisonDates}
              color={defaultTheme.uiKitCalendar.calendarComparison}
              calendarType={calendarType}
              initialValue={() =>
                _comparisonDates.from || maxComparisonDate || moment()
              }
              disabled={
                !_primaryDates || !_primaryDates.to || !_primaryDates.from
              }
              // @ts-ignore next-line ignoring for now because react-dates doesn't expect null
              endDateOffset={
                autoFillComparisonRangeEndDate ? comparisonEndDayOffset : null
              }
            />
          </Fragment>
        );
      }}
    </DateRangeComparisonController>
  );
}

export default MultiCalendarComparisonWidget;
