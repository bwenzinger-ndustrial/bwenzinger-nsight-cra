import moment from 'moment';

function getDataInDateRange(data, cpDates, toConvert) {
  return data.filter((d) => {
    const pointTime = toConvert ? moment(d.time) : moment.unix(d.time);
    return (
      pointTime.isSameOrAfter(cpDates.from) &&
      pointTime.isSameOrBefore(cpDates.to)
    );
  });
}

export default getDataInDateRange;
