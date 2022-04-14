'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');
const slugify = require('slug');

factory
  .define('facility')
  .sequence('id')
  .attrs({
    address1: () => faker.address.streetAddress(),
    address2: () => faker.address.secondaryAddress(),
    city: () => faker.address.city(),
    createdAt: () => faker.date.past().toISOString(),
    facilityGroupings: () => [],
    geometryId: () => faker.random.uuid(),
    info: () => factory.build('facilityInfo'),
    organizationId: () => factory.build('organization').id,
    state: () => faker.address.state(),
    timezone: () => {
      return faker.random.arrayElement([
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles'
      ]);
    },
    updatedAt: () => faker.date.recent().toISOString(),
    weatherLocationId: () => null,
    zip: () => faker.address.zipCode()
  })
  .attr('name', ['city'], (city) => `${faker.address.cityPrefix()} ${city}`)
  .attr('organization', () => factory.build('organization', null))
  .attr('organizationId', ['organization'], (organization) => organization.id)
  .attr('slug', ['name'], (name) => slugify(name, { lower: true }));
