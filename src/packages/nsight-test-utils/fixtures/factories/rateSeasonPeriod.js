'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('rateSeasonPeriod')
  .option('type', 'energy')
  .option('seasonId', () => faker.random.number())
  .sequence('id')
  .sequence('periodName', (i) => `Period ${i}`)
  .attrs({
    dayOfWeekEnd: () => faker.random.number({ min: 0, max: 6 }),
    dayOfWeekStart: () => faker.random.number({ min: 0, max: 6 }),
    hourEnd: () => faker.random.number({ min: 0, max: 23 }),
    hourStart: () => faker.random.number({ min: 0, max: 23 }),
    minuteEnd: () => faker.random.number({ min: 0, max: 59 }),
    minuteStart: () => faker.random.number({ min: 0, max: 59 })
  })
  .after((ratePeriod, options) => {
    ratePeriod[`${options.type}SeasonId`] = options.seasonId;
    ratePeriod[`${options.type}TierRates`] = factory.buildList(
      'rateTierRate',
      faker.random.number({ min: 1, max: 3 }),
      null,
      { periodId: ratePeriod.id, type: options.type }
    );
  });
