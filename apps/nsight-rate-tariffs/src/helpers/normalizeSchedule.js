import { isEqual, pick, sortBy } from 'lodash';
import slug from 'slug';

const RATE_COMPARISON_FIELDS = [
  'adjustment',
  'rate',
  'unit',
  'unitStartValue',
  'unitStopValue'
];

const getPeriodId = (function() {
  let i = 0;

  return () => i++;
})();

function getNormalizedData(seasons, type) {
  if (!seasons) {
    return null;
  }

  const normalizedData = seasons.reduce(
    (memo, season) => {
      const normalizedSeason = pick(season, [
        'endDay',
        'endMonth',
        'id',
        'rateScheduleId',
        'seasonName',
        'seasonType',
        'startDay',
        'startMonth',
        'type'
      ]);

      const seasonPeriods = season[`${type}SeasonPeriods`].map(
        (seasonPeriod) => {
          const sortedNewRates = sortBy(seasonPeriod[`${type}TierRates`], [
            'unitStartValue'
          ]);
          const newRatesForComparison = sortedNewRates.map((rate) =>
            pick(rate, RATE_COMPARISON_FIELDS)
          );

          const existingPeriodsIndex = memo.periods.findIndex(
            (existingPeriod) => {
              const existingRates = existingPeriod.rates.map((rate) =>
                pick(rate, RATE_COMPARISON_FIELDS)
              );

              return isEqual(existingRates, newRatesForComparison);
            }
          );

          let periodObj;

          if (existingPeriodsIndex === -1) {
            periodObj = {
              _id: getPeriodId(),
              rates: sortedNewRates.map((rate) => {
                return {
                  adjustment: rate.adjustment,
                  rate: rate.rate,
                  unit: rate.unit,
                  unitStartValue: rate.unitStartValue,
                  unitStopValue: rate.unitStopValue
                };
              })
            };
            memo.periods.push(periodObj);
          } else {
            periodObj = memo.periods[existingPeriodsIndex];
          }

          return {
            _periodId: periodObj._id,
            dayOfWeekEnd: seasonPeriod.dayOfWeekEnd,
            dayOfWeekStart: seasonPeriod.dayOfWeekStart,
            hourEnd: seasonPeriod.hourEnd,
            hourStart: seasonPeriod.hourStart,
            id: seasonPeriod.id,
            minuteEnd: seasonPeriod.minuteEnd,
            minuteStart: seasonPeriod.minuteStart
          };
        }
      );

      normalizedSeason._scheduleType = 'seasonal';
      normalizedSeason.seasonPeriods = seasonPeriods;
      normalizedSeason.slug = slug(normalizedSeason.seasonName).toLowerCase();

      memo.seasons.push(normalizedSeason);

      return memo;
    },
    { periods: [], seasons: [] }
  );

  return {
    periods: sortBy(normalizedData.periods, (period) => period.rates[0].rate),
    seasons: sortBy(normalizedData.seasons, (season) => season.seasonName)
  };
}

function normalizeSchedule(originalSchedule) {
  const {
    demandSeasons,
    energySeasons,
    ...normalizedSchedule
  } = originalSchedule;

  const { flat, tou } = demandSeasons.reduce((memo, season) => {
    if (!memo[season.seasonType]) {
      memo[season.seasonType] = [];
    }

    memo[season.seasonType].push(season);

    return memo;
  }, {});

  normalizedSchedule.flatDemand = getNormalizedData(flat, 'demand');
  normalizedSchedule.touDemand = getNormalizedData(tou, 'demand');
  normalizedSchedule.usage = getNormalizedData(energySeasons, 'energy');

  return normalizedSchedule;
}

export default normalizeSchedule;
