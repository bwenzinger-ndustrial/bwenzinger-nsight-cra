'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('facilityGrouping').attrs({
  children: () => [],
  createdAt: () => faker.date.past().toISOString(),
  description: () => faker.hacker.phrase(),
  facilities: () =>
    factory.buildList('facility', faker.random.number({ max: 3 })),
  id: () => faker.random.uuid(),
  isPrivate: () => faker.random.boolean(),
  name: () => faker.commerce.productName(),
  organizationId: () => factory.build('organization').id,
  ownerId: () => faker.internet.userName(),
  parentGroupingId: () => faker.random.uuid(),
  updatedAt: () => faker.date.recent().toISOString()
});
