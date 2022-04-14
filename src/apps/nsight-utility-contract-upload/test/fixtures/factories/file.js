'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('file').attrs({
  id: () => faker.random.uuid(),
  downloadInfo: {
    attachmentUrl: () => faker.internet.url(),
    inlineUrl: () => faker.internet.url()
  }
});
