'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

const APPLICATION_MODULE_SLUGS = [
  '@ndustrial/nsight-facility-admin',
  '@ndustrial/nsight-facility-overview',
  '@ndustrial/nsight-device-status',
  '@ndustrial/nsight-legacy-analytics',
  '@ndustrial/nsight-legacy-alerts',
  '@ndustrial/nsight-legacy-facility-status',
  '@ndustrial/nsight-legacy-utility-bills',
  '@ndustrial/nsight-portfolio-dashboard',
  '@ndustrial/nsight-rate-tariffs',
  '@ndustrial/nsight-utility-contract-upload',
  '@ndustrial/nsight-projects'
];

factory.define('applicationModule').attrs({
  applicationGroupingId: () => factory.build('applicationGrouping').id,
  createdAt: () => faker.date.past().toISOString(),
  description: () => faker.lorem.words(),
  externalLink: () => faker.internet.url(),
  iconUrl: () => faker.internet.url(),
  id: () => faker.random.uuid(),
  label: () => faker.commerce.productName(),
  position: () => faker.random.number(),
  slug: () => faker.random.arrayElement(APPLICATION_MODULE_SLUGS),
  updatedAt: () => faker.date.recent().toISOString()
});
