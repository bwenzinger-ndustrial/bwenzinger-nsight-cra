'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('kpi').attrs({
  _metadata: { info: [] },
  name: () => faker.random.word(),
  units: () => faker.random.word(),
  value: () => faker.random.number()
});
