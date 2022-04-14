'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('utilityProvider')
  .sequence('id')
  .attrs({
    label: () =>
      `${faker.company.companyName()} - ${faker.commerce.productName()}`
  });
