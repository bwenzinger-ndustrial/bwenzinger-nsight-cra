import { expect } from 'chai';
import faker from 'faker';
import { keyBy, omit, times } from 'lodash';

import { fixtures } from '@ndustrial/nsight-test-utils';

import getScheduleById from './getScheduleById';

const createRateInformation = (type) => {
  const periods = times(faker.random.number({ min: 1, max: 5 }), (index) => {
    return {
      _id: index,
      rates: fixtures.buildList(
        'rateTierRate',
        faker.random.number({ min: 1, max: 10 }),
        null,
        { type }
      )
    };
  });

  return {
    periods,
    seasons: fixtures
      .buildList(
        'rateSeason',
        2,
        {
          seasonPeriods: fixtures
            .buildList(
              'rateSeasonPeriod',
              2,
              { type },
              { _periodId: faker.random.arrayElement(periods).id }
            )
            .map((seasonPeriod) => omit(seasonPeriod, [`${type}TierRates`]))
        },
        { type }
      )
      .map((season) => omit(season, [`${type}SeasonPeriods`]))
  };
};

describe('nsight-rate-tariffs/redux/selectors/getScheduleById', function() {
  context(
    'when getting a rate schedule without an aggregated `Annual Rate`',
    function() {
      let expectedSchedule;
      let rateSchedule;

      beforeEach(function() {
        const schedules = fixtures
          .buildList('rateSchedule', faker.random.number({ min: 1, max: 10 }))
          .map((schedule) => {
            return {
              ...schedule,
              flatDemand: createRateInformation('demand'),
              touDemand: createRateInformation('demand'),
              usage: createRateInformation('energy')
            };
          });
        const scheduleId = faker.random.arrayElement(schedules).id;
        const schedulesMap = keyBy(schedules, 'id');
        expectedSchedule = schedulesMap[scheduleId];

        rateSchedule = getScheduleById.resultFunc(schedulesMap, scheduleId);
      });

      it('returns the rate schedule without an aggregated `Annual Rate`', function() {
        expect(rateSchedule).to.deep.equal(expectedSchedule);
      });
    }
  );

  context(
    'when getting a schedule with an aggregated `Annual Rate`',
    function() {
      context('when all tab/rate types exist in the schedule', function() {
        let expectedSchedule;
        let rateSchedule;

        beforeEach(function() {
          const schedules = fixtures
            .buildList('rateSchedule', faker.random.number({ min: 1, max: 10 }))
            .map((schedule) => {
              return {
                ...schedule,
                flatDemand: createRateInformation('demand'),
                touDemand: createRateInformation('demand'),
                usage: createRateInformation('energy')
              };
            });
          const scheduleId = faker.random.arrayElement(schedules).id;
          const schedulesMap = keyBy(schedules, 'id');
          expectedSchedule = schedulesMap[scheduleId];

          rateSchedule = getScheduleById.resultFunc(schedulesMap, scheduleId, {
            includeSeasonsAggregate: true
          });
        });

        it('returns the rate schedule with an aggregated `Annual Rate`', function() {
          expect(rateSchedule).to.deep.equal({
            ...expectedSchedule,
            flatDemand: {
              ...expectedSchedule.flatDemand,
              seasons: [
                ...expectedSchedule.flatDemand.seasons,
                {
                  _scheduleType: 'annual',
                  endDay: 31,
                  endMonth: 12,
                  rateScheduleId: expectedSchedule.id,
                  seasonName: 'Annual Rate',
                  seasonType: expectedSchedule.flatDemand.seasons[0].seasonType,
                  slug: 'annual-rate',
                  startDay: 1,
                  startMonth: 1,
                  seasonPeriods: [
                    {
                      ...expectedSchedule.flatDemand.seasons[0]
                        .seasonPeriods[0],
                      endDay: expectedSchedule.flatDemand.seasons[0].endDay,
                      endMonth: expectedSchedule.flatDemand.seasons[0].endMonth,
                      startDay: expectedSchedule.flatDemand.seasons[0].startDay,
                      startMonth:
                        expectedSchedule.flatDemand.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.flatDemand.seasons[0]
                        .seasonPeriods[1],
                      endDay: expectedSchedule.flatDemand.seasons[0].endDay,
                      endMonth: expectedSchedule.flatDemand.seasons[0].endMonth,
                      startDay: expectedSchedule.flatDemand.seasons[0].startDay,
                      startMonth:
                        expectedSchedule.flatDemand.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.flatDemand.seasons[1]
                        .seasonPeriods[0],
                      endDay: expectedSchedule.flatDemand.seasons[1].endDay,
                      endMonth: expectedSchedule.flatDemand.seasons[1].endMonth,
                      startDay: expectedSchedule.flatDemand.seasons[1].startDay,
                      startMonth:
                        expectedSchedule.flatDemand.seasons[1].startMonth
                    },
                    {
                      ...expectedSchedule.flatDemand.seasons[1]
                        .seasonPeriods[1],
                      endDay: expectedSchedule.flatDemand.seasons[1].endDay,
                      endMonth: expectedSchedule.flatDemand.seasons[1].endMonth,
                      startDay: expectedSchedule.flatDemand.seasons[1].startDay,
                      startMonth:
                        expectedSchedule.flatDemand.seasons[1].startMonth
                    }
                  ]
                }
              ]
            },
            touDemand: {
              ...expectedSchedule.touDemand,
              seasons: [
                ...expectedSchedule.touDemand.seasons,
                {
                  _scheduleType: 'annual',
                  endDay: 31,
                  endMonth: 12,
                  rateScheduleId: expectedSchedule.id,
                  seasonName: 'Annual Rate',
                  seasonType: expectedSchedule.touDemand.seasons[0].seasonType,
                  slug: 'annual-rate',
                  startDay: 1,
                  startMonth: 1,
                  seasonPeriods: [
                    {
                      ...expectedSchedule.touDemand.seasons[0].seasonPeriods[0],
                      endDay: expectedSchedule.touDemand.seasons[0].endDay,
                      endMonth: expectedSchedule.touDemand.seasons[0].endMonth,
                      startDay: expectedSchedule.touDemand.seasons[0].startDay,
                      startMonth:
                        expectedSchedule.touDemand.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.touDemand.seasons[0].seasonPeriods[1],
                      endDay: expectedSchedule.touDemand.seasons[0].endDay,
                      endMonth: expectedSchedule.touDemand.seasons[0].endMonth,
                      startDay: expectedSchedule.touDemand.seasons[0].startDay,
                      startMonth:
                        expectedSchedule.touDemand.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.touDemand.seasons[1].seasonPeriods[0],
                      endDay: expectedSchedule.touDemand.seasons[1].endDay,
                      endMonth: expectedSchedule.touDemand.seasons[1].endMonth,
                      startDay: expectedSchedule.touDemand.seasons[1].startDay,
                      startMonth:
                        expectedSchedule.touDemand.seasons[1].startMonth
                    },
                    {
                      ...expectedSchedule.touDemand.seasons[1].seasonPeriods[1],
                      endDay: expectedSchedule.touDemand.seasons[1].endDay,
                      endMonth: expectedSchedule.touDemand.seasons[1].endMonth,
                      startDay: expectedSchedule.touDemand.seasons[1].startDay,
                      startMonth:
                        expectedSchedule.touDemand.seasons[1].startMonth
                    }
                  ]
                }
              ]
            },
            usage: {
              ...expectedSchedule.usage,
              seasons: [
                ...expectedSchedule.usage.seasons,
                {
                  _scheduleType: 'annual',
                  endDay: 31,
                  endMonth: 12,
                  rateScheduleId: expectedSchedule.id,
                  seasonName: 'Annual Rate',
                  seasonType: expectedSchedule.usage.seasons[0].seasonType,
                  slug: 'annual-rate',
                  startDay: 1,
                  startMonth: 1,
                  seasonPeriods: [
                    {
                      ...expectedSchedule.usage.seasons[0].seasonPeriods[0],
                      endDay: expectedSchedule.usage.seasons[0].endDay,
                      endMonth: expectedSchedule.usage.seasons[0].endMonth,
                      startDay: expectedSchedule.usage.seasons[0].startDay,
                      startMonth: expectedSchedule.usage.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.usage.seasons[0].seasonPeriods[1],
                      endDay: expectedSchedule.usage.seasons[0].endDay,
                      endMonth: expectedSchedule.usage.seasons[0].endMonth,
                      startDay: expectedSchedule.usage.seasons[0].startDay,
                      startMonth: expectedSchedule.usage.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.usage.seasons[1].seasonPeriods[0],
                      endDay: expectedSchedule.usage.seasons[1].endDay,
                      endMonth: expectedSchedule.usage.seasons[1].endMonth,
                      startDay: expectedSchedule.usage.seasons[1].startDay,
                      startMonth: expectedSchedule.usage.seasons[1].startMonth
                    },
                    {
                      ...expectedSchedule.usage.seasons[1].seasonPeriods[1],
                      endDay: expectedSchedule.usage.seasons[1].endDay,
                      endMonth: expectedSchedule.usage.seasons[1].endMonth,
                      startDay: expectedSchedule.usage.seasons[1].startDay,
                      startMonth: expectedSchedule.usage.seasons[1].startMonth
                    }
                  ]
                }
              ]
            }
          });
        });
      });

      context('when only one rate type exists in the schedule', function() {
        let expectedSchedule;
        let scheduleId;
        let schedulesMap;

        beforeEach(function() {
          const schedules = fixtures
            .buildList('rateSchedule', faker.random.number({ min: 1, max: 10 }))
            .map((schedule) => {
              return {
                ...schedule,
                usage: createRateInformation('energy')
              };
            });
          scheduleId = faker.random.arrayElement(schedules).id;
          schedulesMap = keyBy(schedules, 'id');
          expectedSchedule = schedulesMap[scheduleId];
        });

        it('does not throw an error', function() {
          expect(() =>
            getScheduleById.resultFunc(schedulesMap, scheduleId, {
              includeSeasonsAggregate: true
            })
          ).to.not.throw();
        });

        it('includes an aggregated `Annual Rate` for the rate type that does exist', function() {
          const rateSchedule = getScheduleById.resultFunc(
            schedulesMap,
            scheduleId,
            {
              includeSeasonsAggregate: true
            }
          );

          expect(rateSchedule).to.deep.equal({
            ...expectedSchedule,
            usage: {
              ...expectedSchedule.usage,
              seasons: [
                ...expectedSchedule.usage.seasons,
                {
                  _scheduleType: 'annual',
                  endDay: 31,
                  endMonth: 12,
                  rateScheduleId: expectedSchedule.id,
                  seasonName: 'Annual Rate',
                  seasonType: expectedSchedule.usage.seasons[0].seasonType,
                  slug: 'annual-rate',
                  startDay: 1,
                  startMonth: 1,
                  seasonPeriods: [
                    {
                      ...expectedSchedule.usage.seasons[0].seasonPeriods[0],
                      endDay: expectedSchedule.usage.seasons[0].endDay,
                      endMonth: expectedSchedule.usage.seasons[0].endMonth,
                      startDay: expectedSchedule.usage.seasons[0].startDay,
                      startMonth: expectedSchedule.usage.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.usage.seasons[0].seasonPeriods[1],
                      endDay: expectedSchedule.usage.seasons[0].endDay,
                      endMonth: expectedSchedule.usage.seasons[0].endMonth,
                      startDay: expectedSchedule.usage.seasons[0].startDay,
                      startMonth: expectedSchedule.usage.seasons[0].startMonth
                    },
                    {
                      ...expectedSchedule.usage.seasons[1].seasonPeriods[0],
                      endDay: expectedSchedule.usage.seasons[1].endDay,
                      endMonth: expectedSchedule.usage.seasons[1].endMonth,
                      startDay: expectedSchedule.usage.seasons[1].startDay,
                      startMonth: expectedSchedule.usage.seasons[1].startMonth
                    },
                    {
                      ...expectedSchedule.usage.seasons[1].seasonPeriods[1],
                      endDay: expectedSchedule.usage.seasons[1].endDay,
                      endMonth: expectedSchedule.usage.seasons[1].endMonth,
                      startDay: expectedSchedule.usage.seasons[1].startDay,
                      startMonth: expectedSchedule.usage.seasons[1].startMonth
                    }
                  ]
                }
              ]
            }
          });
        });
      });
    }
  );
});
