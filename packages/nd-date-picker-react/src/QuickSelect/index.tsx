import moment from 'moment';
import React, { useMemo } from 'react';

import QuickSelectOptions from './Options';
import constants from '../constants';
import { DatePickerDatesRangeWithBaseline } from '../MultiCalendarComparisonWidget';
import {
  NdCalendarTypes,
  NdDatePickerDatesRange,
  NdDatePickerDatesWithType,
  NdCalendarRangeTypes,
  NdCalendarRangeUnitTypes
} from '../types';

export interface QuickSelectUnitOptions {
  text?: () => string;
  textFromDates?: (params: DatePickerDatesRangeWithBaseline) => string;
  dates: (
    params: NdDatePickerDatesRange,
    baselineYear: number
  ) => NdDatePickerDatesWithType;
  isVisible?: ({ calendarType, from, to }: any) => boolean;
}

export interface QuickSelectPrimaryUnitOptions {
  [key: string]: QuickSelectUnitOptions[];
}

const PRIMARY_UNITS_FOR_DAYS_TYPE: NdCalendarRangeUnitTypes[] = [
  'days',
  'months',
  'years'
];
const PRIMARY_UNITS_FOR_MONTH_TYPE: NdCalendarRangeUnitTypes[] = [
  'months',
  'years'
];
const PRIMARY_UNIT_OPTIONS: QuickSelectPrimaryUnitOptions = {
  days: [
    {
      text: () => 'Last 7 Days',
      dates: () => ({
        endDate: moment().endOf('day'),
        startDate: moment().subtract(6, 'days').startOf('day'),
        type: 'days'
      })
    },
    {
      text: () => 'Last Week',
      dates: () => ({
        endDate: moment().subtract(1, 'weeks').endOf('week'),
        startDate: moment().subtract(1, 'weeks').startOf('week')
      })
    },
    {
      text: () => 'Last 30 Days',
      dates: () => ({
        endDate: moment().endOf('day'),
        startDate: moment().subtract(30, 'days').startOf('day'),
        type: 'days'
      })
    }
  ],
  months: [
    {
      text: () => 'Month-to-date',
      dates: () => ({
        endDate: moment().endOf('day'),
        startDate: moment().startOf('month'),
        type: 'month'
      }),
      isVisible: (calendarType: NdCalendarTypes) =>
        calendarType !== constants.calendarTypes.MONTH
    },
    {
      text: () => 'Last Month',
      dates: () => ({
        endDate: moment().subtract(1, 'months').endOf('month'),
        startDate: moment().subtract(1, 'months').startOf('month'),
        type: 'month'
      }),
      isVisible: (calendarType: NdCalendarTypes) =>
        calendarType !== constants.calendarTypes.MONTH
    },
    {
      text: () => 'Last 3 Months',
      dates: () => ({
        endDate: moment().subtract(1, 'months').endOf('month'),
        startDate: moment().subtract(3, 'months').startOf('month'),
        type: 'month'
      })
    },
    {
      text: () => 'Last 12 Months',
      dates: () => ({
        endDate: moment().subtract(1, 'months').endOf('month'),
        startDate: moment().subtract(12, 'months').startOf('month'),
        type: 'month'
      })
    }
  ],
  years: [
    {
      text: () => 'Year-to-date',
      dates: () => ({
        endDate: moment().endOf('day'),
        startDate: moment().startOf('year'),
        type: 'year'
      })
    },
    {
      text: () => 'Last Year',
      dates: () => ({
        endDate: moment().subtract(1, 'year').endOf('year'),
        startDate: moment().subtract(1, 'year').startOf('year'),
        type: 'year'
      })
    }
  ]
};

