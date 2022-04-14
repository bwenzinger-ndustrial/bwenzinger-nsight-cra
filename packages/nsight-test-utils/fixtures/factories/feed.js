'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('feed')
  .sequence('id')
  .attrs({
    feedTypeId: () => faker.random.number(),
    downAfter: () => faker.random.number(),
    key: () => faker.finance.iban(),
    facilityId: () => faker.random.number(),
    timezone: () => {
      return faker.random.arrayElement([
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles'
      ]);
    },
    routingKeys: () => [],
    token: () => faker.random.uuid(),
    status: () => {
      return faker.random.arrayElement(['Healthy', 'Critical']);
    },
    criticalThreshold: () => faker.finance.amount(),
    isPaused: () => faker.random.boolean(),
    statusEventId: () => faker.random.uuid(),
    ownerId: () => faker.random.uuid()
  })
  .attr('feedType', () => {
    return {
      type: faker.random.arrayElement([
        'monnit' + faker.random.number({ min: 5, max: 60 }),
        'egauge' + faker.random.number({ min: 5, max: 60 }),
        'acquisuite' + faker.random.number({ min: 5, max: 60 }),
        'ngest' + faker.random.number({ min: 5, max: 60 })
      ])
    };
  })
  .attr('feedStatus', () => {
    return {
      status: faker.random.arrayElement(['active', 'failed']),
      updatedAt: faker.date.recent().toISOString()
    };
  });
