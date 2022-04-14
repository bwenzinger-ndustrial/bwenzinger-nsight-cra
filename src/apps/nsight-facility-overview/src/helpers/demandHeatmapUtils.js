import moment from 'moment';

function formatWeeklyDemand(data) {
  const xLabels = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM'
  ];

  let minVal;

  const groupedByDayAndHourData = data.values.reduce(
    (memo, { event_time: eventTime, value }) => {
      const date = new Date(eventTime);
      const day = date.getDay();
      const hour = date.getHours();

      const key = `${day}-${hour}`;

      if (!memo[key]) {
        memo[key] = [];
      }

      memo[key].push(value);

      return memo;
    },
    {}
  );

  const groupedByDayAndHourAveragedData = Object.keys(
    groupedByDayAndHourData
  ).reduce((memo, key) => {
    const filteredValues = groupedByDayAndHourData[key].filter(
      (value) => value || value === 0
    );

    memo[key] =
      filteredValues.reduce((totalValue, value) => {
        totalValue += value;
        return totalValue;
      }, 0) / filteredValues.length;

    if (!minVal || memo[key] < minVal) {
      minVal = memo[key];
    }

    return memo;
  }, {});

  const formattedChartData = Object.keys(groupedByDayAndHourAveragedData).map(
    (dayHour) => {
      const [unParsedDay, unParsedHour] = dayHour.split('-');
      const day = parseInt(unParsedDay);
      const hour = parseInt(unParsedHour);

      return [hour, day, groupedByDayAndHourAveragedData[`${day}-${hour}`]];
    }
  );

  return {
    chartData: formattedChartData || [],
    yLabels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    xLabels: xLabels,
    minVal: minVal || minVal === 0 ? minVal : null
  };
}

function formatDailyDemand(data, timezone) {
  const xLabels = [
    '12:00 AM',
    '1:00 AM',
    '2:00 AM',
    '3:00 AM',
    '4:00 AM',
    '5:00 AM',
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
    '10:00 PM',
    '11:00 PM'
  ];
  let minVal;
  const formattedYLabels = [];

  const groupedByDayAndHourData = data.values.reduce(
    (memo, { event_time: eventTime, value }) => {
      const date = new Date(eventTime);
      const day = date.getDate();
      const hour = date.getHours();

      formattedYLabels.push(moment(date).format('ddd MMMM DD'));

      const key = `${day}-${hour}`;

      if (!memo[key]) {
        memo[key] = [];
      }

      memo[key].push(value);

      return memo;
    },
    {}
  );

  const groupedByDayAndHourAveragedData = Object.keys(
    groupedByDayAndHourData
  ).reduce((memo, key) => {
    const filteredValues = groupedByDayAndHourData[key].filter(
      (value) => value || value === 0
    );

    memo[key] =
      filteredValues.reduce((memo, value) => {
        memo += value;
        return memo;
      }, 0) / filteredValues.length;

    if (!minVal || memo[key] < minVal) {
      minVal = memo[key];
    }

    return memo;
  }, {});

  const finalSortedData = Object.keys(groupedByDayAndHourAveragedData).map(
    (dayHour) => {
      const [unParsedDay, unParsedHour] = dayHour.split('-');
      const day = parseInt(unParsedDay);
      const hour = parseInt(unParsedHour);

      return [hour, day - 1, groupedByDayAndHourAveragedData[`${day}-${hour}`]];
    }
  );

  return {
    chartData: finalSortedData || [],
    yLabels: formattedYLabels.filter(function(item, pos) {
      return formattedYLabels.indexOf(item) === pos;
    }),
    xLabels: xLabels,
    minVal: minVal || minVal === 0 ? minVal : null
  };
}

export default {
  formatDailyDemand,
  formatWeeklyDemand
};
