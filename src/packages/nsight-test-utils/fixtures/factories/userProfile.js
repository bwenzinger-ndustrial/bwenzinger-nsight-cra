'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('userProfile').attrs({
  name: () => faker.name.findName(),
  nickname: () => faker.name.firstName(),
  picture: () => faker.image.avatar(),
  sub: () => `test|${faker.internet.password()}`,
  updatedAt: () => faker.date.recent().toISOString()
});
