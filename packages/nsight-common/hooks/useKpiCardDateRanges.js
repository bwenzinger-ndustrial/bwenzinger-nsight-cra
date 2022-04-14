import { useMemo } from 'react';
import moment from 'moment';

// Making this a hook under the assumption that dates for kpi cards will always (at least as of 4/15/21)
// display the last completed month, compared to the same month in the previous year
export default function useKpiDateRanges() {
  // Generate the current month and year
  const now = moment();
  const currentMonth = now.month();
  const currentYear = now.year();

  const dateRanges = useMemo(() => {
    // Generate the last completed month's last day, as a moment
    const primaryRangeEnd = moment()
      .utc()
      .subtract(1, 'month')
      .endOf('month');

    // Generate a moment a month prior to range end
    const primaryRangeMonthlyStart = primaryRangeEnd.clone().startOf('month');

    // Generate a moment 12 months (in days, hence the 11 month subtraction) prior to primaryRangeEnd
    const primaryRangeAnnualStart = primaryRangeEnd
      .clone()
      .subtract(11, 'months')
      .startOf('month');

    // Generate moments to compare the previous 12 month periods
    const secondaryRangeEnd = primaryRangeEnd
      .clone()
      .subtract(12, 'months')
      .endOf('month');
    const secondaryRangeMonthlyStart = secondaryRangeEnd
      .clone()
      .startOf('month');
    const secondaryRangeAnnualStart = primaryRangeAnnualStart
      .clone()
      .subtract(12, 'months')
      .startOf('month');

    return {
      monthRange: {
        primaryRangeStart: primaryRangeMonthlyStart,
        primaryRangeEnd: primaryRangeEnd,
        secondaryRangeStart: secondaryRangeMonthlyStart,
        secondaryRangeEnd: secondaryRangeEnd
      },
      annualRange: {
        primaryRangeStart: primaryRangeAnnualStart,
        primaryRangeEnd: primaryRangeEnd,
        secondaryRangeStart: secondaryRangeAnnualStart,
        secondaryRangeEnd: secondaryRangeEnd
      }
    };
  }, [currentMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...dateRanges,
    currentMonth,
    currentYear
  };
}
