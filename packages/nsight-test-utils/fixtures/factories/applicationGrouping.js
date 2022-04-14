'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('applicationGrouping')
  .attrs({
    applicationId: () => faker.random.uuid(),
    id: () => faker.random.uuid(),
    index: () => faker.random.number(),
    label: () => faker.random.words()
  })
  .attr('applicationModules', ['id'], (id) => {
    return factory.buildList(
      'applicationModule',
      faker.random.number({ min: 1, max: 10 }),
      { applicationGroupingId: id }
    );
  });
