'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('formattedUser').attrs({
  lastName: () => faker.name.lastName(),
  firstName: () => faker.name.firstName(),
  label: () => faker.random.word(),
  email: () => faker.internet.email()
});
