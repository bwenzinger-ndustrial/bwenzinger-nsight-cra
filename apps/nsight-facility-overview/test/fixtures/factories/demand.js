'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('demand').attrs({
  event_time: () => faker.date.past().toISOString(),
  value: faker.random.number()
});
