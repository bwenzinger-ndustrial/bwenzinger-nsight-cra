'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('feedType')
  .sequence('id')
  .attrs({
    type: () => faker.random.word(),
    downAfter: () => faker.random.number(),
    troubleshootingUrl: () => faker.internet.url(),
    createdAt: () => faker.date.past().toISOString(),
    updatedAt: () => faker.date.past().toISOString()
  });
