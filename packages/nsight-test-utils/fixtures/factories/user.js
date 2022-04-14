'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('user').attrs({
  icon: () => faker.random.word(),
  id: () => faker.random.uuid(),
  firstName: () => faker.name.firstName(),
  label: () =>
    faker.name.lastName() +
    ', ' +
    faker.name.firstName() +
    ' (' +
    faker.internet.email() +
    ')',
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email()
});
