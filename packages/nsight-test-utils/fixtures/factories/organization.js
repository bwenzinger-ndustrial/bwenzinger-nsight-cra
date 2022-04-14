'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('organization')
  .sequence('legacyOrganizationId')
  .attrs({
    id: () => faker.random.uuid(),
    name: () => faker.company.companyName(),
    slug: () => faker.lorem.slug()
  });
