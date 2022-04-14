import { fill, sortBy } from 'lodash';
import moment from 'moment';

// Parses a heatmap season and return an array of rates by day of week
// [
//   {
//     "name": "Mon",
//     "dayIndex": 0,
//     "hours": [
//       {
//         "id": 0,
//         "periods": [
//           {
//             "hour": 0,
//             "periodId": 6,
//             "minuteEnd": 59,
//             "minuteStart": 0
//           }
//         ]
//       },
//       ...
//   },
//   {
//     "name": "Tue",
//     "dayIndex": 1,
//     "hours": [
//       {
//         "id": 0,
//         "periods": [
//           {
//             "hour": 0,
//             "periodId": 6,
//             "minuteEnd": 59,
//             "minuteStart": 0
//           }
//         ]
//       },
//       ...
//   }
// ]
function dayHeatmapParser(seasonPeriods = []) {
  // Generate empty shell of multi-level array
  const heatmap = fill(new Array(7), null).map((_, dayIndex) => {
    return {
      dayIndex,
      name: moment()
        .isoWeekday(dayIndex + 1)
        .format('ddd'),
      hours: fill(new Array(24), null).map((_, hourIndex) => {
        return {
          id: hourIndex,
          periods: []
        };
      })
    };
  });
  const sortedPeriods = sortBy(seasonPeriods, [
    'dayOfWeekStart',
    'hourStart',
    'minuteStart'
  ]);

  sortedPeriods.forEach((period) => {
    const {
      _periodId,
      dayOfWeekStart,
      dayOfWeekEnd,
      hourStart,
      hourEnd,
      minuteEnd,
      minuteStart
    } = period;

    // Iterate over each day of the period
    for (let i = dayOfWeekStart, j = dayOfWeekEnd; i <= j; i++) {
      const dayOfWeek = heatmap[i];

      // Iterate over each hour of the period
      for (let k = hourStart, l = hourEnd; k <= l; k++) {
        const hourOfDay = dayOfWeek.hours[k];

        hourOfDay.periods.push({
          hour: k,
          periodId: _periodId,
          minuteEnd: k === hourEnd ? minuteEnd : 59,
          minuteStart: k === hourStart ? minuteStart : 0
        });
      }
    }
  });

  return heatmap;
}

// Parses a heatmap season and return an array of rates by months of the year
// [
//   {
//     "name": "Jan",
//     "monthIndex": 0,
//     "hours": [
//       {
//         "id": 0,
//         "periods": [
//           {
//             "hour": 0,
//             "periodId": 6,
//             "minuteEnd": 59,
//             "minuteStart": 0
//           }
//         ]
//       },
//       ...
//   },
//   {
//     "name": "Feb",
//     "monthIndex": 1,
//     "hours": [
//       {
//         "id": 0,
//         "periods": [
//           {
//             "hour": 0,
//             "periodId": 6,
//             "minuteEnd": 59,
//             "minuteStart": 0
//           }
//         ]
//       },
//       ...
//   }
// ]
function yearHeatmapParser(seasonPeriods = []) {
  // Generate empty shell of multi-level array
  const heatmap = fill(new Array(12), null).map((_, monthIndex) => {
    return {
      monthIndex,
      name: moment()
        .month(monthIndex)
        .format('MMM'),
      hours: fill(new Array(24), null).map((_, hourIndex) => {
        return {
          id: hourIndex,
          periods: []
        };
      })
    };
  });

  const sortedPeriods = sortBy(seasonPeriods, [
    'startMonth',
    'dayOfWeekStart',
    'hourStart',
    'minuteStart'
  ]);

  sortedPeriods.forEach((period) => {
    const {
      _periodId,
      endMonth,
      hourStart,
      hourEnd,
      minuteEnd,
      minuteStart,
      startMonth
    } = period;

    // Iterate over each month of the period
    for (let i = startMonth, j = endMonth; i <= j; i++) {
      const month = heatmap[i - 1];

      // Iterate over each hour of the period
      for (let k = hourStart, l = hourEnd; k <= l; k++) {
        const hourOfDay = month.hours[k];

        hourOfDay.periods.push({
          hour: k,
          periodId: _periodId,
          minuteEnd: k === hourEnd ? minuteEnd : 59,
          minuteStart: k === hourStart ? minuteStart : 0
        });
      }
    }
  });

  return heatmap;
}

export { dayHeatmapParser, yearHeatmapParser };
