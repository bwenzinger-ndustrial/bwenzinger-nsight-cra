'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('browserFile').attrs({
  lastModified: faker.random.number(),
  lastModifiedDate: faker.date.past(),
  name: faker.system.commonFileName(),
  path: faker.system.commonFileName(),
  preview: faker.internet.url(),
  size: faker.random.number(),
  type: faker.system.mimeType(),
  webkitRelativePath: ''
});
