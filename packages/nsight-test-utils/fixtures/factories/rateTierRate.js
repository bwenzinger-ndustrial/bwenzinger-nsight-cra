'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('rateTierRate')
  .option('type', 'energy')
  .option('periodId', () => faker.random.number())
  .sequence('id')
  .attrs({
    adjustment: () => null,
    rate: () => faker.random.number({ min: 0, max: 15 }),
    unitStartValue: () => faker.random.number({ min: 0, max: 100 }),
    unitStopValue: () => faker.random.number({ min: 101, max: 1000000000 })
  })
  .attr('unit', ['type'], (type) => (type === 'energy' ? 'kWh' : 'kW'))
  .after((rateTierRate, options) => {
    rateTierRate[`${options.type}SeasonPeriodId`] = options.periodId;
  });
