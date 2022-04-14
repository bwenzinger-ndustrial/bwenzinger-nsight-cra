'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');
const slugify = require('slug');

factory
  .define('rateSeason')
  .option('type', 'energy')
  .sequence('id')
  .sequence('seasonName', (i) => `Season ${i}`)
  .attrs({
    endDay: () => faker.random.number({ min: 1, max: 30 }),
    endMonth: () => faker.random.number({ min: 1, max: 12 }),
    rateScheduleId: () => faker.random.number(),
    startDay: () => faker.random.number({ min: 1, max: 30 }),
    startMonth: () => faker.random.number({ min: 1, max: 12 })
  })
  .attr('seasonType', ['type'], (type) => (type === 'demand' ? 'tou' : null))
  .attr('slug', ['seasonName'], (seasonName) =>
    slugify(seasonName, { lower: true })
  )
  .after((rateSeason, options) => {
    rateSeason[`${options.type}SeasonPeriods`] = factory.buildList(
      'rateSeasonPeriod',
      faker.random.number({ min: 1, max: 3 }),
      null,
      { seasonId: rateSeason.id, type: options.type }
    );
  });
