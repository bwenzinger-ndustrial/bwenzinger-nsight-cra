'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('facilityInfo').attrs({
  'General Manager': () => faker.name.findName(),
  latitude: () => faker.address.latitude(),
  longitude: () => faker.address.longitude(),
  rail_access: () => faker.random.boolean(),
  square_feet: () => faker.random.number()
});
