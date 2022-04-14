'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');
const moment = require('moment');

factory
  .define('heatmap')
  .option('fromServer', false)
  .attrs({
    id: () => faker.random.uuid(),
    label: () => faker.random.words(),
    description: () => faker.random.words(),
    rateScheduleTypeId: () => faker.random.uuid(),
    effectiveStartDate: () => moment(faker.date.recent()).format('YYYY-MM-DD'),
    effectiveEndDate: () => moment(faker.date.recent()).format('YYYY-MM-DD'),
    utilityProviderId: () => faker.random.uuid(),
    sector: () => faker.lorem.word(),
    source: () => faker.internet.url(),
    uri: () => faker.internet.url(),
    supersedesRateScheduleId: () => faker.random.uuid(),
    openeiId: () => faker.random.uuid(),
    isRtpRate: () => faker.random.boolean(),
    isPublished: () => faker.random.boolean(),
    createdAt: () => moment(faker.date.recent()).format('YYYY-MM-DD'),
    updatedAt: () => moment(faker.date.recent()).format('YYYY-MM-DD'),
    utilityProvider: () => {
      return {
        id: faker.random.uuid(),
        label: faker.company.companyName(),
        createdAt: moment(faker.date.recent()).format('YYYY-MM-DD'),
        updatedAt: moment(faker.date.recent()).format('YYYY-MM-DD')
      };
    },
    rateScheduleApplicability: () => {
      return {
        id: faker.random.uuid(),
        rateScheduleId: faker.random.uuid(),
        minDemand: faker.random.number({ min: 0, max: 100 }),
        maxDemand: faker.random.number({ min: 100, max: 200 }),
        minConsumption: faker.random.number({ min: 0, max: 100 }),
        maxConsumption: faker.random.number({ min: 100, max: 200 }),
        minVoltage: faker.random.number({ min: 0, max: 100 }),
        maxVoltage: faker.random.number({ min: 100, max: 200 }),
        phaseWiring: faker.company.bsAdjective()
      };
    },
    rateScheduleFixedCharges: () => {
      const charges = [];
      const limit = faker.random.number({ min: 1, max: 5 });

      for (let i = 0; i < limit; i++) {
        charges.push({
          id: faker.random.uuid(),
          rateScheduleId: faker.random.uuid(),
          name: faker.random.words(),
          amount: Math.random(),
          createdAt: moment(faker.date.recent()).format('YYYY-MM-DD'),
          updatedAt: moment(faker.date.recent()).format('YYYY-MM-DD')
        });
      }
      return charges;
    },
    demandSeasons: () => {
      let rates;
      const demandSeasons = [];
      const limit = faker.random.number({ min: 2, max: 5 });

      for (let i = 0; i < limit; i++) {
        rates = factory.buildList('rate', faker.random.number({ max: 3 }));

        demandSeasons.push({
          id: faker.random.uuid(),
          rateScheduleId: faker.random.uuid(),
          seasonType: faker.random.arrayElement(['flat', 'tou']),
          seasonName: faker.random.words(),
          startMonth: i * (12 / limit),
          endMonth: i * (12 / limit) + 12 / limit,
          startDay: 1,
          endDay: 31,

          demandSeasonPeriods: (() => {
            const demandSeasonPeriods = [];
            const demandSeasonLimit = faker.random.number({ min: 1, max: 5 });

            for (let j = 0; j < demandSeasonLimit; j++) {
              demandSeasonPeriods.push({
                id: faker.random.uuid(),
                demandSeasonId: faker.random.uuid(),
                periodName: faker.random.words(),
                dayOfWeekStart: (j * 7) / demandSeasonLimit,
                dayOfWeekEnd:
                  (j * 7) / demandSeasonLimit + 7 / demandSeasonLimit,
                hourStart: 0,
                minuteStart: 0,
                hourEnd: 23,
                minuteEnd: 59,
                demandTierRates: rates
              });
            }
            return demandSeasonPeriods;
          })()
        });
      }
      return demandSeasons;
    },
    energySeasons: () => {
      const energySeasons = [];
      const limit = faker.random.number({ min: 2, max: 5 });

      // TODO: update test to actually use the loop.  Prior it was just returning after one iteration
      // for (let i = 0; i < limit; i++) {
      const i = 1;
      const rates = factory.buildList('rate', faker.random.number({ max: 3 }));

      energySeasons.push({
        id: faker.random.uuid(),
        rateScheduleId: faker.random.uuid(),
        seasonType: faker.random.arrayElement(['flat', 'tou']),
        seasonName: faker.random.words(),
        startMonth: i * (12 / limit),
        endMonth: i * (12 / limit) + 12 / limit,
        startDay: 1,
        endDay: 31,

        energySeasonPeriods: (() => {
          const energySeasonPeriods = [];
          const energySeasonLimit = faker.random.number({
            min: 1,
            max: 5
          });

          for (let j = 0; j < energySeasonLimit; j++) {
            energySeasonPeriods.push({
              id: faker.random.uuid(),
              energySeasonId: faker.random.uuid(),
              periodName: faker.random.words(),
              dayOfWeekStart: j * (7 / energySeasonLimit),
              dayOfWeekEnd: j * (7 / energySeasonLimit) + 7 / energySeasonLimit,
              hourStart: 0,
              minuteStart: 0,
              hourEnd: 23,
              minuteEnd: 59,
              energyTierRates: rates
            });
          }
          return energySeasonPeriods;
        })()
      });
      return energySeasons;
      // }
    }
  })
  .after((heatmap, options) => {
    // If building a heatmap object that comes from the server, transform it to
    // have camel case and capital letters in the right spots
    if (options.fromServer) {
      heatmap.rate_schedule_type_id = heatmap.rateScheduleTypeId;
      delete heatmap.rateScheduleTypeId;

      heatmap.effective_start_date = heatmap.effectiveStartDate;
      delete heatmap.effectiveStartDate;

      heatmap.effective_end_date = heatmap.effectiveEndDate;
      delete heatmap.effectiveEndDate;

      heatmap.created_at = heatmap.createdAt;
      delete heatmap.createdAt;

      heatmap.updated_at = heatmap.updatedAt;
      delete heatmap.updatedAt;

      heatmap.utility_provider_id = heatmap.utilityProviderId;
      delete heatmap.utilityProviderId;

      heatmap.supersedes_rate_schedule_id = heatmap.supersedesRateScheduleId;
      delete heatmap.supersedesRateScheduleId;

      heatmap.openei_id = heatmap.openeiId;
      delete heatmap.openeiId;

      heatmap.is_rtp_rate = heatmap.isRtpRate;
      delete heatmap.isRtpRate;

      heatmap.is_published = heatmap.isPublished;
      delete heatmap.isPublished;

      // Utility Provider
      heatmap.UtilityProvider.created_at = heatmap.UtilityProvider.createdAt;
      delete heatmap.UtilityProvider.createdAt;

      heatmap.UtilityProvider.updated_at = heatmap.UtilityProvider.updatedAt;
      delete heatmap.UtilityProvider.updatedAt;

      // Rate Schedule Applicability
      heatmap.rateScheduleApplicability.rate_schedule_id =
        heatmap.rateScheduleApplicability.rateScheduleId;
      delete heatmap.rateScheduleApplicability.rateScheduleId;

      heatmap.rateScheduleApplicability.min_demand =
        heatmap.rateScheduleApplicability.minDemand;
      delete heatmap.rateScheduleApplicability.minDemand;

      heatmap.rateScheduleApplicability.max_demand =
        heatmap.rateScheduleApplicability.maxDemand;
      delete heatmap.rateScheduleApplicability.maxDemand;

      heatmap.rateScheduleApplicability.min_consumption =
        heatmap.rateScheduleApplicability.minConsumption;
      delete heatmap.rateScheduleApplicability.minConsumption;

      heatmap.rateScheduleApplicability.max_consumption =
        heatmap.rateScheduleApplicability.maxConsumption;
      delete heatmap.rateScheduleApplicability.maxConsumption;

      heatmap.rateScheduleApplicability.min_voltage =
        heatmap.rateScheduleApplicability.minVoltage;
      delete heatmap.rateScheduleApplicability.minVoltage;

      heatmap.rateScheduleApplicability.max_voltage =
        heatmap.rateScheduleApplicability.maxVoltage;
      delete heatmap.rateScheduleApplicability.maxVoltage;

      heatmap.rateScheduleApplicability.phase_wiring =
        heatmap.rateScheduleApplicability.phaseWiring;
      delete heatmap.rateScheduleApplicability.phaseWiring;

      // Rate Schedule Fixed Charges
      const updatedRateScheduleFixedCharges = heatmap.rateScheduleFixedCharges.map(
        (rateSchedule) => {
          return {
            id: rateSchedule.id,
            rate_schedule_id: rateSchedule.rateScheduleId,
            name: rateSchedule.name,
            amount: rateSchedule.amount,
            created_at: rateSchedule.createdAt,
            updated_at: rateSchedule.updatedAt
          };
        }
      );

      heatmap.rateScheduleFixedCharges = updatedRateScheduleFixedCharges;

      // Demand Seasons
      const updatedDemandSeasons = heatmap.demandSeasons.map((rateSchedule) => {
        return {
          id: rateSchedule.id,
          rate_schedule_id: rateSchedule.rateScheduleId,
          season_type: rateSchedule.seasonType,
          season_name: rateSchedule.seasonName,
          start_month: rateSchedule.startMonth,
          end_month: rateSchedule.endMonth,
          start_day: rateSchedule.startDay,
          end_day: rateSchedule.endDay,
          DemandSeasonPeriods: rateSchedule.DemandSeasonPeriods.map((ds) => {
            return {
              id: ds.id,
              demand_season_id: ds.demandSeasonId,
              day_of_week_start: ds.dayOfWeekStart,
              hour_start: ds.hourStart,
              minute_start: ds.minuteStart,
              day_of_week_end: ds.dayOfWeekEnd,
              hour_end: ds.hourEnd,
              minute_end: ds.minuteEnd,
              period_name: ds.periodName,
              demand_tier_rates: ds.demandTierRates.map((rate) => {
                return {
                  id: rate.id,
                  demand_sea: rate.demandSea,
                  unit_start: rate.unitStart,
                  unit_stop_: rate.unitStop,
                  unit: rate.unit,
                  rate: rate.rate
                };
              })
            };
          })
        };
      });

      heatmap.demand_seasons = updatedDemandSeasons;
      delete heatmap.demandSeasons;

      // Energy Seasons
      const updatedEnergySeasons = heatmap.energySeasons.map((rateSchedule) => {
        return {
          id: rateSchedule.id,
          rate_schedule_id: rateSchedule.rateScheduleId,
          season_type: rateSchedule.seasonType,
          season_name: rateSchedule.seasonName,
          start_month: rateSchedule.startMonth,
          end_month: rateSchedule.endMonth,
          start_day: rateSchedule.startDay,
          end_day: rateSchedule.endDay,
          EnergySeasonPeriods: rateSchedule.EnergySeasonPeriods.map((ds) => {
            return {
              id: ds.id,
              energy_season_id: ds.energySeasonId,
              day_of_week_start: ds.dayOfWeekStart,
              hour_start: ds.hourStart,
              minute_start: ds.minuteStart,
              day_of_week_end: ds.dayOfWeekEnd,
              hour_end: ds.hourEnd,
              minute_end: ds.minuteEnd,
              period_name: ds.periodName,
              energy_tier_rates: ds.energyTierRates.map((rate) => {
                return {
                  id: rate.id,
                  energy_sea: rate.energySea,
                  unit_start: rate.unitStart,
                  unit_stop_: rate.unitStop,
                  unit: rate.unit,
                  rate: rate.rate
                };
              })
            };
          })
        };
      });

      heatmap.energy_seasons = updatedEnergySeasons;
      delete heatmap.energySeasons;
    }
  });
