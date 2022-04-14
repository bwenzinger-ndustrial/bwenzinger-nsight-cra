'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory
  .define('iosDevice')
  .option('fromServer', false)
  .sequence('id')
  .attrs({
    createdAt: () => faker.date.past().toISOString(),
    deviceToken: () => faker.random.uuid(),
    isActive: () => faker.random.boolean(),
    snsEndpointArn: () => faker.random.uuid(),
    updatedAt: () => faker.date.recent().toISOString(),
    userId: () => factory.build('eventUser').id
  });
