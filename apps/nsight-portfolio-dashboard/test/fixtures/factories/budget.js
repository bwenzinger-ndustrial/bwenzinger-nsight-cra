'use strict';

const faker = require('faker');
const { times } = require('lodash');
const factory = require('rosie').Factory;

factory.define('budget').attrs({
  actual: () => faker.random.number(),
  budget: () => faker.random.number(),
  facilities: () =>
    times(faker.random.number({ min: 1, max: 10 }), () => {
      const { id, name } = factory.build('facility');

      return {
        id,
        name,
        actual: faker.random.number(),
        budget: faker.random.number()
      };
    }),
  month: () => faker.random.number({ min: 1, max: 12 }),
  organizationId: () => factory.build('organization').id,
  year: () => faker.random.number({ min: 2000, max: 2030 })
});
