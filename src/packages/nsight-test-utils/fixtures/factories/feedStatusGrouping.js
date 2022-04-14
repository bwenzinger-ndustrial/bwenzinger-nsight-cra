'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('feedStatusGrouping')
  .sequence('id')
  .attrs({
    label: () => faker.hacker.noun(),
    status: () => {
      return faker.random.arrayElement(['Active', 'Out-of-Date']);
    },
    updatedAt: () => faker.date.recent().toISOString()
  });
