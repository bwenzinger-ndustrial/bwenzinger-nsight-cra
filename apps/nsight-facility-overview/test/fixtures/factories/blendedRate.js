'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('blendedRate').attrs({
  assetMetricId: () => faker.random.uuid(),
  effectiveEndDate: () => faker.date.past().toISOString(),
  effectiveStartDate: () => faker.date.past().toISOString(),
  error: () => faker.random.words(),
  id: () => faker.random.uuid(),
  isEstimated: () => faker.random.boolean(),
  notes: () => faker.random.words(),
  value: () => faker.random.number(),
  createdAt: () => faker.date.past().toISOString(),
  updatedAt: () => faker.date.past().toISOString(),
  asset: {
    id: () => faker.random.uuid(),
    hierarchyLevel: () => faker.random.number(),
    label: () => faker.random.words(),
    description: () => faker.random.words()
  }
});