const COMPARISON_OPTIONS: QuickSelectUnitOptions[] = [
  {
    textFromDates: ({ to, from }) => {
      const numberOfDays = from && to && to.diff(from, 'days');
      return `Previous ${(numberOfDays ?? 0) + 1} Day Period`;
    },
    dates: ({ from, to }) => {
      const numberOfDays = from && to && to.diff(from, 'days');

      const endDate = from!!.clone().subtract(1, 'days').endOf('day');
      const startDate = endDate!!
        .clone()
        .subtract(numberOfDays, 'days')
        .startOf('day');

      return {
        endDate,
        startDate
      };
    },
    isVisible: ({ calendarType }) =>
      calendarType !== constants.calendarTypes.MONTH
  },
  {
    textFromDates: ({ from, to }) => {
      return `Previous ${to!!.diff(from, 'months') + 1} Months`;
    },
    dates: ({ from, to }) => {
      const diffMonths = to!!.diff(from, 'months') + 1;
      const endDate = to?.clone().subtract(diffMonths, 'months');
      const startDate = from?.clone().subtract(diffMonths, 'months');

      return { endDate, startDate };
    },
    isVisible: ({ calendarType }) =>
      calendarType === constants.calendarTypes.MONTH
  },
  {
    text: () => 'Previous Week',
    dates: ({ from, to }) => {
      const endDate = to!!.clone().subtract(1, 'week');
      const startDate = from!!.clone().subtract(1, 'week');

      return { endDate, startDate };
    },
    isVisible: ({ from, to }) =>
      from.week() === to.week() &&
      from.month() === to.month() &&
      from.year() === to.year()
  },
  {
    text: () => 'Previous Month',
    dates: ({ from, to }) => {
      const endDate = to!!.clone().subtract(1, 'months');
      const startDate = from!!.clone().subtract(1, 'months');

      return { endDate, startDate };
    },
    isVisible: ({ from, to }) =>
      from.month() === to.month() && from.year() === to.year()
  },
  {
    text: () => 'Previous Year',
    dates: ({ from, to }) => {
      const endDate = to!!.clone().subtract(1, 'years');
      const startDate = from!!.clone().subtract(1, 'years');

      return { endDate, startDate };
    },
    isVisible: ({ from, to }) => from.year() === to.year()
  },
  {
    textFromDates: ({ to, from, baselineYear }) => {
      return `Baseline Year ${baselineYear ? ' (' + baselineYear + ')' : ''}`;
    },
    dates: ({ from, to }, baselineYear) => {
      const endDate = to!!.clone().year(baselineYear);
      const startDate = from!!.clone().year(baselineYear);

      return { endDate, startDate };
    },
    isVisible: ({ from, to }) => from.year() === to.year()
  }
];

// RangeTypes
interface QuickSelectControllerProps {
  baselineYear: number;
  numberOfDays?: number;
  onQuickSelectRange: ({}: NdDatePickerDatesWithType) => void;
  onSelection: (unit: NdCalendarRangeUnitTypes) => void;
  primaryDates: NdDatePickerDatesRange;
  selectedUnit: NdCalendarRangeUnitTypes;
  type: NdCalendarRangeTypes;
  calendarType: NdCalendarTypes;
}

function QuickSelectController({
  baselineYear,
  onQuickSelectRange,
  onSelection,
  primaryDates,
  selectedUnit,
  type,
  calendarType
}: QuickSelectControllerProps) {
  const units =
    calendarType === constants.calendarTypes.DAY
      ? PRIMARY_UNITS_FOR_DAYS_TYPE
      : PRIMARY_UNITS_FOR_MONTH_TYPE;

  const comparisonOptions = useMemo(() => {
    if (type !== 'comparison') {
      return [];
    }

    return COMPARISON_OPTIONS.filter(({ isVisible }) => {
      return !primaryDates.from || !primaryDates.to
        ? false // TODO: temporary fix (required when there is no primary dates yet)
        : isVisible!({
            from: primaryDates.from,
            to: primaryDates.to,
            calendarType
          });
    });
  }, [primaryDates.from, primaryDates.to, type]);

  const primaryOptions = useMemo(() => {
    return PRIMARY_UNIT_OPTIONS[selectedUnit].filter(({ isVisible }) => {
      return isVisible ? isVisible(calendarType) : true;
    });
  }, [calendarType, selectedUnit]);

  const sharedProps = {
    baselineYear,
    onQuickSelectRange,
    onSelection,
    primaryDates,
    selectedUnit
  };

  if (type === 'primary') {
    return (
      <QuickSelectOptions
        {...sharedProps}
        options={primaryOptions}
        units={units}
      />
    );
  } else {
    return <QuickSelectOptions {...sharedProps} options={comparisonOptions} />;
  }
}

export default QuickSelectController;
