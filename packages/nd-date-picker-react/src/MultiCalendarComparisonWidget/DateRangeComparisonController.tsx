import React, { useEffect, useState } from 'react';
import QuickSelectController from '../QuickSelect';
import constants from '../constants';
import {
  NdCalendarTypes,
  NdDatePickerDatesRange,
  NdDatePickerStartAndEndDate,
  NdCalendarRangeTypes,
  NdCalendarRangeUnitTypes
} from '../types';
import { FocusedInputShape } from 'react-dates';

interface DateRangeComparisonControllerProps {
  baselineYear?: number;
  children?: Function;
  defaultUnitSelection?: NdCalendarRangeUnitTypes;
  onComparisonDatesChange: (values: NdDatePickerStartAndEndDate) => void;
  onPrimaryDatesChange: (values: NdDatePickerStartAndEndDate) => void;
  primaryDates: NdDatePickerDatesRange;
  calendarType: NdCalendarTypes;
}

function DateRangeComparisonController({
  baselineYear = 2014,
  children = () => {},
  defaultUnitSelection = 'days',
  // numberOfDays,
  onComparisonDatesChange,
  onPrimaryDatesChange,
  primaryDates,
  calendarType
}: DateRangeComparisonControllerProps) {
  const [focusInfo, setFocusInfo] = useState<{
    type?: string;
    field?: FocusedInputShape;
  }>({});
  const [selectedUnit, setSelectedUnit] = useState(defaultUnitSelection);

  // defaultUnitSelection can change during the loading process for a chart. Once it's finished loading though it
  // shouldn't change anymore, so selectedUnit will be stable by the time the user is interacting with the component.
  useEffect(() => {
    setSelectedUnit(defaultUnitSelection);
  }, [defaultUnitSelection]);

  const baseProps = {
    calendarInfoPosition: 'top'
  };

  // NOTE: onFocusChange, renderCalendarInfo are props of react-dates (https://github.com/airbnb/react-dates)
  // renderCalendarInfo is how we render additional components between the text input and the calendar view
  // i.e Comparison Type, Quick Select
  const primaryProps = {
    ...baseProps,
    type: constants.rangeTypes.PRIMARY,
    focused:
      focusInfo.type === constants.rangeTypes.PRIMARY
        ? focusInfo.field
        : undefined,
    onFocusChange: ({ focused }: any) => {
      setFocusInfo({
        field: focused,
        type: constants.rangeTypes.PRIMARY
      });
    },
    // eslint-disable-next-line react/display-name
    renderCalendarInfo: () => (
      <QuickSelectController
        baselineYear={baselineYear}
        onQuickSelectRange={({ type, startDate, endDate }) => {
          onPrimaryDatesChange({ startDate, endDate });
          setFocusInfo({});
        }}
        onSelection={setSelectedUnit}
        primaryDates={primaryDates}
        selectedUnit={selectedUnit}
        type={constants.rangeTypes.PRIMARY as NdCalendarRangeTypes}
        calendarType={calendarType}
      />
    )
  };

  const comparisonProps = {
    ...baseProps,
    type: constants.rangeTypes.COMPARISON,
    focused:
      focusInfo.type === constants.rangeTypes.COMPARISON
        ? focusInfo.field
        : undefined,
    onFocusChange: ({ focused }: any) => {
      setFocusInfo({
        field: focused,
        type: constants.rangeTypes.COMPARISON
      });
    },
    // eslint-disable-next-line react/display-name
    renderCalendarInfo: () => (
      <QuickSelectController
        baselineYear={baselineYear}
        onQuickSelectRange={(values) => {
          onComparisonDatesChange(values);
          setFocusInfo({});
        }}
        onSelection={setSelectedUnit}
        primaryDates={primaryDates}
        selectedUnit={selectedUnit}
        type={constants.rangeTypes.COMPARISON as NdCalendarRangeTypes}
        calendarType={calendarType}
      />
    )
  };

  return children({ comparisonProps, primaryProps });
}

export default DateRangeComparisonController;
