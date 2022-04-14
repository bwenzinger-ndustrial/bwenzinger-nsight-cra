'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('reminder').attrs({
  utilityContractId: () => faker.random.number(),
  userId: () => faker.random.uuid(),
  createdAt: () => faker.date.past().toISOString(),
  updatedAt: () => faker.date.past().toISOString()
});
