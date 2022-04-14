'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('aggregateDemand').attrs({
  name: () => faker.random.word(),
  value: () => faker.random.number({ min: 100, max: 500 })
});
