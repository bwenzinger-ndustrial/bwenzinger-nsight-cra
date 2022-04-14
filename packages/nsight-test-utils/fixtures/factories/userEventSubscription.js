'use strict';

const factory = require('rosie').Factory;
const faker = require('faker');

factory.define('userEventSubscription').attrs({
  createdAt: () => faker.date.past().toISOString(),
  endpointArn: () => null,
  eventId: () => factory.build('event').id,
  id: () => faker.random.uuid(),
  mediumType: () => faker.random.arrayElement(['email', 'sms']),
  updatedAt: () => faker.date.recent().toISOString(),
  userId: () => factory.build('eventUser').id
});
