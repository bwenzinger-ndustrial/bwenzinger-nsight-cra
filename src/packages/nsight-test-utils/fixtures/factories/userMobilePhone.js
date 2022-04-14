'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('userMobileNumber')
  .sequence('id')
  .attrs({
    createdAt: () => faker.date.past().toISOString(),
    name: () => faker.name.firstName(),
    isActive: () => faker.random.boolean(),
    phoneNumber: () => faker.phone.phoneNumber(),
    updatedAt: () => faker.date.recent().toISOString(),
    userId: () => factory.build('eventUser').id
  });
