import { NdCalendarTypes, NdCalendarRangeTypes } from './types';

export interface DatePickerConstants {
  TOGGLE_TRANSITION_SPEED: number;
  MAX_CALENDAR_WIDTH: string;
  DATE_FORMAT: string;
  calendarTypes: {
    MONTH: NdCalendarTypes;
    DAY: NdCalendarTypes;
  };
  rangeTypes: {
    PRIMARY: NdCalendarRangeTypes;
    COMPARISON: NdCalendarRangeTypes;
  };
}

const toReturn: DatePickerConstants = {
  TOGGLE_TRANSITION_SPEED: 0.2,
  MAX_CALENDAR_WIDTH: '270px',
  DATE_FORMAT: 'MM/YYYY',
  calendarTypes: {
    MONTH: 'MONTH',
    DAY: 'DAY'
  },
  rangeTypes: {
    PRIMARY: 'primary',
    COMPARISON: 'comparison'
  }
};

export default toReturn;

// export default {
//   TOGGLE_TRANSITION_SPEED: 0.2,
//   MAX_CALENDAR_WIDTH: '270px',
//   DATE_FORMAT: 'MM/YYYY',
//   calendarTypes: {
//     MONTH: 'MONTH',
//     DAY: 'DAY'
//   },
//   rangeTypes: {
//     PRIMARY: 'primary',
//     COMPARISON: 'comparison'
//   }
// };
